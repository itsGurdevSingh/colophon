import { useLayoutEffect, useRef, useState } from 'react'
import HeroType from './HeroType.jsx'

/**
 * Opening motion: one continuous A -> B -> B2 -> C timeline (~4.8s).
 * A single rAF loop writes eased progress variables; the artifact and the
 * wordmark are shared traveling elements, and every caption crossfades
 * through overlapping windows -- nothing flips discretely between frames.
 * The overlay then dissolves onto the real hero (C). Skippable; never
 * auto-plays under reduced motion (the parent skips mounting entirely).
 */
const DURATION = 4800

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const seg = (p, a, b) => clamp01((p - a) / (b - a))
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const lerp = (a, b, t) => a + (b - a) * t

export default function Opening({ onDone }) {
  const rootRef = useRef(null)
  const wmRef = useRef(null)
  const doneRef = useRef(false)
  const segRef = useRef('a')
  const [segment, setSegment] = useState('a')

  useLayoutEffect(() => {
    const root = rootRef.current
    const wm = wmRef.current
    const vw = window.innerWidth
    const vh = window.innerHeight
    const isDesktop = vw >= 1024
    const padX = vw >= 768 ? 48 : 24

    // Wordmark geometry: measure the giant size, then travel to the corner.
    const sizeA = Math.min(Math.max(vw * 0.126, 52), 181)
    const sizeB = vw >= 768 ? 31 : 24
    wm.style.fontSize = `${sizeA}px`
    const ax = vw / 2 - wm.offsetWidth / 2
    const ay = vh * 0.27
    wm.style.fontSize = `${sizeB}px`
    const bx = padX
    const by = vw >= 768 ? 30 : 24
    // Clear the measuring size so the timeline variable takes over.
    wm.style.fontSize = ''

    // Artifact keyframes: small iris -> expanded circle -> hero rect.
    const artA = { x: vw / 2, y: vh * 0.63, w: 100, h: 100, r: 9999 }
    const dB = Math.min(755, 0.84 * Math.min(vw, vh))
    const artB = { x: vw / 2, y: vh * 0.52, w: dB, h: dB, r: 9999 }
    const artC = isDesktop
      ? {
          x: vw * 0.745,
          y: vh * 0.45,
          w: Math.min(343, vw * 0.238),
          h: Math.min(538, vh * 0.595),
          r: 22,
        }
      : {
          x: vw / 2,
          y: vh * 0.68,
          w: Math.min(420, vw * 0.82),
          h: Math.min(440, vh * 0.38),
          r: 14,
        }

    const render = (p) => {
      const s = root.style
      const f3 = (v) => v.toFixed(3)
      const f1 = (v) => v.toFixed(1)

      // Artifact travel with a gentle float while the circle holds.
      const mAB = easeInOut(seg(p, 0.3, 0.52))
      const mBC = easeInOut(seg(p, 0.62, 0.85))
      const mix = (ka, kb, kc) => lerp(lerp(ka, kb, mAB), kc, mBC)
      const hold = seg(p, 0.5, 0.56) * (1 - seg(p, 0.58, 0.64))
      const float = Math.sin(p * Math.PI * 3) * 5 * hold
      s.setProperty('--ap-x', `${f1(mix(artA.x, artB.x, artC.x))}px`)
      s.setProperty('--ap-y', `${f1(mix(artA.y, artB.y, artC.y) + float)}px`)
      s.setProperty('--ap-w', `${f1(mix(artA.w, artB.w, artC.w))}px`)
      s.setProperty('--ap-h', `${f1(mix(artA.h, artB.h, artC.h))}px`)
      s.setProperty('--ap-r', `${f1(mix(artA.r, artB.r, artC.r))}px`)
      s.setProperty('--ap-o', f3(easeOut(seg(p, 0, 0.08))))

      // Wordmark: rise in, then condense to the corner.
      const mW = easeInOut(seg(p, 0.28, 0.5))
      s.setProperty('--wm-x', `${f1(lerp(ax, bx, mW))}px`)
      s.setProperty(
        '--wm-y',
        `${f1(lerp(ay, by, mW) + (1 - easeOut(seg(p, 0, 0.09))) * 18)}px`
      )
      s.setProperty('--wm-s', `${f1(lerp(sizeA, sizeB, mW))}px`)
      s.setProperty('--wm-o', f3(easeOut(seg(p, 0, 0.07))))

      // Frame A captions.
      s.setProperty(
        '--o-tag',
        f3(easeOut(seg(p, 0.03, 0.1)) * (1 - easeInOut(seg(p, 0.22, 0.3))))
      )
      s.setProperty('--o-fa', f3(1 - easeInOut(seg(p, 0.22, 0.3))))

      // Frame B kinetic group.
      const kinIn = easeOut(seg(p, 0.34, 0.44))
      const kinOut = easeInOut(seg(p, 0.55, 0.64))
      s.setProperty('--o-kin', f3(kinIn * (1 - kinOut)))
      s.setProperty('--kin-y', `${f1((1 - kinIn) * 26 + kinOut * -18)}px`)

      // Frame B2 chrome + ghost headline.
      s.setProperty('--o-nav', f3(easeOut(seg(p, 0.6, 0.7))))
      const gY = easeOut(seg(p, 0.64, 0.8))
      s.setProperty('--g-y', `${f1((1 - gY) * 30)}px`)
      s.setProperty('--o-g1', f3(easeOut(seg(p, 0.64, 0.74))))
      s.setProperty('--o-g2', f3(easeOut(seg(p, 0.68, 0.78))))
      s.setProperty('--o-g3', f3(easeOut(seg(p, 0.72, 0.82))))

      // Dissolve onto the hero.
      s.setProperty('--o-root', f3(1 - easeInOut(seg(p, 0.9, 1))))

      const id = p < 0.3 ? 'a' : p < 0.62 ? 'b' : p < 0.9 ? 'b2' : 'c'
      if (id !== segRef.current) {
        segRef.current = id
        setSegment(id)
      }
    }

    render(0)

    let raf = 0
    let t0 = -1
    let started = false
    let cancelled = false
    const finish = () => {
      if (!doneRef.current) {
        doneRef.current = true
        onDone()
      }
    }
    const tick = (now) => {
      if (cancelled) return
      if (t0 < 0) t0 = now
      const p = Math.min(1, (now - t0) / DURATION)
      render(p)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }
    const start = () => {
      if (started || cancelled) return
      started = true
      raf = requestAnimationFrame(tick)
    }
    // Wait briefly for fonts so letterforms don't pop mid-morph.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start)
      window.setTimeout(start, 600)
    } else {
      start()
    }
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [onDone])

  useLayoutEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape' && !doneRef.current) {
        doneRef.current = true
        onDone()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDone])

  const skip = () => {
    if (!doneRef.current) {
      doneRef.current = true
      onDone()
    }
  }

  return (
    <div
      ref={rootRef}
      className="opening bg-ink text-paper fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Colophon opening sequence"
    >
      {/* Shared artifact: iris -> circle -> hero rect */}
      <div className="opening-artifact" aria-hidden="true">
        <img src="/images/hero-sculpture.png" alt="" draggable="false" />
      </div>

      {/* Shared wordmark: monument -> corner */}
      <p
        ref={wmRef}
        aria-hidden="true"
        className="opening-wordmark font-sans font-bold tracking-[-0.05em]"
      >
        colophon
      </p>

      {/* Frame A captions */}
      <p className="opening-fa text-mist absolute top-8 left-6 font-mono text-xs tracking-[0.05em] md:left-12">
        FRAME 01 / BRAND ARRIVAL
      </p>
      <p className="opening-tag text-mist absolute inset-x-0 top-[83%] text-center font-mono text-[11px] tracking-[0.05em] md:text-xs">
        THE CONTENT SYSTEM THAT DOES NOT STAND STILL
      </p>

      {/* Frame B kinetic group */}
      <div className="opening-kin absolute inset-0" aria-hidden="true">
        <p className="text-mist absolute top-10 right-6 hidden font-mono text-xs tracking-[0.05em] sm:block md:right-12">
          FRAME 02 / APERTURE REVEAL
        </p>
        <p className="font-display absolute top-[38%] left-6 text-[clamp(3rem,12vw,8.2rem)] leading-none tracking-[-0.03em] md:left-[7%]">
          IDEAS
        </p>
        <p className="absolute right-6 bottom-[24%] text-right font-sans text-[clamp(1.8rem,7vw,5.9rem)] leading-none font-bold tracking-[-0.04em] md:right-[8%]">
          IN MOTION
        </p>
        <p className="text-mist absolute bottom-8 left-6 font-mono text-xs tracking-[0.05em] md:left-12">
          PAPER / LIGHT / MOTION
        </p>
      </div>

      {/* Frame B2 chrome + ghost headline */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="opening-nav absolute inset-x-6 top-8 md:inset-x-12">
          <div className="flex items-baseline justify-between">
            <p className="font-sans text-2xl font-bold tracking-tight opacity-0 md:text-3xl">
              colophon
            </p>
            <p className="text-mist hidden font-mono text-xs tracking-[0.05em] sm:block">
              FRAME 02.5 / SHARED IMAGE MORPH
            </p>
          </div>
          <div className="bg-heroline mt-4 h-px opacity-50" />
        </div>
        <div className="absolute inset-x-0 top-[16%] px-[7vw] lg:top-[19%]">
          <HeroType variant="ghost" />
        </div>
      </div>

      {/* Progress + skip */}
      <div className="absolute inset-x-6 bottom-6 flex items-center justify-between md:inset-x-12">
        <p
          className="text-mist font-mono text-xs tracking-[0.15em]"
          aria-live="polite"
        >
          {['a', 'b', 'b2', 'c'].map((id, i) => (
            <span
              key={id}
              className={segment === id ? 'text-paper' : 'opacity-50'}
            >
              {id.toUpperCase()}
              {i < 3 && <span className="mx-2 opacity-50">/</span>}
            </span>
          ))}
        </p>
        <button
          type="button"
          onClick={skip}
          className="text-mist hover:text-paper cursor-pointer font-mono text-xs tracking-[0.15em] transition-colors"
        >
          SKIP
        </button>
      </div>
    </div>
  )
}
