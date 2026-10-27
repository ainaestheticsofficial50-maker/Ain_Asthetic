# Ain Aesthetics & Medical Center: Website

Node.js (Express + EJS) website for Ain Aesthetics & Medical Center, DHA Phase 8, Lahore.

## Run

```bash
npm install
npm run dev     # development, auto-reloads on changes
npm start       # production
```

Open http://localhost:3000. When deploying, set `NODE_ENV=production` (enables long browser caching;
CSS/JS URLs are versioned so updates still show immediately), plus `PORT` and `SITE_URL`.

## Editing content

Everything the clinic might change lives in `data/site.js`:

- **Treatments**: add/edit an entry in `treatments`; it automatically gets its own page
  at `/treatments/<slug>`, a card on the Treatments page and an option in the booking form.
- **Offers**: set `active: false` when an offer ends and it disappears from every page.
- **Doctors, reviews, before/after results, contact details**: their own lists in the same file.

Templates are in `views/` (shared header/footer in `views/partials/`), styles in
`public/css/style.css` (brand colours are CSS variables at the top).

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Home: offers, treatment finder, results, doctors, reviews, videos |
| `/treatments` | All treatments grouped by concern |
| `/treatments/:slug` | One treatment: benefits, best for, results, booking |
| `/doctors` | Team and how we work |
| `/results` | Filterable before/after sliders and result posters |
| `/offers` | Current promotions |
| `/contact` | Booking form, phone, WhatsApp, map |

## Images

Raw client assets live in `/Images` (second delivery in `/Images/batch2`). `npm run assets` copies, renames, crops and
compresses them into `public/img` and `public/video`. To add a new before/after,
add a crop line in `scripts/prepare-assets.js`, run `npm run assets`, then add an entry to
`results` in `data/site.js`.

## Appointment requests

The booking form on `/contact` saves requests to `data/appointments.json`.
