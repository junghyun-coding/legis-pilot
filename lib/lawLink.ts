// 국가법령정보 공개 뷰어 안정 링크 빌더 (순수 함수, 네트워크/OC 없음).
// DRF 상세링크(OC 노출/불안정)나 죽은 일반 URL(/expc//detc//ordin/) 대신
// 검증된 공개 뷰어 URL을 생성한다. id/MST 가 없으면 undefined → 평문 렌더.

export type LinkTarget = "law" | "expc" | "detc" | "ordin";

export interface BuildPublicLinkInput {
  target: LinkTarget;
  id?: string; // expc=법령해석례일련번호, detc=헌재결정례일련번호 (law/ordin 은 미사용)
  name?: string; // law 폴백용 법령명
  drfLink?: string; // law/ordin 의 MST 추출 원본 (DRF 상세링크)
}

// DRF 링크에 박힌 MST 파라미터 추출 (law=lsiSeq, ordin=ordinSeq 로 매핑)
function extractMst(drfLink?: string): string | undefined {
  if (!drfLink) return undefined;
  const m = drfLink.match(/[?&]MST=(\d+)/);
  return m ? m[1] : undefined;
}

/**
 * 안정 공개 뷰어 URL 생성. 만들 수 없으면 undefined (평문 렌더로 404 0건).
 * - law:  MST 우선 lsInfoP.do?lsiSeq=MST, 없으면 name 기반 /법령/{name}
 * - expc: LSW/expcInfoP.do?expcSeq=id
 * - detc: LSW/detcInfoP.do?detcSeq=id
 * - ordin: LSW/ordinInfoP.do?ordinSeq=MST (자치법규ID 아님, DRF 링크의 MST)
 */
export function buildPublicLink(input: BuildPublicLinkInput): string | undefined {
  const { target, id, name, drfLink } = input;
  switch (target) {
    case "law": {
      const mst = extractMst(drfLink);
      if (mst) return `https://www.law.go.kr/lsInfoP.do?lsiSeq=${mst}`;
      if (name) return `https://www.law.go.kr/법령/${encodeURIComponent(name)}`;
      return undefined;
    }
    case "expc":
      return id ? `https://www.law.go.kr/LSW/expcInfoP.do?expcSeq=${id}` : undefined;
    case "detc":
      return id ? `https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=${id}` : undefined;
    case "ordin": {
      const mst = extractMst(drfLink);
      return mst ? `https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=${mst}` : undefined;
    }
  }
}
