/* Plans and Company pages (dev site): lazy-play the muted demo loop when it scrolls into view; monthly/yearly toggle. */
(function(){
  var vids=document.querySelectorAll('video.pp-lazyvid');
  function load(v){if(v.dataset.ppLoaded)return;v.dataset.ppLoaded='1';v.querySelectorAll('source[data-src]').forEach(function(s){s.src=s.dataset.src});v.load()}
  function play(v){load(v);var p=v.play();if(p&&p.catch)p.catch(function(){})}
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  vids.forEach(function(v){
    v.muted=true;
    if(reduce){v.setAttribute('controls','');load(v);return}
    if(!('IntersectionObserver' in window)){play(v);return}
    new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)play(v);else if(!v.paused)v.pause()})},{rootMargin:'200px 0px'}).observe(v);
  });
  document.querySelectorAll('[data-pp-toggle]').forEach(function(g){
    var scope=document.querySelector(g.getAttribute('data-pp-toggle'));if(!scope)return;
    var bs=g.querySelectorAll('button[data-period]');
    document.documentElement.classList.add('pp-js');
    var on=g.querySelector('button[aria-pressed="true"]');if(on)scope.setAttribute('data-period',on.getAttribute('data-period'));
    bs.forEach(function(b){b.addEventListener('click',function(){
      bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
      scope.setAttribute('data-period',b.getAttribute('data-period'));
    })});
  });
})();

/* Family value per person: follows the live [data-web] price set by prices.js (any currency) */
(function () {
  var outs = document.querySelectorAll('[data-pp]');
  if (!outs.length) return;
  function calc() {
    outs.forEach(function (o) {
      var k = o.getAttribute('data-pp'), mult = 1, src = k;
      if (/5$/.test(k)) { src = k.slice(0, -1); mult = 5; }
      var el = document.querySelector('[data-web="' + src + '"]');
      if (!el) return;
      var t = el.textContent.trim(), m = t.match(/^([^\d]*)([\d.,]+)(.*)$/);
      if (!m) return;
      var n = parseFloat(m[2].replace(/,/g, ''));
      var v = mult === 5 ? n * 5 : n / 5;
      var s = (v % 1 === 0) ? String(v) : v.toFixed(2);
      var txt = m[1] + s + m[3];
      if (o.textContent !== txt) o.textContent = txt;
    });
  }
  var mo = new MutationObserver(calc);
  document.querySelectorAll('[data-web]').forEach(function (el) { mo.observe(el, { childList: true, characterData: true, subtree: true }); });
  calc();
})();
