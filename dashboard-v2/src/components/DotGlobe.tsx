import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { useReducedMotion } from '../lib/useReducedMotion'

/** RGB 0–1 from CSS hex (supports #rgb / #rrggbb). */
function hexToRgb01(hex: string): [number, number, number] {
  const raw = hex.trim().replace('#', '')
  if (!raw) return [0.18, 0.96, 0.96]
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw.slice(0, 6)
  const n = Number.parseInt(full, 16)
  if (Number.isNaN(n)) return [0.18, 0.96, 0.96]
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function readThemeColors() {
  const cs = getComputedStyle(document.documentElement)
  const primary = hexToRgb01(cs.getPropertyValue('--primary') || '#2ff6f6')
  const violet = hexToRgb01(cs.getPropertyValue('--violet') || '#a68cff')
  const secondary = hexToRgb01(cs.getPropertyValue('--secondary') || '#ff5cf7')
  const isLight = document.documentElement.classList.contains('light')
  return { primary, violet, secondary, isLight }
}

/**
 * LangChain-style dotted globe (cobe) — decorative hero background.
 * Drag to orbit (pointer + touch); slow auto-spin when idle (unless reduced motion).
 * Inertia on release. Canvas is aria-hidden; does not trap focus or hijack scroll.
 */
export default function DotGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    let phi = 0.8
    let theta = 0.28
    let displaySize = 0
    let pointerInteraction: { x: number; y: number } | null = null
    let pointerMomentum = 0
    let dragging = false
    let globe: ReturnType<typeof createGlobe> | null = null
    let rafScale = 1
    let destroyed = false

    const colors = readThemeColors()
    // Dark: cyan-forward land; light: dimmer so copy stays readable
    const baseColor: [number, number, number] = colors.isLight
      ? [0.55, 0.58, 0.72]
      : [0.12, 0.22, 0.38]
    const glowColor: [number, number, number] = colors.isLight
      ? [0.72, 0.78, 0.92]
      : (colors.primary.map((c) => Math.min(1, c * 0.55 + 0.15)) as [number, number, number])
    const markerColor = colors.secondary
    const mapBrightness = colors.isLight ? 4.2 : 7.2
    const dark = colors.isLight ? 0 : 1
    const diffuse = colors.isLight ? 1.05 : 1.35
    // Slightly fewer samples on reduced motion (static look is enough)
    const mapSamples = reduced ? 10000 : 16000

    const setCursor = (grabbing: boolean) => {
      canvas.style.cursor = grabbing ? 'grabbing' : 'grab'
    }
    setCursor(false)

    const onResize = () => {
      // CSS size from container; cobe width/height are backing-store pixels
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      rafScale = dpr
      // Almost fill the hero panel (min dimension), slight inset so edges don't clip
      displaySize = Math.min(rect.width, rect.height) * 0.96
      canvas.style.width = `${displaySize}px`
      canvas.style.height = `${displaySize}px`
    }

    const ro = new ResizeObserver(() => {
      onResize()
      // cobe reads width/height from options each frame via onRender mutation
    })
    ro.observe(wrap)
    onResize()

    const sizePx = () => Math.max(2, Math.floor(displaySize * rafScale))

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: rafScale,
        width: sizePx(),
        height: sizePx(),
        phi,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        mapBaseBrightness: colors.isLight ? 0.08 : 0.02,
        baseColor,
        markerColor,
        glowColor,
        opacity: colors.isLight ? 0.55 : 0.92,
        scale: 1.0,
        offset: [0, 20],
        markers: [
          // Brazil (São Paulo-ish)
          { location: [-23.55, -46.63], size: 0.06 },
        ],
        onRender: (state) => {
          if (destroyed) return

          // Auto-spin only when idle and motion allowed
          if (!dragging && !reduced) {
            phi += 0.0028 + pointerMomentum
            pointerMomentum *= 0.93
            if (Math.abs(pointerMomentum) < 0.00015) pointerMomentum = 0
          } else if (!dragging && reduced) {
            // Freeze auto-spin; residual inertia decays quietly
            pointerMomentum *= 0.85
            if (Math.abs(pointerMomentum) < 0.00015) pointerMomentum = 0
            else phi += pointerMomentum
          } else if (dragging) {
            // phi updated from pointer move
          }

          state.phi = phi
          state.theta = theta
          const w = sizePx()
          state.width = w
          state.height = w
          state.devicePixelRatio = rafScale
        },
      })
    } catch {
      // WebGL unavailable — leave empty canvas, no crash
      return () => {
        ro.disconnect()
      }
    }

    const toLocal = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect()
      return { x: clientX - r.left, y: clientY - r.top }
    }

    const onPointerDown = (e: PointerEvent) => {
      // Only primary button / touch; ignore right-click
      if (e.button !== 0 && e.pointerType === 'mouse') return
      dragging = true
      pointerMomentum = 0
      pointerInteraction = toLocal(e.clientX, e.clientY)
      setCursor(true)
      try {
        canvas.setPointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || !pointerInteraction) return
      const cur = toLocal(e.clientX, e.clientY)
      const dx = cur.x - pointerInteraction.x
      const dy = cur.y - pointerInteraction.y
      const rotX = dx / 180
      const rotY = dy / 220
      phi += rotX
      theta = Math.max(-1.2, Math.min(1.2, theta + rotY))
      pointerMomentum = rotX * 0.65
      pointerInteraction = cur
    }

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      pointerInteraction = null
      setCursor(false)
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', endDrag)
    canvas.addEventListener('pointercancel', endDrag)
    canvas.addEventListener('lostpointercapture', () => {
      dragging = false
      pointerInteraction = null
      setCursor(false)
    })

    // Theme class changes (light/dark) — soft refresh of colors via destroy/recreate is heavy;
    // skip live theme swap; colors apply on mount. Users rarely flip mid-session.

    return () => {
      destroyed = true
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', endDrag)
      canvas.removeEventListener('pointercancel', endDrag)
      try {
        globe?.destroy()
      } catch {
        /* ignore */
      }
    }
  }, [reduced])

  return (
    <div
      ref={wrapRef}
      className="dot-globe-wrap pointer-events-auto absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        id="dot-globe"
        aria-hidden
        className="dot-globe-canvas max-h-none max-w-none select-none"
        style={{
          touchAction: 'none',
          contain: 'strict',
          opacity: 0.88,
        }}
      />
      {/* Soft halo only on the globe disk — do NOT cover full panel smoke */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle 46% at 50% 48%, transparent 52%, color-mix(in srgb, var(--bg) 25%, transparent) 78%, color-mix(in srgb, var(--bg) 55%, transparent) 100%)',
        }}
      />
    </div>
  )
}
