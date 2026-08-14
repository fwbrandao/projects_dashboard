import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { TRAIL_CAP, createTrail, pushTrail, trailAlpha } from './flightTrail.ts'

describe('fading trajectory trails', () => {
  it('caps sample count so a 60fps loop stays cheap', () => {
    assert.ok(TRAIL_CAP >= 48)
    assert.ok(TRAIL_CAP <= 128)
    const trail = createTrail(8)
    for (let i = 0; i < 20; i++) {
      pushTrail(trail, { x: i, y: 0, z: 0 }, i)
    }
    assert.equal(trail.samples.length, 8)
    assert.equal(trail.samples[0]?.x, 12)
    assert.equal(trail.samples[7]?.x, 19)
  })

  it('fades older samples and keeps the newest brightest', () => {
    const n = 10
    const oldest = trailAlpha(0, n)
    const mid = trailAlpha(4, n)
    const newest = trailAlpha(n - 1, n)
    assert.ok(oldest < mid)
    assert.ok(mid < newest)
    assert.ok(oldest >= 0)
    assert.ok(newest <= 1)
    assert.ok(newest > 0.7)
  })
})
