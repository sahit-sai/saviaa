// ==========================================================================
// SAVIAA CUSTOMIZATION BUILDER ENGINE (Sprint 2 Upgraded)
// ==========================================================================

const BASE_PRICE = 1800; // Base custom stitching price in INR

// Options data with prices
const customOptions = {
  neck: {
    'U-Neck': 0,
    'V-Neck': 0,
    'Boat Neck': 150,
    'High Neck': 250
  },
  sleeves: {
    'Sleeveless': -150,
    'Cap Sleeves': 0,
    'Elbow Length': 200,
    'Full Sleeves': 500
  },
  back: {
    'Classic Round': 0,
    'Deep U-Neck': 100,
    'Keyhole Cut': 250,
    'Bow-Tie Open': 300
  },
  buttons: {
    'Hooks back': 0,
    'Hooks front': 0,
    'Zipper': 150,
    'Potli buttons': 150
  },
  borderTrim: {
    'No Trim': 0,
    'Thin zari border': 100,
    'Thick zari lace': 200,
    'Velvet stripe border': 200
  },
  fabric: {
    'None (Provide Own Fabric)': 0,
    'Premium Raw Silk': 1200,
    'Banarasi Silk': 2500,
    'Chiffon Georgette': 800,
    'Royal Velvet': 1800,
    'Handloom Cotton': 600
  },
  embroidery: {
    'No Embroidery': 0,
    'Minimal Zari Border': 800,
    'Zardozi Heavy Handwork': 3500,
    'Traditional Maggam Work': 4500,
    'Elegant Pearl Details': 2000
  },
  addons: {
    padding: 300,
    latkans: 250,
    lining: 200,
    mirrorWork: 1500,
    stoneWork: 1200
  }
};

// Current configuration state
let currentConfig = {
  view: 'front', // 'front' or 'back'
  neck: 'U-Neck',
  sleeves: 'Cap Sleeves',
  back: 'Classic Round',
  buttons: 'Hooks back',
  borderTrim: 'No Trim',
  fabric: 'Premium Raw Silk',
  embroidery: 'No Embroidery',
  colorName: 'Crimson Red',
  colorHex: '#A52A5A',
  padding: false,
  latkans: false,
  lining: true,
  mirrorWork: false,
  stoneWork: false,
  notes: '',
  size: '36'
};

// Sprint 2: State History stack arrays
let historyStack = [];
let historyIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
  initCustomizer();
});

function initCustomizer() {
  const container = document.querySelector('.studio-container');
  if (!container) return; // Exit if not on Customizer page

  // Parse preset parameters from URL queries (e.g. ?neck=V-Neck&sleeves=Sleeveless)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('neck')) currentConfig.neck = urlParams.get('neck');
  if (urlParams.get('sleeves')) currentConfig.sleeves = urlParams.get('sleeves');
  if (urlParams.get('fabric')) currentConfig.fabric = urlParams.get('fabric');

  setupOptionListeners();
  setupColorListeners();
  setupToggleView();
  setupFormSubmit();
  
  // Push initial state to history stack
  pushHistoryState();

  calculatePrice();
  updateSVGPreview();
  syncUIWithState();
}

// Push to history stack
function pushHistoryState() {
  // Slice off any forward redo history if we make a new change
  historyStack = historyStack.slice(0, historyIndex + 1);
  
  // Clone currentConfig
  historyStack.push(JSON.parse(JSON.stringify(currentConfig)));
  historyIndex++;
  
  // Keep max 20 history states
  if (historyStack.length > 20) {
    historyStack.shift();
    historyIndex--;
  }

  updateHistoryButtons();
}

function updateHistoryButtons() {
  const undoBtn = document.getElementById('btn-undo');
  const redoBtn = document.getElementById('btn-redo');

  if (undoBtn) undoBtn.disabled = historyIndex <= 0;
  if (redoBtn) redoBtn.disabled = historyIndex >= historyStack.length - 1;
}

