/**
 * Evolution Page
 * Handles unit evolution functionality
 */

export class EvolutionPage {
    constructor(app) {
        this.app = app;
        this.isInitialized = false;
    }
    
    async initialize(data) {
        console.log('🔧 Initializing Evolution Page...');
        
        try {
            this.data = data;
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('✅ Evolution Page initialized successfully!');
        } catch (error) {
            console.error('❌ Evolution Page initialization failed:', error);
            throw error;
        }
    }
    
    setupEventListeners() {
        // Evolution page specific event listeners
        const evolutionContainer = document.getElementById('evolutionPage');
        if (evolutionContainer) {
            // Add evolution-specific event listeners here
            console.log('📝 Evolution page event listeners set up');
        }
    }
    
    show() {
        const container = document.getElementById('evolutionPage');
        if (container) {
            container.style.display = 'block';
            console.log('📄 Evolution page displayed');
        }
    }
    
    hide() {
        const container = document.getElementById('evolutionPage');
        if (container) {
            container.style.display = 'none';
        }
    }
    
    // Evolution calculation methods
    calculateEvolutionRequirements(unit, targetRarity) {
        if (!unit || !targetRarity) return null;
        
        const requirements = this.data.materialsConfig.evolution[targetRarity];
        if (!requirements) return null;
        
        return {
            materials: requirements.materials,
            gold: requirements.gold,
            currentRarity: unit.rarity,
            targetRarity: targetRarity
        };
    }
    
    // Check if evolution is possible
    canEvolve(unit, targetRarity, availableMaterials, availableGold) {
        const requirements = this.calculateEvolutionRequirements(unit, targetRarity);
        if (!requirements) return false;
        
        // Check if player has enough materials and gold
        const hasEnoughGold = availableGold >= requirements.gold;
        const hasEnoughMaterials = requirements.materials.every(material => {
            const available = availableMaterials[material.name] || 0;
            return available >= material.amount;
        });
        
        return hasEnoughGold && hasEnoughMaterials;
    }
}
