// js/main.js

document.addEventListener('DOMContentLoaded', () => {

  // ── Barre de progression
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
  });

  // ── Nav active au scroll
  const sections = document.querySelectorAll('[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 160) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  // ── Animations fade-in + reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-in, .reveal').forEach(el => observer.observe(el));

  // ── Formulaire contact mailto
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nom     = document.getElementById('nom').value.trim();
      const email   = document.getElementById('email').value.trim();
      const sujet   = document.getElementById('sujet').value.trim();
      const message = document.getElementById('message').value.trim();
      const corps   = `Bonjour Arthur,\n\nNom : ${nom}\nEmail : ${email}\n\n${message}`;
      const mailto  = `mailto:paitredaletarthur@gmail.com`
        + `?subject=${encodeURIComponent(sujet)}`
        + `&body=${encodeURIComponent(corps)}`;
      window.location.href = mailto;
    });
  }

});