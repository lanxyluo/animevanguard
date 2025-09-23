/**
 * Navigation Component
 * Handles navigation functionality and routing
 */
class Navigation {
    constructor() {
        this.navContainer = null;
        this.navMenu = null;
        this.navToggle = null;
        this.currentPage = null;
        this.init();
    }

    init() {
        this.navContainer = document.querySelector('.nav-container');
        this.navMenu = document.querySelector('.nav-menu');
        this.navToggle = document.querySelector('.nav-toggle');
        
        if (!this.navContainer) return;

        this.setupMobileNavigation();
        this.setupActiveStates();
        this.setupSmoothScrolling();
        this.setupKeyboardNavigation();
    }

    setupMobileNavigation() {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navContainer.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.classList.remove('nav-open');
    }

    setupActiveStates() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });

        // Set initial active state based on current page
        this.updateActiveState();
    }

    updateActiveState() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPath = new URL(link.href).pathname;
            
            // Check for exact match or page match
            if (linkPath === currentPath || 
                this.isPageMatch(linkPath, currentPath)) {
                link.classList.add('active');
            }
        });
    }

    isPageMatch(linkPath, currentPath) {
        // Handle different path formats
        const linkPage = linkPath.split('/').pop().replace('.html', '');
        const currentPage = currentPath.split('/').pop().replace('.html', '');
        
        // Special cases for index/home
        if ((linkPage === 'index' || linkPage === '') && currentPage === '') {
            return true;
        }
        
        return linkPage === currentPage;
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                const headerHeight = this.navContainer ? this.navContainer.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Close mobile menu with Escape key
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    navigateToPage(page) {
        // Programmatic navigation
        const pageMap = {
            'home': '/',
            'tierlist': '/pages/tierlist.html',
            'database': '/pages/database.html',
            'calculator': '/pages/calculator.html',
            'about': '/pages/about.html'
        };

        const targetPage = pageMap[page];
        if (targetPage) {
            window.location.href = targetPage;
        }
    }

    highlightNavItem(page) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    addNavItem(config) {
        if (!this.navMenu) return;

        const navItem = document.createElement('li');
        navItem.className = 'nav-item';
        
        const navLink = document.createElement('a');
        navLink.className = 'nav-link';
        navLink.href = config.href;
        navLink.textContent = config.text;
        
        if (config.page) {
            navLink.setAttribute('data-page', config.page);
        }
        
        navItem.appendChild(navLink);
        this.navMenu.appendChild(navItem);
    }

    destroy() {
        // Clean up event listeners
        if (this.navToggle) {
            this.navToggle.removeEventListener('click', this.toggleMobileMenu);
        }
        
        document.removeEventListener('click', this.closeMobileMenu);
        window.removeEventListener('resize', this.closeMobileMenu);
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}