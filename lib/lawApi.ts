import { XMLParser } from "fast-xml-parser";
import type { LawHit, InterpretationHit, ConstitutionalHit, OrdinanceHit } from "@/types";
import { buildPublicLink } from "@/lib/lawLink";
import { rerankLaws } from "@/lib/lawRerank";
import { matchSeedLaws } from "@/data/laws";

// 국가법령정보 공유 서비스 (공공데이터포털 1170000)
// 명세: 응답 XML only, 한글 태그. ServiceKey 는 encoding 값을 URL 에 그대로 삽입.
const BASE = "http://apis.data.go.kr/1170000/law/lawSearchList.do";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "__cdata",
  trimValues: true,
  // "00"→0, 법령ID "001768"→1768 같은 숫자 변환 방지 (앞자리 0 보존)
  parseTagValue: false,
});

// CDATA/일반 텍스트/숫자 어떤 형태든 문자열로 정규화
function asText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    if ("__cdata" in o) return String(o.__cdata).trim();
    return "";
  }
  return String(v).trim();
}


/**
 * 국가법령정보 공유 서비스에서 query 관련 현행 법령 목록을 조회한다.
 * 성공 시 LawHit[], 실패(키 없음/네트워크/파싱 오류)시 null 반환 → 상위에서 시드 폴백.
 */
