# Salla CSS/SASS Classes Reference

Complete reference for all Salla component CSS classes, SASS nesting structure, CSS custom properties, Tailwind integration, and RTL patterns.

---

## Component CSS Classes

### Button (.s-button-*)

Root class: `.s-button`

```scss
.s-button {
  // Root: applies base styles to all button variants
  @apply inline-flex items-center justify-center font-primary transition-all duration-200;

  &-wrap {
    @apply inline-block;
  }

  &-element {
    @apply inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium;
  }

  &-link {
    @apply inline-flex items-center text-primary hover:underline;
  }

  &-icon {
    @apply inline-flex items-center me-2 rtl:ms-2 rtl:me-0;
  }

  // Fill variants
  &-solid {
    @apply bg-primary text-white hover:opacity-90;
  }

  &-outline {
    @apply border border-primary text-primary bg-transparent hover:bg-primary hover:text-white;
  }

  &-fill-none {
    @apply bg-transparent text-primary hover:opacity-70;
  }

  // Size variants
  &-large {
    @apply px-6 py-3 text-base;
  }

  &-small {
    @apply px-3 py-1 text-xs;
  }

  &-wide {
    @apply w-full;
  }

  // Color variants
  &-primary {
    @apply bg-primary text-white;
  }

  &-success {
    @apply bg-green-600 text-white;
  }

  &-warning {
    @apply bg-yellow-500 text-dark;
  }

  &-danger {
    @apply bg-red-600 text-white;
  }

  &-light {
    @apply bg-gray-100 text-dark;
  }

  &-gray {
    @apply bg-gray-500 text-white;
  }

  &-dark {
    @apply bg-dark text-white;
  }

  // Outline color variants
  &-outline#{&}-primary {
    @apply border-primary text-primary bg-transparent;
  }

  &-outline#{&}-success {
    @apply border-green-600 text-green-600 bg-transparent;
  }

  &-outline#{&}-danger {
    @apply border-red-600 text-red-600 bg-transparent;
  }

  // States
  &-disabled {
    @apply opacity-50 cursor-not-allowed pointer-events-none;
  }

  &-loader {
    @apply animate-spin;
  }

  &-text {
    @apply truncate;
  }

  &-hide {
    @apply hidden;
  }

  // RTL overrides: handled via Tailwind logical utilities
  // ms-*, me-*, ps-*, pe-*, start-*, end-*
}
```

### Product Card (.s-product-card-*)

Root class: `.s-product-card`

```scss
.s-product-card {
  &-entry {
    @apply relative overflow-hidden rounded-lg bg-white transition-shadow duration-300;

    &:hover {
      @apply shadow-md;
    }
  }

  &-image {
    @apply relative aspect-square overflow-hidden bg-gray-100;

    img {
      @apply w-full h-full object-cover;
    }
  }

  // Layout variants
  &-vertical {
    @apply flex flex-col;
  }

  &-horizontal {
    @apply flex flex-row;
    // RTL: flex-direction auto-reverses, image on inline-end
    .s-product-card-image {
      @apply w-1/3;
    }
    .s-product-card-content-main {
      @apply w-2/3 ps-4 rtl:pe-4 rtl:ps-0;
    }
  }

  &-fit-height {
    @apply h-full;
  }

  &-special {
    @apply ring-2 ring-primary;
  }

  &-full-image {
    @apply bg-cover bg-center;

    .s-product-card-content-main {
      @apply bg-gradient-to-t from-black/70 to-transparent text-white;
    }
  }

  &-minimal {
    @apply p-2;
    .s-product-card-content-title {
      @apply text-sm;
    }
  }

  &-donation {
    @apply text-center;
  }

  &-shadow {
    @apply shadow-sm;
  }

  &-out-of-stock {
    @apply opacity-60 pointer-events-none;
  }

  // Sub-elements
  &-wishlist-btn {
    @apply absolute top-2 end-2 rtl:start-2 rtl:end-auto z-10;
  }

  &-content-main {
    @apply p-4;
  }

  &-content-sub {
    @apply text-xs text-gray-500 mt-1;
  }

  &-content-footer {
    @apply flex items-center justify-between mt-3;
  }

  &-content-title {
    @apply font-primary text-sm font-bold text-dark line-clamp-2;
  }

  &-content-subtitle {
    @apply text-xs text-gray-400 mt-1;
  }

  &-content-pie {
    @apply w-16 h-16;
  }

  &-content-extra-padding {
    @apply p-6;
  }

  &-donation-input {
    @apply mt-2;
  }

  &-rating {
    @apply flex items-center gap-1;
  }
}
```

### Product Options (.s-product-options-*)

Root class: `.s-product-options`

