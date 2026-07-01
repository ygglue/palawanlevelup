# Palawan Level Up Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, warm-editorial-minimal portfolio site for Palawan Level Up (a Go High Level landing page & automation agency), deployed to GitHub Pages.

**Architecture:** Astro static site with Tailwind CSS. Content is data-driven via `src/data/content.ts`. Single `index.astro` composes section components. Vanilla CSS transitions + one `IntersectionObserver` utility for motion. Embedded Go High Level form in the Contact section.

**Tech Stack:** Astro, Tailwind CSS, TypeScript, Instrument Serif + Inter (Fontsource), GitHub Pages (static deploy via GitHub Action)

## Global Constraints

- Team name: **Palawan Level Up** (use this everywhere branding appears)
- Repo name: `palawanlevelup` → Astro `base: '/palawanlevelup'`
- Background: warm cream (~`#F5F1EA`)
- Text: near-black (`#1A1A1A`)
- Display font: Instrument Serif; Body/UI font: Inter
- No animation libraries — CSS transitions + IntersectionObserver only
- All content is placeholder data in `src/data/content.ts`
- Static output only (no backend, no SSR)
- Lighthouse ≥ 90 (performance, accessibility, SEO)
- `prefers-reduced-motion` must disable all motion

---

### Task 1: Project Scaffold & Tooling

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`
- Create: `src/pages/index.astro` (shell only)
- Create: `.gitignore`
- Create: `README.md`

**Interfaces:**
- Produces: a runnable Astro dev server at `localhost:4321/palawanlevelup/` showing a blank cream page

- [ ] **Step 1: Initialize Astro project with Tailwind**

Run:
```bash
npm create astro@latest palawanlevelup -- --template minimal --no-install --no-git --typescript strict
```
Then from inside the project:
```bash
npx astro add tailwind --yes
```

- [ ] **Step 2: Configure astro.config.mjs for GitHub Pages**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/palawanlevelup',
  output: 'static',
});
```

- [ ] **Step 3: Set up global styles with cream background and base type**

`src/styles/global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: #F5F1EA;
    color: #1A1A1A;
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.7;
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    * { animation: none !important; transition: none !important; }
  }
}
```

- [ ] **Step 4: Create Layout.astro shell with font imports and SEO meta**

`src/layouts/Layout.astro`:
```astro
---
import '../styles/global.css';
import '@fontsource/instrument-serif';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 5: Create minimal index.astro**

`src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Palawan Level Up — Landing Pages & Automations" description="Palawan Level Up builds Go High Level landing pages and automations that convert.">
  <main>
    <h1 style="font-family: 'Instrument Serif', serif; font-size: clamp(3rem, 8vw, 7rem);">Palawan Level Up</h1>
  </main>
</Layout>
```

- [ ] **Step 6: Install Fontsource packages**

```bash
npm install @fontsource/instrument-serif @fontsource/inter
```

- [ ] **Step 7: Verify dev server runs**

Run: `npm run dev`
Expected: Server starts, `localhost:4321/palawanlevelup/` shows cream page with serif heading.

- [ ] **Step 8: Init git and commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Astro + Tailwind project"
```

---

### Task 2: Tailwind Theme & Design Tokens

**Files:**
- Modify: `tailwind.config.mjs`
- Create: `src/config.ts`

**Interfaces:**
- Produces: `theme` tokens (colors, fonts) usable via Tailwind classes across all components; `SITE_CONFIG` object

- [ ] **Step 1: Configure Tailwind theme tokens**

`tailwind.config.mjs`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1EA',
        ink: '#1A1A1A',
        muted: '#6B6258',
        line: '#E2DBD0',
        card: '#FBF8F3',
        accent: '#3E5C4A',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Create site config**

