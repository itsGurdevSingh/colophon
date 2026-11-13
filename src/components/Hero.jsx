import { useEffect, useState } from 'react'
import HeroType from './HeroType.jsx'

function ArrowIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 17 17 7M9 7h8v8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 42 42"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="30" height="30" rx="2" />
      <path d="M13 18h16M13 24h16" strokeLinecap="round" />
    </svg>
  )
}

function MenuOverlay({ onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const links = [
    { n: '01', label: 'The platform', href: '#studio' },
    { n: '02', label: 'Our thinking', href: '#publication' },
    { n: '03', label: 'Start creating', href: '#closing' },
  ]

  return (
    <div
      className="bg-ink fixed inset-0 z-40 flex flex-col px-6 py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="flex items-center justify-between">
        <p className="font-sans text-2xl font-bold tracking-tight">
          colophon<span className="text-lilac">.</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="text-mist hover:text-paper cursor-pointer font-mono text-xs tracking-[0.15em] transition-colors"
        >
          CLOSE
        </button>
      </div>
      <div className="bg-heroline mt-4 h-px" />
      <nav className="flex flex-1 flex-col justify-center gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="group border-heroline/60 flex items-baseline gap-5 border-b py-5"
          >
            <span className="text-mist font-mono text-xs">{link.n}</span>
            <span className="font-display text-4xl tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
              {link.label}
            </span>
            <ArrowIcon className="text-mist group-hover:text-paper ml-auto h-6 w-6 transition-colors" />
          </a>
        ))}
      </nav>
      <p className="text-mist font-mono text-[11px] tracking-[0.08em]">
        THE LIVING CONTENT SYSTEM
      </p>
    </div>
  )
}

export default function Hero({ entered }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className={`hero-sticky bg-ink text-paper sticky top-0 z-0 overflow-hidden ${entered ? 'is-entered' : ''}`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] flex-col px-5 pt-5 sm:px-8 md:px-10 md:pt-6 lg:px-20 lg:pt-8">
        {/* Nav */}
        <nav
          className="hero-fade flex items-center gap-3"
          aria-label="Primary"
          style={{ transitionDelay: '50ms' }}
        >
          <a
            href="#top"
            className="font-sans text-2xl font-bold tracking-[-0.03em] md:text-[27px]"
          >
            colophon
            <span
              className="bg-lilac ml-1 inline-block h-2 w-2 rounded-full align-middle"
              aria-hidden="true"
            />
          </a>
          <span className="text-mist ml-3 hidden font-mono text-[10px] tracking-[0.12em] md:inline">
            THE LIVING CONTENT SYSTEM
          </span>
          <span className="flex-1" />
          <a
            href="#studio"
            className="hover:text-lilac hidden font-sans text-sm font-medium transition-colors lg:inline"
          >
            The platform
          </a>
          <a
            href="#publication"
            className="hover:text-lilac ml-8 hidden font-sans text-sm font-medium transition-colors lg:inline"
          >
            Our thinking
          </a>
          <a
            href="#closing"
            className="text-paper hover:text-lilac ml-8 hidden transition-colors lg:inline"
            aria-label="Go to closing"
          >
            <ArrowIcon />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="text-paper flex cursor-pointer items-center gap-3 lg:hidden"
          >
            <span className="hidden font-mono text-xs tracking-[0.1em] sm:inline">
              MENU
            </span>
            <span className="sm:hidden">
              <MenuIcon />
            </span>
            <span className="hidden sm:inline">
              <ArrowIcon className="h-5 w-5" />
            </span>
          </button>
        </nav>
        <div
          className="hero-fade bg-heroline mt-4 h-px shrink-0"
          style={{ transitionDelay: '100ms' }}
        />

        {/* Desktop: type left, art right */}
        <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[1fr_minmax(0,338px)] lg:gap-12">
          <div className="flex min-h-0 flex-col justify-center py-4">
            <HeroType variant="live" />
          </div>
          <figure
            className="hero-art relative my-auto hidden h-[min(56vh,540px)] w-full shrink-0 lg:block"
            style={{ transitionDelay: '520ms' }}
          >
            <span
              className="bg-paper absolute top-0 -left-2 h-full w-[6px]"
              aria-hidden="true"
            />
            <img
              src="/images/hero-sculpture.png"
              alt="Folded-paper sculpture bound with a cobalt ribbon"
              className="h-full w-full rounded-[2px] object-cover"
              draggable="false"
            />
            <figcaption className="text-mist mt-3 font-mono text-[11px] tracking-[0.05em]">
              ART DIRECTION / 001
            </figcaption>
          </figure>
        </div>

        {/* Tablet + mobile: stacked, art flexes into leftover space */}
        <div className="flex min-h-0 flex-1 flex-col py-4 lg:hidden">
          <HeroType variant="live" />
          <figure
            className="hero-art relative mt-4 min-h-[16vh] flex-1"
            style={{ transitionDelay: '520ms' }}
          >
            <span
              className="bg-violet absolute top-0 -left-1.5 z-10 h-full w-1 md:w-[5px]"
              aria-hidden="true"
            />
            <img
              src="/images/hero-sculpture.png"
              alt="Folded-paper sculpture bound with a cobalt ribbon"
              className="absolute inset-0 h-full w-full rounded-[2px] object-cover"
              draggable="false"
            />
          </figure>
          <figcaption
            className="hero-fade text-mist mt-2 font-mono text-[10px] tracking-[0.08em]"
            style={{ transitionDelay: '600ms' }}
          >
            <span className="md:hidden">FIG. 01 / LIVE MATERIAL</span>
            <span className="hidden md:inline">01 / CREATIVE MATERIAL</span>
          </figcaption>
        </div>

        {/* Bottom row */}
        <div
          className="hero-fade shrink-0 pb-5 md:pb-6"
          style={{ transitionDelay: '650ms' }}
        >
          <div className="bg-herorule h-px" />
          <div className="mt-3 flex flex-col gap-4 md:mt-4 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl font-sans text-[17px] leading-snug md:text-lg lg:text-[21px] lg:leading-[1.5]">
              <span className="lg:hidden">
                Ideas refuse to stay inside a template.
              </span>
              <span className="hidden lg:inline">
                A content studio for teams whose ideas
                <br />
                refuse to stay inside a template.
              </span>
            </p>
            {/* Desktop CTA */}
            <a
              href="#studio"
              className="group hidden items-center gap-5 lg:flex"
              aria-label="Explore the platform"
            >
              <span className="font-sans text-sm font-medium tracking-[0.07em]">
                EXPLORE THE PLATFORM
              </span>
              <span className="border-paper/70 group-hover:bg-paper group-hover:text-ink flex h-[59px] w-[59px] items-center justify-center rounded-full border transition-colors duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="cta-arrow h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    d="M12 4v16m0 0 6-6m-6 6-6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            {/* Tablet / mobile CTA */}
            <a
              href="#studio"
              className="group bg-violet flex items-center justify-between gap-4 px-5 py-4 font-sans text-sm font-medium text-white lg:hidden"
            >
              Explore the studio
              <ArrowIcon className="cta-arrow h-5 w-5" />
            </a>
          </div>
          <p className="text-mist mt-3 hidden font-mono text-[11px] tracking-[0.05em] md:block">
            SCROLL / 02
          </p>
        </div>
      </div>

      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </header>
  )
}
