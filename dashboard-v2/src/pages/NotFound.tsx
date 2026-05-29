import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-page place-items-center px-5 pt-24 text-center">
      <div>
        <p className="font-display text-6xl font-extrabold gradient-text">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-text">Page not found</h1>
        <p className="mt-2 text-muted">That route doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-bg no-underline transition-transform hover:scale-[1.03]"
        >
          <span className="material-symbols-rounded text-[18px]">arrow_back</span>
          Back to work
        </Link>
      </div>
    </section>
  )
}
