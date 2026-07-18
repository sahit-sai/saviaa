// ==========================================================================
// SAVIAA READY-MADE SHOP CATALOG (Upgraded Sprint 2)
// ==========================================================================

// Upgraded mock products database (with specifications, stock, reviews, accessories)
const PRODUCTS = [
  {
    id: 'rm-1',
    name: 'Kanchipuram Golden Zari Silk Blouse',
    category: 'Bridal Collection',
    price: 3450,
    originalPrice: 4200,
    fabric: 'Kanchipuram Silk',
    neck: 'U-Neck',
    sleeves: 'Elbow Length',
    color: 'Crimson Red',
    colorHex: '#A52A5A',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
    bestSeller: true,
    newArrival: false,
    stock: 5, // Live stock count
    stitchingTime: '48 Hours Express Stitching Available',
    desc: 'Kanchipuram silk with gold zari border fitting. Ideal for bridal wedding wear.',
    specs: {
      'Lining Type': 'Premium Cotton lining included',
      'Padding Cups': 'Removable padding slots built-in',
      'Hooks & Closure': 'Classic back hooks with tie-up dori',
      'Wash Care': 'Dry clean only. Reverse iron under cotton layer.'
    },
    reviews: [
      { author: 'Prasanna L.', stars: 5, verified: true, date: 'Jul 12, 2026', text: 'Stitching and golden zari embroidery are flawless. Fits like a glove. Will buy again!', images: ['assets/images/bridal_cover.png'] },
      { author: 'Meenakshi K.', stars: 4, verified: true, date: 'Jun 28, 2026', text: 'Beautiful heavy silk cloth. Neck deepness is exactly 6.5" as standard.', images: [] }
    ],
    accessories: {
      name: 'Golden Zari Waist Belt (Vaddanam)',
      price: 650,
      image: 'https://images.unsplash.com/photo-1610030470298-295e8fb0e12d?auto=format&fit=crop&q=80&w=150'
    }
  },
  {
    id: 'rm-2',
    name: 'Vizag Handloom Ikkat Blouse',
    category: 'Office Collection',
    price: 1450,
    originalPrice: 1800,
    fabric: 'Handloom Cotton',
    neck: 'Boat Neck',
    sleeves: 'Cap Sleeves',
    color: 'Indigo Blue',
    colorHex: '#1E3E62',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600',
    bestSeller: false,
    newArrival: true,
    stock: 12,
    stitchingTime: 'Normal Tailoring (3 Days)',
    desc: 'Handwoven organic cotton with Vizag Ikkat patterns. Breathable build for professional day-wear.',
    specs: {
      'Lining Type': 'Breathable cotton lining layer',
      'Padding Cups': 'Non-padded simple office cut',
      'Hooks & Closure': 'Front hook clasp system',
      'Wash Care': 'Handwash separately in cold water. Iron with steam.'
    },
    reviews: [
      { author: 'Sravani P.', stars: 5, verified: true, date: 'Jul 14, 2026', text: 'Perfect corporate fit! Boat neck shape looks very neat and elegant.', images: [] }
    ],
    accessories: {
      name: 'Ikkat Fabric Hair Scrunchie Set',
      price: 150,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=150'
    }
  },
  {
    id: 'rm-3',
    name: 'Classic Crimson Raw Silk Blouse',
    category: 'Designer Collection',
    price: 2200,
    originalPrice: 2200,
    fabric: 'Premium Raw Silk',
    neck: 'V-Neck',
    sleeves: 'Sleeveless',
    color: 'Crimson Red',
    colorHex: '#A52A5A',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    bestSeller: true,
    newArrival: false,
    stock: 2,
    stitchingTime: 'Express Stitching Available',
    desc: 'Sleek raw silk featuring a deep V-neck crop. Tailored to layer with modern designer sarees.',
    specs: {
      'Lining Type': 'Premium inner cotton lining',
      'Padding Cups': 'Padded cups stitched by default',
      'Hooks & Closure': 'Concealed side zipper closure',
      'Wash Care': 'Dry clean recommended.'
    },
    reviews: [
      { author: 'Radhika S.', stars: 5, verified: true, date: 'Jul 02, 2026', text: 'Looks stunning. Side zip is very neat.', images: [] }
    ],
    accessories: {
      name: 'Crimson Silk Fabric Potli Bag',
      price: 450,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=150'
    }
  },
  {
    id: 'rm-4',
    name: 'Banarasi Brocade Royal Velvet Blouse',
    category: 'Festival Collection',
    price: 2800,
    originalPrice: 3500,
    fabric: 'Royal Velvet',
    neck: 'High Neck',
    sleeves: 'Full Sleeves',
    color: 'Forest Green',
    colorHex: '#1B4D3E',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    bestSeller: false,
    newArrival: true,
    stock: 4,
    stitchingTime: 'Stitching time 5 Days',
    desc: 'Opulent forest velvet detailed with gold Banarasi brocade. Rich weight for festive evening pujas.',
    specs: {
      'Lining Type': 'Butter crepe soft inner lining',
      'Padding Cups': 'Non-padded design',
      'Hooks & Closure': 'High collar neck back buttons closure',
      'Wash Care': 'Dry clean only.'
    },
    reviews: [
      { author: 'Kiranmayi D.', stars: 4, verified: true, date: 'Jun 22, 2026', text: 'Velvet is very high quality and soft. Golden Banarasi brocade sleeves are gorgeous.', images: [] }
    ],
    accessories: {
      name: 'Maggam Work Velvet Belt',
      price: 550,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=150'
    }
  }
];

