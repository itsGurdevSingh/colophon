import { useRef, useState } from 'react'
import CmsWorkspace from './CmsWorkspace.jsx'
import FlowRow from './FlowRow.jsx'
import { useTailHold } from '../hooks/useTailHold.js'

/**
 * Studio chapter: scrolls over the hero, explores naturally, then its
 * tail holds (see .tail-hold) while the violet chapter covers it.
 */
export default function StudioSheet() {
  const [published, setPublished] = useState(false)
  const sectionRef = useRef(null)
  useTailHold(sectionRef)

  return (
    <div className="bg-paper relative -mt-[100svh]">
      <section
        id="studio"
        ref={sectionRef}
        className="tail-hold bg-paper text-ink shadow-[0_-28px_70px_-24px_rgba(0,0,0,0.55)]"
      >
        <div className="mx-auto max-w-[1440px] px-5 pt-14 pb-16 sm:px-8 md:px-10 md:pt-20 lg:px-20 lg:pb-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-[clamp(2.8rem,9vw,5rem)] leading-[1.02] tracking-[-0.03em] md:text-[clamp(3.5rem,10vw,5.4rem)] lg:text-[7.2rem] lg:leading-[1.03]">
              The page is
              <br />
              the product.
            </h2>
            <p className="max-w-md font-sans text-[16px] leading-relaxed md:text-[17px] lg:pb-3 lg:text-lg">
              Write, shape, review and publish in one continuous creative
              space.
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <CmsWorkspace onPublished={() => setPublished(true)} />
          </div>

          <FlowRow published={published} />
        </div>
      </section>
      <div aria-hidden="true" className="bg-paper h-[100svh]" />
    </div>
  )
}
