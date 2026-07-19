/**
 * Utilities Index
 * Central export point for all utility functions
 */

export { default as ComponentLoader } from './componentLoader.js';
export { default as ScrollReveal } from './scrollReveal.js';
export { default as FormValidator } from './formValidate.js';

/**
 * Debounce function utility
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function}
 */
export function debounce(func, delay = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Throttle function utility
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function}
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Query selector helper
 * @param {string} selector - CSS selector
 * @param {Document|Element} context - Context element (default: document)
 * @returns {Element|null}
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Query selector all helper
 * @param {string} selector - CSS selector
 * @param {Document|Element} context - Context element (default: document)
 * @returns {NodeList}
 */
export function $$(selector, context = document) {
  return context.querySelectorAll(selector);
}

/**
 * Add event listener to multiple elements
 * @param {string|Element[]} selector - CSS selector or array of elements
 * @param {string} eventType - Event type (e.g., 'click')
 * @param {Function} handler - Event handler function
 */
export function onEvent(selector, eventType, handler) {
  const elements = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : Array.isArray(selector) ? selector : [selector];

  elements.forEach(el => {
    if (el) el.addEventListener(eventType, handler);
  });
}

/**
 * Remove event listener from multiple elements
 * @param {string|Element[]} selector - CSS selector or array of elements
 * @param {string} eventType - Event type
 * @param {Function} handler - Event handler function
 */
export function offEvent(selector, eventType, handler) {
  const elements = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : Array.isArray(selector) ? selector : [selector];

  elements.forEach(el => {
    if (el) el.removeEventListener(eventType, handler);
  });
}

/**
 * Add class to elements
 * @param {string|Element[]} selector - CSS selector or array of elements
 * @param {string} className - Class name
 */
export function addClass(selector, className) {
  const elements = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : Array.isArray(selector) ? selector : [selector];

  elements.forEach(el => {
    if (el) el.classList.add(className);
  });
}

/**
 * Remove class from elements
 * @param {string|Element[]} selector - CSS selector or array of elements
 * @param {string} className - Class name
 */
export function removeClass(selector, className) {
  const elements = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : Array.isArray(selector) ? selector : [selector];

  elements.forEach(el => {
    if (el) el.classList.remove(className);
  });
}

/**
 * Toggle class on elements
 * @param {string|Element[]} selector - CSS selector or array of elements
 * @param {string} className - Class name
 */
export function toggleClass(selector, className) {
  const elements = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : Array.isArray(selector) ? selector : [selector];

  elements.forEach(el => {
    if (el) el.classList.toggle(className);
  });
}

/**
 * Fetch data with error handling
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<any>}
 */
export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

/**
 * Smooth scroll to element
 * @param {string|Element} target - Target selector or element
 * @param {Object} options - Scroll options
 */
export function scrollTo(target, options = {}) {
  const element = typeof target === 'string'
    ? document.querySelector(target)
    : target;

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options
    });
  }
}

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element
 * @returns {boolean}
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get element position relative to viewport
 * @param {Element} element - DOM element
 * @returns {Object} { top, left, bottom, right }
 */
export function getElementPosition(element) {
  return element.getBoundingClientRect();
}

/**
 * Format number with comma separators
 * @param {number} num - Number to format
 * @returns {string}
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string}
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Delay execution (promise-based)
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
