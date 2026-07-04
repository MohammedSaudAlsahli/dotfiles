# Salla Twig Templates Reference

Complete reference for Salla Twig templates: variables, filters, component rendering, hooks, blocks, page templates, asset pipeline, and the twilight.json manifest.

---

## Master Layout Pattern

The master layout (`src/views/layouts/master.twig`) is the foundation of every Salla theme. It provides the HTML shell, asset pipeline, hooks, and block system.

```twig
{# src/views/layouts/master.twig #}
<!DOCTYPE html>
<html lang="{{ user.language.code }}" dir="{{ user.language.dir }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{{ store.description }}">
  <title>{{ store.name }} - {{ page_title }}</title>

  {# Hook: Head Start — apps inject CSS/meta here #}
  {% hook 'head:start' %}

  {# Theme Settings — CSS Variables #}
  <style>
    :root {
      --color-primary: {{ theme.color.primary }};
      --color-primary-dark: {{ theme.color.darker(0.15) }};
      --color-primary-light: {{ theme.color.lighter(0.15) }};
      --font-main: '{{ theme.font.name }}', -apple-system, BlinkMacSystemFont, sans-serif;
    }
  </style>

  {# Favicon #}
  <link rel="icon" href="{{ store.favicon|cdn }}">

  {# Stylesheets #}
  <link rel="stylesheet" href="{{ 'app.css'|asset }}">

  {# Hook: Head End — apps inject additional head content #}
  {% hook 'head:end' %}
</head>
<body class="font-primary text-dark bg-white {{ user.language.dir == 'rtl' ? 'rtl' : 'ltr' }}">

  {# Hook: Body Start — apps inject body-level elements #}
  {% hook 'body:start' %}

  {# Header Component #}
  {% component 'header.header' %}

  {# Main Content Block — pages extend this #}
  <main id="main-content">
    {% block content %}{% endblock %}
  </main>

  {# Footer Component #}
  {% component 'footer.footer' %}

  {# Salla Web Components #}
  <salla-login-modal></salla-login-modal>

  {# Scripts #}
  <script src="{{ 'app.js'|asset }}"></script>

  {# Scripts Block — pages inject page-specific JS #}
  {% block scripts %}{% endblock %}

  {# Hook: Body End — apps inject scripts/modals here #}
  {% hook 'body:end' %}
</body>
</html>
```

### Key Points

- `<html lang="{{ user.language.code }}" dir="{{ user.language.dir }}">` — RTL-aware from user language
- `{% hook %}` tags allow Salla apps to inject content at defined positions
- `{{ 'app.css'|asset }}` — Asset pipeline filter for cache-busted URLs
- `{{ theme.color.primary }}` — Dynamic theme colors from settings
- `{% block content %}` — Content block that page templates override
- `{% block scripts %}` — Page-specific JavaScript block

---

## Key Twig Variables

### User Variables

| Variable | Type | Description | Example |
|---|---|---|---|
| `{{ user.language.code }}` | `string` | Language code | `"ar"`, `"en"` |
| `{{ user.language.dir }}` | `string` | Text direction | `"rtl"`, `"ltr"` |
| `{{ user.type }}` | `string` | User type | `"guest"`, `"customer"` |
| `{{ user.can_access_wallet }}` | `boolean` | Wallet access | `true`, `false` |
| `{{ user.name }}` | `string` | User display name | `"محمد"` |
| `{{ user.email }}` | `string` | User email | `"user@example.com"` |
| `{{ user.avatar }}` | `string` | User avatar URL | `"https://cdn..."` |

### Theme Variables

| Variable | Type | Description | Example |
|---|---|---|---|
| `{{ theme.color.primary }}` | `string` | Primary brand color | `"#2563eb"` |
| `{{ theme.color.secondary }}` | `string` | Secondary color | `"#8b5cf6"` |
| `{{ theme.color.darker(0.15) }}` | `string` | Darkened primary | `"#1d4ed8"` |
| `{{ theme.color.lighter(0.15) }}` | `string` | Lightened primary | `"#60a5fa"` |
| `{{ theme.font.name }}` | `string` | Font family name | `"IBM Plex Sans Arabic"` |
| `{{ theme.font.path\|cdn }}` | `string` | Font CDN URL | `"https://cdn.salla.net/fonts/..."` |
| `{{ theme.settings.get('key') }}` | `mixed` | Get theme setting value | `"value"` |
| `{{ theme.settings.set('key', 'value') }}` | `void` | Set default setting value | — |

### Store Variables

