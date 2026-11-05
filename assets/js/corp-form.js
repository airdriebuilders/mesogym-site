/* Nov 3 (dev): Ask About Corporate. Inline validation, then our own form handler (Firebase function formSubmit, Nov 4,
   user t5034u), which saves the enquiry and emails it to us. No email address in the page. Honeypot + minimum fill time
   here, plus server-side honeypot, rate limits and validation (phones must carry their + country code). */
(function(){var f=document.getElementById('corp-form');if(!f)return;
var ENDPOINT='https://europe-west2-meso-lab-app.cloudfunctions.net/formSubmit',t0=Date.now();f.action=ENDPOINT;
var btn=f.querySelector('button[type=submit]'),sendErr=f.querySelector('.cf-send-err'),fields=f.querySelector('.cf-fields'),done=f.querySelector('.cf-done');
var EMAIL=/^[^\s@()<>,;:"\[\]\\]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
var v=function(n){return ((f.elements[n]||{}).value||'').trim()};
var RULES={name:function(x){return x.length<2?'Please enter your name.':''},
 email:function(x){return !x?'Please enter your work email.':!EMAIL.test(x)?'Please enter a valid email address.':''},
 phone:function(){return window.MesoPhone?MesoPhone.read(f.elements.phone).error:''},
 gym_group:function(x){return x.length<2?'Please enter your gym group’s name.':''},
 locations:function(x){return x?'':'Please choose a number of locations.'}};
function check(n){var el=f.elements[n],m=RULES[n](v(n)),err=document.getElementById(el.id+'-err');err.textContent=m;
 if(m)el.setAttribute('aria-invalid','true');else el.removeAttribute('aria-invalid');return !m;}
Object.keys(RULES).forEach(function(n){var el=f.elements[n];
 el.addEventListener('blur',function(){if(v(n)||el.hasAttribute('aria-invalid')||el.dataset.touched)check(n);el.dataset.touched=1;});
 el.addEventListener(el.tagName==='SELECT'?'change':'input',function(){if(el.hasAttribute('aria-invalid'))check(n);});});
f.addEventListener('submit',function(e){e.preventDefault();sendErr.hidden=true;
 var bad=Object.keys(RULES).filter(function(n){return !check(n)});
 if(bad.length){f.elements[bad[0]].focus();return;}
 if(Date.now()-t0<3000){sendErr.textContent='That was quick! Please check your details and press Send Enquiry again.';sendErr.hidden=false;t0=0;return;}
 var finish=function(){var h=fields.offsetHeight;done.style.minHeight=Math.min(h,220)+'px';fields.hidden=true;done.hidden=false;done.focus({preventScroll:true});done.scrollIntoView({behavior:'smooth',block:'center'});};
 if(v('_honey')){finish();return;}
 var fd=new URLSearchParams();fd.set('form_type','corporate');['name','email','gym_group','locations','members','message'].forEach(function(n){fd.set(n,v(n))});
 fd.set('marketing_consent',f.elements.marketing_consent.checked?'Yes':'No');if(!v('members'))fd.set('members','Not given');
 fd.set('source',(f.elements.source.value||'')+' ('+location.pathname+')');
 if(v('phone')&&window.MesoPhone){var ph=MesoPhone.read(f.elements.phone);fd.set('phone',ph.display);fd.set('phone_e164',ph.e164);fd.set('phone_country',v('phone_country'));}
 btn.disabled=true;btn.textContent='Sending…';
 var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},15000);
 fetch(ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:fd,signal:ctl?ctl.signal:undefined})
 .then(function(r){return r.json().catch(function(){return {}}).then(function(b){return {r:r,b:b}})})
 .then(function(x){if(x.r.ok&&x.b.ok===true){f.reset();finish();}
   else{var m=(x.b.errors&&x.b.errors[0])||x.b.error||'';sendErr.textContent='Sorry, your enquiry wasn’t sent'+(m?': '+m.replace(/\.$/,''):'')+'. Please try again in a few minutes. You can also WhatsApp us on +44 7405 725097.';sendErr.hidden=false;}})
 .catch(function(){sendErr.textContent='Sorry, we couldn’t reach the enquiry service. Please check your connection and try again. You can also WhatsApp us on +44 7405 725097.';sendErr.hidden=false;})
 .then(function(){clearTimeout(tm);btn.disabled=false;btn.textContent='Send Enquiry';});});})();
