// Unit Selector Component
import { debounce } from '../utils/helpers.js';
import { getElementColor } from '../utils/helpers.js';
import { showError } from '../utils/dom.js';
import { DataValidator } from '../utils/dataValidator.js';
import { FilterOptimizer } from '../utils/filterOptimizer.js';
import { RARITIES, ELEMENTS, dataUtils } from '../config/constants.js';

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
        
        // 筛选器优化器
        this.filterOptimizer = new FilterOptimizer();
        
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
        
        // 优化筛选器
        this.filterOptimizer.optimizeUnitFilter();
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
        // Use provided units data (from Unit Database)
        this.allUnits = unitsData || [];
        this.elementIcons = elementIcons;
        this.filteredUnits = [...this.allUnits];
        
        console.log(`UnitSelector: Loaded ${this.allUnits.length} units from Unit Database`);
        
        // Data statistics and validation
        this.analyzeDataDistribution();
        this.validateDataCompleteness();
        
        this.populateUnitSelect();
    }
    
    analyzeDataDistribution() {
        const rarityCount = {};
        const elementCount = {};
        const rarityElementCount = {};
        
        this.allUnits.forEach(unit => {
            // Count rarities
            rarityCount[unit.rarity] = (rarityCount[unit.rarity] || 0) + 1;
            
            // Count elements
            elementCount[unit.element] = (elementCount[unit.element] || 0) + 1;
            
            // Count rarity + element combinations
            const key = `${unit.rarity} + ${unit.element}`;
            rarityElementCount[key] = (rarityElementCount[key] || 0) + 1;
        });
        
        console.log('=== Data Distribution Statistics ===');
        console.log('Rarity distribution:', rarityCount);
        console.log('Element distribution:', elementCount);
        console.log('Rarity + Element combination distribution:', rarityElementCount);
        console.log('=== Statistics End ===');
    }
    
    validateDataCompleteness() {
        console.log('\n🔍 Starting data completeness validation...');
        const validator = new DataValidator(this.allUnits);
        const results = validator.validateData();
        
        // Generate comparison table
        validator.generateComparisonTable();
        
        // If issues are found, display warnings in console
        if (results.potentialIssues.length > 0) {
            console.warn('⚠️ Potential issues found, please check if Wiki data is complete!');
        }
        
        return results;
    }
    
    populateUnitSelect() {
        if (!this.unitSelect) return;
        
        // Clear existing options except "Select Unit..."
        this.unitSelect.innerHTML = '<option value="">Select Unit...</option>';
        
        // Add unit options with the required format: "[Rarity] Unit Name (Series)"
        this.allUnits.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            
            // Extract series from description or use a default
            const series = this.extractSeriesFromUnit(unit);
            option.textContent = `[${unit.rarity}] ${unit.name} (${series})`;
            
            this.unitSelect.appendChild(option);
        });
    }
    
    extractSeriesFromUnit(unit) {
        // Check if this is evolution unit data or regular unit data
        const isEvolutionUnit = unit.hasOwnProperty('canEvolve') && unit.hasOwnProperty('evolutionName');
        
        if (isEvolutionUnit) {
            // For evolution units, use obtainMethod and name to determine series
            if (unit.obtainMethod) {
                if (unit.obtainMethod.includes('Red Key Quest') || unit.name.includes('Song Jinwu')) {
                    return 'Solo Leveling';
                }
                if (unit.obtainMethod.includes('Martial Island') || unit.name.includes('Roku')) {
                    return 'Dragon Ball';
                }
                if (unit.name.includes('Alocard') || unit.name.includes('Vampire')) {
                    return 'Hellsing';
                }
                if (unit.name.includes('Slime') || unit.name.includes('King')) {
                    return 'That Time I Got Reincarnated as a Slime';
                }
                if (unit.name.includes('Saber') || unit.name.includes('Black Tyrant')) {
                    return 'Fate';
                }
                if (unit.name.includes('Lfelt') || unit.name.includes('Love')) {
                    return 'Overlord';
                }
            }
            return 'Anime Vanguards';
        } else {
            // Regular unit data structure from unitsData
            if (unit.description) {
                if (unit.description.includes('Dragon Ball') || unit.name.includes('Goku') || unit.name.includes('Vegeta')) {
                    return 'Dragon Ball';
                }
                if (unit.description.includes('One Punch Man') || unit.name.includes('Saitama')) {
                    return 'One Punch Man';
                }
                if (unit.description.includes('Demon Slayer') || unit.name.includes('Tanjiro') || unit.name.includes('Zenitsu')) {
                    return 'Demon Slayer';
                }
                if (unit.description.includes('Naruto') || unit.name.includes('Naruto') || unit.name.includes('Sasuke')) {
                    return 'Naruto';
                }
                if (unit.description.includes('My Hero Academia') || unit.name.includes('Deku') || unit.name.includes('All Might')) {
                    return 'My Hero Academia';
                }
                if (unit.description.includes('Bleach') || unit.name.includes('Ichigo')) {
                    return 'Bleach';
                }
                if (unit.description.includes('One Piece') || unit.name.includes('Luffy')) {
                    return 'One Piece';
                }
                if (unit.description.includes('Fate') || unit.name.includes('Saber') || unit.name.includes('Gilgamesh')) {
                    return 'Fate';
                }
            }
            
            // Also check unit name for series identification
            if (unit.name.includes('Goku') || unit.name.includes('Vegeta')) {
                return 'Dragon Ball';
            }
            if (unit.name.includes('Saitama')) {
                return 'One Punch Man';
            }
            if (unit.name.includes('Tanjiro') || unit.name.includes('Zenitsu')) {
                return 'Demon Slayer';
            }
            if (unit.name.includes('Naruto') || unit.name.includes('Sasuke')) {
                return 'Naruto';
            }
            if (unit.name.includes('Deku') || unit.name.includes('All Might')) {
                return 'My Hero Academia';
            }
            if (unit.name.includes('Ichigo')) {
                return 'Bleach';
            }
            if (unit.name.includes('Luffy')) {
                return 'One Piece';
            }
            if (unit.name.includes('Saber') || unit.name.includes('Gilgamesh')) {
                return 'Fate';
            }
        }
        
        // Default series based on unit characteristics
        return 'Anime Vanguards';
    }
    
    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        this.filterAndDisplayUnits(searchTerm);
    }
    
    handleFilter() {
        this.filterAndDisplayUnits();
    }
    
    handleUnitSelect(e) {
        console.log('🎯 === Unit Selection Event Triggered ===');
        console.log('📝 Event object:', e);
        console.log('🎛️ Selected value:', e.target.value);
        
        const unitId = e.target.value;
        if (unitId) {
            console.log('🔍 Looking for unit ID:', unitId);
            const unit = this.allUnits.find(u => u.id === unitId);
            if (unit) {
                console.log('✅ Found unit:', unit);
                this.selectUnit(unit);
            } else {
                console.error('❌ Unit ID not found:', unitId);
            }
        } else {
            console.log('🗑️ Clear selection');
            this.clearSelection();
        }
        console.log('🎯 === Unit Selection Event Ended ===\n');
    }
    
    filterAndDisplayUnits(searchTerm = '') {
        const rarityFilter = this.rarityFilter ? this.rarityFilter.value : '';
        const elementFilter = this.elementFilter ? this.elementFilter.value : '';
        
        // Show unit count before filtering
        console.log('🔍 === Filtering Logic Started ===');
        console.log(`📊 Total units before filtering: ${this.allUnits.length}`);
        console.log('🎯 Current filter conditions:', { 
            searchTerm: searchTerm || 'None', 
            rarityFilter: rarityFilter || 'All Rarity', 
            elementFilter: elementFilter || 'All Element' 
        });
        
        // 检查是否为Evolution Ready筛选
        if (rarityFilter === 'evolution-ready') {
            this.filteredUnits = this.filterOptimizer.applyFilterPreset('evolution-ready', this.allUnits);
        } else {
            // Use new filtering logic
            this.filteredUnits = this.filterEvolutionUnits(this.allUnits, rarityFilter, elementFilter, searchTerm);
        }
        
        // 更新筛选结果计数
        this.filterOptimizer.updateFilterCount(this.filteredUnits);
        
        // Show unit count after filtering
        console.log(`📊 Units after filtering: ${this.filteredUnits.length}`);
        console.log(`📈 Filter efficiency: ${((this.filteredUnits.length / this.allUnits.length) * 100).toFixed(1)}%`);
        
        // Show filtering result details
        if (this.filteredUnits.length > 0) {
            console.log('✅ Filtering result details:');
            this.filteredUnits.forEach((unit, index) => {
                console.log(`  ${index + 1}. ${unit.name} (${unit.rarity}, ${unit.element}) → ${unit.evolutionName}`);
            });
        } else {
            console.log('❌ No matching units found');
        }
        console.log('🔍 === Filtering Logic Ended ===\n');
        
        // Update unit count display
        this.updateUnitCount();
        
        // Update unit select dropdown
        if (this.unitSelect) {
            this.unitSelect.innerHTML = '<option value="">Select Unit...</option>';
            if (this.filteredUnits.length === 0) {
                // Optimize empty state handling
                this.handleEmptyState(rarityFilter, elementFilter, searchTerm);
            } else {
                this.filteredUnits.forEach(unit => {
                    const option = document.createElement('option');
                    option.value = unit.id;
                    
                    // Use the same format as populateUnitSelect
                    const series = this.extractSeriesFromUnit(unit);
                    option.textContent = `[${unit.rarity}] ${unit.name} (${series})`;
                    
                    this.unitSelect.appendChild(option);
                });
            }
        }
    }
    
            // Update unit count display
    updateUnitCount() {
        // Find or create count display element
        let countDisplay = document.getElementById('unitCountDisplay');
        if (!countDisplay) {
            // Create count display near filter area
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
    
            // Handle empty state
    handleEmptyState(rarityFilter, elementFilter, searchTerm) {
        // Create friendly empty state message
        const option = document.createElement('option');
        option.value = '';
        
        // Provide different messages based on filter conditions
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
        
        // Add visual indicator
        this.showEmptyStateMessage(rarityFilter, elementFilter, searchTerm);
    }
    
            // Show empty state message
    showEmptyStateMessage(rarityFilter, elementFilter, searchTerm) {
        // Find or create empty state message container
        let emptyStateContainer = document.getElementById('emptyStateMessage');
        if (!emptyStateContainer) {
            emptyStateContainer = document.createElement('div');
            emptyStateContainer.id = 'emptyStateMessage';
            emptyStateContainer.className = 'empty-state-message';
            
            // Insert near unit selector
            const unitSelectorContainer = document.getElementById(this.containerId);
            if (unitSelectorContainer) {
                unitSelectorContainer.appendChild(emptyStateContainer);
            }
        }
        
        // Generate different messages based on filter conditions
        let message = '';
        let icon = 'fas fa-search';
        
        if (searchTerm) {
            message = `No units found matching "${searchTerm}". Try adjusting your search terms.`;
            icon = 'fas fa-search';
        } else if (rarityFilter && elementFilter) {
            message = `No ${rarityFilter} ${elementFilter} units with evolution paths found. This combination may not exist in the current data.`;
            icon = 'fas fa-info-circle';
        } else if (rarityFilter) {
            message = `No ${rarityFilter} units with evolution paths found. Try selecting a different rarity.`;
            icon = 'fas fa-star';
        } else if (elementFilter) {
            message = `No ${elementFilter} units with evolution paths found. Try selecting a different element.`;
            icon = 'fas fa-fire';
        } else {
            message = 'No units with evolution paths are currently available. This might be a data loading issue.';
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
        
        // Auto-hide message after 3 seconds
        setTimeout(() => {
            if (emptyStateContainer.parentNode) {
                emptyStateContainer.remove();
            }
        }, 5000);
    }
    
    // New filtering logic function for Evolution Units data
    filterEvolutionUnits(units, selectedRarity, selectedElement, searchTerm = '') {
        return units.filter(unit => {
            // 1. Only show units that can evolve (Mythic, Secret, Vanguard rarity)
            const canEvolve = unit.rarity === 'Mythic' || unit.rarity === 'Secret' || unit.rarity === 'Vanguard' || unit.canEvolve;
            if (!canEvolve) {
                console.log(`❌ 过滤掉 ${unit.name}: 不可进化 (${unit.rarity})`);
                return false;
            }
            
            // 2. Rarity match
            if (selectedRarity && selectedRarity !== 'All Rarity' && unit.rarity !== selectedRarity) {
                console.log(`❌ 过滤掉 ${unit.name}: 稀有度不匹配 (${unit.rarity} !== ${selectedRarity})`);
                return false;
            }
            
            // 3. Element match
            if (selectedElement && selectedElement !== 'All Element' && unit.element !== selectedElement) {
                console.log(`❌ 过滤掉 ${unit.name}: 元素不匹配 (${unit.element} !== ${selectedElement})`);
                return false;
            }
            
            // 4. Search term match
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const nameMatch = unit.name.toLowerCase().includes(searchLower);
                const evolutionMatch = unit.evolutionName && unit.evolutionName.toLowerCase().includes(searchLower);
                const obtainMatch = unit.obtainMethod && unit.obtainMethod.toLowerCase().includes(searchLower);
                
                if (!nameMatch && !evolutionMatch && !obtainMatch) {
                    console.log(`❌ 过滤掉 ${unit.name}: 搜索词不匹配 "${searchTerm}"`);
                    return false;
                }
            }
            
            // 5. Pass all filter conditions
            console.log(`✅ 保留 ${unit.name}: 通过所有筛选条件`);
            return true;
        });
    }
    
    selectUnit(unit) {
        console.log('🎯 === 选择单位 ===');
        console.log('📊 当前单位状态:', this.currentUnit);
        console.log('🆕 新选择的单位:', unit);
        
        this.currentUnit = unit;
        console.log('✅ 单位状态已更新:', this.currentUnit);
        
        this.updateUnitCard(unit);
        console.log('🎨 单位卡片已更新');
        
        if (this.options.onUnitSelect) {
            console.log('📞 调用回调函数 onUnitSelect');
            this.options.onUnitSelect(unit);
        } else {
            console.warn('⚠️ 未设置 onUnitSelect 回调函数');
        }
        console.log('🎯 === 选择单位完成 ===\n');
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
        
        // Check if this is evolution unit data or regular unit data
        const isEvolutionUnit = unit.hasOwnProperty('canEvolve') && unit.hasOwnProperty('evolutionName');
        
        let evolutionInfo = '';
        let obtainInfo = '';
        
        if (isEvolutionUnit) {
            evolutionInfo = `<p class="unit-evolution">→ ${unit.evolutionName}</p>`;
            obtainInfo = `<p class="unit-obtain">Obtain: ${unit.obtainMethod}</p>`;
        } else {
            // For regular units from unitsData, show evolution info if available
            if (unit.evolution) {
                evolutionInfo = `<p class="unit-evolution">→ ${unit.evolution}</p>`;
            }
            if (unit.obtainment) {
                obtainInfo = `<p class="unit-obtain">Obtain: ${unit.obtainment}</p>`;
            }
        }
        
        unitCard.innerHTML = `
            <div class="unit-header">
                <i class="${this.elementIcons[unit.element] || 'fas fa-question-circle'}" style="color: ${getElementColor(unit.element)}"></i>
                <h3>${unit.name}</h3>
            </div>
            <div class="unit-details">
                <p class="unit-meta">${unit.rarity} • ${unit.element} • ${unit.rarity === 'Mythic' || unit.rarity === 'Secret' || unit.rarity === 'Vanguard' ? 'Can Evolve' : 'Cannot Evolve'}</p>
                ${evolutionInfo}
                ${obtainInfo}
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