import { useInView } from '../hooks/useInView.js'

export default function Closing() {
  const [ref, inView] = useInView(0.4)

  return (
    <section
      id="closing"
      className="bg-paper text-ink relative min-h-[100svh] -mt-[100svh]"
    >
      <div className="mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pt-16 pb-8 sm:px-8 md:px-10 md:pt-24 lg:px-20">
        <p className="text-smoke font-mono text-[11px] tracking-[0.08em] md:text-xs">
          THE NEXT EDITION STARTS HERE
        </p>
        <h2
          ref={ref}
          className={`closing-reveal font-display mt-4 text-[clamp(2.9rem,11vw,5rem)] leading-[1.03] tracking-[-0.03em] md:text-[clamp(3.5rem,9.5vw,6rem)] lg:text-[7.4rem] ${
            inView ? 'is-visible' : ''
          }`}
        >
          Make something
          <br />
          worth opening.
        </h2>

        <div className="mt-10 mb-12 md:mt-12 md:mb-16 lg:flex lg:justify-end">
          <a
            href="#studio"
            className="group bg-ink text-paper hover:bg-ink-soft flex w-full items-center justify-between gap-6 px-5 py-5 font-sans text-sm font-medium transition-colors sm:w-auto sm:min-w-[267px] sm:px-6 sm:py-6"
          >
            Start creating
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="cta-arrow h-6 w-6"
              aria-hidden="true"
            >
              <path
                d="M7 17 17 7M9 7h8v8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="border-line text-smoke mt-auto flex items-center justify-between border-t pt-5 font-mono text-[11px] tracking-[0.06em] md:text-xs">
          <p>© COLOPHON 2026</p>
          <p className="hidden text-right sm:block">
            THOUGHTFULLY MADE FOR PEOPLE WHO MAKE
          </p>
        </div>
      </div>
    </section>
  )
}
