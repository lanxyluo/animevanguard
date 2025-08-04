import { showError, showNotification } from '../utils/dom.js';
import { debounce } from '../utils/helpers.js';

export class DatabasePage {
    constructor(app) {
        this.app = app;
        this.isInitialized = false;
        
        // Data
        this.unitsData = null;
        this.elementIcons = null;
        
        // Current state
        this.filteredUnits = [];
        this.selectedUnits = [];
        this.currentFilters = {
            rarity: '',
            element: '',
            attackType: '',
            unitType: '',
            searchText: ''
        };
        
        // UI elements
        this.elements = {};
    }
    
    async initialize(data) {
        console.log('🚀 Initializing Database Page...');
        
        this.unitsData = data.unitsData;
        this.elementIcons = data.elementIcons;
        
        // Initialize UI
        this.initializeUI();
        
        // Bind events
        this.bindEvents();
        
        // Load initial data
        this.loadUnits();
        
        this.isInitialized = true;
        console.log('✅ Database Page initialized!');
        return true;
    }
    
    initializeUI() {
        // Get existing database page container from HTML
        const dbContainer = document.getElementById('databasePage');
        if (!dbContainer) {
            console.error('Database page container not found');
            return;
        }
        
        // Create search and filter UI if it doesn't exist
        this.createSearchAndFilterUI(dbContainer);
        
        // Store element references from existing HTML
        this.elements = {
            searchInput: document.getElementById('dbSearchInput'),
            searchResults: document.getElementById('dbSearchResults'),
            rarityFilter: document.getElementById('dbRarityFilter'),
            elementFilter: document.getElementById('dbElementFilter'),
            attackTypeFilter: document.getElementById('dbAttackTypeFilter'),
            unitTypeFilter: document.getElementById('dbUnitTypeFilter'),
            resetFiltersBtn: document.getElementById('dbResetFilters'),
            filterSummary: document.getElementById('dbFilterSummary'),
            unitsGrid: document.getElementById('unitsGrid'),
            unitsCount: document.getElementById('unitsCount'),
            compareUnit1: document.getElementById('compareUnit1'),
            compareUnit2: document.getElementById('compareUnit2'),
            compareUnit3: document.getElementById('compareUnit3'),
            compareBtn: document.getElementById('compareUnits'),
            unitDetails: document.getElementById('unitDetails')
        };
        
        // Verify all required elements exist
        Object.entries(this.elements).forEach(([name, element]) => {
            if (!element) {
                console.warn(`Database element '${name}' not found in HTML`);
            }
        });
        
        console.log('✅ Database UI elements initialized');
    }

    createSearchAndFilterUI(container) {
        // Check if search UI already exists
        if (document.getElementById('dbSearchInput')) {
            return;
        }

        // Create search and filter section
        const searchFilterSection = document.createElement('div');
        searchFilterSection.className = 'search-filter-section';
        searchFilterSection.innerHTML = `
            <div class="search-container">
                <div class="search-input-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="dbSearchInput" class="search-input" placeholder="Search units by name or description...">
                    <button id="dbClearSearch" class="clear-search-btn" style="display: none;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="dbSearchResults" class="search-results"></div>
            </div>
            
            <div class="filters-container">
                <div class="filter-group">
                    <label for="dbRarityFilter">Rarity:</label>
                    <select id="dbRarityFilter" class="filter-select">
                        <option value="">All Rarity</option>
                        <option value="Rare">Rare</option>
                        <option value="Epic">Epic</option>
                        <option value="Legendary">Legendary</option>
                        <option value="Secret">Secret</option>
                        <option value="Mythic">Mythic</option>
                                                           <option value="Mythic">Mythic</option>
                        <option value="Exclusive">Exclusive</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="dbElementFilter">Element:</label>
                    <select id="dbElementFilter" class="filter-select">
                        <option value="">All Element</option>
                        <option value="Fire">Fire</option>
                        <option value="Water">Water</option>
                        <option value="Nature">Nature</option>
                        <option value="Spark">Spark</option>
                        <option value="Holy">Holy</option>
                        <option value="Passion">Passion</option>
                        <option value="Blast">Blast</option>
                        <option value="Cosmic">Cosmic</option>
                        <option value="Unbound">Unbound</option>
                        <option value="Unknown">Unknown</option>
                        <option value="Life">Life</option>
                        <option value="Earth">Earth</option>
                        <option value="Spirit">Spirit</option>
                        <option value="Lightning">Lightning</option>
                        <option value="Dark">Dark</option>
                        <option value="Physical">Physical</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="dbAttackTypeFilter">Attack Type:</label>
                    <select id="dbAttackTypeFilter" class="filter-select">
                        <option value="">All Attack Type</option>
                        <option value="Single Target">Single Target</option>
                        <option value="Circle AoE">Circle AoE</option>
                        <option value="Cone AoE">Cone AoE</option>
                        <option value="Line AoE">Line AoE</option>
                        <option value="Full AoE">Full AoE</option>
                        <option value="Stadium AoE">Stadium AoE</option>
                        <option value="Splash AoE">Splash AoE</option>
                        <option value="Chain">Chain</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="dbUnitTypeFilter">Unit Type:</label>
                    <select id="dbUnitTypeFilter" class="filter-select">
                        <option value="">All Type</option>
                        <option value="DPS">DPS</option>
                        <option value="Support">Support</option>
                        <option value="Tank">Tank</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
                
                <button id="dbResetFilters" class="reset-filters-btn">
                    <i class="fas fa-undo"></i> Reset Filters
                </button>
            </div>
            
            <div id="dbFilterSummary" class="filter-summary"></div>
        `;

        // Insert at the beginning of the container
        container.insertBefore(searchFilterSection, container.firstChild);
    }
    
