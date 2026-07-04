---
name: salla-theme-builder
description: "Convert UI designs (screenshots, descriptions, Figma exports) into complete Salla e-commerce themes using Twilight Web Components, SASS/CSS, Salla JS SDK, Twig templates, and Tailwind integration. RTL-first Arabic support. Use when the user wants to create, customize, or build a Salla store theme from a UI design image or description."
license: MIT
metadata:
  author: Salla Developer
  version: "1.0.0"
---

# Salla Theme Builder Skill

## Overview

This skill converts UI designs — screenshots, text descriptions, Figma exports, or sketches — into **complete, production-ready Salla e-commerce themes**. Every output defaults to **RTL-first Arabic layout** and covers all five areas of the Salla ecosystem:

1. **Twilight Web Components** — `<salla-button>`, `<salla-product-card>`, etc.
2. **CSS Class System** — `.s-button`, `.s-product-options`, `.s-select-*`, SASS + Tailwind
3. **Salla JS SDK** — `salla.cart`, `salla.product`, `salla.event`, `salla.wishlist`, `salla.notify`
4. **Twig Templates** — `{% component %}`, `{% hook %}`, `{{ theme.settings }}`, `{{ theme.color }}`
5. **Tailwind Integration** — Custom config with Salla tokens (`--color-primary`, `--font-main`)

The generated theme is ready for `salla theme preview` and `salla theme publish`.

---

## Input Types

| Input | Description |
|---|---|
| **Screenshot/Image** | A UI mockup or screenshot of an e-commerce page |
| **Text Description** | A written description of the desired layout and components |
| **Figma Export** | Design data from a Figma file |
| **Sketch** | A rough layout sketch or wireframe |

---

## Workflow

When converting a UI design to a Salla theme, follow this step-by-step process:

### 1. Analyze
Examine the UI input and identify:
- Page sections (header, hero, product grid, footer, etc.)
- Interactive elements (buttons, filters, modals, sliders)
- Data-driven components (product cards, cart, wishlist)
- Layout patterns (grid, flex, slider, tabs)

### 2. Map
For each identified section/element, map to the corresponding Salla construct:
- UI elements → `<salla-*>` web components
- Styling patterns → `.s-*` CSS classes + Tailwind utilities
- Interactions → `salla.event.*` and SDK methods
- Page structure → Twig templates with `{% hook %}` and `{% block %}`

### 3. Scaffold
```bash
salla theme create
cd my-theme
pnpm install
```

### 4. Build Twig Templates
- Create `master.twig` with full HTML structure, hooks, and asset pipeline
- Create page templates (`home.twig`, `product.twig`, etc.) extending the master layout
- Use `{% component %}` for header/footer/reusable sections
- Use `{% hook %}` for extension points

### 5. Style (RTL-first)
- Use `.s-*` SASS classes for Salla component overrides
- Use Tailwind utilities with logical properties (`ms-*`, `me-*`, `start-*`, `end-*`)
- Use CSS custom properties from `twilight.json` settings
- **NEVER use `left`/`right`** — always use `inline-start`/`inline-end`

### 6. Wire JavaScript
- Extend `AppHelpers` class pattern
- Use `salla.event.*` for inter-component communication
- Use `salla.cart.*`, `salla.product.*`, `salla.wishlist.*` for data operations
- Register events in `registerEvents()` method

### 7. Configure twilight.json
- Define theme name (ar/en), settings, and features
- Register custom components with fields and paths
- Set default colors, fonts, and layout options

### 8. Test
```bash
salla theme preview
```
- Verify RTL layout renders correctly
- Test both Arabic and English
- Verify all Salla components load and function
- Test cart, wishlist, and product interactions

### 9. Publish
```bash
salla theme validate
salla theme publish
```

---

## Mandatory RTL-first Rules

These rules are **non-negotiable** for every theme this skill produces:

1. **Arabic is the primary language** — RTL is the default direction
2. **`<html lang="ar" dir="rtl">`** — Always set this in master.twig
3. **Logical CSS properties ONLY** — Never use `left`/`right`, always `inline-start`/`inline-end`
4. **Arabic-first fonts** — Use `IBM Plex Sans Arabic` or Salla's default Arabic font
5. **Mirror directional icons** — Chevrons, arrows, and directional icons must flip in RTL
6. **Logical spacing** — All `margin`, `padding`, `border`, `inset` use logical equivalents
7. **Tailwind RTL variants** — Use `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`
8. **Bidirectional locale files** — Always include both `ar.json` and `en.json`
9. **Test both directions** — Verify in both `dir="rtl"` and `dir="ltr"`

---

## Reference Files

| File | Coverage |
|---|---|
| `references/salla-components-reference.md` | All `<salla-*>` web components: properties, slots, events, CSS classes, usage examples |
| `references/salla-css-classes-reference.md` | Complete `.s-*` class system, SASS structure, CSS variables, Tailwind config, RTL patterns |
| `references/salla-js-sdk-reference.md` | Salla JS SDK: initialization, events, cart, product, wishlist, notify, helpers, class patterns |
| `references/salla-twig-templates-reference.md` | Twig template syntax: variables, filters, components, hooks, blocks, page templates, twilight.json |
| `references/salla-theme-workflow.md` | CLI commands, theme structure, build pipeline, publishing, debugging, best practices |
| `references/rtl-arabic-patterns.md` | RTL-first patterns: logical properties, Tailwind RTL classes, Arabic typography, icon mirroring, testing |

---

## Salla Theme File Structure

