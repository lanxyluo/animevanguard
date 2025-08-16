// Farming Guide Component
import { evolutionUtils } from '../config/evolutionSystem.js';

export class FarmingGuide {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = {
            showPriority: true,
            showDifficulty: true,
            showTips: true,
            showObtainMethods: true,
            ...options
        };
        
        this.currentUnit = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`FarmingGuide: Container with id "${this.containerId}" not found`);
            return;
        }
        
        this.render();
    }
    
    updateGuide(unit) {
        console.log('🌾 === FarmingGuide 更新指南 ===');
        console.log('📊 当前单位:', unit);
        
        this.currentUnit = unit;
        
        if (!unit) {
            this.showEmptyState();
            return;
        }
        
        this.renderFarmingGuide(unit);
    }
    
    renderFarmingGuide(unit) {
        if (!this.container) return;
        
        // Clear container
        this.container.innerHTML = '';
        
        // Get farming guide data
        const farmingData = this.getFarmingData(unit.id);
        if (!farmingData) {
            this.showNoFarmingData();
            return;
        }
        
        // Create farming guide section
        const guideSection = document.createElement('div');
        guideSection.className = 'farming-guide';
        
        // Add title
        const title = document.createElement('h3');
        title.innerHTML = '<i class="fas fa-map"></i> Farming Guide';
        title.className = 'section-title';
        guideSection.appendChild(title);
        
        // Add farming overview
        this.renderFarmingOverview(farmingData, guideSection);
        
        // Add farming tips
        if (this.options.showTips && farmingData.tips) {
            this.renderFarmingTips(farmingData.tips, guideSection);
        }
        
        // Add obtain methods
        if (this.options.showObtainMethods && farmingData.obtainMethods) {
            this.renderObtainMethods(farmingData.obtainMethods, guideSection);
        }
        
        this.container.appendChild(guideSection);
    }
    
    getFarmingData(unitId) {
        // Try to get from farming guide data first
        const farmingGuideData = this.loadFarmingGuideData();
        if (farmingGuideData && farmingGuideData[unitId]) {
            return farmingGuideData[unitId].farmingGuide;
        }
        
        // Fallback: generate farming guide from evolution data
        return this.generateFarmingGuide(unitId);
    }
    
    loadFarmingGuideData() {
        try {
            // This would be imported from the evolution system
            // For now, we'll generate it dynamically
            return null;
        } catch (error) {
            console.warn('Could not load farming guide data:', error);
            return null;
        }
    }
    
    generateFarmingGuide(unitId) {
        const evolutionData = evolutionUtils.getEvolutionData(unitId);
        if (!evolutionData) return null;
        
        // Generate farming guide based on evolution requirements
        const materials = this.extractAllMaterials(evolutionData);
        const obtainMethods = this.generateObtainMethods(materials);
        const tips = this.generateFarmingTips(materials);
        
        return {
            priority: this.calculatePriority(materials),
            difficulty: this.calculateDifficulty(materials),
            estimatedTime: this.calculateEstimatedTime(materials),
            tips,
            obtainMethods
        };
    }
    
    extractAllMaterials(evolutionData) {
        const materials = [];
        
        evolutionData.evolutions.forEach(evolution => {
            evolution.requirements.materials.forEach(materialString => {
                const parsedMaterial = evolutionUtils.parseMaterialString(materialString);
                const materialData = evolutionUtils.getMaterialData(parsedMaterial.name);
                
                if (materialData) {
                    materials.push({
                        ...parsedMaterial,
                        ...materialData
                    });
                }
            });
        });
        
        return materials;
    }
    
    generateObtainMethods(materials) {
        return materials.map(material => ({
            material: material.name,
            bestLocation: material.source[0] || 'Unknown Location',
            alternativeLocations: material.source.slice(1) || [],
            energyCost: this.estimateEnergyCost(material.rarity),
            dropRate: material.dropRate
        }));
    }
    
    generateFarmingTips(materials) {
        const tips = [];
        
        // Sort materials by rarity (most common first)
        const sortedMaterials = materials.sort((a, b) => {
            const rarityOrder = { 'Common': 1, 'Uncommon': 2, 'Rare': 3, 'Epic': 4, 'Legendary': 5, 'Mythic': 6 };
            return rarityOrder[a.rarity] - rarityOrder[b.rarity];
        });
        
        // Add tips based on material characteristics
        const commonMaterials = materials.filter(m => m.rarity === 'Common');
        const rareMaterials = materials.filter(m => m.rarity === 'Rare' || m.rarity === 'Epic');
        const mythicMaterials = materials.filter(m => m.rarity === 'Legendary' || m.rarity === 'Mythic');
        
        if (commonMaterials.length > 0) {
            tips.push(`Focus on ${commonMaterials[0].name} first (${commonMaterials[0].dropRate} drop rate)`);
        }
        
        if (rareMaterials.length > 0) {
            tips.push(`${rareMaterials[0].name} requires special events - save energy for them`);
        }
        
        if (mythicMaterials.length > 0) {
            tips.push(`${mythicMaterials[0].name} is extremely rare - participate in all mythic events`);
        }
        
        tips.push('Use daily missions for common materials');
        tips.push('Save gems for rare material events');
        
        return tips;
    }
    
    calculatePriority(materials) {
        const mythicCount = materials.filter(m => m.rarity === 'Mythic').length;
        const legendaryCount = materials.filter(m => m.rarity === 'Legendary').length;
        
        if (mythicCount > 0) return 'Very High';
        if (legendaryCount > 2) return 'High';
        if (legendaryCount > 0) return 'Medium';
        return 'Low';
    }
    
    calculateDifficulty(materials) {
        const mythicCount = materials.filter(m => m.rarity === 'Mythic').length;
        const legendaryCount = materials.filter(m => m.rarity === 'Legendary').length;
        const epicCount = materials.filter(m => m.rarity === 'Epic').length;
        
        if (mythicCount > 0) return 'Very Hard';
        if (legendaryCount > 1) return 'Hard';
        if (epicCount > 2) return 'Medium';
        return 'Easy';
    }
    
    calculateEstimatedTime(materials) {
        const totalRarity = materials.reduce((sum, m) => {
            const rarityValues = { 'Common': 1, 'Uncommon': 2, 'Rare': 3, 'Epic': 4, 'Legendary': 5, 'Mythic': 6 };
            return sum + rarityValues[m.rarity] * m.quantity;
        }, 0);
        
        if (totalRarity > 50) return '4-5 weeks';
        if (totalRarity > 30) return '3-4 weeks';
        if (totalRarity > 15) return '2-3 weeks';
        return '1-2 weeks';
    }
    
    estimateEnergyCost(rarity) {
        const energyCosts = {
            'Common': 10,
            'Uncommon': 15,
            'Rare': 25,
            'Epic': 40,
            'Legendary': 60,
            'Mythic': 100
        };
        return energyCosts[rarity] || 20;
    }
    
    renderFarmingOverview(farmingData, container) {
        const overviewSection = document.createElement('div');
        overviewSection.className = 'farming-overview';
        
        overviewSection.innerHTML = `
            <div class="overview-grid">
                <div class="overview-item priority">
                    <div class="overview-icon">
                        <i class="fas fa-flag"></i>
                    </div>
                    <div class="overview-details">
                        <div class="overview-label">Priority</div>
                        <div class="overview-value ${farmingData.priority.toLowerCase().replace(' ', '-')}">
                            ${farmingData.priority}
                        </div>
                    </div>
                </div>
                
                <div class="overview-item difficulty">
                    <div class="overview-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="overview-details">
                        <div class="overview-label">Difficulty</div>
                        <div class="overview-value ${farmingData.difficulty.toLowerCase().replace(' ', '-')}">
                            ${farmingData.difficulty}
                        </div>
                    </div>
                </div>
                
                <div class="overview-item time">
                    <div class="overview-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="overview-details">
                        <div class="overview-label">Estimated Time</div>
                        <div class="overview-value">${farmingData.estimatedTime}</div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(overviewSection);
    }
    
    renderFarmingTips(tips, container) {
        const tipsSection = document.createElement('div');
        tipsSection.className = 'farming-tips';
        
        const title = document.createElement('h4');
        title.innerHTML = '<i class="fas fa-lightbulb"></i> Farming Tips';
        title.className = 'subsection-title';
        tipsSection.appendChild(title);
        
        const tipsList = document.createElement('div');
        tipsList.className = 'tips-list';
        
        tips.forEach((tip, index) => {
            const tipItem = document.createElement('div');
            tipItem.className = 'tip-item';
            tipItem.innerHTML = `
                <div class="tip-number">${index + 1}</div>
                <div class="tip-content">${tip}</div>
            `;
            tipsList.appendChild(tipItem);
        });
        
        tipsSection.appendChild(tipsList);
        container.appendChild(tipsSection);
    }
    
    renderObtainMethods(obtainMethods, container) {
        const methodsSection = document.createElement('div');
        methodsSection.className = 'obtain-methods';
        
        const title = document.createElement('h4');
        title.innerHTML = '<i class="fas fa-map-marker-alt"></i> Best Farming Locations';
        title.className = 'subsection-title';
        methodsSection.appendChild(title);
        
        const methodsList = document.createElement('div');
        methodsList.className = 'methods-list';
        
        obtainMethods.forEach(method => {
            const methodItem = this.createMethodItem(method);
            methodsList.appendChild(methodItem);
        });
        
        methodsSection.appendChild(methodsList);
        container.appendChild(methodsSection);
    }
    
    createMethodItem(method) {
        const methodItem = document.createElement('div');
        methodItem.className = 'method-item';
        
        const dropRateFormatted = evolutionUtils.formatDropRate(method.dropRate);
        
        methodItem.innerHTML = `
            <div class="method-header">
                <div class="material-name">${method.material}</div>
                <div class="drop-rate">${dropRateFormatted}</div>
            </div>
            
            <div class="method-details">
                <div class="best-location">
                    <i class="fas fa-star"></i>
                    <strong>Best:</strong> ${method.bestLocation}
                </div>
                
                ${method.alternativeLocations.length > 0 ? `
                    <div class="alternative-locations">
                        <i class="fas fa-map"></i>
                        <strong>Also:</strong> ${method.alternativeLocations.join(', ')}
                    </div>
                ` : ''}
                
                <div class="energy-cost">
                    <i class="fas fa-bolt"></i>
                    <strong>Energy:</strong> ${method.energyCost}
                </div>
            </div>
        `;
        
        return methodItem;
    }
    
    showEmptyState() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-map"></i>
                <h3>No Unit Selected</h3>
                <p>Select a unit to view its farming guide.</p>
            </div>
        `;
    }
    
    showNoFarmingData() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>No Farming Data</h3>
                <p>Farming guide not available for this unit.</p>
            </div>
        `;
    }
    
    render() {
        // Component is already rendered in HTML
        console.log('FarmingGuide: Using existing HTML structure');
    }
    
    destroy() {
        // Clean up if needed
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
} 