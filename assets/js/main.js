// ==========================================================================
// SAVIAA GLOBAL COMMON JAVASCRIPT (Sprint 2 Upgraded)
// ==========================================================================

// Mock Search Database
const SEARCH_DATABASE = {
  products: [
    { id: 'rm-1', name: 'Kanchipuram Golden Zari Silk Blouse', url: 'product-details.html?id=rm-1', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=150', price: '₹3,450' },
    { id: 'rm-2', name: 'Vizag Handloom Ikkat Blouse', url: 'product-details.html?id=rm-2', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=150', price: '₹1,450' },
    { id: 'rm-3', name: 'Classic Crimson Raw Silk Blouse', url: 'product-details.html?id=rm-3', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=150', price: '₹2,200' },
    { id: 'rm-4', name: 'Banarasi Brocade Royal Velvet Blouse', url: 'product-details.html?id=rm-4', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=150', price: '₹2,800' },
    { id: 'rm-5', name: 'Madanapalle Silk Floral Blouse', url: 'product-details.html?id=rm-5', img: 'https://images.unsplash.com/photo-1610030470298-295e8fb0e12d?auto=format&fit=crop&q=80&w=150', price: '₹1,850' },
    { id: 'rm-6', name: 'Zardozi Hand Embodied Silk Blouse', url: 'product-details.html?id=rm-6', img: 'https://images.unsplash.com/photo-1610030470298-295e8fb0e12d?auto=format&fit=crop&q=80&w=150', price: '₹4,900' }
  ],
  blogs: [
    { title: 'How to measure blouse size correctly at home', url: 'blog.html?index=0' },
    { title: 'Latest blouse trends shaping South Indian fashion', url: 'blog.html?index=1' },
    { title: 'Stunning bridal blouse ideas for weddings', url: 'blog.html?index=2' },
    { title: 'Traditional blouse designs for silk sarees', url: 'blog.html?index=3' },
    { title: 'The ultimate silk blouse guide: fabrics & care', url: 'blog.html?index=4' }
  ],
  faqs: [
    { q: 'How long does custom blouse stitching take?', a: 'Typically 7 to 9 days in Visakhapatnam. We also offer 48-hour Express stitching.' },
    { q: 'Do you provide home measurements in Vizag?', a: 'Yes, our tailors visit Pendurthi and Visakhapatnam municipal locations.' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  injectNavLayouts();
  initStickyHeader();
  initMobileMenu();
  initMagneticButtons();
  updateBadges();
  initScrollAnimations();
  
  // Sprint 2 Init
  initSearchModal();
  initRecentlyViewed();
  initMobileBottomNavActiveState();
  initButtonRipples();
  initCustomCursor();
});

// Sprint 2 Navigation HTML injection
function injectNavLayouts() {
  // 1. Upgrade Navigation menu to Mega Menu
  const navContainer = document.querySelector('.header nav');
  if (navContainer) {
    navContainer.innerHTML = `
      <ul class="nav-links">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li style="position: static;">
          <a href="ready-made.html" class="nav-link">Shop & Collections ▾</a>
          <div class="mega-menu">
            <div class="mega-menu-grid">
              <div class="mega-menu-col">
                <span class="mega-menu-title">Blouse Catalog</span>
                <ul class="mega-menu-links">
                  <li><a href="ready-made.html">Ready-made Blouses</a></li>
                  <li><a href="custom-blouses.html">Stitching Templates</a></li>
                  <li><a href="product-details.html?id=rm-1">Kanchipuram Silk Blouse</a></li>
                  <li><a href="product-details.html?id=rm-3">Raw Silk Deep V-Neck</a></li>
                </ul>
              </div>
              <div class="mega-menu-col">
                <span class="mega-menu-title">Custom Studio</span>
                <ul class="mega-menu-links">
                  <li><a href="customization-studio.html">Configure Blouse 2.0</a></li>
                  <li><a href="measurement-guide.html">Sizing Calculator</a></li>
                  <li><a href="custom-blouses.html">Embellishments & Embroidery</a></li>
                </ul>
              </div>
              <div class="mega-menu-col">
                <span class="mega-menu-title">Regional Services</span>
                <ul class="mega-menu-links">
                  <li><a href="book-stitching.html">Book Doorstep Tailor</a></li>
                  <li><a href="book-stitching.html?service=Alteration">Alterations Pickup</a></li>
                  <li><a href="boutique-pendurthi.html">Pendurthi Boutique Hub</a></li>
                  <li><a href="boutique-visakhapatnam.html">Visakhapatnam Design Studio</a></li>
                </ul>
              </div>
              <div class="mega-menu-col">
                <span class="mega-menu-title">Support & FAQ</span>
                <ul class="mega-menu-links">
                  <li><a href="contact.html">Store Directions (NAP)</a></li>
                  <li><a href="dashboard.html?tab=tickets">Support Ticket Desk</a></li>
                  <li><a href="blog.html">Tailoring Style Blog</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li><a href="customization-studio.html" class="nav-link">Custom Studio</a></li>
        <li><a href="book-stitching.html" class="nav-link">Book Tailor</a></li>
        <li><a href="blog.html" class="nav-link">Blog</a></li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
      </ul>
    `;
  }

  // 2. Inject Search icon in .nav-actions if not present
  const navActions = document.querySelector('.nav-actions');
  if (navActions && !document.getElementById('btn-global-search')) {
    const searchBtn = document.createElement('a');
    searchBtn.href = '#search';
    searchBtn.id = 'btn-global-search';
    searchBtn.className = 'nav-btn';
    searchBtn.setAttribute('aria-label', 'Search Catalog');
    searchBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    `;
    navActions.prepend(searchBtn);
  }

  // 3. Inject Sticky Mobile Bottom Navigation (One-tap Actions: Call, WhatsApp, Book, Track)
  if (!document.querySelector('.mobile-bottom-nav')) {
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-bottom-nav';
    mobileNav.setAttribute('aria-label', 'Mobile bottom shortcut links');
    mobileNav.innerHTML = `
      <a href="tel:+917842410691" class="mobile-bottom-nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>Call</span>
      </a>
      <a href="https://wa.me/917842410691?text=Hello%20SAVIAA%2C%20I%20would%20like%20to%20stitch%20a%20custom%20blouse." class="mobile-bottom-nav-item" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style="fill: currentColor; width: 20px; height: 20px;"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.486 1.967 14.024.943 11.998.943c-5.441 0-9.87 4.372-9.874 9.802-.001 2.016.528 3.99 1.538 5.739L2.68 21.57l5.148-1.348c.006-.004.011-.007.017-.01-.001-.001-.002-.002-.002-.003zm12.333-7.51c-.307-.154-1.82-.9-2.1-.1-.28.1-.56.55-.68.7-.12.14-.24.15-.55 0-.3-.15-1.29-.47-2.45-1.51-.9-0.8-1.5-1.79-1.68-2.11-.18-.3-.02-.47.13-.62.14-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6-.2-.01-.45-.01-.7-.01-.25 0-.65.09-.99.47-.34.38-1.3 1.27-1.3 3.1 0 1.83 1.33 3.6 1.51 3.85.19.25 2.63 4.02 6.37 5.64.89.38 1.58.61 2.12.79.89.28 1.7.24 2.34.14.71-.1 1.82-.74 2.08-1.43.26-.69.26-1.28.18-1.4-.08-.12-.28-.19-.58-.34z"/></svg>
        <span>WhatsApp</span>
      </a>
      <a href="book-stitching.html" class="mobile-bottom-nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <span>Booking</span>
      </a>
      <a href="order-tracking.html" class="mobile-bottom-nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
        <span>Track</span>
      </a>
    `;
    document.body.appendChild(mobileNav);
  }

  // 4. Inject Floating WhatsApp CTA
  if (!document.querySelector('.floating-cta')) {
    const waCTA = document.createElement('a');
    waCTA.href = 'https://wa.me/917842410691?text=Hello%20SAVIAA%2C%20I%20would%20like%20to%20stitch%20a%20custom%20blouse.';
    waCTA.className = 'floating-cta';
    waCTA.target = '_blank';
    waCTA.setAttribute('aria-label', 'Contact support on WhatsApp');
    waCTA.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      WhatsApp Support
    `;
    document.body.appendChild(waCTA);
  }

  // 5. Upgrade Footers Globally with official SAVIAA Tailors details
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.innerHTML = `
      <div class="container footer-grid">
        <div class="footer-brand">
          <span class="footer-title" style="display: block; margin-bottom: 1rem;">
            <img src="assets/images/logo/saviaa-logo.png" alt="SAVIAA Logo" style="height: 28px; width: auto; display: block; object-fit: contain; filter: brightness(0) invert(1);">
          </span>
          <p class="footer-desc" style="max-width: 320px; line-height: 1.6; color: var(--text-muted); font-size: 0.9rem;">
            SAVIAA Tailors is India's premium custom blouse stitching and designer tailoring platform. Opp. State Bank, Pendurthi Bypass Junction, Visakhapatnam, Andhra Pradesh, 531173.
          </p>
          <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--accent);">
            ⭐⭐⭐⭐⭐ 4.9 Rating on <a href="https://share.google/pIaY2cr7EJiByKHd6" target="_blank" style="text-decoration: underline; color: inherit;">Google Business Profile</a>
          </div>
        </div>
        <div class="footer-links-col">
          <span class="footer-links-title">Quick Links</span>
          <ul class="footer-links">
            <li><a href="customization-studio.html">3D Designer Studio</a></li>
            <li><a href="book-stitching.html">Book Tailor Appointment</a></li>
            <li><a href="ready-made.html">Ready-made Shop</a></li>
            <li><a href="measurement-guide.html">Size Calculator</a></li>
          </ul>
        </div>
        <div class="footer-links-col">
          <span class="footer-links-title">Regional Hubs</span>
          <ul class="footer-links">
            <li><a href="boutique-pendurthi.html">Pendurthi Hub (Opp. SBI Bank)</a></li>
            <li><a href="boutique-visakhapatnam.html">Visakhapatnam Design Studio</a></li>
            <li><a href="contact.html">MVP Colony Office</a></li>
          </ul>
        </div>
        <div class="footer-links-col">
          <span class="footer-links-title">Official Contact</span>
          <ul class="footer-links" style="font-size: 0.9rem; line-height: 1.6; list-style: none; padding: 0;">
            <li style="margin-bottom: 0.5rem; color: var(--text-muted);">
              📞 Primary: <a href="tel:+917842410691" style="font-weight: 600; color: var(--accent);">+91 78424 10691</a>
            </li>
            <li style="margin-bottom: 0.5rem; color: var(--text-muted);">
              📞 Secondary: <a href="tel:+919182743352" style="color: var(--text-muted);">+91 91827 43352</a>
            </li>
            <li style="margin-bottom: 0.5rem; color: var(--text-muted);">
              💬 WhatsApp: <a href="https://wa.me/917842410691?text=Hello%20SAVIAA%2C%20I%20would%20like%20to%20stitch%20a%20custom%20blouse." target="_blank" style="color: var(--accent); text-decoration: underline;">Chat Now</a>
            </li>
            <li style="color: var(--text-muted);">
              📍 Opp. State Bank, Pendurthi Bypass, Vizag
            </li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; 2026 SAVIAA Tailors. All rights reserved. | <a href="about.html">Privacy</a> | <a href="contact.html">Terms</a></p>
        <div class="footer-socials">
          <a href="https://wa.me/917842410691?text=Hello%20SAVIAA%2C%20I%20need%20help%20selecting%20a%20blouse%20design." class="footer-social-link" target="_blank" aria-label="WhatsApp">WhatsApp</a>
          <a href="https://www.instagram.com/savia_tailors/" class="footer-social-link" target="_blank" aria-label="Instagram">Instagram</a>
          <a href="https://www.youtube.com/@SaviaTailors" class="footer-social-link" target="_blank" aria-label="YouTube">YouTube</a>
          <a href="https://share.google/pIaY2cr7EJiByKHd6" class="footer-social-link" target="_blank" aria-label="Google Business Profile">Google Business</a>
        </div>
      </div>
    `;
  }
}

// 1. Sticky Header scroll behavior
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

// 2. Mobile Menu Toggle Overlay
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileNav.classList.toggle('open');
    
    // Toggle menu icon shape
    if (mobileNav.classList.contains('open')) {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>
      `;
    }
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

// 3. Magnetic Hover Button animation
function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('.magnetic, .btn-primary, .btn-accent');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 'ontouchstart' in window) {
    return;
  }

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const bound = el.getBoundingClientRect();
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      el.style.transition = 'transform 0.05s ease-out';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
}

// 4. Badges updates
function updateBadges() {
  const cartBadge = document.querySelector('.cart-badge');
  const wishlistBadge = document.querySelector('.wishlist-badge');

  if (cartBadge) {
    const cart = JSON.parse(localStorage.getItem('saviaa_cart') || '[]');
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
  }

  if (wishlistBadge) {
    const wishlist = JSON.parse(localStorage.getItem('saviaa_wishlist') || '[]');
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
  }
}

// 5. Toast alerts
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slide-up-toast 0.4s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 2500);
}

// 6. Scroll Entry animation
function initScrollAnimations() {
  if (CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

function initButtonRipples() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

function initCustomCursor() {
  if (matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.id = 'visual-cursor-follower';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    const activeTargets = 'a, button, [role="button"], select, input, textarea, .option-card, .color-dot';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(activeTargets)) {
        cursor.classList.add('active');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(activeTargets)) {
        cursor.classList.remove('active');
      }
    });
  }
}

// ==========================================================================
// SPRINT 2 SEARCH AND AUTOCOMPLETE OVERLAY
// ==========================================================================
let searchModal = null;

function initSearchModal() {
  // Create search dialog box dynamically if not present
  searchModal = document.getElementById('search-modal');
  if (!searchModal) {
    searchModal = document.createElement('dialog');
    searchModal.id = 'search-modal';
    searchModal.className = 'card';
    searchModal.innerHTML = `
      <div class="dialog-header">
        <h3 style="font-size: 1.15rem;">Search SAVIAA</h3>
        <button class="dialog-close" id="search-modal-close" aria-label="Close search">&times;</button>
      </div>
      <div class="search-input-wrapper">
        <svg class="search-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="search-modal-input" class="form-input" placeholder="Search custom blouses, blogs, fabrics, sizes..." aria-label="Search field">
        <button class="search-mic-btn" id="search-mic" title="Voice Search Toggle" aria-label="Voice Search Toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line>
          </svg>
        </button>
      </div>
      
      <div class="search-results-box">
        <!-- Suggestions/Recent column -->
        <div class="search-suggestions-col">
          <div class="suggestion-header" id="suggestions-title">Trending Searches</div>
          <ul class="suggestion-list" id="search-suggestions-list">
            <li class="suggestion-item" data-term="Bridal Zardozi">Bridal Zardozi Blouses</li>
            <li class="suggestion-item" data-term="Boat neck cotton">Boat Neck Cotton Fits</li>
            <li class="suggestion-item" data-term="Vizag Boutique">Visakhapatnam Tailor Shops</li>
            <li class="suggestion-item" data-term="Sleeveless raw silk">Sleeveless Raw Silk Styles</li>
          </ul>
        </div>
        
        <!-- Products column -->
        <div>
          <div class="suggestion-header">Products & Matching Designs</div>
          <div class="search-products-col" id="search-products-list">
            <p style="font-size: 0.85rem; color: var(--text-muted);">Start typing to search products...</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(searchModal);
  }

  // Attach search triggers in nav bars (any button with href="#search" or matching search icon)
  document.querySelectorAll('a[href="#search"], button[aria-label*="Search"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.showModal();
      document.getElementById('search-modal-input').focus();
    });
  });

  // Attach close listener
  const closeBtn = document.getElementById('search-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => searchModal.close());
  }

  // Autocomplete typing listener
  const searchInput = document.getElementById('search-modal-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      handleSearchAutocomplete(searchInput.value);
    });
  }

  // Handle Voice Search simulated click
  const micBtn = document.getElementById('search-mic');
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      triggerMockVoiceSearch();
    });
  }

  // Click suggestion listener
  document.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
      const term = item.dataset.term;
      if (searchInput) {
        searchInput.value = term;
        handleSearchAutocomplete(term);
      }
    });
  });
}

