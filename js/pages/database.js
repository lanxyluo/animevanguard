/**
 * Filter Panel Component
 * Handles search, filters, and quick filter functionality
 */
class FilterPanel {
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
                            <option value="Epic">Epic</option>
                            <option value="Mythic">Mythic</option>
                            <option value="Secret">Secret</option>
                            <option value="Vanguard">Vanguard</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="elementFilter">Element:</label>
                        <select id="elementFilter" class="filter-select">
                            <option value="">All Elements</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Wind">Wind</option>
                            <option value="Nature">Nature</option>
                            <option value="Dark">Dark</option>
                            <option value="Holy">Holy</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="unitTypeFilter">Unit Type:</label>
                        <select id="unitTypeFilter" class="filter-select">
                            <option value="">All Types</option>
                            <option value="DPS">DPS</option>
                            <option value="Support">Support</option>
                            <option value="Farm">Farm</option>
                            <option value="Buffer">Buffer</option>
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
    
    clearSearch() {
        const searchInput = this.container.querySelector('#searchInput');
        if (searchInput) {
            searchInput.value = '';
            this.currentFilters.searchText = '';
            this.updateClearSearchButton();
        }
    }
    
    setSearchText(text) {
        const searchInput = this.container.querySelector('#searchInput');
        if (searchInput) {
            searchInput.value = text;
            this.currentFilters.searchText = text;
            this.updateClearSearchButton();
        }
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
            searchText: this.currentFilters.searchText,
            rarity: '',
            element: '',
            unitType: '',
            role: ''
        };
        
        const filterSelects = this.container.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.value = '';
        });
        
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

/**
 * Unit Card Component
 * Renders individual unit cards with all necessary information
 */
class UnitCard {
    constructor(unit, options = {}) {
        this.unit = unit;
        this.options = {
            onCardClick: () => {},
            onViewDetails: () => {},
            onSelect: () => {},
            viewMode: 'grid',
            selectable: false,
            selected: false,
            ...options
        };
        
        this.element = null;
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        const cardClass = this.options.viewMode === 'list' ? 'unit-card list-view' : 'unit-card';
        const selectedClass = this.options.selected ? ' selected' : '';
        
        this.element = document.createElement('div');
        this.element.className = cardClass + selectedClass;
        this.element.dataset.unitId = this.unit.id;
        
        this.element.innerHTML = `
            <div class="unit-card-header">
                <div class="unit-avatar">
                    ${this.getUnitAvatar()}
                </div>
                <div class="unit-info">
                    <h4 class="unit-name">${this.unit.name}</h4>
                    <div class="unit-meta">
                        <span class="rarity-badge ${this.unit.rarity.toLowerCase()}">
                            <i class="fas fa-star"></i>
                            ${this.unit.rarity}
                        </span>
                        <span class="element-badge">
                            <i class="fas fa-fire"></i>
                            ${this.unit.element}
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="unit-card-body">
                <p class="unit-description">${this.unit.description || 'A powerful unit with unique abilities.'}</p>
                <div class="unit-stats">
                    <div class="stat-item">
                        <i class="fas fa-coins stat-icon"></i>
                        <span class="stat-label">Cost</span>
                        <span class="stat-value">${this.unit.deploymentCost || 'N/A'}¥</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-arrow-up stat-icon"></i>
                        <span class="stat-label">Upgrade</span>
                        <span class="stat-value">${this.unit.maxUpgradeCost || 'N/A'}V</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-bolt stat-icon"></i>
                        <span class="stat-label">DPS</span>
                        <span class="stat-value">${this.unit.maxDPS || 'N/A'}</span>
                    </div>
                </div>
            </div>
            
            <div class="unit-card-footer">
                <div class="unit-type">
                    <i class="fas fa-user"></i>
                    ${this.unit.type || this.unit.unitType || 'Unknown'}
                </div>
                <button class="view-details-btn">
                    View Details
                    <i class="fas fa-arrow-right"></i>
                </button>
                </div>
            `;
        }
    
