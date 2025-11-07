# Layout Bleeds - Astro Starter

A modern Astro starter showcasing **full-bleed split-screen layouts** with responsive images that dynamically match content height. Built with performance, accessibility, and modern CSS architecture in mind.

## Features

- **Full-Bleed Split-Screen Layouts** - Images extend to viewport edges while text content remains constrained
- **Dynamic Image Height Matching** - TypeScript-powered responsive image sizing
- **Scroll-Triggered Animations** - Using the Motion library for smooth effects
- **14 CUBE CSS Compositions** - Complete Every Layout primitive library (Box, Center, Cluster, Cover, Flow, Frame, Grid, Icon, Imposter, Reel, Sidebar, Stack, Switcher, Wrapper)
- **Comprehensive SEO** - Open Graph, Twitter Cards, and automatic sitemap generation
- **Modern Tooling** - Biome for linting, Prettier for CSS, PostCSS with OpenProps
- **Type-Safe** - Full TypeScript support with path aliases
- **Optimized Images** - Sharp integration for production-grade image processing

## Tech Stack

- **Framework**: Astro 5.15+
- **Styling**: CUBE CSS methodology with OpenProps design tokens
- **Animation**: Motion (formerly Framer Motion)
- **Images**: Sharp for optimization, AVIF format support
- **Icons**: astro-icon with Iconify integration
- **Type Checking**: TypeScript strict mode
- **Code Quality**: Biome + Prettier
- **SEO**: @astrojs/sitemap integration

## Project Structure

```text
/
├── .vscode/              # VS Code workspace settings
│   ├── settings.json     # Editor configuration
│   ├── extensions.json   # Recommended extensions
│   └── launch.json       # Debug configuration
├── public/               # Static assets
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── placeholders/  # Demo images
│   ├── components/
│   │   ├── Basehead.astro    # SEO meta tags
│   │   ├── Header.astro      # Navigation
│   │   └── Footer.astro      # Site footer
│   ├── layouts/
│   │   └── Layout.astro      # Main layout wrapper
│   ├── pages/
│   │   ├── index.astro       # Full-bleed demo
│   │   ├── two.astro         # Two-column layout
│   │   └── three.astro       # Animated split-screen
│   ├── scripts/
│   │   └── image-sizes.ts    # Dynamic image height logic
│   ├── styles/
│   │   ├── compositions/     # CUBE CSS utilities (14 total)
│   │   │   ├── box.css       # Padding & borders
│   │   │   ├── center.css    # Horizontal centering
│   │   │   ├── cluster.css   # Horizontal grouping
│   │   │   ├── cover.css     # Vertical centering
│   │   │   ├── flow.css      # Vertical rhythm
│   │   │   ├── frame.css     # Aspect ratio
│   │   │   ├── grid.css      # Responsive grids
│   │   │   ├── icon.css      # Icon sizing
│   │   │   ├── imposter.css  # Overlays
│   │   │   ├── reel.css      # Horizontal scroll
│   │   │   ├── sidebar.css   # Sidebar layouts
│   │   │   ├── stack.css     # Vertical layouts
│   │   │   ├── switcher.css  # Container queries
│   │   │   └── wrapper.css   # Max-width containers
│   │   ├── global/
│   │   │   ├── reset.scss    # Modern CSS reset
│   │   │   ├── variables.css # Design tokens
│   │   │   └── global-styles.css
│   │   └── style.css         # Main stylesheet
│   └── types/
│       └── index.ts          # TypeScript definitions
├── astro.config.mjs          # Astro configuration
├── biome.json                # Biome linter config
├── tsconfig.json             # TypeScript config
└── package.json
```

## Path Aliases

TypeScript path aliases for cleaner imports:

```typescript
import Layout from "@layouts/Layout.astro";
import { MetaData } from "@lib/index";
import image from "@images/photo.jpg";
import "@styles/style.css";

// Available aliases:
// @components/* → src/components/*
// @layouts/*    → src/layouts/*
// @assets/*     → src/assets/*
// @images/*     → src/assets/images/*
// @scripts/*    → src/scripts/*
// @styles/*     → src/styles/*
// @lib/*        → src/types/*
// @data/*       → src/data/*
```

