import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
const KEY = 'dashboard-theme'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function getInitial(): Theme {
  const stored = localStorage.getItem(KEY)
  // Only honor an explicit user choice; otherwise follow the OS.
  if (stored === 'dark' || stored === 'light') return stored
  return systemTheme()
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial)
  const [userPicked, setUserPicked] = useState(() => {
    const stored = localStorage.getItem(KEY)
    return stored === 'dark' || stored === 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    if (userPicked) {
      localStorage.setItem(KEY, theme)
    } else {
      localStorage.removeItem(KEY)
    }
  }, [theme, userPicked])

  // Track OS changes until the user picks a side.
  useEffect(() => {
    if (userPicked) return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => setTheme(mq.matches ? 'light' : 'dark')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [userPicked])

  const toggle = () => {
    setUserPicked(true)
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggle, followsSystem: !userPicked }
}
