import { CAT_LABEL_MOBILE, CAT_ICON_MOBILE } from "../data/mobileFan.js";

export function createMobileCard(item) {
  const el = document.createElement('article');
  el.className = 'product-card reveal';
  el.innerHTML = `
    <div class="p-ico">
      <img src="${item.imgUrl}" alt="${item.model} mobile industrial fan" loading="lazy">
    </div>
    <div class="p-cat">${CAT_LABEL_MOBILE}</div>
    <h3>${item.model}</h3>
    <ul class="p-specs">
      <li><span>Diameter</span><span>${item.diameter} mm</span></li>
      <li><span>Power</span><span>${item.power} kW</span></li>
      <li><span>Airflow</span><span>${item.airflow} m³/min</span></li>
      <li><span>Noise</span><span>${item.noise} dB</span></li>
    </ul>
    <a class="p-link" href="#specs">View specs <i class="fa-solid fa-arrow-right-long"></i></a>`;
  return el;
}

export function renderMobileList(list, container, observer) {
  list.forEach(item => {
    const card = createMobileCard(item);
    container.appendChild(card);
    observer.observe(card);
  })
}
