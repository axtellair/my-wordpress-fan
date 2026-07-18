// componentLoader.js — simple async loader for HTML components
export async function loadComponent(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load component: ' + url);
  return res.text();
}
