/* Build-Up Academy — interactions (no dependencies) */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ── Mobile nav ─────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* ── Scroll reveals ─────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── Layered parallax (hero layers + beam dividers) ─── */
  var depthEls = [].slice.call(document.querySelectorAll('[data-depth]'));
  var slideEls = [].slice.call(document.querySelectorAll('[data-slide]'));
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY, vh = window.innerHeight;
      if (y < vh * 1.2) {
        depthEls.forEach(function (el) {
          el.style.transform = 'translate3d(0,' + (y * parseFloat(el.dataset.depth)).toFixed(1) + 'px,0)';
        });
      }
      slideEls.forEach(function (el) {
        var r = el.parentNode.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh + 50) return;
        var progress = (r.top - vh / 2);
        el.style.transform = 'translate3d(' + (progress * parseFloat(el.dataset.slide)).toFixed(1) + 'px,0,0)';
      });
      ticking = false;
    });
  }
  function enableParallax() {
    if (reduce.matches) return;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  enableParallax();

  /* ── Pointer tilt on hero frame + cards ─────────────── */
  if (finePointer.matches && !reduce.matches) {
    var scene = document.querySelector('.tilt-scene');
    var hero = document.querySelector('.hero');
    if (scene && hero) {
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        scene.style.transform = 'perspective(1200px) rotateY(' + (x * 8).toFixed(2) + 'deg) rotateX(' + (-y * 6).toFixed(2) + 'deg)';
      });
      hero.addEventListener('pointerleave', function () { scene.style.transform = ''; });
      scene.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
    }
    document.querySelectorAll('.tilt').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () {
        card.style.removeProperty('--rx'); card.style.removeProperty('--ry');
      });
    });
  }

  /* ── Curriculum explorer (ARIA tabs) ────────────────── */
  var explorer = document.querySelector('[data-explorer]');
  if (explorer) {
    var tabs = [].slice.call(explorer.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
        if (on) {
          panels[j].classList.remove('is-entering');
          void panels[j].offsetWidth;
          if (!reduce.matches) panels[j].classList.add('is-entering');
        }
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i, false); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, k = e.key, next = null;
        // Floors stack bottom-to-top, so Up moves to the next workbook.
        if (k === 'ArrowUp' || k === 'ArrowRight') next = (i + 1) % n;
        else if (k === 'ArrowDown' || k === 'ArrowLeft') next = (i - 1 + n) % n;
        else if (k === 'Home') next = 0;
        else if (k === 'End') next = n - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
    select(0, false);
    panels[0].classList.remove('is-entering');
  }

  /* ── Count-up for founder proof points ──────────────── */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduce.matches) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target, end = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
        var t0 = performance.now(), dur = 1400;
        (function step(now) {
          var p = Math.min(1, (now - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = el.dataset.prefix + (end * eased).toFixed(dec) + el.dataset.suffix;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ── "Get involved" shortcuts pre-select the form ───── */
  var select_ = document.getElementById('f-interest');
  document.querySelectorAll('[data-interest]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (!select_) return;
      var want = el.dataset.interest;
      [].forEach.call(select_.options, function (o) { if (o.text === want) select_.value = o.value || o.text; });
      if (el.tagName === 'BUTTON') {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
      }
      var field = select_.closest('.field');
      field.classList.remove('flash'); void field.offsetWidth; field.classList.add('flash');
      setTimeout(function () { document.getElementById('f-name').focus({ preventScroll: true }); }, reduce.matches ? 0 : 500);
    });
  });
})();
