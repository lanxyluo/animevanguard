import { showError, showNotification } from '../utils/dom.js';
import { debounce } from '../utils/helpers.js';
import { traitsData, traitsUtils } from '../config/traits.js';
import { gameStatesData, gameStatesUtils } from '../config/gameStates.js';

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
        // Get existing DPS page container from HTML
        const dpsContainer = document.getElementById('dpsPage');
        if (!dpsContainer) {
            console.error('DPS page container not found');
            return;
        }
        
        // Store element references from existing HTML
        this.elements = {
            unitSelect: document.getElementById('dpsUnitSelect'),
            levelInput: document.getElementById('unitLevel'),
            traitSelect: document.getElementById('traitsSelection'),
            calculateBtn: document.getElementById('calculateDPS'),
            results: document.getElementById('dpsResults'),
            unitSearch: document.getElementById('dpsUnitSearch'),
            rarityFilter: document.getElementById('dpsRarityFilter'),
            elementFilter: document.getElementById('dpsElementFilter'),
            enemyCount: document.getElementById('enemyCount'),
            gameState: document.getElementById('gameState')
        };
        
        // Verify all required elements exist
        Object.entries(this.elements).forEach(([name, element]) => {
            if (!element) {
                console.warn(`DPS element '${name}' not found in HTML`);
            }
        });
        
        console.log('✅ DPS UI elements initialized');
        
        // Populate unit select if it exists
        if (this.elements.unitSelect) {
            this.populateUnitSelect();
        }
        
        // Initialize traits and game states
        this.initializeTraitsAndGameStates();
    }
    
    initializeTraitsAndGameStates() {
        // Initialize traits dropdown
        this.updateTraitOptions();
        
        // Initialize game states dropdown
        this.updateGameStateOptions();
        
        // Initialize filter options
        this.populateFilterOptions();
        
        console.log('✅ Traits and Game States initialized');
    }
    
    updateGameStateOptions() {
        const gameStateSelect = this.elements.gameState;
        if (!gameStateSelect) return;
        
        // Clear existing options
        gameStateSelect.innerHTML = '<option value="">Select Game State...</option>';
        
        // Add all available game states from configuration
        gameStatesData.forEach(state => {
            const option = document.createElement('option');
            option.value = state.value;
            option.textContent = state.label;
            option.title = state.description; // Tooltip
            gameStateSelect.appendChild(option);
        });
    }
    
    populateFilterOptions() {
        if (!this.unitsData) return;
        
        // Get unique values from units data
        const rarities = [...new Set(Object.values(this.unitsData).map(unit => unit.rarity))].sort();
        const elements = [...new Set(Object.values(this.unitsData).map(unit => unit.element))].sort();
        
        // Populate rarity filter
        if (this.elements.rarityFilter) {
            const currentValue = this.elements.rarityFilter.value;
            this.elements.rarityFilter.innerHTML = '<option value="">All Rarity</option>' +
                rarities.map(rarity => `<option value="${rarity}">${rarity}</option>`).join('');
            this.elements.rarityFilter.value = currentValue;
        }
        
        // Populate element filter
        if (this.elements.elementFilter) {
            const currentValue = this.elements.elementFilter.value;
            this.elements.elementFilter.innerHTML = '<option value="">All Elements</option>' +
                elements.map(element => `<option value="${element}">${element}</option>`).join('');
            this.elements.elementFilter.value = currentValue;
        }
        
        console.log('✅ DPS filter options populated');
    }
    
    populateUnitSelect() {
        const unitSelect = this.elements.unitSelect;
        if (!unitSelect) {
            console.error('Unit select element not found');
            return;
        }
        
        unitSelect.innerHTML = '<option value="">Select Unit...</option>';
        
        if (!this.unitsData) {
            console.error('Units data not available');
            return;
        }
        
        console.log('Populating DPS unit select with', Object.keys(this.unitsData).length, 'units');
        
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
            this.elements.levelInput.addEventListener('input', (e) => {
                this.currentLevel = parseInt(e.target.value) || 1;
                // Update the level display
                const levelValue = document.getElementById('levelValue');
                if (levelValue) {
                    levelValue.textContent = this.currentLevel;
                }
                this.updateTraitOptions();
            });
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
        
        // Unit search
        if (this.elements.unitSearch) {
            this.elements.unitSearch.addEventListener('input', debounce((e) => {
                this.filterUnits(e.target.value);
            }, 300));
        } else {
            console.warn('Unit search element not found');
        }
        
        // Rarity filter
        if (this.elements.rarityFilter) {
            this.elements.rarityFilter.addEventListener('change', (e) => {
                this.filterUnits();
            });
        } else {
            console.warn('Rarity filter element not found');
        }
        
        // Element filter
        if (this.elements.elementFilter) {
            this.elements.elementFilter.addEventListener('change', (e) => {
                this.filterUnits();
            });
        } else {
            console.warn('Element filter element not found');
        }
        
        // Enemy count
        if (this.elements.enemyCount) {
            this.elements.enemyCount.addEventListener('change', (e) => {
                this.enemyCount = parseInt(e.target.value) || 1;
            });
        } else {
            console.warn('Enemy count element not found');
        }
        
        // Game state
        if (this.elements.gameState) {
            this.elements.gameState.addEventListener('change', (e) => {
                this.gameState = e.target.value;
            });
        } else {
            console.warn('Game state element not found');
        }
        
        // Trait selection
        if (this.elements.traitSelect) {
            this.elements.traitSelect.addEventListener('change', (e) => {
                this.selectedTrait = traitsUtils.getTraitByValue(e.target.value);
            });
        } else {
            console.warn('Trait select element not found');
        }
    }
    
    handleUnitChange(unitId) {
        if (!unitId) {
            this.selectedUnit = null;
            this.updateTraitOptions();
            return;
        }
        
        this.selectedUnit = this.unitsData.find(u => u.id === unitId);
        this.updateTraitOptions();
        
        // Auto-calculate if unit has data
        if (this.selectedUnit) {
            this.calculateDPS();
        }
    }
    
    filterUnits(searchTerm = '') {
        if (!this.elements.unitSelect) return;
        
        const rarityFilter = this.elements.rarityFilter?.value || '';
        const elementFilter = this.elements.elementFilter?.value || '';
        
        // Filter units based on criteria
        const filteredUnits = Object.values(this.unitsData).filter(unit => {
            const matchesSearch = !searchTerm || 
                unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unit.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesRarity = !rarityFilter || unit.rarity === rarityFilter;
            const matchesElement = !elementFilter || unit.element === elementFilter;
            
            return matchesSearch && matchesRarity && matchesElement;
        });
        
        // Update unit select options
        this.elements.unitSelect.innerHTML = '<option value="">Choose a unit...</option>';
        filteredUnits.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${unit.name} (${unit.rarity})`;
            this.elements.unitSelect.appendChild(option);
        });
    }
    
    updateTraitOptions() {
        const traitSelect = this.elements.traitSelect;
        if (!traitSelect) return;
        
        // Clear existing options
        traitSelect.innerHTML = '<option value="">Select Trait...</option>';
        
        // Add all available traits from configuration
        traitsData.forEach(trait => {
            const option = document.createElement('option');
            option.value = trait.value;
            option.textContent = trait.label;
            option.title = trait.description; // Tooltip
            traitSelect.appendChild(option);
        });
    }
    
    calculateDPS() {
        if (!this.selectedUnit) {
            showError('Please select a unit first', 'warning');
            return;
        }
        
        try {
            console.log('Calculating DPS for unit:', this.selectedUnit.name, 'at level:', this.currentLevel);
            
            // Get current trait and game state
            const selectedTrait = this.selectedTrait || traitsUtils.getTraitByValue('none');
            const selectedGameState = gameStatesUtils.getGameStateByValue(this.gameState || 'normal');
            
            // Calculate DPS using the calculator
            const dpsResult = this.dpsCalculator.calculateDPS({
                unit: this.selectedUnit,
                level: this.currentLevel,
                trait: selectedTrait,
                gameState: selectedGameState
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
            <div class="dps-result-item">
                <span>Base DPS:</span>
                <span>${result.baseDPS.toLocaleString()}</span>
            </div>
            <div class="dps-result-item">
                <span>Trait Bonus DPS:</span>
                <span>${result.traitBonusDPS ? result.traitBonusDPS.toLocaleString() : '0'}</span>
            </div>
            <div class="dps-result-item">
                <span>Level Bonus DPS:</span>
                <span>${result.levelBonusDPS ? result.levelBonusDPS.toLocaleString() : '0'}</span>
            </div>
            <div class="dps-result-item">
                <span>Effective DPS:</span>
                <span>${result.effectiveDPS ? result.effectiveDPS.toLocaleString() : '0'}</span>
            </div>
            <div class="dps-result-item total">
                <span>Total DPS:</span>
                <span>${result.totalDPS.toLocaleString()}</span>
            </div>
        `;
        
        // Update breakdown section
        const breakdownDiv = document.querySelector('.dps-breakdown');
        if (breakdownDiv) {
            breakdownDiv.innerHTML = `
                <h4>DPS Breakdown</h4>
                <div class="breakdown-item">
                    <span>Damage per Hit:</span>
                    <span>${result.damagePerHit.toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span>Attack Speed:</span>
                    <span>${result.attackSpeed.toFixed(2)}s</span>
                </div>
                <div class="breakdown-item">
                    <span>Hits per Second:</span>
                    <span>${(1 / result.attackSpeed).toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span>Trait Multiplier:</span>
                    <span>${result.traitMultiplier ? (result.traitMultiplier * 100).toFixed(0) + '%' : '100%'}</span>
                </div>
                <div class="breakdown-item">
                    <span>Game State Multiplier:</span>
                    <span>${result.gameStateMultiplier ? (result.gameStateMultiplier * 100).toFixed(0) + '%' : '100%'}</span>
                </div>
            `;
        }
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
        
        // Ensure unit select is populated when page is shown
        if (this.isInitialized && this.elements.unitSelect) {
            this.populateUnitSelect();
        }
        
        // Initialize level display
        if (this.elements.levelInput) {
            const levelValue = document.getElementById('levelValue');
            if (levelValue) {
                levelValue.textContent = this.currentLevel;
            }
        }
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
        
        console.log('DPS Calculator - Unit:', unit.name, 'Level:', level);
        console.log('Unit stats:', unit.stats);
        console.log('Trait:', trait);
        console.log('Game State:', gameState);
        
        // Base stats calculation
        const baseDamage = this.calculateBaseDamage(unit, level);
        const attackSpeed = this.calculateAttackSpeed(unit, level);
        const damagePerHit = baseDamage;
        
        // Base DPS (damage per hit / attack speed)
        const baseDPS = damagePerHit / attackSpeed;
        
        // Level bonus DPS
        const levelBonusDPS = baseDPS * (level - 1) * 0.1;
        
        // Trait bonus DPS
        const traitMultiplier = trait ? trait.damageMultiplier : 1.0;
        const traitBonusDPS = baseDPS * (traitMultiplier - 1);
        
        // Game state multiplier
        const gameStateMultiplier = gameState ? gameState.damageMultiplier : 1.0;
        
        // Effective DPS (with trait bonus)
        const effectiveDPS = baseDPS + levelBonusDPS + traitBonusDPS;
        
        // Total DPS (with game state multiplier)
        const totalDPS = effectiveDPS * gameStateMultiplier;
        
        console.log('DPS Calculation Results:', {
            baseDamage,
            attackSpeed,
            damagePerHit,
            baseDPS,
            levelBonusDPS,
            traitBonusDPS,
            traitMultiplier,
            gameStateMultiplier,
            effectiveDPS,
            totalDPS
        });
        
        return {
            baseDPS: Math.round(baseDPS),
            levelBonusDPS: Math.round(levelBonusDPS),
            traitBonusDPS: Math.round(traitBonusDPS),
            effectiveDPS: Math.round(effectiveDPS),
            totalDPS: Math.round(totalDPS),
            attackSpeed: attackSpeed,
            damagePerHit: damagePerHit,
            traitMultiplier: traitMultiplier,
            gameStateMultiplier: gameStateMultiplier
        };
    }
    
    calculateBaseDamage(unit, level) {
        const baseDamage = unit.stats?.damage || 100;
        const levelMultiplier = 1 + (level - 1) * 0.1;
        return Math.round(baseDamage * levelMultiplier);
    }
    
    calculateAttackSpeed(unit, level) {
        const baseSpeed = unit.stats?.spa || 1.0; // Using spa (seconds per attack) from unit stats
        const levelBonus = (level - 1) * 0.02;
        return Math.max(0.1, baseSpeed - levelBonus); // Ensure minimum attack speed
    }
} 