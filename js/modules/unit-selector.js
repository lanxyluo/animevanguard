// 使用全局变量而不是ES6模块导入
// import { loadAllUnits } from '../config/unit-database-data.js';

class UnitSelector {
    constructor(onUnitSelect) {
        this.onUnitSelect = onUnitSelect;
        this.units = this.loadUnits();
        this.init();
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
        card.className = 'bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-all duration-200 hover:scale-105 unit-card-hover';
        card.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 mx-auto rounded-lg mb-2 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    ${unit.name.charAt(0)}
                </div>
                <h3 class="text-sm font-medium text-white">${unit.name}</h3>
                <div class="text-xs text-gray-400">${unit.rarity}</div>
                <div class="text-xs text-blue-400">${unit.element}</div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            this.selectUnit(unit, card);
        });

        return card;
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
        const searchInput = document.querySelector('#unit-search input');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = this.units.filter(unit => 
                unit.name.toLowerCase().includes(searchTerm) ||
                unit.rarity.toLowerCase().includes(searchTerm) ||
                unit.element.toLowerCase().includes(searchTerm)
            );
            this.renderUnits(filtered);
        });
    }
}

// 导出到全局变量
window.UnitSelector = UnitSelector;
