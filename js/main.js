// Footer year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function getTheme() {
  return root.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function updateToggleLabel(theme) {
  if (!themeToggle) return;

  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
}

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateToggleLabel(theme);
}

// Initialize theme on load: use stored preference or system preference
function initTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    setTheme(stored);
    return;
  }

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(prefersLight ? "light" : "dark");
}
if (themeToggle) {
  updateToggleLabel(getTheme());
  initTheme();

  themeToggle.addEventListener("click", () => {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

// Mobile navigation
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  if (!siteHeader || !menuToggle) return;

  siteHeader.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

function openMenu() {
  if (!siteHeader || !menuToggle) return;

  siteHeader.classList.add("nav-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close menu");
}

if (menuToggle && siteHeader) {
  menuToggle.addEventListener("click", () => {
    if (siteHeader.classList.contains("nav-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Smooth-scroll for same-page anchors
      const href = link.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // move focus for accessibility
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      }

      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

// Active nav link while scrolling
const sections = document.querySelectorAll("section[id]");

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${sectionId}`
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// Fade-in animations on scroll
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (revealElements.length && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Contact form validation + mock submission
const contactForm =
  document.getElementById("contact-form") ||
  document.querySelector("form[data-validate]");

if (contactForm) {
  let statusEl = contactForm.querySelector(".form-status");
  if (!statusEl) {
    statusEl = document.createElement("div");
    statusEl.className = "form-status";
    statusEl.id = "form-status";
    statusEl.setAttribute("aria-live", "polite");
    contactForm.appendChild(statusEl);
  }

  // Show validation on submit and mock a send
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Use constraint API for native validation feedback
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submit = contactForm.querySelector('[type="submit"]');
    if (submit) submit.disabled = true;
    statusEl.textContent = "Sending...";

    // Mock network request
    setTimeout(() => {
      statusEl.textContent = "Message sent — thanks!";
      contactForm.reset();
      if (submit) submit.disabled = false;
    }, 800);
  });

  // Optional: live validation removal for inputs
  const inputs = contactForm.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        input.removeAttribute("aria-invalid");
      }
    });
  });
}
