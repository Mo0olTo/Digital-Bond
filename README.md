# Digital Bond Landing

Production-ready Angular landing page for Digital Bond. 
The app delivers a modern agency-style experience with Server-Side Rendering (SSR), zoneless change detection, and signal-driven UI state.

# Deployment-Link 
  https://digital-bond-six.vercel.app/home

------

# PageSpeed Insights - Link
  https://pagespeed.web.dev/analysis/https-digital-bond-six-vercel-app-home/q7ebgwggjb?form_factor=mobile 



  ![PageSpeed Insights Desktop](/public/pageSpeedInsights/desktop.png) 
 
  ---*---*---*---
 
  ![PageSpeed Insights Mobile](/public/pageSpeedInsights/mobile.png)

------


## 1. Project Overview

**Digital Bond Landing** is a multi-route marketing site for a digital agency brand.
 It presents services, about content, client logos, testimonials, and a contact form.

### Main functionality

- **Home (`/home`)** — Hero, services carousel, clients carousel, testimonials carousel, and a contact CTA
- **Services (`/services`)** — Full services listing
- **About (`/about`)** — Mission and vision content
- **Contact (`/contact-us`)** — Typed reactive contact form with validation
- **Done (`/done`)** — Success confirmation after form submission (routed dialog-style view)

Contact submissions go through `ContactService.submit()`, which currently simulates a successful response (RxJS `of` + `delay`) and then navigates to `/done` via the Angular Router.

---

## 2. Tech Stack

| Technology | Version / notes |
|------------|-----------------|
| **Angular** | `^20.3.0` (CLI / build `^20.3.33`) |
| **TypeScript** | `~5.9.2` (strict mode) |
| **SSR** | `@angular/ssr` `^20.3.33` + Express `^5.1.0` |
| **Styling** | Tailwind CSS v4 (`tailwindcss` / `@tailwindcss/postcss`), SCSS |
| **Forms** | Angular Reactive Forms (`@angular/forms`) |
| **Icons** | `lucide-angular` |
| **Carousel** | `embla-carousel` |
| **Phone input** | `@intl-tel-input/angular` |
| **State / reactivity** | Angular Signals (`signal`, `input`, `output`, `viewChild`) |
| **Change detection** | Zoneless (`provideZonelessChangeDetection`) |
| **Images** | `NgOptimizedImage` |
| **RxJS** | `~7.8.0` |

Standalone components only (no NgModules). 
Zone.js is **not** listed in `package.json` dependencies and is **not** imported in the app bootstrap.

---

## 3. Project Setup

### Prerequisites

- **Node.js** — No `engines` field is defined in `package.json`. 
The project uses `@types/node` `^20.17.19`, so **Node.js 20+** is the practical target.
- **npm** (comes with Node.js)

### Installation

```bash
npm install
```

### Development server

```bash
npm start
```

This runs `ng serve -o --no-hmr` and opens the app in the browser (default: `http://localhost:4200/`).



### Environment configuration

There is **no** `.env` file and **no** Angular `environment.ts` setup required for local development.

For the SSR Node server only:

- `PORT` — optional; defaults to **4000** if unset (`src/server.ts`)

---

## 4. SSR Implementation

This project uses **Angular’s modern SSR integration** with `@angular/ssr` and an Express Node server — not a custom Universal setup from scratch.

### Configuration sources

| File | Role |
|------|------|
| `angular.json` | `server: "src/main.server.ts"`, `outputMode: "server"`, `ssr.entry: "src/server.ts"` |
| `src/main.server.ts` | Server bootstrap of `App` with `app.config.server` |
| `src/app/app.config.server.ts` | Merges browser config with `provideServerRendering(withRoutes(serverRoutes))` |
| `src/app/app.routes.server.ts` | Server render modes per route |
| `src/server.ts` | Express app + `AngularNodeAppEngine` request handling |
| `src/app/app.config.ts` | Client hydration via `provideClientHydration(withEventReplay())` |

### Approach

1. **Build** produces browser + server bundles under `dist/digital-bond-landing/`.
2. **Express** (`src/server.ts`) serves static assets from the browser output (`maxAge: '1y'`) and delegates remaining requests to `AngularNodeAppEngine`.
3. **Server routes** — all routes use prerender mode:

```ts
// src/app/app.routes.server.ts
{
  path: '**',
  renderMode: RenderMode.Prerender
}
```

4. **Hydration** — enabled on the client:

```ts
// src/app/app.config.ts
provideClientHydration(withEventReplay())
```

`withEventReplay()` replays user events that occurred before hydration completes.

### Build and run SSR

```bash
npm run build
npm run serve:ssr:digital-bond-landing
```

The Express server listens on `http://localhost:4000` by default (or `process.env.PORT`).

### SSR considerations in this project

