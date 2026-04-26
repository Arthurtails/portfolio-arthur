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

// ── Formulaire Formspree
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      document.getElementById('formSuccess').style.display = 'block';
      btn.textContent = 'Message envoyé ✦';
    } else {
      btn.textContent = 'Erreur — réessayez';
      btn.disabled = false;
    }
  });
}

});