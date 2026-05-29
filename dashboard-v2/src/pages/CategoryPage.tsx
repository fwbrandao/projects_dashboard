import { Link, useParams } from 'react-router-dom'
import { getCategoryById, getProjectsByCategory, type CategoryId } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import NotFound from './NotFound'

export default function CategoryPage() {
  const { id } = useParams()
  const category = id ? getCategoryById(id as CategoryId) : undefined
  if (!category) return <NotFound />
  const list = getProjectsByCategory(category.id)

  return (
    <section className="mx-auto max-w-page px-5 pt-24 sm:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
        <Link to="/" className="no-underline hover:text-text">Work</Link>
        <span className="material-symbols-rounded text-[16px] text-faint">chevron_right</span>
        <span className="text-text">{category.title}</span>
      </nav>
      <div className="mt-6 flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary">
          <span className="material-symbols-rounded">{category.icon}</span>
        </span>
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-text">{category.title}</h1>
          <p className="text-muted">{category.blurb}</p>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
