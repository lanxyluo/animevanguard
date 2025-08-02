import { showError, showNotification } from '../utils/dom.js';
import { debounce } from '../utils/helpers.js';

export class DPSPage {
    constructor(app) {
        this.app = app;
        this.isInitialized = false;
        
        // DPS Calculator instance
        this.dpsCalculator = null;
        
        // Data
        this.unitsData = null;
        this.elementIcons = null;
        
        // Current state
        this.selectedUnit = null;
        this.currentLevel = 1;
        this.selectedTrait = null;
        this.gameState = {
            hasBuffs: false,
            hasDebuffs: false,
            stageMultiplier: 1.0
        };
        
        // UI elements
        this.elements = {};
    }
    
    async initialize(data) {
        console.log('🚀 Initializing DPS Page...');
        
        this.unitsData = data.unitsData;
        this.elementIcons = data.elementIcons;
        
        // Initialize DPS Calculator
        this.dpsCalculator = new AnimeVanguardsDPSCalculator();
        
        // Initialize UI
        this.initializeUI();
        
        // Bind events
        this.bindEvents();
        
        this.isInitialized = true;
        console.log('✅ DPS Page initialized!');
        return true;
    }
    
    initializeUI() {
        // Create DPS page HTML structure
        const dpsContainer = document.getElementById('dpsPageContainer');
        if (!dpsContainer) {
            console.error('DPS page container not found');
            return;
        }
        
        dpsContainer.innerHTML = `
            <div class="dps-calculator">
                <div class="dps-header">
                    <h2><i class="fas fa-crosshairs"></i> DPS Calculator</h2>
                    <p>Calculate damage per second for your units</p>
                </div>
                
                <div class="dps-content">
                    <div class="dps-inputs">
                        <div class="input-group">
                            <label for="dpsUnitSelect">Select Unit:</label>
                            <select id="dpsUnitSelect" class="form-control">
                                <option value="">Choose a unit...</option>
                            </select>
                        </div>
                        
                        <div class="input-group">
                            <label for="unitLevel">Unit Level:</label>
                            <input type="number" id="unitLevel" class="form-control" min="1" max="100" value="1">
                        </div>
                        
                        <div class="input-group">
                            <label for="traitSelect">Active Trait:</label>
                            <select id="traitSelect" class="form-control">
                                <option value="">No trait</option>
                            </select>
                        </div>
                        
                        <button id="calculateDPS" class="btn btn-primary">
                            <i class="fas fa-calculator"></i> Calculate DPS
                        </button>
                    </div>
                    
                    <div class="dps-results" id="dpsResults">
                        <div class="results-placeholder">
                            <i class="fas fa-chart-line"></i>
                            <p>Select a unit and click Calculate to see DPS results</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Store element references
        this.elements = {
            unitSelect: document.getElementById('dpsUnitSelect'),
            levelInput: document.getElementById('unitLevel'),
            traitSelect: document.getElementById('traitSelect'),
            calculateBtn: document.getElementById('calculateDPS'),
            results: document.getElementById('dpsResults')
        };
        
        // Populate unit select
        this.populateUnitSelect();
    }
    
    populateUnitSelect() {
        const unitSelect = this.elements.unitSelect;
        unitSelect.innerHTML = '<option value="">Choose a unit...</option>';
        
        Object.values(this.unitsData).forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${unit.name} (${unit.rarity})`;
            unitSelect.appendChild(option);
        });
    }
    
    bindEvents() {
        // Unit selection
        if (this.elements.unitSelect) {
            this.elements.unitSelect.addEventListener('change', (e) => {
                this.handleUnitChange(e.target.value);
            });
        } else {
            console.warn('Unit select element not found');
        }
        
        // Level change
        if (this.elements.levelInput) {
            this.elements.levelInput.addEventListener('input', debounce((e) => {
                this.currentLevel = parseInt(e.target.value) || 1;
                this.updateTraitOptions();
            }, 300));
        } else {
            console.warn('Level input element not found');
        }
        
        // Calculate button
        if (this.elements.calculateBtn) {
            this.elements.calculateBtn.addEventListener('click', () => {
                this.calculateDPS();
            });
        } else {
            console.warn('Calculate button element not found');
        }
    }
    
    handleUnitChange(unitId) {
        if (!unitId) {
            this.selectedUnit = null;
            this.updateTraitOptions();
            return;
        }
        
        this.selectedUnit = this.unitsData[unitId];
        this.updateTraitOptions();
        
        // Auto-calculate if unit has data
        if (this.selectedUnit) {
            this.calculateDPS();
        }
    }
    
    updateTraitOptions() {
        const traitSelect = this.elements.traitSelect;
        traitSelect.innerHTML = '<option value="">No trait</option>';
        
        if (!this.selectedUnit) return;
        
        // Add unit-specific traits
        if (this.selectedUnit.traits && this.selectedUnit.traits.length > 0) {
            this.selectedUnit.traits.forEach(trait => {
                const option = document.createElement('option');
                option.value = trait.id;
                option.textContent = trait.name;
                traitSelect.appendChild(option);
            });
        }
    }
    
    calculateDPS() {
        if (!this.selectedUnit) {
            showError('Please select a unit first', 'warning');
            return;
        }
        
        try {
            // Calculate DPS using the calculator
            const dpsResult = this.dpsCalculator.calculateDPS({
                unit: this.selectedUnit,
                level: this.currentLevel,
                trait: this.selectedTrait,
                gameState: this.gameState
            });
            
            // Display results
            this.displayDPSResults(dpsResult);
            
        } catch (error) {
            console.error('DPS calculation error:', error);
            showError('Error calculating DPS: ' + error.message, 'error');
        }
    }
    
    displayDPSResults(result) {
        const resultsDiv = this.elements.results;
        
        resultsDiv.innerHTML = `
            <div class="dps-result-card">
                <div class="result-header">
                    <h3>DPS Results for ${this.selectedUnit.name}</h3>
                    <span class="unit-level">Level ${this.currentLevel}</span>
                </div>
                
                <div class="dps-breakdown">
                    <div class="dps-item">
                        <span class="label">Base DPS:</span>
                        <span class="value">${result.baseDPS.toLocaleString()}</span>
                    </div>
                    
                    <div class="dps-item total">
                        <span class="label">Total DPS:</span>
                        <span class="value">${result.totalDPS.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    show() {
        if (!this.isInitialized) {
            console.warn('⚠️ DPS Page not initialized');
            return;
        }
        
        console.log('📄 Showing DPS Page');
        
        // Update page title
        document.title = 'Anime Vanguards Calculator - DPS';
        
        this.onPageShow();
    }
    
    hide() {
        console.log('📄 Hiding DPS Page');
        this.onPageHide();
    }
    
    onPageShow() {
        console.log('DPS page shown');
    }
    
    onPageHide() {
        console.log('DPS page hidden');
    }
    
    destroy() {
        console.log('🗑️ Destroying DPS Page');
        this.isInitialized = false;
    }
    
    updateData(newData) {
        this.unitsData = newData.unitsData || this.unitsData;
        this.elementIcons = newData.elementIcons || this.elementIcons;
        
        // Re-populate unit select if already initialized
        if (this.isInitialized) {
            this.populateUnitSelect();
        }
    }
}

// DPS Calculator Class
class AnimeVanguardsDPSCalculator {
    calculateDPS(params) {
        const { unit, level, trait, gameState } = params;
        
        // Base stats calculation
        const baseDamage = this.calculateBaseDamage(unit, level);
        const attackSpeed = this.calculateAttackSpeed(unit, level);
        const damagePerHit = baseDamage;
        
        // Base DPS
        let baseDPS = damagePerHit * attackSpeed;
        
        // Simple calculation for now
        const totalDPS = baseDPS;
        
        return {
            baseDPS: Math.round(baseDPS),
            totalDPS: Math.round(totalDPS),
            attackSpeed: attackSpeed,
            damagePerHit: damagePerHit
        };
    }
    
    calculateBaseDamage(unit, level) {
        const baseDamage = unit.stats.damage || 100;
        const levelMultiplier = 1 + (level - 1) * 0.1;
        return Math.round(baseDamage * levelMultiplier);
    }
    
    calculateAttackSpeed(unit, level) {
        const baseSpeed = unit.stats.attackSpeed || 1.0;
        const levelBonus = (level - 1) * 0.02;
        return baseSpeed + levelBonus;
    }
} 