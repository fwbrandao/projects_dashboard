/**
 * SmokeWaveCanvas — domain-warped fbm liquid smoke for the hero panel.
 *
 * Port of ConnectPro GradientWaveCanvas pattern (no monorepo imports).
 * Palette is Projects Dashboard tokens only: deep navy-violet anchors +
 * cyan / violet / magenta smoke streaks.
 *
 * Production guarantees
 * ---------------------
 * • SSR-safe: plain wrapper + CSS fallback; WebGL only in useEffect.
 * • Zero-crash: if WebGL fails, CSS gradient fallback stays painted.
 * • Battery-respectful: DPR ≤ 1.5; RAF pauses offscreen / tab hidden.
 * • Accessible: prefers-reduced-motion → one static frame; aria-hidden.
 * • pointer-events-none so DotGlobe drag / CTAs stay interactive.
 */

import { useEffect, useRef } from 'react'

/** RGB 0–1 from CSS hex (#rgb / #rrggbb). */
function hexToRgb01(hex: string, fallback: [number, number, number]): [number, number, number] {
  const raw = hex.trim().replace('#', '')
  if (!raw) return fallback
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw.slice(0, 6)
  const n = Number.parseInt(full, 16)
  if (Number.isNaN(n)) return fallback
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function mix(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

/** Four-stop smoke ramp from live CSS tokens (dark or light). */
function readSmokeRamp(): ReadonlyArray<readonly [number, number, number]> {
  const cs = getComputedStyle(document.documentElement)
  const bg = hexToRgb01(cs.getPropertyValue('--bg') || '#0d0b21', [0.051, 0.043, 0.129])
  const primary = hexToRgb01(cs.getPropertyValue('--primary') || '#2ff6f6', [0.184, 0.965, 0.965])
  const violet = hexToRgb01(cs.getPropertyValue('--violet') || '#a68cff', [0.651, 0.549, 1])
  const secondary = hexToRgb01(cs.getPropertyValue('--secondary') || '#ff5cf7', [1, 0.361, 0.969])
  const isLight = document.documentElement.classList.contains('light')

  if (isLight) {
    // Soft PD light tokens — calm anchors, gentle brand streaks
    const anchor = mix(bg, violet, 0.12)
    return [
      anchor,
      mix(bg, primary, 0.42),
      mix(bg, violet, 0.48),
      mix(mix(bg, secondary, 0.35), primary, 0.2),
    ]
  }

  // Dark: #0d0b21 / navy-violet + cyan + violet + magenta smoke
  const navyViolet = mix(bg, violet, 0.18) // lifted anchor so smoke has depth
  return [
    bg,
    mix(navyViolet, primary, 0.55),
    mix(navyViolet, violet, 0.72),
    mix(mix(bg, secondary, 0.55), primary, 0.25),
  ]
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

/** Double domain-warp fbm → silky liquid smoke streaks + vignette. */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(13.7, 7.3);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0) * 1.6;
  float t = u_time * 0.06;

  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * vec2(0.8, 0.6)),
    fbm(p + vec2(5.2, 1.3) - t * vec2(0.6, 0.8))
  );
  vec2 r = vec2(
    fbm(p + 2.4 * q + vec2(1.7, 9.2) + t * vec2(0.3, 0.4)),
    fbm(p + 2.4 * q + vec2(8.3, 2.8) - t * vec2(0.4, 0.3))
  );
  float f = fbm(p + 3.0 * r);

  vec3 col = mix(u_c0, u_c1, smoothstep(0.15, 0.55, f));
  col = mix(col, u_c2, smoothstep(0.45, 0.8, length(q) * 0.75));
  col = mix(col, u_c3, smoothstep(0.55, 0.95, r.y) * 0.55);

  // Silky diagonal light streaks riding the warp field.
  float streak = sin((uv.x - uv.y) * 9.0 + f * 7.0 + u_time * 0.25);
  col += 0.045 * vec3(streak);

  // Soft vignette — depth for globe floating in smoke; edges stay dark.
  float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5, 0.45)));
  col *= mix(0.78, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

interface SmokeWaveCanvasProps {
  /** Extra classes for the wrapper (caller owns layout). */
  className?: string
}

export default function SmokeWaveCanvas({ className = '' }: SmokeWaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let gl: WebGLRenderingContext | null = null
    try {
      gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        powerPreference: 'low-power',
      })
    } catch {
      gl = null
    }
    if (!gl) return // CSS fallback layer stays visible.

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // Full-screen triangle.
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_res')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uLocs = (['u_c0', 'u_c1', 'u_c2', 'u_c3'] as const).map((name) =>
      gl!.getUniformLocation(program, name),
    )

    const applyRamp = () => {
      const ramp = readSmokeRamp()
      uLocs.forEach((loc, i) => {
        const [r, g, b] = ramp[i]!
        gl!.uniform3f(loc, r, g, b)
      })
    }
    applyRamp()

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5)

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      const w = Math.max(1, Math.round(clientWidth * dpr))
      const h = Math.max(1, Math.round(clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl!.viewport(0, 0, w, h)
      }
    }

    const draw = (timeSeconds: number) => {
      resize()
      gl!.uniform2f(uRes, canvas.width, canvas.height)
      gl!.uniform1f(uTime, timeSeconds)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    }

    const reducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      draw(12)
      return () => {
        gl?.getExtension('WEBGL_lose_context')?.loseContext()
      }
    }

    let raf = 0
    let running = true
    let inView = true
    const start = performance.now()

    const loop = () => {
      if (running && inView && !document.hidden) {
        draw((performance.now() - start) / 1000)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    let io: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        inView = entry?.isIntersecting ?? true
      })
      io.observe(canvas)
    }

    let ro: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(resize)
      ro.observe(canvas)
    }

    // Theme toggle (html.light / .dark) — refresh ramp without remount.
    const mo = new MutationObserver(() => applyRamp())
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io?.disconnect()
      ro?.disconnect()
      mo.disconnect()
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <div
      aria-hidden
      data-testid="smoke-wave"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      {/* CSS fallback — always under canvas; matches PD dark/light tokens */}
      <div className="hero-wave absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
