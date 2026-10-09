/* ═══════════════════════════════════════════
   CLAUDIA LINO · CONSÓRCIO EMBRACON
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine    = window.matchMedia('(pointer: fine)').matches;

  /* ── WHATSAPP: troque o número em um lugar só ── */
  var WPP = '5511999922926';
  $$('a[href*="wa.me/"]').forEach(function (a) {
    a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + WPP);
  });

  /* ─────────── LOADER ─────────── */
  var loader = $('#loader');
  function hideLoader() {
    if (!loader || loader.classList.contains('gone')) return;
    loader.classList.add('gone');
    setTimeout(function () { loader.remove(); }, 700);
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, reduced ? 100 : 1500); });
  setTimeout(hideLoader, 4000);

  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ─────────── SCROLL ─────────── */
  var nav = $('#nav'), bar = $('#scrollbar i'), idx = $('#index');
  var ticking = false;
  function onScroll() {
    var sy = window.scrollY || 0;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (nav)   nav.classList.toggle('stuck', sy > 40);
    if (bar)   bar.style.width = (h > 0 ? (sy / h) * 100 : 0) + '%';
    if (idx)   idx.classList.toggle('show', sy > window.innerHeight * 0.5);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ─────────── DRAWER ─────────── */
  var burger = $('#burger'), drawer = $('#drawer');
  function toggleDrawer(force) {
    var open = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
    drawer.classList.toggle('open', open);
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () { toggleDrawer(); });
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () { toggleDrawer(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) toggleDrawer(false);
    });
  }

  /* ─────────── REVEAL ─────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
      if (en.target.hasAttribute('data-count')) countUp(en.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px' });

  $$('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
    io.observe(el);
  });
  $$('.mask').forEach(function (el) { io.observe(el); });
  $$('[data-count]').forEach(function (el) { io.observe(el); });
  var cbox = $('#curvebox'); if (cbox) io.observe(cbox);

  /* ─────────── CONTADORES ─────────── */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    if (reduced) { el.textContent = target; return; }
    var t0 = null, dur = 1200;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ─────────── ÍNDICE LATERAL ─────────── */
  var links = $$('#index a');
  var secs  = $$('[data-sec]').filter(function (s) { return s.tagName === 'SECTION' || s.id === 'hero'; });
  var hero  = $('#hero');
  if (links.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + id); });
      });
    }, { threshold: 0.28 });
    if (hero) spy.observe(hero);
    secs.forEach(function (s) { spy.observe(s); });
  }

  /* ─────────── BOTÃO MAGNÉTICO ─────────── */
  if (fine && !reduced) {
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.2 + 'px,' +
                                            (e.clientY - r.top - r.height / 2) * 0.28 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ─────────── RIPPLE ─────────── */
  $$('[data-ripple]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var r = el.getBoundingClientRect();
      var s = document.createElement('span');
      s.className = 'rip';
      s.style.width = s.style.height = (Math.max(r.width, r.height) * 2) + 'px';
      s.style.left = (e.clientX - r.left) + 'px';
      s.style.top  = (e.clientY - r.top) + 'px';
      el.appendChild(s);
      setTimeout(function () { s.remove(); }, 700);
    });
  });

  /* ─────────── TILT NA FOTO DO HERO ─────────── */
  if (fine && !reduced) {
    $$('[data-tilt]').forEach(function (el) {
      var frame = $('.hero-photo-inner', el) || el;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        frame.style.transform = 'perspective(1100px) rotateY(' + px * 6 + 'deg) rotateX(' + (-py * 6) + 'deg)';
      });
      el.addEventListener('mouseleave', function () { frame.style.transform = ''; });
    });
  }

  /* ─────────── PARALLAX NA FOTO DUOTONE ─────────── */
  var pElems = $$('[data-parallax]');
  if (pElems.length && !reduced) {
    var pTick = false;
    function parallax() {
      pElems.forEach(function (fig) {
        var img = fig.querySelector('img');
        if (!img) return;
        var r = fig.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var prog = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        img.style.transform = 'scale(1.1) translateY(' + (prog * -26) + 'px)';
      });
      pTick = false;
    }
    window.addEventListener('scroll', function () {
      if (!pTick) { pTick = true; requestAnimationFrame(parallax); }
    }, { passive: true });
    parallax();
  }

  /* ── esconde o índice enquanto a persiana ocupa a tela ── */
  var modSec = $('#modalidades');
  if (modSec && idx) {
    new IntersectionObserver(function (en) {
      idx.classList.toggle('hide', en[0].isIntersecting);
    }, { threshold: 0.35 }).observe(modSec);
  }

  /* ─────────── PERSIANA DE MODALIDADES ─────────── */
  var blinds = $$('.blind');
  function openBlind(i) {
    blinds.forEach(function (b, n) { b.classList.toggle('on', n === i); });
  }
  blinds.forEach(function (b, i) {
    b.addEventListener('click', function () { openBlind(i); });
    b.addEventListener('mouseenter', function () { if (fine) openBlind(i); });
    b.setAttribute('tabindex', '0');
    b.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBlind(i); }
    });
  });
})();
