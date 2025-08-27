/**
 * Sample Unit Data
 * This will be replaced with real data from API or database
 */
export const sampleUnits = [
    {
        id: 1,
        name: "Saber Alter",
        rarity: "Legendary",
        element: "Dark",
        type: "DPS",
        role: "Melee",
        description: "A corrupted version of the legendary King Arthur, wielding dark powers and immense strength.",
        stats: {
            attack: 8500,
            defense: 3200,
            skill: 7800
        },
        recommendation: 95
    },
    {
        id: 2,
        name: "Gilgamesh",
        rarity: "Mythic",
        element: "Light",
        type: "DPS",
        role: "Ranged",
        description: "The King of Heroes, possessing the Gate of Babylon with countless treasures and weapons.",
        stats: {
            attack: 9200,
            defense: 2800,
            skill: 8500
        },
        recommendation: 98
    },
    {
        id: 3,
        name: "Emiya",
        rarity: "Epic",
        element: "Fire",
        type: "DPS",
        role: "Ranged",
        description: "A skilled archer and mage, capable of tracing and projecting various weapons.",
        stats: {
            attack: 7200,
            defense: 2500,
            skill: 6800
        },
        recommendation: 87
    },
    {
        id: 4,
        name: "Rin Tohsaka",
        rarity: "Epic",
        element: "Energy",
        type: "Support",
        role: "Magic",
        description: "A talented mage specializing in gem magic and energy manipulation.",
        stats: {
            attack: 5800,
            defense: 2200,
            skill: 8200
        },
        recommendation: 82
    },
    {
        id: 5,
        name: "Koguro",
        rarity: "Rare",
        element: "Physical",
        type: "Tank",
        role: "Melee",
        description: "A sturdy warrior with exceptional defensive capabilities and crowd control.",
        stats: {
            attack: 4500,
            defense: 6800,
            skill: 4200
        },
        recommendation: 75
    },
    {
        id: 6,
        name: "Arc",
        rarity: "Legendary",
        element: "Light",
        type: "Hybrid",
        role: "Magic",
        description: "A powerful vampire with both offensive and healing abilities.",
        stats: {
            attack: 7800,
            defense: 3800,
            skill: 7200
        },
        recommendation: 91
    },
    {
        id: 7,
        name: "Yehowach",
        rarity: "Rare",
        element: "Wind",
        type: "Support",
        role: "Magic",
        description: "A wind mage specializing in buffs and debuffs for team support.",
        stats: {
            attack: 4200,
            defense: 2800,
            skill: 7500
        },
        recommendation: 78
    },
    {
        id: 8,
        name: "Artoria",
        rarity: "Legendary",
        element: "Light",
        type: "DPS",
        role: "Melee",
        description: "The legendary King Arthur, wielding the holy sword Excalibur.",
        stats: {
            attack: 8800,
            defense: 3500,
            skill: 8000
        },
        recommendation: 94
    },
    {
        id: 9,
        name: "Shirou",
        rarity: "Epic",
        element: "Physical",
        type: "Hybrid",
        role: "Melee",
        description: "A determined fighter with the ability to trace and project weapons.",
        stats: {
            attack: 6500,
            defense: 3200,
            skill: 6800
        },
        recommendation: 85
    },
    {
        id: 10,
        name: "Sakura",
        rarity: "Epic",
        element: "Dark",
        type: "Support",
        role: "Magic",
        description: "A gentle soul with powerful healing and support magic abilities.",
        stats: {
            attack: 4800,
            defense: 2600,
            skill: 7800
        },
        recommendation: 83
    },
    {
        id: 11,
        name: "Lancer",
        rarity: "Epic",
        element: "Lightning",
        type: "DPS",
        role: "Melee",
        description: "A swift warrior wielding the legendary spear Gae Bolg.",
        stats: {
            attack: 7500,
            defense: 2800,
            skill: 7200
        },
        recommendation: 86
    },
    {
        id: 12,
        name: "Caster",
        rarity: "Epic",
        element: "Energy",
        type: "Support",
        role: "Magic",
        description: "A powerful mage with extensive knowledge of ancient magic.",
        stats: {
            attack: 5200,
            defense: 2400,
            skill: 8500
        },
        recommendation: 84
    },
    {
        id: 13,
        name: "Berserker",
        rarity: "Legendary",
        element: "Physical",
        type: "DPS",
        role: "Melee",
        description: "A fearsome warrior driven by madness, possessing incredible strength.",
        stats: {
            attack: 9500,
            defense: 4200,
            skill: 3800
        },
        recommendation: 89
    },
    {
        id: 14,
        name: "Assassin",
        rarity: "Rare",
        element: "Dark",
        type: "DPS",
        role: "Melee",
        description: "A stealthy killer specializing in quick strikes and evasion.",
        stats: {
            attack: 6800,
            defense: 2200,
            skill: 7200
        },
        recommendation: 79
    },
    {
        id: 15,
        name: "Rider",
        rarity: "Epic",
        element: "Wind",
        type: "Hybrid",
        role: "Ranged",
        description: "A mounted warrior with exceptional mobility and area control.",
        stats: {
            attack: 7200,
            defense: 3000,
            skill: 6800
        },
        recommendation: 81
    }
];

