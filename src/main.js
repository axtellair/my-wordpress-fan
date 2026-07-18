import './styles/main.css';
import ceiling from './data/ceiling.json';
import mobile from './data/mobile.json';
import accessories from './data/accessories.json';
import { renderTabs } from './components/tabs.js';
import { renderProducts } from './components/productCard.js';
import { renderSpecs } from './components/specTable.js';

const app = document.getElementById('app');

app.innerHTML = `
  <header class="header container">
    <div class="brand">AXTELL<span style="color:#fff">FAN</span></div>
  </header>
  <main>
    <section class="hero container">
      <h1>Massive Coverage. Ultra-Low Noise. Energy Efficient.</h1>
      <p>Industrial fans built for demanding environments.</p>
    </section>

    <section class="section container" id="products">
      <div id="tabs" class="tabs"></div>
      <div id="productGrid" class="product-grid"></div>
    </section>

    <section class="section container" id="specs">
      <h2>Specifications</h2>
      <div class="spec-wrap">
        <table id="specTable" class="spec-table"></table>
      </div>
    </section>

    <section class="section container" id="contact">
      <h2>Contact Us</h2>
      <p>Email: <a href="mailto:sales@axtell.us">sales@axtell.us</a></p>
    </section>
  </main>
`;

const tabContainer = document.getElementById('tabs');
const productGrid = document.getElementById('productGrid');
const specTable = document.getElementById('specTable');

const dataSets = {
  ceiling: ceiling,
  mobile: mobile,
  accessory: accessories
};

renderTabs(tabContainer, (filter) => {
  setFilter(filter);
});

function setFilter(filter){
  const items = filter === 'accessory' ? dataSets.accessory : dataSets[filter];
  renderProducts(filter, productGrid, items);
  // For specs, only render ceiling models in this simplified starter
  if(filter === 'ceiling') renderSpecs(specTable, dataSets.ceiling);
  else renderSpecs(specTable, (filter === 'mobile' ? dataSets.mobile : dataSets.ceiling));
}

// initial
setFilter('ceiling');

// expose for debugging
window.__AXT_DATA__ = dataSets;
