(function(){var b=document.querySelector('.menu-btn'),m=document.getElementById('site-menu');if(!b||!m)return;
function set(o){b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');m.hidden=!o;if(o){var a=m.querySelector('a[aria-current]')||m.querySelector('.menu-label');a&&a.focus({preventScroll:false});}}
m.querySelectorAll('.menu-label').forEach(function(t){var l=document.getElementById(t.getAttribute('aria-controls'));if(!l)return;function x(v){t.setAttribute('aria-expanded',v);l.hidden=!v;}if(l.querySelector('a[aria-current]'))x(true);t.addEventListener('click',function(){x(l.hidden)});});
b.addEventListener('click',function(){set(m.hidden)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden){set(false);b.focus();}});
document.addEventListener('click',function(e){if(!m.hidden&&!m.contains(e.target)&&!b.contains(e.target))set(false);});})();
(function(){var r=document.documentElement,h=0;function c(){return Math.max(window.innerHeight||0,r.clientHeight||0,(screen&&screen.height)||0)}
function s(f){var n=c();if(f||n>h){h=n;r.style.setProperty('--bgh',h+'px');}}
s(true);window.addEventListener('resize',function(){s(false)});
window.addEventListener('orientationchange',function(){setTimeout(function(){h=0;s(true)},300)});})();
