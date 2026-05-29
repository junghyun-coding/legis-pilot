import type { InterpretationHit } from "@/types";

// 법령해석례 시드 (API 실패/미설정 시 폴백). 실제 유권해석 형식으로 구성.
export interface SeedInterpretation extends InterpretationHit {
  keywords: string[];
}

export const SEED_INTERPRETATIONS: SeedInterpretation[] = [
  {
    id: "i-001",
    title: "도로교통법 제44조에 따른 음주운전 단속 및 처벌 기준의 적용 범위",
    caseNo: "법제처 19-0421",
    agency: "법제처",
    date: "2019-09-30",
    link: "https://www.law.go.kr/expc/",
    source: "seed",
    keywords: ["음주운전", "운전", "면허", "처벌", "도로", "단속"],
  },
  {
    id: "i-002",
    title: "식품위생법상 영업시간 제한 처분의 위임 한계에 관한 건",
    caseNo: "법제처 20-0115",
    agency: "법제처",
    date: "2020-04-12",
    link: "https://www.law.go.kr/expc/",
    source: "seed",
    keywords: ["식품", "영업", "음식점", "소상공인", "자영업"],
  },
  {
    id: "i-003",
    title: "옥외광고물 등의 관리 법령상 허가·신고 기준의 지자체 위임 가능 여부",
    caseNo: "법제처 21-0233",
    agency: "법제처",
    date: "2021-06-18",
    link: "https://www.law.go.kr/expc/",
    source: "seed",
    keywords: ["간판", "광고물", "옥외광고", "상가"],
  },
  {
    id: "i-004",
    title: "주차장법 부설주차장 설치의무 완화의 시행령 정비 가능 범위",
    caseNo: "법제처 22-0087",
    agency: "법제처",
    date: "2022-03-22",
    link: "https://www.law.go.kr/expc/",
    source: "seed",
    keywords: ["주차", "주차장", "주정차", "상권"],
  },
];

export function matchInterpretations(keywords: string[], limit = 3): InterpretationHit[] {
  const lowered = keywords.map((k) => k.toLowerCase()).filter(Boolean);
  const scored = SEED_INTERPRETATIONS.map((it) => {
    const score = it.keywords.reduce(
      (acc, kw) =>
        lowered.some((k) => k.includes(kw) || kw.includes(k)) ? acc + 1 : acc,
      0,
    );
    return { it, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ it }) => {
      // 폴백 시 keywords 필드는 노출하지 않는다 (InterpretationHit 형태로 반환)
      const { keywords: _kw, ...hit } = it;
      void _kw;
      return hit;
    });
}
