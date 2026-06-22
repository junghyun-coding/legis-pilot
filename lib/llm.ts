import OpenAI from "openai";

// 추출(검색어/키워드)은 단순 작업이라 경량 모델, 법적 타당성 '분석'은 고품질 모델.
// 분석 모델이 계정에 없거나 오류면 경량 모델로 안전 폴백(품질 향상, 절대 중단 없음).
export const EXTRACT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
export const ANALYZE_MODEL = process.env.OPENAI_ANALYZE_MODEL ?? "gpt-4o";

let client: OpenAI | null = null;
function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export function hasLLM(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

async function complete<T>(
  c: OpenAI,
  model: string,
  system: string,
  user: string,
): Promise<T | null> {
  const res = await c.chat.completions.create({
    model,
    // 결정성: 동일 제안 동일 판정(경계 점수에서 흔들림 방지)
    temperature: 0,
    seed: 42,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });
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
  opts: { model?: string; fallbackModel?: string } = {},
): Promise<T | null> {
  const c = getClient();
  if (!c) return null;
  const model = opts.model ?? EXTRACT_MODEL;
  try {
    return await complete<T>(c, model, system, user);
  } catch (err) {
    console.error("[llm] callJSON failed:", model, err);
    const fb = opts.fallbackModel;
    if (fb && fb !== model) {
      try {
        return await complete<T>(c, fb, system, user);
      } catch (err2) {
        console.error("[llm] fallback failed:", fb, err2);
      }
    }
    return null;
  }
}