| Variable | Type | Description | Example |
|---|---|---|---|
| `{{ store.name }}` | `string` | Store name | `"متجر أحمد"` |
| `{{ store.description }}` | `string` | Store description | `"أفضل المنتجات..."` |
| `{{ store.logo }}` | `string` | Store logo URL | `"https://cdn..."` |
| `{{ store.favicon }}` | `string` | Favicon URL | `"https://cdn..."` |
| `{{ store.url }}` | `string` | Store URL | `"https://store.salla.sa"` |
| `{{ store.currency }}` | `string` | Currency code | `"SAR"` |

---

## Component Rendering

### Built-in Component Rendering

```twig
{# Render header component #}
{% component 'header.header' %}

{# Render footer component #}
{% component 'footer.footer' %}
```

### Using Salla Web Components in Twig

```twig
{# Product card with dynamic data #}
<salla-product-card product="{{ product|json_encode }}" shadow-on-hover="true"></salla-product-card>

{# Products slider #}
<salla-products-slider source="{{ featured_products|json_encode }}" autoplay="true"></salla-products-slider>

{# Button #}
<salla-button fill="solid" color="primary" size="large">
  {{ trans('element.add_to_cart') }}
</salla-button>

{# Search #}
<salla-search></salla-search>

{# Login modal #}
<salla-login-modal></salla-login-modal>

{# Cart summary (uses global cart state) #}
<salla-cart-summary></salla-cart-summary>

{# Countdown #}
<salla-count-down date="{{ offer.end_date }}" finished="{{ trans('element.offer_ended') }}"></salla-count-down>

{# Breadcrumb #}
<salla-breadcrumb></salla-breadcrumb>

{# Rating stars #}
<salla-rating-stars value="{{ product.rating }}" size="small"></salla-rating-stars>

{# Product options #}
<salla-product-options product="{{ product|json_encode }}"></salla-product-options>

{# Quantity input #}
<salla-quantity-input value="1" min="1" max="{{ product.max_quantity }}"></salla-quantity-input>

{# Select dropdown #}
<salla-select name="size" placeholder="{{ trans('element.choose_size') }}">
  <option value="s">{{ trans('element.size_s') }}</option>
  <option value="m">{{ trans('element.size_m') }}</option>
  <option value="l">{{ trans('element.size_l') }}</option>
</salla-select>

{# Tabs #}
<salla-tabs>
  <salla-tab slot="heading" id="description">{{ trans('element.description') }}</salla-tab>
  <salla-tab slot="heading" id="specs">{{ trans('element.specifications') }}</salla-tab>
  <div id="description">{{ product.description }}</div>
  <div id="specs">{{ product.specifications }}</div>
</salla-tabs>

{# Modal #}
<salla-modal title="{{ trans('element.confirm_delete') }}">
  <p>{{ trans('element.confirm_delete_message') }}</p>
  <div slot="footer">
    <salla-button color="gray" fill="outline">{{ trans('element.cancel') }}</salla-button>
    <salla-button color="danger">{{ trans('element.delete') }}</salla-button>
  </div>
</salla-modal>
```

---

## Hooks System

Hooks are extension points that allow Salla apps and plugins to inject content into your theme.

### Available Hooks

| Hook | Location | Use Case |
|---|---|---|
| `{% hook 'head:start' %}` | Before CSS in `<head>` | App CSS, meta tags |
| `{% hook 'head:end' %}` | After CSS in `<head>` | App head scripts |
| `{% hook 'body:start' %}` | After `<body>` opening | App body elements |
| `{% hook 'body:end' %}` | Before `</body>` | App scripts, modals |

### Hook Usage

```twig
{# In master.twig #}
<head>
  {% hook 'head:start' %}
  <link rel="stylesheet" href="{{ 'app.css'|asset }}">
  {% hook 'head:end' %}
</head>
<body>
  {% hook 'body:start' %}

  {# Page content #}

  {% hook 'body:end' %}
</body>
```

### Custom Hooks (in page templates)

You can define custom hooks for your own extension points:

```twig
{# In home.twig #}
{% block content %}
  <section class="hero">
    {% hook 'home:hero:start' %}
    {# Hero content #}
    {% hook 'home:hero:end' %}
  </section>

  <section class="products">
    {% hook 'home:products:start' %}
    {# Products grid #}
    {% hook 'home:products:end' %}
  </section>
{% endblock %}
```

---

## Asset Pipeline

### CSS Assets

```twig
{# Main stylesheet #}
<link rel="stylesheet" href="{{ 'app.css'|asset }}">

{# Component-specific CSS (rare — most use Tailwind) #}
<link rel="stylesheet" href="{{ 'product-card.css'|asset }}">
```

### JavaScript Assets

