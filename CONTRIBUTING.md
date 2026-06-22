# 기여 가이드

법령이음(Legis-Pilot)에 기여해 주셔서 감사합니다. 짧게 핵심만 정리했습니다.

## 로컬 실행

1. 의존성 설치

   ```bash
   npm install
   ```

2. 환경 변수 작성: `.env.example` 를 복사해 `.env.local` 을 만들고 값을 채웁니다. `.env.local` 은 커밋되지 않습니다.

   ```bash
   cp .env.example .env.local
   ```

   | 변수 | 필수 | 설명 |
   | --- | --- | --- |
   | `OPENAI_API_KEY` | O | OpenAI API 키 |
   | `LAW_API_KEY` | O | 국가법령정보 인증키(공공데이터포털, encoding 값) |
   | `OPENAI_ANALYZE_MODEL` | (기본 `o3`) | 분석용 모델(4축 타당성 검토) |
   | `OPENAI_MODEL` | (기본 `gpt-4o-mini`) | 추출용 모델(키워드/조문 추출) |
   | `LAW_OC` | (선택) | 조문 본문 조회용 OC 값 |

3. 개발 서버 실행

   ```bash
   npm run dev
   ```

## 변경 전 검증

PR 전에 아래 세 가지를 통과시켜 주세요.

```bash
npx tsc --noEmit   # 타입 체크
npm run lint       # ESLint
npm run build      # 프로덕션 빌드
```

## 브랜치 규칙

- 기본 브랜치는 `master`. 직접 푸시하지 말고 작업 브랜치를 만듭니다.
- 이름: `<유형>/<간단한-설명>` (예: `feat/리포트-pdf-출력`, `fix/법령조회-인코딩`).
- 유형: `feat`, `fix`, `docs`, `refactor`, `chore`.

## 커밋 메시지

- 한국어로 간결하게, 명령형 한 줄 요약.
- 형식: `유형: 무엇을 했는지` (예: `feat: 시행령 정비 타당성 4축 분석 추가`).
- 한 커밋은 한 가지 변경에 집중합니다.

## PR 절차

1. 작업 브랜치에서 위 검증 3종을 통과시킵니다.
2. `master` 대상으로 PR을 엽니다.
3. PR 본문에 변경 이유, 주요 변경점, 검증 방법(실행한 명령/결과)을 적습니다.
4. 관련 이슈가 있으면 연결합니다.

## AGENTS.md 주의

이 프로젝트는 Next.js 16(App Router)을 사용합니다. 일부 API·관행이 이전 버전과 다를 수 있으니, 코드를 바꾸기 전에 `AGENTS.md` 와 `node_modules/next/dist/docs/` 의 관련 문서를 먼저 확인하세요. 학습된 관행을 그대로 가정하지 마세요.
