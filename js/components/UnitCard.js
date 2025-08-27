/**
 * Unit Card Component
 * Renders individual unit cards with all necessary information
 */
export class UnitCard {
    constructor(unit, options = {}) {
        this.unit = unit;
        this.options = {
            onCardClick: () => {},
            onViewDetails: () => {},
            onSelect: () => {},
            viewMode: 'grid', // 'grid' or 'list'
            selectable: false,
            selected: false,
            ...options
        };
        
        this.element = null;
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        const cardClass = this.options.viewMode === 'list' ? 'unit-card list-view' : 'unit-card';
        const selectedClass = this.options.selected ? ' selected' : '';
        
        this.element = document.createElement('div');
        this.element.className = cardClass + selectedClass;
        this.element.dataset.unitId = this.unit.id;
        
        this.element.innerHTML = `
            <div class="unit-card-header">
                <div class="unit-avatar">
                    ${this.getUnitAvatar()}
                </div>
                <div class="unit-info">
                    <h4 class="unit-name">${this.unit.name}</h4>
                    <div class="unit-meta">
                        <span class="rarity-badge ${this.unit.rarity.toLowerCase()}">
                            <i class="fas fa-star"></i>
                            ${this.unit.rarity}
                        </span>
                        <span class="element-badge">
                            <i class="fas fa-fire"></i>
                            ${this.unit.element}
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="unit-card-body">
                <p class="unit-description">${this.unit.description || 'A powerful unit with unique abilities.'}</p>
                <div class="unit-stats">
                    <div class="stat-item">
                        <i class="fas fa-sword stat-icon"></i>
                        <span class="stat-label">Attack</span>
                        <span class="stat-value">${this.unit.stats?.attack || 'N/A'}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-shield-alt stat-icon"></i>
                        <span class="stat-label">Defense</span>
                        <span class="stat-value">${this.unit.stats?.defense || 'N/A'}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-magic stat-icon"></i>
                        <span class="stat-label">Skill</span>
                        <span class="stat-value">${this.unit.stats?.skill || 'N/A'}</span>
                    </div>
                </div>
            </div>
            
            <div class="unit-card-footer">
                <div class="unit-type">
                    <i class="fas fa-user"></i>
                    ${this.unit.type || 'Unknown'}
                </div>
                <button class="view-details-btn">
                    View Details
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
    }
    
    bindEvents() {
        // Card click
        this.element.addEventListener('click', (e) => {
            // Don't trigger card click if clicking on view details button
            if (e.target.closest('.view-details-btn')) {
                return;
            }
            
            this.options.onCardClick(this.unit);
        });
        
        // View details button
        const viewDetailsBtn = this.element.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.options.onViewDetails(this.unit);
        });
    }
    
    getUnitAvatar() {
        // For now, use the first letter of the unit name
        // Later this can be replaced with actual unit images
        return this.unit.name.charAt(0).toUpperCase();
    }
    
    updateViewMode(viewMode) {
        this.options.viewMode = viewMode;
        this.element.className = `unit-card ${viewMode === 'list' ? 'list-view' : ''}${this.options.selected ? ' selected' : ''}`;
    }
    
    setSelected(selected) {
        this.options.selected = selected;
        if (selected) {
            this.element.classList.add('selected');
        } else {
            this.element.classList.remove('selected');
        }
    }
    
    setSelectable(selectable) {
        this.options.selectable = selectable;
        if (selectable) {
            this.element.style.cursor = 'pointer';
        } else {
            this.element.style.cursor = 'default';
        }
    }
    
    updateUnit(unit) {
        this.unit = unit;
        this.render();
        this.bindEvents();
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
    
    getElement() {
        return this.element;
    }
}

/**
 * Unit Card Factory
 * Creates unit cards with consistent styling and behavior
 */
export class UnitCardFactory {
    static create(unit, options = {}) {
        return new UnitCard(unit, options);
    }
    
    static createBatch(units, options = {}) {
        return units.map(unit => this.create(unit, options));
    }
}
