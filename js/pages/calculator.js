/**
 * DPS Calculator Page
 * Handles unit DPS calculations with traits and level bonuses
 */
class DPSCalculatorPage {
    constructor() {
        this.units = [];
        this.traits = [];
        this.currentUnit = null;
        this.currentTrait = null;
        this.currentLevel = 1;
        this.enemyCount = 1;
        
        this.init();
    }

    init() {
        this.loadUnits();
        this.loadTraits();
        this.setupEventListeners();
        this.updateUI();
    }

    loadUnits() {
        this.units = [
            { id: 'naruto', name: 'Naruto Uzumaki', baseAttack: 150, baseSpeed: 1.2, rarity: 'legendary' },
            { id: 'sasuke', name: 'Sasuke Uchiha', baseAttack: 140, baseSpeed: 1.4, rarity: 'legendary' },
            { id: 'goku', name: 'Goku', baseAttack: 180, baseSpeed: 1.0, rarity: 'legendary' },
            { id: 'vegeta', name: 'Vegeta', baseAttack: 170, baseSpeed: 1.1, rarity: 'legendary' },
            { id: 'luffy', name: 'Monkey D. Luffy', baseAttack: 130, baseSpeed: 1.3, rarity: 'epic' },
            { id: 'ichigo', name: 'Ichigo Kurosaki', baseAttack: 145, baseSpeed: 1.25, rarity: 'epic' }
        ];
    }

    loadTraits() {
        this.traits = [
            { id: 'none', name: 'No Trait', damageMultiplier: 1.0, speedMultiplier: 1.0 },
            { id: 'berserker', name: 'Berserker', damageMultiplier: 1.5, speedMultiplier: 0.8 },
            { id: 'swift', name: 'Swift Strike', damageMultiplier: 0.9, speedMultiplier: 1.6 },
            { id: 'critical', name: 'Critical Master', damageMultiplier: 1.3, speedMultiplier: 1.0 },
            { id: 'elemental', name: 'Elemental Mastery', damageMultiplier: 1.4, speedMultiplier: 1.1 },
            { id: 'legendary', name: 'Legendary Power', damageMultiplier: 1.8, speedMultiplier: 1.2 }
        ];
    }

