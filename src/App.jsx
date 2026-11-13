import { useCallback, useEffect, useState } from 'react'
import Opening from './components/Opening.jsx'
import Hero from './components/Hero.jsx'
import StudioSheet from './components/StudioSheet.jsx'
import Publication from './components/Publication.jsx'
import Closing from './components/Closing.jsx'
import { useReducedMotion } from './hooks/useReducedMotion.js'

export default function App() {
  const reduceMotion = useReducedMotion()
  // Under reduced motion the opening never auto-plays: enter immediately.
  const [entered, setEntered] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const handleDone = useCallback(() => setEntered(true), [])

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [entered])

  return (
    <div id="top" className="bg-ink min-h-screen">
      {!entered && <Opening onDone={handleDone} />}

      {/* Cover deck: the hero holds inside its pin track while Studio
          covers it; each tall chapter then explores naturally, holds its
          tail, and is covered in turn (see .tail-hold). All top-sticky,
          position-driven, fully reversible. */}
      <div className="pin-track bg-ink relative" aria-hidden={!entered}>
        <Hero entered={entered} />
      </div>

      {/* The editorial sheet: studio, publication, closing. */}
      <div className="relative z-10" aria-hidden={!entered}>
        <StudioSheet />
        <Publication reduceMotion={reduceMotion} />
        <Closing />
      </div>
    </div>
  )
}
