import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import './heroMotion.css'

const TRUST = ['AI / ML', 'Front-end', 'GCP'] as const

function CascadeWords({
  text,
  baseDelay = 0,
  className = '',
}: {
  text: string
  baseDelay?: number
  className?: string
}) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <span
              className={`hero-word ${className}`.trim()}
              style={{ ['--word-delay' as string]: `${baseDelay + i * 0.07}s` }}
            >
              {word}
            </span>
          </span>{' '}
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const count = projects.length

  return (
    <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-2 pt-20 sm:px-4 sm:pt-24">
      <div className="relative isolate overflow-hidden rounded-3xl border border-border shadow-lift">
        {/* Ambient gradient wave (CSS — dashboard cyan → violet → magenta) */}
        <div aria-hidden className="hero-wave absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at 50% 120%, transparent 20%, color-mix(in srgb, var(--bg) 88%, transparent) 75%)',
          }}
        />

        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-14 pt-14 text-center sm:px-8 sm:pb-20 sm:pt-20">
          {/* Pill badge + live ping */}
          <span
            className="hero-fade glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-text"
            style={{ ['--fade-delay' as string]: '0.08s' }}
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="hero-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            AI Engineer · FE · GCP
          </span>

          {/* Oversized headline */}
          <h1 className="mt-8 max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl">
            <CascadeWords text="Hi, I'm Brandao." />
            <span className="mt-2 block gradient-text sm:mt-3">
              <CascadeWords text="I build AI systems that ship." baseDelay={0.32} />
            </span>
          </h1>

          {/* Subcopy */}
          <p
            className="hero-fade mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
            style={{ ['--fade-delay' as string]: '0.55s' }}
          >
            AI Engineer with deep front-end craft and GCP delivery — a working portfolio of {count}{' '}
            projects across vision, NLP, data, and the web.
          </p>

          {/* CTAs */}
          <div
            className="hero-fade mt-9 flex flex-wrap items-center justify-center gap-3"
            style={{ ['--fade-delay' as string]: '0.7s' }}
          >
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-bg no-underline shadow-lift transition-transform hover:scale-[1.03]"
            >
              Browse projects
              <span className="material-symbols-rounded text-[18px]" aria-hidden>
                arrow_downward
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/fernando-b-b3b63021b/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-semibold text-text no-underline transition-transform hover:scale-[1.03]"
            >
              LinkedIn
              <span className="material-symbols-rounded text-[18px]" aria-hidden>
                north_east
              </span>
            </a>
          </div>

          {/* Trust row */}
          <ul
            className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted"
            style={{ ['--fade-delay' as string]: '0.85s' }}
          >
            {TRUST.map((label) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <span className="material-symbols-rounded text-[18px] text-primary" aria-hidden>
                  check_circle
                </span>
                {label}
              </li>
            ))}
          </ul>

          {/* Glass skill strip (portfolio vignette — not a chat clone) */}
          <div
            className="hero-fade relative mx-auto mt-12 w-full max-w-xl"
            style={{ ['--fade-delay' as string]: '1s' }}
          >
            <div className="glass rounded-2xl p-4 text-left shadow-lift sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                <div>
                  <p className="text-sm font-semibold text-text">Focus areas</p>
                  <p className="mt-0.5 text-xs text-faint">Shipped systems, readable UIs, cloud delivery</p>
                </div>
                <Link
                  to="/about"
                  className="shrink-0 text-xs font-semibold text-primary no-underline hover:underline"
                >
                  About
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Computer vision', 'NLP', 'React / TS', 'GCP', 'Data pipelines', 'Product UI'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-primary-soft px-2.5 py-1 text-xs font-medium text-text"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <a
            href="#work"
            className="hero-fade mt-10 inline-flex flex-col items-center gap-1 text-xs font-semibold uppercase tracking-wider text-faint no-underline transition-colors hover:text-muted"
            style={{ ['--fade-delay' as string]: '1.1s' }}
          >
            See work
            <span className="material-symbols-rounded text-[20px]" aria-hidden>
              expand_more
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
