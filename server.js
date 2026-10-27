const path = require('path');
const fs = require('fs/promises');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const site = require('./data/site');

const app = express();
const isProd = process.env.NODE_ENV === 'production';
// Appended to CSS/JS URLs so browsers fetch fresh files after every restart/deploy.
const assetVersion = Date.now().toString(36);
const PORT = process.env.PORT || 3000;
const APPOINTMENTS_FILE = path.join(__dirname, 'data', 'appointments.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        mediaSrc: ["'self'"],
        frameSrc: ['https://www.google.com', 'https://maps.google.com'],
        scriptSrc: ["'self'"],
      },
    },
  })
);
app.use(compression());
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: isProd ? '30d' : 0 }));

app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.path = req.path;
  res.locals.year = new Date().getFullYear();
  res.locals.v = assetVersion;
  next();
});

const pages = {
  '/': { view: 'index', title: 'Skin, Hair & Laser Clinic in DHA Lahore' },
  '/treatments': { view: 'treatments', title: 'Treatments', description: 'HydraFacial, carbon laser, BioRePeel, Botox, RF microneedling, exosomes, hair PRP and laser hair removal in DHA Lahore.' },
  '/doctors': { view: 'doctors', title: 'Our Doctors', description: 'Meet the dermatologists and aesthetic physicians at Ain Aesthetics & Medical Center, Lahore.' },
  '/results': { view: 'results', title: 'Before & After Results', description: 'Real before and after results for acne scars, melasma and laser hair removal.' },
  '/offers': { view: 'offers', title: 'Current Offers', description: 'Limited-time offers on hair exosomes, PRP and Botox + RF microneedling.' },
  '/contact': { view: 'contact', title: 'Book an Appointment' },
};

for (const [route, page] of Object.entries(pages)) {
  app.get(route, (req, res) =>
    res.render(page.view, { ...page, status: req.query.status, query: req.query })
  );
}

app.get('/treatments/:slug', (req, res, next) => {
  const treatment = site.treatmentBySlug[req.params.slug];
  if (!treatment) return next();
  res.render('treatment', {
    title: `${treatment.title} in DHA Lahore`,
    description: treatment.summary,
    ogImage: treatment.poster,
    treatment,
    category: site.categoryBySlug[treatment.category],
    offer: site.offerById[treatment.offer],
    results: (treatment.results || []).map((id) => site.resultById[id]).filter(Boolean),
    compare: site.treatmentBySlug[treatment.compare],
    related: site.treatments.filter((t) => t.category === treatment.category && t.slug !== treatment.slug),
  });
});

// Old URLs from the first version of the site
app.get('/about', (req, res) => res.redirect(301, '/doctors'));
app.get('/services', (req, res) => res.redirect(301, '/treatments'));

function validateAppointment(body) {
  const clean = (v, max) => String(v || '').trim().slice(0, max);
  const data = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 20),
    service: clean(body.service, 80),
    date: clean(body.date, 10),
    message: clean(body.message, 1000),
  };
  const errors = [];
  if (data.name.length < 2) errors.push('Please enter your name.');
  if (!/^[+\d][\d\s-]{9,18}$/.test(data.phone)) errors.push('Please enter a valid phone number.');
  if (data.service && !site.treatments.some((t) => t.title === data.service)) data.service = '';
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) data.date = '';
  return { data, errors };
}

app.post('/contact', async (req, res, next) => {
  // Honeypot field: real visitors never fill it in.
  if (req.body.website) return res.redirect('/contact?status=sent');

  const { data, errors } = validateAppointment(req.body);
  if (errors.length) {
    return res.status(400).render('contact', { title: pages['/contact'].title, errors, form: data });
  }

  try {
    let list = [];
    try {
      list = JSON.parse(await fs.readFile(APPOINTMENTS_FILE, 'utf8'));
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    list.push({ ...data, createdAt: new Date().toISOString() });
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(list, null, 2));
    res.redirect('/contact?status=sent');
  } catch (err) {
    next(err);
  }
});

app.get('/sitemap.xml', (req, res) => {
  const urls = [...Object.keys(pages), ...site.treatments.map((t) => `/treatments/${t.slug}`)]
    .map((p) => `<url><loc>${site.url}${p === '/' ? '' : p}</loc></url>`)
    .join('');
  res.type('application/xml').send(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
  );
});

app.use((req, res) => res.status(404).render('404', { title: 'Page not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('404', { title: 'Something went wrong', error: true });
});

app.listen(PORT, () => console.log(`Ain Aesthetics running at http://localhost:${PORT}`));
