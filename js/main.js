// 全局站点管理器
class SiteManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.databasePage = null;
        this.init();
    }

    async init() {
        await this.loadHeader();
        this.initializeNavigation();
        this.setupGlobalEvents();
        
        // 如果是数据库页面，初始化数据库页面
        if (this.currentPage === 'database') {
            await this.initializeDatabasePage();
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('calculator')) return 'calculator';
        if (path.includes('database')) return 'database';
        if (path.includes('tierlist')) return 'tierlist';
        if (path.includes('about')) return 'about';
        return 'home';
    }

    async loadHeader() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            try {
                const response = await fetch('../components/header.html');
                const headerHTML = await response.text();
                headerPlaceholder.innerHTML = headerHTML;
            } catch (error) {
                console.error('Failed to load header:', error);
            }
        }
    }

    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-tab');
        navLinks.forEach(link => {
            const page = link.dataset.page;
            if (page === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    setupGlobalEvents() {
        // 全局键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }

    closeModals() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    async initializeDatabasePage() {
        console.log('🗄️ Initializing Database Page...');
        
        try {
            // 等待数据库页面类加载完成
            if (typeof DatabasePage === 'undefined') {
                console.log('⏳ Waiting for DatabasePage class to load...');
                await this.waitForDatabasePage();
            }
            
            // 创建数据库页面实例
            this.databasePage = new DatabasePage(this);
            await this.databasePage.init();
            
            // 设置全局函数
            window.databasePage = this.databasePage;
            window.showPage = (pageName) => this.showPage(pageName);
            
            // 设置视图模式切换事件
            this.setupViewModeToggle();
            
            console.log('✅ Database Page initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Database Page:', error);
        }
    }

    async waitForDatabasePage() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (typeof DatabasePage !== 'undefined') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            
            // 超时保护
            setTimeout(() => {
                clearInterval(checkInterval);
                console.error('❌ DatabasePage class not found after timeout');
                resolve();
            }, 5000);
        });
    }

    setupViewModeToggle() {
        const viewModeBtn = document.getElementById('viewModeBtn');
        if (viewModeBtn && this.databasePage) {
            viewModeBtn.addEventListener('click', () => {
                this.databasePage.toggleViewMode();
            });
        }
    }

    showPage(pageName) {
        console.log('📄 Navigating to page:', pageName);
        // 简单的页面导航逻辑
        const pages = {
            'tierlist': '../pages/tierlist.html',
            'database': '../pages/database.html',
            'calculator': '../pages/calculator.html',
            'about': '../pages/about.html'
        };
        
        if (pages[pageName]) {
            window.location.href = pages[pageName];
        }
    }
}

// 初始化
    document.addEventListener('DOMContentLoaded', () => {
    new SiteManager();
});