function triggerUndo() {
  if (historyIndex <= 0) return;
  historyIndex--;
  currentConfig = JSON.parse(JSON.stringify(historyStack[historyIndex]));
  
  // Apply changes to UI and recalculate
  syncUIWithState();
  calculatePrice();
  updateSVGPreview();
  updateHistoryButtons();
  if (typeof showToast === 'function') showToast("Undo action completed");
}

function triggerRedo() {
  if (historyIndex >= historyStack.length - 1) return;
  historyIndex++;
  currentConfig = JSON.parse(JSON.stringify(historyStack[historyIndex]));

  // Apply changes to UI and recalculate
  syncUIWithState();
  calculatePrice();
  updateSVGPreview();
  updateHistoryButtons();
  if (typeof showToast === 'function') showToast("Redo action completed");
}

// Synchronizes the visual card borders with the internal config variables
function syncUIWithState() {
  // Option Cards
  document.querySelectorAll('.option-card').forEach(card => {
    const type = card.dataset.type;
    const val = card.dataset.value;
    if (type && val && currentConfig[type] !== undefined) {
      card.classList.toggle('active', currentConfig[type] === val);
    }
  });

  // Color Dots
  document.querySelectorAll('.color-dot').forEach(dot => {
    const hex = dot.dataset.color;
    dot.classList.toggle('active', currentConfig.colorHex === hex);
  });
  
  const activeColorText = document.getElementById('active-color-name');
  if (activeColorText) activeColorText.textContent = currentConfig.colorName;

  // Addons checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(box => {
    const addon = box.dataset.addon;
    if (addon && currentConfig[addon] !== undefined) {
      box.checked = currentConfig[addon];
    }
  });

  // Select dropdowns
  const fabSelect = document.getElementById('fabric-select-dropdown');
  if (fabSelect) fabSelect.value = currentConfig.fabric;

  const embSelect = document.getElementById('embroidery-select-dropdown');
  if (embSelect) embSelect.value = currentConfig.embroidery;

  const sizeSelect = document.getElementById('blouse-size');
  if (sizeSelect) sizeSelect.value = currentConfig.size;

  const notesText = document.getElementById('custom-notes');
  if (notesText) notesText.value = currentConfig.notes;
}

// 1. Setup options card select click listeners
function setupOptionListeners() {
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      const value = card.dataset.value;
      if (!type || !value) return;

      // Update state & push to history
      if (currentConfig[type] !== value) {
        currentConfig[type] = value;
        pushHistoryState();
      }

      // Auto switch view based on layout triggers
      if (type === 'back' && currentConfig.view !== 'back') {
        switchView('back');
      } else if (type === 'neck' && currentConfig.view !== 'front') {
        switchView('front');
      }

      calculatePrice();
      updateSVGPreview();
      syncUIWithState();
    });
  });

  // Checkboxes listeners
  document.querySelectorAll('input[type="checkbox"]').forEach(box => {
    box.addEventListener('change', () => {
      const addon = box.dataset.addon;
      if (!addon) return;

      if (currentConfig[addon] !== box.checked) {
        currentConfig[addon] = box.checked;
        pushHistoryState();
      }

      if (addon === 'latkans' && box.checked && currentConfig.view !== 'back') {
        switchView('back');
      }

      calculatePrice();
      updateSVGPreview();
    });
  });

  // Size Dropdown listener
  const sizeSelect = document.getElementById('blouse-size');
  if (sizeSelect) {
    sizeSelect.addEventListener('change', () => {
      currentConfig.size = sizeSelect.value;
      pushHistoryState();
    });
  }

  // Notes listener
  const notesText = document.getElementById('custom-notes');
  if (notesText) {
    notesText.addEventListener('input', () => {
      currentConfig.notes = notesText.value;
    });
  }
}

// 2. Setup colors picker dots
function setupColorListeners() {
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const hex = dot.dataset.color;
      const name = dot.dataset.name;

      if (currentConfig.colorHex !== hex) {
        currentConfig.colorHex = hex;
        currentConfig.colorName = name;
        pushHistoryState();
      }

      // Update SVG filled color variable
      const fills = document.querySelectorAll('.blouse-fill');
      fills.forEach(fill => {
        fill.style.fill = currentConfig.colorHex;
      });

      const activeColorText = document.getElementById('active-color-name');
      if (activeColorText) activeColorText.textContent = currentConfig.colorName;
      
      syncUIWithState();
    });
  });
}

