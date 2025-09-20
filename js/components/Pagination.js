/**
 * Pagination Component
 * Handles pagination logic and UI
 */
export class Pagination {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            currentPage: 1,
            totalPages: 1,
            itemsPerPage: 12,
            totalItems: 0,
            onPageChange: () => {},
            onItemsPerPageChange: () => {},
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="pagination-info">
                <span class="pagination-summary">
                    Showing ${this.getStartItem()} to ${this.getEndItem()} of ${this.options.totalItems} units
                </span>
                <div class="items-per-page">
                    <span>Items per page:</span>
                    <select class="items-per-page-select">
                        <option value="8" ${this.options.itemsPerPage === 8 ? 'selected' : ''}>8</option>
                        <option value="12" ${this.options.itemsPerPage === 12 ? 'selected' : ''}>12</option>
                        <option value="16" ${this.options.itemsPerPage === 16 ? 'selected' : ''}>16</option>
                        <option value="24" ${this.options.itemsPerPage === 24 ? 'selected' : ''}>24</option>
                    </select>
                </div>
            </div>
            
            <div class="pagination">
                ${this.generatePaginationItems()}
            </div>
            
            <div class="pagination-mobile">
                <button class="pagination-item" data-page="${this.options.currentPage - 1}" ${this.options.currentPage <= 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                <span class="pagination-info">
                    Page ${this.options.currentPage} of ${this.options.totalPages}
                </span>
                <button class="pagination-item" data-page="${this.options.currentPage + 1}" ${this.options.currentPage >= this.options.totalPages ? 'disabled' : ''}>
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    }
    
    bindEvents() {
        // Pagination items
        const paginationItems = this.container.querySelectorAll('.pagination-item');
        paginationItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const page = parseInt(e.currentTarget.dataset.page);
                if (page && page !== this.options.currentPage && page >= 1 && page <= this.options.totalPages) {
                    this.goToPage(page);
                }
            });
        });
        
        // Items per page select
        const itemsPerPageSelect = this.container.querySelector('.items-per-page-select');
        itemsPerPageSelect.addEventListener('change', (e) => {
            const newItemsPerPage = parseInt(e.target.value);
            this.setItemsPerPage(newItemsPerPage);
        });
    }
    
    generatePaginationItems() {
        const items = [];
        const currentPage = this.options.currentPage;
        const totalPages = this.options.totalPages;
        
        // Previous button
        items.push(`
            <button class="pagination-item" data-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `);
        
        // Page numbers
        const maxVisiblePages = 7;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // Adjust start page if we're near the end
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // First page and ellipsis
        if (startPage > 1) {
            items.push(`
                <button class="pagination-item" data-page="1">1</button>
            `);
            if (startPage > 2) {
                items.push('<span class="pagination-ellipsis">...</span>');
            }
        }
        
        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            items.push(`
                <button class="pagination-item ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
            `);
        }
        
        // Last page and ellipsis
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push('<span class="pagination-ellipsis">...</span>');
            }
            items.push(`
                <button class="pagination-item" data-page="${totalPages}">${totalPages}</button>
            `);
        }
        
        // Next button
        items.push(`
            <button class="pagination-item" data-page="${currentPage + 1}" ${currentPage >= totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `);
        
        return items.join('');
    }
    
    getStartItem() {
        return (this.options.currentPage - 1) * this.options.itemsPerPage + 1;
    }
    
    getEndItem() {
        return Math.min(this.options.currentPage * this.options.itemsPerPage, this.options.totalItems);
    }
    
    goToPage(page) {
        this.options.currentPage = page;
        this.render();
        this.bindEvents();
        this.options.onPageChange(page);
    }
    
    setItemsPerPage(itemsPerPage) {
        this.options.itemsPerPage = itemsPerPage;
        this.options.currentPage = 1; // Reset to first page
        this.options.totalPages = Math.ceil(this.options.totalItems / itemsPerPage);
        this.render();
        this.bindEvents();
        this.options.onItemsPerPageChange(itemsPerPage);
    }
    
    updatePagination(totalItems, currentPage = 1) {
        this.options.totalItems = totalItems;
        this.options.currentPage = currentPage;
        this.options.totalPages = Math.ceil(totalItems / this.options.itemsPerPage);
        this.render();
        this.bindEvents();
    }
    
    getCurrentPage() {
        return this.options.currentPage;
    }
    
    getItemsPerPage() {
        return this.options.itemsPerPage;
    }
    
    getTotalPages() {
        return this.options.totalPages;
    }
}
