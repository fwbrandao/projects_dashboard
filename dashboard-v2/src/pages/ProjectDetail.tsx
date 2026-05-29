import { Link, useParams } from 'react-router-dom'
import { getProjectById, getCategoryById, getProjectsByCategory } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import NotFound from './NotFound'
import { demos } from '../demos'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = id ? getProjectById(id) : undefined
  if (!project) return <NotFound />

  const category = getCategoryById(project.category)
  const Demo = demos[project.id]
  const related = getProjectsByCategory(project.category)
    .filter((p) => p.id !== project.id)
    .slice(0, 3)

  return (
    <article className="mx-auto max-w-page px-5 pt-24 sm:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <Link to="/" className="no-underline hover:text-text">Work</Link>
        <span className="material-symbols-rounded text-[16px] text-faint">chevron_right</span>
        {category && (
          <>
            <Link to={`/category/${category.id}`} className="no-underline hover:text-text">
              {category.title}
            </Link>
            <span className="material-symbols-rounded text-[16px] text-faint">chevron_right</span>
          </>
        )}
        <span className="text-text">{project.title}</span>
      </nav>

      {/* Header */}
      <header className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-primary">{project.subtitle}</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-bg no-underline transition-transform hover:scale-[1.03]"
              >
                <span className="material-symbols-rounded text-[18px]">code</span>
                View source
              </a>
            )}
            {Demo && (
              <a
                href="#demo"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-text no-underline transition-transform hover:scale-[1.03]"
              >
                <span className="material-symbols-rounded text-[18px]">play_arrow</span>
                Try it live
              </a>
            )}
          </div>
        </div>
        <div className="glass overflow-hidden rounded-lg">
          <img src={project.thumbnail} alt={`${project.title} preview`} className="aspect-[16/10] w-full object-cover" />
        </div>
      </header>

      {/* Live demo */}
      {Demo && (
        <section id="demo" className="mt-12 scroll-mt-20">
          <div className="mb-4 flex items-center gap-2">
            <span className="material-symbols-rounded text-primary">play_circle</span>
            <h2 className="font-display text-xl font-bold text-text">Try it live</h2>
          </div>
          <div className="glass rounded-lg p-6 sm:p-10">
            <Demo />
          </div>
        </section>
      )}

      {/* Body */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_18rem]">
        <div className="glass rounded-lg p-7 sm:p-9">
          <h2 className="font-display text-xl font-bold text-text">Overview</h2>
          <p className="mt-3 leading-relaxed text-muted">{project.overview}</p>

          <h2 className="mt-8 font-display text-xl font-bold text-text">Highlights</h2>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-muted">
                <span className="material-symbols-rounded mt-0.5 text-[18px] text-primary">check_circle</span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6">
          <div className="glass rounded-lg p-6">
            <h3 className="eyebrow text-faint">Details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Category</dt>
                <dd className="text-right font-medium text-text">{category?.title}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Year</dt>
                <dd className="text-right font-medium text-text">{project.year}</dd>
              </div>
            </dl>
          </div>
          <div className="glass rounded-lg p-6">
            <h3 className="eyebrow text-faint">Stack</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-text">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="glass rounded-lg p-6">
            <h3 className="eyebrow text-faint">Tags</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Link
                  key={t}
                  to={`/?q=${encodeURIComponent(t)}`}
                  className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary no-underline"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold text-text">More in {category?.title}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
