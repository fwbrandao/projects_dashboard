# Projects Dashboard — Redesign Critique & Architecture Plan

**Prepared for:** Brandao
**Date:** 29 May 2026
**Scope:** Design critique + technical redesign plan (no code yet)
**Source reviewed:** `shell/` (React 17 + MUI v4 microfrontend), `DESIGN.md`, `projectsData.js`, routing in `App.js`

---

## TL;DR

The current dashboard has a genuinely strong *aesthetic* — the "ARCHITECT.OS" dark glass theme is well-documented and cohesive. The problems are not taste, they're **fit and function**:

1. **The site doesn't say who you are or what it is.** A visitor lands on sci-fi flavor text ("Deep Learning Cluster", "high-frequency inference clusters", fake coordinates) instead of "Brandao — ML & web engineering portfolio."
2. **Core navigation is broken.** Two of four nav links (`WORK`, `BIO`) and every category breadcrumb point at routes that don't exist and silently fall back to the homepage. The header mail/profile icons do nothing.
3. **No way to find anything.** No search, no filters — despite the project list being the entire point of the site.
4. **It's invisible on mobile.** The nav is `hidden md:flex` with no hamburger replacement, so phone visitors get no navigation at all.
5. **The stack is heavy and dated for what this is.** A webpack Module-Federation microfrontend on React 17 + MUI v4 (both end-of-life) is enterprise machinery wrapped around a single-author static portfolio.
6. **Credibility risk:** several projects show fabricated metrics ("98.2% accuracy", "120 FPS", "1.2 TB/s throughput", "99.9% uptime"). For a real portfolio these undermine trust.

The good news: because the content is small and mostly static, a clean rebuild is *less* work than maintaining the current architecture, and fixes all six issues at once.

---

# Part 1 — Design Critique

*Framework: first impression → usability → hierarchy → consistency → accessibility, then priorities.*

## Overall impression

Visually confident and distinctive — the frosted-glass-over-indigo look with cyan/magenta accents reads as intentional and premium, and `DESIGN.md` is an unusually disciplined design system. The biggest opportunity is **purpose clarity**: the interface performs "futuristic console" so hard that it forgets to introduce its owner or let people actually browse the work. The redesign should keep the craft and redirect it toward a portfolio that recruiters, collaborators, and peers can read in five seconds and navigate in ten.

## First impression (the 2-second test)

| Question | Current reality |
|----------|-----------------|
| What draws the eye first? | The gradient headline "Convolutional Neural Networks" + animated particle field. Beautiful, but it's a *topic*, not *you*. |
| Is the purpose clear? | No. Nothing on the hero says this is **Brandao's project portfolio**. "Deep Learning Cluster", "COORD // 40.7128° N", and a live UTC clock imply a live system dashboard, not a CV. |
| Emotional reaction | "Slick sci-fi demo." Good for vibe, working against a portfolio's job: *who made this and can I trust them?* |

**Recommendation:** Lead with identity. Hero = name, one-line positioning ("ML & front-end engineer — computer vision, NLP, and the web"), and two real CTAs (*View work*, *GitHub / CV*). Keep the particle field as ambiance behind real copy, not in place of it.

## Usability

| Finding | Severity | Recommendation |
|---------|----------|----------------|
| `WORK` (`/work`) and `BIO` (`/bio`) nav links route to pages that don't exist and silently fall through to the landing page (catch-all `/` route). | 🔴 Critical | Either build those pages or remove the links. Dead nav is worse than no nav. |
| Breadcrumb on every detail page links category to `/categories/{id}` — a route that doesn't exist, so it also dumps to the homepage. | 🔴 Critical | Add real category routes, or make the breadcrumb point at the on-page category anchor. |
| No search and no filtering anywhere. | 🔴 Critical | Add a persistent search box + category/tag filter chips on the landing page (you flagged this as a goal). |
| Header `mail` and `account_circle` buttons are non-functional `<button>`s with no handler. | 🟡 Moderate | Wire to `mailto:`/contact and remove the account icon (a single-user portfolio has no account). |
| Mobile users get **no navigation at all** — links are `hidden md:flex` with no hamburger/drawer fallback. | 🔴 Critical | Add a mobile menu (drawer or full-screen overlay). |
| Several detail pages display invented stats (accuracy/FPS/throughput/uptime). | 🟡 Moderate | Show real numbers or drop the stat tiles. Fabricated metrics are a credibility liability in a portfolio. |
| Every project card is visually identical (same giant ghost glyph), so scanning is slow. | 🟡 Moderate | Use real thumbnails (you already have project images in `src/images/`) or differentiate by category color/cover. |
| Hero CTA "Explore Architecture" deep-links into one specific project (`/autonomous-driving`); "System Specs" goes to your GitHub profile. Labels don't match destinations. | 🟢 Minor | Make CTA labels honest: *Browse projects* (scrolls to grid) and *GitHub*. |

