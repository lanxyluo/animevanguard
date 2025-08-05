import { UnitSelector } from '../components/UnitSelector.js';
import { MaterialsList } from '../components/MaterialsList.js';
import { CostSummary } from '../components/CostSummary.js';
import { FarmingGuide } from '../components/FarmingGuide.js';
import { showError } from '../utils/dom.js';
import { validateUnitData, validateMaterialsConfig, validateElementIcons } from '../utils/validation.js';
import { EVOLUTION_UNITS, evolutionUtils } from '../config/evolutionUnits.js';
import { RARITIES, ELEMENTS, dataUtils } from '../config/constants.js';

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
        
        this.unitsData = EVOLUTION_UNITS;
        this.materialsConfig = data.materialsConfig;
        this.elementIcons = data.elementIcons;
        
        // Validate evolution data
        const evolutionValidation = evolutionUtils.validateEvolutionUnits();
        const rarityValidation = dataUtils.validateRarities();
        const elementValidation = dataUtils.validateElements();
        
        if (!evolutionValidation) {
            console.error('❌ Evolution units validation failed');
            showError('Evolution units validation failed', 'error');
            return false;
        }
        
        if (!rarityValidation) {
            console.error('❌ Rarities validation failed');
            showError('Rarities validation failed', 'error');
            return false;
        }
        
        if (!elementValidation) {
            console.error('❌ Elements validation failed');
            showError('Elements validation failed', 'error');
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
        console.log('📄 === EvolutionPage 接收单位选择 ===');
        console.log('📊 当前页面状态:', this.selectedUnit);
        console.log('🆕 新选择的单位:', unit);
        
        this.selectedUnit = unit;
        console.log('✅ 页面状态已更新:', this.selectedUnit);
        
        // Update all components with the selected unit
        console.log('🔄 更新所有组件...');
        
        if (this.materialsList) {
            console.log('📋 更新 MaterialsList 组件');
            this.materialsList.updateMaterials(unit);
        } else {
            console.error('❌ MaterialsList 组件未初始化');
        }
        
        if (this.costSummary) {
            console.log('💰 更新 CostSummary 组件');
            this.costSummary.updateCost(unit);
        } else {
            console.error('❌ CostSummary 组件未初始化');
        }
        
        if (this.farmingGuide) {
            console.log('🌾 更新 FarmingGuide 组件');
            this.farmingGuide.updateGuide(unit);
        } else {
            console.error('❌ FarmingGuide 组件未初始化');
        }
        
        console.log('📄 === EvolutionPage 单位选择处理完成 ===\n');
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