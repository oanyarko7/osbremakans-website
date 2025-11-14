// Functionality for all pages
(function () {
  const toggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navList = document.getElementById('navList');

  // ✅ Build Mobile Menu if missing
  function buildMobileMenu() {
    if (!mobileMenu || !navList) return;
    mobileMenu.innerHTML = "";
    mobileMenu.appendChild(navList.cloneNode(true));
  }
  buildMobileMenu();

  // ✅ Hamburger Toggle with Slide Animation
  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.classList.toggle('show', !expanded);
    });
  }

  // ✅ Scroll Animation (Intersection Observer)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-card').forEach(card => {
      observer.observe(card);
    });
  } else {
    document.querySelectorAll('.animate-card').forEach(card => {
      card.classList.add('is-visible');
    });
  }

  // ✅ Shipment Form Submission (Formspree)
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".shipment-form");

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault(); // prevent page reload
        const formData = new FormData(form);

        try {
          const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            form.reset();

            // Confirmation Message
            const message = document.createElement("div");
            message.textContent = "Thank you! Your shipment request has been submitted. We will contact you shortly.";
            message.style.background = "#D1FAE5";
            message.style.color = "#065F46";
            message.style.padding = "12px 16px";
            message.style.borderRadius = "8px";
            message.style.marginTop = "16px";
            message.style.textAlign = "center";
            message.style.fontWeight = "600";
            message.style.opacity = 0;
            message.style.transform = "translateY(-20px)";
            message.style.transition = "opacity 0.6s ease, transform 0.6s ease";

            form.parentNode.insertBefore(message, form.nextSibling);

            requestAnimationFrame(() => {
              message.style.opacity = 1;
              message.style.transform = "translateY(0)";
            });

            setTimeout(() => {
              message.style.opacity = 0;
              message.style.transform = "translateY(-20px)";
              message.addEventListener("transitionend", () => message.remove());
            }, 8000);
          } else {
            alert("Oops! There was a problem submitting your form. Please try again.");
          }
        } catch (error) {
          alert("Network error. Please try again later.");
        }
      });
    }
  });

})();
