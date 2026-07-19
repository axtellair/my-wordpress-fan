/**
 * Scroll Reveal Utility
 * Handles scroll-triggered animations and observations
 */

class ScrollReveal {
  constructor(options = {}) {
    this.options = {
      threshold: options.threshold || 0.12,
      rootMargin: options.rootMargin || '0px 0px -40px 0px',
      ...options
    };
    this.observer = null;
    this.elements = new Set();
  }

  /**
   * Initialize the IntersectionObserver
   */
  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.revealElement(entry.target);
        }
      });
    }, {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin
    });
  }

  /**
   * Add element to observation (apply 'in' class when visible)
   * @param {Element|string} selector - DOM element or selector string
   */
  observe(selector) {
    if (!this.observer) this.init();

    const elements = typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : [selector];

    elements.forEach(el => {
      if (el && !this.elements.has(el)) {
        this.elements.add(el);
        this.observer.observe(el);
      }
    });
  }

  /**
   * Reveal element (add 'in' class and stop observing)
   * @param {Element} element - DOM element to reveal
   */
  revealElement(element) {
    element.classList.add('in');
    this.observer.unobserve(element);
    this.elements.delete(element);
  }

  /**
   * Stop observing an element
   * @param {Element} element - DOM element to stop observing
   */
  unobserve(element) {
    if (this.observer) {
      this.observer.unobserve(element);
      this.elements.delete(element);
    }
  }

  /**
   * Stop observing all elements and destroy observer
   */
  destroy() {
    if (this.observer) {
      this.elements.forEach(el => this.observer.unobserve(el));
      this.observer.disconnect();
      this.observer = null;
      this.elements.clear();
    }
  }

  /**
   * Get total number of observed elements
   * @returns {number}
   */
  getObservedCount() {
    return this.elements.size;
  }
}

export default ScrollReveal;
