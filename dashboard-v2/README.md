# Projects Dashboard v2

A modern rebuild of the projects dashboard: **Vite + React 18 + TypeScript + Tailwind**,
replacing the React 17 / MUI v4 Module-Federation microfrontend.

See `../REDESIGN.md` for the full critique and the ADRs behind this rebuild.

## What changed
- **Identity-first** landing (who you are + real CTAs), not sci-fi flavor text.
- **Search + category filters** over the project grid, synced to the URL (`?q=`, `?cat=`).
- **Real project thumbnails**; fabricated metrics removed.
- **Working mobile navigation** (drawer) and a **light/dark theme toggle**.
- `prefers-reduced-motion` honored; skip-link and focus-visible styles.
- **Data-driven content** — add a project by editing `src/data/projects.ts` (ADR-002).
- One styling source of truth: CSS-variable tokens in `src/index.css`.

## Develop

This project uses **pnpm** (pinned via the `packageManager` field). Enable it with
Corepack — no global install needed:

```bash
corepack enable
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # type-check + production build to dist/
pnpm preview      # preview the production build
```

## Supply-chain safeguard

`pnpm-workspace.yaml` sets `minimumReleaseAge: 10080` (7 days). pnpm will not install
any package version — direct or transitive — until it has been public for at least a
week, so a compromised release published and yanked within hours never lands in your
tree. `@types/*` are exempt (no executable code). To force an immediate same-day patch,
add the package to `minimumReleaseAgeExclude` temporarily.

## Add a project
1. Drop a thumbnail in `src/assets/`.
2. Add a typed entry to the `projects` array in `src/data/projects.ts`.
That's it — the card, detail page, search, and filters pick it up automatically.

## Deploy
Static build in `dist/`. Point S3/CloudFront at it. Because it uses the HTML5 history
router, configure the host to **rewrite unknown paths to `/index.html`** (CloudFront:
custom error response 403/404 → `/index.html`, 200) so deep links and refresh work.

A prebuilt `dist/` is included so you can open it immediately; re-run `pnpm build`
after any change.
