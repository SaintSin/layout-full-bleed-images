# CUBE CSS Compositions - Quick Reference

This starter includes 14 composition utilities from [Every Layout](https://every-layout.dev/). All compositions use CSS custom properties for configuration.

## At a Glance

| Composition  | Purpose                             | Key Custom Properties                             |
| ------------ | ----------------------------------- | ------------------------------------------------- |
| **Box**      | Padding & borders                   | `--box-padding`, `--box-border-width`             |
| **Center**   | Horizontal centering                | `--center-max-width`, `--center-padding`          |
| **Cluster**  | Horizontal wrapping groups          | `--cluster-gap`, `--cluster-justify`              |
| **Cover**    | Vertical centering w/ header/footer | `--cover-min-height`, `--cover-gap`               |
| **Flow**     | Vertical rhythm                     | `--flow-space`                                    |
| **Frame**    | Aspect ratio containers             | `--frame-ratio`                                   |
| **Grid**     | Responsive grids                    | `--grid-min-item-size`, `--gutter`                |
| **Icon**     | Icon sizing                         | `--icon-size`                                     |
| **Imposter** | Overlays & modals                   | `--imposter-margin`, `--imposter-z-index`         |
| **Reel**     | Horizontal scrolling                | `--reel-gap`, `--reel-item-width`                 |
| **Sidebar**  | Flexible sidebar layouts            | `--sidebar-width`, `--sidebar-threshold`          |
| **Stack**    | Vertical layouts                    | `--stack-space`                                   |
| **Switcher** | Container-responsive layout         | `--switcher-threshold`, `--switcher-limit`        |
| **Wrapper**  | Max-width containers                | `--wrapper-max-width`, `--wrapper-padding-inline` |

## Quick Examples

### Basic Page Layout

```html
<div class="wrapper">
  <article class="flow" data-spacing="m">
    <h1>Page Title</h1>
    <p>Content with automatic spacing</p>
  </article>
</div>
```

### Two-Column Layout

```html
<div class="wrapper">
  <div class="sidebar" style="--sidebar-width: 250px;">
    <aside>Navigation</aside>
    <main class="flow">Main content</main>
  </div>
</div>
```

### Card Grid

```html
<div class="wrapper">
  <div class="grid" style="--grid-min-item-size: 300px;">
    <article class="box">Card 1</article>
    <article class="box">Card 2</article>
    <article class="box">Card 3</article>
  </div>
</div>
```

### Hero Section

```html
<section class="cover" style="--cover-min-height: 80vh;">
  <header>
    <img src="logo.svg" alt="Logo" />
  </header>
  <div class="center flow">
    <h1>Welcome</h1>
    <p>Hero description text</p>
  </div>
  <footer>Scroll down</footer>
</section>
```

### Horizontal Scrolling Gallery

```html
<div class="wrapper">
  <div class="reel" data-snap="true" style="--reel-item-width: 400px;">
    <div class="frame" data-ratio="4:3">
      <img src="photo1.jpg" alt="Gallery item 1" />
    </div>
    <div class="frame" data-ratio="4:3">
      <img src="photo2.jpg" alt="Gallery item 2" />
    </div>
    <div class="frame" data-ratio="4:3">
      <img src="photo3.jpg" alt="Gallery item 3" />
    </div>
  </div>
</div>
```

### Modal Overlay

```html
<div class="imposter-container">
  <main>Page content</main>
  <div class="imposter" data-centered="true" data-fixed="true">
    <div class="box center">
      <h2>Modal Title</h2>
      <p>Modal content</p>
    </div>
  </div>
</div>
```

### Responsive Navigation

```html
<nav class="wrapper">
  <div
    class="cluster"
    style="--cluster-gap: 2rem; --cluster-justify: space-between;"
  >
    <a href="/" class="logo">Logo</a>
    <div class="cluster">
      <a href="/about">About</a>
      <a href="/work">Work</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
</nav>
```

### Video Embed

```html
<div class="wrapper">
  <div class="frame" data-ratio="16:9">
    <iframe
      src="https://www.youtube.com/embed/..."
      title="Video title"
      allowfullscreen
    >
    </iframe>
  </div>
</div>
```

### Flexible Grid That Switches Layout

```html
<div class="switcher" style="--switcher-threshold: 500px;">
  <div>Horizontal on wide containers</div>
  <div>Vertical on narrow containers</div>
  <div>No media queries needed!</div>
</div>
```

## Combining Compositions

Compositions are designed to be **composed** together:

```html
<!-- Article layout with sidebar -->
<div class="wrapper">
  <div class="sidebar">
    <!-- Sidebar with stacked navigation -->
    <aside class="stack">
      <nav>Navigation</nav>
      <div>Ads</div>
    </aside>

    <!-- Main content with flow -->
    <article class="flow" data-spacing="l">
      <h1>Article Title</h1>

      <!-- Images in frames -->
      <div class="frame" data-ratio="16:9">
        <img src="hero.jpg" alt="Hero" />
      </div>

      <!-- Centered content -->
      <div class="center">
        <p>Narrower reading width</p>
      </div>

      <!-- Horizontal tags -->
      <div class="cluster">
        <span class="tag">CSS</span>
        <span class="tag">Design</span>
        <span class="tag">Web</span>
      </div>
    </article>
  </div>
</div>
```

## Tips

1. **Start with structural compositions**: Wrapper, Center, Stack, Flow
2. **Add responsive layouts**: Grid, Sidebar, Switcher
3. **Fine-tune spacing**: Use custom properties inline or via utility classes
4. **Nest thoughtfully**: Flow inside Center inside Wrapper is common
5. **Avoid overuse**: Not every `<div>` needs a composition class

## Custom Property Patterns

All compositions follow consistent naming:

- `--composition-property: value`
- Example: `--sidebar-width: 20rem`, `--flow-space: 2em`

Set properties inline or in your CSS:

```css
/* Inline */
<div class="sidebar" style="--sidebar-width: 300px;">

/* In CSS */
.my-sidebar {
  --sidebar-width: 300px;
  --sidebar-gap: 2rem;
}
```

## Learn More

- [Every Layout](https://every-layout.dev/) - Comprehensive guides
- [CUBE CSS](https://cube.fyi/) - The methodology
- [Composition files](src/styles/compositions/) - View source code
