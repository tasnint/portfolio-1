import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, type NoteColor } from '../data'

// Lets inline styles carry CSS custom properties like --tilt.
export const vars = (v: Record<string, string | number>) => v as CSSProperties

const NOTE_COLORS: Record<NoteColor, { paper: [string, string, string]; fold: [string, string]; shadow: string }> = {
  yellow: { paper: ['#FFF2A3', '#FFE97A', '#FBE06A'], fold: ['#F6E79A', '#E2C64A'], shadow: '60, 45, 0' },
  pink: { paper: ['#FFDCE8', '#FFC8DA', '#FBB6CD'], fold: ['#FDDDE8', '#E596B3'], shadow: '90, 20, 45' },
  mint: { paper: ['#E6FBEC', '#D2F3DE', '#C0EBD0'], fold: ['#E3F8EA', '#8FD3A8'], shadow: '20, 70, 40' },
  lavender: { paper: ['#F1EAFF', '#E4D8FF', '#D8C9FB'], fold: ['#EFE6FF', '#B9A3EC'], shadow: '50, 30, 90' },
  peach: { paper: ['#FFEBDA', '#FFDCC2', '#FBCBA7'], fold: ['#FFE8D6', '#E8A574'], shadow: '100, 50, 10' },
  blue: { paper: ['#E4F2FF', '#CFE6FC', '#BBDAF8'], fold: ['#E2F0FF', '#86B5E6'], shadow: '20, 50, 90' },
}

type NoteProps = {
  color: NoteColor
  tilt: number
  fold?: number
  className?: string
  paperClassName?: string
  extra?: ReactNode
  style?: CSSProperties
  children: ReactNode
}

// A sticky note: tinted paper with a folded bottom-right corner and a soft 3D shadow.
export function StickyNote({ color, tilt, fold = 40, className = '', paperClassName = '', extra, style: extraStyle, children }: NoteProps) {
  const c = NOTE_COLORS[color]
  const style = vars({
    ...(extraStyle as Record<string, string | number>),
    '--tilt': `${tilt}deg`,
    '--fold': `${fold}px`,
    '--p1': c.paper[0],
    '--p2': c.paper[1],
    '--p3': c.paper[2],
    '--f1': c.fold[0],
    '--f2': c.fold[1],
    '--sh': c.shadow,
  })
  return (
    <div className={`note ${className}`} style={style}>
      <div className={`note-paper ${paperClassName}`}>{children}</div>
      <div className="note-fold" aria-hidden="true" />
      {extra}
    </div>
  )
}

const SCRIBBLE =
  'M0 72 C 30 40, 70 -5, 84 4 C 95 15, 50 110, 48 112 C 60 90, 110 10, 128 18 C 140 25, 125 90, 138 86 C 160 70, 210 15, 230 18 C 245 22, 225 80, 240 78 C 270 60, 330 5, 352 12 C 368 20, 355 82, 372 80 C 410 60, 480 0, 508 6 C 522 12, 505 70, 520 72 C 545 70, 580 50, 600 38'

// The blue hand-drawn squiggle that draws itself under a word.
export function Scribble({ className = '', drawing = true }: { className?: string; drawing?: boolean }) {
  return (
    <svg className={`scribble ${className}`} aria-hidden="true" viewBox="0 0 600 120" preserveAspectRatio="none">
      <path className={drawing ? 'draw' : ''} pathLength={1} d={SCRIBBLE} />
    </svg>
  )
}

// Page title with the scribble under its last word.
export function PageTitle({ lead, word, note }: { lead: string; word: string; note: string }) {
  return (
    <header className="page-header">
      <h1 className="page-title">
        {lead}{' '}
        <span className="scribble-word">
          {word}
          <Scribble className="scribble-under" />
        </span>
      </h1>
      <p className="page-note">{note}</p>
    </header>
  )
}

export function PaintBackground() {
  return <div className="paint-bg" aria-hidden="true" />
}

export function HomeButton() {
  return (
    <a className="home-button" href="#/">
      <ArrowLeft />
      Home
    </a>
  )
}

export function ArrowLeft() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  )
}

export function ArrowRight() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowUpRight() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export const GITHUB_PATH =
  'M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z'

const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z'

// GitHub, LinkedIn and email as round buttons. `animated` plays the dot-to-button pop on the home page.
export function Socials({ animated = false, className = '' }: { animated?: boolean; className?: string }) {
  const dot = (i: number) => (animated ? `dot dot-${i}` : '')
  const icon = animated ? 'dot-icon' : ''
  return (
    <nav className={`socials ${className}`} aria-label="Social links">
      <a className={`social social-github ${dot(0)}`} href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
        <svg aria-hidden="true" width="52" height="52" viewBox="0 0 24 24" fill="currentColor">
          <circle className={icon} cx="12" cy="12" r="11" fill="#FFFFFF" />
          <path d={GITHUB_PATH} />
        </svg>
      </a>
      <a className={`social social-linkedin ${dot(1)}`} href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <svg className={icon} aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d={LINKEDIN_PATH} />
        </svg>
      </a>
      <a className={`social social-email ${dot(2)}`} href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`}>
        <svg className={icon} aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
        </svg>
      </a>
    </nav>
  )
}

export function Footer({ buttonClass }: { buttonClass: string }) {
  return (
    <footer className="page-footer">
      <Socials />
      <a className={`pill-button ${buttonClass}`} href="#/">
        <ArrowLeft />
        Back to home
      </a>
    </footer>
  )
}

// True once the element has scrolled into view (and stays true).
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null)
  // Browsers without IntersectionObserver just show everything.
  const [inView, setInView] = useState(() => !('IntersectionObserver' in window))
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, inView])
  return [ref, inView] as const
}
