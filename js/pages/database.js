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
            search: ''
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
        
        // Store element references from existing HTML
        this.elements = {
            search: document.getElementById('dbSearch'),
            rarityFilter: document.getElementById('dbRarityFilter'),
            elementFilter: document.getElementById('dbElementFilter'),
            tierFilter: document.getElementById('dbTierFilter'),
            typeFilter: document.getElementById('dbTypeFilter'),
            sortBy: document.getElementById('dbSortBy'),
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
    
    bindEvents() {
        // Search functionality
        if (this.elements.search) {
            this.elements.search.addEventListener('input', debounce((e) => {
                this.currentFilters.search = e.target.value;
                this.applyFilters();
            }, 300));
        } else {
            console.warn('Search element not found');
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
        
        if (this.elements.tierFilter) {
            this.elements.tierFilter.addEventListener('change', (e) => {
                this.currentFilters.tier = e.target.value;
                this.applyFilters();
            });
        } else {
            console.warn('Tier filter element not found');
        }
        
        if (this.elements.typeFilter) {
            this.elements.typeFilter.addEventListener('change', (e) => {
                this.currentFilters.type = e.target.value;
                this.applyFilters();
            });
        } else {
            console.warn('Type filter element not found');
        }
        
        if (this.elements.sortBy) {
            this.elements.sortBy.addEventListener('change', (e) => {
                this.currentFilters.sortBy = e.target.value;
                this.applyFilters();
            });
        } else {
            console.warn('Sort by element not found');
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
        
        // Compare button
        if (this.elements.compareBtn) {
            this.elements.compareBtn.addEventListener('click', () => {
                this.compareUnits();
            });
        } else {
            console.warn('Compare button not found');
        }
    }
    
    loadUnits() {
        this.filteredUnits = Object.values(this.unitsData);
        this.renderUnits();
        this.updateStats();
    }
    
    applyFilters() {
        let filtered = Object.values(this.unitsData);
        
        // Apply search filter
        if (this.currentFilters.search) {
            const searchTerm = this.currentFilters.search.toLowerCase();
            filtered = filtered.filter(unit => 
                unit.name.toLowerCase().includes(searchTerm) ||
                unit.description.toLowerCase().includes(searchTerm)
            );
        }
        
        // Apply rarity filter
        if (this.currentFilters.rarity) {
            filtered = filtered.filter(unit => 
                unit.rarity === this.currentFilters.rarity
            );
        }
        
        // Apply element filter
        if (this.currentFilters.element) {
            filtered = filtered.filter(unit => 
                unit.element === this.currentFilters.element
            );
        }
        
        this.filteredUnits = filtered;
        this.renderUnits();
        this.updateStats();
    }
    
    renderUnits() {
        const grid = this.elements.unitsGrid;
        grid.innerHTML = '';
        
        if (this.filteredUnits.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No units found matching your criteria</p>
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
        
        card.innerHTML = `
            <div class="unit-card-header" style="border-color: ${rarityColor}">
                <div class="unit-icon">
                    <i class="${elementIcon}"></i>
                </div>
                <div class="unit-info">
                    <h4>${unit.name}</h4>
                    <span class="rarity" style="color: ${rarityColor}">${unit.rarity}</span>
                    <span class="element">${unit.element}</span>
                </div>
            </div>
            <div class="unit-card-body">
                <p class="description">${unit.description}</p>
                <div class="stats-preview">
                    <span class="stat">
                        <i class="fas fa-sword"></i> ${unit.stats.damage}
                    </span>
                    <span class="stat">
                        <i class="fas fa-bolt"></i> ${unit.stats.spa}s
                    </span>
                    <span class="stat">
                        <i class="fas fa-chart-line"></i> ${unit.stats.dps}
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
        // Create modal for unit details
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${unit.name}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="unit-details">
                        <div class="unit-stats">
                            <h4>Stats</h4>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <span class="label">Damage:</span>
                                    <span class="value">${unit.stats.damage}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="label">Attack Speed:</span>
                                    <span class="value">${unit.stats.attackSpeed}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="label">Range:</span>
                                    <span class="value">${unit.stats.range}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal && modal.parentNode) {
                    document.body.removeChild(modal);
                }
            });
        }
    }
    
    updateStats() {
        this.elements.unitsCount.textContent = `${this.filteredUnits.length} units`;
    }
    
    getRarityColor(rarity) {
        const colors = {
            'Vanguard': '#4CAF50',
            'Secret': '#2196F3',
            'Mythic': '#9C27B0',
            'Exclusive': '#FF9800'
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
        const unit1 = this.elements.compareUnit1?.value;
        const unit2 = this.elements.compareUnit2?.value;
        const unit3 = this.elements.compareUnit3?.value;
        
        if (!unit1 && !unit2 && !unit3) {
            showError('Please select at least one unit to compare', 'warning');
            return;
        }
        
        const units = [unit1, unit2, unit3].filter(id => id);
        const unitData = units.map(id => this.unitsData[id]).filter(unit => unit);
        
        if (unitData.length === 0) {
            showError('No valid units selected for comparison', 'error');
            return;
        }
        
        this.showComparison(unitData);
    }
    
    showComparison(units) {
        // Create comparison modal
        const modal = document.createElement('div');
        modal.className = 'modal';
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
        `;
        
        let comparisonHTML = `
            <div class="modal-content" style="
                background: #1a1a2e;
                color: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 90%;
                max-height: 90%;
                overflow-y: auto;
            ">
                <div class="modal-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid rgba(162, 155, 254, 0.3);
                    padding-bottom: 1rem;
                ">
                    <h3>Unit Comparison</h3>
                    <button class="modal-close" style="
                        background: none;
                        border: none;
                        color: #a29bfe;
                        font-size: 1.5rem;
                        cursor: pointer;
                    ">&times;</button>
                </div>
                <div class="comparison-table">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">Property</th>
                                ${units.map(unit => `<th style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">${unit.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">Rarity</td>
                                ${units.map(unit => `<td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">${unit.rarity}</td>`).join('')}
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">Element</td>
                                ${units.map(unit => `<td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">${unit.element}</td>`).join('')}
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">Damage</td>
                                ${units.map(unit => `<td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">${unit.stats.damage}</td>`).join('')}
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">Attack Speed</td>
                                ${units.map(unit => `<td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">${unit.stats.spa}s</td>`).join('')}
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">DPS</td>
                                ${units.map(unit => `<td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">${unit.stats.dps}</td>`).join('')}
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">Range</td>
                                ${units.map(unit => `<td style="padding: 0.5rem; border: 1px solid rgba(162, 155, 254, 0.3);">${unit.stats.range}</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        modal.innerHTML = comparisonHTML;
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal && modal.parentNode) {
                    document.body.removeChild(modal);
                }
            });
        }
    }
} 