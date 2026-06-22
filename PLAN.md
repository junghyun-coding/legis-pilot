# 법령이음 고도화·개선 백로그 (PLAN)

> 범위: "확실히 고치고 다듬기" — 확정 버그 수정 + UX 폴리싱. 위험한 신규기능 ❌.
> 배포: 로컬 런타임 검증 후 git push(→Vercel), **푸시 직전 보고**.
> 진실원천(single source of truth). 사이클이 진행상태를 갱신한다.

## 핵심 정정 (오경보 철회)
- 코어 분석 파이프라인은 **실사용자(브라우저=UTF-8)에게 정상 동작**한다. 음주운전→도로교통법군→"정비 부적합" 정확·일관 (로컬·프로덕션 Node UTF-8 검증 완료).
- 초기 "라이브 깨짐/비결정/주택법" 현상은 **Windows Git Bash curl이 한글을 cp949로 잘못 보낸 테스트 아티팩트**였음. 서버가 비-UTF8 본문을 mojibake로 디코딩 → LLM이 깨진 글자로 엉뚱 추출. 실브라우저 영향 없음.

## 검증 가능한 성공 기준
- [ ] `npx tsc --noEmit` + `npm run lint` 무오류
- [ ] `npm run build` 성공
- [ ] 리포트 내 **모든 링크가 200**으로 resolve (404 0건) — curl 배치 검증
- [ ] 교통 제안(음주운전/주정차/어린이보호구역) 관련법령에서 노이즈(교통시설특별회계법·한국도로교통공단법 등) 제거되고 소관법령(도로교통법군) 우선
- [ ] 브랜딩 "법령이음"으로 통일 (잔여 "국민참여입법센터" 0건)
- [ ] seed-4 상태-데이터 정합 (검토중↔리포트완성 모순 해소)
- [ ] 입력 길이 제한 + 빈/과대 입력 graceful 처리
- [ ] Node UTF-8 스모크: 5개 대표 제안 → 관련법령 관련성·판정 합리성 육안 OK

## 작업 (wave / 파일 / 의존성 / 충돌)

### Wave 0 — 설계 (위험 통합부 구조 확정)
- D1 **링크 빌더 + 검색 재랭킹 설계** — `docs/INTEGRATION.md` 산출. 링크 패턴 curl 실증 포함.

### Wave 1 — 구현 (파일 충돌로 순차 chain)
- T1 **링크 404 박멸** — `lib/lawApi.ts`(링크 빌더 단일화, OC 노출 제거, 공개뷰어 URL), `data/interpretations.ts`/`constitutional.ts`/`ordinances.ts`(죽은 `/expc/`·`/detc/`·`/ordin/` URL 교체/제거), `data/proposals.ts`(seed-source 항목의 죽은 링크 교체 + seed-4 status 정합). [chain: lawApi/proposals 공유]
- T2 **관련법령 관련성 재랭킹** — `lib/lawApi.ts`(API 결과를 lawQuery/keywords 관련성으로 재정렬·노이즈 필터), `lib/prompt.ts`(추출 정밀화 필요시), `app/api/analyze/route.ts`. [T1 다음 — lawApi 공유]
- T3 **입력검증·견고성** — `app/api/analyze/route.ts`(title/body 길이 cap, 빈/과대 처리, 프롬프트 인젝션 방어 문구). [T2 다음 — route 공유]

### Wave 2 — 프론트 (chain과 독립, 상호 독립 → 병렬 가능)
- T4 **브랜딩 통일** — `app/propose/page.tsx`("국민참여입법센터"→"법령이음"), 헤더 일관.
- T5 **프론트 폴리싱** — `components/ReportView.tsx`/`app/dashboard/page.tsx`/`app/page.tsx`/`README.md` 정합·접근성·빈상태·`rel=noopener`.

### Wave 3 — 검증 + 후속
- V1 typecheck/lint/build (에이전트) + 런타임 스모크(직접).
- (후속) 감사 워크플로의 법률정확성·공모전적합성 발견 반영.

## 진행 로그
- 2026-06-22: 스카우트·진단 완료, 범위/배포 확정, PLAN 작성. 구현 사이클 시작.

## 하드 규칙
- 동시 build 금지(같은 트리). 구현은 순차 chain, 검증은 `tsc --noEmit`+lint(.next 비충돌). 풀 build/런타임은 사용자(=메인)가 직접.
- 수술적 변경: 요청 범위만, 인접 코드 "개선" ❌, 기존 동작·공개 시그니처 비파괴.
- AGENTS.md 준수: Next.js 16은 다름 — Next 고유 코드 변경 시 `node_modules/next/dist/docs` 확인, 기존 패턴에 맞춤.
