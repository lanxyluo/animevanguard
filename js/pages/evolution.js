import { UnitSelector } from '../components/UnitSelector.js';
import { MaterialsList } from '../components/MaterialsList.js';
import { CostSummary } from '../components/CostSummary.js';
import { FarmingGuide } from '../components/FarmingGuide.js';
import { showError } from '../utils/dom.js';
import { validateUnitData, validateMaterialsConfig, validateElementIcons } from '../utils/validation.js';
import { unitsData } from '../config/units.js';
import { RARITIES, ELEMENTS, dataUtils } from '../config/constants.js';
import { REAL_EVOLUTION_DATA, MATERIAL_OBTAIN_METHODS, EVOLUTION_COST_SUMMARY, FARMING_GUIDE_DATA } from '../config/realEvolutionData.js';

export class EvolutionPage {
    constructor(app) {
        this.app = app;
        this.isInitialized = false;
        
        // Component instances
        this.unitSelector = null;
        this.materialsList = null;
        this.costSummary = null;
        this.farmingGuide = null;
        
        // Data
        this.unitsData = null;
        this.materialsConfig = null;
        this.elementIcons = null;
        
        // Current state
        this.selectedUnit = null;
    }
    
    async initialize(data) {
        console.log('🚀 Initializing Evolution Page...');
        
        // Use the same data source as Unit Database, but filter for evolvable units
        this.unitsData = this.filterEvolvableUnits(unitsData);
        this.materialsConfig = data.materialsConfig;
        this.elementIcons = data.elementIcons;
        
        // Validate data
        const rarityValidation = dataUtils.validateRarities();
        const elementValidation = dataUtils.validateElements();
        
        if (!rarityValidation) {
            console.error('❌ Rarities validation failed');
            showError('Rarities validation failed', 'error');
            return false;
        }
        
        if (!elementValidation) {
            console.error('❌ Elements validation failed');
            showError('Elements validation failed', 'error');
            return false;
        }
        
        // Initialize components
        this.initializeComponents();
        
        this.isInitialized = true;
        console.log('✅ Evolution Page initialized!');
        return true;
    }
    
    filterEvolvableUnits(allUnits) {
        // Filter units that can evolve (mainly Mythic and Secret rarity)
        // Also include units that have evolution data in the evolution system
        const evolvableUnits = Object.values(allUnits).filter(unit => {
            // Check if unit has evolution data
            const hasEvolutionData = this.checkEvolutionData(unit.id);
            
            // Include units that are Mythic, Secret, or have evolution data
            return unit.rarity === 'Mythic' || 
                   unit.rarity === 'Secret' || 
                   unit.rarity === 'Vanguard' ||
                   hasEvolutionData;
        });
        
        console.log(`🔍 Filtered ${evolvableUnits.length} evolvable units from ${Object.values(allUnits).length} total units`);
        return evolvableUnits;
    }
    
    checkEvolutionData(unitId) {
        // Check if unit has evolution data in the real evolution data
        return REAL_EVOLUTION_DATA.hasOwnProperty(unitId);
    }
    