// 3. Toggle View between Front and Back of the blouse
function setupToggleView() {
  document.querySelectorAll('.visualizer-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      switchView(view);
    });
  });
}

function switchView(view) {
  currentConfig.view = view;
  
  document.querySelectorAll('.visualizer-toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  const frontSVG = document.getElementById('blouse-front-svg');
  const backSVG = document.getElementById('blouse-back-svg');
  
  if (view === 'front') {
    if (frontSVG) frontSVG.style.display = 'block';
    if (backSVG) backSVG.style.display = 'none';
  } else {
    if (frontSVG) frontSVG.style.display = 'none';
    if (backSVG) backSVG.style.display = 'block';
  }
  updateSVGPreview();
}

// 4. Update SVG layers based on selected sleeves, neck cuts
function updateSVGPreview() {
  const isFront = currentConfig.view === 'front';
  
  const sleeveCapFront = document.getElementById('sleeve-cap-front');
  const sleeveElbowFront = document.getElementById('sleeve-elbow-front');
  const sleeveFullFront = document.getElementById('sleeve-full-front');
  const sleeveSleevelessFront = document.getElementById('sleeve-sleeveless-front');
  
  const sleeveCapBack = document.getElementById('sleeve-cap-back');
  const sleeveElbowBack = document.getElementById('sleeve-elbow-back');
  const sleeveFullBack = document.getElementById('sleeve-full-back');
  const sleeveSleevelessBack = document.getElementById('sleeve-sleeveless-back');
 
  const hideAllSleeves = () => {
    [sleeveCapFront, sleeveElbowFront, sleeveFullFront, sleeveSleevelessFront,
     sleeveCapBack, sleeveElbowBack, sleeveFullBack, sleeveSleevelessBack].forEach(el => {
      if (el) el.style.display = 'none';
    });
  };

  hideAllSleeves();

  const sleeveVal = currentConfig.sleeves;
  if (isFront) {
    if (sleeveVal === 'Sleeveless') {
      if (sleeveSleevelessFront) sleeveSleevelessFront.style.display = 'block';
    } else if (sleeveVal === 'Elbow Length') {
      if (sleeveElbowFront) sleeveElbowFront.style.display = 'block';
    } else if (sleeveVal === 'Full Sleeves') {
      if (sleeveFullFront) sleeveFullFront.style.display = 'block';
    } else {
      if (sleeveCapFront) sleeveCapFront.style.display = 'block';
    }
  } else {
    if (sleeveVal === 'Sleeveless') {
      if (sleeveSleevelessBack) sleeveSleevelessBack.style.display = 'block';
    } else if (sleeveVal === 'Elbow Length') {
      if (sleeveElbowBack) sleeveElbowBack.style.display = 'block';
    } else if (sleeveVal === 'Full Sleeves') {
      if (sleeveFullBack) sleeveFullBack.style.display = 'block';
    } else {
      if (sleeveCapBack) sleeveCapBack.style.display = 'block';
    }
  }

  // Neck profiles logic
  const neckU = document.getElementById('neck-u-path');
  const neckV = document.getElementById('neck-v-path');
  const neckBoat = document.getElementById('neck-boat-path');
  const neckHigh = document.getElementById('neck-high-path');

  if (isFront && neckU && neckV && neckBoat && neckHigh) {
    neckU.style.display = 'none';
    neckV.style.display = 'none';
    neckBoat.style.display = 'none';
    neckHigh.style.display = 'none';

    const neckVal = currentConfig.neck;
    if (neckVal === 'V-Neck') neckV.style.display = 'block';
    else if (neckVal === 'Boat Neck') neckBoat.style.display = 'block';
    else if (neckVal === 'High Neck') neckHigh.style.display = 'block';
    else neckU.style.display = 'block';
  }

  // Back layout logic
  const backRound = document.getElementById('back-round-path');
  const backDeep = document.getElementById('back-deep-path');
  const backKeyhole = document.getElementById('back-keyhole-path');

  if (!isFront && backRound && backDeep && backKeyhole) {
    backRound.style.display = 'none';
    backDeep.style.display = 'none';
    backKeyhole.style.display = 'none';

    const backVal = currentConfig.back;
    if (backVal === 'Deep U-Neck') backDeep.style.display = 'block';
    else if (backVal === 'Keyhole Cut') backKeyhole.style.display = 'block';
    else backRound.style.display = 'block';

    const tasselsNode = document.getElementById('back-tassels');
    if (tasselsNode) {
      tasselsNode.style.display = currentConfig.latkans ? 'block' : 'none';
    }
  }

  // Color fills
  const fills = document.querySelectorAll('.blouse-fill');
  fills.forEach(fill => {
    fill.style.fill = currentConfig.colorHex;
  });
}

// Calculate stitching bill summary
function calculatePrice() {
  let subtotalStitching = BASE_PRICE;
  let subtotalFabric = 0;
  let subtotalExtras = 0;

  subtotalStitching += customOptions.neck[currentConfig.neck] || 0;
  subtotalStitching += customOptions.sleeves[currentConfig.sleeves] || 0;
  subtotalStitching += customOptions.back[currentConfig.back] || 0;
  subtotalStitching += customOptions.buttons[currentConfig.buttons] || 0;
  subtotalStitching += customOptions.borderTrim[currentConfig.borderTrim] || 0;

  subtotalFabric += customOptions.fabric[currentConfig.fabric] || 0;

  subtotalExtras += customOptions.embroidery[currentConfig.embroidery] || 0;

  if (currentConfig.padding) subtotalExtras += customOptions.addons.padding;
  if (currentConfig.latkans) subtotalExtras += customOptions.addons.latkans;
  if (currentConfig.lining && currentConfig.fabric !== 'None (Provide Own Fabric)') {
    subtotalExtras += customOptions.addons.lining;
  }
  if (currentConfig.mirrorWork) subtotalExtras += customOptions.addons.mirrorWork;
  if (currentConfig.stoneWork) subtotalExtras += customOptions.addons.stoneWork;

  const grandTotal = subtotalStitching + subtotalFabric + subtotalExtras;

  const textStitching = document.getElementById('price-stitching');
  const textFabric = document.getElementById('price-fabric');
  const textExtras = document.getElementById('price-extras');
  const textTotal = document.getElementById('price-total');

  if (textStitching) textStitching.textContent = `₹${subtotalStitching}`;
  if (textFabric) textFabric.textContent = `₹${subtotalFabric}`;
  if (textExtras) textExtras.textContent = `₹${subtotalExtras}`;
  if (textTotal) textTotal.textContent = `₹${grandTotal}`;

  currentConfig.price = grandTotal;
}

// 6. Handle Form Submit
function setupFormSubmit() {
  const form = document.getElementById('customizer-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const customItem = {
      id: 'custom-' + Date.now(),
      name: `Custom Blouse (${currentConfig.fabric.split(' (')[0]})`,
      price: currentConfig.price,
      quantity: 1,
      size: currentConfig.size,
      isCustom: true,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400',
      config: {
        neck: currentConfig.neck,
        sleeves: currentConfig.sleeves,
        back: currentConfig.back,
        lining: currentConfig.lining ? 'Cotton Lining' : 'No Lining',
        fabric: `${currentConfig.fabric} - ${currentConfig.colorName}`,
        embroidery: currentConfig.embroidery,
        padding: currentConfig.padding ? 'Padded' : 'Non-padded',
        tassels: currentConfig.latkans ? 'Latkans Added' : 'No Latkans',
        buttons: currentConfig.buttons,
        border: currentConfig.borderTrim,
        mirrorWork: currentConfig.mirrorWork ? 'Mirrors Added' : 'None',
        stoneWork: currentConfig.stoneWork ? 'Stones Added' : 'None',
        notes: currentConfig.notes || 'None'
      }
    };

    if (typeof addToCart === 'function') {
      addToCart(customItem);
      setTimeout(() => {
        window.location.href = 'cart.html';
      }, 1200);
    }
  });
}

