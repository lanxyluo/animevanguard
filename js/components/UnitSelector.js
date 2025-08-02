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
        this.populateUnitSelect();
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
        
        // Update unit select dropdown
        if (this.unitSelect) {
            this.unitSelect.innerHTML = '<option value="">Select Unit...</option>';
            this.filteredUnits.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit.id;
                option.textContent = `${unit.name} (${unit.evolution})`;
                this.unitSelect.appendChild(option);
            });
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
} 