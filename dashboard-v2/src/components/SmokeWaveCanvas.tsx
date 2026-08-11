/**
 * SmokeWaveCanvas — domain-warped fbm liquid smoke for the hero panel.
 *
 * Port of ConnectPro GradientWaveCanvas pattern (no monorepo imports).
 * Palette is Projects Dashboard tokens only: deep navy-violet anchors +
 * cyan / violet / magenta smoke streaks.
 *
 * Stacking: must sit above the panel background and BELOW DotGlobe
 * (z-0). Never use negative z-index inside an `isolate` parent — it
 * paints under the stacking context and disappears.
 *
 * If WebGL is unavailable or the context is lost (e.g. another canvas
 * holds the only GPU slot), the animated CSS fallback stays visible.
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
    const anchor = mix(bg, violet, 0.18)
    return [
      mix(bg, violet, 0.08),
      mix(anchor, primary, 0.55),
      mix(anchor, violet, 0.62),
      mix(mix(bg, secondary, 0.45), primary, 0.25),
    ]
  }

  const navyViolet = mix(bg, violet, 0.22)
  return [
    bg,
    mix(navyViolet, primary, 0.62),
    mix(navyViolet, violet, 0.78),
    mix(mix(bg, secondary, 0.62), primary, 0.28),
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
  vec2 uv = gl_FragCoord.xy / max(u_res, vec2(1.0));
  vec2 p = uv * vec2(u_res.x / max(u_res.y, 1.0), 1.0) * 1.55;
  float t = u_time * 0.055;

  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * vec2(0.8, 0.6)),
    fbm(p + vec2(5.2, 1.3) - t * vec2(0.6, 0.8))
  );
  vec2 r = vec2(
    fbm(p + 2.4 * q + vec2(1.7, 9.2) + t * vec2(0.3, 0.4)),
    fbm(p + 2.4 * q + vec2(8.3, 2.8) - t * vec2(0.4, 0.3))
  );
  float f = fbm(p + 3.0 * r);

  vec3 col = mix(u_c0, u_c1, smoothstep(0.12, 0.58, f));
  col = mix(col, u_c2, smoothstep(0.4, 0.82, length(q) * 0.78));
  col = mix(col, u_c3, smoothstep(0.5, 0.96, r.y) * 0.6);

  float streak = sin((uv.x - uv.y) * 8.5 + f * 7.0 + u_time * 0.22);
  col += 0.05 * vec3(streak);

  float vig = smoothstep(1.35, 0.32, distance(uv, vec2(0.5, 0.48)));
  col *= mix(0.72, 1.0, vig);

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
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    let gl: WebGLRenderingContext | null = null
    let raf = 0
    let running = true
    let inView = true
    let ro: ResizeObserver | undefined
    let io: IntersectionObserver | undefined
    let mo: MutationObserver | undefined
    let started = false
    const start = performance.now()

    const teardownGl = () => {
      try {
        gl?.getExtension('WEBGL_lose_context')?.loseContext()
      } catch {
        /* ignore */
      }
      gl = null
    }

    const tryStart = () => {
      if (started || !running) return
      const { clientWidth, clientHeight } = wrap
      if (clientWidth < 2 || clientHeight < 2) return
      started = true

      try {
        gl = canvas.getContext('webgl', {
          alpha: false,
          antialias: false,
          powerPreference: 'low-power',
          failIfMajorPerformanceCaveat: false,
        })
      } catch {
        gl = null
      }
      if (!gl) return // CSS fallback remains

      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
      const program = gl.createProgram()
      if (!vs || !fs || !program) {
        teardownGl()
        return
      }
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        teardownGl()
        return
      }
      gl.useProgram(program)

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
        if (!gl) return
        const ramp = readSmokeRamp()
        uLocs.forEach((loc, i) => {
          const [r, g, b] = ramp[i]!
          gl!.uniform3f(loc, r, g, b)
        })
      }
      applyRamp()

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

      const resize = () => {
        if (!gl) return
        const w = Math.max(1, Math.round(wrap.clientWidth * dpr))
        const h = Math.max(1, Math.round(wrap.clientHeight * dpr))
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
          gl.viewport(0, 0, w, h)
        }
      }

      const draw = (timeSeconds: number) => {
        if (!gl) return
        // Context lost
        if (gl.isContextLost()) {
          teardownGl()
          return
        }
        resize()
        if (canvas.width < 2 || canvas.height < 2) return
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.uniform1f(uTime, timeSeconds)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }

      const reducedMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reducedMotion) {
        draw(12)
        mo = new MutationObserver(() => applyRamp())
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        return
      }

      const loop = () => {
        if (!running) return
        if (gl && inView && !document.hidden) {
          draw((performance.now() - start) / 1000)
        }
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)

      if (typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(([entry]) => {
          inView = entry?.isIntersecting ?? true
        })
        io.observe(wrap)
      }

      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => {
          if (gl) resize()
        })
        ro.observe(wrap)
      }

      mo = new MutationObserver(() => applyRamp())
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

      canvas.addEventListener(
        'webglcontextlost',
        (e) => {
          e.preventDefault()
          teardownGl()
        },
        false,
      )
    }

    // Wait for layout so canvas is not 0×0 when creating the GL context
    const boot = () => {
      tryStart()
      if (!started) {
        raf = requestAnimationFrame(boot)
      }
    }
    raf = requestAnimationFrame(boot)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io?.disconnect()
      ro?.disconnect()
      mo?.disconnect()
      teardownGl()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      data-testid="smoke-wave"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`.trim()}
    >
      {/* CSS fallback — always under canvas; stronger motion when GL fails */}
      <div className="hero-smoke absolute inset-0" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
