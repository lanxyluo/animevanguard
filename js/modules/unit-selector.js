// Use global variables instead of ES6 module imports
// import { loadAllUnits } from '../config/unit-database-data.js';

class UnitSelector {
    constructor(onUnitSelect) {
        // Prevent duplicate initialization
        if (this.initialized) {
            console.log('⏭️ UnitSelector already initialized, skipping');
            return;
        }
        
        this.onUnitSelect = onUnitSelect;
        this.units = this.loadUnits();
        this.init();
        this.initialized = true;
    }

    loadUnits() {
        // Wait for data loading to complete
        if (window.UnitDatabaseData && window.UnitDatabaseData.loadAllUnits) {
            console.log('✅ Loading units from UnitDatabaseData...');
            const rawUnits = window.UnitDatabaseData.loadAllUnits();
            console.log(`📊 Loaded ${rawUnits.length} raw units from database`);
            
            // Use new data processing flow
            if (window.normalizeUnitsData) {
                const normalizedUnits = window.normalizeUnitsData(rawUnits);
                console.log(`✅ Normalized ${normalizedUnits.length} units`);
                
                // Data integrity check
                if (window.checkDataIntegrity) {
                    const integrityReport = window.checkDataIntegrity(normalizedUnits);
                    console.log('📋 Data integrity report:', integrityReport);
                    
                    if (integrityReport.invalidUnits > 0) {
                        console.warn(`⚠️ ${integrityReport.invalidUnits} units have data issues:`, integrityReport.issues);
                    }
                }
                
                return normalizedUnits;
            } else {
                console.warn('⚠️ normalizeUnitsData function not available, using raw data');
                return rawUnits;
            }
        } else {
            console.warn('⏳ UnitDatabaseData not available, retrying in 100ms...');
            // Delayed retry
            setTimeout(() => {
                if (window.UnitDatabaseData && window.UnitDatabaseData.loadAllUnits) {
                    const rawUnits = window.UnitDatabaseData.loadAllUnits();
                    if (window.normalizeUnitsData) {
                        this.units = window.normalizeUnitsData(rawUnits);
                    } else {
                        this.units = rawUnits;
                    }
                    this.renderUnits();
                    console.log(`✅ Retry successful: loaded ${this.units.length} units`);
                }
            }, 100);
            return [];
        }
    }

    init() {
        console.log('🔗 Initializing UnitSelector...');
        this.renderUnits();
        this.bindSearchEvents();
        this.initializeFilters();
        console.log('✅ UnitSelector initialization completed');
    }

    renderUnits(filteredUnits = this.units) {
        const gridContainer = document.getElementById('unit-grid');
        if (!gridContainer) {
            console.error('Unit grid container not found!');
            return;
        }
        
        console.log(`Rendering ${filteredUnits.length} units...`);
        gridContainer.innerHTML = '';

        if (filteredUnits.length === 0) {
            gridContainer.innerHTML = `
                <div class="col-span-2 text-center text-gray-400 py-8">
                    <i class="fas fa-search text-4xl mb-4"></i>
                    <p>No units found</p>
                </div>
            `;
            return;
        }

        filteredUnits.forEach(unit => {
            try {
                const unitCard = this.createUnitCard(unit);
                gridContainer.appendChild(unitCard);
            } catch (error) {
                console.error('Error creating unit card for:', unit.name, error);
            }
        });
    }

