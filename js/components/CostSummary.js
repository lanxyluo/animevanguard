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
        
        // Try to get materials data
        let materialsData = this.currentUnit.evolutionMaterials;
        if (!materialsData) {
            // Try to load from materials data file
            import('../config/evolutionMaterials.js').then(module => {
                materialsData = module.EVOLUTION_MATERIALS_DATA[this.currentUnit.id];
                if (materialsData) {
                    this.renderCostBreakdown(materialsData);
                } else {
                    this.costSummaryElement.innerHTML = '<p>No evolution materials available</p>';
                }
            }).catch(error => {
                console.warn('Could not load materials data:', error);
                this.costSummaryElement.innerHTML = '<p>No evolution materials available</p>';
            });
            return;
        }
        
        this.renderCostBreakdown(materialsData);
    }
    
    renderCostBreakdown(materialsData) {
        if (!materialsData) {
            this.costSummaryElement.innerHTML = '<p>No evolution materials available</p>';
            return;
        }
        
        // Try to get detailed cost summary data
        import('../config/costSummary.js').then(module => {
            const costSummaryData = module.COST_SUMMARY_DATA[this.currentUnit.id];
            if (costSummaryData) {
                this.renderDetailedCostBreakdown(costSummaryData);
            } else {
                // Fallback to basic calculation
                const costBreakdown = this.calculateCostBreakdown(materialsData);
                const totalCost = this.calculateTotalCost(materialsData);
                this.renderBasicCostBreakdown(costBreakdown, totalCost);
            }
        }).catch(error => {
            console.warn('Could not load cost summary data:', error);
            // Fallback to basic calculation
            const costBreakdown = this.calculateCostBreakdown(materialsData);
            const totalCost = this.calculateTotalCost(materialsData);
            this.renderBasicCostBreakdown(costBreakdown, totalCost);
        });
    }
    
    renderDetailedCostBreakdown(costData) {
        let summaryHTML = `
            <div class="cost-summary-container">
                <h3><i class="fas fa-calculator"></i> Evolution Cost Analysis</h3>
        `;
        
        if (this.options.showBreakdown) {
            summaryHTML += `
                <div class="cost-breakdown">
                    <h4><i class="fas fa-list"></i> Cost Breakdown</h4>
                    <div class="cost-items">
            `;
            
            // Gold cost
            if (costData.totalGold > 0) {
                summaryHTML += `
                    <div class="cost-item">
                        <div class="cost-item-header">
                            <i class="fas fa-coins"></i>
                            <span class="cost-label">Gold Cost</span>
                        </div>
                        <span class="cost-value">${formatNumber(costData.totalGold)}</span>
                    </div>
                `;
            }
            
            // Material costs
            if (costData.materialCosts) {
                costData.materialCosts.forEach((material, index) => {
                    summaryHTML += `
                        <div class="cost-item" key="${index}">
                            <div class="cost-item-header">
                                <i class="fas fa-gem"></i>
                                <span class="cost-label">${material.material}</span>
                            </div>
                            <div class="cost-item-details">
                                <span class="cost-value">${material.estimatedCost}</span>
                                <span class="cost-difficulty difficulty-${material.difficulty.toLowerCase()}">${material.difficulty}</span>
                            </div>
                        </div>
                    `;
                });
            }
            
            summaryHTML += `
                    </div>
                </div>
            `;
        }
        
        if (this.options.showTotal) {
            summaryHTML += `
                <div class="total-cost">
                    <h4><i class="fas fa-total"></i> Total Estimated Cost</h4>
                    <div class="total-amount">${costData.totalEstimatedCost}</div>
                </div>
            `;
        }
        
        // Additional cost information
        summaryHTML += `
            <div class="cost-details">
                <div class="cost-detail-item">
                    <div class="detail-header">
                        <i class="fas fa-clock"></i>
                        <span class="detail-label">Time Investment:</span>
                    </div>
                    <span class="detail-value">${costData.timeInvestment}</span>
                </div>
                <div class="cost-detail-item">
                    <div class="detail-header">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span class="detail-label">Difficulty:</span>
                    </div>
                    <span class="detail-value difficulty-${costData.difficulty.toLowerCase()}">${costData.difficulty}</span>
                </div>
                <div class="cost-detail-item">
                    <div class="detail-header">
                        <i class="fas fa-thumbs-up"></i>
                        <span class="detail-label">Worth Investment:</span>
                    </div>
                    <span class="detail-value ${costData.worthIt ? 'worth-it' : 'not-worth-it'}">
                        <i class="fas fa-${costData.worthIt ? 'check-circle' : 'times-circle'}"></i>
                        ${costData.worthIt ? 'Yes' : 'No'}
                    </span>
                </div>
            </div>
        `;
        
        // Investment notes
        if (costData.notes) {
            summaryHTML += `
                <div class="investment-notes">
                    <h4><i class="fas fa-lightbulb"></i> Investment Notes</h4>
                    <p>${costData.notes}</p>
                </div>
            `;
        }
        
        summaryHTML += `</div>`;
        
        this.costSummaryElement.innerHTML = summaryHTML;
    }
    
    renderBasicCostBreakdown(costBreakdown, totalCost) {
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
            
            // Materials cost
            if (costBreakdown.materialsCost > 0) {
                summaryHTML += `
                    <div class="cost-item">
                        <span class="cost-label">Materials</span>
                        <span class="cost-value">${formatNumber(costBreakdown.materialsCost)}</span>
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
    
    calculateCostBreakdown(materialsData) {
        if (!materialsData) {
            return { goldCost: 0, materialsCost: 0 };
        }
        
        let goldCost = materialsData.goldCost || 0;
        let materialsCost = 0;
        
        // Calculate materials cost (simplified for now)
        if (materialsData.materials) {
            materialsData.materials.forEach(material => {
                // Estimate cost based on rarity
                let materialCost = 0;
                switch (material.rarity) {
                    case 'Common':
                        materialCost = 100;
                        break;
                    case 'Uncommon':
                        materialCost = 500;
                        break;
                    case 'Rare':
                        materialCost = 2000;
                        break;
                    case 'Epic':
                        materialCost = 5000;
                        break;
                    case 'Legendary':
                        materialCost = 15000;
                        break;
                    default:
                        materialCost = 1000;
                }
                materialsCost += materialCost * material.quantity;
            });
        }
        
        return {
            goldCost: goldCost,
            materialsCost: materialsCost
        };
    }
    
    calculateTotalCost(materialsData) {
        const breakdown = this.calculateCostBreakdown(materialsData);
        return breakdown.goldCost + breakdown.materialsCost;
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