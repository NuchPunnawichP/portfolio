document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Lightbox ----------
const box = document.querySelector('.lightbox');
const boxImg = box.querySelector('img');
const boxCap = box.querySelector('figcaption');

function openPhoto(el) {
  boxImg.src = el.dataset.full;
  boxImg.alt = el.querySelector('img')?.alt || '';
  boxCap.textContent = el.dataset.caption || '';
  box.showModal();
}
document.querySelectorAll('.card, .thumb').forEach(el => el.addEventListener('click', () => openPhoto(el)));
box.querySelector('.close').addEventListener('click', () => box.close());
box.addEventListener('click', e => { if (e.target === box) box.close(); });

// ---------- Archive filters ----------
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.toggle('active', f === btn));
    const want = btn.dataset.filter;
    cards.forEach(card => {
      const show = want === 'all' || card.dataset.set.split(' ').includes(want);
      card.hidden = !show;
      card.classList.toggle('reveal', show);
    });
  });
});

// ---------- Fade in on scroll ----------
const fadeEls = document.querySelectorAll('.theme-card, .chapter-panel, .mini, .card, .panel');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => { el.classList.add('fade'); io.observe(el); });
}