    setupEventListeners() {
        const unitSelect = document.getElementById('unitSelect');
        if (unitSelect) {
            unitSelect.addEventListener('change', (e) => {
                this.currentUnit = this.units.find(u => u.id === e.target.value);
                this.updateUI();
            });
        }

        const levelSlider = document.getElementById('levelSlider');
        if (levelSlider) {
            levelSlider.addEventListener('input', (e) => {
                this.currentLevel = parseInt(e.target.value);
                document.getElementById('levelValue').textContent = this.currentLevel;
                this.updateUI();
            });
        }

        const traitSelect = document.getElementById('traitSelect');
        if (traitSelect) {
            traitSelect.addEventListener('change', (e) => {
                this.currentTrait = this.traits.find(t => t.id === e.target.value);
                this.updateUI();
            });
        }

        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateDPS());
        }

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('preset-btn')) {
                const preset = e.target.dataset.preset;
                this.loadPreset(preset);
            }
        });
    }

    updateUI() {
        this.updateUnitSelect();
        this.updateTraitSelect();
        this.updateResults();
    }

    updateUnitSelect() {
        const unitSelect = document.getElementById('unitSelect');
        if (!unitSelect) return;

        unitSelect.innerHTML = '<option value="">Choose a unit...</option>';
        this.units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${unit.name} (${unit.rarity})`;
            unitSelect.appendChild(option);
        });

        if (this.currentUnit) {
            unitSelect.value = this.currentUnit.id;
        }
    }

    updateTraitSelect() {
        const traitSelect = document.getElementById('traitSelect');
        if (!traitSelect) return;

        traitSelect.innerHTML = '<option value="">No Trait</option>';
        this.traits.forEach(trait => {
            if (trait.id !== 'none') {
                const option = document.createElement('option');
                option.value = trait.id;
                option.textContent = trait.name;
                traitSelect.appendChild(option);
            }
        });

        if (this.currentTrait) {
            traitSelect.value = this.currentTrait.id;
        }
    }

    calculateDPS() {
        if (!this.currentUnit) {
            this.showError('Please select a unit first');
            return;
        }

        const results = this.performCalculation();
        this.displayResults(results);
    }

    performCalculation() {
        const baseAttack = this.currentUnit.baseAttack;
        const baseSpeed = this.currentUnit.baseSpeed;
        const levelMultiplier = 1 + (this.currentLevel - 1) * 0.1;
        const traitDamageMultiplier = this.currentTrait ? this.currentTrait.damageMultiplier : 1.0;
        const traitSpeedMultiplier = this.currentTrait ? this.currentTrait.speedMultiplier : 1.0;

        const finalAttack = baseAttack * levelMultiplier * traitDamageMultiplier;
        const finalSpeed = baseSpeed * traitSpeedMultiplier;
        const baseDPS = finalAttack * finalSpeed;
        const totalDPS = baseDPS * this.enemyCount;

        return {
            baseAttack: finalAttack,
            baseSpeed: finalSpeed,
            baseDPS: baseDPS,
            totalDPS: totalDPS,
            attacksPerSecond: finalSpeed,
            levelMultiplier: levelMultiplier,
            traitDamageMultiplier: traitDamageMultiplier,
            traitSpeedMultiplier: traitSpeedMultiplier,
            enemyCount: this.enemyCount
        };
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('dpsResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="dps-result-item">
                <span class="dps-result-label">Base Attack</span>
                <span class="dps-result-value">${Math.round(results.baseAttack)}</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Base Speed</span>
                <span class="dps-result-value">${results.baseSpeed.toFixed(2)}</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Base DPS</span>
                <span class="dps-result-value">${Math.round(results.baseDPS)}</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Total DPS (${results.enemyCount} enemies)</span>
                <span class="dps-result-value highlight">${Math.round(results.totalDPS)}</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Attacks per Second</span>
                <span class="dps-result-value">${results.attacksPerSecond.toFixed(2)}</span>
            </div>
            
            <div class="damage-breakdown">
                <h4>Damage Breakdown</h4>
                <div class="breakdown-item">
                    <span class="breakdown-label">Base Attack</span>
                    <span class="breakdown-value">${this.currentUnit.baseAttack}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Level ${this.currentLevel} Multiplier</span>
                    <span class="breakdown-value">×${results.levelMultiplier.toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Trait Damage Multiplier</span>
                    <span class="breakdown-value">×${results.traitDamageMultiplier.toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Final Attack</span>
                    <span class="breakdown-value">${Math.round(results.baseAttack)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Attack Speed</span>
                    <span class="breakdown-value">${results.baseSpeed.toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Enemy Count</span>
                    <span class="breakdown-value">×${results.enemyCount}</span>
                </div>
            </div>
        `;
    }

    updateResults() {
        if (this.currentUnit && this.currentTrait) {
            const results = this.performCalculation();
            this.displayResults(results);
        } else {
            this.showPlaceholder();
        }
    }

    showPlaceholder() {
        const resultsContainer = document.getElementById('dpsResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="results-placeholder">
                <i class="fas fa-calculator"></i>
                <p>Configure your unit and click Calculate to see results</p>
            </div>
        `;
    }

    showError(message) {
        const resultsContainer = document.getElementById('dpsResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="results-placeholder">
                <i class="fas fa-exclamation-triangle" style="color: #ff6b6b;"></i>
                <p style="color: #ff6b6b;">${message}</p>
            </div>
        `;
    }

    loadPreset(preset) {
        switch (preset) {
            case 'meta-dps':
                this.loadMetaDPSPreset();
                break;
            case 'balanced':
                this.loadBalancedPreset();
                break;
            case 'tank-killer':
                this.loadTankKillerPreset();
                break;
            case 'crowd-control':
                this.loadCrowdControlPreset();
                break;
        }
    }

    loadMetaDPSPreset() {
        this.currentUnit = this.units.find(u => u.id === 'goku');
        this.currentTrait = this.traits.find(t => t.id === 'legendary');
        this.currentLevel = 12;
        this.enemyCount = 5;
        this.updateUI();
        this.calculateDPS();
    }

    loadBalancedPreset() {
        this.currentUnit = this.units.find(u => u.id === 'sasuke');
        this.currentTrait = this.traits.find(t => t.id === 'elemental');
        this.currentLevel = 8;
        this.enemyCount = 3;
        this.updateUI();
        this.calculateDPS();
    }

    loadTankKillerPreset() {
        this.currentUnit = this.units.find(u => u.id === 'naruto');
        this.currentTrait = this.traits.find(t => t.id === 'berserker');
        this.currentLevel = 10;
        this.enemyCount = 1;
        this.updateUI();
        this.calculateDPS();
    }

    loadCrowdControlPreset() {
        this.currentUnit = this.units.find(u => u.id === 'luffy');
        this.currentTrait = this.traits.find(t => t.id === 'swift');
        this.currentLevel = 6;
        this.enemyCount = 8;
        this.updateUI();
        this.calculateDPS();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('calculatorPage')) {
        window.dpsCalculator = new DPSCalculatorPage();
    }
});
