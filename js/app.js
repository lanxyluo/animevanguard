// Import data modules
import { unitsData } from './config/units.js';
import { materialsConfig } from './config/materials.js';
import { elementIcons } from './config/constants.js';

// Import pages
import { EvolutionPage } from './pages/evolution.js';
import { DPSPage } from './pages/dps.js';
import { DatabasePage } from './pages/database.js';
import { TraitsBuilder } from './components/TraitsBuilder.js';

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
        this.traitsBuilder = null;
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
            
            // Initialize Traits Builder
            this.traitsBuilder = new TraitsBuilder();
            await this.traitsBuilder.initialize();
            
            // Expose functions to global scope for onclick handlers
            window.databasePage = this.databasePage;
            window.showPage = (pageName) => this.showPage(pageName);
            
            // Set up global event listeners
            this.setupGlobalEvents();
            
            // Set up tool link handlers
            this.setupToolLinks();
            
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
        
        console.log('📊 Page containers found:', Object.keys(this.pageContainers).filter(key => this.pageContainers[key]).length);
        
        // Get homepage intro section
        this.homepageIntro = document.querySelector('.homepage-intro');
        console.log('🏠 Homepage intro found:', !!this.homepageIntro);
        
        // Get navigation tabs
        this.navTabs = document.querySelectorAll('.nav-tab');
        console.log('🔗 Navigation tabs found:', this.navTabs.length);
        
        // Debug: List all found tabs
        this.navTabs.forEach((tab, index) => {
            console.log(`  Tab ${index}: ${tab.getAttribute('data-page')} (${tab.textContent.trim()})`);
        });
        
        console.log('✅ Navigation initialized');
    }
    
    onUnitSelect(unit) {
        console.log('🔧 Unit selected in App:', unit.name);
        this.selectedUnit = unit;
    }
    

    

    

    

    

    

    

    

    

    

    

    

    

    











    

    
    setupGlobalEvents() {
        console.log('🔧 Setting up global events...');
        console.log('📊 Found nav tabs:', this.navTabs.length);
        
        // Verify tabs are actually clickable elements
        this.navTabs.forEach((tab, index) => {
            console.log(`🔗 Tab ${index} details:`, {
                tagName: tab.tagName,
                className: tab.className,
                dataPage: tab.getAttribute('data-page'),
                href: tab.href,
                text: tab.textContent.trim()
            });
        });
        
        // Navigation tab clicks with enhanced error handling
        this.navTabs.forEach((tab, index) => {
            console.log(`🔗 Setting up tab ${index}:`, tab.getAttribute('data-page'));
            
            // Add multiple event listeners to ensure one works
            const pageName = tab.getAttribute('data-page');
            
            const clickHandler = (e) => {
                console.log('🎯 Click event fired on tab:', pageName);
                console.log('🎯 Event details:', {
                    type: e.type,
                    target: e.target,
                    currentTarget: e.currentTarget,
                    defaultPrevented: e.defaultPrevented
                });
                
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🎯 Tab clicked:', pageName);
                
                try {
                    this.showPage(pageName);
                } catch (error) {
                    console.error('❌ Error in showPage:', error);
                }
            };
            
            // Add both click and mousedown events
            tab.addEventListener('click', clickHandler, true);
            tab.addEventListener('mousedown', (e) => {
                console.log('🖱️ Mousedown on tab:', pageName);
            });
            
            // Make sure the tab is focusable and add keyboard support
            tab.setAttribute('tabindex', '0');
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    console.log('⌨️ Keyboard activation on tab:', pageName);
                    clickHandler(e);
                }
            });
            
            // Add visual feedback
            tab.style.cursor = 'pointer';
            tab.addEventListener('mouseenter', () => {
                console.log('🖱️ Mouse enter tab:', pageName);
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
        
        console.log('✅ Global events setup completed');
        
        // Set up tool link handlers
        this.setupToolLinks();
        
        // Expose navigation functions to global scope for debugging
        window.debugNavigation = {
            showPage: (pageName) => {
                console.log('🔧 DEBUG: Manually showing page:', pageName);
                this.showPage(pageName);
            },
            showHomepage: () => {
                console.log('🔧 DEBUG: Manually showing homepage');
                this.showHomepage();
            },
            listPages: () => {
                console.log('🔧 DEBUG: Available pages:', Object.keys(this.pageContainers));
                return this.pageContainers;
            },
            listTabs: () => {
                console.log('🔧 DEBUG: Available tabs:', this.navTabs.length);
                this.navTabs.forEach((tab, i) => {
                    console.log(`  Tab ${i}:`, tab.getAttribute('data-page'), tab);
                });
                return this.navTabs;
            },
            getCurrentPage: () => {
                console.log('🔧 DEBUG: Current page:', this.currentPage);
                return this.currentPage;
            },
            testClick: (pageName) => {
                console.log('🔧 DEBUG: Testing click for page:', pageName);
                const tab = Array.from(this.navTabs).find(t => t.getAttribute('data-page') === pageName);
                if (tab) {
                    console.log('🔧 DEBUG: Found tab, triggering click');
                    tab.click();
                } else {
                    console.error('🔧 DEBUG: Tab not found for page:', pageName);
                }
            }
        };
        
        console.log('🔧 DEBUG: Navigation functions exposed to window.debugNavigation');
        console.log('🔧 DEBUG: Try: window.debugNavigation.testClick("evolution")');
        
        // 立即测试导航是否工作
        setTimeout(() => {
            console.log('🧪 TESTING: Auto-testing navigation after 2 seconds...');
            console.log('🧪 TESTING: Current nav tabs found:', this.navTabs.length);
            console.log('🧪 TESTING: Page containers found:', Object.keys(this.pageContainers).length);
            
            if (this.navTabs.length > 0) {
                console.log('🧪 TESTING: Navigation setup appears successful');
                console.log('🧪 TESTING: You can now click navigation tabs or use:');
                console.log('🧪 TESTING: window.debugNavigation.testClick("evolution")');
            } else {
                console.error('🧪 TESTING: ❌ No navigation tabs found - navigation setup failed');
            }
        }, 2000);
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
        console.log('📄 Showing page:', pageName);
        console.log('📊 Available page containers:', Object.keys(this.pageContainers).filter(key => this.pageContainers[key]));
        
        // Hide all pages
        Object.values(this.pageContainers).forEach(container => {
            if (container) {
                container.style.display = 'none';
            }
        });
        
        // Show target page
        if (this.pageContainers[pageName]) {
            this.pageContainers[pageName].style.display = 'block';
            console.log('✅ Page shown successfully:', pageName);
        } else {
            console.error('❌ Page container not found:', pageName);
            console.log('🔍 Available containers:', Object.keys(this.pageContainers));
            return;
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
            console.log('🧬 Calling evolution page show method');
            this.evolutionPage.show();
        } else if (pageName === 'dps' && this.dpsPage) {
            console.log('⚔️ Calling DPS page show method');
            this.dpsPage.show();
        } else if (pageName === 'database' && this.databasePage) {
            console.log('🗄️ Calling database page show method');
            this.databasePage.show();
        } else if (pageName === 'traits' && this.traitsBuilder) {
            console.log('🎯 Calling traits builder show method');
            this.traitsBuilder.show();
        } else if (pageName === 'codes') {
            console.log('🎁 Updating codes page');
            this.updateCodesPage();
        }
        
        this.currentPage = pageName;
        console.log('✅ Page switch completed. Current page:', this.currentPage);
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
    
    setupToolLinks() {
        console.log('🔧 Setting up tool link handlers...');
        
        // Find all tool links
        const toolLinks = document.querySelectorAll('.tool-link');
        console.log(`🔗 Found ${toolLinks.length} tool links`);
        
        toolLinks.forEach((link, index) => {
            const href = link.getAttribute('href');
            console.log(`🔗 Tool link ${index}: ${href}`);
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Extract page name from href (e.g., "#evolutionPage" -> "evolution")
                const pageName = href.replace('#', '').replace('Page', '');
                console.log(`🎯 Tool link clicked: ${href} -> ${pageName}`);
                
                // Navigate to the page
                this.showPage(pageName);
                
                // Smooth scroll to top of the page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Add hover effect
            link.style.cursor = 'pointer';
        });
        
        console.log('✅ Tool link handlers setup completed');
    }
} 