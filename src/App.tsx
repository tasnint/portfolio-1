import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode, Ref } from 'react'
import cloud from './assets/cloud.png'
import raindrop from './assets/raindrop.png'
import sun from './assets/sun.png'
import { SKILL_STACK_LAYOUT } from './skills'
import { PROJECT_LAYOUT as P, useProjects } from './projects'
import type { Project } from './projects'
import sparkle from './assets/sparkle.png'
import { EXPERIENCES, EXPERIENCE_LAYOUT as L, SPARKLE_SETS } from './experiences'
import type { Experience } from './experiences'
import { BAR, INTRO_STOP, RESUME_URL, SLIDES, SOCIALS, STAGE, STOPS, TITLE_TOP, slideForStop } from './story'
import type { Box } from './story'
import './styles.css'

// The star isn't centred in sparkle.png: its visual centre is at (54.3%, 51.4%).
const SPARKLE = { w: 129, h: 101, centerX: 129 * 0.5426, centerY: 101 * 0.5142 }
// Matches .dot (top: 1px; height: 36px) in styles.css.
const DOT_CENTER_Y = 1 + 36 / 2

// Height of the "My Experiences" band, in stage px (scaled with the stage).
const SECTION_HEADING_HEIGHT = 140

const boxStyle =({ x, y, w, h }: Box): CSSProperties => ({ left: x, top: y, width: w, height: h })

const nearestStop = (x: number) =>
  STOPS.reduce((best, stopX, i) => (Math.abs(stopX - x) < Math.abs(STOPS[best] - x) ? i : best), 0)

// Scales the fixed 1440×1024 Figma frame to fit the window.
function useStageScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => setScale(Math.min(window.innerWidth / STAGE.width, window.innerHeight / STAGE.height))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

const TYPING_MAX_MS = 2200
const TYPING_CHAR_MS = 35

// Types the caption out on mount; remount (via key) to replay.
// The untyped remainder is laid out invisibly so lines don't re-wrap while typing.
function TypedCaption({ text, style, after }: { text: string; style: CSSProperties; after?: ReactNode }) {
  const [count, setCount] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? text.length : 0,
  )

  useEffect(() => {
    const id = setInterval(
      () => setCount((c) => Math.min(c + 1, text.length)),
      Math.min(TYPING_CHAR_MS, TYPING_MAX_MS / text.length),
    )
    return () => clearInterval(id)
  }, [text])

  const typing = count < text.length
  return (
    <p className="caption" style={style}>
      <span aria-hidden>
        {text.slice(0, count)}
        {typing && <span className="caret" />}
        <span className="caption-rest">{text.slice(count)}</span>
      </span>
      {after && <span className={`caption-after${typing ? ' is-pending' : ''}`}>{after}</span>}
    </p>
  )
}

// True while at least half of the element is on screen.
function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, inView] as const
}

// Staggers each element's float/twinkle so they don't move in unison.
const loopStyle = (i: number, base: number): CSSProperties => ({
  animationDuration: `${base + (i % 3) * 1.1}s`,
  animationDelay: `${-i * 1.7}s`,
})

// Sparkles share one cycle and take turns: each bursts during its own slot.
const TWINKLE_SLOT_S = 1.2
const twinkleStyle = (i: number, count: number): CSSProperties => ({
  animationDuration: `${TWINKLE_SLOT_S * count}s`,
  animationDelay: `${i * TWINKLE_SLOT_S}s`,
})

// One full-window screen: the scaled 1440×1024 stage with the shared card and social links.
function Screen({
  scale,
  label,
  children,
  className = '',
  sectionRef,
}: {
  scale: number
  label: string
  children: ReactNode
  className?: string
  sectionRef?: Ref<HTMLElement>
}) {
  return (
    <section ref={sectionRef} className={`screen ${className}`} aria-label={label}>
      <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <div className="card" />
        {children}
        {SOCIALS.map(({ label, href, icon, box }) => (
          <a key={label} className="social" href={href} target="_blank" rel="noreferrer" aria-label={label} style={boxStyle(box)}>
            <img src={icon} alt="" draggable={false} />
          </a>
        ))}
      </div>
    </section>
  )
}

