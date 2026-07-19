/**
 * Component Loader Utility
 * Handles async loading and initialization of page components
 */

class ComponentLoader {
  constructor() {
    this.components = new Map();
    this.loadedComponents = new Set();
  }

  /**
   * Register a component with its initialization function
   * @param {string} name - Component name
   * @param {Function} initializer - Function to initialize the component
   */
  register(name, initializer) {
    this.components.set(name, initializer);
  }

  /**
   * Load a single component
   * @param {string} name - Component name to load
   * @returns {Promise<void>}
   */
  async load(name) {
    if (this.loadedComponents.has(name)) {
      console.warn(`Component "${name}" is already loaded`);
      return;
    }

    const initializer = this.components.get(name);
    if (!initializer) {
      console.error(`Component "${name}" is not registered`);
      return;
    }

    try {
      await initializer();
      this.loadedComponents.add(name);
    } catch (error) {
      console.error(`Failed to load component "${name}":`, error);
    }
  }

  /**
   * Load multiple components in parallel
   * @param {string[]} names - Array of component names
   * @returns {Promise<void>}
   */
  async loadMultiple(names) {
    await Promise.all(names.map(name => this.load(name)));
  }

  /**
   * Load components sequentially (in order)
   * @param {string[]} names - Array of component names
   * @returns {Promise<void>}
   */
  async loadSequential(names) {
    for (const name of names) {
      await this.load(name);
    }
  }

  /**
   * Check if a component is loaded
   * @param {string} name - Component name
   * @returns {boolean}
   */
  isLoaded(name) {
    return this.loadedComponents.has(name);
  }

  /**
   * Get all loaded components
   * @returns {string[]}
   */
  getLoadedComponents() {
    return Array.from(this.loadedComponents);
  }
}

export default new ComponentLoader();
