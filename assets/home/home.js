/* Home page: subtle reveal on scroll. Content is visible without JS; skipped for reduced motion. */
(function(){
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var els=document.querySelectorAll('.lp-feature,.lp-steps>li,.lp-grid3>li,.lp-prices>.lp-card,.lp-goals>a,.lp-rp,.lp-browser');
  document.documentElement.classList.add('lp-js');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('lp-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){el.classList.add('lp-rv');io.observe(el)});
})();
