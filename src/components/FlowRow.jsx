export default function FlowRow({ published }) {
  return (
    <div className="mt-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.05em] sm:gap-5 sm:text-[13px] md:mt-14">
      <span>01&nbsp;&nbsp;COMPOSE</span>
      <span className="bg-line h-px w-8 sm:w-[104px]" aria-hidden="true" />
      <span>02&nbsp;&nbsp;REFINE</span>
      <span className="bg-line h-px w-8 sm:w-[104px]" aria-hidden="true" />
      <span className={published ? 'text-violet' : undefined}>
        03&nbsp;&nbsp;{published ? 'LIVE ●' : 'GO LIVE'}
      </span>
      <span className="flex-1" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M4 12h16m0 0-5-5m5 5-5 5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