## CSS System

### CUBE CSS Methodology

This project uses CUBE (Composition, Utility, Block, Exception) CSS for scalable styling. It includes a comprehensive set of layout primitives from [Every Layout](https://every-layout.dev/).

> **📖 See [COMPOSITIONS.md](COMPOSITIONS.md) for a complete quick reference guide with examples!**

#### Available Compositions (14 total)

**Box** - Consistent padding and border radius

```html
<div class="box">Padded content with optional border</div>
```

**Center** - Horizontally center with max-width

```html
<div class="center" style="--center-max-width: 70ch;">
	<p>Centered content</p>
</div>
<!-- Variant: Center intrinsic children -->
<div class="center" data-intrinsic="true">
	<button>Centered button</button>
</div>
```

**Cluster** - Horizontal grouping with wrapping

```html
<nav class="cluster" style="--cluster-gap: 1rem;">
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
</nav>
```

**Cover** - Vertical centering with header/footer

```html
<div class="cover" style="--cover-min-height: 100vh;">
	<header>Header</header>
	<main>Vertically centered content</main>
	<footer>Footer</footer>
</div>
```

**Flow** - Vertical rhythm and spacing

```html
<article class="flow" data-spacing="l">
	<h2>Heading</h2>
	<p>Automatic spacing between elements</p>
	<p>Consistent vertical rhythm</p>
</article>
<!-- Spacing variants: s, m, l, xl -->
```

**Frame** - Aspect ratio containers

```html
<!-- 16:9 widescreen video -->
<div class="frame" data-ratio="16:9">
	<iframe src="..." title="Video"></iframe>
</div>
<!-- Square image -->
<div class="frame" data-ratio="1:1">
	<img src="..." alt="..." />
</div>
<!-- Ratios: 1:1, 4:3, 16:9, 21:9, 9:16 -->
```

**Grid** - Responsive grid layouts

```html
<!-- Auto-fill grid -->
<div class="grid" style="--grid-min-item-size: 20rem;">
	<div>Item 1</div>
	<div>Item 2</div>
	<div>Item 3</div>
</div>
<!-- Variants: 50-50, thirds, twelfths, lg:10/2 -->
<div class="grid" data-layout="50-50">
	<div>Left 50%</div>
	<div>Right 50%</div>
</div>
```

**Imposter** - Absolute positioning/overlays

```html
<div class="imposter-container">
	<img src="background.jpg" alt="Background" />
	<div class="imposter" data-centered="true">
		<p>Overlay text</p>
	</div>
</div>
<!-- Variants: data-fixed, data-centered, data-breakout -->
```

**Reel** - Horizontal scrolling carousel

```html
<div class="reel" data-snap="true" style="--reel-item-width: 30ch;">
	<article>Card 1</article>
	<article>Card 2</article>
	<article>Card 3</article>
	<article>Card 4</article>
</div>
<!-- Variants: data-snap, data-scrollbar -->
```

**Sidebar** - Flexible sidebar layouts

```html
<div class="sidebar" style="--sidebar-width: 20rem;">
	<aside>Sidebar content</aside>
	<main>Main content (grows to fill)</main>
</div>
<!-- Right-aligned variant -->
<div class="sidebar" data-side="right">
	<main>Main content</main>
	<aside>Right sidebar</aside>
</div>
```

**Stack** - Vertical layouts with auto margins

```html
<div class="stack" style="--stack-space: 2rem;">
	<header>Header</header>
	<main>Content</main>
	<footer>Footer pushed to bottom</footer>
</div>
```

**Switcher** - Container-query responsive layout

```html
<div class="switcher" style="--switcher-threshold: 30rem;">
	<div>Switches from horizontal...</div>
	<div>...to vertical layout...</div>
	<div>...based on container width</div>
</div>
```

**Wrapper** - Content width constraint

```html
<div class="wrapper" style="--wrapper-max-width: 80ch;">
	<p>Content with max-width and auto margins</p>
</div>
```

### Design Tokens

Using OpenProps for systematic design:

```css
/* Colors (OKLCH color space) */
var(--teal-1) through var(--teal-12)
var(--lime-1) through var(--lime-12)
var(--stone-0) through var(--stone-12)

/* Spacing (fluid scales) */
var(--space-s), var(--space-m), var(--space-l)
var(--space-s-m), var(--space-l-xl)

/* Typography (fluid type scale) */
var(--step--1) through var(--step-5)
var(--font-size-fluid-0) through var(--font-size-fluid-3)
```

## Demo Pages

### 1. index.astro - Full Bleed Images

Multiple split-screen sections demonstrating:

- Image height matching text content height
- Desktop-only responsive behavior (600px+)
- Alternating image/text layouts
- Full-width image sections

### 2. two.astro - Two Column Layout

Simplified two-column split-screen with:

- Basic full-bleed implementation
- OKLCH gradient backgrounds
- Responsive image optimization

### 3. three.astro - Animated Split-Screen

Advanced implementation with:

- Scroll-triggered fade animations (left, right, up)
- Motion library integration
- Custom easing curves

## Image Optimization

The `image-sizes.ts` script provides:

- **Dynamic Height Matching**: Images resize to match adjacent text content
- **Debounced Updates**: Performance-optimized resize handling
- **Element Caching**: Efficient DOM queries
- **Responsive Behavior**: Desktop-only (600px+ breakpoint)
- **Astro Integration**: Works with View Transitions

Example usage:

```astro
<section class="full-width-split-screen">
	<div class="primary">
		<h2>Text Content</h2>
		<p>Text that determines image height...</p>
	</div>
	<Image src={photo} layout="full-width" alt="..." />
</section>

<script src="@scripts/image-sizes.ts"></script>
```

## Commands

All commands use pnpm (can substitute npm/yarn):

| Command        | Action                               |
| :------------- | :----------------------------------- |
| `pnpm install` | Install dependencies                 |
| `pnpm dev`     | Start dev server at `localhost:4321` |
| `pnpm build`   | Type-check and build for production  |
| `pnpm preview` | Preview production build locally     |
| `pnpm format`  | Format code with Prettier            |
| `pnpm lint`    | Lint code with Biome                 |
| `pnpm check`   | Run Astro type checking              |
| `pnpm test`    | Run all checks (type + lint)         |
| `pnpm clean`   | Remove build artifacts               |

## Getting Started

### Prerequisites

- **Node.js**: Version 22+ (specified in `.nvmrc`)
- **pnpm**: Version 10+ recommended

### Installation

```bash
# Clone or use this starter
pnpm install

# Start development server
pnpm dev
```

### First Steps

1. Update [astro.config.mjs](astro.config.mjs) `site` property with your domain
2. Customize [src/types/index.ts](src/types/index.ts) for your metadata structure
3. Replace placeholder images in `src/assets/images/placeholders/`
4. Update [src/components/Basehead.astro](src/components/Basehead.astro) with your social image defaults
5. Modify CSS custom properties in [src/styles/global/variables.css](src/styles/global/variables.css)

## Code Formatting

This project uses **dual formatters**:

- **Biome** (default): Fast, Rust-based linting and formatting for JavaScript/TypeScript
- **Prettier**: CSS, Astro files, and property ordering

VS Code is configured to use the appropriate formatter per file type automatically.

## SEO & Metadata

Every page uses structured metadata:

```typescript
const metaData: MetaData = {
	title: "Page Title - Site Name",
	description: "Compelling description for search engines and social media",
	image: "/images/social/page-specific.jpg", // Optional
	canonicalURL: Astro.url, // Optional override
};
```

The [Basehead.astro](src/components/Basehead.astro) component generates:

- Open Graph meta tags
- Twitter Cards
- Canonical URLs
- Automatic sitemap via `@astrojs/sitemap`

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- CSS features: Container Queries, OKLCH colors, `clamp()`, CSS Grid
- ES2020+ JavaScript features

## Resources

- [Astro Documentation](https://docs.astro.build)
- [CUBE CSS](https://cube.fyi/)
- [Every Layout](https://every-layout.dev/)
- [OpenProps](https://open-props.style/)
- [Utopia Fluid Type](https://utopia.fyi/)
- [Andy Bell's Modern CSS Reset](https://andy-bell.co.uk/a-more-modern-css-reset/)

## License

MIT