    createUnitCard(unit) {
        const card = document.createElement('div');
        card.className = 'unit-card bg-gray-700 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:bg-gray-600 hover:scale-105 hover:shadow-lg border-2 border-transparent';
        
        // Rarity color
        const rarityColors = {
            'Vanguard': 'border-purple-500 bg-gradient-to-br from-purple-800 to-gray-700',
            'Secret': 'border-red-500 bg-gradient-to-br from-red-800 to-gray-700',
            'Mythic': 'border-yellow-500 bg-gradient-to-br from-yellow-800 to-gray-700',
            'Legendary': 'border-orange-500 bg-gradient-to-br from-orange-800 to-gray-700'
        };

        card.innerHTML = `
            <div class="text-center">
                <div class="relative mb-2">
                    <img src="${unit.image || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'64\' height=\'64\' viewBox=\'0 0 64 64\'%3E%3Crect width=\'64\' height=\'64\' fill=\'%23374151\'/%3E%3Ctext x=\'32\' y=\'32\' text-anchor=\'middle\' dy=\'0.35em\' font-family=\'Arial\' font-size=\'24\' fill=\'%23fff\'%3E${unit.name.charAt(0)}%3C/text%3E%3C/svg%3E'}" 
                         alt="${unit.name}" 
                         class="w-16 h-16 mx-auto rounded-lg object-cover border-2 ${rarityColors[unit.rarity] ? 'border-current' : 'border-gray-600'}"
                         loading="lazy">
                    
                    <!-- Rarity label -->
                    <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full ${this.getRarityColor(unit.rarity)}"></div>
                </div>
                
                <h3 class="text-xs font-medium text-white leading-tight mb-1">${unit.name}</h3>
                <div class="text-xs px-2 py-1 rounded ${this.getRarityBadgeClass(unit.rarity)}">
                    ${unit.rarity}
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            this.selectUnit(unit, card);
        });

        return card;
    }

    getRarityColor(rarity) {
        const colors = {
            'Vanguard': 'bg-purple-500',
            'Secret': 'bg-red-500', 
            'Mythic': 'bg-yellow-500',
            'Legendary': 'bg-orange-500',
            'Epic': 'bg-blue-500',
            'Rare': 'bg-green-500',
            'Common': 'bg-gray-500'
        };
        return colors[rarity] || 'bg-gray-500';
    }

    getRarityBadgeClass(rarity) {
        const classes = {
            'Vanguard': 'bg-purple-600 text-purple-100',
            'Secret': 'bg-red-600 text-red-100',
            'Mythic': 'bg-yellow-600 text-yellow-100', 
            'Legendary': 'bg-orange-600 text-orange-100',
            'Epic': 'bg-blue-600 text-blue-100',
            'Rare': 'bg-green-600 text-green-100',
            'Common': 'bg-gray-600 text-gray-100'
        };
        return classes[rarity] || 'bg-gray-600 text-gray-100';
    }

    selectUnit(unit, cardElement) {
        console.log('🎯 Selected unit:', unit.name);
        
        // Remove previous selected state
        document.querySelectorAll('#unit-grid > div').forEach(el => {
            el.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-600');
        });
        
        // Add selected state
        cardElement.classList.add('ring-2', 'ring-blue-500', 'bg-blue-600');
        
        // Display selected character basic info
        this.showUnitInfo(unit);
        
        // Update Training Ground panel
        this.updateTrainingGroundPanel(unit);
        
        // Trigger selection callback
        this.onUnitSelect(unit);
        
        console.log('📊 Current DPS calculation:', this.calculateDPS(unit));
    }

    showUnitInfo(unit) {
        // Display selected unit basic info above unit grid
        let infoPanel = document.getElementById('selected-unit-info');
        if (!infoPanel) {
            infoPanel = document.createElement('div');
            infoPanel.id = 'selected-unit-info';
            infoPanel.className = 'mb-4 p-4 bg-gray-800 rounded-lg border border-gray-600';
            
            const unitGrid = document.getElementById('unit-grid');
            unitGrid.parentNode.insertBefore(infoPanel, unitGrid);
        }

        // Calculate basic attributes
        const baseAttack = this.calculateBaseAttack(unit, 1);
        const attackSpeed = this.calculateBaseSpeed(unit, 1);
        const range = this.getRangeValue(unit.range);

        infoPanel.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${unit.image || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 48 48\'%3E%3Crect width=\'48\' height=\'48\' fill=\'%23374151\'/%3E%3Ctext x=\'24\' y=\'24\' text-anchor=\'middle\' dy=\'0.35em\' font-family=\'Arial\' font-size=\'18\' fill=\'%23fff\'%3E${unit.name.charAt(0)}%3C/text%3E%3C/svg%3E'}" 
                     alt="${unit.name}" 
                     class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-white">${unit.name}</h3>
                    <div class="flex items-center space-x-2 text-sm text-gray-300">
                        <span class="px-2 py-1 rounded ${this.getRarityBadgeClass(unit.rarity)}">${unit.rarity}</span>
                        ${unit.element ? `<span class="px-2 py-1 rounded bg-gray-600 text-gray-100">${unit.element}</span>` : ''}
                    </div>
                </div>
                <div class="text-right text-sm text-gray-300">
                    <div>Attack power: <span class="text-white font-medium">${Math.round(baseAttack).toLocaleString()}</span></div>
                    <div>Attack interval: <span class="text-white font-medium">${attackSpeed.toFixed(2)}s</span></div>
                    <div>Range: <span class="text-white font-medium">${range}</span></div>
                </div>
            </div>
        `;
    }

    calculateBaseAttack(unit, level) {
        if (!unit.attack || !unit.attack.base) return 0;
        return unit.attack.base + (level - 1) * (unit.attack.growth || 50);
    }

