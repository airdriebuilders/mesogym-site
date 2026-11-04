(function(){
var q=new URLSearchParams(location.search).get('q')||'';var input=document.getElementById('q');if(input)input.value=q;
var out=document.getElementById('results');
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function run(idx,term){var w=term.toLowerCase().split(/\s+/).filter(Boolean);
  if(!w.length){out.innerHTML='<p class="muted">Type what you need help with, for example invite codes, check-in or payments.</p>';return}
  var r=idx.map(function(p){var t=p.t.toLowerCase(),s=(p.s+' '+p.c).toLowerCase(),b=p.b.toLowerCase(),sc=0;
    for(var i=0;i<w.length;i++){var x=w[i];if(t.indexOf(x)>=0)sc+=5;else if(s.indexOf(x)>=0)sc+=2;else if(b.indexOf(x)>=0)sc+=1;else return null}return{p:p,sc:sc}}).filter(Boolean).sort(function(a,b){return b.sc-a.sc});
  out.innerHTML=r.length?r.map(function(x){return '<a class="card dev-hcard" href="/help/'+x.p.id+'.html"><span><strong>'+esc(x.p.t)+'</strong><span class="muted">'+esc(x.p.a+' · '+x.p.c)+'</span><span class="muted">'+esc(x.p.s)+'</span></span></a>'}).join(''):'<p class="muted">No results. Try another word, or browse the <a href="/help/">Help Centre</a>.</p>'}
fetch('/help/search-index.json').then(function(r){return r.json()}).then(function(idx){run(idx,q);if(input)input.addEventListener('input',function(){run(idx,input.value);history.replaceState(null,'','?q='+encodeURIComponent(input.value))})});
})();
