/* Gacha cost calculator
 * Converts banner configuration into expected pulls, percentiles, and budgets.
 */
(function () {
  "use strict";

  if (!window.AV || !window.AV.GameData) {
    console.error("Anime Vanguards helpers are missing. Did you load data.js and main.js first?");
    return;
  }

  const { GameData, Utils, PageHandler } = window.AV;

  const STORAGE_KEY = "av-gacha-calculator-saves";

  const RARITY_DEFAULTS = {
    Secret: { rate: 0.25, pity: 200 },
    Mythic: { rate: 0.5, pity: 120 },
    Legendary: { rate: 1.5, pity: 80 },
    Epic: { rate: 5, pity: 0 },
    Rare: { rate: 12, pity: 0 },
  };

  const PERCENTILES = [0.5, 0.75, 0.9, 0.95, 0.99];

  const state = {
    units: [],
    selectedUnit: null,
  };

  const dom = {};

  function parseProbabilityLabel(label) {
    if (!label) return null;
    const cleaned = label.replace(/[^\d.]/g, "");
    if (!cleaned) return null;
    const value = parseFloat(cleaned);
    return Number.isFinite(value) ? value : null;
  }

  function formatNumber(value, digits = 0) {
    if (!Number.isFinite(value)) return "-";
    return value.toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  function formatPercent(value, digits = 1) {
    if (!Number.isFinite(value)) return "-";
    return `${value.toFixed(digits)}%`;
  }

  function costForPulls(pulls, singleCost, multiCost) {
    if (!Number.isFinite(pulls) || pulls <= 0) return 0;
    if (!multiCost || multiCost <= 0) {
      return pulls * singleCost;
    }
    const bundles = Math.floor(pulls / 10);
    const remainder = pulls - bundles * 10;
    return bundles * multiCost + remainder * singleCost;
  }

  function deriveDefaults(unit) {
    const rarityDefaults = RARITY_DEFAULTS[unit?.rarity] || { rate: 1, pity: 0 };
    const probability = parseProbabilityLabel(unit?.obtainment?.probability);
    return {
      rate: probability ?? rarityDefaults.rate,
      pity: rarityDefaults.pity,
    };
  }

  function effectivePity(pity, currentPulls) {
    if (!pity || pity <= 0) return null;
    const remaining = pity - currentPulls;
    return remaining <= 0 ? 1 : remaining;
  }

  function cumulativeProbability(p, pulls, pityThreshold) {
    if (p <= 0) return 0;
    if (!Number.isFinite(pulls) || pulls <= 0) return 0;
    if (!pityThreshold) {
      return 1 - Math.pow(1 - p, pulls);
    }
    if (pulls >= pityThreshold) {
      return 1;
    }
    return 1 - Math.pow(1 - p, pulls);
  }

  function expectedPulls(p, pityThreshold) {
    if (p <= 0) return Infinity;
    if (!pityThreshold) {
      return 1 / p;
    }
    const threshold = Math.max(1, pityThreshold);
    let result = 0;
    for (let n = 1; n < threshold; n += 1) {
      result += n * Math.pow(1 - p, n - 1) * p;
    }
    result += threshold * Math.pow(1 - p, threshold - 1);
    return result;
  }

  function pullsForConfidence(p, confidence, pityThreshold) {
    if (p <= 0) return Infinity;
    const hardLimit = pityThreshold ? Math.max(1, pityThreshold) : 5000;
    for (let n = 1; n <= hardLimit; n += 1) {
      if (cumulativeProbability(p, n, pityThreshold) >= confidence) return n;
    }
    return hardLimit;
  }

  function pullsAffordable(singleCost, multiCost, gems) {
    if (singleCost <= 0) return 0;
    let pulls = 0;
    if (multiCost && multiCost > 0) {
      const bundles = Math.floor(gems / multiCost);
      pulls += bundles * 10;
      gems -= bundles * multiCost;
    }
    pulls += Math.floor(gems / singleCost);
    return pulls;
  }

  function loadUnits() {
    state.units = GameData.getAllUnits()
      .map((unit) => ({
        id: unit.name,
        label: `${unit.displayName} (${unit.rarity})`,
        rarity: unit.rarity,
        unit,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  function populateUnitSelect() {
    const select = dom.unitSelect;
    if (!select) return;
    select.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select a unit or keep custom rates";
    select.appendChild(placeholder);

    const grouped = state.units.reduce((acc, entry) => {
      (acc[entry.rarity] = acc[entry.rarity] || []).push(entry);
      return acc;
    }, {});

    Object.keys(grouped)
      .sort((a, b) => (RARITY_DEFAULTS[a]?.rate || 99) - (RARITY_DEFAULTS[b]?.rate || 99))
      .forEach((rarity) => {
        const group = document.createElement("optgroup");
        group.label = rarity;
        grouped[rarity].forEach((entry) => {
          const option = document.createElement("option");
          option.value = entry.id;
          option.textContent = entry.label;
          group.appendChild(option);
        });
        select.appendChild(group);
      });
  }

  function readInputs() {
    const data = {
      unitId: dom.unitSelect.value || null,
      singleCost: Math.max(Number(dom.singleCost.value) || 0, 0),
      multiCost: Math.max(Number(dom.multiCost.value) || 0, 0),
      baseRate: Math.max(Number(dom.baseRate.value) || 0.0001, 0.0001),
      hardPity: Math.max(Number(dom.hardPity.value) || 0, 0),
      targetConfidence: Math.min(Math.max(Number(dom.targetConfidence.value) || 10, 10), 99.9) / 100,
      currentPulls: Math.max(Number(dom.currentPulls.value) || 0, 0),
      currentGems: Math.max(Number(dom.currentGems.value) || 0, 0),
    };
    return data;
  }

  function buildProbabilityBars(rate, pityThreshold, singleCost, targetConfidence) {
    const container = dom.probabilityBars;
    if (!container) return;
    container.innerHTML = "";

    const displayLevels = [0.25, 0.5, 0.75, 0.9, targetConfidence];
    const seen = new Set();
    displayLevels.forEach((level) => {
      if (level <= 0 || level >= 1) return;
      const rounded = Math.round(level * 1000) / 1000;
      if (seen.has(rounded)) return;
      seen.add(rounded);

      const pulls = pullsForConfidence(rate, level, pityThreshold);
      const success = cumulativeProbability(rate, pulls, pityThreshold);
      const bar = document.createElement("div");
      bar.className = "rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3";
      bar.innerHTML = `
        <div class="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
          <span>${formatPercent(success * 100, 1)} success</span>
          <span>${formatNumber(pulls)} pulls</span>
        </div>
        <div class="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div class="h-full bg-indigo-400" style="width:${Math.min(100, success * 100).toFixed(1)}%;"></div>
        </div>
        <div class="mt-2 text-xs text-slate-400">
          Approx. ${formatNumber(costForPulls(pulls, singleCost, dom.multiCost.value ? Number(dom.multiCost.value) : 0))} gems
        </div>
      `;
      container.appendChild(bar);
    });
  }

  function buildPercentileTable(rate, pityThreshold, singleCost, multiCost) {
    const tbody = dom.percentileRows;
    if (!tbody) return;
    tbody.innerHTML = "";
    PERCENTILES.forEach((percentile) => {
      const pulls = pullsForConfidence(rate, percentile, pityThreshold);
      const gems = costForPulls(pulls, singleCost, multiCost);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-4 py-3">${formatPercent(percentile * 100, 0)}</td>
        <td class="px-4 py-3">${formatNumber(pulls)}</td>
        <td class="px-4 py-3">${formatNumber(gems)}</td>
      `;
      tbody.appendChild(row);
    });
  }

  function summarise(params) {
    const baseRate = params.baseRate / 100;
    if (!Number.isFinite(baseRate) || baseRate <= 0) {
      dom.summaryLine.textContent = "Please enter a valid pull rate and cost before calculating.";
      dom.expectedPulls.textContent = "-";
      dom.expectedGems.textContent = "-";
      dom.targetGems.textContent = "-";
      dom.probabilityBars.innerHTML = "";
      dom.percentileRows.innerHTML = "";
      return;
    }

    const pityThreshold = effectivePity(params.hardPity, params.currentPulls);
    const expectedPullCount = expectedPulls(baseRate, pityThreshold);
    const expectedGemCost = costForPulls(expectedPullCount, params.singleCost, params.multiCost);
    const targetPulls = pullsForConfidence(baseRate, params.targetConfidence, pityThreshold);
    const targetGemCost = costForPulls(targetPulls, params.singleCost, params.multiCost);
    const affordablePulls = pullsAffordable(params.singleCost, params.multiCost, params.currentGems);
    const budgetSuccess = cumulativeProbability(baseRate, affordablePulls, pityThreshold);

    dom.expectedPulls.textContent = formatNumber(expectedPullCount, expectedPullCount > 100 ? 0 : 2);
    dom.expectedGems.textContent = formatNumber(expectedGemCost, expectedGemCost > 1000 ? 0 : 2);
    dom.targetGems.textContent = `${formatNumber(targetGemCost)} gems`;

    const pityCopy = params.hardPity
      ? `Hard pity at ${params.hardPity} pulls${params.currentPulls ? ` (currently ${params.currentPulls} pulls in).` : "."}`
      : "This banner does not have a hard pity.";
    const summaryText = `Expected to hit the featured unit around ${formatNumber(
      expectedPullCount,
      2,
    )} pulls (~${formatNumber(expectedGemCost)} gems). Reaching ${formatPercent(
      params.targetConfidence * 100,
    )} success takes roughly ${formatNumber(targetPulls)} pulls. ${pityCopy}`;
    const budgetText =
      params.currentGems > 0
        ? `With ${formatNumber(params.currentGems)} gems you can roll about ${formatNumber(
            affordablePulls,
          )} times, which is a ${formatPercent(budgetSuccess * 100, 1)} chance to win.`
        : "Add your current gem total to see the success chance with your existing budget.";

    dom.summaryLine.textContent = `${summaryText} ${budgetText}`;
    buildProbabilityBars(baseRate, pityThreshold, params.singleCost, params.targetConfidence);
    buildPercentileTable(baseRate, pityThreshold, params.singleCost, params.multiCost);
  }

  function readSavedConfigs() {
    const stored = Utils.storage.get(STORAGE_KEY, []);
    return Array.isArray(stored) ? stored : [];
  }

  function renderSavedConfigs() {
    if (!dom.savedConfigs) return;
    const configs = readSavedConfigs();
    if (!configs.length) {
      dom.savedConfigs.innerHTML =
        '<p class="text-sm text-slate-500">No saved plans yet. Configure the banner and click “Save this plan”.</p>';
      return;
    }
    dom.savedConfigs.innerHTML = "";
    configs.forEach((config) => {
      const card = document.createElement("div");
      card.className = "rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300";
      card.innerHTML = `
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="font-semibold text-indigo-200">${config.label}</p>
            <p class="text-xs text-slate-500">
              Rate ${formatPercent(config.baseRate, 2)}, pity ${config.hardPity || "None"}, single pull ${formatNumber(
        config.singleCost,
      )} gems
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button data-load="${config.id}" class="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-200 text-xs hover:bg-indigo-500/30">
              Load
            </button>
            <button data-remove="${config.id}" class="px-3 py-1 rounded-xl border border-slate-700 text-slate-400 text-xs hover:border-rose-400 hover:text-rose-200">
              Delete
            </button>
          </div>
        </div>
      `;
      dom.savedConfigs.appendChild(card);
    });

    dom.savedConfigs.querySelectorAll("[data-load]").forEach((button) => {
      button.addEventListener("click", () => {
        applySavedConfig(button.getAttribute("data-load"));
      });
    });

    dom.savedConfigs.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        removeSavedConfig(button.getAttribute("data-remove"));
      });
    });
  }

  function saveCurrentConfig() {
    const params = readInputs();
    const labelPieces = [];
    if (state.selectedUnit) {
      labelPieces.push(state.selectedUnit.unit.displayName);
    } else {
      labelPieces.push(`Custom rate ${formatPercent(params.baseRate, 2)}`);
    }
    if (params.hardPity) {
      labelPieces.push(`Pity ${params.hardPity}`);
    }
    const label = labelPieces.join(" • ") || "Custom banner plan";
    const config = {
      id: `${Date.now()}`,
      label,
      savedAt: new Date().toISOString(),
      ...params,
    };

    let configs = readSavedConfigs();
    configs = configs.filter((item) => item.label !== label);
    configs.unshift(config);
    configs = configs.slice(0, 8);
    Utils.storage.set(STORAGE_KEY, configs);
    Utils.showNotification("Saved this banner plan.", "success");
    renderSavedConfigs();
  }

  function applySavedConfig(id) {
    const configs = readSavedConfigs();
    const config = configs.find((item) => item.id === id);
    if (!config) return;
    dom.unitSelect.value = config.unitId || "";
    dom.singleCost.value = config.singleCost;
    dom.multiCost.value = config.multiCost;
    dom.baseRate.value = config.baseRate;
    dom.hardPity.value = config.hardPity;
    dom.targetConfidence.value = (config.targetConfidence * 100).toFixed(1);
    dom.currentPulls.value = config.currentPulls || 0;
    dom.currentGems.value = config.currentGems || 0;
    Utils.showNotification(`Loaded plan: ${config.label}`, "info");
    summarise(config);
  }

  function removeSavedConfig(id) {
    let configs = readSavedConfigs();
    configs = configs.filter((item) => item.id !== id);
    Utils.storage.set(STORAGE_KEY, configs);
    Utils.showNotification("Removed saved plan.", "info");
    renderSavedConfigs();
  }

  function applyUnitDefaults(unitId) {
    const entry = state.units.find((item) => item.id === unitId);
    state.selectedUnit = entry || null;
    const defaults = deriveDefaults(entry?.unit);
    dom.baseRate.value = defaults.rate;
    dom.hardPity.value = defaults.pity;
    if (entry) {
      Utils.showNotification(`Loaded ${entry.unit.displayName} banner defaults.`, "success");
    }
  }

  function cacheDom() {
    dom.unitSelect = document.querySelector("[data-field='unit']");
    dom.singleCost = document.querySelector("[data-field='single-cost']");
    dom.multiCost = document.querySelector("[data-field='multi-cost']");
    dom.baseRate = document.querySelector("[data-field='base-rate']");
    dom.hardPity = document.querySelector("[data-field='hard-pity']");
    dom.targetConfidence = document.querySelector("[data-field='target-confidence']");
    dom.currentPulls = document.querySelector("[data-field='current-pulls']");
    dom.currentGems = document.querySelector("[data-field='current-gems']");
    dom.calculateButton = document.querySelector("[data-action='calculate']");
    dom.saveButton = document.querySelector("[data-action='save-config']");
    dom.expectedPulls = document.querySelector("[data-output='expected-pulls']");
    dom.expectedGems = document.querySelector("[data-output='expected-gems']");
    dom.targetGems = document.querySelector("[data-output='target-gems']");
    dom.summaryLine = document.querySelector("[data-output='summary-line']");
    dom.probabilityBars = document.querySelector("[data-output='probability-bars']");
    dom.percentileRows = document.querySelector("[data-output='percentile-rows']");
    dom.savedConfigs = document.querySelector("[data-output='saved-configs']");
  }

  function bindEvents() {
    if (dom.unitSelect) {
      dom.unitSelect.addEventListener("change", () => {
        if (dom.unitSelect.value) {
          applyUnitDefaults(dom.unitSelect.value);
        }
        summarise(readInputs());
      });
    }

    const inputs = [
      dom.singleCost,
      dom.multiCost,
      dom.baseRate,
      dom.hardPity,
      dom.targetConfidence,
      dom.currentPulls,
      dom.currentGems,
    ];
    inputs.forEach((input) => {
      input?.addEventListener("input", Utils.debounce(() => summarise(readInputs()), 200));
    });

    dom.calculateButton?.addEventListener("click", () => summarise(readInputs()));
    dom.saveButton?.addEventListener("click", saveCurrentConfig);
  }

  function init() {
    PageHandler.initCommon();
    cacheDom();
    loadUnits();
    populateUnitSelect();
    bindEvents();
    renderSavedConfigs();
    summarise(readInputs());
  }

  document.addEventListener("DOMContentLoaded", init);
})();