## Visual hierarchy

- **What draws the eye first:** the animated hero and gradient text — correct *location*, wrong *content* (topic instead of identity).
- **Reading flow:** hero → "Neural Portfolios" → category sections. The flow itself is fine; the labels are the problem. "Neural Portfolios", category copy like "harnessing data to synthesize actionable intelligence", and the eyebrow "ADVANCED COMPUTER VISION" are marketing-generator prose that adds noise without information.
- **Emphasis:** the signature cyan→violet→magenta gradient is used well (one phrase) but the *card grid* — the most important content — is the least emphasized region. Invert that: make the work the hero of the page below the fold.
- **Whitespace:** genuinely good. 80px section blocks and 24–32px padding give the page room to breathe. Keep this.

## Consistency

| Element | Issue | Recommendation |
|---------|-------|----------------|
| Design tokens | Three sources of truth: `tailwind.config.js` colors, `index.css` component classes, and **hardcoded `rgba()` inline styles** repeated across `landingPage.jsx`, `navBar`, cards, and detail layout. | Collapse to one token layer (CSS custom properties or Tailwind theme) and reference it everywhere. No raw hex/rgba in JSX. |
| Border radius | `DESIGN.md` says default 16px, but JSX mixes `rounded-lg` (=2rem here, overridden), `rounded-xl`, `rounded-full` somewhat ad hoc. | Define a small radius scale and apply by component role, not per-element guesswork. |
| Dead code | `core/layout/` ships `AppLayout`, `Sidebar`, `TopNav`, `BottomNav` that `App.js` never uses (it renders `NavBar` directly). | Delete unused layout components; they imply structure that isn't there. |
| Detail pages | 12+ near-identical hand-built detail components instead of one data-driven template. | One `ProjectDetail` template fed by data (see Part 2). |
| Copy voice | Oscillates between real ("Tic Tac Toe built as a micro-frontend") and generated sci-fi ("real-time inference clusters"). | Pick one honest, technical voice and rewrite descriptions to say what you actually built and learned. |

## Accessibility

- **Color contrast:** body text `#e7e2ff` on `#0d0b21` is excellent (~13:1). But the UI leans heavily on **opacity-dimmed text** — `text-on-surface-variant/50`, `/60`, eyebrows at 10px — which pushes secondary copy below comfortable contrast and well below the WCAG 4.5:1 mark at those small sizes. Stop stacking opacity on already-muted colors.
- **Touch targets:** header icon buttons and 10px uppercase tags are small for touch; aim for ≥44×44px hit areas on mobile.
- **Motion:** the particle canvas and pulse animations run unconditionally. `DESIGN.md` *claims* `prefers-reduced-motion` support — the implementation doesn't honor it. Add the media query and disable the canvas/lift/pulse for users who ask.
- **Dark-only:** fine as a choice, but the tokens are calibrated only for indigo. If light mode is ever wanted it's a from-scratch effort (noted in Part 2).
- **Images:** project images lack meaningful `alt` text; the hero relies on a decorative background image with no text alternative for its purpose.

## What works well