```scss
.s-product-options {
  @apply space-y-4;

  &-group {
    @apply mb-4;

    &:last-child {
      @apply mb-0;
    }
  }

  &-group-title {
    @apply text-sm font-bold text-dark mb-2;
  }

  &-option {
    @apply inline-flex items-center justify-center px-3 py-1.5 rounded-md border border-gray-300 text-sm cursor-pointer transition-all duration-150 me-2 mb-2;

    &:hover {
      @apply border-primary text-primary;
    }
  }

  &-option-selected {
    @apply border-primary bg-primary text-white;
  }

  &-option-disabled {
    @apply opacity-40 cursor-not-allowed pointer-events-none;
  }

  &-color {
    @apply w-8 h-8 rounded-full border-2 border-transparent cursor-pointer transition-all duration-150;
  }

  &-color-selected {
    @apply ring-2 ring-primary ring-offset-2;
  }

  &-size {
    @apply inline-flex items-center justify-center min-w-[40px] px-3 py-1.5 rounded-md border border-gray-300 text-sm;
  }

  &-size-selected {
    @apply border-primary bg-primary text-white;
  }

  &-image {
    @apply w-16 h-16 rounded-md border-2 border-transparent cursor-pointer object-cover;
  }

  &-image-selected {
    @apply border-primary;
  }
}
```

### Cart Summary (.s-cart-summary-*)

Root class: `.s-cart-summary`

```scss
.s-cart-summary {
  @apply bg-white rounded-lg shadow-sm;

  &-header {
    @apply px-4 py-3 border-b border-gray-200;
  }

  &-body {
    @apply divide-y divide-gray-100;
  }

  &-footer {
    @apply px-4 py-3 border-t border-gray-200;
  }

  &-item {
    @apply flex items-center gap-3 px-4 py-3;

    &-image {
      @apply w-16 h-16 rounded-md object-cover flex-shrink-0;
    }

    &-details {
      @apply flex-1 min-w-0;
    }

    &-price {
      @apply text-sm font-bold text-primary;
    }

    &-quantity {
      @apply flex items-center gap-2;
    }
  }

  &-subtotal {
    @apply flex justify-between text-sm text-gray-600;
  }

  &-total {
    @apply flex justify-between text-lg font-bold text-dark;
  }

  &-discount {
    @apply flex justify-between text-sm text-green-600;
  }

  &-shipping {
    @apply flex justify-between text-sm text-gray-600;
  }

  &-coupon {
    @apply mt-3;
  }
}
```

### Select (.s-select-*)

Root class: `.s-select`

```scss
.s-select {
  @apply relative inline-block w-full;

  &-trigger {
    @apply flex items-center justify-between w-full px-4 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer transition-colors duration-150;

    &:hover {
      @apply border-primary;
    }
  }

  &-value {
    @apply text-sm text-dark;
  }

  &-placeholder {
    @apply text-sm text-gray-400;
  }

  &-icon {
    @apply ms-2 text-gray-400 transition-transform duration-200;

    // RTL: icon flips direction
    [dir="rtl"] & {
      @apply rotate-180;
    }
  }

  &-menu {
    @apply absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto;

    // Position: bottom-start for LTR, bottom-start auto-adjusts for RTL
    @apply start-0;
  }

  &-option {
    @apply px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors duration-100;
  }

  &-option-selected {
    @apply bg-primary text-white;
  }

  &-option-disabled {
    @apply opacity-40 cursor-not-allowed pointer-events-none;
  }
}
```

### Tabs (.s-tabs-*)

Root class: `.s-tabs`

```scss
.s-tabs {
  @apply w-full;

  &-nav {
    @apply flex border-b border-gray-200 overflow-x-auto;
  }

  &-tab {
    @apply px-4 py-2.5 text-sm font-medium text-gray-500 border-b-2 border-transparent cursor-pointer transition-colors duration-200 whitespace-nowrap;

    &:hover {
      @apply text-primary;
    }
  }

  &-tab-active {
    @apply text-primary border-primary;
  }

  &-panel {
    @apply hidden py-4;
  }

  &-panel-active {
    @apply block;
  }
}
```

### Modal (.s-modal-*)

Root class: `.s-modal`

```scss
.s-modal {
  @apply fixed inset-0 z-50 overflow-y-auto;

  &-overlay {
    @apply fixed inset-0 bg-black/50 transition-opacity duration-300;
  }

  &-container {
    @apply relative mx-auto my-8 w-full max-w-lg bg-white rounded-xl shadow-xl;
    // RTL: text alignment inherit from dir
  }

  &-header {
    @apply flex items-center justify-between px-6 py-4 border-b border-gray-200;
  }

  &-body {
    @apply px-6 py-4;
  }

  &-footer {
    @apply flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200;
    // RTL: flex justify-start becomes inline-end via logical properties
  }
}
```

### Progress Bar (.s-progress-bar-*)

Root class: `.s-progress-bar`

