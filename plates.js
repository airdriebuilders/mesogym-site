/* Barbell-loading puzzle for the contact form (light anti-spam; contact.js checks the answer before sending). */
(function(){var f=document.querySelector('.plates');if(!f)return;
var T=[60,80,100,120],tgt=T[Math.floor(Math.random()*T.length)];f.dataset.target=tgt;f.querySelectorAll('.tgt').forEach(function(e){e.textContent=tgt});
var bar=+f.dataset.bar,load=[],tot=f.querySelector('#f-total'),now=f.querySelector('.now'),L=f.querySelector('.side.left'),R=f.querySelector('.side.right');
f.querySelector('.plate-btns').hidden=false;f.querySelector('.loaded').hidden=false;
function sum(){return bar+2*load.reduce(function(a,b){return a+b},0)}
function draw(){[L,R].forEach(function(s){s.innerHTML='';load.forEach(function(kg){var d=document.createElement('span');d.className='disc p'+String(kg).replace('.','_');s.appendChild(d)})});
 var t=sum();now.textContent=t;tot.value=load.length?t:'';f.classList.toggle('done',t===tgt);f.classList.toggle('over',t>tgt);}
f.querySelectorAll('.plate').forEach(function(b){b.addEventListener('click',function(){if(load.length<8&&sum()+2*b.dataset.kg<=200){load.push(+b.dataset.kg);draw();}})});
f.querySelector('.reset').addEventListener('click',function(){load=[];draw();});draw();})();
