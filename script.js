// ============================================================
// CHAERUL MAS'UD ZAKY — PORTFOLIO
// ============================================================

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- NAV: scrolled state + mobile toggle ---------- */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

function handleNavScroll(){
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}
handleNavScroll();
window.addEventListener('scroll', handleNavScroll, { passive: true });

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

/* ---------- PARALLAX (hero) ---------- */
const parallaxEls = document.querySelectorAll('[data-speed]');

function updateParallax(){
  const scrollY = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed);
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

if (!reduceMotion) {
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateParallax);
  }, { passive: true });
}

/* ---------- SCROLL REVEAL ---------- */
const revealTargets = document.querySelectorAll(
  '.section-label, .section-title, .section-sub, .about-text, .edu-card, .project-card, .skill-col, .cta-title'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

/* Stagger project cards slightly */
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 90}ms`;
});
document.querySelectorAll('.skill-col').forEach((col, i) => {
  col.style.transitionDelay = `${i * 90}ms`;
});
