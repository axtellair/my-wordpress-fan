import { CAT_LABEL_ACCESSORY, CAT_ICON_ACCESSORY } from "../data/accessoryData.js";

export function createAccessoryCard(item) {
  const el = document.createElement('article');
  el.className = 'product-card accessory-card reveal';
  el.innerHTML = `
    <div class="p-ico">
      <img src="${item.imgUrl}" alt="${item.model}" loading="lazy">
    </div>
    <div class="p-cat">${CAT_LABEL_ACCESSORY}</div>
    <h3>${item.model}</h3>
    <p class="p-desc">${item.desc}</p>
    <a class="p-link" href="#contact">Enquire <i class="fa-solid fa-arrow-right-long"></i></a>`;
  return el;
}

export function renderAccessoryList(list, container, observer) {
  list.forEach(item => {
    const card = createAccessoryCard(item);
    container.appendChild(card);
    observer.observe(card);
  })
}
