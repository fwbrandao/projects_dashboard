export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row sm:px-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Brandao — ML &amp; front-end engineering.
        </p>
        <div className="flex items-center gap-5 text-sm">
          <a href="https://github.com/fwbrandao" target="_blank" rel="noopener noreferrer" className="text-muted no-underline transition-colors hover:text-text">
            GitHub
          </a>
          <a href="mailto:fwbrandao@gmail.com" className="text-muted no-underline transition-colors hover:text-text">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