let activeFilters = {
  category: 'all',
  fabric: 'all',
  price: 'all',
  sortBy: 'featured'
};

document.addEventListener('DOMContentLoaded', () => {
  initShop();
  initProductDetailsPage();
});

function initShop() {
  const shopGrid = document.querySelector('.shop-grid');
  if (!shopGrid) return; // Exit if not on Shop listing page

  renderCatalog();
  setupFilterListeners();
  setupQuickViewModal();
}

// 1. Render Catalog Grid (Listing page)
function renderCatalog() {
  const grid = document.querySelector('.shop-grid');
  if (!grid) return;

  // Filter
  let filtered = PRODUCTS.filter(p => {
    const matchCat = activeFilters.category === 'all' || p.category === activeFilters.category;
    const matchFab = activeFilters.fabric === 'all' || p.fabric === activeFilters.fabric;
    
    let matchPrice = true;
    if (activeFilters.price !== 'all') {
      const val = activeFilters.price;
      if (val === 'under-1500') matchPrice = p.price < 1500;
      else if (val === '1500-3000') matchPrice = p.price >= 1500 && p.price <= 3000;
      else if (val === 'over-3000') matchPrice = p.price > 3000;
    }
    return matchCat && matchFab && matchPrice;
  });

  // Sort
  if (activeFilters.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sortBy === 'newest') {
    filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
  }

  grid.innerHTML = '';
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p>No blouses found matching these filters. Try resetting them.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const hasDiscount = p.originalPrice > p.price;
    const discountPercent = hasDiscount ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
    
    const card = document.createElement('div');
    card.className = 'card reveal-on-scroll';
    card.innerHTML = `
      <div class="card-img-wrapper">
        ${p.bestSeller ? '<span class="card-badge">Best Seller</span>' : ''}
        ${p.newArrival ? '<span class="card-badge">New</span>' : ''}
        ${hasDiscount && !p.bestSeller && !p.newArrival ? `<span class="card-badge sale">-${discountPercent}%</span>` : ''}
        
        <!-- Wrap image in product link -->
        <a href="product-details.html?id=${p.id}" style="display:block; width:100%; height:100%;">
          <img class="card-img" src="${p.image}" alt="${p.name}" loading="lazy">
        </a>

        <div style="position: absolute; bottom: 12px; right: 12px; display: flex; gap: 6px;">
          <button class="nav-btn btn-wishlist-toggle" data-id="${p.id}" style="background: var(--bg-white); box-shadow: var(--shadow-sm);" aria-label="Add to Wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button class="nav-btn btn-quickview" data-id="${p.id}" style="background: var(--bg-white); box-shadow: var(--shadow-sm);" aria-label="Quick View">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="card-body">
        <span class="card-meta">${p.fabric} • ${p.neck}</span>
        <h3 class="card-title" style="font-size:1rem;"><a href="product-details.html?id=${p.id}">${p.name}</a></h3>
        <div class="flex-between">
          <span class="card-price">₹${p.price} ${hasDiscount ? `<span class="old-price">₹${p.originalPrice}</span>` : ''}</span>
          <button class="btn btn-primary btn-add-instant" data-id="${p.id}" style="padding: 0.5rem 0.8rem; font-size: 0.75rem;">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    // Wishlist color toggles
    const wishlist = JSON.parse(localStorage.getItem('saviaa_wishlist') || '[]');
    const isWishlisted = wishlist.some(i => i.id === p.id);
    const wishlistBtn = card.querySelector('.btn-wishlist-toggle');
    if (isWishlisted && wishlistBtn) {
      wishlistBtn.querySelector('svg').style.fill = 'var(--primary)';
      wishlistBtn.querySelector('svg').style.stroke = 'var(--primary)';
    }

    card.querySelector('.btn-wishlist-toggle').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(p);
      renderCatalog();
    });

    card.querySelector('.btn-quickview').addEventListener('click', (e) => {
      e.stopPropagation();
      openQuickView(p.id);
    });

    card.querySelector('.btn-add-instant').addEventListener('click', (e) => {
      e.stopPropagation();
      const shopItem = {
        id: p.id,
        name: p.name,
        price: p.price,
        fabric: p.fabric,
        image: p.image,
        size: '38',
        isCustom: false
      };
      addToCart(shopItem);
    });

    grid.appendChild(card);
  });
}

// 2. Filters setup
function setupFilterListeners() {
  const catFilters = document.querySelectorAll('.filter-category-btn');
  catFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      catFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilters.category = btn.dataset.value;
      renderCatalog();
    });
  });

  const fabricSelect = document.getElementById('filter-fabric');
  if (fabricSelect) {
    fabricSelect.addEventListener('change', () => {
      activeFilters.fabric = fabricSelect.value;
      renderCatalog();
    });
  }

  const priceSelect = document.getElementById('filter-price');
  if (priceSelect) {
    priceSelect.addEventListener('change', () => {
      activeFilters.price = priceSelect.value;
      renderCatalog();
    });
  }

  const sortSelect = document.getElementById('sort-by');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeFilters.sortBy = sortSelect.value;
      renderCatalog();
    });
  }
}

// 3. Quick View Modal setup
let qvDialog = null;
function setupQuickViewModal() {
  qvDialog = document.getElementById('quickview-modal');
  if (!qvDialog) {
    qvDialog = document.createElement('dialog');
    qvDialog.id = 'quickview-modal';
    document.body.appendChild(qvDialog);
  }
}

function openQuickView(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p || !qvDialog) return;

  qvDialog.innerHTML = `
    <div class="dialog-header">
      <h3 style="font-size: 1.15rem;">Quick View</h3>
      <button class="dialog-close" id="qv-close-btn">&times;</button>
    </div>
    <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; align-items: start;" id="qv-grid-body">
      <div style="aspect-ratio: 4/5; border-radius: var(--radius-card); overflow: hidden;">
        <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div>
        <span class="text-caption" style="font-size: 0.7rem;">${p.category}</span>
        <h4 style="font-size: 1.35rem; margin-top: 0.25rem; margin-bottom: 0.5rem;">${p.name}</h4>
        <p style="font-size: 1.2rem; font-weight: 700; color: var(--primary); margin-bottom: 0.75rem;">₹${p.price}</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${p.desc}</p>
        
        <!-- specs details -->
        <table style="width: 100%; font-size: 0.8rem; border-collapse: collapse; text-align: left; margin-bottom: 1rem;">
          <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 4px 0;">Stitching Time</th><td>${p.stitchingTime}</td></tr>
          <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 4px 0;">Fabric Type</th><td>${p.fabric}</td></tr>
        </table>

        <!-- size selection options -->
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.25rem;">Select Ready Size</label>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;" class="quick-size-selector">
            ${['32', '34', '36', '38', '40', '42'].map(sz => `
              <button class="btn btn-outline qv-size-btn ${sz === '38' ? 'active' : ''}" data-size="${sz}" style="padding: 0.4rem 0.6rem; min-width: 40px; font-size: 0.75rem;">${sz}</button>
            `).join('')}
          </div>
        </div>

        <button class="btn btn-accent qv-add-btn" style="width: 100%;">Add to Cart</button>
        <a href="product-details.html?id=${p.id}" class="btn btn-outline" style="width: 100%; margin-top: 0.5rem; justify-content: center; font-size:0.8rem; padding: 0.5rem;">View Full Details &rarr;</a>
      </div>
    </div>
  `;

  if (window.innerWidth >= 640) {
    qvDialog.querySelector('#qv-grid-body').style.gridTemplateColumns = '1fr 1.2fr';
  }

  let selectedSize = '38';
  const sizeBtns = qvDialog.querySelectorAll('.qv-size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });

  qvDialog.querySelector('#qv-close-btn').addEventListener('click', () => qvDialog.close());

  qvDialog.querySelector('.qv-add-btn').addEventListener('click', () => {
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      fabric: p.fabric,
      image: p.image,
      size: selectedSize,
      isCustom: false
    });
    qvDialog.close();
  });

  qvDialog.showModal();
}

// ==========================================================================
// DYNAMIC PRODUCT DETAILS PAGE INITIALIZER (Sprint 2 additions)
// ==========================================================================
let currentProduct = null;
let currentDetailSize = '38';

function initProductDetailsPage() {
  const container = document.getElementById('details-page-layout-wrapper');
  if (!container) return; // Exit if not on product-details.html page

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || 'rm-1';
  currentProduct = PRODUCTS.find(p => p.id === id);

  if (!currentProduct) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 0;">
        <h2>Product not found</h2>
        <a href="ready-made.html" class="btn btn-primary" style="margin-top: 1rem;">Back to Shop</a>
      </div>
    `;
    return;
  }

  // Log to recently viewed list
  if (typeof logProductVisit === 'function') {
    logProductVisit(currentProduct.id);
  }

  // Populate dynamic DOM fields
  document.getElementById('details-title').textContent = currentProduct.name;
  document.getElementById('details-category').textContent = currentProduct.category;
  document.getElementById('details-price').textContent = `₹${currentProduct.price}`;
  
  const discountRow = document.getElementById('details-discount-badge');
  if (currentProduct.originalPrice > currentProduct.price) {
    const savings = currentProduct.originalPrice - currentProduct.price;
    discountRow.textContent = `SAVE ₹${savings} (${Math.round((savings/currentProduct.originalPrice)*100)}% Off)`;
    discountRow.style.display = 'inline-block';
  } else {
    discountRow.style.display = 'none';
  }

  document.getElementById('details-desc').textContent = currentProduct.desc;
  
  // Set Stock Status
  const stockLabel = document.getElementById('details-stock-status');
  if (currentProduct.stock <= 3) {
    stockLabel.textContent = `⚠️ ONLY ${currentProduct.stock} LEFT IN STOCK (Selling Fast)`;
    stockLabel.style.color = 'var(--primary)';
  } else {
    stockLabel.textContent = `🟢 In Stock (Ready to dispatch)`;
    stockLabel.style.color = 'var(--success)';
  }

  // Setup main viewports
  const mainImg = document.getElementById('details-main-img');
  if (mainImg) {
    mainImg.src = currentProduct.image;
    mainImg.alt = currentProduct.name;
  }

  // Render Specifications table
  const specsBody = document.getElementById('details-specs-table');
  if (specsBody) {
    specsBody.innerHTML = '';
    Object.entries(currentProduct.specs).forEach(([k, v]) => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border)';
      tr.innerHTML = `
        <th style="padding: 10px 0; color: var(--dark); font-weight: 600; font-size: 0.85rem; width: 140px;">${k}</th>
        <td style="padding: 10px 0; font-size: 0.85rem; color: var(--text-muted);">${v}</td>
      `;
      specsBody.appendChild(tr);
    });
  }

  // Setup accessories matching card
  setupProductAccessories();

  // Setup sizing selections
  setupProductSizeSelector();

  // Setup interactive 360 viewer toggler
  setup360ViewerToggle();

  // Render reviews lists
  renderProductReviews();

  // Setup pincode checker
  setupPincodeChecker();

  // Attach Add to Cart and wishlist triggers
  setupProductDetailCTAs();
}

