// js/main.js

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav active au scroll
  const sections = document.querySelectorAll('.section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function updateNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  // ── Animations fade-in + reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in, .reveal').forEach(el => observer.observe(el));

});