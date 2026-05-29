import { useCallback, useEffect, useMemo, useState } from 'react'
import clap from '../assets/sounds/clap.wav'
import hihat from '../assets/sounds/hihat.wav'
import kick from '../assets/sounds/kick.wav'
import openhat from '../assets/sounds/openhat.wav'
import boom from '../assets/sounds/boom.wav'
import ride from '../assets/sounds/ride.wav'
import snare from '../assets/sounds/snare.wav'
import tom from '../assets/sounds/tom.wav'
import tink from '../assets/sounds/tink.wav'

const PADS = [
  { key: 'a', label: 'clap', src: clap },
  { key: 's', label: 'hihat', src: hihat },
  { key: 'd', label: 'kick', src: kick },
  { key: 'f', label: 'openhat', src: openhat },
  { key: 'g', label: 'boom', src: boom },
  { key: 'h', label: 'ride', src: ride },
  { key: 'j', label: 'snare', src: snare },
  { key: 'k', label: 'tom', src: tom },
  { key: 'l', label: 'tink', src: tink },
]

export default function DrumKit() {
  const [active, setActive] = useState<string | null>(null)
  const audio = useMemo(
    () => Object.fromEntries(PADS.map((p) => [p.key, new Audio(p.src)])),
    [],
  )

  const play = useCallback(
    (key: string) => {
      const a = audio[key]
      if (!a) return
      a.currentTime = 0
      void a.play()
      setActive(key)
      window.setTimeout(() => setActive((k) => (k === key ? null : k)), 120)
    },
    [audio],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (PADS.some((p) => p.key === key)) play(key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [play])

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted">Press the keys <span className="font-semibold text-text">A–L</span> or tap a pad.</p>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
        {PADS.map((p) => (
          <button
            key={p.key}
            onClick={() => play(p.key)}
            className={`flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-lg border transition-all ${
              active === p.key
                ? 'scale-105 border-primary bg-primary-soft shadow-lift'
                : 'border-border bg-surface-2 hover:bg-surface-hover'
            }`}
          >
            <span className="font-display text-2xl font-extrabold text-text">{p.key.toUpperCase()}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