```
my-salla-theme/
├── twilight.json          # Theme manifest (name, settings, components)
├── tailwind.config.js     # Tailwind + Salla tokens
├── webpack.mix.js         # Asset compilation
├── package.json           # Dependencies
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── app.scss   # Main stylesheet (imports + SASS + Tailwind)
│   │   ├── js/
│   │   │   └── app.js     # Main JS (extends AppHelpers)
│   │   └── images/
│   ├── views/
│   │   ├── layouts/
│   │   │   └── master.twig # Master layout with hooks & assets
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── home/      # Homepage component partials
│   │   ├── pages/
│   │   │   ├── home.twig
│   │   │   ├── product.twig
│   │   │   ├── products.twig
│   │   │   ├── cart.twig
│   │   │   ├── brands.twig
│   │   │   ├── categories.twig
│   │   │   ├── page.twig
│   │   │   └── ...
│   │   └── snippets/      # Reusable Twig partials
│   └── locales/
│       ├── ar.json         # Arabic translations (primary)
│       └── en.json         # English translations
```

---

## Quick Component Mapping

| UI Element | Salla Component | CSS Prefix |
|---|---|---|
| Button | `<salla-button>` | `.s-button` |
| Product Card | `<salla-product-card>` | `.s-product-card` |
| Products List | `<salla-products-list>` | — |
| Products Slider | `<salla-products-slider>` | — |
| Cart Summary | `<salla-cart-summary>` | `.s-cart-summary` |
| Search | `<salla-search>` | — |
| Login Modal | `<salla-login-modal>` | — |
| Menu | `<salla-menu>` | — |
| Modal | `<salla-modal>` | `.s-modal` |
| Select Dropdown | `<salla-select>` | `.s-select-*` |
| Tabs | `<salla-tabs>` | `.s-tabs` |
| Breadcrumb | `<salla-breadcrumb>` | — |
| Count Down | `<salla-count-down>` | — |
| Progress Bar | `<salla-progress-bar>` | `.s-progress-bar` |
| Rating Stars | `<salla-rating-stars>` | `.s-rating-stars` |
| Product Options | `<salla-product-options>` | `.s-product-options` |
| Quantity Input | `<salla-quantity-input>` | `.s-quantity-input` |
| Offer Modal | `<salla-offer-modal>` | — |
| Product Availability | `<salla-product-availability>` | `.s-product-availability` |
| Add Product Button | `<salla-add-product-button>` | — |
| Tel Input | `<salla-tel-input>` | — |
| Contacts | `<salla-contacts>` | — |
| Payments | `<salla-payments>` | — |
| Comments | `<salla-comments>` | — |
| Rating Modal | `<salla-rating-modal>` | `.s-rating-modal` |
| Advertisement | `<salla-advertisment>` | — |
| User Profile | `<salla-user-profile>` | — |
| Apps Icons | `<salla-apps-icons>` | — |
| Filters | `<salla-filters>` | — |
| Skeleton | `<salla-skeleton>` | — |
| Slider | `<salla-slider>` | — |
| Verify | `<salla-verify>` | — |
| Bottom Alert | `<salla-bottom-alert>` | — |

---

## Salla JS SDK Quick Reference

```javascript
// === Initialization ===
salla.init({ theme: { color: { primary: "#1232aa" } } });
salla.onReady(() => { /* app ready */ });

// === Cart Events ===
salla.cart.event.onUpdated(summary => { /* cart changed */ });
salla.cart.event.onItemAdded((response, prodId) => { /* item added */ });

// === Product Events ===
salla.product.getPrice(formData);
salla.product.event.onPriceUpdated(res => { /* price updated */ });
salla.product.event.onPriceUpdatedFailed(err => { /* price error */ });
salla.product.availabilitySubscribe({ id, email/mobile });

// === Wishlist ===
salla.wishlist.toggle(productId);

// === Custom Events ===
salla.event.emit("auth::verified", { success: true });
salla.event.auth.onVerified((response, authType) => { /* verified */ });

// === Notifications ===
salla.notify.setNotifier((message, type, data) => { /* show toast */ });

// === Helpers ===
salla.money(amount);                    // Format currency
salla.helpers.number(num);             // Format number
salla.helpers.inputDigitsOnly(el);     // Restrict to digits
salla.config.get('theme.is_rtl');      // Get config
salla.config.isGuest();                // Check guest user
salla.storage.get('key', default);      // Local storage

// === App Class Pattern ===
import AppHelpers from "./app-helpers";
class App extends AppHelpers {
  constructor() {
    super();
    window.app = this;
  }
  loadTheApp() {
    this.commonThings();
    this.initiateNotifier();
    salla.onReady(() => this.status = 'ready');
  }
}
```

---

## Critical Rules

1. **NEVER** use `left`/`right` CSS properties — always use logical properties (`inline-start`/`inline-end`, `margin-inline-start`, etc.)
2. **ALWAYS** use `<salla-*>` web components when they exist — never recreate functionality that Salla already provides
3. **ALWAYS** use `.s-*` CSS classes for styling Salla components — never override Shadow DOM internals
4. **ALWAYS** set RTL as default: `<html lang="ar" dir="rtl">`
5. **ALWAYS** use `{{ theme.color.primary }}` and `{{ theme.font.name }}` in Twig — never hardcode theme values
6. **ALWAYS** use `salla.event.*` for inter-component communication — never use raw DOM events for Salla operations
7. **ALWAYS** use `{% hook %}` for extension points — this allows Salla apps to inject content
8. **ALWAYS** include both `ar.json` and `en.json` locale files
9. **NEVER** use `@ts-ignore` or `eslint-disable` — fix the root cause
10. **ALWAYS** use Tailwind with the Salla theme plugin (`@salla.sa/twilight-tailwind-theme`) and RTL variants