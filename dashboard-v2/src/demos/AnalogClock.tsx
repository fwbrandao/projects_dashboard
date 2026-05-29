import { useEffect, useState } from 'react'

export default function AnalogClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const s = now.getSeconds()
  const m = now.getMinutes()
  const h = now.getHours()
  const secDeg = s * 6
  const minDeg = m * 6 + s * 0.1
  const hourDeg = (h % 12) * 30 + m * 0.5

  const hand = (deg: number, length: number, width: number, color: string) => (
    <div
      style={{
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transformOrigin: 'bottom center',
        transform: `translateX(-50%) rotate(${deg}deg)`,
        width: `${width}px`,
        height: `${length}%`,
        background: color,
        borderRadius: '4px',
      }}
    />
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative rounded-full border-4 border-border bg-surface-2"
        style={{ width: 220, height: 220 }}
      >
        {/* hour ticks */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 2,
              height: '46%',
              transformOrigin: 'top center',
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
            }}
          >
            <span
              style={{
                display: 'block',
                width: 2,
                height: i % 3 === 0 ? 12 : 7,
                background: 'var(--muted)',
                borderRadius: 2,
              }}
            />
          </div>
        ))}
        {hand(hourDeg, 28, 6, 'var(--text)')}
        {hand(minDeg, 38, 4, 'var(--text)')}
        {hand(secDeg, 42, 2, 'var(--primary)')}
        <div
          className="absolute left-1/2 top-1/2 rounded-full bg-primary"
          style={{ width: 12, height: 12, transform: 'translate(-50%, -50%)' }}
        />
      </div>
      <p className="font-mono text-sm text-muted" aria-live="off">
        {now.toLocaleTimeString()}
      </p>
    </div>
  )
}
