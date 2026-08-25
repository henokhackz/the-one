# Plan: Consistent Dot-Grid Background Across the Portfolio

## Context
The hero, About Me, and Selected Work (Projects) sections render a refined "dot-grid"
environment (white dots on a near-black gradient, masked, with a subtle amber glow).
Every other section below them — Services, Testimonials, Technologies, Experience,
Education, CTA, and Footer — uses a plain `bg-black` with no dot grid, producing an
inconsistent, "patchy" look. The site also mixes eyebrow label styles: About/Projects
use a clean mono `About Me / 01` label while Services/Testimonials/Technologies/Experience
use plain `(SERVICES)`-style text, and Testimonials has an off-theme red avatar ring.

Approved direction: a **single global, continuous dot-grid background** for the whole
portfolio, plus **unified section eyebrow labels** and a **fixed accent color**.

## Approach
1. Extract the dot environment into one shared component and mount it once in the
   portfolio layout so it spans the entire site seamlessly (no black strips between
   sections). Remove the now-redundant per-section copies.
2. Standardize the section eyebrow labels to the amber mono style.
3. Fix the off-theme red accent in Testimonials.

---

## Files to create
### `src/components/section-background.tsx`
Reusable dot-grid layer (the exact pattern currently duplicated in hero/aboutme/projects):
- base gradient: `bg-gradient-to-b from-[#0b0b0b] via-[#080808] to-[#050505]`
- dot pattern: `radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)`,
  `backgroundSize: 28px 28px`, masked with
  `radial-gradient(ellipse 100% 80% at 50% 50%, black 55%, transparent 100%)`
  (dots visible across the full page, only softening at the extreme top/bottom).
- optional amber glow via a `glow` prop (`top-right | top-left | bottom-right | bottom-left | center | none`).
- rendered as `pointer-events-none absolute inset-0 -z-10`.

Export both `SectionBackground` and default.

## Files to modify

### `src/app/(portfolio)/layout.tsx`
Add `<SectionBackground />` as the first child inside the wrapper
(`<div className="min-h-screen relative flex flex-col mx-auto bg-black overflow-x-hidden">`).
Keep `bg-black` as a fallback base. This single layer now covers every route in the
`(portfolio)` group, including `/about`, `/work`, `/services`, the `(portfolio)/not-found`,
and `/contact`.

### Remove per-section background copies (redundant now)
For each, delete the inline dot-grid/gradient `<div className="absolute inset-0 z-0">…</div>`
and the `bg-black` / `bg-[#070707]` / `bg-[#050505]` on the `<section>`, and ensure the
content container carries `relative z-10` so it paints above the global layer.

- `src/components/hero.tsx` — remove the dot/gradient/glow block; keep the grain `<svg>`
  and keep its existing local amber glow for flavor.
- `src/components/aboutme.tsx` — remove its dot background block; content already `relative z-10`.
- `src/components/projects.tsx` — remove its dot background block; content already `relative z-10`.
- `src/components/services.tsx` — remove `bg-black`; add `relative z-10` to the inner grid
  wrapper. (Header unification handled below.)
- `src/components/testimonials.tsx` — remove `bg-black`; add `relative z-10` to the main
  flex container. (Header + accent fix below.)
- `src/components/technologies.tsx` — remove `bg-black`; inner div already `relative z-10`.
  Keep the 3D globe box.
- `src/components/expriance.tsx` — remove `bg-black`; add `relative z-10` to the
  `max-w-4xl` content container; keep its local amber glow.
- `src/components/education.tsx` — remove `bg-black`; content already `relative z-10`;
  keep its emerald glow (intentional sub-theme).
- `src/components/cta.tsx` — the `<section>` has no real bg (`glass-panel-heavy` class is
  undefined in globals.css). Give the card a seated surface:
  `bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10` so it reads as a panel on
  the dot field. Keep its inner glow.
- `src/components/footer.tsx` — remove `bg-black` (keep `border-t border-white/10`) so the
  dot field shows through.

### De-duplicate inline backgrounds on standalone (portfolio) routes
- `src/app/(portfolio)/contact/page.tsx` — remove the inline dot-grid block I added
  previously (global now covers it); keep content `relative z-10`.
- `src/app/(portfolio)/not-found.tsx` — remove its inline dot-grid block (global covers it).
  (Root `src/app/not-found.tsx` stays as-is — it is outside the `(portfolio)` layout.)

## Unify section eyebrow labels (amber mono style)
Replace the plain `(SERVICES)` / `(TESTIMONIALS)` / `(TECHNOLOGIES)` / `(EXPERIENCE)` text
with the shared eyebrow used by About/Projects:
```tsx
<div className="flex items-center gap-3 mb-12 md:mb-16">
  <span className="h-px w-8 bg-[#f59e0b]/80" />
  <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase font-medium">
    Services / 03
  </span>
</div>
```
Numbering for continuity: About `01`, Work `02`, Services `03`, Testimonials `04`,
Technologies `05`, Experience `06`. `education.tsx` keeps its emerald themed eyebrow
(it is internally consistent) but receives the dot grid.

- `src/components/services.tsx` — swap the `(SERVICES)` `<p>` for the eyebrow.
- `src/components/testimonials.tsx` — swap the absolute `(TESTIMONIALS)` for the eyebrow
  (keep it positioned at top-left of the section).
- `src/components/technologies.tsx` — swap the `(TECHNOLOGIES)` `<p>` for the eyebrow.
- `src/components/expriance.tsx` — swap the `(EXPERIENCE)` `<p>` for the eyebrow.

## Fix off-theme accent
- `src/components/testimonials.tsx` — change the avatar ring
  `border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.3)]`
  to amber: `border-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.25)]`.

---

## Verification
- `npx tsc --noEmit`
- `npx next build` (confirm all routes still prerender)
- Visual: scroll the home page — dot field is continuous from hero through footer;
  section eyebrows match the mono `Name / NN` style; no red accent remains.
- No behavior/logic changes — purely visual consistency.

## Out of scope
- Education's emerald sub-theme is kept intentionally.
- Blogs/projects detail routes are already covered by the global background; no extra work.
