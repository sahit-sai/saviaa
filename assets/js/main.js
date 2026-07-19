// ==========================================================================
// SAVIAA "THE ATELIER INDEX" JAVASCRIPT
// ==========================================================================

const SAVIAA_CONFIG = {
  brandName: 'SAVIAA',
  fullName: 'SAVIAA Saree Blouse Boutique & Custom Tailoring',
  tagline: 'Premium Saree Blouses in Visakhapatnam & Pendurthi',
  phonePrimary: '7842410691',
  phoneFormattedPrimary: '+91 78424 10691',
  phoneSecondary: '9182743352',
  phoneFormattedSecondary: '+91 91827 43352',
  whatsappUrl: 'https://wa.me/917842410691?text=Hello%20SAVIAA%2C%20I%20would%20like%20to%20inquire%20about%20a%20saree%20blouse.',
  address: 'Opp. State Bank, Pendurthi Bypass Junction, Visakhapatnam, Andhra Pradesh, 531173',
  geo: { latitude: 17.8094, longitude: 83.1972 },
  hours: 'Mon - Sat: 10:00 AM - 8:00 PM',
  instagram: '@savia_tailors',
  instagramUrl: 'https://www.instagram.com/savia_tailors/',
  youtube: '@SaviaTailors',
  youtubeUrl: 'https://www.youtube.com/@SaviaTailors',
  domain: 'https://saviaa.in'
};

document.addEventListener('DOMContentLoaded', () => {
  injectNavLayouts();
  injectFooter();
  initScrollAnimations();
});

// Scroll Reveal Observer for Subtle Fade & Slide Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));
}

// Navigation Layout HTML Injection
function injectNavLayouts() {
  const logoEl = document.querySelector('.header .logo');
  if (logoEl) {
    logoEl.innerHTML = `<span class="logo-text">${SAVIAA_CONFIG.brandName}</span>`;
  }

  const navContainer = document.querySelector('.header nav');
  if (navContainer) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navContainer.innerHTML = `
      <ul class="nav-links">
        <li><a href="index.html" class="nav-link ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">Home</a></li>
        <li><a href="about.html" class="nav-link ${currentPath === 'about.html' ? 'active' : ''}">Our Story</a></li>
        <li><a href="ready-made.html" class="nav-link ${currentPath === 'ready-made.html' ? 'active' : ''}">Ready Collections</a></li>
        <li><a href="custom-blouses.html" class="nav-link ${currentPath === 'custom-blouses.html' ? 'active' : ''}">Custom Stitching</a></li>
        <li><a href="book-stitching.html" class="nav-link ${currentPath === 'book-stitching.html' ? 'active' : ''}">Book Tailor</a></li>
        <li><a href="blog.html" class="nav-link ${currentPath === 'blog.html' || currentPath === 'blog-post.html' ? 'active' : ''}">Journal</a></li>
        <li><a href="contact.html" class="nav-link ${currentPath === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
      </ul>
    `;
  }

  // Inject Floating Consultation CTA
  if (!document.querySelector('.floating-cta')) {
    const floatBtn = document.createElement('a');
    floatBtn.href = SAVIAA_CONFIG.whatsappUrl;
    floatBtn.className = 'floating-cta';
    floatBtn.target = '_blank';
    floatBtn.rel = 'noopener';
    floatBtn.setAttribute('aria-label', 'Consult via WhatsApp');
    floatBtn.innerHTML = `<span>WhatsApp Consult</span>`;
    document.body.appendChild(floatBtn);
  }
}

// Global Footer HTML Injection
function injectFooter() {
  const footerContainer = document.querySelector('footer.footer');
  if (footerContainer) {
    footerContainer.innerHTML = `
      <div class="container footer-grid">
        <div class="footer-brand">
          <span class="footer-title">${SAVIAA_CONFIG.brandName}</span>
          <p class="footer-desc">${SAVIAA_CONFIG.fullName}. Handcrafted saree blouse tailoring with doorstep measurement visits across Visakhapatnam & Pendurthi.</p>
          <div class="footer-contact-info" style="margin-top: 1rem; font-size: 0.85rem; color: rgba(244,238,228,0.8); display: flex; flex-direction: column; gap: 0.4rem;">
            <p><strong>Address:</strong> ${SAVIAA_CONFIG.address}</p>
            <p><strong>Primary / WhatsApp:</strong> <a href="tel:+917842410691" style="color: var(--brass); text-decoration: underline;">${SAVIAA_CONFIG.phoneFormattedPrimary}</a></p>
            <p><strong>Secondary Phone:</strong> <a href="tel:+919182743352" style="color: var(--brass); text-decoration: underline;">${SAVIAA_CONFIG.phoneFormattedSecondary}</a></p>
            <p><strong>Boutique Hours:</strong> ${SAVIAA_CONFIG.hours}</p>
          </div>
        </div>
        <div class="footer-links-col">
          <span class="footer-links-title">Collections & Services</span>
          <ul class="footer-links">
            <li><a href="ready-made.html">Ready-Stitched Blouses</a></li>
            <li><a href="custom-blouses.html">Signature Savia Designs</a></li>
            <li><a href="custom-blouses.html">Custom Stitching Options</a></li>
            <li><a href="book-stitching.html">Book Doorstep Measurement</a></li>
            <li><a href="customization-studio.html">3D Style Configurator</a></li>
          </ul>
        </div>
        <div class="footer-links-col">
          <span class="footer-links-title">Mandatory Information</span>
          <ul class="footer-links">
            <li><a href="about.html">Our Story & Content Hub</a></li>
            <li><a href="blog.html">Editorial Journal & Care Guides</a></li>
            <li><a href="contact.html">Contact Us & Embedded Map</a></li>
            <li><a href="contact.html">Visakhapatnam & Pendurthi Hubs</a></li>
          </ul>
        </div>
        <div class="footer-links-col">
          <span class="footer-links-title">Connect & Support</span>
          <ul class="footer-links">
            <li><a href="${SAVIAA_CONFIG.whatsappUrl}" target="_blank" rel="noopener">WhatsApp Styling Inquiry</a></li>
            <li><a href="${SAVIAA_CONFIG.instagramUrl}" target="_blank" rel="noopener">Instagram (${SAVIAA_CONFIG.instagram})</a></li>
            <li><a href="${SAVIAA_CONFIG.youtubeUrl}" target="_blank" rel="noopener">YouTube Channel</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ${SAVIAA_CONFIG.brandName} Saree Blouse Boutique. All rights reserved.</p>
        <div class="footer-socials">
          <a href="${SAVIAA_CONFIG.instagramUrl}" class="footer-social-link" target="_blank" rel="noopener">Instagram</a>
          <a href="${SAVIAA_CONFIG.whatsappUrl}" class="footer-social-link" target="_blank" rel="noopener">WhatsApp</a>
          <a href="${SAVIAA_CONFIG.youtubeUrl}" class="footer-social-link" target="_blank" rel="noopener">YouTube</a>
        </div>
      </div>
    `;
  }
}