async function fetchLawsFromApi(query: string, rows = 5): Promise<LawHit[] | null> {
  const key = process.env.LAW_API_KEY;
  if (!key) return null;

  // encoding 인증키는 이미 URL 인코딩되어 있으므로 직접 문자열로 삽입한다.
  // (URLSearchParams 를 쓰면 %2F 가 %252F 로 이중 인코딩됨)
  const url =
    `${BASE}?ServiceKey=${key}` +
    `&target=law&numOfRows=${rows}&pageNo=1` +
    `&query=${encodeURIComponent(query)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const xml = await res.text();
    const parsed = parser.parse(xml);
    const root = parsed?.LawSearch;
    if (!root || String(root.resultCode) !== "00") return null;

    let items = root.law;
    if (!items) return [];
    if (!Array.isArray(items)) items = [items];

    return items.map(
      (it: Record<string, unknown>): LawHit => ({
        id: asText(it["법령ID"]) || asText(it["법령일련번호"]),
        name: asText(it["법령명한글"]),
        ministry: asText(it["소관부처명"]) || undefined,
        promulgated: asText(it["공포일자"]) || undefined,
        enforced: asText(it["시행일자"]) || undefined,
        link: buildPublicLink({
          target: "law",
          name: asText(it["법령명한글"]),
          drfLink: asText(it["법령상세링크"]),
        }),
        mst: (asText(it["법령상세링크"]).match(/[?&]MST=(\d+)/) || [])[1],
        source: "api",
      }),
    );
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * 관련 법령 조회 (실연동 우선, 실패 시 시드 폴백).
 * query 로 API 검색, 결과가 없거나 실패하면 fallbackText 키워드로 시드 매칭.
 */
export async function getRelatedLaws(
  query: string,
  fallbackText: string,
  keywords: string[] = [],
): Promise<{ laws: LawHit[]; source: "api" | "seed" }> {
  const apiLaws = await fetchLawsFromApi(query);
  if (apiLaws && apiLaws.length > 0) {
    // API 결과에 한해 결정적 재랭킹/노이즈 강등 적용. 시드 폴백은 비파괴.
    return { laws: rerankLaws(apiLaws, query, keywords), source: "api" };
  }
  return { laws: matchSeedLaws(fallbackText), source: "seed" };
}

// 법령해석례 엔드포인트 (target=expc)
const EXPC_BASE = "http://apis.data.go.kr/1170000/law/expcSearchList.do";

/**
 * 법령해석례(유권해석) 조회. 성공 시 InterpretationHit[], 실패 시 null → 시드 폴백.
 */
async function fetchInterpretationsFromApi(
  query: string,
  rows = 5,
): Promise<InterpretationHit[] | null> {
  const key = process.env.LAW_API_KEY;
  if (!key) return null;

  // encoding 인증키는 이미 URL 인코딩되어 있으므로 직접 문자열로 삽입한다.
  const url =
    `${EXPC_BASE}?ServiceKey=${key}` +
    `&target=expc&numOfRows=${rows}&pageNo=1` +
    `&query=${encodeURIComponent(query)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const xml = await res.text();
    const parsed = parser.parse(xml);
    const root = parsed?.Expc;
    if (!root || String(root.resultCode) !== "00") return null;

    let items = root.expc;
    if (!items) return [];
    if (!Array.isArray(items)) items = [items];

    return items.map(
      (it: Record<string, unknown>): InterpretationHit => ({
        id: asText(it["법령해석례일련번호"]),
        title: asText(it["안건명"]),
        caseNo: asText(it["안건번호"]) || undefined,
        agency: asText(it["회신기관명"]) || undefined,
        date: asText(it["회신일자"]) || undefined,
        link: buildPublicLink({
          target: "expc",
          id: asText(it["법령해석례일련번호"]),
        }),
        source: "api",
      }),
    );
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// 행정·법률 제안에 흔해 단독으로는 변별력이 없는 광범위어.
// 이런 단어로 법령해석례를 검색하면 주제 무관 결과가 잡힌다
// (예: '피해자' → 가정폭력·이태원참사·법난 피해자 해석례). 관련성 기준에서 제외한다.
const GENERIC_INTERP_TERMS = new Set([
  "피해자", "피해", "지원", "예방", "보호", "강화", "완화", "신설", "폐지",
  "개선", "제도", "사업", "관리", "운영", "기준", "대상", "범위", "처벌",
  "단속", "안전", "정보", "서비스", "시설", "제한", "규정", "절차", "권한",
]);

// 안건명이 핵심 주제어(구체어) 중 하나라도 포함하면 관련으로 본다.
function interpMatchesAnchors(title: string, anchors: string[]): boolean {
  const lower = title.toLowerCase();
  return anchors.some((a) => lower.includes(a));
}

/**
 * 법령해석례 조회. 후보 검색어(주제어→법령도메인어→키워드)를 순차 시도해
 * 실연동 결과를 찾는다. 모두 0건이면 가짜 데이터 대신 빈 값(섹션 숨김) — 정직성 우선.
 *
 * 관련성 게이트: 법령해석례 검색은 안건명·본문을 폭넓게 매칭하므로, '피해자' 같은
 * 일반어로 폴백되면 주제 무관 해석례가 통째로 잡힌다. anchorTerms(제안의 구체적
 * 주제어)와 안건명이 실제로 부합하는 항목만 채택하고, 부합이 0이면 다음 후보로 넘긴다.
 */
export async function getInterpretations(
  queries: string[],
  anchorTerms: string[] = [],
): Promise<{ items: InterpretationHit[]; source: "api" | "seed" }> {
  // 변별력 있는 구체어만 관련성 기준으로 남긴다(일반어는 노이즈 매칭 유발).
  const anchors = [...new Set(anchorTerms.map((t) => t.trim().toLowerCase()))]
    .filter((t) => t.length >= 2 && !GENERIC_INTERP_TERMS.has(t));

  for (const q of queries) {
    if (!q) continue;
    const apiItems = await fetchInterpretationsFromApi(q);
    if (!apiItems || apiItems.length === 0) continue;
    // anchors 가 있으면 안건명이 구체어와 맞는 항목만. 통과 0이면(일반어 노이즈) 다음 후보로.
    const relevant = anchors.length
      ? apiItems.filter((it) => interpMatchesAnchors(it.title, anchors))
      : apiItems;
    if (relevant.length > 0) return { items: relevant, source: "api" };
  }
  return { items: [], source: "api" };
}

// 헌재결정례 엔드포인트 (target=detc)
const DETC_BASE = "http://apis.data.go.kr/1170000/law/detcSearchList.do";

/**
 * 헌재결정례 조회. 성공 시 ConstitutionalHit[], 실패 시 null → 시드 폴백.
 */
async function fetchConstitutionalFromApi(
  query: string,
  rows = 5,
): Promise<ConstitutionalHit[] | null> {
  const key = process.env.LAW_API_KEY;
  if (!key) return null;

  // encoding 인증키는 이미 URL 인코딩되어 있으므로 직접 문자열로 삽입한다.
  const url =
    `${DETC_BASE}?ServiceKey=${key}` +
    `&target=detc&numOfRows=${rows}&pageNo=1` +
    `&query=${encodeURIComponent(query)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const xml = await res.text();
    const parsed = parser.parse(xml);
    const root = parsed?.DetcSearch;
    if (!root || String(root.resultCode) !== "00") return null;

    let items = root.Detc;
    if (!items) return [];
    if (!Array.isArray(items)) items = [items];

    return items.map(
      (it: Record<string, unknown>): ConstitutionalHit => ({
        id: asText(it["헌재결정례일련번호"]),
        caseNo: asText(it["사건번호"]),
        title: asText(it["사건명"]),
        date: asText(it["종국일자"]) || undefined,
        link: buildPublicLink({
          target: "detc",
          id: asText(it["헌재결정례일련번호"]),
        }),
        source: "api",
      }),
    );
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * 헌재결정례 조회. 후보 검색어를 순차 시도. 모두 0건이면 빈 값(섹션 숨김).
 */
export async function getConstitutional(
  queries: string[],
): Promise<{ items: ConstitutionalHit[]; source: "api" | "seed" }> {
  for (const q of queries) {
    if (!q) continue;
    const apiItems = await fetchConstitutionalFromApi(q);
    if (apiItems && apiItems.length > 0) return { items: apiItems, source: "api" };
  }
  return { items: [], source: "api" };
}

// 자치법규(조례) 엔드포인트 (target=ordin)
const ORDIN_BASE = "http://apis.data.go.kr/1170000/law/ordinSearchList.do";

/**
 * 자치법규(조례) 조회. 성공 시 OrdinanceHit[], 실패 시 null → 시드 폴백.
 */
async function fetchOrdinancesFromApi(
  query: string,
  rows = 5,
): Promise<OrdinanceHit[] | null> {
  const key = process.env.LAW_API_KEY;
  if (!key) return null;

  const url =
    `${ORDIN_BASE}?ServiceKey=${key}` +
    `&target=ordin&numOfRows=${rows}&pageNo=1` +
    `&query=${encodeURIComponent(query)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const xml = await res.text();
    const parsed = parser.parse(xml);
    const root = parsed?.OrdinSearch;
    if (!root || String(root.resultCode) !== "00") return null;

    let items = root.law; // 자치법규도 <law> 태그로 반환됨
    if (!items) return [];
    if (!Array.isArray(items)) items = [items];

    return items.map(
      (it: Record<string, unknown>): OrdinanceHit => ({
        id: asText(it["자치법규ID"]) || asText(it["자치법규일련번호"]),
        name: asText(it["자치법규명"]),
        region: asText(it["지자체기관명"]) || undefined,
        kind: asText(it["자치법규종류"]) || undefined,
        enforced: asText(it["시행일자"]) || undefined,
        link: buildPublicLink({
          target: "ordin",
          drfLink: asText(it["자치법규상세링크"]),
        }),
        source: "api",
      }),
    );
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * 자치법규 조회. 후보 검색어를 순차 시도. 모두 0건이면 빈 값(섹션 숨김).
 */
export async function getOrdinances(
  queries: string[],
): Promise<{ items: OrdinanceHit[]; source: "api" | "seed" }> {
  for (const q of queries) {
    if (!q) continue;
    const apiItems = await fetchOrdinancesFromApi(q);
    if (apiItems && apiItems.length > 0) return { items: apiItems, source: "api" };
  }
  return { items: [], source: "api" };
}
