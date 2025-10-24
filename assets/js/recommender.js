(function () {
  "use strict";

  const STORAGE_KEY = "av-recommender-last";
  const STEP_ORDER = ["experience", "role", "budget"];
  const STEP_LABELS = {
    experience: "Experience level",
    role: "Role preference",
    budget: "Budget plan",
  };
  const METRIC_LABELS = {
    damage: "Damage output",
    survival: "Survivability",
    beginner_friendly: "Beginner friendliness",
    cost_efficiency: "Cost efficiency",
    get_difficulty: "Acquisition difficulty",
    tier_value: "Tier ranking",
    synergy: "Team synergy",
  };

  if (!window.AV || !window.AV.GameData) {
    console.error("Anime Vanguards helpers are missing. Ensure data.js and main.js load first.");
    return;
  }

  const { GameData, Utils, PageHandler } = window.AV;

  /**
   * Simple in-memory state manager for the wizard.
   */
  const RecommenderState = (() => {
    const state = {
      currentStepIndex: 0,
      answers: {},
      results: [],
    };

    return {
      getCurrentStep() {
        return STEP_ORDER[state.currentStepIndex] || STEP_ORDER[0];
      },

      getStepIndex(step) {
        return STEP_ORDER.indexOf(step);
      },

      setStepIndex(index) {
        const clamped = Math.max(0, Math.min(index, STEP_ORDER.length - 1));
        state.currentStepIndex = clamped;
      },

      nextStep() {
        this.setStepIndex(state.currentStepIndex + 1);
      },

      prevStep() {
        this.setStepIndex(state.currentStepIndex - 1);
      },

      setAnswer(step, value) {
        state.answers[step] = value;
      },

      getAnswer(step) {
        return state.answers[step] || null;
      },

      hasAnswer(step) {
        return Boolean(state.answers[step]);
      },

      allAnswered() {
        return STEP_ORDER.every((step) => this.hasAnswer(step));
      },

      reset() {
        state.currentStepIndex = 0;
        state.answers = {};
        state.results = [];
      },

      getAnswers() {
        return { ...state.answers };
      },

      setResults(results) {
        state.results = Array.isArray(results) ? results : [];
      },

      getResults() {
        return state.results.slice();
      },
    };
  })();

  /**
   * Recommendation engine: filters and scores units based on the wizard answers.
   */
  const RecommendationEngine = (() => {
    const rules = GameData.getRecommendationRules();

    const tierValueMap = {
      "S+": 5,
      S: 4.5,
      "S-": 4.2,
      A: 4,
      "A-": 3.5,
      B: 3,
      C: 2,
    };

    function getTierValue(tier) {
      if (!tier) return 0;
      return tierValueMap[tier] || tierValueMap[tier.toUpperCase()] || 0;
    }

    function getSynergyValue(unit) {
      const synergyCount = Array.isArray(unit.synergy) ? unit.synergy.length : 0;
      const tierBonus = unit.tier_category ? 0.5 : 0;
      return Math.min(5, synergyCount + tierBonus);
    }

    function applyWeights(metricMap, weights, sourceLabel, breakdown) {
      let score = 0;
      if (!weights) return score;
      Object.entries(weights).forEach(([metric, weight]) => {
        const value = metricMap[metric];
        if (typeof value === "undefined" || value === null) return;
        const contribution = value * weight;
        score += contribution;
        if (contribution !== 0) {
          breakdown.push({
            metric,
            weight,
            value,
            contribution,
            source: sourceLabel,
          });
        }
      });
      return score;
    }

    function buildMetricMap(unit) {
      const ratings = unit.ratings || {};
      return {
        damage: ratings.damage || 0,
        survival: ratings.survival || 0,
        beginner_friendly: ratings.beginner_friendly || 0,
        cost_efficiency: ratings.cost_efficiency || 0,
        get_difficulty: ratings.get_difficulty || 0,
        tier_value: getTierValue(unit.tier),
        synergy: getSynergyValue(unit),
      };
    }

    function generateReasonStrings(unit, breakdown, answers) {
      const positives = breakdown
        .filter((item) => item.contribution > 0)
        .sort((a, b) => b.contribution - a.contribution)
        .slice(0, 2);

      const reasons = positives.map((item) => {
        const label = METRIC_LABELS[item.metric] || item.metric;
        if (item.metric === "tier_value") {
          return `High tier placement (${unit.tier}) prioritized for ${answers.experience === "veteran" ? "meta-focused play" : "overall performance"}.`;
        }
        if (item.metric === "beginner_friendly") {
          return `Beginner friendly rating ${unit.ratings?.beginner_friendly || 0}/5 matches your experience profile.`;
        }
        if (item.metric === "cost_efficiency") {
          return `Great cost efficiency ${unit.ratings?.cost_efficiency || 0}/5 keeps upgrades manageable.`;
        }
        if (item.metric === "damage") {
          return `Strong damage score ${unit.ratings?.damage || 0}/5 suits your role preference.`;
        }
        if (item.metric === "survival") {
          return `Solid survivability ${unit.ratings?.survival || 0}/5 for balanced team builds.`;
        }
        if (item.metric === "synergy") {
          return `Known synergies (${(unit.synergy || []).slice(0, 2).join(", ") || "multiple comps"}) boost team combos.`;
        }
        return `${label} contributes positively to your profile.`;
      });

      if (answers.budget === "f2p" && (unit.rarity === "Rare" || unit.rarity === "Epic")) {
        reasons.push("Fits the free-to-play rarity limit while staying competitive.");
      }
      if (answers.budget === "whale" && unit.rarity === "Secret") {
        reasons.push("Secret rarity unlocked thanks to high-spend profile.");
      }
      if (answers.experience === "newbie" && unit.beginner_info?.recommended) {
        reasons.push(unit.beginner_info.reason || "Specifically recommended for new players.");
      }

      return reasons.slice(0, 3);
    }

    function buildNextSteps(topResults, answers) {
      const primary = topResults[0];
      const recommendations = [];

      if (primary) {
        recommendations.push({
          title: `Lock in ${primary.unit.displayName}`,
          description: `Focus resources on ${primary.unit.displayName} first. Upgrade core abilities and unlock traits via ${primary.unit.obtainment?.method || "core progression"}.`,
        });
      }

      const compareNames = topResults.map((item) => item.unit.displayName);
      if (compareNames.length >= 2) {
        recommendations.push({
          title: "Run a quick comparison",
          description: `Use the compare tool to stack ${compareNames.join(" vs ")} and spot stat gaps before investing.`,
        });
      } else {
        recommendations.push({
          title: "Check stat comparison",
          description: "Open the compare tool to review similar tier picks and confirm the best fit.",
        });
      }

      if (answers.role === "damage") {
        recommendations.push({
          title: "Pair with meta supports",
          description: "Look for range buffers like Sprintwagon or crowd control units to amplify your carry.",
        });
      } else if (answers.role === "support") {
        recommendations.push({
          title: "Add a main DPS carry",
          description: "Slot a high-damage Mythic or Legendary to convert your support utility into wins.",
        });
      } else {
        recommendations.push({
          title: "Refine balanced team core",
          description: "Combine a frontline tank, your balanced pick, and one burst DPS for late-game pushes.",
        });
      }

      recommendations.push({
        title: "Track drop opportunities",
        description: `Watch banner rotations and event shops for ${primary ? primary.unit.displayName : "featured units"} to secure shards efficiently.`,
      });

      return recommendations.slice(0, 4);
    }

    function buildRationale(answers, filteredCount, totalCount, budgetRule) {
      const rationale = [];
      if (answers.experience) {
        const mapping = {
          newbie: "Prioritized beginner friendliness and cost efficiency while penalizing hard-to-obtain drops.",
          some_exp: "Balanced damage and utility scores to match an intermediate learning curve.",
          veteran: "Elevated tier rankings and synergy potential to suit meta-focused players.",
        };
        rationale.push(`Experience: ${mapping[answers.experience] || "Applied default weighting profile."}`);
      }

      if (answers.role) {
        const mapping = {
          damage: "Role focus: Boosted damage output and survivability stats to highlight top carries.",
          support: "Role focus: Highlighted beginner-friendly utility units with strong cost efficiency.",
          balanced: "Role focus: Balanced damage, survivability, and beginner-friendly scores for consistent clears.",
        };
        rationale.push(mapping[answers.role]);
      }

      if (answers.budget && budgetRule) {
        rationale.push(
          `Budget filter: Limited to ${budgetRule.rarities?.join(", ") || "realistic"} rarities with cost <= ${
            budgetRule.max_cost ?? "n/a"
          } to match your spending plan.`
        );
      }

      rationale.push(`Filtering: ${filteredCount} of ${totalCount} units matched all constraints.`);

      return rationale;
    }

    function normalizeScores(results) {
      if (!results.length) return results;
      const maxScore = Math.max(...results.map((item) => item.score));
      const minScore = Math.min(...results.map((item) => item.score));
      const denominator = Math.max(maxScore - minScore, 1);
      return results.map((item) => {
        const normalized = ((item.score - minScore) / denominator) * 30 + 70; // map to 70-100 band for readability
        return {
          ...item,
          match: Math.max(1, Math.round(Math.min(normalized, 100))),
        };
      });
    }

    function recommend(answers) {
      const allUnits = GameData.getAllUnits();
      const budgetRule = rules.budget_filters?.[answers.budget] || null;
      const totalCount = allUnits.length;

      const budgetFiltered = allUnits.filter((unit) => {
        if (!budgetRule) return true;
        const rarityOk = !budgetRule.rarities || budgetRule.rarities.includes(unit.rarity);
        const costOk = typeof unit.cost === "number" ? unit.cost <= (budgetRule.max_cost ?? Infinity) : true;
        return rarityOk && costOk;
      });

      const filteredPool = budgetFiltered.length ? budgetFiltered : allUnits;
      const results = filteredPool.map((unit) => {
        const metricMap = buildMetricMap(unit);
        const breakdown = [];
        let score = 0;

        const experienceWeights = rules.experience_weights?.[answers.experience];
        score += applyWeights(metricMap, experienceWeights, "experience", breakdown);

        const roleWeights = rules.type_preferences?.[answers.role];
        score += applyWeights(metricMap, roleWeights, "role", breakdown);

        // Promote beginner flagged units for new players
        if (answers.experience === "newbie" && unit.beginner_info?.recommended) {
          score += 2;
          breakdown.push({
            metric: "beginner_friendly",
            weight: 2,
            value: 1,
            contribution: 2,
            source: "beginner_bonus",
          });
        }

        // Light penalty if acquisition is tough but player is F2P or new
        if (
          (answers.budget === "f2p" || answers.experience === "newbie") &&
          (unit.rarity === "Secret" || (unit.ratings?.get_difficulty || 0) >= 4)
        ) {
          score -= 3;
          breakdown.push({
            metric: "get_difficulty",
            weight: -3,
            value: 1,
            contribution: -3,
            source: "budget_penalty",
          });
        }

        // Cost pressure: penalize units close to budget cap unless whale
        if (budgetRule && budgetRule.max_cost && answers.budget !== "whale" && typeof unit.cost === "number") {
          const costRatio = unit.cost / budgetRule.max_cost;
          if (costRatio > 0.8) {
            const penalty = (costRatio - 0.8) * 5;
            score -= penalty;
            breakdown.push({
              metric: "cost_efficiency",
              weight: -penalty,
              value: 1,
              contribution: -penalty,
              source: "budget_penalty",
            });
          }
        }

        return {
          unit,
          score,
          breakdown,
          reasons: generateReasonStrings(unit, breakdown, answers),
        };
      });

      const sorted = results.sort((a, b) => b.score - a.score).slice(0, 3);
      const normalized = normalizeScores(sorted);
      const rationale = buildRationale(answers, filteredPool.length, totalCount, budgetRule);
      const nextSteps = buildNextSteps(normalized, answers);

      return {
        results: normalized,
        rationale,
        nextSteps,
      };
    }

    return {
      recommend,
    };
  })();

  /**
   * UI controller for the recommendation wizard.
   */
  const RecommenderUI = {
    init() {
      PageHandler.initCommon();
      this.cacheDom();
      if (!this.root) {
        console.warn("Recommender root not found.");
        return;
      }
      this.bindEvents();
      this.restoreSavedResults();
      this.updateStep();
    },

    cacheDom() {
      this.root = document.getElementById("recommender-app");
      if (!this.root) return;

      this.stepIndicators = this.root.querySelectorAll("[data-step-indicator]");
      this.stepPanels = this.root.querySelectorAll("[data-step-panel]");
      this.optionButtons = this.root.querySelectorAll("[data-option-group]");
      this.nextButton = this.root.querySelector("[data-action='next']");
      this.prevButton = this.root.querySelector("[data-action='previous']");
      this.progressBadge = this.root.querySelector("[data-progress-percent]");
      this.stepCounter = this.root.querySelector("[data-current-step-count]");
      this.resultsSection = this.root.querySelector("[data-results-section]");
      this.resultsList = this.root.querySelector("[data-results-list]");
      this.rationaleList = this.root.querySelector("[data-rationale-list]");
      this.nextStepsList = this.root.querySelector("[data-next-steps]");
      this.restartButton = this.root.querySelector("[data-action='restart']");
      this.shareButton = this.root.querySelector("[data-action='share']");
      this.savedSection = this.root.querySelector("[data-saved-results]");
      this.savedList = this.root.querySelector("[data-saved-results-list]");
      this.savedEmpty = this.root.querySelector("[data-saved-results-empty]");
      this.clearSavedBtn = this.root.querySelector("[data-action='clear-saved']");
    },

    bindEvents() {
      if (!this.root) return;

      this.optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const group = button.dataset.optionGroup;
          const value = button.dataset.optionValue;
          if (!group || !value) return;
          RecommenderState.setAnswer(group, value);
          this.highlightSelection(group, value);
          this.updateStepControls();
        });
      });

      if (this.nextButton) {
        this.nextButton.addEventListener("click", () => this.handleNext());
      }
      if (this.prevButton) {
        this.prevButton.addEventListener("click", () => this.handlePrevious());
      }
      if (this.restartButton) {
        this.restartButton.addEventListener("click", () => this.resetWizard());
      }
      if (this.shareButton) {
        this.shareButton.addEventListener("click", () => this.shareResults());
      }
      if (this.clearSavedBtn) {
        this.clearSavedBtn.addEventListener("click", () => this.clearSavedResults());
      }
    },

    highlightSelection(group, value) {
      this.optionButtons.forEach((button) => {
        if (button.dataset.optionGroup !== group) return;
        const isSelected = button.dataset.optionValue === value;
        button.classList.toggle("border-indigo-400", isSelected);
        button.classList.toggle("bg-indigo-500/20", isSelected);
        button.classList.toggle("text-slate-50", isSelected);
      });
    },

    handleNext() {
      const currentStep = RecommenderState.getCurrentStep();
      if (!RecommenderState.hasAnswer(currentStep)) {
        Utils.showNotification(`Please choose an option for ${STEP_LABELS[currentStep]}.`, "warning");
        return;
      }

      if (RecommenderState.getStepIndex(currentStep) === STEP_ORDER.length - 1) {
        if (!RecommenderState.allAnswered()) {
          Utils.showNotification("Answer all questions to generate recommendations.", "warning");
          return;
        }
        this.generateRecommendations();
      } else {
        RecommenderState.nextStep();
        this.updateStep();
      }
    },

    handlePrevious() {
      RecommenderState.prevStep();
      this.updateStep();
    },

    updateStep() {
      const currentStep = RecommenderState.getCurrentStep();
      this.stepPanels.forEach((panel) => {
        const isActive = panel.dataset.stepPanel === currentStep;
        panel.classList.toggle("hidden", !isActive);
        if (isActive) {
          panel.classList.add("flex");
          panel.classList.add("flex-col");
        }
      });

      this.stepIndicators.forEach((indicator) => {
        const step = indicator.dataset.stepIndicator;
        const stepIndex = RecommenderState.getStepIndex(step);
        const currentIdx = RecommenderState.getStepIndex(currentStep);
        indicator.className =
          indicator.dataset.stepIndicator === currentStep
            ? "rounded-2xl border border-indigo-400/60 bg-indigo-500/10 px-4 py-3 text-indigo-200"
            : stepIndex < currentIdx
            ? "rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-200"
            : "rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-slate-400";
      });

      this.updateStepControls();
    },

    updateStepControls() {
      const currentIdx = RecommenderState.getStepIndex(RecommenderState.getCurrentStep());
      if (this.stepCounter) {
        this.stepCounter.textContent = String(currentIdx + 1);
      }
      if (this.prevButton) {
        this.prevButton.disabled = currentIdx === 0;
        this.prevButton.classList.toggle("opacity-60", currentIdx === 0);
      }
      if (this.nextButton) {
        const isLastStep = currentIdx === STEP_ORDER.length - 1;
        this.nextButton.textContent = isLastStep ? "Show recommendations" : "Next step";
        this.nextButton.disabled = !RecommenderState.hasAnswer(STEP_ORDER[currentIdx]);
        this.nextButton.classList.toggle("opacity-60", this.nextButton.disabled);
      }
      if (this.progressBadge) {
        const answeredCount = STEP_ORDER.filter((step) => RecommenderState.hasAnswer(step)).length;
        const percent = Math.round((answeredCount / STEP_ORDER.length) * 100);
        this.progressBadge.textContent = `${Math.max(percent, 33)}%`;
      }
    },

    generateRecommendations() {
      const answers = RecommenderState.getAnswers();
      try {
        const payload = RecommendationEngine.recommend(answers);
        RecommenderState.setResults(payload.results);
        this.renderResults(payload);
        this.saveResults(answers, payload);
        Utils.showNotification("Recommendations updated.", "success");
      } catch (error) {
        console.error("Failed to generate recommendations:", error);
        Utils.showNotification("Something went wrong while scoring units. Please try again.", "error");
      }
    },

    renderResults(payload) {
      if (!this.resultsSection) return;

      if (!payload.results.length) {
        this.resultsList.innerHTML = `
          <div class="col-span-full">
            <div class="border border-amber-500/50 bg-amber-500/10 text-amber-200 rounded-2xl px-4 py-6 text-sm">
              No units matched all filters. Try relaxing your budget or role preference.
            </div>
          </div>
        `;
      } else {
        const cards = payload.results
          .map(({ unit, match, reasons }) => {
            const damageStars = Utils.generateStarRating(unit.ratings?.damage || 0, "\u2605");
            const beginnerStars = Utils.generateStarRating(unit.ratings?.beginner_friendly || 0, "\u2605");
            const costStars = Utils.generateStarRating(unit.ratings?.cost_efficiency || 0, "\u2605");
            const obtainment = unit.obtainment || {};
            return `
              <article class="rounded-3xl border border-slate-800 bg-slate-900/70 px-5 py-6 flex flex-col gap-4 gradient-border">
                <header class="flex flex-col gap-2">
                  <div class="flex items-center justify-between gap-3">
                    <h3 class="text-xl font-semibold text-white">${unit.displayName}</h3>
                    <span class="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold px-3 py-1">
                      Match ${match}%
                    </span>
                  </div>
                    <div class="flex items-center gap-3 text-sm text-slate-300">
                    ${Utils.formatRarity(unit.rarity)}
                    <span class="text-slate-500">&bull;</span>
                    ${Utils.formatElement(unit.element)}
                    <span class="text-slate-500">&bull;</span>
                    <span class="text-slate-200 font-medium">${unit.type}</span>
                  </div>
                </header>
                <p class="text-sm text-slate-300 line-clamp-3">${unit.description || "Versatile hero option."}</p>
                <dl class="grid grid-cols-2 gap-3 text-xs text-slate-400">
                  <div>
                    <dt class="uppercase tracking-wide text-slate-500">Damage</dt>
                    <dd class="mt-1">${damageStars}</dd>
                  </div>
                  <div>
                    <dt class="uppercase tracking-wide text-slate-500">Beginner</dt>
                    <dd class="mt-1">${beginnerStars}</dd>
                  </div>
                  <div>
                    <dt class="uppercase tracking-wide text-slate-500">Cost efficiency</dt>
                    <dd class="mt-1">${costStars}</dd>
                  </div>
                  <div>
                    <dt class="uppercase tracking-wide text-slate-500">Acquisition</dt>
                    <dd class="mt-1 text-slate-200">${obtainment.method || "Unknown"} ${
              obtainment.probability ? `(${obtainment.probability})` : ""
            }</dd>
                  </div>
                </dl>
                <div class="space-y-2">
                  <h4 class="text-sm font-semibold text-indigo-200">Why we recommend</h4>
                  <ul class="space-y-1 text-sm text-slate-300">
                    ${reasons
                      .map((reason) => `<li class="flex items-start gap-2"><span class="text-indigo-300 mt-0.5">&bull;</span><span>${reason}</span></li>`)
                      .join("")}
                  </ul>
                </div>
                <footer class="mt-auto flex flex-col gap-2 text-xs text-slate-400">
                  <div>
                    <span class="uppercase text-slate-500">Get from:</span>
                    <span class="text-slate-200">${obtainment.source || "In-game events"}</span>
                  </div>
                  <div>
                    <span class="uppercase text-slate-500">Next tip:</span>
                    <span class="text-slate-200">${unit.beginner_info?.alternative || unit.pros?.[0] || "Invest gradually to maximize value."}</span>
                  </div>
                </footer>
              </article>
            `;
          })
          .join("");

        this.resultsList.innerHTML = cards;
      }

      if (this.rationaleList) {
        this.rationaleList.innerHTML = payload.rationale
          .map((item) => `<li class="flex items-start gap-3"><span class="text-indigo-300 mt-0.5">*</span><span>${item}</span></li>`)
          .join("");
      }

      if (this.nextStepsList) {
        this.nextStepsList.innerHTML = payload.nextSteps
          .map(
            (item) => `
              <div class="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4">
                <h4 class="text-sm font-semibold text-indigo-200">${item.title}</h4>
                <p class="mt-2 text-xs text-slate-400">${item.description}</p>
              </div>
            `
          )
          .join("");
      }

      this.resultsSection.classList.remove("hidden");
      this.resultsSection.classList.add("space-y-8");
    },

    resetWizard() {
      RecommenderState.reset();
      this.optionButtons.forEach((button) => {
        button.classList.remove("border-indigo-400", "bg-indigo-500/20", "text-slate-50");
      });
      if (this.resultsSection) {
        this.resultsSection.classList.add("hidden");
      }
      this.updateStep();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    shareResults() {
      const results = RecommenderState.getResults();
      if (!results.length) {
        Utils.showNotification("Generate recommendations before sharing.", "warning");
        return;
      }
      const answers = RecommenderState.getAnswers();
      const summaryLines = results.map(
        (item, index) => `${index + 1}. ${item.unit.displayName} - ${item.match}% match (${item.unit.rarity})`
      );
      const text = `Anime Vanguards picks for my profile (${answers.experience} / ${answers.role} / ${answers.budget}):\n${summaryLines.join(
        "\n"
      )}\nTry it yourself at animevanguardswiki.com/recommend.html`;

      if (navigator.share) {
        navigator
          .share({
            title: "Anime Vanguards Recommendations",
            text,
            url: window.location.href,
          })
          .catch(() => {
            Utils.showNotification("Share cancelled.", "info");
          });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(() => Utils.showNotification("Copied results to clipboard!", "success"))
          .catch(() => Utils.showNotification("Clipboard copy failed. Try manually.", "warning"));
      } else {
        Utils.showNotification("Sharing not supported in this browser.", "warning");
      }
    },

    saveResults(answers, payload) {
      if (!payload.results.length) return;
      const dataToStore = {
        savedAt: new Date().toISOString(),
        answers,
        results: payload.results.map((item) => ({
          name: item.unit.name,
          displayName: item.unit.displayName,
          rarity: item.unit.rarity,
          match: item.match,
        })),
      };
      try {
        Utils.storage.set(STORAGE_KEY, dataToStore);
        this.renderSavedResults(dataToStore);
      } catch (error) {
        console.warn("Failed to persist recommendations:", error);
      }
    },

    restoreSavedResults() {
      const saved = Utils.storage.get(STORAGE_KEY);
      if (saved) {
        this.renderSavedResults(saved);
      } else {
        this.renderSavedResults(null);
      }
    },

    renderSavedResults(saved) {
      if (!this.savedSection || !this.savedList || !this.savedEmpty) return;

      if (!saved || !Array.isArray(saved.results) || !saved.results.length) {
        this.savedList.innerHTML = "";
        this.savedEmpty.classList.remove("hidden");
        return;
      }

      this.savedEmpty.classList.add("hidden");
      const savedCards = saved.results
        .map(
          (item) => `
            <article class="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 text-sm text-slate-300">
              <header class="flex items-center justify-between">
                <span class="font-semibold text-white">${item.displayName}</span>
                <span class="text-xs text-indigo-300 font-semibold">${item.match}%</span>
              </header>
              <p class="mt-2 text-xs text-slate-400">${item.rarity} rarity &bull; Saved ${new Date(saved.savedAt).toLocaleString()}</p>
            </article>
          `
        )
        .join("");

      this.savedList.innerHTML = savedCards;
    },

    clearSavedResults() {
      Utils.storage.remove(STORAGE_KEY);
      this.renderSavedResults(null);
      Utils.showNotification("Cleared saved recommendation history.", "info");
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    RecommenderUI.init();
  });
})();
