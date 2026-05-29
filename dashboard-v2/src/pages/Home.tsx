import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Fuse from 'fuse.js'
import Hero from '../components/Hero'
import SearchFilterBar from '../components/SearchFilterBar'
import ProjectCard from '../components/ProjectCard'
import { projects, categories, type CategoryId } from '../data/projects'

const fuse = new Fuse(projects, {
  keys: ['title', 'summary', 'tags', 'stack', 'subtitle'],
  threshold: 0.38,
  ignoreLocation: true,
})

export default function Home() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const active = (params.get('cat') as CategoryId | 'all') ?? 'all'

  const setQuery = (q: string) => {
    const next = new URLSearchParams(params)
    q ? next.set('q', q) : next.delete('q')
    setParams(next, { replace: true })
  }
  const setCategory = (c: CategoryId | 'all') => {
    const next = new URLSearchParams(params)
    c === 'all' ? next.delete('cat') : next.set('cat', c)
    setParams(next, { replace: true })
  }

  const counts = useMemo(() => {
    const out: Record<string, number> = {}
    for (const c of categories) out[c.id] = projects.filter((p) => p.category === c.id).length
    return out
  }, [])

  const results = useMemo(() => {
    let list = query.trim() ? fuse.search(query).map((r) => r.item) : projects
    if (active !== 'all') list = list.filter((p) => p.category === active)
    return list
  }, [query, active])

  const clear = () => setParams(new URLSearchParams(), { replace: true })

  return (
    <>
      <Hero />
      <section id="work" className="mx-auto max-w-page scroll-mt-20 px-5 pb-4 sm:px-8">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
            Selected work
          </h2>
          <p className="mt-1.5 text-muted">Search and filter across {projects.length} projects.</p>
        </div>

        <SearchFilterBar
          query={query}
          onQuery={setQuery}
          active={active}
          onCategory={setCategory}
          counts={counts}
          total={projects.length}
        />

        <p className="mt-6 text-sm text-faint" role="status">
          {results.length} {results.length === 1 ? 'project' : 'projects'}
          {(query || active !== 'all') && (
            <button onClick={clear} className="ml-3 font-medium text-primary hover:underline">
              Clear filters
            </button>
          )}
        </p>

        {results.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="glass mt-6 rounded-lg p-12 text-center">
            <span className="material-symbols-rounded text-4xl text-faint">search_off</span>
            <p className="mt-3 font-display text-lg font-bold text-text">No projects match that.</p>
            <p className="mt-1 text-muted">Try a different term or clear the filters.</p>
            <button
              onClick={clear}
              className="mt-5 rounded-full bg-primary px-5 py-2.5 font-semibold text-bg transition-transform hover:scale-[1.03]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  )
}
