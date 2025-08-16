// 筛选器优化工具
export class FilterOptimizer {
    constructor() {
        this.evolvableUnits = this.getEvolvableUnits();
        this.filterPresets = this.getFilterPresets();
        this.evolvableUnitsData = this.getEvolvableUnitsData();
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

    // 获取可进化单位数据（按稀有度和元素分组）
    getEvolvableUnitsData() {
        return {
            // 按稀有度分组
            rarity: {
                "Secret": ["Alocard", "Igros", "Rengoku", "Tuji"], // 4个
                "Mythic": ["Song Jinwu", "Obita", "Noruto", "Gujo", "Akazo", "Chaso", "Jag-o", "Sosuke", "Tengon"], // 9个
                "Legendary": ["Julies", "Todu"], // 2个
                "Epic": [], // 0个
                "Rare": [], // 0个
                "Common": [] // 0个
            },
            
            // 按元素分组
            element: {
                "Fire": ["Rengoku", "Obita", "Jag-o", "Julies"], // 4个
                "Dark": ["Alocard", "Tuji", "Chaso"], // 3个
                "Shadow": ["Song Jinwu"], // 1个
                "Physical": ["Igros", "Akazo", "Tengon", "Todu"], // 4个
                "Wind": ["Noruto"], // 1个
                "Energy": ["Gujo"], // 1个
                "Lightning": ["Sosuke"], // 1个
                "Water": [], // 0个
                "Light": [] // 0个
            },
            
            // 组合数据（稀有度+元素）
            combinations: {
                "Secret+Fire": ["Rengoku"], // 1个
                "Secret+Dark": ["Alocard", "Tuji"], // 2个
                "Secret+Physical": ["Igros"], // 1个
                "Mythic+Fire": ["Obita", "Jag-o"], // 2个
                "Mythic+Dark": ["Chaso"], // 1个
                "Mythic+Shadow": ["Song Jinwu"], // 1个
                "Mythic+Physical": ["Akazo", "Tengon"], // 2个
                "Mythic+Wind": ["Noruto"], // 1个
                "Mythic+Energy": ["Gujo"], // 1个
                "Mythic+Lightning": ["Sosuke"], // 1个
                "Legendary+Fire": ["Julies"], // 1个
                "Legendary+Physical": ["Todu"] // 1个
                // 其他组合为0
            }
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

    // 智能筛选器优化
    optimizeUnitFilter() {
        const rarityFilter = document.querySelector('[data-rarity-filter]') || document.getElementById('rarityFilter');
        const elementFilter = document.querySelector('[data-element-filter]') || document.getElementById('elementFilter');
        
        if (rarityFilter) {
            this.addEvolutionReadyOption(rarityFilter);
            this.updateRarityOptions(rarityFilter);
        }
        
        if (elementFilter) {
            this.updateElementOptions(elementFilter);
        }
        
        this.addFilterCountDisplay();
        this.addFilterHelp();
        this.addCombinationPreview();
        this.addFilterSuggestions();
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

    // 更新稀有度选项（显示可用数量）
    updateRarityOptions(rarityFilter) {
        const options = [
            { value: "", text: "All Rarity", count: this.getTotalEvolvableCount() },
            { value: "Secret", text: "Secret", count: this.evolvableUnitsData.rarity.Secret.length },
            { value: "Mythic", text: "Mythic", count: this.evolvableUnitsData.rarity.Mythic.length },
            { value: "Legendary", text: "Legendary", count: this.evolvableUnitsData.rarity.Legendary.length },
            { value: "Epic", text: "Epic", count: this.evolvableUnitsData.rarity.Epic.length },
            { value: "Rare", text: "Rare", count: this.evolvableUnitsData.rarity.Rare.length }
        ];
        
        // 保存当前选中的值
        const currentValue = rarityFilter.value;
        
        rarityFilter.innerHTML = options.map(option => {
            const displayText = option.value === "" ? 
                `${option.text} (${option.count} evolvable)` : 
                `${option.text} (${option.count})`;
            
            const isDisabled = option.count === 0 && option.value !== "";
            const className = isDisabled ? "disabled-option" : "";
            
            return `<option value="${option.value}" class="${className}" ${isDisabled ? 'disabled' : ''}>${displayText}</option>`;
        }).join('');
        
        // 恢复选中值
        if (currentValue) {
            rarityFilter.value = currentValue;
        }
    }

    // 更新元素选项（显示可用数量）
    updateElementOptions(elementFilter) {
        const options = [
            { value: "", text: "All Element", count: this.getTotalEvolvableCount() },
            { value: "Fire", text: "Fire", count: this.evolvableUnitsData.element.Fire.length },
            { value: "Dark", text: "Dark", count: this.evolvableUnitsData.element.Dark.length },
            { value: "Physical", text: "Physical", count: this.evolvableUnitsData.element.Physical.length },
            { value: "Shadow", text: "Shadow", count: this.evolvableUnitsData.element.Shadow.length },
            { value: "Wind", text: "Wind", count: this.evolvableUnitsData.element.Wind.length },
            { value: "Energy", text: "Energy", count: this.evolvableUnitsData.element.Energy.length },
            { value: "Lightning", text: "Lightning", count: this.evolvableUnitsData.element.Lightning.length },
            { value: "Water", text: "Water", count: this.evolvableUnitsData.element.Water.length },
            { value: "Light", text: "Light", count: this.evolvableUnitsData.element.Light.length }
        ];
        
        // 保存当前选中的值
        const currentValue = elementFilter.value;
        
        elementFilter.innerHTML = options.map(option => {
            const displayText = option.value === "" ? 
                `${option.text} (${option.count} evolvable)` : 
                `${option.text} (${option.count})`;
            
            const isDisabled = option.count === 0 && option.value !== "";
            const className = isDisabled ? "disabled-option" : "";
            
            return `<option value="${option.value}" class="${className}" ${isDisabled ? 'disabled' : ''}>${displayText}</option>`;
        }).join('');
        
        // 恢复选中值
        if (currentValue) {
            elementFilter.value = currentValue;
        }
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

    // 实时组合预览
    addCombinationPreview() {
        const rarityFilter = document.querySelector('[data-rarity-filter]') || document.getElementById('rarityFilter');
        const elementFilter = document.querySelector('[data-element-filter]') || document.getElementById('elementFilter');
        
        if (!rarityFilter || !elementFilter) return;
        
        // 检查是否已经存在
        if (document.querySelector('.filter-combination-preview')) {
            return;
        }

        // 创建预览区域
        const previewContainer = document.createElement('div');
        previewContainer.className = 'filter-combination-preview';
        previewContainer.innerHTML = `
            <div class="combination-result">
                <span class="result-count">${this.getTotalEvolvableCount()} evolvable units</span>
                <span class="result-detail">Select filters to see specific results</span>
            </div>
        `;
        
        // 插入到筛选器下方
        const filterContainer = rarityFilter.closest('.unit-selection') || rarityFilter.parentElement;
        filterContainer.appendChild(previewContainer);
        
        // 绑定事件监听器
        const updateCombinationPreview = () => {
            const selectedRarity = rarityFilter.value;
            const selectedElement = elementFilter.value;
            
            const resultCount = this.getCombinationCount(selectedRarity, selectedElement);
            const resultText = this.getResultDescription(selectedRarity, selectedElement, resultCount);
            
            previewContainer.innerHTML = `
                <div class="combination-result ${resultCount === 0 ? 'no-results' : ''}">
                    <span class="result-count">${resultCount} units available</span>
                    <span class="result-detail">${resultText}</span>
                </div>
            `;
        };
        
        rarityFilter.addEventListener('change', updateCombinationPreview);
        elementFilter.addEventListener('change', updateCombinationPreview);
        
        // 初始化显示
        updateCombinationPreview();
    }

    // 计算组合结果数量
    getCombinationCount(rarity, element) {
        if (!rarity && !element) {
            return this.getTotalEvolvableCount(); // 15个总数
        }
        
        if (rarity && !element) {
            return this.evolvableUnitsData.rarity[rarity]?.length || 0;
        }
        
        if (!rarity && element) {
            return this.evolvableUnitsData.element[element]?.length || 0;
        }
        
        // 两个都选择时，计算交集
        const combinationKey = `${rarity}+${element}`;
        return this.evolvableUnitsData.combinations[combinationKey]?.length || 0;
    }

    // 生成结果描述
    getResultDescription(rarity, element, count) {
        if (count === 0) {
            return "❌ No evolvable units match this combination";
        }
        
        if (count === 1) {
            return "✅ Perfect! One specific unit found";
        }
        
        if (count <= 3) {
            return "✅ Great! Small focused selection";
        }
        
        if (count <= 8) {
            return "✅ Good! Manageable selection";
        }
        
        return "✅ All evolvable units shown";
    }

    // 获取总可进化单位数量
    getTotalEvolvableCount() {
        const allUnits = new Set();
        Object.values(this.evolvableUnitsData.rarity).forEach(units => {
            units.forEach(unit => allUnits.add(unit));
        });
        return allUnits.size; // 约15个
    }

    // 智能建议系统
    addFilterSuggestions() {
        const filterContainer = document.querySelector('.filter-section') || document.querySelector('.unit-selection');
        if (!filterContainer || filterContainer.querySelector('.filter-suggestions')) {
            return;
        }

        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'filter-suggestions';
        suggestionsContainer.innerHTML = `
            <div class="suggestions-header">💡 Quick Filters:</div>
            <div class="suggestion-buttons">
                <button class="suggestion-btn" data-preset="secret-all">Secret Units (4)</button>
                <button class="suggestion-btn" data-preset="mythic-all">Mythic Units (9)</button>
                <button class="suggestion-btn" data-preset="fire-units">Fire Units (4)</button>
                <button class="suggestion-btn" data-preset="physical-units">Physical Units (4)</button>
                <button class="suggestion-btn" data-preset="all-evolution">All Evolvable (15)</button>
            </div>
        `;
        
        // 绑定快捷筛选按钮
        suggestionsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-btn')) {
                const preset = e.target.dataset.preset;
                this.applyFilterPreset(preset);
            }
        });
        
        filterContainer.appendChild(suggestionsContainer);
    }

    // 应用预设筛选器
    applyFilterPreset(preset) {
        const rarityFilter = document.querySelector('[data-rarity-filter]') || document.getElementById('rarityFilter');
        const elementFilter = document.querySelector('[data-element-filter]') || document.getElementById('elementFilter');
        
        if (!rarityFilter || !elementFilter) return;
        
        const presets = {
            "secret-all": { rarity: "Secret", element: "" },
            "mythic-all": { rarity: "Mythic", element: "" },
            "fire-units": { rarity: "", element: "Fire" },
            "physical-units": { rarity: "", element: "Physical" },
            "all-evolution": { rarity: "", element: "" }
        };
        
        const config = presets[preset];
        if (config) {
            rarityFilter.value = config.rarity;
            elementFilter.value = config.element;
            
            // 触发筛选更新
            rarityFilter.dispatchEvent(new Event('change'));
            elementFilter.dispatchEvent(new Event('change'));
        }
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

    // 添加智能筛选器样式
    addSmartFilterStyles() {
        if (document.querySelector('#smart-filter-styles')) {
            return;
        }

        const smartFilterStyles = `
            .filter-combination-preview {
                margin-top: 12px;
                padding: 10px;
                background: rgba(59, 130, 246, 0.1);
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 6px;
            }

            .combination-result {
                text-align: center;
            }

            .combination-result.no-results {
                background: rgba(239, 68, 68, 0.1);
                border-color: rgba(239, 68, 68, 0.3);
                color: #ef4444;
            }

            .result-count {
                font-weight: 600;
                color: #3b82f6;
                font-size: 1.1em;
            }

            .result-detail {
                display: block;
                font-size: 0.9em;
                color: #94a3b8;
                margin-top: 4px;
            }

            .disabled-option {
                color: #6b7280;
                background: rgba(75, 85, 99, 0.5);
            }

            .filter-suggestions {
                margin-top: 16px;
                padding: 12px;
                background: rgba(30, 41, 59, 0.6);
                border-radius: 6px;
            }

            .suggestions-header {
                font-size: 0.9em;
                color: #cbd5e1;
                margin-bottom: 8px;
            }

            .suggestion-buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
            }

            .suggestion-btn {
                padding: 4px 8px;
                background: rgba(59, 130, 246, 0.2);
                border: 1px solid rgba(59, 130, 246, 0.4);
                border-radius: 4px;
                color: #3b82f6;
                font-size: 0.8em;
                cursor: pointer;
                transition: all 0.2s;
            }

            .suggestion-btn:hover {
                background: rgba(59, 130, 246, 0.3);
                border-color: rgba(59, 130, 246, 0.6);
            }

            @media (max-width: 768px) {
                .suggestion-buttons {
                    flex-direction: column;
                }
                
                .suggestion-btn {
                    text-align: center;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'smart-filter-styles';
        style.textContent = smartFilterStyles;
        document.head.appendChild(style);
    }
}