function setupProductAccessories() {
  const checkbox = document.getElementById('add-accessory-checkbox');
  const row = document.getElementById('accessory-row-wrapper');
  if (!checkbox || !row || !currentProduct.accessories) return;

  const acc = currentProduct.accessories;
  row.innerHTML = `
    <img src="${acc.image}" alt="${acc.name}" class="bundle-img">
    <div style="flex:1;">
      <h4 style="font-size: 0.85rem; font-weight: 600;">${acc.name}</h4>
      <span style="font-size: 0.8rem; color: var(--primary); font-weight: 700;">+₹${acc.price}</span>
    </div>
  `;

  checkbox.dataset.price = acc.price;
  checkbox.dataset.name = acc.name;
  checkbox.dataset.image = acc.image;

  checkbox.addEventListener('change', () => {
    updateBundleTotalPrice();
  });
  updateBundleTotalPrice();
}

function updateBundleTotalPrice() {
  const checkbox = document.getElementById('add-accessory-checkbox');
  const bundleTotalLabel = document.getElementById('bundle-grand-total');
  if (!bundleTotalLabel) return;

  let total = currentProduct.price;
  if (checkbox && checkbox.checked) {
    total += parseInt(checkbox.dataset.price);
  }

  bundleTotalLabel.textContent = `₹${total}`;
}

