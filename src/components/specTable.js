export function renderSpecs(tableEl, rows){
  // rows: array of objects
  const head = `
    <thead>
      <tr>
        <th data-key="category">Category</th>
        <th data-key="model">Model</th>
        <th data-key="diameter">Diameter</th>
        <th data-key="power">Power</th>
        <th data-key="speed">Speed</th>
        <th data-key="airflow">Airflow</th>
        <th data-key="noise">Noise</th>
        <th data-key="weight">Weight</th>
      </tr>
    </thead>
  `;
  const body = `
    <tbody>
      ${rows.map(r => `
        <tr>
          <td>${r.category || 'Ceiling'}</td>
          <td><strong>${r.model}</strong></td>
          <td>${r.diameter || '—'}</td>
          <td>${r.power != null ? Number(r.power).toFixed(2) : '—'}</td>
          <td>${r.speed || '—'}</td>
          <td>${r.airflow || '—'}</td>
          <td>${r.noise || '—'}</td>
          <td>${r.weight != null ? Number(r.weight).toFixed(1) : '—'}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  tableEl.innerHTML = head + body;

  // Basic sorting by clicking the head
  tableEl.querySelectorAll('thead th').forEach(th => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      const isNumber = ['diameter','power','speed','airflow','noise','weight'].includes(key);
      const sorted = [...rows].sort((a,b) => {
        const va = a[key] ?? '';
        const vb = b[key] ?? '';
        if(isNumber) return (Number(va) || 0) - (Number(vb) || 0);
        return String(va).localeCompare(String(vb));
      });
      // toggle asc/desc
      const dir = th.dataset.dir === 'asc' ? 'desc' : 'asc';
      th.dataset.dir = dir;
      if(dir === 'desc') sorted.reverse();
      renderSpecs(tableEl, sorted);
    });
  });
}
