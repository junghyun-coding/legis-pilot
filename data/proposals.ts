import type { Proposal } from "@/types";

// 대시보드 초기 표시용 제안.
// 실제 /api/analyze 결과(국가법령정보 4종 실연동)를 고정 스냅샷으로 저장한 것이라
// 인용 법령·해석례·헌재·조례 링크가 모두 law.go.kr 원문으로 연결된다.
export const SEED_PROPOSALS: Proposal[] = [
  {
    "id": "seed-1",
    "title": "음주운전 초범 처벌을 완화해 주세요",
    "body": "생계형 운전자의 경우 단 한 번의 실수로 면허가 취소되면 생계가 막막합니다. 초범에 한해 처벌을 낮춰주세요.",
    "submittedAt": "2026-05-26T09:12:00.000Z",
    "status": "검토완료",
    "report": {
      "keywords": [
        "음주운전",
        "초범",
        "처벌 완화",
        "생계형 운전자"
      ],
      "verdict": "정비 부적합",
      "summary": "음주운전 초범에 대한 처벌 완화 제안은 법률적 근거가 부족하며, 형벌 강화와 관련된 사항으로 법적 정합성이 낮습니다.",
      "recommendation": "법률 개정이 필요하므로 소관 부처와 협의하여 보다 구체적인 대안을 모색해야 합니다.",
      "formNote": "제안 내용은 시행령 정비로 실현하기 어려우며, 법률 개정이 필요합니다.",
      "legalFitNote": "도로교통법 제44조에 따라 음주운전의 처벌은 법률에 명시되어 있어, 시행령으로 처벌을 완화하는 것은 법적 정합성이 없습니다.",
      "conflictRisk": "높음",
      "conflicts": [
        {
          "law": "도로교통법",
          "detail": "제44조에 따라 음주운전의 처벌이 규정되어 있어, 초범에 대한 처벌 완화는 법률과 충돌함."
        }
      ],
      "adminNote": "행정적으로도 음주운전 처벌 완화는 사회적 안전과 관련된 문제로 집행에 부정적인 영향을 미칠 수 있습니다.",
      "relatedLaws": [
        {
          "id": "000105",
          "name": "교통시설특별회계법",
          "ministry": "국토교통부",
          "promulgated": "20251001",
          "enforced": "20260102",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=276947&type=HTML&mobileYn=&efYd=20260102",
          "source": "api"
        },
        {
          "id": "001638",
          "name": "도로교통법",
          "ministry": "경찰청",
          "promulgated": "20251230",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=281875&type=HTML&mobileYn=&efYd=20260402",
          "source": "api"
        },
        {
          "id": "003395",
          "name": "도로교통법 시행령",
          "ministry": "경찰청",
          "promulgated": "20250318",
          "enforced": "20260319",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=269989&type=HTML&mobileYn=&efYd=20260319",
          "source": "api"
        },
        {
          "id": "007079",
          "name": "도로교통법 시행규칙",
          "ministry": "경찰청",
          "promulgated": "20260401",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=285317&type=HTML&mobileYn=&efYd=20260402",
          "source": "api"
        },
        {
          "id": "014605",
          "name": "한국도로교통공단법",
          "ministry": "경찰청",
          "promulgated": "20240130",
          "enforced": "20240731",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=259489&type=HTML&mobileYn=&efYd=20240731",
          "source": "api"
        }
      ],
      "interpretations": [
        {
          "id": "314839",
          "title": "경찰청 - 운전자가 호흡조사의 방법으로 다시 음주측정을 요구하는 경우에 경찰공무원이 반드시 이에 따라야 하는지(「도로교통법」 제44조 등 관련)",
          "caseNo": "14-0687",
          "agency": "법제처",
          "date": "2014.12.05",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=314839&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "331141",
          "title": "민원인 - 음주운전으로 사람을 상해하여 금고 이상의 형의 집행유예를 받은 경우, 그 위법 행위의 내용이 「공인중개사법」과는 관련이 없음에도 불구하고 중개사무소의 개설등록을 할 수 없는지 여부(「공인중개사법」 제10조제1항제5호 등 관련)",
          "caseNo": "17-0233",
          "agency": "법제처",
          "date": "2017.07.03",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=331141&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "343163",
          "title": "민원인 - 자전거 등을 음주운전한 공무원이 「도로교통법 시행령」 별표 8 제64호의2에 따른 범칙금을 낸 경우, 징계위원회는 해당 공무원에 대하여 「공무원 징계령 시행규칙」 별표 1의5 제1호가목에 따라 징계의결을 할 수 있는지 여부(「공무원 징계령 시행규칙」 별표 1의5 제1호가목 등 관련)",
          "caseNo": "26-0296",
          "agency": "법제처",
          "date": "2026.05.06",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=343163&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "343161",
          "title": "민원인 - 자전거 등을 음주운전한 공무원이 「도로교통법 시행령」 별표 8 제64호의2에 따른 범칙금을 낸 경우, 징계위원회는 해당 공무원에 대하여 「공무원 징계령 시행규칙」 별표 1의5 제1호가목에 따라 징계의결을 할 수 있는지 여부(「공무원 징계령 시행규칙」 별표 1의5 제1호가목 등 관련)",
          "caseNo": "26-0309",
          "agency": "법제처",
          "date": "2026.05.06",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=343161&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "327941",
          "title": "울산광역시 - 음주운전시 가중징계되는 “운전업무 관련 공무원”의 의미(「소방공무원 징계양정 등에 관한 규칙」 별표 1의2 등 관련)",
          "caseNo": "16-0251",
          "agency": "법제처",
          "date": "2016.06.27",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=327941&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "constitutionalCases": [
        {
          "id": "134605",
          "caseNo": "2002헌마293",
          "title": "무작위음주운전단속 위헌확인",
          "date": "2004.01.29",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=134605&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "193763",
          "caseNo": "2024헌마814",
          "title": "음주운전 삼진아웃제 적용 취소",
          "date": "2024.10.02",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=193763&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "ordinances": [
        {
          "id": "2239703",
          "name": "광주광역시 남구 음주운전 예방 및 피해아동 지원 조례",
          "region": "광주광역시 남구",
          "kind": "조례",
          "enforced": "20231229",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1894029&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2258185",
          "name": "광주광역시 서구 음주운전 예방과 근절에 관한 조례",
          "region": "광주광역시 서구",
          "kind": "조례",
          "enforced": "20251111",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2084207&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2259279",
          "name": "광주시 음주운전 예방과 근절에 관한 조례",
          "region": "경기도 광주시",
          "kind": "조례",
          "enforced": "20251218",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2093997&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2253119",
          "name": "남동구 음주운전 예방에 관한 조례",
          "region": "인천광역시 남동구",
          "kind": "조례",
          "enforced": "20250512",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2036241&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2238875",
          "name": "남양주시 음주운전 예방과 근절에 관한 조례",
          "region": "경기도 남양주시",
          "kind": "조례",
          "enforced": "20231219",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1883319&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "scores": {
        "legalFit": 20,
        "precedentSupport": 30,
        "judicialSafety": 30,
        "feasibility": 20
      },
      "feasibilityScore": 25,
      "contributions": [
        {
          "label": "법적 정합성",
          "weight": -0.21
        },
        {
          "label": "사법 안전성",
          "weight": -0.12
        },
        {
          "label": "시행령 실현가능성",
          "weight": -0.09
        },
        {
          "label": "유권해석 부합",
          "weight": -0.08
        }
      ],
      "dataSource": "api"
    }
  },
  {
    "id": "seed-2",
    "title": "어린이보호구역 심야 시간대 속도제한을 완화해 주세요",
    "body": "자정부터 새벽까지는 통학 차량이 없는데도 시속 30km 제한이 그대로라 과도합니다. 심야 시간대만 속도제한을 완화해 주세요.",
    "submittedAt": "2026-05-27T16:40:00.000Z",
    "status": "검토완료",
    "report": {
      "keywords": [
        "어린이보호구역",
        "속도제한",
        "심야",
        "통학 차량"
      ],
      "verdict": "정비 부적합",
      "summary": "어린이 보호구역의 심야 시간대 속도제한 완화 제안은 기존 법령과 충돌할 가능성이 있으며, 법적 정합성이 낮고 사법 리스크가 존재합니다.",
      "recommendation": "소관 부처와 협의하여 법률 개정의 필요성을 검토할 것을 권고합니다.",
      "formNote": "이 제안은 시행령 정비만으로는 실현이 어려워 법률 개정이 필요합니다.",
      "legalFitNote": "도로교통법 제12조에 따라 어린이 보호구역 내 속도 제한은 법적으로 정해져 있어, 이를 완화하는 것은 법적 정합성이 낮습니다.",
      "conflictRisk": "높음",
      "conflicts": [
        {
          "law": "도로교통법",
          "detail": "제12조에 따라 어린이 보호구역 내 속도 제한이 정해져 있어, 심야 시간대 속도제한 완화는 법령과 충돌합니다."
        }
      ],
      "adminNote": "행정적으로도 어린이 보호구역의 안전성을 고려할 때, 속도제한 완화는 집행에 어려움을 초래할 수 있습니다.",
      "relatedLaws": [
        {
          "id": "000105",
          "name": "교통시설특별회계법",
          "ministry": "국토교통부",
          "promulgated": "20251001",
          "enforced": "20260102",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=276947&type=HTML&mobileYn=&efYd=20260102",
          "source": "api"
        },
        {
          "id": "001638",
          "name": "도로교통법",
          "ministry": "경찰청",
          "promulgated": "20251230",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=281875&type=HTML&mobileYn=&efYd=20260402",
          "source": "api"
        },
        {
          "id": "003395",
          "name": "도로교통법 시행령",
          "ministry": "경찰청",
          "promulgated": "20250318",
          "enforced": "20260319",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=269989&type=HTML&mobileYn=&efYd=20260319",
          "source": "api"
        },
        {
          "id": "007079",
          "name": "도로교통법 시행규칙",
          "ministry": "경찰청",
          "promulgated": "20260401",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=285317&type=HTML&mobileYn=&efYd=20260402",
          "source": "api"
        },
        {
          "id": "014605",
          "name": "한국도로교통공단법",
          "ministry": "경찰청",
          "promulgated": "20240130",
          "enforced": "20240731",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=259489&type=HTML&mobileYn=&efYd=20240731",
          "source": "api"
        }
      ],
      "interpretations": [
        {
          "id": "330995",
          "title": "경찰청 - 어린이 보호구역이 해제된 곳에서 적용되는 자동차의 통행속도(「도로교통법」 제12조 등 관련)",
          "caseNo": "17-0243",
          "agency": "법제처",
          "date": "2017.07.13",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=330995&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "332327",
          "title": "민원인 - 어린이 보호구역에 노상주차장이 설치되어 있는 경우 시장ㆍ군수 또는 구청장은 노상주차장을 의무적으로 폐지하여야 하는지 여부(「주차장법」 제7조제3항제3호 등 관련)",
          "caseNo": "21-0639",
          "agency": "법제처",
          "date": "2021.10.20",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=332327&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "constitutionalCases": [],
      "ordinances": [
        {
          "id": "2214760",
          "name": "가평군 어린이·노인 및 장애인 보호구역 교통안전 조례",
          "region": "경기도 가평군",
          "kind": "조례",
          "enforced": "20211227",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1656551&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2185791",
          "name": "강원특별자치도 어린이 보호구역 교통안전을 위한 조례",
          "region": "강원특별자치도",
          "kind": "조례",
          "enforced": "20230611",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1819581&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2022648",
          "name": "거제시 어린이ㆍ노인 및 장애인 보호구역 교통안전 관리에 관한 조례",
          "region": "경상남도 거제시",
          "kind": "조례",
          "enforced": "20241121",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1988047&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2155550",
          "name": "거창군 어린이·노인 및 장애인 교통안전 증진 조례",
          "region": "경상남도 거창군",
          "kind": "조례",
          "enforced": "20190403",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1389931&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2174330",
          "name": "계룡시 어린이·노인 및 장애인 보호구역 교통안전과 관리에 관한 조례",
          "region": "충청남도 계룡시",
          "kind": "조례",
          "enforced": "20170710",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1295017&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "scores": {
        "legalFit": 30,
        "precedentSupport": 0,
        "judicialSafety": 30,
        "feasibility": 20
      },
      "feasibilityScore": 23,
      "contributions": [
        {
          "label": "유권해석 부합",
          "weight": -0.2
        },
        {
          "label": "법적 정합성",
          "weight": -0.14
        },
        {
          "label": "사법 안전성",
          "weight": -0.12
        },
        {
          "label": "시행령 실현가능성",
          "weight": -0.09
        }
      ],
      "dataSource": "api"
    }
  },
  {
    "id": "seed-3",
    "title": "골목상권 소상공인 간판 교체 비용을 지원해 주세요",
    "body": "옥외광고물 규제가 강화되면서 간판을 바꿔야 하는데 비용이 부담됩니다. 소상공인 대상 교체 비용 지원이 필요합니다.",
    "submittedAt": "2026-05-28T14:30:00.000Z",
    "status": "검토완료",
    "report": {
      "keywords": [
        "골목상권",
        "소상공인",
        "간판",
        "교체 비용",
        "지원"
      ],
      "verdict": "정비 권고",
      "summary": "소상공인 간판 교체 비용 지원은 옥외광고물 관리법의 취지에 부합하며, 시행령 정비로 실현 가능성이 높습니다.",
      "recommendation": "행정안전부와 협의하여 구체적인 지원 방안을 마련할 것을 권고합니다.",
      "formNote": "이 제안은 시행령 정비로 가능할 것으로 보이며, 법률 개정은 필요하지 않을 것으로 판단됩니다.",
      "legalFitNote": "옥외광고물 관리법의 목적과 소상공인 지원의 필요성이 일치하여 법적 정합성이 높습니다.",
      "conflictRisk": "낮음",
      "conflicts": [],
      "adminNote": "소상공인 지원을 위한 행정적 부담이 증가할 수 있으나, 골목상권 활성화에 긍정적인 영향을 미칠 것으로 예상됩니다.",
      "relatedLaws": [
        {
          "id": "001020",
          "name": "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률",
          "ministry": "행정안전부",
          "promulgated": "20250814",
          "enforced": "20260215",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=273367&type=HTML&mobileYn=&efYd=20260215",
          "source": "api"
        },
        {
          "id": "004242",
          "name": "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률 시행령",
          "ministry": "행정안전부",
          "promulgated": "20260127",
          "enforced": "20260127",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=282903&type=HTML&mobileYn=&efYd=20260127",
          "source": "api"
        }
      ],
      "interpretations": [
        {
          "id": "i-003",
          "title": "옥외광고물 등의 관리 법령상 허가·신고 기준의 지자체 위임 가능 여부",
          "caseNo": "법제처 21-0233",
          "agency": "법제처",
          "date": "2021-06-18",
          "source": "seed"
        },
        {
          "id": "i-002",
          "title": "식품위생법상 영업시간 제한 처분의 위임 한계에 관한 건",
          "caseNo": "법제처 20-0115",
          "agency": "법제처",
          "date": "2020-04-12",
          "source": "seed"
        },
        {
          "id": "i-004",
          "title": "주차장법 부설주차장 설치의무 완화의 시행령 정비 가능 범위",
          "caseNo": "법제처 22-0087",
          "agency": "법제처",
          "date": "2022-03-22",
          "source": "seed"
        }
      ],
      "constitutionalCases": [
        {
          "id": "c-003",
          "caseNo": "2019헌마1399",
          "title": "옥외광고물 등 관리법 과태료 부과조항 위헌확인",
          "date": "2021-03-25",
          "source": "seed"
        },
        {
          "id": "c-002",
          "caseNo": "2020헌바471",
          "title": "식품위생법상 영업정지 처분 근거조항 위헌소원",
          "date": "2021-11-25",
          "source": "seed"
        }
      ],
      "ordinances": [
        {
          "id": "2231454",
          "name": "가평군 소상공인 지원 및 골목상권 공동체 육성 등에 관한 조례",
          "region": "경기도 가평군",
          "kind": "조례",
          "enforced": "20260420",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2124579&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2204756",
          "name": "경기도 골목상권 공동체 육성 및 활성화 지원 조례",
          "region": "경기도",
          "kind": "조례",
          "enforced": "20250101",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2007173&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2251143",
          "name": "경기도 전통시장 및 골목상권 매니저 운영 및 지원 조례",
          "region": "경기도",
          "kind": "조례",
          "enforced": "20250312",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2021095&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2260528",
          "name": "경상북도 골목상권 공동체 육성 및 활성화 지원 조례",
          "region": "경상북도",
          "kind": "조례",
          "enforced": "20260108",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2106903&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2031050",
          "name": "곡성군 소상공인 지원 조례",
          "region": "전라남도 곡성군",
          "kind": "조례",
          "enforced": "20250714",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2059483&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "scores": {
        "legalFit": 85,
        "precedentSupport": 70,
        "judicialSafety": 80,
        "feasibility": 90
      },
      "feasibilityScore": 81,
      "contributions": [
        {
          "label": "법적 정합성",
          "weight": 0.24
        },
        {
          "label": "사법 안전성",
          "weight": 0.18
        },
        {
          "label": "시행령 실현가능성",
          "weight": 0.12
        },
        {
          "label": "유권해석 부합",
          "weight": 0.08
        }
      ],
      "dataSource": "api"
    }
  },
  {
    "id": "seed-4",
    "title": "상가 밀집지역 불법 주정차 단속을 강화해 주세요",
    "body": "가게 앞에 불법 주차된 차량 때문에 손님이 못 옵니다. 상권 보호를 위해 단속을 강화해 주세요.",
    "submittedAt": "2026-05-29T08:05:00.000Z",
    "status": "검토완료",
    "report": {
      "keywords": [
        "상가 밀집지역",
        "불법 주정차",
        "단속 강화",
        "상권 보호"
      ],
      "verdict": "조건부 검토",
      "summary": "상가 밀집지역의 불법 주정차 단속 강화는 상권 보호를 위한 필요성이 있으나, 법적 근거와 집행 형평성에 대한 논란이 있을 수 있습니다.",
      "recommendation": "소관 부처와 협의하여 단속 강화 방안을 모색할 필요가 있습니다.",
      "formNote": "시행령 정비로 단속을 강화하는 방안은 가능할 수 있으나, 법률 개정이 필요할 수도 있습니다.",
      "legalFitNote": "도로교통법 및 시행령에 따라 불법 주정차 단속의 법적 근거가 있으나, 단속 강화가 기존 규정과 충돌할 가능성이 있습니다.",
      "conflictRisk": "보통",
      "conflicts": [
        {
          "law": "도로교통법",
          "detail": "제32조에 따른 주정차 금지 구역 지정 및 단속 기준과의 충돌 가능성"
        }
      ],
      "adminNote": "단속 강화로 인해 행정 부담이 증가할 수 있으며, 집행의 형평성 문제가 발생할 수 있습니다.",
      "relatedLaws": [
        {
          "id": "000105",
          "name": "교통시설특별회계법",
          "ministry": "국토교통부",
          "promulgated": "20251001",
          "enforced": "20260102",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=276947&type=HTML&mobileYn=&efYd=20260102",
          "source": "api"
        },
        {
          "id": "001638",
          "name": "도로교통법",
          "ministry": "경찰청",
          "promulgated": "20251230",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=281875&type=HTML&mobileYn=&efYd=20260402",
          "source": "api"
        },
        {
          "id": "003395",
          "name": "도로교통법 시행령",
          "ministry": "경찰청",
          "promulgated": "20250318",
          "enforced": "20260319",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=269989&type=HTML&mobileYn=&efYd=20260319",
          "source": "api"
        },
        {
          "id": "007079",
          "name": "도로교통법 시행규칙",
          "ministry": "경찰청",
          "promulgated": "20260401",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=285317&type=HTML&mobileYn=&efYd=20260402",
          "source": "api"
        },
        {
          "id": "014605",
          "name": "한국도로교통공단법",
          "ministry": "경찰청",
          "promulgated": "20240130",
          "enforced": "20240731",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=law&MST=259489&type=HTML&mobileYn=&efYd=20240731",
          "source": "api"
        }
      ],
      "interpretations": [
        {
          "id": "i-004",
          "title": "주차장법 부설주차장 설치의무 완화의 시행령 정비 가능 범위",
          "caseNo": "법제처 22-0087",
          "agency": "법제처",
          "date": "2022-03-22",
          "source": "seed"
        },
        {
          "id": "i-001",
          "title": "도로교통법 제44조에 따른 음주운전 단속 및 처벌 기준의 적용 범위",
          "caseNo": "법제처 19-0421",
          "agency": "법제처",
          "date": "2019-09-30",
          "source": "seed"
        },
        {
          "id": "i-003",
          "title": "옥외광고물 등의 관리 법령상 허가·신고 기준의 지자체 위임 가능 여부",
          "caseNo": "법제처 21-0233",
          "agency": "법제처",
          "date": "2021-06-18",
          "source": "seed"
        }
      ],
      "constitutionalCases": [
        {
          "id": "c-003",
          "caseNo": "2019헌마1399",
          "title": "옥외광고물 등 관리법 과태료 부과조항 위헌확인",
          "date": "2021-03-25",
          "source": "seed"
        }
      ],
      "ordinances": [
        {
          "id": "o-003",
          "name": "부산광역시 주차장 설치 및 관리 조례",
          "region": "부산광역시",
          "kind": "조례",
          "enforced": "20220105",
          "source": "seed"
        },
        {
          "id": "o-001",
          "name": "서울특별시 옥외광고물 등 관리 조례",
          "region": "서울특별시",
          "kind": "조례",
          "enforced": "20220701",
          "source": "seed"
        },
        {
          "id": "o-002",
          "name": "서울특별시 소상공인 보호 및 지원에 관한 조례",
          "region": "서울특별시",
          "kind": "조례",
          "enforced": "20210311",
          "source": "seed"
        }
      ],
      "scores": {
        "legalFit": 60,
        "precedentSupport": 50,
        "judicialSafety": 55,
        "feasibility": 65
      },
      "feasibilityScore": 57,
      "contributions": [
        {
          "label": "법적 정합성",
          "weight": 0.07
        },
        {
          "label": "시행령 실현가능성",
          "weight": 0.05
        },
        {
          "label": "사법 안전성",
          "weight": 0.03
        },
        {
          "label": "유권해석 부합",
          "weight": 0
        }
      ],
      "dataSource": "api"
    }
  }
];
