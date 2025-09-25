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

    async init() {
        await this.loadUnits();
        this.loadTraits();
        this.setupEventListeners();
        this.updateUI();
    }

    async loadUnits() {
        try {
            // Wait for UnitDatabaseData to be available
            let attempts = 0;
            const maxAttempts = 100; // 10 seconds max wait
            
            while (typeof UnitDatabaseData === 'undefined' && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (typeof UnitDatabaseData !== 'undefined') {
                const allUnits = UnitDatabaseData.loadAllUnits();
                
                // Convert database units to calculator format
                this.units = allUnits.map(unit => {
                    // Extract numeric values from DPS strings and calculate base stats
                    const maxDPSValue = this.extractDPSValue(unit.maxDPS);
                    const baseDPSValue = this.extractDPSValue(unit.baseDPS);
                    
                    // Calculate base attack and speed from DPS and cost
                    const baseAttack = this.calculateBaseAttack(unit, baseDPSValue);
                    const baseSpeed = this.calculateBaseSpeed(unit, baseDPSValue, baseAttack);
                    
                    return {
                        id: unit.id,
                        name: unit.name,
                        baseAttack: baseAttack,
                        baseSpeed: baseSpeed,
                        rarity: unit.rarity.toLowerCase(),
                        tier: unit.tier,
                        element: unit.element,
                        type: unit.type,
                        deploymentCost: unit.deploymentCost,
                        maxUpgradeCost: unit.maxUpgradeCost,
                        range: unit.range,
                        description: unit.description,
                        maxDPS: unit.maxDPS,
                        baseDPS: unit.baseDPS,
                        costEfficiency: unit.costEfficiency
                    };
                });
                
                console.log('📊 Loaded', this.units.length, 'units for DPS Calculator');
            } else {
                console.error('❌ UnitDatabaseData not available, using fallback data');
                this.loadFallbackUnits();
            }
        } catch (error) {
            console.error('❌ Failed to load units from database:', error);
            this.loadFallbackUnits();
        }
    }
    
    loadFallbackUnits() {
        // Fallback data if database is not available
        this.units = [
            { id: 'naruto', name: 'Naruto Uzumaki', baseAttack: 150, baseSpeed: 1.2, rarity: 'legendary' },
            { id: 'sasuke', name: 'Sasuke Uchiha', baseAttack: 140, baseSpeed: 1.4, rarity: 'legendary' },
            { id: 'goku', name: 'Goku', baseAttack: 180, baseSpeed: 1.0, rarity: 'legendary' },
            { id: 'vegeta', name: 'Vegeta', baseAttack: 170, baseSpeed: 1.1, rarity: 'legendary' },
            { id: 'luffy', name: 'Monkey D. Luffy', baseAttack: 130, baseSpeed: 1.3, rarity: 'epic' },
            { id: 'ichigo', name: 'Ichigo Kurosaki', baseAttack: 145, baseSpeed: 1.25, rarity: 'epic' }
        ];
    }
    
    extractDPSValue(dpsString) {
        if (!dpsString) return 1000; // Default fallback
        
        // Extract numeric value from strings like "190k+ with summon abilities", "Very High", etc.
        if (typeof dpsString === 'string') {
            // Handle "k" notation
            const kMatch = dpsString.match(/(\d+)k/);
            if (kMatch) {
                return parseInt(kMatch[1]) * 1000;
            }
            
            // Handle direct numbers
            const numberMatch = dpsString.match(/(\d+)/);
            if (numberMatch) {
                return parseInt(numberMatch[1]);
            }
            
            // Handle text descriptions
            const textDPS = {
                'Very High': 150000,
                'High': 100000,
                'Medium': 50000,
                'Low': 20000
            };
            
            return textDPS[dpsString] || 1000;
        }
        
        return typeof dpsString === 'number' ? dpsString : 1000;
    }
    
    calculateBaseAttack(unit, baseDPSValue) {
        // Calculate base attack based on unit properties
        const rarityMultiplier = {
            'Vanguard': 1.8,
            'Secret': 1.5,
            'Mythic': 1.2,
            'Epic': 1.0
        };
        
        const typeMultiplier = {
            'DPS': 1.3,
            'Support': 0.8,
            'Farm': 0.6,
            'Buffer': 0.7
        };
        
        const baseValue = baseDPSValue / 10; // Scale down for base attack
        const rarityBonus = rarityMultiplier[unit.rarity] || 1.0;
        const typeBonus = typeMultiplier[unit.type] || 1.0;
        
        return Math.round(baseValue * rarityBonus * typeBonus);
    }
    
    calculateBaseSpeed(unit, baseDPSValue, baseAttack) {
        // Calculate base speed based on unit properties
        const rangeMultiplier = {
            'Long': 0.8,
            'Medium': 1.0,
            'Short': 1.2
        };
        
        const typeMultiplier = {
            'DPS': 1.1,
            'Support': 1.3,
            'Farm': 1.5,
            'Buffer': 1.0
        };
        
        const rangeBonus = rangeMultiplier[unit.range] || 1.0;
        const typeBonus = typeMultiplier[unit.type] || 1.0;
        
        // Calculate speed to achieve the target DPS
        const targetSpeed = baseDPSValue / baseAttack;
        
        return Math.max(0.5, Math.min(2.0, targetSpeed * rangeBonus * typeBonus));
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
            option.textContent = `${unit.name} (${unit.rarity} ${unit.tier}) - ${unit.type} ${unit.element}`;
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
        
        // Enhanced level multiplier based on unit rarity
        const rarityLevelBonus = {
            'vanguard': 0.15,
            'secret': 0.12,
            'mythic': 0.10,
            'epic': 0.08
        };
        
        const levelBonus = rarityLevelBonus[this.currentUnit.rarity] || 0.08;
        const levelMultiplier = 1 + (this.currentLevel - 1) * levelBonus;
        
        // Trait multipliers
        const traitDamageMultiplier = this.currentTrait ? this.currentTrait.damageMultiplier : 1.0;
        const traitSpeedMultiplier = this.currentTrait ? this.currentTrait.speedMultiplier : 1.0;
        
        // Tier bonus multiplier
        const tierMultiplier = {
            'BROKEN': 1.5,
            'META': 1.3,
            'SUB-META': 1.1,
            'DECENT': 1.0
        };
        
        const tierBonus = tierMultiplier[this.currentUnit.tier] || 1.0;
        
        // Cost efficiency bonus
        const efficiencyMultiplier = {
            'High': 1.2,
            'Medium': 1.0,
            'Low': 0.8
        };
        
        const efficiencyBonus = efficiencyMultiplier[this.currentUnit.costEfficiency] || 1.0;
        
        // Calculate final stats
        const finalAttack = baseAttack * levelMultiplier * traitDamageMultiplier * tierBonus * efficiencyBonus;
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
            tierMultiplier: tierBonus,
            efficiencyMultiplier: efficiencyBonus,
            enemyCount: this.enemyCount,
            unitTier: this.currentUnit.tier,
            unitRarity: this.currentUnit.rarity,
            unitType: this.currentUnit.type,
            unitElement: this.currentUnit.element
        };
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('dpsResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="unit-info-header">
                <h3>${this.currentUnit.name}</h3>
                <div class="unit-badges">
                    <span class="badge rarity-${results.unitRarity}">${results.unitRarity.toUpperCase()}</span>
                    <span class="badge tier-${results.unitTier.toLowerCase().replace('-', '')}">${results.unitTier}</span>
                    <span class="badge type-${results.unitType.toLowerCase()}">${results.unitType}</span>
                    <span class="badge element-${results.unitElement.toLowerCase()}">${results.unitElement}</span>
                </div>
            </div>
            
            <div class="dps-result-item">
                <span class="dps-result-label">Base Attack</span>
                <span class="dps-result-value">${Math.round(results.baseAttack).toLocaleString()}</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Attack Speed</span>
                <span class="dps-result-value">${results.baseSpeed.toFixed(2)}/s</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Base DPS</span>
                <span class="dps-result-value">${Math.round(results.baseDPS).toLocaleString()}</span>
            </div>
            <div class="dps-result-item highlight">
                <span class="dps-result-label">Total DPS (${results.enemyCount} enemies)</span>
                <span class="dps-result-value">${Math.round(results.totalDPS).toLocaleString()}</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Attacks per Second</span>
                <span class="dps-result-value">${results.attacksPerSecond.toFixed(2)}</span>
            </div>
            
            <div class="damage-breakdown">
                <h4>Damage Breakdown</h4>
                <div class="breakdown-item">
                    <span class="breakdown-label">Base Attack</span>
                    <span class="breakdown-value">${this.currentUnit.baseAttack.toLocaleString()}</span>
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
                    <span class="breakdown-label">Tier Bonus (${results.unitTier})</span>
                    <span class="breakdown-value">×${results.tierMultiplier.toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Cost Efficiency Bonus</span>
                    <span class="breakdown-value">×${results.efficiencyMultiplier.toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Final Attack</span>
                    <span class="breakdown-value">${Math.round(results.baseAttack).toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Attack Speed</span>
                    <span class="breakdown-value">${results.baseSpeed.toFixed(2)}/s</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Enemy Count</span>
                    <span class="breakdown-value">×${results.enemyCount}</span>
                </div>
            </div>
            
            <div class="unit-stats-info">
                <h4>Unit Information</h4>
                <div class="info-item">
                    <span class="info-label">Deployment Cost</span>
                    <span class="info-value">¥${this.currentUnit.deploymentCost.toLocaleString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Max Upgrade Cost</span>
                    <span class="info-value">¥${this.currentUnit.maxUpgradeCost.toLocaleString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Range</span>
                    <span class="info-value">${this.currentUnit.range}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Database DPS</span>
                    <span class="info-value">${this.currentUnit.maxDPS}</span>
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
        // Find a BROKEN tier DPS unit
        this.currentUnit = this.units.find(u => u.tier === 'BROKEN' && u.type === 'DPS') || 
                          this.units.find(u => u.tier === 'META' && u.type === 'DPS') ||
                          this.units[0];
        this.currentTrait = this.traits.find(t => t.id === 'legendary');
        this.currentLevel = 12;
        this.enemyCount = 5;
        this.updateUI();
        this.calculateDPS();
    }

    loadBalancedPreset() {
        // Find a balanced META tier unit
        this.currentUnit = this.units.find(u => u.tier === 'META' && u.costEfficiency === 'High') ||
                          this.units.find(u => u.tier === 'SUB-META' && u.type === 'DPS') ||
                          this.units[1];
        this.currentTrait = this.traits.find(t => t.id === 'elemental');
        this.currentLevel = 8;
        this.enemyCount = 3;
        this.updateUI();
        this.calculateDPS();
    }

    loadTankKillerPreset() {
        // Find a high damage single-target unit
        this.currentUnit = this.units.find(u => u.type === 'DPS' && u.range === 'Short') ||
                          this.units.find(u => u.tier === 'META' && u.type === 'DPS') ||
                          this.units[2];
        this.currentTrait = this.traits.find(t => t.id === 'berserker');
        this.currentLevel = 10;
        this.enemyCount = 1;
        this.updateUI();
        this.calculateDPS();
    }

    loadCrowdControlPreset() {
        // Find a unit good for multiple enemies
        this.currentUnit = this.units.find(u => u.range === 'Long' && u.type === 'DPS') ||
                          this.units.find(u => u.tier === 'META' && u.type === 'DPS') ||
                          this.units[3];
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