`src/config.ts`:
```typescript
export const SITE_CONFIG = {
  name: 'Palawan Level Up',
  tagline: 'Landing pages & automations that convert',
  description: 'Palawan Level Up builds Go High Level landing pages and automations that help businesses grow.',
  GHL_FORM_EMBED_URL: 'https://placeholder.ghl-form.example.com',
  socials: {
    email: 'hello@palawanlevelup.com',
    instagram: 'https://instagram.com/palawanlevelup',
    linkedin: 'https://linkedin.com/company/palawanlevelup',
  },
} as const;
```

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: Build completes, no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add theme tokens and site config"
```

---

### Task 3: Content Data Layer

**Files:**
- Create: `src/data/content.ts`

**Interfaces:**
- Produces: typed arrays `services`, `caseStudies`, `processSteps`, `stats`, `testimonials`

- [ ] **Step 1: Define types and placeholder data**

`src/data/content.ts`:
```typescript
export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  client: string;
  date: string;
  services: string[];
  result: string;
  screenshot: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const services: Service[] = [
  { icon: '◐', title: 'Landing Page Design', description: 'High-converting Go High Level landing pages built to turn visitors into booked calls.' },
  { icon: '◑', title: 'Automation Builds', description: 'Workflows, email sequences, and SMS automations that nurture leads on autopilot.' },
  { icon: '◒', title: 'CRM & GHL Setup', description: 'Full Go High Level account configuration, pipelines, and integrations tailored to your business.' },
  { icon: '◓', title: 'Audit & Strategy', description: 'A deep audit of your current funnel with a clear roadmap to improve conversions.' },
];

export const caseStudies: CaseStudy[] = [
  { client: 'Acme Dental', date: '2026-01', services: ['Landing Page', 'Automation'], result: '+38% booked appointments', screenshot: '/placeholders/case-1.svg' },
  { client: 'Brightside Realty', date: '2025-11', services: ['GHL Setup', 'Automation'], result: '2.4x lead response speed', screenshot: '/placeholders/case-2.svg' },
  { client: 'Coastline Fitness', date: '2025-09', services: ['Landing Page', 'Strategy'], result: '+52% trial signups', screenshot: '/placeholders/case-3.svg' },
];

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Discover', description: 'We learn your business, goals, and current funnel gaps.' },
  { number: '02', title: 'Build', description: 'We design and build your landing pages inside Go High Level.' },
  { number: '03', title: 'Automate', description: 'We wire up follow-up sequences and CRM automations.' },
  { number: '04', title: 'Optimize', description: 'We audit results and refine for higher conversions.' },
];

export const stats: Stat[] = [
  { value: '20+', label: 'Clients served' },
  { value: '50+', label: 'Automations built' },
  { value: '3x', label: 'Avg. lead response speed' },
];

export const testimonials: Testimonial[] = [
  { quote: 'Palawan Level Up rebuilt our booking funnel and our calendar filled up within two weeks.', author: 'Dr. M. Reyes', role: 'Acme Dental' },
  { quote: 'Their automations saved us hours every week. Leads get followed up instantly now.', author: 'J. Santos', role: 'Brightside Realty' },
];
```

- [ ] **Step 2: Create placeholder images directory and SVGs**

```bash
mkdir -p public/placeholders
```

Create `public/placeholders/case-1.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#E2DBD0"/>
  <text x="400" y="250" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#6B6258">Case Study 1</text>
</svg>
```

Create `case-2.svg` and `case-3.svg` similarly (change only the text labels).

- [ ] **Step 3: Verify build succeeds with data import**

In `index.astro`, add a temporary import:
```astro
import { services } from '../data/content';
```
Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Remove temp debug, commit**

```bash
git add -A
git commit -m "feat: add content data layer with placeholder data"
```

---

### Task 4: Nav Component (Sticky, Scroll-Spy, Mobile)

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `SITE_CONFIG.name` from `src/config.ts`
- Produces: `<Nav />` component with anchors `#services`, `#work`, `#process`, `#about`, `#contact`

- [ ] **Step 1: Write Nav component**

`src/components/Nav.astro`:
```astro
---
import { SITE_CONFIG } from '../config';
const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];
---
<header id="nav" class="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-line transition-transform duration-300">
  <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="#top" class="font-serif text-2xl">{SITE_CONFIG.name}</a>
    <ul class="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <li><a href={link.href} data-navlink class="text-sm hover:text-accent transition-colors spy-link">{link.label}</a></li>
      ))}
      <li><a href="#contact" class="text-sm bg-ink text-cream px-5 py-2.5 rounded-full hover:bg-accent transition-colors">Let's talk</a></li>
    </ul>
    <button id="menu-toggle" class="md:hidden text-ink" aria-label="Toggle menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </nav>
  <div id="mobile-menu" class="hidden md:hidden border-t border-line">
    <ul class="px-6 py-4 space-y-3">
      {links.map((link) => (
        <li><a href={link.href} class="block text-sm py-2 mobile-link">{link.label}</a></li>
      ))}
      <li><a href="#contact" class="block text-sm bg-ink text-cream px-5 py-2.5 rounded-full text-center mobile-link">Let's talk</a></li>
    </ul>
  </div>
</header>
<script>
  const header = document.getElementById('nav');
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 100) {
      header?.style.setProperty('transform', 'translateY(-100%)');
    } else {
      header?.style.setProperty('transform', 'translateY(0)');
    }
    lastScroll = current;
  });
  toggle?.addEventListener('click', () => menu?.classList.toggle('hidden'));
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => menu?.classList.add('hidden'));
  });
  const sections = document.querySelectorAll('section[id]');
  const spyLinks = document.querySelectorAll('.spy-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        spyLinks.forEach((link) => {
          link.classList.toggle('text-accent', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((section) => observer.observe(section));
</script>
```

