import avatar from '../assets/fwbAvatar.jpg'
import { categories, projects } from '../data/projects'

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-28 sm:px-8">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <img
          src={avatar}
          alt="Brandao"
          className="h-24 w-24 rounded-full object-cover ring-2 ring-border"
        />
        <div>
          <p className="eyebrow text-primary">About</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-text">Brandao</h1>
          <p className="mt-1 text-muted">Machine learning &amp; front-end engineer</p>
        </div>
      </div>

      <div className="mt-10 space-y-4 leading-relaxed text-muted">
        <p>
          I build software across the stack — from deep-learning models for vision and language to
          the front-ends that make them usable. This site collects {projects.length} projects spanning{' '}
          {categories.map((c) => c.title).join(', ')}.
        </p>
        <p>
          The work ranges from foundational notebooks (CNNs, ResNets, sequence-to-sequence models)
          to interactive web builds. Each project links to its source so you can see how it's put together.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://github.com/fwbrandao"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-bg no-underline transition-transform hover:scale-[1.03]"
        >
          <span className="material-symbols-rounded text-[18px]">code</span>
          GitHub
        </a>
        <a
          href="mailto:fwbrandao@gmail.com"
          className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-text no-underline transition-transform hover:scale-[1.03]"
        >
          <span className="material-symbols-rounded text-[18px]">mail</span>
          Get in touch
        </a>
      </div>
    </section>
  )
}
