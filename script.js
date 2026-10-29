/* =========================================================
   Contab – Assessoria Contábil
   Interações da página
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');
  var desktop = window.matchMedia('(min-width: 960px)');

  /* ---------- Cabeçalho com fundo ao rolar ---------- */
  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- Menu hambúrguer ---------- */
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Fecha o menu ao escolher um link, ao apertar Esc ou ao passar para o desktop
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  // Fecha ao tocar fora do menu
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      setMenu(false);
    }
  });
  desktop.addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------- Destaque do link da seção atual ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var menuLinks = document.querySelectorAll('.nav__link');

  // A seção atual é a última cujo topo já passou de ~1/3 da tela
  function updateActiveLink() {
    var current = '';
    var line = window.innerHeight * 0.35;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= line) current = section.id;
    });
    menuLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
    });
  }
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ---------- Animações ao rolar ---------- */
  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  /* ---------- Ano atual no rodapé ---------- */
  var year = document.getElementById('ano');
  if (year) year.textContent = new Date().getFullYear();
});
