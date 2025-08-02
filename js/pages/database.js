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
        // Create database page HTML structure
        const dbContainer = document.getElementById('databasePageContainer');
        if (!dbContainer) {
            console.error('Database page container not found');
            return;
        }
        
        dbContainer.innerHTML = `
            <div class="database-page">
                <div class="database-header">
                    <h2><i class="fas fa-database"></i> Unit Database</h2>
                    <p>Browse and compare all available units</p>
                </div>
                
                <div class="database-controls">
                    <div class="search-section">
                        <input type="text" id="unitSearch" class="form-control" placeholder="Search units...">
                    </div>
                    
                    <div class="filter-section">
                        <select id="rarityFilter" class="form-control">
                            <option value="">All Rarities</option>
                            <option value="Vanguard">Vanguard</option>
                            <option value="Secret">Secret</option>
                            <option value="Mythic">Mythic</option>
                            <option value="Exclusive">Exclusive</option>
                        </select>
                        
                        <select id="elementFilter" class="form-control">
                            <option value="">All Elements</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Earth">Earth</option>
                            <option value="Wind">Wind</option>
                            <option value="Light">Light</option>
                            <option value="Dark">Dark</option>
                        </select>
                    </div>
                </div>
                
                <div class="database-content">
                    <div class="units-grid" id="unitsGrid">
                        <!-- Units will be loaded here -->
                    </div>
                </div>
                
                <div class="database-footer">
                    <div class="stats">
                        <span id="unitsCount">0 units</span>
                    </div>
                </div>
            </div>
        `;
        
        // Store element references
        this.elements = {
            search: document.getElementById('unitSearch'),
            rarityFilter: document.getElementById('rarityFilter'),
            elementFilter: document.getElementById('elementFilter'),
            unitsGrid: document.getElementById('unitsGrid'),
            unitsCount: document.getElementById('unitsCount')
        };
    }
    
    bindEvents() {
        // Search functionality
        this.elements.search.addEventListener('input', debounce((e) => {
            this.currentFilters.search = e.target.value;
            this.applyFilters();
        }, 300));
        
        // Filter changes
        this.elements.rarityFilter.addEventListener('change', (e) => {
            this.currentFilters.rarity = e.target.value;
            this.applyFilters();
        });
        
        this.elements.elementFilter.addEventListener('change', (e) => {
            this.currentFilters.element = e.target.value;
            this.applyFilters();
        });
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
                        <i class="fas fa-bolt"></i> ${unit.stats.attackSpeed}
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
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
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
} 