"use client";

import { useState } from "react";
import { ApiKeyBar, authHeaders, useOpenAISettings } from "@/components/ApiKeyBar";

export default function Home() {
  const settings = useOpenAISettings();
  const { apiKey, model } = settings;
  const [personaBrief, setPersonaBrief] = useState(
    "Voice: surgical calm, zero jargon flex, short clauses. Audience: senior IC engineers. Never punch down; admit unknowns.",
  );
  const [sampleCopy, setSampleCopy] = useState(
    "OMG this is literally insane bestie — we’re gonna ship SO hard Friday!! 🔥🔥",
  );
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  async function run() {
    setError("");
    setOutput("");
    if (!apiKey.trim()) {
      setError("Add your OpenAI API key above.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/persona", {
        method: "POST",
        headers: authHeaders(apiKey),
        body: JSON.stringify({ personaBrief, sampleCopy, model }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }
      setOutput(JSON.stringify(data.result ?? data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300/90">
          Neuron suite · 14
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Persona Resonance
        </h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          Paste a persona brief and draft copy — get a resonance score, drift flags, resonant rewrites, and a
          micro style guide you can ship to writers.
        </p>
      </header>

      <ApiKeyBar settings={settings} accent="from-fuchsia-500 to-indigo-500" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Persona brief</span>
            <textarea
              value={personaBrief}
              onChange={(e) => setPersonaBrief(e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-fuchsia-400/60"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Sample copy</span>
            <textarea
              value={sampleCopy}
              onChange={(e) => setSampleCopy(e.target.value)}
              rows={10}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-fuchsia-400/60"
            />
          </label>
          <button
            type="button"
            disabled={loading}
            onClick={run}
            className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Tuning…" : "Audit resonance"}
          </button>
        </div>
        <div className="flex min-h-[520px] flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs md:text-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Audit JSON</span>
            {error ? <span className="text-rose-400">Error</span> : null}
          </div>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <pre className="flex-1 overflow-auto whitespace-pre-wrap text-zinc-100">{output}</pre>
        </div>
      </div>
    </div>
  );
}
