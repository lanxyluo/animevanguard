/**
 * Materials Configuration
 * Defines materials needed for unit evolution and upgrades
 */

export const materialsConfig = {
    // Evolution materials by rarity
    evolution: {
        Rare: {
            materials: [
                { name: 'Rare Crystal', amount: 10 },
                { name: 'Rare Essence', amount: 5 },
                { name: 'Basic Scroll', amount: 3 }
            ],
            gold: 5000
        },
        Epic: {
            materials: [
                { name: 'Epic Crystal', amount: 15 },
                { name: 'Epic Essence', amount: 8 },
                { name: 'Advanced Scroll', amount: 5 },
                { name: 'Rare Crystal', amount: 20 }
            ],
            gold: 15000
        },
        Legendary: {
            materials: [
                { name: 'Legendary Crystal', amount: 25 },
                { name: 'Legendary Essence', amount: 12 },
                { name: 'Master Scroll', amount: 8 },
                { name: 'Epic Crystal', amount: 30 },
                { name: 'Ancient Fragment', amount: 5 }
            ],
            gold: 50000
        },
        Mythic: {
            materials: [
                { name: 'Mythic Crystal', amount: 40 },
                { name: 'Mythic Essence', amount: 20 },
                { name: 'Divine Scroll', amount: 15 },
                { name: 'Legendary Crystal', amount: 50 },
                { name: 'Ancient Fragment', amount: 15 },
                { name: 'Divine Fragment', amount: 3 }
            ],
            gold: 150000
        }
    },
    
    // Skill upgrade materials
    skillUpgrade: {
        level1: { name: 'Basic Skill Stone', amount: 1 },
        level2: { name: 'Advanced Skill Stone', amount: 2 },
        level3: { name: 'Master Skill Stone', amount: 3 },
        level4: { name: 'Divine Skill Stone', amount: 5 },
        level5: { name: 'Legendary Skill Stone', amount: 8 }
    },
    
    // Equipment materials
    equipment: {
        weapon: {
            basic: { name: 'Iron Ore', amount: 10 },
            advanced: { name: 'Steel Ingot', amount: 5 },
            master: { name: 'Mythril Alloy', amount: 3 }
        },
        armor: {
            basic: { name: 'Leather', amount: 10 },
            advanced: { name: 'Chain Mail', amount: 5 },
            master: { name: 'Dragon Scale', amount: 3 }
        },
        accessory: {
            basic: { name: 'Gem Fragment', amount: 5 },
            advanced: { name: 'Precious Gem', amount: 3 },
            master: { name: 'Divine Gem', amount: 1 }
        }
    }
};

// Material categories for UI
export const materialCategories = {
    crystals: ['Rare Crystal', 'Epic Crystal', 'Legendary Crystal', 'Mythic Crystal'],
    essences: ['Rare Essence', 'Epic Essence', 'Legendary Essence', 'Mythic Essence'],
    scrolls: ['Basic Scroll', 'Advanced Scroll', 'Master Scroll', 'Divine Scroll'],
    fragments: ['Ancient Fragment', 'Divine Fragment'],
    skillStones: ['Basic Skill Stone', 'Advanced Skill Stone', 'Master Skill Stone', 'Divine Skill Stone', 'Legendary Skill Stone'],
    equipment: ['Iron Ore', 'Steel Ingot', 'Mythril Alloy', 'Leather', 'Chain Mail', 'Dragon Scale', 'Gem Fragment', 'Precious Gem', 'Divine Gem']
};

// Material rarity mapping
export const materialRarity = {
    'Rare Crystal': 'Rare',
    'Rare Essence': 'Rare',
    'Basic Scroll': 'Rare',
    'Epic Crystal': 'Epic',
    'Epic Essence': 'Epic',
    'Advanced Scroll': 'Epic',
    'Legendary Crystal': 'Legendary',
    'Legendary Essence': 'Legendary',
    'Master Scroll': 'Legendary',
    'Ancient Fragment': 'Legendary',
    'Mythic Crystal': 'Mythic',
    'Mythic Essence': 'Mythic',
    'Divine Scroll': 'Mythic',
    'Divine Fragment': 'Mythic'
};
