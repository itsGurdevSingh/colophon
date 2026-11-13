import { useEffect } from 'react'

/**
 * Scrub a `--p` (0..1) progress variable onto a tall track element based on
 * scroll position. Purely scroll-driven, therefore trivially reversible.
 * Writes directly to the DOM (no re-renders); consumers animate with
 * transform/opacity derived from `var(--p)`.
 */
export function useScrub(trackRef, disabled = false) {
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    if (disabled) {
      el.style.setProperty('--p', '1')
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1
      el.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [trackRef, disabled])
}
