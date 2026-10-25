(function(){var b=document.querySelector('.menu-btn'),m=document.getElementById('site-menu');if(!b||!m)return;
function set(o){b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');m.hidden=!o;if(o){var a=m.querySelector('a[aria-current]')||m.querySelector('.menu-label');a&&a.focus({preventScroll:false});}}
m.querySelectorAll('.menu-label').forEach(function(t){var l=document.getElementById(t.getAttribute('aria-controls'));if(!l)return;function x(v){t.setAttribute('aria-expanded',v);l.hidden=!v;}if(l.querySelector('a[aria-current]'))x(true);t._x=x;t.addEventListener('click',function(){var o=l.hidden;if(o)m.querySelectorAll('.menu-label').forEach(function(u){if(u!==t&&u._x)u._x(false);});x(o)});});
b.addEventListener('click',function(){set(m.hidden)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden){set(false);b.focus();}});
document.addEventListener('click',function(e){if(!m.hidden&&!m.contains(e.target)&&!b.contains(e.target))set(false);});})();
(function(){var r=document.documentElement,h=0;function c(){return Math.max(window.innerHeight||0,r.clientHeight||0,(screen&&screen.height)||0)}
function s(f){var n=c();if(f||n>h){h=n;r.style.setProperty('--bgh',h+'px');}}
s(true);window.addEventListener('resize',function(){s(false)});
window.addEventListener('orientationchange',function(){setTimeout(function(){h=0;s(true)},300)});})();

/* Subscribe links carry the chosen currency to app.mesogym.com/subscribe. */
(function(){try{var c=localStorage.getItem("mesolab-currency");if(/^(GBP|USD|CAD|AUD|NZD)$/.test(c||""))document.querySelectorAll("[data-sub-link]").forEach(function(a){var pl=a.getAttribute("data-plan");a.href="https://app.mesogym.com/subscribe?cur="+c+(pl?"&plan="+pl:"")})}catch(e){}})();
