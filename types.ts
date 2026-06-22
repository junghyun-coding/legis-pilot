// 법령이음 공용 타입 — 법적 타당성 검토 중심

export type ProposalStatus = "접수" | "검토중" | "검토완료";

export interface Proposal {
  id: string;
  title: string;
  body: string;
  submittedAt: string; // ISO date
  status: ProposalStatus;
  report?: AnalysisReport;
}

// 국가법령정보 공유 서비스 — 법령(law)
export interface LawHit {
  id: string;
  name: string;
  ministry?: string;
  promulgated?: string;
  enforced?: string;
  link?: string;
  mst?: string; // 법령 본문(조문) 조회용 MST — 조문 RAG에 사용
  source: "api" | "seed";
}

// 법령해석례(expc) — 유권해석
export interface InterpretationHit {
  id: string;
  title: string; // 안건명
  caseNo?: string; // 안건번호
  agency?: string; // 회신기관명
  date?: string; // 회신일자
  link?: string;
  source: "api" | "seed";
}

// 헌재결정례(detc) — 사법 리스크
export interface ConstitutionalHit {
  id: string;
  caseNo: string; // 사건번호
  title: string; // 사건명
  date?: string; // 종국일자
  link?: string;
  source: "api" | "seed";
}

// 자치법규(ordin) — 조례/규칙 (지자체 정비 맥락)
export interface OrdinanceHit {
  id: string;
  name: string; // 자치법규명
  region?: string; // 지자체기관명
  kind?: string; // 자치법규종류 (조례/규칙)
  enforced?: string; // 시행일자
  link?: string;
  source: "api" | "seed";
}

// 타당성 4축 (0~100, 높을수록 정비 타당)
export interface ScoreAxes {
  legalFit: number; // 법적 정합성 (상위법 충돌 적을수록 높음)
  precedentSupport: number; // 유권해석·판례 부합도
  judicialSafety: number; // 사법 안전성 (위헌·무효 리스크 낮을수록 높음)
  feasibility: number; // 시행령 실현가능성 (법률 개정 불필요할수록 높음)
}

// XAI 흉내: 타당성 점수에 대한 변수별 기여도
export interface Contribution {
  label: string;
  weight: number; // -1.0 ~ +1.0
}

// 구체적 법령 충돌 항목
export interface Conflict {
  law: string; // 충돌 법령명
  detail: string; // 어느 조항/취지와 어떻게 충돌하는지
}

export type Verdict = "정비 권고" | "조건부 검토" | "정비 부적합";

export interface AnalysisReport {
  keywords: string[];
  verdict: Verdict; // 타당성 종합 판정 (강한 결론)
  summary: string; // 수석 검토관(AI) 종합 의견
  recommendation: string; // 권고 (소관 부처 협의/이관 등)
  formNote: string; // 입법형식 판단: 시행령 정비 가능 vs 법률 개정 필요
  legalFitNote: string; // 법적 정합성 설명
  conflictRisk: "낮음" | "보통" | "높음";
  conflicts: Conflict[]; // 구체적 충돌 (없으면 빈 배열)
  adminNote: string; // 행정 부담/집행 영향 (간단)
  relatedLaws: LawHit[]; // 실존 법령
  interpretations: InterpretationHit[]; // 법령해석례 (유권해석)
  constitutionalCases: ConstitutionalHit[]; // 헌재결정례 (사법 리스크)
  ordinances: OrdinanceHit[]; // 자치법규 (조례/규칙)
  scores: ScoreAxes;
  feasibilityScore: number; // 가중합 정비 타당성 점수 0~100
  contributions: Contribution[];
  dataSource: "api" | "seed"; // 법령 조회 출처
}
