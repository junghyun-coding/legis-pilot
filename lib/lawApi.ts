import { XMLParser } from "fast-xml-parser";
import type { LawHit, InterpretationHit, ConstitutionalHit, OrdinanceHit } from "@/types";
import { matchSeedLaws } from "@/data/laws";
import { matchInterpretations } from "@/data/interpretations";
import { matchConstitutional } from "@/data/constitutional";
import { matchOrdinances } from "@/data/ordinances";

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

function toAbsoluteLink(raw: unknown): string | undefined {
  const s = asText(raw);
  if (!s) return undefined;
  return s.startsWith("http") ? s : `https://www.law.go.kr${s}`;
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
        link: toAbsoluteLink(it["법령상세링크"]),
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
): Promise<{ laws: LawHit[]; source: "api" | "seed" }> {
  const apiLaws = await fetchLawsFromApi(query);
  if (apiLaws && apiLaws.length > 0) {
    return { laws: apiLaws, source: "api" };
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
        link: toAbsoluteLink(it["법령해석례상세링크"]),
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
 * 법령해석례 조회 (실연동 우선, 실패 시 시드 폴백).
 */
export async function getInterpretations(
  query: string,
  fallbackText: string,
): Promise<{ items: InterpretationHit[]; source: "api" | "seed" }> {
  const apiItems = await fetchInterpretationsFromApi(query);
  if (apiItems && apiItems.length > 0) {
    return { items: apiItems, source: "api" };
  }
  return {
    items: matchInterpretations(fallbackText.split(/\s+/)),
    source: "seed",
  };
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
        link: toAbsoluteLink(it["헌재결정례상세링크"]),
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
 * 헌재결정례 조회 (실연동 우선, 실패 시 시드 폴백).
 */
export async function getConstitutional(
  query: string,
  fallbackText: string,
): Promise<{ items: ConstitutionalHit[]; source: "api" | "seed" }> {
  const apiItems = await fetchConstitutionalFromApi(query);
  if (apiItems && apiItems.length > 0) {
    return { items: apiItems, source: "api" };
  }
  return {
    items: matchConstitutional(fallbackText.split(/\s+/)),
    source: "seed",
  };
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
        link: toAbsoluteLink(it["자치법규상세링크"]),
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
 * 자치법규 조회 (실연동 우선, 실패 시 시드 폴백).
 */
export async function getOrdinances(
  query: string,
  fallbackText: string,
): Promise<{ items: OrdinanceHit[]; source: "api" | "seed" }> {
  const apiItems = await fetchOrdinancesFromApi(query);
  if (apiItems && apiItems.length > 0) {
    return { items: apiItems, source: "api" };
  }
  return {
    items: matchOrdinances(fallbackText.split(/\s+/)),
    source: "seed",
  };
}
