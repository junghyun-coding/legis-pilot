import type { Proposal } from "@/types";

// 대시보드 초기 표시용 제안 4건.
// 실제 /api/analyze(국가법령정보 4종 실연동) 결과를 고정 스냅샷으로 저장한 것이라
// 인용 법령·해석례·헌재·조례가 모두 실존 데이터이며 law.go.kr 공개뷰어 원문으로 연결된다.
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
        "처벌",
        "면허",
        "생계형 운전자"
      ],
      "verdict": "정비 부적합",
      "summary": "음주운전 초범에 대한 처벌 완화 제안은 도로교통법의 기본 원칙과 충돌할 가능성이 높아 법적 타당성이 낮습니다.",
      "recommendation": "해당 제안은 법률 개정이 필요하므로, 소관 부처와의 협의를 권고합니다.",
      "formNote": "음주운전 처벌 완화는 법률에 명시된 사항으로, 시행령 정비만으로는 실현이 어렵습니다.",
      "legalFitNote": "도로교통법 제44조는 음주운전의 처벌을 규정하고 있어, 초범에 대한 처벌 완화는 법적 정합성을 결여합니다.",
      "conflictRisk": "높음",
      "conflicts": [
        {
          "law": "도로교통법",
          "detail": "제44조에 따라 음주운전은 처벌 대상이며, 초범에 대한 처벌 완화는 법령의 취지와 상충합니다."
        }
      ],
      "adminNote": "행정적으로도 음주운전 처벌 완화는 집행의 일관성을 해칠 수 있습니다.",
      "relatedLaws": [
        {
          "id": "001638",
          "name": "도로교통법",
          "ministry": "경찰청",
          "promulgated": "20251230",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=281875",
          "source": "api"
        },
        {
          "id": "003395",
          "name": "도로교통법 시행령",
          "ministry": "경찰청",
          "promulgated": "20260609",
          "enforced": "20260609",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=286789",
          "source": "api"
        },
        {
          "id": "007079",
          "name": "도로교통법 시행규칙",
          "ministry": "경찰청",
          "promulgated": "20260401",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=285317",
          "source": "api"
        },
        {
          "id": "014605",
          "name": "한국도로교통공단법",
          "ministry": "경찰청",
          "promulgated": "20240130",
          "enforced": "20240731",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=259489",
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
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=314839",
          "source": "api"
        },
        {
          "id": "331141",
          "title": "민원인 - 음주운전으로 사람을 상해하여 금고 이상의 형의 집행유예를 받은 경우, 그 위법 행위의 내용이 「공인중개사법」과는 관련이 없음에도 불구하고 중개사무소의 개설등록을 할 수 없는지 여부(「공인중개사법」 제10조제1항제5호 등 관련)",
          "caseNo": "17-0233",
          "agency": "법제처",
          "date": "2017.07.03",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=331141",
          "source": "api"
        },
        {
          "id": "343163",
          "title": "민원인 - 자전거 등을 음주운전한 공무원이 「도로교통법 시행령」 별표 8 제64호의2에 따른 범칙금을 낸 경우, 징계위원회는 해당 공무원에 대하여 「공무원 징계령 시행규칙」 별표 1의5 제1호가목에 따라 징계의결을 할 수 있는지 여부(「공무원 징계령 시행규칙」 별표 1의5 제1호가목 등 관련)",
          "caseNo": "26-0296",
          "agency": "법제처",
          "date": "2026.05.06",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=343163",
          "source": "api"
        },
        {
          "id": "343161",
          "title": "민원인 - 자전거 등을 음주운전한 공무원이 「도로교통법 시행령」 별표 8 제64호의2에 따른 범칙금을 낸 경우, 징계위원회는 해당 공무원에 대하여 「공무원 징계령 시행규칙」 별표 1의5 제1호가목에 따라 징계의결을 할 수 있는지 여부(「공무원 징계령 시행규칙」 별표 1의5 제1호가목 등 관련)",
          "caseNo": "26-0309",
          "agency": "법제처",
          "date": "2026.05.06",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=343161",
          "source": "api"
        },
        {
          "id": "327941",
          "title": "울산광역시 - 음주운전시 가중징계되는 “운전업무 관련 공무원”의 의미(「소방공무원 징계양정 등에 관한 규칙」 별표 1의2 등 관련)",
          "caseNo": "16-0251",
          "agency": "법제처",
          "date": "2016.06.27",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=327941",
          "source": "api"
        }
      ],
      "constitutionalCases": [
        {
          "id": "134605",
          "caseNo": "2002헌마293",
          "title": "무작위음주운전단속 위헌확인",
          "date": "2004.01.29",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=134605",
          "source": "api"
        },
        {
          "id": "193763",
          "caseNo": "2024헌마814",
          "title": "음주운전 삼진아웃제 적용 취소",
          "date": "2024.10.02",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=193763",
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
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1894029",
          "source": "api"
        },
        {
          "id": "2259279",
          "name": "광주시 음주운전 예방과 근절에 관한 조례",
          "region": "경기도 광주시",
          "kind": "조례",
          "enforced": "20251218",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=2093997",
          "source": "api"
        },
        {
          "id": "2253119",
          "name": "남동구 음주운전 예방에 관한 조례",
          "region": "인천광역시 남동구",
          "kind": "조례",
          "enforced": "20250512",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=2036241",
          "source": "api"
        },
        {
          "id": "2238875",
          "name": "남양주시 음주운전 예방과 근절에 관한 조례",
          "region": "경기도 남양주시",
          "kind": "조례",
          "enforced": "20231219",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1883319",
          "source": "api"
        },
        {
          "id": "2253639",
          "name": "대구광역시 군위군 음주운전 예방에 관한 조례",
          "region": "대구광역시 군위군",
          "kind": "조례",
          "enforced": "20250526",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=2041491",
          "source": "api"
        }
      ],
      "scores": {
        "legalFit": 20,
        "precedentSupport": 0,
        "judicialSafety": 30,
        "feasibility": 20
      },
      "feasibilityScore": 19,
      "contributions": [
        {
          "label": "법적 정합성",
          "weight": -0.21
        },
        {
          "label": "유권해석 부합",
          "weight": -0.2
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
    "id": "seed-2",
    "title": "어린이보호구역 심야 시간대 속도제한을 완화해 주세요",
    "body": "자정부터 새벽까지는 통학 차량이 없는데도 시속 30km 제한이 그대로라 과도합니다. 심야 시간대만 속도제한을 완화해 주세요.",
    "submittedAt": "2026-05-27T16:40:00.000Z",
    "status": "검토완료",
    "report": {
      "keywords": [
        "어린이보호구역",
        "속도제한",
        "심야 시간대",
        "통학 차량"
      ],
      "verdict": "정비 부적합",
      "summary": "어린이 보호구역의 심야 시간대 속도제한 완화 제안은 도로교통법의 기본 취지와 충돌할 가능성이 있으며, 법적 정합성이 낮아 타당성이 부족합니다.",
      "recommendation": "권고 (소관 부처와 협의하여 대안 모색 필요)",
      "formNote": "법률 개정이 필요할 것으로 보이며, 시행령 정비만으로는 실현이 어려울 것입니다.",
      "legalFitNote": "도로교통법 제12조는 어린이 보호구역 내에서의 안전을 강조하고 있어, 심야 시간대 속도제한 완화는 법적 정합성이 낮습니다.",
      "conflictRisk": "높음",
      "conflicts": [
        {
          "law": "도로교통법",
          "detail": "제12조에 따라 어린이 보호구역 내에서의 속도제한 규정과 충돌할 가능성이 있음"
        }
      ],
      "adminNote": "행정적으로 어린이 보호구역의 안전성을 저해할 수 있는 우려가 있어 집행에 어려움이 있을 수 있습니다.",
      "relatedLaws": [
        {
          "id": "001638",
          "name": "도로교통법",
          "ministry": "경찰청",
          "promulgated": "20251230",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=281875",
          "source": "api"
        },
        {
          "id": "003395",
          "name": "도로교통법 시행령",
          "ministry": "경찰청",
          "promulgated": "20260609",
          "enforced": "20260609",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=286789",
          "source": "api"
        },
        {
          "id": "007079",
          "name": "도로교통법 시행규칙",
          "ministry": "경찰청",
          "promulgated": "20260401",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=285317",
          "source": "api"
        },
        {
          "id": "014605",
          "name": "한국도로교통공단법",
          "ministry": "경찰청",
          "promulgated": "20240130",
          "enforced": "20240731",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=259489",
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
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=330995",
          "source": "api"
        },
        {
          "id": "332327",
          "title": "민원인 - 어린이 보호구역에 노상주차장이 설치되어 있는 경우 시장ㆍ군수 또는 구청장은 노상주차장을 의무적으로 폐지하여야 하는지 여부(「주차장법」 제7조제3항제3호 등 관련)",
          "caseNo": "21-0639",
          "agency": "법제처",
          "date": "2021.10.20",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=332327",
          "source": "api"
        }
      ],
      "constitutionalCases": [
        {
          "id": "137520",
          "caseNo": "2007헌바66",
          "title": "구 도로교통법 제101조의 3 등  위헌소원",
          "date": "2008.10.30",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=137520",
          "source": "api"
        },
        {
          "id": "17670",
          "caseNo": "2011헌가30",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2011.11.24",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=17670",
          "source": "api"
        },
        {
          "id": "52663",
          "caseNo": "2016헌가10",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2016.10.27",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=52663",
          "source": "api"
        },
        {
          "id": "41665",
          "caseNo": "2014헌가14",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2014.11.27",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=41665",
          "source": "api"
        },
        {
          "id": "150765",
          "caseNo": "2017헌가28",
          "title": "구 도로교통법 제148조 위헌제청",
          "date": "2019.04.11",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=150765",
          "source": "api"
        }
      ],
      "ordinances": [
        {
          "id": "2214760",
          "name": "가평군 어린이·노인 및 장애인 보호구역 교통안전 조례",
          "region": "경기도 가평군",
          "kind": "조례",
          "enforced": "20211227",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1656551",
          "source": "api"
        },
        {
          "id": "2185791",
          "name": "강원특별자치도 어린이 보호구역 교통안전을 위한 조례",
          "region": "강원특별자치도",
          "kind": "조례",
          "enforced": "20230611",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1819581",
          "source": "api"
        },
        {
          "id": "2022648",
          "name": "거제시 어린이ㆍ노인 및 장애인 보호구역 교통안전 관리에 관한 조례",
          "region": "경상남도 거제시",
          "kind": "조례",
          "enforced": "20241121",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1988047",
          "source": "api"
        },
        {
          "id": "2155550",
          "name": "거창군 어린이·노인 및 장애인 교통안전 증진 조례",
          "region": "경상남도 거창군",
          "kind": "조례",
          "enforced": "20190403",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1389931",
          "source": "api"
        },
        {
          "id": "2174330",
          "name": "계룡시 어린이·노인 및 장애인 보호구역 교통안전과 관리에 관한 조례",
          "region": "충청남도 계룡시",
          "kind": "조례",
          "enforced": "20170710",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1295017",
          "source": "api"
        }
      ],
      "scores": {
        "legalFit": 30,
        "precedentSupport": 0,
        "judicialSafety": 40,
        "feasibility": 20
      },
      "feasibilityScore": 26,
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
          "label": "시행령 실현가능성",
          "weight": -0.09
        },
        {
          "label": "사법 안전성",
          "weight": -0.06
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
      "summary": "소상공인 간판 교체 비용 지원은 옥외광고물법의 취지에 부합하며, 시행령 정비로 실현 가능성이 높습니다.",
      "recommendation": "행정안전부와 협의하여 구체적인 지원 방안을 마련할 것을 권고합니다.",
      "formNote": "이 제안은 시행령 정비로 가능하며, 법률 개정이 필요하지 않습니다.",
      "legalFitNote": "옥외광고물법은 광고물의 설치 및 관리에 관한 규정을 두고 있으며, 소상공인 지원을 위한 시행령 정비는 법의 취지에 부합합니다.",
      "conflictRisk": "낮음",
      "conflicts": [],
      "adminNote": "소상공인 지원을 위한 행정적 부담이 증가할 수 있으나, 지역 경제 활성화에 기여할 수 있습니다.",
      "relatedLaws": [
        {
          "id": "001020",
          "name": "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률",
          "ministry": "행정안전부",
          "promulgated": "20250814",
          "enforced": "20260215",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=273367",
          "source": "api"
        },
        {
          "id": "004242",
          "name": "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률 시행령",
          "ministry": "행정안전부",
          "promulgated": "20260127",
          "enforced": "20260127",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=282903",
          "source": "api"
        }
      ],
      "interpretations": [
        {
          "id": "338817",
          "title": "국토교통부, 행정안전부 - 옥외광고물법에 따라 설치 허가를 받은 광고탑의 경우 「건축법」에 따라 공작물 축조 신고를 해야 하는지(「건축법」 제83조제1항 등 관련)",
          "caseNo": "24-0249",
          "agency": "법제처",
          "date": "2024.06.05",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=338817",
          "source": "api"
        },
        {
          "id": "338813",
          "title": "국토교통부, 행정안전부 - 옥외광고물법에 따라 설치 허가를 받은 광고탑의 경우 「건축법」에 따라 공작물 축조 신고를 해야 하는지(「건축법」 제83조제1항 등 관련)",
          "caseNo": "24-0340",
          "agency": "법제처",
          "date": "2024.06.05",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=338813",
          "source": "api"
        },
        {
          "id": "324867",
          "title": "기장군 - 현수막을 표시ㆍ설치할 수 있는 기간(「옥외광고물 등 관리법」 제8조제4호 등 관련)",
          "caseNo": "13-0524",
          "agency": "법제처",
          "date": "2013.12.11",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=324867",
          "source": "api"
        },
        {
          "id": "322605",
          "title": "대전광역시 동구청 - 구청장이 육교를 공공목적 광고물 표시가 가능한 편익시설물로 지정할 수 있는지 여부(「옥외광고물등 관리법 시행령」 제26조제1항제5호 관련)",
          "caseNo": "09-0246",
          "agency": "법제처",
          "date": "2009.09.04",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=322605",
          "source": "api"
        },
        {
          "id": "324273",
          "title": "민원인 - 경찰이 범죄예방 등을 위하여 주거지역에 붙인 안내문의 「옥외광고물 등 관리법」 위반 여부(「옥외광고물 등 관리법」 제8조 등 관련)",
          "caseNo": "11-0234",
          "agency": "법제처",
          "date": "2011.07.07",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=324273",
          "source": "api"
        }
      ],
      "constitutionalCases": [
        {
          "id": "171463",
          "caseNo": "2019헌마327",
          "title": "구 옥외광고물 등 관리법 시행령 제19조 제1항 등 위헌확인",
          "date": "2022.01.27",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=171463",
          "source": "api"
        },
        {
          "id": "135423",
          "caseNo": "96헌바2",
          "title": "옥외광고물등관리법 제3조  위헌소원",
          "date": "1998.02.27",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=135423",
          "source": "api"
        },
        {
          "id": "134492",
          "caseNo": "2000헌마764",
          "title": "옥외광고물등관리법 제3조 제1항 제6호 등 위헌확인",
          "date": "2002.12.18",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=134492",
          "source": "api"
        },
        {
          "id": "184689",
          "caseNo": "2023헌마893",
          "title": "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률 개정 위헌확인",
          "date": "2023.08.08",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=184689",
          "source": "api"
        },
        {
          "id": "189795",
          "caseNo": "2024헌바79",
          "title": "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률 제8조 위헌소원",
          "date": "2024.04.02",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=189795",
          "source": "api"
        }
      ],
      "ordinances": [
        {
          "id": "2231454",
          "name": "가평군 소상공인 지원 및 골목상권 공동체 육성 등에 관한 조례",
          "region": "경기도 가평군",
          "kind": "조례",
          "enforced": "20260420",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=2124579",
          "source": "api"
        },
        {
          "id": "2204756",
          "name": "경기도 골목상권 공동체 육성 및 활성화 지원 조례",
          "region": "경기도",
          "kind": "조례",
          "enforced": "20250101",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=2007173",
          "source": "api"
        },
        {
          "id": "2251143",
          "name": "경기도 전통시장 및 골목상권 매니저 운영 및 지원 조례",
          "region": "경기도",
          "kind": "조례",
          "enforced": "20250312",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=2021095",
          "source": "api"
        },
        {
          "id": "2260528",
          "name": "경상북도 골목상권 공동체 육성 및 활성화 지원 조례",
          "region": "경상북도",
          "kind": "조례",
          "enforced": "20260108",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=2106903",
          "source": "api"
        },
        {
          "id": "2031050",
          "name": "곡성군 소상공인 지원 조례",
          "region": "전라남도 곡성군",
          "kind": "조례",
          "enforced": "20250714",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=2059483",
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
    "status": "검토중",
    "report": {
      "keywords": [
        "상가 밀집지역",
        "불법 주정차",
        "단속 강화",
        "상권 보호"
      ],
      "verdict": "정비 권고",
      "summary": "상가 밀집지역의 불법 주정차 단속 강화는 도로교통법에 근거하여 가능하나, 구체적인 단속 기준 및 절차에 대한 시행령 정비가 필요할 것으로 보입니다.",
      "recommendation": "경찰청과 협의하여 시행령 정비 방안을 모색할 것을 권고합니다.",
      "formNote": "이 제안은 시행령 정비로 가능하며, 법률 개정은 필요하지 않습니다.",
      "legalFitNote": "도로교통법 제32조에 따라 불법 주정차에 대한 단속이 가능하므로 법적 정합성이 높습니다.",
      "conflictRisk": "낮음",
      "conflicts": [],
      "adminNote": "단속 강화에 따른 행정 부담이 증가할 수 있으나, 상권 보호를 위한 필요성이 있습니다.",
      "relatedLaws": [
        {
          "id": "001638",
          "name": "도로교통법",
          "ministry": "경찰청",
          "promulgated": "20251230",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=281875",
          "source": "api"
        },
        {
          "id": "003395",
          "name": "도로교통법 시행령",
          "ministry": "경찰청",
          "promulgated": "20260609",
          "enforced": "20260609",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=286789",
          "source": "api"
        },
        {
          "id": "007079",
          "name": "도로교통법 시행규칙",
          "ministry": "경찰청",
          "promulgated": "20260401",
          "enforced": "20260402",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=285317",
          "source": "api"
        },
        {
          "id": "014605",
          "name": "한국도로교통공단법",
          "ministry": "경찰청",
          "promulgated": "20240130",
          "enforced": "20240731",
          "link": "https://www.law.go.kr/lsInfoP.do?lsiSeq=259489",
          "source": "api"
        }
      ],
      "interpretations": [
        {
          "id": "313774",
          "title": "경기도 안산시 - 버스가 버스정류장에서 배차간격 조정 또는 중식의 사유로 10분 이상 정차 또는 주차한 경우 「도로교통법」상 정차 또는 주차 금지의무 위반이 되는지 여부(「도로교통법」 제32조 등 관련)",
          "caseNo": "11-0149",
          "agency": "법제처",
          "date": "2011.04.28",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=313774",
          "source": "api"
        },
        {
          "id": "312229",
          "title": "경기도 - 「질서위반행위규제법」 제16조에 따른 의견제출을 할 기회를 준 결과 주·정차위반행위를 한 운전자가 밝혀진 경우 시장·군수 등이 과태료를 부과하여야 하는지 여부(「도로교통법」 제32조 등 관련)",
          "caseNo": "12-0035",
          "agency": "법제처",
          "date": "2012.02.09",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=312229",
          "source": "api"
        },
        {
          "id": "312532",
          "title": "경상남도 거제시 - 「지방자치단체를 당사자로 하는 계약에 관한 법률 시행령」 제25조제8호다목(도로교통안전관리공단의 특수법인 여부) 관련",
          "caseNo": "07-0294",
          "agency": "법제처",
          "date": "2007.10.01",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=312532",
          "source": "api"
        },
        {
          "id": "311421",
          "title": "경찰청 - 결격기간의 부여 요건으로서 형의 선고가 없는 경우, 운전면허 취소의 가부(「도로교통법」 제82조제2항제4호 관련)",
          "caseNo": "09-0115",
          "agency": "법제처",
          "date": "2009.05.19",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=311421",
          "source": "api"
        },
        {
          "id": "312530",
          "title": "경찰청 - 「도로교통법」 제141조(지도 및 감독 등)  관련",
          "caseNo": "07-0385",
          "agency": "법제처",
          "date": "2007.12.28",
          "link": "https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=312530",
          "source": "api"
        }
      ],
      "constitutionalCases": [
        {
          "id": "137520",
          "caseNo": "2007헌바66",
          "title": "구 도로교통법 제101조의 3 등  위헌소원",
          "date": "2008.10.30",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=137520",
          "source": "api"
        },
        {
          "id": "17670",
          "caseNo": "2011헌가30",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2011.11.24",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=17670",
          "source": "api"
        },
        {
          "id": "52663",
          "caseNo": "2016헌가10",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2016.10.27",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=52663",
          "source": "api"
        },
        {
          "id": "41665",
          "caseNo": "2014헌가14",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2014.11.27",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=41665",
          "source": "api"
        },
        {
          "id": "150765",
          "caseNo": "2017헌가28",
          "title": "구 도로교통법 제148조 위헌제청",
          "date": "2019.04.11",
          "link": "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=150765",
          "source": "api"
        }
      ],
      "ordinances": [
        {
          "id": "2019725",
          "name": "가평군 도로점용공사장 교통소통 대책에 관한 조례",
          "region": "경기도 가평군",
          "kind": "조례",
          "enforced": "20260420",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=2124621",
          "source": "api"
        },
        {
          "id": "2020564",
          "name": "강릉시 주차위반자동차 견인 등 소요비용산정 기준에 관한 조례",
          "region": "강원특별자치도 강릉시",
          "kind": "조례",
          "enforced": "20230412",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1800233",
          "source": "api"
        },
        {
          "id": "2236813",
          "name": "강원특별자치도 도로점용공사장 교통소통대책에 관한 조례",
          "region": "강원특별자치도",
          "kind": "조례",
          "enforced": "20230927",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1862755",
          "source": "api"
        },
        {
          "id": "2021768",
          "name": "강진군 주정차 위반차량 견인보관의 소요비용 산정에 관한 조례",
          "region": "전라남도 강진군",
          "kind": "조례",
          "enforced": "20231005",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1860741",
          "source": "api"
        },
        {
          "id": "2022830",
          "name": "거제시 주차위반자동차 등의 견인에 관한 조례",
          "region": "경상남도 거제시",
          "kind": "조례",
          "enforced": "20161129",
          "link": "https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=1265973",
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
  }
];
