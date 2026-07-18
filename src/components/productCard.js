export function makeProductCard(item, catLabel = 'Ceiling'){
  const el = document.createElement('article');
  el.className = 'product-card';
  const img = item.image ? `<img src="${item.image}" alt="${item.model}" loading="lazy">` : `<div style="font-size:40px">${catLabel}</div>`;
  el.innerHTML = `
    <div class="p-ico">${img}</div>
    <div class="p-cat">${catLabel}</div>
    <h3>${item.model}</h3>
    <ul class="p-specs">
      <li><span>Diameter</span><span>${item.diameter || '—'} mm</span></li>
      <li><span>Power</span><span>${item.power || '—'} kW</span></li>
      <li><span>Airflow</span><span>${item.airflow || '—'} m³/min</span></li>
      <li><span>Noise</span><span>${item.noise || '—'} dB</span></li>
    </ul>
  `;
  return el;
}

export function renderProducts(filter, container, items){
  container.innerHTML = '';
  const label = filter === 'mobile' ? 'Mobile Fan' : (filter === 'accessory' ? 'Accessory' : 'Ceiling Fan');
  items.forEach(i => container.appendChild(makeProductCard(i, label)));
}
