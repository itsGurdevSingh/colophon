/**
 * Shared hero typography. `variant="live"` renders masked lines that reveal
 * when an ancestor carries `.is-entered`; `variant="ghost"` renders the faint
 * B2 storyboard state used inside the opening overlay.
 */
export default function HeroType({ variant = 'live' }) {
  if (variant === 'ghost') {
    return (
      <div aria-hidden="true" className="select-none">
        <p className="opening-g1 font-display text-paper text-[clamp(2.4rem,13.2vw,3.9rem)] leading-[1.06] font-normal tracking-[-0.035em] md:text-[clamp(3.5rem,10vw,6.2rem)] lg:text-[clamp(4.4rem,9.2vw,8.5rem)]">
          Make ideas
        </p>
        <p className="opening-g2 text-paper font-sans text-[clamp(2.3rem,12.8vw,3.7rem)] leading-[1.05] font-bold tracking-[-0.045em] md:text-[clamp(3.3rem,9.7vw,6rem)] lg:text-[clamp(4.2rem,8.8vw,8.2rem)]">
          impossible
        </p>
        <p className="opening-g3 font-display text-lilac text-[clamp(2.35rem,13vw,3.8rem)] leading-[1.08] font-normal tracking-[-0.03em] italic md:text-[clamp(3.4rem,9.9vw,6.1rem)] lg:text-[clamp(4.3rem,9vw,8.3rem)]">
          to ignore.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>
        <span className="reveal-mask">
          <span
            className="reveal-line font-display text-paper text-[clamp(2.4rem,13.2vw,3.9rem)] leading-[1.06] font-normal tracking-[-0.035em] md:text-[clamp(3.5rem,10vw,6.2rem)] lg:text-[clamp(4.4rem,9.2vw,8.5rem)]"
            style={{ transitionDelay: '250ms' }}
          >
            Make ideas
          </span>
        </span>
        <span className="reveal-mask">
          <span
            className="reveal-line text-paper font-sans text-[clamp(2.3rem,12.8vw,3.7rem)] leading-[1.05] font-bold tracking-[-0.045em] md:text-[clamp(3.3rem,9.7vw,6rem)] lg:text-[clamp(4.2rem,8.8vw,8.2rem)]"
            style={{ transitionDelay: '340ms' }}
          >
            impossible
          </span>
        </span>
        <span className="reveal-mask">
          <span
            className="reveal-line font-display text-lilac text-[clamp(2.35rem,13vw,3.8rem)] leading-[1.08] font-normal tracking-[-0.03em] italic md:text-[clamp(3.4rem,9.9vw,6.1rem)] lg:text-[clamp(4.3rem,9vw,8.3rem)]"
            style={{ transitionDelay: '430ms' }}
          >
            to ignore.
          </span>
        </span>
      </h1>
    </div>
  )
}