- The **design system documentation** (`DESIGN.md`) is excellent — most portfolios have nothing close. Carry it forward.
- **Cohesive palette and restraint:** one accent (cyan), one counter-accent (magenta), one gradient used once per page. That discipline is rare and worth keeping.
- **Generous, consistent spacing** and a clear type pairing (Plus Jakarta Sans display + Inter body).
- **The particle hero** is a nice signature — it just needs real copy in front of it.

## Priority recommendations (design)

1. **Make the hero about you, and fix navigation.** Name + positioning + real CTAs; repair or remove `WORK`/`BIO` and category breadcrumbs; add a mobile menu. This is the difference between "cool demo" and "portfolio that works."
2. **Add search + filters and make the work the centerpiece.** A search box and category/tag chips over a card grid with real thumbnails. The projects are the product.
3. **Tell the truth and tighten the voice.** Remove fabricated stats, rewrite generated copy into honest technical descriptions, and honor `prefers-reduced-motion` + contrast minimums.

---

# Part 2 — Architecture Plan

Three decision records. ADR-001 is the big one (the stack); 002 and 003 depend on it.

---

## ADR-001: Replace the microfrontend shell with a single Vite + React 18 app

**Status:** Proposed
**Date:** 29 May 2026
**Deciders:** Brandao

### Context

The site is a **single-author, mostly-static personal portfolio** of ~15 projects. It is currently built as a webpack **Module Federation microfrontend** ("shell" + lazily federated apps) on **React 17** and **Material-UI v4**, deployed to CloudFront.

Forces at play:

- Microfrontends exist to let *independent teams deploy independently*. There is one author and one deploy target here, so that benefit doesn't apply — it's pure overhead (federation config, multiple build graphs, MUI runtime + Tailwind both shipping).
- **React 17** (2020) and **Material-UI v4** are both past their prime: React has since shipped 18 and 19, and MUI v4 is no longer actively maintained (superseded by MUI v5+). Staying here means growing security/dependency debt and no access to modern APIs.
- The build mixes MUI's CSS-in-JS *and* Tailwind *and* inline `rgba()` styles — three styling systems for one small app.
- You explicitly want: easier content management, search/filter, responsive polish, and better performance.

### Decision

Rebuild as a **single Vite + React 18 (TypeScript) application**, styled with **Tailwind only**, content driven by **data + MDX** (ADR-002), deployed as static files to the existing CloudFront/S3. Drop Module Federation and MUI entirely. Keep the `DESIGN.md` design language and the particle hero.

### Options considered

#### Option A — Keep microfrontend, just upgrade (React 18, MUI v5)
| Dimension | Assessment |
|-----------|------------|
| Complexity | High — federation + MUI v4→v5 codemod + React 17→18 simultaneously |
| Cost (effort) | High, low payoff |
| Scalability | Over-built; scales in a dimension you don't need |
| Maintenance | Ongoing federation + dual-styling burden |

**Pros:** preserves existing structure; incremental.
**Cons:** pays the upgrade cost *and* keeps the unnecessary architecture; doesn't simplify styling or content.

#### Option B — Single Vite + React 18 + Tailwind app *(recommended)*
| Dimension | Assessment |
|-----------|------------|
| Complexity | Low — one build, one styling system |
| Cost (effort) | Medium one-time rebuild; content & design already exist to port |
| Scalability | Right-sized; trivial to add projects |
| Performance | Vite + code-splitting + static hosting → fast cold loads, small bundle |

**Pros:** removes federation + MUI overhead; modern React; one styling source of truth; fastest path to search/filter/MDX; same CloudFront deploy.
**Cons:** it's a rewrite of the shell (mitigated: content, routes, and design tokens port directly).

#### Option C — Next.js (App Router) static export
| Dimension | Assessment |
|-----------|------------|
| Complexity | Medium |
| SEO/meta | Best (per-project metadata, OG images) |
| Overhead | More framework than a static portfolio strictly needs |

**Pros:** great SEO/per-page metadata, image optimization, MDX support, easy static export.
**Cons:** heavier mental model; for ~15 static project pages Vite is leaner. Worth reconsidering **only if** SEO/discoverability becomes a primary goal.

### Trade-off analysis

