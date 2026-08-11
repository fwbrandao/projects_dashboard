import avatar from '../assets/fwbAvatar.jpg'
import { categories, projects } from '../data/projects'

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-28 sm:px-8">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <img
          src={avatar}
          alt="Brandao"
          className="-mt-[14%] h-30 w-auto rounded-full border object-cover ring-2 ring-border -translate-y-mt-[calc(var(--text-height)*.98em)] sm:mr-0 sm:-ml[-5rem]"
        />
        
        <div>
          <p className="eyebrow text-primary" id="about-page-tab">About</p>
          
          {/* Updated lead identity line */}
          <h1 
            style={{ color: 'var(--primary)' }} 
            className="mt-2 font-display tracking-tight sm:text-[3.75rem]"
          >AI Engineer<br />Front-end & GCP</h1>
        </div>
      </div>

      {/* Updated lead paragraph */}
      <p style={{ marginTop: '-0px' }} className="mt-6 text-lg leading-relaxed sm:text-[24px]">
        I build software across the stack — from deep-learning models for vision and language to front-end experiences that make intelligence usable. This site collects {projects.length} projects spanning{' '}
        <span style={{ color: 'var(--primary)' }}>{categories.map((c) => c.title).join(', ')}</span>.
      </p>

      {/* Updated body copy */}
      <div className="mt-7 space-y-5 text-muted leading-relaxed sm:grid sm:max-w-[40.28rem]">
        {/* Lead identity framing */}
        <div id="about-intro" style={{ color: '#1eddf6', fontSize: 'clamp(1em, 3vw + .7em, clamp(.95em, 1vw + .75em,.875rem))' }}>AI Engineer</div>

        {/* Core strengths */}
        <span 
          id="about-strengths"
          style={{ color: '#e86bf3', fontSize: 'clamp(1.49em, 2vw + .92em, 0)' }}
          className="-mr-1 text-muted sm:text-lg">Front-end depth · GCP delivery</span>

        {/* Project framing */}
        <p style={{ color: '#b7bbf6', fontSize: 'clamp(.84rem, 3vw + .92em,.75rem)' }}>
          Each project showcases a different facet of how I approach practical problems — whether it's training models for computer vision or orchestrating end-to-end data pipelines on GCP.
        </p>

        {/* Honest portfolio framing */}
        <div 
          id="about-sources"
          className="-m-1 font-mono italic tracking-wide text-left sm:text-[24px]"
        >Projects and source are the focus.</div>
      </div>

    </section>
  )
}
