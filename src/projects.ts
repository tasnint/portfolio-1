import { useEffect, useState } from 'react'

// Projects shown on the site, pulled live from GitHub. `repo` can be under any account
// (e.g. a team repo Tanisha contributed to), as long as it's public.
// `fallback` is used until GitHub responds, or if the repo has no description or README.
// `summary` always wins over the README, for repos whose README doesn't open with a project description.
type ProjectSource = { name: string; repo: string; fallback: string; summary?: string }

export type Project = ProjectSource & {
  url: string
  description: string
  // Last push to the repo, e.g. "Mar 2026".
  updated?: string
}

// Every project has a short `summary` (roughly 100–120 characters, about four lines on the card)
// so all descriptions are the same size. Remove a summary to show that repo's README intro instead.
const PROJECTS: ProjectSource[] = [
  {
    name: 'ConsoleViz',
    repo: 'tasnint/console-viz',
    summary: 'A Go command-line tool that turns data into live terminal dashboards, with bar charts, plots and tables.',
    fallback: 'A Go command-line tool that turns data into live terminal dashboards.',
  },
  {
    name: 'Pillmaxxer',
    repo: 'hydrowoxy/Pillmaxxer',
    summary: 'A team-built mobile app that helps people stay on top of their medication, powered by a Java backend.',
    fallback: 'A team-built mobile app that helps people stay on top of their medication.',
  },
  {
    name: 'PolyBalance',
    repo: 'tasnint/polyBalance',
    summary: 'A Go HTTP load balancer with round-robin, least-connections and latency-based routing, plus a live dashboard.',
    fallback: 'A Go HTTP load balancer with multiple routing strategies and a live dashboard.',
  },
  {
    name: 'Wild-or-Fire?',
    repo: 'tasnint/wildfire-detection-4AL3-project',
    summary: 'Deep learning wildfire detection that compares CNN architectures to classify images as Fire or No Fire.',
    fallback: 'A deep learning project that uses CNNs to detect wildfires in images.',
  },
  {
    name: 'What’s That Dish',
    repo: 'tasnint/3A04-Project',
    summary: 'The software design for an Android app that identifies dishes from a photo, a description or an ingredient list.',
    fallback: 'The software design for an Android app that identifies dishes.',
  },
  {
    name: 'Coral Shield',
    repo: 'tasnint/CoralShield',
    summary: 'A synthetic biology project protecting coral reefs from oxybenzone, the sunscreen ingredient behind coral bleaching.',
    fallback: 'A synthetic biology project protecting coral reefs from sunscreen chemicals.',
  },
]

// Stage px: a 3-column grid on one card (card spans x 20–1420, y 66–957).
export const PROJECT_LAYOUT = { top: 170, firstX: 100, width: 373, gap: 60, rowHeight: 330, itemHeight: 268, columns: 3 }

const MAX_SUMMARY = 320

// First prose paragraph of a README, stripped of markdown and trimmed to a sentence.
function readmeSummary(markdown: string): string | undefined {
  for (const block of markdown.replace(/\r/g, '').split(/\n\s*\n/)) {
    // A paragraph can sit directly under a heading with no blank line, so drop heading lines, not the block.
    const text = block
      .split('\n')
      .filter((line) => !/^\s*#/.test(line))
      .join('\n')
      .trim()
    if (!text || /^(#|!\[|<|```|\||[-*+] |\d+\. |https?:\/\/)/.test(text)) continue
    const plain = text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
    if (plain.length <= MAX_SUMMARY) return plain
    const cut = plain.slice(0, MAX_SUMMARY)
    const sentenceEnd = cut.lastIndexOf('. ')
    return sentenceEnd > 80 ? cut.slice(0, sentenceEnd + 1) : `${cut.trimEnd()}…`
  }
}

type RepoData = { description: string | null; pushed_at: string; html_url: string }
type Cached = { repo: RepoData; readme: string | null }

async function fetchRepo({ repo, summary }: ProjectSource): Promise<Cached> {
  // Cached per browser session to stay well under GitHub's 60 requests/hour limit.
  const key = `github:${repo}`
  try {
    const cached = sessionStorage.getItem(key)
    if (cached) return JSON.parse(cached) as Cached
  } catch {
    // Storage unavailable; fetch fresh.
  }

  // The README is only needed when there's no hand-written summary.
  const [repoRes, readmeRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${repo}`),
    summary
      ? null
      : fetch(`https://api.github.com/repos/${repo}/readme`, { headers: { Accept: 'application/vnd.github.raw' } }),
  ])
  if (!repoRes.ok) throw new Error(`GitHub ${repoRes.status} for ${repo}`)
  const result: Cached = { repo: await repoRes.json(), readme: readmeRes?.ok ? await readmeRes.text() : null }

  try {
    sessionStorage.setItem(key, JSON.stringify(result))
  } catch {
    // Ignore quota/storage errors.
  }
  return result
}

const toProject = (source: ProjectSource, data?: Cached): Project => {
  if (!data) return { ...source, url: `https://github.com/${source.repo}`, description: source.summary ?? source.fallback }
  const { repo, readme } = data
  return {
    ...source,
    url: repo.html_url,
    // Prefer the README intro; a one-word repo description like "Load Balancer" says less than the fallback.
    description:
      source.summary ||
      (readme && readmeSummary(readme)) ||
      (repo.description && repo.description.length > 40 ? repo.description : source.fallback),
    updated: new Date(repo.pushed_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  }
}

export function useProjects(): Project[] {
  const [projects, setProjects] = useState(() => PROJECTS.map((p) => toProject(p)))

  useEffect(() => {
    let cancelled = false
    PROJECTS.forEach((source, i) => {
      fetchRepo(source)
        .then((data) => {
          if (cancelled) return
          setProjects((current) => current.map((p, j) => (j === i ? toProject(source, data) : p)))
        })
        .catch(() => {
          // Keep the fallback text and plain GitHub link.
        })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return projects
}
