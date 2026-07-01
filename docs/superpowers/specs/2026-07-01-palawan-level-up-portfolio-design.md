# Palawan Level Up Portfolio Site Design Spec

**Date:** 2026-07-01
**Status:** Approved

## 1. Overview

A single-page portfolio website for **Palawan Level Up**, a team building Go High Level landing pages and automations for businesses. The site serves two equal goals: showcase past work for credibility, and generate leads via an embedded Go High Level contact form.

Greenfield project. Tech stack: **Astro + Tailwind CSS**. Deploy target: **GitHub Pages**. Static output, no backend.

## 2. Goals & Success Criteria

- **Lead generation:** Visitors can reach and submit the contact form from anywhere on the page within one click.
- **Credibility:** Case studies, services, and testimonials present Palawan Level Up as a premium automation agency.
- **Aesthetic:** Warm, editorial, minimal — restraint over flash. Strong typographic hierarchy.
- **Maintainability:** Content is data-driven; placeholders can be swapped for real assets without touching component code.
- **Performance:** Lighthouse ≥ 90 across performance, accessibility, SEO.

## 3. Tech Stack

- **Framework:** Astro (static output)
- **Styling:** Tailwind CSS
- **Typography:** Instrument Serif (display) + Inter (body/UI), loaded via Fontsource
- **Motion:** Vanilla CSS transitions + a single `IntersectionObserver` utility
- **Deploy:** GitHub Pages via GitHub Action (build → deploy to `gh-pages` branch)
- **Form:** Embedded Go High Level form widget, config-driven URL

## 4. Site Structure

Single route (`/`). Sections in order:

1. **Sticky Nav** — logo left, anchor links right (Services, Work, Process, About, Contact), persistent "Let's talk" pill button. Scroll-spy via `IntersectionObserver`. Mobile: hamburger → slide-down. Nav hides on scroll-down, reveals on scroll-up.
2. **Hero** — Large serif headline, subheadline, two CTAs. Category strip below. Circular scroll indicator.
3. **Services** — 3-4 service cards in a grid. Icon, title, description. Hover lift effect.
4. **Work / Case Studies** — 2-3 case study cards. Metadata rows (Client / Date / Services). Placeholder screenshots. Hover: lift + image zoom.
5. **Horizontal Service Strip** — Auto-scrolling strip of service names with bullet separators.
6. **Process** — 4 numbered steps horizontal flow.
7. **About + Stats** — Short paragraph + stats strip.
8. **Testimonials** — 1-2 quote cards.
9. **Contact** — Embedded GHL form widget + alternate contact methods.
10. **Footer** — Logo, nav repeat, socials, copyright.

## 5. Component Architecture

```
src/
  components/
    Nav.astro            # sticky, scroll-spy, mobile menu
    Hero.astro
    Services.astro
    ServiceCard.astro
    ServiceStrip.astro   # horizontal scroll strip
    Work.astro
    CaseStudyCard.astro
    Process.astro
    About.astro
    Stats.astro
    Testimonials.astro
    Contact.astro
    Footer.astro
  layouts/
    Layout.astro         # <html> shell, SEO, fonts
  data/
    content.ts           # typed arrays: services, caseStudies, processSteps, stats, testimonials
  scripts/
    reveal.ts            # IntersectionObserver scroll-reveal utility
  config.ts              # SITE_CONFIG: name, tagline, GHL_FORM_EMBED_URL, socials
  pages/
    index.astro          # composes all sections
  styles/
    global.css           # Tailwind + cream background + reveal CSS + scroll animation
public/
  robots.txt
  placeholders/          # placeholder SVG images for case studies
```

## 6. Design System

**Palette**
- Background: warm cream (`#F5F1EA`)
- Text: near-black (`#1A1A1A`)
- Muted text: warm gray (`#6B6258`)
- Borders: `#E2DBD0`
- Cards: `#FBF8C3`
- Accent: sage green (`#3E5C4A`) — finalize during implementation

**Typography**
- Display: Instrument Serif
- Body/UI: Inter
- Scale: Hero `clamp(3rem, 8vw, 7rem)`, section headings `clamp(2rem, 4vw, 3.5rem)`, metadata `0.875rem` uppercase tracked, body `1rem-1.125rem` line-height 1.7

## 7. Motion & Interaction

- **Load:** Hero fades + slides up 600ms
- **Scroll reveal:** Sections fade in 600ms via IntersectionObserver, fire once
- **Hover (cards):** lift 2-4px, image zoom 3%, 200ms ease-out
- **Hover (buttons):** background color shift only
- **Nav:** show/hide on scroll direction; scroll-spy active highlighting
- **Service strip:** CSS keyframe infinite horizontal scroll
- **Reduced motion:** all disabled via `prefers-reduced-motion`

## 8. Responsive

Mobile-first Tailwind. Single col < `md`, 2-col grids at `md`+. Nav hamburger < `md`. Test: 375px, 768px, 1280px.

## 9. Form Integration

- `Contact.astro` holds GHL form container div
- `GHL_FORM_EMBED_URL` in `src/config.ts` — placeholder now, real embed code swapped later
- Form styled to match minimal cream aesthetic

## 10. SEO & Meta

- Astro `<Head>`: title, description, OG tags
- `astro-sitemap` integration
- `public/robots.txt`
- Semantic HTML

## 11. Deployment

- Astro `output: 'static'`, `base: '/palawanlevelup'`
- GitHub Action: build → deploy to GitHub Pages on push to `main`

## 12. Verification

- Lighthouse ≥ 90 (performance, accessibility, SEO)
- Manual responsive check at 375/768/1280 px
- `prefers-reduced-motion` path verified
- GHL form placeholder renders

## 13. Out of Scope (v1)

- Multi-page routing / blog / CMS
- Real case study content / client logos (placeholders only)
- Custom backend / server-side form handling
- Heavy scroll-linked animation / scrolljacking
- Analytics integration
