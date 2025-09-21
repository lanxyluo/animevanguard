// 使用全局变量而不是ES6模块导入
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
            traits: [],
            familiar: null
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
        // 全局事件绑定
        console.log('DPS Calculator events bound successfully');
        
        // 窗口大小变化处理
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // 键盘快捷键
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleResize() {
        // 处理窗口大小变化
        console.log('Window resized, recalculating...');
        this.updateCalculation();
    }

    handleKeydown(event) {
        // 键盘快捷键处理
        if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            this.resetCalculator();
        }
    }

    resetCalculator() {
        // 重置计算器
        this.state = {
            selectedUnit: null,
            level: 1,
            upgradeLevel: 0,
            traits: [],
            familiar: null
        };
        
        // 重置UI
        const levelSlider = document.getElementById('level-slider');
        const levelValue = document.getElementById('level-value');
        const upgradeSelect = document.getElementById('upgrade-select');
        
        if (levelSlider) levelSlider.value = 1;
        if (levelValue) levelValue.textContent = '1';
        if (upgradeSelect) upgradeSelect.value = 0;
        
        // 清除选中状态
        document.querySelectorAll('#unit-grid > div').forEach(el => {
            el.classList.remove('ring-2', 'ring-blue-500');
        });
        
        this.updateCalculation();
        console.log('Calculator reset');
    }

    onUnitSelect(unit) {
        this.state.selectedUnit = unit;
        this.updateCalculation();
        this.configPanel.updateForUnit(unit);
    }

    onConfigChange(config) {
        this.state = { ...this.state, ...config };
        this.updateCalculation();
    }

    updateCalculation() {
        if (!this.state.selectedUnit) return;
        
        const dpsResult = window.calculateDPS(this.state);
        this.resultsDisplay.update(dpsResult);
    }
}

// 等待数据加载完成后初始化
function initializeDPSCalculator() {
    // 检查依赖是否加载完成
    if (!window.UnitDatabaseData || !window.UnitSelector || !window.ConfigPanel || !window.ResultsDisplay || !window.calculateDPS) {
        console.log('Waiting for dependencies to load...');
        setTimeout(initializeDPSCalculator, 100);
        return;
    }

    try {
        console.log('Initializing DPS Calculator...');
        new DPSCalculator();
        console.log('✅ DPS Calculator initialized successfully!');
    } catch (error) {
        console.error('❌ Failed to initialize DPS Calculator:', error);
        console.error('Error details:', error.stack);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeDPSCalculator();
});
