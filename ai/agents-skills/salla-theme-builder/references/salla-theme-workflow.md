# Salla Theme Workflow Reference

Complete reference for Salla theme development: CLI commands, theme structure, configuration, build pipeline, publishing, debugging, and best practices.

---

## Setup

### Install Salla CLI

```bash
# Install globally via npm
npm install -g @salla.sa/cli

# Verify installation
salla --version
```

### Login to Salla Partners

```bash
# Login (opens browser for OAuth)
salla login

# Verify login
salla whoami
```

### Create New Theme

```bash
# Create theme (interactive wizard)
salla theme create

# Wizard will prompt for:
# - Theme name (Arabic + English)
# - Theme description
# - Author name
# - Template type (choose "twilight" for web components)

# Navigate to theme directory
cd my-salla-theme
```

### Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

---

## Development

### Preview Theme

```bash
# Start local development server with hot reload
salla theme preview

# Preview on specific port
salla theme preview --port 3000

# Preview with specific store
salla theme preview --store my-store
```

The preview command:
- Compiles SASS/CSS and JavaScript via webpack
- Starts a local dev server with hot module replacement
- Opens your default browser to the preview URL
- Watches for file changes and auto-refreshes

### Build Assets

```bash
# Build for development
pnpm run build

# Build for production (minified, optimized)
pnpm run prod

# Watch for changes during development
pnpm run watch
```

### Development Workflow

```bash
# 1. Start preview
salla theme preview

# 2. Edit files in src/
#    - src/assets/css/app.scss  — Styles
#    - src/assets/js/app.js     — JavaScript
#    - src/views/               — Twig templates

# 3. Changes auto-reload in browser

# 4. Test in both RTL and LTR
#    - Switch language in preview URL
#    - Verify layout, spacing, icons in both directions
```

---

## Theme Structure

```
my-salla-theme/
├── twilight.json          # Theme manifest (name, settings, components)
├── tailwind.config.js     # Tailwind CSS configuration with Salla tokens
├── webpack.mix.js         # Laravel Mix configuration for asset compilation
├── package.json           # Node.js dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── .gitignore             # Git ignore rules
├── .env                   # Environment variables (NOT committed)
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── app.scss        # Main stylesheet entry point
│   │   │   └── custom.scss     # Custom component styles (optional)
│   │   ├── js/
│   │   │   ├── app.js          # Main JavaScript entry point
│   │   │   ├── app-helpers.js  # Base helpers class (provided by theme)
│   │   │   └── pages/          # Page-specific JavaScript
│   │   │       ├── product.js  # Product page logic
│   │   │       ├── cart.js     # Cart page logic
│   │   │       └── home.js     # Home page logic
│   │   └── images/
│   │       ├── logo.svg        # Store logo (placeholder)
│   │       ├── placeholder.svg # Image placeholder
│   │       └── icons/          # Custom icons
│   ├── views/
│   │   ├── layouts/
│   │   │   └── master.twig     # Master HTML layout
│   │   ├── components/
│   │   │   ├── header/
│   │   │   │   └── index.twig # Header component
│   │   │   ├── footer/
│   │   │   │   └── index.twig # Footer component
│   │   │   └── home/
│   │   │       ├── hero-banner.twig       # Hero banner section
│   │   │       ├── featured-slider.twig   # Featured products slider
│   │   │       ├── category-grid.twig     # Categories grid
│   │   │       └── offer-section.twig     # Special offers section
│   │   ├── pages/
│   │   │   ├── home.twig       # Homepage
│   │   │   ├── product.twig    # Product detail page
│   │   │   ├── products.twig   # Products listing page
│   │   │   ├── cart.twig       # Cart page
│   │   │   ├── brands.twig     # Brands page
│   │   │   ├── categories.twig # Categories page
│   │   │   ├── page.twig       # Static page
│   │   │   ├── 404.twig        # Not found page
│   │   │   └── search.twig     # Search results page
│   │   └── snippets/
│   │       ├── product-card.twig    # Reusable product card
│   │       ├── pagination.twig      # Pagination component
│   │       └── empty-state.twig     # Empty state component
│   └── locales/
│       ├── ar.json         # Arabic translations (primary)
│       └── en.json         # English translations
```

---

## Configuration

### twilight.json

Full manifest reference — see `salla-twig-templates-reference.md` for the complete structure.

Key sections:
- `name` — Bilingual theme name (ar/en)
- `version` — Semantic version
- `author` — Author info
- `description` — Bilingual description
- `settings` — Theme customization options (colors, fonts, layout, features)
- `components` — Custom component registrations with fields

### tailwind.config.js

```javascript
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

### webpack.mix.js

```javascript
const mix = require('laravel-mix');

