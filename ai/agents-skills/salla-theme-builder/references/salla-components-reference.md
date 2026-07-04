# Salla Twilight Web Components Reference

Complete reference for all Salla Twilight Web Components. Each component includes its tag name, properties, slots, events, CSS class prefix, usage examples, and RTL considerations.

---

## salla-button

The primary action component used throughout Salla themes.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `fill` | `solid \| outline \| none` | `solid` | Visual fill style |
| `color` | `primary \| success \| warning \| danger \| light \| gray \| dark` | `primary` | Button color theme |
| `size` | `large \| small \| wide` | — | Button size variant |
| `shape` | `default \| icon` | `default` | Button shape |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Show loading spinner |

### Slots

| Slot | Description |
|---|---|
| Default | Button label text |
| `icon` | Icon element before/after text |

### Events

| Event | Description |
|---|---|
| `click` | Fired on button click (native) |

### CSS Classes

| Class | Description |
|---|---|
| `.s-button-wrap` | Outer wrapper |
| `.s-button-element` | The `<button>` element |
| `.s-button-link` | Rendered as `<a>` link |
| `.s-button-icon` | Icon container |
| `.s-button-btn` | General button class |
| `.s-button-solid` | Solid fill variant |
| `.s-button-outline` | Outline fill variant |
| `.s-button-fill-none` | No fill (text-only) variant |
| `.s-button-large` | Large size |
| `.s-button-small` | Small size |
| `.s-button-wide` | Full-width size |
| `.s-button-primary` | Primary color |
| `.s-button-success` | Success/green color |
| `.s-button-warning` | Warning/yellow color |
| `.s-button-danger` | Danger/red color |
| `.s-button-light` | Light color |
| `.s-button-gray` | Gray color |
| `.s-button-dark` | Dark color |
| `.s-button-disabled` | Disabled state |
| `.s-button-loader` | Loading spinner |
| `.s-button-text` | Text node |
| `.s-button-hide` | Hidden state |

### Usage

**HTML:**
```html
<salla-button fill="solid" color="primary" size="large" loading="false">
  Add to Cart
</salla-button>
```

**Twig:**
```twig
<salla-button fill="solid" color="primary" size="large">
  {{ trans('element.add_to_cart') }}
</salla-button>
```

**Outline button:**
```twig
<salla-button fill="outline" color="danger" size="small">
  {{ trans('element.remove') }}
</salla-button>
```

**Icon button:**
```twig
<salla-button shape="icon" color="primary">
  <slot name="icon"><i class="sicon-heart"></i></slot>
</salla-button>
```

**RTL Note:** Button text alignment defaults correctly in both directions. Icon slots maintain proper logical order (`inline-start` for LTR icons, `inline-end` for RTL icons) automatically via the component's internal styles.

---

## salla-product-card

Displays a single product with image, title, price, and actions. This is the most heavily customized component in Salla themes.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `full-image` | `boolean` | `false` | Product image fills the entire card |
| `horizontal` | `boolean` | `false` | Horizontal (side-by-side) layout |
| `minimal` | `boolean` | `false` | Minimal layout — title and price only |
| `special` | `boolean` | `false` | Special/featured product styling |
| `shadow-on-hover` | `boolean` | `false` | Show shadow effect on hover |
| `show-quantity` | `boolean` | `false` | Show quantity input |
| `product` | `object` | — | Product data object (JSON) |
| `hide-add-btn` | `boolean` | `false` | Hide the add-to-cart button |

### Slots

| Slot | Description |
|---|---|
| `title` | Custom product title |
| `price` | Custom price display |
| `badge` | Custom badge (sale, new, etc.) |

### Events

| Event | Description |
|---|---|
| `salla-product-card:added` | Fired when product is added to cart |

### CSS Classes

