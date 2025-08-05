// Unit Selector Component
import { debounce } from '../utils/helpers.js';
import { getElementColor } from '../utils/helpers.js';
import { showError } from '../utils/dom.js';
import { DataValidator } from '../utils/dataValidator.js';
import { RARITIES, ELEMENTS, dataUtils } from '../config/constants.js';
import { EVOLUTION_UNITS, evolutionUtils } from '../config/evolutionUnits.js';

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
        
        // Clear existing options except "All Element"
        this.elementFilter.innerHTML = '<option value="">All Element</option>';
        
        // Add all element options from the new data structure
        ELEMENTS.forEach(element => {
            const option = document.createElement('option');
            option.value = element.value;
            option.textContent = element.label;
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
        // Use evolution units data for evolution calculator
        this.allUnits = EVOLUTION_UNITS;
        this.elementIcons = elementIcons;
        this.filteredUnits = [...this.allUnits];
        
        console.log(`UnitSelector: Loaded ${this.allUnits.length} evolution units`);
        
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
        const validator = new DataValidator(this.allUnits);
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
            option.textContent = `${unit.name} (${unit.rarity}) - ${unit.element} → ${unit.evolutionName}`;
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
        
        // 显示筛选前的单位数量
        console.log('🔍 === 筛选逻辑开始 ===');
        console.log(`📊 筛选前单位总数: ${this.allUnits.length}`);
        console.log('🎯 当前筛选条件:', { 
            searchTerm: searchTerm || '无', 
            rarityFilter: rarityFilter || 'All Rarity', 
            elementFilter: elementFilter || 'All Element' 
        });
        
        // 使用新的筛选逻辑
        this.filteredUnits = this.filterEvolutionUnits(this.allUnits, rarityFilter, elementFilter, searchTerm);
        
        // 显示筛选后的单位数量
        console.log(`📊 筛选后单位数量: ${this.filteredUnits.length}`);
        console.log(`📈 筛选效率: ${((this.filteredUnits.length / this.allUnits.length) * 100).toFixed(1)}%`);
        
        // 显示筛选结果详情
        if (this.filteredUnits.length > 0) {
            console.log('✅ 筛选结果详情:');
            this.filteredUnits.forEach((unit, index) => {
                console.log(`  ${index + 1}. ${unit.name} (${unit.rarity}, ${unit.element}) → ${unit.evolutionName}`);
            });
        } else {
            console.log('❌ 没有找到匹配的单位');
        }
        console.log('🔍 === 筛选逻辑结束 ===\n');
        
        // 更新单位计数显示
        this.updateUnitCount();
        
        // Update unit select dropdown
        if (this.unitSelect) {
            this.unitSelect.innerHTML = '<option value="">Select Unit...</option>';
            if (this.filteredUnits.length === 0) {
                // 优化空状态处理
                this.handleEmptyState(rarityFilter, elementFilter, searchTerm);
            } else {
                this.filteredUnits.forEach(unit => {
                    const option = document.createElement('option');
                    option.value = unit.id;
                    option.textContent = `${unit.name} (${unit.rarity}) - ${unit.element} → ${unit.evolutionName}`;
                    this.unitSelect.appendChild(option);
                });
            }
        }
    }
    
    // 更新单位计数显示
    updateUnitCount() {
        // 查找或创建计数显示元素
        let countDisplay = document.getElementById('unitCountDisplay');
        if (!countDisplay) {
            // 在筛选区域附近创建计数显示
            const filterSection = document.querySelector('.filter-section');
            if (filterSection) {
                countDisplay = document.createElement('div');
                countDisplay.id = 'unitCountDisplay';
                countDisplay.className = 'unit-count-display';
                filterSection.appendChild(countDisplay);
            }
        }
        
        if (countDisplay) {
            const totalUnits = this.allUnits.length;
            const filteredCount = this.filteredUnits.length;
            
            if (filteredCount === 0) {
                countDisplay.innerHTML = `
                    <div class="count-info">
                        <span class="count-text">No units found</span>
                        <span class="count-detail">(${totalUnits} total units available)</span>
                    </div>
                `;
            } else {
                countDisplay.innerHTML = `
                    <div class="count-info">
                        <span class="count-text">Found ${filteredCount} unit${filteredCount > 1 ? 's' : ''} matching your criteria</span>
                        <span class="count-detail">(${totalUnits} total units available)</span>
                    </div>
                `;
            }
        }
    }
    
    // 处理空状态
    handleEmptyState(rarityFilter, elementFilter, searchTerm) {
        // 创建友好的空状态提示
        const option = document.createElement('option');
        option.value = '';
        
        // 根据筛选条件提供不同的提示信息
        if (searchTerm) {
            option.textContent = `No units found matching "${searchTerm}"`;
        } else if (rarityFilter && elementFilter) {
            option.textContent = `No ${rarityFilter} ${elementFilter} units available`;
        } else if (rarityFilter) {
            option.textContent = `No ${rarityFilter} units available`;
        } else if (elementFilter) {
            option.textContent = `No ${elementFilter} units available`;
        } else {
            option.textContent = 'No units available';
        }
        
        this.unitSelect.appendChild(option);
        
        // 添加视觉提示
        this.showEmptyStateMessage(rarityFilter, elementFilter, searchTerm);
    }
    
    // 显示空状态消息
    showEmptyStateMessage(rarityFilter, elementFilter, searchTerm) {
        // 查找或创建空状态消息容器
        let emptyStateContainer = document.getElementById('emptyStateMessage');
        if (!emptyStateContainer) {
            emptyStateContainer = document.createElement('div');
            emptyStateContainer.id = 'emptyStateMessage';
            emptyStateContainer.className = 'empty-state-message';
            
            // 插入到单位选择器附近
            const unitSelectorContainer = document.getElementById(this.containerId);
            if (unitSelectorContainer) {
                unitSelectorContainer.appendChild(emptyStateContainer);
            }
        }
        
        // 根据筛选条件生成不同的提示信息
        let message = '';
        let icon = 'fas fa-search';
        
        if (searchTerm) {
            message = `No units found matching "${searchTerm}". Try adjusting your search terms.`;
            icon = 'fas fa-search';
        } else if (rarityFilter && elementFilter) {
            message = `No ${rarityFilter} ${elementFilter} units are available for evolution. This combination may not exist in the current data.`;
            icon = 'fas fa-info-circle';
        } else if (rarityFilter) {
            message = `No ${rarityFilter} units are available for evolution. Try selecting a different rarity.`;
            icon = 'fas fa-star';
        } else if (elementFilter) {
            message = `No ${elementFilter} units are available for evolution. Try selecting a different element.`;
            icon = 'fas fa-fire';
        } else {
            message = 'No units are currently available. This might be a data loading issue.';
            icon = 'fas fa-exclamation-triangle';
        }
        
        emptyStateContainer.innerHTML = `
            <div class="empty-state-content">
                <i class="${icon}"></i>
                <p>${message}</p>
                <button class="clear-filters-btn" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i> Clear Filters
                </button>
            </div>
        `;
        
        // 3秒后自动隐藏消息
        setTimeout(() => {
            if (emptyStateContainer.parentNode) {
                emptyStateContainer.remove();
            }
        }, 5000);
    }
    
    // 新的筛选逻辑函数
    filterEvolutionUnits(units, selectedRarity, selectedElement, searchTerm = '') {
        return units.filter(unit => {
            // 1. 只显示可进化的稀有度
            const canEvolveRarities = ['Vanguard', 'Secret', 'Exclusive', 'Mythic'];
            if (!canEvolveRarities.includes(unit.rarity)) {
                console.log(`❌ 过滤掉 ${unit.name}: 稀有度 ${unit.rarity} 不可进化`);
                return false;
            }
            
            // 2. 确保单位可以进化
            if (unit.canEvolve !== true) {
                console.log(`❌ 过滤掉 ${unit.name}: canEvolve = ${unit.canEvolve}`);
                return false;
            }
            
            // 3. 稀有度匹配
            if (selectedRarity && selectedRarity !== 'All Rarity' && unit.rarity !== selectedRarity) {
                console.log(`❌ 过滤掉 ${unit.name}: 稀有度不匹配 (${unit.rarity} !== ${selectedRarity})`);
                return false;
            }
            
            // 4. 元素匹配
            if (selectedElement && selectedElement !== 'All Element' && unit.element !== selectedElement) {
                console.log(`❌ 过滤掉 ${unit.name}: 元素不匹配 (${unit.element} !== ${selectedElement})`);
                return false;
            }
            
            // 5. 搜索词匹配
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const nameMatch = unit.name.toLowerCase().includes(searchLower);
                const evolutionMatch = unit.evolutionName.toLowerCase().includes(searchLower);
                
                if (!nameMatch && !evolutionMatch) {
                    console.log(`❌ 过滤掉 ${unit.name}: 搜索词不匹配 "${searchTerm}"`);
                    return false;
                }
            }
            
            // 6. 通过所有筛选条件
            console.log(`✅ 保留 ${unit.name}: 通过所有筛选条件`);
            return true;
        });
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
                <i class="${this.elementIcons[unit.element] || 'fas fa-question-circle'}" style="color: ${getElementColor(unit.element)}"></i>
                <h3>${unit.name}</h3>
            </div>
            <div class="unit-details">
                <p class="unit-meta">${unit.rarity} • ${unit.element} • ${unit.canEvolve ? 'Can Evolve' : 'Cannot Evolve'}</p>
                <p class="unit-evolution">→ ${unit.evolutionName}</p>
                <p class="unit-obtain">Obtain: ${unit.obtainMethod}</p>
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