```twig
{# Main application JS #}
<script src="{{ 'app.js'|asset }}"></script>

{# Component-specific JS (loaded via webpack) #}
<script src="{{ 'product-card.js'|asset }}"></script>

{# Menu JS #}
<script src="{{ 'main-menu.js'|asset }}"></script>
```

### CDN Filter

```twig
{# Images and fonts use CDN #}
<img src="{{ product.image.url|cdn }}" alt="{{ product.name }}">
<link rel="stylesheet" href="{{ theme.font.path|cdn }}">
```

### Custom Assets

```twig
{# Theme-specific assets #}
<link rel="stylesheet" href="{{ 'custom-slider.css'|asset }}">
<script src="{{ 'custom-slider.js'|asset }}"></script>
```

---

## Block System

### Defining Blocks (master.twig)

```twig
<!DOCTYPE html>
<html lang="{{ user.language.code }}" dir="{{ user.language.dir }}">
<head>
  {# ... head content ... #}
</head>
<body>
  {% component 'header.header' %}

  <main>
    {% block content %}{% endblock %}
  </main>

  {% component 'footer.footer' %}

  {% block scripts %}{% endblock %}
</body>
</html>
```

### Extending Blocks (page templates)

```twig
{# src/views/pages/home.twig #}
{% extends 'layouts.master' %}

{% block content %}
  <section class="hero bg-primary text-white py-20">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold">{{ store.name }}</h1>
      <p class="mt-4 text-lg">{{ store.description }}</p>
      <salla-button color="light" size="large" class="mt-6">
        {{ trans('element.shop_now') }}
      </salla-button>
    </div>
  </section>

  <section class="featured-products py-16">
    <div class="container mx-auto">
      <h2 class="text-2xl font-bold mb-8">{{ trans('element.featured_products') }}</h2>
      <salla-products-slider source="{{ featured_products|json_encode }}" autoplay="true"></salla-products-slider>
    </div>
  </section>
{% endblock %}

{% block scripts %}
  <script>
    // Homepage-specific JavaScript
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Homepage loaded');
    });
  </script>
{% endblock %}
```

---

## Page Templates

### Home Page (home.twig)

```twig
{% extends 'layouts.master' %}

{% block content %}
  {# Hero Section #}
  <section class="hero-section relative overflow-hidden">
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-bold text-dark leading-tight">
          {{ trans('element.hero_title') }}
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          {{ trans('element.hero_subtitle') }}
        </p>
        <div class="mt-8 flex gap-4">
          <salla-button fill="solid" color="primary" size="large">
            {{ trans('element.shop_now') }}
          </salla-button>
          <salla-button fill="outline" color="dark" size="large">
            {{ trans('element.learn_more') }}
          </salla-button>
        </div>
      </div>
    </div>
  </section>

  {# Featured Products #}
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-dark">{{ trans('element.featured_products') }}</h2>
        <a href="/products" class="text-primary hover:underline">{{ trans('element.view_all') }}</a>
      </div>
      <salla-products-slider source="{{ featured_products|json_encode }}" autoplay="true"></salla-products-slider>
    </div>
  </section>

  {# Categories Grid #}
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-dark mb-8">{{ trans('element.categories') }}</h2>
      <salla-slider autoplay="true" dots="true">
        {% for category in categories %}
          <a href="{{ category.url }}" class="block p-4">
            <div class="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <img src="{{ category.image|cdn }}" alt="{{ category.name }}" class="w-full aspect-video object-cover">
              <h3 class="p-4 text-center font-bold">{{ category.name }}</h3>
            </div>
          </a>
        {% endfor %}
      </salla-slider>
    </div>
  </section>

  {# Offer Section #}
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="bg-primary rounded-2xl p-8 md:p-12 text-white">
        <h2 class="text-3xl font-bold">{{ trans('element.special_offer') }}</h2>
        <p class="mt-2 text-opacity-90">{{ trans('element.offer_description') }}</p>
        <salla-count-down date="{{ offer.end_date }}" class="mt-6"></salla-count-down>
        <salla-button fill="outline" color="light" size="large" class="mt-6">
          {{ trans('element.shop_offer') }}
        </salla-button>
      </div>
    </div>
  </section>
{% endblock %}
```

### Product Page (product.twig)

