/** Live cobe pose published by DotGlobe, read by the starship canvas. */

export type GlobeView = { phi: number; theta: number }

let view: GlobeView = { phi: 0.8, theta: 0.28 }
const listeners = new Set<(v: GlobeView) => void>()

export function publishGlobeView(phi: number, theta: number): void {
  view = { phi, theta }
  listeners.forEach((fn) => fn(view))
}

export function getGlobeView(): GlobeView {
  return view
}

export function subscribeGlobeView(fn: (v: GlobeView) => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}
