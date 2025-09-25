// Mobile nav toggle & smooth scroll
(function(){
  const toggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navList = document.getElementById('navList');

  // move navList into mobileMenu for accessibility
  function buildMobileMenu(){
    if(!mobileMenu || !navList) return;
    mobileMenu.innerHTML = "";
    mobileMenu.appendChild(navList.cloneNode(true));
  }
  buildMobileMenu();

  toggle.addEventListener('click', ()=> {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.style.display = expanded ? 'none' : 'block';
  });

  // smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        if(window.innerWidth < 720) mobileMenu.style.display = 'none';
      }
    });
  });
})();