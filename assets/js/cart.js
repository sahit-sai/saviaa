// ==========================================================================
// SAVIAA CART & STATE MANAGER
// ==========================================================================

// Global state keys
const CART_KEY = 'saviaa_cart';
const WISHLIST_KEY = 'saviaa_wishlist';
const ORDERS_KEY = 'saviaa_orders';

// 1. Retrieve cart data
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

// 2. Retrieve wishlist data
function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
}

// 3. Add regular or customized blouse to cart
function addToCart(item, notify = true) {
  const cart = getCart();
  
  // Custom blouses have unique options and configurations, so we match configurations
  let existingIndex = -1;
  if (!item.isCustom) {
    existingIndex = cart.findIndex(i => i.id === item.id && i.size === item.size && !i.isCustom);
  } else {
    // Custom blouse check: match config string
    existingIndex = cart.findIndex(i => i.isCustom && JSON.stringify(i.config) === JSON.stringify(item.config) && i.size === item.size);
  }

  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + (item.quantity || 1);
  } else {
    item.quantity = item.quantity || 1;
    cart.push(item);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  if (typeof updateBadges === 'function') updateBadges();
  
  if (notify && typeof showToast === 'function') {
    showToast(`${item.name} added to cart!`);
  }
}

// 4. Update cart item quantity
function updateCartQuantity(index, quantity) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;
  
  if (quantity <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = quantity;
  }
  
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  if (typeof updateBadges === 'function') updateBadges();
}

// 5. Remove from cart
function removeFromCart(index) {
  updateCartQuantity(index, 0);
  if (typeof showToast === 'function') {
    showToast('Item removed from cart');
  }
}

// 6. Toggle item in wishlist
function toggleWishlist(item) {
  const wishlist = getWishlist();
  const index = wishlist.findIndex(i => i.id === item.id);

  if (index > -1) {
    wishlist.splice(index, 1);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    if (typeof showToast === 'function') {
      showToast(`${item.name} removed from wishlist`);
    }
  } else {
    wishlist.push(item);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    if (typeof showToast === 'function') {
      showToast(`${item.name} added to wishlist!`);
    }
  }

  if (typeof updateBadges === 'function') updateBadges();
}

// 7. Place Order and clear cart
function placeOrder(shippingAddress, paymentMethod, discountCode = '') {
  const cart = getCart();
  if (cart.length === 0) return null;

  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  
  // Calculate pricing
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  
  // Sample coupon code
  if (discountCode.toUpperCase() === 'SAVIAA10') {
    discount = subtotal * 0.1;
  } else if (discountCode.toUpperCase() === 'FIRSTFIT') {
    discount = 250; // flat discount in INR/INR equivalent (like $5/₹250)
  }

  const shipping = subtotal > 1500 ? 0 : 100;
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal - discount + shipping + tax;

  const orderId = 'SV' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
    items: cart,
    subtotal: subtotal,
    discount: discount,
    shipping: shipping,
    tax: tax,
    total: total,
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    status: 'Processing', // Processing, Tailoring, Shipped, Delivered
    trackingUrl: `#track-${orderId}`,
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
  };

  orders.unshift(newOrder);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  
  // Clear cart
  localStorage.setItem(CART_KEY, JSON.stringify([]));
  if (typeof updateBadges === 'function') updateBadges();

  return newOrder;
}

// 8. Add sample orders on first run for mock display
function initMockOrders() {
  const orders = localStorage.getItem(ORDERS_KEY);
  if (!orders) {
    const sampleOrders = [
      {
        id: 'SV829173',
        date: 'Jul 10, 2026',
        items: [
          {
            id: 'rm-1',
            name: 'Banarasi Silk Ready-made Blouse',
            price: 2450,
            quantity: 1,
            size: '36',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400',
            isCustom: false
          }
        ],
        subtotal: 2450,
        discount: 0,
        shipping: 0,
        tax: 122.5,
        total: 2572.5,
        shippingAddress: {
          name: 'Anjali Sharma',
          phone: '+91 98765 43210',
          email: 'anjali@example.com',
          street: '4-56, Main Road, Pendurthi',
          city: 'Visakhapatnam',
          state: 'Andhra Pradesh',
          pincode: '531173'
        },
        paymentMethod: 'UPI',
        status: 'Delivered',
        trackingUrl: '#track-SV829173',
        deliveryDate: 'Jul 15, 2026'
      },
      {
        id: 'SV293847',
        date: 'Jul 16, 2026',
        items: [
          {
            id: 'custom-blouse',
            name: 'Custom Tailored Blouse',
            price: 4500,
            quantity: 1,
            size: '34',
            image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400',
            isCustom: true,
            config: {
              neck: 'Boat Neck',
              sleeves: 'Elbow Length',
              back: 'Deep U with Latkans',
              lining: 'Cotton Lining',
              fabric: 'Raw Silk - Crimson Red',
              embroidery: 'Zardozi Border Work'
            }
          }
        ],
        subtotal: 4500,
        discount: 450,
        shipping: 0,
        tax: 202.5,
        total: 4252.5,
        shippingAddress: {
          name: 'Priya Rao',
          phone: '+91 78424 10691',
          email: 'priya.rao@example.com',
          street: 'Flat 302, Green Meadows, Madhurawada',
          city: 'Visakhapatnam',
          state: 'Andhra Pradesh',
          pincode: '530048'
        },
        paymentMethod: 'Cards',
        status: 'Tailoring',
        trackingUrl: '#track-SV293847',
        deliveryDate: 'Jul 23, 2026'
      }
    ];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(sampleOrders));
  }
}
initMockOrders();
