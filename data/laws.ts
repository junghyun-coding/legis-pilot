import type { LawHit } from "@/types";

// 국가법령정보 공유 서비스 API 실패/미설정 시 폴백으로 쓰는 시드 법령.
// 실제 존재하는 현행 법령명으로 구성한다 (할루시네이션 방지 컨셉 유지).
// keywords 는 제안 텍스트 매칭용 (API 응답에는 없는 보조 필드).
export interface SeedLaw extends LawHit {
  keywords: string[];
}

export const SEED_LAWS: SeedLaw[] = [
  {
    id: "001768",
    name: "도로교통법",
    ministry: "경찰청",
    promulgated: "20230104",
    enforced: "20230704",
    link: "https://www.law.go.kr/법령/도로교통법",
    source: "seed",
    keywords: ["음주운전", "운전", "면허", "교통", "단속", "처벌", "도로"],
  },
  {
    id: "001234",
    name: "식품위생법",
    ministry: "식품의약품안전처",
    promulgated: "20220615",
    enforced: "20221216",
    link: "https://www.law.go.kr/법령/식품위생법",
    source: "seed",
    keywords: ["식품", "위생", "음식점", "영업", "배달", "위생점검"],
  },
  {
    id: "002345",
    name: "소상공인 보호 및 지원에 관한 법률",
    ministry: "중소벤처기업부",
    promulgated: "20210720",
    enforced: "20220121",
    link: "https://www.law.go.kr/법령/소상공인보호및지원에관한법률",
    source: "seed",
    keywords: ["소상공인", "자영업", "상권", "지원", "임대료", "골목상권"],
  },
  {
    id: "003456",
    name: "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률",
    ministry: "행정안전부",
    promulgated: "20200211",
    enforced: "20200812",
    link: "https://www.law.go.kr/법령/옥외광고물등의관리와옥외광고산업진흥에관한법률",
    source: "seed",
    keywords: ["간판", "광고물", "옥외광고", "현수막", "상가"],
  },
  {
    id: "004567",
    name: "주차장법",
    ministry: "국토교통부",
    promulgated: "20211228",
    enforced: "20220629",
    link: "https://www.law.go.kr/법령/주차장법",
    source: "seed",
    keywords: ["주차", "주차장", "주정차", "불법주차", "주차요금"],
  },
  {
    id: "005678",
    name: "개인정보 보호법",
    ministry: "개인정보보호위원회",
    promulgated: "20230314",
    enforced: "20230915",
    link: "https://www.law.go.kr/법령/개인정보보호법",
    source: "seed",
    keywords: ["개인정보", "프라이버시", "정보보호", "동의", "수집", "cctv"],
  },
];

// 제안 텍스트와 키워드 매칭으로 관련 시드 법령을 고른다 (폴백 경로).
export function matchSeedLaws(text: string, limit = 4): SeedLaw[] {
  const lower = text.toLowerCase();
  const scored = SEED_LAWS.map((law) => {
    const score = law.keywords.reduce(
      (acc, kw) => (lower.includes(kw.toLowerCase()) ? acc + 1 : acc),
      0,
    );
    return { law, score };
  });
  const matched = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  // 매칭이 하나도 없으면 대표 법령 일부라도 보여줘 데모가 비지 않게 한다.
  const picked = matched.length > 0 ? matched : scored.slice(0, 2);
  return picked.slice(0, limit).map((s) => s.law);
}