| Class | Description |
|---|---|
| `.s-product-card-entry` | Card root container |
| `.s-product-card-image` | Image container |
| `.s-product-card-vertical` | Vertical (default) layout |
| `.s-product-card-horizontal` | Horizontal layout |
| `.s-product-card-fit-height` | Card fits available height |
| `.s-product-card-special` | Special/featured styling |
| `.s-product-card-full-image` | Full image background mode |
| `.s-product-card-minimal` | Minimal layout |
| `.s-product-card-donation` | Donation card variant |
| `.s-product-card-shadow` | Shadow state |
| `.s-product-card-out-of-stock` | Out of stock state |
| `.s-product-card-wishlist-btn` | Wishlist toggle button |
| `.s-product-card-content-main` | Main content area |
| `.s-product-card-content-sub` | Subtitle/meta area |
| `.s-product-card-content-footer` | Footer with price/actions |
| `.s-product-card-content-title` | Product title |
| `.s-product-card-content-subtitle` | Product subtitle |
| `.s-product-card-content-pie` | Pie chart (special products) |
| `.s-product-card-content-extra-padding` | Extra padding modifier |
| `.s-product-card-donation-input` | Donation amount input |
| `.s-product-card-rating` | Rating stars container |

### Usage

**Basic:**
```html
<salla-product-card product='{"id":123,"name":"Product","price":100}'></salla-product-card>
```

**Twig (standard):**
```twig
<salla-product-card product="{{ product|json_encode }}"></salla-product-card>
```

**Horizontal card:**
```twig
<salla-product-card horizontal="true" product="{{ product|json_encode }}"></salla-product-card>
```

**Full-image card:**
```twig
<salla-product-card full-image="true" shadow-on-hover="true" product="{{ product|json_encode }}"></salla-product-card>
```

**Custom product card with slots:**
```twig
<salla-product-card product="{{ product|json_encode }}" shadow-on-hover="true">
  <div slot="badge">
    <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-s-md">{{ trans('element.sale') }}</span>
  </div>
  <div slot="title" class="font-bold text-lg">{{ product.name }}</div>
</salla-product-card>
```

**RTL Note:** Horizontal cards reverse flex direction automatically in RTL. Image appears on the `inline-end` side and content on the `inline-start` side. The `.s-product-card-horizontal` class uses `flex-direction: row` which automatically reverses in RTL context.

### Custom Product Card Styling (SASS):

```scss
.s-product-card-entry {
  @apply rounded-lg overflow-hidden transition-shadow duration-300;

  &:hover {
    .s-product-card-shadow {
      @apply shadow-lg;
    }
  }

  .s-product-card-image {
    @apply relative aspect-square;
  }

  .s-product-card-content-main {
    @apply p-4;
  }

  .s-product-card-content-title {
    @apply font-primary text-sm text-dark;
  }

  .s-product-card-content-footer {
    @apply flex items-center justify-between mt-2;
  }

  // RTL: ensure price is on inline-end side
  [dir="rtl"] & {
    .s-product-card-content-footer {
      @apply flex-row-reverse;
    }
  }
}
```

---

## salla-products-list

Renders a grid/list of product cards.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `source` | `string` | — | Product data source (JSON array) |
| `limit` | `number` | `12` | Number of products to display |
| `horizontal` | `boolean` | `false` | Use horizontal card layout |
| `item-style` | `string` | — | Card style variant |

### Slots

| Slot | Description |
|---|---|
| Default | Fallback content when no products |

### Events

| Event | Description |
|---|---|
| — | — |

### Usage

```twig
<salla-products-list source="{{ products|json_encode }}" limit="8"></salla-products-list>
```

**With custom card style:**
```twig
<salla-products-list item-style="minimal" source="{{ products|json_encode }}"></salla-products-list>
```

**RTL Note:** Grid layout auto-flips in RTL. Products flow from `inline-start` to `inline-end`.

---

## salla-products-slider

Horizontal slider/carousel of product cards.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `source` | `string` | — | Product data (JSON array) |
| `limit` | `number` | `12` | Products to show |
| `horizontal` | `boolean` | `false` | Horizontal card variant |
| `autoplay` | `boolean` | `true` | Auto-slide |

### Slots

| Slot | Description |
|---|---|
| Default | Custom slide content |

### Events

| Event | Description |
|---|---|
| — | — |

### Usage

```twig
<salla-products-slider source="{{ products|json_encode }}" autoplay="true"></salla-products-slider>
```

**RTL Note:** Slider direction auto-adjusts. Navigation arrows flip (previous becomes next logically). Touch/swipe direction reverses.

---

## salla-cart-summary

Displays cart summary with items, totals, and checkout button.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| — | — | — | Data comes from Salla cart state |

