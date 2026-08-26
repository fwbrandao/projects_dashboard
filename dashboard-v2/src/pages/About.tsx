import portrait from '../assets/fwbPortrait.jpg'
import { categories, projects } from '../data/projects'
import { education, experience, profile, skillGroups } from '../data/about'

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="font-display text-xl font-extrabold tracking-tight text-text sm:text-2xl">{children}</h2>
  )
}

export default function About() {
  return (
    <section className="mx-auto max-w-page px-5 pt-28 pb-16 sm:px-8">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
        <img
          src={portrait}
          alt="Fernando Brandao"
          width={224}
          height={224}
          className="h-44 w-44 shrink-0 rounded-2xl object-cover object-top ring-2 ring-primary sm:h-56 sm:w-56"
        />
        <div>
          <p className="eyebrow text-primary">About</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-2 max-w-xl text-muted">{profile.headline}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-faint">
            <span className="material-symbols-rounded text-[18px] text-primary" aria-hidden>
              location_on
            </span>
            {profile.location}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-bg no-underline transition-transform hover:scale-[1.03]"
            >
              <span className="material-symbols-rounded text-[18px]" aria-hidden>
                code
              </span>
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-text no-underline transition-transform hover:scale-[1.03]"
            >
              <span className="material-symbols-rounded text-[18px]" aria-hidden>
                north_east
              </span>
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-text no-underline transition-transform hover:scale-[1.03]"
            >
              <span className="material-symbols-rounded text-[18px]" aria-hidden>
                mail
              </span>
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-3xl space-y-4 leading-relaxed text-muted">
        {profile.summary.map((para) => (
          <p key={para}>{para}</p>
        ))}
        <p>
          This site is an honest portfolio of {projects.length} projects spanning{' '}
          {categories.map((c) => c.title).join(', ')}. Work ranges from foundational notebooks
          (CNNs, ResNets, sequence-to-sequence models) to interactive web builds. Each project links
          to its source so you can see how it&apos;s put together.
        </p>
      </div>

      <div className="mt-16">
        <SectionTitle>Experience</SectionTitle>
        <ol className="relative mt-8 space-y-10 border-l border-primary pl-6 sm:pl-8">
          {experience.map((company) => (
            <li key={company.name} className="relative">
              <span className="absolute -left-[1.9rem] top-3 h-3 w-3 rounded-full bg-primary ring-4 ring-bg sm:-left-[2.15rem]" />
              <div className="glass rounded-lg p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-text">{company.name}</h3>
                {company.location && <p className="mt-0.5 text-sm text-faint">{company.location}</p>}
                <div className="mt-5 space-y-6">
                  {company.roles.map((role) => (
                    <article key={`${company.name}-${role.title}-${role.dates}`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold text-text">{role.title}</h4>
                        {role.current && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bg">
                            Now
                          </span>
                        )}
                      </div>
                      <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
                        <span>
                          {role.dates}
                          {role.location ? ` · ${role.location}` : ''}
                        </span>
                        {role.remote && (
                          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                            Remote
                          </span>
                        )}
                      </p>
                      {role.blurb && <p className="mt-3 text-sm leading-relaxed text-muted">{role.blurb}</p>}
                      {role.bullets && role.bullets.length > 0 && (
                        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                          {role.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {role.tech && role.tech.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {role.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-medium text-primary"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16">
        <SectionTitle>Skills</SectionTitle>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="glass rounded-lg p-5">
              <p className="eyebrow text-primary">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-primary-soft px-2.5 py-1 text-xs font-medium text-text"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionTitle>Education</SectionTitle>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {education.map((item) => (
            <li key={`${item.school ?? 'other'}-${item.title}`} className="glass rounded-lg p-5">
              {item.school && <p className="text-sm font-semibold text-primary">{item.school}</p>}
              <p className="mt-1 font-display font-bold text-text">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.dates}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
