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
            searchText: '',
            quickFilter: ''
        };
        
        // Pagination state
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.totalPages = 1;
        
        // View state
        this.currentView = 'grid';
        
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
            searchInput: document.getElementById('dbSearchInput'),
            searchResults: document.getElementById('dbSearchResults'),
            rarityFilter: document.getElementById('dbRarityFilter'),
            elementFilter: document.getElementById('dbElementFilter'),
            attackTypeFilter: document.getElementById('dbAttackTypeFilter'),
            unitTypeFilter: document.getElementById('dbUnitTypeFilter'),
            clearSearchBtn: document.getElementById('dbClearSearch'),
            activeFilters: document.getElementById('activeFilters'),
            resultsCount: document.getElementById('resultsCount'),
            unitsGrid: document.getElementById('unitsGrid'),
            sortSelect: document.getElementById('sortSelect'),
            compareButton: document.getElementById('compareButton'),
            selectedCount: document.getElementById('selectedCount'),
            itemsPerPage: document.getElementById('itemsPerPage'),
            pagination: document.getElementById('pagination'),
            viewToggle: document.querySelectorAll('.view-btn'),
            quickFilterTags: document.querySelectorAll('.quick-filter-tag')
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
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', debounce((e) => {
                this.currentFilters.searchText = e.target.value;
                this.updateSearchUI();
                this.applyFilters();
            }, 300));
        }

        // Clear search button
        if (this.elements.clearSearchBtn) {
            this.elements.clearSearchBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }
        
        // Filter changes
        if (this.elements.rarityFilter) {
            this.elements.rarityFilter.addEventListener('change', (e) => {
                this.currentFilters.rarity = e.target.value;
                this.applyFilters();
            });
        }
        
        if (this.elements.elementFilter) {
            this.elements.elementFilter.addEventListener('change', (e) => {
                this.currentFilters.element = e.target.value;
                this.applyFilters();
            });
        }
        
        if (this.elements.attackTypeFilter) {
            this.elements.attackTypeFilter.addEventListener('change', (e) => {
                this.currentFilters.attackType = e.target.value;
                this.applyFilters();
            });
        }

        if (this.elements.unitTypeFilter) {
            this.elements.unitTypeFilter.addEventListener('change', (e) => {
                this.currentFilters.unitType = e.target.value;
                this.applyFilters();
            });
        }

        // Quick filter tags
        if (this.elements.quickFilterTags) {
            this.elements.quickFilterTags.forEach(tag => {
                tag.addEventListener('click', (e) => {
                    const filter = e.currentTarget.dataset.filter;
                    this.applyQuickFilter(filter);
                });
            });
        }

        // View toggle
        if (this.elements.viewToggle) {
            this.elements.viewToggle.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const view = e.currentTarget.dataset.view;
                    this.changeView(view);
                });
            });
        }

        // Sort select
        if (this.elements.sortSelect) {
            this.elements.sortSelect.addEventListener('change', (e) => {
                this.sortUnits(e.target.value);
            });
        }

        // Compare button
        if (this.elements.compareButton) {
            this.elements.compareButton.addEventListener('click', () => {
                this.compareSelectedUnits();
            });
        }

        // Items per page
        if (this.elements.itemsPerPage) {
            this.elements.itemsPerPage.addEventListener('change', (e) => {
                this.itemsPerPage = parseInt(e.target.value);
                this.currentPage = 1;
                this.renderUnits();
                this.updatePagination();
            });
        }
    }
    
    loadUnits() {
        if (!this.unitsData) {
            console.warn('Units data not available');
            return;
        }
        
        this.filteredUnits = Object.values(this.unitsData);
        this.sortUnits('name');
        this.renderUnits();
        this.updateStats();
        this.updatePagination();
    }

    applyQuickFilter(filter) {
        // Remove active class from all quick filter tags
        this.elements.quickFilterTags.forEach(tag => {
            tag.classList.remove('active');
        });

        // Add active class to clicked tag
        const clickedTag = document.querySelector(`[data-filter="${filter}"]`);
        if (clickedTag) {
            clickedTag.classList.add('active');
        }

        // Apply quick filter logic
        this.currentFilters.quickFilter = filter;
        
        switch (filter) {
            case 'popular':
                this.filterByPopular();
                break;
            case 'highDPS':
                this.filterByHighDPS();
                break;
            case 'latest':
                this.filterByLatest();
                break;
            case 'beginner':
                this.filterByBeginner();
                break;
            default:
                this.currentFilters.quickFilter = '';
                this.applyFilters();
                return;
        }
    }

    filterByPopular() {
        // Filter by popular units (Secret, Mythic, Legendary)
        this.filteredUnits = Object.values(this.unitsData).filter(unit => 
            ['Secret', 'Mythic', 'Legendary'].includes(unit.rarity)
        );
        this.renderUnits();
        this.updateStats();
    }

    filterByHighDPS() {
        // Filter by high DPS units
        this.filteredUnits = Object.values(this.unitsData).filter(unit => {
            const dps = unit.stats?.dps;
            return dps && dps > 1000; // Adjust threshold as needed
        });
        this.renderUnits();
        this.updateStats();
    }

    filterByLatest() {
        // Filter by latest units (could be based on a date field)
        this.filteredUnits = Object.values(this.unitsData).filter(unit => 
            unit.rarity === 'Secret' || unit.rarity === 'Mythic'
        );
        this.renderUnits();
        this.updateStats();
    }

    filterByBeginner() {
        // Filter by beginner-friendly units (Rare, Epic)
        this.filteredUnits = Object.values(this.unitsData).filter(unit => 
            ['Rare', 'Epic'].includes(unit.rarity)
        );
        this.renderUnits();
        this.updateStats();
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
        
        // Apply attack type filter
        if (this.currentFilters.attackType) {
            filtered = filtered.filter(unit => 
                unit.attackType === this.currentFilters.attackType
            );
        }
        
        // Apply unit type filter
        if (this.currentFilters.unitType) {
            filtered = filtered.filter(unit => 
                unit.unitType === this.currentFilters.unitType
            );
        }
        
        this.filteredUnits = filtered;
        this.currentPage = 1; // Reset to first page
        console.log(`Filtered units: ${this.filteredUnits.length} out of ${Object.values(this.unitsData).length}`);
        this.renderUnits();
        this.updateStats();
        this.updateActiveFilters();
        this.updatePagination();
    }

    sortUnits(sortBy) {
        switch (sortBy) {
            case 'name':
                this.filteredUnits.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rarity':
                const rarityOrder = ['Exclusive', 'Secret', 'Mythic', 'Legendary', 'Epic', 'Rare'];
                this.filteredUnits.sort((a, b) => {
                    const aIndex = rarityOrder.indexOf(a.rarity);
                    const bIndex = rarityOrder.indexOf(b.rarity);
                    return aIndex - bIndex;
                });
                break;
            case 'dps':
                this.filteredUnits.sort((a, b) => {
                    const aDPS = a.stats?.dps || 0;
                    const bDPS = b.stats?.dps || 0;
                    return bDPS - aDPS;
                });
                break;
            case 'latest':
                // Sort by rarity (newer units tend to be higher rarity)
                this.sortUnits('rarity');
                break;
        }
        this.renderUnits();
    }
    
    renderUnits() {
        const grid = this.elements.unitsGrid;
        if (!grid) return;
        
        grid.innerHTML = '';
        
        if (this.filteredUnits.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No units found matching your criteria</p>
                                         <button class="clear-filters-btn" onclick="databasePage.resetFilters()">
                         <i class="fas fa-undo"></i> Clear All Filters
                     </button>
                </div>
            `;
            return;
        }
        
        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const unitsToShow = this.filteredUnits.slice(startIndex, endIndex);
        
        unitsToShow.forEach(unit => {
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
        const isSelected = this.selectedUnits.includes(unit.id);
        
        // Highlight search term if present
        const searchTerm = this.currentFilters.searchText;
        const highlightedName = searchTerm ? this.highlightSearchTerm(unit.name, searchTerm) : unit.name;
        
        card.innerHTML = `
            <div class="unit-card-header">
                <div class="rarity-badge" style="background: ${rarityColor}">
                    ${unit.rarity}
                </div>
                <div class="unit-card-actions">
                                         <button class="favorite-btn ${this.isFavorite(unit.id) ? 'active' : ''}" 
                             onclick="event.stopPropagation(); databasePage.toggleFavorite('${unit.id}')">
                         <i class="fas fa-heart"></i>
                     </button>
                     <button class="compare-checkbox ${isSelected ? 'checked' : ''}" 
                             onclick="event.stopPropagation(); databasePage.toggleUnitSelection('${unit.id}')">
                         <i class="fas fa-plus"></i>
                     </button>
                </div>
            </div>
            
            <div class="unit-card-body">
                <div class="unit-avatar">
                    <i class="${elementIcon}"></i>
                </div>
                <h3 class="unit-name">${highlightedName}</h3>
                <p class="unit-evolution">${unit.evolution || 'Base Form'}</p>
                <div class="element-badge">${unit.element}</div>
                
                <div class="stats-display">
                    <div class="stat-bar">
                        <div class="stat-bar-label">
                            <span>DPS</span>
                            <span>${unit.stats?.dps || 'N/A'}</span>
                        </div>
                        <div class="stat-bar-progress">
                            <div class="stat-bar-fill" style="width: ${this.getDPSPercentage(unit)}%"></div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <span>攻击速度</span>
                        <span>${unit.stats?.spa || 'N/A'}s</span>
                    </div>
                    <div class="stat-item">
                        <span>攻击范围</span>
                        <span>${unit.stats?.range || 'N/A'}</span>
                    </div>
                </div>
                
                <div class="tag-container">
                    ${unit.isNew ? '<span class="tag green">🆕 新单位</span>' : ''}
                    ${this.isPopular(unit) ? '<span class="tag orange">🔥 热门</span>' : ''}
                    ${this.isRecommended(unit) ? '<span class="tag blue">⭐ 推荐</span>' : ''}
                </div>
            </div>
            
            <div class="unit-card-footer">
                <div class="card-actions">
                                         <button class="btn-primary" onclick="event.stopPropagation(); databasePage.showUnitDetails(databasePage.unitsData['${unit.id}'])">
                         详细信息
                     </button>
                     <button class="btn-ghost" onclick="event.stopPropagation(); databasePage.toggleUnitSelection('${unit.id}')">
                         添加比较
                     </button>
                </div>
            </div>
        `;
        
        // Add event listener for card click
        card.addEventListener('click', () => {
            this.showUnitDetails(unit);
        });
        
        return card;
    }

    getDPSPercentage(unit) {
        const dps = unit.stats?.dps;
        if (!dps || dps === 'N/A') return 0;
        
        // Calculate percentage based on max DPS (adjust as needed)
        const maxDPS = 2000;
        return Math.min((dps / maxDPS) * 100, 100);
    }

    isFavorite(unitId) {
        const favorites = JSON.parse(localStorage.getItem('unitFavorites') || '[]');
        return favorites.includes(unitId);
    }

    isPopular(unit) {
        return ['Secret', 'Mythic', 'Legendary'].includes(unit.rarity);
    }

    isRecommended(unit) {
        return unit.rarity === 'Secret' || unit.rarity === 'Mythic';
    }

    toggleFavorite(unitId) {
        const favorites = JSON.parse(localStorage.getItem('unitFavorites') || '[]');
        const index = favorites.indexOf(unitId);
        
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(unitId);
        }
        
        localStorage.setItem('unitFavorites', JSON.stringify(favorites));
        this.renderUnits(); // Re-render to update favorite buttons
    }

    toggleUnitSelection(unitId) {
        const index = this.selectedUnits.indexOf(unitId);
        
        if (index > -1) {
            this.selectedUnits.splice(index, 1);
        } else {
            if (this.selectedUnits.length < 3) {
                this.selectedUnits.push(unitId);
            } else {
                showNotification('最多只能选择3个单位进行比较', 'warning');
                return;
            }
        }
        
        this.updateCompareButton();
        this.renderUnits(); // Re-render to update selection buttons
    }

    updateCompareButton() {
        if (this.elements.compareButton) {
            this.elements.compareButton.disabled = this.selectedUnits.length === 0;
        }
        if (this.elements.selectedCount) {
            this.elements.selectedCount.textContent = this.selectedUnits.length;
        }
    }

    changeView(view) {
        this.currentView = view;
        
        // Update view buttons
        this.elements.viewToggle.forEach(btn => {
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

    updateStats() {
        if (this.elements.resultsCount) {
            this.elements.resultsCount.textContent = `共找到 ${this.filteredUnits.length} 个单位`;
        }
    }

    updateActiveFilters() {
        if (!this.elements.activeFilters) return;

        const activeFilters = [];
        
        if (this.currentFilters.rarity) {
            activeFilters.push(`稀有度: ${this.currentFilters.rarity}`);
        }
        if (this.currentFilters.element) {
            activeFilters.push(`元素: ${this.currentFilters.element}`);
        }
        if (this.currentFilters.attackType) {
            activeFilters.push(`攻击类型: ${this.currentFilters.attackType}`);
        }
        if (this.currentFilters.unitType) {
            activeFilters.push(`单位类型: ${this.currentFilters.unitType}`);
        }
        if (this.currentFilters.searchText) {
            activeFilters.push(`搜索: "${this.currentFilters.searchText}"`);
        }
        if (this.currentFilters.quickFilter) {
            const filterLabels = {
                'popular': '热门',
                'highDPS': '高DPS',
                'latest': '最新',
                'beginner': '新手友好'
            };
            activeFilters.push(filterLabels[this.currentFilters.quickFilter] || this.currentFilters.quickFilter);
        }

        if (activeFilters.length > 0) {
            this.elements.activeFilters.innerHTML = `
                <div class="active-filter-tags">
                    ${activeFilters.map(filter => `
                        <span class="active-filter-tag">
                            ${filter}
                            <button onclick="databasePage.removeFilter('${filter}')" class="remove-filter-btn">
                                <i class="fas fa-times"></i>
                            </button>
                        </span>
                    `).join('')}
                </div>
            `;
        } else {
            this.elements.activeFilters.innerHTML = '';
        }
    }

    updatePagination() {
        if (!this.elements.pagination) return;

        this.totalPages = Math.ceil(this.filteredUnits.length / this.itemsPerPage);
        
        if (this.totalPages <= 1) {
            this.elements.pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
                 // Previous button
         paginationHTML += `
             <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                     onclick="databasePage.goToPage(${this.currentPage - 1})" 
                     ${this.currentPage === 1 ? 'disabled' : ''}>
                 <i class="fas fa-chevron-left"></i>
             </button>
         `;

        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(this.totalPages, this.currentPage + 2);

                 if (startPage > 1) {
             paginationHTML += `<button class="pagination-btn" onclick="databasePage.goToPage(1)">1</button>`;
             if (startPage > 2) {
                 paginationHTML += `<span class="pagination-ellipsis">...</span>`;
             }
         }

                 for (let i = startPage; i <= endPage; i++) {
             paginationHTML += `
                 <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                         onclick="databasePage.goToPage(${i})">
                     ${i}
                 </button>
             `;
         }

                 if (endPage < this.totalPages) {
             if (endPage < this.totalPages - 1) {
                 paginationHTML += `<span class="pagination-ellipsis">...</span>`;
             }
             paginationHTML += `<button class="pagination-btn" onclick="databasePage.goToPage(${this.totalPages})">${this.totalPages}</button>`;
         }

                 // Next button
         paginationHTML += `
             <button class="pagination-btn ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
                     onclick="databasePage.goToPage(${this.currentPage + 1})" 
                     ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                 <i class="fas fa-chevron-right"></i>
             </button>
         `;

        this.elements.pagination.innerHTML = paginationHTML;
    }

    goToPage(page) {
        if (page < 1 || page > this.totalPages) return;
        
        this.currentPage = page;
        this.renderUnits();
        this.updatePagination();
        
        // Scroll to top of units grid
        if (this.elements.unitsGrid) {
            this.elements.unitsGrid.scrollIntoView({ behavior: 'smooth' });
        }
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
            searchText: '',
            quickFilter: ''
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

        // Remove active class from quick filter tags
        this.elements.quickFilterTags.forEach(tag => {
            tag.classList.remove('active');
        });

        // Update search UI and apply filters
        this.updateSearchUI();
        this.applyFilters();
    }

         updateSearchUI() {
         const searchInput = this.elements.searchInput;
         const clearBtn = this.elements.clearSearchBtn;

         if (!searchInput || !clearBtn) return;

         const hasText = searchInput.value.trim().length > 0;
         clearBtn.style.display = hasText ? 'block' : 'none';
     }

     removeFilter(filterText) {
         // Parse filter text to determine which filter to remove
         if (filterText.includes('稀有度:')) {
             this.currentFilters.rarity = '';
             if (this.elements.rarityFilter) {
                 this.elements.rarityFilter.value = '';
             }
         } else if (filterText.includes('元素:')) {
             this.currentFilters.element = '';
             if (this.elements.elementFilter) {
                 this.elements.elementFilter.value = '';
             }
         } else if (filterText.includes('攻击类型:')) {
             this.currentFilters.attackType = '';
             if (this.elements.attackTypeFilter) {
                 this.elements.attackTypeFilter.value = '';
             }
         } else if (filterText.includes('单位类型:')) {
             this.currentFilters.unitType = '';
             if (this.elements.unitTypeFilter) {
                 this.elements.unitTypeFilter.value = '';
             }
         } else if (filterText.includes('搜索:')) {
             this.currentFilters.searchText = '';
             if (this.elements.searchInput) {
                 this.elements.searchInput.value = '';
             }
         } else if (filterText.includes('热门') || filterText.includes('高DPS') || filterText.includes('最新') || filterText.includes('新手友好')) {
             this.currentFilters.quickFilter = '';
             // Remove active class from quick filter tags
             this.elements.quickFilterTags.forEach(tag => {
                 tag.classList.remove('active');
             });
         }

         this.applyFilters();
     }

    highlightSearchTerm(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark style="background: rgba(162, 155, 254, 0.3); color: #fff; padding: 0.1rem 0.2rem; border-radius: 2px;">$1</mark>');
    }

    getRarityColor(rarity) {
        const colors = {
            'Rare': '#4CAF50',
            'Epic': '#2196F3',
            'Legendary': '#9C27B0',
            'Secret': '#FF9800',
            'Mythic': '#E91E63',
            'Mythical': '#E91E63',
            'Exclusive': '#FF5722'
        };
        return colors[rarity] || '#666';
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
            'Mythical': '#E91E63',
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
    
         compareUnits() {
         this.compareSelectedUnits();
     }

     compareSelectedUnits() {
         if (this.selectedUnits.length < 2) {
             showNotification('请至少选择2个单位进行比较', 'warning');
             return;
         }

         const selectedUnitsData = this.selectedUnits.map(id => this.unitsData[id]).filter(unit => unit);
         this.showComparison(selectedUnitsData);
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
            searchText: '',
            quickFilter: ''
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

        // Remove active class from quick filter tags
        this.elements.quickFilterTags.forEach(tag => {
            tag.classList.remove('active');
        });

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