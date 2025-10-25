(function () {
  "use strict";

  if (!window.AV || !window.AV.GameData) {
    console.error("Investment optimizer requires GameData. Ensure data.js and main.js load first.");
    return;
  }

  const { GameData, Utils } = window.AV;

  const STORAGE_KEYS = {
    last: "av-upgrade-last",
    presets: "av-upgrade-presets",
  };

  const WEIGHT_KEYS = ["damage", "survival", "cost_efficiency", "beginner_friendly"];

  const PRIORITY_PRESETS = {
    balanced: { damage: 0.35, survival: 0.25, cost_efficiency: 0.2, beginner_friendly: 0.2 },
    damage: { damage: 0.5, survival: 0.2, cost_efficiency: 0.2, beginner_friendly: 0.1 },
    survival: { damage: 0.2, survival: 0.45, cost_efficiency: 0.2, beginner_friendly: 0.15 },
    beginner: { damage: 0.2, survival: 0.2, cost_efficiency: 0.15, beginner_friendly: 0.45 },
  };

  const MATERIALS = {
    basic_chip: { label: "Basic Chip", goldEquiv: 200 },
    advanced_core: { label: "Advanced Core", goldEquiv: 500 },
    mythic_fragment: { label: "Mythic Fragment", goldEquiv: 1200 },
  };

  const MATERIAL_REQUIREMENTS = {
    Rare: [{ basic_chip: 2 }, { basic_chip: 4 }, { advanced_core: 1 }],
    Epic: [{ basic_chip: 4 }, { advanced_core: 2 }, { advanced_core: 3 }],
    Legendary: [{ basic_chip: 6 }, { advanced_core: 3 }, { mythic_fragment: 1 }],
    Mythic: [{ advanced_core: 4 }, { mythic_fragment: 2 }, { mythic_fragment: 3 }],
    Secret: [{ advanced_core: 6 }, { mythic_fragment: 3 }, { mythic_fragment: 4 }],
    Exclusive: [{ advanced_core: 6, mythic_fragment: 2 }, { mythic_fragment: 4 }, { mythic_fragment: 6 }],
    Default: [{ basic_chip: 3 }, { advanced_core: 2 }, { mythic_fragment: 1 }],
  };

  const COST_RATIOS = [0.45, 0.35, 0.2];
  const VALUE_RATIOS = [0.4, 0.35, 0.25];

  function cloneMaterials(template) {
    return Object.entries(template || {}).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  }

  function convertMaterialsToGold(materials) {
    return Object.entries(materials || {}).reduce((total, [key, amount]) => {
      const config = MATERIALS[key];
      if (!config) return total;
      return total + amount * config.goldEquiv;
    }, 0);
  }

  function normalizeWeights(weights) {
    const total = WEIGHT_KEYS.reduce((sum, key) => sum + (weights[key] || 0), 0);
    if (!total || total <= 0) {
      const fallback = 1 / WEIGHT_KEYS.length;
      return WEIGHT_KEYS.reduce((acc, key) => {
        acc[key] = fallback;
        return acc;
      }, {});
    }
    return WEIGHT_KEYS.reduce((acc, key) => {
      acc[key] = (weights[key] || 0) / total;
      return acc;
    }, {});
  }

  function formatGold(value) {
    return `${Math.round(value).toLocaleString()} ¥`;
  }

  function formatMaterials(materials) {
    const items = Object.entries(materials || {}).filter(([, amount]) => amount > 0);
    if (!items.length) return "None";
    return items
      .map(([key, amount]) => {
        const label = MATERIALS[key]?.label || key;
        return `${amount}× ${label}`;
      })
      .join(", ");
  }

  function pickMaterialTemplate(rarity) {
    if (!rarity) return MATERIAL_REQUIREMENTS.Default;
    return MATERIAL_REQUIREMENTS[rarity] || MATERIAL_REQUIREMENTS.Default;
  }

  function computeUnitScore(unit, weights, priority) {
    const ratings = unit.ratings || {};
    let score = 0;
    WEIGHT_KEYS.forEach((key) => {
      score += (ratings[key] || 0) * (weights[key] || 0);
    });
    if (priority === "beginner" && unit.beginner_info?.recommended) {
      score += 0.8;
    }
    if (priority === "damage" && (ratings.damage || 0) >= 4) {
      score += 0.6;
    }
    if (priority === "survival" && (ratings.survival || 0) >= 4) {
      score += 0.6;
    }
    return Math.max(score, 0.1);
  }

  function deriveStepsForUnit(unit, weights, priority) {
    const baseScore = computeUnitScore(unit, weights, priority);
    const phases = pickMaterialTemplate(unit.rarity);
    const cost = Math.max(unit.cost || 0, 0);
    const steps = [];

    COST_RATIOS.forEach((ratio, index) => {
      const goldCost = Math.round(cost * ratio);
      const materials = cloneMaterials(phases[index] || {});
      const materialValue = convertMaterialsToGold(materials);
      const totalCost = goldCost + materialValue;
      const value = baseScore * (VALUE_RATIOS[index] || 0.3);
      steps.push({
        unit,
        phase: index + 1,
        label: `Phase ${index + 1}`,
        goldCost,
        materials,
        totalCost: Math.max(totalCost, 1),
        value,
      });
    });

    return steps;
  }

  function buildPlan(units, resources, weights, priority) {
    const working = {
      gold: resources.gold,
      materials: { ...resources.materials },
    };
    const plan = [];
    const queue = [];

    units.forEach((unit) => {
      queue.push(...deriveStepsForUnit(unit, weights, priority));
    });

    queue.forEach((entry, index) => {
      const diminishing = 1 - 0.15 * (entry.phase - 1);
      entry.valueAdjusted = entry.value * diminishing;
      entry.roi = entry.valueAdjusted / entry.totalCost;
      entry.orderHint = index;
    });

    queue.sort((a, b) => {
      if (b.roi !== a.roi) return b.roi - a.roi;
      return a.orderHint - b.orderHint;
    });

    const usage = {
      gold: 0,
      materials: Object.keys(MATERIALS).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {}),
      value: 0,
    };

    queue.forEach((step) => {
      if (working.gold < step.goldCost) return;
      const affordable = Object.entries(step.materials).every(([key, amount]) => {
        return (working.materials[key] || 0) >= amount;
      });
      if (!affordable) return;

      working.gold -= step.goldCost;
      Object.entries(step.materials).forEach(([key, amount]) => {
        working.materials[key] = Math.max(0, (working.materials[key] || 0) - amount);
        usage.materials[key] = (usage.materials[key] || 0) + amount;
      });

      usage.gold += step.goldCost;
      usage.value += step.valueAdjusted;

      plan.push(step);
    });

    return {
      steps: plan,
      totals: {
        goldSpent: usage.gold,
        materialsUsed: usage.materials,
        valueScore: usage.value,
        averageRoi: plan.length ? usage.value / plan.reduce((sum, item) => sum + item.totalCost, 0) : 0,
        projectedPower: Math.min(100, Math.round(50 + usage.value * 25)),
        remainingGold: working.gold,
        remainingMaterials: working.materials,
      },
    };
  }

  const OptimizerUI = {
    init() {
      this.cacheDom();
      if (!this.root) {
        console.warn("Optimizer app root not found.");
        return;
      }
      this.state = this.getDefaultState();
      this.restoreState();
      this.buildUnitList();
      this.renderAll();
      this.bindEvents();
      this.run();
    },

    cacheDom() {
      this.root = document.getElementById("optimizer-app");
      if (!this.root) return;
      this.dom = {
        unitList: this.root.querySelector("[data-unit-list]"),
        unitSearch: this.root.querySelector("[data-unit-search]"),
        selectedCount: this.root.querySelector("[data-selected-count]"),
        goldInput: this.root.querySelector("[data-input-gold]"),
        materialInputs: this.root.querySelector("[data-material-inputs]"),
        prioritySelect: this.root.querySelector("[data-priority-select]"),
        weightSliders: this.root.querySelector("[data-weight-sliders]"),
        weightSummary: this.root.querySelector("[data-weight-summary]"),
        presetSelect: this.root.querySelector("[data-preset-select]"),
        savePreset: this.root.querySelector("[data-action='save-preset']"),
        clearSelection: this.root.querySelector("[data-action='clear-selection']"),
        resetInputs: this.root.querySelector("[data-action='reset-inputs']"),
        importButtons: this.root.querySelectorAll("[data-import]"),
        emptyState: this.root.querySelector("[data-empty-state]"),
        resultsWrapper: this.root.querySelector("[data-results-wrapper]"),
        resultsRows: this.root.querySelector("[data-results-rows]"),
        kpiCards: this.root.querySelector("[data-kpi-cards]"),
        summaryPills: this.root.querySelector("[data-summary-pills]"),
        planInsights: this.root.querySelector("[data-plan-insights]"),
        summaryGold: this.root.querySelector("[data-summary-gold]"),
        summaryMaterials: this.root.querySelector("[data-summary-materials]"),
        summaryPower: this.root.querySelector("[data-summary-power]"),
        summaryStrategy: this.root.querySelector("[data-summary-strategy]"),
        nextSteps: this.root.querySelector("[data-next-steps]"),
        copyPlan: this.root.querySelector("[data-action='copy-plan']"),
      };
    },

    getDefaultState() {
      return {
        units: GameData.getAllUnits()
          .map((unit) => ({
            ...unit,
            keywords: [
              unit.displayName.toLowerCase(),
              unit.name.toLowerCase(),
              unit.rarity?.toLowerCase() || "",
              unit.type?.toLowerCase() || "",
              unit.element?.toLowerCase() || "",
            ].join(" "),
          }))
          .sort((a, b) => a.displayName.localeCompare(b.displayName)),
        filteredUnits: [],
        selected: new Set(),
        resources: {
          gold: 0,
          materials: Object.keys(MATERIALS).reduce((acc, key) => {
            acc[key] = 0;
            return acc;
          }, {}),
        },
        priority: "balanced",
        weights: { ...PRIORITY_PRESETS.balanced },
        savedPresets: Utils.storage.get(STORAGE_KEYS.presets, []),
        plan: [],
        totals: null,
      };
    },

    restoreState() {
      const saved = Utils.storage.get(STORAGE_KEYS.last);
      if (!saved) return;
      if (Array.isArray(saved.selected)) {
        this.state.selected = new Set(saved.selected);
      }
      if (typeof saved.gold === "number") {
        this.state.resources.gold = saved.gold;
      }
      Object.entries(saved.materials || {}).forEach(([key, value]) => {
        if (this.state.resources.materials[key] !== undefined) {
          this.state.resources.materials[key] = value;
        }
      });
      if (saved.priority && PRIORITY_PRESETS[saved.priority]) {
        this.state.priority = saved.priority;
      }
      if (saved.weights) {
        this.state.weights = normalizeWeights({ ...saved.weights });
      }
    },

    persistState() {
      Utils.storage.set(STORAGE_KEYS.last, {
        selected: Array.from(this.state.selected),
        gold: this.state.resources.gold,
        materials: this.state.resources.materials,
        priority: this.state.priority,
        weights: this.state.weights,
        savedAt: new Date().toISOString(),
      });
    },

    buildUnitList() {
      this.state.filteredUnits = this.state.units.slice();
      this.renderUnitList();
    },

    renderAll() {
      if (!this.root) return;
      this.renderUnitList();
      this.renderMaterials();
      this.renderWeights();
      this.populatePresets();
      this.updateSelectedCount();
    },

    renderUnitList() {
      const container = this.dom.unitList;
      if (!container) return;
      const markup = this.state.filteredUnits
        .map((unit) => {
          const checked = this.state.selected.has(unit.name) ? "checked" : "";
          return `
            <label class="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-900/60 transition ${checked ? "bg-slate-900/60" : ""}">
              <input
                type="checkbox"
                value="${unit.name}"
                class="accent-emerald-500 focus:ring-emerald-400"
                ${checked}
                data-unit-option="${unit.name}"
              />
              <div class="flex flex-col">
                <span class="text-slate-100 font-medium">${unit.displayName}</span>
                <span class="text-xs text-slate-500">${unit.rarity} • ${unit.type} • ${unit.element || "Neutral"}</span>
              </div>
            </label>
          `;
        })
        .join("");
      container.innerHTML = markup || `<div class="px-4 py-6 text-sm text-slate-500">No heroes match your search.</div>`;
    },

    renderMaterials() {
      const wrapper = this.dom.materialInputs;
      if (!wrapper) return;
      wrapper.innerHTML = Object.entries(MATERIALS)
        .map(
          ([key, config]) => `
            <label class="space-y-2 text-sm" data-material-wrapper="${key}">
              <span class="flex items-center justify-between text-slate-400">
                ${config.label}
                <span class="text-xs text-slate-600">${config.goldEquiv} ¥ value</span>
              </span>
              <input
                type="number"
                min="0"
                step="1"
                value="${this.state.resources.materials[key] || 0}"
                class="w-full rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-0 text-slate-100 px-4 py-2.5"
                data-material-input="${key}"
              />
            </label>
          `
        )
        .join("");
      if (this.dom.goldInput) {
        this.dom.goldInput.value = this.state.resources.gold;
      }
    },

    renderWeights() {
      const wrapper = this.dom.weightSliders;
      if (!wrapper) return;
      const weights = normalizeWeights(this.state.weights);
      this.state.weights = weights;
      wrapper.innerHTML = WEIGHT_KEYS.map((key) => {
        const percent = Math.round((weights[key] || 0) * 100);
        const label = key.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
        return `
          <div class="space-y-1">
            <label class="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>${label}</span>
              <span class="text-emerald-300" data-weight-value="${key}">${percent}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value="${percent}"
              class="w-full accent-emerald-500"
              data-weight-slider="${key}"
            />
          </div>
        `;
      }).join("");
      if (this.dom.weightSummary) {
        const summary = WEIGHT_KEYS.map((key) => `${key.replace("_", " ")} ${(weights[key] || 0).toFixed(2)}`).join(" · ");
        this.dom.weightSummary.textContent = `Weights: ${summary}`;
      }
      if (this.dom.prioritySelect) {
        this.dom.prioritySelect.value = this.state.priority;
      }
    },

    populatePresets() {
      const select = this.dom.presetSelect;
      if (!select) return;
      const options = ['<option value="">Load saved...</option>'].concat(
        (this.state.savedPresets || []).map((preset) => `<option value="${preset.id}">${preset.name}</option>`)
      );
      select.innerHTML = options.join("");
    },

    updateSelectedCount() {
      if (this.dom.selectedCount) {
        this.dom.selectedCount.textContent = `${this.state.selected.size} selected`;
      }
    },

    bindEvents() {
      if (!this.root) return;

      this.dom.unitList?.addEventListener("change", (event) => {
        if (!(event.target instanceof HTMLInputElement)) return;
        const id = event.target.value;
        if (!id) return;
        if (event.target.checked) {
          this.state.selected.add(id);
        } else {
          this.state.selected.delete(id);
        }
        this.updateSelectedCount();
        this.persistState();
        this.run();
      });

      if (this.dom.unitSearch) {
        const handler = Utils.debounce((value) => {
          const query = value.trim().toLowerCase();
          if (!query) {
            this.state.filteredUnits = this.state.units.slice();
          } else {
            this.state.filteredUnits = this.state.units.filter((unit) => unit.keywords.includes(query));
          }
          this.renderUnitList();
        }, 200);
        this.dom.unitSearch.addEventListener("input", (event) => handler(event.target.value));
      }

      if (this.dom.goldInput) {
        this.dom.goldInput.addEventListener("input", () => {
          const value = Math.max(0, Number(this.dom.goldInput.value) || 0);
          this.state.resources.gold = value;
          this.persistState();
          this.run();
        });
      }

      this.dom.materialInputs?.addEventListener("input", (event) => {
        if (!(event.target instanceof HTMLInputElement)) return;
        const key = event.target.dataset.materialInput;
        if (!key) return;
        this.state.resources.materials[key] = Math.max(0, Number(event.target.value) || 0);
        this.persistState();
        this.run();
      });

      if (this.dom.prioritySelect) {
        this.dom.prioritySelect.addEventListener("change", () => {
          const value = this.dom.prioritySelect.value || "balanced";
          this.state.priority = value;
          if (PRIORITY_PRESETS[value]) {
            this.state.weights = { ...PRIORITY_PRESETS[value] };
            this.renderWeights();
          }
          this.persistState();
          this.run();
        });
      }

      this.dom.weightSliders?.addEventListener("input", (event) => {
        if (!(event.target instanceof HTMLInputElement)) return;
        const key = event.target.dataset.weightSlider;
        if (!key) return;
        const percent = Math.max(0, Number(event.target.value) || 0);
        this.state.weights[key] = percent / 100;
        const label = this.dom.weightSliders.querySelector(`[data-weight-value="${key}"]`);
        if (label) {
          label.textContent = `${Math.round(this.state.weights[key] * 100)}%`;
        }
        this.state.weights = normalizeWeights(this.state.weights);
        this.renderWeights();
        this.persistState();
        this.run();
      });

      this.dom.savePreset?.addEventListener("click", () => {
        const name = window.prompt("Name this strategy preset:", "My plan");
        if (!name) return;
        const preset = {
          id: `preset-${Date.now()}`,
          name: name.trim(),
          priority: this.state.priority,
          weights: { ...this.state.weights },
        };
        this.state.savedPresets = this.state.savedPresets || [];
        this.state.savedPresets.push(preset);
        Utils.storage.set(STORAGE_KEYS.presets, this.state.savedPresets);
        this.populatePresets();
        Utils.showNotification("Strategy saved.", "success");
      });

      this.dom.presetSelect?.addEventListener("change", () => {
        const id = this.dom.presetSelect.value;
        if (!id) return;
        const preset = (this.state.savedPresets || []).find((item) => item.id === id);
        if (!preset) return;
        this.state.priority = preset.priority || "balanced";
        this.state.weights = normalizeWeights({ ...preset.weights });
        this.renderWeights();
        this.persistState();
        this.run();
        Utils.showNotification(`Loaded strategy "${preset.name}".`, "success");
      });

      this.dom.clearSelection?.addEventListener("click", () => {
        this.state.selected.clear();
        this.renderUnitList();
        this.updateSelectedCount();
        this.persistState();
        this.run();
      });

      this.dom.resetInputs?.addEventListener("click", () => {
        this.state.resources.gold = 0;
        Object.keys(this.state.resources.materials).forEach((key) => {
          this.state.resources.materials[key] = 0;
        });
        this.renderMaterials();
        this.persistState();
        this.run();
      });

      this.dom.importButtons?.forEach((button) => {
        button.addEventListener("click", () => {
          const source = button.dataset.import;
          if (source === "compare") {
            const history = Utils.storage.get("av-compare-history", []);
            if (!Array.isArray(history) || !history.length) {
              Utils.showNotification("No compare history found.", "warning");
              return;
            }
            (history[0] || []).forEach((id) => this.state.selected.add(id));
            this.renderUnitList();
            this.updateSelectedCount();
            this.persistState();
            this.run();
            Utils.showNotification("Imported compare duo.", "success");
          }
          if (source === "recommender") {
            const saved = Utils.storage.get("av-recommender-last");
            const ids = (saved?.results || []).map((item) => item.name).filter(Boolean);
            if (!ids.length) {
              Utils.showNotification("No recommender results found.", "warning");
              return;
            }
            this.state.selected = new Set(ids);
            this.renderUnitList();
            this.updateSelectedCount();
            this.persistState();
            this.run();
            Utils.showNotification("Imported recommender picks.", "success");
          }
        });
      });

      this.dom.copyPlan?.addEventListener("click", () => {
        if (!this.state.plan.length) {
          Utils.showNotification("Generate a plan before copying.", "warning");
          return;
        }
        const text = this.buildShareText();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(text)
            .then(() => Utils.showNotification("Plan copied to clipboard.", "success"))
            .catch(() => Utils.showNotification("Copy failed. Try manually.", "warning"));
        } else {
          Utils.showNotification("Clipboard not available.", "warning");
        }
      });
    },

    run() {
      const selectedUnits = this.state.units.filter((unit) => this.state.selected.has(unit.name));
      const resourceValue =
        this.state.resources.gold + convertMaterialsToGold(this.state.resources.materials);

      if (!selectedUnits.length || resourceValue <= 0) {
        this.state.plan = [];
        this.state.totals = null;
        this.renderResults();
        return;
      }

      const weights = normalizeWeights(this.state.weights);
      const result = buildPlan(selectedUnits, this.state.resources, weights, this.state.priority);
      this.state.plan = result.steps;
      this.state.totals = result.totals;
      this.renderResults();
      this.persistState();
    },

    renderResults() {
      const hasData = this.state.plan.length > 0;
      this.dom.emptyState?.classList.toggle("hidden", hasData);
      this.dom.resultsWrapper?.classList.toggle("hidden", !hasData);

      if (!hasData) {
        if (this.dom.summaryGold) this.dom.summaryGold.textContent = "0 ¥";
        if (this.dom.summaryMaterials) this.dom.summaryMaterials.textContent = "None";
        if (this.dom.summaryPower) this.dom.summaryPower.textContent = "—";
        if (this.dom.summaryStrategy) this.dom.summaryStrategy.textContent = this.describePriority(this.state.priority);
        return;
      }

      const rows = this.state.plan.map((step, index) => {
        const materials = formatMaterials(step.materials);
        return `
          <tr>
            <td class="px-4 py-3 text-xs text-slate-500">${index + 1}</td>
            <td class="px-4 py-3">
              <div class="font-semibold text-white">${step.unit.displayName}</div>
              <div class="text-xs text-slate-500">${step.label}</div>
            </td>
            <td class="px-4 py-3 text-sm">
              <div>${formatGold(step.goldCost)}</div>
              <div class="text-xs text-slate-500">${materials}</div>
            </td>
            <td class="px-4 py-3 text-sm">
              <span class="text-emerald-300 font-semibold">${step.valueAdjusted.toFixed(2)}</span>
            </td>
            <td class="px-4 py-3 text-sm">
              <span class="text-sky-300 font-semibold">${(step.roi * 100).toFixed(1)}%</span>
            </td>
          </tr>
        `;
      });
      if (this.dom.resultsRows) {
        this.dom.resultsRows.innerHTML = rows.join("");
      }

      const totals = this.state.totals;
      if (this.dom.kpiCards) {
        this.dom.kpiCards.innerHTML = `
          <article class="rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-4">
            <h3 class="text-xs uppercase tracking-wide text-slate-500">Steps</h3>
            <p class="text-2xl font-semibold text-white">${this.state.plan.length}</p>
          </article>
          <article class="rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-4">
            <h3 class="text-xs uppercase tracking-wide text-slate-500">Gold spent</h3>
            <p class="text-2xl font-semibold text-white">${formatGold(totals.goldSpent)}</p>
          </article>
          <article class="rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-4">
            <h3 class="text-xs uppercase tracking-wide text-slate-500">Average ROI</h3>
            <p class="text-2xl font-semibold text-white">${(totals.averageRoi * 100).toFixed(1)}%</p>
          </article>
          <article class="rounded-2xl border border-slate-800/70 bg-slate-950/60 px-4 py-4">
            <h3 class="text-xs uppercase tracking-wide text-slate-500">Projected power</h3>
            <p class="text-2xl font-semibold text-white">${totals.projectedPower}</p>
          </article>
        `;
      }

      if (this.dom.summaryPills) {
        this.dom.summaryPills.innerHTML = `
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-950/60 text-xs text-slate-300">
            Remaining gold: ${formatGold(totals.remainingGold)}
          </span>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-950/60 text-xs text-slate-300">
            Materials left: ${formatMaterials(totals.remainingMaterials)}
          </span>
        `;
      }

      if (this.dom.planInsights) {
        const topUnit = this.state.plan.reduce((best, step) => {
          const key = step.unit.name;
          best[key] = best[key] || { count: 0, unit: step.unit };
          best[key].count += 1;
          return best;
        }, {});
        const entries = Object.values(topUnit).sort((a, b) => b.count - a.count);
        const dominant = entries[0];
        const insights = [
          dominant ? `Most invested: ${dominant.unit.displayName} (${dominant.count} upgrades)` : "Investments spread evenly.",
          `Materials used: ${formatMaterials(totals.materialsUsed)}`,
          `Strategy focus: ${this.describePriority(this.state.priority)}`,
        ];
        this.dom.planInsights.innerHTML = insights
          .map(
            (text) => `
              <div class="rounded-2xl border border-slate-800/60 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                ${text}
              </div>
            `
          )
          .join("");
      }

      if (this.dom.summaryGold) this.dom.summaryGold.textContent = formatGold(totals.goldSpent);
      if (this.dom.summaryMaterials) this.dom.summaryMaterials.textContent = formatMaterials(totals.materialsUsed);
      if (this.dom.summaryPower) this.dom.summaryPower.textContent = `${totals.projectedPower} / 100`;
      if (this.dom.summaryStrategy) this.dom.summaryStrategy.textContent = this.describePriority(this.state.priority);

      if (this.dom.nextSteps) {
        this.dom.nextSteps.innerHTML = `
          <li class="flex items-start gap-2">
            <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-400/80"></span>
            <span>Re-run after you farm more yen or materials to unlock additional upgrades.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-sky-400/80"></span>
            <span>Need new heroes? Use the <a href="gacha-calculator.html" class="text-emerald-300 hover:text-emerald-200">Summon Simulator</a> to plan upcoming pulls.</span>
          </li>
        `;
      }
    },

    describePriority(priority) {
      switch (priority) {
        case "damage":
          return "Damage focus";
        case "survival":
          return "Survivability focus";
        case "beginner":
          return "Beginner friendly";
        default:
          return "Balanced";
      }
    },

    buildShareText() {
      const totals = this.state.totals;
      const lines = [
        `Anime Vanguards upgrade plan (${this.describePriority(this.state.priority)})`,
        `Steps: ${this.state.plan.length} | Gold: ${formatGold(totals.goldSpent)} | Power: ${totals.projectedPower}`,
        `Materials: ${formatMaterials(totals.materialsUsed)}`,
        "",
      ];
      this.state.plan.forEach((step, index) => {
        const materials = formatMaterials(step.materials);
        lines.push(
          `${index + 1}. ${step.unit.displayName} - ${step.label} | Cost ${formatGold(step.goldCost)} | ROI ${(step.roi * 100).toFixed(1)}% | ${materials}`
        );
      });
      lines.push("", "Generated via animevanguardswiki.com/investment-optimizer.html");
      return lines.join("\n");
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (window.AV && window.AV.PageHandler) {
      window.AV.PageHandler.initCommon();
    }
    OptimizerUI.init();
  });

  window.AV.OptimizerUI = OptimizerUI;
})();
