import { useEffect, useRef, useState } from 'react'

const TABS = [
  { id: 'overview', label: 'Overview', doc: 'THE NEW EDITION / ESSAY 04' },
  { id: 'editor', label: 'Editor', doc: 'ESSAY 04 — ALT OPENING / DRAFT 02' },
  { id: 'assets', label: 'Assets', doc: 'LIBRARY / EDITION 04 ASSETS' },
  { id: 'new', label: 'New', doc: 'UNTITLED / NEW STORY' },
]

const INITIAL_DRAFTS = {
  overview: {
    kicker: 'STORY / EDITORIAL',
    headline: 'The shape\nof things\nto come.',
    dek: 'A study of the spaces we make, the things we keep, and the worlds that begin with an idea.',
    meta: 'MIRA K.  •  LAST EDITED 2 MIN AGO',
  },
  editor: {
    kicker: 'STORY / ESSAY 04 — ALT OPENING',
    headline: 'Paper,\nlight,\nand motion.',
    dek: 'An alternate opening pass: shorter lines, same spine. Keep the version that earns the cover.',
    meta: 'MIRA K.  •  LAST EDITED 1 HOUR AGO',
  },
  new: {
    kicker: 'STORY / NEW DRAFT',
    headline: '',
    dek: '',
    meta: 'MIRA K.  •  NOT SAVED YET',
  },
}

const ASSETS = [
  { label: 'COVER / WIDE', note: 'AUTOMATICALLY SYNCED', position: '50% 30%' },
  { label: 'DETAIL / FOLD', note: 'READY FOR REVIEW', position: '20% 60%' },
  { label: 'DETAIL / COBALT', note: 'READY FOR REVIEW', position: '80% 55%' },
]

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  )
}

function ArrowUpRightIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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

function TabIcon({ id }) {
  const cls = 'h-[22px] w-[22px]'
  if (id === 'overview')
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={cls}
        aria-hidden="true"
      >
        <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1" />
        <rect x="13" y="3.5" width="7.5" height="7.5" rx="1" />
        <rect x="3.5" y="13" width="7.5" height="7.5" rx="1" />
        <rect x="13" y="13" width="7.5" height="7.5" rx="1" />
      </svg>
    )
  if (id === 'editor')
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={cls}
        aria-hidden="true"
      >
        <path
          d="m14.5 5.5 4 4L8 20l-5 1 1-5L14.5 5.5Z"
          strokeLinejoin="round"
        />
      </svg>
    )
  if (id === 'assets')
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={cls}
        aria-hidden="true"
      >
        <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m5 18 5-4.5 3.5 3 3-2.5L20 17" strokeLinejoin="round" />
      </svg>
    )
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={cls}
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

/** Uncontrolled contentEditable: edits live in a ref so keystrokes never
 *  trigger a re-render that would move the caret. Remounts per tab via key. */
function Editable({ value, onInput, placeholder, className, label }) {
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      role="textbox"
      aria-label={label}
      aria-multiline="true"
      data-placeholder={placeholder}
      onInput={(e) => onInput(e.currentTarget.innerText)}
      onPaste={(e) => {
        e.preventDefault()
        document.execCommand(
          'insertText',
          false,
          e.clipboardData.getData('text/plain')
        )
      }}
      className={className}
    >
      {value}
    </div>
  )
}

function ModalShell({ onClose, label, children }) {
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

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="modal-backdrop bg-ink/70 absolute inset-0 cursor-pointer backdrop-blur-[2px]"
      />
      <div className="modal-panel bg-paper text-ink relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-md shadow-2xl">
        {children}
      </div>
    </div>
  )
}