- Browser-only APIs (Embla carousel, hero intervals, scroll listeners) are gated with `isPlatformBrowser` / `afterNextRender` so SSR does not break.
- Contact submission is client-side (mock Observable); there is no server API endpoint implemented in `server.ts`.
- Static files are cached aggressively; HTML is rendered/served through the Angular SSR engine.

---

## 5. Zoneless Architecture

### Where it is configured

```ts
// src/app/app.config.ts
provideZonelessChangeDetection()
```

This is included in the shared browser config, which is also merged into the server config via `mergeApplicationConfig` in `app.config.server.ts`.

### Why it is used

Zoneless mode removes reliance on Zone.js monkey-patching for change detection. Updates are driven by Angular’s reactive primitives (signals, inputs, template bindings, and explicit mark/notify paths Angular uses with zoneless).

### How change detection works here

- There is **no** `provideZoneChangeDetection()`.
- There is **no** `zone.js` import in `src/main.ts` or `src/main.server.ts`.
- `zone.js` is **not** a direct dependency in `package.json`. Angular may still list it as an **optional peer** in the lockfile metadata; this app does not bootstrap with Zone.js.

### Signals + zoneless in practice

UI state that must refresh the view is stored in **signals** and updated explicitly:

- Navbar scroll / mobile menu → `scrolled.set(...)`, `menuOpen.update(...)`
- Carousels → Embla callbacks call `selectedIndex.set(...)`, `canScrollPrev.set(...)`, etc.
- Contact form submit state → `isSubmitting.set(true/false)`

Because Embla and DOM listeners do not know about Angular, wrapping their state in signals is what keeps the zoneless UI in sync.

---

## 6. Signals and Reactive State

Signals are the primary reactive state mechanism. There are **no** dedicated signal stores/services in this codebase.

### Actual usage in this project

| API | Used? | Examples |
|-----|-------|----------|
| `signal()` | Yes | Nav (`scrolled`, `menuOpen`), carousels (`canScrollPrev`, `selectedIndex`, …), contact (`isSubmitting`, `submitError`), hero (`activeShowcaseIndex`), form-field validity/value state |
| `input()` / `input.required()` | Yes | `FormField`, `ErrorMsg`, `SectionTitle`, `CarouselButton`, cards |
| `output()` | Yes | `CarouselButton.pressed` |
| `viewChild` / `viewChild.required` | Yes | Embla viewport refs in services/clients/testimonials carousels |
| `computed()` | **Not used** in current source |
| `effect()` | **Not used** in current source |

### Role with zoneless

Signals notify Angular when values change, which is essential without Zone.js. Third-party callbacks (Embla `select` / `reInit`) write into signals so buttons, dots, and disabled states update correctly.

Form state remains on **Reactive Forms** (`FormBuilder` + validators); signals complement that for UI flags (submitting / errors) and presentational components.

---

## 7. Project Architecture

Feature-oriented layout under `src/app/`:

| Area | Purpose |
|------|---------|
| `core/services/` | App-wide services (`ContactService`) |
| `shared/ui/` | Reusable presentational components (form field, cards, section title, carousel button, …) |
| `shared/constants/` | Static content (services, testimonials, section backgrounds, …) |
| `shared/models/` | TypeScript models/interfaces |
| `shared/layouts/` | Shell layout: `main`, `nav`, `footer` |
| `features/` | Routed feature pages: `about`, `services`, `contact-us` |
| `pages/` | `home` (section composition) and `done` (success view) |
| `styles/` | Shared font faces |

### Routing

- Lazy-loaded routes via `loadComponent` in `app.routes.ts`
- Shell layout: `Main` wraps nav + `router-outlet` + footer
- Wildcard redirects to `''`

### Patterns

- Standalone components
- `inject()` for DI
- Control flow (`@if`, `@for`, `@defer`)
- Composition of shared UI inside features/pages

---

## 8. Performance

Techniques **actually present** in this project:

| Technique | Where / how | Why it helps |
|-----------|-------------|--------------|
| **SSR + prerender** | `outputMode: "server"`, `RenderMode.Prerender` | Faster first paint / better SEO-ready HTML |
| **Hydration + event replay** | `provideClientHydration(withEventReplay())` | Reuses server DOM; reduces interaction loss pre-hydrate |
| **Zoneless CD** | `provideZonelessChangeDetection()` | Less runtime overhead than Zone.js patching |
| **Signals** | Widespread UI state | Fine-grained updates without Zone |
| **Route lazy loading** | `loadComponent` in `app.routes.ts` | Smaller initial JS |
| **`@defer (on viewport)`** | Home, about, services, contact sections | Defers below-the-fold work until near viewport |
| **`NgOptimizedImage`** | Nav, hero, clients, testimonials, about, done, … | Sized images, lazy/priority loading |
| **`priority` on LCP-critical images** | Nav logo, hero showcase first slide, section backgrounds, done backdrop | Prioritizes above-the-fold images |
| **`track` in `@for`** | Lists/carousels/nav links | Stable DOM reconciliation |
| **Local fonts + preload** | `public/fonts/...`, `index.html` preload, `font-display: swap` | Avoids render-blocking remote fonts |
| **WebP assets** | Many files under `public/images` | Smaller image payloads |
| **Static caching** | Express `maxAge: '1y'` for browser assets | Long-lived static caching in SSR serve |
| **Browser-only init** | `isPlatformBrowser` for Embla / timers | Avoids useless/broken work on server |

