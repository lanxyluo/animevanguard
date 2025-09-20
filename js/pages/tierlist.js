export class TierListPage {
    constructor(app) {
        this.app = app;
        this.dataManager = null;
        this.currentFilters = {};
        this.isLoading = false;
    }
    
    async initialize(data) {
        console.log('🎯 Tier List initialized');
        this.data = data;
        
        try {
            // Import the tier list data module
            const { TierListDataManager, TIER_INFO, ELEMENT_INFO, RARITY_INFO } = await import('../tier-list-data.js');
            this.dataManager = new TierListDataManager();
            this.TIER_INFO = TIER_INFO;
            this.ELEMENT_INFO = ELEMENT_INFO;
            this.RARITY_INFO = RARITY_INFO;
            
            console.log('✅ Tier list data manager loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load tier list data manager:', error);
        }
    }
    
    async show() {
        console.log('🎯 Tier List shown');
        await this.renderTierList();
    }
    
    async renderTierList() {
        const container = document.getElementById('tierListContent');
        if (!container) {
            console.error('❌ Container tierListContent not found!');
            return;
        }
        
        if (!this.dataManager) {
            container.innerHTML = `
                <div class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Loading tier list data manager...</p>
                </div>
            `;
            return;
        }
        
        try {
            // Load tier list data
            const data = await this.dataManager.getAllData();
            this.render(container, data);
        } catch (error) {
            console.error('❌ Failed to load tier list data:', error);
            container.innerHTML = `
                <div class="error-container">
                    <h3>Failed to load tier list data</h3>
                    <p>Please try refreshing the page.</p>
                </div>
            `;
        }
    }
    
    render(container, data) {
        console.log('🎨 Rendering tier list content');
        
        const html = `
            <div class="tier-list-wrapper">
                <!-- Filter Section -->
                <div class="filter-section">
                    <div class="filter-header">
                        <h3><i class="fas fa-filter"></i> Filter & Sort Options</h3>
                    </div>
                    <div class="filter-controls">
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>Tier:</label>
                                <select id="tierFilter" class="filter-select">
                                    <option value="">All Tiers</option>
                                    <option value="BROKEN">🔥 BROKEN</option>
                                    <option value="META">⚡ META</option>
                                    <option value="SUB_META">💎 SUB-META</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Element:</label>
                                <select id="elementFilter" class="filter-select">
                                    <option value="">All Elements</option>
                                    <option value="Unknown">❓ Unknown</option>
                                    <option value="Dark">🌑 Dark</option>
                                    <option value="Nature">🌿 Nature</option>
                                    <option value="Holy">✨ Holy</option>
                                    <option value="Fire">🔥 Fire</option>
                                    <option value="Wind">💨 Wind</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Rarity:</label>
                                <select id="rarityFilter" class="filter-select">
                                    <option value="">All Rarities</option>
                                    <option value="Vanguard">Vanguard</option>
                                    <option value="Secret">Secret</option>
                                    <option value="Mythic">Mythic</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Sort By:</label>
                                <select id="sortBy" class="filter-select">
                                    <option value="tier">Tier Ranking</option>
                                    <option value="name">Name</option>
                                    <option value="dps">DPS</option>
                                    <option value="cost">Deploy Cost</option>
                                    <option value="maxCost">Max Cost</option>
                                </select>
                            </div>
                        </div>
                        <div class="filter-buttons">
                            <button id="applyFilters" class="apply-btn">Apply Filters</button>
                            <button id="clearFilters" class="clear-btn">Clear All</button>
                        </div>
                    </div>
                </div>
                
                <div class="tier-list-container" id="tierListResults">
                    ${this.renderTiers(data)}
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Setup filter event listeners
        this.setupFilterListeners(data);
        
        console.log('✅ Tier list content rendered successfully');
    }
    
    renderTiers(data) {
        if (!this.TIER_INFO) return '';
        
        return Object.keys(this.TIER_INFO)
            .sort((a, b) => this.TIER_INFO[a].priority - this.TIER_INFO[b].priority)
            .map((tierKey, index) => {
                const tierInfo = this.TIER_INFO[tierKey];
                const characters = data[tierKey] || [];
                
                return `
                    <div class="tier-row" data-tier="${tierKey}" style="animation-delay: ${index * 0.2}s">
                        <div class="tier-label" data-tier="${tierKey}">
                            <div class="tier-label-content">
                                <div class="tier-name">${tierInfo.name}</div>
                                <div class="tier-description">${tierInfo.description}</div>
                            </div>
                            <div class="tier-count">${characters.length} ${characters.length === 1 ? 'unit' : 'units'}</div>
                        </div>
                        <div class="tier-characters">
                            ${this.renderCharacters(characters, tierKey)}
                        </div>
                    </div>
                `;
            }).join('');
    }
    
    renderCharacters(characters, tierKey) {
        return characters.map(character => `
            <div class="character-card" data-character-id="${character.id}">
                <div class="character-header">
                    <h4 class="character-name">${character.name}</h4>
                    <span class="character-rarity ${character.rarity.toLowerCase()}">${character.rarity}</span>
                </div>
                <div class="character-element">
                    <span class="element-badge" style="color: ${this.ELEMENT_INFO[character.element]?.color || '#ffffff'}">
                        ${this.ELEMENT_INFO[character.element]?.icon || '❓'} ${character.element}
                    </span>
                </div>
                <div class="character-stats">
                    <div class="stat-row">
                        <span class="stat-label">Deploy Cost:</span>
                        <span class="stat-value">${character.deploymentCost.toLocaleString()}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Max Cost:</span>
                        <span class="stat-value">${character.maxCost.toLocaleString()}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">DPS:</span>
                        <span class="stat-value">${character.stats?.dps?.toLocaleString() || 'N/A'}</span>
                    </div>
                </div>
                <p class="character-description">${character.description}</p>
                <div class="character-modes">
                    ${Object.entries(character.gameMode).map(([mode, rating]) => 
                        `<span class="mode-rating rating-${rating.toLowerCase().replace('+', 'plus')}">${mode}: ${rating}</span>`
                    ).join('')}
                </div>
                <div class="character-source">
                    <small>From: ${character.animeSource}</small>
                </div>
            </div>
        `).join('');
    }
    
    setupFilterListeners(data) {
        const tierFilter = document.getElementById('tierFilter');
        const elementFilter = document.getElementById('elementFilter');
        const rarityFilter = document.getElementById('rarityFilter');
        const sortBy = document.getElementById('sortBy');
        const applyBtn = document.getElementById('applyFilters');
        const clearBtn = document.getElementById('clearFilters');
        
        if (!applyBtn || !clearBtn) return;
        
        applyBtn.addEventListener('click', () => {
            this.applyFilters(data);
        });
        
        clearBtn.addEventListener('click', () => {
            this.clearFilters(data);
        });
    }
    
    applyFilters(data) {
        const tierFilter = document.getElementById('tierFilter')?.value || '';
        const elementFilter = document.getElementById('elementFilter')?.value || '';
        const rarityFilter = document.getElementById('rarityFilter')?.value || '';
        const sortBy = document.getElementById('sortBy')?.value || 'tier';
        
        // Filter data
        let filteredData = {};
        
        Object.keys(data).forEach(tierKey => {
            if (tierFilter && tierKey !== tierFilter) return;
            
            const filteredCharacters = data[tierKey].filter(character => {
                if (elementFilter && character.element !== elementFilter) return false;
                if (rarityFilter && character.rarity !== rarityFilter) return false;
                return true;
            });
            
            if (filteredCharacters.length > 0) {
                filteredData[tierKey] = filteredCharacters;
            }
        });
        
        // Sort data if needed
        if (sortBy !== 'tier') {
            Object.keys(filteredData).forEach(tierKey => {
                filteredData[tierKey].sort((a, b) => {
                    switch (sortBy) {
                        case 'name':
                            return a.name.localeCompare(b.name);
                        case 'dps':
                            return (b.stats?.dps || 0) - (a.stats?.dps || 0);
                        case 'cost':
                            return a.deploymentCost - b.deploymentCost;
                        case 'maxCost':
                            return a.maxCost - b.maxCost;
                        default:
                            return 0;
                    }
                });
            });
        }
        
        // Re-render with filtered data
        const resultsContainer = document.getElementById('tierListResults');
        if (resultsContainer) {
            resultsContainer.innerHTML = this.renderTiers(filteredData);
        }
        
        console.log('🔍 Filters applied:', { tierFilter, elementFilter, rarityFilter, sortBy });
    }
    
    clearFilters(data) {
        // Reset all filter controls
        const tierFilter = document.getElementById('tierFilter');
        const elementFilter = document.getElementById('elementFilter');
        const rarityFilter = document.getElementById('rarityFilter');
        const sortBy = document.getElementById('sortBy');
        
        if (tierFilter) tierFilter.value = '';
        if (elementFilter) elementFilter.value = '';
        if (rarityFilter) rarityFilter.value = '';
        if (sortBy) sortBy.value = 'tier';
        
        // Re-render with original data
        const resultsContainer = document.getElementById('tierListResults');
        if (resultsContainer) {
            resultsContainer.innerHTML = this.renderTiers(data);
        }
        
        console.log('🧹 Filters cleared');
    }
    
    destroy() {
        console.log('🗑️ TierListPage destroyed');
    }
}