The deciding factor is **matching architecture to scale.** The microfrontend solves a problem you don't have while taxing every change you do make. Option A pays a big migration bill to keep that tax. Option B removes the tax for a comparable one-time cost and unlocks the four functional goals directly. Option C is Option B plus SEO at the cost of more framework — a reasonable upgrade if recruiters finding you via Google matters more than build simplicity. Recommend **B**, with C as the fallback if SEO becomes priority #1.

### Consequences

- **Easier:** adding projects, theming, search, mobile work, dependency upgrades, fast local dev (Vite HMR).
- **Harder / to revisit:** if you ever genuinely want independently-deployed sub-apps (you don't today), you'd reintroduce that separately. The `tic-tac-toe` "micro-frontend" becomes just a lazy-loaded route — fine.
- **Migration is bounded:** `projectsData.js`, the route table in `App.js`, the Tailwind token set, and `DESIGN.md` all port with little change.

### Action items
1. [ ] Scaffold Vite + React 18 + TypeScript + Tailwind; port the `tailwind.config.js` token set.
2. [ ] Port `DESIGN.md` tokens into CSS custom properties as the single source of truth (kill inline `rgba()`).
3. [ ] Re-implement layout: `Header` (with mobile drawer), landing, category, project-detail.
4. [ ] Move `tic-tac-toe` and JS-30 demos to lazy-loaded routes.
5. [ ] Wire static build → existing S3 + CloudFront (keep the deploy target; replace the pipeline).
6. [ ] Delete dead `core/layout/*`, federation configs, MUI deps.

---

## ADR-002: Drive content from typed data + MDX instead of hand-built page components

**Status:** Proposed · **Date:** 29 May 2026 · **Deciders:** Brandao

### Context

Today, adding a project means: (1) add an entry to `projectsData.js`, (2) hand-author a bespoke detail component under `components/projects/...`, and (3) register a route in `App.js`. Three edits in three places, plus copy-pasted layout. The detail pages are ~12 near-duplicate components. You named "easier content management" as a goal.

### Decision

Make each project **one MDX file** with typed frontmatter (title, slug, category, tags, repo URL, cover image, real stats — all optional). A single `ProjectDetail` template renders any project; routes are generated from the file list. Adding a project = drop in one `.mdx` file.

### Options considered

#### Option A — Headless CMS (Sanity/Contentful)
**Pros:** edit from a web UI, no code to add content.
**Cons:** external service, API keys, runtime fetch or build hook, monthly cost/account — heavy for a developer's own portfolio. **Cons outweigh** for a single technical author.

#### Option B — MDX files + typed frontmatter *(recommended)*
| Dimension | Assessment |
|-----------|------------|
| Complexity | Low |
| Authoring | Write Markdown + occasional React component (charts, demos) inline |
| Type safety | Frontmatter validated at build (e.g. Zod) — catches missing fields |
| Cost | $0, version-controlled, lives next to code |

**Pros:** one file per project; mix prose, code blocks, and live React demos; Git is your CMS; fully typed.
**Cons:** authoring is in-repo (fine — you're the author).

#### Option C — Keep JS data object, single template (no MDX)
**Pros:** smallest change from today.
**Cons:** rich bodies (code samples, embedded demos) get awkward in a JS string; MDX is purpose-built for exactly this.

### Trade-off analysis

A CMS optimizes for *non-technical editors editing remotely* — not your situation. MDX optimizes for *a developer writing rich technical content in version control* — exactly your situation, and it natively handles the code snippets and embedded interactive demos your detail pages already want. Option C is a stepping stone but hits a wall on rich content.

### Consequences
- **Easier:** new project = one file; consistent layout for free; real stats become optional typed fields (no more fabricated tiles).
- **Harder:** initial template + frontmatter schema work up front.
- **Revisit:** if you later want non-devs to publish, layer a CMS on top — the data shape already matches.

### Action items
1. [ ] Define a typed frontmatter schema (Zod): `title, slug, category, tags[], summary, cover?, repo?, demo?, stats?{}`.
2. [ ] Build one `ProjectDetail` template consuming it (port the current detail layout).
3. [ ] Convert the ~15 existing projects to `.mdx`; replace invented stats with real ones or omit.
4. [ ] Generate routes + category pages from the file collection.

---

## ADR-003: Client-side search & filtering over the project collection

**Status:** Proposed · **Date:** 29 May 2026 · **Deciders:** Brandao

### Context

No search or filtering exists. The dataset is small (~15 now, maybe dozens long-term) and fully available at build time. You want search + filter, responsive behavior, and good performance.

### Decision

**Client-side** search and filtering. Filter by category and tag with chips; free-text search over title/summary/tags. For the current size, a simple in-memory `filter()` with debounced input is enough; introduce a lightweight fuzzy index (e.g. Fuse.js) only if/when fuzzy matching is wanted. Reflect active filters in the URL query string so views are shareable and back-button works.

### Options considered

#### Option A — In-memory filter + (optional) Fuse.js *(recommended)*
| Dimension | Assessment |
|-----------|------------|
| Complexity | Low |
| Performance | Instant at this scale; zero network |
| Infra | None |

**Pros:** no backend, no service, works offline, trivial to build; URL-synced filters are shareable.
**Cons:** all data ships to client (fine — it's a public portfolio of ~dozens of items).

#### Option B — Hosted search service (Algolia/Meilisearch)
**Pros:** scales to thousands of docs, typo-tolerance, analytics.
**Cons:** account, API keys, indexing pipeline, cost — massive overkill for a personal portfolio.

### Trade-off analysis

Hosted search earns its keep at thousands of documents and high query volume. At ~15–50 static items, shipping the whole list and filtering in the browser is faster (no round-trip), simpler, and free. Defer Option B unless the catalog grows an order of magnitude.

### Consequences
- **Easier:** instant filtering; shareable filtered URLs; no infra.
- **Harder:** nothing meaningful at this scale.
- **Revisit:** if project count passes a few hundred, switch to a prebuilt index or hosted service.

### Action items
1. [ ] Add a search input + category/tag filter chips to the landing page.
2. [ ] Implement debounced in-memory filtering; sync state to URL query params.
3. [ ] Empty-state copy for "no results"; show active-filter count and a clear-all.
4. [ ] Verify keyboard accessibility (focus, Enter to search, Esc to clear) and ≥44px touch targets.

---

## Proposed visual direction ("surprise me")

Keep the soul of ARCHITECT.OS, lose the cosplay. Concretely:

- **Reframe from "live console" to "engineer's portfolio."** Drop the fake coordinates, UTC clock, and "inference cluster" language. Keep the indigo canvas, glass surfaces, cyan/magenta accents, particle hero, and the signature gradient (used once per page).
- **Hero = identity:** name, one honest line of positioning, two real CTAs, and the particle field as backdrop.
- **Work-first landing:** sticky search + filter chips, then a card grid using **real project thumbnails** (you already have them in `src/images/`) instead of identical ghost glyphs. Category color-coding for fast scanning.
- **Optional, recommended:** add a **light mode** with a proper toggle. The current tokens are dark-only; doing this well means defining a parallel light token set now (cheap during a rebuild, expensive later). If you want it, fold it into ADR-001.
- **Honest, technical voice** throughout. Say what you built, the stack, what you learned, and link the repo.

The result reads as *"a strong engineer who also has taste"* rather than *"a sci-fi UI demo,"* which is what a portfolio needs to do.

---

## Suggested sequencing

1. **Quick wins on the current site (hours, optional):** remove/redirect dead `WORK`/`BIO` links, fix breadcrumb targets, add a mobile menu, delete fabricated stats. Stops the bleeding before the rebuild.
2. **ADR-001 rebuild** (Vite + React 18 + Tailwind, port design tokens & content).
3. **ADR-002 MDX content model** during the rebuild.
4. **ADR-003 search/filter** + responsive/a11y pass.
5. Re-point CloudFront at the new build; retire the federation pipeline.

Net effect: the same distinctive look, a portfolio that actually introduces you and lets people find your work, and a stack that's lighter to run and far easier to add to.
