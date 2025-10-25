(function () {
  "use strict";

  if (!window.AV || !window.AV.GameData) {
    console.error("Synergy analyzer requires GameData. Ensure data.js and main.js load first.");
    return;
  }

  const { GameData, Utils } = window.AV;
  const DATA = window.ANIME_VANGUARDS_DATA || {};
  const RARITIES = DATA.RARITIES || {};
  const TEAM_TEMPLATES = GameData.getTeamTemplates() || {};

  const DEFAULT_SLOT_COUNT = 6;
  const ROLE_BUCKETS = {
    DPS: "Damage",
    Support: "Support",
    Summoner: "Summoner",
    Tank: "Tank",
    Control: "Control",
  };

  function getRarityValue(rarity) {
    if (!rarity) return 1;
    const record = RARITIES[rarity];
    if (record && typeof record.value === "number") return record.value;
    return 1;
  }

  function formatList(items) {
    return items.length ? items.join(", ") : "None";
  }

  function describeRoles(counts) {
    const entries = Object.entries(counts).filter(([, value]) => value > 0);
    if (!entries.length) return "No roles selected";
    return entries
      .map(([role, value]) => `${ROLE_BUCKETS[role] || role}: ${value}`)
      .join(" | ");
  }

  function describeElements(units) {
    const tally = units.reduce((acc, unit) => {
      if (unit.element) acc[unit.element] = (acc[unit.element] || 0) + 1;
      return acc;
    }, {});
    const entries = Object.entries(tally);
    if (!entries.length) return "No elements selected";
    return entries.map(([element, count]) => `${element} x ${count}`).join(" | ");
  }

  function computeSynergy(units) {
    if (!units.length) {
      return {
        score: 0,
        roleScore: 0,
        elementScore: 0,
        rarityScore: 0,
        roles: {},
        elements: {},
        strengths: [],
        gaps: [],
      };
    }

    const roleCounts = {};
    const elementCounts = {};
    let rarityTotal = 0;

    units.forEach((unit) => {
      const role = unit.type || "Unknown";
      roleCounts[role] = (roleCounts[role] || 0) + 1;
      if (unit.element) {
        elementCounts[unit.element] = (elementCounts[unit.element] || 0) + 1;
      }
      rarityTotal += getRarityValue(unit.rarity);
    });

    const uniqueRoles = Object.keys(roleCounts).length;
    const uniqueElements = Object.keys(elementCounts).length;
    const averageRarity = rarityTotal / units.length;

    const roleScore = Math.min(uniqueRoles, 4) / 4 * 40;
    const elementScore = Math.min(uniqueElements, 5) / 5 * 35;
    const rarityTarget = 3; // Legendary baseline
    const rarityScore = Math.max(0, 25 - Math.abs(averageRarity - rarityTarget) * 8);
    const synergyScore = Math.round(roleScore + elementScore + rarityScore);

    const strengths = [];
    const gaps = [];

    if (uniqueRoles >= 3) strengths.push("Roles well distributed across the squad.");
    if (roleCounts.DPS >= 2) strengths.push("Multiple DPS options provide strong wave clear.");
    if (roleCounts.Support >= 1) strengths.push("At least one support is ready to boost the carry.");
    if (uniqueElements >= 4) strengths.push("Elements are diverse, covering most resistances.");
    if (averageRarity >= 3.5) strengths.push("High average rarity raises baseline stats.");

    if (!roleCounts.Support) gaps.push("No Support detected. Consider adding a buffer or healer.");
    if (!roleCounts.DPS) gaps.push("No dedicated DPS slot. Add a damage dealer to anchor the team.");
    if (uniqueElements <= 2) gaps.push("Element coverage is low. Mix in different elements for flexibility.");
    if (units.length < 4) gaps.push("Team has open slots. Fill remaining positions to unlock bonuses.");
    if (averageRarity <= 2.5) gaps.push("Average rarity is low. Upgrade key slots to Epic or Legendary.");

    return {
      score: Math.min(100, Math.max(0, synergyScore)),
      roleScore: Math.round(roleScore),
      elementScore: Math.round(elementScore),
      rarityScore: Math.round(rarityScore),
      roles: roleCounts,
      elements: elementCounts,
      strengths,
      gaps,
    };
  }

  function suggestReplacements(units, desiredRoles, limit = 3) {
    const selectedIds = new Set(units.map((unit) => unit.name));
    const allUnits = GameData.getAllUnits();
    const suggestions = [];

    desiredRoles.forEach((role) => {
      const matching = allUnits
        .filter((unit) => unit.type === role && !selectedIds.has(unit.name))
        .sort((a, b) => {
          const damageDiff = (b.ratings?.damage || 0) - (a.ratings?.damage || 0);
          if (damageDiff !== 0) return damageDiff;
          const supportDiff = (b.ratings?.beginner_friendly || 0) - (a.ratings?.beginner_friendly || 0);
          if (supportDiff !== 0) return supportDiff;
          return (b.ratings?.survival || 0) - (a.ratings?.survival || 0);
        });
      suggestions.push(...matching.slice(0, limit));
    });

    // Fallback: add general high-rated units if not enough targeted suggestions
    if (suggestions.length < limit) {
      const extras = allUnits
        .filter((unit) => !selectedIds.has(unit.name))
        .sort((a, b) => (b.ratings?.damage || 0) - (a.ratings?.damage || 0))
        .slice(0, limit - suggestions.length);
      suggestions.push(...extras);
    }

    return suggestions.slice(0, limit);
  }

  const SynergyUI = {
    init() {
      this.cacheDom();
      if (!this.root) {
        console.warn("Synergy analyzer root not found.");
        return;
      }
      this.state = this.createState();
      this.renderSlots();
      this.renderScores();
      this.bindEvents();
    },

    cacheDom() {
      this.root = document.getElementById("synergy-app");
      if (!this.root) return;
      this.dom = {
        slotCount: this.root.querySelector("[data-slot-count]"),
        slotList: this.root.querySelector("[data-slot-list]"),
        teamSummary: this.root.querySelector("[data-team-summary]"),
        importButtons: this.root.querySelectorAll("[data-import]"),
        clearTeam: this.root.querySelector("[data-action='clear-team']"),
        loadTemplate: this.root.querySelector("[data-action='fill-template']"),
        scoreCards: this.root.querySelector("[data-score-cards]"),
        strengths: this.root.querySelector("[data-strength-list]"),
        gaps: this.root.querySelector("[data-gap-list]"),
        suggestions: this.root.querySelector("[data-suggestion-list]"),
        teamSizeLabel: this.root.querySelector("[data-team-size-label]"),
        summaryScore: this.root.querySelector("[data-summary-score]"),
        summaryElements: this.root.querySelector("[data-summary-elements]"),
        summaryRoles: this.root.querySelector("[data-summary-roles]"),
        copyTeam: this.root.querySelector("[data-action='copy-team']"),
        reshuffleSuggestions: this.root.querySelector("[data-action='reshuffle-suggestions']"),
      };
    },

    createState() {
      const units = GameData.getAllUnits().sort((a, b) => a.displayName.localeCompare(b.displayName));
      const slots = Array.from({ length: DEFAULT_SLOT_COUNT }, () => null);
      return {
        allUnits: units,
        slots,
        slotCount: DEFAULT_SLOT_COUNT,
      };
    },

    bindEvents() {
      if (!this.root) return;

      this.dom.slotCount?.addEventListener("change", () => {
        const count = Number(this.dom.slotCount.value) || DEFAULT_SLOT_COUNT;
        this.state.slotCount = Math.max(4, Math.min(6, count));
        if (this.state.slots.length < this.state.slotCount) {
          const difference = this.state.slotCount - this.state.slots.length;
          for (let index = 0; index < difference; index += 1) {
            this.state.slots.push(null);
          }
        } else if (this.state.slots.length > this.state.slotCount) {
          this.state.slots.length = this.state.slotCount;
        }
        this.renderSlots();
        this.renderScores();
      });

      this.dom.slotList?.addEventListener("change", (event) => {
        if (!(event.target instanceof HTMLSelectElement)) return;
        const index = Number(event.target.dataset.slotIndex);
        if (Number.isNaN(index)) return;
        const value = event.target.value || null;
        this.state.slots[index] = value;
        this.renderScores();
      });

      this.dom.slotList?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-slot-clear]");
        if (!button) return;
        const index = Number(button.dataset.slotClear);
        if (Number.isNaN(index)) return;
        this.state.slots[index] = null;
        this.renderSlots();
        this.renderScores();
      });

      this.dom.clearTeam?.addEventListener("click", () => {
        this.state.slots = this.state.slots.map(() => null);
        this.renderSlots();
        this.renderScores();
      });

      this.dom.loadTemplate?.addEventListener("click", () => {
        const templates = Object.values(TEAM_TEMPLATES);
        if (!templates.length) {
          Utils.showNotification("No stored templates available.", "warning");
          return;
        }
        const options = templates
          .map((template, index) => `${index + 1}. ${template.name} (${template.units.length} units)`)
          .join("\n");
        const input = window.prompt(`Select a template:\n${options}`, "1");
        const selection = Number(input) - 1;
        const chosen = templates[selection];
        if (!chosen) return;
        this.applyUnitList(chosen.units || []);
        Utils.showNotification(`Loaded template "${chosen.name}".`, "success");
      });

      this.dom.importButtons?.forEach((button) => {
        button.addEventListener("click", () => {
          const source = button.dataset.import;
          if (source === "recommender") {
            const saved = Utils.storage.get("av-recommender-last");
            const ids = (saved?.results || []).map((item) => item.name).filter(Boolean);
            if (!ids.length) {
              Utils.showNotification("No saved recommendation payload found.", "warning");
              return;
            }
            this.applyUnitList(ids);
            Utils.showNotification("Imported team from recommender.", "success");
          }
          if (source === "templates") {
            const templateNames = Object.values(TEAM_TEMPLATES)
              .map((template) => template.name)
              .join(", ");
            Utils.showNotification(`Templates available: ${templateNames || "None"}`, "info");
          }
        });
      });

      this.dom.copyTeam?.addEventListener("click", () => {
        const selected = this.getSelectedUnits();
        if (!selected.length) {
          Utils.showNotification("Select heroes before copying.", "warning");
          return;
        }
        const payload = this.buildShareText(selected);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(payload)
            .then(() => Utils.showNotification("Team summary copied.", "success"))
            .catch(() => Utils.showNotification("Copy failed. Try manually.", "warning"));
        } else {
          Utils.showNotification("Clipboard not supported.", "warning");
        }
      });

      this.dom.reshuffleSuggestions?.addEventListener("click", () => {
        this.renderSuggestions(true);
      });
    },

    applyUnitList(ids) {
      this.state.slots = this.state.slots.map(() => null);
      ids.slice(0, this.state.slotCount).forEach((id, index) => {
        this.state.slots[index] = id;
      });
      this.renderSlots();
      this.renderScores();
    },

    getSelectedUnits() {
      const ids = this.state.slots.filter(Boolean);
      const map = this.state.allUnits.reduce((acc, unit) => {
        acc[unit.name] = unit;
        return acc;
      }, {});
      return ids
        .map((id) => map[id])
        .filter(Boolean);
    },

    renderSlots() {
      if (!this.dom.slotList) return;
      const options = [
        '<option value="">Empty slot</option>',
        ...this.state.allUnits.map((unit) => `<option value="${unit.name}">${unit.displayName} (${unit.rarity})</option>`),
      ].join("");

      const slots = this.state.slots.slice(0, this.state.slotCount);
      const markup = slots
        .map(
          (value, index) => `
            <div class="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 space-y-2">
              <div class="flex items-center justify-between text-xs text-slate-500">
                <span>Slot ${index + 1}</span>
                <button type="button" class="text-sky-300 hover:text-sky-200" data-slot-clear="${index}">Clear</button>
              </div>
              <select
                class="w-full rounded-xl bg-slate-950/80 border border-slate-800 focus:border-sky-400 focus:ring-0 text-sm text-slate-200 px-3 py-2"
                data-slot-index="${index}"
              >
                ${options}
              </select>
            </div>
          `
        )
        .join("");
      this.dom.slotList.innerHTML = markup;

      this.state.slots.slice(0, this.state.slotCount).forEach((value, index) => {
        const select = this.dom.slotList.querySelector(`[data-slot-index="${index}"]`);
        if (select) select.value = value || "";
      });
    },

    renderScores() {
      const selectedUnits = this.getSelectedUnits();
      const analysis = computeSynergy(selectedUnits);
      const totalSlots = this.state.slotCount;
      const filledSlots = selectedUnits.length;

      if (this.dom.teamSummary) {
        this.dom.teamSummary.textContent = `Currently ${filledSlots} of ${totalSlots} heroes selected.`;
      }
      if (this.dom.teamSizeLabel) {
        this.dom.teamSizeLabel.textContent = `${filledSlots} / ${totalSlots}`;
      }

      if (this.dom.scoreCards) {
        this.dom.scoreCards.innerHTML = `
          <article class="rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-4 space-y-2">
            <h3 class="text-xs uppercase tracking-wide text-slate-500">Synergy score</h3>
            <p class="text-2xl font-semibold text-white">${analysis.score}</p>
            <p class="text-xs text-slate-500">Combined synergy value (0 – 100)</p>
          </article>
          <article class="rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-4 space-y-2">
            <h3 class="text-xs uppercase tracking-wide text-slate-500">Role mix</h3>
            <p class="text-2xl font-semibold text-white">${analysis.roleScore}</p>
            <p class="text-xs text-slate-500">Higher is better coverage</p>
          </article>
          <article class="rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-4 space-y-2">
            <h3 class="text-xs uppercase tracking-wide text-slate-500">Element spread</h3>
            <p class="text-2xl font-semibold text-white">${analysis.elementScore}</p>
            <p class="text-xs text-slate-500">Resists and bonuses triggered</p>
          </article>
        `;
      }

      if (this.dom.strengths) {
        if (!analysis.strengths.length) {
          this.dom.strengths.innerHTML = `<p class="text-xs text-slate-500">Add more heroes to highlight strengths.</p>`;
        } else {
          this.dom.strengths.innerHTML = analysis.strengths
            .map(
              (text) => `
                <div class="rounded-xl border border-slate-800/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-300">
                  ${text}
                </div>
              `
            )
            .join("");
        }
      }

      if (this.dom.gaps) {
        if (!analysis.gaps.length) {
          this.dom.gaps.innerHTML = `<p class="text-xs text-emerald-400">No gaps detected. Great job!</p>`;
        } else {
          this.dom.gaps.innerHTML = analysis.gaps
            .map(
              (text) => `
                <div class="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                  ${text}
                </div>
              `
            )
            .join("");
        }
      }

      if (this.dom.summaryScore) {
        this.dom.summaryScore.textContent = `${analysis.score} / 100`;
      }
      if (this.dom.summaryElements) {
        this.dom.summaryElements.textContent = describeElements(selectedUnits);
      }
      if (this.dom.summaryRoles) {
        this.dom.summaryRoles.textContent = describeRoles(analysis.roles);
      }

      this.renderSuggestions(false);
    },

    renderSuggestions(forceShuffle) {
      if (!this.dom.suggestions) return;
      const units = this.getSelectedUnits();
      const analysis = computeSynergy(units);
      const missingRoles = [];

      if (!analysis.roles.DPS) missingRoles.push("DPS");
      if (!analysis.roles.Support) missingRoles.push("Support");
      if (!analysis.roles.Summoner && units.length >= 4) missingRoles.push("Summoner");

      let pool = suggestReplacements(units, missingRoles, 3);
      if (forceShuffle && pool.length) {
        pool = pool.slice().reverse();
      }

      if (!pool.length) {
        this.dom.suggestions.innerHTML = `<p class="text-xs text-slate-500">Select at least two heroes for meaningful suggestions.</p>`;
        return;
      }

      this.dom.suggestions.innerHTML = pool
        .map((unit) => {
          return `
            <article class="rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-4 space-y-2 text-sm text-slate-300">
              <header class="flex items-center justify-between gap-2">
                <span class="font-semibold text-white">${unit.displayName}</span>
                <span class="text-xs text-slate-500">${unit.rarity}</span>
              </header>
              <p class="text-xs text-slate-400">Role: ${ROLE_BUCKETS[unit.type] || unit.type} | Element: ${unit.element || "Neutral"}</p>
              <p class="text-xs text-slate-400">Damage ${unit.ratings?.damage || 0}/5 | Support ${unit.ratings?.support || 0}/5 | Beginner ${unit.ratings?.beginner_friendly || 0}/5</p>
            </article>
          `;
        })
        .join("");
    },

    buildShareText(units) {
      const analysis = computeSynergy(units);
      const lines = [
        `Anime Vanguards synergy score: ${analysis.score}/100`,
        `Element spread: ${describeElements(units)}`,
        `Role mix: ${describeRoles(analysis.roles)}`,
        "",
        "Team list:",
      ];
      units.forEach((unit, index) => {
        lines.push(`${index + 1}. ${unit.displayName} (${unit.rarity} ${unit.type} - ${unit.element || "Neutral"})`);
      });
      lines.push("", "Generated via animevanguardswiki.com/synergy-analyzer.html");
      return lines.join("\n");
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (window.AV && window.AV.PageHandler) {
      window.AV.PageHandler.initCommon();
    }
    SynergyUI.init();
  });

  window.AV.SynergyUI = SynergyUI;
})();
