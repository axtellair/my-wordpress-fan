// 通用异步加载HTML组件工具
export async function loadComponent(containerId, componentPath) {
  const res = await fetch(componentPath);
  const html = await res.text();
  document.getElementById(containerId).innerHTML = html;
}
