import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getOpenAIApiKey } from "@/lib/openai-key";

export async function POST(request: NextRequest) {
  const apiKey = getOpenAIApiKey(request);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Send Authorization: Bearer <your OpenAI API key> on each request." },
      { status: 401 },
    );
  }

  let body: { personaBrief?: string; sampleCopy?: string; model?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.personaBrief?.trim() || !body.sampleCopy?.trim()) {
    return NextResponse.json(
      { error: "`personaBrief` and `sampleCopy` are required." },
      { status: 400 },
    );
  }

  const client = new OpenAI({ apiKey });
  const model = body.model?.trim() || "gpt-4o-mini";

  const system = `You are Persona Resonance — audit creative/brand voice consistency.
Return JSON:
- resonance_score: number // 0-100
- aligned_traits: string[]
- drift_flags: { issue: string; severity: "low"|"med"|"high"; evidence_span: string }[]
- rewrite_blocks: { original: string; resonant_rewrite: string; note: string }[] // up to 4
- guardrails: string[] (do/don't rules inferred from the persona brief)
- micro_style_guide: { lexicon_add: string[]; lexicon_avoid: string[]; rhythm: string; taboo_topics: string[] }`;

  const user = `PERSONA_BRIEF:\n${body.personaBrief}\n\nSAMPLE_COPY:\n${body.sampleCopy}`;

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });
    const text = completion.choices[0]?.message?.content;
    if (!text) return NextResponse.json({ error: "Empty model response." }, { status: 502 });
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ raw: text }, { status: 200 });
    }
    return NextResponse.json({ result: parsed, model });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "OpenAI request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
