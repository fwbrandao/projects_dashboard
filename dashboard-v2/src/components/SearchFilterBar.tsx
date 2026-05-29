import { categories, type CategoryId } from '../data/projects'

interface Props {
  query: string
  onQuery: (q: string) => void
  active: CategoryId | 'all'
  onCategory: (c: CategoryId | 'all') => void
  counts: Record<string, number>
  total: number
}

export default function SearchFilterBar({ query, onQuery, active, onCategory, counts, total }: Props) {
  const chip = (id: CategoryId | 'all', label: string, n: number) => {
    const selected = active === id
    return (
      <button
        key={id}
        onClick={() => onCategory(id)}
        aria-pressed={selected}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
          selected
            ? 'border-primary bg-primary-soft text-primary'
            : 'border-border bg-surface text-muted hover:text-text'
        }`}
      >
        {label}
        <span className={selected ? 'text-primary' : 'text-faint'}>{n}</span>
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-md">
        <span className="material-symbols-rounded pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-faint">
          search
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search projects, tags, tech…"
          aria-label="Search projects"
          className="glass w-full rounded-full py-3 pl-11 pr-4 text-sm text-text placeholder:text-faint focus:border-primary focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {chip('all', 'All', total)}
        {categories.map((c) => chip(c.id, c.title, counts[c.id] ?? 0))}
      </div>
    </div>
  )
}
