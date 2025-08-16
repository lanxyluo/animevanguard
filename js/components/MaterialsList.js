// Materials List Component
import { evolutionData, materials, evolutionUtils } from '../config/evolutionData.js';

export class MaterialsList {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = {
            showRarity: true,
            showDescription: true,
            showQuantity: true,
            sortByRarity: true,
            showLoadingState: true,
            ...options
        };
        
        this.materialsConfig = null;
        this.currentUnit = null;
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`MaterialsList: Container with id "${this.containerId}" not found`);
            return;
        }
        
        this.render();
    }
    
    setMaterialsConfig(config) {
        this.materialsConfig = config;
    }
    
    async updateMaterials(unit) {
        console.log('📋 === MaterialsList 更新材料 ===');
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
        await new Promise(resolve => setTimeout(resolve, 300));
        
        try {
            await this.renderEvolutionRequirements(unit);
        } catch (error) {
            console.error('❌ 渲染进化要求时出错:', error);
            this.showErrorState('Failed to load evolution data');
        }
    }
    
    showLoadingState() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <p>Loading evolution data...</p>
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
                <h3>Error Loading Data</h3>
                <p>${message}</p>
                <button class="retry-btn" onclick="this.parentElement.parentElement.dispatchEvent(new CustomEvent('retry'))">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
        
        // Add retry event listener
        this.container.addEventListener('retry', () => {
            if (this.currentUnit) {
                this.updateMaterials(this.currentUnit);
            }
        });
        
        this.isLoading = false;
    }
    
    showEmptyState() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                    </div>
                <h3>No Unit Selected</h3>
                <p>Please select a unit from the list above to view its evolution requirements and materials.</p>
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
                <h3>No Evolution Data Available</h3>
                <p>This unit doesn't have evolution data yet. Evolution system is being updated.</p>
                <div class="evolution-status">
                    <span class="status-badge updating">
                        <i class="fas fa-sync-alt fa-spin"></i> Data Updating
                    </span>
                    </div>
                </div>
            `;
        this.isLoading = false;
    }
    
    async renderEvolutionRequirements(unit) {
        if (!this.container) return;
        
        // Clear container
        this.container.innerHTML = '';
        
        // Get evolution data
        const evolutionData = evolutionUtils.getEvolutionData(unit.id);
        if (!evolutionData) {
            this.showNoEvolutionData();
            return;
        }
        
        // Create evolution requirements section
        const requirementsSection = document.createElement('div');
        requirementsSection.className = 'evolution-requirements';
        
        // Add title with unit info
        const title = document.createElement('h3');
        title.innerHTML = `
            <i class="fas fa-arrow-up"></i> Evolution Requirements
            <span class="unit-name">${unit.name}</span>
        `;
        title.className = 'section-title';
        requirementsSection.appendChild(title);
        
        // Add evolution path visualization
        const evolutionPath = this.createEvolutionPath(evolutionData);
        requirementsSection.appendChild(evolutionPath);
        
        // Add evolution tiers
        const evolutionTiers = evolutionData.evolutions.filter((evolution, index) => index > 0);
        evolutionTiers.forEach((evolution, index) => {
            const tierSection = this.createTierSection(evolution, index + 1);
            requirementsSection.appendChild(tierSection);
        });
        
        this.container.appendChild(requirementsSection);
        
        // Add materials breakdown
        this.renderMaterialsBreakdown(evolutionData);
        
        this.isLoading = false;
    }
    
    createEvolutionPath(evolutionData) {
        const pathContainer = document.createElement('div');
        pathContainer.className = 'evolution-path';
        
        const pathSteps = evolutionData.evolutions.map((evolution, index) => {
            const isActive = index > 0;
            const stepClass = isActive ? 'path-step active' : 'path-step base';
            
            return `
                <div class="${stepClass}">
                    <div class="step-icon">
                        <i class="fas fa-${isActive ? 'star' : 'user'}"></i>
                    </div>
                    <div class="step-info">
                        <div class="step-name">${evolution.name}</div>
                        <div class="step-tier">Tier ${evolution.tier}</div>
                    </div>
                </div>
                ${index < evolutionData.evolutions.length - 1 ? '<div class="path-arrow"><i class="fas fa-arrow-right"></i></div>' : ''}
            `;
        }).join('');
        
        pathContainer.innerHTML = `
            <div class="path-title">
                <i class="fas fa-route"></i> Evolution Path
            </div>
            <div class="path-steps">
                ${pathSteps}
                </div>
            `;
        
        return pathContainer;
    }
    
    createTierSection(evolution, tierIndex) {
        const tierSection = document.createElement('div');
        tierSection.className = `evolution-tier tier-${evolution.tier}`;
        
        const tierHeader = document.createElement('div');
        tierHeader.className = 'tier-header';
        
        const tierTitle = document.createElement('h4');
        tierTitle.innerHTML = `<i class="fas fa-star"></i> Tier ${evolution.tier} → ${evolution.name}`;
        tierHeader.appendChild(tierTitle);
        
        const tierStats = document.createElement('div');
        tierStats.className = 'tier-stats';
        tierStats.innerHTML = `
            <span class="stat-item">
                <i class="fas fa-level-up-alt"></i> Level ${evolution.requirements.level}
            </span>
            <span class="stat-item">
                <i class="fas fa-coins"></i> ${evolution.requirements.cost.toLocaleString()} Gold
            </span>
            ${evolution.requirements.gems ? `
                <span class="stat-item">
                    <i class="fas fa-gem"></i> ${evolution.requirements.gems} Gems
                </span>
            ` : ''}
            <span class="stat-item">
                <i class="fas fa-cube"></i> ${evolution.requirements.materials.length} Materials
            </span>
        `;
        tierHeader.appendChild(tierStats);
        
        tierSection.appendChild(tierHeader);
        
        // Add materials list
        if (evolution.requirements.materials.length > 0) {
            const materialsList = this.createMaterialsList(evolution.requirements.materials);
            tierSection.appendChild(materialsList);
        }
        
        return tierSection;
    }
    
    createMaterialsList(materials) {
        const materialsContainer = document.createElement('div');
        materialsContainer.className = 'materials-list';
        
        // Sort materials by rarity if enabled
        let sortedMaterials = materials;
        if (this.options.sortByRarity) {
            sortedMaterials = this.sortMaterialsByRarity(materials);
        }
        
        sortedMaterials.forEach(materialString => {
            const materialItem = this.createMaterialItem(materialString);
            materialsContainer.appendChild(materialItem);
        });
        
        return materialsContainer;
    }
    
    sortMaterialsByRarity(materials) {
        const rarityOrder = {
            'Mythic': 0,
            'Legendary': 1,
            'Epic': 2,
            'Rare': 3,
            'Uncommon': 4,
            'Common': 5
        };
        
        return materials.sort((a, b) => {
            const materialA = evolutionUtils.parseMaterialString(a);
            const materialB = evolutionUtils.parseMaterialString(b);
            
            const dataA = evolutionUtils.getMaterialData(materialA.name);
            const dataB = evolutionUtils.getMaterialData(materialB.name);
            
            const rarityA = dataA ? rarityOrder[dataA.rarity] || 6 : 6;
            const rarityB = dataB ? rarityOrder[dataB.rarity] || 6 : 6;
            
            return rarityA - rarityB;
        });
    }
    
    createMaterialItem(materialString) {
        const materialItem = document.createElement('div');
        materialItem.className = 'material-item';
        
        const parsedMaterial = evolutionUtils.parseMaterialString(materialString);
        const materialData = evolutionUtils.getMaterialData(parsedMaterial.name);
        
        if (materialData) {
            const rarityColor = evolutionUtils.getRarityColor(materialData.rarity);
            const dropRateFormatted = evolutionUtils.formatDropRate(materialData.dropRate);
            const rarityClass = materialData.rarity.toLowerCase().replace(/\s+/g, '-');
            
            materialItem.className = `material-item rarity-${rarityClass}`;
            materialItem.innerHTML = `
                <div class="material-info">
                    <div class="material-name" style="color: ${rarityColor}">
                        <i class="fas fa-cube"></i> ${materialData.name}
                        <span class="material-quantity">x${parsedMaterial.quantity}</span>
                    </div>
                    <div class="material-details">
                        <span class="material-rarity rarity-${rarityClass}">${materialData.rarity}</span>
                        <span class="material-drop-rate">${dropRateFormatted}</span>
                        <span class="material-cost">${materialData.cost.toLocaleString()} Gold</span>
                    </div>
                    <div class="material-description">${materialData.description}</div>
                    <div class="material-sources">
                        <strong>Sources:</strong> ${materialData.source.join(', ')}
                    </div>
                </div>
            `;
        } else {
            // Fallback for unknown materials
            materialItem.innerHTML = `
                <div class="material-info">
                    <div class="material-name">
                        <i class="fas fa-question-circle"></i> ${parsedMaterial.name}
                        <span class="material-quantity">x${parsedMaterial.quantity}</span>
                    </div>
                    <div class="material-details">
                        <span class="material-unknown">Unknown Material</span>
                    </div>
                </div>
            `;
        }
        
        return materialItem;
    }
    
    renderMaterialsBreakdown(evolutionData) {
        const breakdownSection = document.createElement('div');
        breakdownSection.className = 'materials-breakdown';
        
        const title = document.createElement('h3');
        title.innerHTML = '<i class="fas fa-list"></i> Materials Summary';
        title.className = 'section-title';
        breakdownSection.appendChild(title);
        
        // Calculate total materials needed
        const totalMaterials = this.calculateTotalMaterials(evolutionData);
        const materialsSummary = this.createMaterialsSummary(totalMaterials);
        breakdownSection.appendChild(materialsSummary);
        
        this.container.appendChild(breakdownSection);
    }
    
    calculateTotalMaterials(evolutionData) {
        const materialCounts = {};
        
        evolutionData.evolutions.forEach(evolution => {
            evolution.requirements.materials.forEach(materialString => {
                const parsed = evolutionUtils.parseMaterialString(materialString);
                materialCounts[parsed.name] = (materialCounts[parsed.name] || 0) + parsed.quantity;
            });
        });
        
        return materialCounts;
    }
    
    createMaterialsSummary(totalMaterials) {
        const summaryContainer = document.createElement('div');
        summaryContainer.className = 'materials-summary';
        
        const summaryList = document.createElement('div');
        summaryList.className = 'summary-list';
        
        // Sort materials by rarity
        const sortedMaterials = Object.entries(totalMaterials).sort((a, b) => {
            const dataA = evolutionUtils.getMaterialData(a[0]);
            const dataB = evolutionUtils.getMaterialData(b[0]);
            
            const rarityOrder = {
                'Mythic': 0, 'Legendary': 1, 'Epic': 2, 'Rare': 3, 'Uncommon': 4, 'Common': 5
            };
            
            const rarityA = dataA ? rarityOrder[dataA.rarity] || 6 : 6;
            const rarityB = dataB ? rarityOrder[dataB.rarity] || 6 : 6;
            
            return rarityA - rarityB;
        });
        
        sortedMaterials.forEach(([materialName, quantity]) => {
            const materialData = evolutionUtils.getMaterialData(materialName);
            const rarityColor = materialData ? evolutionUtils.getRarityColor(materialData.rarity) : '#9e9e9e';
            
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.innerHTML = `
                <span class="material-name" style="color: ${rarityColor}">
                    <i class="fas fa-cube"></i> ${materialName}
                </span>
                <span class="material-total">${quantity}</span>
            `;
            summaryList.appendChild(summaryItem);
        });
        
        summaryContainer.appendChild(summaryList);
        return summaryContainer;
    }
    
    render() {
        if (!this.container) return;
        
        this.showEmptyState();
    }
    
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
} 