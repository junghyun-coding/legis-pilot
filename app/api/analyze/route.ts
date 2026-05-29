import { callJSON } from "@/lib/llm";
import { extractPrompt, analyzePrompt } from "@/lib/prompt";
import {
  getRelatedLaws,
  getInterpretations,
  getConstitutional,
  getOrdinances,
} from "@/lib/lawApi";
import { computeFeasibility, explainContributions, verdictFromScore } from "@/lib/scoring";
import { SEED_LAWS } from "@/data/laws";
import type { AnalysisReport, ScoreAxes, Conflict } from "@/types";

interface ExtractOut {
  lawQueries: string[];
  keywords: string[];
}
interface AnalyzeOut {
  summary: string;
  recommendation: string;
  formNote: string;
  legalFitNote: string;
  conflictRisk: "낮음" | "보통" | "높음";
  conflicts: Conflict[];
  adminNote: string;
  scores: ScoreAxes;
}

// LLM 응답이 분석에 쓸 수 있는 형태인지 검증 (손상 시 목업으로 폴백)
function isValidAnalysis(o: AnalyzeOut | null): o is AnalyzeOut {
  if (!o || typeof o !== "object") return false;
  const s = o.scores;
  if (!s || typeof s !== "object") return false;
  return (
    typeof s.legalFit === "number" &&
    typeof s.precedentSupport === "number" &&
    typeof s.judicialSafety === "number" &&
    typeof s.feasibility === "number"
  );
}

// 점수를 0~100 정수로 클램프
function clampScores(s: ScoreAxes): ScoreAxes {
  const c = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
  return {
    legalFit: c(s.legalFit),
    precedentSupport: c(s.precedentSupport),
    judicialSafety: c(s.judicialSafety),
    feasibility: c(s.feasibility),
  };
}

// LLM 미설정 시 키워드 룰베이스 추출
function ruleKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  const found = new Set<string>();
  for (const law of SEED_LAWS) {
    for (const kw of law.keywords) if (lower.includes(kw.toLowerCase())) found.add(kw);
  }
  return [...found].slice(0, 5);
}

// LLM 미설정/실패 시 분석 목업 (데모가 비지 않게)
function mockAnalysis(keywords: string[], topLaw?: string): AnalyzeOut {
  const sensitive = keywords.some((k) => ["음주운전", "처벌"].includes(k));
  return {
    summary: sensitive
      ? "상위법 처벌체계와 충돌하고 사법 리스크가 있어 시행령 정비만으로는 타당성이 낮습니다."
      : "상위법 위임 범위 내에서 시행령 정비로 대응 가능한 타당성 있는 제안입니다.",
    recommendation: sensitive
      ? "소관 부처 협의 및 법률 개정 필요성 검토 권고"
      : "소관 부처 협의 후 시행령 정비 추진 검토 권고",
    formNote: sensitive
      ? "처벌 수위 조정은 법률 사항에 해당해 시행령만으로는 한계가 있어 법률 개정 검토가 필요합니다."
      : "현행 법률의 위임 범위 내에서 시행령 차원의 정비로 대응 가능해 보입니다.",
    legalFitNote: sensitive
      ? "조회된 현행 법령의 처벌·규제 체계와 충돌 소지가 있습니다."
      : "조회된 현행 법령의 위임 범위 내에서 정합성이 인정됩니다.",
    conflictRisk: sensitive ? "높음" : "보통",
    conflicts:
      sensitive && topLaw
        ? [{ law: topLaw, detail: "처벌·면허 관련 규정의 취지와 충돌 소지가 있습니다." }]
        : [],
    adminNote: "집행 절차 변경에 따른 행정 부담이 일부 발생할 수 있습니다.",
    scores: sensitive
      ? { legalFit: 32, precedentSupport: 40, judicialSafety: 36, feasibility: 42 }
      : { legalFit: 74, precedentSupport: 62, judicialSafety: 68, feasibility: 70 },
  };
}

export async function POST(request: Request) {
  let title = "";
  let body = "";
  try {
    const json = await request.json();
    title = String(json.title ?? "").trim();
    body = String(json.body ?? "").trim();
  } catch {
    return Response.json({ error: "잘못된 요청" }, { status: 400 });
  }
  if (!title && !body) {
    return Response.json({ error: "제안 내용이 비어 있습니다" }, { status: 400 });
  }

  const full = `${title} ${body}`;

  // 1차: 법령 검색어 + 키워드 추출 (LLM, 실패 시 룰베이스)
  const ex = extractPrompt(title, body);
  const extracted = await callJSON<ExtractOut>(ex.system, ex.user);
  const keywords = extracted?.keywords?.length ? extracted.keywords : ruleKeywords(full);
  const lawQuery = extracted?.lawQueries?.[0] ?? title ?? keywords[0] ?? "";
  // 해석례·헌재·조례는 '법령명'이 아니라 '제안 주제 키워드'로 검색한다.
  // 같은 법 영역(예: 도로교통법)이라도 음주운전 vs 어린이보호구역처럼 주제가 다르면
  // 인용되는 해석례·판례·조례가 달라져 리포트가 서로 구별된다.
  const topicQuery = keywords[0] ?? lawQuery;

  // 2: 법령 + 법령해석례 + 헌재결정례 + 자치법규 병렬 조회 (API 우선, 시드 폴백)
  const [lawsR, interpR, constR, ordR] = await Promise.all([
    getRelatedLaws(lawQuery, full),
    getInterpretations(topicQuery, full),
    getConstitutional(topicQuery, full),
    getOrdinances(topicQuery, full),
  ]);

  // 3: 법적 타당성 분석 (LLM, 실패·응답 손상 시 목업)
  const ap = analyzePrompt(
    title,
    body,
    lawsR.laws,
    interpR.items,
    constR.items,
    ordR.items,
  );
  const llmOut = await callJSON<AnalyzeOut>(ap.system, ap.user);
  const analysis = isValidAnalysis(llmOut)
    ? llmOut
    : mockAnalysis(keywords, lawsR.laws[0]?.name);

  // 점수는 0~100 정수로 클램프 (LLM 변동 방어)
  analysis.scores = clampScores(analysis.scores);

  // 4: 타당성 점수·판정 계산
  const feasibilityScore = computeFeasibility(analysis.scores);
  const verdict = verdictFromScore(feasibilityScore);
  const contributions = explainContributions(analysis.scores);

  const report: AnalysisReport = {
    keywords,
    verdict,
    summary: analysis.summary,
    recommendation: analysis.recommendation,
    formNote: analysis.formNote,
    legalFitNote: analysis.legalFitNote,
    conflictRisk: analysis.conflictRisk,
    conflicts: analysis.conflicts ?? [],
    adminNote: analysis.adminNote,
    relatedLaws: lawsR.laws,
    interpretations: interpR.items,
    constitutionalCases: constR.items,
    ordinances: ordR.items,
    scores: analysis.scores,
    feasibilityScore,
    contributions,
    dataSource: lawsR.source,
  };

  return Response.json(report);
}
