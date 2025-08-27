/**
 * Traits Builder Component
 * Handles unit traits and abilities building functionality
 */

export class TraitsBuilder {
    constructor() {
        this.isInitialized = false;
        this.traits = [];
        this.selectedTraits = [];
    }
    
    async initialize() {
        console.log('🔧 Initializing Traits Builder...');
        
        try {
            this.loadTraits();
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('✅ Traits Builder initialized successfully!');
        } catch (error) {
            console.error('❌ Traits Builder initialization failed:', error);
            throw error;
        }
    }
    
    loadTraits() {
        // Sample traits data
        this.traits = [
            {
                id: 1,
                name: 'Critical Strike',
                description: 'Increases critical hit chance by 15%',
                type: 'Offensive',
                rarity: 'Epic',
                effect: { critChance: 15 }
            },
            {
                id: 2,
                name: 'Defensive Stance',
                description: 'Increases defense by 20%',
                type: 'Defensive',
                rarity: 'Rare',
                effect: { defense: 20 }
            },
            {
                id: 3,
                name: 'Elemental Mastery',
                description: 'Increases elemental damage by 25%',
                type: 'Elemental',
                rarity: 'Legendary',
                effect: { elementalDamage: 25 }
            },
            {
                id: 4,
                name: 'Swift Movement',
                description: 'Increases attack speed by 10%',
                type: 'Utility',
                rarity: 'Rare',
                effect: { attackSpeed: 10 }
            },
            {
                id: 5,
                name: 'Life Steal',
                description: 'Heals for 5% of damage dealt',
                type: 'Sustain',
                rarity: 'Epic',
                effect: { lifeSteal: 5 }
            }
        ];
    }
    
    setupEventListeners() {
        const traitsContainer = document.getElementById('traitsPage');
        if (traitsContainer) {
            console.log('📝 Traits Builder event listeners set up');
        }
    }
    
    // Get all traits
    getAllTraits() {
        return this.traits;
    }
    
    // Get traits by type
    getTraitsByType(type) {
        return this.traits.filter(trait => trait.type === type);
    }
    
    // Get traits by rarity
    getTraitsByRarity(rarity) {
        return this.traits.filter(trait => trait.rarity === rarity);
    }
    
    // Add trait to selection
    addTrait(traitId) {
        const trait = this.traits.find(t => t.id === traitId);
        if (trait && !this.selectedTraits.find(t => t.id === traitId)) {
            this.selectedTraits.push(trait);
            return true;
        }
        return false;
    }
    
    // Remove trait from selection
    removeTrait(traitId) {
        const index = this.selectedTraits.findIndex(t => t.id === traitId);
        if (index !== -1) {
            this.selectedTraits.splice(index, 1);
            return true;
        }
        return false;
    }
    
    // Get selected traits
    getSelectedTraits() {
        return this.selectedTraits;
    }
    
    // Calculate total effects from selected traits
    calculateTotalEffects() {
        const totalEffects = {};
        
        this.selectedTraits.forEach(trait => {
            Object.entries(trait.effect).forEach(([key, value]) => {
                totalEffects[key] = (totalEffects[key] || 0) + value;
            });
        });
        
        return totalEffects;
    }
    
    // Clear all selected traits
    clearSelection() {
        this.selectedTraits = [];
    }
    
    // Check if trait can be added (for compatibility rules)
    canAddTrait(traitId) {
        const trait = this.traits.find(t => t.id === traitId);
        if (!trait) return false;
        
        // Check for conflicting traits
        const conflicts = this.getConflictingTraits(trait);
        return !conflicts.some(conflict => 
            this.selectedTraits.find(t => t.id === conflict.id)
        );
    }
    
    // Get conflicting traits
    getConflictingTraits(trait) {
        // Define trait conflicts
        const conflicts = {
            1: [2], // Critical Strike conflicts with Defensive Stance
            2: [1], // Defensive Stance conflicts with Critical Strike
            3: [], // Elemental Mastery has no conflicts
            4: [], // Swift Movement has no conflicts
            5: []  // Life Steal has no conflicts
        };
        
        return conflicts[trait.id] ? 
            this.traits.filter(t => conflicts[trait.id].includes(t.id)) : [];
    }
}
