/**
 * AXTELL FAN — Main Application Entry Point
 * Handles initialization, event listeners, and page interactions
 */

import { renderTabs, renderProducts, renderSpecs, renderApplications } from './render.js';
import { CEILING_FANS, TAB_CONFIGS } from './data.js';

// ============================================================
// INTERSECTION OBSERVER — Reveal animations
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// ============================================================
// INITIALIZATION
// ============================================================
function init() {
  // Initialize tabs and products
  const tabContainer = document.getElementById('tabContainer');
  const productGrid = document.getElementById('productGrid');
  
  renderTabs(tabContainer);
  renderProducts(productGrid, 'ceiling', revealObserver);
  
  // Initialize specs table
  const specBody = document.getElementById('specBody');
  const specRows = CEILING_FANS.map(f => ({ category: 'Ceiling', ...f }));
  renderSpecs(specBody, specRows);
  
  // Initialize applications
  const appGrid = document.getElementById('appGrid');
  renderApplications(appGrid, revealObserver);
  
  // Observe initial reveal elements
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  
  // Set footer year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Setup event listeners
  setupTabFiltering();
  setupHeaderScroll();
  setupMobileMenu();
  setupSpecTable(specRows);
  setupContactForm();
}

// ============================================================
// TAB FILTERING
// ============================================================
function setupTabFiltering() {
  const tabs = document.querySelectorAll('.tab');
  const productGrid = document.getElementById('productGrid');
  
  function setFilter(filter) {
    tabs.forEach(t => {
      const isActive = t.dataset.filter === filter;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    renderProducts(productGrid, filter, revealObserver);
  }
  
  tabs.forEach(t => t.addEventListener('click', () => setFilter(t.dataset.filter)));
  
  // Handle dropdown filter links
  document.querySelectorAll('[data-filter]').forEach(a => {
    if (a.classList.contains('tab')) return;
    a.addEventListener('click', (e) => {
      const f = a.dataset.filter;
      if (f) {
        e.preventDefault();
        setFilter(f);
        const navLinksEl = document.getElementById('navLinks');
        const navToggle = document.getElementById('navToggle');
        navLinksEl.classList.remove('mobile-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.querySelector('i').className = 'fa-solid fa-bars';
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================================
// HEADER SCROLL STATE & ACTIVE LINK
// ============================================================
function setupHeaderScroll() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('main section[id], #home');
  
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 30);
    let current = 'home';
    const y = window.scrollY + 100;
    sections.forEach(s => {
      if (s.offsetTop <= y) current = s.id;
    });
    document.querySelectorAll('.nav-links > li > a, .nav-links > li > button').forEach(l => {
      const target = l.getAttribute('data-target') || '';
      l.classList.toggle('active', target === current);
    });
  }
  
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// ============================================================
// MOBILE MENU TOGGLE
// ============================================================
function setupMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  const productsNav = document.getElementById('productsNav');
  
  navToggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.contains('mobile-open');
    navLinksEl.classList.toggle('mobile-open');
    navToggle.setAttribute('aria-expanded', !isOpen);
    navToggle.querySelector('i').className = isOpen ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
  });
  
  // Handle products dropdown on mobile
  if (productsNav) {
    const btn = productsNav.querySelector('button');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      productsNav.classList.toggle('open');
      btn.setAttribute('aria-expanded', productsNav.classList.contains('open'));
    });
  }
}

// ============================================================
// SPECIFICATION TABLE SORTING
// ============================================================
function setupSpecTable(initialRows) {
  const specTable = document.getElementById('specTable');
  const specBody = document.getElementById('specBody');
  let sortState = { key: null, dir: null };
  let specRows = [...initialRows];
  
  document.querySelectorAll('#specTable thead th').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      const type = th.dataset.type;
      let dir = 'asc';
      
      if (sortState.key === key && sortState.dir === 'asc') {
        dir = 'desc';
      }
      
      sortState = { key, dir };
      
      const sorted = [...specRows].sort((a, b) => {
        let va = a[key], vb = b[key];
        if (type === 'number') {
          va = Number(va) || 0;
          vb = Number(vb) || 0;
          return dir === 'asc' ? va - vb : vb - va;
        }
        return dir === 'asc' 
          ? String(va).localeCompare(String(vb)) 
          : String(vb).localeCompare(String(va));
      });
      
      renderSpecs(specBody, sorted);
      
      // Update sort indicators
      document.querySelectorAll('#specTable thead th').forEach(t => {
        t.classList.remove('sorted-asc', 'sorted-desc');
        t.querySelector('.sort-ico').innerHTML = '<i class="fa-solid fa-sort" aria-hidden="true"></i>';
      });
      th.classList.add(dir === 'asc' ? 'sorted-asc' : 'sorted-desc');
      th.querySelector('.sort-ico').innerHTML = `<i class="fa-solid fa-sort-${dir === 'asc' ? 'up' : 'down'}" aria-hidden="true"></i>`;
    });
  });
}

// ============================================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================================
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    const fields = form.querySelectorAll('.field');
    let isValid = true;
    
    fields.forEach(field => {
      const input = field.querySelector('input, textarea');
      if (!input) return;
      
      const value = input.value.trim();
      const isRequired = input.hasAttribute('required');
      const isEmail = input.type === 'email';
      
      let valid = true;
      if (isRequired && !value) {
        valid = false;
      } else if (isEmail && value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        valid = false;
      }
      
      field.classList.toggle('invalid', !valid);
      if (!valid) isValid = false;
    });
    
    if (!isValid) return;
    
    // Show loading state
    const originalLabel = submitBtn.querySelector('.btn-label').textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span>';
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    formSuccess.classList.add('show');
    form.style.opacity = '0.5';
    
    // Reset after delay
    setTimeout(() => {
      form.reset();
      form.style.opacity = '1';
      formSuccess.classList.remove('show');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span class="btn-label">${originalLabel} <i class="fa-solid fa-paper-plane" aria-hidden="true"></i></span>`;
    }, 3000);
  });
}

// ============================================================
// START
// ============================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
