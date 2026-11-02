/* Local-currency prices. No network calls: country comes from navigator.languages, then the time zone. Default USD. */
(function(){
var P={USD:['$',14,80,34,200],GBP:['£',10,60,25,150],AUD:['A$',20,115,48,290],CAD:['C$',19,113,47,285],NZD:['NZ$',24,145,59,360]};
/* Website prices (app.mesogym.com/subscribe): Individual m/y, Family m/y, PT from. Keep in sync with functions/src/plans.ts in the app repo. */
var W={"USD":[12,72,30,180,35],"GBP":[9,54,23,135,25],"AUD":[18,103,43,261,50],"CAD":[17,101,42,256,48],"NZD":[21,130,53,324,60]},WK={im:0,iy:1,fm:2,fy:3,pt:4};
var PT={"USD":{"pt_starter":[35,210],"pt_pro":[67,403],"pt_studio":[126,756],"small_gym":[251,1506],"large_gym":[489,2934],"corporate":[489,2934],"corporate_site":[244,1464]},"GBP":{"pt_starter":[25,150],"pt_pro":[48,288],"pt_studio":[90,540],"small_gym":[180,1080],"large_gym":[350,2100],"corporate":[350,2100],"corporate_site":[175,1050]},"AUD":{"pt_starter":[50,300],"pt_pro":[96,576],"pt_studio":[180,1081],"small_gym":[360,2160],"large_gym":[700,4200],"corporate":[700,4200],"corporate_site":[350,2100]},"CAD":{"pt_starter":[48,285],"pt_pro":[91,547],"pt_studio":[171,1026],"small_gym":[341,2046],"large_gym":[664,3984],"corporate":[664,3984],"corporate_site":[332,1992]},"NZD":{"pt_starter":[60,360],"pt_pro":[115,692],"pt_studio":[216,1297],"small_gym":[431,2586],"large_gym":[839,5034],"corporate":[839,5034],"corporate_site":[419,2514]}};
var K={pm:1,py:2,fm:3,fy:4},C={US:'USD',GB:'GBP',UK:'GBP',AU:'AUD',CA:'CAD',NZ:'NZD'};
var CA=['Toronto','Vancouver','Edmonton','Winnipeg','Halifax','Regina','St_Johns'];
/* Competitor prices per currency, from each app's App Store listing (checked 29 Oct 2026). [monthly, yearly]; null = not verified. Missing currency = not verified: [data-comp-block] hides, [data-comp-none] shows. */
var CP={rp:{USD:[34.99,299.99],GBP:[34.99,299.99],AUD:[59.99,499.99],CAD:[49.99,399.99],NZD:[59.99,499.99]},ap:{USD:[12.99,79.99],GBP:[null,69.99],AUD:[19.99,119.99],CAD:[16.99,99.99],NZD:[19.99,129.99]},ms:{USD:[19,171]},msp:{USD:[29,259]}};
/* Nov 2 2026: whole-number prices show without pence (q35/t88). */
function money(n){return n.toLocaleString('en-US',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2})}
function fm(n){return n%1?n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):String(n)}
function detect(){
  var L=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];
  for(var i=0;i<L.length;i++){var m=/^[a-z]{2,3}(?:-[A-Za-z]{4})?-([A-Za-z]{2})\b/.exec(L[i]||'');if(m){var c=m[1].toUpperCase();return C[c]||(i===0?'USD':null)||'USD';}}
  var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){}
  if(tz==='Europe/London')return'GBP';if(tz==='Pacific/Auckland')return'NZD';if(tz.indexOf('Australia/')===0)return'AUD';
  if(tz.indexOf('America/')===0)return CA.indexOf(tz.slice(8))>=0?'CAD':'USD';
  return'USD';}
function get(){try{var s=localStorage.getItem('mesolab-currency');if(P[s])return s}catch(e){}return detect();}
function apply(cur){var p=P[cur];
  document.querySelectorAll('[data-price]').forEach(function(el){el.textContent=p[0]+money(p[K[el.getAttribute('data-price')]])});
  document.querySelectorAll('[data-web]').forEach(function(el){el.textContent=p[0]+money(W[cur][WK[el.getAttribute('data-web')]])});
  document.querySelectorAll('[data-save]').forEach(function(el){var k=el.getAttribute('data-save'),w=W[cur][WK[k]],a=p[{im:1,iy:2,fm:3,fy:4}[k]];el.textContent='Save '+Math.floor(100*(1-w/a)+1e-9)+'%'});
  document.querySelectorAll('[data-pt]').forEach(function(el){var k=el.getAttribute('data-pt').split(':');el.textContent=p[0]+money(PT[cur][k[0]][+k[1]])});
  document.querySelectorAll('[data-comp]').forEach(function(el){var k=el.getAttribute('data-comp').split(':'),c=CP[k[0]][cur];el.textContent=c&&c[+k[1]]!=null?p[0]+fm(c[+k[1]]):(el.getAttribute('data-comp-alt')||'')});
  document.querySelectorAll('[data-comp-save]').forEach(function(el){var c=CP[el.getAttribute('data-comp-save')][cur];el.textContent=c?p[0]+fm(Math.round(c[1]-p[2])):(el.getAttribute('data-comp-alt')||'')});
  document.querySelectorAll('[data-comp-block]').forEach(function(el){el.hidden=!CP[el.getAttribute('data-comp-block')][cur]});
  document.querySelectorAll('[data-comp-none]').forEach(function(el){el.hidden=!!CP[el.getAttribute('data-comp-none')][cur]});
  document.querySelectorAll('[data-sub-link]').forEach(function(a){var pl=a.getAttribute('data-plan');a.href='https://app.mesogym.com/subscribe?cur='+cur+(pl?'&plan='+pl:'')});
  document.querySelectorAll('[data-cur]').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-cur')===cur)});
  document.documentElement.setAttribute('data-currency',cur);}
document.querySelectorAll('[data-cur]').forEach(function(b){b.addEventListener('click',function(){var c=b.getAttribute('data-cur');try{localStorage.setItem('mesolab-currency',c)}catch(e){}apply(c)})});
apply(get());
})();