### CSS Classes

| Class | Description |
|---|---|
| `.s-cart-summary` | Root container |
| `.s-cart-summary-header` | Header section |
| `.s-cart-summary-body` | Items list |
| `.s-cart-summary-footer` | Totals and checkout |
| `.s-cart-summary-item` | Individual cart item |
| `.s-cart-summary-item-image` | Item thumbnail |
| `.s-cart-summary-item-details` | Item name, options |
| `.s-cart-summary-item-price` | Item price |
| `.s-cart-summary-item-quantity` | Item quantity control |
| `.s-cart-summary-subtotal` | Subtotal row |
| `.s-cart-summary-total` | Grand total row |
| `.s-cart-summary-discount` | Discount row |
| `.s-cart-summary-shipping` | Shipping row |
| `.s-cart-summary-coupon` | Coupon section |

### Events

| Event | Description |
|---|---|
| `salla-cart-summary:updated` | Cart data updated |

### Usage

```twig
<salla-cart-summary></salla-cart-summary>
```

**RTL Note:** Item layout uses flex with `inline-start`/`inline-end` alignment. Price aligns to `inline-end` in both directions.

---

## salla-search

Full-text search component with autocomplete.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| — | — | — | Operates via internal search API |

### Slots

| Slot | Description |
|---|---|
| Default | Trigger button content |

### Events

| Event | Description |
|---|---|
| — | — |

### Usage

```twig
<salla-search></salla-search>
```

**RTL Note:** Search input text alignment inherits from `dir` attribute. Placeholder and clear icon positions auto-flip in RTL.

---

## salla-login-modal

Authentication modal with login/register forms.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Open the modal programmatically |

### Slots

| Slot | Description |
|---|---|
| Default | Custom trigger content |

### Events

| Event | Description |
|---|---|
| `salla-login-modal:opened` | Modal opened |
| `salla-login-modal:closed` | Modal closed |

### Usage

```twig
<salla-login-modal></salla-login-modal>
```

**Programmatic open:**
```javascript
document.querySelector('salla-login-modal').open = true;
```

**RTL Note:** Form fields align correctly for Arabic input. Tab order follows RTL visual order.

---

## salla-menu

Navigation menu component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| — | — | — | Menu items configured in Salla dashboard |

### Slots

| Slot | Description |
|---|---|
| Default | Custom menu content |

### Usage

```twig
<salla-menu></salla-menu>
```

**RTL Note:** Menu items flow from `inline-start` to `inline-end`. Dropdown submenus open to the `inline-end` side.

---

## salla-modal

Generic modal/dialog component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Whether modal is visible |
| `title` | `string` | — | Modal title |

### Slots

| Slot | Description |
|---|---|
| Default | Modal body content |
| `footer` | Modal footer with actions |

### CSS Classes

| Class | Description |
|---|---|
| `.s-modal` | Root container |
| `.s-modal-overlay` | Backdrop overlay |
| `.s-modal-container` | Content container |
| `.s-modal-header` | Header with title |
| `.s-modal-body` | Body content |
| `.s-modal-footer` | Footer actions |

### Events

| Event | Description |
|---|---|
| `salla-modal:opened` | Modal opened |
| `salla-modal:closed` | Modal closed |

### Usage

```twig
<salla-modal title="{{ trans('element.confirm') }}">
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <salla-button color="gray" fill="outline">Cancel</salla-button>
    <salla-button color="primary">Confirm</salla-button>
  </div>
</salla-modal>
```

**RTL Note:** Close button uses `inset-inline-start` for positioning. Content alignment inherits from `dir`.

---

## salla-select

Custom select/dropdown component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Input name attribute |
| `value` | `string` | — | Selected value |
| `placeholder` | `string` | — | Placeholder text |

### CSS Classes

| Class | Description |
|---|---|
| `.s-select` | Root container |
| `.s-select-trigger` | Visible trigger button |
| `.s-select-value` | Selected value display |
| `.s-select-placeholder` | Placeholder text |
| `.s-select-icon` | Dropdown arrow icon |
| `.s-select-menu` | Dropdown menu |
| `.s-select-option` | Individual option |
| `.s-select-option-selected` | Selected option |
| `.s-select-option-disabled` | Disabled option |

### Events