```twig
{% extends 'layouts.master' %}

{% block content %}
  <div class="container mx-auto px-4 py-8" data-page="product.single">

    {# Breadcrumb #}
    <salla-breadcrumb class="mb-6"></salla-breadcrumb>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

      {# Product Image #}
      <div class="product-images">
        <div class="rounded-xl overflow-hidden bg-gray-100">
          <img id="main-product-image"
               src="{{ product.main_image.url|cdn }}"
               alt="{{ product.name }}"
               class="w-full aspect-square object-cover">
        </div>

        {# Thumbnail Gallery #}
        {% if product.images|length > 1 %}
          <div class="flex gap-2 mt-4 overflow-x-auto pb-2">
            {% for image in product.images %}
              <button onclick="document.getElementById('main-product-image').src='{{ image.url|cdn }}'"
                      class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors">
                <img src="{{ image.url|cdn }}" alt="{{ product.name }}" class="w-full h-full object-cover">
              </button>
            {% endfor %}
          </div>
        {% endif %}
      </div>

      {# Product Details #}
      <div class="product-details">

        {# Product Name #}
        <h1 class="text-2xl md:text-3xl font-bold text-dark">{{ product.name }}</h1>

        {# Rating #}
        {% if product.rating %}
          <div class="flex items-center gap-2 mt-3">
            <salla-rating-stars value="{{ product.rating }}" size="small"></salla-rating-stars>
            <span class="text-sm text-gray-500">({{ product.reviews_count }})</span>
          </div>
        {% endif %}

        {# Price #}
        <div class="mt-4 flex items-baseline gap-3">
          <span class="total-price text-3xl font-bold text-primary">{{ product.price }}</span>
          {% if product.regular_price %}
            <span class="regular-price text-lg text-gray-400 line-through">{{ product.regular_price }}</span>
          {% endif %}
          {% if product.discount %}
            <span class="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-s-md">-{{ product.discount }}%</span>
          {% endif %}
        </div>

        {# Product Options #}
        {% if product.options|length > 0 %}
          <form id="product-form" class="mt-6">
            <salla-product-options product="{{ product|json_encode }}"></salla-product-options>
          </form>
        {% endif %}

        {# Quantity & Add to Cart #}
        <div class="mt-6 flex items-center gap-4">
          <salla-quantity-input value="1" min="1" max="{{ product.max_quantity }}"></salla-quantity-input>
          <salla-add-product-button product="{{ product|json_encode }}" class="flex-1">
            {{ trans('element.add_to_cart') }}
          </salla-add-product-button>
        </div>

        {# Wishlist #}
        <button data-wishlist-toggle="{{ product.id }}"
                class="mt-4 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
          <i class="sicon-heart"></i>
          <span>{{ trans('element.add_to_wishlist') }}</span>
        </button>

        {# Product Description Tabs #}
        <div class="mt-8">
          <salla-tabs>
            <salla-tab slot="heading" id="description">{{ trans('element.description') }}</salla-tab>
            <salla-tab slot="heading" id="specs">{{ trans('element.specifications') }}</salla-tab>
            <div id="description" class="prose max-w-none">
              {{ product.description|raw }}
            </div>
            <div id="specs" class="prose max-w-none">
              {{ product.specifications|raw }}
            </div>
          </salla-tabs>
        </div>

        {# Comments/Reviews #}
        <div class="mt-8">
          <salla-comments type="product" id="{{ product.id }}"></salla-comments>
        </div>

        {# Product Availability (for out-of-stock) #}
        {% if not product.in_stock %}
          <salla-product-availability product="{{ product|json_encode }}"></salla-product-availability>
        {% endif %}
      </div>
    </div>

    {# Related Products #}
    <section class="mt-16">
      <h2 class="text-2xl font-bold text-dark mb-6">{{ trans('element.related_products') }}</h2>
      <salla-products-slider source="{{ related_products|json_encode }}"></salla-products-slider>
    </section>
  </div>
{% endblock %}

{% block scripts %}
  <script src="{{ 'product.js'|asset }}"></script>
{% endblock %}
```

### Products Listing Page (products.twig)

```twig
{% extends 'layouts.master' %}

{% block content %}
  <div class="container mx-auto px-4 py-8">
    <salla-breadcrumb class="mb-6"></salla-breadcrumb>

    <div class="flex flex-col md:flex-row gap-8">

      {# Filters Sidebar #}
      <aside class="w-full md:w-64 flex-shrink-0">
        <salla-filters source="{{ filters|json_encode }}"></salla-filters>
      </aside>

      {# Products Grid #}
      <div class="flex-1">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-bold text-dark">{{ page_title }}</h1>
          <span class="text-sm text-gray-500">{{ products|length }} {{ trans('element.products') }}</span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {% for product in products %}
            <salla-product-card product="{{ product|json_encode }}" shadow-on-hover="true"></salla-product-card>
          {% endfor %}
        </div>

        {# Pagination #}
        {% if products.has_more %}
          <div class="mt-8 text-center">
            <salla-button fill="outline" color="primary">
              {{ trans('element.load_more') }}
            </salla-button>
          </div>
        {% endif %}
      </div>
    </div>
  </div>
{% endblock %}
```

