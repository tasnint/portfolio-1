import { useEffect, useState } from 'react'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'

// Hash routes (#/experience etc.) so every page works on GitHub Pages without server rewrites.
const PAGES = {
  '': { component: Home, title: 'Tanisha Tasnin' },
  experience: { component: Experience, title: 'Experience · Tanisha Tasnin' },
  skills: { component: Skills, title: 'Skills · Tanisha Tasnin' },
  projects: { component: Projects, title: 'Projects · Tanisha Tasnin' },
}

type Route = keyof typeof PAGES

function currentRoute(): Route {
  const path = window.location.hash.replace(/^#\/?/, '').split(/[/?]/)[0]
  return path in PAGES ? (path as Route) : ''
}

export default function App() {
  const [route, setRoute] = useState<Route>(currentRoute)

  useEffect(() => {
    const onChange = () => {
      setRoute(currentRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  useEffect(() => {
    document.title = PAGES[route].title
  }, [route])

  const Page = PAGES[route].component
  return <Page key={route} />
}