function setupProductSizeSelector() {
  const container = document.getElementById('details-size-selector');
  if (!container) return;

  container.innerHTML = '';
  ['32', '34', '36', '38', '40', '42', '44'].forEach(sz => {
    const btn = document.createElement('button');
    btn.className = `btn btn-outline qv-size-btn ${sz === currentDetailSize ? 'active' : ''}`;
    btn.style.padding = '0.5rem 0.8rem';
    btn.style.minWidth = '45px';
    btn.textContent = sz;
    
    btn.addEventListener('click', () => {
      container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDetailSize = sz;
    });

    container.appendChild(btn);
  });
}

function setup360ViewerToggle() {
  const toggleBtn = document.getElementById('btn-toggle-360');
  const mainImg = document.getElementById('details-main-img');
  const viewer360 = document.getElementById('details-360-viewer-container');
  const canvas = document.getElementById('visual-360-canvas');

  if (!toggleBtn || !mainImg || !viewer360 || !canvas) return;

  toggleBtn.addEventListener('click', () => {
    if (viewer360.style.display === 'block') {
      viewer360.style.display = 'none';
      mainImg.style.display = 'block';
      toggleBtn.textContent = '360° View';
    } else {
      mainImg.style.display = 'none';
      viewer360.style.display = 'block';
      toggleBtn.textContent = 'Photo View';
      load360CanvasMock(canvas);
    }
  });
}