### Cart Page (cart.twig)

```twig
{% extends 'layouts.master' %}

{% block content %}
  <div class="container mx-auto px-4 py-8" data-page="cart">
    <salla-breadcrumb class="mb-6"></salla-breadcrumb>

    <h1 class="text-2xl font-bold text-dark mb-8">{{ trans('element.cart') }}</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {# Cart Items #}
      <div class="lg:col-span-2">
        <salla-cart-summary></salla-cart-summary>
      </div>

      {# Order Summary Sidebar #}
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
          <h2 class="text-lg font-bold text-dark mb-4">{{ trans('element.order_summary') }}</h2>

          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">{{ trans('element.subtotal') }}</span>
              <span class="font-medium" data-cart-subtotal>{{ cart.subtotal }}</span>
            </div>

            {% if cart.discount %}
              <div class="flex justify-between text-sm text-green-600">
                <span>{{ trans('element.discount') }}</span>
                <span>-{{ cart.discount }}</span>
              </div>
            {% endif %}

            <div class="flex justify-between text-sm">
              <span class="text-gray-600">{{ trans('element.shipping') }}</span>
              <span>{{ cart.shipping }}</span>
            </div>

            <hr class="border-gray-200">

            <div class="flex justify-between text-lg font-bold">
              <span>{{ trans('element.total') }}</span>
              <span class="text-primary" data-cart-total>{{ cart.total }}</span>
            </div>
          </div>

          <salla-button fill="solid" color="primary" size="wide" class="mt-6">
            {{ trans('element.proceed_to_checkout') }}
          </salla-button>

          <salla-payments></salla-payments>
        </div>
      </div>
    </div>
  </div>
{% endblock %}
```

### Brands Page (brands.twig)

```twig
{% extends 'layouts.master' %}

{% block content %}
  <div class="container mx-auto px-4 py-8">
    <salla-breadcrumb class="mb-6"></salla-breadcrumb>

    <h1 class="text-2xl font-bold text-dark mb-8">{{ trans('element.brands') }}</h1>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {% for brand in brands %}
        <a href="{{ brand.url }}" class="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
          <img src="{{ brand.logo|cdn }}" alt="{{ brand.name }}" class="w-16 h-16 mx-auto object-contain">
          <h3 class="mt-3 font-medium text-sm">{{ brand.name }}</h3>
        </a>
      {% endfor %}
    </div>
  </div>
{% endblock %}
```

### Categories Page (categories.twig)

```twig
{% extends 'layouts.master' %}

{% block content %}
  <div class="container mx-auto px-4 py-8">
    <salla-breadcrumb class="mb-6"></salla-breadcrumb>

    <h1 class="text-2xl font-bold text-dark mb-8">{{ trans('element.categories') }}</h1>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {% for category in categories %}
        <a href="{{ category.url }}" class="block group">
          <div class="rounded-xl overflow-hidden bg-gray-100 aspect-[4/3]">
            <img src="{{ category.image|cdn }}" alt="{{ category.name }}"
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          </div>
          <h3 class="mt-3 font-bold text-center">{{ category.name }}</h3>
        </a>
      {% endfor %}
    </div>
  </div>
{% endblock %}
```

### Static Page (page.twig)

```twig
{% extends 'layouts.master' %}

{% block content %}
  <div class="container mx-auto px-4 py-8">
    <salla-breadcrumb class="mb-6"></salla-breadcrumb>

    <article class="prose max-w-none">
      <h1 class="text-3xl font-bold text-dark mb-6">{{ page.title }}</h1>
      <div class="text-gray-700 leading-relaxed">
        {{ page.content|raw }}
      </div>
    </article>
  </div>
{% endblock %}
```

---

## Snippets (Reusable Partials)

### Product Card Snippet

```twig
{# src/views/snippets/product-card.twig #}
<article class="product-card group" data-product-id="{{ product.id }}">
  <div class="relative rounded-xl overflow-hidden bg-gray-100 aspect-square">
    <a href="{{ product.url }}">
      <img src="{{ product.main_image.url|cdn }}"
           alt="{{ product.name }}"
           class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
           loading="lazy">
    </a>

    {# Discount Badge #}
    {% if product.discount %}
      <span class="absolute start-2 top-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
        -{{ product.discount }}%
      </span>
    {% endif %}

    {# Wishlist Button #}
    <button data-wishlist-toggle="{{ product.id }}"
            class="absolute end-2 top-2 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
      <i class="sicon-heart text-sm"></i>
    </button>
  </div>

  <div class="mt-3">
    <a href="{{ product.url }}" class="block text-sm font-medium text-dark hover:text-primary line-clamp-2">
      {{ product.name }}
    </a>

    <div class="flex items-baseline gap-2 mt-2">
      <span class="font-bold text-primary">{{ product.price }}</span>
      {% if product.regular_price %}
        <span class="text-xs text-gray-400 line-through">{{ product.regular_price }}</span>
      {% endif %}
    </div>
  </div>
</article>
```