```scss
.s-progress-bar {
  @apply w-full;

  &-track {
    @apply w-full h-2 bg-gray-200 rounded-full overflow-hidden;
  }

  &-fill {
    @apply h-full bg-primary rounded-full transition-all duration-500;
    // Direction: inline-start to inline-end, auto-flips in RTL
  }
}
```

### Rating Stars (.s-rating-stars-*)

Root class: `.s-rating-stars`

```scss
.s-rating-stars {
  @apply inline-flex items-center gap-0.5;

  &-star {
    @apply text-gray-300;
  }

  &-filled {
    @apply text-yellow-400;
  }

  &-empty {
    @apply text-gray-300;
  }

  &-half {
    @apply text-yellow-400;
  }
}
```

### Rating Modal (.s-rating-modal-*)

Root class: `.s-rating-modal`

```scss
.s-rating-modal {
  @apply p-6;

  &-stars {
    @apply flex items-center justify-center gap-2 my-4;
  }

  &-comment {
    @apply w-full border border-gray-300 rounded-md p-3 text-sm;
  }

  &-submit {
    @apply mt-4 w-full;
  }
}
```

### Product Availability (.s-product-availability-*)

Root class: `.s-product-availability`

```scss
.s-product-availability {
  @apply text-center py-4;

  &-status {
    @apply text-sm text-gray-500 mb-3;
  }

  &-form {
    @apply flex items-center gap-2;
  }

  &-input {
    @apply flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm;
  }

  &-button {
    @apply px-4 py-2 bg-primary text-white rounded-md text-sm;
  }
}
```

### Quantity Input (.s-quantity-input-*)

Root class: `.s-quantity-input`

```scss
.s-quantity-input {
  @apply inline-flex items-center border border-gray-300 rounded-md;

  &-button {
    @apply flex items-center justify-center w-10 h-10 text-gray-600 hover:text-primary transition-colors;

    // RTL: minus on inline-start, plus on inline-end (handled by flex order)
  }

  &-button-minus {
    @apply border-e border-gray-300;
    // RTL: border becomes border-s automatically
  }

  &-button-plus {
    @apply border-s border-gray-300;
    // RTL: border becomes border-e automatically
  }

  &-input {
    @apply w-12 h-10 text-center text-sm border-0 focus:ring-0 bg-transparent;
  }

  &-disabled {
    @apply opacity-50 cursor-not-allowed pointer-events-none;
  }
}
```

---

## CSS Custom Properties

Salla themes use CSS custom properties for theming. These are set via Twig template variables from `twilight.json` settings.

```css
:root {
  /* Colors */
  --color-primary: {{ theme.color.primary }};
  --color-primary-dark: {{ theme.color.darker(0.15) }};
  --color-primary-light: {{ theme.color.lighter(0.15) }};
  --color-secondary: {{ theme.color.secondary }};

  /* Typography */
  --font-main: '{{ theme.font.name }}', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* Borders */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
```

### RTL-Specific Custom Properties

```css
[dir="rtl"], [lang="ar"] {
  --direction: rtl;
  --text-align-default: start;
  --font-main: 'IBM Plex Sans Arabic', '{{ theme.font.name }}', sans-serif;
}
```

---

## Tailwind Config Integration

```javascript
// tailwind.config.js
const twilightTheme = require('@salla.sa/twilight-tailwind-theme');

module.exports = {
  content: [
    'src/views/**/*.twig',
    'src/assets/js/**/*.js',
    'node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '10px',
      screens: {
        '2xl': '1280px',
      },
    },
    fontFamily: {
      sans: ['var(--font-main)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      primary: ['var(--font-main)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    },
    extend: {
      colors: {
        'dark': '#1D1F1F',
        'darker': '#0E0F0F',
        'danger': '#AE0A0A',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [
    twilightTheme,
    require('@tailwindcss/forms'),
  ],
};
```

### Tailwind RTL Plugin Setup

Add the Tailwind RTL plugin to support logical property utilities:

```javascript
// tailwind.config.js — add to plugins array
plugins: [
  require('@salla.sa/twilight-tailwind-theme'),
  require('@tailwindcss/forms'),
  // RTL support is built into Tailwind v3.3+ with logical properties
  // Use ms-*, me-*, ps-*, pe-*, start-*, end-* utilities
],
```

---

## SASS Main Entry Point

