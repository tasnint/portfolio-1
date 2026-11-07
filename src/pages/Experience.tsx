import { EXPERIENCES, type Experience as Job } from '../data'
import { Footer, HomeButton, PageTitle, PaintBackground, StickyNote, useInView, vars } from '../components/ui'

// A silver paper clip, drawn as one bent wire.
function PaperClip({ id, side }: { id: string; side: 'left' | 'right' }) {
  const tilt = side === 'right' ? 10 : -10
  return (
    <svg
      className={`clip clip-${side}`}
      aria-hidden="true"
      viewBox="0 0 40 120"
      style={vars({ '--clip-tilt': `${tilt}deg`, '--clip-dx': side === 'right' ? '40px' : '-40px' })}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8A949E" />
          <stop offset="0.5" stopColor="#F1F4F7" />
          <stop offset="1" stopColor="#9AA3AD" />
        </linearGradient>
      </defs>
      <path
        d="M15 40 V 92 a 5 5 0 0 0 10 0 V 18 a 9.5 9.5 0 0 0 -19 0 V 98 a 14 14 0 0 0 28 0 V 34"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ExperienceRow({ job, index }: { job: Job; index: number }) {
  const [ref, inView] = useInView<HTMLElement>(0.15)
  const reverse = index % 2 === 1
  return (
    <article ref={ref} className={`exp-row ${reverse ? 'reverse' : ''} ${inView ? 'in' : ''}`}>
      <figure className="exp-photo" style={vars({ '--photo-dx': reverse ? '70px' : '-70px' })}>
        <div className={`exp-image exp-image-${job.image.fit}`}>
          {job.image.fit === 'logo-fill' && <img className="exp-image-backdrop" src={job.image.src} alt="" aria-hidden="true" />}
          <img src={job.image.src} alt={job.image.alt} />
        </div>
        <figcaption className="pen">{job.caption}</figcaption>
        <PaperClip id={`clip-gradient-${index}`} side={reverse ? 'left' : 'right'} />
      </figure>
      <StickyNote color={job.color} tilt={job.tilt} fold={48} className="exp-note" paperClassName="exp-pad">
        <p className="pen exp-dates">{job.dates}</p>
        <h2 className="exp-company">{job.company}</h2>
        <p className="exp-role">{job.role}</p>
        <ul className="pen exp-points">
          {job.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </StickyNote>
    </article>
  )
}

export default function Experience() {
  return (
    <main className="subpage">
      <PaintBackground />
      <HomeButton />
      <PageTitle lead="Where I’ve" word="worked" note="newest first ↓" />
      <section className="exp-list" aria-label="Work experience">
        {EXPERIENCES.map((job, i) => (
          <ExperienceRow key={job.company} job={job} index={i} />
        ))}
      </section>
      <Footer buttonClass="button-berry" />
    </main>
  )
}
