// Import data modules
import { unitsData } from './config/units.js';
import { materialsConfig } from './config/materials.js';
import { elementIcons } from './config/constants.js';

// Import utility functions
import { showError, showNotification } from './utils/dom.js';
import { validateUnitData, validateMaterialsConfig, validateElementIcons } from './utils/validation.js';

// Import page controllers
import { EvolutionPage } from './pages/evolution.js';
import { DPSPage } from './pages/dps.js';
import { DatabasePage } from './pages/database.js';

export class App {
    constructor() {
        this.isInitialized = false;
        
        // Data
        this.data = {
            unitsData,
            materialsConfig,
            elementIcons
        };
        
        // Page instances
        this.pages = {
            evolution: null,
            dps: null,
            database: null
        };
        
        // Current page
        this.currentPage = null;
        
        // Global state
        this.globalState = {
            selectedUnit: null,
            userPreferences: {},
            cachedData: {}
        };
        
        // Navigation elements
        this.navElements = {};
    }
    
    async initialize() {
        console.log('🚀 Initializing Anime Vanguards Calculator App...');
        
        try {
            // Validate data
            await this.validateData();
            
            // Initialize navigation
            this.initializeNavigation();
            
            // Initialize pages
            await this.initializePages();
            
            // Set up global event listeners
            this.setupGlobalEvents();
            
            // Load user preferences
            this.loadUserPreferences();
            
            // Show default page (evolution)
            this.showPage('evolution');
            
            this.isInitialized = true;
            console.log('✅ App initialized successfully!');
            
        } catch (error) {
            console.error('❌ App initialization failed:', error);
            showError('Failed to initialize application: ' + error.message, 'error');
            throw error; // Re-throw for main.js to handle
        }
    }
    
    async validateData() {
        console.log('🔍 Validating data...');
        
        const unitValidation = validateUnitData(this.data.unitsData);
        const materialValidation = validateMaterialsConfig(this.data.materialsConfig);
        const iconValidation = validateElementIcons(this.data.elementIcons);
        
        if (!unitValidation.isValid) {
            throw new Error('Unit data validation failed: ' + unitValidation.errors.join(', '));
        }
        
        if (!materialValidation.isValid) {
            throw new Error('Materials validation failed: ' + materialValidation.errors.join(', '));
        }
        
        if (!iconValidation.isValid) {
            throw new Error('Element icons validation failed: ' + iconValidation.errors.join(', '));
        }
        
        console.log('✅ Data validation passed');
    }
    
    initializeNavigation() {
        console.log('🧭 Initializing navigation...');
        
        // Create navigation HTML
        const header = document.querySelector('.header');
        if (header) {
            const nav = document.createElement('nav');
            nav.className = 'nav-menu';
            nav.innerHTML = `
                <a href="#" class="nav-link active" data-page="evolution">
                    <i class="fas fa-calculator"></i> Evolution
                </a>
                <a href="#" class="nav-link" data-page="dps">
                    <i class="fas fa-crosshairs"></i> DPS Calculator
                </a>
                <a href="#" class="nav-link" data-page="database">
                    <i class="fas fa-database"></i> Unit Database
                </a>
            `;
            
            header.appendChild(nav);
            
            // Store navigation elements
            this.navElements = {
                nav: nav,
                links: nav.querySelectorAll('.nav-link')
            };
        }
        
        // Create page containers
        this.createPageContainers();
    }
    
    createPageContainers() {
        const container = document.querySelector('.container');
        if (!container) return;
        
        // Create page containers
        const pageContainers = {
            evolution: document.getElementById('unitSelectorContainer')?.parentElement,
            dps: document.createElement('div'),
            database: document.createElement('div')
        };
        
        // Set up DPS page container
        pageContainers.dps.id = 'dpsPageContainer';
        pageContainers.dps.className = 'page-container';
        pageContainers.dps.style.display = 'none';
        
        // Set up Database page container
        pageContainers.database.id = 'databasePageContainer';
        pageContainers.database.className = 'page-container';
        pageContainers.database.style.display = 'none';
        
        // Add new containers to the main container
        container.appendChild(pageContainers.dps);
        container.appendChild(pageContainers.database);
        
        // Store references
        this.pageContainers = pageContainers;
    }
    
