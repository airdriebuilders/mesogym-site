/* Meso Gym cookie consent + Google Analytics 4 (t89, Nov 2 2026).
   UK GDPR / PECR: Google Consent Mode v2 with everything denied by default. gtag.js is not even loaded until the
   visitor taps Accept, so no analytics cookies and no Google requests before consent. Reject (or no choice) = off.
   The choice is kept in localStorage (mg_cookie_consent) for 12 months; "Cookie Settings" in the footer reopens it.
   Dev / preview hosts (anything that isn't mesogym.com) send events flagged debug_mode + traffic_type=internal + site_env=dev. */
(function () {
  'use strict';
  var GA_ID = 'G-6PB1LLG2K9';
  var KEY = 'mg_cookie_consent';
  var MAX_AGE = 365 * 864e5;
  var host = location.hostname;
  var LIVE = /^(www\.)?mesogym\.com$/.test(host);
  var w = window, d = document;

  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = w.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied', functionality_storage: 'denied', personalization_storage: 'denied',
    security_storage: 'granted'
  });
  gtag('set', 'ads_data_redaction', true);

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (v && (v.analytics === 'granted' || v.analytics === 'denied') && Date.now() - v.ts < MAX_AGE) return v.analytics;
    } catch (e) {}
    return null;
  }
  function save(val) { try { localStorage.setItem(KEY, JSON.stringify({ v: 1, analytics: val, ts: Date.now() })); } catch (e) {} }

  var loaded = false;
  function startGA() {
    w['ga-disable-' + GA_ID] = false;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    if (loaded) return;
    loaded = true;
    var s = d.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    d.head.appendChild(s);
    gtag('js', new Date());
    var cfg = { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_flags: 'SameSite=Lax;Secure', cookie_expires: 34128000 };
    if (!LIVE) { cfg.debug_mode = true; cfg.traffic_type = 'internal'; cfg.site_env = 'dev'; }
    gtag('config', GA_ID, cfg);
  }
  function stopGA() {
    w['ga-disable-' + GA_ID] = true;
    gtag('consent', 'update', { analytics_storage: 'denied' });
    // remove any Google Analytics cookies already set on this site
    var parts = host.split('.'), doms = [''];
    for (var i = 0; i < parts.length - 1; i++) doms.push('.' + parts.slice(i).join('.'));
    d.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n === '_ga' || n.indexOf('_ga_') === 0 || n === '_gid' || n === '_gat') {
        doms.forEach(function (dm) { d.cookie = n + '=; Max-Age=0; path=/' + (dm ? '; domain=' + dm : ''); });
      }
    });
  }

  var CSS = '' +
    '.mg-cc{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:200;max-width:560px;margin:0 auto;' +
    'background:rgba(12,17,29,.97);color:#f1f5ff;border:1px solid rgba(41,182,246,.45);border-radius:14px;padding:14px 16px 12px;' +
    'box-shadow:0 10px 32px -8px rgba(0,0,0,.75),0 0 22px -10px rgba(41,182,246,.6);font:inherit;font-size:.92rem;line-height:1.45;' +
    '-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}' +
    '.mg-cc[hidden]{display:none}' +
    '.mg-cc-head{display:flex;align-items:center;gap:8px;margin:0 0 4px;font-weight:800;font-size:1rem}' +
    '.mg-cc-head svg{width:20px;height:20px;flex:none;fill:none;stroke:#29b6f6;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.mg-cc p{margin:0;color:#c3cce0}' +
    '.mg-cc p a{color:#7dd6fb;text-decoration:underline;text-underline-offset:2px;display:inline-block;padding:4px 0;margin:-4px 0}' +
    '.mg-cc-now{margin-top:6px!important;font-size:.85rem}' +
    '.mg-cc-row{display:flex;gap:10px;margin-top:4px}' +
    '.mg-cc-btn{flex:1 1 0;min-width:0;position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:36px;margin:4px 0;padding:0 14px;' +
    'border-radius:10px;border:1px solid #29b6f6;background:#29b6f6;color:#062033;font:inherit;font-weight:800;font-size:.95rem;cursor:pointer;' +
    'box-shadow:0 1px 0 rgba(255,255,255,.3) inset,0 4px 12px -6px rgba(41,182,246,.8);-webkit-tap-highlight-color:transparent}' +
    '.mg-cc-btn::after{content:"";position:absolute;left:0;right:0;top:-4px;bottom:-4px}' +
    '.mg-cc-btn:hover{filter:brightness(1.07)}' +
    '.mg-cc-btn:focus-visible{outline:2px solid #f1f5ff;outline-offset:2px}' +
    '.mg-cc-btn svg{width:16px;height:16px;fill:none;stroke:#062033;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;display:none}' +
    '.mg-cc-btn[aria-pressed="true"]{box-shadow:0 0 0 2px #0c111d,0 0 0 4px #f1f5ff}' +
    '.mg-cc-btn[aria-pressed="true"] svg{display:block}' +
    '.mg-cc-link{background:none;border:0;padding:0;margin:0;font:inherit;color:inherit;text-decoration:none;cursor:pointer;min-height:24px}' +
    'footer nav .mg-cc-link{color:var(--muted,#9aa6c2)}.prose .mg-cc-link{color:var(--accent,#4fc3f7)}' +
    '.prose .mg-cc-link{text-decoration:underline;text-underline-offset:2px}' +
    '.mg-cc-link:hover{text-decoration:underline}' +
    'body.mg-cc-open{padding-bottom:var(--mg-cc-h,0px)}' +
    '.mg-cc.mg-cc--inline{position:relative;left:auto;right:auto;bottom:auto;width:calc(100% - 24px);margin:12px auto 0;box-shadow:0 0 22px -12px rgba(41,182,246,.6)}' +
    '@media (min-width:700px){.mg-cc:not(.mg-cc--inline){left:auto;right:20px;bottom:calc(20px + env(safe-area-inset-bottom,0px));width:440px}}';

  var TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var el, nowLine, btnA, btnR, ro;

  function privacyHref() { return '/privacy.html#cookies'; }

  function build() {
    if (el) return;
    el = d.createElement('section');
    el.className = 'mg-cc';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Cookie Choices');
    el.setAttribute('data-testid', 'cookie-banner');
    el.hidden = true;
    el.innerHTML =
      '<p class="mg-cc-head"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a4 4 0 0 0 4.8 4.8A4 4 0 0 0 21 12.8z"/><circle cx="8.5" cy="11.5" r=".6"/><circle cx="12" cy="16" r=".6"/><circle cx="15.5" cy="13" r=".6"/></svg>Cookies On Meso Gym</p>' +
      '<p>We\'d like to use Google Analytics cookies to improve this site. They stay off unless you tap Accept. <a href="' + privacyHref() + '">Privacy Policy</a></p>' +
      '<p class="mg-cc-now" hidden></p>' +
      '<div class="mg-cc-row">' +
      '<button type="button" class="mg-cc-btn" data-cc="denied" data-testid="cookie-reject" aria-pressed="false">' + TICK + 'Reject</button>' +
      '<button type="button" class="mg-cc-btn" data-cc="granted" data-testid="cookie-accept" aria-pressed="false">' + TICK + 'Accept</button>' +
      '</div>';
    d.body.appendChild(el);
    nowLine = el.querySelector('.mg-cc-now');
    btnR = el.querySelector('[data-cc="denied"]');
    btnA = el.querySelector('[data-cc="granted"]');
    el.addEventListener('click', function (ev) {
      var b = ev.target.closest && ev.target.closest('[data-cc]');
      if (!b) return;
      choose(b.getAttribute('data-cc'));
    });
    if (w.ResizeObserver) { ro = new ResizeObserver(pad); ro.observe(el); }
    w.addEventListener('resize', pad);
  }
  function pad() {
    if (!el || el.hidden || el.classList.contains('mg-cc--inline')) return;
    d.body.style.setProperty('--mg-cc-h', (el.offsetHeight + 24) + 'px');
  }
  function place(inline) {
    el.classList.toggle('mg-cc--inline', !!inline);
    var hdr = d.querySelector('header.site-header') || d.querySelector('body > header');
    if (inline && hdr && hdr.parentNode) hdr.parentNode.insertBefore(el, hdr.nextSibling);
    else if (inline) d.body.insertBefore(el, d.body.firstChild);
    else d.body.appendChild(el);
  }
  function covers() {
    var b = el.getBoundingClientRect(), vh = w.innerHeight;
    var ks = d.querySelectorAll('a.btn, a.lp-btn, a.primary, .stores a, .dev-try, a.dev-btn, [data-sub-link].btn');
    for (var i = 0; i < ks.length; i++) {
      var r = ks[i].getBoundingClientRect();
      if (r.width && r.top < vh && r.bottom > 0 && r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top) return true;
    }
    return false;
  }
  function show(focus) {
    build();
    var cur = read();
    btnA.setAttribute('aria-pressed', cur === 'granted' ? 'true' : 'false');
    btnR.setAttribute('aria-pressed', cur === 'denied' ? 'true' : 'false');
    if (cur) { nowLine.hidden = false; nowLine.textContent = 'Current Choice: ' + (cur === 'granted' ? 'Accepted' : 'Rejected'); }
    else nowLine.hidden = true;
    // Phones, first visit: sit in the page under the header so it never covers the hero buttons.
    // Cookie Settings (opened from the footer or privacy page) floats at the bottom, where the visitor is.
    // On larger screens it floats bottom-right, unless that would cover a visible button, then it sits inline too.
    var inline = !focus && w.matchMedia && w.matchMedia('(max-width: 699px)').matches;
    place(inline);
    el.hidden = false;
    if (!inline && !focus && covers()) { place(true); inline = true; }
    if (!inline) { d.body.classList.add('mg-cc-open'); pad(); }
    if (focus) (cur === 'granted' ? btnA : btnR).focus();
  }
  function hide() {
    if (!el) return;
    el.hidden = true;
    d.body.classList.remove('mg-cc-open');
  }
  function choose(val) {
    save(val);
    if (val === 'granted') startGA(); else stopGA();
    hide();
  }

  function footerLink() {
    var nav = d.querySelector('footer nav');
    if (nav && !nav.querySelector('.mg-cc-link')) {
      var b = d.createElement('button');
      b.type = 'button'; b.className = 'mg-cc-link'; b.textContent = 'Cookie Settings';
      b.setAttribute('data-cookie-settings', ''); b.setAttribute('data-testid', 'footer-cookie-settings');
      nav.appendChild(b);
    }
    d.addEventListener('click', function (ev) {
      var t = ev.target.closest && ev.target.closest('[data-cookie-settings]');
      if (t) { ev.preventDefault(); show(true); }
    });
  }

  w.MesoCookies = { open: function () { show(true); }, status: read };

  function init() {
    var st = d.createElement('style'); st.setAttribute('data-mg-cc', ''); st.textContent = CSS; d.head.appendChild(st);
    footerLink();
    var cur = read();
    if (cur === 'granted') startGA();
    else if (cur === 'denied') stopGA();
    else show(false);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