**Not claimed** (not found in source): `ChangeDetectionStrategy.OnPush`, `TransferState`, HTTP caching layers, or Swiper-based carousels.

---

## 9. Accessibility

Practices found in templates/components:

- **Semantic structure** — `<nav>`, `<main>`, `<section>`, `<form>`, `<label>`, headings
- **Landmarks / labelling** — `aria-label` / `aria-labelledby` on nav, sections, carousels
- **Images** — `alt` text on meaningful images; decorative images often use `alt=""` + `aria-hidden` where appropriate
- **Keyboard** — mobile menu closes on `Escape`; visible `focus-visible` outlines on interactive controls
- **Forms** — associated labels (`for` / `id`), `aria-invalid`, `aria-describedby` linked to error messages, `role="alert"` on errors
- **Carousels** — previous/next buttons with `aria-label`; slide dots use `role="tablist"` / `aria-selected`
- **Done page** — `role="dialog"`, `aria-modal="true"`, labelled/described by title and description
- **Motion** — `prefers-reduced-motion` handling in about section styles

---

## 10. Responsive Design

Responsive behavior uses **Tailwind CSS v4 utility breakpoints** plus **SCSS media queries** where needed.

### Layout system

- Max content width via CSS variable `--container-width: 1440px`
- Horizontal padding scales with `px-4` / `sm:px-6` / `md:px-8` / `lg:px-8`
- Section vertical spacing commonly uses `py-[4.5rem]`, `md:py-24`, `lg:py-[7.5rem]`

### Breakpoint usage (examples)

- **Navigation** — desktop links/socials at `lg:`; hamburger + mobile panel below `lg`
- **Grids** — services `sm:grid-cols-2` / `lg:grid-cols-3`; about `md:grid-cols-2`
- **Carousels** — slide basis changes (`basis-full` → `sm:basis-1/2` → `lg:basis-1/3`)
- **Typography / CTA** — fluid type scales with `sm:` / `md:` / `lg:` / `xl:`

Brand tokens (colors, radii, shadows, transitions) live in CSS variables in `src/styles.scss` and are referenced from Tailwind utility classes.

---

## 11. Development Notes

- **Strict TypeScript / templates** — `strict`, `strictTemplates`, and related flags are enabled in `tsconfig.json`.
- **Zoneless + third parties** — always push Embla (and similar) state into signals; do not rely on Zone to pick up DOM library events.
- **Contact backend** — `ContactService` is a stub (`delay(800)` then success). Replace with a real API when available; keep the component calling `ContactService.submit()`.
- **Phone field** — uses `@intl-tel-input/angular`; flag assets are copied from `node_modules/intl-tel-input/dist/img` into the build via `angular.json` assets.
- **Placeholder / unfinished UI** — `CounterCard` still contains scaffold placeholder markup and is not wired into pages.
- **Dev server flags** — `npm start` disables HMR (`--no-hmr`) and auto-opens the browser (`-o`).

---

## 12. Folder Structure

```text
digital-bond-landing/
├── public/                      # Static assets (images, fonts)
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── services/        # ContactService
│   │   ├── features/
│   │   │   ├── about/
│   │   │   ├── contact-us/
│   │   │   └── services/
│   │   ├── pages/
│   │   │   ├── home/            # Home + section components
│   │   │   └── done/
│   │   ├── shared/
│   │   │   ├── constants/
│   │   │   ├── layouts/         # main, nav, footer
│   │   │   ├── models/
│   │   │   └── ui/              # Reusable UI components
│   │   ├── styles/              # Font faces
│   │   ├── app.config.ts
│   │   ├── app.config.server.ts
│   │   ├── app.routes.ts
│   │   └── app.routes.server.ts
│   ├── main.ts
│   ├── main.server.ts
│   ├── server.ts                # Express + AngularNodeAppEngine
│   ├── index.html
│   └── styles.scss              # Tailwind + design tokens
├── angular.json
├── package.json
└── README.md
```

---

## Quick start

```bash
npm install
npm start
```

SSR production:

```bash
npm run build
npm run serve:ssr:digital-bond-landing
```
