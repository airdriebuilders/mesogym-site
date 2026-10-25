/* Local-currency prices. No network calls: country comes from navigator.languages, then the time zone. Default USD. */
(function(){
var P={USD:['$',13.99,79.99,33.99,199.99],GBP:['£',9.99,59.99,24.99,149.99],AUD:['A$',19.99,114.99,47.99,289.99],CAD:['C$',18.99,112.99,46.99,284.99],NZD:['NZ$',23.99,144.99,58.99,359.99]};
/* Website prices (app.mesogym.com/subscribe): Individual m/y, Family m/y, PT from. Keep in sync with functions/src/plans.ts in the app repo. */
var W={"USD":[11.99,71.99,29.99,179.99,34.99],"GBP":[8.99,53.99,21.99,134.99,24.99],"AUD":[17.99,102.99,42.99,260.99,49.99],"CAD":[16.99,100.99,41.99,255.99,47.99],"NZD":[20.99,129.99,52.99,323.99,59.99]},WK={im:0,iy:1,fm:2,fy:3,pt:4};
var K={pm:1,py:2,fm:3,fy:4},C={US:'USD',GB:'GBP',UK:'GBP',AU:'AUD',CA:'CAD',NZ:'NZD'};
var CA=['Toronto','Vancouver','Edmonton','Winnipeg','Halifax','Regina','St_Johns'];
function detect(){
  var L=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];
  for(var i=0;i<L.length;i++){var m=/^[a-z]{2,3}(?:-[A-Za-z]{4})?-([A-Za-z]{2})\b/.exec(L[i]||'');if(m){var c=m[1].toUpperCase();return C[c]||(i===0?'USD':null)||'USD';}}
  var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){}
  if(tz==='Europe/London')return'GBP';if(tz==='Pacific/Auckland')return'NZD';if(tz.indexOf('Australia/')===0)return'AUD';
  if(tz.indexOf('America/')===0)return CA.indexOf(tz.slice(8))>=0?'CAD':'USD';
  return'USD';}
function get(){try{var s=localStorage.getItem('mesolab-currency');if(P[s])return s}catch(e){}return detect();}
function apply(cur){var p=P[cur];
  document.querySelectorAll('[data-price]').forEach(function(el){el.textContent=p[0]+p[K[el.getAttribute('data-price')]].toFixed(2)});
  document.querySelectorAll('[data-web]').forEach(function(el){el.textContent=p[0]+W[cur][WK[el.getAttribute('data-web')]].toFixed(2)});
  document.querySelectorAll('[data-sub-link]').forEach(function(a){a.href='https://app.mesogym.com/subscribe?cur='+cur});
  document.querySelectorAll('[data-cur]').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-cur')===cur)});
  document.documentElement.setAttribute('data-currency',cur);}
document.querySelectorAll('[data-cur]').forEach(function(b){b.addEventListener('click',function(){var c=b.getAttribute('data-cur');try{localStorage.setItem('mesolab-currency',c)}catch(e){}apply(c)})});
apply(get());
})();
