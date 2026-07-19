import { CAT_LABEL_CEILING, CAT_ICON_CEILING } from "../data/ceilingFan.js";

// 生成吊扇卡片DOM
export function createCeilingCard(item) {
  const el = document.createElement('article');
  el.className = 'product-card reveal';
  el.innerHTML = `
    <div class="p-ico">
      <img src="${item.imgUrl}" alt="${item.model} industrial ceiling fan" loading="lazy">
    </div>
    <div class="p-cat">${CAT_LABEL_CEILING}</div>
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

// 批量渲染全部吊扇
export function renderCeilingList(list, container, observer) {
  list.forEach(item => {
    const card = createCeilingCard(item);
    container.appendChild(card);
    observer.observe(card);
  })
}
