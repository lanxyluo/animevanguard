import { UnitSelector } from '../components/UnitSelector.js';
import { MaterialsList } from '../components/MaterialsList.js';
import { CostSummary } from '../components/CostSummary.js';
import { FarmingGuide } from '../components/FarmingGuide.js';
import { showError } from '../utils/dom.js';
import { validateUnitData, validateMaterialsConfig, validateElementIcons } from '../utils/validation.js';

export class EvolutionPage {
    constructor(app) {
        this.app = app;
        this.isInitialized = false;
        
        // Component instances
        this.unitSelector = null;
        this.materialsList = null;
        this.costSummary = null;
        this.farmingGuide = null;
        
        // Data
        this.unitsData = null;
        this.materialsConfig = null;
        this.elementIcons = null;
        
        // Current state
        this.selectedUnit = null;
    }
    
    async initialize(data) {
        console.log('🚀 Initializing Evolution Page...');
        
        this.unitsData = data.unitsData;
        this.materialsConfig = data.materialsConfig;
        this.elementIcons = data.elementIcons;
        
        // Validate data
        const unitValidation = validateUnitData(this.unitsData);
        const materialValidation = validateMaterialsConfig(this.materialsConfig);
        const iconValidation = validateElementIcons(this.elementIcons);
        
        if (!unitValidation.isValid) {
            console.error('❌ Unit data validation failed:', unitValidation.errors);
            showError('Unit data validation failed', 'error');
            return false;
        }
        
        if (!materialValidation.isValid) {
            console.error('❌ Materials validation failed:', materialValidation.errors);
            showError('Materials validation failed', 'error');
            return false;
        }
        
        if (!iconValidation.isValid) {
            console.error('❌ Element icons validation failed:', iconValidation.errors);
            showError('Element icons validation failed', 'error');
            return false;
        }
        
        // Initialize components
        this.initializeComponents();
        
        this.isInitialized = true;
        console.log('✅ Evolution Page initialized!');
        return true;
    }
    
    initializeComponents() {
        // Initialize Unit Selector
        this.unitSelector = new UnitSelector('unitSelectorContainer', {
            onUnitSelect: this.handleUnitSelect.bind(this),
            showFilters: true,
            showSearch: true,
            debounceDelay: 300
        });
        
        // Initialize Materials List
        this.materialsList = new MaterialsList('materialsListContainer', {
            showRarity: true,
            showDescription: true,
            showQuantity: true
        });
        
        // Initialize Cost Summary
        this.costSummary = new CostSummary('costSummaryContainer', {
            showBreakdown: true,
            showTotal: true,
            currency: 'Gold'
        });
        
        // Initialize Farming Guide
        this.farmingGuide = new FarmingGuide('farmingGuideContainer', {
            showPriority: true,
            showDifficulty: true,
            showTips: true,
            showObtainMethods: true
        });
        
        // Set up component data
        this.unitSelector.setUnits(this.unitsData, this.elementIcons);
        this.materialsList.setMaterialsConfig(this.materialsConfig);
        this.costSummary.setMaterialsConfig(this.materialsConfig);
    }
    
    handleUnitSelect(unit) {
        console.log('Unit selected:', unit.name);
        this.selectedUnit = unit;
        
        // Update all components with the selected unit
        this.materialsList.updateMaterials(unit);
        this.costSummary.updateCost(unit);
        this.farmingGuide.updateGuide(unit);
        
        // Notify app about unit selection
        if (this.app && this.app.onUnitSelect) {
            this.app.onUnitSelect(unit);
        }
    }
    
    show() {
        if (!this.isInitialized) {
            console.warn('⚠️ Evolution Page not initialized');
            return;
        }
        
        console.log('📄 Showing Evolution Page');
        
        // Update page title
        document.title = 'Anime Vanguards Calculator - Evolution';
        
        // Trigger any page-specific show logic
        this.onPageShow();
    }
    
    hide() {
        console.log('📄 Hiding Evolution Page');
        
        // Trigger any page-specific hide logic
        this.onPageHide();
    }
    
    onPageShow() {
        // Page-specific logic when showing
        console.log('Evolution page shown');
    }
    
    onPageHide() {
        // Page-specific logic when hiding
        console.log('Evolution page hidden');
    }
    
    destroy() {
        console.log('🗑️ Destroying Evolution Page');
        
        // Clean up components
        if (this.unitSelector) {
            this.unitSelector.destroy();
        }
        if (this.materialsList) {
            this.materialsList.destroy();
        }
        if (this.costSummary) {
            this.costSummary.destroy();
        }
        if (this.farmingGuide) {
            this.farmingGuide.destroy();
        }
        
        this.isInitialized = false;
    }
    
    // Public API methods
    getSelectedUnit() {
        return this.selectedUnit;
    }
    
    updateData(newData) {
        this.unitsData = newData.unitsData || this.unitsData;
        this.materialsConfig = newData.materialsConfig || this.materialsConfig;
        this.elementIcons = newData.elementIcons || this.elementIcons;
        
        // Update components with new data
        if (this.unitSelector) {
            this.unitSelector.setUnits(this.unitsData, this.elementIcons);
        }
        if (this.materialsList) {
            this.materialsList.setMaterialsConfig(this.materialsConfig);
        }
        if (this.costSummary) {
            this.costSummary.setMaterialsConfig(this.materialsConfig);
        }
    }
} 