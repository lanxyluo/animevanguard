// Import data modules
import { unitsData } from './config/units.js';
import { materialsConfig } from './config/materials.js';
import { elementIcons } from './config/constants.js';

// Import utility functions
import { showError, showNotification } from './utils/dom.js';

export class App {
    constructor() {
        this.isInitialized = false;
        
        // Data
        this.data = {
            unitsData,
            materialsConfig,
            elementIcons
        };
        
        // Current state
        this.currentPage = 'evolution';
        this.selectedUnit = null;
        
        // DOM elements
        this.elements = {};
    }
    
    async initialize() {
        console.log('🚀 Initializing Anime Vanguards Calculator App...');
        
        try {
            // Initialize navigation
            this.initializeNavigation();
            
            // Initialize evolution page
            this.initializeEvolutionPage();
            
            // Set up global event listeners
            this.setupGlobalEvents();
            
            // Show default page (evolution)
            this.showPage('evolution');
            
            this.isInitialized = true;
            console.log('✅ App initialized successfully!');
            
        } catch (error) {
            console.error('❌ App initialization failed:', error);
            showError('Failed to initialize application: ' + error.message, 'error');
            throw error;
        }
    }
    
    initializeNavigation() {
        console.log('🔧 Initializing navigation...');
        
        // Get page containers
        this.pageContainers = {
            evolution: document.getElementById('evolutionPage'),
            dps: document.getElementById('dpsPage'),
            database: document.getElementById('databasePage'),
            about: document.getElementById('aboutPage')
        };
        
        // Get navigation tabs
        this.navTabs = document.querySelectorAll('.nav-tab');
        
        console.log('✅ Navigation initialized');
    }
    
    initializeEvolutionPage() {
        console.log('🔧 Initializing evolution page...');
        
        // Get evolution page elements
        this.evolutionElements = {
            unitSearch: document.getElementById('unitSearch'),
            rarityFilter: document.getElementById('rarityFilter'),
            elementFilter: document.getElementById('elementFilter'),
            unitSelect: document.getElementById('unitSelect'),
            unitPlaceholder: document.getElementById('unitPlaceholder'),
            materialsList: document.getElementById('evolutionRequirements'),
            costSummary: document.getElementById('costSummary'),
            farmingGuide: document.getElementById('farmingGuide')
        };
        
        // Debug: Check if all elements are found
        console.log('Evolution elements found:', {
            unitSearch: !!this.evolutionElements.unitSearch,
            rarityFilter: !!this.evolutionElements.rarityFilter,
            elementFilter: !!this.evolutionElements.elementFilter,
            unitSelect: !!this.evolutionElements.unitSelect,
            unitPlaceholder: !!this.evolutionElements.unitPlaceholder,
            materialsList: !!this.evolutionElements.materialsList,
            costSummary: !!this.evolutionElements.costSummary,
            farmingGuide: !!this.evolutionElements.farmingGuide
        });
        
        // Populate element filter with all elements
        this.populateElementFilter();
        
        // Populate unit select
        this.populateUnitSelect();
        
        // Bind evolution page events
        this.bindEvolutionEvents();
        
        console.log('✅ Evolution page initialized');
    }
    
    populateElementFilter() {
        console.log('🔧 Populating element filter...');
        
        if (!this.evolutionElements.elementFilter) {
            console.error('❌ Element filter element not found!');
            return;
        }
        
        // Clear existing options except "All Elements"
        this.evolutionElements.elementFilter.innerHTML = '<option value="">All Elements</option>';
        
        // Add all element options
        const elements = [
            'Fire', 'Water', 'Earth', 'Wind', 'Light', 'Dark', 'Cosmic',
            'Giant', 'Blast', 'Nuclear', 'Electric', 'Ice', 'Poison', 'Psychic', 'Physical'
        ];
        
        elements.forEach(element => {
            const option = document.createElement('option');
            option.value = element;
            option.textContent = element;
            this.evolutionElements.elementFilter.appendChild(option);
        });
        
        console.log(`✅ Element filter populated with ${elements.length} elements`);
    }
    