    updateFilterOptions() {
        // Update rarity filter to show correct default text and counts
        const rarityFilter = document.getElementById('rarityFilter');
        const elementFilter = document.getElementById('elementFilter');
        
        if (rarityFilter) {
            // Count units by rarity
            const rarityCount = {};
            this.unitsData.forEach(unit => {
                rarityCount[unit.rarity] = (rarityCount[unit.rarity] || 0) + 1;
            });
            
            // Update rarity options
            rarityFilter.innerHTML = `
                <option value="">All Rarity (${this.unitsData.length} evolvable)</option>
                <option value="Mythic">Mythic (${rarityCount['Mythic'] || 0})</option>
                <option value="Secret">Secret (${rarityCount['Secret'] || 0})</option>
                <option value="Vanguard">Vanguard (${rarityCount['Vanguard'] || 0})</option>
                <option value="Legendary">Legendary (${rarityCount['Legendary'] || 0})</option>
                <option value="Epic">Epic (${rarityCount['Epic'] || 0})</option>
                <option value="Rare">Rare (${rarityCount['Rare'] || 0})</option>
            `;
        }
        
        if (elementFilter) {
            // Count units by element
            const elementCount = {};
            this.unitsData.forEach(unit => {
                elementCount[unit.element] = (elementCount[unit.element] || 0) + 1;
            });
            
            // Update element options
            elementFilter.innerHTML = `
                <option value="">All Element (${this.unitsData.length} evolvable)</option>
                <option value="Fire">Fire (${elementCount['Fire'] || 0})</option>
                <option value="Dark">Dark (${elementCount['Dark'] || 0})</option>
                <option value="Physical">Physical (${elementCount['Physical'] || 0})</option>
                <option value="Energy">Energy (${elementCount['Energy'] || 0})</option>
                <option value="Lightning">Lightning (${elementCount['Lightning'] || 0})</option>
                <option value="Water">Water (${elementCount['Water'] || 0})</option>
                <option value="Light">Light (${elementCount['Light'] || 0})</option>
                <option value="Wind">Wind (${elementCount['Wind'] || 0})</option>
                <option value="Earth">Earth (${elementCount['Earth'] || 0})</option>
                <option value="Soul">Soul (${elementCount['Soul'] || 0})</option>
            `;
        }
    }
    
    addFilterHelp() {
        // Add helpful explanation for why there are few results
        const filterSection = document.querySelector('.filter-section');
        if (!filterSection || filterSection.querySelector('.filter-help')) {
            return;
        }
        
        const helpHtml = `
            <div class="filter-help">
                <details>
                    <summary>❓ Why so few results?</summary>
                    <div class="help-content">
                        <p><strong>In Anime Vanguard, only high-rarity units can evolve:</strong></p>
                        <ul>
                            <li><strong>Secret:</strong> Ultra rare units (0.004% drop rate)</li>
                            <li><strong>Mythic:</strong> Very rare units (0.5% drop rate)</li>
                            <li><strong>Vanguard:</strong> Special event units</li>
                        </ul>
                        <p>💡 <strong>Tip:</strong> Most units in the game cannot evolve - only these premium units have evolution paths!</p>
                    </div>
                </details>
            </div>
        `;
        
        filterSection.insertAdjacentHTML('beforeend', helpHtml);
    }
    
    initializeComponents() {
        // Initialize Unit Selector
        this.unitSelector = new UnitSelector('unitSelectorContainer', {
            onUnitSelect: this.handleUnitSelect.bind(this),
            showFilters: true,
            showSearch: true,
            debounceDelay: 300
        });
        
        // Set the units data and update filter options
        this.unitSelector.setUnits(this.unitsData, this.elementIcons);
        
        // Update filter options to show correct counts
        this.updateFilterOptions();
        
        // Add filter help explanation
        this.addFilterHelp();
        
        // Initialize Materials List
        this.materialsList = new MaterialsList('materialsListContainer', {
            showRarity: true,
            showDescription: true,
            showQuantity: true
        });
        
        // Initialize Cost Summary
        this.costSummary = new CostSummary('costSummaryContainer', {
            showBreakdown: true,
            showTotal: true,
            currency: 'Gold'
        });
        
        // Initialize Farming Guide
        this.farmingGuide = new FarmingGuide('farmingGuideContainer', {
            showPriority: true,
            showDifficulty: true,
            showTips: true,
            showObtainMethods: true
        });
        
        // Set up component data
        this.unitSelector.setUnits(this.unitsData, this.elementIcons);
        this.materialsList.setMaterialsConfig(this.materialsConfig);
        this.costSummary.setMaterialsConfig(this.materialsConfig);
    }
    
    handleUnitSelect(unit) {
        console.log('📄 === EvolutionPage 接收单位选择 ===');
        console.log('📊 当前页面状态:', this.selectedUnit);
        console.log('🆕 新选择的单位:', unit);
        
        // Update page state
        this.selectedUnit = unit;
        console.log('✅ 页面状态已更新:', this.selectedUnit);
        
        // Process unit selection with improved logic
        this.processUnitSelection(unit);
    }
    
