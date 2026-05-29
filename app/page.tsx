import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "일상어 제안 접수",
    desc: "국민이 구어체로 입력하면 LLM이 법률 키워드를 추출하고 충돌 가능성을 사전 안내합니다.",
  },
  {
    n: "02",
    title: "실시간 법적 검토",
    desc: "국가법령정보 Open API로 실존 법령만 조회해 인용 — AI 할루시네이션을 원천 차단합니다.",
  },
  {
    n: "03",
    title: "다차원 우선순위 스코어링",
    desc: "법령 정합성·시급성·파급력·중복성을 점수화해 시행령 정비 우선순위를 산출합니다.",
  },
  {
    n: "04",
    title: "1페이지 검토 리포트",
    desc: "부처 이관·협의에 바로 첨부할 수 있는 검토 리포트를 자동 생성합니다.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
        <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          제2회 법령데이터 활용 아이디어 공모전 · 제품/서비스 개발 부문
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          법령이음
        </h1>
        <p className="mt-3 text-lg font-medium text-slate-600">
          입법 제안 · 시행령 정비 업무 자동화 AI 에이전트
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-slate-500">
          국민 입법 제안의 타당성 검토부터 부처 간 협의 리포트 생성까지, 법령 정비 전 과정을
          국가법령정보와 연동된 AI로 연결합니다.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/propose"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            국민 제안하기
          </Link>
          <Link
            href="/dashboard"
            className="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
          >
            법제처 공무원 검토 시스템 →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="text-sm font-bold text-blue-600">{s.n}</div>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-slate-400">
          활용 데이터: 국가법령정보 공유 서비스(법제처) — 현행법령 · 법령해석례 · 헌재결정례 · 자치법규 실시간 연동
        </p>
      </section>
    </main>
  );
}
