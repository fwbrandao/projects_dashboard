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
        id="hero-backdrop"
        style={{ background: 'radial-gradient(ellipse at 50% -20%, #1a3c4d, transparent), radial-gradient(circle at 80% 0%, rgba(27, 189, 163, 0.15) 0px, transparent 50%)' }}
        className="absolute inset-0"
      />
      
      {/* Gradient ambient glow */}
      <div 
        aria-hidden
        id="hero-glow-overlay"
        style={{ background: 'conic-gradient(from 90deg at -2px 30%, rgba(47,246,246,.1), transparent .5turn)' }}
        className="absolute inset-[-8%]" 
      />

      <div className="relative mx-auto max-w-page px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-[9.6rem]">
        
        {/* Badge pill */}
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full bg-surface/70 px-5 py-1.5 font-semibold text-sm no-underline ring-1 ring-border shadow-lg backdrop-blur-md" id="hero-badge">
          <span aria-hidden style={{ color: 'var(--primary)' }} className='inline-flex h-2 w-2 items-center justify-center rounded-full bg-primary'>●</span>
          AI Engineer · Front-end · GCP
        </div>

        {/* Main headline */}
        <h1 
          id="hero-headline"
          style={{ textShadow: '0 8px 32px rgba(47,246,246,.18), 0 8px 32px rgba(166,140,255,.1)' }}
        >
          <div className="mx-auto font-display text-4xl leading-[1.1] tracking-tight sm:text-7xl">
            Hi! I'm Brandao
          </div>
          <p id="hero-accent" style={{ color: 'var(--primary)', marginTop: 0 }} className='font-medium'>I build AI systems that ship.</p>
        </h1>

        {/* Subcopy */}
        <p 
          aria-hidden={false}
          style={{ marginTop: '-.9rem' }}
          id="hero-subcopy"
          className="max-w-2xl text-lg leading-relaxed font-mono no-underline sm:text-[17px]"
        >
          AI Engineer with deep front-end craft and GCP delivery; portfolio of vision/NLP/data + web projects showcasing practical intelligence.
        </p>

        {/* Trust pills row */}
        <div 
          id="hero-trust-row"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '-0.6rem' }} 
          className="mt-12 grid content-start gap-x-4 gap-y-3 text-center no-underline"
        >
          {['AI / ML 🧠', 'Front-end ⚛️', 'GCP ☁️'].map((pill) => (
            <span key={pill} id={`trust-pill-${pillar.split(' ')[0]}`} className="inline-flex items-center rounded-[1rem] px-3 py-2 text-sm no-underline font-medium ring-1 shadow-lg backdrop-blur-md" style={{ background: 'rgba(56, 48, 79, .8)', color: '#ddd', borderColor: 'rgba(0, 0, 0, .2)' }}>
              {pill}
            </span>
          ))}
        </div>

        {/* Primary & secondary CTAs */}
        <div 
          id="hero-cta-row"
          style={{ marginTop: '-.5rem', textAlign: 'center' }}
          className="mt-[12px] flex justify-center gap-x-4 text-left font-primary no-underline"
        >
          <a
            href="#work"
            id="primary-button-work-anchor"
            style={{ display: 'flex', alignItems: 'center', background: '#65c0ff' }}
            className="-m-[2px] inline-flex -space-x-1 items-center gap-x-3 rounded-full py-4 pl-[max(theme(spacing.4),var(--text-padding))] px-8 pr-7 ring-1 shadow-lg focus-visible:outline-none font-semibold leading-normal no-underline"
          >
            <span id="browse-button-text-work">Browse projects</span>
            <a href="#work" className="-m-[2px] flex gap-x-3 rounded-full py-4 pl-[max(theme(spacing.4),var(--text-padding))] px-8 pr-7 focus-visible:outline-none bg-primary ring-offset-bg font-semibold text-text">
              Browse projects
              <span aria-hidden style={{ marginLeft: '6px' }} className='h-5 w-5 items-center justify-center rounded-full no-underline'>↘</span>
            </a>
          </a>

          <a 
            href="https://www.linkedin.com/in/fernando-b-b3b63021b/"
            id="secondary-button-linkedin-anchor"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: 'rgba(49, 57, 89, .8)', color: '#ddd' }} 
            className="-m-[2px] inline-flex -space-x-1 items-center gap-x-3 rounded-full py-4 pl-[max(theme(spacing.3),var(--text-padding))] px-6 pr-7 font-semibold text-text hover:-translate-y-.5 focus-visible:bg-surface ring-offset-bg transition-transform no-underline"
          >
            LinkedIn ↗
          </a>

        </div>

      </div>
      
      {/* Optional vignette card highlight */}
      <section 
        id="mini-highlight-card-anchor"
        style={{ marginTop: '-1.5rem', zIndex: 2 }}
        className="-mt-7 mx-auto relative max-w-page px-6 text-center font-medium no-underline sm:-mt-[48px] sm:block"
      >
        <div 
          aria-hidden="true"
          style={{ borderRadius: '1.4em', background: '#0c253e' }} 
          className="-m-6 mb-7 w-fit select-none rounded-full border p-px after:absolute inset-x-mt-[-1rem] h-[98%] w-auto -z-1"
        >
          <p style={{ textAlign: 'center', fontSize: 'clamp(0.83em, 2vw + .75em,.9rem)' }} id="highlight-card-title">Featured project</p>
          
          {/* Mini spotlight snippet */}
          <div 
            aria-hidden={false}
            className="mx-1 mb-[4px] max-w-fit rounded-md px-3 pb-2 pt-3 text-sm leading-tight tracking-wide ring border-solid"
            style={{ background: '#0c8df5', color:'#fff' }}
          >
            <span id="project-summary-card">I build software across the stack — from deep-learning models for vision and language to front-ends that make them usable. This showcases {count} projects spanning CV, NLP, data pipelines, and interactive web UIs.</span>
          
        </div>

      </section>
    </section>
  )
}