    processUnitSelection(selectedUnit) {
        console.log("🔄 Processing unit selection:", selectedUnit);
        
        if (!selectedUnit || !selectedUnit.id) {
            console.log('❌ 无效的单位数据，清空所有组件');
            this.clearAllComponents();
            return;
        }
        
        // 1. 从单位名称提取ID (使用改进的ID提取逻辑)
        const unitId = this.extractUnitId(selectedUnit);
        console.log('🔍 提取的单位ID:', unitId);
        
        // 2. 映射ID到进化数据格式
        const mappedUnitId = this.mapUnitIdToEvolutionData(unitId);
        console.log('🔄 映射后的单位ID:', mappedUnitId);
        
        // 3. 查找进化数据
        const evolutionInfo = REAL_EVOLUTION_DATA[mappedUnitId];
        console.log('📋 找到的进化数据:', evolutionInfo);
        
        if (evolutionInfo && evolutionInfo.canEvolve) {
            console.log('✅ 单位可以进化，开始更新所有区域');
            // 4. 更新所有区域
            this.updateEvolutionRequirements(evolutionInfo);
            this.updateEvolutionMaterials(evolutionInfo); 
            this.updateCostSummary(evolutionInfo);
            this.updateFarmingGuide(evolutionInfo);
        } else {
            console.log('❌ 单位无法进化或无进化数据');
            // 5. 显示无进化数据提示
            this.showNoEvolutionData(selectedUnit);
        }
    }
    
    // 修复ID提取逻辑
    extractUnitId(unitDisplayName) {
        if (typeof unitDisplayName === 'object' && unitDisplayName.id) {
            // 如果传入的是单位对象，直接返回ID
            return unitDisplayName.id;
        }
        
        if (typeof unitDisplayName === 'string') {
            // 如果传入的是字符串，进行解析
            return unitDisplayName
                .replace(/^\[.*?\]\s*/, '') // 移除 [Mythic] 等
                .replace(/\s*\(.*?\).*$/, '') // 移除 (Free) 等
                .toLowerCase()
                .replace(/\s+/g, ''); // 移除空格
        }
        
        // 默认返回原值
        return unitDisplayName;
    }
    
    // 新增：ID映射函数，将unitsData的ID格式映射到REAL_EVOLUTION_DATA的ID格式
    mapUnitIdToEvolutionData(unitId) {
        // 创建ID映射表
        const idMapping = {
            // 将unitsData的ID映射到REAL_EVOLUTION_DATA的ID
            'goku_ultra_instinct': 'goku',
            'saitama': 'saitama',
            'goku_base': 'goku',
            'vegeta_ssb': 'vegeta',
            'naruto_kurama': 'naruto',
            'sasuke_eternal': 'sasuke',
            'tanjiro_demon_slayer': 'tanjiro',
            'zenitsu_agatsuma': 'zenitsu',
            'deku_full_cowl': 'deku',
            'all_might': 'allmight',
            'ichigo_bankai': 'ichigo',
            'luffy_gear_fourth': 'luffy',
            'saber_artoria': 'saber',
            'gilgamesh': 'gilgamesh',
            // 添加更多映射...
        };
        
        return idMapping[unitId] || unitId;
    }
    
