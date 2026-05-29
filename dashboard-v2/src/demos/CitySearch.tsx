import { useEffect, useMemo, useState } from 'react'

interface Place {
  city: string
  state: string
  population: string
  rank: string
}

const ENDPOINT =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const commas = (x: string) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const parts = text.split(new RegExp(`(${escapeRe(query)})`, 'gi'))
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded bg-primary-soft px-0.5 text-primary">{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export default function CitySearch() {
  const [cities, setCities] = useState<Place[]>([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    fetch(ENDPOINT)
      .then((r) => r.json())
      .then((data: Place[]) => {
        if (alive) setCities(data)
      })
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const matches = useMemo(() => {
    if (!query.trim()) return []
    const re = new RegExp(escapeRe(query), 'i')
    return cities.filter((p) => re.test(p.city) || re.test(p.state)).slice(0, 100)
  }, [query, cities])

  return (
    <div className="mx-auto flex max-w-md flex-col gap-3">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a U.S. city or state…"
        aria-label="Search cities"
        className="w-full rounded-full border border-border bg-surface-2 px-5 py-3 text-text placeholder:text-faint focus:border-primary focus:outline-none"
      />
      <div className="max-h-72 overflow-auto rounded-lg border border-border bg-surface-2">
        {loading && <p className="p-4 text-sm text-muted">Loading cities…</p>}
        {error && <p className="p-4 text-sm text-muted">Couldn't load the city list (network blocked).</p>}
        {!loading && !error && !query.trim() && (
          <p className="p-4 text-sm text-muted">Start typing to filter ~1,000 U.S. cities.</p>
        )}
        {!loading && !error && query.trim() && matches.length === 0 && (
          <p className="p-4 text-sm text-muted">No matches.</p>
        )}
        <ul className="divide-y divide-border">
          {matches.map((p, i) => (
            <li key={`${p.city}-${p.state}-${i}`} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="text-text">
                <Highlight text={p.city} query={query} />, <Highlight text={p.state} query={query} />
              </span>
              <span className="text-faint">{commas(p.population)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
