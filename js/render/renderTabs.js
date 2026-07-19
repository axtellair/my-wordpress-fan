/**
 * Product Tabs Rendering Module
 * Handles rendering of product category tabs
 */

/**
 * Create tab button element
 * @param {Object} config - Tab configuration
 * @param {boolean} isActive - Is this tab active
 * @returns {HTMLButtonElement}
 */
function createTabButton(config, isActive) {
  const btn = document.createElement('button');
  btn.className = 'tab' + (isActive ? ' active' : '');
  btn.dataset.filter = config.id;
  btn.setAttribute('role', 'tab');
  btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  btn.innerHTML = `
    <i class="fa-solid ${config.icon}" aria-hidden="true"></i>
    ${config.label}
    <span class="count">${config.count}</span>
  `;

  return btn;
}

/**
 * Render tabs to container
 * @param {HTMLElement} container - Container element
 * @param {Array} tabConfigs - Tab configuration array
 */
export function renderTabs(container, tabConfigs) {
  container.innerHTML = '';

  tabConfigs.forEach((cfg, index) => {
    const isActive = index === 0; // First tab is active
    const btn = createTabButton(cfg, isActive);
    container.appendChild(btn);
  });
}

/**
 * Get tab configurations
 * @param {number} ceilingCount - Number of ceiling fans
 * @param {number} mobileCount - Number of mobile fans
 * @param {number} accessoryCount - Number of accessories
 * @returns {Array}
 */
export function getTabConfigs(ceilingCount, mobileCount, accessoryCount) {
  return [
    { id: 'ceiling', label: 'Ceiling Fan', icon: 'fa-fan', count: ceilingCount },
    { id: 'mobile', label: 'Mobile Fan', icon: 'fa-truck-medical', count: mobileCount },
    { id: 'accessory', label: 'Accessories', icon: 'fa-screwdriver-wrench', count: accessoryCount }
  ];
}
