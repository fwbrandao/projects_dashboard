import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  COBE_DISK_NDC_RADIUS,
  DEFAULT_ORBIT,
  MOON_DIAMETER_KM,
  EARTH_DIAMETER_KM,
  MOON_EARTH_DIAMETER_RATIO,
  layerForDepth,
  moonOverlapsEarthDisk,
  moonPose,
  thetaAt,
  visualGlobeDiskRadiusPx,
} from './moonOrbit.ts'

describe('moon / earth size', () => {
  it('uses the real diameter ratio ≈ 0.273', () => {
    assert.equal(MOON_DIAMETER_KM, 3474)
    assert.equal(EARTH_DIAMETER_KM, 12742)
    assert.ok(Math.abs(MOON_EARTH_DIAMETER_RATIO - 3474 / 12742) < 1e-12)
    assert.ok(MOON_EARTH_DIAMETER_RATIO > 0.27)
    assert.ok(MOON_EARTH_DIAMETER_RATIO < 0.28)
  })

  it('renders at 1/3 of the real lunar diameter so it reads as a satellite', () => {
    const pose = moonPose(0)
    assert.ok(Math.abs(pose.radius - MOON_EARTH_DIAMETER_RATIO / 3) < 1e-9)
    assert.ok(pose.radius < 0.1)
    assert.ok(pose.radius > 0.08)
  })
})

describe('thetaAt', () => {
  it('wraps a full period to 0..2π', () => {
    assert.ok(Math.abs(thetaAt(0, 28_000)) < 1e-9)
    assert.ok(Math.abs(thetaAt(14_000, 28_000) - Math.PI) < 1e-9)
    assert.ok(Math.abs(thetaAt(28_000, 28_000)) < 1e-9)
    assert.ok(thetaAt(7_000, 28_000) > 0)
    assert.ok(thetaAt(7_000, 28_000) < Math.PI)
  })
})

describe('elliptical orbit + depth', () => {
  it('traces a wide oval in screen space, not a circle', () => {
    let maxAbsX = 0
    let maxAbsY = 0
    for (let i = 0; i < 360; i++) {
      const p = moonPose((i * Math.PI) / 180)
      maxAbsX = Math.max(maxAbsX, Math.abs(p.x))
      maxAbsY = Math.max(maxAbsY, Math.abs(p.y))
    }
    assert.ok(maxAbsX > maxAbsY * 1.6, `expected wide ellipse, got ${maxAbsX} vs ${maxAbsY}`)
    assert.ok(maxAbsY > 0.2, 'vertical amplitude should still be visible')
  })

  it('goes both in front of and behind the globe in one period', () => {
    const layers = new Set<string>()
    for (let i = 0; i < 360; i++) {
      layers.add(moonPose((i * Math.PI) / 180).layer)
    }
    assert.deepEqual([...layers].sort(), ['behind', 'front'])
  })

  it('marks positive z as front and negative z as behind', () => {
    assert.equal(layerForDepth(0.2), 'front')
    assert.equal(layerForDepth(-0.2), 'behind')
    assert.equal(layerForDepth(0), 'front')
  })

  it('is smaller when far and larger when near', () => {
    let front: ReturnType<typeof moonPose> | null = null
    let behind: ReturnType<typeof moonPose> | null = null
    for (let i = 0; i < 360; i++) {
      const p = moonPose((i * Math.PI) / 180)
      if (p.layer === 'front' && (!front || p.z > front.z)) front = p
      if (p.layer === 'behind' && (!behind || p.z < behind.z)) behind = p
    }
    assert.ok(front && behind)
    assert.ok(front.scale > behind.scale)
    assert.ok(front.scale > 1)
    assert.ok(behind.scale < 1)
  })

  it('keeps a stylized radius around the globe (not a real lunar distance)', () => {
    const p = moonPose(0)
    const dist = Math.hypot(p.x, p.y, p.z)
    assert.ok(dist > 1.4, 'moon should sit a third farther than the first cinematic orbit')
    assert.ok(dist < 2.2, 'moon should stay in the hero, not fly off-screen')
  })

  it('is 1/3 farther from the globe than the first cinematic axes', () => {
    assert.ok(Math.abs(DEFAULT_ORBIT.a - 1.38 * (4 / 3)) < 1e-9)
    assert.ok(Math.abs(DEFAULT_ORBIT.b - 1.18 * (4 / 3)) < 1e-9)
  })

  it('uses the default cinematic period and a 15–25° tilt', () => {
    assert.ok(DEFAULT_ORBIT.periodMs >= 20_000)
    assert.ok(DEFAULT_ORBIT.periodMs <= 35_000)
    const deg = (DEFAULT_ORBIT.tiltRad * 180) / Math.PI
    assert.ok(deg >= 15 && deg <= 25)
  })
})

describe('reduced-motion pose', () => {
  it('freezes slightly in front of the globe, on the limb', () => {
    const p = moonPose(DEFAULT_ORBIT.reducedMotionTheta)
    assert.equal(p.layer, 'front')
    assert.ok(p.z > 0)
    assert.ok(Math.abs(p.x) > 0.35, 'should sit toward the limb, not dead-center')
  })
})

describe('earth disk vs container occlusion', () => {
  it('uses cobe land radius 0.8, not the square canvas half-size', () => {
    assert.equal(COBE_DISK_NDC_RADIUS, 0.8)
    const displaySize = 800
    const disk = visualGlobeDiskRadiusPx(displaySize)
    const squareHalf = displaySize / 2
    assert.ok(Math.abs(disk - 320) < 1e-9)
    assert.ok(disk < squareHalf, 'disk must be smaller than the cobe square')
  })

  it('hides only when the moon overlaps the circular Earth disk', () => {
    const earthR = 100
    const moonR = 9
    // Just outside the disk (still inside a square that would cover this point)
    assert.equal(moonOverlapsEarthDisk(earthR + moonR + 2, 0, moonR, 0, 0, earthR), false)
    // On the limb
    assert.equal(moonOverlapsEarthDisk(earthR + moonR - 1, 0, moonR, 0, 0, earthR), true)
    // Corner of the square canvas is NOT the globe
    const squareHalf = earthR / COBE_DISK_NDC_RADIUS
    assert.equal(
      moonOverlapsEarthDisk(squareHalf - 2, squareHalf - 2, moonR, 0, 0, earthR),
      false,
    )
  })
})
