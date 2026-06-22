"use client";

import { useState } from "react";
import Link from "next/link";
import type { AnalysisReport, Proposal } from "@/types";
import { addProposal } from "@/lib/store";
import ReportView from "@/components/ReportView";

const EXAMPLES = [
  "음주운전 처벌을 완화해주세요",
  "골목상권 소상공인 간판 교체 비용을 지원해주세요",
  "학교 앞 불법 주정차 단속을 강화해주세요",
];

export default function ProposePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AnalysisReport | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError("");
    setReport(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      if (!res.ok) throw new Error("분석 요청 실패");
      const data: AnalysisReport = await res.json();
      const proposal: Proposal = {
        id: `u-${Date.now()}`,
        title: title.trim(),
        body: body.trim(),
        submittedAt: new Date().toISOString(),
        status: "검토완료",
        report: data,
      };
      addProposal(proposal);
      setReport(data);
    } catch {
      setError("분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-bold text-blue-700">
            ⚖️ 법령이음
          </Link>
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-800">
            공무원 검토 시스템 →
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-bold">어떤 입법 제안 또는 시행령 정비가 필요하신가요?</h1>
        <p className="mt-2 text-slate-500">
          일상어로 편하게 적어주세요. AI가 관련 법령을 찾아 충돌 여부를 즉시 안내합니다.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">제안 제목</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 음주운전 처벌을 완화해주세요"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">상세 내용</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              placeholder="현재 법이나 제도의 문제점과 개선 방안을 논리적으로 서술해주세요."
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setTitle(ex)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500 hover:bg-slate-100"
              >
                {ex}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? "AI 분석 중…" : "제안 제출 및 AI 사전검토"}
          </button>
          {error && <p className="text-sm text-rose-600">{error}</p>}
        </form>

        {loading && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            <span className="inline-block h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            국가법령정보 4종(법령·해석례·헌재·조례)을 실시간 조회하고, 관련 법령의 실제 조문까지
            읽어 AI가 법적 타당성을 분석하고 있습니다… 최대 15초가량 걸릴 수 있어요.
          </div>
        )}

        {report && (
          <section className="mt-10">
            {/* 사전 필터링 가이드 */}
            <div
              className={`rounded-lg border p-4 ${
                report.conflictRisk === "높음"
                  ? "border-rose-200 bg-rose-50"
                  : report.conflictRisk === "보통"
                    ? "border-amber-200 bg-amber-50"
                    : "border-emerald-200 bg-emerald-50"
              }`}
            >
              <p className="font-semibold">
                {report.conflictRisk === "낮음"
                  ? "✅ 기존 법령과 충돌 위험이 낮은 제안입니다."
                  : `⚠️ 이 제안은 ${
                      report.conflicts[0]?.law ?? report.relatedLaws[0]?.name ?? "현행 법령"
                    } 등과 충돌 가능성이 ${report.conflictRisk}입니다.`}
              </p>
              {report.conflictRisk !== "낮음" && report.conflicts[0] && (
                <p className="mt-1 text-sm text-slate-600">{report.conflicts[0].detail}</p>
              )}
              <p className="mt-1 text-sm text-slate-600">{report.legalFitNote}</p>
            </div>

            <h2 className="mt-8 mb-3 text-lg font-bold">AI 사전검토 리포트 (미리보기)</h2>
            <ReportView report={report} />

            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
              제안이 접수되었습니다. 법제처 공무원은{" "}
              <Link href="/dashboard" className="font-semibold underline">
                검토 시스템
              </Link>
              에서 이 제안을 타당성 판정과 함께 확인할 수 있습니다.
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
