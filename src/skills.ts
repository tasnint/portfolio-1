import type { CSSProperties } from 'react'

// Skills from the Technical Summary on Tanisha's resume, grouped by area:
// each cloud is a category, and its skills rain down from it. `\n` breaks a long category name onto two lines.
const SKILL_STACKS = [
  { cloud: 'AI / ML', rain: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'NumPy'] },
  { cloud: 'Databases', rain: ['SQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'GraphQL'] },
  { cloud: 'Functional\nProgramming', rain: ['Elixir', 'Phoenix', 'Ash'] },
  { cloud: 'Web &\nMobile', rain: ['JavaScript', 'TypeScript', 'React', 'Tailwind', 'Flutter', 'Solidity'] },
  { cloud: 'Backend &\nSystems', rain: ['Java', 'Spring Boot', 'Node.js', 'Go', 'C', 'C++'] },
  { cloud: 'Cloud &\nDevOps', rain: ['Docker', 'Kubernetes', 'Azure', 'GCP', 'Linux', 'Git'] },
]

// Stage px: a 3×2 grid of categories inside the card (card spans x 20–1420, y 66–957).
const COLUMNS = 3
const FIRST_X = 90
const COL_WIDTH = 420
const ROW_TOPS = [86, 506]
const CLOUD_W = 260
const CLOUD_H = CLOUD_W / (298 / 186) // cloud.png proportions
const RAIN_START = CLOUD_H * 0.72 // drops leave from the cloud's underside
const RAIN_FALL = 250
const RAIN_SPREAD = 270 // horizontal spread of a category's drops, roughly the cloud's width

// Which point in the fall each drop starts at, by drop count. Neighbouring drops are never
// adjacent in the fall, so the rain looks scattered instead of a diagonal staircase.
const PHASE_ORDERS: Record<number, number[]> = {
  1: [0],
  2: [0, 1],
  3: [0, 2, 1],
  4: [0, 2, 1, 3],
  5: [0, 3, 1, 4, 2],
  6: [0, 3, 1, 4, 2, 5],
}

// One label size for every cloud, set by the longest line of any category name so all of them fit.
const LONGEST_LINE = Math.max(...SKILL_STACKS.flatMap((s) => s.cloud.split('\n').map((line) => line.length)))
const CLOUD_FONT_SIZE = Math.min(28, (CLOUD_W * 0.95) / LONGEST_LINE)

export const SKILL_STACK_LAYOUT = SKILL_STACKS.map((stack, i) => {
  const col = i % COLUMNS
  const row = Math.floor(i / COLUMNS)
  const n = stack.rain.length
  const duration = 5.2 + ((i * 3) % 4) * 0.35 // 5.2–6.25s per drop
  return {
    ...stack,
    label: stack.cloud.replace('\n', ' '),
    style: {
      left: FIRST_X + col * COL_WIDTH,
      top: ROW_TOPS[row],
      width: COL_WIDTH,
      height: RAIN_START + RAIN_FALL + 40,
    } as CSSProperties,
    cloudStyle: { left: (COL_WIDTH - CLOUD_W) / 2, top: 0, width: CLOUD_W, height: CLOUD_H } as CSSProperties,
    floatStyle: { animationDuration: `${4.5 + (i % 3) * 0.8}s`, animationDelay: `${-i * 1.1}s` } as CSSProperties,
    cloudFontSize: CLOUD_FONT_SIZE,
    drops: stack.rain.map((name, j) => {
      const phase = (PHASE_ORDERS[n]?.[j] ?? j) / n
      return {
        name,
        style: {
          left: COL_WIDTH / 2 + (n === 1 ? 0 : (j / (n - 1) - 0.5) * Math.min(RAIN_SPREAD, 60 * (n - 1))),
          top: RAIN_START,
          '--fall': `${RAIN_FALL}px`,
          // Resting height when motion is reduced.
          '--rest': `${RAIN_FALL * (0.15 + 0.7 * phase)}px`,
          animationDuration: `${duration}s`,
          // Drops in a category are evenly spaced through the fall, so their labels never bunch up.
          animationDelay: `${-duration * phase}s`,
        } as CSSProperties,
      }
    }),
    revealDelay: row * 0.12 + col * 0.06,
  }
})
