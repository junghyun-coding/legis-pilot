# 법령이음 — 포트폴리오화·깃허브 세팅 백로그 (PLAN)

> 범위: 포트폴리오 공개 품질로 끌어올리기 — 깃허브 위생 파일·메타데이터·README 시각화·
> 문서 정확성. 앱 동작 로직 변경 ❌(이미 완성·배포됨), 표기/문서/세팅만.
> 진실원천. 사이클이 진행상태를 갱신한다.

## 검증 가능한 성공 기준
- [ ] LICENSE(MIT) + CONTRIBUTING + SECURITY + 이슈/PR 템플릿 + dependabot 존재
- [ ] package.json 메타(description/license/keywords/repository/author) 채움
- [ ] `.env.example`이 현재 코드와 일치(OPENAI_ANALYZE_MODEL=o3, LAW_OC 포함)
- [ ] repo About: description·homepage·topics 설정됨 (`gh repo view`로 확인)
- [ ] README: 목차 + 스크린샷 섹션 + 라이선스/기여 배지
- [ ] 랜딩 page.tsx STEP 03 설명이 실제 4축(법적정합성·유권해석·사법안전·실현가능성)과 일치
- [ ] docs/images/ 에 실제 화면 캡처 4종 + README 임베드
- [ ] `npx tsc --noEmit` + `npm run lint` + `npm run build` 무오류, CI 통과 유지
- [ ] 커밋 히스토리에 시크릿 노출 0건 (public 전환 안전성)

## 작업 (wave / 파일 / 의존성 / 충돌)

### Wave 1 — 깃허브 위생 파일 (전부 독립 신규 파일 → 병렬)
- G1 `LICENSE` (MIT, 2026, junghyun)
- G2 `CONTRIBUTING.md` (한국어, 로컬 실행·검증·PR 규칙)
- G3 `SECURITY.md` (한국어, 키 비노출·취약점 보고)
- G4 `.github/ISSUE_TEMPLATE/{bug_report,feature_request}.md` + `config.yml`
- G5 `.github/PULL_REQUEST_TEMPLATE.md`
- G6 `.github/dependabot.yml` (npm + github-actions 주간)
- G7 `package.json` 메타 추가 [기존 파일 — 단독 수정]
- G8 `.env.example` 보완 [기존 파일 — 단독 수정]

### Wave 2 — 문서 시각화·정확성 (직접, 정밀)
- M1 `app/page.tsx` STEP 03 정정 (실제 4축 타당성으로)
- M2 `README.md` 목차 + 스크린샷 섹션 + 라이선스/기여 배지
- S1 로컬 dev 캡처 4종(`/`·`/propose` 로딩·리포트·`/dashboard`) → `docs/images/` → README 임베드

### Wave 3 — repo 메타·공개 (직접/외부)
- R1 `gh repo edit` description·homepage·topics
- R2 커밋 히스토리 시크릿 스캔
- R3 **public 전환 — 사용자 확인 후** (비가역 외부노출)

### Wave 4 — 검증
- V1 tsc/lint/build + CI 통과 + 링크/배지 점검 (직접 런타임 확인)

## 진행 로그
- 2026-06-22: 포트폴리오화 스카우트 완료(LICENSE/템플릿/메타 부재, repo PRIVATE, 랜딩 STEP03 불일치 확인). PLAN 재작성. 사이클 1 시작.

## 하드 규칙
- 동시 build 금지. 위생 파일은 독립이라 병렬 OK, 빌드/검증은 사이클 후 메인이 직접.
- 수술적: 표기/문서/세팅만. 앱 분석 로직·공개 시그니처 비파괴.
- 비가역(public 전환)은 사용자 확인. 그 외 보완은 자율 진행.
- 문서는 한국어, LICENSE만 표준 영문 MIT.
</content>
