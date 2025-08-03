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
    

    

    

    

    

    

    

    

    

    








    calculateEssenceStones(unit) {
        const stones = {};
        
        // Base essence stones based on rarity
        const baseStones = {
            'Vanguard': { 'Green Essence Stone': 15 },
            'Secret': { 'Green Essence Stone': 25, 'Blue Essence Stone': 10 },
            'Mythic': { 'Green Essence Stone': 35, 'Purple Essence Stone': 15, 'Rainbow Essence Stone': 1 },
            'Exclusive': { 'Rainbow Essence Stone': 5, 'Divine Essence Stone': 1 }
        };
        
        // Add base stones
        const baseStonesForRarity = baseStones[unit.rarity] || {};
        Object.entries(baseStonesForRarity).forEach(([stone, quantity]) => {
            stones[stone] = quantity;
        });
        
        // Add element-specific stones
        const elementStones = {
            'Fire': { 'Red Essence Stone': 8 },
            'Water': { 'Blue Essence Stone': 8 },
            'Earth': { 'Brown Essence Stone': 8 },
            'Wind': { 'Green Essence Stone': 8 },
            'Light': { 'Yellow Essence Stone': 8 },
            'Dark': { 'Purple Essence Stone': 8 },
            'Cosmic': { 'Pink Essence Stone': 8 },
            'Giant': { 'Giant Essence': 8 },
            'Blast': { 'Blast Essence': 8 },
            'Nuclear': { 'Nuclear Essence': 8 },
            'Electric': { 'Yellow Essence Stone': 8 },
            'Ice': { 'Blue Essence Stone': 8 },
            'Poison': { 'Purple Essence Stone': 8 },
            'Psychic': { 'Pink Essence Stone': 8 },
            'Physical': { 'Brown Essence Stone': 8 }
        };
        
        const elementStonesForUnit = elementStones[unit.element] || {};
        Object.entries(elementStonesForUnit).forEach(([stone, quantity]) => {
            stones[stone] = (stones[stone] || 0) + quantity;
        });
        
        return stones;
    }

    calculateSpecialItem(unit) {
        // Generate special item based on unit properties
        const specialItems = {
            'Fire': { name: 'Flame Crystal', source: 'Fire Temple', dropRate: '1 per completion' },
            'Water': { name: 'Ocean Pearl', source: 'Water Temple', dropRate: '1 per completion' },
            'Earth': { name: 'Earth Core', source: 'Earth Temple', dropRate: '1 per completion' },
            'Wind': { name: 'Wind Essence', source: 'Wind Temple', dropRate: '1 per completion' },
            'Light': { name: 'Divine Light Crystal', source: 'Light Cathedral', dropRate: '1 per completion' },
            'Dark': { name: 'Shadow Orb', source: 'Dark Cathedral', dropRate: '1 per completion' },
            'Cosmic': { name: 'Cosmic Fragment', source: 'Cosmic Realm', dropRate: '1 per completion' },
            'Giant': { name: 'Giant\'s Heart', source: 'Giant Forest', dropRate: '1 per completion' },
            'Blast': { name: 'Explosive Core', source: 'Blast Valley', dropRate: '1 per completion' },
            'Nuclear': { name: 'Nuclear Core', source: 'Nuclear Facility', dropRate: '1 per completion' },
            'Electric': { name: 'Lightning Rod', source: 'Thunder Peak', dropRate: '1 per completion' },
            'Ice': { name: 'Ice Crystal', source: 'Frozen Peak', dropRate: '1 per completion' },
            'Poison': { name: 'Venom Fang', source: 'Poison Swamp', dropRate: '1 per completion' },
            'Psychic': { name: 'Mind Crystal', source: 'Mind Temple', dropRate: '1 per completion' },
            'Physical': { name: 'Warrior\'s Medal', source: 'Training Grounds', dropRate: '1 per completion' }
        };
        
        return specialItems[unit.element] || { name: 'Evolution Crystal', source: 'General Store', dropRate: '1 per completion' };
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