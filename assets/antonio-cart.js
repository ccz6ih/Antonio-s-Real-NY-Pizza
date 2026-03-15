/**
 * antonio-cart.js
 * Vanilla JS cart manager for Antonio's Real NY Pizza.
 *
 * Exposes: window.AntonioCart
 *   .refresh()                              — fetch /cart.json and sync all cart UI
 *   .addItem(variantId, qty, properties)    — POST to /cart/add.json, then refresh + pulse
 *   .openDrawer()                           — open Savor cart drawer
 *
 * Event integrations:
 *   Listens:   'cart:updated'  (custom, dispatched internally after add/refresh)
 *              'cart:update'   (Savor ThemeEvents.cartUpdate — dispatched by Savor internals)
 *   Dispatches:'cart:updated'  (custom, carries { count, total, totalRaw, items })
 *              'cart:open'     (custom, fallback drawer trigger)
 *
 * No jQuery. Vanilla JS only. Works with Savor theme's native cart drawer.
 */

(function () {
  'use strict';

  /* ────────────────────────────────────────────────────────────
     Internal state
  ──────────────────────────────────────────────────────────── */
  var _cart = null; // last known cart.json payload

  /* ────────────────────────────────────────────────────────────
     DOM helpers — target IDs used by antonio-floating-cart
  ──────────────────────────────────────────────────────────── */
  function el(id) {
    return document.getElementById(id);
  }

  /* ────────────────────────────────────────────────────────────
     Format money — mirrors Shopify's money_format (no currency symbol
     variation needed; use the raw cents value from the API)
  ──────────────────────────────────────────────────────────── */
  function formatMoney(cents) {
    if (typeof cents !== 'number') cents = parseInt(cents, 10) || 0;
    var dollars = (cents / 100).toFixed(2);
    // Insert comma thousands separator
    var parts = dollars.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '$' + parts.join('.');
  }

  /* ────────────────────────────────────────────────────────────
     Open the Savor cart drawer
  ──────────────────────────────────────────────────────────── */
  function openDrawer() {
    // Strategy 1: Savor's cart-drawer-component custom element
    var drawer = document.querySelector('cart-drawer-component');
    if (drawer) {
      if (typeof drawer.open === 'function') {
        drawer.open();
        return;
      }
      if (typeof drawer.showDialog === 'function') {
        drawer.showDialog();
        return;
      }
    }

    // Strategy 2: generic 'cart:open' event — any listener can handle
    document.dispatchEvent(new CustomEvent('cart:open', { bubbles: true }));
  }

  /* ────────────────────────────────────────────────────────────
     GSAP pulse — bubble scale animation
  ──────────────────────────────────────────────────────────── */
  function triggerPulse() {
    // Use the function exposed by the section's inline script if available
    if (typeof window._antonioPulseBubble === 'function') {
      window._antonioPulseBubble();
      return;
    }

    // Fallback: direct GSAP call
    if (typeof gsap !== 'undefined') {
      var bubble = el('antonio-cart-bubble');
      if (!bubble) return;
      gsap.timeline()
        .to(bubble, { scale: 1.3, duration: 0.18, ease: 'back.out(2)' })
        .to(bubble, { scale: 1,   duration: 0.22, ease: 'back.out(1.4)' });
    }
  }

  /* ────────────────────────────────────────────────────────────
     Update bubble (desktop)
  ──────────────────────────────────────────────────────────── */
  function updateBubble(count) {
    var bubble      = el('antonio-cart-bubble');
    var bubbleCount = el('antonio-cart-bubble__count');
    if (!bubble) return;

    var hasItems = count > 0;

    if (hasItems) {
      bubble.removeAttribute('hidden');
      if (bubbleCount) bubbleCount.removeAttribute('hidden');

      // Slide in if still off-screen (x != 0 from initial CSS transform)
      if (typeof gsap !== 'undefined') {
        var currentX = parseFloat(gsap.getProperty(bubble, 'x')) || 0;
        if (currentX !== 0) {
          gsap.to(bubble, { x: 0, duration: 0.5, ease: 'back.out(1.7)' });
        }
      }
    } else {
      bubble.setAttribute('hidden', '');
      if (bubbleCount) bubbleCount.setAttribute('hidden', '');
    }

    if (bubbleCount) {
      bubbleCount.textContent = count < 100 ? String(count) : '99+';
    }

    bubble.setAttribute(
      'aria-label',
      'View cart, ' + count + (count === 1 ? ' item' : ' items')
    );
  }

  /* ────────────────────────────────────────────────────────────
     Update mobile sticky bar
  ──────────────────────────────────────────────────────────── */
  function updateMobileBar(count, totalCents) {
    var bar        = el('antonio-mobile-bar');
    var barCount   = el('antonio-mobile-bar__count');
    var barLabel   = el('antonio-mobile-bar__items-text');
    var barTotal   = el('antonio-mobile-bar__total');
    if (!bar) return;

    var hasItems   = count > 0;
    var totalStr   = formatMoney(totalCents);
    var itemsLabel = '(' + count + (count === 1 ? ' item' : ' items') + ')';

    if (hasItems) {
      bar.removeAttribute('hidden');

      // Slide up from bottom if still off-screen
      if (typeof gsap !== 'undefined') {
        var currentY = parseFloat(gsap.getProperty(bar, 'y')) || 0;
        if (currentY !== 0) {
          gsap.to(bar, { y: 0, duration: 0.45, ease: 'power2.out' });
        }
      }
    } else {
      bar.setAttribute('hidden', '');
    }

    if (barCount) barCount.textContent = count;
    if (barLabel) barLabel.textContent = itemsLabel;
    if (barTotal) barTotal.textContent = totalStr;

    bar.setAttribute(
      'aria-label',
      'View order, ' + count + (count === 1 ? ' item' : ' items') + ' \u2014 ' + totalStr
    );
  }

  /* ────────────────────────────────────────────────────────────
     Apply cart data to all UI elements
  ──────────────────────────────────────────────────────────── */
  function applyCartData(cart) {
    if (!cart) return;
    _cart = cart;

    var count = cart.item_count || 0;
    var totalCents = cart.total_price || 0;

    updateBubble(count);
    updateMobileBar(count, totalCents);

    // Dispatch our own event so other components can hook in
    document.dispatchEvent(
      new CustomEvent('cart:updated', {
        bubbles: true,
        detail: {
          count: count,
          total: formatMoney(totalCents),
          totalRaw: totalCents,
          items: cart.items || [],
        },
      })
    );
  }

  /* ────────────────────────────────────────────────────────────
     Fetch /cart.json and apply
  ──────────────────────────────────────────────────────────── */
  function refresh() {
    return fetch('/cart.json', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Cart fetch failed: ' + res.status);
        return res.json();
      })
      .then(function (cart) {
        applyCartData(cart);
        return cart;
      })
      .catch(function (err) {
        console.warn('[AntonioCart] refresh error:', err);
      });
  }

  /* ────────────────────────────────────────────────────────────
     Add item to cart
  ──────────────────────────────────────────────────────────── */
  function addItem(variantId, quantity, properties) {
    if (!variantId) {
      console.warn('[AntonioCart] addItem requires a variantId');
      return Promise.reject(new Error('variantId required'));
    }

    var body = {
      id: variantId,
      quantity: quantity || 1,
    };

    if (properties && typeof properties === 'object') {
      body.properties = properties;
    }

    return fetch('/cart/add.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    })
      .then(function (res) {
        if (!res.ok) {
          return res.json().then(function (errData) {
            throw new Error(errData.description || 'Add to cart failed');
          });
        }
        return res.json();
      })
      .then(function (addedItem) {
        // Refresh full cart state, then animate
        return refresh().then(function (cart) {
          triggerPulse();
          return { item: addedItem, cart: cart };
        });
      })
      .catch(function (err) {
        console.warn('[AntonioCart] addItem error:', err);
        throw err;
      });
  }

  /* ────────────────────────────────────────────────────────────
     Savor native 'cart:update' (ThemeEvents.cartUpdate) listener
     This fires when Savor itself updates the cart (qty change, remove, etc.)
  ──────────────────────────────────────────────────────────── */
  document.addEventListener('cart:update', function (e) {
    // Savor's CartUpdateEvent / CartAddEvent carries detail.data.itemCount
    // but NOT the total. Re-fetch to get accurate total.
    refresh();
  });

  /* ────────────────────────────────────────────────────────────
     Custom 'cart:updated' — re-entrant guard: only re-apply if
     dispatched externally (not our own dispatch)
  ──────────────────────────────────────────────────────────── */
  // (No re-entrant handling needed — we dispatch after applyCartData,
  //  and applyCartData doesn't re-trigger itself.)

  /* ────────────────────────────────────────────────────────────
     DOMContentLoaded — initial sync
  ──────────────────────────────────────────────────────────── */
  function init() {
    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already ready (script deferred / async)
    init();
  }

  /* ────────────────────────────────────────────────────────────
     Public API
  ──────────────────────────────────────────────────────────── */
  window.AntonioCart = {
    /**
     * Fetch /cart.json and update all cart UI elements.
     * @returns {Promise<Object>} Resolves with the cart object.
     */
    refresh: refresh,

    /**
     * Add a variant to the cart.
     * @param {number|string} variantId  - Shopify variant ID
     * @param {number}        [quantity] - Defaults to 1
     * @param {Object}        [properties] - Line item properties (pizza builder options, etc.)
     * @returns {Promise<{item: Object, cart: Object}>}
     */
    addItem: addItem,

    /**
     * Open the Savor cart drawer.
     */
    openDrawer: openDrawer,

    /**
     * Trigger the GSAP pulse animation on the floating bubble manually.
     */
    pulse: triggerPulse,

    /**
     * Format cents to a money string (e.g. 4997 → "$49.97").
     * @param {number} cents
     * @returns {string}
     */
    formatMoney: formatMoney,

    /**
     * Return the last known cart object (may be null before first refresh).
     * @returns {Object|null}
     */
    getCart: function () {
      return _cart;
    },
  };
})();
