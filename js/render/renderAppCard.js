/**
 * Application Cards Rendering Module
 * Handles rendering of application/use case cards
 */

/**
 * Create application card element
 * @param {Object} app - Application data object
 * @param {number} index - Card index for delay
 * @returns {HTMLElement}
 */
export function createAppCard(app, index) {
  const el = document.createElement('article');
  el.className = 'app-card reveal';
  el.dataset.delay = (index % 3) + 1;

  const imgHtml = app.image
    ? `<img src="${app.image}" alt="${app.title}" loading="lazy" />`
    : `<i class="fa-solid ${app.icon}" aria-hidden="true"></i>`;

  el.innerHTML = `
    <div class="app-img">${imgHtml}</div>
    <div class="app-body">
      <h3>${app.title}</h3>
      <p>${app.text}</p>
    </div>
  `;

  return el;
}

/**
 * Render applications to grid
 * @param {HTMLElement} container - Container element
 * @param {Array} applications - Array of application data
 * @param {Function} revealObserver - Reveal observer callback
 */
export function renderAppsToGrid(container, applications, revealObserver) {
  container.innerHTML = '';

  applications.forEach((app, index) => {
    const el = createAppCard(app, index);
    container.appendChild(el);
  });

  // Observe new reveal elements
  if (revealObserver) {
    document.querySelectorAll('#appGrid .reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }
}
