// Materials List Component
import { evolutionUtils } from '../config/evolutionSystem.js';

export class MaterialsList {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = {
            showRarity: true,
            showDescription: true,
            showQuantity: true,
            ...options
        };
        
        this.materialsConfig = null;
        this.currentUnit = null;
        
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
    
    updateMaterials(unit) {
        console.log('📋 === MaterialsList 更新材料 ===');
        console.log('📊 当前单位:', unit);
        
        this.currentUnit = unit;
        
        if (!unit) {
            this.showEmptyState();
            return;
        }
        
        this.renderEvolutionRequirements(unit);
    }
    
    renderEvolutionRequirements(unit) {
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
        
        // Add title
        const title = document.createElement('h3');
        title.innerHTML = '<i class="fas fa-arrow-up"></i> Evolution Requirements';
        title.className = 'section-title';
        requirementsSection.appendChild(title);
        
        // Add evolution tiers
        evolutionData.evolutions.forEach((evolution, index) => {
            if (index === 0) return; // Skip base form
            
            const tierSection = this.createTierSection(evolution, index);
            requirementsSection.appendChild(tierSection);
        });
        
        this.container.appendChild(requirementsSection);
        
        // Add materials breakdown
        this.renderMaterialsBreakdown(evolutionData);
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
        
        materials.forEach(materialString => {
            const materialItem = this.createMaterialItem(materialString);
            materialsContainer.appendChild(materialItem);
        });
        
        return materialsContainer;
    }
    
    createMaterialItem(materialString) {
        const materialItem = document.createElement('div');
        materialItem.className = 'material-item';
        
        const parsedMaterial = evolutionUtils.parseMaterialString(materialString);
        const materialData = evolutionUtils.getMaterialData(parsedMaterial.name);
        
        if (materialData) {
            const rarityColor = evolutionUtils.getRarityColor(materialData.rarity);
            const dropRateFormatted = evolutionUtils.formatDropRate(materialData.dropRate);
            
            materialItem.innerHTML = `
                <div class="material-info">
                    <div class="material-name" style="color: ${rarityColor}">
                        <i class="fas fa-cube"></i> ${materialData.name}
                        <span class="material-quantity">x${parsedMaterial.quantity}</span>
                    </div>
                    <div class="material-details">
                        <span class="material-rarity">${materialData.rarity}</span>
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
                const parsedMaterial = evolutionUtils.parseMaterialString(materialString);
                const materialName = parsedMaterial.name;
                
                if (materialCounts[materialName]) {
                    materialCounts[materialName] += parsedMaterial.quantity;
                } else {
                    materialCounts[materialName] = parsedMaterial.quantity;
                }
            });
        });
        
        return materialCounts;
    }
    
    createMaterialsSummary(materialCounts) {
        const summaryContainer = document.createElement('div');
        summaryContainer.className = 'materials-summary';
        
        const summaryList = document.createElement('div');
        summaryList.className = 'summary-list';
        
        Object.entries(materialCounts).forEach(([materialName, quantity]) => {
            const materialData = evolutionUtils.getMaterialData(materialName);
            const rarityColor = materialData ? evolutionUtils.getRarityColor(materialData.rarity) : '#9e9e9e';
            
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.innerHTML = `
                <span class="material-name" style="color: ${rarityColor}">
                    ${materialName}
                </span>
                <span class="material-total">x${quantity}</span>
            `;
            
            summaryList.appendChild(summaryItem);
        });
        
        summaryContainer.appendChild(summaryList);
        return summaryContainer;
    }
    
    showEmptyState() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-cube"></i>
                <h3>No Unit Selected</h3>
                <p>Select a unit to view its evolution requirements and materials.</p>
            </div>
        `;
    }
    
    showNoEvolutionData() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>No Evolution Data</h3>
                <p>Evolution data not found for this unit.</p>
            </div>
        `;
    }
    
    render() {
        // Component is already rendered in HTML
        console.log('MaterialsList: Using existing HTML structure');
    }
    
    destroy() {
        // Clean up if needed
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
} 