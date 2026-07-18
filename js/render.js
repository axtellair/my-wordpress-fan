/**
 * AXTELL FAN — DOM Rendering Functions
 * Handles all UI element creation and updates
 */

import { CEILING_FANS, MOBILE_FANS, ACCESSORIES, APPLICATIONS, CATEGORY_LABELS, CATEGORY_ICONS, TAB_CONFIGS } from './data.js';

/**
 * Render product tabs
 */
export function renderTabs(tabContainer) {
  tabContainer.innerHTML = '';
  
  TAB_CONFIGS.forEach(cfg => {
    const count = cfg.id === 'ceiling' ? CEILING_FANS.length : 
                  cfg.id === 'mobile' ? MOBILE_FANS.length : 
                  ACCESSORIES.length;
    
    const btn = document.createElement('button');
    btn.className = 'tab' + (cfg.id === 'ceiling' ? ' active' : '');
    btn.dataset.filter = cfg.id;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', cfg.id === 'ceiling' ? 'true' : 'false');
    btn.innerHTML = `<i class="fa-solid ${cfg.icon}" aria-hidden="true"></i> ${cfg.label} <span class="count">${count}</span>`;
    tabContainer.appendChild(btn);
  });
}

/**
 * Create a product card element
 */
function productCard(cat, f) {
  const el = document.createElement('article');
  el.className = 'product-card reveal';
  const imgHtml = f.image
    ? `<img src="${f.image}" alt="${f.model}" loading="lazy" />`
    : `<i class="fa-solid ${CATEGORY_ICONS[cat]}" aria-hidden="true"></i>`;
  
  el.innerHTML = `
    <div class="p-ico">${imgHtml}</div>
    <div class="p-cat">${CATEGORY_LABELS[cat]}</div>
    <h3>${f.model}</h3>
    <ul class="p-specs">
      <li><span>Diameter</span><span>${f.diameter} mm</span></li>
      <li><span>Power</span><span>${f.power} kW</span></li>
      <li><span>Airflow</span><span>${f.airflow} m³/min</span></li>
      <li><span>Noise</span><span>${f.noise} dB</span></li>
    </ul>
    <a class="p-link" href="#specs">View specs <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i></a>`;
  
  return el;
}

/**
 * Create an accessory card element
 */
function accessoryCard(a) {
  const el = document.createElement('article');
  el.className = 'product-card accessory-card reveal';
  const imgHtml = a.image
    ? `<img src="${a.image}" alt="${a.model}" loading="lazy" />`
    : `<i class="fa-solid ${CATEGORY_ICONS.accessory}" aria-hidden="true"></i>`;
  
  el.innerHTML = `
    <div class="p-ico">${imgHtml}</div>
    <div class="p-cat">Accessory</div>
    <h3>${a.model}</h3>
    <p class="p-desc">${a.desc}</p>
    <a class="p-link" href="#contact">Enquire <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i></a>`;
  
  return el;
}

/**
 * Render products grid based on filter
 */
export function renderProducts(productGrid, filter, revealObserver) {
  productGrid.innerHTML = '';
  const items = [];
  
  if (filter === 'ceiling' || filter === 'all') {
    CEILING_FANS.forEach(f => items.push({ type: 'ceiling', data: f }));
  }
  if (filter === 'mobile' || filter === 'all') {
    MOBILE_FANS.forEach(f => items.push({ type: 'mobile', data: f }));
  }
  if (filter === 'accessory' || filter === 'all') {
    ACCESSORIES.forEach(a => items.push({ type: 'accessory', data: a }));
  }
  
  items.forEach(item => {
    const el = item.type === 'accessory'
      ? accessoryCard(item.data)
      : productCard(item.type, item.data);
    productGrid.appendChild(el);
  });
  
  document.querySelectorAll('#productGrid .reveal').forEach(el => revealObserver?.observe(el));
}

/**
 * Render specification table rows
 */
export function renderSpecs(specBody, rows) {
  specBody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    const cls = r.category.toLowerCase();
    tr.innerHTML = `
      <td><span class="cat-pill ${cls}">${r.category}</span></td>
      <td><strong>${r.model}</strong></td>
      <td>${r.diameter || '—'}</td>
      <td>${r.power ? r.power.toFixed(2) : '—'}</td>
      <td>${r.speed || '—'}</td>
      <td>${r.airflow || '—'}</td>
      <td>${r.noise || '—'}</td>
      <td>${r.weight ? r.weight.toFixed(1) : '—'}</td>`;
    specBody.appendChild(tr);
  });
}

/**
 * Render applications grid
 */
export function renderApplications(appGrid, revealObserver) {
  appGrid.innerHTML = '';
  APPLICATIONS.forEach((a, i) => {
    const el = document.createElement('article');
    el.className = 'app-card reveal';
    el.dataset.delay = (i % 3) + 1;
    
    const imgHtml = a.image
      ? `<img src="${a.image}" alt="${a.title}" loading="lazy" />`
      : `<i class="fa-solid ${a.icon}" aria-hidden="true"></i>`;
    
    el.innerHTML = `
      <div class="app-img">${imgHtml}</div>
      <div class="app-body">
        <h3>${a.title}</h3>
        <p>${a.text}</p>
      </div>`;
    
    appGrid.appendChild(el);
    revealObserver?.observe(el);
  });
}
