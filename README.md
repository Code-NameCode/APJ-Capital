<div align="center">

<img src="assets/img/logo.png" alt="APJ Capital Group of Companies" width="360">

# APJ Capital Group — Corporate Website

**The public website of APJ Capital Group: private equity, investment banking and M&A advisory across San Francisco, Amman and Johannesburg.**

A dependency-free static site — hand-built HTML, a custom CSS design system and a single vanilla JavaScript module. No frameworks, no build step, no runtime dependencies.

[![HTML5](https://img.shields.io/badge/HTML5-semantic-blue?logo=html5&logoColor=white)](#technology-stack)
[![CSS3](https://img.shields.io/badge/CSS3-custom%20design%20system-1572B6?logo=css3&logoColor=white)](#design-system)
[![JavaScript](https://img.shields.io/badge/JavaScript-vanilla%20ES5-friendly-F7DF1E?logo=javascript&logoColor=black)](#javascript)
[![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](#installation-and-setup)
[![Build step](https://img.shields.io/badge/build-none-lightgrey)](#installation-and-setup)
[![Status](https://img.shields.io/badge/status-live%20site-success)](https://www.apjcapital.com)

</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Screenshots](#screenshots)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation and Setup](#installation-and-setup)
- [Project Architecture](#project-architecture)
- [Design System](#design-system)
- [Configuration and Usage](#configuration-and-usage)
- [Development Guide](#development-guide)
- [SEO and Accessibility](#seo-and-accessibility)
- [Known Limitations](#known-limitations)
- [Credits](#credits)
- [License](#license)

---

## About the Project

APJ Capital Group is a boutique mid-market private equity and investment banking firm with offices in San Francisco, Amman and Johannesburg. This repository contains the firm's public website: the primary channel through which prospective clients, partners and co-investors learn about the firm's services, sector expertise and track record — and the place where they start a conversation.

The site covers five service lines (investment banking, procurement & agency, the Southern Africa platform, operational corporate execution and market inflection point strategy), sector expertise across infrastructure, oil & gas, renewable energy, green technology and water conservation, and the firm's selected transaction experience.

**Why no framework?** The site is content-driven, changes infrequently, and must load fast and rank well for institutional audiences. A static, dependency-free build means nothing to install, nothing to update for security, and nothing between the browser and the content. All interactivity — menus, scroll reveals, animated counters, dialogs, form validation — is one small, commented vanilla JavaScript file.

**Who this is for:**

- APJ Capital, who maintain and extend the site's content and pages
- Designers and developers working on future iterations of the site
- Anyone studying a real-world, dependency-free corporate front end

---

## Screenshots

<div align="center">
  <img src="assets/new/04_global_presence-21x9.png" alt="APJ Capital global presence — San Francisco, Amman, Johannesburg" width="820">
  <p><em>Global presence: San Francisco · Amman · Johannesburg</em></p>
</div>

| | |
|---|---|
| <img src="assets/new/1-market-inflection-point-strategy-21x9.png" width="400" alt="Market inflection point strategy illustration"> | <img src="assets/new/2-operational-corporate-execution-21x9.png" width="400" alt="Operational corporate execution illustration"> |
| *Market Inflection Point Strategy* | *Operational Corporate Execution* |

> **Note:** Full-page browser screenshots of the homepage, services pages and contact form would be a welcome addition here. Until then, the site's own illustration assets are used above.

---

## Features

### Pages and Content

| Page | Purpose |
|---|---|
| `index.html` | Homepage: hero with rotating office imagery, firm statistics, three strategic pillars (with detail modals), services overview |
| `about.html` | Firm profile, approach and vision |
| `sectors.html` | Sector expertise: infrastructure, oil & gas, renewable energy, green technology, water conservation |
| `services.html` | Services overview with a pill-chip sub-navigation across the five service lines |
| `services/*.html` | Five dedicated service pages (investment banking, procurement & agency, Southern Africa platform, operational execution, inflection point strategy) |
| `experience.html` | Selected transaction experience with engagement accordions |
| `contact.html` | Validated enquiry form, direct contact details and office cards |
| `404.html` | Custom not-found page |

### Interaction Layer (`assets/js/main.js`)

A single IIFE, zero dependencies, written for progressive enhancement — every feature degrades gracefully if JavaScript is unavailable:

- **Mobile drawer navigation** — full-screen menu with `aria-expanded`/`aria-hidden` state management, Escape-to-close and body scroll locking.
- **Scroll reveal** — `IntersectionObserver`-driven reveals via `data-reveal` attributes, with a batched, capped stagger (75 ms per item, 450 ms cap) so large sections never cascade into a slow show.
- **Count-up statistics** — homepage stats animate with cubic easing on first scroll into view; respects `prefers-reduced-motion` by rendering final values immediately.
- **Pillar modals** — native `<dialog>` elements handle the top layer, focus containment and Escape; focus returns to the card that opened the dialog.
- **Engagement accordions** — accessible `aria-expanded` toggles on the experience page.
- **Services sub-nav arrows** — swipe arrows are injected only on overflow, mobile/tablet only; without JS the chip row remains touch-scrollable.
- **Contact form** — client-side required/email validation, honeypot spam trap (`website` field hidden off-screen), and a `fetch` POST of JSON to the forms backend with distinct handling for `202`, `429` and `400` responses and a mailto fallback if delivery fails.

### Performance & Robustness

- Single CSS file and single JS file — two requests beyond the page itself.
- Lazy-loaded below-the-fold imagery (`loading="lazy"`), explicit `width`/`height` on media to prevent layout shift, and preconnected font hosts.
- Every interactive element carries ARIA state; a skip-to-content link heads every page.

---

## Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | HTML5 | Semantic, hand-authored, one file per page |
| Styling | CSS3 | Custom design system in `assets/css/main.css` (~1,750 lines) with design tokens, fluid `clamp()` type scale and dark sections |
| Behaviour | Vanilla JavaScript (ES5-compatible) | `assets/js/main.js`, one IIFE, no libraries |
| Typography | Google Fonts | Fraunces (editorial serif), Inter (grotesque), IBM Plex Mono |
| Web fonts | Self-referenced via `preconnect` | `fonts.googleapis.com` / `fonts.gstatic.com` |
| Forms backend | External Node.js app (`report.goodstuffdesigns.co.za`) | JSON POST to `/v1/forms/apj-capital`, hosted via DirectAdmin |
| Structured data | JSON-LD (`schema.org/FinancialService`) | Firm name, offices, service area on every page |
| SEO | Per-page meta descriptions, Open Graph tags, `sitemap.xml`, `robots`-friendly clean URLs | |
| Icons & diagrams | Inline SVG + `svg/` assets | `world-arcs.svg`, `growth-chart.svg`, `pulse-rings.svg`, `counter-ring.svg`, `flow-route.svg`, `bar-growth.svg` |

---

## Installation and Setup

There is nothing to install or build. The site is plain static files.

### Prerequisites

- Any modern browser
- Any static file server for local development (or none at all — files can be opened directly)

### Run locally

```bash
# Option A: Python
python -m http.server 8080

# Option B: Node.js
npx serve .
```

Then open <http://localhost:8080>.

### Deploy to production

Upload the repository contents to any static host or web server (Apache, nginx, cPanel/DirectAdmin, Netlify, Pages — anything that serves files). No build artefacts are required; the source *is* the deployable. Production URLs are mapped through the server (see `sitemap.xml` for the canonical clean-URL set, e.g. `/firm`, `/expertise`, `/experience`).

---

## Project Architecture

```text
.
├── index.html                  # Homepage
├── about.html                  # Firm profile
├── sectors.html                # Sector expertise
├── services.html               # Services overview + chip sub-nav
├── services/                   # Service detail pages
│   ├── investment-banking.html
│   ├── procurement-agency.html
│   ├── southern-africa.html
│   ├── operational-execution.html
│   └── inflection-point.html
├── experience.html             # Selected experience (accordions)
├── contact.html                # Enquiry form + offices (form logic inline)
├── 404.html                    # Custom not-found page
├── sitemap.xml                 # Canonical URLs for search engines
├── assets/
│   ├── css/
│   │   └── main.css            # Entire design system (tokens → components)
│   ├── js/
│   │   └── main.js             # All site interactivity, one IIFE
│   ├── img/                    # Logo, office photography, card imagery
│   └── new/                    # Campaign illustrations (incl. 21×9 hero variants)
├── svg/                        # Decorative diagrams (world arcs, growth charts…)
└── media/                      # Source photography and brand reference material
```

**Responsibilities**

- **`assets/css/main.css`** — a token-first design system: CSS custom properties for ink/paper palette, brand colours, a fluid `clamp()` type scale and spacing rhythm, followed by component styles (masthead, drawer, hero, cards, offices, forms, footer).
- **`assets/js/main.js`** — behaviour only, never markup. Each feature is an independent, commented block wrapped in feature detection (`IntersectionObserver`, native `<dialog>`).
- **`contact.html`** — uniquely carries an inline script that wires the enquiry form to the remote forms API; this is the only page with a backend dependency.
- **`svg/`** — lightweight decorative vector art used as section backgrounds, keeping the image payload small.

**Communication model:** pages share one stylesheet and one script; there is no routing, state or data layer. The only external communication is the contact form's JSON POST to the forms service.

---

## Design System

Defined at the top of `main.css` and consumed everywhere via CSS custom properties:

```css
:root {
  --ink-900: #0b131c;   /* primary ink */
  --bone:   #f4f1ea;    /* page paper */
  --laurel: #0b1f3f;    /* brand deep blue */
  --brass:  #b8862b;    /* accent brass */

  --ff-display: "Fraunces", Georgia, serif;   /* editorial headings */
  --ff-text:    "Inter", system-ui, sans-serif; /* UI text */
  --ff-mono:    "IBM Plex Mono", ui-monospace, monospace;

  --fs-hero: clamp(2.9rem, 1.4rem + 6.2vw, 7.4rem); /* fluid type scale */
}
```

The identity is "ink / signal blue / brass" — an editorial serif paired with a technical grotesque, bone-paper backgrounds alternating with dark ink sections, and hairline rules throughout. All type sizes and gutters scale fluidly with the viewport via `clamp()`, so there is a single responsive system rather than breakpoint-specific overrides.

> Brand note: the APJ logo accent green is `#027252`; `assets/img/logo.png` (shared with `media/logo.png`) is the current approved mark used in the masthead and footer of every page.

---

## Configuration and Usage

### Contact form endpoint

The enquiry form target is configured in an inline script at the bottom of `contact.html`:

```js
var FORM_ENDPOINT = 'https://report.goodstuffdesigns.co.za/v1/forms/apj-capital';
var FALLBACK_EMAIL = 'albert@apjcapital.com';
```

To point the form at a different backend, change `FORM_ENDPOINT`. The expected contract is:

- `POST` with `Content-Type: application/json`
- Body: `{ "fields": { name, company, email, phone, country, subject, message }, "honeypot": "<hidden field>" }`
- `202` → success · `429` → rate limited · `400` → rejected input · anything else → mailto fallback message

There are no environment variables, API keys or client-side secrets anywhere in this project.

### Content edits

All copy lives directly in the HTML files — edit, save, deploy. Footer copyright year updates itself via the `[data-year]` hook in `main.js`. When adding a page, mirror the existing head pattern: title, meta description, Open Graph tags, favicon links, font preloads, stylesheet, and the JSON-LD `FinancialService` block — then add the URL to `sitemap.xml`.

---

## Development Guide

### Workflow

1. Serve the folder locally (`python -m http.server 8080` or `npx serve .`).
2. Edit the relevant HTML, or `assets/css/main.css` / `assets/js/main.js`.
3. Hard-refresh and verify at mobile and desktop widths.
4. Deploy the files as-is.

### Conventions

- **JavaScript:** ES5-compatible, single IIFE, strict mode, feature-detected, heavily commented. Progressively enhanced — the site must remain fully readable with JS disabled.
- **CSS:** design tokens first; component styles follow; fluid values via `clamp()`; avoid breakpoint explosions where a fluid value suffices.
- **HTML:** semantic landmarks (`header`, `nav`, `main`, `footer`), ARIA state on all interactive elements, `alt` text on every meaningful image.
- **Accessibility:** respect `prefers-reduced-motion` for any animation; keep the skip link first in the DOM.

### Testing

There is no automated test suite (appropriate for a dependency-free static site). Manual checks before any deploy:

- Every internal link and image path resolves
- Mobile drawer opens, closes on selection and on Escape
- Contact form validates, honeypot present, success/error statuses display
- Reveal animations and counters fire once, and render instantly with reduced-motion enabled
- Lighthouse pass on the homepage (performance, accessibility, SEO)

### Troubleshooting

| Symptom | Likely cause |
|---|---|
| Contact form always falls back to "email us directly" | Forms backend unreachable or endpoint changed — check `FORM_ENDPOINT` and the service's availability |
| Form rejects a valid-looking submission | The honeypot field was autofilled; check hidden `website` input handling |
| Modals render inline instead of overlaying | Browser lacks native `<dialog>`; the graceful-degradation path is showing the panel in normal flow |
| No reveal/counter animation | `IntersectionObserver` unsupported — content is shown immediately by design |
| Chips sub-nav has no arrows | Arrows only appear when the list overflows; widen the viewport or accept touch scrolling |

---

## SEO and Accessibility

- **Structured data:** JSON-LD `FinancialService` schema on every page, including all three office addresses and served countries.
- **Sitemap:** `sitemap.xml` enumerates canonical URLs with clean paths (`/firm`, `/expertise`, `/services`, `/experience`, `/contact`).
- **Social:** Open Graph title/description tags on every page.
- **Accessibility:** skip link, ARIA-labelled navigation and dialogs, keyboard-operable accordions and menus, focus restoration after modal close, `prefers-reduced-motion` support, visible focus styles and high-contrast ink/paper palette.

---

## Known Limitations

- **No build pipeline or bundling** — intentional; images could be further optimised (e.g. AVIF/WebP variants, responsive `srcset`) as a future improvement.
- **No automated tests or CI** — the site is verified manually per the checklist above.
- **Forms backend is external** — the contact form depends on the availability of `report.goodstuffdesigns.co.za`; the mailto fallback is the safety net.
- **Media folder carries duplicates** — several files exist in both `assets/img/` and `media/` (historical); only the `assets/` copies are referenced by pages.

---

## Credits

- **Site design & development:** [Goodstuff Designs](https://goodstuffdesigns.co.za/)
- **Content & firm:** APJ Capital Group of Companies
- **Typography:** [Fraunces](https://fonts.google.com/specimen/Fraunces), [Inter](https://fonts.google.com/specimen/Inter), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts

**Contact:** [albert@apjcapital.com](mailto:albert@apjcapital.com) · [www.apjcapital.com](https://www.apjcapital.com)

---

## License

© APJ Capital Group of Companies. All rights reserved. The firm's name, logo, brand assets and written content are proprietary and may not be reproduced without permission. Code in this repository was produced for APJ Capital by Goodstuff Designs — please contact the firm before reusing it.