// CSS compilation
mix.sass('src/assets/css/app.scss', 'dist/css')
   .postCss('dist/css/app.css', 'dist/css', [
     require('tailwindcss'),
     require('autoprefixer'),
   ]);

// JavaScript compilation
mix.js('src/assets/js/app.js', 'dist/js')
   .vue({ version: 3 })  // If using Vue components
   .extract(['salla-twilight']);  // Vendor extraction

// Versioning for cache busting in production
if (mix.inProduction()) {
  mix.version();
}

// Source maps in development
if (!mix.inProduction()) {
  mix.sourceMaps();
}

// BrowserSync for live reload
mix.browserSync({
  proxy: process.env.APP_URL || 'localhost:3000',
  files: [
    'src/views/**/*.twig',
    'dist/css/**/*.css',
    'dist/js/**/*.js',
  ],
});
```

### package.json

```json
{
  "name": "my-salla-theme",
  "version": "1.0.0",
  "description": "A Salla e-commerce theme built with Twilight",
  "scripts": {
    "dev": "mix",
    "watch": "mix watch",
    "build": "mix --production",
    "prod": "mix --production"
  },
  "dependencies": {
    "@salla.sa/twilight": "^1.0.0",
    "@salla.sa/twilight-tailwind-theme": "^1.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "laravel-mix": "^6.0.49",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/forms": "^0.5.7"
  }
}
```

---

## Publishing

### Validate Theme

```bash
# Check theme for errors
salla theme validate

# Validates:
# - twilight.json structure and required fields
# - Template syntax
# - Asset references
# - RTL support
# - Component registration
# - Locale file completeness
```

### Submit for Review

```bash
# Publish theme to Salla Marketplace
salla theme publish

# Review process:
# 1. Automated validation checks
# 2. Code quality review
# 3. Design consistency review
# 4. RTL/LTR compatibility check
# 5. Performance audit
# 6. Security review

# Review takes 2-5 business days
```

### Version Updates

```bash
# Update theme version in twilight.json
# "version": "1.1.0"

# Re-publish
salla theme publish
```

---

## Git/GitHub Integration

### Initialize Git

```bash
cd my-salla-theme
git init
git add .
git commit -m "feat: initial theme structure"

# Create GitHub repository
gh repo create my-salla-theme --public --source=. --push

# Push to GitHub
git remote add origin https://github.com/username/my-salla-theme.git
git push -u origin main
```

### .gitignore

```gitignore
# Dependencies
node_modules/

# Build output
dist/

# Environment
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# IDE
.idea/
.vscode/
*.swp

# Logs
*.log
npm-debug.log
```

### CI/CD with GitHub Actions

```yaml
# .github/workflows/publish.yml
name: Publish Theme

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: pnpm install

      - name: Build theme
        run: pnpm run build

      - name: Validate theme
        run: salla theme validate

      - name: Publish theme
        run: salla theme publish
        env:
          SALLA_TOKEN: ${{ secrets.SALLA_TOKEN }}
