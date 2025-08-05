// Materials List Component
import { formatNumber } from '../utils/helpers.js';

export class MaterialsList {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = {
            showRarity: true,
            showDescription: true,
            showQuantity: true,
            showCost: false,
            ...options
        };
        
        this.materialsConfig = {};
        this.currentUnit = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`MaterialsList: Container with id "${this.containerId}" not found`);
            return;
        }
        
        this.createDOM();
        this.render();
    }
    
    createDOM() {
        this.container.innerHTML = `
            <div class="card">
                <h2><i class="fas fa-list"></i> Evolution Materials</h2>
                <div id="materialsList" class="materials-list">
                    <p>Select a unit to view evolution materials</p>
                </div>
            </div>
        `;
        
        this.materialsListElement = document.getElementById('materialsList');
    }
    
    setMaterialsConfig(materialsConfig) {
        this.materialsConfig = materialsConfig;
    }
    
    updateMaterials(unit) {
        console.log('📋 === MaterialsList 接收单位更新 ===');
        console.log('📊 当前材料状态:', this.currentUnit);
        console.log('🆕 新接收的单位:', unit);
        
        this.currentUnit = unit;
        console.log('✅ 材料状态已更新:', this.currentUnit);
        
        console.log('🎨 开始渲染材料列表...');
        this.render();
        console.log('📋 === MaterialsList 单位更新完成 ===\n');
    }
    
    render() {
        if (!this.materialsListElement) return;
        
        if (!this.currentUnit) {
            this.materialsListElement.innerHTML = '<p>Select a unit to view evolution materials</p>';
            return;
        }
        
        // Try to get materials data
        let materialsData = this.currentUnit.evolutionMaterials;
        if (!materialsData) {
            // Try to load from materials data file
            import('../config/evolutionMaterials.js').then(module => {
                materialsData = module.EVOLUTION_MATERIALS_DATA[this.currentUnit.id];
                if (materialsData) {
                    this.renderMaterials(materialsData);
                } else {
                    this.materialsListElement.innerHTML = '<p>No evolution materials available</p>';
                }
            }).catch(error => {
                console.warn('Could not load materials data:', error);
                this.materialsListElement.innerHTML = '<p>No evolution materials available</p>';
            });
            return;
        }
        
        this.renderMaterials(materialsData);
    }
    
    renderMaterials(materialsData) {
        if (!materialsData || !materialsData.materials) {
            this.materialsListElement.innerHTML = '<p>No evolution materials available</p>';
            return;
        }
        
        let materialsHTML = '';
        
        // Gold cost
        if (materialsData.goldCost) {
            materialsHTML += `
                <div class="material-item">
                    <div class="material-info">
                        <strong>Gold</strong>
                        <p>Basic currency for evolution</p>
                    </div>
                    <div class="material-quantity">${formatNumber(materialsData.goldCost)}</div>
                </div>
            `;
        }
        
        // Materials list
        materialsData.materials.forEach(material => {
            materialsHTML += `
                <div class="material-item">
                    <div class="material-info">
                        <strong>${material.name}</strong>
                        <p>${material.description}</p>
                        <small>Type: ${material.type} • Rarity: ${material.rarity}</small>
                    </div>
                    <div class="material-quantity">${material.quantity}</div>
                </div>
            `;
        });
        
        // Special requirements
        if (materialsData.specialRequirements && materialsData.specialRequirements.length > 0) {
            materialsHTML += `
                <div class="special-requirements">
                    <h4>Special Requirements:</h4>
                    <ul>
                        ${materialsData.specialRequirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        this.materialsListElement.innerHTML = materialsHTML;
    }
    
    getMaterialsSummary() {
        if (!this.currentUnit || !this.currentUnit.evolutionMaterials) {
            return null;
        }
        
        const { goldCost, specialItem, essenceStones } = this.currentUnit.evolutionMaterials;
        const summary = {
            totalGold: goldCost || 0,
            totalEssenceStones: 0,
            specialItems: specialItem ? 1 : 0,
            materials: []
        };
        
        if (essenceStones) {
            Object.entries(essenceStones).forEach(([name, quantity]) => {
                summary.totalEssenceStones += quantity;
                summary.materials.push({ name, quantity });
            });
        }
        
        return summary;
    }
    
    getTotalCost() {
        if (!this.currentUnit || !this.currentUnit.evolutionMaterials) {
            return 0;
        }
        
        const { goldCost, specialItem, essenceStones } = this.currentUnit.evolutionMaterials;
        let totalCost = goldCost || 0;
        
        // Add special item cost
        if (specialItem) {
            const material = this.materialsConfig[specialItem.name];
            if (material && material.cost) {
                totalCost += material.cost;
            }
        }
        
        // Add essence stones cost
        if (essenceStones) {
            Object.entries(essenceStones).forEach(([name, quantity]) => {
                const material = this.materialsConfig[name];
                if (material && material.cost) {
                    totalCost += material.cost * quantity;
                }
            });
        }
        
        return totalCost;
    }
    
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
} 