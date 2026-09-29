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

## Placeholders
Search the code for `TODO(Arron)` to find everything that still needs real content.
