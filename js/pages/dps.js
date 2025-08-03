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
        this.traitsData = null;
        this.gameStatesData = null;
        
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
        this.traitsData = data.traitsData;
        this.gameStatesData = data.gameStatesData;
        
        // Initialize DPS Calculator
        this.dpsCalculator = new AnimeVanguardsDPSCalculator(this.traitsData, this.gameStatesData);
        
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
        
        // Populate game state select if it exists
        if (this.elements.gameState) {
            this.populateGameStateOptions();
        }
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
                if (this.selectedUnit) {
                    this.calculateDPS();
                }
            });
        } else {
            console.warn('Game state element not found');
        }
        
        // Trait selection
        if (this.elements.traitSelect) {
            this.elements.traitSelect.addEventListener('change', (e) => {
                this.selectedTrait = e.target.value;
                if (this.selectedUnit) {
                    this.calculateDPS();
                }
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
        
        this.selectedUnit = this.unitsData[unitId];
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
        
        traitSelect.innerHTML = '';
        
        if (!this.traitsData) {
            console.warn('Traits data not available');
            return;
        }
        
        // Add all available traits including no_trait
        Object.entries(this.traitsData).forEach(([traitId, trait]) => {
            const option = document.createElement('option');
            option.value = traitId;
            option.textContent = `${trait.name} (${trait.description})`;
            traitSelect.appendChild(option);
        });
        
        console.log('Updated trait options with', Object.keys(this.traitsData).length, 'traits');
    }
    
    populateGameStateOptions() {
        const gameStateSelect = this.elements.gameState;
        if (!gameStateSelect) return;
        
        gameStateSelect.innerHTML = '';
        
        if (!this.gameStatesData) {
            console.warn('Game states data not available');
            return;
        }
        
        // Add all available game states
        Object.entries(this.gameStatesData).forEach(([stateId, state]) => {
            const option = document.createElement('option');
            option.value = stateId;
            option.textContent = `${state.name} (${state.description})`;
            gameStateSelect.appendChild(option);
        });
        
        console.log('Updated game state options with', Object.keys(this.gameStatesData).length, 'states');
    }
    
    calculateDPS() {
        if (!this.selectedUnit) {
            showError('Please select a unit first', 'warning');
            return;
        }
        
        try {
            console.log('Calculating DPS for unit:', this.selectedUnit.name, 'at level:', this.currentLevel);
            
            // Get enemy count from input
            const enemyCount = parseInt(this.elements.enemyCount?.value || 1);
            
            // Calculate DPS using the calculator
            const dpsResult = this.dpsCalculator.calculateDPS({
                unit: this.selectedUnit,
                level: this.currentLevel,
                trait: this.selectedTrait,
                gameState: this.gameState,
                enemies: enemyCount
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
                <span>${result.base_dps.toLocaleString()}</span>
            </div>
            <div class="dps-result-item">
                <span>Trait Bonus:</span>
                <span>${result.trait_bonus}</span>
            </div>
            <div class="dps-result-item">
                <span>Placement Limit:</span>
                <span>${result.placement_limit}</span>
            </div>
            <div class="dps-result-item total">
                <span>Total DPS:</span>
                <span>${result.base_dps.toLocaleString()}</span>
            </div>
        `;
        
        // Update breakdown section
        const breakdownDiv = document.querySelector('.dps-breakdown');
        if (breakdownDiv) {
            breakdownDiv.innerHTML = `
                <h4>DPS Breakdown</h4>
                <div class="breakdown-item">
                    <span>Damage per Hit:</span>
                    <span>${result.damage_per_hit.toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span>Attack Speed:</span>
                    <span>${result.attack_speed}s</span>
                </div>
                <div class="breakdown-item">
                    <span>Hits per Second:</span>
                    <span>${result.hits_per_second}</span>
                </div>
                <div class="breakdown-item">
                    <span>Attack Range:</span>
                    <span>${result.range}</span>
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
        
        // Ensure trait options are populated
        if (this.isInitialized && this.elements.traitSelect) {
            this.updateTraitOptions();
        }
        
        // Ensure game state options are populated
        if (this.isInitialized && this.elements.gameState) {
            this.populateGameStateOptions();
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
        this.traitsData = newData.traitsData || this.traitsData;
        this.gameStatesData = newData.gameStatesData || this.gameStatesData;
        
        // Re-populate unit select if already initialized
        if (this.isInitialized) {
            this.populateUnitSelect();
            this.updateTraitOptions();
            this.populateGameStateOptions();
        }
    }
}

// DPS Calculator Class
class AnimeVanguardsDPSCalculator {
    constructor(traitsData, gameStatesData) {
        this.traitsData = traitsData;
        this.gameStatesData = gameStatesData;
    }
    calculateDPS(params) {
        const { unit, level, trait, gameState, enemies = 1 } = params;
        
        console.log('DPS Calculator - Unit:', unit.name, 'Level:', level, 'Trait:', trait, 'Game State:', gameState, 'Enemies:', enemies);
        console.log('Unit stats:', unit.stats);
        
        // Get trait data
        const traitData = trait && this.traitsData ? this.traitsData[trait] : null;
        console.log('Trait data:', traitData);
        
        // Get game state data
        const gameStateData = gameState && this.gameStatesData ? this.gameStatesData[gameState] : null;
        console.log('Game state data:', gameStateData);
        
        // Base stats
        let baseDamage = unit.stats?.damage || unit.base_damage || 100;
        let baseAttackSpeed = unit.stats?.spa || unit.base_attack_speed || 1.0;
        let baseRange = unit.stats?.range || unit.base_range || 1.0;
        
        // Level bonus (1-12)
        let levelMultiplier = 1 + (level - 1) * (unit.level_scaling || 0.1);
        
        // Trait bonuses
        let traitDamageMultiplier = traitData ? traitData.damage_multiplier || 1.0 : 1.0;
        let traitSpaMultiplier = traitData ? traitData.spa_multiplier || 1.0 : 1.0;
        let traitRangeMultiplier = traitData ? traitData.range_multiplier || 1.0 : 1.0;
        
        // Calculate final values
        let finalDamage = baseDamage * levelMultiplier * traitDamageMultiplier;
        let finalAttackSpeed = baseAttackSpeed * traitSpaMultiplier;
        let finalRange = baseRange * traitRangeMultiplier;
        
        // Critical hit calculation (for Deadeye trait)
        if (traitData && traitData.crit_chance) {
            let critMultiplier = 1 + (traitData.crit_chance * traitData.crit_damage);
            finalDamage *= critMultiplier;
        }
        
        // Calculate DPS
        let dps = finalDamage / finalAttackSpeed;
        
        // Enemy count effect (multi-target attacks)
        if (unit.aoe_type === "multi_target") {
            dps *= Math.min(enemies, unit.max_targets || 6);
        }
        
        // Game state effect (Nightmare mode enemies are stronger but don't affect unit DPS)
        // Note: Game state multiplier is applied to effective DPS, not base DPS
        
        console.log('DPS Calculation Results:', {
            baseDamage,
            baseAttackSpeed,
            baseRange,
            levelMultiplier,
            traitDamageMultiplier,
            traitSpaMultiplier,
            traitRangeMultiplier,
            finalDamage,
            finalAttackSpeed,
            finalRange,
            dps,
            enemies,
            unit_aoe_type: unit.aoe_type,
            max_targets: unit.max_targets
        });
        
        return {
            base_dps: Math.round(dps),
            damage_per_hit: Math.round(finalDamage),
            attack_speed: parseFloat(finalAttackSpeed.toFixed(2)),
            hits_per_second: parseFloat((1 / finalAttackSpeed).toFixed(2)),
            range: Math.round(finalRange),
            trait_bonus: traitData ? traitData.name : 'No Trait',
            placement_limit: traitData ? (traitData.placement_limit || 'No Limit') : 'No Limit'
        };
    }
    

} 