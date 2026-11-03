# Personal Website

Personal site built with Next.js (App Router), TypeScript, and Tailwind CSS. Four pages: home, habits, blog, apps.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/` — pages (`/`, `/habits`, `/blog`, `/blog/[slug]`, `/apps`)
- `src/components/` — `Nav`, `Footer`, `Heatmap`
- `src/lib/` — content and data: `site-config.ts`, `habits.ts`, `blog.ts`, `apps.ts`, `date.ts`

## Habits page

Each habit renders its own GitHub-style contribution heatmap (`src/components/Heatmap.tsx`). Habit definitions and mock data generation live in `src/lib/habits.ts` — the mock data is deterministic (seeded by habit id + date) so it's stable across server/client renders. Swap `generateMockHabitData` for a real data source (e.g. a spreadsheet integration) when ready.

## Blog

Posts are placeholder entries in `src/lib/blog.ts`. Replace with MDX/markdown files or a CMS when ready.

## Deploying

Push to GitHub and import the repo on [Vercel](https://vercel.com/new).
