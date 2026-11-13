import { useRef } from 'react'
import { useScrub } from '../hooks/useScrub.js'
import { useTailHold } from '../hooks/useTailHold.js'

/**
 * Studio -> Publication: a scroll-scrubbed storytelling sequence (not a
 * publish confirmation). The editor artwork starts as a full-bleed draft
 * card and, driven purely by scroll progress, crops into the printed
 * Edition 04 cover. The chapter copy stays visible beside the poster for
 * the whole sequence. Fully reversible: every visual is a pure function
 * of `--p`. Once the morph completes, the tail holds while Closing covers
 * it (see .tail-hold).
 */
export default function Publication({ reduceMotion }) {
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  useScrub(trackRef, reduceMotion)
  useTailHold(sectionRef)

  return (
    <div className="bg-violet relative -mt-[100svh]">
      <section
        id="publication"
        ref={sectionRef}
        className="tail-hold bg-violet text-white"
      >
        <div
          ref={trackRef}
          className="poster-track relative h-[200vh] md:h-[220vh]"
          style={reduceMotion ? { '--p': 1 } : undefined}
        >
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-[1440px] items-center gap-6 px-5 sm:px-8 md:grid-cols-[1.05fr_1fr] md:gap-4 md:px-10 lg:gap-10 lg:px-20">
              <div>
                <h2 className="font-display text-[clamp(2.4rem,11vw,3.4rem)] leading-[1.02] tracking-[-0.03em] sm:text-[clamp(3rem,9vw,4.5rem)] lg:text-[clamp(4rem,7.5vw,7.2rem)]">
                  One story.
                  <br />
                  Everywhere
                  <br />
                  it belongs.
                </h2>
                <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed md:mt-6 md:text-lg lg:text-xl">
                  Shape once. Share everywhere. Keep the story alive.
                </p>
              </div>

              <div className="flex min-h-0 justify-center md:justify-end lg:justify-center">
                <figure
                  className="poster-card [container-type:inline-size]"
                  aria-label="Edition 04 cover evolving from draft artwork to printed poster as you scroll"
                >
                  <div className="poster-paper" aria-hidden="true" />
                  <div className="poster-art" aria-hidden="true">
                    <img
                      src="/images/editorial-artwork.png"
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <div
                    className="poster-copy absolute top-[6.5%] right-[10%] left-[15%]"
                    aria-hidden="true"
                  >
                    <p className="text-smoke font-mono text-[2.9cqw] tracking-[0.05em]">
                      ISSUE 04 / CULTURE
                    </p>
                    <p className="font-display text-ink mt-[4cqw] text-[21cqw] leading-[0.97] tracking-[-0.04em]">
                      THE
                      <br />
                      NEW
                      <br />
                      NOW.
                    </p>
                  </div>
                  <div className="poster-motif" aria-hidden="true" />
                  <div className="poster-cutout" aria-hidden="true" />
                  <figcaption className="poster-draft-tag font-mono text-[11px] tracking-[0.08em] whitespace-nowrap text-white/85">
                    DRAFT / EDITION 04 — KEEP SCROLLING
                  </figcaption>
                </figure>
              </div>
            </div>

            <p className="poster-live-tag absolute inset-x-0 bottom-[4%] text-center font-mono text-xs tracking-[0.1em]">
              ●&nbsp;&nbsp;PUBLICATION LIVE
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 md:px-10 md:pb-24 lg:px-20">
          <p className="max-w-md font-mono text-[11px] leading-relaxed tracking-[0.06em] text-white/75">
            A STORYTELLING PREVIEW OF THE PRINTED EDITION — PRESSING PUBLISH
            WAS NEVER REQUIRED TO GET HERE.
          </p>
        </div>
      </section>
      <div aria-hidden="true" className="bg-violet h-[100svh]" />
    </div>
  )
}
