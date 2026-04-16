let toggle = document.getElementById("theme-toggle-button");
let settingsSidebar = document.getElementById("settings-sidebar");
let settingsToggle = document.getElementById("settings-toggle");
let closeSettings = document.getElementById("close-settings");
let currentBtns = document.querySelectorAll(".color-dot");
let mobileMenu = document.querySelector(".nav-links");
let menuBtn = document.getElementById("menu-btn");
let fontOptions = document.querySelectorAll(".font-option");
let heroSection = document.querySelector('a[href="#hero-section"]');
let scrollToTop = document.querySelector("#scroll-to-top");
let portfolioFilter = document.querySelectorAll(".portfolio-filter");
let portfolioItem = document.querySelectorAll(".portfolio-item");
let testimonialsCarousel = document.querySelector("#testimonials-carousel");
let nextTestimonialBtn = document.querySelector("#next-testimonial");
let prevTestimonialBtn = document.querySelector("#prev-testimonial");
let carouselIndicator = document.querySelectorAll(".carousel-indicator");
let body = document.querySelector("body");
let navLinks = document.querySelectorAll(".my-link");
let resetSettingsBtn = document.querySelector("#reset-settings");
let menuLinks = mobileMenu.querySelectorAll("a");
let currentCarouselIndex = 0;

// Dark Mode
toggle.addEventListener("click", function () {
  let isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

menuBtn.addEventListener("click", function () {
  mobileMenu.classList.remove("hidden");
  mobileMenu.classList.toggle("active");
});

for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
  });
}

// side setting
function Fonts() {
  for (let i = 0; i < fontOptions.length; i++) {
    fontOptions[i].addEventListener("click", function () {
      let selectedFont = this.getAttribute("data-font");

      document.body.classList.remove(
        "font-alexandria",
        "font-tajawal",
        "font-cairo"
      );
      document.body.classList.add("font-" + selectedFont);

      let currentActiveFont = document.querySelector(".font-option.active");
      if (currentActiveFont) {
        currentActiveFont.classList.remove("active");
      }

      this.classList.add("active");
      this.setAttribute("aria-checked", "true");
      localStorage.setItem("selectedFont", selectedFont);
    });
  }
}

function themeColors() {
  let colorsGrid = document.getElementById("theme-colors-grid");

  colorsGrid.innerHTML = `
    <button class="color-dot w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Purple Blue" data-primary="#6366f1" data-secondary="#8b5cf6" data-accent="#a855f7" style="background: linear-gradient(135deg, #6366f1, #8b5cf6);"></button>
    <button class="color-dot w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Pink Orange" data-primary="#ec4899" data-secondary="#f97316" data-accent="#fb923c" style="background: linear-gradient(135deg, #ec4899, #f97316);"></button>
    <button class="color-dot w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Green Emerald" data-primary="#10b981" data-secondary="#059669" data-accent="#34d399" style="background: linear-gradient(135deg, #10b981, #059669);"></button>
    <button class="color-dot w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Blue Cyan" data-primary="#3b82f6" data-secondary="#06b6d4" data-accent="#22d3ee" style="background: linear-gradient(135deg, #3b82f6, #06b6d4);"></button>
    <button class="color-dot w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Red Rose" data-primary="#ef4444" data-secondary="#f43f5e" data-accent="#fb7185" style="background: linear-gradient(135deg, #ef4444, #f43f5e);"></button>
    <button class="color-dot w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Amber Orange" data-primary="#f59e0b" data-secondary="#ea580c" data-accent="#fbbf24" style="background: linear-gradient(135deg, #f59e0b, #ea580c);"></button>
    `;

  initThemeEvents();
}

function initThemeEvents() {
  let colorButtons = document.querySelectorAll(".color-dot");

  for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].addEventListener("click", function (e) {
      clearColorSettings();

      for (let j = 0; j < colorButtons.length; j++) {
        colorButtons[j].classList.remove(
          "ring-2",
          "ring-primary",
          "active-theme"
        );
      }

      let selectedBtn = e.currentTarget;

      selectedBtn.classList.add(
        "ring-2",
        "ring-primary",
        "border",
        "active-theme"
      );

      let primary = selectedBtn.getAttribute("data-primary");
      let secondary = selectedBtn.getAttribute("data-secondary");
      let accent = selectedBtn.getAttribute("data-accent");

      document.documentElement.style.setProperty("--color-primary", primary);
      document.documentElement.style.setProperty(
        "--color-secondary",
        secondary
      );
      document.documentElement.style.setProperty("--color-accent", accent);
      let themeColor = { primary, secondary, accent };
      localStorage.setItem("themeColor", JSON.stringify(themeColor));
    });
  }
}