function StoryScreen({ scale }: { scale: number }) {
  const [stop, setStop] = useState(INTRO_STOP)
  const [dragX, setDragX] = useState<number | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const dragging = dragX !== null
  const activeStop = dragging ? nearestStop(dragX) : stop
  const active = slideForStop(activeStop)
  const slide = SLIDES[active]

  const toBarX = (clientX: number) => {
    const rect = barRef.current!.getBoundingClientRect()
    return Math.min(Math.max((clientX - rect.left) / scale, STOPS[0]), STOPS[INTRO_STOP])
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragX(toBarX(e.clientX))
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) setDragX(toBarX(e.clientX))
  }
  const endDrag = () => {
    if (!dragging) return
    setStop(nearestStop(dragX))
    setDragX(null)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const next = {
      ArrowLeft: stop - 1,
      ArrowDown: stop - 1,
      ArrowRight: stop + 1,
      ArrowUp: stop + 1,
      Home: 0,
      End: INTRO_STOP,
    }[e.key]
    if (next === undefined) return
    e.preventDefault()
    // From the intro, arrows start the story at the first slide.
    const fromIntro = stop === INTRO_STOP && e.key.startsWith('Arrow')
    setStop(fromIntro ? 0 : Math.min(Math.max(next, 0), INTRO_STOP - 1))
  }

  return (
    <>
      {slide.clouds.map((c, i) => (
        <div key={i} className="cloud" style={boxStyle(c)}>
          <img src={cloud} alt="" draggable={false} style={loopStyle(i, 5)} />
        </div>
      ))}

      <h1 className="title" style={{ top: TITLE_TOP }}>
        Congratulations ! You have landed on Tanisha’s website :)
      </h1>

      {SLIDES.map(({ photo }, i) =>
        photo ? (
          <div
            key={i}
            className={`photo${photo.shaded ? ' is-shaded' : ''}${i === active ? ' is-active' : ''}`}
            style={{ ...boxStyle(photo.box), borderRadius: photo.radius }}
          >
            <img
              src={photo.src}
              alt={i === active ? photo.alt : ''}
              draggable={false}
              className={photo.crop ? undefined : 'cover'}
              style={
                photo.crop && {
                  left: `${photo.crop.left}%`,
                  top: `${photo.crop.top}%`,
                  width: `${photo.crop.w}%`,
                  height: `${photo.crop.h}%`,
                }
              }
            />
          </div>
        ) : null,
      )}

      <div
        ref={barRef}
        className={`bar${dragging ? ' is-dragging' : ''}`}
        style={{ left: BAR.x, top: slide.barTop, width: BAR.width, height: BAR.height }}
        role="slider"
        tabIndex={0}
        aria-label="Tanisha’s story timeline"
        aria-valuemin={0}
        aria-valuemax={INTRO_STOP}
        aria-valuenow={activeStop}
        aria-valuetext={slide.caption}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        {STOPS.map((x, i) => (
          <span key={i} className="dot" style={{ left: x - 17.5 }} />
        ))}
        <span
          className="sparkle"
          style={{
            left: (dragX ?? STOPS[stop]) - SPARKLE.centerX,
            top: DOT_CENTER_Y - SPARKLE.centerY,
            width: SPARKLE.w,
            height: SPARKLE.h,
          }}
        >
          {/* Keyed by stop so the sparkle burst replays each time the star lands on a new dot. */}
          <img key={activeStop} src={sparkle} alt="" draggable={false} />
        </span>
      </div>

      <TypedCaption
        key={active}
        text={slide.caption}
        style={{ top: slide.captionTop, width: slide.captionWidth }}
        after={
          slide.resumeLink && (
            <a className="resume-button" href={RESUME_URL} target="_blank" rel="noreferrer">
              resume
            </a>
          )
        }
      />
    </>
  )
}

