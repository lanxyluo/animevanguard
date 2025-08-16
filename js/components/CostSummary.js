// Cost Summary Component
import { evolutionUtils } from '../config/evolutionSystem.js';

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
        
        this.materialsConfig = null;
        this.currentUnit = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`CostSummary: Container with id "${this.containerId}" not found`);
            return;
        }
        
        this.render();
    }
    
    setMaterialsConfig(config) {
        this.materialsConfig = config;
    }
    
    updateCost(unit) {
        console.log('💰 === CostSummary 更新成本 ===');
        console.log('📊 当前单位:', unit);
        
        this.currentUnit = unit;
        
        if (!unit) {
            this.showEmptyState();
            return;
        }
        
        this.renderCostSummary(unit);
    }
    
    renderCostSummary(unit) {
        if (!this.container) return;
        
        // Clear container
        this.container.innerHTML = '';
        
        // Get evolution data
        const evolutionData = evolutionUtils.getEvolutionData(unit.id);
        if (!evolutionData) {
            this.showNoEvolutionData();
            return;
        }
        
        // Calculate total costs
        const costBreakdown = this.calculateCostBreakdown(evolutionData);
        
        // Create cost summary section
        const summarySection = document.createElement('div');
        summarySection.className = 'cost-summary';
        
        // Add title
        const title = document.createElement('h3');
        title.innerHTML = '<i class="fas fa-calculator"></i> Cost Summary';
        title.className = 'section-title';
        summarySection.appendChild(title);
        
        // Add total costs
        this.renderTotalCosts(costBreakdown, summarySection);
        
        // Add tier breakdown
        if (this.options.showBreakdown) {
            this.renderTierBreakdown(evolutionData, summarySection);
        }
        
        this.container.appendChild(summarySection);
    }
    
    calculateCostBreakdown(evolutionData) {
        let totalGoldCost = 0;
        let totalGemsCost = 0;
        let totalMaterialCost = 0;
        let totalMaterials = 0;
        
        evolutionData.evolutions.forEach(evolution => {
            // Add gold cost
            totalGoldCost += evolution.requirements.cost;
            
            // Add gems cost
            if (evolution.requirements.gems) {
                totalGemsCost += evolution.requirements.gems;
            }
            
            // Calculate material costs
            evolution.requirements.materials.forEach(materialString => {
                const parsedMaterial = evolutionUtils.parseMaterialString(materialString);
                const materialData = evolutionUtils.getMaterialData(parsedMaterial.name);
                
                if (materialData) {
                    totalMaterialCost += materialData.cost * parsedMaterial.quantity;
                }
                
                totalMaterials += parsedMaterial.quantity;
            });
        });
        
        return {
            totalGoldCost,
            totalGemsCost,
            totalMaterialCost,
            totalMaterials,
            grandTotal: totalGoldCost + totalMaterialCost
        };
    }
    
    renderTotalCosts(costBreakdown, container) {
        const totalCostsSection = document.createElement('div');
        totalCostsSection.className = 'total-costs';
        
        totalCostsSection.innerHTML = `
            <div class="cost-grid">
                <div class="cost-item gold-cost">
                    <div class="cost-icon">
                        <i class="fas fa-coins"></i>
                    </div>
                    <div class="cost-details">
                        <div class="cost-label">Total Gold Cost</div>
                        <div class="cost-value">${costBreakdown.totalGoldCost.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="cost-item gems-cost">
                    <div class="cost-icon">
                        <i class="fas fa-gem"></i>
                    </div>
                    <div class="cost-details">
                        <div class="cost-label">Total Gems Cost</div>
                        <div class="cost-value">${costBreakdown.totalGemsCost.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="cost-item material-cost">
                    <div class="cost-icon">
                        <i class="fas fa-cube"></i>
                    </div>
                    <div class="cost-details">
                        <div class="cost-label">Material Cost</div>
                        <div class="cost-value">${costBreakdown.totalMaterialCost.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="cost-item total-cost">
                    <div class="cost-icon">
                        <i class="fas fa-calculator"></i>
                    </div>
                    <div class="cost-details">
                        <div class="cost-label">Grand Total</div>
                        <div class="cost-value">${costBreakdown.grandTotal.toLocaleString()}</div>
                    </div>
                </div>
            </div>
            
            <div class="cost-stats">
                <div class="stat-item">
                    <i class="fas fa-cube"></i>
                    <span>Total Materials: ${costBreakdown.totalMaterials}</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-layer-group"></i>
                    <span>Evolution Tiers: ${evolutionData.evolutions.length - 1}</span>
                </div>
            </div>
        `;
        
        container.appendChild(totalCostsSection);
    }
    
    renderTierBreakdown(evolutionData, container) {
        const breakdownSection = document.createElement('div');
        breakdownSection.className = 'tier-breakdown';
        
        const title = document.createElement('h4');
        title.innerHTML = '<i class="fas fa-list-ol"></i> Tier Breakdown';
        title.className = 'subsection-title';
        breakdownSection.appendChild(title);
        
        const breakdownList = document.createElement('div');
        breakdownList.className = 'breakdown-list';
        
        evolutionData.evolutions.forEach((evolution, index) => {
            if (index === 0) return; // Skip base form
            
            const tierCost = this.calculateTierCost(evolution);
            const tierItem = this.createTierCostItem(evolution, tierCost);
            breakdownList.appendChild(tierItem);
        });
        
        breakdownSection.appendChild(breakdownList);
        container.appendChild(breakdownSection);
    }
    
    calculateTierCost(evolution) {
        let materialCost = 0;
        let materialCount = 0;
        
        evolution.requirements.materials.forEach(materialString => {
            const parsedMaterial = evolutionUtils.parseMaterialString(materialString);
            const materialData = evolutionUtils.getMaterialData(parsedMaterial.name);
            
            if (materialData) {
                materialCost += materialData.cost * parsedMaterial.quantity;
            }
            
            materialCount += parsedMaterial.quantity;
        });
        
        return {
            goldCost: evolution.requirements.cost,
            gemsCost: evolution.requirements.gems || 0,
            materialCost,
            materialCount,
            totalCost: evolution.requirements.cost + materialCost
        };
    }
    
    createTierCostItem(evolution, tierCost) {
        const tierItem = document.createElement('div');
        tierItem.className = 'tier-cost-item';
        
        tierItem.innerHTML = `
            <div class="tier-header">
                <div class="tier-title">
                    <i class="fas fa-star"></i>
                    Tier ${evolution.tier}: ${evolution.name}
                </div>
                <div class="tier-level">
                    <i class="fas fa-level-up-alt"></i>
                    Level ${evolution.requirements.level}
                </div>
            </div>
            
            <div class="tier-costs">
                <div class="cost-row">
                    <span class="cost-type">Gold:</span>
                    <span class="cost-value">${tierCost.goldCost.toLocaleString()}</span>
                </div>
                
                ${tierCost.gemsCost > 0 ? `
                    <div class="cost-row">
                        <span class="cost-type">Gems:</span>
                        <span class="cost-value">${tierCost.gemsCost.toLocaleString()}</span>
                    </div>
                ` : ''}
                
                <div class="cost-row">
                    <span class="cost-type">Materials:</span>
                    <span class="cost-value">${tierCost.materialCost.toLocaleString()} (${tierCost.materialCount} items)</span>
                </div>
                
                <div class="cost-row total">
                    <span class="cost-type">Total:</span>
                    <span class="cost-value">${tierCost.totalCost.toLocaleString()}</span>
                </div>
            </div>
        `;
        
        return tierItem;
    }
    
    showEmptyState() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calculator"></i>
                <h3>No Unit Selected</h3>
                <p>Select a unit to view its evolution cost summary.</p>
            </div>
        `;
    }
    
    showNoEvolutionData() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>No Evolution Data</h3>
                <p>Evolution cost data not found for this unit.</p>
            </div>
        `;
    }
    
    render() {
        // Component is already rendered in HTML
        console.log('CostSummary: Using existing HTML structure');
    }
    
    destroy() {
        // Clean up if needed
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
} 