function load360CanvasMock(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Simple animated mock rotation by drawing vector outlines
  let angle = 0;
  let isDragging = false;
  let startX = 0;

  const drawFrame = (rotAngle) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(Math.cos(rotAngle * Math.PI / 180), 1);
    
    // Draw mockup blouse outline inside canvas
    ctx.fillStyle = currentProduct.colorHex || '#A52A5A';
    ctx.strokeStyle = '#1E1E1E';
    ctx.lineWidth = 4;
    
    ctx.beginPath();
    ctx.moveTo(-50, -40);
    ctx.lineTo(50, -40);
    ctx.lineTo(60, 40);
    ctx.quadraticCurveTo(0, 45, -60, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw sleeves
    ctx.fillStyle = '#1E1E1E';
    ctx.fillRect(-75, -40, 25, 30);
    ctx.fillRect(50, -40, 25, 30);
    
    ctx.restore();
  };

  canvas.width = 300;
  canvas.height = 300;
  drawFrame(angle);

  // Drag interaction
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    angle = (angle + diff * 0.5) % 360;
    startX = e.clientX;
    drawFrame(angle);
  });
}

function renderProductReviews() {
  const container = document.getElementById('details-reviews-list');
  if (!container) return;

  container.innerHTML = '';
  
  if (!currentProduct.reviews || currentProduct.reviews.length === 0) {
    container.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); padding: var(--spacing-sm) 0;">No reviews yet. Be the first to verify and review.</p>`;
    return;
  }

  currentProduct.reviews.forEach(r => {
    const div = document.createElement('div');
    div.style.borderBottom = '1px solid var(--border)';
    div.style.padding = '1rem 0';
    div.className = 'reveal-on-scroll';

    let starsHtml = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
    let verifiedHtml = r.verified ? `<span class="verified-badge">✓ Verified Fit</span>` : '';
    
    let imagesHtml = '';
    if (r.images && r.images.length > 0) {
      imagesHtml = `<div class="review-media-grid">
        ${r.images.map(img => `<img src="${img}" class="review-media-thumbnail" alt="User review blouse fit">`).join('')}
      </div>`;
    }

    div.innerHTML = `
      <div class="flex-between" style="margin-bottom: 4px;">
        <div>
          <span style="font-weight: 700; font-size: 0.9rem;">${r.author}</span>
          ${verifiedHtml}
        </div>
        <span style="font-size: 0.8rem; color: var(--text-muted);">${r.date}</span>
      </div>
      <div class="star-rating" style="margin-bottom: 0.25rem;">${starsHtml}</div>
      <p style="font-size: 0.875rem;">${r.text}</p>
      ${imagesHtml}
      
      <!-- helpful button upvote -->
      <div style="margin-top: 0.5rem; display:flex; gap: 0.5rem; align-items:center;">
        <button class="btn btn-outline" style="padding: 2px 8px; font-size: 0.7rem; border-radius: 4px;" onclick="this.innerHTML='👍 Helpful (1)'; showToast('Thank you for upvoting!');">
          👍 Helpful
        </button>
      </div>
    `;
    container.appendChild(div);
  });
}

