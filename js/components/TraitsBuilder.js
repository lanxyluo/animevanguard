/**
 * Traits Builder Component
 * 负责初始化和管理Traits Builder工具
 */
import { animeVanguardsTraits } from '../utils/filterOptimizer.js';

export class TraitsBuilder {
    constructor() {
        this.elements = {};
        this.currentUnit = null;
        this.selectedTraits = {
            slot1: null,
            slot2: null,
            slot3: null
        };
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.initializeUnitSelector();
        this.initializeTraitSlots();
    }

    cacheElements() {
        // 缓存DOM元素
        this.elements = {
            unitSelect: document.getElementById('unitForTraits'),
            traitSlot1: document.getElementById('traitSlot1'),
            traitSlot2: document.getElementById('traitSlot2'),
            traitSlot3: document.getElementById('traitSlot3'),
            analyzeBtn: document.getElementById('analyzeTraits'),
            resultsContainer: document.getElementById('traitsResults')
        };
    }

    bindEvents() {
        // 绑定事件监听器
        if (this.elements.unitSelect) {
            this.elements.unitSelect.addEventListener('change', (e) => {
                this.onUnitChange(e.target.value);
            });
        }

        if (this.elements.traitSlot1) {
            this.elements.traitSlot1.addEventListener('change', (e) => {
                this.onTraitChange('slot1', e.target.value);
            });
        }

        if (this.elements.traitSlot2) {
            this.elements.traitSlot2.addEventListener('change', (e) => {
                this.onTraitChange('slot2', e.target.value);
            });
        }

        if (this.elements.traitSlot3) {
            this.elements.traitSlot3.addEventListener('change', (e) => {
                this.onTraitChange('slot3', e.target.value);
            });
        }

        if (this.elements.analyzeBtn) {
            this.elements.analyzeBtn.addEventListener('click', () => {
                this.analyzeTraits();
            });
        }
    }

