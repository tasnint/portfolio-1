import { useState } from 'react'
import { PROJECTS, type Doodle as DoodleKind, type Project } from '../data'
import { Footer, GITHUB_PATH, HomeButton, PageTitle, PaintBackground, vars } from '../components/ui'

// Pen doodles standing in for screenshots, one per project.
function Doodle({ kind }: { kind: DoodleKind }) {
  const common = {
    viewBox: '0 0 200 120',
    width: 230,
    height: 138,
    fill: 'none',
    stroke: '#1F2A5C',
    strokeWidth: 2.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    role: 'img',
  }
  switch (kind) {
    case 'console':
      return (
        <svg {...common} aria-label="Doodle of a terminal window with bar charts and a line plot">
          <path d="M14 12 C 70 9, 140 11, 187 13 C 189 45, 188 80, 186 108 C 130 110, 70 109, 15 107 C 12 75, 13 40, 14 12 Z" />
          <path d="M14 30 C 80 28, 140 30, 187 31" />
          <circle cx="25" cy="21" r="2.6" />
          <circle cx="35" cy="21" r="2.6" />
          <circle cx="45" cy="21" r="2.6" />
          <path d="M24 44 l8 6 -8 6" />
          <path d="M38 57 h10" />
          <path d="M30 98 V 82 M44 98 V 70 M58 98 V 77 M72 98 V 62" />
          <path d="M24 99 H 80" />
          <path d="M98 92 C 108 80, 112 86, 120 70 C 128 56, 134 76, 144 62 C 152 50, 160 58, 176 44" />
          <path d="M96 99 H 178" />
        </svg>
      )
    case 'fire':
      return (
        <svg {...common} aria-label="Doodle of a flame next to a pine tree with a question mark">
          <path d="M92 110 C 58 106, 56 70, 80 50 C 80 66, 90 70, 94 60 C 100 42, 92 28, 88 14 C 118 28, 136 62, 124 92 C 118 104, 106 111, 92 110 Z" />
          <path d="M94 104 C 80 100, 80 86, 90 76 C 92 86, 100 86, 102 78 C 112 88, 110 102, 94 104 Z" />
          <path d="M158 106 V 88 M146 88 L158 58 L170 88 Z M150 74 L158 52 L166 74" />
          <path d="M30 46 C 30 36, 46 34, 46 44 C 46 52, 38 52, 38 60" />
          <circle cx="38" cy="70" r="1.6" />
          <path d="M20 110 C 80 108, 140 110, 186 108" />
        </svg>
      )
    case 'balance':
      return (
        <svg {...common} aria-label="Doodle of a load balancer sending arrows to three servers">
          <path d="M78 10 C 96 9, 108 9, 122 10 C 123 20, 123 28, 122 36 C 106 37, 92 37, 78 36 C 77 28, 77 18, 78 10 Z" />
          <path d="M88 23 h24 M106 18 l6 5 -6 5" />
          <path d="M92 38 C 70 52, 50 60, 36 74 M30 66 l6 8 -10 2" />
          <path d="M100 38 C 100 54, 100 62, 100 72 M94 66 l6 7 6 -7" />
          <path d="M108 38 C 130 52, 150 60, 164 74 M164 64 l0 10 -10 0" />
          <path d="M16 78 h38 v30 h-38 Z M22 88 h26 M22 98 h18" />
          <path d="M81 78 h38 v30 h-38 Z M87 88 h26 M87 98 h18" />
          <path d="M146 78 h38 v30 h-38 Z M152 88 h26 M152 98 h18" />
        </svg>
      )
    case 'pill':
      return (
        <svg {...common} aria-label="Doodle of a capsule pill next to a phone with a checklist">
          <path d="M30 86 L70 46 C 80 36, 96 36, 104 46 C 112 56, 110 70, 100 80 L60 120 M30 86 C 20 96, 22 110, 32 116 C 42 122, 54 122, 60 116" />
          <path d="M50 66 L84 100" />
          <path d="M132 10 C 150 9, 166 9, 178 10 C 180 44, 180 80, 178 112 C 162 113, 148 113, 132 112 C 130 80, 130 44, 132 10 Z" />
          <path d="M150 102 h10" />
          <path d="M140 32 l4 4 7 -8 M156 32 h14" />
          <path d="M140 52 l4 4 7 -8 M156 52 h14" />
          <path d="M140 72 h8 M156 72 h14" />
        </svg>
      )
    case 'dish':
      return (
        <svg {...common} aria-label="Doodle of a steaming bowl under a magnifying glass">
          <path d="M24 64 C 70 62, 110 62, 136 64 C 136 92, 112 108, 80 108 C 48 108, 24 92, 24 64 Z" />
          <path d="M60 110 h40" />
          <path d="M54 52 C 48 44, 60 38, 54 28 M78 52 C 72 44, 84 38, 78 28 M102 52 C 96 44, 108 38, 102 28" />
          <circle cx="156" cy="38" r="20" />
          <path d="M170 52 L188 72" />
          <path d="M150 32 C 150 26, 162 26, 162 32 C 162 37, 156 37, 156 42" />
          <circle cx="156" cy="48" r="1.4" />
        </svg>
      )
    case 'coral':
      return (
        <svg {...common} aria-label="Doodle of a shield protecting a branching coral">
          <path d="M100 6 L150 20 C 151 46, 150 66, 146 80 C 138 98, 122 110, 100 116 C 78 110, 62 98, 54 80 C 50 66, 49 46, 50 20 Z" />
          <path d="M100 104 V 60 M100 82 C 88 76, 84 66, 84 52 M84 64 C 76 62, 72 56, 72 48 M100 72 C 112 68, 118 58, 118 46 M118 58 C 126 56, 130 50, 130 42 M100 60 C 96 52, 98 44, 102 38" />
          <path d="M14 100 C 24 94, 30 106, 40 100 M160 100 C 170 94, 176 106, 186 100" />
          <circle cx="22" cy="40" r="3" />
          <circle cx="30" cy="26" r="2" />
          <circle cx="176" cy="44" r="3" />
        </svg>
      )
  }
}

