(function () {
  "use strict";

  // Guard: ensure data.js loaded first
  if (typeof window.ANIME_VANGUARDS_DATA === "undefined") {
    console.error("Anime Vanguards data is not available. Ensure data.js is loaded before main.js.");
    return;
  }

  const {
    UNITS_DATA,
    RARITIES,
    ELEMENTS,
    RECOMMENDATION_RULES,
    TEAM_TEMPLATES,
    FAQ_DATA,
    DATA_VERSION,
    LAST_UPDATE,
  } = window.ANIME_VANGUARDS_DATA;

  /**
   * GameData: centralized data access utilities.
   */
  const GameData = {
    getAllUnits() {
      return Object.values(UNITS_DATA);
    },

    getUnit(id) {
      if (!id) return null;
      return UNITS_DATA[id.toLowerCase()] || null;
    },

    filterUnits(filterFn) {
      return this.getAllUnits().filter(filterFn);
    },

    filterByRarity(rarityList) {
      const normalized = Array.isArray(rarityList) ? rarityList : [rarityList];
      return this.filterUnits((unit) => normalized.includes(unit.rarity));
    },

    filterByBeginnerFriendly(minScore = 4) {
      return this.filterUnits((unit) => unit.ratings?.beginner_friendly >= minScore);
    },

    getRecommendationRules() {
      return RECOMMENDATION_RULES;
    },

    getTeamTemplates() {
      return TEAM_TEMPLATES;
    },

    getFaq() {
      return FAQ_DATA;
    },

    getMetadata() {
      return {
        DATA_VERSION,
        LAST_UPDATE,
      };
    },
  };

  /**
   * Utils: helper methods for rendering & formatting.
   */
  const Utils = {
    formatRarity(rarity) {
      const config = RARITIES[rarity];
      if (!config) return rarity;
      return `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold"
                 style="background-color:${config.color}1A;color:${config.color};">
                 ${rarity}
              </span>`;
    },

    formatElement(element) {
      const config = ELEMENTS[element];
      if (!config) return element;
      return `<span class="inline-flex items-center gap-1 text-xs font-medium"
                style="color:${config.color};">
                <span class="inline-block w-2 h-2 rounded-full"
                      style="background:${config.color};"></span>${element}
              </span>`;
    },

    generateStarRating(score = 0, icon = "★") {
      const maxStars = 5;
      const filled = Math.max(0, Math.min(score, maxStars));
      const stars = Array.from({ length: maxStars }, (_, index) =>
        `<span class="${index < filled ? "text-yellow-400" : "text-gray-600"}">${icon}</span>`
      );
      return `<div class="flex gap-1 text-sm leading-none">${stars.join("")}</div>`;
    },

    formatCost(cost) {
      if (typeof cost !== "number") return cost || "N/A";
      return `${cost.toLocaleString()} ¥`;
    },

    generateUnitCard(unit) {
      if (!unit) return "";
      return `
        <article class="group bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:border-indigo-400/80 transition">
          <header class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-white group-hover:text-indigo-200 transition">${unit.displayName}</h3>
            ${Utils.formatRarity(unit.rarity)}
          </header>
          <p class="text-sm text-slate-300 mb-4 line-clamp-3">${unit.description}</p>
          <dl class="grid grid-cols-2 gap-y-2 text-sm text-slate-400">
            <div><dt class="uppercase text-xs text-slate-500">Element</dt><dd>${Utils.formatElement(unit.element)}</dd></div>
            <div><dt class="uppercase text-xs text-slate-500">Role</dt><dd class="text-slate-200">${unit.type}</dd></div>
            <div><dt class="uppercase text-xs text-slate-500">Beginner</dt><dd>${Utils.generateStarRating(unit.ratings?.beginner_friendly || 0)}</dd></div>
            <div><dt class="uppercase text-xs text-slate-500">Damage</dt><dd>${Utils.generateStarRating(unit.ratings?.damage || 0)}</dd></div>
          </dl>
          <footer class="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Cost: <span class="text-slate-200">${Utils.formatCost(unit.cost)}</span></span>
            <a href="compare.html?focus=${unit.name}" class="text-indigo-300 hover:text-indigo-100 font-medium">Compare</a>
          </footer>
        </article>
      `;
    },

    // Basic debounce utility
    debounce(fn, delay = 200) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    // Simple local storage wrapper
    storage: {
      set(key, value) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.warn("Storage set failed:", error);
        }
      },
      get(key, defaultValue = null) {
        try {
          const raw = localStorage.getItem(key);
          return raw ? JSON.parse(raw) : defaultValue;
        } catch (error) {
          console.warn("Storage get failed:", error);
          return defaultValue;
        }
      },
      remove(key) {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.warn("Storage remove failed:", error);
        }
      },
    },

    showNotification(message, type = "info") {
      const containerId = "av-toast-container";
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId;
        container.className =
          "fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 pointer-events-none";
        document.body.appendChild(container);
      }

      const colorMap = {
        info: "bg-indigo-500/90",
        success: "bg-emerald-500/90",
        warning: "bg-amber-500/90",
        error: "bg-rose-500/90",
      };

      const toast = document.createElement("div");
      toast.className = `pointer-events-auto px-4 py-2 rounded-xl text-white shadow-lg ${colorMap[type] || colorMap.info}`;
      toast.textContent = message;
      container.appendChild(toast);

      setTimeout(() => {
        toast.classList.add("opacity-0", "-translate-y-2");
        setTimeout(() => container.removeChild(toast), 250);
      }, 2200);
    },
  };

  /**
   * PageHandler: shared UI behaviors.
   */
  const PageHandler = {
    initCommon() {
      this.injectDataVersion();
      this.setupMobileMenu();
      this.setupFaqAccordions();
      this.bindSmoothScrolling();
    },

    injectDataVersion() {
      const badge = document.querySelector("[data-version-badge]");
      if (!badge) return;
      badge.innerHTML = `
        <span class="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-600 text-xs text-slate-200 rounded-full px-3 py-1">
          <span class="font-semibold text-indigo-300">Data v${DATA_VERSION}</span>
          <span class="w-1 h-1 rounded-full bg-slate-500"></span>
          <span>Updated ${LAST_UPDATE}</span>
        </span>
      `;
    },

    setupMobileMenu() {
      const toggle = document.querySelector("[data-mobile-menu-toggle]");
      const menu = document.querySelector("[data-mobile-menu]");
      if (!toggle || !menu) return;

      toggle.addEventListener("click", () => {
        menu.classList.toggle("hidden");
        toggle.setAttribute(
          "aria-expanded",
          menu.classList.contains("hidden") ? "false" : "true"
        );
      });
    },

    setupFaqAccordions() {
      document.querySelectorAll("[data-faq-item]").forEach((item) => {
        const button = item.querySelector("button");
        const panel = item.querySelector("[data-faq-answer]");
        if (!button || !panel) return;

        button.addEventListener("click", () => {
          const expanded = button.getAttribute("aria-expanded") === "true";
          button.setAttribute("aria-expanded", String(!expanded));
          panel.classList.toggle("hidden");
        });
      });
    },

    bindSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
          const targetId = anchor.getAttribute("href")?.slice(1);
          if (!targetId) return;
          const target = document.getElementById(targetId);
          if (!target) return;
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    },
  };

  // publish modules globally
  window.AV = {
    GameData,
    Utils,
    PageHandler,
  };
})();