// ==========================================================================
// SPRINT 2: DRAFT DRAFT SAVING & LOADING
// ==========================================================================
function triggerSaveDraft() {
  localStorage.setItem('saviaa_custom_draft', JSON.stringify(currentConfig));
  if (typeof showToast === 'function') {
    showToast("Blouse design draft saved successfully!", "success");
  }
}

function triggerLoadDraft() {
  const draftRaw = localStorage.getItem('saviaa_custom_draft');
  if (!draftRaw) {
    if (typeof showToast === 'function') {
      showToast("No saved draft found.", "error");
    }
    return;
  }

  currentConfig = JSON.parse(draftRaw);
  pushHistoryState();
  syncUIWithState();
  calculatePrice();
  updateSVGPreview();
  if (typeof showToast === 'function') {
    showToast("Customizer draft loaded successfully!", "success");
  }
}

// ==========================================================================
// SPRINT 2: AI STYLE RECOMMENDATION SYSTEM
// ==========================================================================
function switchAITab(tab) {
  const styleTab = document.getElementById('btn-ai-style-tab');
  const sizeTab = document.getElementById('btn-ai-size-tab');
  const styleContent = document.getElementById('ai-style-content');
  const sizeContent = document.getElementById('ai-size-content');

  if (tab === 'style') {
    styleTab.classList.add('active');
    sizeTab.classList.remove('active');
    styleContent.classList.add('active');
    sizeContent.classList.remove('active');
  } else {
    styleTab.classList.remove('active');
    sizeTab.classList.add('active');
    styleContent.classList.remove('active');
    sizeContent.classList.add('active');
  }
}

