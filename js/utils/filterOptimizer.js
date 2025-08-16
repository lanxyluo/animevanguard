// 筛选器优化工具
export class FilterOptimizer {
    constructor() {
        this.evolvableUnits = this.getEvolvableUnits();
        this.filterPresets = this.getFilterPresets();
    }

    // 基于真实游戏数据的可进化单位列表
    getEvolvableUnits() {
        return {
            // Secret 稀有度 (极少数)
            "alocard": { name: "Alocard", rarity: "Secret", element: "Dark", evolutionName: "Alocard (Vampire King)" },
            "igros": { name: "Igros", rarity: "Secret", element: "Physical", evolutionName: "Igros (Elite Knight)" },
            "rengoku": { name: "Rengoku", rarity: "Secret", element: "Fire", evolutionName: "Rengoku (Purgatory)" },
            "tuji": { name: "Tuji", rarity: "Secret", element: "Dark", evolutionName: "Tuji (King of Curses)" },
            
            // Mythic 稀有度 (较少)
            "songjinwu": { name: "Song Jinwu", rarity: "Mythic", element: "Shadow", evolutionName: "Song Jinwu (Monarch)" },
            "obita": { name: "Obita", rarity: "Mythic", element: "Fire", evolutionName: "Obita (Awakened)" },
            "noruto": { name: "Noruto", rarity: "Mythic", element: "Wind", evolutionName: "Noruto (Six Tails)" },
            "gujo": { name: "Gujo", rarity: "Mythic", element: "Energy", evolutionName: "Gujo (Infinity)" },
            "akazo": { name: "Akazo", rarity: "Mythic", element: "Physical", evolutionName: "Akazo (Destructive)" },
            "chaso": { name: "Chaso", rarity: "Mythic", element: "Dark", evolutionName: "Chaso (Blood)" },
            "jago": { name: "Jag-o", rarity: "Mythic", element: "Fire", evolutionName: "Jag-o (Volcanic)" },
            "sosuke": { name: "Sosuke", rarity: "Mythic", element: "Lightning", evolutionName: "Sosuke (Storm)" },
            "tengon": { name: "Tengon", rarity: "Mythic", element: "Physical", evolutionName: "Tengon (Flashiness)" },
            
            // 少数Legendary可以进化
            "julies": { name: "Julies", rarity: "Legendary", element: "Fire", evolutionName: "Julies (Explosion)" },
            "todu": { name: "Todu", rarity: "Legendary", element: "Physical", evolutionName: "Todu (Unleashed)" }
        };
    }

    // 检查单位是否可进化
    canEvolve(unitId) {
        return this.evolvableUnits.hasOwnProperty(unitId.toLowerCase());
    }

    // 获取筛选器预设
    getFilterPresets() {
        return {
            "evolution-ready": {
                name: "Evolution Ready",
                description: "All units that can evolve",
                filter: (unit) => this.canEvolve(unit.id)
            },
            "mythic-all": {
                name: "Mythic (All Elements)", 
                description: "All Mythic units regardless of element",
                filter: (unit) => unit.rarity === "Mythic"
            },
            "secret-units": {
                name: "Secret Units",
                description: "Ultra-rare Secret units",
                filter: (unit) => unit.rarity === "Secret"
            },
            "fire-evolution": {
                name: "Fire Evolution",
                description: "Fire units that can evolve",
                filter: (unit) => unit.element === "Fire" && this.canEvolve(unit.id)
            }
        };
    }

    // 优化筛选器
    optimizeUnitFilter() {
        const rarityFilter = document.querySelector('[data-rarity-filter]') || document.getElementById('rarityFilter');
        const elementFilter = document.querySelector('[data-element-filter]') || document.getElementById('elementFilter');
        
        if (rarityFilter) {
            this.addEvolutionReadyOption(rarityFilter);
        }
        
        this.addFilterCountDisplay();
        this.addFilterHelp();
    }

    // 添加Evolution Ready选项
    addEvolutionReadyOption(rarityFilter) {
        // 检查是否已经添加过
        if (rarityFilter.querySelector('option[value="evolution-ready"]')) {
            return;
        }

        // 添加"Evolution Ready"选项作为第一个选项
        const evolutionOption = document.createElement('option');
        evolutionOption.value = "evolution-ready";
        evolutionOption.textContent = "Evolution Ready (Recommended)";
        rarityFilter.insertBefore(evolutionOption, rarityFilter.firstChild);
        rarityFilter.value = "evolution-ready"; // 设为默认选项
    }

    // 添加筛选结果计数显示
    addFilterCountDisplay() {
        const filterContainer = document.querySelector('.filter-section') || document.querySelector('.unit-selection');
        if (!filterContainer) return;

        // 检查是否已经存在
        if (filterContainer.querySelector('[data-filter-count]')) {
            return;
        }

        const countDisplay = document.createElement('div');
        countDisplay.className = 'filter-results';
        countDisplay.setAttribute('data-filter-count', '');
        countDisplay.innerHTML = `
            <div class="filter-stats">
                <span class="total-count">Loading units...</span>
            </div>
        `;

        filterContainer.appendChild(countDisplay);
    }

    // 更新筛选结果计数
    updateFilterCount(filteredUnits) {
        const countDisplay = document.querySelector('[data-filter-count]');
        if (!countDisplay) return;

        const evolutionReady = filteredUnits.filter(unit => this.canEvolve(unit.id)).length;
        
        countDisplay.innerHTML = `
            <div class="filter-stats">
                <span class="total-count">${filteredUnits.length} units found</span>
                <span class="evolution-count">${evolutionReady} can evolve</span>
                ${evolutionReady === 0 ? '<span class="no-evolution-warning">⚠️ No evolution available for current filters</span>' : ''}
            </div>
        `;
    }

    // 添加筛选器帮助提示
    addFilterHelp() {
        const filterContainer = document.querySelector('.filter-section') || document.querySelector('.unit-selection');
        if (!filterContainer || filterContainer.querySelector('.filter-help')) {
            return;
        }

        const helpText = `
            <div class="filter-help">
                <details>
                    <summary>❓ Why so few results?</summary>
                    <div class="help-content">
                        <p>In Anime Vanguards, only high-rarity units can evolve:</p>
                        <ul>
                            <li><strong>Secret:</strong> 0.004% chance, ~10 units total</li>
                            <li><strong>Mythic:</strong> 0.5% chance, ~20 evolution-capable units</li>
                            <li><strong>Others:</strong> Very rare exceptions</li>
                        </ul>
                        <p>💡 Use "Evolution Ready" filter to see all evolvable units!</p>
                    </div>
                </details>
            </div>
        `;
        
        filterContainer.insertAdjacentHTML('beforeend', helpText);
    }

    // 应用筛选器预设
    applyFilterPreset(presetKey, units) {
        const preset = this.filterPresets[presetKey];
        if (!preset) return units;

        return units.filter(preset.filter);
    }

    // 获取筛选器统计信息
    getFilterStats(units) {
        const stats = {
            total: units.length,
            evolutionReady: units.filter(unit => this.canEvolve(unit.id)).length,
            byRarity: {},
            byElement: {}
        };

        units.forEach(unit => {
            stats.byRarity[unit.rarity] = (stats.byRarity[unit.rarity] || 0) + 1;
            stats.byElement[unit.element] = (stats.byElement[unit.element] || 0) + 1;
        });

        return stats;
    }
}