    bindEvents() {
        this.element.addEventListener('click', (e) => {
            if (e.target.closest('.view-details-btn')) {
                return;
            }
            this.options.onCardClick(this.unit);
        });
        
        const viewDetailsBtn = this.element.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.options.onViewDetails(this.unit);
        });
    }
    
    getUnitAvatar() {
        return this.unit.name.charAt(0).toUpperCase();
    }
    
    getStatValue(primaryKey, fallbackKey) {
        if (this.unit.stats?.[primaryKey] !== undefined) {
            return this.unit.stats[primaryKey];
        }
        if (this.unit.stats?.[fallbackKey] !== undefined) {
            return this.unit.stats[fallbackKey];
        }
        return 'N/A';
    }
    
    updateViewMode(viewMode) {
        this.options.viewMode = viewMode;
        this.element.className = `unit-card ${viewMode === 'list' ? 'list-view' : ''}${this.options.selected ? ' selected' : ''}`;
    }
    
    setSelected(selected) {
        this.options.selected = selected;
        if (selected) {
            this.element.classList.add('selected');
            } else {
            this.element.classList.remove('selected');
        }
    }
    
    setSelectable(selectable) {
        this.options.selectable = selectable;
        if (selectable) {
            this.element.style.cursor = 'pointer';
        } else {
            this.element.style.cursor = 'default';
        }
    }
    
    updateUnit(unit) {
        this.unit = unit;
        this.render();
        this.bindEvents();
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
    
    getElement() {
        return this.element;
    }
}

/**
 * Unit Card Factory
 * Creates unit cards with consistent styling and behavior
 */
class UnitCardFactory {
    static create(unit, options = {}) {
        return new UnitCard(unit, options);
    }
    
    static createBatch(units, options = {}) {
        return units.map(unit => this.create(unit, options));
    }
}


// DatabasePage class for Unit Database functionality
class DatabasePage {
    constructor(app) {
        this.app = app;
        this.isInitialized = false;
        
        // Components
        this.filterPanel = null;
        this.pagination = null;
        this.unitCards = [];
        
        // Data
        this.allUnits = [];
        this.filteredUnits = [];
        this.viewMode = 'grid'; // 'grid' or 'list'
        
        // State
        this.isLoading = false;
        this.searchTimeout = null;
        
        // Bind methods
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleQuickFilterChange = this.handleQuickFilterChange.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleViewDetails = this.handleViewDetails.bind(this);
    }
    
    async init() {
        if (this.isInitialized) return;
        
        try {
            this.showLoading();
            await this.loadUnits();
            
            // Only proceed if we have data
            if (this.allUnits && this.allUnits.length > 0) {
                this.setupComponents();
                this.render();
                this.isInitialized = true;
                this.hideLoading();
            } else {
                this.showError('No unit data available. Please check if the data file is loaded correctly.');
            }
        } catch (error) {
            console.error('Failed to initialize DatabasePage:', error);
            this.showError('Failed to load unit database. Please try again.');
        }
    }
    
