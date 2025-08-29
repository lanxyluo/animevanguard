import { FilterPanel } from '../components/FilterPanel.js';
import { UnitCard, UnitCardFactory } from '../components/UnitCard.js';
import { Pagination } from '../components/Pagination.js';
import { UnitDataManager } from '../data/units.js';

export class DatabasePage {
    constructor(app) {
        this.app = app;
        this.isInitialized = false;
        
        // Components
        this.filterPanel = null;
        this.pagination = null;
        this.unitCards = [];
        
        // Data
        this.dataManager = null;
        
        // State
        this.currentView = 'grid';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.selectedUnits = [];
        
        // UI elements
        this.elements = {};
    }
    
    async initialize(data) {
        console.log('🚀 Initializing Database Page...');
        
        try {
            // Store data if provided
            if (data) {
                this.data = data;
            }
            
            // Initialize data manager with units data
            const unitsData = data?.unitsData || [];
            this.dataManager = new UnitDataManager(unitsData);
            
            // Initialize UI elements
            this.initializeUI();
            
            // Initialize components
            this.initializeComponents();
            
            // Load initial data
            this.loadUnits();
            
            this.isInitialized = true;
            console.log('✅ Database Page initialized!');
            return true;
        } catch (error) {
            console.error('❌ Database Page initialization failed:', error);
            throw error;
        }
    }
    
    initializeUI() {
        // Get existing database page container from HTML
        const dbContainer = document.getElementById('databasePage');
        if (!dbContainer) {
            console.error('Database page container not found');
            return;
        }
        
        // Store element references
        this.elements = {
            resultsCount: document.getElementById('resultsCount'),
            unitsGrid: document.getElementById('unitsGrid'),
            sortSelect: document.getElementById('sortSelect'),
            compareButton: document.getElementById('compareButton'),
            selectedCount: document.getElementById('selectedCount'),
            viewToggle: document.querySelectorAll('.view-btn')
        };
        
        // Bind view toggle events
        this.bindViewToggleEvents();
        
        // Bind sort events
        this.bindSortEvents();
        
        // Bind compare button events
        this.bindCompareEvents();
    }
    
    initializeComponents() {
        // Initialize Filter Panel
        const filterPanelContainer = document.getElementById('filterPanel');
        if (filterPanelContainer) {
            this.filterPanel = new FilterPanel(filterPanelContainer, {
                onFilterChange: (filters) => this.handleFilterChange(filters),
                onSearchChange: (searchText) => this.handleSearchChange(searchText),
                onQuickFilterChange: (quickFilters) => this.handleQuickFilterChange(quickFilters)
            });
        }
        
        // Initialize Pagination
        const paginationContainer = document.getElementById('pagination');
        if (paginationContainer) {
            this.pagination = new Pagination(paginationContainer, {
                onPageChange: (page) => this.handlePageChange(page),
                onItemsPerPageChange: (itemsPerPage) => this.handleItemsPerPageChange(itemsPerPage)
            });
        }
    }
    