- [ ] **Step 2: Add Nav to index.astro, wrap content in section anchors**

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected: Sticky nav, hides on scroll down, reveals up, mobile menu toggles.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add sticky nav with scroll-spy and mobile menu"
```

---

### Task 5: Hero Section

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `SITE_CONFIG` from `src/config.ts`

- [ ] **Step 1: Write Hero component**

`src/components/Hero.astro`:
```astro
---
import { SITE_CONFIG } from '../config';
---
<section id="top" class="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 pt-32 pb-20">
  <h1 class="font-serif font-normal leading-[1.05]" style="font-size: clamp(3rem, 8vw, 7rem);">
    Landing pages &amp; automations<br />that convert.
  </h1>
  <p class="mt-8 max-w-xl text-lg text-muted">
    {SITE_CONFIG.name} builds Go High Level landing pages and automation flows that help businesses turn visitors into booked clients.
  </p>
  <div class="mt-10 flex flex-wrap gap-4">
    <a href="#work" class="bg-ink text-cream px-6 py-3 rounded-full text-sm hover:bg-accent transition-colors">See our work</a>
    <a href="#contact" class="border border-ink px-6 py-3 rounded-full text-sm hover:bg-ink hover:text-cream transition-colors">Get in touch</a>
  </div>
  <div class="mt-20">
    <div class="flex flex-wrap gap-3 text-xs uppercase tracking-widest text-muted">
      <span>Landing Pages</span><span>·</span>
      <span>Automations</span><span>·</span>
      <span>CRM &amp; GHL Setup</span><span>·</span>
      <span>Audit &amp; Strategy</span>
    </div>
  </div>
  <a href="#services" class="hidden md:flex mt-24 mx-auto w-12 h-12 rounded-full border border-line items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors" aria-label="Scroll down">
    ↓
  </a>
</section>
```

- [ ] **Step 2: Add to index.astro**

- [ ] **Step 3: Verify render**

Run: `npm run dev`
Expected: Large serif headline, cream bg, two CTAs, category strip, scroll arrow.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add hero section"
```

---

### Task 6: Services Section

**Files:**
- Create: `src/components/Services.astro`
- Create: `src/components/ServiceCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `services` array from `src/data/content.ts`

- [ ] **Step 1: Write ServiceCard component**

`src/components/ServiceCard.astro`:
```astro
---
import type { Service } from '../data/content';
interface Props { service: Service }
const { service } = Astro.props;
---
<article class="group p-8 rounded-2xl bg-card border border-line transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
  <div class="text-3xl text-accent mb-4">{service.icon}</div>
  <h3 class="font-serif text-2xl mb-3">{service.title}</h3>
  <p class="text-sm text-muted leading-relaxed">{service.description}</p>
</article>
```

- [ ] **Step 2: Write Services section**

`src/components/Services.astro`:
```astro
---
import { services } from '../data/content';
import ServiceCard from './ServiceCard.astro';
---
<section id="services" class="max-w-6xl mx-auto px-6 py-24 md:py-32">
  <div class="mb-16">
    <span class="text-xs uppercase tracking-widest text-muted">What we do</span>
    <h2 class="font-serif mt-3" style="font-size: clamp(2rem, 4vw, 3.5rem);">Services</h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {services.map((service) => <ServiceCard service={service} />)}
  </div>
</section>
```

- [ ] **Step 3: Add to index.astro and verify**

Run: `npm run dev`
Expected: 4 service cards in a 2-col grid, hover lifts them.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add services section with cards"
```

---

### Task 7: Work / Case Studies Section

