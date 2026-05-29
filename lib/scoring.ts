import type { ScoreAxes, Contribution, Verdict } from "@/types";

// 타당성 4축을 가중합해 시행령 정비 타당성 점수(0~100)를 산출한다.
// 법적 정합성과 사법 안전성을 가장 크게 둔다 (충돌·위헌 리스크가 정비 가부의 핵심).
const WEIGHTS: Record<keyof ScoreAxes, number> = {
  legalFit: 0.35,
  judicialSafety: 0.3,
  precedentSupport: 0.2,
  feasibility: 0.15,
};

const LABELS: Record<keyof ScoreAxes, string> = {
  legalFit: "법적 정합성",
  judicialSafety: "사법 안전성",
  precedentSupport: "유권해석 부합",
  feasibility: "시행령 실현가능성",
};

export function computeFeasibility(scores: ScoreAxes): number {
  const sum = (Object.keys(WEIGHTS) as (keyof ScoreAxes)[]).reduce(
    (acc, k) => acc + scores[k] * WEIGHTS[k],
    0,
  );
  return Math.round(sum);
}

// XAI 흉내: 각 축이 타당성 점수를 평균(50) 대비 얼마나 끌어올렸/내렸는지 기여도로 환산.
export function explainContributions(scores: ScoreAxes): Contribution[] {
  return (Object.keys(WEIGHTS) as (keyof ScoreAxes)[])
    .map((k) => ({
      label: LABELS[k],
      weight: Math.round(((scores[k] - 50) / 50) * WEIGHTS[k] * 100) / 100,
    }))
    .sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));
}

export function verdictFromScore(score: number): Verdict {
  if (score >= 68) return "정비 권고";
  if (score >= 45) return "조건부 검토";
  return "정비 부적합";
}

export function verdictTone(verdict: Verdict): "good" | "warn" | "bad" {
  if (verdict === "정비 권고") return "good";
  if (verdict === "조건부 검토") return "warn";
  return "bad";
}