function generateAIStyleSuggestion() {
  const occasion = document.getElementById('ai-occasion').value;
  const bodyType = document.getElementById('ai-body').value;
  const colorHex = document.getElementById('ai-saree-color').value;
  
  const responseBox = document.getElementById('ai-style-response');
  if (!responseBox) return;

  responseBox.style.display = 'block';
  
  let recommendation = {
    neck: 'Boat Neck',
    sleeves: 'Elbow Length',
    back: 'Keyhole Cut',
    fabric: 'Premium Raw Silk',
    embroidery: 'Minimal Zari Border',
    colorHex: colorHex,
    colorName: colorHex === '#A52A5A' ? 'Crimson Red' : (colorHex === '#1B4D3E' ? 'Forest Green' : 'Mustard Gold'),
    latkans: true,
    padding: true
  };

  if (occasion === 'office') {
    recommendation.neck = 'Boat Neck';
    recommendation.sleeves = 'Cap Sleeves';
    recommendation.back = 'Classic Round';
    recommendation.fabric = 'Handloom Cotton';
    recommendation.embroidery = 'No Embroidery';
    recommendation.latkans = false;
    recommendation.padding = false;
  } else if (occasion === 'wedding') {
    recommendation.neck = 'V-Neck';
    recommendation.sleeves = 'Elbow Length';
    recommendation.back = 'Deep U-Neck';
    recommendation.fabric = 'Banarasi Silk';
    recommendation.embroidery = 'Traditional Maggam Work';
  } else if (occasion === 'party') {
    recommendation.neck = 'U-Neck';
    recommendation.sleeves = 'Sleeveless';
    recommendation.back = 'Bow-Tie Open';
    recommendation.fabric = 'Royal Velvet';
    recommendation.embroidery = 'Elegant Pearl Details';
  }

  // Draw suggestion response HTML
  responseBox.innerHTML = `
    <div style="background: rgba(255,255,255,0.06); padding: 8px; border-radius: 8px; margin-bottom: 0.5rem; border-left: 3px solid var(--accent);">
      <p style="font-weight: 700; color: var(--accent); margin-bottom: 4px;">🤖 AI Match Recommendation:</p>
      <p style="line-height: 1.3;">Suggesting a <strong>${recommendation.neck}</strong> with <strong>${recommendation.sleeves}</strong>, 
      cut in a <strong>${recommendation.back}</strong> on <strong>${recommendation.fabric}</strong> with <strong>${recommendation.embroidery}</strong>. 
      Fits beautifully for ${bodyType.replace('Shape','')} silhouettes.</p>
    </div>
    <button type="button" class="btn btn-accent" style="width: 100%; padding: 4px 8px; font-size: 0.75rem;" onclick="applyAIStylePreset(${JSON.stringify(recommendation).replace(/"/g, '&quot;')})">Apply Style Recommendation</button>
  `;
}

