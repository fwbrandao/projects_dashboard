import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))

describe('page copy smoke', () => {
  it('home work region has an h2 for heading order', () => {
    const src = readFileSync(join(dir, 'Home.tsx'), 'utf8')
    assert.match(src, /<h2 className="sr-only">Work<\/h2>/)
  })

  it('project detail can render an architecture panel', () => {
    const src = readFileSync(join(dir, 'ProjectDetail.tsx'), 'utf8')
    assert.match(src, /architecturePanels/)
    assert.match(src, /id="architecture"/)
  })

  it('about renders identity, experience, portrait size, and hidden CTA icons', () => {
    const src = readFileSync(join(dir, 'About.tsx'), 'utf8')
    assert.match(src, /\{profile\.name\}/)
    assert.match(src, />Experience</)
    assert.match(src, /fwbPortrait\.jpg/)
    assert.match(src, /width=\{224\}/)
    assert.match(src, /height=\{224\}/)
    assert.match(src, /aria-hidden/)
    assert.doesNotMatch(src, /fwbAvatar/)
  })

  it('space RAG architecture lists ask() and the eight gates', () => {
    const src = readFileSync(join(dir, '../demos/SpaceRagArchitecture.tsx'), 'utf8')
    assert.match(src, /Chatbot\.ask/)
    assert.match(src, /route_query/)
    assert.match(src, /inject_context/)
    assert.match(src, /Orchestrator/)
  })
})
