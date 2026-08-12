import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { moonPose } from './moonOrbit.ts'
import { BOCA_CHICA, COMING_UP_Z, projectLatLon } from './geoProject.ts'
import {
  LEO_RADIUS,
  PHASE_ORDER,
  STACK_HEIGHT,
  createMission,
  flightPose,
  phaseAt,
  shouldTrigger,
  stepMission,
  type FlightPhase,
} from './starshipFlight.ts'

const MOON = moonPose(0.35)

function padAt(phi: number, theta = 0.28) {
  return projectLatLon(BOCA_CHICA.lat, BOCA_CHICA.lon, phi, theta)
}

describe('phase order + timings', () => {
  it('walks the sacred order and stays in the 55–75s window', () => {
    assert.deepEqual(PHASE_ORDER, [
      'idle',
      'liftoff',
      'ascent',
      'hot_stage',
      'boostback',
      'booster_land',
      'ship_orbit',
      'translunar',
      'moon_orbit',
      'moon_land',
      'done',
    ])
    const seen: FlightPhase[] = []
    let last: FlightPhase | null = null
    for (let ms = 0; ms <= 80_000; ms += 250) {
      const p = phaseAt(ms)
      if (p !== last) {
        seen.push(p)
        last = p
      }
    }
    assert.deepEqual(
      seen,
      PHASE_ORDER.filter((p) => p !== 'idle'),
    )
    assert.equal(phaseAt(72_000), 'done')
    assert.equal(phaseAt(0), 'liftoff')
    assert.ok(phaseAt(71_999) === 'moon_land' || phaseAt(71_500) === 'moon_land')
  })
})

describe('trigger hysteresis', () => {
  it('does not fire on reduced motion', () => {
    assert.equal(
      shouldTrigger({
        prevZ: 0,
        z: COMING_UP_Z + 0.05,
        armed: true,
        phase: 'idle',
        reducedMotion: true,
      }),
      false,
    )
  })

  it('fires once when Boca crosses the limb, then stays disarmed mid-mission', () => {
    let m = createMission()
    assert.equal(m.phase, 'idle')
    assert.equal(m.armed, true)

    m = stepMission(m, {
      nowMs: 1_000,
      prevBocaZ: 0.0,
      bocaZ: COMING_UP_Z + 0.04,
      reducedMotion: false,
    })
    assert.equal(m.phase, 'liftoff')
    assert.equal(m.armed, false)

    // Same coming-up crossing while the mission is running — ignore
    m = stepMission(m, {
      nowMs: 2_000,
      prevBocaZ: 0.0,
      bocaZ: COMING_UP_Z + 0.04,
      reducedMotion: false,
    })
    assert.equal(m.phase, 'liftoff')
    assert.ok(m.startedAtMs === 1_000)

    // Fast-forward to done
    m = stepMission(m, {
      nowMs: 1_000 + 73_000,
      prevBocaZ: 0.4,
      bocaZ: 0.5,
      reducedMotion: false,
    })
    assert.equal(m.phase, 'done')
    assert.equal(m.armed, false)

    // Still on the front — must not rearm
    m = stepMission(m, {
      nowMs: 1_000 + 74_000,
      prevBocaZ: COMING_UP_Z - 0.02,
      bocaZ: COMING_UP_Z + 0.05,
      reducedMotion: false,
    })
    assert.notEqual(m.phase, 'liftoff')
    assert.equal(m.armed, false)

    // Leaves the front (far side) — rearm, return to idle
    m = stepMission(m, {
      nowMs: 1_000 + 80_000,
      prevBocaZ: -0.05,
      bocaZ: -0.3,
      reducedMotion: false,
    })
    assert.equal(m.phase, 'idle')
    assert.equal(m.armed, true)

    // Next coming-up starts a new mission
    m = stepMission(m, {
      nowMs: 200_000,
      prevBocaZ: 0.0,
      bocaZ: COMING_UP_Z + 0.05,
      reducedMotion: false,
    })
    assert.equal(m.phase, 'liftoff')
  })

  it('never leaves idle when prefers-reduced-motion is on', () => {
    let m = createMission()
    m = stepMission(m, {
      nowMs: 10,
      prevBocaZ: -0.2,
      bocaZ: 0.4,
      reducedMotion: true,
    })
    assert.equal(m.phase, 'idle')
    const pose = flightPose({
      missionTimeMs: 5_000,
      pad: padAt(0.8),
      moon: MOON,
      reducedMotion: true,
    })
    assert.equal(pose.phase, 'idle')
    assert.equal(pose.plume, 0)
    assert.equal(pose.ship.visible, false)
  })
})