    bindViewToggleEvents() {
        this.elements.viewToggle.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.setViewMode(view);
            });
        });
    }
    
    bindSortEvents() {
        if (this.elements.sortSelect) {
            this.elements.sortSelect.addEventListener('change', (e) => {
                this.handleSortChange(e.target.value);
            });
        }
    }
    
    bindCompareEvents() {
        if (this.elements.compareButton) {
            this.elements.compareButton.addEventListener('click', () => {
                this.handleCompareUnits();
            });
        }
    }
    
    loadUnits() {
        // Get filtered and sorted units
        const units = this.dataManager.getFilteredUnits();
        
        // Update results count
        this.updateResultsCount(units.length);
        
        // Get paginated units
        const paginatedUnits = this.dataManager.getPaginatedUnits(this.currentPage, this.itemsPerPage);
        
        // Render unit cards
        this.renderUnitCards(paginatedUnits);
        
        // Update pagination
        if (this.pagination) {
            this.pagination.updatePagination(units.length, this.currentPage);
        }
    }
    
    renderUnitCards(units) {
        const container = this.elements.unitsGrid;
        if (!container) return;
        
        // Clear existing cards
        container.innerHTML = '';
        this.unitCards = [];
        
        // Set container class based on view mode
        container.className = this.currentView === 'list' ? 'units-list' : 'units-grid';
        
        // Create unit cards
        units.forEach(unit => {
            const card = UnitCardFactory.create(unit, {
                viewMode: this.currentView,
                onCardClick: (unit) => this.handleUnitClick(unit),
                onViewDetails: (unit) => this.handleViewDetails(unit)
            });
            
            this.unitCards.push(card);
            container.appendChild(card.getElement());
        });
    }
    
    updateResultsCount(count) {
        if (this.elements.resultsCount) {
            this.elements.resultsCount.textContent = `Found ${count} units`;
        }
    }
    
    setViewMode(view) {
        this.currentView = view;
        
        // Update view toggle buttons
        this.elements.viewToggle.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Update unit cards view mode
        this.unitCards.forEach(card => {
            card.updateViewMode(view);
        });
        
        // Update container class
        const container = this.elements.unitsGrid;
        if (container) {
            container.className = view === 'list' ? 'units-list' : 'units-grid';
        }
    }
    
    // Event Handlers
    handleFilterChange(filters) {
        this.dataManager.filterUnits(filters);
        this.currentPage = 1; // Reset to first page
        this.loadUnits();
    }
    
    handleSearchChange(searchText) {
        const filters = this.filterPanel.getFilters();
        filters.searchText = searchText;
        this.handleFilterChange(filters);
    }
    
    handleQuickFilterChange(quickFilters) {
        this.dataManager.applyQuickFilters(quickFilters);
        this.currentPage = 1; // Reset to first page
        this.loadUnits();
    }
    
    handleSortChange(sortBy) {
        this.dataManager.sortUnits(sortBy);
        this.currentPage = 1; // Reset to first page
        this.loadUnits();
    }
    
    handlePageChange(page) {
        this.currentPage = page;
        this.loadUnits();
    }
    
    handleItemsPerPageChange(itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1; // Reset to first page
        this.loadUnits();
    }
    
    handleUnitClick(unit) {
        console.log('Unit clicked:', unit.name);
        // Handle unit selection for comparison
        this.toggleUnitSelection(unit);
    }
    
    handleViewDetails(unit) {
        console.log('View details for:', unit.name);
        // Navigate to unit details page or show modal
        // this.app.showUnitDetails(unit);
    }
    
    handleCompareUnits() {
        if (this.selectedUnits.length < 2) {
            alert('Please select at least 2 units to compare');
            return;
        }
        
        console.log('Comparing units:', this.selectedUnits.map(u => u.name));
        // Navigate to comparison page or show comparison modal
        // this.app.showUnitComparison(this.selectedUnits);
    }
    
    toggleUnitSelection(unit) {
        const index = this.selectedUnits.findIndex(u => u.id === unit.id);
        
        if (index > -1) {
            // Remove from selection
            this.selectedUnits.splice(index, 1);
            this.unitCards.find(card => card.unit.id === unit.id)?.setSelected(false);
        } else {
            // Add to selection
            this.selectedUnits.push(unit);
            this.unitCards.find(card => card.unit.id === unit.id)?.setSelected(true);
        }
        
        this.updateCompareButton();
    }
    
    updateCompareButton() {
        if (this.elements.compareButton && this.elements.selectedCount) {
            const count = this.selectedUnits.length;
            this.elements.compareButton.disabled = count < 2;
            this.elements.selectedCount.textContent = count;
        }
    }
    
    // Public methods
    show() {
        const container = document.getElementById('databasePage');
        if (container) {
            container.style.display = 'block';
        }
    }
    
    hide() {
        const container = document.getElementById('databasePage');
        if (container) {
            container.style.display = 'none';
        }
    }
    
    destroy() {
        // Clean up components
        if (this.filterPanel) {
            // Add cleanup method if needed
        }
        
        if (this.pagination) {
            // Add cleanup method if needed
        }
        
        // Clean up unit cards
        this.unitCards.forEach(card => {
            card.destroy();
        });
        
        this.unitCards = [];
        this.selectedUnits = [];
    }
} 