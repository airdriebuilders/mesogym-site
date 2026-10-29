/* Local-currency prices. No network calls: country comes from navigator.languages, then the time zone. Default USD. */
(function(){
var P={USD:['$',13.99,79.99,33.99,199.99],GBP:['£',9.99,59.99,24.99,149.99],AUD:['A$',19.99,114.99,47.99,289.99],CAD:['C$',18.99,112.99,46.99,284.99],NZD:['NZ$',23.99,144.99,58.99,359.99]};
/* Website prices (app.mesogym.com/subscribe): Individual m/y, Family m/y, PT from. Keep in sync with functions/src/plans.ts in the app repo. */
var W={"USD":[11.99,71.99,29.99,179.99,34.99],"GBP":[8.99,53.99,22.99,134.99,24.99],"AUD":[17.99,102.99,42.99,260.99,49.99],"CAD":[16.99,100.99,41.99,255.99,47.99],"NZD":[20.99,129.99,52.99,323.99,59.99]},WK={im:0,iy:1,fm:2,fy:3,pt:4};
var PT={"USD":{"pt_starter":[34.99,209.99],"pt_pro":[66.99,402.99],"pt_studio":[125.99,755.99],"pt_gym":[237.99,1427.99]},"GBP":{"pt_starter":[24.99,149.99],"pt_pro":[47.99,287.99],"pt_studio":[89.99,539.99],"pt_gym":[169.99,1019.99]},"AUD":{"pt_starter":[49.99,299.99],"pt_pro":[95.99,575.99],"pt_studio":[179.99,1080.99],"pt_gym":[339.99,2040.99]},"CAD":{"pt_starter":[47.99,284.99],"pt_pro":[90.99,546.99],"pt_studio":[170.99,1025.99],"pt_gym":[322.99,1938.99]},"NZD":{"pt_starter":[59.99,359.99],"pt_pro":[114.99,691.99],"pt_studio":[215.99,1296.99],"pt_gym":[407.99,2448.99]}};
var K={pm:1,py:2,fm:3,fy:4},C={US:'USD',GB:'GBP',UK:'GBP',AU:'AUD',CA:'CAD',NZ:'NZD'};
var CA=['Toronto','Vancouver','Edmonton','Winnipeg','Halifax','Regina','St_Johns'];
/* Competitor prices per currency, from each app's App Store listing (checked 29 Oct 2026). [monthly, yearly]; null = not verified. Missing currency = not verified: [data-comp-block] hides, [data-comp-none] shows. */
var CP={rp:{USD:[34.99,299.99],GBP:[34.99,299.99],AUD:[59.99,499.99],CAD:[49.99,399.99],NZD:[59.99,499.99]},ap:{USD:[12.99,79.99],GBP:[null,69.99],AUD:[19.99,119.99],CAD:[16.99,99.99],NZD:[19.99,129.99]},ms:{USD:[19,171]},msp:{USD:[29,259]}};
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
  document.querySelectorAll('[data-price]').forEach(function(el){el.textContent=p[0]+p[K[el.getAttribute('data-price')]].toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})});
  document.querySelectorAll('[data-web]').forEach(function(el){el.textContent=p[0]+W[cur][WK[el.getAttribute('data-web')]].toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})});
  document.querySelectorAll('[data-save]').forEach(function(el){var k=el.getAttribute('data-save'),w=W[cur][WK[k]],a=p[{im:1,iy:2,fm:3,fy:4}[k]];el.textContent='Save '+Math.floor(100*(1-w/a)+1e-9)+'%'});
  document.querySelectorAll('[data-pt]').forEach(function(el){var k=el.getAttribute('data-pt').split(':');el.textContent=p[0]+PT[cur][k[0]][+k[1]].toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})});
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