function clearColorSettings() {
  for (let i = 0; i < currentBtns.length; i++) {
    let btn = currentBtns[i];

    btn.classList.remove(
      "active-theme",
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900"
    );

    btn.style.removeProperty("--ring-color");
    btn.style.outline = "none";
  }
}

resetSettingsBtn.addEventListener("click", function () {
  localStorage.clear();
  defaultSettings();
});

function clearSettings() {
  for (let i = 0; i < fontOptions.length; i++) {
    fontOptions[i].classList.remove(
      "active",
      "bg-slate-50",
      "dark:bg-slate-800",
      "border-primary"
    );
    fontOptions[i].classList.add("border-slate-200", "dark:border-slate-700");
  }
}

function defaultSettings() {
  body.classList.remove("font-alexandria", "font-cairo", "font-tajawal");

  let currentFont = "font-tajawal";
  body.classList.add(currentFont);
  clearSettings();

  if (fontOptions[1]) {
    fontOptions[1].classList.add(
      "active",
      "bg-slate-50",
      "dark:bg-slate-800",
      "border-primary"
    );
    fontOptions[1].classList.remove(
      "border-slate-200",
      "dark:border-slate-700"
    );
  }

  currentBtns = document.querySelectorAll(".color-dot");

  if (currentBtns.length > 0) {
    let defaultBtn = currentBtns[0];

    document.documentElement.style.setProperty(
      "--color-primary",
      defaultBtn.getAttribute("data-primary")
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      defaultBtn.getAttribute("data-secondary")
    );
    document.documentElement.style.setProperty(
      "--color-accent",
      defaultBtn.getAttribute("data-accent")
    );

    clearColorSettings();

    defaultBtn.classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900"
    );
    defaultBtn.style.setProperty(
      "--ring-color",
      defaultBtn.getAttribute("data-primary")
    );
  }
}

function openSettings() {
  settingsSidebar.classList.remove("translate-x-full");
  settingsToggle.style.right = "20rem";
  settingsToggle.setAttribute("aria-expanded", "true");
  settingsSidebar.setAttribute("aria-hidden", "false");
  themeColors();
  Fonts();
}

function closeSettingsPanel() {
  settingsSidebar.classList.add("translate-x-full");
  settingsToggle.style.right = "0";
  settingsToggle.setAttribute("aria-expanded", "false");
  settingsSidebar.setAttribute("aria-hidden", "true");
}

settingsToggle.addEventListener("click", function () {
  if (settingsSidebar.classList.contains("translate-x-full")) {
    openSettings();
  } else {
    closeSettingsPanel();
  }
});

closeSettings.addEventListener("click", closeSettingsPanel);

document.addEventListener("click", function (event) {
  if (
    !(
      settingsSidebar.contains(event.target) ||
      settingsToggle.contains(event.target)
    )
  ) {
    closeSettingsPanel();
  }
});

// scrollSpy
function scrollSpyHandler() {
  let currentSectionId = "";
  if (window.scrollY >= 400) {
    scrollToTop.classList.remove("opacity-0", "invisible");
  } else {
    scrollToTop.classList.add("opacity-0", "invisible");
  }

  let sections = document.querySelectorAll("section");

  for (let i = 0; i < sections.length; i++) {
    if (window.scrollY >= sections[i].offsetTop - 100) {
      currentSectionId = sections[i].getAttribute("id");
    }
  }

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
    if (navLinks[i].getAttribute("href").includes(currentSectionId)) {
      navLinks[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", scrollSpyHandler);

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    window.removeEventListener("scroll", scrollSpyHandler);

    for (let j = 0; j < navLinks.length; j++) {
      navLinks[j].classList.remove("active");
    }
    navLinks[i].classList.add("active");
  });
  window.addEventListener("scrollend", function () {
    if (window.scrollY >= 400) {
      scrollToTop.classList.remove("opacity-0", "invisible");
    } else {
      scrollToTop.classList.add("opacity-0", "invisible");
    }
    window.removeEventListener("scroll", scrollSpyHandler);
    window.addEventListener("scroll", scrollSpyHandler);
  });
}