describe('vehicles', () => {
  const pad = padAt(0.8)

  it('lifts the stack off the pad along local up', () => {
    const t0 = flightPose({ missionTimeMs: 0, pad, moon: MOON, reducedMotion: false })
    const t1 = flightPose({ missionTimeMs: 3_500, pad, moon: MOON, reducedMotion: false })
    assert.equal(t0.phase, 'liftoff')
    assert.ok(t0.plume > 0.4)
    const r0 = Math.hypot(t0.ship.x, t0.ship.y, t0.ship.z)
    const r1 = Math.hypot(t1.ship.x, t1.ship.y, t1.ship.z)
    assert.ok(r1 > r0, 'stack should climb')
    assert.ok(STACK_HEIGHT >= 0.035 && STACK_HEIGHT <= 0.05)
    // Still near the pad radial, not teleported
    const padN = Math.hypot(pad.x, pad.y, pad.z) || 1
    const shipN = Math.hypot(t1.ship.x, t1.ship.y, t1.ship.z) || 1
    const dot =
      (t1.ship.x / shipN) * (pad.x / padN) +
      (t1.ship.y / shipN) * (pad.y / padN) +
      (t1.ship.z / shipN) * (pad.z / padN)
    assert.ok(dot > 0.85, 'liftoff stays on local up')
  })

  it('returns the booster to the pad by the end of booster_land', () => {
    const land = flightPose({ missionTimeMs: 25_500, pad, moon: MOON, reducedMotion: false })
    assert.equal(land.phase, 'booster_land')
    assert.ok(land.booster)
    const d = Math.hypot(land.booster.x - pad.x, land.booster.y - pad.y, land.booster.z - pad.z)
    assert.ok(d < 0.08, `booster should be on pad, dist=${d}`)
    assert.ok(land.dust > 0)
  })

  it('completes exactly one Earth revolution in LEO', () => {
    const a = flightPose({ missionTimeMs: 26_200, pad, moon: MOON, reducedMotion: false })
    const mid = flightPose({ missionTimeMs: 36_000, pad, moon: MOON, reducedMotion: false })
    const b = flightPose({ missionTimeMs: 45_800, pad, moon: MOON, reducedMotion: false })
    assert.equal(a.phase, 'ship_orbit')
    assert.equal(mid.phase, 'ship_orbit')
    assert.equal(b.phase, 'ship_orbit')
    const ra = Math.hypot(a.ship.x, a.ship.y, a.ship.z)
    const rm = Math.hypot(mid.ship.x, mid.ship.y, mid.ship.z)
    const rb = Math.hypot(b.ship.x, b.ship.y, b.ship.z)
    for (const r of [ra, rm, rb]) {
      assert.ok(r >= 1.12 && r <= 1.22, `LEO radius ${r}`)
    }
    assert.ok(Math.abs(LEO_RADIUS - ra) < 0.08)
    const close = Math.hypot(a.ship.x - b.ship.x, a.ship.y - b.ship.y, a.ship.z - b.ship.z)
    assert.ok(close < 0.12, `start/end of rev should match, dist=${close}`)
    const opposite =
      a.ship.x * mid.ship.x + a.ship.y * mid.ship.y + a.ship.z * mid.ship.z
    assert.ok(opposite < 0, 'mid-orbit should be on the far side of Earth')
  })

  it('ends translunar near the current moon pose (no teleport)', () => {
    const start = flightPose({ missionTimeMs: 46_200, pad, moon: MOON, reducedMotion: false })
    const mid = flightPose({ missionTimeMs: 52_000, pad, moon: MOON, reducedMotion: false })
    const end = flightPose({ missionTimeMs: 57_800, pad, moon: MOON, reducedMotion: false })
    assert.equal(start.phase, 'translunar')
    assert.equal(end.phase, 'translunar')
    const dStart = Math.hypot(start.ship.x - MOON.x, start.ship.y - MOON.y, start.ship.z - MOON.z)
    const dEnd = Math.hypot(end.ship.x - MOON.x, end.ship.y - MOON.y, end.ship.z - MOON.z)
    assert.ok(dEnd < dStart, 'transfer should close on the moon')
    assert.ok(dEnd < 0.35, `transfer should finish near moon, dist=${dEnd}`)
    const dMid = Math.hypot(mid.ship.x - MOON.x, mid.ship.y - MOON.y, mid.ship.z - MOON.z)
    assert.ok(dMid > 0.02, 'must lerp, not snap')
  })

  it('lands on the moon disk', () => {
    const land = flightPose({ missionTimeMs: 71_500, pad, moon: MOON, reducedMotion: false })
    assert.equal(land.phase, 'moon_land')
    const d = Math.hypot(land.ship.x - MOON.x, land.ship.y - MOON.y, land.ship.z - MOON.z)
    const moonR = MOON.radius * MOON.scale
    assert.ok(d <= moonR * 1.2, `ship should sit on the moon disk, dist=${d} r=${moonR}`)
    const parked = flightPose({ missionTimeMs: 73_000, pad, moon: MOON, reducedMotion: false })
    assert.equal(parked.phase, 'done')
    const d2 = Math.hypot(parked.ship.x - MOON.x, parked.ship.y - MOON.y, parked.ship.z - MOON.z)
    assert.ok(d2 <= moonR * 1.2)
  })

  it('hot-stage flashes and then splits ship vs booster', () => {
    const hot = flightPose({ missionTimeMs: 11_500, pad, moon: MOON, reducedMotion: false })
    assert.equal(hot.phase, 'hot_stage')
    assert.ok(hot.flash > 0.3)
    assert.ok(hot.booster)
    const sep = Math.hypot(
      hot.ship.x - hot.booster.x,
      hot.ship.y - hot.booster.y,
      hot.ship.z - hot.booster.z,
    )
    assert.ok(sep > 0.005)
  })
})
