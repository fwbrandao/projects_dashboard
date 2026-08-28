import { useState } from 'react'

type GateId =
  | 'corpus'
  | 'loaders'
  | 'router'
  | 'params'
  | 'retrieve'
  | 'json'
  | 'generator'
  | 'orchestrator'

type Gate = {
  id: GateId
  n: number
  title: string
  file: string
  blurb: string
}

const GATES: Gate[] = [
  {
    id: 'corpus',
    n: 1,
    title: 'Corpus',
    file: 'data/corpus/*.md',
    blurb: 'One ## heading is one chunk. Entries carry real AU, km, and day figures so answers can quote measurements instead of vibes.',
  },
  {
    id: 'loaders',
    n: 2,
    title: 'Loaders',
    file: 'src/space_rag/corpus.py',
    blurb: 'load_chunks() returns list[Chunk]. load_catalog() returns list[CelestialProduct] validated by Pydantic.',
  },
  {
    id: 'router',
    n: 3,
    title: 'Router',
    file: 'src/space_rag/router.py',
    blurb: 'route_query(query) → Route. First match wins: chitchat / off-topic, then catalog_json, creative, comparison, factual.',
  },
  {
    id: 'params',
    n: 4,
    title: 'Params',
    file: 'src/space_rag/style.py',
    blurb: 'generation_params(query, route) → GenerationParams. Technical uses T=0.1 and k=4. Creative uses T=0.8 and k=2.',
  },
  {
    id: 'retrieve',
    n: 5,
    title: 'Retrieve + inject',
    file: 'src/space_rag/retrieve.py',
    blurb: 'retrieve(query, top_k) → list[Hit]. Chitchat skips retrieval. inject_context(hits) builds the numbered [1], [2] block the LLM sees.',
  },
  {
    id: 'json',
    n: 6,
    title: 'JSON products',
    file: 'src/space_rag/json_response.py',
    blurb: 'find_product and build_json_response. If the model emits invalid JSON, the catalog record is used instead.',
  },
  {
    id: 'generator',
    n: 7,
    title: 'Generator',
    file: 'src/space_rag/generate.py',
    blurb: 'MockGenerator in tests. get_generator() picks Groq if GROQ_API_KEY is set, else Ollama at 127.0.0.1:11434, else mock. Prompt: answer only from retrieved context and cite [1].',
  },
  {
    id: 'orchestrator',
    n: 8,
    title: 'Orchestrator',
    file: 'src/space_rag/chatbot.py',
    blurb: 'ask() is the only loop: route → params → retrieve → inject → generate → JSON if catalog_json → append history → return Turn.',
  },
]

const ASK_STEPS: { label: string; gate: GateId; hint?: string }[] = [
  { label: 'route', gate: 'router' },
  { label: 'params', gate: 'params' },
  { label: 'retrieve', gate: 'retrieve', hint: 'skip if chitchat' },
  { label: 'inject', gate: 'retrieve' },
  { label: 'generate', gate: 'generator' },
  { label: 'JSON', gate: 'json', hint: 'if catalog_json' },
  { label: 'Turn', gate: 'orchestrator' },
]

const ROUTES = ['chitchat', 'catalog_json', 'creative', 'comparison', 'factual'] as const

export default function SpaceRagArchitecture() {
  const [active, setActive] = useState<GateId>('orchestrator')
  const gate = GATES.find((g) => g.id === active) ?? GATES[7]

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-muted">
        Same loop as the Python Streamlit app. Assignment numbering is the
        build order; <span className="font-mono text-text">ask()</span> is the runtime order. Click a
        gate or a step to see what that stage does.
      </p>

      <figure className="m-0">
        <figcaption className="eyebrow text-faint">Chatbot.ask</figcaption>
        <div className="mt-3 overflow-x-auto rounded-lg border border-border bg-bg p-4">
          <ol className="flex min-w-[40rem] items-stretch gap-0">
            {ASK_STEPS.map((step, i) => {
              const on = step.gate === active
              return (
                <li key={step.label} className="flex min-w-0 flex-1 items-center">
                  {i > 0 && (
                    <span
                      className={`mx-1 h-px min-w-[8px] flex-1 ${on ? 'bg-primary' : 'bg-border'}`}
                      aria-hidden
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setActive(step.gate)}
                    aria-pressed={on}
                    className={`flex min-w-[4.75rem] flex-col items-center rounded-lg border px-2 py-2 text-center ${
                      on
                        ? 'border-primary bg-primary-soft'
                        : 'border-border bg-surface-2 hover:border-border-strong'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-semibold text-text">{step.label}</span>
                    {step.hint && <span className="mt-0.5 text-[9px] leading-tight text-faint">{step.hint}</span>}
                  </button>
                </li>
              )
            })}
          </ol>
          <p className="mt-3 text-xs leading-relaxed text-faint">
            Router order: {ROUTES.join(' → ')}. Technical T=0.1 / k=4. Creative T=0.8 / k=2.
          </p>
        </div>
      </figure>

      <div>
        <p className="eyebrow text-faint">Assignment gates</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {GATES.map((g) => {
            const on = g.id === active
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                aria-pressed={on}
                className={`rounded-lg border px-3 py-3 text-left ${
                  on
                    ? 'border-primary bg-primary-soft'
                    : 'border-border bg-surface-2 hover:border-border-strong'
                }`}
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-bold text-primary">{String(g.n).padStart(2, '0')}</span>
                  <span className="text-sm font-semibold text-text">{g.title}</span>
                </span>
                <span className="mt-1 block truncate font-mono text-[10px] text-faint">{g.file}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface-2 p-4 sm:p-5" aria-live="polite">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-lg font-bold text-text">
            {String(gate.n).padStart(2, '0')} · {gate.title}
          </span>
          <span className="font-mono text-xs text-primary">{gate.file}</span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{gate.blurb}</p>
        {gate.id === 'router' && (
          <ol className="mt-3 flex flex-wrap gap-1.5">
            {ROUTES.map((route) => (
              <li
                key={route}
                className="rounded-full bg-bg px-2.5 py-0.5 font-mono text-[10px] font-medium text-text"
              >
                {route}
              </li>
            ))}
          </ol>
        )}
        {gate.id === 'params' && (
          <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
            <div className="rounded-lg bg-bg px-3 py-2">
              <dt className="font-semibold text-text">Technical</dt>
              <dd className="mt-0.5 font-mono text-faint">temperature=0.1 · top_k=4</dd>
            </div>
            <div className="rounded-lg bg-bg px-3 py-2">
              <dt className="font-semibold text-text">Creative</dt>
              <dd className="mt-0.5 font-mono text-faint">temperature=0.8 · top_k=2</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  )
}