    calculateBaseSpeed(unit, level) {
        if (!unit.speed || !unit.speed.base) return 1.0;
        return unit.speed.base + (level - 1) * (unit.speed.growth || 0.1);
    }

    getRangeValue(range) {
        if (typeof range === 'number') return range;
        if (typeof range === 'string') {
            const rangeMap = {
                'Melee': 1,
                'Short range': 2,
                'Medium range': 3,
                'Long range': 4,
                'Ultra long range': 5
            };
            return rangeMap[range] || 1;
        }
        return 1;
    }

    bindSearchEvents() {
        const searchInput = document.getElementById('unit-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            this.filterUnits();
        });
    }

    initializeFilters() {
        console.log('🔗 Setting up filter event listeners...');
        
        // Filter buttons (both rarity and element)
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                console.log('🔘 Filter button clicked:', e.target.textContent);
                this.handleFilterClick(e.target);
            });
        });
        
        console.log('✅ Filter event listeners setup completed');
    }

    handleFilterClick(button) {
        // Remove active state from other buttons in the same group
        const parentGroup = button.closest('.filter-group');
        if (parentGroup) {
            parentGroup.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }
        button.classList.add('active');
        
        // Apply filter
        this.filterUnits();
    }

    filterUnits() {
        const searchTerm = document.getElementById('unit-search').value.toLowerCase();
        const activeRarity = document.querySelector('.filter-btn[data-filter].active')?.dataset.filter || 'all';
        const activeElement = document.querySelector('.filter-btn[data-element].active')?.dataset.element || 'all';
        
        const filtered = this.units.filter(unit => {
            const matchesSearch = unit.name.toLowerCase().includes(searchTerm) ||
                                 unit.rarity.toLowerCase().includes(searchTerm) ||
                                 (unit.element && unit.element.toLowerCase().includes(searchTerm));
            const matchesRarity = activeRarity === 'all' || unit.rarity === activeRarity;
            const matchesElement = activeElement === 'all' || unit.element === activeElement;
            return matchesSearch && matchesRarity && matchesElement;
        });
        
        this.renderUnits(filtered);
        const unitCountEl = document.getElementById('unit-count');
        if (unitCountEl) {
            unitCountEl.textContent = `${filtered.length} units`;
        }
    }

    updateTrainingGroundPanel(unit) {
        // Update unit preview in Training Ground
        const previewName = document.getElementById('unit-preview-name');
        const previewBadges = document.getElementById('unit-preview-badges');
        const previewImage = document.getElementById('unit-preview-image');
        
        if (previewName) {
            previewName.textContent = unit.name;
        }
        
        if (previewBadges) {
            const rarityClass = `rarity-${unit.rarity.toLowerCase()}`;
            previewBadges.innerHTML = `
                <span class="unit-badge ${rarityClass}">${unit.rarity}</span>
                ${unit.element ? `<span class="unit-badge element-${unit.element.toLowerCase()}">${unit.element}</span>` : ''}
            `;
        }
        
        if (previewImage) {
            previewImage.src = unit.image || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23374151'/%3E%3Ctext x='60' y='60' text-anchor='middle' dy='0.35em' font-family='Arial' font-size='48' fill='%23fff'%3E${unit.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
        }
        
        // Update level slider max based on rarity
        const levelSlider = document.getElementById('level-slider');
        if (levelSlider) {
            const maxLevel = this.getMaxLevelForRarity(unit.rarity);
            levelSlider.max = maxLevel;
            levelSlider.value = 1;
            
            const levelValue = document.getElementById('level-value');
            if (levelValue) {
                levelValue.textContent = '1';
            }
        }
        
        // Reset upgrade slider
        const upgradeSlider = document.getElementById('upgrade-slider');
        if (upgradeSlider) {
            upgradeSlider.value = 0;
            const upgradeValue = document.getElementById('upgrade-value');
            if (upgradeValue) {
                upgradeValue.textContent = '0';
            }
        }
        
        // Reset buff options
        const buffCheckboxes = document.querySelectorAll('.buff-option input[type="checkbox"]');
        buffCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    calculateDPS(unit) {
        if (!unit) return 0;
        
        // Basic DPS calculation
        const baseAttack = this.calculateBaseAttack(unit, 1);
        const baseSpeed = this.calculateBaseSpeed(unit, 1);
        return Math.round(baseAttack * baseSpeed);
    }

    getMaxLevelForRarity(rarity) {
        const maxLevels = {
            'Vanguard': 60,
            'Secret': 50,
            'Mythic': 40,
            'Legendary': 30,
            'Epic': 25
        };
        return maxLevels[rarity] || 30;
    }
}

// Export to global variables
window.UnitSelector = UnitSelector;