window.applyAIStylePreset = function(preset) {
  currentConfig.neck = preset.neck;
  currentConfig.sleeves = preset.sleeves;
  currentConfig.back = preset.back;
  currentConfig.fabric = preset.fabric;
  currentConfig.embroidery = preset.embroidery;
  currentConfig.colorHex = preset.colorHex;
  currentConfig.colorName = preset.colorName;
  currentConfig.latkans = preset.latkans;
  currentConfig.padding = preset.padding;

  pushHistoryState();
  syncUIWithState();
  calculatePrice();
  updateSVGPreview();
  
  if (typeof showToast === 'function') {
    showToast("AI Blouse layout applied to builder!", "success");
  }
};

// ==========================================================================
// SPRINT 2: AI SIZE RECOMMENDATION CALCULATOR
// ==========================================================================
function generateAISizeSuggestion() {
  const height = parseFloat(document.getElementById('ai-height').value);
  const weight = parseFloat(document.getElementById('ai-weight').value);
  const bust = parseFloat(document.getElementById('ai-bust-in').value);
  const fitPref = document.getElementById('ai-fit-pref').value;
  
  const responseBox = document.getElementById('ai-size-response');
  if (!responseBox) return;

  if (isNaN(height) || isNaN(weight) || isNaN(bust)) {
    responseBox.style.display = 'block';
    responseBox.style.color = '#FFA07A';
    responseBox.textContent = '⚠️ Please enter all dimensions to calculate.';
    return;
  }

  responseBox.style.display = 'block';
  responseBox.style.color = '#FFF';

  // Compute size based on Bust
  let baseSize = 36;
  if (bust <= 32) baseSize = 32;
  else if (bust <= 34) baseSize = 34;
  else if (bust <= 36) baseSize = 36;
  else if (bust <= 38) baseSize = 38;
  else if (bust <= 40) baseSize = 40;
  else if (bust <= 42) baseSize = 42;
  else baseSize = 44;

  // Fit offset modifier
  let recommendedSize = baseSize;
  if (fitPref === 'tight') {
    // If tight fits, we might stick to size or suggest a snug cut
  } else if (fitPref === 'loose') {
    recommendedSize = Math.min(44, baseSize + 2);
  }

  // Confidence mock scoring
  let confidence = 96;
  if (weight > 80 && recommendedSize < 40) confidence = 89;

  responseBox.innerHTML = `
    <div style="background: rgba(255,255,255,0.06); padding: 8px; border-radius: 8px; border-left: 3px solid var(--success);">
      <p style="font-weight: 700; color: var(--success); font-size: 0.9rem; margin-bottom: 2px;">Size Match: ${recommendedSize}</p>
      <p style="margin-bottom: 4px;">Confidence Score: <strong>${confidence}%</strong></p>
      <button type="button" class="btn btn-outline" style="width: 100%; padding: 4px 8px; font-size: 0.75rem; border-color: rgba(255,255,255,0.2); color:#fff;" onclick="applyAISize(${recommendedSize})">Apply Size ${recommendedSize}</button>
    </div>
  `;
}

window.applyAISize = function(size) {
  const sizeSelect = document.getElementById('blouse-size');
  if (sizeSelect) {
    sizeSelect.value = size.toString();
    currentConfig.size = size.toString();
    pushHistoryState();
    if (typeof showToast === 'function') {
      showToast(`Size ${size} applied to your design profile!`);
    }
  }
};
