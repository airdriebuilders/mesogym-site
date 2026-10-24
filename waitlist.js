/* Launch waitlist: writes {email, platform, createdAt, source} to Firestore (project meso-lab-app, collection "waitlist") via the REST API.
   Doc id = SHA-256 of the lowercased email, so repeat sign-ups don't multiply. Firestore rules allow create only; reads are admin-only.
   The API key below is the public Firebase web key (not a secret). */
(function(){
var KEY='AIzaSyBnhusFhr5RiYLHGKoJD3wBTMMVhhF5Rls',P='projects/meso-lab-app/databases/(default)/documents',
 URL='https://firestore.googleapis.com/v1/'+P+':commit?key='+KEY,t0=Date.now(),LS='mg_waitlist_last';
function hex(buf){return Array.prototype.map.call(new Uint8Array(buf),function(b){return ('0'+b.toString(16)).slice(-2)}).join('')}
document.querySelectorAll('form.wl-form').forEach(function(f){
 var err=f.querySelector('.wl-err'),btn=f.querySelector('button[type=submit]'),box=f.closest('.wl');
 function fail(m){err.textContent=m;err.hidden=false;}
 function done(){box.querySelector('.wl-body').hidden=true;var ok=box.querySelector('.wl-ok');ok.hidden=false;ok.focus&&ok.focus();try{localStorage.setItem(LS,String(Date.now()))}catch(e){}}
 f.addEventListener('submit',function(e){e.preventDefault();err.hidden=true;
  var email=(f.elements.email.value||'').trim().toLowerCase(),pl=f.querySelector('input[name=platform]:checked'),platform=pl?pl.value:'';
  if(f.elements.website&&f.elements.website.value){done();return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254){fail('Please enter a valid email address.');return;}
  if(Date.now()-t0<2000){fail('That was quick! Please wait a moment and try again.');return;}
  var last=0;try{last=+localStorage.getItem(LS)||0}catch(e){}
  if(Date.now()-last<60000){fail('You\'ve just signed up. Please wait a minute before trying again.');return;}
  if(!window.crypto||!crypto.subtle){fail('Sorry, your browser can\'t sign up here. Please use the contact form instead.');return;}
  btn.disabled=true;var lbl=btn.textContent;btn.textContent='Sending…';
  crypto.subtle.digest('SHA-256',new TextEncoder().encode(email)).then(function(h){
   var body={writes:[{update:{name:P+'/waitlist/'+hex(h),fields:{email:{stringValue:email},platform:{stringValue:platform},source:{stringValue:(location.pathname||'/').slice(0,100)}}},
    updateTransforms:[{fieldPath:'createdAt',setToServerValue:'REQUEST_TIME'}],currentDocument:{exists:false}}]};
   return fetch(URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  }).then(function(r){
   if(r.ok)return done();
   return r.json().catch(function(){return {}}).then(function(b){var s=b&&b.error&&b.error.status;
    if(s==='FAILED_PRECONDITION'||s==='ALREADY_EXISTS')return done(); // already on the list
    fail('Sorry, that didn\'t go through. Please try again in a few minutes.');});
  }).catch(function(){fail('Sorry, we couldn\'t connect. Please check your connection and try again.');})
  .then(function(){btn.disabled=false;btn.textContent=lbl;});
 });
});
})();
