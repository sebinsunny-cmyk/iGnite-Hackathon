# gIGNITE 2026 — Portal Design

A design prototype for the gIGNITE 2026 student hackathon portal, run by the
FISAT IEEE Student Branch with the IEEE Signal Processing Society Kerala Chapter,
powered by Gadgeon.

**Live** — https://sebinsunny-cmyk.github.io/iGnite-Hackathon/
**Preview (`development`)** — https://sebinsunny-cmyk.github.io/iGnite-Hackathon/preview/

---

## This is not the real front end

Read this before using anything here.

This repository is a **visual and interaction design** of the portal. It is not the
application that runs the event, and it is not wired to one.

- **No backend.** No API calls, no database, no auth. Nothing is sent anywhere.
- **No real accounts.** "Signing in" navigates; it does not authenticate. Any
  email and password will do, because neither is checked.
- **No persistence.** Forms do not save. Refresh and everything is gone. The only
  thing kept is the previewed role, in `localStorage`.
- **Static data.** Every team, judge, count and timestamp is a constant in
  `src/data/`. Filters, search fields and Export buttons are not wired up.
- **Do not put real personal data into it.** The registration wizard asks for
  names, phone numbers and ID cards. Those fields are decoration — treat the
  prototype as a picture of a form, not a form.

The production portal is a separate Next.js + Supabase application at
https://gdash-one.vercel.app. This project exists to settle how that portal should
look and behave before the design is built there.

### Why the data looks oddly specific

The screens use the real content from the live portal as of 22 September 2026 —
the actual teams (Neural Nadi, team 1, test 1), their leads, the real track and
status counts, and the 16–22 September submission curve. That is deliberate: design
decisions were compared against real row counts rather than invented ones, so the
layouts are judged at the scale they will actually face, including the empty states
that come with three entries and five tracks.

---

## Screens

Eleven screens, all reachable from the **All screens** button at the bottom of the
window.

| Route | Screen |
| --- | --- |
| `/` | Landing |
| `/register` | Participant sign-in gate |
| `/register/entry` | Registration wizard, four steps |
| `/register/closed` | Registration closed |
| `/login` | Staff sign-in |
| `/reset-password` | Password reset |
| `/dashboard` | Registrations dashboard |
| `/dashboard/teams/:teamId` | Team detail, with judge evaluation |
| `/dashboard/settings` | Registration window |
| `/dashboard/staff` | Staff accounts (Super Admin) |
| `/dashboard/audit-logs` | Audit log (Super Admin) |
| anything else | 404 |

### Roles

There is no login, so the header carries a **Role** selector — Super Admin, Admin,
Judge, Volunteer. It is a prototype affordance, not a feature of the real portal.
It changes what renders:

- **Judge** — the dashboard reduces to assigned submissions, and team detail gains
  the five-criteria scoring panel. ID cards are hidden.
- **Super Admin** — unlocks Staff and Audit logs; other roles see a restricted state.

---

## Design system

Typeface is **Inter** (400/500/600/700), headings at `-0.04em`. Light theme only —
there is no dark mode.

Tokens live in `src/index.css` under Tailwind's `@theme`. The palette was read off
the reference design's computed styles rather than sampled from a screenshot:

| Token | Value |
| --- | --- |
| Ink | `#0A0A0C` |
| Ground | `#FAFAFB` |
| Border | `#F0F0F3`, **0.8px** |
| Card radius | 16px, controls 10–11px |
| Elevation | `0 1px 2px rgba(14,14,20,.04)` |
| Accents | `#FFB27E` → `#FF7EA8` → `#A78CF7`, plus `#7CC0FF`, `#3FB27F` |

Two conventions worth keeping if you extend this:

- Uppercase letterspaced labels are **sans, never monospace**, and are reserved for
  column headers and eyebrows. Row metadata is plain grey text.
- Chip text is a dark variant of its own hue (`#7A4B2C` on the orange tint), not a
  generic grey.

---

## Running it

Requires **Node 20 or newer**.

```bash
npm install
npm run dev
```

Then open http://localhost:5183.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 5183 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` |
| `npm run build:single` | Build, then inline everything into one `.html` file |

### The single-file build

`npm run build:single` produces `gIGNITE-2026.html` at the repo root — one file,
about 1.4 MB, with the CSS, JS, logos and both Inter subsets inlined as data URIs.
Open it straight from disk with no server and no network; it renders identically to
the deployed site. Useful for sending the design to someone who should not have to
clone anything.

It works from `file://` because routing is hash-based (see below).

---

## Project structure

```
src/
  App.jsx                  routes + the "All screens" index
  index.css                design tokens and base styles
  assets.js                logo URLs, built on import.meta.env.BASE_URL
  components/
    AppShell.jsx           dashboard shell — top bar, sidebar, drawer
    PublicShell.jsx        public shell — nav, partner footer
    Brand.jsx              logo lockups and the "Presented by" band
    ui.jsx                 atoms: pills, chips, sparkline, tooltip, toggles, icons
  screens/                 the eleven screens
  data/
    registrations.js       teams, counts, the daily curve — the live data
    content.js             tracks, districts, colleges, wizard fields, rubric
  state/role.jsx           the previewed role
  _archived-directions/    five earlier design directions, unreferenced
public/                    the four brand logos
scripts/build-single.mjs   the single-file bundler
```

`src/_archived-directions/` holds earlier explorations. Nothing imports them, so
they are excluded from the build — they are kept for reference and can be deleted.

### Routing

`HashRouter`, so URLs look like `/#/dashboard`. This is deliberate: it lets the same
build run from GitHub Pages' subpath, from a plain static host, and from a local file
with no server rewrites. Asset URLs go through `import.meta.env.BASE_URL` for the same
reason — absolute `/logo.png` paths break under a project-pages subpath.

---

## Deployment

GitHub Actions builds on every push and publishes to the `gh-pages` branch:

| Branch | Publishes to |
| --- | --- |
| `main` | site root — `/iGnite-Hackathon/` |
| `development` | `/iGnite-Hackathon/preview/` |

Both write into the same `gh-pages` branch but into different folders, and the
workflow replaces only its own folder, so neither clobbers the other. Runs are
serialised by a concurrency group.

`gh-pages` holds build output only and is rewritten by CI — do not commit to it.

Pages is configured as **Deploy from a branch → `gh-pages` → `/ (root)`**.

Work happens on `development`. Fast-forwarding `main` is the release:

```bash
git checkout main && git merge --ff-only development && git push origin main
```

---

## Known gaps

Things a reviewer will notice, listed so nobody files them twice.

- Search fields, filter dropdowns and Export buttons are inert.
- The wizard's formatting toolbar writes Markdown (`**bold**`, `- ` lists), but
  nothing renders it yet — a judge viewing a submission sees the raw characters.
- Judge scores and entry IDs render as empty states. The live portal never showed
  real values for them, so none were invented.
- File uploads open nothing.
- The preview build is visually identical to production, with no badge marking it
  as unreleased.
- Tap targets rely on a `@media (pointer: coarse)` rule for the 44px minimum. That
  has not been checked on a physical device.

---

## Credits

Presented by **Gadgeon**, the **FISAT IEEE Student Branch** and the
**IEEE Signal Processing Society, Kerala Chapter**.

Logos in `public/` and `gIgnite assets/` belong to those organisations and are
included here only so the prototype renders correctly.