### Header Component Snippet

```twig
{# src/views/components/header/index.twig #}
<header class="bg-white shadow-sm sticky top-0 z-40">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">

      {# Logo #}
      <a href="/" class="flex items-center gap-2">
        <img src="{{ store.logo|cdn }}" alt="{{ store.name }}" class="h-10">
        {% if not store.logo %}
          <span class="text-xl font-bold text-primary">{{ store.name }}</span>
        {% endif %}
      </a>

      {# Search #}
      <div class="hidden md:flex flex-1 max-w-xl mx-8">
        <salla-search></salla-search>
      </div>

      {# Actions #}
      <div class="flex items-center gap-4">

        {# Wishlist #}
        <a href="/wishlist" class="relative p-2 text-gray-600 hover:text-primary transition-colors">
          <i class="sicon-heart text-xl"></i>
          <span data-wishlist-count class="absolute -top-1 -end-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
        </a>

        {# Cart #}
        <a href="/cart" class="relative p-2 text-gray-600 hover:text-primary transition-colors">
          <i class="sicon-cart text-xl"></i>
          <span data-cart-count class="absolute -top-1 -end-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
        </a>

        {# User #}
        {% if user.type == 'guest' %}
          <button onclick="document.querySelector('salla-login-modal').open = true"
                  class="p-2 text-gray-600 hover:text-primary transition-colors">
            <i class="sicon-user text-xl"></i>
          </button>
        {% else %}
          <salla-user-profile></salla-user-profile>
        {% endif %}

        {# Mobile Menu Toggle #}
        <button data-menu-toggle class="md:hidden p-2 text-gray-600">
          <i class="sicon-menu text-xl"></i>
        </button>
      </div>
    </div>
  </div>

  {# Mobile Menu #}
  <nav data-mobile-menu class="hidden md:hidden border-t border-gray-200">
    <salla-menu></salla-menu>
  </nav>
</header>
```

### Footer Component Snippet

```twig
{# src/views/components/footer/index.twig #}
<footer class="bg-dark text-white mt-16">
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      {# Store Info #}
      <div>
        <img src="{{ store.logo|cdn }}" alt="{{ store.name }}" class="h-10 mb-4 brightness-0 invert">
        <p class="text-gray-400 text-sm leading-relaxed">{{ store.description }}</p>
      </div>

      {# Quick Links #}
      <div>
        <h3 class="font-bold mb-4">{{ trans('element.quick_links') }}</h3>
        <salla-menu></salla-menu>
      </div>

      {# Contact #}
      <div>
        <h3 class="font-bold mb-4">{{ trans('element.contact_us') }}</h3>
        <salla-contacts></salla-contacts>
      </div>

      {# Social & Apps #}
      <div>
        <h3 class="font-bold mb-4">{{ trans('element.download_app') }}</h3>
        <salla-apps-icons></salla-apps-icons>
      </div>
    </div>

    {# Payment Methods #}
    <div class="mt-8 pt-8 border-t border-gray-700">
      <salla-payments></salla-payments>
    </div>

    {# Copyright #}
    <div class="mt-8 text-center text-gray-500 text-sm">
      <p>&copy; {{ "now"|date("Y") }} {{ store.name }}. {{ trans('element.all_rights_reserved') }}</p>
    </div>
  </div>
</footer>
```

---

## Translations (i18n)

### Arabic (ar.json) — Primary