    async initializePages() {
        console.log('📄 Initializing pages...');
        
        // Initialize Evolution Page
        this.pages.evolution = new EvolutionPage(this);
        await this.pages.evolution.initialize(this.data);
        
        // Initialize DPS Page
        this.pages.dps = new DPSPage(this);
        await this.pages.dps.initialize(this.data);
        
        // Initialize Database Page
        this.pages.database = new DatabasePage(this);
        await this.pages.database.initialize(this.data);
        
        console.log('✅ All pages initialized');
    }
    
    setupGlobalEvents() {
        console.log('🔗 Setting up global events...');
        
        // Navigation event listeners
        this.navElements.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.closest('.nav-link').dataset.page;
                this.showPage(page);
            });
        });
        
        // Global unit selection handler
        this.onUnitSelect = (unit) => {
            this.globalState.selectedUnit = unit;
            console.log('Global unit selected:', unit.name);
            
            // Notify all pages about unit selection
            Object.values(this.pages).forEach(page => {
                if (page && page.onGlobalUnitSelect) {
                    page.onGlobalUnitSelect(unit);
                }
            });
        };
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.showPage('evolution');
                        break;
                    case '2':
                        e.preventDefault();
                        this.showPage('dps');
                        break;
                    case '3':
                        e.preventDefault();
                        this.showPage('database');
                        break;
                }
            }
        });
        
        console.log('✅ Global events set up');
    }
    
    showPage(pageName) {
        if (!this.pages[pageName]) {
            console.error(`Page '${pageName}' not found`);
            return;
        }
        
        console.log(`📄 Switching to page: ${pageName}`);
        
        // Hide current page
        if (this.currentPage && this.pages[this.currentPage]) {
            this.pages[this.currentPage].hide();
        }
        
        // Show new page
        this.pages[pageName].show();
        this.currentPage = pageName;
        
        // Update navigation
        this.updateNavigation(pageName);
        
        // Update page title
        this.updatePageTitle(pageName);
        
        // Trigger page change event
        this.onPageChange(pageName);
    }
    
    updateNavigation(activePage) {
        this.navElements.links.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === activePage) {
                link.classList.add('active');
            }
        });
    }
    
    updatePageTitle(pageName) {
        const titles = {
            evolution: 'Anime Vanguards Calculator - Evolution',
            dps: 'Anime Vanguards Calculator - DPS',
            database: 'Anime Vanguards Calculator - Database'
        };
        
        document.title = titles[pageName] || 'Anime Vanguards Calculator';
    }
    
    onPageChange(pageName) {
        console.log(`Page changed to: ${pageName}`);
        
        // Save current page to preferences
        this.saveUserPreference('lastPage', pageName);
        
        // Trigger any page-specific logic
        if (this.pages[pageName] && this.pages[pageName].onPageActivate) {
            this.pages[pageName].onPageActivate();
        }
    }
    
    loadUserPreferences() {
        try {
            const saved = localStorage.getItem('animeVanguardsPreferences');
            if (saved) {
                this.globalState.userPreferences = JSON.parse(saved);
                console.log('✅ User preferences loaded');
            }
        } catch (error) {
            console.error('Error loading user preferences:', error);
        }
    }
    
    saveUserPreference(key, value) {
        this.globalState.userPreferences[key] = value;
        
        try {
            localStorage.setItem('animeVanguardsPreferences', 
                JSON.stringify(this.globalState.userPreferences));
        } catch (error) {
            console.error('Error saving user preference:', error);
        }
    }
    
    getUserPreference(key, defaultValue = null) {
        return this.globalState.userPreferences[key] || defaultValue;
    }
    
    // Public API methods
    getCurrentPage() {
        return this.currentPage;
    }
    
    getSelectedUnit() {
        return this.globalState.selectedUnit;
    }
    
    updateData(newData) {
        // Update app data
        this.data = { ...this.data, ...newData };
        
        // Update all pages
        Object.values(this.pages).forEach(page => {
            if (page && page.updateData) {
                page.updateData(this.data);
            }
        });
        
        console.log('✅ App data updated');
    }
    
    showNotification(message, type = 'info') {
        showNotification(message, type);
    }
    
    showError(message, type = 'error') {
        showError(message, type);
    }
    
    destroy() {
        console.log('🗑️ Destroying App...');
        
        // Destroy all pages
        Object.values(this.pages).forEach(page => {
            if (page && page.destroy) {
                page.destroy();
            }
        });
        
        // Clear global state
        this.globalState = {};
        
        this.isInitialized = false;
        console.log('✅ App destroyed');
    }
} 