| Event | Description |
|---|---|
| `salla-select:changed` | Selection changed |

### Usage

```twig
<salla-select name="size" placeholder="{{ trans('element.choose_size') }}">
  <option value="s">Small</option>
  <option value="m">Medium</option>
  <option value="l">Large</option>
</salla-select>
```

**RTL Note:** Dropdown arrow flips to `inline-start` side. Menu alignment auto-adjusts.

---

## salla-tabs

Tab navigation component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| — | — | — | Tabs defined via slot content |

### CSS Classes

| Class | Description |
|---|---|
| `.s-tabs` | Root container |
| `.s-tabs-nav` | Tab navigation bar |
| `.s-tabs-tab` | Individual tab trigger |
| `.s-tabs-tab-active` | Active tab |
| `.s-tabs-panel` | Tab content panel |
| `.s-tabs-panel-active` | Active panel |

### Events

| Event | Description |
|---|---|
| `salla-tabs:changed` | Active tab changed |

### Usage

```twig
<salla-tabs>
  <salla-tab slot="heading" id="details">Details</salla-tab>
  <salla-tab slot="heading" id="specs">Specifications</salla-tab>
  <div id="details">Product details here...</div>
  <div id="specs">Specifications here...</div>
</salla-tabs>
```

**RTL Note:** Tab order follows RTL reading direction. Active tab underline uses `inline-start`/`inline-end`.

---

## salla-breadcrumb

Breadcrumb navigation component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| — | — | — | Auto-generated from page context |

### Usage

```twig
<salla-breadcrumb></salla-breadcrumb>
```

**RTL Note:** Breadcrumb separators (`>` or `/`) flip direction. Home icon stays at `inline-start`.

---

## salla-count-down

Countdown timer component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `date` | `string` | — | Target date (ISO format) |
| `finished` | `string` | — | Text to show when countdown ends |

### Events

| Event | Description |
|---|---|
| `salla-count-down:finished` | Countdown ended |

### Usage

```twig
<salla-count-down date="2025-12-31T23:59:59" finished="{{ trans('element.offer_ended') }}"></salla-count-down>
```

**RTL Note:** Timer digits display LTR (numbers are always LTR in Arabic). Separator alignment adjusts.

---

## salla-progress-bar

Visual progress indicator.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current progress (0-100) |
| `max` | `number` | `100` | Maximum value |

### CSS Classes

| Class | Description |
|---|---|
| `.s-progress-bar` | Root container |
| `.s-progress-bar-track` | Background track |
| `.s-progress-bar-fill` | Fill indicator |

### Usage

```twig
<salla-progress-bar value="{{ product.percentage }}" max="100"></salla-progress-bar>
```

**RTL Note:** Fill direction defaults to `inline-start` → `inline-end`, which auto-flips in RTL.

---

## salla-rating-stars

Star rating display component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Rating value (0-5) |
| `size` | `string` | `medium` | Star size (`small`, `medium`, `large`) |
| `readonly` | `boolean` | `true` | Whether user can change rating |

### CSS Classes

| Class | Description |
|---|---|
| `.s-rating-stars` | Root container |
| `.s-rating-stars-star` | Individual star |
| `.s-rating-stars-filled` | Filled star |
| `.s-rating-stars-empty` | Empty star |
| `.s-rating-stars-half` | Half-filled star |

### Usage

```twig
<salla-rating-stars value="{{ product.rating }}" size="medium"></salla-rating-stars>
```

**RTL Note:** Stars flow from `inline-start` to `inline-end` in both directions (LTR order preserved for star sequences).

---

## salla-product-options

Product options selector (size, color, weight, etc.).

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `product` | `object` | — | Product data with options |
| `type` | `string` | — | Option type filter |

### CSS Classes

| Class | Description |
|---|---|
| `.s-product-options` | Root container |
| `.s-product-options-group` | Options group (e.g., "Size") |
| `.s-product-options-group-title` | Group label |
| `.s-product-options-option` | Individual option |
| `.s-product-options-option-selected` | Selected option |
| `.s-product-options-option-disabled` | Disabled option |
| `.s-product-options-color` | Color swatch |
| `.s-product-options-color-selected` | Selected color |
| `.s-product-options-size` | Size option |
| `.s-product-options-size-selected` | Selected size |
| `.s-product-options-image` | Image option |
| `.s-product-options-image-selected` | Selected image option |

