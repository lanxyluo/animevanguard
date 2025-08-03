// Import data modules
import { unitsData } from './config/units.js';
import { materialsConfig } from './config/materials.js';
import { elementIcons } from './config/constants.js';

// Import pages
import { EvolutionPage } from './pages/evolution.js';

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
        
        // Page instances
        this.evolutionPage = null;
    }
    
    async initialize() {
        console.log('🚀 Initializing Anime Vanguards Calculator App...');
        
        try {
            // Initialize navigation
            this.initializeNavigation();
            
            // Initialize Evolution Page
            this.evolutionPage = new EvolutionPage(this);
            await this.evolutionPage.initialize(this.data);
            
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
    
    onUnitSelect(unit) {
        console.log('🔧 Unit selected in App:', unit.name);
        this.selectedUnit = unit;
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