// main.js — entry point for the axtell-fan scaffold
import { CEILING_FANS } from './data/ceilingFan.js';
import { MOBILE_FANS } from './data/mobileFan.js';
import { ACCESSORIES } from './data/accessoryData.js';

// Import renderers when needed (deferred)

export function init() {
  // TODO: initialize app (load components, render initial UI)
  console.log('axtell-fan scaffold initialized');
}

// Auto-init when imported in a browser environment
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => init());
}
