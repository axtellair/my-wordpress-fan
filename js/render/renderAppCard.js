import { APPLICATIONS } from "../data/appScene.js";

export function renderAppSceneGrid(container, observer) {
  APPLICATIONS.forEach((a, i) => {
    const el = document.createElement('article');
    el.className = 'app-card reveal';
    el.dataset.delay = (i % 3) + 1;
    el.innerHTML = `
      <div class="ico"><i class="fa-solid ${a.icon}"></i></div>
      <h3>${a.title}</h3>
      <p>${a.text}</p>
      <img src="${a.imgUrl}" alt="${a.title} AXTELL fan application" style="width:100%;margin-top:16px;border-radius:8px;" loading="lazy">`;
    container.appendChild(el);
    observer.observe(el);
  });
}
