// Cost Summary Component
import { formatNumber } from '../utils/helpers.js';

export class CostSummary {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = {
            showBreakdown: true,
            showTotal: true,
            currency: 'Gold',
            ...options
        };
        
        this.materialsConfig = {};
        this.currentUnit = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`CostSummary: Container with id "${this.containerId}" not found`);
            return;
        }
        
        this.createDOM();
        this.render();
    }
    
    createDOM() {
        this.container.innerHTML = `
            <div class="card">
                <h2><i class="fas fa-coins"></i> Cost Summary</h2>
                <div id="costSummary" class="cost-summary">
                    <p>Select a unit to view cost breakdown</p>
                </div>
            </div>
        `;
        
        this.costSummaryElement = document.getElementById('costSummary');
    }
    
    setMaterialsConfig(materialsConfig) {
        this.materialsConfig = materialsConfig;
    }
    
    updateCost(unit) {
        console.log('💰 === CostSummary 接收单位更新 ===');
        console.log('📊 当前成本状态:', this.currentUnit);
        console.log('🆕 新接收的单位:', unit);
        
        this.currentUnit = unit;
        console.log('✅ 成本状态已更新:', this.currentUnit);
        
        console.log('🎨 开始渲染成本摘要...');
        this.render();
        console.log('💰 === CostSummary 单位更新完成 ===\n');
    }
    
    render() {
        if (!this.costSummaryElement) return;
        
        if (!this.currentUnit) {
            this.costSummaryElement.innerHTML = '<p>Select a unit to view cost breakdown</p>';
            return;
        }
        
        if (!this.currentUnit.evolutionMaterials) {
            this.costSummaryElement.innerHTML = '<p>No evolution materials available</p>';
            return;
        }
        
        const costBreakdown = this.calculateCostBreakdown();
        const totalCost = this.calculateTotalCost();
        
        let summaryHTML = '';
        
        if (this.options.showBreakdown) {
            summaryHTML += `
                <div class="cost-breakdown">
                    <h3>Cost Breakdown</h3>
                    <div class="cost-items">
            `;
            
            // Gold cost
            if (costBreakdown.goldCost > 0) {
                summaryHTML += `
                    <div class="cost-item">
                        <span class="cost-label">Gold</span>
                        <span class="cost-value">${formatNumber(costBreakdown.goldCost)}</span>
                    </div>
                `;
            }
            
            // Special item cost
            if (costBreakdown.specialItemCost > 0) {
                summaryHTML += `
                    <div class="cost-item">
                        <span class="cost-label">Special Item</span>
                        <span class="cost-value">${formatNumber(costBreakdown.specialItemCost)}</span>
                    </div>
                `;
            }
            
            // Essence stones cost
            if (costBreakdown.essenceStonesCost > 0) {
                summaryHTML += `
                    <div class="cost-item">
                        <span class="cost-label">Essence Stones</span>
                        <span class="cost-value">${formatNumber(costBreakdown.essenceStonesCost)}</span>
                    </div>
                `;
            }
            
            summaryHTML += `
                    </div>
                </div>
            `;
        }
        
        if (this.options.showTotal) {
            summaryHTML += `
                <div class="total-cost">
                    <h3>Total Cost</h3>
                    <div class="total-amount">${formatNumber(totalCost)} ${this.options.currency}</div>
                </div>
            `;
        }
        
        this.costSummaryElement.innerHTML = summaryHTML;
    }
    
    calculateCostBreakdown() {
        if (!this.currentUnit || !this.currentUnit.evolutionMaterials) {
            return { goldCost: 0, specialItemCost: 0, essenceStonesCost: 0 };
        }
        
        const { goldCost, specialItem, essenceStones } = this.currentUnit.evolutionMaterials;
        
        let goldCostValue = goldCost || 0;
        let specialItemCost = 0;
        let essenceStonesCost = 0;
        
        // Calculate special item cost
        if (specialItem) {
            const material = this.materialsConfig[specialItem.name];
            if (material && material.cost) {
                specialItemCost = material.cost;
            }
        }
        
        // Calculate essence stones cost
        if (essenceStones) {
            Object.entries(essenceStones).forEach(([name, quantity]) => {
                const material = this.materialsConfig[name];
                if (material && material.cost) {
                    essenceStonesCost += material.cost * quantity;
                }
            });
        }
        
        return {
            goldCost: goldCostValue,
            specialItemCost: specialItemCost,
            essenceStonesCost: essenceStonesCost
        };
    }
    
    calculateTotalCost() {
        const breakdown = this.calculateCostBreakdown();
        return breakdown.goldCost + breakdown.specialItemCost + breakdown.essenceStonesCost;
    }
    
    getCostBreakdown() {
        return this.calculateCostBreakdown();
    }
    
    getTotalCost() {
        return this.calculateTotalCost();
    }
    
    getCostByCategory() {
        if (!this.currentUnit || !this.currentUnit.evolutionMaterials) {
            return {};
        }
        
        const { goldCost, specialItem, essenceStones } = this.currentUnit.evolutionMaterials;
        const categories = {};
        
        // Gold category
        if (goldCost) {
            categories.gold = {
                name: 'Gold',
                cost: goldCost,
                quantity: goldCost,
                type: 'currency'
            };
        }
        
        // Special item category
        if (specialItem) {
            const material = this.materialsConfig[specialItem.name];
            if (material) {
                categories.specialItem = {
                    name: specialItem.name,
                    cost: material.cost || 0,
                    quantity: 1,
                    type: 'special',
                    rarity: material.rarity
                };
            }
        }
        
        // Essence stones category
        if (essenceStones) {
            Object.entries(essenceStones).forEach(([name, quantity]) => {
                const material = this.materialsConfig[name];
                if (material) {
                    categories[name] = {
                        name: name,
                        cost: (material.cost || 0) * quantity,
                        quantity: quantity,
                        type: 'essence',
                        rarity: material.rarity,
                        unitCost: material.cost || 0
                    };
                }
            });
        }
        
        return categories;
    }
    
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
} 