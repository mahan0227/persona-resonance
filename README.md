# Persona Resonance

Audit **brand or character voice**: paste a persona brief and sample copy → get a **resonance score**, drift flags with evidence, resonant rewrites, guardrails, and a **micro style guide** (lexicon, rhythm, taboo topics).

## What it is

A BYOK Next.js app for **writers, marketers, and game narrative leads** who need consistency across channels and freelancers. It outputs JSON you can attach to tickets or Notion docs.

## Why it’s useful

- Quantifies **alignment** without purely subjective “sounds off.”
- Gives **actionable rewrites** instead of vague “make it punchier.”
- Extracts **do/don’t** lists inferred from the brief—useful for onboarding.
- Catches **tone drift** before campaigns ship.

## Where you can use it

- **Brand teams** — multi-region campaigns and translation review.
- **Games & media** — character bibles vs dialogue passes.
- **Support macros** — human tone vs automation creep.
- **Executive comms** — ghostwritten pieces vs official voice guidelines.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Chat Completions (JSON mode)

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
npm run start
```

## API

`POST /api/persona` · Header `Authorization: Bearer <key>`

Body: `personaBrief`, `sampleCopy` (required), optional `model`.

## Suite brochure

[`docs/neuron-suite-brochure.html`](docs/neuron-suite-brochure.html) · [`docs/neuron-suite-ig-square.svg`](docs/neuron-suite-ig-square.svg)

## License

MIT
