// Builds a theme's elements sheet from window.SHEET, using the theme's own CSS classes:
// .card .key .pressed .primary .field .on .off (toggles) .chip
window.addEventListener('DOMContentLoaded', () => {
  const s = window.SHEET;
  document.body.innerHTML = `
  <h1>${s.name}</h1><div class="sub">${s.tagline}</div>
  <h2>COLOURS</h2><div class="grid">${s.swatches.map(([c, n]) => `<div><div class="swatch" style="background:${c}"></div><div class="cap">${n}</div></div>`).join('')}</div>
  <h2>BUTTONS</h2><div class="grid">
   <div><div class="key btn">${ICON('plus', 'currentColor', 2.2).replace('<svg', '<svg width="20" height="20"')}Raised</div><div class="cap">Key · rest</div></div>
   <div><div class="key pressed btn">Pressed</div><div class="cap">Key · pressed</div></div>
   <div><div class="primary btn">Primary</div><div class="cap">Primary</div></div>
   <div><div class="field btn" style="width:190px">${ICON('search', 'currentColor', 2).replace('<svg', '<svg width="18" height="18"')}Search</div><div class="cap">Field</div></div>
  </div>
  <h2>CONTROLS</h2><div class="grid">
   <div><div class="tog on"><i></i></div><div class="cap">On</div></div>
   <div><div class="tog off"><i></i></div><div class="cap">Off</div></div>
   <div><div class="chip">${s.chip || 'Chip'}</div><div class="cap">Chip</div></div>
   <div><div class="key icon">${ICON('music', 'currentColor', 2).replace('<svg', '<svg width="26" height="26"')}</div><div class="cap">Icon key</div></div>
  </div>
  <h2>CARD</h2><div class="card big"><div class="clock">08:41</div><div class="date">Monday, 3 November</div><div class="cap" style="text-align:left">${s.cardNote}</div></div>`;
});