    // 更新进化需求
    updateEvolutionRequirements(evolutionInfo) {
        console.log('📋 更新进化需求:', evolutionInfo);
        
        const requirementsContainer = document.getElementById('materialsListContainer');
        if (requirementsContainer && evolutionInfo) {
            const materialsCount = evolutionInfo.requirements.materials.length;
            const totalMaterials = evolutionInfo.requirements.materials.reduce((sum, material) => sum + material.quantity, 0);
            
            requirementsContainer.innerHTML = `
                <div class="evolution-requirements">
                    <div class="evolution-path">
                        <h3>进化路径</h3>
                        <div class="path-display">
                            <span class="base-form">${evolutionInfo.name}</span>
                            <i class="fas fa-arrow-right"></i>
                            <span class="evolved-form">${evolutionInfo.evolutionName}</span>
                        </div>
                    </div>
                    
                    <div class="requirements-grid">
                        <div class="requirement-item">
                            <i class="fas fa-coins"></i>
                            <div class="requirement-details">
                                <span class="requirement-label">金币成本</span>
                                <span class="requirement-value">${evolutionInfo.requirements.cost.toLocaleString()} Gold</span>
                            </div>
                        </div>
                        
                        <div class="requirement-item">
                            <i class="fas fa-cube"></i>
                            <div class="requirement-details">
                                <span class="requirement-label">材料种类</span>
                                <span class="requirement-value">${materialsCount} 种</span>
                            </div>
                        </div>
                        
                        <div class="requirement-item">
                            <i class="fas fa-layer-group"></i>
                            <div class="requirement-details">
                                <span class="requirement-label">总材料数量</span>
                                <span class="requirement-value">${totalMaterials} 个</span>
                            </div>
                        </div>
                        
                        <div class="requirement-item">
                            <i class="fas fa-star"></i>
                            <div class="requirement-details">
                                <span class="requirement-label">进化稀有度</span>
                                <span class="requirement-value rarity-${evolutionInfo.rarity?.toLowerCase() || 'mythic'}">${evolutionInfo.rarity || 'Mythic'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    // 更新进化材料
    updateEvolutionMaterials(evolutionInfo) {
        console.log('📦 更新进化材料:', evolutionInfo);
        
        // 这个方法现在由 MaterialsList 组件处理，不需要在这里重复实现
        if (this.materialsList) {
            this.materialsList.renderEvolutionRequirements({
                id: evolutionInfo.name,
                name: evolutionInfo.name,
                ...evolutionInfo
            });
        }
    }
    
    // 按稀有度分组材料
    groupMaterialsByRarity(materials) {
        const grouped = {};
        materials.forEach(material => {
            const rarity = material.rarity || 'common';
            if (!grouped[rarity]) {
                grouped[rarity] = [];
            }
            grouped[rarity].push(material);
        });
        return grouped;
    }
    
    // 获取材料掉落率
    getDropRate(materialName) {
        // 这里可以从材料配置中获取掉落率
        const dropRates = {
            'Mythic Essence': 0.1,
            'Legendary Core': 0.5,
            'Epic Fragment': 2.0,
            'Rare Crystal': 5.0,
            'Uncommon Shard': 15.0,
            'Common Dust': 25.0
        };
        return dropRates[materialName] || null;
    }
    
    // 获取材料获取方式
    getObtainMethod(materialName) {
        // 这里可以从材料配置中获取获取方式
        const obtainMethods = {
            'Mythic Essence': 'Mythic Dungeon',
            'Legendary Core': 'Legendary Raid',
            'Epic Fragment': 'Epic Challenge',
            'Rare Crystal': 'Rare Mission',
            'Uncommon Shard': 'Uncommon Quest',
            'Common Dust': 'Common Farm'
        };
        return obtainMethods[materialName] || 'Unknown Source';
    }
    
    // 首字母大写
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    // 更新成本汇总
    updateCostSummary(evolutionInfo) {
        console.log('💰 更新成本汇总:', evolutionInfo);
        
        // 使用 CostSummary 组件处理
        if (this.costSummary) {
            this.costSummary.updateCostSummary(evolutionInfo);
        }
        
        const costContainer = document.getElementById('costSummaryContainer');
        if (costContainer && evolutionInfo) {
            const materials = evolutionInfo.requirements.materials;
            const goldCost = evolutionInfo.requirements.cost;
            
            // 计算材料成本
            const materialCosts = this.calculateMaterialCosts(materials);
            const totalMaterialCost = Object.values(materialCosts).reduce((sum, cost) => sum + cost, 0);
            const totalCost = goldCost + totalMaterialCost;
            
            // 确定成本等级
            const costLevel = this.getCostLevel(totalCost);
            
            costContainer.innerHTML = `
                <div class="cost-summary ${costLevel.class}">
                    <h3>成本汇总</h3>
                    
                    <div class="cost-breakdown">
                        <div class="cost-item">
                            <div class="cost-icon">
                                <i class="fas fa-coins"></i>
                            </div>
                            <div class="cost-details">
                                <span class="cost-label">金币成本</span>
                                <span class="cost-value">${goldCost.toLocaleString()} Gold</span>
                            </div>
                        </div>
                        
                        <div class="cost-item">
                            <div class="cost-icon">
                                <i class="fas fa-cube"></i>
                            </div>
                            <div class="cost-details">
                                <span class="cost-label">材料成本</span>
                                <span class="cost-value">${totalMaterialCost.toLocaleString()} Gold</span>
                            </div>
                        </div>
                        
                        <div class="cost-item total">
                            <div class="cost-icon">
                                <i class="fas fa-calculator"></i>
                            </div>
                            <div class="cost-details">
                                <span class="cost-label">总成本</span>
                                <span class="cost-value ${costLevel.class}">${totalCost.toLocaleString()} Gold</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cost-level-indicator">
                        <span class="level-badge ${costLevel.class}">${costLevel.label}</span>
                        <span class="level-description">${costLevel.description}</span>
                    </div>
                    
                    <div class="material-cost-breakdown">
                        <h4>材料成本明细</h4>
                        <div class="material-costs">
                            ${Object.entries(materialCosts).map(([rarity, cost]) => `
                                <div class="material-cost-item">
                                    <span class="rarity-${rarity}">${this.capitalizeFirst(rarity)}</span>
                                    <span class="cost-amount">${cost.toLocaleString()} Gold</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    // 计算材料成本
    calculateMaterialCosts(materials) {
        const costs = {};
        const materialPrices = {
            'mythic': 50000,
            'legendary': 25000,
            'epic': 10000,
            'rare': 5000,
            'uncommon': 1000,
            'common': 100
        };
        
        materials.forEach(material => {
            const rarity = material.rarity || 'common';
            const price = materialPrices[rarity] || 100;
            const totalCost = price * material.quantity;
            
            if (!costs[rarity]) {
                costs[rarity] = 0;
            }
            costs[rarity] += totalCost;
        });
        
        return costs;
    }
    
    // 获取成本等级
    getCostLevel(totalCost) {
        if (totalCost >= 1000000) {
            return {
                class: 'cost-extreme',
                label: '极难',
                description: '需要大量时间和资源投入'
            };
        } else if (totalCost >= 500000) {
            return {
                class: 'cost-hard',
                label: '困难',
                description: '需要相当的努力和资源'
            };
        } else if (totalCost >= 100000) {
            return {
                class: 'cost-medium',
                label: '中等',
                description: '需要适度的努力'
            };
        } else if (totalCost >= 10000) {
            return {
                class: 'cost-easy',
                label: '简单',
                description: '相对容易完成'
            };
        } else {
            return {
                class: 'cost-trivial',
                label: '简单',
                description: '非常容易完成'
            };
        }
    }
    
    // 更新农场指南
    updateFarmingGuide(evolutionInfo) {
        console.log('🌾 更新农场指南:', evolutionInfo);
        
        // 使用 FarmingGuide 组件处理
        if (this.farmingGuide) {
            this.farmingGuide.updateFarmingGuide({
                id: evolutionInfo.name,
                name: evolutionInfo.name,
                ...evolutionInfo
            });
        }
        
        const farmingContainer = document.getElementById('farmingGuideContainer');
        if (farmingContainer && evolutionInfo) {
            const materials = evolutionInfo.requirements.materials;
            
            // 按获取来源分组材料
            const materialsBySource = this.groupMaterialsBySource(materials);
            
            // 计算农场效率
            const farmingEfficiency = this.calculateFarmingEfficiency(materials);
            
            // 生成最佳刷取路线
            const optimalRoute = this.generateOptimalRoute(materials);
            
            farmingContainer.innerHTML = `
                <div class="farming-guide">
                    <h3>农场指南</h3>
                    
                    <div class="farming-overview">
                        <div class="efficiency-indicator">
                            <span class="efficiency-label">农场效率</span>
                            <span class="efficiency-value ${farmingEfficiency.level}">${farmingEfficiency.score}/100</span>
                        </div>
                        <div class="estimated-time">
                            <i class="fas fa-clock"></i>
                            <span>预计时间: ${farmingEfficiency.estimatedTime}</span>
                        </div>
                    </div>
                    
                    <div class="farming-sources">
                        <h4>材料获取来源</h4>
                        ${Object.entries(materialsBySource).map(([source, sourceMaterials]) => `
                            <div class="source-group">
                                <div class="source-header">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span class="source-name">${source}</span>
                                    <span class="source-count">${sourceMaterials.length} 种材料</span>
                                </div>
                                <div class="source-materials">
                                    ${sourceMaterials.map(material => `
                                        <div class="source-material-item">
                                            <span class="material-name rarity-${material.rarity || 'common'}">${material.name}</span>
                                            <span class="material-quantity">x${material.quantity}</span>
                                            <span class="drop-rate">${this.getDropRate(material.name) || 'N/A'}%</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="optimal-route">
                        <h4>最佳刷取路线</h4>
                        <div class="route-steps">
                            ${optimalRoute.map((step, index) => `
                                <div class="route-step">
                                    <div class="step-number">${index + 1}</div>
                                    <div class="step-content">
                                        <div class="step-location">${step.location}</div>
                                        <div class="step-materials">
                                            ${step.materials.map(material => `
                                                <span class="route-material rarity-${material.rarity || 'common'}">${material.name}</span>
                                            `).join('')}
                                        </div>
                                        <div class="step-tips">${step.tips}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="farming-tips">
                        <h4>农场技巧</h4>
                        <ul class="tips-list">
                            <li><i class="fas fa-lightbulb"></i> 优先刷取稀有度高的材料</li>
                            <li><i class="fas fa-clock"></i> 利用双倍掉落活动时间</li>
                            <li><i class="fas fa-users"></i> 组队刷取提高效率</li>
                            <li><i class="fas fa-sync"></i> 定期刷新商店购买材料</li>
                        </ul>
                    </div>
                </div>
            `;
        }
    }
    
    // 按获取来源分组材料
    groupMaterialsBySource(materials) {
        const grouped = {};
        materials.forEach(material => {
            const source = this.getObtainMethod(material.name);
            if (!grouped[source]) {
                grouped[source] = [];
            }
            grouped[source].push(material);
        });
        return grouped;
    }
    
    // 计算农场效率
    calculateFarmingEfficiency(materials) {
        let totalDifficulty = 0;
        let totalRuns = 0;
        
        materials.forEach(material => {
            const dropRate = this.getDropRate(material.name) || 1;
            const rarity = material.rarity || 'common';
            const quantity = material.quantity;
            
            // 根据稀有度计算难度
            const rarityMultiplier = {
                'mythic': 10,
                'legendary': 5,
                'epic': 3,
                'rare': 2,
                'uncommon': 1.5,
                'common': 1
            };
            
            const difficulty = rarityMultiplier[rarity] * quantity / (dropRate / 100);
            totalDifficulty += difficulty;
            totalRuns += Math.ceil(quantity / (dropRate / 100));
        });
        
        // 计算效率分数 (0-100)
        const efficiencyScore = Math.max(0, 100 - Math.log10(totalDifficulty) * 10);
        
        // 估算时间
        const estimatedHours = Math.ceil(totalRuns * 0.1); // 假设每次运行10分钟
        
        return {
            score: Math.round(efficiencyScore),
            level: efficiencyScore >= 80 ? 'excellent' : efficiencyScore >= 60 ? 'good' : efficiencyScore >= 40 ? 'medium' : 'hard',
            estimatedTime: `${estimatedHours} 小时`,
            totalRuns: totalRuns
        };
    }
    
    // 生成最佳刷取路线
    generateOptimalRoute(materials) {
        const route = [];
        
        // 按稀有度排序材料
        const sortedMaterials = materials.sort((a, b) => {
            const rarityOrder = { 'mythic': 6, 'legendary': 5, 'epic': 4, 'rare': 3, 'uncommon': 2, 'common': 1 };
            return (rarityOrder[b.rarity || 'common'] || 1) - (rarityOrder[a.rarity || 'common'] || 1);
        });
        
        // 按来源分组
        const materialsBySource = this.groupMaterialsBySource(sortedMaterials);
        
        Object.entries(materialsBySource).forEach(([source, sourceMaterials]) => {
            route.push({
                location: source,
                materials: sourceMaterials,
                tips: this.generateLocationTips(source, sourceMaterials)
            });
        });
        
        return route;
    }
    
    // 生成地点提示
    generateLocationTips(location, materials) {
        const tips = {
            'Mythic Dungeon': '建议组队挑战，准备充足的恢复道具',
            'Legendary Raid': '需要高级装备，建议先提升角色等级',
            'Epic Challenge': '中等难度，可以单人挑战',
            'Rare Mission': '相对简单，适合日常刷取',
            'Uncommon Quest': '新手友好，建议优先完成',
            'Common Farm': '基础材料，可以快速获取'
        };
        
        return tips[location] || '根据材料稀有度调整策略';
    }
    
    // 显示无进化数据提示
    showNoEvolutionData(selectedUnit) {
        console.log('⚠️ 显示无进化数据提示:', selectedUnit);
        
        // 清空所有组件
        this.clearAllComponents();
        
        // 显示提示信息
        const mainContainer = document.querySelector('.evolution-page-container');
        if (mainContainer) {
            const noDataMessage = document.createElement('div');
            noDataMessage.className = 'no-evolution-data';
            noDataMessage.innerHTML = `
                <div class="no-data-content">
                    <i class="fas fa-info-circle"></i>
                    <h3>无进化数据</h3>
                    <p>单位 "${selectedUnit.name}" 目前没有可用的进化路径。</p>
                    <p>请选择其他单位或稍后再试。</p>
                </div>
            `;
            
            // 移除之前的提示
            const existingMessage = mainContainer.querySelector('.no-evolution-data');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            mainContainer.appendChild(noDataMessage);
        }
    }
    
    async loadAndUpdateComponents(unit) {
        if (!unit || !unit.id) {
            console.log('❌ 无效的单位数据，清空所有组件');
            this.clearAllComponents();
            return;
        }
        
        console.log('🔄 开始加载单位数据:', unit.id);
        
        try {
            // Load all data in parallel
            const [materialsData, costData, farmingData] = await Promise.all([
                this.loadMaterialsData(unit.id),
                this.loadCostData(unit.id),
                this.loadFarmingData(unit.id)
            ]);
            
            console.log('📦 加载的数据:', {
                materials: materialsData,
                cost: costData,
                farming: farmingData
            });
            
            // Update all components
            this.updateAllComponents(unit, materialsData, costData, farmingData);
            
        } catch (error) {
            console.error('❌ 加载数据时出错:', error);
            this.handleDataLoadError(error);
        }
    }
    
    async loadMaterialsData(unitId) {
        try {
            // First check real evolution data
            if (REAL_EVOLUTION_DATA[unitId]) {
                return REAL_EVOLUTION_DATA[unitId];
            }
            
            // Fallback to legacy evolution system data
            const module = await import('../config/evolutionSystem.js');
            return module.EVOLUTION_DATA[unitId] || null;
        } catch (error) {
            console.warn('⚠️ 无法加载材料数据:', error);
            return null;
        }
    }
    
    async loadCostData(unitId) {
        try {
            // First check real evolution cost data
            if (EVOLUTION_COST_SUMMARY[unitId]) {
                return EVOLUTION_COST_SUMMARY[unitId];
            }
            
            // Fallback to legacy evolution system data
            const module = await import('../config/evolutionSystem.js');
            return module.COST_SUMMARY_DATA[unitId] || null;
        } catch (error) {
            console.warn('⚠️ 无法加载成本数据:', error);
            return null;
        }
    }
    
    async loadFarmingData(unitId) {
        try {
            // First check real farming guide data
            if (FARMING_GUIDE_DATA[unitId]) {
                return FARMING_GUIDE_DATA[unitId];
            }
            
            // Fallback to legacy evolution system data
            const module = await import('../config/evolutionSystem.js');
            return module.LEGACY_FARMING_GUIDE_DATA[unitId] || null;
        } catch (error) {
            console.warn('⚠️ 无法加载农场指南数据:', error);
            return null;
        }
    }
    
    async updateAllComponents(unit, materialsData, costData, farmingData) {
        console.log('🔄 更新所有组件...');
        
        try {
            // Update all components in parallel for better performance
            const updatePromises = [];
            
            // Update materials list component
        if (this.materialsList) {
            console.log('📋 更新 MaterialsList 组件');
                updatePromises.push(this.materialsList.updateMaterials(unit));
        } else {
            console.error('❌ MaterialsList 组件未初始化');
        }
        
            // Update cost summary component
        if (this.costSummary) {
            console.log('💰 更新 CostSummary 组件');
                updatePromises.push(this.costSummary.updateCost(unit));
        } else {
            console.error('❌ CostSummary 组件未初始化');
        }
        
            // Update farming guide component
        if (this.farmingGuide) {
            console.log('🌾 更新 FarmingGuide 组件');
                updatePromises.push(this.farmingGuide.updateGuide(unit));
        } else {
            console.error('❌ FarmingGuide 组件未初始化');
        }
            
            // Wait for all components to update
            await Promise.all(updatePromises);
        
        console.log('✅ 所有组件更新完成');
        console.log('📄 === EvolutionPage 单位选择处理完成 ===\n');
            
        } catch (error) {
            console.error('❌ 更新组件时出错:', error);
            this.handleComponentUpdateError(error);
        }
    }
    
    handleComponentUpdateError(error) {
        console.error('❌ 组件更新错误:', error);
        
        // Show error notification to user
        const errorMessage = 'Some components failed to update. Please try selecting the unit again.';
        console.error(errorMessage);
        
        // You could add a notification system here
        // showNotification(errorMessage, 'error');
    }
    
    clearAllComponents() {
        console.log('🗑️ 清空所有组件数据');
        
        if (this.materialsList) {
            this.materialsList.updateMaterials(null);
        }
        
        if (this.costSummary) {
            this.costSummary.updateCost(null);
        }
        
        if (this.farmingGuide) {
            this.farmingGuide.updateGuide(null);
        }
    }
    
    handleDataLoadError(error) {
        console.error('❌ 数据加载错误:', error);
        
        // Show error message to user
        const errorMessage = '加载单位数据时出错，请重试';
        console.error(errorMessage);
        
        // Clear component display
        this.clearAllComponents();
    }
    
    show() {
        if (!this.isInitialized) {
            console.warn('⚠️ Evolution Page not initialized');
            return;
        }
        
        console.log('📄 Showing Evolution Page');
        
        // Update page title
        document.title = 'Anime Vanguards Calculator - Evolution';
        
        // Trigger any page-specific show logic
        this.onPageShow();
    }
    
    hide() {
        console.log('📄 Hiding Evolution Page');
        
        // Trigger any page-specific hide logic
        this.onPageHide();
    }
    
    onPageShow() {
        // Page-specific logic when showing
        console.log('Evolution page shown');
    }
    
    onPageHide() {
        // Page-specific logic when hiding
        console.log('Evolution page hidden');
    }
    
    destroy() {
        console.log('🗑️ Destroying Evolution Page');
        
        // Clean up components
        if (this.unitSelector) {
            this.unitSelector.destroy();
        }
        if (this.materialsList) {
            this.materialsList.destroy();
        }
        if (this.costSummary) {
            this.costSummary.destroy();
        }
        if (this.farmingGuide) {
            this.farmingGuide.destroy();
        }
        
        this.isInitialized = false;
    }
    
    // Public API methods
    getSelectedUnit() {
        return this.selectedUnit;
    }
    
    updateData(newData) {
        this.unitsData = newData.unitsData || this.unitsData;
        this.materialsConfig = newData.materialsConfig || this.materialsConfig;
        this.elementIcons = newData.elementIcons || this.elementIcons;
        
        // Update components with new data
        if (this.unitSelector) {
            this.unitSelector.setUnits(this.unitsData, this.elementIcons);
        }
        if (this.materialsList) {
            this.materialsList.setMaterialsConfig(this.materialsConfig);
        }
        if (this.costSummary) {
            this.costSummary.setMaterialsConfig(this.materialsConfig);
        }
    }
} 