**Files:**
- Create: `src/components/Work.astro`
- Create: `src/components/CaseStudyCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `caseStudies` array from `src/data/content.ts`

- [ ] **Step 1: Write CaseStudyCard component**

`src/components/CaseStudyCard.astro`:
```astro
---
import type { CaseStudy } from '../data/content';
interface Props { study: CaseStudy }
const { study } = Astro.props;
---
<article class="group cursor-pointer">
  <div class="aspect-[8/5] rounded-2xl overflow-hidden border border-line bg-card">
    <img src={study.screenshot} alt={`${study.client} case study`} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
  </div>
  <div class="mt-6">
    <div class="flex flex-wrap gap-x-3 text-xs uppercase tracking-widest text-muted mb-3">
      <span>Client</span><span>·</span><span>{study.date}</span><span>·</span>
      {study.services.map((s, i) => (
        <>{s}{i < study.services.length - 1 && ' ·'}</>
      ))}
    </div>
    <h3 class="font-serif text-2xl group-hover:text-accent transition-colors">{study.client}</h3>
    <p class="mt-2 text-sm text-accent font-medium">{study.result}</p>
  </div>
</article>
```

- [ ] **Step 2: Write Work section**

`src/components/Work.astro`:
```astro
---
import { caseStudies } from '../data/content';
import CaseStudyCard from './CaseStudyCard.astro';
---
<section id="work" class="max-w-6xl mx-auto px-6 py-24 md:py-32">
  <div class="mb-16">
    <span class="text-xs uppercase tracking-widest text-muted">Selected work</span>
    <h2 class="font-serif mt-3" style="font-size: clamp(2rem, 4vw, 3.5rem);">Case studies</h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
    {caseStudies.map((study) => <CaseStudyCard study={study} />)}
  </div>
</section>
```

- [ ] **Step 3: Add to index.astro and verify**

Run: `npm run dev`
Expected: Case study cards with placeholder SVGs, metadata rows, hover effects.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add work/case studies section"
```

---

### Task 8: Service Strip (Horizontal Scroll)