    async loadUnits() {
        try {
            // Wait for UnitDatabaseData to be available
            let attempts = 0;
            const maxAttempts = 100; // 10 seconds max wait
            
            while (typeof UnitDatabaseData === 'undefined' && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (typeof UnitDatabaseData !== 'undefined') {
                this.allUnits = UnitDatabaseData.loadAllUnits();
                this.filteredUnits = [...this.allUnits];
                console.log('📊 Loaded', this.allUnits.length, 'units from Unit Database');
                console.log('📊 First few units:', this.allUnits.slice(0, 3).map(u => u.name));
                
                // Validate data structure
                if (this.allUnits.length > 0) {
                    const firstUnit = this.allUnits[0];
                    console.log('📊 Sample unit structure:', {
                        id: firstUnit.id,
                        name: firstUnit.name,
                        rarity: firstUnit.rarity,
                        deploymentCost: firstUnit.deploymentCost,
                        maxUpgradeCost: firstUnit.maxUpgradeCost
                    });
                }
            } else {
                console.error('❌ UnitDatabaseData not available after waiting');
                this.allUnits = [];
                this.filteredUnits = [];
            }
        } catch (error) {
            console.error('❌ Failed to load Unit Database data:', error);
            this.allUnits = [];
            this.filteredUnits = [];
        }
    }
    
    getSampleUnits() {
        return [
            {
                id: 1,
                name: "Naruto Uzumaki",
                rarity: "Legendary",
                element: "Wind",
                type: "DPS",
                role: "Melee",
                description: "The Seventh Hokage with incredible ninja abilities and the power of the Nine-Tails.",
                stats: { attack: 95, defense: 85, skill: 90 }
            },
            {
                id: 2,
                name: "Goku",
                rarity: "Mythic",
                element: "Energy",
                type: "DPS",
                role: "Melee",
                description: "A Saiyan warrior with the power to transform and achieve incredible strength.",
                stats: { attack: 98, defense: 88, skill: 92 }
            },
            {
                id: 3,
                name: "Luffy",
                rarity: "Legendary",
                element: "Physical",
                type: "DPS",
                role: "Melee",
                description: "The future Pirate King with the power of the Gomu Gomu no Mi Devil Fruit.",
                stats: { attack: 92, defense: 82, skill: 88 }
            },
            {
                id: 4,
                name: "Ichigo Kurosaki",
                rarity: "Legendary",
                element: "Soul",
                type: "DPS",
                role: "Melee",
                description: "A Soul Reaper with the power to protect the living world from Hollows.",
                stats: { attack: 90, defense: 80, skill: 85 }
            },
            {
                id: 5,
                name: "Edward Elric",
                rarity: "Epic",
                element: "Earth",
                type: "DPS",
                role: "Melee",
                description: "The Fullmetal Alchemist with the ability to perform alchemy without a transmutation circle.",
                stats: { attack: 85, defense: 75, skill: 90 }
            },
            {
                id: 6,
                name: "Sakura Haruno",
                rarity: "Epic",
                element: "Light",
                type: "Support",
                role: "Magic",
                description: "A medical ninja with incredible chakra control and healing abilities.",
                stats: { attack: 70, defense: 85, skill: 95 }
            },
            {
                id: 7,
                name: "Vegeta",
                rarity: "Mythic",
                element: "Energy",
                type: "DPS",
                role: "Melee",
                description: "The Prince of Saiyans with immense pride and incredible fighting power.",
                stats: { attack: 96, defense: 86, skill: 90 }
            },
            {
                id: 8,
                name: "Zoro",
                rarity: "Legendary",
                element: "Physical",
                type: "DPS",
                role: "Melee",
                description: "A master swordsman and the first mate of the Straw Hat Pirates.",
                stats: { attack: 93, defense: 83, skill: 87 }
            }
        ];
    }
    
    setupComponents() {
        const filterContainer = document.querySelector('#filterPanel');
        
        if (filterContainer) {
            this.filterPanel = new FilterPanel(filterContainer, {
                onFilterChange: this.handleFilterChange,
                onSearchChange: this.handleSearchChange,
                onQuickFilterChange: this.handleQuickFilterChange
            });
        }
    }
    
    render() {
        this.renderUnits();
    }
    
    renderUnits() {
        const unitsContainer = document.querySelector('#unitsGrid');
        if (!unitsContainer) {
            console.error('❌ Units container not found');
            return;
        }
        
        // Clear existing units
        unitsContainer.innerHTML = '';
        this.unitCards = [];
        
        // Set container class based on view mode
        unitsContainer.className = this.viewMode === 'list' ? 'units-list' : 'units-grid';
        
        // Show all filtered units (no pagination)
        const unitsToShow = this.filteredUnits;
        
        console.log(`📊 Rendering ${unitsToShow.length} units (${this.filteredUnits.length} total)`);
        
        // Create unit cards
        unitsToShow.forEach(unit => {
            const card = this.createUnitCard(unit);
            unitsContainer.appendChild(card);
        });
        
        // Update results count
        const resultsCount = document.querySelector('#resultsCount');
        if (resultsCount) {
            const count = this.filteredUnits ? this.filteredUnits.length : 0;
            resultsCount.textContent = `Found ${count} units`;
        }
        
        // Show empty state if no units
        if (unitsToShow.length === 0) {
            unitsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search empty-icon"></i>
                    <h3>No units found</h3>
                    <p>Try adjusting your search criteria or filters.</p>
                </div>
            `;
        }
    }
    
    
    createUnitCard(unit) {
        const card = document.createElement('div');
        // Add rarity and element classes for color coding
        card.className = `unit-card ${unit.rarity.toLowerCase()} ${unit.element.toLowerCase()}`;
        
        // Get first letter of unit name for avatar
        const firstLetter = unit.name.charAt(0).toUpperCase();
        
        card.innerHTML = `
            <div class="unit-avatar ${unit.rarity.toLowerCase()}">
                ${firstLetter}
            </div>
            <div class="unit-name">${unit.name}</div>
            <div class="unit-badges">
                <div class="rarity-badge ${unit.rarity.toLowerCase()}">${unit.rarity}</div>
                <div class="element-badge ${unit.element.toLowerCase()}">${unit.element}</div>
            </div>
            <div class="unit-costs">
                <div class="deployment-cost">${unit.deploymentCost}¥</div>
                <div class="upgrade-cost">Upgrade: ${unit.maxUpgradeCost}¥</div>
            </div>
            <div class="unit-description">
                ${unit.description ? unit.description.substring(0, 100) + (unit.description.length > 100 ? '...' : '') : 'No description available'}
            </div>
            <button class="view-details-btn">
                View Details
            </button>
        `;
        
        // Add click handler for view details
        const viewBtn = card.querySelector('.view-details-btn');
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showUnitDetails(unit);
        });
        
        return card;
    }
    
    showUnitDetails(unit) {
        console.log('🔍 Opening unit details for:', unit.name);
        
        try {
            // Get modal elements
            const modal = document.getElementById('unitDetailsModal');
            const modalAvatar = document.getElementById('modalAvatar');
            const modalTitle = document.getElementById('modalTitle');
            const modalBadges = document.getElementById('modalBadges');
            const modalStats = document.getElementById('modalStats');
            const modalDescription = document.getElementById('modalDescription');
            const modalPros = document.getElementById('modalPros');
            const modalCons = document.getElementById('modalCons');
            const modalObtainMethod = document.getElementById('modalObtainMethod');
            const modalAvailability = document.getElementById('modalAvailability');
            const modalEvolutionPath = document.getElementById('modalEvolutionPath');
            const modalEvolutionText = document.getElementById('modalEvolutionText');
            
            if (!modal) {
                console.error('❌ Modal element not found');
                return;
            }
            
            // Set avatar
            const firstLetter = unit.name.charAt(0).toUpperCase();
            modalAvatar.textContent = firstLetter;
            modalAvatar.className = `modal-avatar ${unit.rarity.toLowerCase()}`;
            
            // Set title
            modalTitle.textContent = unit.name;
            
            // Set badges
            modalBadges.innerHTML = `
                <div class="modal-badge rarity">${unit.rarity}</div>
                <div class="modal-badge element">${unit.element}</div>
                <div class="modal-badge tier">${unit.tier}</div>
            `;
            
            // Set stats grid
            modalStats.innerHTML = `
                <div class="modal-stat-item">
                    <div class="modal-stat-label">Deployment Cost</div>
                    <div class="modal-stat-value">${unit.deploymentCost}¥</div>
                </div>
                <div class="modal-stat-item">
                    <div class="modal-stat-label">Max Upgrade Cost</div>
                    <div class="modal-stat-value">${unit.maxUpgradeCost}¥</div>
                </div>
                <div class="modal-stat-item">
                    <div class="modal-stat-label">Cost Efficiency</div>
                    <div class="modal-stat-value">${unit.costEfficiency}</div>
                </div>
                <div class="modal-stat-item">
                    <div class="modal-stat-label">Base DPS</div>
                    <div class="modal-stat-value">${unit.baseDPS}</div>
                </div>
                <div class="modal-stat-item">
                    <div class="modal-stat-label">Range</div>
                    <div class="modal-stat-value">${unit.range}</div>
                </div>
                <div class="modal-stat-item">
                    <div class="modal-stat-label">Type</div>
                    <div class="modal-stat-value">${unit.type}</div>
                </div>
            `;
            
            // Set description
            modalDescription.textContent = unit.description;
            
            // Set pros
            modalPros.innerHTML = unit.pros.map(pro => `<li>${pro}</li>`).join('');
            
            // Set cons
            modalCons.innerHTML = unit.cons.map(con => `<li>${con}</li>`).join('');
            
            // Set additional info
            modalObtainMethod.textContent = unit.obtainMethod || 'Unknown';
            modalAvailability.textContent = unit.availability || 'Unknown';
            
            // Set evolution path if applicable
            if (unit.evolutionPath && unit.evolutionPath !== 'None') {
                modalEvolutionPath.style.display = 'block';
                modalEvolutionText.textContent = unit.evolutionPath;
            } else {
                modalEvolutionPath.style.display = 'none';
            }
            
            // Show modal with animation
            modal.style.display = 'flex';
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            
            // Force reflow
            modal.offsetHeight;
            
            setTimeout(() => {
                modal.classList.add('active');
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
            }, 10);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Add event listeners for closing
            this.setupModalEventListeners();
            
        } catch (error) {
            console.error('❌ Error opening unit details modal:', error);
        }
    }
    
    setupModalEventListeners() {
        const modal = document.getElementById('unitDetailsModal');
        const closeBtn = document.getElementById('modalCloseBtn');
        
        if (!modal || !closeBtn) return;
        
        // Close button click
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Click outside modal to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    closeModal() {
        const modal = document.getElementById('unitDetailsModal');
        if (!modal) return;
        
        // Remove active class for animation
        modal.classList.remove('active');
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        
        // Hide modal after animation
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    handleFilterChange(filters) {
        this.applyFilters(filters);
        this.render();
    }
    
    applyFilters(filters) {
        if (!this.allUnits || !Array.isArray(this.allUnits)) {
            console.warn('⚠️ No units data available for filtering');
            this.filteredUnits = [];
            return;
        }
        
        this.filteredUnits = this.allUnits.filter(unit => {
            // Search text filter
            if (filters.searchText && filters.searchText.trim()) {
                const searchText = filters.searchText.toLowerCase();
                if (!unit.name.toLowerCase().includes(searchText) && 
                    !unit.description.toLowerCase().includes(searchText)) {
                    return false;
                }
            }
            
            // Rarity filter
            if (filters.rarity && filters.rarity !== '') {
                if (unit.rarity !== filters.rarity) {
                    return false;
                }
            }
            
            // Element filter
            if (filters.element && filters.element !== '') {
                if (unit.element !== filters.element) {
                    return false;
                }
            }
            
            // Type filter
            if (filters.unitType && filters.unitType !== '') {
                if (unit.type !== filters.unitType) {
                    return false;
                }
            }
            
            // Role filter
            if (filters.role && filters.role !== '') {
                if (unit.role !== filters.role) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    applySearch(searchText) {
        if (!this.allUnits || !Array.isArray(this.allUnits)) {
            console.warn('⚠️ No units data available for searching');
            this.filteredUnits = [];
            return;
        }
        
        if (!searchText || searchText.trim() === '') {
            this.filteredUnits = [...this.allUnits];
            return;
        }
        
        const search = searchText.toLowerCase();
        this.filteredUnits = this.allUnits.filter(unit => {
            return unit.name.toLowerCase().includes(search) || 
                   unit.description.toLowerCase().includes(search) ||
                   unit.element.toLowerCase().includes(search) ||
                   unit.type.toLowerCase().includes(search);
        });
    }
    
    handleSearchChange(searchText) {
        // Debounce search
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.applySearch(searchText);
            this.render();
        }, 300);
    }
    
    handleQuickFilterChange(quickFilters) {
        this.applyQuickFilters(quickFilters);
        this.render();
    }
    
    
    handleCardClick(unit) {
        console.log('Unit clicked:', unit);
        // Handle unit card click (e.g., show unit details modal)
    }
    
    handleViewDetails(unit) {
        console.log('View details clicked:', unit);
        // Handle view details (e.g., navigate to unit details page)
        this.app.navigateTo(`/unit/${unit.id}`);
    }
    
    applyFilters(filters) {
        this.filteredUnits = this.allUnits.filter(unit => {
            return (
                (!filters.rarity || unit.rarity === filters.rarity) &&
                (!filters.element || unit.element === filters.element) &&
                (!filters.unitType || unit.type === filters.unitType) &&
                (!filters.role || unit.role === filters.role)
            );
        });
    }
    
    applySearch(searchText) {
        if (!searchText.trim()) {
            this.filteredUnits = [...this.allUnits];
            return;
        }
        
        const searchLower = searchText.toLowerCase();
        this.filteredUnits = this.allUnits.filter(unit => {
            return (
                unit.name.toLowerCase().includes(searchLower) ||
                (unit.description && unit.description.toLowerCase().includes(searchLower)) ||
                unit.element.toLowerCase().includes(searchLower) ||
                unit.type.toLowerCase().includes(searchLower) ||
                (unit.tags && unit.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            );
        });
    }
    
    applyQuickFilters(quickFilters) {
        // Reset to all units first
        this.filteredUnits = [...this.allUnits];
        
        // Apply quick filters
        Object.entries(quickFilters).forEach(([key, filter]) => {
            if (filter.active) {
                switch (key) {
                    case 'popular':
                        // Sort by tier (BROKEN > META > SUB-META > DECENT)
                        const tierOrder = { 'BROKEN': 4, 'META': 3, 'SUB-META': 2, 'DECENT': 1 };
                        this.filteredUnits.sort((a, b) => (tierOrder[b.tier] || 0) - (tierOrder[a.tier] || 0));
                        break;
                    case 'highDPS':
                        // Filter for high DPS units (extract numeric value from maxDPS)
                        this.filteredUnits = this.filteredUnits.filter(unit => {
                            const dpsValue = parseInt(unit.maxDPS?.replace(/\D/g, '') || '0');
                            return dpsValue > 100000; // 100k+ DPS
                        });
                        break;
                    case 'latest':
                        // Sort by rarity (Vanguard > Secret > Mythic > Epic)
                        const rarityOrder = { 'Vanguard': 4, 'Secret': 3, 'Mythic': 2, 'Epic': 1 };
                        this.filteredUnits.sort((a, b) => (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0));
                        break;
                    case 'beginner':
                        // Filter for lower cost units (beginner friendly)
                        this.filteredUnits = this.filteredUnits.filter(unit => 
                            unit.deploymentCost <= 2000
                        );
                        break;
                }
            }
        });
    }
    
    toggleViewMode() {
        this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
        
        // Update view mode for all cards
        this.unitCards.forEach(card => {
            card.updateViewMode(this.viewMode);
        });
        
        // Update view mode button
        const viewModeBtn = document.querySelector('#viewModeBtn');
        if (viewModeBtn) {
            const icon = viewModeBtn.querySelector('i');
            if (this.viewMode === 'grid') {
                icon.className = 'fas fa-list';
                viewModeBtn.title = 'Switch to List View';
            } else {
                icon.className = 'fas fa-th';
                viewModeBtn.title = 'Switch to Grid View';
            }
        }
    }
    
    scrollToTop() {
        const unitsContainer = document.querySelector('#unitsGrid');
        if (unitsContainer) {
            unitsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    showLoading() {
        const unitsContainer = document.querySelector('#unitsGrid');
        if (unitsContainer) {
            unitsContainer.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Loading units...</p>
                </div>
            `;
        }
    }
    
    hideLoading() {
        // Loading state will be replaced by renderUnits()
    }
    
    showError(message) {
        const unitsContainer = document.querySelector('#unitsGrid');
        if (unitsContainer) {
            unitsContainer.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle error-icon"></i>
                    <h3>Error</h3>
                    <p>${message}</p>
                    <button class="retry-btn" onclick="location.reload()">Retry</button>
                </div>
            `;
        }
    }
    
    destroy() {
        // Clean up event listeners and references
        this.unitCards.forEach(card => card.destroy());
        this.unitCards = [];
        
        if (this.filterPanel) {
            this.filterPanel = null;
        }
        
        
        this.isInitialized = false;
    }
}

// Make DatabasePage available globally
window.DatabasePage = DatabasePage;

