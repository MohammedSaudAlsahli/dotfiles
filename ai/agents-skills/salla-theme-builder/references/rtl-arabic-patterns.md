# RTL-First Arabic Patterns Reference

Comprehensive reference for building RTL-first Arabic interfaces in Salla themes. Every output defaults to RTL layout, Arabic typography, and logical CSS properties.

---

## RTL HTML Setup

### Document Root

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
```

### Dynamic Direction from Salla

```twig
{# In master.twig — direction based on user language #}
<html lang="{{ user.language.code }}" dir="{{ user.language.dir }}">
```

### Language Switching Support

```twiddle
{# Body class for CSS targeting #}
<body class="{{ user.language.dir == 'rtl' ? 'rtl' : 'ltr' }}">
```

### Meta Tags

```twig
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="direction" content="{{ user.language.dir }}">
  <meta name="language" content="{{ user.language.code }}">
</head>
```

---

## CSS Logical Properties

### Complete Mapping (Physical → Logical)

| Physical Property (NEVER USE) | Logical Property (ALWAYS USE) | Tailwind Class |
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
| `border-left-width` | `border-inline-start-width` | `border-s-*` |
| `border-right-width` | `border-inline-end-width` | `border-e-*` |
| `border-left-color` | `border-inline-start-color` | `border-s-*` |
| `border-right-color` | `border-inline-end-color` | `border-e-*` |
| `border-top-left-radius` | `border-start-start-radius` | `rounded-ss-*` |
| `border-top-right-radius` | `border-start-end-radius` | `rounded-se-*` |
| `border-bottom-left-radius` | `border-end-start-radius` | `rounded-es-*` |
| `border-bottom-right-radius` | `border-end-end-radius` | `rounded-ee-*` |
| `float: left` | Use flexbox/grid | — |
| `float: right` | Use flexbox/grid | — |
| `clear: left` | Use flexbox/grid | — |
| `clear: right` | Use flexbox/grid | — |

### Block-Axis Logical Properties (Same in Both Directions)

These properties work the same in LTR and RTL and can be used as-is:

- `margin-top` / `mt-*`
- `margin-bottom` / `mb-*`
- `padding-top` / `pt-*`
- `padding-bottom` / `pb-*`
- `top` / `top-*`
- `bottom` / `bottom-*`

### SASS Patterns for RTL

```scss
// ✅ Good: Logical properties
.product-card {
  @apply ms-4 pe-2 border-s-2 rounded-ss-lg;
}

// ❌ Bad: Physical properties
.product-card {
  @apply ml-4 pr-2 border-l-2 rounded-tl-lg;
}
```

### Complex Layout Example

```scss
// ✅ Good: Full RTL-safe layout
.article-card {
  @apply flex gap-4;

  .article-image {
    @apply w-1/3 flex-shrink-0;
  }

  .article-content {
    @apply flex-1 ps-4; // padding-inline-start
  }

  .article-badge {
    @apply absolute start-2 top-2; // inset-inline-start
  }

  .article-meta {
    @apply flex items-center gap-2 text-sm text-gray-500;

    .article-date {
      @apply pe-2 border-e border-gray-300; // padding-inline-end, border-inline-end
    }
  }
}
```

---

## Tailwind RTL Classes

### Complete Tailwind RTL Utility Reference

#### Margin

| Physical | RTL-Safe | RTL Behaviour |
|---|---|---|
| `ml-4` | `ms-4` | Start margin (right in RTL) |
| `mr-4` | `me-4` | End margin (left in RTL) |
| `mx-4` | `mx-4` | Both sides (direction-neutral) |
| `-ml-4` | `-ms-4` | Negative start margin |
| `-mr-4` | `-me-4` | Negative end margin |

#### Padding

| Physical | RTL-Safe | RTL Behaviour |
|---|---|---|
| `pl-4` | `ps-4` | Start padding (right in RTL) |
| `pr-4` | `pe-4` | End padding (left in RTL) |
| `px-4` | `px-4` | Both sides (direction-neutral) |

#### Positioning

| Physical | RTL-Safe | RTL Behaviour |
|---|---|---|
| `left-0` | `start-0` | Start position |
| `right-0` | `end-0` | End position |
| `left-4` | `start-4` | Start position with offset |
| `right-4` | `end-4` | End position with offset |
| `-left-4` | `-start-4` | Negative start position |

#### Text Alignment

| Physical | RTL-Safe | RTL Behaviour |
|---|---|---|
| `text-left` | `text-start` | Align to start (right in RTL) |
| `text-right` | `text-end` | Align to end (left in RTL) |
| `text-center` | `text-center` | Center (direction-neutral) |

#### Border

| Physical | RTL-Safe | RTL Behaviour |
|---|---|---|
| `border-l` | `border-s` | Start border |
| `border-r` | `border-e` | End border |
| `border-l-2` | `border-s-2` | Start border width |
| `border-r-2` | `border-e-2` | End border width |

#### Border Radius

| Physical | RTL-Safe | RTL Behaviour |
|---|---|---|
| `rounded-l-lg` | `rounded-s-lg` | Start corners |
| `rounded-r-lg` | `rounded-e-lg` | End corners |
| `rounded-tl-lg` | `rounded-ss-lg` | Start-start corner |
| `rounded-tr-lg` | `rounded-se-lg` | Start-end corner |
| `rounded-bl-lg` | `rounded-es-lg` | End-start corner |
| `rounded-br-lg` | `rounded-ee-lg` | End-end corner |

#### Float

| Physical | RTL-Safe | Alternative |
|---|---|---|
| `float-left` | — | Use `flex` or `grid` |
| `float-right` | — | Use `flex` or `grid` |

#### Text Alignment Edge Cases

```twig
{# ✅ Good: Numbers and prices always LTR within RTL #}
<span class="text-start" dir="ltr">{{ product.price }}</span>

{# ✅ Good: Arabic text aligned start #}
<h1 class="text-start">{{ trans('element.title') }}</h1>

{# ✅ Good: Center is direction-neutral #}
<p class="text-center">{{ trans('element.description') }}</p>
```

---

## RTL Icon Mirroring

### Directional Icons That Must Be Mirrored

```css
/* Icons that convey direction must be flipped in RTL */
[dir="rtl"] .icon-directional,
[dir="rtl"] .sicon-arrow-start,
[dir="rtl"] .sicon-chevron-start,
[dir="rtl"] .sicon-back,
[dir="rtl"] .sicon-arrow-left,
[dir="rtl"] .sicon-previous,
[dir="rtl"] .sicon-nav-start {
  transform: scaleX(-1);
}
```

### Icons That Should NOT Be Mirrored

These remain unchanged in RTL:
- `sicon-heart` (love/like)
- `sicon-cart` (shopping cart)
- `sicon-search` (magnifying glass)
- `sicon-star` (rating)
- `sicon-share` (share)
- `sicon-close` (close/X)
- `sicon-check` (checkmark)
- `sicon-plus` / `sicon-minus` (quantity)
- `sicon-truck` (shipping)
- `sicon-phone` (phone)
- `sicon-email` (email)

### SASS Mixin for Icon Mirroring

```scss
@mixin mirror-in-rtl {
  [dir="rtl"] & {
    transform: scaleX(-1);
  }
}

// Usage:
.nav-arrow {
  @apply inline-block;

  @include mirror-in-rtl;
}

// Or with specific icons:
.breadcrumb-separator::after {
  content: '›';
  @include mirror-in-rtl;
}
```

### Icon Usage in Components

```twig
{# ✅ Good: Icon with RTL mirroring #}
<button class="flex items-center gap-2">
  <span>{{ trans('element.previous') }}</span>
  <i class="sicon-chevron-start icon-directional"></i>
</button>

{# ✅ Good: Non-directional icon (no mirroring needed) #}
<button class="flex items-center gap-2">
  <i class="sicon-heart"></i>
  <span>{{ trans('element.add_to_wishlist') }}</span>
</button>
```

---

## Arabic Typography

### Font Setup

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');

:root {
  --font-arabic: 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-main: var(--font-arabic);
}

[dir="rtl"], [lang="ar"] {
  font-family: var(--font-arabic);
}
```

### Salla Theme Font Integration

```twig
{# In master.twig <head> #}
<style>
  :root {
    --font-main: '{{ theme.font.name }}', -apple-system, BlinkMacSystemFont, sans-serif;
  }
</style>

{# Arabic-specific overrides #}
<style>
  [dir="rtl"], [lang="ar"] {
    font-family: var(--font-main);
    /* Arabic fonts typically need tighter letter-spacing */
    letter-spacing: 0;
    /* Arabic text uses larger line-height for readability */
    line-height: 1.8;
  }

  [dir="ltr"], [lang="en"] {
    font-family: var(--font-main);
    letter-spacing: -0.01em;
    line-height: 1.6;
  }
</style>
```

### Arabic Font Size Guidelines

```scss
// Arabic text often needs slightly larger sizes than Latin text
// for equivalent readability

.ar-text {
  @apply text-base leading-relaxed; // base: 1rem (16px), leading: 1.625
  // For Arabic, consider text-[17px] or text-lg for same perceived size
}

// Headings in Arabic may need less letter-spacing
[dir="rtl"] h1,
[dir="rtl"] h2,
[dir="rtl"] h3 {
  letter-spacing: 0;
}
```

### Number Formatting in Arabic

```twig
{# Arabic numerals can be Eastern (٠١٢٣) or Western (0123) #}
{# Salla handles this automatically via salla.money() and salla.helpers.number() #}

{# In Twig templates, prices are automatically formatted #}
<span class="font-bold text-primary">{{ product.price }}</span>
{# Output: "١٬٥٠٠ ر.س" (Arabic) or "1,500 SAR" (English) #}

{# For manual number display, use JS helper #}
<span>{{ product.reviews_count }}</span>
{# Use salla.helpers.number() for locale-aware formatting #}
```

### Bidirectional Text Handling

```scss
// Numbers and Latin text within Arabic content should be LTR
.price-amount {
  @apply font-bold;
  direction: ltr;  // Numbers read left-to-right
  unicode-bidi: embed;
  display: inline-block;
}

// Phone numbers always LTR
.phone-number {
  direction: ltr;
  unicode-bidi: embed;
  display: inline-block;
  @apply text-start; // Align to start of parent direction
}

// Mixed content (Arabic with English words)
.mixed-content {
  unicode-bidi: plaintext; // Let the browser handle direction
}
```

---

## Salla RTL Integration

### Check RTL Direction in JavaScript

```javascript
// Get current direction
const isRtl = salla.config.get('theme.is_rtl'); // true or false

// Use for conditional logic
if (isRtl) {
  // RTL-specific behavior
  element.style.setProperty('--slide-direction', 'rtl');
} else {
  element.style.setProperty('--slide-direction', 'ltr');
}
```

### SweetAlert2 RTL Positioning

```javascript
// SweetAlert2 notification position based on direction
const isRtl = salla.config.get('theme.is_rtl');

salla.notify.setNotifier((message, type, data) => {
  Swal.fire({
    text: message,
    icon: type,
    position: isRtl ? 'top-start' : 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
});
```

### Dynamic Direction Changes

```javascript
// When language changes (AJAX or page reload)
salla.event.on('language::changed', (data) => {
  const dir = data.code === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = data.code;

  // Update body class
  document.body.classList.remove('rtl', 'ltr');
  document.body.classList.add(dir);
});
```

### Twig Direction Handling

```twig
{# Dynamic direction attributes #}
<html lang="{{ user.language.code }}" dir="{{ user.language.dir }}">

{# Conditional classes #}
<body class="{{ user.language.dir == 'rtl' ? 'rtl' : 'ltr' }}">

{# Conditional content #}
{% if user.language.dir == 'rtl' %}
  <i class="sicon-arrow-start icon-directional"></i>
{% else %}
  <i class="sicon-arrow-end"></i>
{% endif %}

{# Using trans() for direction-aware text #}
<h1>{{ trans('element.title') }}</h1>
```

---

## Grid and Flexbox RTL Patterns

### Flexbox RTL Patterns

```scss
// ✅ Good: Flexbox auto-adjusts in RTL
.product-layout {
  @apply flex; // flex-direction: row reverses in RTL
}

// Product image on start side, content on end side
// In LTR: image left, content right
// In RTL: image right, content left
.horizontal-card {
  @apply flex gap-4;

  .card-image {
    @apply w-1/3;
  }

  .card-content {
    @apply flex-1;
  }
}

// Icons before text (auto-adjusts)
.button-with-icon {
  @apply flex items-center gap-2;

  .button-icon {
    @apply flex-shrink-0;
  }

  // In RTL: icon appears on start (right), text on end (left)
  // In LTR: icon appears on start (left), text on end (right)
}
```

### Grid RTL Patterns

```scss
// ✅ Good: Grid auto-adjusts column flow in RTL
.product-grid {
  @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4;
}

// Grid with start-aligned content
.sidebar-layout {
  @apply grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8;

  // Sidebar appears on start side automatically
  // In RTL: sidebar on right, content on left
  // In LTR: sidebar on left, content on right
}
```

### Navigation RTL Patterns

```scss
// Horizontal navigation
.nav-list {
  @apply flex items-center gap-6;

  .nav-item {
    @apply text-sm font-medium text-gray-600 hover:text-primary;
    @apply ps-4 border-s-2 border-transparent;
    @apply hover:border-primary; // Active state uses start border

    // In RTL: border appears on right side (inline-start)
    // In LTR: border appears on left side (inline-start)
  }

  .nav-item-active {
    @apply text-primary border-primary;
  }
}

// Breadcrumb navigation
.breadcrumb {
  @apply flex items-center gap-2 text-sm text-gray-500;

  .breadcrumb-separator {
    @apply mx-1;

    // Or use a directional icon
    &::after {
      content: '›';
      @include mirror-in-rtl;
    }
  }
}
```

### Form RTL Patterns

```scss
// Form with label and input
.form-group {
  @apply mb-4;

  .form-label {
    @apply block text-sm font-medium text-dark mb-1 text-start;
    // text-start aligns label to start in both directions
  }

  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md text-start;
    // text-start ensures input text aligns correctly
  }

  .form-hint {
    @apply text-xs text-gray-500 mt-1 text-start;
  }

  .form-error {
    @apply text-xs text-danger mt-1 text-start;
  }
}

// Input with icon
.input-with-icon {
  @apply relative;

  .input-icon {
    @apply absolute start-3 top-1/2 -translate-y-1/2 text-gray-400;
    // start-3 positions icon on the inline-start side
  }

  .input-field {
    @apply ps-10; // Padding on start side for icon
    // ps-10 gives space for the icon in both directions
  }
}
```

---

## Mobile + RTL Testing

### Viewports to Test

| Device | Width | Height | Notes |
|---|---|---|---|
| iPhone SE | 375px | 667px | Smallest common mobile |
| iPhone 12/13 | 390px | 844px | Standard mobile |
| iPhone 14 Pro Max | 430px | 932px | Large mobile |
| iPhone 14 Plus | 428px | 926px | Large mobile |
| Samsung Galaxy S21 | 412px | 915px | Android mobile |
| iPad Mini | 768px | 1024px | Small tablet |
| iPad Pro | 1024px | 1366px | Large tablet |
| Desktop | 1280px+ | — | Standard desktop |

### RTL + Mobile Checklist

1. **Text alignment** — All text reads correctly from right to left
2. **Text truncation** — Ellipsis appears at the start side of truncated text
3. **Input alignment** — Form inputs align text to start
4. **Icon mirroring** — Directional icons (arrows, chevrons) are mirrored
5. **Button alignment** — Icons and text in buttons flow correctly
6. **Navigation flow** — Tab order follows visual RTL order
7. **Swipe gestures** — Horizontal slides swipe in correct direction
8. **Carousel direction** — Products slide from left to right in RTL
9. **Modal positioning** — Close button on start side (right in RTL)
10. **Dropdown alignment** — Dropdowns open from start side
11. **Touch targets** — 44px minimum, no overlapping in RTL
12. **Scroll behavior** — Horizontal scroll starts from right in RTL

### Testing Commands

```bash
# Preview with specific viewport
salla theme preview

# Browser DevTools: Toggle RTL/LTR
# 1. Open DevTools (F12)
# 2. In Console:
#    document.documentElement.dir = 'rtl';  // Switch to RTL
#    document.documentElement.dir = 'ltr';  // Switch to LTR

# Browser DevTools: Responsive mode
# 1. Toggle device toolbar (Ctrl+Shift+M)
# 2. Set width to 375px, 390px, 414px for mobile testing
# 3. Toggle direction with console commands above
```

### Automated RTL Testing

```javascript
// Test helper: Toggle RTL direction
function toggleRTL() {
  const html = document.documentElement;
  html.dir = html.dir === 'rtl' ? 'ltr' : 'rtl';
  html.lang = html.dir === 'rtl' ? 'ar' : 'en';
  document.body.classList.toggle('rtl');
  document.body.classList.toggle('ltr');
}

// Test helper: Check for physical CSS properties
function findPhysicalProperties() {
  const elements = document.querySelectorAll('*');
  const issues = [];

  elements.forEach(el => {
    const styles = window.getComputedStyle(el);
    if (styles.marginLeft !== '0px' || styles.marginRight !== '0px') {
      // Check if these are intentional or should be logical
      // Only flag if the element has different start/end margins
    }
  });

  return issues;
}

// Test helper: Verify logical properties
function verifyLogicalProperties() {
  const rules = [];
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.cssText.includes('margin-left') ||
            rule.cssText.includes('margin-right') ||
            rule.cssText.includes('padding-left') ||
            rule.cssText.includes('padding-right')) {
          rules.push({
            file: sheet.href,
            text: rule.cssText,
          });
        }
      }
    } catch (e) {
      // Cross-origin stylesheet
    }
  }
  return rules;
}
```

---

## Common RTL Mistakes

### 1. Using Physical Properties

```css
/* ❌ BAD: Physical properties break in RTL */
.card {
  margin-left: 16px;
  padding-right: 8px;
  text-align: left;
  left: 0;
  border-left: 2px solid;
}

/* ✅ GOOD: Logical properties work in both directions */
.card {
  margin-inline-start: 16px;   /* ms-4 in Tailwind */
  padding-inline-end: 8px;      /* pe-2 in Tailwind */
  text-align: start;            /* text-start in Tailwind */
  inset-inline-start: 0;        /* start-0 in Tailwind */
  border-inline-start: 2px solid; /* border-s-2 in Tailwind */
}
```

### 2. Not Mirroring Directional Icons

```html
<!-- ❌ BAD: Arrow always points the same direction -->
<span class="mr-2">→</span> Next

<!-- ✅ GOOD: Arrow mirrors in RTL -->
<span class="me-2 icon-directional">→</span> Next
```

```css
/* Ensure icon mirroring */
.icon-directional {
  [dir="rtl"] & {
    transform: scaleX(-1);
  }
}
```

### 3. Hardcoding Direction in JavaScript

```javascript
// ❌ BAD: Hardcoded positioning
element.style.left = '100px';
element.style.right = 'auto';

// ✅ GOOD: Logical positioning  
element.style.insetInlineStart = '100px';
// Or use CSS classes
element.classList.add('start-[100px]');
```

### 4. Forgetting `dir="rtl"` on Isolated Sections

```html
<!-- ❌ BAD: RTL section in LTR page without dir attribute -->
<div class="arabic-text">
  هذا نص عربي
</div>

<!-- ✅ GOOD: Explicit dir attribute on isolated sections -->
<div class="arabic-text" dir="rtl" lang="ar">
  هذا نص عربي
</div>
```

### 5. Center Alignment is Direction-Neutral

```css
/* ✅ This is FINE — center works in both directions */
.center-text {
  text-align: center; /* or text-center */
}

/* ✅ This is also fine */
.center-flex {
  justify-content: center; /* or justify-center */
}

/* ❌ Don't change center to start/end unless you specifically want alignment */
```

### 6. Form Input Text Overflow

```css
/* ❌ BAD: Truncation direction wrong in RTL */
.input-truncate {
  direction: ltr; /* Forces LTR truncation in RTL */
  text-overflow: ellipsis;
  overflow: hidden;
}

/* ✅ GOOD: Use logical properties */
.input-truncate {
  text-align: start; /* Align to start in both directions */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```

### 7. Number Display in Arabic Context

```css
/* ✅ Numbers (prices, quantities) should remain LTR within RTL context */
.price-amount {
  direction: ltr;
  display: inline-block;
}

/* ✅ But the overall container is RTL */
.product-price {
  direction: rtl; /* Container is RTL */
  text-align: start;
}

.product-price .amount {
  direction: ltr; /* Number portion is LTR */
  display: inline-block;
}
```

### 8. Flex Direction in RTL

```scss
// ✅ Good: flex-row auto-reverses in RTL
.nav-items {
  @apply flex flex-row gap-4;
  // In LTR: items flow left → right
  // In RTL: items flow right → left (automatic)
}

// ✅ Good: If you need SAME direction in both LTR and RTL
.progress-steps {
  @apply flex flex-row gap-2;
  // Steps 1, 2, 3 should always flow LTR (even in RTL)
  direction: ltr;
}

// ❌ Bad: Explicitly setting flex-direction: row-reverse for RTL
.nav-items {
  flex-direction: row; // Don't set this explicitly
  // Let it auto-adjust based on dir attribute
}
```

### 9. CSS Custom Properties for Direction

```css
/* ✅ Good: Use CSS custom properties for direction-aware values */
:root {
  --spacing-inline-start: 1rem;
  --spacing-inline-end: 1rem;
  --alignment: start;
}

/* These automatically resolve correctly in both directions */
.card {
  margin-inline-start: var(--spacing-inline-start);
  text-align: var(--alignment);
}
```

### 10. Scroll Direction in RTL

```javascript
// ✅ Good: Scroll direction adjusts in RTL
function scrollToElement(element) {
  const isRtl = document.documentElement.dir === 'rtl';
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: isRtl ? 'end' : 'start',
  });
}

// ❌ Bad: Hardcoded scroll direction
function scrollToElement(element) {
  element.scrollIntoView({ inline: 'start' }); // Wrong in RTL
}
```

---

## Salla Component RTL Notes

### Component-Specific RTL Overrides

```scss
// Product Card: Horizontal layout
.s-product-card-horizontal {
  // Flex direction auto-reverses in RTL
  // Image on inline-end, content on inline-start

  // Override if needed:
  [dir="rtl"] & {
    .s-product-card-image {
      @apply order-last; // Move image to end in RTL
    }
  }
}

// Cart Summary: Price alignment
.s-cart-summary-item-price {
  @apply text-end; // Aligns to inline-end (left in RTL, right in LTR)
}

// Select: Dropdown position
.s-select-menu {
  @apply start-0; // Anchored to inline-start
}

// Modal: Close button
.s-modal-header {
  .close-btn {
    @apply start-auto end-0; // Close on inline-end side
  }
}

// Tabs: Active indicator
.s-tabs-tab-active {
  @apply border-b-2 border-s-primary; // Underline from inline-start

  [dir="rtl"] & {
    // Tab order follows RTL reading direction
  }
}

// Quantity Input: Button placement
.s-quantity-input {
  // (−) on inline-start, (+) on inline-end
  // Auto-adjusts in RTL
}

// Breadcrumb: Separator direction
.s-breadcrumb-separator {
  @include mirror-in-rtl; // Flip › to ‹ in RTL
}

// Search: Input alignment
.s-search-input {
  @apply text-start ps-10; // Text and icon on start side
  // Auto-adjusts in both directions
}
```

### Global RTL SASS

```scss
// Add to app.scss for global RTL overrides
[dir="rtl"] {
  // Mirror all directional icons
  .sicon-arrow-start,
  .sicon-chevron-start,
  .sicon-back,
  .icon-directional {
    transform: scaleX(-1);
  }

  // Ensure proper Arabic typography
  font-family: var(--font-arabic, 'IBM Plex Sans Arabic', sans-serif);
  letter-spacing: 0;
  line-height: 1.8;

  // Override any remaining physical properties
  .force-start {
    text-align: start;
  }
}
```