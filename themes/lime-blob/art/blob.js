// The lime shape: a liquid edge flowing from the top right, with a few drops.
window.blob = (w, h, flip) => `
<svg width="${w}" height="${h}" viewBox="0 0 360 780" preserveAspectRatio="none" style="position:absolute;left:0;top:0;${flip ? 'transform:scale(-1,-1)' : ''}">
 <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A9DB3C"/><stop offset="1" stop-color="#86BC1E"/></linearGradient>
 <filter id="s" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity=".55"/></filter></defs>
 <path filter="url(#s)" fill="url(#g)" d="M0 0H360V330C352 372 326 392 302 368C278 344 292 302 262 278C230 252 190 286 146 258C108 234 116 196 80 178C50 163 18 170 0 186Z"/>
 <circle cx="94" cy="56" r="5" fill="#111"/><circle cx="118" cy="38" r="4" fill="#111"/><circle cx="168" cy="72" r="9" fill="#111"/><circle cx="200" cy="100" r="16" fill="#111"/>
 <circle cx="300" cy="392" r="6" fill="#93C928"/>
</svg>`;
