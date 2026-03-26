// ============================================================
//  PRITAM GAJBHIYE — PORTFOLIO JS
// ============================================================

(function () {
  "use strict";

  // Elements
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const scrollProgress = document.getElementById("scrollProgress");
  const footerYear = document.getElementById("footerYear");

  // Footer year
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // ---- Theme ----
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pg-theme", theme);
    if (themeIcon) {
      themeIcon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  }

  const savedTheme = localStorage.getItem("pg-theme") || "light";
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "light" ? "dark" : "light");
    });
  }

  // ---- Mobile menu ----
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });
  }

  // ---- Scroll progress ----
  function updateProgress() {
    const docEl = document.documentElement;
    const scrollTop = docEl.scrollTop;
    const scrollHeight = docEl.scrollHeight - docEl.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });

  // ---- Reveal on scroll ----
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // ---- Project filters ----
  const filterChips = document.querySelectorAll(".filter-chip");
  const projectCards = document.querySelectorAll("#projectsGrid .project-card");

  filterChips.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterChips.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(" ");
        const show = filter === "all" || tags.includes(filter);
        card.style.display = show ? "grid" : "none";
        // Re-trigger reveal for visible cards
        if (show && !card.classList.contains("show")) {
          card.classList.remove("show");
          void card.offsetWidth;
          revealObserver.observe(card);
        }
      });
    });
  });

  // ---- Active nav link highlight on scroll ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.style.color = "";
          link.style.background = "";
          if (link.getAttribute("href") === "#" + id) {
            link.style.color = "var(--accent)";
          }
        });
      }
    });
  }
  window.addEventListener("scroll", highlightNav, { passive: true });
})();
