import OpenAI from "openai";

// 추출(검색어/키워드)은 단순 작업이라 경량 모델, 법적 타당성 '분석'은 고품질 모델.
// 분석 모델이 계정에 없거나 오류면 경량 모델로 안전 폴백(품질 향상, 절대 중단 없음).
export const EXTRACT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
export const ANALYZE_MODEL = process.env.OPENAI_ANALYZE_MODEL ?? "o3";

let client: OpenAI | null = null;
function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export function hasLLM(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

// o1·o3·o4-mini 등 o-시리즈는 temperature·seed 미지원
function isOSeries(model: string) {
  return /^o\d/.test(model);
}

type Effort = "low" | "medium" | "high";

async function complete<T>(
  c: OpenAI,
  model: string,
  system: string,
  user: string,
  reasoningEffort?: Effort,
): Promise<T | null> {
  const oSeries = isOSeries(model);
  const res = await c.chat.completions.create({
    model,
    // o-시리즈는 temperature·seed 미지원 / 대신 reasoning_effort 로 사고 깊이 조절
    ...(!oSeries && { temperature: 0, seed: 42 }),
    ...(oSeries && reasoningEffort && { reasoning_effort: reasoningEffort }),
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });
  // 실제 응답 모델 로그 — 요청한 o3 가 정말 쓰였는지/폴백됐는지 서버 콘솔에서 확인용.
  // OpenAI 는 응답에 실제 사용 모델명을 돌려준다(예 요청 'o3' → 'o3-2025-04-16').
  console.log(`[llm] requested=${model} responded=${res.model}`);
  const text = res.choices[0]?.message?.content;
  if (!text) return null;
  return JSON.parse(text) as T;
}

/**
 * system/user 프롬프트로 JSON 응답을 받는다.
 * opts.model 지정 시 그 모델로, 실패하면 opts.fallbackModel(또는 기본 경량 모델)로 1회 재시도.
 * 키 없음/모든 시도 실패/파싱 오류 시 null → 호출부에서 목업 폴백.
 */
export async function callJSON<T>(
  system: string,
  user: string,
  opts: { model?: string; fallbackModel?: string; reasoningEffort?: Effort } = {},
): Promise<T | null> {
  const c = getClient();
  if (!c) return null;
  const model = opts.model ?? EXTRACT_MODEL;
  try {
    return await complete<T>(c, model, system, user, opts.reasoningEffort);
  } catch (err) {
    console.error("[llm] callJSON failed:", model, err);
    const fb = opts.fallbackModel;
    if (fb && fb !== model) {
      try {
        // 폴백 모델은 비-o 계열일 수 있으므로 reasoningEffort 는 complete 내부에서 무시됨
        return await complete<T>(c, fb, system, user, opts.reasoningEffort);
      } catch (err2) {
        console.error("[llm] fallback failed:", fb, err2);
      }
    }
    return null;
  }
}
