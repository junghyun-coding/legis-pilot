import type { Proposal } from "@/types";

// 대시보드가 비지 않도록 미리 접수된 샘플 제안 + 내장 타당성 리포트.
// 사용자가 새로 제출하는 제안은 localStorage 에 누적되어 이 목록과 병합된다.
// (feasibilityScore / verdict / contributions 는 lib/scoring 공식과 일치하게 산정)
export const SEED_PROPOSALS: Proposal[] = [
  {
    id: "seed-1",
    title: "음주운전 초범 처벌을 완화해 주세요",
    body: "생계형 운전자의 경우 단 한 번의 실수로 면허가 취소되면 생계가 막막합니다. 초범에 한해 처벌을 낮춰주세요.",
    submittedAt: "2026-05-27T09:12:00.000Z",
    status: "검토완료",
    report: {
      keywords: ["음주운전", "면허", "처벌"],
      verdict: "정비 부적합",
      summary:
        "상위법의 처벌체계와 정면 충돌하고 헌재가 합헌으로 본 영역이라 시행령 정비 대상으로는 부적합합니다.",
      recommendation: "처벌 완화보다 재범 방지 프로그램 연계를 경찰청과 협의 권고",
      formNote:
        "처벌 수위 조정은 법률이 정할 사항이라 시행령만으로는 불가능하며, 추진하려면 법률 개정이 필요합니다.",
      legalFitNote:
        "도로교통법 제44조(음주운전 금지) 및 제148조의2 가중처벌 체계와 충돌합니다.",
      conflictRisk: "높음",
      conflicts: [
        {
          law: "도로교통법",
          detail: "제44조·제148조의2의 음주운전 처벌·면허취소 체계와 직접 충돌",
        },
      ],
      adminNote: "처벌 기준 변경은 단속·행정 절차 전반의 재정비를 수반합니다.",
      relatedLaws: [
        {
          id: "001768",
          name: "도로교통법",
          ministry: "경찰청",
          promulgated: "20230104",
          enforced: "20230704",
          link: "https://www.law.go.kr/법령/도로교통법",
          source: "seed",
        },
      ],
      interpretations: [
        {
          id: "i-001",
          title: "도로교통법 제44조에 따른 음주운전 단속 및 처벌 기준의 적용 범위",
          caseNo: "법제처 19-0421",
          agency: "법제처",
          date: "2019-09-30",
          link: "https://www.law.go.kr/expc/",
          source: "seed",
        },
      ],
      constitutionalCases: [
        {
          id: "c-001",
          caseNo: "2021헌가30",
          title: "도로교통법 제148조의2 제1항 위헌제청 (음주운전 가중처벌)",
          date: "2022-08-31",
          link: "https://www.law.go.kr/detc/",
          source: "seed",
        },
      ],
      ordinances: [],
      scores: { legalFit: 28, precedentSupport: 42, judicialSafety: 35, feasibility: 40 },
      feasibilityScore: 35,
      contributions: [
        { label: "법적 정합성", weight: -0.15 },
        { label: "사법 안전성", weight: -0.09 },
        { label: "유권해석 부합", weight: -0.03 },
        { label: "시행령 실현가능성", weight: -0.03 },
      ],
      dataSource: "seed",
    },
  },
  {
    id: "seed-2",
    title: "골목상권 소상공인 간판 교체 비용을 지원해 주세요",
    body: "옥외광고물 규제가 강화되면서 간판을 바꿔야 하는데 비용이 부담됩니다. 소상공인 대상 교체 비용 지원이 필요합니다.",
    submittedAt: "2026-05-28T14:30:00.000Z",
    status: "검토완료",
    report: {
      keywords: ["간판", "소상공인", "광고물"],
      verdict: "정비 권고",
      summary:
        "상위법 위임 범위 내에서 시행령·지원사업 정비로 실현 가능하고 충돌·사법 리스크가 낮은 타당한 제안입니다.",
      recommendation: "행정안전부·중소벤처기업부 공동 검토 — 기존 소상공인 지원사업에 결합 가능",
      formNote:
        "옥외광고물법·소상공인 지원법의 위임 범위 내에서 시행령·지원사업 정비로 대응 가능합니다.",
      legalFitNote:
        "옥외광고물법 및 소상공인 보호·지원법 테두리 내 지원근거 신설이 가능해 상위법 충돌이 낮습니다.",
      conflictRisk: "낮음",
      conflicts: [],
      adminNote: "지자체 매칭 사업 형태로 단계 도입 시 행정 부담을 분산할 수 있습니다.",
      relatedLaws: [
        {
          id: "003456",
          name: "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률",
          ministry: "행정안전부",
          promulgated: "20200211",
          enforced: "20200812",
          link: "https://www.law.go.kr/법령/옥외광고물등의관리와옥외광고산업진흥에관한법률",
          source: "seed",
        },
        {
          id: "002345",
          name: "소상공인 보호 및 지원에 관한 법률",
          ministry: "중소벤처기업부",
          promulgated: "20210720",
          enforced: "20220121",
          link: "https://www.law.go.kr/법령/소상공인보호및지원에관한법률",
          source: "seed",
        },
      ],
      interpretations: [
        {
          id: "i-003",
          title: "옥외광고물 등의 관리 법령상 허가·신고 기준의 지자체 위임 가능 여부",
          caseNo: "법제처 21-0233",
          agency: "법제처",
          date: "2021-06-18",
          link: "https://www.law.go.kr/expc/",
          source: "seed",
        },
      ],
      constitutionalCases: [
        {
          id: "c-003",
          caseNo: "2019헌마1399",
          title: "옥외광고물 등 관리법 과태료 부과조항 위헌확인",
          date: "2021-03-25",
          link: "https://www.law.go.kr/detc/",
          source: "seed",
        },
      ],
      ordinances: [
        {
          id: "o-001",
          name: "서울특별시 옥외광고물 등 관리 조례",
          region: "서울특별시",
          kind: "조례",
          enforced: "20220701",
          link: "https://www.law.go.kr/ordin/",
          source: "seed",
        },
        {
          id: "o-002",
          name: "서울특별시 소상공인 보호 및 지원에 관한 조례",
          region: "서울특별시",
          kind: "조례",
          enforced: "20210311",
          link: "https://www.law.go.kr/ordin/",
          source: "seed",
        },
      ],
      scores: { legalFit: 82, precedentSupport: 65, judicialSafety: 72, feasibility: 78 },
      feasibilityScore: 75,
      contributions: [
        { label: "법적 정합성", weight: 0.22 },
        { label: "사법 안전성", weight: 0.13 },
        { label: "시행령 실현가능성", weight: 0.08 },
        { label: "유권해석 부합", weight: 0.06 },
      ],
      dataSource: "seed",
    },
  },
  {
    id: "seed-3",
    title: "상가 밀집지역 불법 주정차 단속을 강화해 주세요",
    body: "가게 앞에 불법 주차된 차량 때문에 손님이 못 옵니다. 상권 보호를 위해 단속을 강화해 주세요.",
    submittedAt: "2026-05-29T08:05:00.000Z",
    status: "검토중",
    report: {
      keywords: ["주차", "주정차", "상권"],
      verdict: "조건부 검토",
      summary:
        "단속 강화의 법적 근거는 충분하나 시행령 정비 시 집행 형평성 검토가 필요한 조건부 타당 제안입니다.",
      recommendation: "국토교통부·경찰청·지자체 협의 — 단속 강화와 주차공간 확충 병행 검토",
      formNote:
        "주차장법·도로교통법의 위임 범위 내에서 시행령 차원 단속 기준 강화가 가능합니다.",
      legalFitNote: "주차장법·도로교통법상 단속 근거가 존재해 상위법 충돌은 크지 않습니다.",
      conflictRisk: "보통",
      conflicts: [],
      adminNote: "단속 인력·CCTV 확충 비용이 발생하나 과태료 수입과 일부 상계 가능합니다.",
      relatedLaws: [
        {
          id: "004567",
          name: "주차장법",
          ministry: "국토교통부",
          promulgated: "20211228",
          enforced: "20220629",
          link: "https://www.law.go.kr/법령/주차장법",
          source: "seed",
        },
      ],
      interpretations: [
        {
          id: "i-004",
          title: "주차장법 부설주차장 설치의무 완화의 시행령 정비 가능 범위",
          caseNo: "법제처 22-0087",
          agency: "법제처",
          date: "2022-03-22",
          link: "https://www.law.go.kr/expc/",
          source: "seed",
        },
      ],
      constitutionalCases: [],
      ordinances: [
        {
          id: "o-003",
          name: "부산광역시 주차장 설치 및 관리 조례",
          region: "부산광역시",
          kind: "조례",
          enforced: "20220105",
          link: "https://www.law.go.kr/ordin/",
          source: "seed",
        },
      ],
      scores: { legalFit: 70, precedentSupport: 55, judicialSafety: 60, feasibility: 58 },
      feasibilityScore: 62,
      contributions: [
        { label: "법적 정합성", weight: 0.14 },
        { label: "사법 안전성", weight: 0.06 },
        { label: "유권해석 부합", weight: 0.02 },
        { label: "시행령 실현가능성", weight: 0.02 },
      ],
      dataSource: "seed",
    },
  },
];