    bindEvents() {
        // Search functionality
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', debounce((e) => {
                this.currentFilters.searchText = e.target.value;
                this.updateSearchUI();
                this.applyFilters();
            }, 300));
        } else {
            console.warn('Search input element not found');
        }

        // Clear search button
        const clearSearchBtn = document.getElementById('dbClearSearch');
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }
        
        // Filter changes
        if (this.elements.rarityFilter) {
            this.elements.rarityFilter.addEventListener('change', (e) => {
                this.currentFilters.rarity = e.target.value;
                this.applyFilters();
            });
        } else {
            console.warn('Rarity filter element not found');
        }
        
        if (this.elements.elementFilter) {
            this.elements.elementFilter.addEventListener('change', (e) => {
                this.currentFilters.element = e.target.value;
                this.applyFilters();
            });
        } else {
            console.warn('Element filter element not found');
        }
        
        if (this.elements.attackTypeFilter) {
            this.elements.attackTypeFilter.addEventListener('change', (e) => {
                this.currentFilters.attackType = e.target.value;
                this.applyFilters();
            });
        } else {
            console.warn('Attack type filter element not found');
        }

        if (this.elements.unitTypeFilter) {
            this.elements.unitTypeFilter.addEventListener('change', (e) => {
                this.currentFilters.unitType = e.target.value;
                this.applyFilters();
            });
        } else {
            console.warn('Unit type filter element not found');
        }

        // Reset filters button
        if (this.elements.resetFiltersBtn) {
            this.elements.resetFiltersBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        } else {
            console.warn('Reset filters button not found');
        }

        // Unit comparison events
        if (this.elements.compareUnit1) {
            this.elements.compareUnit1.addEventListener('change', (e) => {
                this.handleUnitSelection(1, e.target.value);
            });
        }

        if (this.elements.compareUnit2) {
            this.elements.compareUnit2.addEventListener('change', (e) => {
                this.handleUnitSelection(2, e.target.value);
            });
        }

        if (this.elements.compareUnit3) {
            this.elements.compareUnit3.addEventListener('change', (e) => {
                this.handleUnitSelection(3, e.target.value);
            });
        }

        if (this.elements.compareBtn) {
            this.elements.compareBtn.addEventListener('click', () => {
                this.compareSelectedUnits();
            });
        }
        
        if (this.elements.elementFilter) {
            this.elements.elementFilter.addEventListener('change', (e) => {
                this.currentFilters.element = e.target.value;
                this.applyFilters();
            });
        } else {
            console.warn('Element filter element not found');
        }
        
        if (this.elements.attackTypeFilter) {
            this.elements.attackTypeFilter.addEventListener('change', (e) => {
                this.currentFilters.attackType = e.target.value;
                this.applyFilters();
            });
        } else {
            console.warn('Attack type filter element not found');
        }
        

        
        // View buttons
        const viewBtns = document.querySelectorAll('.view-btn');
        if (viewBtns.length > 0) {
            viewBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const view = e.target.closest('.view-btn').dataset.view;
                    this.changeView(view);
                });
            });
        } else {
            console.warn('View buttons not found');
        }
        

    }
    
    loadUnits() {
        if (!this.unitsData) {
            console.warn('Units data not available');
            return;
        }
        
        this.filteredUnits = Object.values(this.unitsData);
        this.renderUnits();
        this.updateStats();
        this.populateComparisonSelects();
    }

    populateComparisonSelects() {
        if (!this.unitsData) return;

        const rarityOrder = ['Exclusive', 'Secret', 'Mythic', 'Legendary', 'Epic', 'Rare'];
        const unitsByRarity = {};

        // Group units by rarity
        Object.values(this.unitsData).forEach(unit => {
            if (!unitsByRarity[unit.rarity]) {
                unitsByRarity[unit.rarity] = [];
            }
            unitsByRarity[unit.rarity].push(unit);
        });

        // Sort units within each rarity by name
        Object.keys(unitsByRarity).forEach(rarity => {
            unitsByRarity[rarity].sort((a, b) => a.name.localeCompare(b.name));
        });

        const selectOptions = ['<option value="">Select Unit</option>'];

        // Create options grouped by rarity
        rarityOrder.forEach(rarity => {
            if (unitsByRarity[rarity] && unitsByRarity[rarity].length > 0) {
                selectOptions.push(`<optgroup label="${rarity}">`);
                unitsByRarity[rarity].forEach(unit => {
                    const optionText = `${unit.name} (${unit.rarity}) - ${unit.element}`;
                    selectOptions.push(`<option value="${unit.id}">${optionText}</option>`);
                });
                selectOptions.push('</optgroup>');
            }
        });

        const optionsHTML = selectOptions.join('');

        // Populate all comparison selects
        [this.elements.compareUnit1, this.elements.compareUnit2, this.elements.compareUnit3].forEach(select => {
            if (select) {
                select.innerHTML = optionsHTML;
            }
        });
    }

    handleUnitSelection(slotNumber, unitId) {
        if (!unitId) {
            this.clearUnitPreview(slotNumber);
            return;
        }

        const unit = this.unitsData[unitId];
        if (!unit) {
            console.warn(`Unit with ID ${unitId} not found`);
            return;
        }

        this.showUnitPreview(slotNumber, unit);
    }

    showUnitPreview(slotNumber, unit) {
        const previewElement = document.getElementById(`unit${slotNumber}Preview`);
        if (!previewElement) return;

        const rarityClass = unit.rarity.toLowerCase();
        const elementIcon = this.elementIcons[unit.element] || 'fas fa-question';

        previewElement.innerHTML = `
            <div class="unit-avatar">
                <i class="${elementIcon}"></i>
            </div>
            <div class="unit-info">
                <div class="unit-name">${unit.name}</div>
                <div class="unit-meta">
                    <span class="rarity-badge ${rarityClass}">${unit.rarity}</span>
                    <div class="element-icon">
                        <i class="${elementIcon}"></i>
                    </div>
                    <span>${unit.element}</span>
                </div>
                <div class="unit-stats">
                    <div class="stat-item">
                        <div class="stat-label">Damage</div>
                        <div class="stat-value">${unit.stats?.damage || 'N/A'}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">SPA</div>
                        <div class="stat-value">${unit.stats?.spa || 'N/A'}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Range</div>
                        <div class="stat-value">${unit.stats?.range || 'N/A'}</div>
                    </div>
                </div>
            </div>
        `;

        previewElement.classList.add('has-content');
    }

    clearUnitPreview(slotNumber) {
        const previewElement = document.getElementById(`unit${slotNumber}Preview`);
        if (previewElement) {
            previewElement.innerHTML = '';
            previewElement.classList.remove('has-content');
        }
    }

    compareSelectedUnits() {
        const selectedUnits = [];
        
        [1, 2, 3].forEach(slotNumber => {
            const select = this.elements[`compareUnit${slotNumber}`];
            if (select && select.value) {
                const unit = this.unitsData[select.value];
                if (unit) {
                    selectedUnits.push(unit);
                }
            }
        });

        if (selectedUnits.length < 2) {
            showNotification('Please select at least 2 units to compare', 'warning');
            return;
        }

        this.showComparison(selectedUnits);
    }
    
    applyFilters() {
        console.log('Applying filters:', this.currentFilters);
        
        let filtered = Object.values(this.unitsData);
        
        // Apply search filter
        if (this.currentFilters.searchText) {
            const searchTerm = this.currentFilters.searchText.toLowerCase();
            filtered = filtered.filter(unit => 
                unit.name.toLowerCase().includes(searchTerm) ||
                (unit.description && unit.description.toLowerCase().includes(searchTerm))
            );
        }
        
        // Apply rarity filter
        if (this.currentFilters.rarity && this.currentFilters.rarity !== 'All Rarity') {
            filtered = filtered.filter(unit => 
                unit.rarity === this.currentFilters.rarity
            );
        }
        
        // Apply element filter
        if (this.currentFilters.element && this.currentFilters.element !== 'All Element') {
            filtered = filtered.filter(unit => 
                unit.element === this.currentFilters.element
            );
        }
        
        // Apply attack type filter
        if (this.currentFilters.attackType && this.currentFilters.attackType !== 'All Attack Type') {
            filtered = filtered.filter(unit => 
                unit.attackType === this.currentFilters.attackType
            );
        }
        
        // Apply unit type filter
        if (this.currentFilters.unitType && this.currentFilters.unitType !== 'All Type') {
            filtered = filtered.filter(unit => 
                unit.unitType === this.currentFilters.unitType
            );
        }
        
        this.filteredUnits = filtered;
        console.log(`Filtered units: ${this.filteredUnits.length} out of ${Object.values(this.unitsData).length}`);
        this.renderUnits();
        this.updateStats();
        this.updateFilterSummary();
    }
    
    renderUnits() {
        const grid = this.elements.unitsGrid;
        grid.innerHTML = '';
        
        if (this.filteredUnits.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No units found matching your criteria</p>
                    <button class="clear-filters-btn" onclick="this.closest('.database-page').querySelector('#dbResetFilters').click()">
                        <i class="fas fa-undo"></i> Clear All Filters
                    </button>
                </div>
            `;
            return;
        }
        
        this.filteredUnits.forEach(unit => {
            const unitCard = this.createUnitCard(unit);
            grid.appendChild(unitCard);
        });
    }
    
    createUnitCard(unit) {
        const card = document.createElement('div');
        card.className = 'unit-card';
        card.dataset.unitId = unit.id;
        
        const elementIcon = this.elementIcons[unit.element] || 'fas fa-question';
        const rarityColor = this.getRarityColor(unit.rarity);
        
        // Highlight search term if present
        const searchTerm = this.currentFilters.searchText;
        const highlightedName = searchTerm ? this.highlightSearchTerm(unit.name, searchTerm) : unit.name;
        const highlightedDescription = searchTerm && unit.description ? 
            this.highlightSearchTerm(unit.description, searchTerm) : unit.description;
        
        card.innerHTML = `
            <div class="unit-card-header" style="border-color: ${rarityColor}">
                <div class="unit-icon">
                    <i class="${elementIcon}"></i>
                </div>
                <div class="unit-info">
                    <h4>${highlightedName}</h4>
                    <span class="rarity" style="color: ${rarityColor}">${unit.rarity}</span>
                    <span class="element">${unit.element}</span>
                </div>
            </div>
            <div class="unit-card-body">
                <p class="description">${highlightedDescription}</p>
                <div class="stats-preview">
                    <span class="stat">
                        <i class="fas fa-sword"></i> ${unit.stats?.damage || 'N/A'}
                    </span>
                    <span class="stat">
                        <i class="fas fa-bolt"></i> ${unit.stats?.spa || 'N/A'}s
                    </span>
                    <span class="stat">
                        <i class="fas fa-chart-line"></i> ${unit.stats?.dps || 'N/A'}
                    </span>
                </div>
            </div>
        `;
        
        // Add event listener
        card.addEventListener('click', () => {
            this.showUnitDetails(unit);
        });
        
        return card;
    }
    
    showUnitDetails(unit) {
        // Define detail sections
        const detailSections = [
            {
                title: "Combat Attributes",
                fields: [
                    { key: 'damage', label: 'Damage', description: 'Total damage dealt by the unit' },
                    { key: 'spa', label: 'SPA (Seconds Per Attack)', description: 'Time interval between attacks' },
                    { key: 'range', label: 'Range', description: 'Attack distance of the unit' },
                    { key: 'attackType', label: 'Attack Type', description: 'Attack pattern and area of effect' }
                ]
            },
            {
                title: "Economic Information", 
                fields: [
                    { key: 'deploymentCost', label: 'Deployment Cost', description: 'Initial cost to place the unit' },
                    { key: 'totalCost', label: 'Total Upgrade Cost', description: 'Total cost to upgrade to maximum level' },
                    { key: 'upgradeLevel', label: 'Upgrade Level', description: 'Maximum upgrade level of the unit' }
                ]
            },
            {
                title: "Placement Restrictions",
                fields: [
                    { key: 'placementLimit', label: 'Placement Limit', description: 'Maximum number of units that can be placed simultaneously' }
                ]
            }
        ];

        // Create modal for unit details
        const modal = document.createElement('div');
        modal.className = 'unit-details-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
        `;

        const rarityClass = unit.rarity.toLowerCase();
        const elementIcon = this.elementIcons[unit.element] || 'fas fa-question';
        const rarityColor = this.getRarityColor(unit.rarity);

        modal.innerHTML = `
            <div class="unit-details-container" style="
                background: #2c3e50;
                border-radius: 12px;
                max-width: 1000px;
                max-height: 90vh;
                overflow-y: auto;
                padding: 2rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <div class="unit-details-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                ">
                    <div class="unit-basic-info" style="display: flex; gap: 1.5rem; align-items: center;">
                        <div class="unit-avatar-large" style="
                            width: 80px;
                            height: 80px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 2rem;
                            flex-shrink: 0;
                        ">
                            <i class="${elementIcon}"></i>
                </div>
                        <div class="unit-title-info">
                            <h2 style="color: #fff; margin: 0 0 0.5rem 0; font-size: 1.8rem;">${unit.name}</h2>
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                                <span class="rarity-badge ${rarityClass}" style="
                                    padding: 0.4rem 0.8rem;
                                    border-radius: 12px;
                                    font-size: 0.8rem;
                                    font-weight: bold;
                                    text-transform: uppercase;
                                    background: ${rarityColor};
                                    color: white;
                                    display: inline-block;
                                ">${unit.rarity}</span>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <i class="${elementIcon}" style="color: #a29bfe; font-size: 1.2rem;"></i>
                                    <span style="color: #bbb; font-size: 1rem;">${unit.element}</span>
                                </div>
                                <span style="
                                    padding: 0.3rem 0.6rem;
                                    background: rgba(162, 155, 254, 0.2);
                                    border-radius: 8px;
                                    color: #a29bfe;
                                    font-size: 0.8rem;
                                    font-weight: 500;
                                ">${unit.unitType || 'DPS'}</span>
                                </div>
                            <p style="color: #bbb; margin: 0; font-size: 0.9rem;">${unit.obtainment || 'Standard Banner'}</p>
                                </div>
                            </div>
                    <button onclick="this.closest('.unit-details-modal').remove()" style="
                        background: none;
                        border: none;
                        color: #fff;
                        font-size: 1.5rem;
                        cursor: pointer;
                        padding: 0.5rem;
                    ">&times;</button>
                        </div>

                <div class="unit-details-content" style="display: grid; gap: 2rem;">
                    <!-- Detail Sections -->
                    ${detailSections.map(section => `
                        <div class="detail-section" style="
                            background: rgba(255, 255, 255, 0.05);
                            border-radius: 8px;
                            padding: 1.5rem;
                            border: 1px solid rgba(255, 255, 255, 0.1);
                        ">
                            <h3 style="color: #a29bfe; margin: 0 0 1rem 0; font-size: 1.2rem;">${section.title}</h3>
                            <div class="section-fields" style="display: grid; gap: 1rem;">
                                ${section.fields.map(field => {
                                    const value = this.getFieldValue(unit, field.key);
                                    return `
                                        <div class="field-item" style="
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                            padding: 0.75rem;
                                            background: rgba(255, 255, 255, 0.03);
                                            border-radius: 6px;
                                        ">
                                            <div class="field-info">
                                                <div style="color: #fff; font-weight: 500; margin-bottom: 0.25rem;">${field.label}</div>
                                                <div style="color: #bbb; font-size: 0.8rem;">${field.description}</div>
                    </div>
                                            <div class="field-value" style="
                                                color: #fff;
                                                font-weight: bold;
                                                font-size: 1.1rem;
                                            ">${this.formatDetailValue(value, field.key, unit)}</div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}

                    <!-- Skills Section -->
                    <div class="skills-section" style="
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 8px;
                        padding: 1.5rem;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    ">
                        <h3 style="color: #a29bfe; margin: 0 0 1rem 0; font-size: 1.2rem;">Skills & Abilities</h3>
                        
                        ${unit.passiveAbilities && unit.passiveAbilities.length > 0 ? `
                            <div class="passive-skills" style="margin-bottom: 1.5rem;">
                                <h4 style="color: #4CAF50; margin: 0 0 0.75rem 0; font-size: 1rem;">Passive Abilities</h4>
                                <ul style="margin: 0; padding-left: 1.5rem; color: #ddd;">
                                    ${unit.passiveAbilities.map(ability => `
                                        <li style="margin-bottom: 0.5rem; line-height: 1.4;">${ability}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}

                        ${unit.activeAbilities && unit.activeAbilities.length > 0 ? `
                            <div class="active-skills" style="margin-bottom: 1.5rem;">
                                <h4 style="color: #FF9800; margin: 0 0 0.75rem 0; font-size: 1rem;">Active Abilities</h4>
                                <ul style="margin: 0; padding-left: 1.5rem; color: #ddd;">
                                    ${unit.activeAbilities.map(ability => `
                                        <li style="margin-bottom: 0.5rem; line-height: 1.4;">${ability}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Pros & Cons Section -->
                    <div class="pros-cons-section" style="
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 8px;
                        padding: 1.5rem;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    ">
                        <h3 style="color: #a29bfe; margin: 0 0 1rem 0; font-size: 1.2rem;">Analysis</h3>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                            ${unit.pros && unit.pros.length > 0 ? `
                                <div class="pros">
                                    <h4 style="color: #4CAF50; margin: 0 0 0.75rem 0; font-size: 1rem;">
                                        <i class="fas fa-plus-circle" style="margin-right: 0.5rem;"></i>Advantages
                                    </h4>
                                    <ul style="margin: 0; padding-left: 1.5rem; color: #ddd;">
                                        ${unit.pros.map(pro => `
                                            <li style="margin-bottom: 0.5rem; line-height: 1.4;">${pro}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                            ` : ''}

                            ${unit.cons && unit.cons.length > 0 ? `
                                <div class="cons">
                                    <h4 style="color: #F44336; margin: 0 0 0.75rem 0; font-size: 1rem;">
                                        <i class="fas fa-minus-circle" style="margin-right: 0.5rem;"></i>Disadvantages
                                    </h4>
                                    <ul style="margin: 0; padding-left: 1.5rem; color: #ddd;">
                                        ${unit.cons.map(con => `
                                            <li style="margin-bottom: 0.5rem; line-height: 1.4;">${con}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Description Section -->
                    ${unit.description ? `
                        <div class="description-section" style="
                            background: rgba(255, 255, 255, 0.05);
                            border-radius: 8px;
                            padding: 1.5rem;
                            border: 1px solid rgba(255, 255, 255, 0.1);
                        ">
                            <h3 style="color: #a29bfe; margin: 0 0 1rem 0; font-size: 1.2rem;">Description</h3>
                            <p style="color: #ddd; margin: 0; line-height: 1.6;">${unit.description}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                }
            });
        }
        
    formatDetailValue(value, key, unit) {
        if (value === 'N/A') return value;

        switch (key) {
            case 'damage':
            case 'range':
            case 'upgradeLevel':
            case 'placementLimit':
                return `<span style="color: #fff; font-weight: bold;">${value}</span>`;
            
            case 'spa':
                return `<span style="color: #fff; font-weight: bold;">${value}s</span>`;
            
            case 'attackType':
                return `<span style="
                    padding: 0.3rem 0.6rem;
                    background: rgba(162, 155, 254, 0.2);
                    border-radius: 6px;
                    color: #a29bfe;
                    font-size: 0.9rem;
                ">${value}</span>`;
            
            case 'deploymentCost':
            case 'totalCost':
                const costColors = {
                    'Very Low': '#4CAF50',
                    'Low': '#8BC34A',
                    'Medium': '#FFC107',
                    'High': '#FF9800',
                    'Very High': '#F44336',
                    'Extremely High': '#9C27B0',
                    'Extreme': '#E91E63'
                };
                const costColor = costColors[value] || '#fff';
                return `<span style="
                    color: ${costColor};
                    font-weight: bold;
                ">${value}</span>`;
            
            default:
                return `<span style="color: #fff;">${value}</span>`;
        }
    }
    

    
    getRarityColor(rarity) {
        const colors = {
            'Rare': '#4CAF50',
            'Epic': '#2196F3',
            'Legendary': '#9C27B0',
            'Secret': '#FF9800',
            'Mythic': '#E91E63',
            'Mythic': '#E91E63',
            'Exclusive': '#FF5722'
        };
        return colors[rarity] || '#666';
    }
    
    show() {
        if (!this.isInitialized) {
            console.warn('⚠️ Database Page not initialized');
            return;
        }
        
        console.log('📄 Showing Database Page');
        
        // Update page title
        document.title = 'Anime Vanguards Calculator - Database';
        
        this.onPageShow();
    }
    
    hide() {
        console.log('📄 Hiding Database Page');
        this.onPageHide();
    }
    
    onPageShow() {
        console.log('Database page shown');
    }
    
    onPageHide() {
        console.log('Database page hidden');
    }
    
    destroy() {
        console.log('🗑️ Destroying Database Page');
        this.isInitialized = false;
    }
    
    updateData(newData) {
        this.unitsData = newData.unitsData || this.unitsData;
        this.elementIcons = newData.elementIcons || this.elementIcons;
        
        // Reload units if already initialized
        if (this.isInitialized) {
            this.loadUnits();
        }
    }
    
    changeView(view) {
        // Update view buttons
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update grid class
        if (this.elements.unitsGrid) {
            this.elements.unitsGrid.className = `units-grid view-${view}`;
        }
        
        console.log(`Changed view to: ${view}`);
    }
    
    compareUnits() {
        this.compareSelectedUnits();
    }
    
    showComparison(units) {
        // Define comparison fields
        const comparisonFields = [
            { key: 'name', label: 'Unit Name', type: 'text' },
            { key: 'rarity', label: 'Rarity', type: 'badge' },
            { key: 'element', label: 'Element', type: 'badge' },
            { key: 'attackType', label: 'Attack Type', type: 'text' },
            { key: 'unitType', label: 'Unit Type', type: 'text' },
            { key: 'damage', label: 'Damage', type: 'stat' },
            { key: 'spa', label: 'SPA', type: 'stat' },
            { key: 'range', label: 'Range', type: 'stat' },
            { key: 'deploymentCost', label: 'Deployment Cost', type: 'cost' },
            { key: 'totalCost', label: 'Total Cost', type: 'cost' },
            { key: 'upgradeLevel', label: 'Upgrade Level', type: 'number' },
            { key: 'placementLimit', label: 'Placement Limit', type: 'number' },
            { key: 'obtainment', label: 'Obtainment', type: 'text' }
        ];

        // Get all selected units (including empty slots)
        const allUnits = [];
        [1, 2, 3].forEach(slotNumber => {
            const select = this.elements[`compareUnit${slotNumber}`];
            if (select && select.value) {
                const unit = this.unitsData[select.value];
                if (unit) {
                    allUnits.push(unit);
                } else {
                    allUnits.push(null);
                }
            } else {
                allUnits.push(null);
            }
        });

        // Calculate best values for highlighting
        const bestValues = this.calculateBestValues(allUnits.filter(unit => unit !== null));

        // Create comparison modal
        const modal = document.createElement('div');
        modal.className = 'comparison-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
        `;
        
        let comparisonHTML = `
            <div class="comparison-container" style="
                background: #2c3e50;
                border-radius: 12px;
                max-width: 1400px;
                max-height: 90vh;
                overflow-y: auto;
                padding: 2rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <div class="comparison-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                ">
                    <h2 style="color: #a29bfe; margin: 0;">Unit Comparison Table</h2>
                    <button onclick="this.closest('.comparison-modal').remove()" style="
                        background: none;
                        border: none;
                        color: #fff;
                        font-size: 1.5rem;
                        cursor: pointer;
                        padding: 0.5rem;
                    ">&times;</button>
                </div>
                <div class="comparison-table-container">
                    <table class="comparison-table" style="
                        width: 100%;
                        border-collapse: collapse;
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 8px;
                        overflow: hidden;
                    ">
                        <thead>
                            <tr style="background: rgba(162, 155, 254, 0.1);">
                                <th style="
                                    padding: 1rem;
                                    text-align: left;
                                    color: #a29bfe;
                                    font-weight: bold;
                                    border-bottom: 2px solid rgba(162, 155, 254, 0.3);
                                    min-width: 150px;
                                ">Property</th>
                                ${allUnits.map((unit, index) => `
                                    <th style="
                                        padding: 1rem;
                                        text-align: center;
                                        color: #a29bfe;
                                        font-weight: bold;
                                        border-bottom: 2px solid rgba(162, 155, 254, 0.3);
                                        min-width: 200px;
                                    ">
                                        ${unit ? `Unit ${index + 1}` : `Unit ${index + 1}`}
                                    </th>
                                `).join('')}
                            </tr>
                        </thead>
                        <tbody>
        `;

        // Generate table rows
        comparisonFields.forEach(field => {
            comparisonHTML += `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <td style="
                        padding: 1rem;
                        color: #ddd;
                        font-weight: 500;
                        background: rgba(255, 255, 255, 0.02);
                    ">${field.label}</td>
                    ${allUnits.map(unit => {
                        if (!unit) {
                            return `<td style="
                                padding: 1rem;
                                text-align: center;
                                color: #888;
                                font-style: italic;
                            ">Please select unit</td>`;
                        }

                        const value = this.getFieldValue(unit, field.key);
                        const isBest = this.isBestValue(value, field.key, bestValues);
                        
                        return `<td style="
                            padding: 1rem;
                            text-align: center;
                            ${isBest ? 'background: rgba(76, 175, 80, 0.1);' : ''}
                        ">${this.formatFieldValue(value, field, unit, isBest)}</td>`;
                    }).join('')}
                            </tr>
            `;
        });

        comparisonHTML += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        modal.innerHTML = comparisonHTML;
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                }
            });
        }
        
    getFieldValue(unit, key) {
        switch (key) {
            case 'damage':
                return unit.stats?.damage || 'N/A';
            case 'spa':
                return unit.stats?.spa || 'N/A';
            case 'range':
                return unit.stats?.range || 'N/A';
            case 'unitType':
                return unit.unitType || 'DPS';
            default:
                return unit[key] || 'N/A';
        }
    }

    formatFieldValue(value, field, unit, isBest) {
        if (value === 'N/A') return value;

        switch (field.type) {
            case 'badge':
                if (field.key === 'rarity') {
                    const rarityClass = unit.rarity.toLowerCase();
                    return `<span class="rarity-badge ${rarityClass}" style="
                        padding: 0.3rem 0.6rem;
                        border-radius: 12px;
                        font-size: 0.7rem;
                        font-weight: bold;
                        text-transform: uppercase;
                        background: ${this.getRarityColor(unit.rarity)};
                        color: white;
                        display: inline-block;
                    ">${value}</span>`;
                } else if (field.key === 'element') {
                    const elementIcon = this.elementIcons[unit.element] || 'fas fa-question';
                    return `<div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <i class="${elementIcon}" style="color: #a29bfe;"></i>
                        <span style="color: #fff;">${value}</span>
                    </div>`;
                }
                return `<span style="color: #fff;">${value}</span>`;
            
            case 'stat':
                const statValue = typeof value === 'number' ? value : parseFloat(value);
                if (isNaN(statValue)) return value;
                return `<span style="
                    color: ${isBest ? '#4CAF50' : '#fff'};
                    font-weight: ${isBest ? 'bold' : 'normal'};
                    ${isBest ? 'text-shadow: 0 0 5px rgba(76, 175, 80, 0.5);' : ''}
                ">${value}</span>`;
            
            case 'cost':
                const costColors = {
                    'Very Low': '#4CAF50',
                    'Low': '#8BC34A',
                    'Medium': '#FFC107',
                    'High': '#FF9800',
                    'Very High': '#F44336',
                    'Extremely High': '#9C27B0',
                    'Extreme': '#E91E63'
                };
                const costColor = costColors[value] || '#fff';
                return `<span style="
                    color: ${costColor};
                    font-weight: bold;
                ">${value}</span>`;
            
            case 'number':
                return `<span style="
                    color: ${isBest ? '#4CAF50' : '#fff'};
                    font-weight: ${isBest ? 'bold' : 'normal'};
                ">${value}</span>`;
            
            default:
                return `<span style="color: #fff;">${value}</span>`;
        }
    }

    calculateBestValues(units) {
        const bestValues = {};
        
        // Calculate best values for numeric fields
        const numericFields = ['damage', 'spa', 'range', 'upgradeLevel', 'placementLimit'];
        
        numericFields.forEach(field => {
            const values = units.map(unit => {
                const value = this.getFieldValue(unit, field);
                return typeof value === 'number' ? value : parseFloat(value);
            }).filter(val => !isNaN(val));
            
            if (values.length > 0) {
                if (field === 'spa') {
                    // Lower SPA is better
                    bestValues[field] = Math.min(...values);
                } else {
                    // Higher values are better for other stats
                    bestValues[field] = Math.max(...values);
                }
            }
        });
        
        return bestValues;
    }

    isBestValue(value, field, bestValues) {
        if (value === 'N/A' || !bestValues[field]) return false;
        
        const numValue = typeof value === 'number' ? value : parseFloat(value);
        if (isNaN(numValue)) return false;
        
        if (field === 'spa') {
            // Lower SPA is better
            return Math.abs(numValue - bestValues[field]) < 0.01;
        } else {
            // Higher values are better for other stats
            return Math.abs(numValue - bestValues[field]) < 0.01;
        }
    }

    // Search and Filter Methods
    updateSearchUI() {
        const searchInput = this.elements.searchInput;
        const clearBtn = document.getElementById('dbClearSearch');
        const searchResults = this.elements.searchResults;

        if (!searchInput || !clearBtn || !searchResults) return;

        const hasText = searchInput.value.trim().length > 0;
        clearBtn.style.display = hasText ? 'block' : 'none';

        if (hasText) {
            const searchTerm = searchInput.value.toLowerCase();
            const matchingUnits = Object.values(this.unitsData).filter(unit =>
                unit.name.toLowerCase().includes(searchTerm) ||
                (unit.description && unit.description.toLowerCase().includes(searchTerm))
            );

            if (matchingUnits.length > 0) {
                searchResults.innerHTML = `
                    <div class="search-suggestions">
                        <div class="suggestion-header">
                            <i class="fas fa-search"></i>
                            <span>Found ${matchingUnits.length} matching units</span>
                        </div>
                        <div class="suggestion-list">
                            ${matchingUnits.slice(0, 5).map(unit => `
                                <div class="suggestion-item" data-unit-id="${unit.id}">
                                    <div class="suggestion-icon">
                                        <i class="${this.elementIcons[unit.element] || 'fas fa-question'}"></i>
                                    </div>
                                    <div class="suggestion-info">
                                        <div class="suggestion-name">${this.highlightSearchTerm(unit.name, searchTerm)}</div>
                                        <div class="suggestion-meta">
                                            <span class="suggestion-rarity" style="color: ${this.getRarityColor(unit.rarity)}">${unit.rarity}</span>
                                            <span class="suggestion-element">${unit.element}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                            ${matchingUnits.length > 5 ? `
                                <div class="suggestion-more">
                                    <i class="fas fa-ellipsis-h"></i>
                                    <span>And ${matchingUnits.length - 5} more...</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = `
                    <div class="search-no-results">
                        <i class="fas fa-search"></i>
                        <span>No units found matching "${searchInput.value}"</span>
                    </div>
                `;
                searchResults.style.display = 'block';
            }
        } else {
            searchResults.style.display = 'none';
        }
    }

    highlightSearchTerm(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark style="background: rgba(162, 155, 254, 0.3); color: #fff; padding: 0.1rem 0.2rem; border-radius: 2px;">$1</mark>');
    }

    clearSearch() {
        if (this.elements.searchInput) {
            this.elements.searchInput.value = '';
            this.currentFilters.searchText = '';
            this.updateSearchUI();
            this.applyFilters();
        }
    }

    resetFilters() {
        // Reset all filter values
        this.currentFilters = {
            rarity: '',
            element: '',
            attackType: '',
            unitType: '',
            searchText: ''
        };

        // Reset UI elements
        if (this.elements.searchInput) {
            this.elements.searchInput.value = '';
        }
        if (this.elements.rarityFilter) {
            this.elements.rarityFilter.value = '';
        }
        if (this.elements.elementFilter) {
            this.elements.elementFilter.value = '';
        }
        if (this.elements.attackTypeFilter) {
            this.elements.attackTypeFilter.value = '';
        }
        if (this.elements.unitTypeFilter) {
            this.elements.unitTypeFilter.value = '';
        }

        // Update search UI and apply filters
        this.updateSearchUI();
        this.applyFilters();
    }

    updateFilterSummary() {
        const filterSummary = this.elements.filterSummary;
        if (!filterSummary) return;

        const activeFilters = [];
        
        if (this.currentFilters.rarity) {
            activeFilters.push(`Rarity: ${this.currentFilters.rarity}`);
        }
        if (this.currentFilters.element) {
            activeFilters.push(`Element: ${this.currentFilters.element}`);
        }
        if (this.currentFilters.attackType) {
            activeFilters.push(`Attack Type: ${this.currentFilters.attackType}`);
        }
        if (this.currentFilters.unitType) {
            activeFilters.push(`Unit Type: ${this.currentFilters.unitType}`);
        }
        if (this.currentFilters.searchText) {
            activeFilters.push(`Search: "${this.currentFilters.searchText}"`);
        }

        if (activeFilters.length > 0) {
            filterSummary.innerHTML = `
                <div class="filter-summary-content">
                    <div class="filter-summary-header">
                        <i class="fas fa-filter"></i>
                        <span>Active Filters (${activeFilters.length})</span>
                    </div>
                    <div class="filter-summary-tags">
                        ${activeFilters.map(filter => `
                            <span class="filter-tag">${filter}</span>
                        `).join('')}
                    </div>
                    <div class="filter-summary-results">
                        <i class="fas fa-search"></i>
                        <span>Showing ${this.filteredUnits.length} of ${Object.values(this.unitsData).length} units</span>
                    </div>
                </div>
            `;
            filterSummary.style.display = 'block';
        } else {
            filterSummary.style.display = 'none';
        }
    }

    updateStats() {
        if (this.elements.unitsCount) {
            this.elements.unitsCount.textContent = `${this.filteredUnits.length} units`;
        }
    }
} 