/**
 * Filter Panel Component
 * Handles search, filters, and quick filter functionality
 */
export class FilterPanel {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            onFilterChange: () => {},
            onSearchChange: () => {},
            onQuickFilterChange: () => {},
            ...options
        };
        
        this.currentFilters = {
            searchText: '',
            rarity: '',
            element: '',
            unitType: '',
            role: ''
        };
        
        this.quickFilters = {
            popular: { label: 'Popular', icon: 'fas fa-fire', active: false },
            highDPS: { label: 'High DPS', icon: 'fas fa-bolt', active: false },
            latest: { label: 'Latest', icon: 'fas fa-star', active: false },
            beginner: { label: 'Beginner Friendly', icon: 'fas fa-bullseye', active: false }
        };
        
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="search-container">
                <div class="search-input-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="searchInput" class="search-input" placeholder="Search units by name, description...">
                    <button id="clearSearchBtn" class="clear-search-btn" style="display: none;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="filter-controls">
                <div class="filter-row">
                    <div class="filter-group">
                        <label for="rarityFilter">Rarity:</label>
                        <select id="rarityFilter" class="filter-select">
                            <option value="">All Rarity</option>
                            <option value="Rare">Rare</option>
                            <option value="Epic">Epic</option>
                            <option value="Legendary">Legendary</option>
                            <option value="Mythic">Mythic</option>
                            <option value="Exclusive">Exclusive</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="elementFilter">Element:</label>
                        <select id="elementFilter" class="filter-select">
                            <option value="">All Elements</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Wind">Wind</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Dark">Dark</option>
                            <option value="Light">Light</option>
                            <option value="Physical">Physical</option>
                            <option value="Energy">Energy</option>
                            <option value="Soul">Soul</option>
                            <option value="Earth">Earth</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="unitTypeFilter">Unit Type:</label>
                        <select id="unitTypeFilter" class="filter-select">
                            <option value="">All Types</option>
                            <option value="DPS">DPS</option>
                            <option value="Support">Support</option>
                            <option value="Tank">Tank</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="roleFilter">Role:</label>
                        <select id="roleFilter" class="filter-select">
                            <option value="">All Roles</option>
                            <option value="Melee">Melee</option>
                            <option value="Ranged">Ranged</option>
                            <option value="Magic">Magic</option>
                        </select>
                    </div>
                </div>
                
                <div class="quick-filter-tags">
                    ${Object.entries(this.quickFilters).map(([key, filter]) => `
                        <button class="quick-filter-tag" data-filter="${key}">
                            <i class="${filter.icon}"></i> ${filter.label}
                        </button>
                    `).join('')}
                </div>
                
                <div id="activeFilters" class="active-filters" style="display: none;">
                    <!-- Active filters will be displayed here -->
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        // Search input
        const searchInput = this.container.querySelector('#searchInput');
        const clearSearchBtn = this.container.querySelector('#clearSearchBtn');
        
        searchInput.addEventListener('input', (e) => {
            this.currentFilters.searchText = e.target.value;
            this.updateClearSearchButton();
            this.options.onSearchChange(this.currentFilters.searchText);
        });
        
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            this.currentFilters.searchText = '';
            this.updateClearSearchButton();
            this.options.onSearchChange('');
        });
        
        // Filter selects
        const filterSelects = this.container.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                const filterType = e.target.id.replace('Filter', '').toLowerCase();
                this.currentFilters[filterType] = e.target.value;
                this.updateActiveFilters();
                this.options.onFilterChange(this.currentFilters);
            });
        });
        
        // Quick filter tags
        const quickFilterTags = this.container.querySelectorAll('.quick-filter-tag');
        quickFilterTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                const filterKey = e.currentTarget.dataset.filter;
                this.toggleQuickFilter(filterKey);
            });
        });
    }
    
    updateClearSearchButton() {
        const clearSearchBtn = this.container.querySelector('#clearSearchBtn');
        const searchInput = this.container.querySelector('#searchInput');
        
        if (this.currentFilters.searchText.trim()) {
            clearSearchBtn.style.display = 'block';
        } else {
            clearSearchBtn.style.display = 'none';
        }
    }
    
    toggleQuickFilter(filterKey) {
        const tag = this.container.querySelector(`[data-filter="${filterKey}"]`);
        this.quickFilters[filterKey].active = !this.quickFilters[filterKey].active;
        
        if (this.quickFilters[filterKey].active) {
            tag.classList.add('active');
        } else {
            tag.classList.remove('active');
        }
        
        this.options.onQuickFilterChange(this.quickFilters);
    }
    
    updateActiveFilters() {
        const activeFiltersContainer = this.container.querySelector('#activeFilters');
        const activeFilters = Object.entries(this.currentFilters)
            .filter(([key, value]) => value && key !== 'searchText');
        
        if (activeFilters.length === 0) {
            activeFiltersContainer.style.display = 'none';
            return;
        }
        
        activeFiltersContainer.style.display = 'flex';
        activeFiltersContainer.innerHTML = `
            ${activeFilters.map(([key, value]) => `
                <span class="active-filter-tag">
                    ${this.getFilterLabel(key)}: ${value}
                    <button class="remove-filter-btn" data-filter="${key}">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            `).join('')}
            <button class="clear-all-filters-btn">
                <i class="fas fa-trash"></i> Clear All
            </button>
        `;
        
        // Bind remove filter events
        const removeFilterBtns = activeFiltersContainer.querySelectorAll('.remove-filter-btn');
        removeFilterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterKey = e.currentTarget.dataset.filter;
                this.removeFilter(filterKey);
            });
        });
        
        // Bind clear all filters event
        const clearAllBtn = activeFiltersContainer.querySelector('.clear-all-filters-btn');
        clearAllBtn.addEventListener('click', () => {
            this.clearAllFilters();
        });
    }
    
    removeFilter(filterKey) {
        this.currentFilters[filterKey] = '';
        const select = this.container.querySelector(`#${filterKey}Filter`);
        if (select) {
            select.value = '';
        }
        this.updateActiveFilters();
        this.options.onFilterChange(this.currentFilters);
    }
    
    clearAllFilters() {
        this.currentFilters = {
            searchText: this.currentFilters.searchText, // Keep search text
            rarity: '',
            element: '',
            unitType: '',
            role: ''
        };
        
        // Reset all filter selects
        const filterSelects = this.container.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.value = '';
        });
        
        // Reset quick filters
        Object.keys(this.quickFilters).forEach(key => {
            this.quickFilters[key].active = false;
        });
        
        const quickFilterTags = this.container.querySelectorAll('.quick-filter-tag');
        quickFilterTags.forEach(tag => {
            tag.classList.remove('active');
        });
        
        this.updateActiveFilters();
        this.options.onFilterChange(this.currentFilters);
        this.options.onQuickFilterChange(this.quickFilters);
    }
    
    getFilterLabel(key) {
        const labels = {
            rarity: 'Rarity',
            element: 'Element',
            unitType: 'Type',
            role: 'Role'
        };
        return labels[key] || key;
    }
    
    getFilters() {
        return {
            ...this.currentFilters,
            quickFilters: this.quickFilters
        };
    }
    
    setFilters(filters) {
        this.currentFilters = { ...filters };
        this.updateActiveFilters();
        this.updateClearSearchButton();
    }
}