### Events

| Event | Description |
|---|---|
| `salla-product-options:changed` | Option selection changed |

### Usage

```twig
<salla-product-options product="{{ product|json_encode }}"></salla-product-options>
```

**RTL Note:** Option groups flow RTL. Color swatches and size pills maintain visual grid. Selected state uses `outline-offset` (direction-neutral).

---

## salla-quantity-input

Quantity selector with increment/decrement buttons.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `1` | Current quantity |
| `min` | `number` | `1` | Minimum value |
| `max` | `number` | `999` | Maximum value |
| `step` | `number` | `1` | Increment step |

### CSS Classes

| Class | Description |
|---|---|
| `.s-quantity-input` | Root container |
| `.s-quantity-input-button` | Increment/decrement button |
| `.s-quantity-input-button-minus` | Decrement button |
| `.s-quantity-input-button-plus` | Increment button |
| `.s-quantity-input-input` | Number input field |
| `.s-quantity-input-disabled` | Disabled state |

### Events

| Event | Description |
|---|---|
| `salla-quantity-input:changed` | Quantity value changed |

### Usage

```twig
<salla-quantity-input value="1" min="1" max="{{ product.max_quantity }}"></salla-quantity-input>
```

**RTL Note:** The `−` button appears on `inline-start`, `+` on `inline-end`. Input field is centered. This layout auto-flips in RTL.

---

## salla-offer-modal

Modal displaying special offers and promotions.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `product` | `object` | — | Product with offer data |

### Events

| Event | Description |
|---|---|
| `salla-offer-modal:opened` | Modal opened |
| `salla-offer-modal:closed` | Modal closed |

### Usage

```twig
<salla-offer-modal product="{{ product|json_encode }}"></salla-offer-modal>
```

**RTL Note:** Modal content follows RTL direction. Timer and CTA button positioned with logical properties.

---

## salla-product-availability

Shows product availability status and subscription form.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `product` | `object` | — | Product data |

### CSS Classes

| Class | Description |
|---|---|
| `.s-product-availability` | Root container |
| `.s-product-availability-status` | Status text |
| `.s-product-availability-form` | Subscription form |
| `.s-product-availability-input` | Email/mobile input |
| `.s-product-availability-button` | Subscribe button |

### Events

| Event | Description |
|---|---|
| `salla-product-availability:subscribed` | User subscribed to availability |

### Usage

```twig
<salla-product-availability product="{{ product|json_encode }}"></salla-product-availability>
```

**RTL Note:** Input alignment follows RTL. Label positioned `inline-start`.

---

## salla-add-product-button

Convenience component for adding a product to cart.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `product` | `object` | — | Product data |

### Events

| Event | Description |
|---|---|
| `salla-add-product-button:added` | Product added to cart |

### Usage

```twig
<salla-add-product-button product="{{ product|json_encode }}"></salla-add-product-button>
```

---

## salla-tel-input

Phone number input with country code selector.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | `phone` | Input name |
| `value` | `string` | — | Initial phone number |
| `placeholder` | `string` | — | Placeholder text |

### Usage

```twig
<salla-tel-input name="phone" placeholder="{{ trans('element.phone_number') }}"></salla-tel-input>
```

**RTL Note:** Country code dropdown positioned `inline-start`. Input text aligns `start` in both directions.

---

## salla-contacts

Store contact information component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| — | — | — | Data from store settings |

### Usage

```twig
<salla-contacts></salla-contacts>
```

---

## salla-payments

Payment methods display component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| — | — | — | Configured from Salla dashboard |

### Usage

```twig
<salla-payments></salla-payments>
```

---

## salla-comments

Customer comments/reviews component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `product` | Comment type (product, store) |
| `id` | `number` | — | Entity ID |

### Events

| Event | Description |
|---|---|
| `salla-comment:added` | New comment added |

### Usage

```twig
<salla-comments type="product" id="{{ product.id }}"></salla-comments>
```

**RTL Note:** Comments flow RTL. Avatar positioned `inline-start`.

---

## salla-rating-modal

Modal for submitting a product rating.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `product` | `object` | — | Product data |

### CSS Classes

