import { useCallback, useEffect, useRef, useState } from 'react'
import photo from '../assets/photo-park.jpg'
import { RESUME_URL, type NoteColor } from '../data'
import { ArrowRight, ArrowUpRight, Scribble, Socials, StickyNote, vars } from '../components/ui'

const FULL = 'Hi I am Tanisha Tasnin'
const GREETING_LENGTH = 'Hi I am '.length
const TYPE_SPEED = 80

type HeroNote = {
  label: string
  color: NoteColor
  tilt: number
  fold: number
  box: { left: number; top: number; width: number }
  size: 'large' | 'medium' | 'small'
  text: string
  button: { label: string; href: string; bg: string; fg: string; external?: boolean }
}

// Positions are relative to the photo column (480px wide, centred), matching the design.
const NOTES: HeroNote[] = [
  {
    label: 'About me note',
    color: 'yellow',
    tilt: -4,
    fold: 40,
    box: { left: -380, top: -135, width: 290 },
    size: 'large',
    text: 'When I’m not dillydallying, I’m working on cool projects and at cool companies. Check out my',
    button: { label: 'Resume', href: RESUME_URL, bg: '#2A2416', fg: '#FFF4C2', external: true },
  },
  {
    label: 'Experience note',
    color: 'pink',
    tilt: 5,
    fold: 40,
    box: { left: 580, top: 20, width: 290 },
    size: 'large',
    text: 'Read about my professional experiences',
    button: { label: 'here', href: '#/experience', bg: '#3A1626', fg: '#FFE3EC' },
  },
  {
    label: 'Projects note',
    color: 'peach',
    tilt: -4,
    fold: 30,
    box: { left: 430, top: 300, width: 210 },
    size: 'small',
    text: 'Listed here are some of my cool',
    button: { label: 'projects', href: '#/projects', bg: '#4A2A14', fg: '#FFE7D2' },
  },
  {
    label: 'Skills note',
    color: 'mint',
    tilt: 3,
    fold: 36,
    box: { left: -214, top: 205, width: 240 },
    size: 'medium',
    text: 'My #1 skill is dillydallying. My other skills are listed',
    button: { label: 'here', href: '#/skills', bg: '#173A26', fg: '#DDF7E6' },
  },
]

export default function Home() {
  const [typed, setTyped] = useState(0)
  // 0 = typing, 1 = scribble drawing, 2 = photo, notes and socials in.
  const [phase, setPhase] = useState(0)
  const [paint, setPaint] = useState(false)
  const timers = useRef<number[]>([])

  // Schedules the whole intro: typing, scribble, photo + notes, then the paint sweep.
  const run = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))
    let count = 0
    const tick = () => {
      if (count < FULL.length) {
        count += 1
        setTyped(count)
        later(tick, TYPE_SPEED + Math.random() * TYPE_SPEED * 0.6)
      } else {
        later(() => setPhase(1), 250)
        later(() => setPhase(2), 1800)
        later(() => setPaint(true), 3100)
      }
    }
    later(tick, 500)
  }, [])

  useEffect(() => {
    run()
    const pending = timers
    return () => pending.current.forEach(clearTimeout)
  }, [run])

  const replay = () => {
    setTyped(0)
    setPhase(0)
    setPaint(false)
    run()
  }

  const doneTyping = typed >= FULL.length

  return (
    <main className="hero">
      <div className="hero-paint-layer" aria-hidden="true">
        {paint && (
          <div className="paint">
            <svg className="paint-edge" viewBox="0 0 100 1000" preserveAspectRatio="none">
              <path d="M0 0 L 40 0 C 72 60, 18 120, 55 200 C 88 270, 28 340, 62 420 C 92 500, 22 560, 50 640 C 78 720, 32 800, 66 880 C 82 930, 44 970, 52 1000 L 0 1000 Z" />
            </svg>
          </div>
        )}
      </div>

      <h1 className="hero-title" aria-label={FULL}>
        <span aria-hidden="true">{FULL.slice(0, Math.min(typed, GREETING_LENGTH))}</span>
        <span className="hero-name" aria-hidden="true">
          <span>{typed > GREETING_LENGTH ? FULL.slice(GREETING_LENGTH, typed) : ''}</span>
          {phase >= 1 && <Scribble className="hero-scribble" drawing={phase === 1} />}
        </span>
        <span className={`caret ${doneTyping ? 'caret-blink' : ''}`} aria-hidden="true" />
      </h1>

      <div className="hero-stage">
        {phase >= 2 && (
          <>
            <figure className="polaroid pop">
              <div className="polaroid-frame">
                <div className="polaroid-photo">
                  <img src={photo} alt="Tanisha standing under a willow tree by a lake" />
                </div>
                <figcaption>@ my fav park, May ’26</figcaption>
              </div>
              <div className="polaroid-ground" aria-hidden="true" />
            </figure>
            <p className="hero-intro fade">SWE by day, dillydallier by night</p>
            {NOTES.map((n) => (
              <aside
                key={n.label}
                className="hero-note stick"
                aria-label={n.label}
                style={{ left: n.box.left, top: n.box.top, width: n.box.width }}
              >
                <StickyNote color={n.color} tilt={n.tilt} fold={n.fold} paperClassName={`hero-note-paper hero-note-${n.size}`}>
                  <p className="pen">{n.text}</p>
                  <a
                    className="pill-button"
                    href={n.button.href}
                    style={vars({ background: n.button.bg, color: n.button.fg })}
                    {...(n.button.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {n.button.label}
                    {n.button.external ? <ArrowUpRight /> : <ArrowRight />}
                  </a>
                </StickyNote>
              </aside>
            ))}
          </>
        )}
      </div>

      {phase >= 2 && <Socials animated className="hero-socials" />}

      <button type="button" className="replay-button" onClick={replay}>
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
        </svg>
        Replay intro
      </button>
    </main>
  )
}
