"use client";

import type { Proposal } from "@/types";
import { SEED_PROPOSALS } from "@/data/proposals";

const KEY = "legisProposals";

// 사용자가 제출한 제안만 localStorage 에 보관 (시드는 코드에 내장).
function loadStored(): Proposal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Proposal[]) : [];
  } catch {
    return [];
  }
}

function saveStored(list: Proposal[]) {
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

// 시드 + 사용자 제안 병합 (사용자 제안이 위로, 그 다음 시드 최신순)
export function getProposals(): Proposal[] {
  const stored = loadStored();
  return [...stored, ...SEED_PROPOSALS].sort(
    (a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt),
  );
}

export function addProposal(p: Proposal) {
  const stored = loadStored();
  saveStored([p, ...stored]);
}

export function getProposal(id: string): Proposal | undefined {
  return getProposals().find((p) => p.id === id);
}
