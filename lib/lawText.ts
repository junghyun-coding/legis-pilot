import { XMLParser } from "fast-xml-parser";

// 법령 조문 본문 RAG: 관련 법령의 실제 조문을 가져와 분석 LLM에 근거로 제공한다.
// (법령'이름'만 보던 기존 분석을 실제 '조문 본문' 기반으로 끌어올림)
// law.go.kr DRF 본문 API(type=XML)를 서버사이드에서만 호출 — OC는 클라이언트에 노출 안 됨.

const OC = process.env.LAW_OC ?? "sapphire_5";
const CONTENT_BASE = "https://www.law.go.kr/DRF/lawService.do";

const parser = new XMLParser({
  ignoreAttributes: true,
  cdataPropName: "__cdata",
  trimValues: true,
  parseTagValue: false,
});

export interface Article {
  no: string; // 조문번호 (예 "44")
  title: string; // 조문제목 (예 "술에 취한 상태에서의 운전 금지")
  text: string; // 조문내용 + 항내용 합본
}

function cd(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    if ("__cdata" in o) return String(o.__cdata).trim();
    return "";
  }
  return String(v).trim();
}

// 조문 XML 캐시 (MST별, 인스턴스 한정 — 법령 본문은 거의 안 바뀜)
const ARTICLE_CACHE = new Map<string, Article[]>();

/** 법령 MST로 전체 조문을 가져와 파싱. 실패 시 [] (분석은 RAG 없이 계속). */
export async function fetchLawArticles(mst: string): Promise<Article[]> {
  if (!mst) return [];
  const cached = ARTICLE_CACHE.get(mst);
  if (cached) return cached;

  const url = `${CONTENT_BASE}?OC=${OC}&target=law&MST=${encodeURIComponent(mst)}&type=XML`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return [];
    const xml = await res.text();
    const parsed = parser.parse(xml);
    let units = parsed?.["법령"]?.["조문"]?.["조문단위"];
    if (!units) return [];
    if (!Array.isArray(units)) units = [units];

    const articles: Article[] = units
      .filter((u: Record<string, unknown>) => cd(u["조문여부"]) !== "전문") // 편장절 표제 제외
      .map((u: Record<string, unknown>): Article => {
        const head = cd(u["조문내용"]) || cd(u["조문제목"]);
        let body = "";
        const hang = u["항"];
        if (hang) {
          const arr = Array.isArray(hang) ? hang : [hang];
          body = arr.map((h: Record<string, unknown>) => cd(h["항내용"])).filter(Boolean).join("\n");
        }
        return {
          no: cd(u["조문번호"]),
          title: cd(u["조문제목"]),
          text: (head + (body ? "\n" + body : "")).trim(),
        };
      })
      .filter((a: Article) => a.text.length > 0);

    ARTICLE_CACHE.set(mst, articles);
    return articles;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * 제안 키워드와 가장 관련 깊은 조문을 골라 LLM 근거용 다이제스트로 만든다.
 * 조문제목/본문에 키워드가 많이 등장할수록 상위. 매칭 0건이면 빈 문자열(RAG 생략).
 */
export function selectRelevantArticles(
  articles: Article[],
  keywords: string[],
  limit = 6,
  perArticleChars = 420,
): string {
  if (articles.length === 0) return "";
  const kws = keywords.map((k) => k.trim()).filter((k) => k.length >= 2);
  if (kws.length === 0) return "";

  const scored = articles.map((a) => {
    const hay = (a.title + " " + a.text).toLowerCase();
    let score = 0;
    for (const k of kws) {
      const kl = k.toLowerCase();
      // 등장 횟수 합산 (제목 매칭은 가중)
      const inTitle = a.title.toLowerCase().includes(kl) ? 3 : 0;
      const count = hay.split(kl).length - 1;
      score += count + inTitle;
    }
    return { a, score };
  });

  const top = scored
    .filter((s) => s.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .sort((x, y) => articleOrder(x.a.no) - articleOrder(y.a.no)); // 조문 순서로 재정렬(읽기 쉽게)

  if (top.length === 0) return "";

  return top
    .map(({ a }) => {
      const head = a.title ? `제${a.no}조(${a.title})` : `제${a.no}조`;
      const body = a.text.length > perArticleChars ? a.text.slice(0, perArticleChars) + "…" : a.text;
      return `${head}\n${body}`;
    })
    .join("\n\n");
}

// "44", "148의2" 등을 정렬용 숫자로 (가지번호는 소수로)
function articleOrder(no: string): number {
  const m = no.match(/(\d+)(?:의(\d+))?/);
  if (!m) return 9999;
  return Number(m[1]) + (m[2] ? Number(m[2]) / 100 : 0);
}
