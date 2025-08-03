// Unit Selector Component
import { debounce } from '../utils/helpers.js';
import { getElementColor } from '../utils/helpers.js';
import { showError } from '../utils/dom.js';
import { DataValidator } from '../utils/dataValidator.js';

export class UnitSelector {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = {
            onUnitSelect: null,
            showFilters: true,
            showSearch: true,
            debounceDelay: 300,
            ...options
        };
        
        this.currentUnit = null;
        this.filteredUnits = [];
        this.allUnits = [];
        
        // DOM elements
        this.unitSearch = null;
        this.rarityFilter = null;
        this.elementFilter = null;
        this.unitSelect = null;
        this.unitPlaceholder = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`UnitSelector: Container with id "${this.containerId}" not found`);
            return;
        }
        
        this.findExistingElements();
        this.populateElementFilter();
        this.bindEvents();
        this.render();
    }
    
    findExistingElements() {
        // Find existing elements in the HTML structure
        this.unitSearch = document.getElementById('unitSearch');
        this.rarityFilter = document.getElementById('rarityFilter');
        this.elementFilter = document.getElementById('elementFilter');
        this.unitSelect = document.getElementById('unitSelect');
        this.unitPlaceholder = document.getElementById('unitPlaceholder');
        
        console.log('UnitSelector elements found:', {
            unitSearch: !!this.unitSearch,
            rarityFilter: !!this.rarityFilter,
            elementFilter: !!this.elementFilter,
            unitSelect: !!this.unitSelect,
            unitPlaceholder: !!this.unitPlaceholder
        });
    }
    
    populateElementFilter() {
        if (!this.elementFilter) return;
        
        // Clear existing options except "All Elements"
        this.elementFilter.innerHTML = '<option value="">All Elements</option>';
        
        // Add all element options
        const elements = [
            'Fire', 'Water', 'Earth', 'Wind', 'Light', 'Dark', 'Cosmic',
            'Giant', 'Blast', 'Nuclear', 'Electric', 'Ice', 'Poison', 'Psychic', 'Physical'
        ];
        
        elements.forEach(element => {
            const option = document.createElement('option');
            option.value = element;
            option.textContent = element;
            this.elementFilter.appendChild(option);
        });
    }
    
    bindEvents() {
        if (this.unitSearch) {
            this.unitSearch.addEventListener('input', debounce(this.handleSearch.bind(this), this.options.debounceDelay));
        }
        
        if (this.rarityFilter) {
            this.rarityFilter.addEventListener('change', this.handleFilter.bind(this));
        }
        
        if (this.elementFilter) {
            this.elementFilter.addEventListener('change', this.handleFilter.bind(this));
        }
        
        if (this.unitSelect) {
            this.unitSelect.addEventListener('change', this.handleUnitSelect.bind(this));
        }
    }
    
    setUnits(unitsData, elementIcons) {
        this.allUnits = Object.values(unitsData);
        this.elementIcons = elementIcons;
        this.filteredUnits = [...this.allUnits];
        
        console.log(`UnitSelector: Loaded ${this.allUnits.length} units`);
        
        // 数据统计和验证
        this.analyzeDataDistribution();
        this.validateDataCompleteness();
        
        this.populateUnitSelect();
    }
    
    analyzeDataDistribution() {
        const rarityCount = {};
        const elementCount = {};
        const rarityElementCount = {};
        
        this.allUnits.forEach(unit => {
            // 统计稀有度
            rarityCount[unit.rarity] = (rarityCount[unit.rarity] || 0) + 1;
            
            // 统计元素
            elementCount[unit.element] = (elementCount[unit.element] || 0) + 1;
            
            // 统计稀有度+元素组合
            const key = `${unit.rarity} + ${unit.element}`;
            rarityElementCount[key] = (rarityElementCount[key] || 0) + 1;
        });
        
        console.log('=== 数据分布统计 ===');
        console.log('稀有度分布:', rarityCount);
        console.log('元素分布:', elementCount);
        console.log('稀有度+元素组合分布:', rarityElementCount);
        console.log('=== 统计结束 ===');
    }
    
    validateDataCompleteness() {
        console.log('\n🔍 开始数据完整性验证...');
        const validator = new DataValidator(this.unitsData);
        const results = validator.validateData();
        
        // 生成对比表
        validator.generateComparisonTable();
        
        // 如果发现问题，在控制台显示警告
        if (results.potentialIssues.length > 0) {
            console.warn('⚠️ 发现潜在问题，请检查Wiki数据是否完整！');
        }
        
        return results;
    }
    
    populateUnitSelect() {
        if (!this.unitSelect) return;
        
        // Clear existing options except "Select Unit..."
        this.unitSelect.innerHTML = '<option value="">Select Unit...</option>';
        
        // Add unit options
        this.allUnits.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${unit.name} (${unit.evolution})`;
            this.unitSelect.appendChild(option);
        });
    }
    
    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        this.filterAndDisplayUnits(searchTerm);
    }
    
    handleFilter() {
        this.filterAndDisplayUnits();
    }
    
    handleUnitSelect(e) {
        const unitId = e.target.value;
        if (unitId) {
            const unit = this.allUnits.find(u => u.id === unitId);
            if (unit) {
                this.selectUnit(unit);
            }
        } else {
            this.clearSelection();
        }
    }
    
    filterAndDisplayUnits(searchTerm = '') {
        const rarityFilter = this.rarityFilter ? this.rarityFilter.value : '';
        const elementFilter = this.elementFilter ? this.elementFilter.value : '';
        
        this.filteredUnits = this.allUnits.filter(unit => {
            const matchesSearch = !searchTerm || 
                unit.name.toLowerCase().includes(searchTerm) ||
                unit.description.toLowerCase().includes(searchTerm);
            
            const matchesRarity = !rarityFilter || unit.rarity === rarityFilter;
            const matchesElement = !elementFilter || unit.element === elementFilter;
            
            return matchesSearch && matchesRarity && matchesElement;
        });
        
        // 调试输出
        console.log('筛选条件:', { searchTerm, rarityFilter, elementFilter });
        console.log('筛选后剩余单元数量:', this.filteredUnits.length);
        console.log('筛选结果详情:', this.filteredUnits.map(u => `${u.name} (${u.rarity}, ${u.element})`));
        
        // Update unit select dropdown
        if (this.unitSelect) {
            this.unitSelect.innerHTML = '<option value="">Select Unit...</option>';
            if (this.filteredUnits.length === 0) {
                // 空结果提示
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'No units available';
                this.unitSelect.appendChild(option);
            } else {
                this.filteredUnits.forEach(unit => {
                    const option = document.createElement('option');
                    option.value = unit.id;
                    option.textContent = `${unit.name} (${unit.evolution})`;
                    this.unitSelect.appendChild(option);
                });
            }
        }
    }
    
    selectUnit(unit) {
        this.currentUnit = unit;
        this.updateUnitCard(unit);
        
        if (this.options.onUnitSelect) {
            this.options.onUnitSelect(unit);
        }
    }
    
    clearSelection() {
        this.currentUnit = null;
        if (this.unitPlaceholder) {
            this.unitPlaceholder.style.display = 'block';
        }
    }
    
    updateUnitCard(unit) {
        if (!this.unitPlaceholder) return;
        
        this.unitPlaceholder.style.display = 'none';
        
        // Create unit card
        const unitCard = document.createElement('div');
        unitCard.className = 'unit-card selected';
        unitCard.innerHTML = `
            <div class="unit-header">
                <i class="${unit.icon}" style="color: ${getElementColor(unit.element)}"></i>
                <h3>${unit.name} (${unit.evolution})</h3>
            </div>
            <div class="unit-details">
                <p class="unit-meta">${unit.rarity} • ${unit.element} • ${unit.type}</p>
                <p class="unit-description">${unit.description}</p>
            </div>
        `;
        
        // Replace placeholder with unit card
        this.unitPlaceholder.parentNode.insertBefore(unitCard, this.unitPlaceholder);
    }
    
    getCurrentUnit() {
        return this.currentUnit;
    }
    
    getFilteredUnits() {
        return this.filteredUnits;
    }
    
    clearFilters() {
        if (this.unitSearch) this.unitSearch.value = '';
        if (this.rarityFilter) this.rarityFilter.value = '';
        if (this.elementFilter) this.elementFilter.value = '';
        this.filterAndDisplayUnits();
    }
    
    render() {
        // Component is already rendered in HTML
        console.log('UnitSelector: Using existing HTML structure');
    }
    
    destroy() {
        // Clean up event listeners
        if (this.unitSearch) {
            this.unitSearch.removeEventListener('input', this.handleSearch);
        }
        if (this.rarityFilter) {
            this.rarityFilter.removeEventListener('change', this.handleFilter);
        }
        if (this.elementFilter) {
            this.elementFilter.removeEventListener('change', this.handleFilter);
        }
        if (this.unitSelect) {
            this.unitSelect.removeEventListener('change', this.handleUnitSelect);
        }
    }
} 