function ExperienceScreen({ experience: e, index, scale }: { experience: Experience; index: number; scale: number }) {
  const [ref, inView] = useInView<HTMLElement>()
  // Before this card is in view, sparkles sit where the previous card had them.
  const sparkles = SPARKLE_SETS[inView ? index + 1 : index]
  const column = (x: number, top: number, order: number): CSSProperties => ({
    left: x,
    top,
    width: L.columnWidth,
    transitionDelay: inView ? `${order * 0.12}s` : '0s',
  })

  return (
    <Screen
      scale={scale}
      label={`Experience at ${e.company}`}
      className={inView ? 'is-in-view' : ''}
      sectionRef={ref}
    >
      {sparkles.map((s, i) => (
        <div key={i} className="decor" style={boxStyle(s)}>
          <img src={sparkle} alt="" draggable={false} style={twinkleStyle(i, sparkles.length)} />
        </div>
      ))}


      <div className="exp-heading reveal" style={column(L.leftX, L.headingTop, 0)}>
        <h3 className="exp-company">{e.company}</h3>
        <p className="exp-dates">{e.dates}</p>
      </div>
      <p className="exp-role reveal" style={column(L.rightX, L.headingTop, 1)}>
        {e.role}
      </p>
      <img
        className="exp-image reveal"
        src={e.image}
        alt={e.imageAlt}
        draggable={false}
        style={column(L.leftX, L.contentTop, 2)}
      />
      <ul className="exp-points reveal" style={column(L.rightX, L.contentTop, 3)}>
        {e.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </Screen>
  )
}

// Section heading sits above a section's cards, on the page background.
function SectionHeading({ scale, children }: { scale: number; children: ReactNode }) {
  return (
    <header className="section-heading" style={{ height: SECTION_HEADING_HEIGHT * scale }}>
      <h2 className="title" style={{ fontSize: 40 * scale }}>
        {children}
      </h2>
    </header>
  )
}

// Deterministic spread of drops across the stage so the rain looks random but stable.
const RAINDROPS = Array.from({ length: 16 }, (_, i) => ({
  x: 30 + ((i * 523) % 1380),
  size: 16 + ((i * 7) % 20),
  duration: 2.8 + ((i * 0.43) % 1.9),
  delay: -((i * 0.71) % 4),
}))

function Rain() {
  return (
    <div className="rain" aria-hidden>
      {RAINDROPS.map((d, i) => (
        <img
          key={i}
          src={raindrop}
          alt=""
          draggable={false}
          style={{ left: d.x, width: d.size, animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s` }}
        />
      ))}
    </div>
  )
}

function ProjectsScreen({ scale, projects }: { scale: number; projects: Project[] }) {
  const [ref, inView] = useInView<HTMLElement>()

  return (
    <Screen scale={scale} label="Tanisha’s projects" className={inView ? 'is-in-view' : ''} sectionRef={ref}>
      <Rain />
      {projects.map((p, i) => (
        <article
          key={p.repo}
          className="project reveal"
          style={{
            left: P.firstX + (i % P.columns) * (P.width + P.gap),
            top: P.top + Math.floor(i / P.columns) * P.rowHeight,
            width: P.width,
            height: P.itemHeight,
            transitionDelay: inView ? `${i * 0.12}s` : '0s',
          }}
        >
          <h3 className="exp-company">{p.name}</h3>
          {p.updated && <p className="project-meta">{p.updated}</p>}
          <p className="project-description">{p.description}</p>
          <a className="resume-button project-link" href={p.url} target="_blank" rel="noreferrer">
            view on GitHub
          </a>
        </article>
      ))}
    </Screen>
  )
}

function SkillsScreen({ scale }: { scale: number }) {
  const [ref, inView] = useInView<HTMLElement>()

  return (
    <Screen scale={scale} label="Tanisha’s skills" className={inView ? 'is-in-view' : ''} sectionRef={ref}>
      <ul className="skill-stacks">
        {SKILL_STACK_LAYOUT.map((s) => (
          <li
            key={s.cloud}
            className="skill-stack reveal"
            style={{ ...s.style, transitionDelay: inView ? `${s.revealDelay}s` : '0s' }}
          >
            <div className="skill-cloud" style={s.cloudStyle}>
              <div className="skill-cloud-float" style={s.floatStyle}>
                <img src={cloud} alt="" draggable={false} />
                <span style={{ fontSize: s.cloudFontSize }}>{s.cloud}</span>
              </div>
            </div>
            <ul className="skill-rain" aria-label={s.label}>
              {s.drops.map((d) => (
                <li key={d.name} className="skill-drop" style={d.style}>
                  <img src={raindrop} alt="" draggable={false} />
                  <span>{d.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Screen>
  )
}

const EMAIL = 'tanisha.tasnin03@gmail.com'
const LINKEDIN_URL = SOCIALS.find((s) => s.label === 'LinkedIn')!.href
// The sign-off text is centred in the card (stage px).
const SIGNOFF_AREA: Box = { x: 20, y: 66, w: 1400, h: 891 }

function SignOffScreen({ scale }: { scale: number }) {
  const [ref, inView] = useInView<HTMLElement>()
  const delay = (i: number): CSSProperties => ({ transitionDelay: inView ? `${i * 0.18}s` : '0s' })

  return (
    <Screen scale={scale} label="Contact Tanisha" className={inView ? 'is-in-view' : ''} sectionRef={ref}>
      <div className="signoff" style={boxStyle(SIGNOFF_AREA)}>
        <p className="reveal" style={delay(0)}>
          For more info, feel free to email me at{' '}
          <a className="resume-button" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>{' '}
          or send a message on{' '}
          <a className="resume-button" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </p>
        <p className="reveal" style={delay(1)}>
          But more importantly, if you haven’t done it already, go out, look at the sky and touch some grass :)
        </p>
        <p className="reveal" style={delay(2)}>
          Life is so much more than just sitting behind a screen and judging someone’s portfolio website!!!!!!
        </p>
        <p className="reveal signoff-bye" style={delay(3)}>
          Have a lovely day
          <img className="sun" src={sun} alt="" draggable={false} />
        </p>
      </div>
    </Screen>
  )
}

export default function App() {
  const scale = useStageScale()
  const projects = useProjects()

  return (
    <main className="page">
      <Screen scale={scale} label="About Tanisha">
        <StoryScreen scale={scale} />
      </Screen>
      <SectionHeading scale={scale}>My Experiences</SectionHeading>
      {EXPERIENCES.map((experience, i) => (
        <ExperienceScreen key={experience.company} experience={experience} index={i} scale={scale} />
      ))}
      <SectionHeading scale={scale}>My Projects</SectionHeading>
      <ProjectsScreen scale={scale} projects={projects} />
      <SectionHeading scale={scale}>My Skills</SectionHeading>
      <SkillsScreen scale={scale} />
      <SignOffScreen scale={scale} />    </main>
  )
}
