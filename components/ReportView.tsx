import type { AnalysisReport, Verdict } from "@/types";
import { verdictTone } from "@/lib/scoring";

const RISK_COLOR: Record<string, string> = {
  낮음: "bg-emerald-100 text-emerald-700",
  보통: "bg-amber-100 text-amber-700",
  높음: "bg-rose-100 text-rose-700",
};

// 타당성 판정 톤 → 헤더 색상 (good=emerald, warn=amber, bad=rose)
const VERDICT_TEXT: Record<"good" | "warn" | "bad", string> = {
  good: "text-emerald-400",
  warn: "text-amber-400",
  bad: "text-rose-400",
};

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span className="font-medium text-slate-700">{value}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-blue-500"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

function ContributionBar({ label, weight }: { label: string; weight: number }) {
  const pct = Math.min(50, Math.abs(weight) * 100); // half-width 기준
  const positive = weight >= 0;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-28 shrink-0 text-slate-500">{label}</span>
      <div className="relative h-3 flex-1 rounded bg-slate-100">
        <div className="absolute left-1/2 top-0 h-3 w-px bg-slate-300" />
        <div
          className={`absolute top-0 h-3 ${positive ? "bg-emerald-400" : "bg-rose-400"}`}
          style={{
            width: `${pct}%`,
            left: positive ? "50%" : `${50 - pct}%`,
          }}
        />
      </div>
      <span
        className={`w-12 text-right font-medium ${positive ? "text-emerald-600" : "text-rose-600"}`}
      >
        {positive ? "+" : ""}
        {weight.toFixed(2)}
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

export default function ReportView({ report: raw }: { report: AnalysisReport }) {
  // 옛 스키마/부분 데이터 방어: 배열 필드 누락 시 빈 배열로 정규화
  const report: AnalysisReport = {
    ...raw,
    relatedLaws: raw.relatedLaws ?? [],
    interpretations: raw.interpretations ?? [],
    constitutionalCases: raw.constitutionalCases ?? [],
    ordinances: raw.ordinances ?? [],
    conflicts: raw.conflicts ?? [],
    contributions: raw.contributions ?? [],
    keywords: raw.keywords ?? [],
  };
  const tone = verdictTone(report.verdict as Verdict);
  return (
    <div className="space-y-4">
      {/* 헤더: 타당성 판정 + 점수 + 데이터 출처 */}
      <div className="flex items-start justify-between gap-4 rounded-lg bg-slate-900 p-5 text-white">
        <div>
          <div className="text-xs text-slate-300">법적 타당성 판정</div>
          <div className={`mt-1 text-3xl font-bold ${VERDICT_TEXT[tone]}`}>{report.verdict}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-xs text-slate-300">정비 타당성 점수</div>
            <div className="text-2xl font-bold">{report.feasibilityScore}</div>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              report.dataSource === "api"
                ? "bg-blue-500/20 text-blue-200"
                : "bg-slate-500/30 text-slate-200"
            }`}
          >
            {report.dataSource === "api" ? "국가법령정보 API 실연동" : "시드 데이터"}
          </span>
        </div>
      </div>

      {/* 종합 의견 */}
      <Section title="🧑‍⚖️ 수석 검토관(AI) 종합 의견">
        <p className="font-medium text-slate-800">{report.summary}</p>
        <p className="mt-2 text-blue-700">▶ {report.recommendation}</p>
      </Section>

      {/* 입법형식 판단 */}
      <Section title="📐 입법형식 판단">{report.formNote}</Section>

      {/* 법적 정합성 */}
      <Section title="⚖️ 법적 정합성">
        <span
          className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${RISK_COLOR[report.conflictRisk]}`}
        >
          충돌 위험 {report.conflictRisk}
        </span>
        <p className="mt-2">{report.legalFitNote}</p>
        {report.conflicts.length === 0 ? (
          <p className="mt-2 text-slate-400">충돌 항목 없음</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {report.conflicts.map((c, i) => (
              <li key={i}>
                <span className="font-medium text-slate-800">{c.law}</span>
                <span className="text-slate-500"> — {c.detail}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* 관련 법령 */}
      <Section title="📚 관련 현행 법령">
        {report.relatedLaws.length === 0 ? (
          <span className="text-slate-400">조회된 법령이 없습니다.</span>
        ) : (
          <ul className="space-y-1">
            {report.relatedLaws.map((l) => (
              <li key={l.id} className="flex flex-wrap items-center gap-2">
                {l.link ? (
                  <a
                    href={l.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 underline"
                  >
                    {l.name}
                  </a>
                ) : (
                  <span className="font-medium">{l.name}</span>
                )}
                {l.ministry && <span className="text-xs text-slate-400">{l.ministry}</span>}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* 법령해석례 (유권해석) */}
      {report.interpretations.length > 0 && (
        <Section title="📑 법령해석례 (유권해석)">
          <ul className="space-y-2">
            {report.interpretations.map((it) => (
              <li key={it.id}>
                {it.link ? (
                  <a
                    href={it.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 underline"
                  >
                    {it.title}
                  </a>
                ) : (
                  <span className="font-medium text-slate-800">{it.title}</span>
                )}
                <p className="text-xs text-slate-500">
                  {[it.caseNo, it.agency, it.date].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 헌재결정례 (사법 리스크) */}
      {report.constitutionalCases.length > 0 && (
        <Section title="🏛️ 헌재결정례 (사법 리스크)">
          <ul className="space-y-2">
            {report.constitutionalCases.map((c) => (
              <li key={c.id}>
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 underline"
                  >
                    <span className="font-bold">{c.caseNo}</span> {c.title}
                  </a>
                ) : (
                  <span>
                    <span className="font-bold text-slate-800">{c.caseNo}</span> {c.title}
                  </span>
                )}
                {c.date && <p className="text-xs text-slate-500">{c.date}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 자치법규 (조례/규칙) */}
      {report.ordinances.length > 0 && (
        <Section title="🏛 관련 자치법규 (조례·규칙)">
          <ul className="space-y-1">
            {report.ordinances.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-2">
                {o.link ? (
                  <a
                    href={o.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 underline"
                  >
                    {o.name}
                  </a>
                ) : (
                  <span className="font-medium">{o.name}</span>
                )}
                {o.region && <span className="text-xs text-slate-400">{o.region}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 행정 영향 */}
      <Section title="🏢 행정 영향">{report.adminNote}</Section>

      {/* 타당성 4축 + 기여도 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Section title="타당성 4축 점수">
          <div className="space-y-3">
            <ScoreBar label="법적 정합성" value={report.scores.legalFit} />
            <ScoreBar label="유권해석 부합" value={report.scores.precedentSupport} />
            <ScoreBar label="사법 안전성" value={report.scores.judicialSafety} />
            <ScoreBar label="시행령 실현가능성" value={report.scores.feasibility} />
          </div>
        </Section>
        <Section title="타당성 기여도 (XAI)">
          <div className="space-y-2">
            {report.contributions.map((c) => (
              <ContributionBar key={c.label} label={c.label} weight={c.weight} />
            ))}
          </div>
        </Section>
      </div>

      {report.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {report.keywords.map((k) => (
            <span
              key={k}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
            >
              #{k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
