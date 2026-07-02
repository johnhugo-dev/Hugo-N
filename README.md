# HUGO — concept site

Light, airy, story-first. Built to the brief from the 02/07 call:
Scale/SpaceX as benchmarks, emotion before technical detail, no rounded
corners anywhere, tech depth kept on page two ("Inside").

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Structure (8 pages)

- `index.html` — the story. Hero → civilization sequence (pinned scroll) →
  proof line → Build / Connect / Transform chapters → work stories → people →
  closing CTA.
- `build.html` — the quality loop (Spec→Label→Sample→Adjudicate→Recalibrate),
  stats band (99.2% QA at 6× throughput), Your spec/domain/pace trio,
  featured story, why it matters.
- `connect.html` — the "resolved in 54 seconds" conversation ledger, the
  KONT three-layer SVG diagram, where-humans-come-in rows, stats,
  Your systems/policies/voice trio.
- `transform.html` — the overnight timeline (22:00→07:00), the action-log
  ledger with the blocked-for-approval line, stats, pricing promise, FAQ.
- `work.html` — six stories with real deployment numbers, the honesty chart
  (week 1: 31% → month 6: 72%, with the plateau), stats.
- `about.html` — the story in three prose chapters (Where we started / The
  turn / The bet), at-a-glance stats, three commitments, the road-so-far
  timeline, locations.
- `careers.html` — the Hugo way spelled out, the "this place is not for
  everyone" honest two-column, the four-step two-week hiring process.
- `inside.html` — KONT + tiers, the five-stage loop, six control
  guarantees, compliance posture.

Every subpage follows Scale's density recipe: hero → trust line → 6–9
distinct sections mixing rows, numbered sequences (true sequences only),
light "ledger" figures, hairline SVG diagrams, count-up stats bands, and a
closing CTA. Numbers are drawn from the musubi site's published deployment
figures.

The header matches Scale's live nav: hovering a trigger drops a
full-width white sheet that reads as one surface with the bar. Big plain
links (~1.45rem, Scale's .navigation-link size) sit left under small grey
column heads (Build · Connect · Transform); a large media block sits
right (swap the images in the MENU array in src/nav.js — they use the
same picture-N placeholders); the sheet's bottom edge feathers into the
page; the active trigger stays dark while siblings dim. Built as one
shared module (src/nav.js, mounted on every page — musubi's layout.js
pattern), with a burger menu on mobile. Footer is Scale's 4-column
pattern.
- `src/style.css` — the whole design system. One font (Aeonik Pro), zero
  border-radius, paper/ink palette, one horizon-blue accent.
- `src/main.js` — Lenis smooth scroll + GSAP: hero line rise, pinned era
  sequence, scroll reveals, gentle image parallax. Respects
  prefers-reduced-motion.

## Replacing the placeholder images

Every image lives at `public/assets/picture-N.jpg`. Download your chosen
photo, rename it to the same filename, drop it in — nothing else to change.

| File | Where | What to find |
|---|---|---|
| picture-1.jpg | Hero, full-bleed | Wide, LIGHT landscape at dawn: mist rolling over a mountain ridge or valley, pale sky taking up most of the frame, soft warm-grey/blue tones. Must be light enough for dark text to sit on it. Landscape orientation, min 2400px wide. Unsplash: search "misty mountain ridge dawn aerial" or "fog valley sunrise minimal". |
| picture-2.jpg | Build chapter | Conceptual precision/clarity: high-altitude thin air, a lone peak above clouds, or macro of frost/crystal structure. Cool, clean, bright. Portrait-ish. Search "above the clouds mountain peak minimal" or "glacier texture aerial". |
| picture-3.jpg | Connect chapter | Warm and human, but conceptual — NOT a call center. Golden-hour light through haze, two trees leaning together, hands almost touching, a path meeting a horizon. Search "golden hour haze trees minimal" or "warm morning light landscape". |
| picture-4.jpg | Transform chapter | Order and calm: still water with a perfect reflection, raked sand, wind-formed dune lines. Pale green/silver-grey. Search "still lake reflection minimal" or "sand dunes patterns aerial light". |
| picture-5.jpg | People, full-bleed | Real Hugo people in warm natural light — candid, working or laughing, NOT posed corporate. If no internal photo yet: search "diverse team natural light candid office warm". An internal photo will always beat stock here. |
| picture-6.jpg | Closing CTA background | Near-white horizon: pale sea meeting pale sky, or morning fog with the sun barely through. Almost empty. Search "pale horizon sea fog minimal white". |
| picture-7.jpg | Build page hero | Wide: a single peak above a sea of clouds, or thin high-altitude air. Cool, precise, bright. Search "mountain peak above clouds wide". |
| picture-8.jpg | Connect page hero | Wide: warm dawn haze, golden light over a landscape — human warmth without people. Search "golden dawn haze landscape wide". |
| picture-9.jpg | Transform page hero | Wide: perfectly still lake at first light, mirror reflection. Search "still lake mirror reflection dawn". |
| picture-10.jpg | Work + About heroes | Wide, near-empty horizon with soft depth — the most conceptual of all. Search "minimal horizon landscape fog layers". |
| picture-11.jpg | Careers hero | Warm energy: sunlight through morning air, a path or ridge inviting you forward. Search "sun rays morning path warm landscape". |
| picture-12.jpg | About mid-page | Quiet texture: wind lines in sand, rock strata, water surface. Search "sand dune texture patterns minimal". |

Taire's filter for every image: light, airy, high resolution, conceptual —
"a mountain with a tree growing on it," not "the dairy" (too on-the-nose).

### Optional hero video

The hero `<figure class="hero-media">` can take a `<video autoplay muted
loop playsinline>` instead of the img. Look for slow drone footage over
misty landscape: coverr.co ("mist mountains"), pexels.com/videos
("aerial fog forest"). Keep it slow — no fast cuts.

## Font note (important)

The site self-hosts **Aeonik Pro Regular** (`public/fonts/`), taken from the
Scale clone for this concept. Aeonik is a commercial typeface by CoType
Foundry — fine for an internal concept review, but **buy a license before
this goes public** (cotypefoundry.com), which also gets you the Medium/Bold
weights. Free stand-ins if needed: "Archivo" or "Instrument Sans" on Google
Fonts get ~85% of the way.

The design intentionally uses ONE weight — hierarchy comes from size,
spacing and color, exactly like Scale's own site.
