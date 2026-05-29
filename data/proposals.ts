import type { Proposal } from "@/types";

// 대시보드 초기 표시용 제안.
// 실제 /api/analyze 결과(국가법령정보 4종 실연동)를 고정 스냅샷으로 저장한 것이라
// 인용 법령·해석례·헌재·조례 링크가 모두 law.go.kr 원문으로 연결된다.
export const SEED_PROPOSALS: Proposal[] = [
  {
    "id": "seed-1",
    "title": "음주운전 초범 처벌을 완화해 주세요",
    "body": "생계형 운전자의 경우 단 한 번의 실수로 면허가 취소되면 생계가 막막합니다. 초범에 한해 처벌을 낮춰주세요.",
    "submittedAt": "2026-05-27T09:12:00.000Z",
    "status": "검토완료",
    "report": {
      "keywords": [
        "음주운전",
        "초범",
        "처벌 완화",
        "생계형 운전자"
      ],
      "verdict": "정비 부적합",
      "summary": "음주운전 초범에 대한 처벌 완화는 도로교통법의 규정과 충돌하며, 법률 개정이 필요하므로 법적 타당성이 낮습니다.",
      "recommendation": "법률 개정을 통해 음주운전 초범에 대한 처벌 완화 방안을 검토할 것을 권고합니다.",
      "formNote": "제안 내용은 시행령 정비로는 실현이 불가능하며, 법률 개정이 필요합니다.",
      "legalFitNote": "도로교통법 제44조에 따르면 음주운전은 엄격히 금지되며, 초범에 대한 처벌 완화는 법적 정합성을 갖지 않습니다.",
      "conflictRisk": "높음",
      "conflicts": [
        {
          "law": "도로교통법",
          "detail": "제44조에 따라 음주운전은 처벌 대상이며, 초범에 대한 처벌 완화는 법령의 취지와 상충함."
        }
      ],
      "adminNote": "행정적으로도 음주운전 처벌 완화는 공공 안전에 대한 우려를 초래할 수 있습니다.",
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
          "id": "313774",
          "title": "경기도 안산시 - 버스가 버스정류장에서 배차간격 조정 또는 중식의 사유로 10분 이상 정차 또는 주차한 경우 「도로교통법」상 정차 또는 주차 금지의무 위반이 되는지 여부(「도로교통법」 제32조 등 관련)",
          "caseNo": "11-0149",
          "agency": "법제처",
          "date": "2011.04.28",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=313774&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "312229",
          "title": "경기도 - 「질서위반행위규제법」 제16조에 따른 의견제출을 할 기회를 준 결과 주·정차위반행위를 한 운전자가 밝혀진 경우 시장·군수 등이 과태료를 부과하여야 하는지 여부(「도로교통법」 제32조 등 관련)",
          "caseNo": "12-0035",
          "agency": "법제처",
          "date": "2012.02.09",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=312229&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "312532",
          "title": "경상남도 거제시 - 「지방자치단체를 당사자로 하는 계약에 관한 법률 시행령」 제25조제8호다목(도로교통안전관리공단의 특수법인 여부) 관련",
          "caseNo": "07-0294",
          "agency": "법제처",
          "date": "2007.10.01",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=312532&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "311421",
          "title": "경찰청 - 결격기간의 부여 요건으로서 형의 선고가 없는 경우, 운전면허 취소의 가부(「도로교통법」 제82조제2항제4호 관련)",
          "caseNo": "09-0115",
          "agency": "법제처",
          "date": "2009.05.19",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=311421&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "312530",
          "title": "경찰청 - 「도로교통법」 제141조(지도 및 감독 등)  관련",
          "caseNo": "07-0385",
          "agency": "법제처",
          "date": "2007.12.28",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=312530&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "constitutionalCases": [
        {
          "id": "137520",
          "caseNo": "2007헌바66",
          "title": "구 도로교통법 제101조의 3 등  위헌소원",
          "date": "2008.10.30",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=137520&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "52663",
          "caseNo": "2016헌가10",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2016.10.27",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=52663&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "41665",
          "caseNo": "2014헌가14",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2014.11.27",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=41665&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "17670",
          "caseNo": "2011헌가30",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2011.11.24",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=17670&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "150765",
          "caseNo": "2017헌가28",
          "title": "구 도로교통법 제148조 위헌제청",
          "date": "2019.04.11",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=150765&type=HTML&mobileYn=",
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
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2124621&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2020564",
          "name": "강릉시 주차위반자동차 견인 등 소요비용산정 기준에 관한 조례",
          "region": "강원특별자치도 강릉시",
          "kind": "조례",
          "enforced": "20230412",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1800233&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2236813",
          "name": "강원특별자치도 도로점용공사장 교통소통대책에 관한 조례",
          "region": "강원특별자치도",
          "kind": "조례",
          "enforced": "20230927",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1862755&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2021768",
          "name": "강진군 주정차 위반차량 견인보관의 소요비용 산정에 관한 조례",
          "region": "전라남도 강진군",
          "kind": "조례",
          "enforced": "20231005",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1860741&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2022830",
          "name": "거제시 주차위반자동차 등의 견인에 관한 조례",
          "region": "경상남도 거제시",
          "kind": "조례",
          "enforced": "20161129",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1265973&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "scores": {
        "legalFit": 20,
        "precedentSupport": 0,
        "judicialSafety": 20,
        "feasibility": 20
      },
      "feasibilityScore": 16,
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
          "weight": -0.18
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
      "summary": "소상공인 간판 교체 비용 지원은 옥외광고물법의 취지에 부합하며, 시행령 정비로 가능할 것으로 보입니다.",
      "recommendation": "행정안전부와 협의하여 구체적인 지원 방안을 마련할 것을 권고합니다.",
      "formNote": "해당 제안은 시행령 정비로 실현 가능할 것으로 판단됩니다.",
      "legalFitNote": "옥외광고물법은 광고물의 설치 및 관리에 관한 규정을 두고 있으며, 소상공인을 위한 지원은 법의 취지와 일치합니다.",
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
          "id": "338817",
          "title": "국토교통부, 행정안전부 - 옥외광고물법에 따라 설치 허가를 받은 광고탑의 경우 「건축법」에 따라 공작물 축조 신고를 해야 하는지(「건축법」 제83조제1항 등 관련)",
          "caseNo": "24-0249",
          "agency": "법제처",
          "date": "2024.06.05",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=338817&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "338813",
          "title": "국토교통부, 행정안전부 - 옥외광고물법에 따라 설치 허가를 받은 광고탑의 경우 「건축법」에 따라 공작물 축조 신고를 해야 하는지(「건축법」 제83조제1항 등 관련)",
          "caseNo": "24-0340",
          "agency": "법제처",
          "date": "2024.06.05",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=338813&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "324867",
          "title": "기장군 - 현수막을 표시ㆍ설치할 수 있는 기간(「옥외광고물 등 관리법」 제8조제4호 등 관련)",
          "caseNo": "13-0524",
          "agency": "법제처",
          "date": "2013.12.11",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=324867&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "322605",
          "title": "대전광역시 동구청 - 구청장이 육교를 공공목적 광고물 표시가 가능한 편익시설물로 지정할 수 있는지 여부(「옥외광고물등 관리법 시행령」 제26조제1항제5호 관련)",
          "caseNo": "09-0246",
          "agency": "법제처",
          "date": "2009.09.04",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=322605&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "324273",
          "title": "민원인 - 경찰이 범죄예방 등을 위하여 주거지역에 붙인 안내문의 「옥외광고물 등 관리법」 위반 여부(「옥외광고물 등 관리법」 제8조 등 관련)",
          "caseNo": "11-0234",
          "agency": "법제처",
          "date": "2011.07.07",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=324273&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "constitutionalCases": [
        {
          "id": "171463",
          "caseNo": "2019헌마327",
          "title": "구 옥외광고물 등 관리법 시행령 제19조 제1항 등 위헌확인",
          "date": "2022.01.27",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=171463&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "135423",
          "caseNo": "96헌바2",
          "title": "옥외광고물등관리법 제3조  위헌소원",
          "date": "1998.02.27",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=135423&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "134492",
          "caseNo": "2000헌마764",
          "title": "옥외광고물등관리법 제3조 제1항 제6호 등 위헌확인",
          "date": "2002.12.18",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=134492&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "184689",
          "caseNo": "2023헌마893",
          "title": "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률 개정 위헌확인",
          "date": "2023.08.08",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=184689&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "189795",
          "caseNo": "2024헌바79",
          "title": "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률 제8조 위헌소원",
          "date": "2024.04.02",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=189795&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "ordinances": [
        {
          "id": "2019869",
          "name": "가평군 옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 조례",
          "region": "경기도 가평군",
          "kind": "조례",
          "enforced": "20260420",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2124537&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2019870",
          "name": "가평군 옥외광고발전기금 설치 및 운용 조례",
          "region": "경기도 가평군",
          "kind": "조례",
          "enforced": "20260420",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2124587&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2020149",
          "name": "강릉시 각종 위원회 구성 및 운영 조례",
          "region": "강원특별자치도 강릉시",
          "kind": "조례",
          "enforced": "20201230",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1560905&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2233697",
          "name": "강릉시 옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 조례",
          "region": "강원특별자치도 강릉시",
          "kind": "조례",
          "enforced": "20230719",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1839625&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2151250",
          "name": "강릉시 옥외광고발전기금 설치 및 운용 조례",
          "region": "강원특별자치도 강릉시",
          "kind": "조례",
          "enforced": "20251001",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2075001&type=HTML&mobileYn=",
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
    "id": "seed-3",
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
      "summary": "상가 밀집지역의 불법 주정차 단속 강화는 상권 보호를 위한 필요성이 있으나, 법적 근거와 시행 가능성에 대한 검토가 필요합니다.",
      "recommendation": "소관 부처와 협의하여 단속 강화 방안을 모색할 것을 권고합니다.",
      "formNote": "시행령 정비로 단속 강화를 실현할 수 있을 것으로 보입니다.",
      "legalFitNote": "도로교통법 제32조에 따라 불법 주정차에 대한 단속이 가능하므로 법적 정합성이 높습니다.",
      "conflictRisk": "낮음",
      "conflicts": [],
      "adminNote": "단속 강화로 인해 행정적 부담이 증가할 수 있으나, 상권 보호를 위한 필요성이 큽니다.",
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
          "id": "313774",
          "title": "경기도 안산시 - 버스가 버스정류장에서 배차간격 조정 또는 중식의 사유로 10분 이상 정차 또는 주차한 경우 「도로교통법」상 정차 또는 주차 금지의무 위반이 되는지 여부(「도로교통법」 제32조 등 관련)",
          "caseNo": "11-0149",
          "agency": "법제처",
          "date": "2011.04.28",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=313774&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "312229",
          "title": "경기도 - 「질서위반행위규제법」 제16조에 따른 의견제출을 할 기회를 준 결과 주·정차위반행위를 한 운전자가 밝혀진 경우 시장·군수 등이 과태료를 부과하여야 하는지 여부(「도로교통법」 제32조 등 관련)",
          "caseNo": "12-0035",
          "agency": "법제처",
          "date": "2012.02.09",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=312229&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "312532",
          "title": "경상남도 거제시 - 「지방자치단체를 당사자로 하는 계약에 관한 법률 시행령」 제25조제8호다목(도로교통안전관리공단의 특수법인 여부) 관련",
          "caseNo": "07-0294",
          "agency": "법제처",
          "date": "2007.10.01",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=312532&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "311421",
          "title": "경찰청 - 결격기간의 부여 요건으로서 형의 선고가 없는 경우, 운전면허 취소의 가부(「도로교통법」 제82조제2항제4호 관련)",
          "caseNo": "09-0115",
          "agency": "법제처",
          "date": "2009.05.19",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=311421&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "312530",
          "title": "경찰청 - 「도로교통법」 제141조(지도 및 감독 등)  관련",
          "caseNo": "07-0385",
          "agency": "법제처",
          "date": "2007.12.28",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=expc&ID=312530&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "constitutionalCases": [
        {
          "id": "137520",
          "caseNo": "2007헌바66",
          "title": "구 도로교통법 제101조의 3 등  위헌소원",
          "date": "2008.10.30",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=137520&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "52663",
          "caseNo": "2016헌가10",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2016.10.27",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=52663&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "41665",
          "caseNo": "2014헌가14",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2014.11.27",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=41665&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "17670",
          "caseNo": "2011헌가30",
          "title": "구 도로교통법 제116조 위헌제청",
          "date": "2011.11.24",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=17670&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "150765",
          "caseNo": "2017헌가28",
          "title": "구 도로교통법 제148조 위헌제청",
          "date": "2019.04.11",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=detc&ID=150765&type=HTML&mobileYn=",
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
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=2124621&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2020564",
          "name": "강릉시 주차위반자동차 견인 등 소요비용산정 기준에 관한 조례",
          "region": "강원특별자치도 강릉시",
          "kind": "조례",
          "enforced": "20230412",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1800233&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2236813",
          "name": "강원특별자치도 도로점용공사장 교통소통대책에 관한 조례",
          "region": "강원특별자치도",
          "kind": "조례",
          "enforced": "20230927",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1862755&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2021768",
          "name": "강진군 주정차 위반차량 견인보관의 소요비용 산정에 관한 조례",
          "region": "전라남도 강진군",
          "kind": "조례",
          "enforced": "20231005",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1860741&type=HTML&mobileYn=",
          "source": "api"
        },
        {
          "id": "2022830",
          "name": "거제시 주차위반자동차 등의 견인에 관한 조례",
          "region": "경상남도 거제시",
          "kind": "조례",
          "enforced": "20161129",
          "link": "https://www.law.go.kr/DRF/lawService.do?OC=sapphire_5&target=ordin&MST=1265973&type=HTML&mobileYn=",
          "source": "api"
        }
      ],
      "scores": {
        "legalFit": 80,
        "precedentSupport": 70,
        "judicialSafety": 80,
        "feasibility": 75
      },
      "feasibilityScore": 77,
      "contributions": [
        {
          "label": "법적 정합성",
          "weight": 0.21
        },
        {
          "label": "사법 안전성",
          "weight": 0.18
        },
        {
          "label": "유권해석 부합",
          "weight": 0.08
        },
        {
          "label": "시행령 실현가능성",
          "weight": 0.08
        }
      ],
      "dataSource": "api"
    }
  }
];
