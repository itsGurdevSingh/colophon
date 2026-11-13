import { useLayoutEffect } from 'react'

/**
 * Tail-hold for tall chapters: the section scrolls through naturally,
 * then holds with its tail filling the viewport while the next sheet
 * covers it. Equivalent to `top: -(H - 100vh)`, measured because sticky
 * `top` percentages don't resolve against content-height parents.
 * Re-measures on resize and on any size change (tab switches, images,
 * fonts) via ResizeObserver.
 */
export function useTailHold(ref) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const h = el.offsetHeight
      const v = window.innerHeight
      el.style.top = h > v ? `${-(h - v)}px` : '0px'
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update).catch(() => {})
    }
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [ref])
}