/**
 * Unit Data Manager
 * Handles unit data operations and filtering
 */
export class UnitDataManager {
    constructor(units = sampleUnits) {
        this.units = units;
        this.filteredUnits = [...units];
    }
    
    /**
     * Filter units based on criteria
     */
    filterUnits(filters) {
        this.filteredUnits = this.units.filter(unit => {
            // Search text filter
            if (filters.searchText) {
                const searchLower = filters.searchText.toLowerCase();
                const matchesSearch = unit.name.toLowerCase().includes(searchLower) ||
                                    unit.description.toLowerCase().includes(searchLower) ||
                                    unit.element.toLowerCase().includes(searchLower) ||
                                    unit.type.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }
            
            // Rarity filter
            if (filters.rarity && unit.rarity !== filters.rarity) {
                return false;
            }
            
            // Element filter
            if (filters.element && unit.element !== filters.element) {
                return false;
            }
            
            // Unit type filter
            if (filters.unitType && unit.type !== filters.unitType) {
                return false;
            }
            
            // Role filter
            if (filters.role && unit.role !== filters.role) {
                return false;
            }
            
            return true;
        });
        
        return this.filteredUnits;
    }
    
    /**
     * Apply quick filters
     */
    applyQuickFilters(quickFilters) {
        let filtered = [...this.units];
        
        if (quickFilters.popular.active) {
            filtered = filtered.filter(unit => unit.recommendation >= 90);
        }
        
        if (quickFilters.highDPS.active) {
            filtered = filtered.filter(unit => unit.type === 'DPS' && unit.stats.attack >= 7000);
        }
        
        if (quickFilters.latest.active) {
            // For demo, consider units with ID > 10 as "latest"
            filtered = filtered.filter(unit => unit.id > 10);
        }
        
        if (quickFilters.beginner.active) {
            filtered = filtered.filter(unit => unit.rarity === 'Rare' || unit.rarity === 'Epic');
        }
        
        this.filteredUnits = filtered;
        return this.filteredUnits;
    }
    
    /**
     * Sort units
     */
    sortUnits(sortBy) {
        switch (sortBy) {
            case 'name':
                this.filteredUnits.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rarity':
                const rarityOrder = { 'Rare': 1, 'Epic': 2, 'Legendary': 3, 'Mythic': 4, 'Exclusive': 5 };
                this.filteredUnits.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
                break;
            case 'recommendation':
                this.filteredUnits.sort((a, b) => b.recommendation - a.recommendation);
                break;
            default:
                // Default sort by ID
                this.filteredUnits.sort((a, b) => a.id - b.id);
        }
        
        return this.filteredUnits;
    }
    
    /**
     * Get paginated units
     */
    getPaginatedUnits(page, itemsPerPage) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return this.filteredUnits.slice(startIndex, endIndex);
    }
    
    /**
     * Get unit by ID
     */
    getUnitById(id) {
        return this.units.find(unit => unit.id === id);
    }
    
    /**
     * Get all units
     */
    getAllUnits() {
        return this.units;
    }
    
    /**
     * Get filtered units
     */
    getFilteredUnits() {
        return this.filteredUnits;
    }
    
    /**
     * Get total count
     */
    getTotalCount() {
        return this.filteredUnits.length;
    }
}