// scroll To Top
scrollToTop.addEventListener("click", function () {
  heroSection.click();
});

// nav & tabs
function PortfolioFilters() {
  for (let i = 0; i < portfolioFilter.length; i++) {
    portfolioFilter[i].addEventListener("click", function (e) {
      clearPortfolioFilter();
      displayPortfolioItem(portfolioFilter[i].getAttribute("data-filter"));
      if (portfolioFilter[i].contains(e.target)) {
        portfolioFilter[i].setAttribute(
          "class",
          "portfolio-filter px-8 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
        );
      }
    });
  }
}

PortfolioFilters();

function clearPortfolioFilter() {
  for (let i = 0; i < portfolioFilter.length; i++) {
    portfolioFilter[i].setAttribute(
      "class",
      "portfolio-filter px-8 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700"
    );
  }
}

function displayPortfolioItem(filter) {
  for (let i = 0; i < portfolioItem.length; i++) {
    portfolioItem[i].style.setProperty("transform", "scale(.5)");
    portfolioItem[i].style.setProperty("opacity", "0");
    portfolioItem[i].classList.remove("relative");
    portfolioItem[i].classList.add("absolute", "invisible");

    if (
      portfolioItem[i].getAttribute("data-category") == filter ||
      filter == "all"
    ) {
      portfolioItem[i].classList.add("relative");
      portfolioItem[i].classList.remove("absolute", "invisible");
      portfolioItem[i].style.setProperty("opacity", "1");
      portfolioItem[i].style.setProperty("transform", "scale(1)");
    }
  }
}

// slider
nextTestimonialBtn.addEventListener("click", function () {
  carouselStep(1);
  clearCarouselIndicator();
  displayCarouselIndicator(currentCarouselIndex);
});
prevTestimonialBtn.addEventListener("click", function () {
  carouselStep(-1);
  clearCarouselIndicator();
  displayCarouselIndicator(currentCarouselIndex);
});

function updateCarousel() {
  const totalItems = document.querySelectorAll(".testimonial-card").length;
  const itemsPerPage =
    window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  const maxIndex = totalItems - itemsPerPage;

  if (currentCarouselIndex > maxIndex) currentCarouselIndex = maxIndex;
  if (currentCarouselIndex < 0) currentCarouselIndex = 0;

  let movePercentage = (100 / itemsPerPage) * currentCarouselIndex;
  testimonialsCarousel.style.transform = `translateX(${movePercentage}%)`;

  clearCarouselIndicator();
  displayCarouselIndicator(currentCarouselIndex);
}

function carouselStep(step) {
  const totalItems = document.querySelectorAll(".testimonial-card").length;
  const itemsPerPage =
    window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  const maxIndex = totalItems - itemsPerPage;

  currentCarouselIndex += step;

  if (currentCarouselIndex < 0) {
    currentCarouselIndex = maxIndex;
  } else if (currentCarouselIndex > maxIndex) {
    currentCarouselIndex = 0;
  }

  updateCarousel();
}

for (let i = 0; i < carouselIndicator.length; i++) {
  carouselIndicator[i].addEventListener("click", function () {
    currentCarouselIndex = Number(
      carouselIndicator[i].getAttribute("data-index")
    );

    updateCarousel();
  });
}

function clearCarouselIndicator() {
  for (let i = 0; i < carouselIndicator.length; i++) {
    carouselIndicator[i].classList.remove("active", "scale-125", "bg-accent");
    carouselIndicator[i].classList.add("bg-slate-400", "dark:bg-slate-600");
  }
}
function displayCarouselIndicator(i) {
  carouselIndicator[i].classList.add("active", "scale-125", "bg-accent");
  carouselIndicator[i].classList.remove("bg-slate-400", "dark:bg-slate-600");
}

function loadSavedSettings() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
  }

  const savedFont = localStorage.getItem("selectedFont");
  if (savedFont) {
    body.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
    body.classList.add("font-" + savedFont);
    fontOptions.forEach((opt) => {
      if (opt.dataset.font === savedFont) opt.classList.add("active");
      else opt.classList.remove("active");
    });
  }

  const savedColor = JSON.parse(localStorage.getItem("themeColor"));
  if (savedColor) {
    document.documentElement.style.setProperty(
      "--color-primary",
      savedColor.primary
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      savedColor.secondary
    );
    document.documentElement.style.setProperty(
      "--color-accent",
      savedColor.accent
    );
  }
}
loadSavedSettings();
