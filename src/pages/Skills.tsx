import { SKILLS } from '../data'
import { Footer, HomeButton, PageTitle, PaintBackground, StickyNote, useInView, vars } from '../components/ui'

export default function Skills() {
  const [ref, inView] = useInView<HTMLElement>(0.12)
  return (
    <main className="subpage">
      <PaintBackground />
      <HomeButton />
      <PageTitle lead="My" word="skills" note="(#1 is still dillydallying)" />
      <div className="board-frame">
        <section ref={ref} className={`board ${inView ? 'in' : ''}`} aria-label="Skills by category">
          <div className="board-grid">
            {SKILLS.map((group, i) => (
              <StickyNote
                key={group.title}
                color={group.color}
                tilt={group.tilt}
                fold={36}
                className="board-note"
                paperClassName="board-paper"
                style={vars({ '--d': `${i * 0.12}s` })}
                extra={
                  <span
                    className="pin"
                    aria-hidden="true"
                    style={vars({ '--pin-1': group.pin[0], '--pin-2': group.pin[1] })}
                  />
                }
              >
                <h2 className="board-title">{group.title}</h2>
                <ul className="pen board-skills">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </StickyNote>
            ))}
          </div>
        </section>
      </div>
      <Footer buttonClass="button-forest" />
    </main>
  )
}