| Class | Description |
|---|---|
| `.s-rating-modal` | Root container |
| `.s-rating-modal-stars` | Stars selector |
| `.s-rating-modal-comment` | Comment textarea |
| `.s-rating-modal-submit` | Submit button |

### Events

| Event | Description |
|---|---|
| `salla-rating-modal:submitted` | Rating submitted |

### Usage

```twig
<salla-rating-modal product="{{ product|json_encode }}"></salla-rating-modal>
```

---

## salla-advertisment

Banner/advertisement display component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `source` | `string` | — | Advertisement data (JSON) |

### Usage

```twig
<salla-advertisment source="{{ ad|json_encode }}"></salla-advertisment>
```

**Note:** The component tag uses the British spelling "advertisment" as defined in the Salla Twilight spec.

---

## salla-user-profile

User profile information component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| — | — | — | Data from authenticated user session |

### Usage

```twig
<salla-user-profile></salla-user-profile>
```

---

## salla-apps-icons

Display installed Salla app icons.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| — | — | — | Auto-populated from store apps |

### Usage

```twig
<salla-apps-icons></salla-apps-icons>
```

---

## salla-filters

Product listing filter component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `source` | `string` | — | Filter options data (JSON) |

### Usage

```twig
<salla-filters source="{{ filters|json_encode }}"></salla-filters>
```

**RTL Note:** Filter panel slides from `inline-start` in RTL. Filter tags align `start`. Price range slider direction auto-flips.

---

## salla-skeleton

Loading placeholder/skeleton component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `text` | Skeleton type (`text`, `image`, `card`, `avatar`) |
| `count` | `number` | `1` | Number of skeleton items |

### Usage

```twig
<salla-skeleton type="card" count="4"></salla-skeleton>
```

**RTL Note:** Skeleton animations maintain same visual pattern regardless of direction.

---

## salla-slider

Generic slider/carousel component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `autoplay` | `boolean` | `false` | Auto-advance slides |
| `dots` | `boolean` | `true` | Show navigation dots |
| `arrows` | `boolean` | `true` | Show prev/next arrows |
| `loop` | `boolean` | `true` | Loop back to start |

### Events

| Event | Description |
|---|---|
| `salla-slider:changed` | Active slide changed |

### Usage

```twig
<salla-slider autoplay="true" arrows="true" dots="true">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</salla-slider>
```

**RTL Note:** Slider direction auto-adjusts. Previous arrow appears on `inline-start`, next on `inline-end`.

---

## salla-verify

OTP/verification code input component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `mobile` | Verification type (`mobile`, `email`) |

### Events

| Event | Description |
|---|---|
| `salla-verify:success` | Verification successful |
| `salla-verify:failed` | Verification failed |

### Usage

```twig
<salla-verify type="mobile"></salla-verify>
```

**RTL Note:** Input fields flow in visual order (RTL direction). Cursor positioning auto-adjusts.

---

## salla-bottom-alert

Bottom-positioned alert/notification component.

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | — | Alert text |
| `type` | `string` | `info` | Alert type (`info`, `success`, `warning`, `danger`) |
| `duration` | `number` | `3000` | Auto-dismiss duration (ms) |

### Events

| Event | Description |
|---|---|
| `salla-bottom-alert:dismissed` | Alert dismissed |

### Usage

```twig
<salla-bottom-alert message="{{ trans('element.added_to_cart') }}" type="success" duration="3000"></salla-bottom-alert>
```

**RTL Note:** Alert position uses logical properties. In RTL, close button appears on `inline-start`.

---

## General RTL Considerations for All Components

1. **All** Salla components respect the `dir` attribute on parent elements
2. Flexbox layouts auto-reverse in RTL (`flex-direction` row reverses)
3. Grid layouts maintain column order unless explicitly overridden
4. Icons that convey direction (arrows, chevrons) should be mirrored in RTL using `transform: scaleX(-1)`
5. Text in `<salla-*>` components inherits direction from the document
6. Never set `direction: ltr` on Salla components — let them inherit from `<html dir="rtl">`
7. Spacing utilities (margin, padding) must use logical properties: `ms-*`, `me-*`, `ps-*`, `pe-*` in Tailwind
8. Test every component in both `dir="rtl"` and `dir="ltr"` modes