function PreviewModal({ draft, onClose }) {
  return (
    <ModalShell onClose={onClose} label="Preview demonstration">
      <div className="border-line flex items-center justify-between border-b px-5 py-4 sm:px-8">
        <p className="text-smoke font-mono text-[11px] tracking-[0.08em]">
          PREVIEW / READER VIEW — DEMONSTRATION
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="text-smoke hover:text-ink cursor-pointer font-mono text-xs tracking-[0.1em] transition-colors"
        >
          CLOSE
        </button>
      </div>
      <div className="px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-smoke font-mono text-[11px] tracking-[0.08em]">
          {draft.kicker}
        </p>
        <h3 className="font-display mt-4 text-4xl leading-[1.05] tracking-[-0.03em] whitespace-pre-line sm:text-5xl">
          {draft.headline || 'Untitled story'}
        </h3>
        <p className="text-ink/80 mt-5 max-w-lg font-sans text-[17px] leading-relaxed">
          {draft.dek ||
            'Nothing written yet — this is how the reader view will feel once the draft has words.'}
        </p>
        <figure className="mt-8">
          <img
            src="/images/editorial-artwork.png"
            alt="Paper arc and cobalt monolith artwork"
            className="aspect-[16/10] w-full rounded-[3px] object-cover"
          />
          <figcaption className="text-smoke mt-2 font-mono text-[11px] tracking-[0.05em]">
            01 / VISUAL ASSET · AUTOMATICALLY SYNCED
          </figcaption>
        </figure>
        <p className="text-smoke mt-6 font-mono text-[11px] tracking-[0.05em]">
          {draft.meta}
        </p>
      </div>
    </ModalShell>
  )
}

const PUBLISH_STEPS = ['Compose', 'Refine', 'Go live']

