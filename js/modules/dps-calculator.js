// Use global variables instead of ES6 module imports
// import { UnitSelector } from './unit-selector.js';
// import { ConfigPanel } from './config-panel.js';
// import { ResultsDisplay } from './results-display.js';
// import { calculateDPS } from '../utils/calculations.js';

class DPSCalculator {
    constructor() {
        this.state = {
            selectedUnit: null,
            level: 1,
            upgradeLevel: 0,
            buffs: {}
        };
        
        this.initializeComponents();
        this.bindEvents();
    }

    initializeComponents() {
        this.unitSelector = new window.UnitSelector(this.onUnitSelect.bind(this));
        this.configPanel = new window.ConfigPanel(this.onConfigChange.bind(this));
        this.resultsDisplay = new window.ResultsDisplay();
    }

    bindEvents() {
        // Global event binding
        console.log('DPS Calculator events bound successfully');
        
        // Window resize handling
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleResize() {
        // Handle window resize
        console.log('Window resized, recalculating...');
        this.updateCalculation();
    }

    handleKeydown(event) {
        // Keyboard shortcut handling
        if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            this.resetCalculator();
        }
    }

    resetCalculator() {
        // Reset calculator
        this.state = {
            selectedUnit: null,
            level: 1,
            upgradeLevel: 0,
            buffs: {}
        };
        
        // ResetUI
        const levelSlider = document.getElementById('level-slider');
        const levelValue = document.getElementById('level-value');
        const upgradeSelect = document.getElementById('upgrade-select');
        
        if (levelSlider) levelSlider.value = 1;
        if (levelValue) levelValue.textContent = '1';
        if (upgradeSelect) upgradeSelect.value = 0;
        
        // ResetBuffOptions
        const buffCheckboxes = document.querySelectorAll('.buff-option input[type="checkbox"]');
        buffCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear selected state
        document.querySelectorAll('#unit-grid > div').forEach(el => {
            el.classList.remove('selected');
        });
        
        this.updateCalculation();
        console.log('Calculator reset');
    }

    onUnitSelect(unit) {
        console.log('🎯 DPS Calculator received unit selection:', unit.name);
        this.state.selectedUnit = unit;
        this.updateCalculation();
        this.configPanel.updateForUnit(unit);
    }

    onConfigChange(config) {
        this.state = { ...this.state, ...config };
        this.updateCalculation();
    }

    updateCalculation() {
        console.log('🔄 Updating calculation...', this.state);
        
        if (!this.state.selectedUnit) {
            console.log('❌ No unit selected');
            this.resultsDisplay.update({
                dps: 0,
                baseDamage: 0,
                attackSpeed: 0,
                range: 0,
                level: this.state.level,
                upgradeLevel: this.state.upgradeLevel,
                buffs: this.state.buffs,
                unit: null
            });
            return;
        }
        
        console.log('✅ Unit selected, calculating DPS...');
        const dpsResult = window.calculateDPS(this.state);
        console.log('📊 DPS Result:', dpsResult);
        
        // Ensure all required data is passed to results display
        const resultData = {
            ...dpsResult,
            unit: this.state.selectedUnit,
            level: this.state.level,
            upgradeLevel: this.state.upgradeLevel,
            buffs: this.state.buffs,
            // Ensure these values are explicitly set
            baseDamage: dpsResult.baseDamage || 0,
            attackSpeed: dpsResult.attackSpeed || 0,
            range: dpsResult.range || 0
        };
        
        console.log('📋 Final result data for display:', resultData);
        this.resultsDisplay.update(resultData);
    }
}

// Prevent duplicate initialization
let dpsCalculatorInitialized = false;

// Initialize after data loading is complete
function initializeDPSCalculator() {
    // Prevent duplicate initialization
    if (dpsCalculatorInitialized) {
        console.log('⏭️ DPS Calculator already initialized, skipping');
        return;
    }
    
    // Check if dependencies are loaded
    if (!window.UnitDatabaseData || !window.UnitSelector || !window.ConfigPanel || !window.ResultsDisplay || !window.calculateDPS) {
        console.log('Waiting for dependencies to load...');
        setTimeout(initializeDPSCalculator, 100);
        return;
    }

    try {
        console.log('Initializing DPS Calculator...');
        window.dpsCalculator = new DPSCalculator();
        dpsCalculatorInitialized = true;
        console.log('✅ DPS Calculator initialized successfully!');
    } catch (error) {
        console.error('❌ Failed to initialize DPS Calculator:', error);
        console.error('Error details:', error.stack);
    }
}

// Initialize after page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔗 DPS Calculator DOM loaded');
    initializeDPSCalculator();
});
