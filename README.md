<h1 align="center">
  <br>
  <a href="https://github.com/sudharamachandranrajeev/griha-launcher-themes"><img src="branding/griha-themes-512.png" alt="Griha Themes" width="140"></a>
  <br>
  Griha Themes
  <br>
</h1>

<h4 align="center">Downloadable themes for Griha, the calm Android home screen: colours, depth, light, wallpapers and widgets as small data packages.</h4>

<p align="center">
  <a href="https://github.com/sudharamachandranrajeev/griha-launcher-themes/releases"><img src="https://img.shields.io/github/v/release/sudharamachandranrajeev/griha-launcher-themes?include_prereleases&color=8a6512&label=catalogue" alt="Latest catalogue"></a>
  <img src="https://img.shields.io/badge/for-Griha%200.6%2B-555" alt="For Griha 0.6 and later">
  <a href="LICENSE"><img src="https://img.shields.io/badge/licence-MIT-2e7d32" alt="Licence MIT"></a>
  <a href="https://github.com/sudharamachandranrajeev/brahma-life-suite"><img src="https://img.shields.io/badge/part%20of-Brahma-8a5cf6" alt="Part of Brahma"></a>
</p>

<p align="center">
  <a href="#-the-themes">The themes</a> •
  <a href="#-get-started">Get started</a> •
  <a href="#-how-it-works">How it works</a> •
  <a href="#-faq-and-troubleshooting">FAQ</a> •
  <a href="#%EF%B8%8F-for-theme-makers">For theme makers</a>
</p>

<p align="center">
  <img src="themes/pastel-neo/preview.png" width="23%" alt="Pastel Neo">
  <img src="themes/candy-gloss/preview.png" width="23%" alt="Candy Gloss">
  <img src="themes/lime-blob/preview.png" width="23%" alt="Lime Blob">
  <img src="themes/tangerine-peel/preview.png" width="23%" alt="Tangerine Peel">
</p>
<p align="center">
  <img src="themes/clay-bloom/preview.png" width="23%" alt="Clay Bloom">
  <img src="themes/midnight-jelly/preview.png" width="23%" alt="Midnight Jelly">
  <img src="themes/berry-wave/preview.png" width="23%" alt="Berry Wave">
  <img src="themes/teal-grid/preview.png" width="23%" alt="Teal Grid">
</p>

