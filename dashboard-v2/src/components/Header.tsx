import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../lib/useTheme'

const links = [
  { label: 'Work', to: '/' },
  { label: 'About', to: '/about' },
]

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <span className={`material-symbols-rounded ${className}`}>{name}</span>
}

export default function Header() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lift' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-baseline gap-0.5 no-underline">
          <span className="font-display text-lg font-extrabold tracking-tight text-text">Brandao</span>
          <span className="font-display text-lg font-extrabold gradient-text">.dev</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-DEFAULT px-3 py-2 text-sm font-semibold no-underline transition-colors ${
                  isActive ? 'text-text' : 'text-muted hover:text-text'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="https://github.com/fwbrandao"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-DEFAULT px-3 py-2 text-sm font-semibold text-muted no-underline transition-colors hover:text-text"
          >
            GitHub
          </a>
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-text"
          >
            <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} className="text-[20px]" />
          </button>
          <a
            href="mailto:fwbrandao@gmail.com"
            aria-label="Email Brandao"
            className="hidden h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-text sm:grid"
          >
            <Icon name="mail" className="text-[20px]" />
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-text md:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="text-[22px]" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="glass border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-page flex-col px-5 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-DEFAULT px-3 py-3 text-base font-semibold no-underline ${
                    isActive ? 'bg-surface text-text' : 'text-muted'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://github.com/fwbrandao"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-DEFAULT px-3 py-3 text-base font-semibold text-muted no-underline"
            >
              GitHub
            </a>
            <a
              href="mailto:fwbrandao@gmail.com"
              className="rounded-DEFAULT px-3 py-3 text-base font-semibold text-muted no-underline"
            >
              Email
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