```json
{
  "element": {
    "add_to_cart": "أضف إلى السلة",
    "shop_now": "تسوق الآن",
    "learn_more": "معرفة المزيد",
    "view_all": "عرض الكل",
    "featured_products": "المنتجات المميزة",
    "categories": "الاقسام",
    "special_offer": "عرض خاص",
    "offer_description": "استفد من عروضنا المميزة",
    "offer_ended": "انتهى العرض",
    "shop_offer": "تسوق العرض",
    "hero_title": "اكتشف أفضل المنتجات",
    "hero_subtitle": "تسوق من مجموعتنا المميزة بأفضل الأسعار",
    "description": "الوصف",
    "specifications": "المواصفات",
    "related_products": "منتجات ذات صلة",
    "products": "منتج",
    "load_more": "تحميل المزيد",
    "cart": "سلة التسوق",
    "order_summary": "ملخص الطلب",
    "subtotal": "المجموع الفرعي",
    "discount": "الخصم",
    "shipping": "الشحن",
    "total": "المجموع",
    "proceed_to_checkout": "إتمام الطلب",
    "brands": "الماركات",
    "quick_links": "روابط سريعة",
    "contact_us": "تواصل معنا",
    "download_app": "حمّل التطبيق",
    "all_rights_reserved": "جميع الحقوق محفوظة",
    "choose_size": "اختر المقاس",
    "size_s": "صغير",
    "size_m": "متوسط",
    "size_l": "كبير",
    "cancel": "إلغاء",
    "delete": "حذف",
    "confirm_delete": "تأكيد الحذف",
    "confirm_delete_message": "هل أنت متأكد من حذف هذا العنصر؟",
    "add_to_wishlist": "أضف إلى المفضلة",
    "price_unavailable": "السعر غير متاح",
    "sale": "تخفيض",
    "search": "بحث",
    "phone_number": "رقم الجوال"
  }
}
```

### English (en.json)

```json
{
  "element": {
    "add_to_cart": "Add to Cart",
    "shop_now": "Shop Now",
    "learn_more": "Learn More",
    "view_all": "View All",
    "featured_products": "Featured Products",
    "categories": "Categories",
    "special_offer": "Special Offer",
    "offer_description": "Take advantage of our special offers",
    "offer_ended": "Offer Ended",
    "shop_offer": "Shop the Offer",
    "hero_title": "Discover the Best Products",
    "hero_subtitle": "Shop from our curated collection at the best prices",
    "description": "Description",
    "specifications": "Specifications",
    "related_products": "Related Products",
    "products": "Products",
    "load_more": "Load More",
    "cart": "Shopping Cart",
    "order_summary": "Order Summary",
    "subtotal": "Subtotal",
    "discount": "Discount",
    "shipping": "Shipping",
    "total": "Total",
    "proceed_to_checkout": "Proceed to Checkout",
    "brands": "Brands",
    "quick_links": "Quick Links",
    "contact_us": "Contact Us",
    "download_app": "Download App",
    "all_rights_reserved": "All Rights Reserved",
    "choose_size": "Choose Size",
    "size_s": "Small",
    "size_m": "Medium",
    "size_l": "Large",
    "cancel": "Cancel",
    "delete": "Delete",
    "confirm_delete": "Confirm Delete",
    "confirm_delete_message": "Are you sure you want to delete this item?",
    "add_to_wishlist": "Add to Wishlist",
    "price_unavailable": "Price Unavailable",
    "sale": "Sale",
    "search": "Search",
    "phone_number": "Phone Number"
  }
}
```

### Using Translations in Twig

```twig
{# Simple translation #}
{{ trans('element.add_to_cart') }}

{# Translation with parameters #}
{{ trans('element.items_count', {'count': 5}) }}
```

---

## twilight.json Manifest

The `twilight.json` file is the theme manifest that defines theme metadata, settings, and component registrations.

