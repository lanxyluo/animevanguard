/**
 * Home Page JavaScript
 * Handles homepage functionality including top units display and navigation
 */

class HomePage {
    constructor() {
        this.topUnits = [];
        this.init();
    }

    init() {
        try {
            this.loadTopUnits();
            this.setupEventListeners();
            this.renderTopUnits();
        } catch (error) {
            console.error('Error initializing HomePage:', error);
            this.showError('Failed to initialize homepage. Please refresh the page.');
        }
    }

    loadTopUnits() {
        // Sample top 5 units data - in a real app this would come from the database
        this.topUnits = [
            {
                id: 'sukono',
                name: 'Sukono',
                rarity: 'Legendary',
                element: 'Fire',
                tier: 'SS',
                description: 'Ultimate DPS powerhouse with incredible damage output',
                stats: {
                    attack: 180,
                    speed: 1.2,
                    range: 3
                }
            },
            {
                id: 'cha-in',
                name: 'Cha-In (Blade Dancer)',
                rarity: 'Legendary',
                element: 'Wind',
                tier: 'SS',
                description: 'AoE control master with crowd control abilities',
                stats: {
                    attack: 165,
                    speed: 1.4,
                    range: 2
                }
            },
            {
                id: 'haruka-rin',
                name: 'Haruka Rin (Dancer)',
                rarity: 'Epic',
                element: 'Nature',
                tier: 'S+',
                description: 'Essential team buffer with support abilities',
                stats: {
                    attack: 140,
                    speed: 1.1,
                    range: 4
                }
            },
            {
                id: 'slime-king',
                name: 'Slime (King)',
                rarity: 'Epic',
                element: 'Water',
                tier: 'S+',
                description: 'F2P friendly carry with great cost efficiency',
                stats: {
                    attack: 155,
                    speed: 1.0,
                    range: 2
                }
            },
            {
                id: 'conqueror',
                name: 'Conqueror vs Invulnerable',
                rarity: 'Mythic',
                element: 'Dark',
                tier: 'S',
                description: 'Boss specialist with single-target focus',
                stats: {
                    attack: 190,
                    speed: 0.8,
                    range: 1
                }
            }
        ];
    }

    setupEventListeners() {
        // Navigation tab clicks
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const page = tab.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Quick access card clicks
        const quickAccessCards = document.querySelectorAll('.quick-access-card');
        quickAccessCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const page = card.getAttribute('onclick')?.match(/showPage\('(\w+)'\)/)?.[1];
                if (page) {
                    this.navigateToPage(page);
                }
            });
        });
    }

    navigateToPage(page) {
        try {
            // Use the global navigation system
            const pageMap = {
                'tierlist': '/pages/tierlist.html',
                'database': '/pages/database.html',
                'calculator': '/pages/calculator.html',
                'about': '/pages/about.html'
            };

            const targetPage = pageMap[page];
            if (targetPage) {
                window.location.href = targetPage;
            } else {
                console.warn(`Unknown page: ${page}`);
            }
        } catch (error) {
            console.error('Error navigating to page:', error);
            this.showError('Failed to navigate to page. Please try again.');
        }
    }

    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        errorDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; margin-left: auto;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    renderTopUnits() {
        try {
            const topUnitsGrid = document.getElementById('topUnitsGrid');
            if (!topUnitsGrid) {
                console.warn('Top units grid not found');
                return;
            }

            if (!this.topUnits || this.topUnits.length === 0) {
                console.warn('No top units data available');
                topUnitsGrid.innerHTML = '<p>No units available</p>';
                return;
            }

            topUnitsGrid.innerHTML = this.topUnits.map(unit => `
                <div class="unit-card" data-unit-id="${unit.id}">
                    <div class="unit-image">
                        <div class="unit-placeholder">
                            ${unit.name ? unit.name.charAt(0) : '?'}
                        </div>
                    </div>
                    <div class="unit-name">${unit.name || 'Unknown Unit'}</div>
                    <div class="unit-stats">
                        <div class="stat">
                            <i class="fas fa-sword"></i> ATK: ${unit.stats?.attack || 0}
                        </div>
                        <div class="stat">
                            <i class="fas fa-bolt"></i> SPD: ${unit.stats?.speed || 0}
                        </div>
                        <div class="stat">
                            <i class="fas fa-crosshairs"></i> RNG: ${unit.stats?.range || 0}
                        </div>
                    </div>
                    <div class="unit-tier ${unit.tier ? unit.tier.toLowerCase() : 'unknown'}">${unit.tier || 'Unknown'} Tier</div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error rendering top units:', error);
            this.showError('Failed to load top units. Please refresh the page.');
        }

        // Add click handlers for unit cards
        const unitCards = document.querySelectorAll('.unit-card');
        unitCards.forEach(card => {
            card.addEventListener('click', () => {
                const unitId = card.getAttribute('data-unit-id');
                this.showUnitDetails(unitId);
            });
        });
    }

    showUnitDetails(unitId) {
        const unit = this.topUnits.find(u => u.id === unitId);
        if (!unit) return;

        // Navigate to database page with unit selected
        this.navigateToPage('database');
        
        // In a real app, you would pass the unit ID to the database page
        // and highlight the specific unit
        console.log(`Showing details for unit: ${unit.name}`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.homePage = new HomePage();
});

// Global function for navigation (called from HTML onclick)
function showPage(page) {
    if (window.homePage) {
        window.homePage.navigateToPage(page);
    }
}