const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const siteHeader = document.getElementById("site-header");
const headerLinks = document.querySelectorAll(
  'header a[href^="#"], #mobile-menu a[href^="#"]'
);
const contactModal = document.getElementById("contact-modal");
const contactOverlay = document.getElementById("contact-overlay");
const contactClose = document.getElementById("contact-close");
const contactTriggers = document.querySelectorAll(".js-contact-trigger");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

if (siteHeader) {
  let lastScrollY = window.scrollY;
  const desktopBreakpoint = 1024;

  const handleHeaderState = () => {
    const currentScroll = window.scrollY;
    const isDesktop = window.innerWidth >= desktopBreakpoint;

    if (!isDesktop) {
      siteHeader.classList.remove("header-fixed", "header-hidden");
      return;
    }

    if (currentScroll <= 0) {
      siteHeader.classList.remove("header-fixed", "header-hidden");
      lastScrollY = currentScroll;
      return;
    }

    if (currentScroll < lastScrollY) {
      siteHeader.classList.add("header-fixed");
      siteHeader.classList.remove("header-hidden");
    } else if (currentScroll > lastScrollY + 4) {
      siteHeader.classList.add("header-fixed", "header-hidden");
    }

    lastScrollY = currentScroll;
  };

  window.addEventListener("scroll", handleHeaderState, { passive: true });
  window.addEventListener("resize", handleHeaderState);
}

headerLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    event.preventDefault();

    const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
    const elementTop =
      targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: elementTop,
      behavior: "smooth",
    });

    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });
});

const openContactModal = () => {
  if (!contactModal) return;
  if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.add("hidden");
  }
  contactModal.classList.remove("hidden");
  contactModal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
};

const closeContactModal = () => {
  if (!contactModal) return;
  contactModal.classList.remove("flex");
  contactModal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
};

if (contactTriggers.length && contactModal) {
  contactTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openContactModal();
      
      // Si es el botón del plan Growth, establecer el asunto
      if (trigger.classList.contains("js-plan-growth")) {
        const subjectSelect = document.getElementById("contact-subject");
        if (subjectSelect) {
          subjectSelect.value = "growth";
        }
      }
    });
  });
}

if (contactClose) {
  contactClose.addEventListener("click", closeContactModal);
}

if (contactOverlay) {
  contactOverlay.addEventListener("click", closeContactModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && contactModal && !contactModal.classList.contains("hidden")) {
    closeContactModal();
  }
});

const modeButtons = document.querySelectorAll(".js-mode-toggle");
const dashboardDark = document.getElementById("dashboard-dark");
const dashboardLight = document.getElementById("dashboard-light");