type PageProps = {
  project: Project | undefined
  side: 'left' | 'right'
  pageNo: number
  animClass: string
  onPrev?: () => void
  onNext?: () => void
}

function NotebookPage({ project, side, pageNo, animClass, onPrev, onNext }: PageProps) {
  return (
    <article className={`page pg-${side} ${animClass}`}>
      {project && (
        <>
          <p className="pen page-date">{project.date}</p>
          <h2 className="page-project">
            <span style={vars({ '--mark': project.mark })}>{project.title}</span>
          </h2>
          <figure className="doodle-card" style={vars({ transform: `rotate(${project.tilt}deg)` })}>
            <span className="tape" aria-hidden="true" style={vars({ background: project.tape })} />
            <Doodle kind={project.doodle} />
          </figure>
          <p className="pen page-desc">{project.description}</p>
        </>
      )}
      <div className="page-actions">
        {project && (
          <a className="pill-button button-ink" href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d={GITHUB_PATH} />
            </svg>
            View on GitHub
          </a>
        )}
        {onPrev && (
          <button type="button" className="turn pen" onClick={onPrev}>
            ← previous
          </button>
        )}
        {onNext && (
          <button type="button" className="turn pen" onClick={onNext}>
            next page →
          </button>
        )}
      </div>
      <span className="pen page-number" aria-hidden="true">
        {pageNo}
      </span>
    </article>
  )
}

export default function Projects() {
  const [spread, setSpread] = useState(0)
  // Which way the last turn went, and an alternating flag that restarts the CSS animation.
  const [turn, setTurn] = useState<{ dir: number; flip: boolean } | null>(null)
  const last = Math.ceil(PROJECTS.length / 2) - 1

  const goTo = (next: number) => {
    if (next === spread || next < 0 || next > last) return
    setTurn((t) => ({ dir: next > spread ? 1 : -1, flip: !(t?.flip ?? false) }))
    setSpread(next)
  }

  const suffix = turn?.flip ? 'b' : 'a'
  const leftAnim = turn ? (turn.dir > 0 ? `turn-left-${suffix}` : `fade-page-${suffix}`) : ''
  const rightAnim = turn ? (turn.dir < 0 ? `turn-right-${suffix}` : `fade-page-${suffix}`) : ''

  return (
    <main className="subpage">
      <PaintBackground />
      <HomeButton />
      <PageTitle lead="Things I’ve" word="built" note="flip through my notebook, or jump in with the tabs" />

      <div className="book">
        <nav className="tabs" aria-label="Projects">
          {PROJECTS.map((p, i) => {
            const active = Math.floor(i / 2) === spread
            return (
              <button
                key={p.title}
                type="button"
                className={`tab ${active ? 'tab-active' : ''}`}
                aria-current={active ? 'page' : undefined}
                style={vars({ background: p.tab })}
                onClick={() => goTo(Math.floor(i / 2))}
              >
                {p.title}
              </button>
            )
          })}
        </nav>
        <div className="cover">
          <div className="spread">
            <NotebookPage
              project={PROJECTS[spread * 2]}
              side="left"
              pageNo={spread * 2 + 1}
              animClass={leftAnim}
              onPrev={spread > 0 ? () => goTo(spread - 1) : undefined}
            />
            <NotebookPage
              project={PROJECTS[spread * 2 + 1]}
              side="right"
              pageNo={spread * 2 + 2}
              animClass={rightAnim}
              onNext={spread < last ? () => goTo(spread + 1) : undefined}
            />
            <div className="gutter" aria-hidden="true">
              <svg width="34" height="100%">
                <defs>
                  <pattern id="rings" width="34" height="26" patternUnits="userSpaceOnUse">
                    <circle cx="7" cy="16" r="3" fill="#2B2F3A" />
                    <circle cx="27" cy="16" r="3" fill="#2B2F3A" />
                    <path d="M7 16 C 7 4, 27 4, 27 16" stroke="#9AA2B3" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="34" height="100%" fill="url(#rings)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Footer buttonClass="button-cocoa" />
    </main>
  )
}
