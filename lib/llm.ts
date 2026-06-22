import OpenAI from "openai";

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

let client: OpenAI | null = null;
function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export function hasLLM(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

/**
 * system/user 프롬프트로 JSON 응답을 받는다.
 * 키가 없거나 호출/파싱 실패 시 null 반환 → 호출부에서 목업 폴백.
 */
export async function callJSON<T>(system: string, user: string): Promise<T | null> {
  const c = getClient();
  if (!c) return null;
  try {
    const res = await c.chat.completions.create({
      model: MODEL,
      // 결정성: 동일 제안은 동일 판정이 나오도록 temperature 0 + 고정 seed.
      // (입법 검토 도구는 재현 가능해야 한다 — 경계 점수에서 판정이 흔들리면 신뢰 붕괴)
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
  } catch (err) {
    console.error("[llm] callJSON failed:", err);
    return null;
  }
}
