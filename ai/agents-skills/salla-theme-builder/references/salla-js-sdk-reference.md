# Salla JavaScript SDK Reference

Complete reference for the Salla JavaScript SDK: initialization, event system, cart API, product API, wishlist, comments, notifications, helpers, and class patterns.

---

## Initialization

### Basic Init

```javascript
salla.init({
  theme: {
    color: {
      primary: '#1232aa',
    },
  },
});
```

### onReady

```javascript
salla.onReady(() => {
  // Application is fully loaded and ready
  // All components are initialized
  // Safe to interact with Salla components
});
```

### Full Init with Theme Colors

```javascript
salla.init({
  theme: {
    color: {
      primary: '#2563eb',
      secondary: '#8b5cf6',
    },
  },
});
```

---

## Event System

### Emit Events

```javascript
// Generic event emission
salla.event.emit('eventName', data);

// Module-specific events (alias pattern)
salla.event.module.action(data); // equivalent to salla.event.emit('module::action', data)
```

### Listen to Events

```javascript
// Generic event listener
salla.event.on('eventName', (data) => {
  // Handle event
});

// Module-specific event listener (alias pattern)
salla.event.module.onAction((data) => {
  // Handle module::action event
});

// Remove event listener
salla.event.off('eventName', callback);
```

### Available Event Modules

| Module | Events |
|---|---|
| `auth` | `verified`, `logged-in`, `logged-out`, `register` |
| `cart` | `updated`, `item-added`, `item-removed`, `cleared` |
| `product` | `price.updated`, `price.updated.failed`, `availability.subscribed` |
| `wishlist` | `added`, `removed`, `toggled` |
| `comment` | `added` |
| `order` | `created`, `updated` |
| `theme` | `mode.changed` |

---

## Cart API

### Events

```javascript
// Cart contents updated (any change)
salla.cart.event.onUpdated((summary) => {
  console.log('Cart updated:', summary);
  // summary contains: items, total, subtotal, discount, shipping, count
});

// Item added to cart
salla.cart.event.onItemAdded((response, productId) => {
  console.log('Item added:', productId, response);
});

// Item removed from cart
salla.cart.event.onItemRemoved((response, productId) => {
  console.log('Item removed:', productId, response);
});
```

### Methods

```javascript
// Add item to cart
salla.cart.addItem({
  id: 123,           // Product ID
  quantity: 1,       // Quantity
  options: [],       // Selected options
}).then(response => {
  // Item added successfully
});

// Remove item from cart
salla.cart.removeItem(productId);

// Update item quantity
salla.cart.updateQuantity(productId, newQuantity);

// Clear entire cart
salla.cart.clear();
```

---

## Product API

### Dynamic Pricing

```javascript
// Get dynamic price based on selected options
// Typically called when product options change
const form = document.querySelector('#product-form');
const formData = new FormData(form);

salla.product.getPrice(formData).then(response => {
  // response.data contains updated pricing
});
```

### Price Update Events

```javascript
// Price updated successfully after option change
salla.product.event.onPriceUpdated((res) => {
  console.log('Price updated:', res.data);
  // res.data contains: price, sale_price, regular_price, discount
  // Update DOM elements showing price
});

// Price update failed (e.g., invalid combination)
salla.product.event.onPriceUpdatedFailed((err) => {
  console.log('Price update failed:', err);
  // Show error message to user
});
```

### Availability Subscription

```javascript
// Subscribe to out-of-stock product notifications
salla.product.availabilitySubscribe({
  id: 123,       // Product ID
  email: 'user@example.com',  // Email for notification
  // OR
  mobile: '+966501234567',    // Mobile for SMS notification
}).then(response => {
  console.log('Subscribed successfully');
});
```

---

## Wishlist API

```javascript
// Toggle product in wishlist (add if absent, remove if present)
salla.wishlist.toggle(productId).then(response => {
  // response.data.added: true if added, false if removed
  // Update UI accordingly
  const isAdded = response.data.added;
  updateWishlistIcon(productId, isAdded);
});

// Check if product is in wishlist
salla.wishlist.isIn(productId); // Returns boolean
```

