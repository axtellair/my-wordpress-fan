/**
 * Specification Table Rendering Module
 * Handles rendering and sorting of specification table
 */

/**
 * Create table row for specification
 * @param {Object} row - Row data
 * @returns {HTMLTableRowElement}
 */
function createSpecRow(row) {
  const tr = document.createElement('tr');
  const cls = row.category.toLowerCase();

  tr.innerHTML = `
    <td><span class="cat-pill ${cls}">${row.category}</span></td>
    <td><strong>${row.model}</strong></td>
    <td>${row.diameter || '—'}</td>
    <td>${row.power ? row.power.toFixed(2) : '—'}</td>
    <td>${row.speed || '—'}</td>
    <td>${row.airflow || '—'}</td>
    <td>${row.noise || '—'}</td>
    <td>${row.weight ? row.weight.toFixed(1) : '—'}</td>
  `;

  return tr;
}

/**
 * Render specifications to table body
 * @param {HTMLElement} tableBody - Table body element
 * @param {Array} rows - Array of specification rows
 */
export function renderSpecTable(tableBody, rows) {
  tableBody.innerHTML = '';
  rows.forEach(row => {
    tableBody.appendChild(createSpecRow(row));
  });
}

/**
 * Initialize table sorting
 * @param {HTMLElement} table - Table element
 * @param {Array} allRows - All rows data
 * @param {Function} renderCallback - Callback to render rows
 */
export function initTableSorting(table, allRows, renderCallback) {
  let sortState = { key: null, dir: null };

  const headers = table.querySelectorAll('thead th');
  headers.forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      const type = th.dataset.type;

      // Toggle sort direction
      let dir = 'asc';
      if (sortState.key === key && sortState.dir === 'asc') dir = 'desc';
      sortState = { key, dir };

      // Sort rows
      const sorted = [...allRows].sort((a, b) => {
        let va = a[key];
        let vb = b[key];

        if (type === 'number') {
          va = Number(va) || 0;
          vb = Number(vb) || 0;
          return dir === 'asc' ? va - vb : vb - va;
        }

        return dir === 'asc'
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va));
      });

      // Render sorted rows
      renderCallback(sorted);

      // Update header styles
      headers.forEach(h => {
        h.classList.remove('sorted-asc', 'sorted-desc');
        h.querySelector('.sort-ico').innerHTML = '<i class="fa-solid fa-sort" aria-hidden="true"></i>';
      });

      th.classList.add(dir === 'asc' ? 'sorted-asc' : 'sorted-desc');
      th.querySelector('.sort-ico').innerHTML = `<i class="fa-solid fa-sort-${dir === 'asc' ? 'up' : 'down'}" aria-hidden="true"></i>`;
    });
  });
}
