# portfolio
Personal portfolio website showcasing my projects, research, skills, and experience.

Plain HTML + CSS — no build step.

```
index.html   page content (edit text here)
styles.css   all styling — `.glass` is the liquid-glass effect
script.js    lightbox, archive filters, fade-in on scroll
images/      project photos (replace with full-resolution originals, same file names)
```

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Deploy on Vercel

1. vercel.com → **Add New → Project** → import this GitHub repo.
2. Framework preset: **Other**. Leave build command and output directory empty.
3. Deploy. Every push to `main` redeploys automatically.

## Adding a project

- **Small project:** copy one `<article class="glass mini">` block in the "More builds" section.
- **Featured project:** copy a whole `<section class="chapter">` block, swap its background photo and thumbnails, and add a card for it under "Choose a project".
- **Photos in the archive:** copy a `<button class="card">` line. `data-set` sets which filter it appears under (space-separated, e.g. `formula cad`); add `card--wide`, `card--tall` or `card--portrait` to change its shape.