```scss
// src/assets/css/app.scss

// Tailwind base
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

// Salla component overrides
// These override .s-* classes for Salla web components
// NEVER target Shadow DOM internals — only .s-* class hooks

// Button overrides
.s-button-solid {
  @apply rounded-lg font-primary;
}

.s-button-primary {
  @apply shadow-sm hover:shadow-md transition-shadow;
}

// Product card overrides
.s-product-card-entry {
  @apply rounded-xl overflow-hidden;

  &:hover {
    @apply shadow-lg;
  }
}

.s-product-card-content-title {
  @apply font-semibold;
}

// Cart summary overrides
.s-cart-summary-footer {
  @apply rounded-b-xl;
}

// Modal overrides
.s-modal-container {
  @apply rounded-2xl;
}

// Select overrides
.s-select-trigger {
  @apply rounded-lg;
}

// Tabs overrides
.s-tabs-tab-active {
  @apply font-bold;
}

// Quantity input overrides
.s-quantity-input {
  @apply rounded-lg;
}

// Rating stars overrides
.s-rating-stars-filled {
  @apply text-yellow-400;
}

// RTL-specific overrides
[dir="rtl"] {
  // Mirror directional icons
  .icon-directional,
  .sicon-arrow-start,
  .sicon-chevron-start {
    transform: scaleX(-1);
  }

  // Ensure proper text alignment
  .text-default {
    text-align: start;
  }
}
```

---

## RTL CSS Patterns

### Properties to NEVER Use

These physical properties produce incorrect layouts in RTL. **Always** use their logical equivalents:

| NEVER Use | ALWAYS Use | Tailwind Class |
|---|---|---|
| `margin-left` | `margin-inline-start` | `ms-*` |
| `margin-right` | `margin-inline-end` | `me-*` |
| `padding-left` | `padding-inline-start` | `ps-*` |
| `padding-right` | `padding-inline-end` | `pe-*` |
| `left` | `inset-inline-start` | `start-*` |
| `right` | `inset-inline-end` | `end-*` |
| `text-align: left` | `text-align: start` | `text-start` |
| `text-align: right` | `text-align: end` | `text-end` |
| `border-left` | `border-inline-start` | `border-s-*` |
| `border-right` | `border-inline-end` | `border-e-*` |
| `border-left-radius` | `border-start-start-radius` | `rounded-ss-*` |
| `border-right-radius` | `border-start-end-radius` | `rounded-se-*` |
| `float: left` | Use flexbox/grid | — |
| `float: right` | Use flexbox/grid | — |

### Tailwind RTL Logical Utility Classes

| Physical Class | Logical Class (RTL-safe) |
|---|---|
| `ml-4` | `ms-4` |
| `mr-4` | `me-4` |
| `pl-4` | `ps-4` |
| `pr-4` | `pe-4` |
| `left-0` | `start-0` |
| `right-0` | `end-0` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |
| `border-l` | `border-s` |
| `border-r` | `border-e` |
| `rounded-l-lg` | `rounded-s-lg` |
| `rounded-r-lg` | `rounded-e-lg` |

### Common RTL SASS Patterns

```scss
// Card with icon on the start side
.card-with-icon {
  @apply flex items-center gap-3;

  .card-icon {
    @apply me-3;
    // In RTL: me-3 becomes margin-inline-end: 0.75rem
    // which places space between icon and content correctly
  }
}

// Badge positioned at start-top corner
.card-badge {
  @apply absolute start-2 top-2;
  // In RTL: start-2 positions from inline-start (right in RTL)
}

// Pricing aligned to end
.product-price {
  @apply text-end font-bold;
  // In RTL: text-end aligns to inline-end (left in RTL)
}

// Border on start side
.divider-start {
  @apply border-s-2 border-gray-200 ps-4;
  // In RTL: border starts from inline-end, padding on inline-end
}

// Navigation with start-aligned items
.nav-list {
  @apply flex items-center gap-4;

  .nav-item {
    @apply ps-4 pe-4;
    // Equal padding on both sides, direction-safe
  }
}

// Form label aligned start
.form-label {
  @apply text-start font-medium mb-1;
  // In RTL: text-start aligns to inline-start (right in RTL)
}
```

### SASS Mixin for RTL

```scss
// Useful mixin for complex RTL overrides
@mixin rtl {
  [dir="rtl"] & {
    @content;
  }
}

// Usage:
.product-card {
  @apply flex flex-row;

  @include rtl {
    @apply flex-row-reverse;
  }
}
```

---

## Component Styling Best Practices

1. **Only target `.s-*` classes** — never attempt to style Shadow DOM internals
2. **Use Tailwind utilities first** — only use custom SASS for complex or repeated patterns
3. **Use logical properties** — `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`
4. **Test both directions** — every SASS rule must render correctly in both `dir="rtl"` and `dir="ltr"`
5. **Use `@apply`** — for Tailwind utilities within SASS files
6. **Use CSS custom properties** — via `var(--color-primary)` etc. for theming
7. **Never hardcode colors** — always use `{{ theme.color.primary }}` in Twig or `var(--color-primary)` in CSS
8. **Keep specificity low** — avoid deep nesting; use single-class selectors with `@apply`
9. **Responsive first** — mobile-first breakpoints, test at 375px, 768px, 1280px
10. **Dark mode** — use `dark:` variant for dark mode styles