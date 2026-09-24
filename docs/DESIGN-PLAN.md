# Making gIGNITE feel like an event, not a form

A plan for the "it looks too plain" feedback. Written against the platform as it
stands on 24 September 2026, after the primary colour moved to `#20419A`.

---

## 1. What actually went wrong

We adopted a B2B analytics reference wholesale and applied it to all eleven
screens. That reference is tuned for an analyst who stares at numbers for eight
hours: hairline borders, grey metadata, low chroma, no motion. It is the right
language for the staff console and **the wrong language for the front door**.

A nineteen-year-old deciding whether to give up a weekend does not want calm. They
want to know it looks worth entering.

Nine specific things, all checkable in the current build:

1. **Colour appears only where students never look.** The orange → pink → purple
   ramp exists solely in sparklines, share bars and status dots — every one of them
   behind staff login. The landing, sign-in gate and wizard are effectively
   monochrome plus one blue.
2. **Nothing moves.** Zero transitions anywhere: no route change, no entrance, no
   count-up, no chart draw, no feedback when a wizard step completes, no submit
   celebration. Static interfaces read as documents, not products.
3. **No imagery.** Eleven screens of type on white. The only non-text visual is the
   hero wash.
4. **The event has no presence.** No countdown, no live entry count, no prize, no
   schedule, no venue, no photos from last year, no faces. A hackathon is social,
   competitive and time-boxed; the UI conveys none of that.
5. **The five tracks are just strings.** "AI for Smart Cities" is text in a dropdown
   and a 7px dot. Five tracks is the richest identity hook we have and it is unused.
6. **Empty states are bleak.** Four grey zeros on the dashboard. On the student side,
   no reassurance at all.
7. **No reward loop.** Finishing step 2 of 4 gives nothing. Submitting — the single
   biggest moment in the product — gives a text page.
8. **Flat depth.** One shadow token. Everything sits on one plane, so nothing reads
   as raised, pressable or important.
9. **Typographic monotony.** One family, and ~95% of text sits between 11.5px and
   17px. Exactly one display moment exists, on the landing.

### The principle

**Do not make the admin console louder. Split the temperature, not the system.**

Same tokens, same typeface, same components — but participant surfaces run warm,
spacious, colourful and animated, while staff surfaces stay calm and dense. This is
what mature products do: a marketing site and its dashboard share a design system
and feel nothing alike. It also satisfies the "one visual system" constraint,
because the system is the tokens, not the density.

---

## 2. Five workstreams

Ordered by impact per unit of effort.

### W1 · Track identity — the highest return in the plan

Give each of the five tracks a **colour, an icon and a one-line promise**, then use
that identity everywhere:

| Track | Role in the palette |
| --- | --- |
| AI for Disaster Management | already `viz-pink` |
| AI for Healthcare | `viz-green` |
| AI for Mobility & Transportation | `viz-blue` |
| AI for Smart Cities | `viz-orange` |
| Open Innovation Track | `viz-purple` |

It pays off in about forty places at once: landing track cards stop being five
identical boxes; the wizard's theme step becomes a **visual choice** rather than a
radio list; dashboard dots, team cards, team detail headers and eventual
certificates all inherit it. One system, built once.

**Effort: medium. Impact: high. Do this first.**

### W2 · A motion system

Define duration and easing tokens, then apply:

- route cross-fade, and staggered entry for card grids
- **KPI count-up** and **chart path draw-in** — the dashboard's numbers are its
  whole point and they currently just appear
- hover lift on interactive cards, press state on buttons
- wizard step transition, and an animated autosave tick
- skeletons instead of blank space

All of it behind `prefers-reduced-motion`, which the codebase already honours.

**Effort: medium. Impact: high — this alone removes most of "plain".**

### W3 · The student journey's emotional beats

Three moments carry the whole participant experience, and all three are currently
flat.

**Landing** — add a countdown to the close, a live entry counter with a recent
activity line ("a team from FISAT just entered Smart Cities"), what you actually get
out of entering, an FAQ, and photographs from a previous event. Social proof and a
deadline are the two strongest levers on registrations, and we use neither.

**Wizard** — encouraging microcopy per step, a visible "that was the hard part"
moment after step 3, and an autosave indicator that animates rather than sitting
there.

**Submit** — the biggest moment in the product deserves more than a text page. An
entry-ID card, a reduced-motion-safe celebration, and a **shareable team card**.
Students sharing their entry is free distribution.

**Effort: medium to large. Impact: highest of anything here on actual registrations.**

### W4 · Depth, texture and imagery

A real elevation scale (three levels, not one). Gradient-mesh accents derived from
the circuit motif already in the gIGNITE logo. A duotone treatment for photography
so any source image lands on-brand. Subtle noise on large flat fills. A soft glow
behind hero numerals.

**Effort: small to medium. Impact: medium.**

### W5 · Dashboard delight — last, and deliberately restrained

Count-up numbers, chart draw-in, illustrated empty states, richer hover, keyboard
shortcuts. Staff want speed, not decoration.

**Effort: small. Impact: low but cheap.**

---

## 3. Guardrails

Worth writing down, because "more engaging" is the brief most likely to produce a
worse product.

- **No dark mode.** Already decided; do not reopen.
- **No second typeface for decoration.** Inter carries it; range comes from size,
  weight and colour.
- **Colour never carries meaning alone.** Every track colour needs its label or
  icon beside it. Roughly 1 in 12 male students is colour-blind.
- **Keep the admin dense.** Engagement is not bigger padding.
- **No scroll-triggered animation above the fold.** It breaks the first paint and
  looks broken on slow connections.
- **Everything survives 360px on a cheap Android.** Most of these students will
  register on a phone, on mobile data, possibly the night of the deadline. Any
  illustration or photo work must be weight-budgeted — the current bundle is 281KB
  of JS and should not double for decoration.
- **Motion respects `prefers-reduced-motion`,** without exception.

---

## 4. Sequencing

| Sprint | Ships | Why this order |
| --- | --- | --- |
| **1** | W1 track identity, W2 motion tokens + KPI count-up + chart draw | Both are systemic. Everything after inherits them. |
| **2** | W3 landing beats (countdown, live counter, proof), W3 submit celebration | The two surfaces that decide whether a team enters at all. |
| **3** | W4 depth and imagery, W3 wizard microcopy, W5 dashboard polish | Refinement once the structure is settled. |

## 5. How we know it worked

Not "does it look nicer". Four things worth instrumenting on the real portal:

- **Landing → register click-through**
- **Wizard completion rate**, and which step loses people
- **Median time to complete** the wizard, split by device
- **Share of entries from mobile** — if it stays far below desktop, the mobile work
  is not done

---

## 6. Already done

- Primary colour moved to `#20419A` across every CTA, focus ring, input focus state
  and the Submitted/judge chips. Contrast 9.3:1 on white.
- Ink is now text only. Buttons no longer read as near-black.
- The orange/pink/purple ramp stays reserved for data, which leaves it free to
  become the track palette in W1.
