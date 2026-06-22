// 관련 법령 결정적 재랭킹 (순수 함수, 네트워크/난수 없음).
// API 결과에서 교통시설특별회계법·한국도로교통공단법 같은 노이즈를 강등하고
// 검색어 어간(예 '도로교통')과 키워드(예 '음주운전')에 부합하는 법령군을 상위로 끌어올린다.
// 필터가 아니라 '강등/재정렬'만 — score 0 항목도 N 채움용으로 남겨 빈배열을 만들지 않는다.

import type { LawHit } from "@/types";

const TOP_N = 4;

// lawQuery 의 길이 2~4 연속부분문자열 + keywords 전체 → 소문자 토큰 집합
function buildTokenSet(lawQuery: string, keywords: string[]): string[] {
  const set = new Set<string>();
  const q = lawQuery.toLowerCase();
  for (let len = 2; len <= 4; len++) {
    for (let i = 0; i + len <= q.length; i++) {
      set.add(q.slice(i, i + len));
    }
  }
  for (const kw of keywords) {
    const k = kw.trim().toLowerCase();
    if (k.length >= 2) set.add(k);
  }
  return [...set];
}

// 한 법령의 결정적 점수: name 에 포함된 토큰 길이 합 + 완전 키워드 보너스
function scoreLaw(name: string, tokens: string[], keywords: string[]): number {
  const lower = name.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (t.length >= 2 && lower.includes(t)) score += t.length;
  }
  // 완전한 키워드(예 '음주운전','주차','간판')가 name 에 포함되면 가중치 부여
  for (const kw of keywords) {
    const k = kw.trim().toLowerCase();
    if (k.length >= 2 && lower.includes(k)) score += 5;
  }
  return score;
}

/**
 * API 법령 목록을 결정적으로 재랭킹해 상위 N(=4)만 반환한다.
 * - score 내림차순, 동점은 원래 API 순서(stable) 유지.
 * - 모든 score==0 이면 재정렬 없이 laws.slice(0,N) (원순서 보존) — 빈배열 금지.
 * - 시행령/시행규칙은 모법과 prefix 를 공유하면 부모 score 의 0.9배를 상속(가족 묶음 보존).
 */
export function rerankLaws(laws: LawHit[], lawQuery: string, keywords: string[]): LawHit[] {
  if (laws.length === 0) return laws;

  const tokens = buildTokenSet(lawQuery, keywords);
  const base = laws.map((law, i) => ({
    law,
    i,
    score: scoreLaw(law.name, tokens, keywords),
    // 가족 정렬 키: familyScore=가족 대표점수, childRank=가족 내 순서(부모=0, 자식=1)
    familyScore: scoreLaw(law.name, tokens, keywords),
    childRank: 0,
  }));

  // 매칭이 전무하면(모두 0) 원순서 보존 슬라이스 — 비파괴
  if (base.every((b) => b.score === 0)) {
    return laws.slice(0, TOP_N);
  }

  // 가족 묶음: '모법 + 시행령/시행규칙' 처럼 모법명을 prefix 로 갖는 자식 법령은
  // 부모의 가족점수를 그대로 물려받아(가족이 한 덩어리로 상위에 모임), 부모 바로 뒤에 정렬.
  // 부모는 가족 응집 보너스(+0.5)를 받아, '도로교통' 어간을 우연히 포함할 뿐인
  // 별개 법(예 한국도로교통공단법, 어느 조회 법령의 prefix 도 아님)이 동점이어도 그 위를 차지.
  for (const child of base) {
    const cname = child.law.name;
    for (const parent of base) {
      if (parent.law === child.law || parent.score <= 0) continue;
      // 자식명이 부모명으로 시작하고 더 길어야 진짜 시행령/시행규칙 관계
      if (cname.length > parent.law.name.length && cname.startsWith(parent.law.name)) {
        // 가족 공통 점수 = 부모 점수 + 응집 보너스. 부모/자식이 같은 값을 공유해
        // 가족 전체가 동점 노이즈(예 한국도로교통공단법) 위에 한 덩어리로 모인다.
        const familyScore = parent.score + 0.5;
        if (familyScore >= child.familyScore) {
          child.familyScore = familyScore;
          child.childRank = 1;
        }
        parent.familyScore = familyScore;
      }
    }
  }

  // 가족점수 내림차순 → 같으면 부모 우선(childRank) → 같으면 원래 API 순서(stable)
  const ranked = base
    .slice()
    .sort(
      (a, b) =>
        b.familyScore - a.familyScore || a.childRank - b.childRank || a.i - b.i,
    )
    .map((b) => b.law);

  return ranked.slice(0, TOP_N);
}