if (modeButtons.length && dashboardDark && dashboardLight) {
  const setMode = (mode) => {
    modeButtons.forEach((button) => {
      const isActive = button.dataset.mode === mode;
      button.classList.toggle("bg-primary", isActive);
      button.classList.toggle("text-secondary", isActive);
      button.classList.toggle("shadow-card", isActive);
      button.classList.toggle("text-white/70", !isActive);
      button.classList.toggle("text-white", isActive);
    });

    if (mode === "light") {
      dashboardLight.classList.remove("hidden");
      dashboardDark.classList.add("hidden");
    } else {
      dashboardDark.classList.remove("hidden");
      dashboardLight.classList.add("hidden");
    }
  };

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode === "light" ? "light" : "dark";
      setMode(mode);
    });
  });

  setMode("light");
}

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay ? parseInt(el.dataset.revealDelay, 10) : 0;
          setTimeout(() => {
            el.classList.add("reveal-active");
          }, delay);
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// Custom slide effect for carousel
(function() {
  function initCarousel() {
    const carousel = document.getElementById('default-carousel');
    if (!carousel) {
      // Retry if carousel not found yet
      setTimeout(initCarousel, 100);
      return;
    }

    const items = carousel.querySelectorAll('[data-carousel-item]');
    if (items.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval = null;

    // Initialize: first item visible, others to the right
    items.forEach((item, index) => {
      // Remove all transform classes first
      item.classList.remove('translate-x-0', 'translate-x-full', '-translate-x-full');
      
      if (index === 0) {
        item.style.transform = 'translateX(0%)';
        item.classList.add('translate-x-0');
      } else {
        item.style.transform = 'translateX(100%)';
        item.classList.add('translate-x-full');
      }
    });

    // Function to update slide positions
    function updateSlides(newIndex) {
      if (newIndex < 0 || newIndex >= items.length) return;
      
      items.forEach((item, index) => {
        // Remove all transform classes
        item.classList.remove('translate-x-0', 'translate-x-full', '-translate-x-full');
        
        if (index < newIndex) {
          // Items before current: move to left
          item.style.transform = 'translateX(-100%)';
          item.classList.add('-translate-x-full');
        } else if (index === newIndex) {
          // Current item: center
          item.style.transform = 'translateX(0%)';
          item.classList.add('translate-x-0');
        } else {
          // Items after current: move to right
          item.style.transform = 'translateX(100%)';
          item.classList.add('translate-x-full');
        }
      });
      
      currentIndex = newIndex;

      // Update indicators
      const indicators = carousel.querySelectorAll('[data-carousel-slide-to]');
      indicators.forEach((indicator, index) => {
        if (index === newIndex) {
          indicator.setAttribute('aria-current', 'true');
          indicator.classList.remove('bg-white/50');
          indicator.classList.add('bg-white');
        } else {
          indicator.setAttribute('aria-current', 'false');
          indicator.classList.remove('bg-white');
          indicator.classList.add('bg-white/50');
        }
      });
    }

    // Navigation functions
    function nextSlide() {
      const newIndex = (currentIndex + 1) % items.length;
      updateSlides(newIndex);
    }

    function prevSlide() {
      const newIndex = (currentIndex - 1 + items.length) % items.length;
      updateSlides(newIndex);
    }

    function goToSlide(index) {
      if (index >= 0 && index < items.length) {
        updateSlides(index);
        resetAutoplay();
      }
    }

    // Autoplay
    function startAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
      startAutoplay();
    }

    // Event listeners
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const indicators = carousel.querySelectorAll('[data-carousel-slide-to]');

    if (prevButton) {
      prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
        resetAutoplay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
        resetAutoplay();
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(index);
      });
    });

    // Start autoplay
    startAutoplay();

    // Pause on hover
    carousel.addEventListener('mouseenter', function() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    });

    carousel.addEventListener('mouseleave', function() {
      startAutoplay();
    });
  }

  // Initialize when DOM is ready and after a short delay to ensure Flowbite doesn't interfere
  function startInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initCarousel, 200);
      });
    } else {
      // DOM already loaded
      setTimeout(initCarousel, 200);
    }
  }
  
  startInit();
})();

// Manejo del formulario de contacto con AJAX
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const formData = new FormData(contactForm);
    
    // Deshabilitar botón de envío
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    
    // Ocultar mensaje anterior
    formMessage.classList.add("hidden");
    
    try {
      const response = await fetch("send-email.php", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Mostrar mensaje de éxito
        formMessage.textContent = "¡Gracias por comunicarte con nosotros! En menos de 24hs estaremos comunicándonos.";
        formMessage.className = "px-4 py-3 rounded-lg text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30";
        formMessage.classList.remove("hidden");
        
        // Limpiar formulario
        contactForm.reset();
        
        // Hacer scroll al mensaje para que sea visible
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        // Mostrar mensaje de error
        formMessage.textContent = data.message || "Error al enviar el mensaje. Por favor intenta nuevamente.";
        formMessage.className = "px-4 py-3 rounded-lg text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/30";
        formMessage.classList.remove("hidden");
      }
    } catch (error) {
      // Mostrar mensaje de error
      formMessage.textContent = "Error de conexión. Por favor verifica tu conexión e intenta nuevamente.";
      formMessage.className = "px-4 py-3 rounded-lg text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/30";
      formMessage.classList.remove("hidden");
    } finally {
      // Rehabilitar botón
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

