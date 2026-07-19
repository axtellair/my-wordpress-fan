/**
 * Product Rendering Module
 * Handles rendering of product cards for all product types
 */

const catLabel = { ceiling: 'Ceiling Fan', mobile: 'Mobile Fan', accessory: 'Accessory' };
const catIcon = { ceiling: 'fa-fan', mobile: 'fa-truck-medical', accessory: 'fa-screwdriver-wrench' };

/**
 * Create product card element
 * @param {string} category - Product category (ceiling, mobile, accessory)
 * @param {Object} product - Product data object
 * @returns {HTMLElement}
 */
export function createProductCard(category, product) {
  const el = document.createElement('article');
  el.className = 'product-card reveal';

  const imgHtml = product.image
    ? `<img src="${product.image}" alt="${product.model}" loading="lazy" />`
    : `<i class="fa-solid ${catIcon[category]}" aria-hidden="true"></i>`;

  el.innerHTML = `
    <div class="p-ico">${imgHtml}</div>
    <div class="p-cat">${catLabel[category]}</div>
    <h3>${product.model}</h3>
    <ul class="p-specs">
      <li><span>Diameter</span><span>${product.diameter} mm</span></li>
      <li><span>Power</span><span>${product.power} kW</span></li>
      <li><span>Airflow</span><span>${product.airflow} m³/min</span></li>
      <li><span>Noise</span><span>${product.noise} dB</span></li>
    </ul>
    <a class="p-link" href="#specs">View specs <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i></a>
  `;

  return el;
}

/**
 * Create accessory card element
 * @param {Object} accessory - Accessory data object
 * @returns {HTMLElement}
 */
export function createAccessoryCard(accessory) {
  const el = document.createElement('article');
  el.className = 'product-card accessory-card reveal';

  const imgHtml = accessory.image
    ? `<img src="${accessory.image}" alt="${accessory.model}" loading="lazy" />`
    : `<i class="fa-solid ${catIcon.accessory}" aria-hidden="true"></i>`;

  el.innerHTML = `
    <div class="p-ico">${imgHtml}</div>
    <div class="p-cat">Accessory</div>
    <h3>${accessory.model}</h3>
    <p class="p-desc">${accessory.desc}</p>
    <a class="p-link" href="#contact">Enquire <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i></a>
  `;

  return el;
}

/**
 * Render products to grid
 * @param {HTMLElement} container - Container element
 * @param {Array} items - Array of product items
 * @param {Function} revealObserver - Reveal observer callback
 */
export function renderProductsToGrid(container, items, revealObserver) {
  container.innerHTML = '';

  items.forEach(item => {
    const el = item.type === 'accessory'
      ? createAccessoryCard(item.data)
      : createProductCard(item.type, item.data);

    container.appendChild(el);
  });

  // Observe new reveal elements
  if (revealObserver) {
    document.querySelectorAll('#productGrid .reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }
}