    initializeUnitSelector() {
        if (!this.elements.unitSelect) return;

        // 清空现有选项
        this.elements.unitSelect.innerHTML = '<option value="">Choose a unit to see available traits...</option>';

        // 添加单位选项
        const units = this.getAvailableUnits();
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = unit.name;
            this.elements.unitSelect.appendChild(option);
        });
    }

    initializeTraitSlots() {
        // 初始化所有trait slot
        [this.elements.traitSlot1, this.elements.traitSlot2, this.elements.traitSlot3].forEach(slot => {
            if (slot) {
                this.populateTraitSlot(slot);
            }
        });
    }

    populateTraitSlot(slotElement) {
        if (!slotElement) return;

        // 清空现有选项
        slotElement.innerHTML = '<option value="">Select trait...</option>';

        // 添加所有可用的traits
        animeVanguardsTraits.forEach(trait => {
            const option = document.createElement('option');
            option.value = trait.id;
            option.textContent = `${trait.name} (${trait.rarity} - ${trait.category})`;
            option.title = trait.description;
            slotElement.appendChild(option);
        });
    }

    getAvailableUnits() {
        // 返回可用的单位列表
        // 基于实际的traits数据中的compatibleUnits
        const unitTypes = new Set();
        
        // 从traits数据中提取所有兼容的单位类型
        animeVanguardsTraits.forEach(trait => {
            if (trait.compatibleUnits) {
                trait.compatibleUnits.forEach(unit => {
                    if (unit !== 'All') {
                        unitTypes.add(unit);
                    }
                });
            }
        });
        
        // 转换为数组并排序
        const units = Array.from(unitTypes).sort();
        
        // 添加"All Units"选项
        return [
            { id: 'all', name: 'All Units' },
            ...units.map(unit => ({ id: unit, name: unit }))
        ];
    }

    onUnitChange(unitId) {
        this.currentUnit = unitId;
        
        if (unitId) {
            // 根据选择的单位筛选兼容的traits
            this.updateTraitSlotsForUnit(unitId);
        } else {
            // 重置为所有traits
            this.resetTraitSlots();
        }

        // 清空之前的选择
        this.selectedTraits = { slot1: null, slot2: null, slot3: null };
        this.updateAnalyzeButton();
    }

    onTraitChange(slot, traitId) {
        this.selectedTraits[slot] = traitId;
        this.updateAnalyzeButton();
    }

    updateTraitSlotsForUnit(unitId) {
        // 根据单位类型筛选兼容的traits
        const compatibleTraits = animeVanguardsTraits.filter(trait => {
            if (!trait.compatibleUnits) return true;
            
            // 如果trait兼容所有单位，或者兼容选择的单位，则包含
            return trait.compatibleUnits.includes('All') || 
                   trait.compatibleUnits.includes(unitId);
        });

        // 更新所有trait slot
        [this.elements.traitSlot1, this.elements.traitSlot2, this.elements.traitSlot3].forEach(slot => {
            if (slot) {
                this.populateTraitSlotWithTraits(slot, compatibleTraits);
            }
        });
    }

    populateTraitSlotWithTraits(slotElement, traits) {
        if (!slotElement) return;

        // 清空现有选项
        slotElement.innerHTML = '<option value="">Select trait...</option>';

        // 按稀有度排序
        const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
        const sortedTraits = traits.sort((a, b) => {
            return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        });

        // 添加筛选后的traits
        sortedTraits.forEach(trait => {
            const option = document.createElement('option');
            option.value = trait.id;
            option.textContent = `${trait.name} (${trait.rarity} - ${trait.category})`;
            option.title = `${trait.description}\nCost: ${trait.cost.rerollStones} stones${trait.cost.gems ? ` + ${trait.cost.gems} gems` : ''}`;
            slotElement.appendChild(option);
        });
    }

    resetTraitSlots() {
        // 重置为显示所有traits
        [this.elements.traitSlot1, this.elements.traitSlot2, this.elements.traitSlot3].forEach(slot => {
            if (slot) {
                this.populateTraitSlot(slot);
            }
        });
    }

    updateAnalyzeButton() {
        if (!this.elements.analyzeBtn) return;

        const hasUnit = !!this.currentUnit;
        const hasTraits = Object.values(this.selectedTraits).some(trait => !!trait);

        this.elements.analyzeBtn.disabled = !hasUnit || !hasTraits;
        this.elements.analyzeBtn.classList.toggle('disabled', !hasUnit || !hasTraits);
    }

    analyzeTraits() {
        if (!this.currentUnit || !Object.values(this.selectedTraits).some(trait => !!trait)) {
            return;
        }

        const analysis = this.performTraitsAnalysis();
        this.displayResults(analysis);
    }

    performTraitsAnalysis() {
        const selectedTraitObjects = {};
        let totalCost = 0;
        let totalRarityScore = 0;
        let categories = new Set();
        let synergies = [];
        let recommendations = [];

        // 收集选择的traits信息
        Object.entries(this.selectedTraits).forEach(([slot, traitId]) => {
            if (traitId) {
                const trait = animeVanguardsTraits.find(t => t.id === traitId);
                if (trait) {
                    selectedTraitObjects[slot] = trait;
                    totalCost += trait.cost.rerollStones;
                    if (trait.cost.gems) totalCost += trait.cost.gems * 0.1; // 宝石转换为重掷石等价
                    
                    // 稀有度评分
                    const rarityScores = { 'Common': 1, 'Uncommon': 2, 'Rare': 3, 'Epic': 4, 'Legendary': 5, 'Mythic': 6 };
                    totalRarityScore += rarityScores[trait.rarity] || 0;
                    
                    categories.add(trait.category);
                }
            }
        });

        // 分析协同效应
        const traitList = Object.values(selectedTraitObjects);
        if (traitList.length > 1) {
            // 检查攻击类协同
            const attackTraits = traitList.filter(t => t.category === 'Attack');
            if (attackTraits.length >= 2) {
                synergies.push('Multiple Attack traits provide offensive synergy');
            }

            // 检查防御类协同
            const defenseTraits = traitList.filter(t => t.category === 'Defense');
            if (defenseTraits.length >= 2) {
                synergies.push('Multiple Defense traits provide defensive synergy');
            }

            // 检查平衡性
            if (attackTraits.length > 0 && defenseTraits.length > 0) {
                synergies.push('Balanced Attack/Defense combination');
            }
        }

        // 生成建议
        if (totalCost > 15) {
            recommendations.push('High cost build - consider budget alternatives for some slots');
        }
        if (totalRarityScore > 12) {
            recommendations.push('High rarity build - excellent for endgame content');
        }
        if (categories.size === 1) {
            recommendations.push('Focused build - consider adding variety for flexibility');
        }

        return {
            unit: this.currentUnit,
            selectedTraits: selectedTraitObjects,
            totalCost,
            totalRarityScore,
            categories: Array.from(categories),
            synergies,
            recommendations,
            buildRating: this.calculateBuildRating(totalRarityScore, totalCost, categories.size)
        };
    }

    calculateBuildRating(rarityScore, cost, categoryVariety) {
        let score = 0;
        
        // 稀有度评分 (0-18分)
        score += Math.min(rarityScore, 18);
        
        // 成本效率评分 (0-10分)
        const costEfficiency = Math.max(0, 10 - Math.floor(cost / 3));
        score += costEfficiency;
        
        // 多样性评分 (0-5分)
        score += Math.min(categoryVariety * 2, 5);
        
        // 转换为评级
        if (score >= 25) return 'S';
        if (score >= 20) return 'A';
        if (score >= 15) return 'B';
        if (score >= 10) return 'C';
        return 'D';
    }

    displayResults(analysis) {
        if (!this.elements.resultsContainer) return;

        const { selectedTraits, totalCost, totalRarityScore, categories, synergies, recommendations, buildRating } = analysis;

        let html = `
            <div class="traits-analysis-results">
                <div class="analysis-header">
                    <h4><i class="fas fa-chart-bar"></i> Traits Analysis Results</h4>
                    <div class="build-rating ${buildRating.toLowerCase()}-tier">
                        <span class="rating-label">Build Rating:</span>
                        <span class="rating-value">${buildRating}</span>
                    </div>
                </div>
                
                <div class="analysis-summary">
                    <div class="summary-item">
                        <span class="label">Total Cost:</span>
                        <span class="value">${totalCost.toFixed(1)} stones</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Rarity Score:</span>
                        <span class="value">${totalRarityScore}/18</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Categories:</span>
                        <span class="value">${categories.join(', ')}</span>
                    </div>
                </div>

                <div class="selected-traits">
                    <h5>Selected Traits:</h5>
                    <div class="traits-grid">
        `;

        Object.entries(selectedTraits).forEach(([slot, trait]) => {
            html += `
                <div class="trait-card ${trait.rarity.toLowerCase()}-rarity">
                    <div class="trait-header">
                        <span class="trait-name">${trait.name}</span>
                        <span class="trait-rarity">${trait.rarity}</span>
                    </div>
                    <div class="trait-category">${trait.category}</div>
                    <div class="trait-effect">${trait.effect.description}</div>
                    <div class="trait-cost">
                        <span class="cost-stones">${trait.cost.rerollStones} stones</span>
                        ${trait.cost.gems ? `<span class="cost-gems">+ ${trait.cost.gems} gems</span>` : ''}
                    </div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
        `;

        if (synergies.length > 0) {
            html += `
                <div class="synergies">
                    <h5><i class="fas fa-link"></i> Synergies:</h5>
                    <ul>
                        ${synergies.map(synergy => `<li>${synergy}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (recommendations.length > 0) {
            html += `
                <div class="recommendations">
                    <h5><i class="fas fa-lightbulb"></i> Recommendations:</h5>
                    <ul>
                        ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        html += `
                <div class="analysis-actions">
                    <button class="btn btn-secondary" onclick="this.parentElement.parentElement.innerHTML = '<i class=\\'fas fa-search\\'></i><p>Select a unit and traits to see analysis results</p>'">
                        <i class="fas fa-refresh"></i> Reset Analysis
                    </button>
                </div>
            </div>
        `;

        this.elements.resultsContainer.innerHTML = html;
    }

    // 公共方法：重置组件
    reset() {
        this.currentUnit = null;
        this.selectedTraits = { slot1: null, slot2: null, slot3: null };
        
        if (this.elements.unitSelect) {
            this.elements.unitSelect.value = '';
        }
        
        [this.elements.traitSlot1, this.elements.traitSlot2, this.elements.traitSlot3].forEach(slot => {
            if (slot) {
                slot.value = '';
            }
        });
        
        this.updateAnalyzeButton();
        
        if (this.elements.resultsContainer) {
            this.elements.resultsContainer.innerHTML = `
                <i class="fas fa-search"></i>
                <p>Select a unit and traits to see analysis results</p>
            `;
        }
    }

    // 公共方法：显示组件
    show() {
        console.log('🎯 Traits Builder shown');
        // 可以在这里添加页面显示时的特殊逻辑
        // 比如刷新数据、重置状态等
    }
}
