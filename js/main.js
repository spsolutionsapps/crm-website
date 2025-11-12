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