---

## Comment API

### Add Comment

```javascript
salla.comment.add({
  type: 'product',   // Comment type: 'product', 'store', etc.
  id: 123,           // Entity ID
  comment: 'Great product!', // Comment text
}).then(response => {
  console.log('Comment added:', response);
});
```

### Comment Events

```javascript
salla.comment.event.onAdded((response) => {
  // New comment added
  // Refresh comments list
});
```

---

## Notify API

### Custom Notification Handler

```javascript
// Set a custom notifier to replace default SweetAlert2 notifications
salla.notify.setNotifier((message, type, data) => {
  // message: notification text
  // type: 'success', 'error', 'warning', 'info'
  // data: additional data object

  // Custom notification implementation
  showCustomToast(message, type);
});

// Types of notifications:
// - 'success': Green confirmation toast
// - 'error': Red error toast
// - 'warning': Yellow warning toast
// - 'info': Blue informational toast
```

### SweetAlert2 Position for RTL

```javascript
// When using default SweetAlert2, adjust position for RTL
const isRtl = salla.config.get('theme.is_rtl');

salla.notify.setNotifier((message, type, data) => {
  Swal.fire({
    text: message,
    icon: type,
    position: isRtl ? 'top-start' : 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
});
```

---

## Helpers

### Money Formatting

```javascript
// Format amount as currency string
salla.money(1500);       // "١,٥٠٠ ر.س" (Arabic) or "1,500 SAR" (English)
salla.money(99.99);      // "٩٩٫٩٩ ر.س"
```

### Number Formatting

```javascript
// Format number with locale-appropriate separators
salla.helpers.number(1500);   // "١,٥٠٠" (Arabic) or "1,500" (English)
salla.helpers.number(99.99);  // "٩٩٫٩٩"
```

### Input Helpers

```javascript
// Restrict input to digits only (useful for phone/quantity inputs)
const input = document.querySelector('#quantity-input');
salla.helpers.inputDigitsOnly(input);
```

### Configuration

```javascript
// Get configuration values
salla.config.get('theme.is_rtl');          // true (for Arabic stores)
salla.config.get('theme.color.primary');   // '#2563eb'
salla.config.get('store.name');            // 'My Store'

// Check if user is guest
salla.config.isGuest(); // Returns boolean
```

### Storage

```javascript
// Local storage wrapper
salla.storage.set('key', 'value');                    // Set value
salla.storage.get('key', 'default_value');             // Get value (with default)
salla.storage.remove('key');                           // Remove value
salla.storage.clear();                                 // Clear all
```

---

## Theme App Class Pattern

### Base AppHelpers

