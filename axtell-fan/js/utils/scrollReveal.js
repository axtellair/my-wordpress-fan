// scrollReveal.js — lightweight reveal-on-scroll helper
export function createRevealObserver(cb, options = {}) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => cb(e));
  }, options);
  return obs;
}
