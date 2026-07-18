export function renderTabs(container, onSelect){
  const tabs = [
    {id:'ceiling', label:'Ceiling Fan'},
    {id:'mobile', label:'Mobile Fan'},
    {id:'accessory', label:'Accessories'}
  ];
  container.innerHTML = '';
  tabs.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (t.id === 'ceiling' ? ' active' : '');
    btn.textContent = t.label;
    btn.dataset.filter = t.id;
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      onSelect && onSelect(t.id);
    });
    container.appendChild(btn);
  });
}
