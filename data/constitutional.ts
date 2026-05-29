import type { ConstitutionalHit } from "@/types";

// 헌재결정례 시드 (API 실패/미설정 시 폴백). 실제 사건 형식으로 구성.
export interface SeedConstitutional extends ConstitutionalHit {
  keywords: string[];
}

export const SEED_CONSTITUTIONAL: SeedConstitutional[] = [
  {
    id: "c-001",
    caseNo: "2021헌가30",
    title: "도로교통법 제148조의2 제1항 위헌제청 (음주운전 가중처벌)",
    date: "2022-08-31",
    link: "https://www.law.go.kr/detc/",
    source: "seed",
    keywords: ["음주운전", "운전", "면허", "처벌", "도로"],
  },
  {
    id: "c-002",
    caseNo: "2020헌바471",
    title: "식품위생법상 영업정지 처분 근거조항 위헌소원",
    date: "2021-11-25",
    link: "https://www.law.go.kr/detc/",
    source: "seed",
    keywords: ["식품", "영업", "음식점", "소상공인"],
  },
  {
    id: "c-003",
    caseNo: "2019헌마1399",
    title: "옥외광고물 등 관리법 과태료 부과조항 위헌확인",
    date: "2021-03-25",
    link: "https://www.law.go.kr/detc/",
    source: "seed",
    keywords: ["간판", "광고물", "옥외광고", "상가"],
  },
];

export function matchConstitutional(keywords: string[], limit = 3): ConstitutionalHit[] {
  const lowered = keywords.map((k) => k.toLowerCase()).filter(Boolean);
  const scored = SEED_CONSTITUTIONAL.map((c) => {
    const score = c.keywords.reduce(
      (acc, kw) =>
        lowered.some((k) => k.includes(kw) || kw.includes(k)) ? acc + 1 : acc,
      0,
    );
    return { c, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ c }) => {
      const { keywords: _kw, ...hit } = c;
      void _kw;
      return hit;
    });
}
