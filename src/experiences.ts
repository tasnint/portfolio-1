import expArc from './assets/exp-arc.jpg'
import expEeco from './assets/exp-eeco.jpg'
import expMcmaster from './assets/exp-mcmaster.jpg'
import type { Box } from './story'

export type Experience = {
  company: string
  dates: string
  role: string
  image: string
  imageAlt: string
  points: string[]
}

// Shared layout for every experience screen (stage px), so headers never shift between them.
// Content columns sit 80px inside the card (card spans x 20–1420).
export const EXPERIENCE_LAYOUT = {
  // The section heading lives above the cards, so content is centred in the card (66–957).
  headingTop: 180, // company name + role title
  contentTop: 315, // image + bullet list; leaves room for two-line headings
  leftX: 100,
  rightX: 750,
  columnWidth: 590,
}

const SPARKLE_SIZES = [
  { w: 96, h: 75 },
  { w: 77, h: 60 },
  { w: 49, h: 38 },
  { w: 68, h: 53 },
  { w: 40, h: 31 },
]

const sparkleSet = (...points: [number, number][]): Box[] =>
  points.map(([x, y], i) => ({ x, y, ...SPARKLE_SIZES[i] }))

// Sparkle positions: set 0 is where they start before the first card scrolls in,
// set n is card n's. Sparkles glide from the previous set to their own as a card comes into view.
// Card 1 matches Figma Desktop 10, with edge sparkles moved onto the wider card's border.
export const SPARKLE_SETS: Box[][] = [
  sparkleSet([250, 92], [1150, 84], [-4, 340], [-14, 720], [1400, 380]),
  sparkleSet([329, 65], [1232, 61], [-4, 258], [-14, 796], [1400, 452]),
  sparkleSet([540, 58], [1090, 92], [-4, 410], [-14, 680], [1400, 570]),
  sparkleSet([200, 84], [1300, 70], [-4, 300], [-14, 850], [1400, 330]),
]

export const EXPERIENCES: Experience[] = [
  {
    company: 'The Applied Reports Company',
    dates: 'May - Aug 2026',
    role: 'Full Stack Software Developer',
    image: expArc,
    imageAlt: 'The Applied Reports Company website homepage',
    points: [
      'When I joined ARC, it was a team of 6, and I became member number 7. The simplest way to describe ARC: an AI B2B SaaS company building for the AEC (architecture, engineering and construction) industry.',
      'Everything was new: the product, the tech stack (has anyone else heard of Elixir??) and, most importantly, the market we were stepping into.',
      'In three and a half months, I shipped over 30,000 lines of code, built 2 end-to-end features, wrote a product vision memo and somehow stayed (mostly) sane.',
      'One day I was a prompt engineer, the next I was doing UI/UX. Some days I sat with our customer service team to brainstorm new features, then went off and built them. It was scary, thrilling and completely insane!',
      'Somewhere in the middle of it all, I fell in love with the vast world of AI and machine learning and all of its untapped potential.',
    ],
  },
  {
    company: 'EECOMOBILITY Inc.',
    dates: 'May 2025 - May 2026',
    role: 'Software Developer',
    image: expEeco,
    imageAlt: 'EECOMOBILITY website homepage about AI-driven battery testing',
    points: [
      'EECOMOBILITY was my first ever co-op in Canada. And it was quite interesting.',
      'This was also a SaaS company. However, our product interacted with batteries and there was a lot of hardware involved as well.',
      'Was it fully related to the niche I was interested in? No. But I learned so much.',
      'I designed an entire API system and decoupled our software.',
      'I used Python and hit so many drywalls trying to optimize latency in the face of Global Interpreter Locks.',
      'While EECOMOBILITY may have not been exactly what I had expected, it was exactly what I needed to find my footing and true passion in tech.',
      'Will forever be grateful to them for taking a chance on a nervous little girl who was really trying to put herself out there.',
    ],
  },
  {
    company: 'Engineering Faculty, McMaster University',
    dates: 'October 2024 - April 2025',
    role: 'International Recruitment & Events Assistant',
    image: expMcmaster,
    imageAlt: 'McMaster University building',
    points: [
      'This was my first real part-time job in Canada, and it was incredible!',
      'I got to connect with the student community and contribute to initiatives that directly shaped their experience at Mac.',
      'The highlight was definitely hosting the in-person workshops. I met so many people from different walks of life, all starting their journey at McMaster. Knowing my work was helping them through such a big transition was incredibly rewarding.',
      'Unlike most admin jobs, even the administrative tasks were genuinely interesting. I researched competitors and presented my findings to our recruitment team, and that research went on to shape our recruitment strategy and, with it, the future of so many students.',
    ],
  },
]
