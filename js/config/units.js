// Comprehensive Units Database for Anime Vanguards
// Updated with mainstream anime characters

export const unitsData = [
    // ====== MYTHIC TIER UNITS ======
    {
        id: "goku_ultra_instinct",
        name: "Goku (Ultra Instinct)",
        rarity: "Mythic",
        element: "Energy",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "Ultra Instinct",
        stats: {
            damage: 2000,
            spa: 0.8,
            range: 4,
            dps: 2500
        },
        deploymentCost: "Extremely High",
        totalCost: "Extremely High",
        upgradeLevel: 15,
        placementLimit: 1,
        obtainment: "Dragon Ball Banner (0.1% drop rate)",
        passiveAbilities: [
            "Ultra Instinct - Automatically dodges 80% of incoming attacks",
            "God Ki - Damage increases by 50% when below 30% HP",
            "Limitless Potential - Stats increase by 10% every 10 seconds"
        ],
        activeAbilities: [
            "Kamehameha Wave - Deals 500% damage to all enemies in line",
            "Instant Transmission - Teleports to any position on the field"
        ],
        pros: ["Highest damage potential", "Auto-dodge ability", "Teleportation", "God-tier stats"],
        cons: ["Extremely expensive", "Very rare", "High deployment cost"],
        description: "The ultimate form of Goku with Ultra Instinct mastery"
    },

    {
        id: "saitama",
        name: "Saitama",
        rarity: "Mythic",
        element: "Physical",
        attackType: "Full AoE",
        unitType: "Melee",
        evolution: "One Punch Man",
        stats: {
            damage: 3000,
            spa: 2.0,
            range: 3,
            dps: 1500
        },
        deploymentCost: "Extremely High",
        totalCost: "Extremely High",
        upgradeLevel: 15,
        placementLimit: 1,
        obtainment: "One Punch Man Banner (0.1% drop rate)",
        passiveAbilities: [
            "One Punch - 100% chance to instantly kill any enemy below 50% HP",
            "Unlimited Power - Cannot be stunned, frozen, or controlled",
            "Hero's Pride - Damage increases by 100% when fighting bosses"
        ],
        activeAbilities: [
            "Serious Punch - Deals 1000% damage to all enemies (60s cooldown)",
            "Consecutive Normal Punches - Rapid attack sequence"
        ],
        pros: ["Instant kill ability", "Boss killer", "Immune to status effects", "Massive damage"],
        cons: ["Very slow attack speed", "Extremely expensive", "Limited range"],
        description: "The strongest hero who can defeat any enemy with one punch"
    },

    // ====== LEGENDARY TIER UNITS ======
    {
        id: "goku_base",
        name: "Goku",
        rarity: "Legendary",
        element: "Energy",
        attackType: "Single Target",
        unitType: "Ranged",
        evolution: "Base Form",
        stats: {
            damage: 1200,
            spa: 1.2,
            range: 8,
            dps: 1000
        },
        deploymentCost: "High",
        totalCost: "Very High",
        upgradeLevel: 12,
        placementLimit: 2,
        obtainment: "Dragon Ball Banner (2% drop rate)",
        passiveAbilities: [
            "Saiyan Blood - Damage increases by 20% when below 50% HP",
            "Fighting Spirit - Attack speed increases by 15% for each enemy killed"
        ],
        activeAbilities: [
            "Kamehameha - Deals 300% damage to target and nearby enemies",
            "Kaioken - Temporarily doubles all stats for 10 seconds"
        ],
        pros: ["High damage output", "Good range", "Saiyan transformation", "Versatile abilities"],
        cons: ["High cost", "Requires HP management", "Limited placement"],
        description: "The legendary Saiyan warrior with incredible fighting potential"
    },

    {
        id: "naruto_kcm",
        name: "Naruto (KCM)",
        rarity: "Legendary",
        element: "Wind",
        attackType: "Circle AoE",
        unitType: "Hybrid",
        evolution: "Kurama Chakra Mode",
        stats: {
            damage: 1000,
            spa: 1.0,
            range: 6,
            dps: 1000
        },
        deploymentCost: "High",
        totalCost: "Very High",
        upgradeLevel: 12,
        placementLimit: 2,
        obtainment: "Naruto Banner (2% drop rate)",
        passiveAbilities: [
            "Kurama Chakra - Regenerates 5% HP per second",
            "Wind Affinity - Wind element attacks deal 50% more damage",
            "Nine Tails Power - Damage increases by 30% when HP is full"
        ],
        activeAbilities: [
            "Rasengan - Deals 400% damage to target and stuns for 3 seconds",
            "Shadow Clone Jutsu - Creates 2 clones that fight alongside"
        ],
        pros: ["Self-healing", "Wind element mastery", "Clone ability", "Good AoE"],
        cons: ["High cost", "Requires full HP for bonus", "Medium range"],
        description: "Naruto in his powerful Kurama Chakra Mode"
    },

    // ====== EPIC TIER UNITS ======
    {
        id: "ichigo",
        name: "Ichigo",
        rarity: "Epic",
        element: "Soul",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "Bankai",
        stats: {
            damage: 800,
            spa: 1.5,
            range: 3,
            dps: 533
        },
        deploymentCost: "Medium",
        totalCost: "High",
        upgradeLevel: 10,
        placementLimit: 3,
        obtainment: "Bleach Banner (8% drop rate)",
        passiveAbilities: [
            "Soul Reaper - Can attack ethereal enemies",
            "Bankai Power - Damage increases by 25% when below 40% HP",
            "Spiritual Pressure - Reduces enemy attack speed by 20%"
        ],
        activeAbilities: [
            "Getsuga Tensho - Deals 250% damage to target and nearby enemies",
            "Bankai Release - Temporarily increases damage by 100% for 15 seconds"
        ],
        pros: ["Anti-ethereal", "High burst damage", "Attack speed reduction", "Good survivability"],
        cons: ["Low range", "Requires HP management", "Medium cost"],
        description: "The powerful Soul Reaper with Bankai transformation"
    },

    {
        id: "luffy_gear4",
        name: "Luffy (Gear 4)",
        rarity: "Epic",
        element: "Physical",
        attackType: "Cone AoE",
        unitType: "Melee",
        evolution: "Gear 4",
        stats: {
            damage: 900,
            spa: 1.8,
            range: 4,
            dps: 500
        },
        deploymentCost: "Medium",
        totalCost: "High",
        upgradeLevel: 10,
        placementLimit: 3,
        obtainment: "One Piece Banner (8% drop rate)",
        passiveAbilities: [
            "Rubber Body - Takes 30% less damage from physical attacks",
            "Haki Mastery - Can hit any enemy type including logia",
            "Gear 4 Power - Attack speed increases by 40% when below 30% HP"
        ],
        activeAbilities: [
            "Gomu Gomu no King Kong Gun - Deals 350% damage to all enemies in cone",
            "Gear 4 Transformation - Increases all stats by 50% for 20 seconds"
        ],
        pros: ["Physical damage reduction", "Can hit all enemy types", "High burst damage", "Good AoE"],
        cons: ["Low range", "Slow attack speed", "Requires HP management"],
        description: "Luffy in his powerful Gear 4 transformation"
    },

    {
        id: "tanjiro_sun_breathing",
        name: "Tanjiro (Sun Breathing)",
        rarity: "Epic",
        element: "Fire",
        attackType: "Line AoE",
        unitType: "Melee",
        evolution: "Sun Breathing",
        stats: {
            damage: 750,
            spa: 1.3,
            range: 5,
            dps: 577
        },
        deploymentCost: "Medium",
        totalCost: "High",
        upgradeLevel: 10,
        placementLimit: 3,
        obtainment: "Demon Slayer Banner (8% drop rate)",
        passiveAbilities: [
            "Sun Breathing - Fire attacks deal 40% more damage",
            "Demon Slayer - Deals 50% more damage to demon-type enemies",
            "Water Breathing Mastery - Can switch to water element when needed"
        ],
        activeAbilities: [
            "Hinokami Kagura - Deals 300% damage to all enemies in line",
            "Sun Breathing Form - Increases damage and range by 30% for 15 seconds"
        ],
        pros: ["Fire element mastery", "Anti-demon bonus", "Good line AoE", "Element switching"],
        cons: ["Medium range", "Requires positioning", "Medium cost"],
        description: "Tanjiro mastering the legendary Sun Breathing technique"
    },

    // ====== RARE TIER UNITS ======
    {
        id: "tanjiro_base",
        name: "Tanjiro",
        rarity: "Rare",
        element: "Water",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "Water Breathing",
        stats: {
            damage: 500,
            spa: 1.0,
            range: 3,
            dps: 500
        },
        deploymentCost: "Low",
        totalCost: "Medium",
        upgradeLevel: 8,
        placementLimit: 4,
        obtainment: "Demon Slayer Banner (15% drop rate)",
        passiveAbilities: [
            "Water Breathing - Water attacks deal 25% more damage",
            "Demon Slayer - Deals 30% more damage to demon-type enemies",
            "Enhanced Senses - Can detect invisible enemies"
        ],
        activeAbilities: [
            "Water Wheel - Deals 200% damage to target and nearby enemies",
            "Water Breathing Form - Increases damage by 40% for 10 seconds"
        ],
        pros: ["Water element mastery", "Anti-demon bonus", "Invisible detection", "Good value"],
        cons: ["Low range", "Basic abilities", "Limited AoE"],
        description: "The determined demon slayer with water breathing technique"
    },

    {
        id: "naruto_base",
        name: "Naruto",
        rarity: "Rare",
        element: "Wind",
        attackType: "Single Target",
        unitType: "Ranged",
        evolution: "Base Form",
        stats: {
            damage: 450,
            spa: 1.2,
            range: 6,
            dps: 375
        },
        deploymentCost: "Low",
        totalCost: "Medium",
        upgradeLevel: 8,
        placementLimit: 4,
        obtainment: "Naruto Banner (15% drop rate)",
        passiveAbilities: [
            "Wind Affinity - Wind attacks deal 25% more damage",
            "Uzumaki Stamina - Regenerates 2% HP per second",
            "Nine Tails Chakra - Damage increases by 20% when HP is full"
        ],
        activeAbilities: [
            "Rasengan - Deals 180% damage to target",
            "Shadow Clone Jutsu - Creates 1 clone for 10 seconds"
        ],
        pros: ["Wind element mastery", "Self-healing", "Clone ability", "Good range"],
        cons: ["Low damage", "Basic abilities", "Limited AoE"],
        description: "The young ninja with wind chakra and shadow clone technique"
    },

    {
        id: "luffy_base",
        name: "Luffy",
        rarity: "Rare",
        element: "Physical",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "Base Form",
        stats: {
            damage: 550,
            spa: 1.5,
            range: 2,
            dps: 367
        },
        deploymentCost: "Low",
        totalCost: "Medium",
        upgradeLevel: 8,
        placementLimit: 4,
        obtainment: "One Piece Banner (15% drop rate)",
        passiveAbilities: [
            "Rubber Body - Takes 20% less damage from physical attacks",
            "Straw Hat Captain - Nearby allies gain 10% damage increase",
            "Will of D - Cannot be stunned or controlled"
        ],
        activeAbilities: [
            "Gomu Gomu no Pistol - Deals 200% damage to target",
            "Gear 2 - Increases attack speed by 50% for 8 seconds"
        ],
        pros: ["Physical damage reduction", "Team buff", "Stun immunity", "Good burst"],
        cons: ["Very low range", "Slow attack speed", "Basic abilities"],
        description: "The rubber-powered pirate captain with unbreakable will"
    },

    // ====== UNCOMMON TIER UNITS ======
    {
        id: "zenitsu",
        name: "Zenitsu",
        rarity: "Uncommon",
        element: "Lightning",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "Thunder Breathing",
        stats: {
            damage: 300,
            spa: 0.8,
            range: 3,
            dps: 375
        },
        deploymentCost: "Very Low",
        totalCost: "Low",
        upgradeLevel: 6,
        placementLimit: 5,
        obtainment: "Demon Slayer Banner (25% drop rate)",
        passiveAbilities: [
            "Thunder Breathing - Lightning attacks deal 30% more damage",
            "Sleeping Power - Damage increases by 100% when asleep (random chance)",
            "Lightning Speed - Attack speed increases by 25% when awake"
        ],
        activeAbilities: [
            "Thunderclap and Flash - Deals 150% damage to target",
            "Lightning Form - Increases damage by 60% for 5 seconds"
        ],
        pros: ["Lightning element mastery", "High burst potential", "Fast attacks", "Good value"],
        cons: ["Random power boost", "Low range", "Unpredictable performance"],
        description: "The lightning-fast demon slayer with thunder breathing technique"
    },

    {
        id: "inosuke",
        name: "Inosuke",
        rarity: "Uncommon",
        element: "Physical",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "Beast Breathing",
        stats: {
            damage: 350,
            spa: 1.0,
            range: 2,
            dps: 350
        },
        deploymentCost: "Very Low",
        totalCost: "Low",
        upgradeLevel: 6,
        placementLimit: 5,
        obtainment: "Demon Slayer Banner (25% drop rate)",
        passiveAbilities: [
            "Beast Breathing - Physical attacks deal 25% more damage",
            "Wild Instinct - Can detect enemies through walls",
            "Boar Mask - Takes 15% less damage from all sources"
        ],
        activeAbilities: [
            "Beast Fang - Deals 180% damage to target",
            "Wild Charge - Increases movement speed and damage by 40% for 6 seconds"
        ],
        pros: ["Physical damage bonus", "Wall detection", "Damage reduction", "Good burst"],
        cons: ["Very low range", "Basic abilities", "Limited utility"],
        description: "The wild demon slayer with beast breathing technique"
    },

    // ====== COMMON TIER UNITS ======
    {
        id: "swordsman",
        name: "Swordsman",
        rarity: "Common",
        element: "Physical",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "None",
        stats: {
            damage: 200,
            spa: 1.0,
            range: 2,
            dps: 200
        },
        deploymentCost: "Very Low",
        totalCost: "Very Low",
        upgradeLevel: 5,
        placementLimit: 6,
        obtainment: "Common Banner (40% drop rate)",
        passiveAbilities: [
            "Sword Mastery - Physical attacks deal 15% more damage",
            "Basic Training - Cannot be stunned by weak attacks"
        ],
        activeAbilities: [
            "Slash - Deals 120% damage to target"
        ],
        pros: ["Very cheap", "Physical damage bonus", "Stun resistance", "Easy to obtain"],
        cons: ["Low damage", "Very low range", "Basic abilities", "No evolution"],
        description: "A basic swordsman with fundamental combat training"
    },

    {
        id: "archer",
        name: "Archer",
        rarity: "Common",
        element: "Physical",
        attackType: "Single Target",
        unitType: "Ranged",
        evolution: "None",
        stats: {
            damage: 180,
            spa: 1.2,
            range: 8,
            dps: 150
        },
        deploymentCost: "Very Low",
        totalCost: "Very Low",
        upgradeLevel: 5,
        placementLimit: 6,
        obtainment: "Common Banner (40% drop rate)",
        passiveAbilities: [
            "Bow Mastery - Ranged attacks deal 15% more damage",
            "Eagle Eye - Can attack flying enemies"
        ],
        activeAbilities: [
            "Precise Shot - Deals 110% damage to target"
        ],
        pros: ["Very cheap", "Good range", "Anti-flying", "Easy to obtain"],
        cons: ["Low damage", "Basic abilities", "No evolution", "Limited utility"],
        description: "A basic archer with fundamental ranged combat skills"
    },

    // ====== REAL ANIME VANGUARDS EVOLUTION UNITS ======
    {
        id: "alocard",
        name: "Alocard",
        rarity: "Mythic",
        element: "Dark",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "Alocard (Vampire King)",
        stats: {
            damage: 1800,
            spa: 1.5,
            range: 3,
            dps: 1200
        },
        deploymentCost: "Extremely High",
        totalCost: "Extremely High",
        upgradeLevel: 15,
        placementLimit: 1,
        obtainment: "Hellsing Banner (0.1% drop rate)",
        passiveAbilities: [
            "Vampire Blood - Heals 10% HP for each enemy killed",
            "Dark Aura - Reduces enemy attack by 20% within range",
            "Immortal - Cannot be killed by normal attacks below 10% HP"
        ],
        activeAbilities: [
            "Blood Drain - Deals 300% damage and heals for 50% of damage dealt",
            "Dark Transformation - Increases all stats by 100% for 15 seconds"
        ],
        pros: ["Self-healing", "Dark element", "Immortal ability", "High damage"],
        cons: ["Very expensive", "Limited range", "Dark element weakness"],
        description: "The legendary vampire from Hellsing with dark powers"
    },

    {
        id: "songjinwu",
        name: "Song Jinwu",
        rarity: "Mythic",
        element: "Dark",
        attackType: "Full AoE",
        unitType: "Ranged",
        evolution: "Song Jinwu (Monarch)",
        stats: {
            damage: 2200,
            spa: 2.0,
            range: 6,
            dps: 1100
        },
        deploymentCost: "Extremely High",
        totalCost: "Extremely High",
        upgradeLevel: 15,
        placementLimit: 1,
        obtainment: "Solo Leveling Banner (0.1% drop rate)",
        passiveAbilities: [
            "Shadow Monarch - Controls shadows to attack enemies",
            "Monarch's Authority - All allies within range gain 30% damage boost",
            "Shadow Step - Can teleport to any shadow on the field"
        ],
        activeAbilities: [
            "Shadow Army - Summons shadow soldiers to fight",
            "Monarch's Wrath - Deals 500% damage to all enemies"
        ],
        pros: ["Shadow element", "Team buff", "Teleportation", "Massive AoE"],
        cons: ["Very expensive", "Complex abilities", "Shadow element weakness"],
        description: "The Shadow Monarch from Solo Leveling with ultimate shadow powers"
    },

    {
        id: "igros",
        name: "Igros",
        rarity: "Mythic",
        element: "Physical",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "Igros (Elite Knight)",
        stats: {
            damage: 2000,
            spa: 1.8,
            range: 2,
            dps: 1111
        },
        deploymentCost: "Extremely High",
        totalCost: "Extremely High",
        upgradeLevel: 15,
        placementLimit: 1,
        obtainment: "Knight Banner (0.1% drop rate)",
        passiveAbilities: [
            "Elite Knight - Physical attacks deal 50% more damage",
            "Knight's Honor - Cannot be controlled or stunned",
            "Blood Red Armor - Reduces incoming damage by 40%"
        ],
        activeAbilities: [
            "Knight's Charge - Deals 400% damage and stuns target",
            "Elite Formation - Buffs all nearby allies with 50% damage boost"
        ],
        pros: ["High physical damage", "Damage reduction", "Team buff", "Stun immunity"],
        cons: ["Very expensive", "Low range", "Physical element weakness"],
        description: "The elite knight with unmatched physical combat skills"
    },

    {
        id: "obita",
        name: "Obita",
        rarity: "Mythic",
        element: "Fire",
        attackType: "Single Target",
        unitType: "Ranged",
        evolution: "Obita (Awakened)",
        stats: {
            damage: 1900,
            spa: 1.6,
            range: 7,
            dps: 1187
        },
        deploymentCost: "Extremely High",
        totalCost: "Extremely High",
        upgradeLevel: 15,
        placementLimit: 1,
        obtainment: "Fire Banner (0.1% drop rate)",
        passiveAbilities: [
            "Awakened Power - Fire attacks deal 60% more damage",
            "Flame Aura - Burns enemies for 20% damage over time",
            "Fire Immunity - Immune to fire damage"
        ],
        activeAbilities: [
            "Flame Burst - Deals 350% damage to target and nearby enemies",
            "Awakened Form - Transforms and increases all stats by 80%"
        ],
        pros: ["High fire damage", "Burn effect", "Fire immunity", "Good range"],
        cons: ["Very expensive", "Fire element weakness", "Complex abilities"],
        description: "The awakened fire user with devastating flame powers"
    },

    {
        id: "noruto",
        name: "Noruto",
        rarity: "Mythic",
        element: "Wind",
        attackType: "Full AoE",
        unitType: "Ranged",
        evolution: "Noruto (Six Tails)",
        stats: {
            damage: 2100,
            spa: 1.9,
            range: 5,
            dps: 1105
        },
        deploymentCost: "Extremely High",
        totalCost: "Extremely High",
        upgradeLevel: 15,
        placementLimit: 1,
        obtainment: "Naruto Banner (0.1% drop rate)",
        passiveAbilities: [
            "Six Tails Chakra - Wind attacks deal 50% more damage",
            "Chakra Mode - Increases attack speed by 30%",
            "Wind Mastery - Can attack through walls"
        ],
        activeAbilities: [
            "Wind Release - Deals 400% damage to all enemies",
            "Six Tails Transformation - Increases all stats by 100% for 20 seconds"
        ],
        pros: ["High wind damage", "Attack speed boost", "Wall penetration", "Massive AoE"],
        cons: ["Very expensive", "Wind element weakness", "Complex transformation"],
        description: "The Six Tails jinchuriki with devastating wind powers"
    },

    {
        id: "gujo",
        name: "Gujo",
        rarity: "Mythic",
        element: "Energy",
        attackType: "Single Target",
        unitType: "Ranged",
        evolution: "Gujo (Infinity)",
        stats: {
            damage: 2400,
            spa: 2.2,
            range: 8,
            dps: 1090
        },
        deploymentCost: "Extremely High",
        totalCost: "Extremely High",
        upgradeLevel: 15,
        placementLimit: 1,
        obtainment: "Cursed Banner (0.1% drop rate)",
        passiveAbilities: [
            "Infinity - Cannot be killed by normal attacks",
            "Cursed Energy - Energy attacks deal 70% more damage",
            "Domain Expansion - Creates a barrier that reduces enemy damage by 50%"
        ],
        activeAbilities: [
            "Infinity Void - Deals 600% damage and stuns all enemies",
            "Cursed Technique - Increases all stats by 120% for 25 seconds"
        ],
        pros: ["Immortality", "High energy damage", "Domain barrier", "Massive damage"],
        cons: ["Very expensive", "Complex abilities", "Energy element weakness"],
        description: "The cursed user with infinity technique and immortality"
    },

    {
        id: "rengoku",
        name: "Rengoku",
        rarity: "Mythic",
        element: "Fire",
        attackType: "Single Target",
        unitType: "Melee",
        evolution: "Rengoku (Purgatory)",
        stats: {
            damage: 2300,
            spa: 1.7,
            range: 4,
            dps: 1352
        },
        deploymentCost: "Extremely High",
        totalCost: "Extremely High",
        upgradeLevel: 15,
        placementLimit: 1,
        obtainment: "Demon Slayer Banner (0.1% drop rate)",
        passiveAbilities: [
            "Purgatory Flame - Fire attacks deal 80% more damage",
            "Flame Hashira - Cannot be burned or affected by fire",
            "Burning Spirit - Damage increases by 50% when below 30% HP"
        ],
        activeAbilities: [
            "Flame Breathing - Deals 450% damage to target and burns enemies",
            "Purgatory Form - Increases all stats by 90% and becomes immune to damage"
        ],
        pros: ["High fire damage", "Fire immunity", "Damage boost at low HP", "Burning effect"],
        cons: ["Very expensive", "Fire element weakness", "Complex abilities"],
        description: "The Flame Hashira with purgatory flame powers"
    },

    // ====== LIGHT ELEMENT UNIT ======
    {
        id: "allmight",
        name: "All Might",
        rarity: "Legendary",
        element: "Light",
        attackType: "Full AoE",
        unitType: "Melee",
        evolution: "All Might (Prime)",
        stats: {
            damage: 1800,
            spa: 1.2,
            range: 5,
            dps: 1500
        },
        deploymentCost: "Very High",
        totalCost: "Very High",
        upgradeLevel: 12,
        placementLimit: 1,
        obtainment: "My Hero Academia Banner (0.5% drop rate)",
        passiveAbilities: [
            "Symbol of Peace - Allies gain 30% damage boost",
            "One For All - Damage increases by 10% per enemy defeated",
            "Plus Ultra - Cannot be stunned or debuffed"
        ],
        activeAbilities: [
            "Detroit Smash - Deals 400% damage to all enemies",
            "United States of Smash - Ultimate attack dealing 800% damage"
        ],
        pros: ["High AoE damage", "Team support", "Status immunity", "Scaling damage"],
        cons: ["Very expensive", "Limited placement", "Requires setup"],
        description: "The Symbol of Peace with overwhelming light-based power"
    }
];