```json
{
  "name": {
    "ar": "اسم القالب",
    "en": "Theme Name"
  },
  "version": "1.0.0",
  "author": {
    "name": "Author Name",
    "url": "https://author-url.com"
  },
  "description": {
    "ar": "وصف القالب",
    "en": "Theme description"
  },
  "preview": "https://store-url.salla.sa",
  "license": "MIT",
  "salla": {
    "version": ">=2.0"
  },
  "settings": {
    "color": {
      "primary": {
        "type": "color",
        "label": {
          "ar": "اللون الرئيسي",
          "en": "Primary Color"
        },
        "default": "#2563eb"
      },
      "secondary": {
        "type": "color",
          "ar": "اللون الثانوي",
          "en": "Secondary Color"
        },
        "default": "#8b5cf6"
      }
    },
    "font": {
      "name": {
        "type": "font",
        "label": {
          "ar": "الخط الرئيسي",
          "en": "Primary Font"
        },
        "default": "IBM Plex Sans Arabic"
      }
    },
    "layout": {
      "container_width": {
        "type": "select",
        "label": {
          "ar": "عرض المحتوى",
          "en": "Container Width"
        },
        "options": [
          { "value": "narrow", "label": { "ar": "ضيق", "en": "Narrow" } },
          { "value": "wide", "label": { "ar": "واسع", "en": "Wide" } },
          { "value": "full", "label": { "ar": "كامل", "en": "Full Width" } }
        ],
        "default": "wide"
      },
      "header_style": {
        "type": "select",
        "label": {
          "ar": "نمط الهيدر",
          "en": "Header Style"
        },
        "options": [
          { "value": "minimal", "label": { "ar": "بسيط", "en": "Minimal" } },
          { "value": "standard", "label": { "ar": "قياسي", "en": "Standard" } },
          { "value": "extended", "label": { "ar": "ممتد", "en": "Extended" } }
        ],
        "default": "standard"
      }
    },
    "features": {
      "show_wishlist": {
        "type": "switch",
        "label": {
          "ar": "إظهار المفضلة",
          "en": "Show Wishlist"
        },
        "default": true
      },
      "show_quick_view": {
        "type": "switch",
        "label": {
          "ar": "عرض سريع",
          "en": "Quick View"
        },
        "default": true
      },
      "show_product_rating": {
        "type": "switch",
        "label": {
          "ar": "إظهار التقييم",
          "en": "Show Ratings"
        },
        "default": true
      },
      "infinite_scroll": {
        "type": "switch",
        "label": {
          "ar": "التمرير اللانهائي",
          "en": "Infinite Scroll"
        },
        "default": false
      }
    }
  },
  "components": [
    {
      "name": "home.featured-slider",
      "path": "components/home/featured-slider",
      "icon": "sicon-slider",
      "label": {
        "ar": "شريط المنتجات المميزة",
        "en": "Featured Products Slider"
      },
      "fields": {
        "title": {
          "type": "text",
          "label": {
            "ar": "العنوان",
            "en": "Title"
          },
          "default": {
            "ar": "منتجات مميزة",
            "en": "Featured Products"
          }
        },
        "limit": {
          "type": "number",
          "label": {
            "ar": "عدد المنتجات",
            "en": "Products Limit"
          },
          "default": 8
        },
        "autoplay": {
          "type": "switch",
          "label": {
            "ar": "تشغيل تلقائي",
            "en": "Autoplay"
          },
          "default": true
        }
      }
    },
    {
      "name": "home.category-grid",
      "path": "components/home/category-grid",
      "icon": "sicon-grid",
      "label": {
        "ar": "شبكة الأقسام",
        "en": "Categories Grid"
      },
      "fields": {
        "columns": {
          "type": "select",
          "label": {
            "ar": "عدد الأعمدة",
            "en": "Columns"
          },
          "options": [
            { "value": "3", "label": { "ar": "3 أعمدة", "en": "3 Columns" } },
            { "value": "4", "label": { "ar": "4 أعمدة", "en": "4 Columns" } },
            { "value": "6", "label": { "ar": "6 أعمدة", "en": "6 Columns" } }
          ],
          "default": "4"
        }
      }
    },
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
        }
      }
    },
    {
      "name": "home.offer-section",
      "path": "components/home/offer-section",
      "icon": "sicon-offer",
      "label": {
        "ar": "قسم العروض",
        "en": "Offer Section"
      },
      "fields": {
        "title": {
          "type": "text",
          "label": {
            "ar": "عنوان العرض",
            "en": "Offer Title"
          }
        },
        "end_date": {
          "type": "date",
          "label": {
            "ar": "تاريخ الانتهاء",
            "en": "End Date"
          }
        },
        "background_color": {
          "type": "color",
          "label": {
            "ar": "لون الخلفية",
            "en": "Background Color"
          },
          "default": "#2563eb"
        }
      }
    }
  ]
}
```

### Using Settings in Twig

```twig
{# Get theme setting value #}
{% set showWishlist = theme.settings.get('show_wishlist') %}
{% set headerStyle = theme.settings.get('header_style') %}
{% set containerWidth = theme.settings.get('container_width') %}

{# Use in conditional rendering #}
{% if showWishlist %}
  <button data-wishlist-toggle="{{ product.id }}">
    <i class="sicon-heart"></i>
  </button>
{% endif %}

{# Set default values #}
{{ theme.settings.set('show_wishlist', true) }}
{{ theme.settings.set('container_width', 'wide') }}
```

### Setting Field Types

| Type | Description | Usage |
|---|---|---|
| `text` | Single-line text input | Titles, names, labels |
| `textarea` | Multi-line text input | Descriptions, content |
| `number` | Numeric input | Limits, counts, dimensions |
| `color` | Color picker | Brand colors |
| `font` | Font selector | Typography |
| `select` | Dropdown with options | Layout variants, styles |
| `switch` | Toggle on/off | Feature flags |
| `image` | Image uploader | Banners, backgrounds |
| `url` | URL input | Links |
| `date` | Date picker | Offer end dates |