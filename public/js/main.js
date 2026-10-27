const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Mobile navigation ----------
const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
function setNav(open) {
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  root.classList.toggle('nav-open', open);
}
if (toggle && nav) {
  toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 981px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });
}

// ---------- Header: shadow once scrolled, hide while scrolling down ----------
const header = document.querySelector('[data-header]');
let lastY = window.scrollY;
let ticking = false;
function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 10);
  if (!root.classList.contains('nav-open')) {
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 300) header.classList.add('is-hidden');
    else if (goingUp || y < 300) header.classList.remove('is-hidden');
  }
  root.classList.toggle('header-hidden', header.classList.contains('is-hidden'));
  lastY = y;
  ticking = false;
}
if (header) {
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
}
// Keep the header visible while tabbing through it
header?.addEventListener('focusin', () => header.classList.remove('is-hidden'));

// ---------- Before / after sliders ----------
document.querySelectorAll('[data-compare]').forEach((el) => {
  const input = el.querySelector('input[type="range"]');
  const set = (v) => el.style.setProperty('--pos', `${v}%`);
  input.addEventListener('input', () => { el.classList.remove('is-hinting'); set(input.value); });

  // A one-time nudge the first time a slider is seen, so people know it moves
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    el.classList.add('is-hinting');
    setTimeout(() => set(30), 500);
    setTimeout(() => set(70), 1100);
    setTimeout(() => { set(50); input.value = 50; }, 1700);
    setTimeout(() => el.classList.remove('is-hinting'), 2400);
  }, { threshold: 0.6 });
  io.observe(el);
});

// ---------- Swipe rows: progress dots on phones ----------
document.querySelectorAll('[data-snap]').forEach((row) => {
  const items = [...row.children];
  if (items.length < 2) return;
  const dots = document.createElement('div');
  dots.className = 'snap-dots';
  dots.setAttribute('aria-hidden', 'true');
  dots.innerHTML = items.map(() => '<span></span>').join('');
  row.after(dots);
  const update = () => {
    const width = items[0].getBoundingClientRect().width || 1;
    const index = Math.min(items.length - 1, Math.round(row.scrollLeft / width));
    [...dots.children].forEach((d, i) => d.classList.toggle('is-active', i === index));
  };
  row.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
});

// ---------- Videos: autoplay (muted, looping) only while on screen ----------
const videos = document.querySelectorAll('video[data-autoplay]');
if ('IntersectionObserver' in window) {
  const vio = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) target.play().catch(() => {});
    else target.pause();
  }), { threshold: 0.25 });
  videos.forEach((v) => {
    v.muted = true;
    vio.observe(v);
    // Tap to toggle sound
    v.addEventListener('click', () => { v.muted = !v.muted; if (v.paused) v.play().catch(() => {}); });
    v.title = 'Tap to toggle sound';
  });
}

// ---------- Lightbox for poster galleries ----------
const galleries = document.querySelectorAll('[data-gallery]');
if (galleries.length && 'HTMLDialogElement' in window) {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Image viewer');
  dialog.innerHTML = `
    <img alt="">
    <button class="lightbox-btn lightbox-close" type="button" aria-label="Close">&times;</button>
    <button class="lightbox-btn lightbox-prev" type="button" aria-label="Previous image">&#8249;</button>
    <button class="lightbox-btn lightbox-next" type="button" aria-label="Next image">&#8250;</button>
    <p class="lightbox-count" aria-live="polite"></p>`;
  document.body.append(dialog);
  const img = dialog.querySelector('img');
  const count = dialog.querySelector('.lightbox-count');
  let links = [];
  let index = 0;

  const show = (i) => {
    index = (i + links.length) % links.length;
    const link = links[index];
    img.style.opacity = 0;
    img.onload = () => { img.style.opacity = 1; };
    img.src = link.href;
    img.alt = link.querySelector('img[alt]:not([alt=""])')?.alt || '';
    count.textContent = `${index + 1} / ${links.length}`;
  };
  const close = () => dialog.close();

  galleries.forEach((gallery) => {
    gallery.addEventListener('click', (e) => {
      const link = e.target.closest('[data-lightbox]');
      if (!link) return;
      e.preventDefault();
      links = [...gallery.querySelectorAll('[data-lightbox]')];
      show(links.indexOf(link));
      dialog.showModal();
      root.style.overflow = 'hidden';
      root.classList.add('lightbox-open');
    });
  });
  dialog.addEventListener('close', () => { root.style.overflow = ''; root.classList.remove('lightbox-open'); });
  dialog.querySelector('.lightbox-close').addEventListener('click', close);
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe left/right on touch screens
  let startX = null;
  dialog.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
}

// ---------- Booking form ----------
const dateInput = document.querySelector('#date');
if (dateInput) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateInput.min = today.toISOString().slice(0, 10);
}
const form = document.querySelector('form.form');
if (form) {
  form.addEventListener('submit', (e) => {
    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach((field) => {
      const bad = field.type === 'tel' ? !/^[+\d][\d\s-]{9,18}$/.test(field.value.trim()) : field.value.trim().length < 2;
      field.setAttribute('aria-invalid', String(bad));
      if (bad && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      e.preventDefault();
      firstInvalid.focus();
      return;
    }
    const btn = form.querySelector('[data-submit]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
  });
  form.addEventListener('input', (e) => e.target.removeAttribute('aria-invalid'));
}

// ---------- Results filter ----------
const filterNav = document.querySelector('[data-filter]');
if (filterNav) {
  const items = document.querySelectorAll('[data-filter-key]');
  filterNav.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-filter-value]');
    if (!chip) return;
    const value = chip.dataset.filterValue;
    filterNav.querySelectorAll('[data-filter-value]').forEach((c) => {
      c.classList.toggle('is-active', c === chip);
      c.setAttribute('aria-pressed', String(c === chip));
    });
    items.forEach((item) => {
      const show = value === 'all' || item.dataset.filterKey === value;
      item.classList.toggle('is-hidden', !show);
      if (show) item.querySelector('.reveal')?.classList.add('is-visible');
    });
    chip.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

// ---------- Treatments page: highlight the category chip in view ----------
const chipNav = document.querySelector('[data-chipnav]');
if (chipNav && 'IntersectionObserver' in window) {
  const chips = [...chipNav.querySelectorAll('a[href^="#"]')];
  const spy = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    chips.forEach((c) => {
      const on = c.getAttribute('href') === '#' + entry.target.id;
      c.classList.toggle('is-active', on);
      if (on) c.scrollIntoView({ block: 'nearest', inline: 'center' });
    });
  }), { rootMargin: '-45% 0px -50% 0px' });
  chips.forEach((c) => { const sec = document.querySelector(c.getAttribute('href')); if (sec) spy.observe(sec); });
}

// ---------- Scroll reveal ----------
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}
