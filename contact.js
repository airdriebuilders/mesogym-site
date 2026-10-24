/* Contact form: validates in the browser, then sends via FormSubmit's AJAX API. Address is assembled at runtime so no email address appears in the page source (anti-spam). */
(function(){var f=document.getElementById('contact-form');if(!f)return;
var ADDR=['mesogymapp','gmail.com'].join(String.fromCharCode(64)),ENDPOINT='https://formsubmit.co/ajax/'+ADDR,t0=Date.now();f.action='https://formsubmit.co/'+ADDR;
var errBox=f.querySelector('.form-errors'),ok=f.querySelector('.form-ok'),btn=f.querySelector('button[type=submit]');
var q=new URLSearchParams(location.search).get('subject');if(q){var o=f.querySelector('#f-subject option[value="'+q+'"]');if(o)o.selected=true;}
function show(list){var ul=errBox.querySelector('ul');ul.innerHTML='';list.forEach(function(m){var li=document.createElement('li');li.textContent=m;ul.appendChild(li)});errBox.hidden=!list.length;if(list.length)errBox.scrollIntoView({behavior:'smooth',block:'center'});}
f.addEventListener('submit',function(e){e.preventDefault();ok.hidden=true;
 var v=function(n){return (f.elements[n].value||'').trim()},e2=[],tgt=+f.querySelector('.plates').dataset.target;
 if(!v('name'))e2.push('Please enter your name.');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email')))e2.push('Please enter a valid email address.');
 if(v('message').length<10)e2.push('Please write a message of at least 10 characters.');
 if(+v('spotter_check')!==tgt)e2.push('The bar isn\'t loaded to '+tgt+' kg yet. Load it to '+tgt+' kg, or type '+tgt+'.');
 if(Date.now()-t0<3000)e2.push('That was quicker than a 1RM attempt. Please take a moment and try again.');
 show(e2);if(e2.length)return;
 if(v('_honey')){ok.hidden=false;f.reset();return;}
 var fd=new FormData(f);fd.set('_subject','Meso Gym contact: '+v('subject')+' from '+v('name'));fd.set('_replyto',v('email'));fd.delete('spotter_check');
 btn.disabled=true;btn.textContent='Sending…';
 fetch(ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:fd}).then(function(r){return r.json().catch(function(){return {}}).then(function(b){return {r:r,b:b}})})
 .then(function(x){if(x.r.ok&&(x.b.success===true||x.b.success==='true')){ok.hidden=false;f.reset();f.querySelector('.reset').click();ok.scrollIntoView({behavior:'smooth',block:'center'});}
   else show(['Sorry, your message wasn\'t sent'+(x.b.message?': '+x.b.message:'')+'. Please try again in a few minutes.']);})
 .catch(function(){show(['Sorry, we couldn\'t reach the message service. Please check your connection and try again.']);})
 .then(function(){btn.disabled=false;btn.textContent='Send Message';});});})();
