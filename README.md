# Persona Resonance

Audit **brand or character voice**: resonance score, drift flags with evidence, resonant rewrites, and a micro style guide (lexicon, rhythm, taboos). **BYO OpenAI API key.**

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Chat Completions (JSON mode)

## Run locally

```bash
npm install
npm run dev
```

## API

`POST /api/persona` · Header `Authorization: Bearer <key>`

Body: `personaBrief`, `sampleCopy`, optional `model`.

## License

MIT
