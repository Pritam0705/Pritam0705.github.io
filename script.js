// Theme toggle with localStorage
const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const yearEl = document.getElementById("year");
const progress = document.getElementById("progress");

yearEl.textContent = String(new Date().getFullYear());

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = themeToggle.querySelector("i");
  if (theme === "light") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
}

const saved = localStorage.getItem("theme");
setTheme(saved || "dark");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// Mobile menu
menuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  mobileNav.setAttribute("aria-hidden", mobileNav.classList.contains("open") ? "false" : "true");
});

document.querySelectorAll(".m-link").forEach(a => {
  a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Scroll progress bar
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progress.style.width = `${pct}%`;
});

// Project filters
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll("#projectGrid .card");

chips.forEach(btn => {
  btn.addEventListener("click", () => {
    chips.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = filter === "all" || tags.includes(filter);
      card.style.display = show ? "block" : "none";
    });
  });
});