This is the theme catalogue for [Griha](https://github.com/sudharamachandranrajeev/griha-home-launcher).
A theme here is **data only**: colours, how surfaces are lit, page backgrounds, wallpapers and widget styles.
It holds no code, so it cannot do anything on your phone except change how Griha looks.
Status: **early**. Griha 0.6 draws each theme's colours, surfaces, page, touch light and its own home layout.

## 🎨 The themes

| Theme | Look | Elements |
| --- | --- | --- |
| **Pastel Neo** | Soft grey neumorphism: a chunky clock card with a week pill, tall Power and Music meters, wide app cards, bold outlines | [elements](themes/pastel-neo/elements.png) |
| **Candy Gloss** | A frosted clock over chrome dials, then glossy jelly pills that change colour by state, and a jelly dock | [elements](themes/candy-gloss/elements.png) |
| **Lime Blob** | Charcoal with a lime blob: a battery ring, a dotted clock ring, a dot list of apps and a sideways motto | [elements](themes/lime-blob/elements.png) |
| **Tangerine Peel** | Orange under a peeling cream panel: an info panel, a deep well clock and black badge icons | [elements](themes/tangerine-peel/elements.png) |
| **Clay Bloom** | Puffy clay cards after the soft system board: clock, profile, battery and note cards, tiles and a bottom bar | [elements](themes/clay-bloom/elements.png) |
| **Midnight Jelly** | A dark dashboard after the neo-skeuomorphic board: segmented tabs, stat cards, a chevron list, toasts and glowing steps | [elements](themes/midnight-jelly/elements.png) |
| **Berry Wave** | Tactile pill keys for everything, time and battery included, over a berry wave | [elements](themes/berry-wave/elements.png) |
| **Teal Grid** | A teal product styleguide: headline time, chips, underline tabs, a status card, alert banners and tiles | [elements](themes/teal-grid/elements.png) |

Each theme brings its own home layout as well as its colours; Griha 0.6 builds it from the theme's `home` blocks.

## 🚀 Get started

**Use the wallpapers now.**

1. Open the [latest catalogue release](https://github.com/sudharamachandranrajeev/griha-launcher-themes/releases/latest) on your phone.
2. Download `<theme>-wallpapers.zip`.
3. In Griha, open **Settings → Look and theme → Wallpapers → Import pictures or ZIP** and pick the file.
4. Tap the new wallpaper and choose **Griha: home and all apps**.

**Use whole themes** (from Griha 0.6): **Settings → Look and theme → Themes → Get more themes**. Griha lists
each theme with its preview; download it, use it, or remove it there.

## 🧭 How it works

```mermaid
flowchart LR
  A[themes/&lt;id&gt;/theme.json<br>and wallpapers] --> B[Validate:<br>format, features, sizes]
  B --> C[Release:<br>packages and index.json<br>with SHA-256]
  C --> D[Griha downloads,<br>checks SHA-256,<br>unpacks safely]
```

- **The engine and features.** [`engine/features.json`](engine/features.json) lists what each Griha theme engine can
  draw. A theme names the features it `requires` and the ones it `prefers`. The catalogue only offers a theme once a
  released engine has everything it requires, so Griha never shows a theme it would draw wrong.
- **Safety.** Griha accepts a theme only if its SHA-256 matches the catalogue. Archives are unpacked with every path
  checked to stay inside the theme's own folder. Pictures and the package as a whole are size-capped.
- **Space.** Each downloaded theme lives in its own folder and can be deleted. Built-in themes are part of Griha and can
  be hidden; they are drawn by code and take very little space.

## ❓ FAQ and troubleshooting

<details>
<summary>A theme says "Needs a newer Griha"</summary>

It uses something your Griha cannot draw yet. Update Griha in **Settings → Updates and versions**.
</details>

<details>
<summary>Can a theme read my data or run code?</summary>

No. A theme is a JSON file plus pictures and fonts. Griha reads it as settings; nothing in it runs.
</details>

## 🛠️ For theme makers

<details>
<summary>Make or change a theme</summary>

1. Copy a folder in `themes/` and rename it; the folder name is the theme's `id`.
2. Edit `theme.json`. [`schema/theme.schema.json`](schema/theme.schema.json) describes every field.
   Colours are `#RRGGBB`, `#AARRGGBB` or a palette name with an opacity, such as `accent@0.4`.
   Shadows are `[x, y, blur, colour, spread]` in dp.
3. Artwork is made from HTML in `themes/<id>/art/`; each file names its output in a `<meta name="out">` tag.
   Re-render it with Playwright: `npm i -D playwright && npx playwright install chromium && node tools/render.mjs`.
4. Check it: `pip install jsonschema && python3 tools/validate.py`.
5. Open a pull request. The **Validate** workflow runs the same checks.

A new kind of effect needs Griha first: add the feature to Griha's theme engine, release Griha, add the feature to
`engine/features.json` here, then publish the theme.
</details>

<details>
<summary>Publish the catalogue</summary>

Run **Actions → Release → Run workflow** on `main`. It validates, packs every theme and its wallpaper pack, writes
`index.json` with SHA-256 checksums and attaches them to a new release named `themes-<date>-<run>`.
</details>

## Related

| App | What it does |
| --- | --- |
| [griha-home-launcher](https://github.com/sudharamachandranrajeev/griha-home-launcher) | The home screen these themes are for |
| [brahma](https://github.com/sudharamachandranrajeev/brahma-life-suite) | The shared core and the all-in-one app |

## License

[MIT](LICENSE). Icons in the artwork are original drawings, not app logos.
Dancing Script, used in Tangerine Peel's artwork, is under the SIL Open Font License (`tools/art/fonts/DancingScript-OFL.txt`).

---

> GitHub [@sudharamachandranrajeev](https://github.com/sudharamachandranrajeev)
