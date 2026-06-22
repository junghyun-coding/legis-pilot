"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Proposal } from "@/types";
import { getProposals } from "@/lib/store";
import { verdictTone } from "@/lib/scoring";
import ReportView from "@/components/ReportView";

const STATUS_COLOR: Record<string, string> = {
  접수: "bg-slate-100 text-slate-600",
  검토중: "bg-amber-100 text-amber-700",
  검토완료: "bg-emerald-100 text-emerald-700",
};

const VERDICT_BADGE: Record<"good" | "warn" | "bad", string> = {
  good: "bg-emerald-600",
  warn: "bg-amber-500",
  bad: "bg-rose-500",
};

export default function DashboardPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // localStorage 는 클라이언트에서만 읽히므로 mount 후 1회 로드한다(SSR 하이드레이션 안전).
    // 이 1회 동기화는 cascading-render 우려 대상이 아니라 규칙을 의도적으로 끈다.
    const list = getProposals();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProposals(list);
    if (list.length) setSelectedId(list[0].id);
  }, []);

  const selected = proposals.find((p) => p.id === selectedId);

  return (
    <main className="flex-1">
      <header className="no-print border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-bold text-slate-800">
            ⚖️ 법령이음 <span className="text-slate-400">검토 시스템</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-400">실시간 접수 {proposals.length}건</span>
            <Link
              href="/propose"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-slate-600 hover:bg-slate-100"
            >
              + 제안 입력 화면
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:flex-row">
        {/* 좌측: 접수 목록 */}
        <aside className="no-print w-full shrink-0 lg:w-80">
          <h2 className="mb-1 text-sm font-semibold text-slate-500">실시간 접수 목록</h2>
          <p className="mb-3 text-xs leading-relaxed text-slate-400">
            접수된 입법 제안을 국가법령정보 4종과 실시간 대조해 정비 타당성을 판정합니다.
          </p>
          <ul className="space-y-2">
            {proposals.map((p) => {
              const tone = p.report ? verdictTone(p.report.verdict) : null;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full rounded-lg border p-3 text-left transition ${
                      p.id === selectedId
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${STATUS_COLOR[p.status]}`}
                      >
                        {p.status}
                      </span>
                      {p.report && tone && (
                        <span
                          className={`rounded px-1.5 py-0.5 text-[11px] font-semibold text-white ${VERDICT_BADGE[tone]}`}
                        >
                          {p.report.verdict} {p.report.feasibilityScore}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm font-medium text-slate-800">
                      {p.title}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* 우측: 리포트 패널 */}
        <section className="min-w-0 flex-1">
          {!selected ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-10 text-center text-slate-400">
              왼쪽에서 제안을 선택하세요.
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="no-print mb-4 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">{selected.title}</h1>
                  <p className="mt-1 text-sm text-slate-500">{selected.body}</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
                >
                  ⬇ 리포트 PDF 저장
                </button>
              </div>
              {selected.report ? (
                <>
                  <div className="mb-4 hidden border-b border-slate-200 pb-3 print:block">
                    <h1 className="text-xl font-bold">{selected.title}</h1>
                    <p className="text-sm text-slate-500">국민 제안 입법 타당성 검토 리포트</p>
                  </div>
                  <ReportView report={selected.report} />
                </>
              ) : (
                <div className="text-slate-400">아직 분석되지 않은 제안입니다.</div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
