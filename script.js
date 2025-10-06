// Functionality for all pages
(function(){
  const toggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navList = document.getElementById('navList');
  
  // Mobile Menu Toggle
  function buildMobileMenu(){
    if(!mobileMenu || !navList) return;
    mobileMenu.innerHTML = "";
    mobileMenu.appendChild(navList.cloneNode(true));
  }
  buildMobileMenu();

  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.style.display = expanded ? 'none' : 'block';
    });
  }

  // Scroll Animation (Intersection Observer)
  // This efficiently checks if an element is in view to add the 'is-visible' class
  if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Stop observing once the element is visible
            observer.unobserve(entry.target); 
          }
        });
      }, {
        // Check if element is 10% visible
        threshold: 0.1 
      });

      // Target all elements with the 'animate-card' class on the current page
      document.querySelectorAll('.animate-card').forEach(card => {
        observer.observe(card);
      });
  } else {
      // Fallback for older browsers: show all elements immediately
      document.querySelectorAll('.animate-card').forEach(card => {
          card.classList.add('is-visible');
      });
  }
})();