// 使用全局变量而不是ES6模块导入
// import { loadAllUnits } from '../config/unit-database-data.js';

class UnitSelector {
    constructor(onUnitSelect) {
        // 防止重复初始化
        if (this.initialized) {
            console.log('⏭️ UnitSelector already initialized, skipping');
            return;
        }
        
        this.onUnitSelect = onUnitSelect;
        this.units = this.loadUnits();
        this.init();
        this.initialized = true;
    }

    loadUnits() {
        // 等待数据加载完成
        if (window.UnitDatabaseData && window.UnitDatabaseData.loadAllUnits) {
            console.log('Loading units from UnitDatabaseData...');
            const units = window.UnitDatabaseData.loadAllUnits();
            console.log(`Loaded ${units.length} units`);
            return units;
        } else {
            console.warn('UnitDatabaseData not available, retrying in 100ms...');
            // 延迟重试
            setTimeout(() => {
                if (window.UnitDatabaseData && window.UnitDatabaseData.loadAllUnits) {
                    this.units = window.UnitDatabaseData.loadAllUnits();
                    this.renderUnits();
                    console.log(`Retry successful: loaded ${this.units.length} units`);
                }
            }, 100);
            return [];
        }
    }

    init() {
        this.renderUnits();
        this.bindSearchEvents();
        this.initializeFilters();
    }

    renderUnits(filteredUnits = this.units) {
        const gridContainer = document.getElementById('unit-grid');
        if (!gridContainer) {
            console.error('Unit grid container not found!');
            return;
        }
        
        console.log(`Rendering ${filteredUnits.length} units...`);
        gridContainer.innerHTML = '';

        if (filteredUnits.length === 0) {
            gridContainer.innerHTML = `
                <div class="col-span-2 text-center text-gray-400 py-8">
                    <i class="fas fa-search text-4xl mb-4"></i>
                    <p>No units found</p>
                </div>
            `;
            return;
        }

        filteredUnits.forEach(unit => {
            try {
                const unitCard = this.createUnitCard(unit);
                gridContainer.appendChild(unitCard);
            } catch (error) {
                console.error('Error creating unit card for:', unit.name, error);
            }
        });
    }

    createUnitCard(unit) {
        const card = document.createElement('div');
        card.className = 'unit-card bg-gray-700 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:bg-gray-600 hover:scale-105 hover:shadow-lg border-2 border-transparent';
        
        // 稀有度颜色
        const rarityColors = {
            'Vanguard': 'border-purple-500 bg-gradient-to-br from-purple-800 to-gray-700',
            'Secret': 'border-red-500 bg-gradient-to-br from-red-800 to-gray-700',
            'Mythic': 'border-yellow-500 bg-gradient-to-br from-yellow-800 to-gray-700',
            'Legendary': 'border-orange-500 bg-gradient-to-br from-orange-800 to-gray-700'
        };

        card.innerHTML = `
            <div class="text-center">
                <div class="relative mb-2">
                    <img src="${unit.image || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'64\' height=\'64\' viewBox=\'0 0 64 64\'%3E%3Crect width=\'64\' height=\'64\' fill=\'%23374151\'/%3E%3Ctext x=\'32\' y=\'32\' text-anchor=\'middle\' dy=\'0.35em\' font-family=\'Arial\' font-size=\'24\' fill=\'%23fff\'%3E${unit.name.charAt(0)}%3C/text%3E%3C/svg%3E'}" 
                         alt="${unit.name}" 
                         class="w-16 h-16 mx-auto rounded-lg object-cover border-2 ${rarityColors[unit.rarity] ? 'border-current' : 'border-gray-600'}"
                         loading="lazy">
                    
                    <!-- 稀有度标签 -->
                    <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full ${this.getRarityColor(unit.rarity)}"></div>
                </div>
                
                <h3 class="text-xs font-medium text-white leading-tight mb-1">${unit.name}</h3>
                <div class="text-xs px-2 py-1 rounded ${this.getRarityBadgeClass(unit.rarity)}">
                    ${unit.rarity}
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            this.selectUnit(unit, card);
        });

        return card;
    }

    getRarityColor(rarity) {
        const colors = {
            'Vanguard': 'bg-purple-500',
            'Secret': 'bg-red-500', 
            'Mythic': 'bg-yellow-500',
            'Legendary': 'bg-orange-500',
            'Epic': 'bg-blue-500',
            'Rare': 'bg-green-500',
            'Common': 'bg-gray-500'
        };
        return colors[rarity] || 'bg-gray-500';
    }

    getRarityBadgeClass(rarity) {
        const classes = {
            'Vanguard': 'bg-purple-600 text-purple-100',
            'Secret': 'bg-red-600 text-red-100',
            'Mythic': 'bg-yellow-600 text-yellow-100', 
            'Legendary': 'bg-orange-600 text-orange-100',
            'Epic': 'bg-blue-600 text-blue-100',
            'Rare': 'bg-green-600 text-green-100',
            'Common': 'bg-gray-600 text-gray-100'
        };
        return classes[rarity] || 'bg-gray-600 text-gray-100';
    }

    selectUnit(unit, cardElement) {
        // 移除之前的选中状态
        document.querySelectorAll('#unit-grid > div').forEach(el => {
            el.classList.remove('ring-2', 'ring-blue-500');
        });
        
        // 添加选中状态
        cardElement.classList.add('ring-2', 'ring-blue-500');
        
        this.onUnitSelect(unit);
    }

    bindSearchEvents() {
        const searchInput = document.getElementById('unit-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            this.filterUnits();
        });
    }

    initializeFilters() {
        // 稀有度筛选
        document.querySelectorAll('.rarity-filter').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll('.rarity-filter').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.filterUnits();
            });
        });
    }

    filterUnits() {
        const searchTerm = document.getElementById('unit-search').value.toLowerCase();
        const activeRarity = document.querySelector('.rarity-filter.active')?.dataset.rarity || 'all';
        
        const filtered = this.units.filter(unit => {
            const matchesSearch = unit.name.toLowerCase().includes(searchTerm) ||
                                 unit.rarity.toLowerCase().includes(searchTerm) ||
                                 (unit.element && unit.element.toLowerCase().includes(searchTerm));
            const matchesRarity = activeRarity === 'all' || unit.rarity === activeRarity;
            return matchesSearch && matchesRarity;
        });
        
        this.renderUnits(filtered);
        const unitCountEl = document.getElementById('unit-count');
        if (unitCountEl) {
            unitCountEl.textContent = `${filtered.length} units`;
        }
    }
}

// 导出到全局变量
window.UnitSelector = UnitSelector;
