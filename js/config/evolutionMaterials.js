// Complete Evolution Materials Database for Anime Vanguards
export const EVOLUTION_MATERIALS_DATA = {
    // Vanguard Rarity Units
    "song_jinwu_igros": {
        materials: [
            {
                name: "Elixir of Life",
                type: "Special Evolution Item",
                quantity: 1,
                description: "A divine potion that can rid one of any disease",
                obtainMethod: "Complete the Red Key Quest",
                rarity: "Legendary"
            },
            {
                name: "Green Essence Stone",
                type: "Common Material",
                quantity: 30,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Legend Stages, Shops",
                rarity: "Common"
            },
            {
                name: "Blue Essence Stone",
                type: "Uncommon Material",
                quantity: 12,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Shops",
                rarity: "Uncommon"
            },
            {
                name: "Purple Essence Stone",
                type: "Rare Material",
                quantity: 11,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Shops",
                rarity: "Rare"
            },
            {
                name: "Rainbow Essence Stone",
                type: "Legendary Material",
                quantity: 2,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Legend Stages",
                rarity: "Legendary"
            }
        ],
        goldCost: 15000,
        specialRequirements: [
            "Complete Red Key Quest",
            "Kill Ant King 50 times",
            "Sacrifice 30 mythic and above units",
            "Summon 5000 Shadows with Sung Jin Woo",
            "Sacrifice evolved Igris"
        ]
    },

    "alocard_vampire_king": {
        materials: [
            {
                name: "Shadow Equipment",
                type: "Special Evolution Item",
                quantity: 1,
                description: "Shadowy armaments forged in twilight, bridging the gap between human and monster",
                obtainMethod: "Obtained upon summoning Alocard",
                rarity: "Legendary"
            },
            {
                name: "Green Essence Stone",
                type: "Common Material",
                quantity: 30,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Legend Stages, Shops",
                rarity: "Common"
            },
            {
                name: "Blue Essence Stone",
                type: "Uncommon Material",
                quantity: 12,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Shops",
                rarity: "Uncommon"
            },
            {
                name: "Red Essence Stone",
                type: "Rare Material",
                quantity: 12,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Shops",
                rarity: "Rare"
            },
            {
                name: "Rainbow Essence Stone",
                type: "Legendary Material",
                quantity: 1,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Legend Stages",
                rarity: "Legendary"
            }
        ],
        goldCost: 15000,
        specialRequirements: [
            "Reach Level 25",
            "5000 unit takedowns for maximum potential"
        ]
    },

    "saber_king_knights": {
        materials: [
            {
                name: "Avalon",
                type: "Special Evolution Item",
                quantity: 1,
                description: "Used by the King of Knights, gifted by the spirits of the lake",
                obtainMethod: "Crafting",
                rarity: "Legendary"
            },
            {
                name: "Green Essence Stone",
                type: "Common Material",
                quantity: 30,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Legend Stages, Shops",
                rarity: "Common"
            },
            {
                name: "Blue Essence Stone",
                type: "Uncommon Material",
                quantity: 12,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Shops",
                rarity: "Uncommon"
            },
            {
                name: "Purple Essence Stone",
                type: "Rare Material",
                quantity: 11,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Shops",
                rarity: "Rare"
            },
            {
                name: "Yellow Essence Stone",
                type: "Rare Material",
                quantity: 11,
                description: "An item required to evolve a unit",
                obtainMethod: "Challenges, Crafting, Shops",
                rarity: "Rare"
            }
        ],
        goldCost: 15000,
        specialRequirements: [
            "5000 takedowns to evolve",
            "Reach maximum unit level"
        ]
    }
};

// Utility functions for evolution materials
export const evolutionMaterialsUtils = {
    // Get materials for a specific unit
    getMaterialsForUnit(unitId) {
        return EVOLUTION_MATERIALS_DATA[unitId] || null;
    },

    // Validate materials data
    validateMaterialsData() {
        console.log('🔍 Validating evolution materials data...');
        
        for (const [unitId, data] of Object.entries(EVOLUTION_MATERIALS_DATA)) {
            if (!data.materials || !Array.isArray(data.materials)) {
                console.error(`❌ Invalid materials data for ${unitId}`);
                return false;
            }

            if (typeof data.goldCost !== 'number') {
                console.error(`❌ Invalid goldCost for ${unitId}`);
                return false;
            }

            if (!data.specialRequirements || !Array.isArray(data.specialRequirements)) {
                console.error(`❌ Invalid specialRequirements for ${unitId}`);
                return false;
            }
        }

        console.log('✅ Evolution materials data validation passed');
        return true;
    }
}; 