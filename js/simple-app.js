// Simple Anime Vanguards Calculator App
import { unitsData } from './config/units.js';
import { materialsConfig } from './config/materials.js';
import { elementIcons } from './config/constants.js';

class SimpleApp {
    constructor() {
        this.unitsData = unitsData;
        this.materialsConfig = materialsConfig;
        this.elementIcons = elementIcons;
        this.selectedUnit = null;
        this.currentPage = 'evolution';
    }

    async initialize() {
        console.log('🚀 Initializing Simple Anime Vanguards Calculator...');
        
        try {
            // Initialize navigation
            this.initializeNavigation();
            
            // Initialize evolution page
            this.initializeEvolutionPage();
            
            // Show default page
            this.showPage('evolution');
            
            console.log('✅ Simple App initialized successfully!');
            
        } catch (error) {
            console.error('❌ Simple App initialization failed:', error);
        }
    }

    initializeNavigation() {
        // Set up navigation tabs
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const page = tab.getAttribute('data-page');
                this.showPage(page);
            });
        });
    }

    initializeEvolutionPage() {
        console.log('Initializing Evolution Page...');
        
        // Populate element filter with all elements
        this.populateElementFilter();
        
        // Set up event listeners
        this.setupEvolutionEvents();
        
        // Populate unit select
        this.populateUnitSelect();
        
        console.log('✅ Evolution Page initialized');
    }

    populateElementFilter() {
        const elementFilter = document.getElementById('elementFilter');
        if (!elementFilter) {
            console.error('Element filter not found');
            return;
        }

        // Clear existing options except "All Elements"
        elementFilter.innerHTML = '<option value="">All Elements</option>';
        
        // Add all element options
        const elements = [
            'Fire', 'Water', 'Earth', 'Wind', 'Light', 'Dark', 'Cosmic',
            'Giant', 'Blast', 'Nuclear', 'Electric', 'Ice', 'Poison', 'Psychic', 'Physical'
        ];
        
        elements.forEach(element => {
            const option = document.createElement('option');
            option.value = element;
            option.textContent = element;
            elementFilter.appendChild(option);
        });
    }

    setupEvolutionEvents() {
        // Unit search
        const unitSearch = document.getElementById('unitSearch');
        if (unitSearch) {
            unitSearch.addEventListener('input', (e) => {
                this.filterUnits();
            });
        }

        // Rarity filter
        const rarityFilter = document.getElementById('rarityFilter');
        if (rarityFilter) {
            rarityFilter.addEventListener('change', () => {
                this.filterUnits();
            });
        }

        // Element filter
        const elementFilter = document.getElementById('elementFilter');
        if (elementFilter) {
            elementFilter.addEventListener('change', () => {
                this.filterUnits();
            });
        }

        // Unit select
        const unitSelect = document.getElementById('unitSelect');
        if (unitSelect) {
            unitSelect.addEventListener('change', (e) => {
                const unitId = e.target.value;
                if (unitId) {
                    const unit = this.unitsData[unitId];
                    if (unit) {
                        this.selectUnit(unit);
                    }
                } else {
                    this.clearUnitSelection();
                }
            });
        }
    }

    populateUnitSelect() {
        const unitSelect = document.getElementById('unitSelect');
        if (!unitSelect) {
            console.error('Unit select not found');
            return;
        }

        // Clear existing options
        unitSelect.innerHTML = '<option value="">Select Unit...</option>';
        
        // Add all units
        Object.values(this.unitsData).forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${unit.name} (${unit.evolution})`;
            unitSelect.appendChild(option);
        });
    }

    filterUnits() {
        const unitSearch = document.getElementById('unitSearch');
        const rarityFilter = document.getElementById('rarityFilter');
        const elementFilter = document.getElementById('elementFilter');
        const unitSelect = document.getElementById('unitSelect');

        if (!unitSelect) return;

        const searchTerm = unitSearch ? unitSearch.value.toLowerCase() : '';
        const rarityValue = rarityFilter ? rarityFilter.value : '';
        const elementValue = elementFilter ? elementFilter.value : '';

        // Clear existing options
        unitSelect.innerHTML = '<option value="">Select Unit...</option>';

        // Filter units
        const filteredUnits = Object.values(this.unitsData).filter(unit => {
            const matchesSearch = !searchTerm || 
                unit.name.toLowerCase().includes(searchTerm) ||
                unit.description.toLowerCase().includes(searchTerm);
            
            const matchesRarity = !rarityValue || unit.rarity === rarityValue;
            const matchesElement = !elementValue || unit.element === elementValue;
            
            return matchesSearch && matchesRarity && matchesElement;
        });

        // Add filtered units to select
        filteredUnits.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${unit.name} (${unit.evolution})`;
            unitSelect.appendChild(option);
        });
    }

    selectUnit(unit) {
        console.log('Selecting unit:', unit);
        this.selectedUnit = unit;
        this.updateUnitDisplay(unit);
        this.updateEvolutionRequirements(unit);
        this.updateCostSummary(unit);
        this.updateFarmingGuide(unit);
    }

    clearUnitSelection() {
        this.selectedUnit = null;
        this.updateUnitDisplay(null);
        this.updateEvolutionRequirements(null);
        this.updateCostSummary(null);
        this.updateFarmingGuide(null);
    }

    updateUnitDisplay(unit) {
        const unitPlaceholder = document.getElementById('unitPlaceholder');
        if (!unitPlaceholder) return;

        if (!unit) {
            unitPlaceholder.style.display = 'block';
            return;
        }

        unitPlaceholder.style.display = 'none';

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
        unitPlaceholder.parentNode.insertBefore(unitCard, unitPlaceholder);
    }

    updateEvolutionRequirements(unit) {
        const requirementsGrid = document.getElementById('evolutionRequirements');
        if (!requirementsGrid) return;

        if (!unit) {
            requirementsGrid.innerHTML = `
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
            return;
        }

        const materials = unit.evolutionMaterials;
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
                    <div class="requirement-amount">1</div>
                </div>
            `;
        }

        // Essence stones
        if (materials.essenceStones) {
            Object.entries(materials.essenceStones).forEach(([stoneName, quantity]) => {
                const stoneConfig = this.materialsConfig[stoneName];
                const icon = stoneConfig ? stoneConfig.icon : 'fas fa-gem';
                const color = stoneConfig ? stoneConfig.color : '#666';
                
                html += `
                    <div class="requirement-item">
                        <div class="requirement-info">
                            <div class="requirement-icon">
                                <i class="${icon}" style="color: ${color}"></i>
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

        requirementsGrid.innerHTML = html;
    }

    updateCostSummary(unit) {
        const costSummary = document.getElementById('costSummary');
        if (!costSummary) return;

        if (!unit) {
            costSummary.innerHTML = `
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
            return;
        }

        const materials = unit.evolutionMaterials;
        let materialCost = 0;
        let evolutionFee = materials.goldCost || 0;

        // Calculate material cost
        if (materials.essenceStones) {
            Object.entries(materials.essenceStones).forEach(([stoneName, quantity]) => {
                const stoneConfig = this.materialsConfig[stoneName];
                if (stoneConfig) {
                    materialCost += stoneConfig.cost * quantity;
                }
            });
        }

        const totalCost = materialCost + evolutionFee;

        costSummary.innerHTML = `
            <div class="cost-item">
                <span>Material Cost:</span>
                <span>${materialCost.toLocaleString()} Gold</span>
            </div>
            <div class="cost-item">
                <span>Evolution Fee:</span>
                <span>${evolutionFee.toLocaleString()} Gold</span>
            </div>
            <div class="cost-item">
                <span>Total Cost:</span>
                <span>${totalCost.toLocaleString()} Gold</span>
            </div>
        `;
    }

    updateFarmingGuide(unit) {
        const farmingGuide = document.getElementById('farmingGuide');
        if (!farmingGuide) return;

        if (!unit) {
            farmingGuide.innerHTML = '<p>Select a unit to view farming recommendations</p>';
            return;
        }

        const guide = unit.farmingGuide;
        let html = `
            <div class="farming-info">
                <div class="farming-item">
                    <span class="label">Priority:</span>
                    <span class="value priority-${guide.priority.toLowerCase()}">${guide.priority}</span>
                </div>
                <div class="farming-item">
                    <span class="label">Difficulty:</span>
                    <span class="value difficulty-${guide.difficulty.toLowerCase().replace(' ', '-')}">${guide.difficulty}</span>
                </div>
                <div class="farming-item">
                    <span class="label">Obtain Method:</span>
                    <span class="value">${unit.obtainMethod}</span>
                </div>
                ${unit.dropRate ? `
                    <div class="farming-item">
                        <span class="label">Drop Rate:</span>
                        <span class="value">${unit.dropRate}</span>
                    </div>
                ` : ''}
            </div>
            <div class="farming-tips">
                <h4>Farming Tips:</h4>
                <ul>
                    ${guide.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;

        farmingGuide.innerHTML = html;
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
        return colors[element] || '#666';
    }

    showPage(pageName) {
        // Hide all pages
        const pages = document.querySelectorAll('.page-container');
        pages.forEach(page => {
            page.style.display = 'none';
        });

        // Show target page
        const targetPage = document.getElementById(pageName + 'Page');
        if (targetPage) {
            targetPage.style.display = 'block';
        }

        // Update navigation
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-page') === pageName) {
                tab.classList.add('active');
            }
        });

        this.currentPage = pageName;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new SimpleApp();
    app.initialize();
});

export { SimpleApp }; 