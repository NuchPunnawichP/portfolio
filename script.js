document.getElementById('year').textContent = new Date().getFullYear();
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Rotating hero word ----------
const words = ['move', 'fly', 'think', 'race', 'work'];
const wordEl = document.querySelector('.swap-word');
let wi = 0;
if (wordEl && !reduce) {
  setInterval(() => {
    wordEl.classList.add('out');
    setTimeout(() => {
      wi = (wi + 1) % words.length;
      wordEl.textContent = words[wi];
      wordEl.classList.remove('out');
      wordEl.classList.add('in');
      void wordEl.offsetWidth; // apply the start position before animating in
      wordEl.classList.remove('in');
    }, 420);
  }, 2200);
}

// ---------- Hero cards: scroll + mouse parallax ----------
const cards = [...document.querySelectorAll('.hcard')];
const hero = document.querySelector('.hero');
let mx = 0, my = 0;
const sides = new Map();
function measureSides() {
  cards.forEach(card => {
    const r = card.getBoundingClientRect();
    sides.set(card, r.left + r.width / 2 < window.innerWidth / 2 ? -1 : 1);
  });
}
measureSides();
window.addEventListener('resize', measureSides);
function placeCards() {
  const sy = Math.min(window.scrollY, window.innerHeight);
  cards.forEach(card => {
    const p = parseFloat(card.style.getPropertyValue('--p')) || 0.15;
    const side = sides.get(card) || 1;
    card.style.setProperty('--px', `${side * sy * p + mx * p * 60}px`);
    card.style.setProperty('--py', `${-sy * p * 0.6 + my * p * 60}px`);
  });
}
if (!reduce) {
  window.addEventListener('scroll', () => requestAnimationFrame(placeCards), { passive: true });
  hero.addEventListener('mousemove', e => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
    requestAnimationFrame(placeCards);
  });
}

// ---------- Nav turns dark over dark sections ----------
const nav = document.querySelector('.nav');
const darkSections = document.querySelectorAll('.notes-section, .features');
function navTone() {
  const y = 40;
  const overDark = [...darkSections].some(s => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom >= y; });
  nav.classList.toggle('is-dark', overDark);
}
window.addEventListener('scroll', navTone, { passive: true });
navTone();

// ---------- Project tabs ----------
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.pcard');
function showTab(name) {
  tabs.forEach(t => { const on = t.dataset.tab === name; t.classList.toggle('active', on); t.setAttribute('aria-selected', on); });
  panels.forEach(p => { p.hidden = p.dataset.panel !== name; });
}
tabs.forEach(t => t.addEventListener('click', () => showTab(t.dataset.tab)));
document.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', () => showTab(a.dataset.jump)));

// ---------- Lightbox ----------
const box = document.querySelector('.lightbox');
const boxImg = box.querySelector('img');
const boxCap = box.querySelector('figcaption');
document.querySelectorAll('.ph, .gtile').forEach(el => el.addEventListener('click', () => {
  boxImg.src = el.dataset.full;
  boxImg.alt = el.querySelector('img').alt;
  boxCap.textContent = el.dataset.caption || '';
  box.showModal();
}));
box.querySelector('.close').addEventListener('click', () => box.close());
box.addEventListener('click', e => { if (e.target === box) box.close(); });

// ---------- Count-up numbers ----------
function countUp(el) {
  const end = +el.dataset.count, suffix = el.dataset.suffix || '';
  const t0 = performance.now(), dur = 1400;
  const step = now => {
    const k = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(end * e).toLocaleString('en-US') + suffix;
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ---------- Reveal on scroll ----------
document.querySelectorAll('.center-title, .center-sub, .num-row, .frow, .cta > *').forEach(el => el.classList.add('rv'));
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    en.target.querySelectorAll?.('[data-count]').forEach(countUp);
    io.unobserve(en.target);
  }), { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv, .notes').forEach(el => io.observe(el));
  // anything already scrolled past (e.g. after a jump link) should not stay hidden
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.rv:not(.in), .notes:not(.in)').forEach(el => {
      if (el.getBoundingClientRect().bottom < 0) el.classList.add('in');
    });
  }, { passive: true });
} else {
  document.querySelectorAll('.rv, .notes').forEach(el => el.classList.add('in'));
}

// ---------- Field photo wall: grouped by category ----------
const gGroups = [...document.querySelectorAll('.ggroup')];
const gFilters = document.querySelectorAll('.gfilters .tab');
function applyFilter(name) {
  gFilters.forEach(f => f.classList.toggle('active', f.dataset.filter === name));
  gGroups.forEach(g => {
    const all = name === 'all';
    g.hidden = !all && g.dataset.group !== name;
    g.querySelectorAll('.gextra').forEach(t => { t.hidden = all; });
    const see = g.querySelector('.gsee');
    if (see) see.hidden = !all;
    if (!g.hidden) g.querySelectorAll('.gtile:not([hidden])').forEach(t => { t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop'); });
  });
}
gFilters.forEach(f => f.addEventListener('click', () => applyFilter(f.dataset.filter)));
document.querySelectorAll('.gsee').forEach(b => b.addEventListener('click', () => {
  applyFilter(b.dataset.filter);
  document.querySelector('#field').scrollIntoView({ behavior: 'smooth' });
}));
applyFilter('all');
