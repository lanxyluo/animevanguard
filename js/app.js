// Import data modules
import { unitsData } from './config/units.js';
import { materialsConfig } from './config/materials.js';
import { elementIcons } from './config/constants.js';

// Import pages
import { EvolutionPage } from './pages/evolution.js';
import { DPSPage } from './pages/dps.js';
import { DatabasePage } from './pages/database.js';

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
        this.dpsPage = null;
        this.databasePage = null;
    }
    
    async initialize() {
        console.log('🚀 Initializing Anime Vanguards Calculator App...');
        
        try {
            // Initialize navigation
            this.initializeNavigation();
            
            // Initialize Evolution Page
            this.evolutionPage = new EvolutionPage(this);
            await this.evolutionPage.initialize(this.data);
            
            // Initialize DPS Page
            this.dpsPage = new DPSPage(this);
            await this.dpsPage.initialize(this.data);
            
            // Initialize Database Page
            this.databasePage = new DatabasePage(this);
            await this.databasePage.initialize(this.data);
            
            // Expose databasePage to global scope for onclick handlers
            window.databasePage = this.databasePage;
            
            // Set up global event listeners
            this.setupGlobalEvents();
            
            // Show homepage by default (no specific page)
            this.showHomepage();
            
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
            traits: document.getElementById('traitsPage'),
            codes: document.getElementById('codesPage'),
            about: document.getElementById('aboutPage')
        };
        
        // Get homepage intro section
        this.homepageIntro = document.querySelector('.homepage-intro');
        
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
        
        // Logo click to go to homepage
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                this.showHomepage();
            });
            logo.style.cursor = 'pointer';
        }
    }
    
    showHomepage() {
        // Hide all pages
        Object.values(this.pageContainers).forEach(container => {
            if (container) {
                container.style.display = 'none';
            }
        });
        
        // Show homepage intro
        if (this.homepageIntro) {
            this.homepageIntro.style.display = 'block';
        }
        
        // Hide all page introductions on homepage
        const pageIntros = document.querySelectorAll('.page-introduction');
        pageIntros.forEach(intro => {
            intro.style.display = 'none';
        });
        
        // Update navigation - no active tab
        this.updateNavigation(null);
        
        // Update SEO for homepage
        this.updatePageSEO('home');
        
        this.currentPage = 'home';
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
        
        // Hide homepage intro on all specific pages
        if (this.homepageIntro) {
            this.homepageIntro.style.display = 'none';
        }

        // Handle page introductions
        const pageIntros = document.querySelectorAll('.page-introduction');
        pageIntros.forEach(intro => {
            if (intro.parentElement.id === pageName + 'Page') {
                intro.style.display = 'block';
            } else {
                intro.style.display = 'none';
            }
        });
        
        // Update navigation
        this.updateNavigation(pageName);
        
        // Update SEO for the current page
        this.updatePageSEO(pageName);
        
        // Call page-specific show methods
        if (pageName === 'evolution' && this.evolutionPage) {
            this.evolutionPage.show();
        } else if (pageName === 'dps' && this.dpsPage) {
            this.dpsPage.show();
        } else if (pageName === 'database' && this.databasePage) {
            this.databasePage.show();
        } else if (pageName === 'codes') {
            this.updateCodesPage();
        }
        
        this.currentPage = pageName;
    }
    
    updateNavigation(activePage) {
        this.navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (activePage && tab.getAttribute('data-page') === activePage) {
                tab.classList.add('active');
            }
        });
    }

    updateCodesPage() {
        // Update the last updated date
        const lastUpdatedElement = document.getElementById('lastUpdatedDate');
        if (lastUpdatedElement) {
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            lastUpdatedElement.textContent = now.toLocaleDateString('en-US', options);
        }

        // Update stats counts
        this.updateCodesStats();
    }

    updatePageSEO(pageName) {
        const seoData = {
            home: {
                title: "Anime Vanguards Wiki - Evolution Guide, Unit Stats, Traits Guide & Codes | Roblox",
                description: "Complete Anime Vanguards wiki with evolution guides, unit stats, database, and free codes. Your ultimate resource for Anime Vanguards gameplay optimization.",
                keywords: "anime vanguards wiki, evolution guide, unit stats, unit database, free codes, roblox anime vanguards"
            },
            evolution: {
                title: "Anime Vanguards Evolution Guide - Unit Evolution Calculator & Materials | Roblox",
                description: "Complete Anime Vanguards evolution guide with materials calculator, farming guides, and cost analysis. Find evolution requirements for all units including Vanguard, Secret, and Mythic rarities.",
                keywords: "anime vanguards evolution, evolution materials, evolution calculator, unit evolution guide, farming guide, evolution cost"
            },
            dps: {
                title: "Anime Vanguards Unit Stats Calculator - DPS Calculator & Tier List | Roblox",
                description: "Anime Vanguards unit stats calculator and DPS calculator. Compare unit performance, calculate damage output, and optimize your team composition with our comprehensive tier list.",
                keywords: "anime vanguards dps calculator, unit stats, damage calculator, tier list, unit comparison, team optimization"
            },
            database: {
                title: "Anime Vanguards Unit Database - Complete Unit List & Stats | Roblox",
                description: "Complete Anime Vanguards unit database with stats, abilities, and detailed information. Search and filter units by rarity, element, and obtain method.",
                keywords: "anime vanguards unit database, unit list, unit stats, unit abilities, unit search, unit filter"
            },
            codes: {
                title: "Anime Vanguards Codes - Free Gems, Gold & Rewards | Roblox",
                description: "Latest Anime Vanguards codes for free gems, gold, rerolls, and exclusive rewards. Updated daily with working codes and redemption instructions.",
                keywords: "anime vanguards codes, free gems, free gold, free rerolls, working codes, redemption codes"
            }
        };

        const data = seoData[pageName] || seoData.evolution;
        
        // Update title
        document.title = data.title;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', data.description);
        }
        
        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', data.keywords);
        }
        
        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', data.title);
        }
        
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', data.description);
        }
        
        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', data.title);
        }
        
        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', data.description);
        }
        
        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            const baseUrl = 'https://www.animevanguardswiki.com/';
            canonical.setAttribute('href', baseUrl + (pageName === 'evolution' ? '' : pageName));
        }
        
        console.log(`🔧 Updated SEO for page: ${pageName}`);
    }

    updateCodesStats() {
        // Count active codes
        const activeCodes = document.querySelectorAll('.code-item.active');
        const activeCountElement = document.getElementById('activeCodesCount');
        if (activeCountElement) {
            activeCountElement.textContent = activeCodes.length;
        }

        // Count expired codes
        const expiredCodes = document.querySelectorAll('.code-item.expired');
        const expiredCountElement = document.getElementById('expiredCodesCount');
        if (expiredCountElement) {
            expiredCountElement.textContent = expiredCodes.length;
        }

        // Debug information
        console.log('Active codes count:', activeCodes.length);
        console.log('Expired codes count:', expiredCodes.length);
    }
} 