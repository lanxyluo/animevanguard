import { FilterPanel } from '../components/FilterPanel.js';
import { UnitCard, UnitCardFactory } from '../components/UnitCard.js';
import { Pagination } from '../components/Pagination.js';

export class DatabasePage {
    constructor(app) {
        this.app = app;
        this.isInitialized = false;
        
        // Components
        this.filterPanel = null;
        this.pagination = null;
        this.unitCards = [];
        
        // Data
        this.unitsData = null;
        this.units = [];
        this.filteredUnits = [];
        
        // State
        this.currentView = 'grid';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.selectedUnits = [];
        this.searchText = '';
        
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
            
            // Store units data directly
            this.unitsData = data?.unitsData || {};
            this.units = this.unitsData.units || [];
            this.filteredUnits = [...this.units]; // Start with all units
            
            // Initialize UI elements
            this.initializeUI();
            
            // Initialize search functionality
            this.initializeSearch();
            
            // Show maintenance message
            this.showMaintenanceMessage();
            
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
            unitsGrid: document.getElementById('unitsGrid'),
            searchInput: document.getElementById('unitSearch'),
            clearSearchBtn: document.getElementById('clearSearchBtn')
        };
    }
    
    initializeSearch() {
        // Initialize search functionality
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });
        }
        
        if (this.elements.clearSearchBtn) {
            this.elements.clearSearchBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }
    }
    
    showMaintenanceMessage() {
        // Clear any existing content in units grid
        if (this.elements.unitsGrid) {
            this.elements.unitsGrid.innerHTML = '';
        }
        
        // The maintenance message is already in the HTML
        console.log('🔧 Database maintenance mode active');
    }
    
    handleSearchInput(searchText) {
        this.searchText = searchText;
        
        // Show/hide clear button
        if (this.elements.clearSearchBtn) {
            if (searchText.trim()) {
                this.elements.clearSearchBtn.classList.add('show');
            } else {
                this.elements.clearSearchBtn.classList.remove('show');
            }
        }
        
        // For now, just log the search (no actual filtering yet)
        console.log('🔍 Search:', searchText);
    }
    
    clearSearch() {
        if (this.elements.searchInput) {
            this.elements.searchInput.value = '';
            this.searchText = '';
        }
        
        if (this.elements.clearSearchBtn) {
            this.elements.clearSearchBtn.classList.remove('show');
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
        const units = this.getFilteredUnits();
        
        // Update results count
        this.updateResultsCount(units.length);
        
        // Get paginated units
        const paginatedUnits = this.getPaginatedUnits(this.currentPage, this.itemsPerPage);
        
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
        this.filterUnits(filters);
        this.currentPage = 1; // Reset to first page
        this.loadUnits();
    }
    
    handleSearchChange(searchText) {
        const filters = this.filterPanel.getFilters();
        filters.searchText = searchText;
        this.handleFilterChange(filters);
    }
    
    handleQuickFilterChange(quickFilters) {
        this.applyQuickFilters(quickFilters);
        this.currentPage = 1; // Reset to first page
        this.loadUnits();
    }
    
    handleSortChange(sortBy) {
        this.sortUnits(sortBy);
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
    
    // 添加searchUnit方法，用于从Tier List页面搜索特定单位
    searchUnit(unitId) {
        console.log(`🔍 Searching for unit: ${unitId}`);
        
        // 如果filterPanel存在，使用其搜索功能
        if (this.filterPanel && typeof this.filterPanel.clearSearch === 'function') {
            // 清空当前搜索
            this.filterPanel.clearSearch();
            
            // 设置搜索文本为单位ID或名称
            const unit = this.getUnitById(unitId);
            if (unit) {
                this.filterPanel.setSearchText(unit.name);
                this.handleSearchChange(unit.name);
            }
        } else {
            console.warn('⚠️ FilterPanel not initialized yet, cannot perform search');
            // 延迟执行搜索，等待组件初始化完成
            setTimeout(() => {
                if (this.filterPanel && typeof this.filterPanel.clearSearch === 'function') {
                    this.searchUnit(unitId);
                }
            }, 100);
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

    // Data management methods
    getFilteredUnits() {
        return this.filteredUnits;
    }
    
    getPaginatedUnits(page, itemsPerPage) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return this.filteredUnits.slice(startIndex, endIndex);
    }
    
    filterUnits(filters) {
        this.filteredUnits = this.units.filter(unit => {
            // Search text filter
            if (filters.searchText && filters.searchText.trim()) {
                const searchText = filters.searchText.toLowerCase();
                if (!unit.name.toLowerCase().includes(searchText) && 
                    !unit.description.toLowerCase().includes(searchText)) {
                    return false;
                }
            }
            
            // Rarity filter
            if (filters.rarity && filters.rarity !== 'all') {
                if (unit.rarity !== filters.rarity) {
                    return false;
                }
            }
            
            // Element filter
            if (filters.element && filters.element !== 'all') {
                if (unit.element !== filters.element) {
                    return false;
                }
            }
            
            // Category filter
            if (filters.category && filters.category !== 'all') {
                if (unit.category !== filters.category) {
                    return false;
                }
            }
            
            // Tier filter
            if (filters.tier && filters.tier !== 'all') {
                if (unit.tier !== filters.tier) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    applyQuickFilters(quickFilters) {
        this.filteredUnits = this.units.filter(unit => {
            // Evolution required filter
            if (quickFilters.evolutionRequired !== undefined) {
                if (unit.evolution_required !== quickFilters.evolutionRequired) {
                    return false;
                }
            }
            
            // Placement cost filter
            if (quickFilters.placementCost && quickFilters.placementCost !== 'all') {
                if (unit.placement_cost !== quickFilters.placementCost) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    sortUnits(sortBy) {
        this.filteredUnits.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'rarity':
                    const rarityOrder = { 'Secret': 6, 'Mythic': 5, 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 };
                    return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
                case 'tier':
                    const tierOrder = { 'SS': 6, 'S+': 5, 'S': 4, 'A': 3, 'B': 2, 'C': 1 };
                    return (tierOrder[b.tier] || 0) - (tierOrder[a.tier] || 0);
                case 'placement_cost':
                    const costOrder = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1, 'Very Low': 0 };
                    return (costOrder[b.placement_cost] || 0) - (costOrder[a.placement_cost] || 0);
                default:
                    return 0;
            }
        });
    }
    
    getUnitById(unitId) {
        return this.units.find(unit => unit.id === unitId);
    }
} 