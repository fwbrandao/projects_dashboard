import ParticleField from './ParticleField'
import bg from '../assets/neural-brain-bg.png'
import { projects } from '../data/projects'

export default function Hero() {
  const count = projects.length
  return (
    <section className="relative overflow-hidden">
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center 35%' }}
      />
      <div aria-hidden className="absolute inset-0">
        <ParticleField />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, transparent 30%, var(--bg) 78%)',
        }}
      />

      <div className="relative mx-auto max-w-page px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <p className="eyebrow mb-5 text-muted">Machine learning &amp; front-end engineering</p>
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-text sm:text-6xl">
          Hi, I'm Brandao. I build{' '}
          <span className="gradient-text">intelligent, well-crafted</span> software.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          A working portfolio of {count} projects across computer vision, natural language
          processing, data, and the web — from deep-learning notebooks to interactive front-ends.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-bg no-underline transition-transform hover:scale-[1.03]"
          >
            Browse projects
            <span className="material-symbols-rounded text-[18px]">arrow_downward</span>
          </a>
          <a
            href="https://github.com/fwbrandao"
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-text no-underline transition-transform hover:scale-[1.03]"
          >
            GitHub
            <span className="material-symbols-rounded text-[18px]">north_east</span>
          </a>
        </div>
      </div>
    </section>
  )
}
