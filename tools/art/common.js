// Shared line icons for theme artwork: original drawings, no app logos.
window.ICON = (name, stroke = 'currentColor', width = 2) => {
  const p = {
    camera: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8.5 7l1.6-2.5h3.8L15.5 7"/><circle cx="12" cy="13.5" r="3.6"/>',
    chat: '<path d="M4 11.5a8 7 0 1 1 3.4 5.8L4 19l1.2-3.4A7 7 0 0 1 4 11.5z"/><path d="M9 11h.01M12 11h.01M15 11h.01"/>',
    music: '<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    photos: '<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17l5-5 4 4 3-3 4 4"/>',
    play: '<rect x="3" y="5" width="18" height="14" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z"/>',
    phone: '<path d="M6.5 3.5l3 3-2 2.2a12 12 0 0 0 7.8 7.8l2.2-2 3 3-2 2.5c-7.5-.3-14.2-7-14.5-14.5z"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M4 7.5l8 5.5 8-5.5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
    map: '<path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    bolt: '<path d="M13 2.5L5.5 13.5H11L10 21.5l7.5-11H12z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
    leaf: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19l8-8"/>',
    flame: '<path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.6 3-5.4 3.6-9.4 2.4 1.6 3.6 3.6 3.4 6 1-.6 1.6-1.6 1.8-2.8 1.8 1.6 3.2 3.6 3.2 6.2 0 3.2-2.4 5.6-6 5.6z"/>'
  }[name] || '';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
};
window.fillIcons = () => document.querySelectorAll('[data-icon]').forEach(e => {
  e.innerHTML = ICON(e.dataset.icon, e.dataset.stroke || 'currentColor', e.dataset.width || 2);
});
document.addEventListener('DOMContentLoaded', fillIcons);