function PublishModal({ onClose, onPublished }) {
  const [step, setStep] = useState(0)
  const done = step >= PUBLISH_STEPS.length

  useEffect(() => {
    if (done) {
      onPublished()
      return
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), 750)
    return () => window.clearTimeout(t)
  }, [step, done, onPublished])

  return (
    <ModalShell onClose={onClose} label="Publish demonstration">
      <div className="border-line flex items-center justify-between border-b px-5 py-4 sm:px-8">
        <p className="text-smoke font-mono text-[11px] tracking-[0.08em]">
          PUBLISH / EDITION 04 — DEMONSTRATION
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="text-smoke hover:text-ink cursor-pointer font-mono text-xs tracking-[0.1em] transition-colors"
        >
          CLOSE
        </button>
      </div>
      <div className="px-5 py-8 sm:px-8 sm:py-10">
        {!done ? (
          <>
            <p className="font-display text-3xl tracking-[-0.02em] sm:text-4xl">
              Sending the edition out…
            </p>
            <ol className="mt-8 space-y-4">
              {PUBLISH_STEPS.map((label, i) => {
                const state = i < step ? 'done' : i === step ? 'active' : 'todo'
                return (
                  <li key={label} className="flex items-center gap-4">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs ${
                        state === 'done'
                          ? 'border-violet bg-violet text-white'
                          : state === 'active'
                            ? 'border-violet text-violet'
                            : 'border-line text-smoke'
                      }`}
                      aria-hidden="true"
                    >
                      {state === 'done' ? '✓' : `0${i + 1}`}
                    </span>
                    <span
                      className={`font-sans text-lg ${state === 'todo' ? 'text-smoke' : ''}`}
                    >
                      {label}
                    </span>
                    {state === 'active' && (
                      <span className="text-violet ml-auto font-mono text-[11px] tracking-[0.08em]">
                        WORKING
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </>
        ) : (
          <>
            <p className="bg-lilac-soft text-violet inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.08em]">
              <span aria-hidden="true">●</span> EDITION LIVE
            </p>
            <p className="font-display mt-5 text-3xl leading-tight tracking-[-0.02em] sm:text-4xl">
              Edition 04 is live —<br />
              everywhere it belongs.
            </p>
            <p className="text-smoke mt-4 font-mono text-xs tracking-[0.04em]">
              colophon.press/editions/04 · ALL CHANNELS SYNCHRONIZED
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="bg-ink text-paper hover:bg-ink-soft cursor-pointer px-6 py-3.5 font-sans text-sm font-medium transition-colors"
              >
                Back to the studio
              </button>
              <a
                href="#publication"
                onClick={onClose}
                className="group border-line hover:border-ink flex items-center justify-center gap-2 border px-6 py-3.5 font-sans text-sm font-medium transition-colors"
              >
                See the showcase
                <ArrowUpRightIcon />
              </a>
            </div>
          </>
        )}
        <p className="border-line text-smoke mt-8 border-t pt-4 font-mono text-[11px] tracking-[0.05em]">
          DEMONSTRATION STATE — NOTHING WAS SENT. SCROLLING ON IS ALWAYS
          OPTIONAL.
        </p>
      </div>
    </ModalShell>
  )
}

export default function CmsWorkspace({ onPublished }) {
  const [tab, setTab] = useState('overview')
  const [status, setStatus] = useState('saved')
  const [metaNote, setMetaNote] = useState({})
  const [previewOpen, setPreviewOpen] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  const draftsRef = useRef(structuredClone(INITIAL_DRAFTS))
  const saveTimer = useRef(0)

  useEffect(() => () => window.clearTimeout(saveTimer.current), [])

  const activeDoc = TABS.find((t) => t.id === tab)
  const draft = draftsRef.current[tab] ?? draftsRef.current.overview

  const handleEdit = (field) => (text) => {
    draftsRef.current[tab][field] = text
    setStatus('saving')
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      setStatus('saved')
      setMetaNote((prev) => ({
        ...prev,
        [tab]:
          tab === 'new'
            ? 'MIRA K.  •  SAVED JUST NOW'
            : 'MIRA K.  •  LAST EDITED JUST NOW',
      }))
    }, 900)
  }

  return (
    <div className="border-line-soft bg-card text-ink overflow-hidden rounded-md border shadow-[0_30px_80px_-40px_rgba(21,21,27,0.35)]">
      {/* Chrome */}
      <div className="border-line bg-chrome flex items-center gap-3 border-b px-4 py-3 sm:px-6 sm:py-4">
        <span
          className="bg-violet h-[18px] w-[18px] shrink-0 rounded-full"
          aria-hidden="true"
        />
        <p className="font-mono text-[10px] tracking-[0.06em] sm:text-xs">
          COLOPHON / STUDIO
        </p>
        <p className="text-smoke hidden truncate font-mono text-[11px] tracking-[0.05em] md:ml-6 md:block">
          {activeDoc.doc}
        </p>
        <span className="flex-1" />
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="border-line bg-paper hover:border-ink flex cursor-pointer items-center gap-2 rounded border px-3 py-2 font-sans text-xs transition-colors sm:px-4 sm:py-2.5"
        >
          <EyeIcon />
          Preview
        </button>
        <button
          type="button"
          onClick={() => setPublishOpen(true)}
          className="bg-violet hover:bg-violet-deep flex cursor-pointer items-center gap-2 rounded px-3 py-2 font-sans text-xs font-medium text-white transition-colors sm:px-4 sm:py-2.5"
        >
          Publish
          <ArrowUpRightIcon />
        </button>
      </div>

      {/* Mobile tab bar (the dock is desktop/tablet only, per Figma) */}
      <div
        className="border-line bg-paper flex gap-1 overflow-x-auto border-b px-3 py-2 md:hidden"
        role="tablist"
        aria-label="Studio sections"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`cursor-pointer rounded px-3 py-2 font-mono text-[11px] tracking-[0.06em] whitespace-nowrap transition-colors ${
              tab === t.id ? 'bg-ink text-paper' : 'text-smoke hover:text-ink'
            }`}
          >
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex">
        {/* Dock */}
        <div
          className="border-line bg-dock hidden w-[68px] shrink-0 flex-col items-center gap-2 border-r py-6 md:flex lg:w-20"
          role="tablist"
          aria-label="Studio sections"
          aria-orientation="vertical"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              title={t.label}
              aria-label={t.label}
              onClick={() => setTab(t.id)}
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-[5px] transition-colors lg:h-12 lg:w-12 ${
                tab === t.id
                  ? 'bg-lilac-soft text-violet'
                  : 'text-smoke hover:text-ink'
              }`}
            >
              <TabIcon id={t.id} />
            </button>
          ))}
          <span className="flex-1" />
          <span
            className="text-ink flex h-8 w-8 items-center justify-center rounded-full bg-[#9C94E8] font-sans text-[11px] font-medium"
            title="Mira K. — editing now"
            aria-label="Mira K. is editing"
          >
            MK
          </span>
        </div>

        {/* Body */}
        {tab === 'assets' ? (
          <div className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
            <p className="text-smoke font-mono text-[11px] tracking-[0.06em]">
              LIBRARY / EDITION 04
            </p>
            <h3 className="font-display mt-3 text-3xl tracking-[-0.02em] sm:text-4xl">
              Three crops, one negative.
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {ASSETS.map((asset) => (
                <figure key={asset.label}>
                  <div className="overflow-hidden rounded-[3px]">
                    <img
                      src="/images/editorial-artwork.png"
                      alt=""
                      draggable="false"
                      style={{ objectPosition: asset.position }}
                      className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <figcaption className="text-smoke mt-2 font-mono text-[10px] tracking-[0.06em]">
                    {asset.label}
                    <br />
                    {asset.note}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="border-line text-smoke mt-6 border-t pt-4 font-mono text-[11px] tracking-[0.05em]">
              ✓ ALL CHANGES SAVED
            </div>
          </div>
        ) : (
          <div className="grid min-w-0 flex-1 gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
            {/* Editor */}
            <div key={tab} className="min-w-0">
              <p className="text-smoke font-mono text-[11px] tracking-[0.06em]">
                {draft.kicker}
              </p>
              <Editable
                label="Story headline — editable"
                value={draft.headline}
                placeholder="Give the story a headline…"
                onInput={handleEdit('headline')}
                className="font-display mt-4 text-[2.6rem] leading-[1.02] tracking-[-0.03em] whitespace-pre-line sm:text-6xl lg:text-[4.2rem]"
              />
              <Editable
                label="Story summary — editable"
                value={draft.dek}
                placeholder="Write the standfirst…"
                onInput={handleEdit('dek')}
                className="text-ink/75 mt-5 max-w-md font-sans text-[16px] leading-relaxed sm:text-[17px]"
              />
              <div className="border-line text-smoke mt-8 border-t pt-4 font-mono text-[11px] tracking-[0.05em]">
                {metaNote[tab] ?? draft.meta}
              </div>
              <p
                className="text-smoke mt-5 font-mono text-[10px] tracking-[0.06em]"
                aria-live="polite"
              >
                {status === 'saving' ? (
                  <span className="text-violet">● SAVING…</span>
                ) : (
                  <span>✓ ALL CHANGES SAVED</span>
                )}
              </p>
            </div>

            {/* Artwork */}
            <div className="min-w-0">
              <figure className="relative">
                <img
                  src="/images/editorial-artwork.png"
                  alt="Paper arc leaning over a cobalt monolith on lilac ground"
                  className="aspect-[486/465] w-full rounded-[3px] object-cover"
                  draggable="false"
                />
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="group bg-ink hover:bg-ink-soft absolute right-4 -bottom-5 cursor-pointer rounded-[2px] px-4 py-3 text-left shadow-lg transition-colors sm:right-6"
                >
                  <span className="text-mist block font-mono text-[10px] tracking-[0.06em]">
                    IMAGE / EDITION 04
                  </span>
                  <span className="text-paper mt-1 flex items-center gap-1 font-sans text-sm font-medium">
                    Ready for review
                    <ArrowUpRightIcon className="cta-arrow h-4 w-4" />
                  </span>
                </button>
              </figure>
              <div className="border-line text-smoke mt-10 border-t pt-3 font-mono text-[11px] tracking-[0.05em]">
                01 / VISUAL ASSET · AUTOMATICALLY SYNCED
              </div>
            </div>
          </div>
        )}
      </div>

      {previewOpen && (
        <PreviewModal draft={draft} onClose={() => setPreviewOpen(false)} />
      )}
      {publishOpen && (
        <PublishModal
          onClose={() => setPublishOpen(false)}
          onPublished={onPublished}
        />
      )}
    </div>
  )
}
