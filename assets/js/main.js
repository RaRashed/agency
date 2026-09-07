/* ==========================================================================
   Skyline Bridge — site behaviour
   Depends on assets/js/config.js (must be loaded first).
   No build step, no external libraries.
   ========================================================================== */
(function () {
  'use strict';
  var C = window.SITE_CONFIG || {};
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ----------------------------------------------------------------------
     1. WhatsApp helpers
     ---------------------------------------------------------------------- */
  function waNumber() { return String(C.whatsapp || '').replace(/\D/g, ''); }

  function waLink(text) {
    var n = waNumber();
    if (!n) return '#';
    var msg = text ? (text.indexOf('%0A') > -1 ? text : encodeURIComponent(text)) : '';
    return 'https://wa.me/' + n + (msg ? '?text=' + msg : '');
  }
  window.waLink = waLink;

  /* Build a message from a template + a values object */
  function fillTemplate(tpl, values) {
    return tpl.replace(/\{\{(\w+)\}\}/g, function (_, key) {
      var v = values[key];
      return encodeURIComponent(v && String(v).trim() ? String(v).trim() : '—');
    });
  }

  /* ----------------------------------------------------------------------
     2. Inject config values into the markup
        <span data-site="phone"></span>  |  <a data-site-href="whatsapp">
     ---------------------------------------------------------------------- */
  var TEXT_MAP = {
    companyName: C.companyName, companyFull: C.companyFull, tagline: C.tagline, slogan: C.slogan,
    phone: C.phoneDisplay || C.phone, hotline: C.hotline,
    whatsapp: C.whatsappDisplay || C.whatsapp,
    email: C.email, emailHr: C.emailHr,
    addressLine1: C.addressLine1, addressLine2: C.addressLine2,
    address: [C.addressLine1, C.addressLine2].filter(Boolean).join(', '),
    hours: C.hours, hoursNote: C.hoursNote,
    licenseRL: C.licenseRL, licenseIATA: C.licenseIATA, licenseATAB: C.licenseATAB,
    year: new Date().getFullYear()
  };

  function applyConfig() {
    $$('[data-site]').forEach(function (el) {
      var v = TEXT_MAP[el.getAttribute('data-site')];
      if (v !== undefined && v !== null && v !== '') el.textContent = v;
    });

    $$('[data-site-href]').forEach(function (el) {
      var k = el.getAttribute('data-site-href'), href = '';
      if (k === 'whatsapp')   href = waLink(el.getAttribute('data-wa-text') || (C.slogan ? 'Hello ' + C.companyName + ', I would like to know more about your services.' : ''));
      else if (k === 'phone') href = 'tel:' + String(C.phone || '').replace(/[^\d+]/g, '');
      else if (k === 'email') href = 'mailto:' + (C.email || '');
      else if (k === 'emailHr') href = 'mailto:' + (C.emailHr || C.email || '');
      else if (C.social && C.social[k] !== undefined) {
        href = C.social[k];
        if (!href) { el.style.display = 'none'; return; }
      }
      if (href) el.setAttribute('href', href);
    });

    /* Google Map embed */
    $$('[data-site-map]').forEach(function (f) {
      f.setAttribute('src',
        'https://www.google.com/maps?q=' + encodeURIComponent(C.mapQuery || TEXT_MAP.address || 'Dhaka') + '&output=embed');
    });

    /* Page <title> / brand text that uses the token */
    if (C.companyName) {
      document.title = document.title.replace(/\{\{company\}\}/g, C.companyName);
    }
  }

  /* ----------------------------------------------------------------------
     3. Header: sticky shadow, mobile drawer, active link
     ---------------------------------------------------------------------- */
  function header() {
    var h = $('.header');
    if (h) {
      var onScroll = function () { h.classList.toggle('is-stuck', window.scrollY > 8); };
      onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    }

    var drawer = $('.drawer'), scrim = $('.scrim');
    function setDrawer(open) {
      if (!drawer) return;
      drawer.classList.toggle('is-open', open);
      if (scrim) scrim.classList.toggle('is-open', open);
      document.body.classList.toggle('no-scroll', open);
    }
    $$('.burger').forEach(function (b) { b.addEventListener('click', function () { setDrawer(true); }); });
    $$('.drawer__close').forEach(function (b) { b.addEventListener('click', function () { setDrawer(false); }); });
    if (scrim) scrim.addEventListener('click', function () { setDrawer(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });

    /* Mark the current page in the nav */
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav__link, .drawer nav a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
      if (href && href === here) {
        a.classList.add('is-active');
        var item = a.closest('.nav__item');
        if (item) item.classList.add('is-active');
      }
    });
  }

  /* ----------------------------------------------------------------------
     4. Hero slideshow
     ---------------------------------------------------------------------- */
  function hero() {
    var slides = $$('.hero__slide'), dotsBox = $('.hero__dots');
    if (slides.length < 2) return;
    var i = 0, timer;

    slides.forEach(function (_, n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show slide ' + (n + 1));
      b.addEventListener('click', function () { go(n); restart(); });
      if (dotsBox) dotsBox.appendChild(b);
    });
    var dots = dotsBox ? $$('button', dotsBox) : [];

    function go(n) {
      slides[i].classList.remove('is-active');
      if (dots[i]) dots[i].classList.remove('is-active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
      if (dots[i]) dots[i].classList.add('is-active');
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 6000); }
    go(0); restart();
  }

  /* ----------------------------------------------------------------------
     5. Forms -> WhatsApp
        <form data-wa-form="default"> with named inputs
     ---------------------------------------------------------------------- */
  function forms() {
    $$('[data-wa-form]').forEach(function (form) {
      form.setAttribute('novalidate', 'novalidate');

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        /* validate */
        var ok = true;
        $$('[required]', form).forEach(function (input) {
          var field = input.closest('.field') || input.parentNode;
          var val = (input.value || '').trim();
          var bad = !val;
          if (!bad && input.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          if (!bad && input.name === 'phone') bad = val.replace(/\D/g, '').length < 6;
          field.classList.toggle('is-invalid', bad);
          if (bad && ok) { input.focus(); ok = false; }
          else if (bad) ok = false;
        });
        if (!ok) return;

        if (!waNumber()) {
          alert('WhatsApp number is not configured yet.\n\nOpen assets/js/config.js and set the "whatsapp" value.');
          return;
        }

        /* collect values */
        var values = {};
        $$('input,select,textarea', form).forEach(function (el) {
          if (!el.name) return;
          if (el.type === 'checkbox') { if (el.checked) values[el.name] = (values[el.name] ? values[el.name] + ', ' : '') + (el.value || 'Yes'); }
          else if (el.type === 'radio') { if (el.checked) values[el.name] = el.value; }
          else values[el.name] = el.value;
        });

        var key = form.getAttribute('data-wa-form') || 'default';
        var tpl = (C.waTemplates && (C.waTemplates[key] || C.waTemplates.default)) || '{{message}}';
        var url = 'https://wa.me/' + waNumber() + '?text=' + fillTemplate(tpl, values);

        var win = window.open(url, '_blank');
        if (!win) location.href = url;

        var done = $('[data-wa-success]', form);
        if (done) { done.hidden = false; setTimeout(function () { done.hidden = true; }, 8000); }
        form.reset();
      });

      /* clear the error state as soon as the user types */
      $$('input,select,textarea', form).forEach(function (el) {
        el.addEventListener('input', function () {
          var f = el.closest('.field'); if (f) f.classList.remove('is-invalid');
        });
      });
    });

    /* "Book / Enquire" buttons on cards: data-wa-quick="Package name" */
    $$('[data-wa-quick]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (!waNumber()) { alert('Set your WhatsApp number in assets/js/config.js'); return; }
        var name = btn.getAttribute('data-wa-quick');
        var kind = btn.getAttribute('data-wa-kind') || 'package';
        var tpl = (C.waTemplates && C.waTemplates[kind]) || C.waTemplates.package;
        var msg = fillTemplate(tpl, { package: name, name: '', phone: '' });
        window.open('https://wa.me/' + waNumber() + '?text=' + msg, '_blank');
      });
    });
  }

  /* ----------------------------------------------------------------------
     6. Accordions
     ---------------------------------------------------------------------- */
  function accordions() {
    $$('.acc__q').forEach(function (q) {
      q.addEventListener('click', function () {
        var acc = q.closest('.acc'), panel = $('.acc__a', acc), open = acc.classList.contains('is-open');
        var group = acc.parentNode;
        $$('.acc.is-open', group).forEach(function (o) {
          o.classList.remove('is-open');
          var p = $('.acc__a', o); if (p) p.style.maxHeight = null;
        });
        if (!open) { acc.classList.add('is-open'); panel.style.maxHeight = panel.scrollHeight + 'px'; }
      });
    });
  }

  /* ----------------------------------------------------------------------
     7. Filters (packages / gallery / trades)
     ---------------------------------------------------------------------- */
  function filters() {
    $$('.filters').forEach(function (bar) {
      var targetSel = bar.getAttribute('data-filter-target');
      var items = targetSel ? $$(targetSel + ' [data-cat]') : [];
      $$('button', bar).forEach(function (btn) {
        btn.addEventListener('click', function () {
          $$('button', bar).forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var f = btn.getAttribute('data-filter');
          items.forEach(function (it) {
            var show = f === 'all' || (it.getAttribute('data-cat') || '').split(' ').indexOf(f) > -1;
            it.style.display = show ? '' : 'none';
          });
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     8. Gallery lightbox
     ---------------------------------------------------------------------- */
  function lightbox() {
    var figs = $$('.gal figure');
    if (!figs.length) return;
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<button class="lightbox__close" type="button" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button><img alt="">';
    document.body.appendChild(box);
    var img = $('img', box);
    function close() { box.classList.remove('is-open'); document.body.classList.remove('no-scroll'); }
    figs.forEach(function (f) {
      f.addEventListener('click', function () {
        var src = $('img', f); if (!src) return;
        img.src = src.currentSrc || src.src;
        img.alt = src.alt || '';
        box.classList.add('is-open');
        document.body.classList.add('no-scroll');
      });
    });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.lightbox__close')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ----------------------------------------------------------------------
     9. Counters + scroll reveal + back-to-top
     ---------------------------------------------------------------------- */
  function reveal() {
    var els = $$('.reveal');
    var top = $('.fab__top');
    if (top) {
      top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
      window.addEventListener('scroll', function () {
        top.classList.toggle('is-visible', window.scrollY > 500);
      }, { passive: true });
    }

    /* --- reveal on scroll ---------------------------------------------
       Belt-and-braces: an IntersectionObserver for the animation, plus a
       cheap scroll backstop so nothing can ever be left invisible if the
       user scrolls fast, prints, or the observer misses a batch. -------- */
    function show(el, delay) {
      if (el.classList.contains('is-in')) return;
      el.style.transitionDelay = (Math.min(delay || 0, 240) / 1000) + 's';
      el.classList.add('is-in');
    }
    function sweep() {
      var limit = window.innerHeight + 80;
      els.forEach(function (el) {
        if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < limit) show(el, 0);
      });
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('is-in'); });
      $$('[data-count]').forEach(function (e) { e.textContent = e.getAttribute('data-count'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, n) {
        if (!en.isIntersecting) return;
        show(en.target, en.target.dataset.delay || n * 70);
        io.unobserve(en.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -60px' });
    els.forEach(function (e) { io.observe(e); });

    /* Time-based throttle rather than requestAnimationFrame: rAF stalls when
       the page is not being painted (background tab, headless render), which
       would leave sections stuck at opacity 0. */
    var last = 0, trailing;
    function onScroll() {
      var now = Date.now();
      clearTimeout(trailing);
      if (now - last > 80) { last = now; sweep(); }
      else trailing = setTimeout(function () { last = Date.now(); sweep(); }, 90);
      if (!els.some(function (e) { return !e.classList.contains('is-in'); })) {
        window.removeEventListener('scroll', onScroll);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', sweep, { passive: true });
    window.addEventListener('load', sweep);
    window.addEventListener('beforeprint', function () { els.forEach(function (e) { e.classList.add('is-in'); }); });
    sweep();

    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, raw = el.getAttribute('data-count');
        var target = parseFloat(String(raw).replace(/[^\d.]/g, '')) || 0;
        var suffix = String(raw).replace(/[\d.,\s]/g, '');
        var t0 = null, dur = 1400;
        (function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$('[data-count]').forEach(function (e) { co.observe(e); });
  }

  /* ----------------------------------------------------------------------
     10. Boot
     ---------------------------------------------------------------------- */
  function init() {
    applyConfig(); header(); hero(); forms();
    accordions(); filters(); lightbox(); reveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
