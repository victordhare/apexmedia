(function(){
  var c=document.getElementById('count'),n=0,t=setInterval(function(){
    n+=Math.ceil(Math.random()*7);if(n>=100){n=100;clearInterval(t)}c.textContent=n;
  },90);
  var tc=document.getElementById('tc'),s=Date.now()+2900;
  function p(x){return String(x).padStart(2,'0')}
  setInterval(function(){
    var d=Math.max(0,Date.now()-s),f=Math.floor(d/41.7)%24,sec=Math.floor(d/1000);
    tc.textContent='00:'+p(Math.floor(sec/60)%60)+':'+p(sec%60)+':'+p(f);
  },42);
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!rm){
    var sel='.about .photo,.about>div:last-child>*,.stats div,.strip-head>*,.strip,.case>*,#work .wrap>p,#work h2,.work-grid,.mindset h2,.mindset p,.svc li,.contact h2,.contact .wrap>.mute,.mail,.social';
    var els=document.querySelectorAll(sel);
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
      els.forEach(function(el){
        var i=Array.prototype.indexOf.call(el.parentNode.children,el);
        el.style.setProperty('--d',Math.min(i,5)*.12+'s');
        el.classList.add('rv');io.observe(el);
      });
    }
    var pr=document.createElement('div');pr.className='prog';document.body.appendChild(pr);
    var hw=document.querySelector('.hero .wrap'),tick=false;
    function onScroll(){
      if(tick)return;tick=true;
      requestAnimationFrame(function(){
        var y=window.scrollY,max=document.documentElement.scrollHeight-innerHeight;
        pr.style.transform='scaleX('+(max>0?y/max:0)+')';
        if(y<innerHeight){hw.style.transform='translateY('+y*.25+'px)';hw.style.opacity=Math.max(0,1-y/(innerHeight*.75))}
        tick=false;
      });
    }
    addEventListener('scroll',onScroll,{passive:true});
    if(matchMedia('(hover:hover)').matches){
      var gl=document.createElement('div');gl.className='glow';document.body.appendChild(gl);
      addEventListener('mousemove',function(e){gl.style.opacity=1;gl.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'},{passive:true});
      document.querySelectorAll('.card').forEach(function(cd){
        cd.addEventListener('mousemove',function(e){
          var r=cd.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
          cd.style.transform='perspective(800px) rotateY('+x*12+'deg) rotateX('+(-y*12)+'deg) translateY(-6px)';
        });
        cd.addEventListener('mouseleave',function(){cd.style.transform=''});
      });
      var bt=document.querySelector('.btn');
      bt.addEventListener('mousemove',function(e){
        var r=bt.getBoundingClientRect();
        bt.style.transform='translate('+(e.clientX-r.left-r.width/2)*.25+'px,'+(e.clientY-r.top-r.height/2)*.35+'px)';
      });
      bt.addEventListener('mouseleave',function(){bt.style.transform=''});
    }
  }
  var b=document.getElementById('copy');
  b.addEventListener('click',function(){
    try{navigator.clipboard.writeText(document.getElementById('em').textContent);b.textContent='Copied'}
    catch(e){b.textContent='Select and copy'}
    setTimeout(function(){b.textContent='Copy'},1800);
  });
})();