// Unit categorization and filtering constants
export const UNIT_RARITIES = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
export const UNIT_ELEMENTS = ['All Elements', 'Fire', 'Water', 'Wind', 'Lightning', 'Dark', 'Light', 'Physical', 'Energy', 'Soul'];
export const UNIT_ATTACK_TYPES = ['All Types', 'Melee', 'Ranged', 'Support', 'Hybrid'];
export const UNIT_SERIES = ['All Series', 'Dragon Ball', 'Naruto', 'One Piece', 'Demon Slayer', 'Bleach', 'One Punch Man', 'Generic'];

// Color mapping for UI
export const RARITY_COLORS = {
    'Common': '#9CA3AF',      // Gray
    'Uncommon': '#10B981',    // Green
    'Rare': '#3B82F6',       // Blue
    'Epic': '#8B5CF6',       // Purple
    'Legendary': '#F59E0B',   // Orange
    'Mythic': '#EF4444'      // Red
};

export const ELEMENT_COLORS = {
    'Fire': '#EF4444',        // Red
    'Water': '#3B82F6',      // Blue
    'Wind': '#10B981',       // Green
    'Lightning': '#F59E0B',  // Orange
    'Dark': '#8B5CF6',       // Purple
    'Light': '#FCD34D',      // Yellow
    'Physical': '#6B7280',   // Gray
    'Energy': '#EC4899',     // Pink
    'Soul': '#8B5CF6',       // Purple
    'Earth': '#A0522D',      // Brown
    'Shadow': '#1F2937'      // Dark Gray
};
