/* Contact form: validates in the browser, then posts to our own form handler (Firebase function formSubmit, Nov 4, user t5034u),
   which saves the message and emails it to us. No email address appears in the page source.
   Nov 5 (audit W-018): invisible anti-spam only — honeypot + minimum-time check (no visible question). */
(function(){var f=document.getElementById('contact-form');if(!f)return;
var ENDPOINT='https://europe-west2-meso-lab-app.cloudfunctions.net/formSubmit',t0=Date.now();f.action=ENDPOINT;
var FALLBACK=' You can also WhatsApp us on +44 7405 725097, or try again later.';
var errBox=f.querySelector('.form-errors'),ok=f.querySelector('.form-ok'),btn=f.querySelector('button[type=submit]');
var q=new URLSearchParams(location.search).get('subject');if(q){var o=f.querySelector('#f-subject option[value="'+q+'"]');if(o)o.selected=true;}
function show(list){var ul=errBox.querySelector('ul');ul.innerHTML='';list.forEach(function(m){var li=document.createElement('li');li.textContent=m;ul.appendChild(li)});errBox.hidden=!list.length;if(list.length)errBox.scrollIntoView({behavior:'smooth',block:'center'});}
f.addEventListener('submit',function(e){e.preventDefault();ok.hidden=true;
 var v=function(n){return (f.elements[n].value||'').trim()},e2=[];
 if(!v('name'))e2.push('Please enter your name.');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email')))e2.push('Please enter a valid email address.');
 if(v('message').length<10)e2.push('Please write a message of at least 10 characters.');
 if(Date.now()-t0<3000)e2.push('That was a bit quick. Please take a moment and try again.');
 show(e2);if(e2.length)return;
 if(v('_honey')){ok.hidden=false;f.reset();return;}
 var body=new URLSearchParams({form_type:'contact',name:v('name'),email:v('email'),subject:v('subject'),message:v('message'),_honey:v('_honey'),source:'mesogym.com contact ('+location.pathname+')'});
 btn.disabled=true;btn.textContent='Sending…';
 var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},15000);
 fetch(ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:body,signal:ctl?ctl.signal:undefined}).then(function(r){return r.json().catch(function(){return {}}).then(function(b){return {r:r,b:b}})})
 .then(function(x){if(x.r.ok&&x.b.ok===true){ok.hidden=false;f.reset();ok.scrollIntoView({behavior:'smooth',block:'center'});}
   else{var m=(x.b.errors&&x.b.errors[0])||x.b.error||'';show(['Sorry, your message wasn\'t sent'+(m?': '+m.replace(/\.$/,''):'')+'. Please try again in a few minutes.'+FALLBACK]);}})
 .catch(function(){show(['Sorry, we couldn\'t reach the message service. Please check your connection and try again.'+FALLBACK]);})
 .then(function(){clearTimeout(tm);btn.disabled=false;btn.textContent='Send Message';});});})();