```

---

## Custom Component Registration

Components registered in `twilight.json` appear in the Salla Partners dashboard and can be configured by store owners.

### Component Registration Structure

```json
{
  "components": [
    {
      "name": "home.hero-banner",
      "path": "components/home/hero-banner",
      "icon": "sicon-banners",
      "label": {
        "ar": "بانر رئيسي",
        "en": "Hero Banner"
      },
      "fields": {
        "title": {
          "type": "text",
          "label": {
            "ar": "العنوان",
            "en": "Title"
          },
          "default": {
            "ar": "مرحباً بكم",
            "en": "Welcome"
          }
        },
        "subtitle": {
          "type": "textarea",
          "label": {
            "ar": "الوصف",
            "en": "Subtitle"
          }
        },
        "image": {
          "type": "image",
          "label": {
            "ar": "صورة الخلفية",
            "en": "Background Image"
          }
        },
        "button_text": {
          "type": "text",
          "label": {
            "ar": "نص الزر",
            "en": "Button Text"
          },
          "default": {
            "ar": "تسوق الآن",
            "en": "Shop Now"
          }
        },
        "button_link": {
          "type": "url",
          "label": {
            "ar": "رابط الزر",
            "en": "Button Link"
          }
        },
        "alignment": {
          "type": "select",
          "label": {
            "ar": "المحاذاة",
            "en": "Alignment"
          },
          "options": [
            { "value": "start", "label": { "ar": "يمين", "en": "Start" } },
            { "value": "center", "label": { "ar": "وسط", "en": "Center" } },
            { "value": "end", "label": { "ar": "يسار", "en": "End" } }
          ],
          "default": "start"
        },
        "show_overlay": {
          "type": "switch",
          "label": {
            "ar": "إظهار طبقة التعتيم",
            "en": "Show Overlay"
          },
          "default": true
        }
      }
    }
  ]
}
```

### Using Component Settings in Twig

```twig
{# src/views/components/home/hero-banner.twig #}
{% set title = theme.settings.get('home.hero-banner.title') %}
{% set subtitle = theme.settings.get('home.hero-banner.subtitle') %}
{% set image = theme.settings.get('home.hero-banner.image') %}
{% set buttonText = theme.settings.get('home.hero-banner.button_text') %}
{% set buttonLink = theme.settings.get('home.hero-banner.button_link') %}
{% set alignment = theme.settings.get('home.hero-banner.alignment') %}
{% set showOverlay = theme.settings.get('home.hero-banner.show_overlay') %}

<section class="relative overflow-hidden bg-gray-900 min-h-[400px] md:min-h-[600px]">
  {# Background Image #}
  {% if image %}
    <img src="{{ image|cdn }}" alt="{{ title }}" class="absolute inset-0 w-full h-full object-cover">
  {% endif %}

  {# Overlay #}
  {% if showOverlay %}
    <div class="absolute inset-0 bg-black/50"></div>
  {% endif %}

  {# Content #}
  <div class="relative container mx-auto px-4 py-20 flex items-center min-h-[400px] md:min-h-[600px]">
    <div class="max-w-2xl text-{{ alignment }} {{ alignment == 'center' ? 'mx-auto' : '' }}">
      <h1 class="text-4xl md:text-5xl font-bold text-white leading-tight">{{ title }}</h1>

      {% if subtitle %}
        <p class="mt-4 text-lg text-white/90">{{ subtitle }}</p>
      {% endif %}

      {% if buttonText and buttonLink %}
        <div class="mt-8">
          <salla-button fill="solid" color="light" size="large">
            <a href="{{ buttonLink }}">{{ buttonText }}</a>
          </salla-button>
        </div>
      {% endif %}
    </div>
  </div>
</section>
```

---

## Best Practices

### 1. Use Tailwind First, SASS Second

```scss
// ✅ Good: Use Tailwind utilities directly
.product-card {
  @apply rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow;
}

// ❌ Bad: Writing custom CSS that Tailwind already covers
.product-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

// ✅ Good: Use SASS for complex component overrides
.s-product-card-entry {
  @apply rounded-xl overflow-hidden;

  // Component-specific overrides that need nesting
  .s-product-card-content-title {
    @apply font-primary font-semibold;
  }
}
```

### 2. Test in Both RTL and LTR

```bash
# Always verify:
# - Layout direction (text, flex, grid)
# - Icon mirroring (arrows, chevrons)
# - Input alignment (text, select)
# - Spacing (margin, padding)
# - Border radius (start/end)
# - Position (start/end)

# In the browser:
# 1. Open theme preview
# 2. Switch language to Arabic (RTL)
# 3. Verify all pages render correctly
# 4. Switch language to English (LTR)
# 5. Verify all pages render correctly
```

### 3. Use Lazy Loading for Images

```twig
{# ✅ Good: Lazy load images below the fold #}
<img src="{{ product.image|cdn }}"
     alt="{{ product.name }}"
     class="w-full aspect-square object-cover"
     loading="lazy">

{# ❌ Bad: Eager loading for all images #}
<img src="{{ product.image|cdn }}"
     alt="{{ product.name }}"
     class="w-full aspect-square object-cover">

{# ✅ Good: Eager load hero/above-fold images #}
<img src="{{ hero.image|cdn }}"
     alt="{{ hero.alt }}"
     class="w-full h-[400px] object-cover"
     loading="eager"
     fetchpriority="high">
```

### 4. Use `{% hook %}` for Extensibility

```twig
{# ✅ Good: Hooks allow apps to inject content #}
<head>
  {% hook 'head:start' %}
  <link rel="stylesheet" href="{{ 'app.css'|asset }}">
  {% hook 'head:end' %}
</head>
<body>
  {% hook 'body:start' %}
  {# ... content ... #}
  {% hook 'body:end' %}
</body>

{# ❌ Bad: No hooks — apps cannot extend the theme #}
<head>
  <link rel="stylesheet" href="{{ 'app.css'|asset }}">
</head>
```

### 5. Keep JavaScript Modular (BasePage Pattern)

```javascript
// ✅ Good: Page-specific JS with class pattern
class ProductPage {
  static initiateWhenReady(pages = []) {
    const pageType = document.body.dataset.page;
    if (pages.includes(pageType)) {
      new ProductPage().onReady();
    }
  }

  onReady() {
    this.cacheElements();
    this.registerEvents();
  }

  cacheElements() {
    this.priceEl = document.querySelector('.total-price');
  }

  registerEvents() {
    salla.product.event.onPriceUpdated((res) => {
      this.priceEl.textContent = salla.money(res.data.price);
    });
  }
}

ProductPage.initiateWhenReady(['product.single']);

// ❌ Bad: Inline scripts everywhere
document.querySelector('#add-to-cart').addEventListener('click', () => {
  // Hard to maintain, no organization
});
```

### 6. Use `salla.event.*` for Inter-Component Communication

```javascript
// ✅ Good: Event-based communication
salla.event.emit('cart::item.added', { productId: 123 });
salla.event.on('cart::item.added', (data) => {
  updateCartBadge(data.productId);
});

// ❌ Bad: Direct DOM manipulation across components
document.querySelector('#cart-badge').textContent = newCount;
```

### 7. Use Theme Settings for Customization

```twig
{# ✅ Good: Use theme settings #}
{% set primaryColor = theme.color.primary %}
{% set showWishlist = theme.settings.get('show_wishlist') %}

<style>
  :root { --color-primary: {{ primaryColor }}; }
</style>

{# ❌ Bad: Hardcoded values #}
<style>
  :root { --color-primary: #2563eb; }
</style>
```

### 8. Always Use Component Translations

```twig
{# ✅ Good: Use trans() with locale files #}
<h1>{{ trans('element.featured_products') }}</h1>

{# ❌ Bad: Hardcoded text #}
<h1>Featured Products</h1>

{# ❌ Bad: Hardcoded Arabic #}
<h1>المنتجات المميزة</h1>
```

### 9. Mobile-First Responsive Design

```scss
// ✅ Good: Mobile-first with min-width breakpoints
.product-grid {
  @apply grid grid-cols-2 gap-4;           // Mobile: 2 columns
  @apply md:grid-cols-3;                   // Tablet: 3 columns
  @apply lg:grid-cols-4;                   // Desktop: 4 columns
}

// ❌ Bad: Desktop-first with max-width breakpoints
.product-grid {
  @apply grid grid-cols-4 gap-6;           // Desktop: 4 columns
  @apply md:grid-cols-3;                   // Wrong approach
  @apply sm:grid-cols-2;                   // Harder to maintain
}
```

### 10. Performance Checklist

- Use `loading="lazy"` on images below the fold
- Use `aspect-ratio` or fixed height to prevent layout shift
- Minimize JavaScript bundle size (lazy load page-specific JS)
- Use `<salla-skeleton>` for loading states
- Compress images (WebP format preferred)
- Use `{{ asset }}` filter for cache-busted URLs
- Avoid layout thrashing in JavaScript
- Batch DOM reads and writes
- Use `salla.event.*` instead of polling for state changes

---

## Debugging

### Browser DevTools

```javascript
// Check Salla SDK state
salla.config.get('theme.is_rtl');
salla.config.get('store.name');
salla.config.isGuest();

// Listen to all events for debugging
salla.event.on('*', (data) => {
  console.log('Event:', data);
});

// Cart state
salla.cart.event.onUpdated((summary) => {
  console.log('Cart summary:', summary);
});
```

### Common Issues and Solutions

| Issue | Solution |
|---|---|
| Component not rendering | Check `<salla-*>` tag name spelling, ensure Twilight is loaded |
| Styles not applying | Verify `app.css` is compiled, check Tailwind `content` paths |
| RTL layout broken | Check `dir="rtl"` on `<html>`, verify logical properties used |
| Translations missing | Ensure `ar.json` and `en.json` have all required keys |
| Hook content not appearing | Verify `{% hook %}` tags are in `master.twig` |
| Cart count not updating | Ensure `salla.cart.event.onUpdated` listener is registered |
| Product price not updating | Ensure `salla.product.event.onPriceUpdated` listener is registered |
| Asset 404 errors | Use `{{ 'filename'|asset }}` filter, run `pnpm run build` |
| Webpack build errors | Run `pnpm install` to update dependencies |
| Theme validation fails | Check `twilight.json` structure, verify all required fields |

### Salla CLI Commands Reference

| Command | Description |
|---|---|
| `salla login` | Login to Salla Partners |
| `salla logout` | Logout from Salla Partners |
| `salla whoami` | Show current login info |
| `salla theme create` | Create a new theme (interactive) |
| `salla theme preview` | Start local preview with hot reload |
| `salla theme validate` | Validate theme structure and files |
| `salla theme publish` | Publish theme to Salla Marketplace |
| `salla theme list` | List all themes |
| `salla theme info` | Show current theme info |
| `salla theme pull` | Pull theme files from remote |
| `salla theme push` | Push theme files to remote |