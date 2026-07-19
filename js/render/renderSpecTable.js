import { CEILING_FANS } from "../data/ceilingFan.js";

// 初始化表格数据源
export const specRows = CEILING_FANS.map(item => ({ category: 'Ceiling', ...item }));

// 渲染规格表格
export function renderSpecTable(rows, tableBody) {
  tableBody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    const cls = r.category.toLowerCase();
    tr.innerHTML = `
      <td><span class="cat-pill ${cls}">${r.category}</span></td>
      <td><strong>${r.model}</strong></td>
      <td>${r.diameter || '—'}</td>
      <td>${r.power ? r.power.toFixed(2) : '—'}</td>
      <td>${r.speed || '—'}</td>
      <td>${r.airflow || '—'}</td>
      <td>${r.noise || '—'}</td>
      <td>${r.weight ? r.weight.toFixed(1) : '—'}</td>`;
    tableBody.appendChild(tr);
  });
}