The `AppHelpers` class (provided by Salla's Twilight starter theme) provides common initialization utilities. Your main `App` class extends it:

```javascript
// src/assets/js/app.js
import AppHelpers from './app-helpers';

class App extends AppHelpers {
  constructor() {
    super();
    window.app = this;
  }

  loadTheApp() {
    // Call parent initialization
    this.commonThings();

    // Initialize custom features
    this.initiateNotifier();
    this.initiateMobileMenu();
    this.initAddToCart();
    this.initWishlistToggles();
    this.initLazyLoading();
    this.initSearchBar();

    // Mark app as ready
    salla.onReady(() => {
      this.status = 'ready';
      document.body.classList.add('app-ready');
    });
  }

  initiateNotifier() {
    salla.notify.setNotifier((message, type) => {
      // Custom toast notification
      const toast = document.createElement('salla-bottom-alert');
      toast.setAttribute('message', message);
      toast.setAttribute('type', type);
      document.body.appendChild(toast);
    });
  }

  initiateMobileMenu() {
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  }

  initAddToCart() {
    salla.cart.event.onItemAdded((response, productId) => {
      // Update cart badge count
      const badge = document.querySelector('[data-cart-count]');
      if (badge) {
        badge.textContent = response.data.count;
      }
    });

    salla.cart.event.onUpdated((summary) => {
      // Update cart summary in header
      const cartTotal = document.querySelector('[data-cart-total]');
      if (cartTotal) {
        cartTotal.textContent = salla.money(summary.total);
      }
    });
  }

  initWishlistToggles() {
    document.querySelectorAll('[data-wishlist-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.wishlistToggle;
        salla.wishlist.toggle(productId).then(response => {
          const isAdded = response.data.added;
          btn.classList.toggle('is-active', isAdded);
        });
      });
    });
  }

  initLazyLoading() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });
      images.forEach(img => observer.observe(img));
    } else {
      // Fallback: load all images
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  initSearchBar() {
    const searchInput = document.querySelector('[data-search-input]');
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          // Trigger search
          const query = e.target.value;
          if (query.length >= 2) {
            salla.event.emit('search::query', { query });
          }
        }, 300);
      });
    }
  }
}

// Initialize app
const app = new App();
app.loadTheApp();
```

---

## Product Page JS Pattern

Product pages use a `BasePage` pattern for organized, scoped JavaScript:

```javascript
// src/assets/js/pages/product.js
class ProductPage {
  static instances = [];

  constructor() {
    this.priceElements = {};
    this.productOptionsValid = {};
  }

  static initiateWhenReady(pages = []) {
    const pageType = document.body.dataset.page;
    if (pages.length === 0 || pages.includes(pageType)) {
      const instance = new ProductPage();
      instance.onReady();
      instance.registerEvents();
      ProductPage.instances.push(instance);
    }
  }

  onReady() {
    // Cache DOM elements
    app.watchElements({
      totalPrice: '.total-price',
      regularPrice: '.regular-price',
      addToCartBtn: '#add-to-cart-btn',
      quantityInput: 'salla-quantity-input',
      productOptions: 'salla-product-options',
    });

    this.initProductOptionValidations();
  }

  registerEvents() {
    // Price updates when options change
    salla.product.event.onPriceUpdated((res) => {
      this.updatePriceDisplay(res.data);
    });

    salla.product.event.onPriceUpdatedFailed(() => {
      this.showPriceError();
    });

    // Cart events
    salla.cart.event.onItemAdded((response, productId) => {
      this.showAddedToCartFeedback(productId);
    });

    // Wishlist toggle
    const wishlistBtn = document.querySelector('[data-wishlist-toggle]');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        salla.wishlist.toggle(wishlistBtn.dataset.wishlistToggle);
      });
    }
  }

  initProductOptionValidations() {
    const optionsForm = document.querySelector('#product-form');
    if (!optionsForm) return;

    optionsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(optionsForm);
      salla.product.getPrice(formData);
    });
  }

  updatePriceDisplay(data) {
    if (this.priceElements.totalPrice) {
      this.priceElements.totalPrice.textContent = salla.money(data.price);
    }
    if (this.priceElements.regularPrice && data.regular_price) {
      this.priceElements.regularPrice.textContent = salla.money(data.regular_price);
    }
    // Show/hide discount badge
    const discountEl = document.querySelector('.discount-badge');
    if (discountEl) {
      discountEl.classList.toggle('hidden', !data.discount);
      if (data.discount) {
        discountEl.textContent = `-${data.discount}%`;
      }
    }
  }

  showPriceError() {
    salla.notify.setNotifier((message) => {
      // Show error in price area
      const priceEl = document.querySelector('.total-price');
      if (priceEl) {
        priceEl.textContent = message;
        priceEl.classList.add('text-danger');
        setTimeout(() => priceEl.classList.remove('text-danger'), 3000);
      }
    });
  }

  showAddedToCartFeedback(productId) {
    // Visual feedback
    const btn = document.querySelector(`[data-product-id="${productId}"] salla-add-product-button`);
    if (btn) {
      btn.setAttribute('loading', 'true');
      setTimeout(() => btn.removeAttribute('loading'), 1500);
    }
  }
}

// Auto-initialize when DOM is ready
ProductPage.initiateWhenReady(['product.single']);
```

---

## Cart Page JS Pattern

```javascript
// src/assets/js/pages/cart.js
class CartPage {
  static initiateWhenReady(pages = []) {
    const pageType = document.body.dataset.page;
    if (pages.includes(pageType)) {
      const instance = new CartPage();
      instance.onReady();
      instance.registerEvents();
    }
  }

  onReady() {
    // Cache cart elements
    this.cartSummary = document.querySelector('salla-cart-summary');
  }

  registerEvents() {
    salla.cart.event.onUpdated((summary) => {
      this.updateCartSummary(summary);
    });

    salla.cart.event.onItemRemoved((response, productId) => {
      this.removeItemFromDOM(productId);
    });
  }

  updateCartSummary(summary) {
    const totalEl = document.querySelector('[data-cart-total]');
    const countEl = document.querySelector('[data-cart-count]');

    if (totalEl) {
      totalEl.textContent = salla.money(summary.total);
    }
    if (countEl) {
      countEl.textContent = summary.count;
    }
  }

  removeItemFromDOM(productId) {
    const itemEl = document.querySelector(`[data-cart-item="${productId}"]`);
    if (itemEl) {
      itemEl.classList.add('opacity-0', 'transition-all', 'duration-300');
      setTimeout(() => itemEl.remove(), 300);
    }
  }
}

CartPage.initiateWhenReady(['cart']);
```

---

## Event Communication Patterns

### Cross-Component Communication

Always use `salla.event` for inter-component communication instead of direct DOM manipulation:

```javascript
// Component A: Emit event
salla.event.emit('product:: wishlist.toggled', { productId: 123, added: true });

// Component B: Listen to event
salla.event.on('product::wishlist.toggled', (data) => {
  updateWishlistCounter(data.added ? 1 : -1);
});

// Auth events
salla.event.auth.onVerified((response, authType) => {
  console.log('User verified:', authType);
  salla.event.emit('cart::refresh', {});
});

// Theme mode change
salla.event.theme.onModeChanged((mode) => {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('theme-mode', mode);
});
```

### Event Naming Convention

```javascript
// Pattern: module::action (double-colon separator)
salla.event.emit('cart::item.added', data);
salla.event.emit('product::price.updated', data);
salla.event.emit('wishlist::toggled', data);
salla.event.emit('search::query.submitted', data);
salla.event.emit('auth::verified', data);
salla.event.emit('theme::mode.changed', data);
```

---

## Error Handling

```javascript
// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  salla.notify.setNotifier((message, type, data) => {
    if (type === 'error') {
      showErrorToast(message);
    }
  });
});

// API error handling
try {
  await salla.cart.addItem({ id: 123 });
} catch (error) {
  console.error('Failed to add item:', error);
  // Show user-friendly error message
  salla.event.emit('cart::item.add.failed', { productId: 123, error });
}

// Product price error
salla.product.event.onPriceUpdatedFailed((err) => {
  // Show error state in UI
  const priceEl = document.querySelector('.product-price');
  if (priceEl) {
    priceEl.classList.add('text-danger');
    priceEl.textContent = trans('element.price_unavailable');
  }
});
```

---

## Performance Best Practices

1. **Lazy load components** — Use `import()` for non-critical JavaScript on product/cart pages
2. **Debounce events** — Use debounce for search input and scroll handlers
3. **Batch DOM updates** — Use `requestAnimationFrame` for multiple DOM changes
4. **Use Salla events** — Prefer `salla.event.*` over direct DOM queries for state
5. **Avoid layout thrashing** — Read all DOM values, then write, don't interleave
6. **Cache selectors** — Store `document.querySelector` results in variables
7. **Use `salla.onReady`** — Don't interact with Salla components before they're initialized