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
3. Deploy. GitHub auto-deploy is not connected for this project yet, so deploy with `vercel deploy --prod`.

## Adding a project

- **Small project:** copy one `<article class="note">` sticky note in the "Side quests" section (`--bg` colour, `--r` tilt, `--x`/`--y` position).
- **Featured project:** add a `<button class="tab">` and a matching `<article class="pcard" data-panel="...">` in the "Work" section.
- **Field photo wall:** put the full photo in `images/gallery/` (about 1600px on the long side) and a ~760px copy with the same name in `images/gallery/thumb/`, then copy a `<button class="gtile">` line into the right category block (`<div class="ggroup" data-group="fab|clean|ev|talk">`) and update that block's count. Tiles after the 6th in a block get class `gextra`, which hides them in the "All" view.