    populateUnitSelect() {
        console.log('🔧 Populating unit select...');
        
        if (!this.evolutionElements.unitSelect) {
            console.error('❌ Unit select element not found!');
            return;
        }
        
        // Clear existing options except "Select Unit..."
        this.evolutionElements.unitSelect.innerHTML = '<option value="">Select Unit...</option>';
        
        // Add unit options
        const units = Object.values(this.data.unitsData);
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${unit.name} (${unit.evolution})`;
            this.evolutionElements.unitSelect.appendChild(option);
        });
        
        console.log(`✅ Unit select populated with ${units.length} units`);
    }
    
    bindEvolutionEvents() {
        console.log('🔧 Binding evolution events...');
        
        // Unit search
        if (this.evolutionElements.unitSearch) {
            console.log('Binding unit search event');
            this.evolutionElements.unitSearch.addEventListener('input', (e) => {
                console.log('Unit search input:', e.target.value);
                this.filterUnits(e.target.value);
            });
        } else {
            console.error('❌ Unit search element not found');
        }
        
        // Rarity filter
        if (this.evolutionElements.rarityFilter) {
            console.log('Binding rarity filter event');
            this.evolutionElements.rarityFilter.addEventListener('change', () => {
                console.log('Rarity filter changed');
                this.filterUnits();
            });
        } else {
            console.error('❌ Rarity filter element not found');
        }
        
        // Element filter
        if (this.evolutionElements.elementFilter) {
            console.log('Binding element filter event');
            this.evolutionElements.elementFilter.addEventListener('change', () => {
                console.log('Element filter changed');
                this.filterUnits();
            });
        } else {
            console.error('❌ Element filter element not found');
        }
        
        // Unit select
        if (this.evolutionElements.unitSelect) {
            console.log('Binding unit select event');
            this.evolutionElements.unitSelect.addEventListener('change', (e) => {
                const unitId = e.target.value;
                console.log('Unit select changed to:', unitId);
                if (unitId) {
                    const unit = this.data.unitsData[unitId];
                    if (unit) {
                        console.log('Found unit:', unit.name);
                        this.selectUnit(unit);
                    } else {
                        console.error('❌ Unit not found:', unitId);
                    }
                } else {
                    console.log('Clearing unit selection');
                    this.clearUnitSelection();
                }
            });
        } else {
            console.error('❌ Unit select element not found');
        }
        
        console.log('✅ Evolution events bound');
    }
    
    filterUnits(searchTerm = '') {
        const rarityFilter = this.evolutionElements.rarityFilter ? this.evolutionElements.rarityFilter.value : '';
        const elementFilter = this.evolutionElements.elementFilter ? this.evolutionElements.elementFilter.value : '';
        
        const filteredUnits = Object.values(this.data.unitsData).filter(unit => {
            const matchesSearch = !searchTerm || 
                unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unit.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesRarity = !rarityFilter || unit.rarity === rarityFilter;
            const matchesElement = !elementFilter || unit.element === elementFilter;
            
            return matchesSearch && matchesRarity && matchesElement;
        });
        
        // Update unit select dropdown
        if (this.evolutionElements.unitSelect) {
            this.evolutionElements.unitSelect.innerHTML = '<option value="">Select Unit...</option>';
            filteredUnits.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit.id;
                option.textContent = `${unit.name} (${unit.evolution})`;
                this.evolutionElements.unitSelect.appendChild(option);
            });
        }
    }
    
    selectUnit(unit) {
        console.log('🔧 Selecting unit:', unit.name);
        this.selectedUnit = unit;
        
        console.log('Updating unit display...');
        this.updateUnitDisplay(unit);
        
        console.log('Updating materials list...');
        this.updateMaterialsList(unit);
        
        console.log('Updating cost summary...');
        this.updateCostSummary(unit);
        
        console.log('Updating farming guide...');
        this.updateFarmingGuide(unit);
        
        console.log('✅ Unit selection completed');
    }
    
    clearUnitSelection() {
        this.selectedUnit = null;
        if (this.evolutionElements.unitPlaceholder) {
            this.evolutionElements.unitPlaceholder.style.display = 'block';
        }
        this.clearMaterialsList();
        this.clearCostSummary();
        this.clearFarmingGuide();
    }
    
    updateUnitDisplay(unit) {
        if (!this.evolutionElements.unitPlaceholder) return;
        
        this.evolutionElements.unitPlaceholder.style.display = 'none';
        
        // Create unit card
        const unitCard = document.createElement('div');
        unitCard.className = 'unit-card selected';
        unitCard.innerHTML = `
            <div class="unit-header">
                <i class="${unit.icon}" style="color: ${this.getElementColor(unit.element)}"></i>
                <h3>${unit.name} (${unit.evolution})</h3>
            </div>
            <div class="unit-details">
                <p class="unit-meta">${unit.rarity} • ${unit.element} • ${unit.type}</p>
                <p class="unit-description">${unit.description}</p>
            </div>
        `;
        
        // Replace placeholder with unit card
        this.evolutionElements.unitPlaceholder.parentNode.insertBefore(unitCard, this.evolutionElements.unitPlaceholder);
    }
    
    updateMaterialsList(unit) {
        console.log('🔧 Updating materials list for unit:', unit.name);
        
        if (!this.evolutionElements.materialsList) {
            console.error('❌ Materials list element not found!');
            return;
        }
        
        const materials = unit.evolutionMaterials;
        console.log('Materials data:', materials);
        
        let html = '';
        
        // Gold cost
        if (materials.goldCost) {
            html += `
                <div class="requirement-item">
                    <div class="requirement-info">
                        <div class="requirement-icon">
                            <i class="fas fa-coins"></i>
                        </div>
                        <div class="requirement-details">
                            <h4>Gold Cost</h4>
                            <p>Basic currency for evolution</p>
                        </div>
                    </div>
                    <div class="requirement-amount">${materials.goldCost.toLocaleString()}</div>
                </div>
            `;
        }
        
        // Special item
        if (materials.specialItem) {
            html += `
                <div class="requirement-item">
                    <div class="requirement-info">
                        <div class="requirement-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="requirement-details">
                            <h4>${materials.specialItem.name}</h4>
                            <p>Source: ${materials.specialItem.source}</p>
                        </div>
                    </div>
                    <div class="requirement-amount">${materials.specialItem.dropRate || '1'}</div>
                </div>
            `;
        }
        
        // Essence stones
        if (materials.essenceStones) {
            Object.entries(materials.essenceStones).forEach(([stoneName, quantity]) => {
                const stoneConfig = this.data.materialsConfig[stoneName];
                html += `
                    <div class="requirement-item">
                        <div class="requirement-info">
                            <div class="requirement-icon">
                                <i class="fas fa-gem" style="color: ${stoneConfig ? stoneConfig.color : '#fff'}"></i>
                            </div>
                            <div class="requirement-details">
                                <h4>${stoneName}</h4>
                                <p>${stoneConfig ? stoneConfig.description : 'Evolution material'}</p>
                            </div>
                        </div>
                        <div class="requirement-amount">${quantity}</div>
                    </div>
                `;
            });
        }
        
        console.log('Generated HTML length:', html.length);
        this.evolutionElements.materialsList.innerHTML = html;
        console.log('✅ Materials list updated');
    }
    
    updateCostSummary(unit) {
        if (!this.evolutionElements.costSummary) return;
        
        const materials = unit.evolutionMaterials;
        let materialCost = 0;
        
        // Calculate material cost
        if (materials.essenceStones) {
            Object.entries(materials.essenceStones).forEach(([stoneName, quantity]) => {
                const stoneConfig = this.data.materialsConfig[stoneName];
                if (stoneConfig) {
                    materialCost += stoneConfig.cost * quantity;
                }
            });
        }
        
        const totalCost = materialCost + (materials.goldCost || 0);
        
        this.evolutionElements.costSummary.innerHTML = `
            <div class="cost-item">
                <span>Material Cost:</span>
                <span>${materialCost.toLocaleString()} Gold</span>
            </div>
            <div class="cost-item">
                <span>Evolution Fee:</span>
                <span>${(materials.goldCost || 0).toLocaleString()} Gold</span>
            </div>
            <div class="cost-item">
                <span>Total Cost:</span>
                <span>${totalCost.toLocaleString()} Gold</span>
            </div>
        `;
    }
    
    updateFarmingGuide(unit) {
        if (!this.evolutionElements.farmingGuide) return;
        
        const guide = unit.farmingGuide;
        
        this.evolutionElements.farmingGuide.innerHTML = `
            <div class="farming-info">
                <div class="farming-priority">
                    <span class="label">Priority:</span>
                    <span class="value ${guide.priority.toLowerCase()}">${guide.priority}</span>
                </div>
                <div class="farming-difficulty">
                    <span class="label">Difficulty:</span>
                    <span class="value ${guide.difficulty.toLowerCase()}">${guide.difficulty}</span>
                </div>
                <div class="farming-tips">
                    <h4>Farming Tips:</h4>
                    <ul>
                        ${guide.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    clearMaterialsList() {
        if (this.evolutionElements.materialsList) {
            this.evolutionElements.materialsList.innerHTML = `
                <div class="requirement-item">
                    <div class="requirement-info">
                        <div class="requirement-icon">
                            <i class="fas fa-coins"></i>
                        </div>
                        <div class="requirement-details">
                            <h4>Gold Cost</h4>
                            <p>Basic currency for evolution</p>
                        </div>
                    </div>
                    <div class="requirement-amount">0</div>
                </div>
            `;
        }
    }
    
    clearCostSummary() {
        if (this.evolutionElements.costSummary) {
            this.evolutionElements.costSummary.innerHTML = `
                <div class="cost-item">
                    <span>Material Cost:</span>
                    <span>0 Gold</span>
                </div>
                <div class="cost-item">
                    <span>Evolution Fee:</span>
                    <span>0 Gold</span>
                </div>
                <div class="cost-item">
                    <span>Total Cost:</span>
                    <span>0 Gold</span>
                </div>
            `;
        }
    }
    
    clearFarmingGuide() {
        if (this.evolutionElements.farmingGuide) {
            this.evolutionElements.farmingGuide.innerHTML = '<p>Select a unit to view farming recommendations</p>';
        }
    }
    
    getElementColor(element) {
        const colors = {
            'Fire': '#e74c3c',
            'Water': '#3498db',
            'Earth': '#8b4513',
            'Wind': '#2ecc71',
            'Light': '#f1c40f',
            'Dark': '#9b59b6',
            'Cosmic': '#e91e63',
            'Giant': '#95a5a6',
            'Blast': '#e67e22',
            'Nuclear': '#27ae60',
            'Electric': '#f39c12',
            'Ice': '#74b9ff',
            'Poison': '#00b894',
            'Psychic': '#fd79a8',
            'Physical': '#636e72'
        };
        return colors[element] || '#fff';
    }
    
    setupGlobalEvents() {
        // Navigation tab clicks
        this.navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = tab.getAttribute('data-page');
                this.showPage(pageName);
            });
        });
    }
    
    showPage(pageName) {
        // Hide all pages
        Object.values(this.pageContainers).forEach(container => {
            if (container) {
                container.style.display = 'none';
            }
        });
        
        // Show target page
        if (this.pageContainers[pageName]) {
            this.pageContainers[pageName].style.display = 'block';
        }
        
        // Update navigation
        this.updateNavigation(pageName);
        
        this.currentPage = pageName;
    }
    
    updateNavigation(activePage) {
        this.navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-page') === activePage) {
                tab.classList.add('active');
            }
        });
    }
} 