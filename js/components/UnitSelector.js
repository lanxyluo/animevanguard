// Unit Selector Component
import { debounce } from '../utils/helpers.js';
import { getElementColor } from '../utils/helpers.js';
import { showError } from '../utils/dom.js';

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
        this.unitPreview = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`UnitSelector: Container with id "${this.containerId}" not found`);
            return;
        }
        
        this.createDOM();
        this.bindEvents();
        this.render();
    }
    
    createDOM() {
        this.container.innerHTML = `
            <div class="card">
                <h2><i class="fas fa-search"></i> Unit Selection</h2>
                ${this.options.showSearch ? `
                    <div class="unit-selector">
                        <input type="text" id="unitSearch" placeholder="Search units...">
                        ${this.options.showFilters ? `
                            <select id="rarityFilter">
                                <option value="">All Rarities</option>
                                <option value="Vanguard">Vanguard</option>
                                <option value="Secret">Secret</option>
                                <option value="Mythic">Mythic</option>
                            </select>
                            <select id="elementFilter">
                                <option value="">All Elements</option>
                                <option value="Fire">Fire</option>
                                <option value="Water">Water</option>
                                <option value="Cosmic">Cosmic</option>
                                <option value="Giant">Giant</option>
                            </select>
                        ` : ''}
                    </div>
                ` : ''}
                <div id="unitPreview" class="unit-info">
                    <div class="unit-avatar">
                        <i class="fas fa-question"></i>
                    </div>
                    <div>
                        <h3>No unit selected</h3>
                        <p>Select a unit to view details and calculate evolution materials</p>
                    </div>
                </div>
            </div>
        `;
        
        // Get DOM elements
        this.unitSearch = document.getElementById('unitSearch');
        this.rarityFilter = document.getElementById('rarityFilter');
        this.elementFilter = document.getElementById('elementFilter');
        this.unitPreview = document.getElementById('unitPreview');
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
    }
    
    setUnits(unitsData, elementIcons) {
        this.allUnits = Object.values(unitsData);
        this.elementIcons = elementIcons;
        this.filteredUnits = [...this.allUnits];
        
        // Show first unit as example
        if (this.allUnits.length > 0) {
            this.selectUnit(this.allUnits[0].id);
        }
    }
    
    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        this.filterAndDisplayUnits(searchTerm);
    }
    
    handleFilter() {
        const searchTerm = this.unitSearch ? this.unitSearch.value.toLowerCase() : '';
        this.filterAndDisplayUnits(searchTerm);
    }
    
    filterAndDisplayUnits(searchTerm) {
        const rarityFilterValue = this.rarityFilter ? this.rarityFilter.value : '';
        const elementFilterValue = this.elementFilter ? this.elementFilter.value : '';
        
        this.filteredUnits = this.allUnits.filter(unit => {
            const matchesSearch = !searchTerm || 
                unit.name.toLowerCase().includes(searchTerm) ||
                unit.evolution.toLowerCase().includes(searchTerm);
            
            const matchesRarity = !rarityFilterValue || unit.rarity === rarityFilterValue;
            const matchesElement = !elementFilterValue || unit.element === elementFilterValue;
            
            return matchesSearch && matchesRarity && matchesElement;
        });
        
        // Display first filtered unit
        if (this.filteredUnits.length > 0) {
            this.selectUnit(this.filteredUnits[0].id);
        } else {
            this.showNoResults();
        }
    }
    
    selectUnit(unitId) {
        const unit = this.allUnits.find(u => u.id === unitId);
        if (!unit) {
            console.warn(`UnitSelector: Unit with id "${unitId}" not found`);
            return;
        }
        
        this.currentUnit = unit;
        this.updateUnitCard(unit);
        
        // Trigger callback
        if (this.options.onUnitSelect) {
            this.options.onUnitSelect(unit);
        }
    }
    
    updateUnitCard(unit) {
        if (!this.unitPreview) return;
        
        this.unitPreview.innerHTML = `
            <div class="unit-avatar" style="background: ${getElementColor(unit.element)}">
                <i class="${this.elementIcons[unit.element] || 'fas fa-question'}"></i>
            </div>
            <div>
                <h3>${unit.name} (${unit.evolution})</h3>
                <p><strong>${unit.rarity}</strong> • ${unit.element} • ${unit.type}</p>
                <p>${unit.description}</p>
            </div>
        `;
    }
    
    showNoResults() {
        if (!this.unitPreview) return;
        
        this.unitPreview.innerHTML = `
            <div class="unit-avatar">
                <i class="fas fa-search"></i>
            </div>
            <div>
                <h3>No units found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
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
        this.filterAndDisplayUnits('');
    }
    
    render() {
        // Component is already rendered in createDOM
    }
    
    destroy() {
        // Remove event listeners
        if (this.unitSearch) {
            this.unitSearch.removeEventListener('input', this.handleSearch);
        }
        if (this.rarityFilter) {
            this.rarityFilter.removeEventListener('change', this.handleFilter);
        }
        if (this.elementFilter) {
            this.elementFilter.removeEventListener('change', this.handleFilter);
        }
        
        // Clear container
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
} 