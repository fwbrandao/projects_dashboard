import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { getCategoryById } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  const category = getCategoryById(project.category)
  return (
    <Link
      to={`/projects/${project.id}`}
      className="glass group flex flex-col overflow-hidden rounded-lg no-underline transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <img
          src={project.thumbnail}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-bg/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-text backdrop-blur">
          <span className="material-symbols-rounded text-[13px] text-primary">{category?.icon}</span>
          {category?.short}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold leading-snug text-text transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-medium text-primary">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