**Files:**
- Create: `src/components/ServiceStrip.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `services` array from `src/data/content.ts`

- [ ] **Step 1: Write ServiceStrip component**

`src/components/ServiceStrip.astro`:
```astro
---
import { services } from '../data/content';
const items = [...services.map(s => s.title), 'Landing Pages', 'Automations', 'GHL Setup', 'Strategy'];
const strip = [...items, ...items];
---
<div class="border-y border-line overflow-hidden py-6 bg-card">
  <div class="flex gap-12 whitespace-nowrap animate-scroll-x">
    {strip.map((item) => (
      <span class="font-serif text-3xl text-muted flex items-center gap-12">
        {item}<span class="text-accent">·</span>
      </span>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Add scroll animation CSS to global.css**

```css
@layer utilities {
  @keyframes scroll-x {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .animate-scroll-x {
    animation: scroll-x 30s linear infinite;
  }
}
```

- [ ] **Step 3: Add to index.astro between Work and Process**

- [ ] **Step 4: Verify**

Run: `npm run dev`
Expected: Horizontal infinite-scrolling strip of service names.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add horizontal service strip"
```

---

### Task 9: Process Section

**Files:**
- Create: `src/components/Process.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `processSteps` array from `src/data/content.ts`

- [ ] **Step 1: Write Process component**

`src/components/Process.astro`:
```astro
---
import { processSteps } from '../data/content';
---
<section id="process" class="max-w-6xl mx-auto px-6 py-24 md:py-32">
  <div class="mb-16">
    <span class="text-xs uppercase tracking-widest text-muted">How we work</span>
    <h2 class="font-serif mt-3" style="font-size: clamp(2rem, 4vw, 3.5rem);">Process</h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
    {processSteps.map((step) => (
      <div>
        <div class="font-serif text-4xl text-accent mb-3">{step.number}</div>
        <h3 class="font-serif text-xl mb-2">{step.title}</h3>
        <p class="text-sm text-muted leading-relaxed">{step.description}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Add to index.astro and verify**

Run: `npm run dev`
Expected: 4 numbered steps in a row (desktop), stacked (mobile).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add process section"
```

---

### Task 10: About + Stats Section

**Files:**
- Create: `src/components/About.astro`
- Create: `src/components/Stats.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `stats` array from `src/data/content.ts`

- [ ] **Step 1: Write Stats component**

`src/components/Stats.astro`:
```astro
---
import { stats } from '../data/content';
---
<div class="grid grid-cols-3 gap-8 mt-16 max-w-2xl">
  {stats.map((stat) => (
    <div>
      <div class="font-serif text-4xl md:text-5xl">{stat.value}</div>
      <div class="text-xs uppercase tracking-widest text-muted mt-2">{stat.label}</div>
    </div>
  ))}
</div>
```

- [ ] **Step 2: Write About component**

`src/components/About.astro`:
```astro
---
import Stats from './Stats.astro';
---
<section id="about" class="max-w-6xl mx-auto px-6 py-24 md:py-32">
  <div class="max-w-3xl">
    <span class="text-xs uppercase tracking-widest text-muted">Who we are</span>
    <h2 class="font-serif mt-3" style="font-size: clamp(2rem, 4vw, 3.5rem);">About Palawan Level Up</h2>
    <p class="mt-8 text-lg leading-relaxed text-muted">
      We're a small team obsessed with helping businesses grow smarter. We build Go High Level landing pages and automations that turn busy founders into booked, nurtured, and converted clients — without the manual work.
    </p>
  </div>
  <Stats />
</section>
```

- [ ] **Step 3: Add to index.astro and verify**

Run: `npm run dev`
Expected: About paragraph + 3 stats with serif numbers.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add about and stats section"
```

---

### Task 11: Testimonials Section

**Files:**
- Create: `src/components/Testimonials.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `testimonials` array from `src/data/content.ts`

- [ ] **Step 1: Write Testimonials component**

`src/components/Testimonials.astro`:
```astro
---
import { testimonials } from '../data/content';
---
<section class="max-w-6xl mx-auto px-6 py-24 md:py-32">
  <div class="mb-16">
    <span class="text-xs uppercase tracking-widest text-muted">What clients say</span>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
    {testimonials.map((t) => (
      <blockquote class="p-8 rounded-2xl bg-card border border-line">
        <p class="font-serif text-2xl leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
        <footer class="mt-6 text-sm">
          <span class="font-medium">{t.author}</span>
          <span class="text-muted"> · {t.role}</span>
        </footer>
      </blockquote>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Add to index.astro and verify**

Run: `npm run dev`
Expected: Quote cards in cream-card style.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add testimonials section"
```

---

### Task 12: Contact Section with GHL Form

**Files:**
- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `SITE_CONFIG` from `src/config.ts`

- [ ] **Step 1: Write Contact component**

`src/components/Contact.astro`:
```astro
---
import { SITE_CONFIG } from '../config';
---
<section id="contact" class="max-w-6xl mx-auto px-6 py-24 md:py-32">
  <div class="max-w-3xl">
    <span class="text-xs uppercase tracking-widest text-muted">Get in touch</span>
    <h2 class="font-serif mt-3" style="font-size: clamp(2rem, 4vw, 3.5rem);">Let's build something.</h2>
    <p class="mt-6 text-lg text-muted">Tell us about your business and what you're trying to automate. We'll get back to you within one business day.</p>
  </div>
  <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div id="ghl-form" class="p-8 rounded-2xl bg-card border border-line min-h-[400px]">
      <div class="h-full flex items-center justify-center text-muted text-sm text-center">
        <div>
          <p class="mb-2">Go High Level form embed</p>
          <p class="text-xs">Replace GHL_FORM_EMBED_URL in src/config.ts with your real form URL.</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6 justify-center">
      <div>
        <div class="text-xs uppercase tracking-widest text-muted mb-2">Email</div>
        <a href={`mailto:${SITE_CONFIG.socials.email}`} class="font-serif text-xl hover:text-accent transition-colors">{SITE_CONFIG.socials.email}</a>
      </div>
      <div>
        <div class="text-xs uppercase tracking-widest text-muted mb-2">Socials</div>
        <div class="flex gap-6">
          <a href={SITE_CONFIG.socials.instagram} class="hover:text-accent transition-colors">Instagram</a>
          <a href={SITE_CONFIG.socials.linkedin} class="hover:text-accent transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </div>
</section>
<script is:inline>
  const formUrl = import.meta.env.PUBLIC_GHL_FORM_EMBED_URL;
  if (formUrl && !formUrl.includes('placeholder')) {
    const container = document.getElementById('ghl-form');
    if (container) {
      container.innerHTML = '';
      const iframe = document.createElement('iframe');
      iframe.src = formUrl;
      iframe.style.cssText = 'width:100%;height:100%;min-height:500px;border:none;';
      container.appendChild(iframe);
    }
  }
</script>
```

- [ ] **Step 2: Add to index.astro and verify**

Run: `npm run dev`
Expected: Contact section with placeholder form card, email + socials on the right.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add contact section with GHL form embed"
```

---

### Task 13: Footer Component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `SITE_CONFIG` from `src/config.ts`

- [ ] **Step 1: Write Footer component**

`src/components/Footer.astro`:
```astro
---
import { SITE_CONFIG } from '../config';
const year = new Date().getFullYear();
---
<footer class="border-t border-line">
  <div class="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
    <a href="#top" class="font-serif text-2xl">{SITE_CONFIG.name}</a>
    <div class="flex gap-6 text-sm text-muted">
      <a href="#services" class="hover:text-accent transition-colors">Services</a>
      <a href="#work" class="hover:text-accent transition-colors">Work</a>
      <a href="#process" class="hover:text-accent transition-colors">Process</a>
      <a href="#about" class="hover:text-accent transition-colors">About</a>
      <a href="#contact" class="hover:text-accent transition-colors">Contact</a>
    </div>
    <div class="text-xs text-muted">&copy; {year} {SITE_CONFIG.name}</div>
  </div>
</footer>
```

- [ ] **Step 2: Add to index.astro and verify**

Run: `npm run dev`
Expected: Footer with logo, nav links, copyright.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add footer"
```

---

### Task 14: Scroll-Reveal Motion Utility

**Files:**
- Create: `src/scripts/reveal.ts`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/styles/global.css`
- Modify: all section components (add `reveal` class)

**Interfaces:**
- Produces: any element with class `reveal` fades in on scroll into view

- [ ] **Step 1: Write reveal utility**

`src/scripts/reveal.ts`:
```typescript
export function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach((el) => el.classList.add('reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach((el) => observer.observe(el));
}
```

- [ ] **Step 2: Add reveal CSS to global.css**

```css
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 3: Import and init in Layout.astro**

Add before closing `</body>` in `Layout.astro`:
```astro
<script>
  import { initReveal } from '../scripts/reveal';
  initReveal();
</script>
```

- [ ] **Step 4: Add `class="reveal"` to each section**

Services, Work, Process, About, Testimonials, Contact sections.

- [ ] **Step 5: Verify**

Run: `npm run dev`
Expected: Sections fade in on scroll. With reduced-motion they appear instantly.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add scroll-reveal motion utility"
```

---

### Task 15: SEO & Sitemap

**Files:**
- Modify: `src/layouts/Layout.astro`
- Create: `public/robots.txt`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Install astro-sitemap**

```bash
npx astro add sitemap --yes
```

- [ ] **Step 2: Update astro.config.mjs with sitemap integration**

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/palawanlevelup',
  output: 'static',
  integrations: [sitemap()],
});
```

- [ ] **Step 3: Create robots.txt**

`public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://<username>.github.io/palawanlevelup/sitemap-index.xml
```

- [ ] **Step 4: Add canonical link to Layout.astro**

In `<head>`:
```html
<link rel="canonical" href={`https://<username>.github.io/palawanlevelup/`} />
```

- [ ] **Step 5: Verify build includes sitemap**

Run: `npm run build`
Expected: `dist/sitemap-index.xml` exists.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add SEO meta, sitemap, robots.txt"
```

---

### Task 16: GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Produces: Auto-deploy to GitHub Pages on push to `main`

- [ ] **Step 1: Create deploy workflow**

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify local build**

Run: `npm run build`
Expected: Build succeeds, `dist/` populated.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "ci: add GitHub Pages deploy workflow"
```

---

### Task 17: Verification & Polish

**Files:**
- Modify: all section components (minor polish if needed)

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 2: Lighthouse audit**

Run preview and run Lighthouse. Confirm Performance, Accessibility, SEO all ≥ 90.

- [ ] **Step 3: Manual responsive check**

Test at 375px, 768px, 1280px widths.

- [ ] **Step 4: Verify reduced-motion**

Test with `prefers-reduced-motion: reduce` — no animations, strip stops, no fades, nav doesn't hide.

- [ ] **Step 5: Fix any issues found and commit**

```bash
git add -A
git commit -m "chore: verification and polish pass"
```
