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
            showLoadingState: true,
            showDifficultyGradient: true,
            ...options
        };
        
        this.materialsConfig = null;
        this.currentUnit = null;
        this.isLoading = false;
        
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
    
    showLoadingState() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <p>Calculating costs...</p>
            </div>
        `;
        this.isLoading = true;
    }
    
    showErrorState(message) {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="error-state">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Error Loading Cost Data</h3>
                <p>${message}</p>
                <button class="retry-btn" onclick="this.parentElement.parentElement.dispatchEvent(new CustomEvent('retry'))">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
        
        // Add retry event listener
        this.container.addEventListener('retry', () => {
            if (this.currentUnit) {
                this.updateCost(this.currentUnit);
            }
        });
        
        this.isLoading = false;
    }
    
    showEmptyState() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-calculator"></i>
                </div>
                <h3>No Cost Data</h3>
                <p>Select a unit to view its evolution cost breakdown and total expenses.</p>
            </div>
        `;
        this.isLoading = false;
    }
    
    showNoEvolutionData() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-info-circle"></i>
                </div>
                <h3>No Evolution Cost Data</h3>
                <p>This unit doesn't have evolution cost data available yet.</p>
                <div class="cost-status">
                    <span class="status-badge updating">
                        <i class="fas fa-sync-alt fa-spin"></i> Cost Data Updating
                    </span>
                </div>
            </div>
        `;
        this.isLoading = false;
    }
    
    async updateCost(unit) {
        console.log('💰 === CostSummary 更新成本 ===');
        console.log('📊 当前单位:', unit);
        
        this.currentUnit = unit;
        
        if (!unit) {
            this.showEmptyState();
            return;
        }
        
        // Show loading state
        if (this.options.showLoadingState) {
            this.showLoadingState();
        }
        
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 200));
        
        try {
            await this.renderCostSummary(unit);
        } catch (error) {
            console.error('❌ 渲染成本总结时出错:', error);
            this.showErrorState('Failed to load cost data');
        }
    }
    
    renderCostSummary(unit) {
        if (!this.container) return;
        
        // Clear container
        this.container.innerHTML = '';
        
        // Check if unit has requirements (from Evolution page data)
        if (!unit.requirements && !unit.evolutions) {
            this.showNoEvolutionData();
            return;
        }
        
        // Create a compatible evolution data structure
        const evolutionData = {
            evolutions: unit.evolutions || [{
                tier: 1,
                name: unit.name,
                requirements: {
                    level: 1,
                    cost: 0,
                    materials: []
                }
            }, {
                tier: 2,
                name: unit.evolutionName || `${unit.name} (Evolved)`,
                requirements: unit.requirements || { cost: 15000, materials: [] }
            }]
        };
        
        // Calculate total costs
        const costBreakdown = this.calculateCostBreakdown(evolutionData);
        
        // Create cost summary section
        const summarySection = document.createElement('div');
        summarySection.className = 'cost-summary';
        summarySection.style.background = 'rgba(30, 41, 59, 0.95)';
        summarySection.style.border = '2px solid rgba(100, 116, 139, 0.5)';
        
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
            totalGoldCost += evolution.requirements.cost || 0;
            
            // Add gems cost
            if (evolution.requirements.gems) {
                totalGemsCost += evolution.requirements.gems;
            }
            
            // Calculate material costs
            const materials = evolution.requirements.materials || [];
            materials.forEach(material => {
                if (typeof material === 'string') {
                    // Handle string format: "Material Name x5"
                    const parsedMaterial = this.parseMaterialString(material);
                    totalMaterials += parsedMaterial.quantity;
                    // Estimate cost (since we don't have material database)
                    totalMaterialCost += parsedMaterial.quantity * 100; // Default cost per material
                } else if (typeof material === 'object' && material.count) {
                    // Handle object format: { name: "Material Name", count: 5 }
                    totalMaterials += material.count;
                    // Estimate cost based on rarity
                    const rarityMultiplier = this.getRarityMultiplier(material.rarity);
                    totalMaterialCost += material.count * 100 * rarityMultiplier;
                }
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
    
    // Helper method to parse material strings
    parseMaterialString(materialString) {
        const match = materialString.match(/^(.+?)\s*x\s*(\d+)$/);
        if (match) {
            return {
                name: match[1].trim(),
                quantity: parseInt(match[2])
            };
        }
        return {
            name: materialString.trim(),
            quantity: 1
        };
    }
    
    // Helper method to get rarity multiplier for cost estimation
    getRarityMultiplier(rarity) {
        const multipliers = {
            'Common': 1,
            'Uncommon': 2,
            'Rare': 5,
            'Epic': 10,
            'Legendary': 20,
            'Mythic': 50
        };
        return multipliers[rarity] || 1;
    }
    
    renderTotalCosts(costBreakdown, container) {
        const totalCostsSection = document.createElement('div');
        totalCostsSection.className = 'total-costs';
        totalCostsSection.style.background = 'rgba(30, 41, 59, 0.95)';
        totalCostsSection.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
        
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
        
        const materials = evolution.requirements.materials || [];
        materials.forEach(material => {
            if (typeof material === 'string') {
                const parsedMaterial = this.parseMaterialString(material);
                materialCount += parsedMaterial.quantity;
                materialCost += parsedMaterial.quantity * 100; // Default cost
            } else if (typeof material === 'object' && material.count) {
                materialCount += material.count;
                const rarityMultiplier = this.getRarityMultiplier(material.rarity);
                materialCost += material.count * 100 * rarityMultiplier;
            }
        });
        
        return {
            goldCost: evolution.requirements.cost || 0,
            gemsCost: evolution.requirements.gems || 0,
            materialCost,
            materialCount,
            totalCost: (evolution.requirements.cost || 0) + materialCost
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