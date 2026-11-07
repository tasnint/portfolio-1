# Tanisha's Portfolio

My personal portfolio website: a desk full of sticky notes, polaroids and doodles.

Built with React, TypeScript and Vite.

## What's inside

- **Home:** my name types itself out, a blue scribble draws underneath, then a polaroid pops up, sticky notes drop in and blue paint sweeps across the screen.
- **Experience:** a sticky note for each role, with a polaroid paper-clipped to its side.
- **Skills:** a cork bulletin board with a pinned sticky note per category.
- **Projects:** a spiral notebook with a page per project and tabs to jump between them.

Pages use hash links (`#/experience`, `#/skills`, `#/projects`) so they work on GitHub Pages.

## Running it locally

Requires Node 22 (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

## Editing content

| What | File |
| --- | --- |
| Experiences, skills, projects, social links and email | `src/data.ts` |
| Home page sticky notes | `src/pages/Home.tsx` |
| Resume PDF | `public/Tanisha-Tasnin_Resume.pdf` |

Pushing to `main` redeploys the site to https://tasnint.github.io/portfolio-1/.
