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
        this.itemsPerPage = 35; // Show all units on one page for now
        this.selectedUnits = [];
        this.searchText = '';
        this.searchTimeout = null;
        
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
            
            // Load Unit Database data
            await this.loadUnitDatabaseData();
            
            // Initialize UI elements
            this.initializeUI();
            
            // Initialize search functionality
            this.initializeSearch();
            
            // Initialize components
            this.initializeComponents();
            
            // Render units
            this.renderUnits();
            
            this.isInitialized = true;
            console.log('✅ Database Page initialized!');
            return true;
        } catch (error) {
            console.error('❌ Database Page initialization failed:', error);
            throw error;
        }
    }
    
    async loadUnitDatabaseData() {
        try {
            // Wait for UnitDatabaseData to be available
            let attempts = 0;
            const maxAttempts = 50; // 5 seconds max wait
            
            while (typeof UnitDatabaseData === 'undefined' && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (typeof UnitDatabaseData !== 'undefined') {
                this.units = UnitDatabaseData.loadAllUnits();
                this.filteredUnits = [...this.units];
                console.log('📊 Loaded', this.units.length, 'units from Unit Database');
                console.log('📊 First few units:', this.units.slice(0, 3).map(u => u.name));
            } else {
                console.error('❌ UnitDatabaseData not available after waiting');
                this.units = [];
                this.filteredUnits = [];
            }
        } catch (error) {
            console.error('❌ Failed to load Unit Database data:', error);
            this.units = [];
            this.filteredUnits = [];
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
            clearSearchBtn: document.getElementById('clearSearchBtn'),
            resultsCount: document.getElementById('resultsCount'),
            rarityFilter: document.getElementById('rarityFilter'),
            elementFilter: document.getElementById('elementFilter'),
            typeFilter: document.getElementById('typeFilter'),
            sortFilter: document.getElementById('sortFilter'),
            clearFiltersBtn: document.getElementById('clearFiltersBtn'),
            viewToggle: document.querySelectorAll('.view-btn')
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
        
        // Initialize filter functionality
        if (this.elements.rarityFilter) {
            this.elements.rarityFilter.addEventListener('change', () => {
                this.handleFilterChange();
            });
        }
        
        if (this.elements.elementFilter) {
            this.elements.elementFilter.addEventListener('change', () => {
                this.handleFilterChange();
            });
        }
        
        if (this.elements.typeFilter) {
            this.elements.typeFilter.addEventListener('change', () => {
                this.handleFilterChange();
            });
        }
        
        if (this.elements.sortFilter) {
            this.elements.sortFilter.addEventListener('change', () => {
                this.handleFilterChange();
            });
        }
        
        if (this.elements.clearFiltersBtn) {
            this.elements.clearFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
        
        // Initialize view toggle
        if (this.elements.viewToggle) {
            this.elements.viewToggle.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.handleViewToggle(e.target.dataset.view);
                });
            });
        }
    }
    
    showNoDataMessage() {
        if (this.elements.unitsGrid) {
            this.elements.unitsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-database"></i>
                    <h3>No units found</h3>
                    <p>Unable to load unit data. Please refresh the page and try again.</p>
                </div>
            `;
        }
        console.log('❌ No unit data available');
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
        
        // Clear previous timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        // Debounce search with 300ms delay
        this.searchTimeout = setTimeout(() => {
            this.handleFilterChange();
        }, 300);
    }
    
    clearSearch() {
        if (this.elements.searchInput) {
            this.elements.searchInput.value = '';
            this.searchText = '';
        }
        
        if (this.elements.clearSearchBtn) {
            this.elements.clearSearchBtn.classList.remove('show');
        }
        
        // Trigger filter change to apply cleared search
        this.handleFilterChange();
    }
    
    initializeComponents() {
        // Initialize Filter Panel
        if (this.elements.filterPanel) {
            this.filterPanel = new FilterPanel(this.elements.filterPanel, {
                onFilterChange: (filters) => this.handleFilterChange(filters)
            });
        }
        
        // Initialize Pagination
        if (this.elements.pagination) {
            this.pagination = new Pagination(this.elements.pagination, {
                currentPage: this.currentPage,
                totalItems: this.filteredUnits.length,
                itemsPerPage: this.itemsPerPage,
                onPageChange: (page) => this.handlePageChange(page)
            });
        }
    }
    
    renderUnits() {
        if (!this.elements.unitsGrid) {
            console.error('Units grid container not found');
            return;
        }
        
        // Clear existing content
        this.elements.unitsGrid.innerHTML = '';
        
        if (!this.units || this.units.length === 0) {
            this.showNoDataMessage();
            return;
        }
        
        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const unitsToShow = this.filteredUnits.slice(startIndex, endIndex);
        
        // Create unit cards
        unitsToShow.forEach(unit => {
            const unitCard = this.createUnitCard(unit);
            this.elements.unitsGrid.appendChild(unitCard);
        });
        
        // Update pagination
        if (this.pagination) {
            this.pagination.update({
                currentPage: this.currentPage,
                totalItems: this.filteredUnits.length,
                itemsPerPage: this.itemsPerPage
            });
        }
        
        console.log(`📊 Rendered ${unitsToShow.length} units (page ${this.currentPage})`);
        this.updateResultsCount();
    }
    
    createUnitCard(unit) {
        const card = document.createElement('div');
        card.className = 'unit-card';
        
        // Get first letter of unit name for avatar
        const firstLetter = unit.name.charAt(0).toUpperCase();
        
        card.innerHTML = `
            <div class="unit-avatar ${unit.rarity.toLowerCase()}">
                ${firstLetter}
            </div>
            <div class="unit-name">${unit.name}</div>
            <div class="unit-badges">
                <div class="rarity-badge ${unit.rarity.toLowerCase()}">${unit.rarity}</div>
                <div class="element-icon">${unit.element}</div>
            </div>
            <div class="unit-costs">
                <div class="deployment-cost">${unit.deploymentCost}¥</div>
                <div class="upgrade-cost">Upgrade: ${unit.maxUpgradeCost}¥</div>
            </div>
            <div class="unit-description">
                ${unit.description}
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
            setTimeout(() => {
                modal.classList.add('show');
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
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }
    
    closeModal() {
        const modal = document.getElementById('unitDetailsModal');
        if (!modal) return;
        
        // Remove show class for animation
        modal.classList.remove('show');
        
        // Hide modal after animation
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    handleFilterChange() {
        // Check if data is loaded
        if (!this.units || !Array.isArray(this.units) || this.units.length === 0) {
            console.warn('⚠️ Cannot filter: units data not loaded yet');
            return;
        }
        
        const filters = {
            rarity: this.elements.rarityFilter?.value || '',
            element: this.elements.elementFilter?.value || '',
            type: this.elements.typeFilter?.value || '',
            searchText: this.searchText || ''
        };
        
        console.log('🔍 Filter changed:', filters);
        
        // Apply filters using the existing filterUnits method
        this.filterUnits(filters);
        
        // Apply sorting
        const sortValue = this.elements.sortFilter?.value || 'name-asc';
        const [sortBy, order] = sortValue.split('-');
        this.filteredUnits = UnitDatabaseData.sortUnits(this.filteredUnits, sortBy, order);
        
        this.currentPage = 1; // Reset to first page
        this.renderUnits();
        this.updateResultsCount();
    }
    
    handlePageChange(page) {
        this.currentPage = page;
        this.renderUnits();
    }
    
    
    clearAllFilters() {
        if (this.elements.rarityFilter) this.elements.rarityFilter.value = '';
        if (this.elements.elementFilter) this.elements.elementFilter.value = '';
        if (this.elements.typeFilter) this.elements.typeFilter.value = '';
        if (this.elements.sortFilter) this.elements.sortFilter.value = 'name-asc';
        if (this.elements.searchInput) this.elements.searchInput.value = '';
        
        this.searchText = '';
        this.filteredUnits = [...this.units];
        this.currentPage = 1;
        this.renderUnits();
        this.updateResultsCount();
    }
    
    handleViewToggle(view) {
        // Update active button
        this.elements.viewToggle.forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.currentView = view;
        // TODO: Implement list view
        console.log('View changed to:', view);
    }
    
    updateResultsCount() {
        if (this.elements.resultsCount) {
            const count = this.filteredUnits ? this.filteredUnits.length : 0;
            this.elements.resultsCount.textContent = `Found ${count} units`;
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
        // Add safety check for filters parameter
        if (!filters) {
            console.warn('⚠️ filterUnits called with undefined filters, using default');
            filters = {
                searchText: '',
                rarity: '',
                element: '',
                type: ''
            };
        }
        
        // Ensure units array exists
        if (!this.units || !Array.isArray(this.units)) {
            console.warn('⚠️ No units data available for filtering');
            this.filteredUnits = [];
            return;
        }
        
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
            if (filters.type && filters.type !== '') {
                if (unit.type !== filters.type) {
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