function setupPincodeChecker() {
  const checkBtn = document.getElementById('btn-check-pincode');
  const pinInput = document.getElementById('pincode-input');
  const resultAlert = document.getElementById('pincode-result-alert');

  if (!checkBtn || !pinInput || !resultAlert) return;

  checkBtn.addEventListener('click', () => {
    const pin = pinInput.value.trim();
    if (!/^\d{6}$/.test(pin)) {
      resultAlert.style.display = 'block';
      resultAlert.style.backgroundColor = '#F8D7DA';
      resultAlert.style.color = '#721C24';
      resultAlert.textContent = '❌ Invalid PIN Code. Please enter a 6-digit Indian PIN Code.';
      return;
    }

    resultAlert.style.display = 'block';
    resultAlert.style.backgroundColor = '#D4EDDA';
    resultAlert.style.color = '#155724';

    // local Vizag pincodes list starts with 530 or 531
    if (pin.startsWith('530') || pin.startsWith('531')) {
      resultAlert.textContent = '🚚 Delivery in 3 Days (Express custom tailoring and free doorstep measurements available in your area!)';
    } else if (pin.startsWith('500') || pin.startsWith('501')) {
      resultAlert.textContent = '🚚 Delivery in 5 Days (Fast delivery and video consultation measurements available for Telangana region)';
    } else {
      resultAlert.textContent = '✈️ Global shipping in 7-9 Days (Free shipping on order bills above ₹1,500)';
    }
  });
}

function setupProductDetailCTAs() {
  const addBtn = document.getElementById('btn-details-add-cart');
  const customizeBtn = document.getElementById('btn-details-customize-shortcut');
  const wishlistBtn = document.getElementById('btn-details-wishlist');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      // Regular blouse addition
      const mainItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        fabric: currentProduct.fabric,
        image: currentProduct.image,
        size: currentDetailSize,
        isCustom: false
      };
      addToCart(mainItem, false); // Add base product

      // Check accessory bundle checkbox
      const accessoryBox = document.getElementById('add-accessory-checkbox');
      if (accessoryBox && accessoryBox.checked && currentProduct.accessories) {
        const acc = currentProduct.accessories;
        addToCart({
          id: 'acc-' + currentProduct.id,
          name: acc.name,
          price: acc.price,
          fabric: 'Accessory',
          image: acc.image,
          size: 'OS',
          isCustom: false
        }, false);
      }

      showToast(`${currentProduct.name} added to cart!`);
    });
  }

  if (customizeBtn) {
    customizeBtn.addEventListener('click', () => {
      // Redirect directly to customizations studio, passing presets
      window.location.href = `customization-studio.html?neck=${encodeURIComponent(currentProduct.neck)}&sleeves=${encodeURIComponent(currentProduct.sleeves)}&fabric=${encodeURIComponent(currentProduct.fabric)}`;
    });
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      toggleWishlist(currentProduct);
      
      const wishlist = JSON.parse(localStorage.getItem('saviaa_wishlist') || '[]');
      const isWishlisted = wishlist.some(i => i.id === currentProduct.id);
      wishlistBtn.textContent = isWishlisted ? '❤️ Added to Wishlist' : '🖤 Add to Wishlist';
    });
    
    // Set initial text
    const wishlist = JSON.parse(localStorage.getItem('saviaa_wishlist') || '[]');
    const isWishlisted = wishlist.some(i => i.id === currentProduct.id);
    wishlistBtn.textContent = isWishlisted ? '❤️ Added to Wishlist' : '🖤 Add to Wishlist';
  }
}
