(function () {
  "use strict";

  if (!window.AV || !window.AV.GameData) {
    console.error("Anime Vanguards compare page requires GameData. Ensure data.js and main.js load first.");
    return;
  }

  const { GameData, Utils, PageHandler } = window.AV;

  const STORAGE_KEY = "av-compare-history";
  const MAX_HISTORY = 5;
  const POPULAR_COMBOS = [
    ["goju", "sukuna"],
    ["cha_in", "song_jinwu"],
    ["sprintwagon", "alligator"],
    ["ichiga", "luffo"],
    ["norutu", "bleach_queen"],
  ];

  const METRIC_CONFIG = [
    {
      key: "beginner_friendly",
      label: "Beginner friendly",
      icon: "&#9733;", // star
      activeClass: "text-amber-300",
      inactiveClass: "text-slate-600",
      description: "Higher is easier to pick up on day one.",
      weight: 0.3,
    },
    {
      key: "damage",
      label: "Damage output",
      icon: "&#9876;", // crossed swords
      activeClass: "text-rose-300",
      inactiveClass: "text-slate-600",
      description: "Higher means stronger wave clearing and boss DPS.",
      weight: 0.25,
    },
    {
      key: "survival",
      label: "Survivability",
      icon: "&#128737;", // shield
      activeClass: "text-emerald-300",
      inactiveClass: "text-slate-600",
      description: "Higher keeps units alive in longer encounters.",
      weight: 0.15,
    },
    {
      key: "get_difficulty",
      label: "Acquisition difficulty",
      icon: "&#128142;", // gemstone
      activeClass: "text-cyan-300",
      inactiveClass: "text-slate-700",
      description: "Fewer gems indicate easier access (rarity, banner odds).",
      weight: 0.15,
      inverse: true,
    },
    {
      key: "cost_efficiency",
      label: "Cost efficiency",
      icon: "&#128176;", // money bag
      activeClass: "text-lime-300",
      inactiveClass: "text-slate-600",
      description: "Higher means more value per resource spent.",
      weight: 0.15,
    },
  ];

  const TIER_WEIGHTS = {
    "S+": 5,
    S: 4.5,
    "S-": 4.2,
    A: 4,
    "A-": 3.5,
    B: 3,
    C: 2,
  };

  function getTierScore(unit) {
    if (!unit || !unit.tier) return 0;
    return TIER_WEIGHTS[unit.tier] || TIER_WEIGHTS[unit.tier.toUpperCase()] || 0;
  }

  function getMetricRating(unit, key) {
    if (!unit || !unit.ratings) return 0;
    return unit.ratings[key] || 0;
  }

  function getMetricScore(unit, config) {
    const raw = getMetricRating(unit, config.key);
    if (config.inverse) {
      return 6 - raw; // convert 1..5 to 5..1 so higher value means better accessibility
    }
    return raw;
  }

  function renderIconStrip(value, config) {
    const activeClass = config.activeClass || "text-amber-300";
    const inactiveClass = config.inactiveClass || "text-slate-600";
    const max = 5;
    const icons = [];
    for (let index = 0; index < max; index += 1) {
      const isActive = index < value;
      icons.push(
        `<span class="${isActive ? activeClass : inactiveClass} text-lg leading-none">${config.icon}</span>`
      );
    }
    return `<div class="flex gap-1">${icons.join("")}</div>`;
  }

  function describeDifference(unitA, unitB, config) {
    const ratingA = getMetricRating(unitA, config.key);
    const ratingB = getMetricRating(unitB, config.key);
    if (ratingA === ratingB) {
      return `Both units score ${ratingA}/5 for ${config.label.toLowerCase()}.`;
    }
    const winner = ratingA > ratingB ? unitA : unitB;
    const loser = ratingA > ratingB ? unitB : unitA;
    const diff = Math.abs(ratingA - ratingB);
    return `${winner.displayName} leads by ${diff} on ${config.label.toLowerCase()} (${ratingA}/5 vs ${ratingB}/5), while ${loser.displayName} sits at ${ratingB}/5.`;
  }

  function buildInsight(unitA, unitB) {
    const damageA = getMetricRating(unitA, "damage");
    const damageB = getMetricRating(unitB, "damage");
    const costA = getMetricRating(unitA, "cost_efficiency");
    const costB = getMetricRating(unitB, "cost_efficiency");
    return [
      damageA === damageB
        ? `Both units deliver similar burst potential, so pair either with strong supports to shine.`
        : `${damageA > damageB ? unitA.displayName : unitB.displayName} is the heavier hitter; slot them as your primary DPS and use the other slot for support utility.`,
      costA === costB
        ? `Upgrade costs are comparable. Choose based on rarity odds or team synergy.`
        : `${costA > costB ? unitA.displayName : unitB.displayName} is cheaper to max out, which helps if you are conserving resources.`,
    ];
  }

  function pickGuidance(unitA, unitB) {
    const guidance = [];
    const beginnerA = getMetricRating(unitA, "beginner_friendly");
    const beginnerB = getMetricRating(unitB, "beginner_friendly");
    const easier = beginnerA === beginnerB ? null : beginnerA > beginnerB ? unitA : unitB;
    if (easier) {
      guidance.push({
        title: `${easier.displayName} for brand-new players`,
        description: `Start with ${easier.displayName} to learn mechanics quickly. Practice placing them in early story stages before chasing higher rarity drops.`,
      });
    } else {
      guidance.push({
        title: "Either pick works for beginners",
        description: "Both units have similar learning curves. Focus on the one whose banner is currently active to save time.",
      });
    }

    const harderDrop = getMetricRating(unitA, "get_difficulty") > getMetricRating(unitB, "get_difficulty") ? unitA : unitB;
    guidance.push({
      title: `Plan banner pulls for ${harderDrop.displayName}`,
      description: `${harderDrop.displayName} has the tougher drop rate. Track pity progress and consider limited banners to lock them in.`,
    });

    guidance.push({
      title: `Synergy check`,
      description: `Pair ${unitA.displayName} with buffers and ${unitB.displayName} with crowd control to cover each other's weaknesses.`,
    });

    const cheaper = getMetricRating(unitA, "cost_efficiency") > getMetricRating(unitB, "cost_efficiency") ? unitA : unitB;
    guidance.push({
      title: `Resource roadmap`,
      description: `Invest in ${cheaper.displayName} first to build momentum, then funnel extra materials into ${cheaper === unitA ? unitB.displayName : unitA.displayName}.`,
    });

    return guidance.slice(0, 4);
  }

  function findSimilarUnits(selectedUnits) {
    const seen = new Set(selectedUnits.map((unit) => unit.name));
    const suggestions = [];

    selectedUnits.forEach((unit) => {
      const candidates = GameData.getAllUnits()
        .filter((candidate) => {
          if (seen.has(candidate.name)) return false;
          if (candidate.type !== unit.type) return false;
          return true;
        })
        .sort((a, b) => {
          const typeDiff = (b.ratings?.damage || 0) - (a.ratings?.damage || 0);
          if (typeDiff !== 0) return typeDiff;
          return getMetricRating(b, "beginner_friendly") - getMetricRating(a, "beginner_friendly");
        });

      candidates.slice(0, 2).forEach((candidate) => {
        if (suggestions.length < 3 && !seen.has(candidate.name)) {
          suggestions.push(candidate);
          seen.add(candidate.name);
        }
      });
    });

    return suggestions.slice(0, 3);
  }

  function suggestPartner(unit) {
    if (!unit) return null;
    const candidates = GameData.getAllUnits()
      .filter((other) => other.name !== unit.name && other.type === unit.type)
      .sort((a, b) => {
        const damageDiff = (b.ratings?.damage || 0) - (a.ratings?.damage || 0);
        if (damageDiff !== 0) return damageDiff;
        return getMetricRating(b, "cost_efficiency") - getMetricRating(a, "cost_efficiency");
      });
    return candidates[0] || null;
  }

  const ComparisonEngine = {
    compare(unitA, unitB) {
      if (!unitA || !unitB) return null;

      const metrics = METRIC_CONFIG.map((config) => {
        const displayA = getMetricRating(unitA, config.key);
        const displayB = getMetricRating(unitB, config.key);
        const scoreA = getMetricScore(unitA, config);
        const scoreB = getMetricScore(unitB, config);
        let advantage = "tie";
        if (scoreA > scoreB) advantage = "left";
        if (scoreB > scoreA) advantage = "right";

        return {
          ...config,
          valueA: displayA,
          valueB: displayB,
          scoreA,
          scoreB,
          advantage,
          detail: describeDifference(unitA, unitB, config),
        };
      });

      const beginnerMetric = metrics.find((item) => item.key === "beginner_friendly");
      const beginnerWinner =
        beginnerMetric.scoreA === beginnerMetric.scoreB
          ? "tie"
          : beginnerMetric.scoreA > beginnerMetric.scoreB
          ? "left"
          : "right";

      const priorityScoreA =
        metrics.reduce((total, metric) => total + metric.scoreA * metric.weight, 0) + getTierScore(unitA) * 0.25;
      const priorityScoreB =
        metrics.reduce((total, metric) => total + metric.scoreB * metric.weight, 0) + getTierScore(unitB) * 0.25;
      let priorityWinner = "tie";
      if (priorityScoreA > priorityScoreB) priorityWinner = "left";
      if (priorityScoreB > priorityScoreA) priorityWinner = "right";

      const insights = buildInsight(unitA, unitB);
      const guidance = pickGuidance(unitA, unitB);
      const similar = findSimilarUnits([unitA, unitB]);

      return {
        metrics,
        beginnerVerdict: {
          winner: beginnerWinner,
          message:
            beginnerWinner === "tie"
              ? `${unitA.displayName} and ${unitB.displayName} are equally friendly for new players.`
              : `${beginnerWinner === "left" ? unitA.displayName : unitB.displayName} suits beginners better thanks to a higher comfort rating.`,
        },
        priorityVerdict: {
          winner: priorityWinner,
          message:
            priorityWinner === "tie"
              ? `Both units are viable chase targets. Decide based on banner availability or team composition.`
              : `${priorityWinner === "left" ? unitA.displayName : unitB.displayName} offers stronger overall value if you can only invest in one.`,
        },
        quickInsights: [
          {
            title: "Damage and survivability",
            body: insights[0],
          },
          {
            title: "Upgrade investment",
            body: insights[1],
          },
        ],
        guidance,
        similar,
      };
    },

    suggestPartner,
  };

  const CompareUI = {
    init() {
      PageHandler.initCommon();
      this.cacheDom();
      if (!this.root) return;

      this.baseOptions = this.buildOptions();
      this.filteredOptions = {
        left: this.baseOptions,
        right: this.baseOptions,
      };
      this.currentSelection = { left: "", right: "" };

      this.renderOptions("left");
      this.renderOptions("right");
      this.bindEvents();
      this.renderPopularCombos();
      this.renderHistory();
      this.bootstrapFromUrl();
      this.updateResults();
    },

    cacheDom() {
      this.root = document.getElementById("compare-app");
      if (!this.root) return;
      this.selectElements = {
        left: this.root.querySelector("[data-select='left']"),
        right: this.root.querySelector("[data-select='right']"),
      };
      this.searchElements = {
        left: this.root.querySelector("[data-search='left']"),
        right: this.root.querySelector("[data-search='right']"),
      };
      this.previewElements = {
        left: this.root.querySelector("[data-selection-preview='left']"),
        right: this.root.querySelector("[data-selection-preview='right']"),
      };
      this.swapButton = this.root.querySelector("[data-action='swap']");
      this.clearButton = this.root.querySelector("[data-action='clear']");
      this.popularContainer = this.root.querySelector("[data-popular-combos]");
      this.savedContainer = this.root.querySelector("[data-saved-combos]");
      this.resultsWrapper = this.root.querySelector("[data-results-wrapper]");
      this.resultsOverview = this.root.querySelector("[data-results-overview]");
      this.resultsMetrics = this.root.querySelector("[data-results-metrics]");
      this.resultsGuidance = this.root.querySelector("[data-results-guidance]");
      this.resultsRecommendations = this.root.querySelector("[data-results-recommendations]");
      this.verdictBeginner = this.root.querySelector("[data-verdict-beginner]");
      this.verdictPriority = this.root.querySelector("[data-verdict-priority]");
      this.quickInsights = this.root.querySelector("[data-quick-insights]");
      this.metricRows = this.root.querySelector("[data-metric-rows]");
      this.guidanceList = this.root.querySelector("[data-guidance-list]");
      this.recommendationsList = this.root.querySelector("[data-recommendations-list]");
    },

    buildOptions() {
      return GameData.getAllUnits()
        .map((unit) => ({
          value: unit.name,
          label: `${unit.displayName} (${unit.rarity} ${unit.type})`,
          keywords: [
            unit.displayName.toLowerCase(),
            unit.rarity.toLowerCase(),
            unit.type.toLowerCase(),
            ...(unit.element ? [unit.element.toLowerCase()] : []),
          ].join(" "),
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    },

    renderOptions(side) {
      const select = this.selectElements[side];
      if (!select) return;
      const currentValue = this.currentSelection[side];
      const options = this.filteredOptions[side] || [];
      const optionMarkup = [
        `<option value="">Select a hero...</option>`,
        ...options.map(
          (option) =>
            `<option value="${option.value}" ${option.value === currentValue ? "selected" : ""}>${option.label}</option>`
        ),
      ];
      select.innerHTML = optionMarkup.join("");
    },

    bindEvents() {
      ["left", "right"].forEach((side) => {
        const select = this.selectElements[side];
        const search = this.searchElements[side];
        if (select) {
          select.addEventListener("change", (event) => {
            this.setSelection(side, event.target.value);
          });
        }
        if (search) {
          search.addEventListener("input", (event) => {
            this.handleSearch(side, event.target.value);
          });
        }
      });

      if (this.swapButton) {
        this.swapButton.addEventListener("click", () => this.swapSelections());
      }
      if (this.clearButton) {
        this.clearButton.addEventListener("click", () => this.clearSelections());
      }
    },

    handleSearch(side, query) {
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        this.filteredOptions[side] = this.baseOptions;
      } else {
        this.filteredOptions[side] = this.baseOptions.filter((option) =>
          option.keywords.includes(normalized) || option.label.toLowerCase().includes(normalized)
        );
        if (!this.filteredOptions[side].length) {
          this.filteredOptions[side] = this.baseOptions.filter((option) =>
            option.label.toLowerCase().includes(normalized)
          );
        }
      }
      this.renderOptions(side);
    },

    setSelection(side, value) {
      this.currentSelection[side] = value;
      this.renderOptions(side);
      this.renderPreview(side);
      this.updateResults();
      this.persistUrl();
    },

    getUnit(side) {
      const id = this.currentSelection[side];
      return id ? GameData.getUnit(id) : null;
    },

    renderPreview(side) {
      const preview = this.previewElements[side];
      if (!preview) return;
      const unit = this.getUnit(side);
      if (!unit) {
        preview.innerHTML = "Choose a unit to view stats and recommendations.";
        preview.classList.add("text-xs", "text-slate-500");
        return;
      }
      preview.innerHTML = Utils.generateUnitCard(unit);
      preview.classList.remove("text-xs", "text-slate-500");
    },

    swapSelections() {
      const { left, right } = this.currentSelection;
      this.currentSelection.left = right;
      this.currentSelection.right = left;
      this.renderOptions("left");
      this.renderOptions("right");
      this.renderPreview("left");
      this.renderPreview("right");
      this.updateResults();
      this.persistUrl();
    },

    clearSelections() {
      this.currentSelection = { left: "", right: "" };
      this.renderOptions("left");
      this.renderOptions("right");
      this.renderPreview("left");
      this.renderPreview("right");
      this.updateResults();
      this.persistUrl();
    },

    renderPopularCombos() {
      if (!this.popularContainer) return;
      const buttons = POPULAR_COMBOS.filter((pair) => pair.every((id) => GameData.getUnit(id))).map((pair) => {
        const unitA = GameData.getUnit(pair[0]);
        const unitB = GameData.getUnit(pair[1]);
        return `<button type="button" class="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-200 hover:border-indigo-400 hover:text-indigo-200 transition" data-combo="${pair.join(",")}">${unitA.displayName} vs ${unitB.displayName}</button>`;
      });
      this.popularContainer.innerHTML = buttons.join("");
      this.popularContainer.querySelectorAll("button[data-combo]").forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.getAttribute("data-combo");
          if (!value) return;
          const [left, right] = value.split(",");
          this.currentSelection.left = left;
          this.currentSelection.right = right;
          this.renderOptions("left");
          this.renderOptions("right");
          this.renderPreview("left");
          this.renderPreview("right");
          this.updateResults();
          this.persistUrl();
        });
      });
    },

    renderHistory() {
      if (!this.savedContainer) return;
      const history = Utils.storage.get(STORAGE_KEY, []);
      if (!Array.isArray(history) || !history.length) {
        this.savedContainer.innerHTML =
          '<span class="px-3 py-2 rounded-lg border border-dashed border-slate-700 text-slate-500">No saved comparisons yet.</span>';
        return;
      }
      const buttons = history
        .map((combo) => {
          const unitA = GameData.getUnit(combo[0]);
          const unitB = GameData.getUnit(combo[1]);
          if (!unitA || !unitB) return "";
          return `<button type="button" class="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition" data-history="${combo.join(",")}">${unitA.displayName} vs ${unitB.displayName}</button>`;
        })
        .filter(Boolean);
      this.savedContainer.innerHTML = buttons.join("");
      this.savedContainer.querySelectorAll("button[data-history]").forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.getAttribute("data-history");
          if (!value) return;
          const [left, right] = value.split(",");
          this.currentSelection.left = left;
          this.currentSelection.right = right;
          this.renderOptions("left");
          this.renderOptions("right");
          this.renderPreview("left");
          this.renderPreview("right");
          this.updateResults();
          this.persistUrl();
        });
      });
    },

    saveToHistory() {
      const { left, right } = this.currentSelection;
      if (!left || !right) return;
      const key = [left, right].join(",");
      let history = Utils.storage.get(STORAGE_KEY, []);
      if (!Array.isArray(history)) history = [];
      history = history.filter((combo) => combo.join(",") !== key);
      history.unshift([left, right]);
      if (history.length > MAX_HISTORY) {
        history = history.slice(0, MAX_HISTORY);
      }
      Utils.storage.set(STORAGE_KEY, history);
      this.renderHistory();
    },

    updateResults() {
      if (!this.resultsWrapper) return;
      const unitA = this.getUnit("left");
      const unitB = this.getUnit("right");
      if (!unitA || !unitB) {
        this.toggleResults(false);
        return;
      }

      const payload = ComparisonEngine.compare(unitA, unitB);
      if (!payload) {
        this.toggleResults(false);
        return;
      }

      this.toggleResults(true);
      this.renderVerdicts(payload, unitA, unitB);
      this.renderMetrics(payload.metrics, unitA, unitB);
      this.renderGuidance(payload.guidance);
      this.renderRecommendations(payload.similar);
      this.renderQuickInsights(payload);
      this.saveToHistory();
    },

    toggleResults(active) {
      if (!this.resultsWrapper) return;
      const sections = [
        this.resultsOverview,
        this.resultsMetrics,
        this.resultsGuidance,
        this.resultsRecommendations,
      ];
      sections.forEach((section) => {
        if (!section) return;
        section.classList.toggle("hidden", !active);
      });
    },

    renderVerdicts(payload, unitA, unitB) {
      if (this.verdictBeginner) {
        this.verdictBeginner.textContent = `Newbie pick: ${
          payload.beginnerVerdict.winner === "tie"
            ? "Tie"
            : payload.beginnerVerdict.winner === "left"
            ? unitA.displayName
            : unitB.displayName
        }`;
      }
      if (this.verdictPriority) {
        this.verdictPriority.textContent = `Priority target: ${
          payload.priorityVerdict.winner === "tie"
            ? "Tie"
            : payload.priorityVerdict.winner === "left"
            ? unitA.displayName
            : unitB.displayName
        }`;
      }

      },

      renderQuickInsights(payload) {
        if (!this.quickInsights) return;
        const cards = [
          {
            title: "Beginner verdict",
            body: payload.beginnerVerdict.message,
          },
          {
            title: "Priority verdict",
            body: payload.priorityVerdict.message,
          },
          ...payload.quickInsights,
        ]
          .map(
            (item) => `
            <article class="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-4 text-sm text-slate-300">
              <h4 class="text-sm font-semibold text-indigo-200">${item.title}</h4>
              <p class="mt-2">${item.body}</p>
            </article>
          `
          )
          .join("");
        this.quickInsights.innerHTML = cards;
      },

    renderMetrics(metrics, unitA, unitB) {
      if (!this.metricRows) return;
      const rows = metrics
        .map((metric) => {
          const advantageLabel =
            metric.advantage === "tie"
              ? "Even matchup"
              : metric.advantage === "left"
              ? `${unitA.displayName} advantage`
              : `${unitB.displayName} advantage`;
          return `
            <article class="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-4">
              <div class="grid gap-4 md:grid-cols-[1fr_auto_1fr] items-center">
                <div class="flex flex-col gap-2">
                  <span class="text-sm font-semibold text-indigo-200">${unitA.displayName}</span>
                  ${renderIconStrip(metric.valueA, metric)}
                  <span class="text-xs text-slate-500">${metric.valueA}/5</span>
                </div>
                <div class="text-center text-xs text-slate-400">
                  <div class="font-semibold text-slate-200">${metric.label}</div>
                  <div class="mt-1">${advantageLabel}</div>
                </div>
                <div class="flex flex-col gap-2 items-end text-right">
                  <span class="text-sm font-semibold text-rose-200">${unitB.displayName}</span>
                  ${renderIconStrip(metric.valueB, metric)}
                  <span class="text-xs text-slate-500">${metric.valueB}/5</span>
                </div>
              </div>
              <p class="mt-3 text-xs text-slate-400">${metric.detail}</p>
            </article>
          `;
        })
        .join("");
      this.metricRows.innerHTML = rows;
    },

    renderGuidance(guidance) {
      if (!this.guidanceList) return;
      const items = guidance
        .map(
          (item) => `
          <article class="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-4 text-sm text-slate-300">
            <h4 class="text-sm font-semibold text-indigo-200">${item.title}</h4>
            <p class="mt-2 text-xs text-slate-400">${item.description}</p>
          </article>
        `
        )
        .join("");
      this.guidanceList.innerHTML = items;
    },

    renderRecommendations(units) {
      if (!this.recommendationsList) return;
      if (!units.length) {
        this.recommendationsList.innerHTML =
          '<div class="text-sm text-slate-400">No similar heroes found. Try exploring higher rarity banners.</div>';
        return;
      }
      const cards = units.map((unit) => Utils.generateUnitCard(unit)).join("");
      this.recommendationsList.innerHTML = cards;
    },

    persistUrl() {
      const params = new URLSearchParams(window.location.search);
      const { left, right } = this.currentSelection;
      if (left || right) {
        const list = [left, right].filter(Boolean).join(",");
        params.set("units", list);
      } else {
        params.delete("units");
      }
      params.delete("focus");
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      window.history.replaceState({}, "", newUrl);
    },

    bootstrapFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const unitsParam = params.get("units");
      const focusParam = params.get("focus");
      if (unitsParam) {
        const [left, right] = unitsParam.split(",").map((value) => value.trim()).filter(Boolean);
        if (left) this.currentSelection.left = left;
        if (right) this.currentSelection.right = right;
      } else if (focusParam) {
        const focusUnit = GameData.getUnit(focusParam);
        if (focusUnit) {
          this.currentSelection.left = focusUnit.name;
          const partner = ComparisonEngine.suggestPartner(focusUnit);
          if (partner) {
            this.currentSelection.right = partner.name;
          }
        }
      }
      this.renderOptions("left");
      this.renderOptions("right");
      this.renderPreview("left");
      this.renderPreview("right");
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    CompareUI.init();
  });
})();
