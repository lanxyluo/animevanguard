/**
 * Header Component
 * Handles header functionality and interactions
 */
class Header {
    constructor() {
        this.header = null;
        this.isScrolled = false;
        this.init();
    }

    init() {
        this.header = document.querySelector('header');
        if (!this.header) return;

        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSearch();
    }

    setupScrollEffect() {
        if (!this.header) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100 && !this.isScrolled) {
                this.header.classList.add('scrolled');
                this.isScrolled = true;
            } else if (scrollY <= 100 && this.isScrolled) {
                this.header.classList.remove('scrolled');
                this.isScrolled = false;
            }
        });
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileToggle || !mobileMenu) return;

        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Toggle body scroll
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    setupSearch() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.search-input');
        
        if (!searchToggle || !searchForm) return;

        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            searchForm.classList.toggle('active');
            
            if (searchForm.classList.contains('active') && searchInput) {
                searchInput.focus();
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target) && !searchToggle.contains(e.target)) {
                searchForm.classList.remove('active');
            }
        });

        // Handle search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = searchInput ? searchInput.value.trim() : '';
                
                if (query) {
                    this.performSearch(query);
                }
            });
        }
    }

    performSearch(query) {
        // Implement search functionality
        console.log('Searching for:', query);
        
        // You can implement actual search logic here
        // For now, just redirect to database page with search parameter
        const searchUrl = `/pages/database.html?search=${encodeURIComponent(query)}`;
        window.location.href = searchUrl;
    }

    updateActivePage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || 
                (currentPath.includes('pages/') && linkPath.includes(currentPath.split('/').pop()))) {
                link.classList.add('active');
            }
        });
    }

    destroy() {
        // Clean up event listeners if needed
        window.removeEventListener('scroll', this.setupScrollEffect);
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Header();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
}