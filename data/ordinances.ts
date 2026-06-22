import type { OrdinanceHit } from "@/types";

// 자치법규(조례) 시드 (API 실패/미설정 시 폴백).
export interface SeedOrdinance extends OrdinanceHit {
  keywords: string[];
}

export const SEED_ORDINANCES: SeedOrdinance[] = [
  {
    id: "o-001",
    name: "서울특별시 옥외광고물 등 관리 조례",
    region: "서울특별시",
    kind: "조례",
    enforced: "20220701",
    source: "seed",
    keywords: ["간판", "광고물", "옥외광고", "상가"],
  },
  {
    id: "o-002",
    name: "서울특별시 소상공인 보호 및 지원에 관한 조례",
    region: "서울특별시",
    kind: "조례",
    enforced: "20210311",
    source: "seed",
    keywords: ["소상공인", "자영업", "상권", "지원"],
  },
  {
    id: "o-003",
    name: "부산광역시 주차장 설치 및 관리 조례",
    region: "부산광역시",
    kind: "조례",
    enforced: "20220105",
    source: "seed",
    keywords: ["주차", "주차장", "주정차", "상권"],
  },
];

export function matchOrdinances(keywords: string[], limit = 3): OrdinanceHit[] {
  const lowered = keywords.map((k) => k.toLowerCase()).filter(Boolean);
  const scored = SEED_ORDINANCES.map((o) => {
    const score = o.keywords.reduce(
      (acc, kw) =>
        lowered.some((k) => k.includes(kw) || kw.includes(k)) ? acc + 1 : acc,
      0,
    );
    return { o, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ o }) => {
      const { keywords: _kw, ...hit } = o;
      void _kw;
      return hit;
    });
}