function handleSearchAutocomplete(query) {
  const queryClean = query.toLowerCase().trim();
  const suggestionsList = document.getElementById('search-suggestions-list');
  const productsList = document.getElementById('search-products-list');
  const sugTitle = document.getElementById('suggestions-title');

  if (!queryClean) {
    // Show trending defaults
    sugTitle.textContent = "Trending Searches";
    suggestionsList.innerHTML = `
      <li class="suggestion-item" data-term="Bridal Zardozi">Bridal Zardozi Blouses</li>
      <li class="suggestion-item" data-term="Boat neck cotton">Boat Neck Cotton Fits</li>
      <li class="suggestion-item" data-term="Vizag Boutique">Visakhapatnam Tailor Shops</li>
    `;
    productsList.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted);">Start typing to search products...</p>`;
    
    // Reattach listeners
    suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const term = item.dataset.term;
        const input = document.getElementById('search-modal-input');
        if (input) { input.value = term; handleSearchAutocomplete(term); }
      });
    });
    return;
  }

  // Match Products
  const matchedProds = SEARCH_DATABASE.products.filter(p => p.name.toLowerCase().includes(queryClean));
  // Match Blogs
  const matchedBlogs = SEARCH_DATABASE.blogs.filter(b => b.title.toLowerCase().includes(queryClean));

  // Render suggestion headers (articles/FAQs)
  sugTitle.textContent = "Matching Blogs & FAQ";
  suggestionsList.innerHTML = '';
  
  if (matchedBlogs.length === 0) {
    suggestionsList.innerHTML = `<li style="font-size: 0.85rem; color: var(--text-muted); padding: 8px;">No matching articles.</li>`;
  } else {
    matchedBlogs.forEach(b => {
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.innerHTML = `<a href="${b.url}">📰 ${b.title}</a>`;
      suggestionsList.appendChild(li);
    });
  }

  // Render product previews list
  productsList.innerHTML = '';
  if (matchedProds.length === 0) {
    productsList.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted);">No products found matching "${query}".</p>`;
  } else {
    matchedProds.forEach(p => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.gap = '10px';
      div.style.borderBottom = '1px solid var(--border)';
      div.style.paddingBottom = '6px';
      div.style.cursor = 'pointer';
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}" style="width: 44px; height: 55px; object-fit: cover; border-radius: 4px;">
        <div style="flex:1;">
          <h4 style="font-size: 0.85rem; font-weight:600; color: var(--dark);">${p.name}</h4>
          <span style="font-size: 0.8rem; color: var(--primary); font-weight:700;">${p.price}</span>
        </div>
      `;
      div.addEventListener('click', () => {
        window.location.href = p.url;
      });
      productsList.appendChild(div);
    });
  }
}

// 7. Simulated Voice Search Trigger
function triggerMockVoiceSearch() {
  const mic = document.getElementById('search-mic');
  const input = document.getElementById('search-modal-input');
  if (!mic || !input) return;

  mic.classList.add('listening');
  input.value = "";
  input.placeholder = "Listening... Speak now...";

  if (typeof showToast === 'function') {
    showToast("Voice search activated (Simulated). Speak now...", "success");
  }

  // After 2.2 seconds, insert mock query
  setTimeout(() => {
    mic.classList.remove('listening');
    input.value = "Crimson Raw Silk Sweetheart";
    input.placeholder = "Search custom blouses, blogs, fabrics, sizes...";
    handleSearchAutocomplete("Crimson Raw Silk Sweetheart");
    if (typeof showToast === 'function') {
      showToast('Detected: "Crimson Raw Silk Sweetheart"', "success");
    }
  }, 2200);
}

// ==========================================================================
// RECENTLY VIEWED PRODUCTS LOGGER
// ==========================================================================
function initRecentlyViewed() {
  // Check if we are currently on a product page
  const urlParams = new URLSearchParams(window.location.search);
  const prodId = urlParams.get('id');

  // If productId parameter is active, log it
  if (window.location.pathname.includes('product-details.html') && prodId) {
    logProductVisit(prodId);
  }

  // Render recently viewed grid list if container exists on page
  renderRecentlyViewedGrid();
}

function logProductVisit(id) {
  let list = JSON.parse(localStorage.getItem('saviaa_recently_viewed') || '[]');
  
  // Filter out duplicate
  list = list.filter(item => item !== id);
  // Add to top
  list.unshift(id);
  // Keep max 4 items
  if (list.length > 4) list.pop();

  localStorage.setItem('saviaa_recently_viewed', JSON.stringify(list));
}

function renderRecentlyViewedGrid() {
  const container = document.getElementById('recently-viewed-products-box');
  if (!container) return;

  const list = JSON.parse(localStorage.getItem('saviaa_recently_viewed') || '[]');
  container.innerHTML = '';

  if (list.length === 0) {
    container.parentElement.style.display = 'none'; // Hide section if empty
    return;
  }

  // Find products matching lists from ready-made catalog
  // Products is declared inside shop.js, if not loaded we fallback
  const catalog = typeof PRODUCTS !== 'undefined' ? PRODUCTS : SEARCH_DATABASE.products;

  list.forEach(id => {
    const p = catalog.find(item => item.id === id);
    if (!p) return;

    const div = document.createElement('div');
    div.className = 'card reveal-on-scroll';
    div.innerHTML = `
      <div class="card-img-wrapper">
        <img class="card-img" src="${p.image || p.img}" alt="${p.name}">
      </div>
      <div class="card-body">
        <h3 class="card-title" style="font-size: 0.9rem;"><a href="product-details.html?id=${p.id}">${p.name}</a></h3>
        <span style="font-weight: 700; color: var(--primary); font-size: 0.9rem;">₹${p.price.toString().replace('₹','')}</span>
      </div>
    `;
    container.appendChild(div);
  });
}

// 8. Mobile Bottom Navigation Active Selection highlight helper
function initMobileBottomNavActiveState() {
  const path = window.location.pathname;
  const navItems = document.querySelectorAll('.mobile-bottom-nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && path.includes(href)) {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });
}
