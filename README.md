# thebuildupacademy.com

Website for **Build-Up Academy (BUA)**, a construction-trades workforce training nonprofit.

## Stack & hosting
- Plain static site: `index.html`, `style.css`, `main.js`. No build step, no dependencies.
- Hosted on **GitHub Pages** from the `master` branch root, custom domain via `CNAME` (`thebuildupacademy.com`). Merging to `master` deploys.
- `workshop.html`, `waitlist.html`, `landing.html` are redirect stubs so old links to the retired bidding-workshop pages still land on the home page.

## Preview locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Brand assets
- `assets/brand/bua-shield.svg`: **primary logo** (SVG recreation of the red shield from the workbook covers). `favicon.svg` is the same file.
- `assets/brand/bua-alternate-mark-plaque.webp`: **alternate mark** (the bars + triangle mark, cropped from the plaque photo). Reference only; not used on the page.
- `assets/workbook-cover-{a,b}[-sm].{webp,jpg}`, `assets/plaque-yard[-sm].{webp,jpg}`: web-optimized versions (all under 160 KB). The full-size original PNGs (~2.3 MB each) are intentionally not committed.
- Palette: paper `#f2ecdf`, ink `#151515`, red `#a3281e` (`#de4c3c` on dark). Type: Oswald (headlines), Barlow (body), IBM Plex Mono (form labels).

## Placeholders
Search the code for `TODO(Arron)` to find everything that still needs real content.
