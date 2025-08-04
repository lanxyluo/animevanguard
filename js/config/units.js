// Comprehensive Units Database for Anime Vanguards
// Based on official Wiki data with accurate game information

export const unitsData = {
    // Exclusive Tier Units
    "koguro_unsealed": {
        id: "koguro_unsealed",
        name: "Koguro (Unsealed)",
        rarity: "Exclusive",
        element: "Curse",
        attackType: "Full AoE",
        unitType: "DPS",
        evolution: "Unsealed",
        stats: {
            damage: 1500,
            spa: 1.2,
            range: 8,
            dps: 1250
        },
        deploymentCost: "High",
        totalCost: "Extremely High",
        upgradeLevel: 11,
        placementLimit: 1,
        obtainment: "Spring Banner (1/20k drop rate)",
        passiveAbilities: [
            "When activating new dimension, damage increases by 20%, range increases by 10%",
            "Teleports to nearest suitable attack position when attacking",
            "Copies element of units in team"
        ],
        activeAbilities: [
            "Dimension Switch - 3 unique dimensions",
            "Deals 1000% damage to all enemies (can only use once per match)"
        ],
        pros: ["Unknown element", "Multiple summons", "3 different nukes", "Excellent range and damage"],
        cons: ["Nuke can only be used once per game", "Requires mana to use summons/nuke"],
        description: "The unsealed form of Koguro with ultimate dimensional powers"
    },

    "arc_true_ancestor": {
        id: "arc_true_ancestor",
        name: "Arc (True Ancestor)",
        rarity: "Exclusive",
        element: "Holy",
        attackType: "Circle AoE",
        unitType: "DPS",
        evolution: "True Ancestor",
        stats: {
            damage: 1200,
            spa: 0.8,
            range: 6,
            dps: 1500
        },
        deploymentCost: "Medium",
        totalCost: "High",
        upgradeLevel: 10,
        placementLimit: 2,
        obtainment: "Spring Banner + Mystic Glasses evolution",
        passiveAbilities: [
            "Bloodlust Counter - Gain bloodlust stacks when hitting bleeding enemies or killing",
            "Causes bleeding effect on hit, lasting 6 seconds, dealing 30% damage"
        ],
        activeAbilities: [
            "True Ancestor Bloodline - Special bloodline ability"
        ],
        pros: ["Holy element", "Bleeding effect", "Kill reward mechanism"],
        cons: ["Requires specific evolution item", "Limited time availability"],
        description: "The true ancestor form of Arc with holy bloodline powers"
    },

    "yehowach_almighty": {
        id: "yehowach_almighty",
        name: "Yehowach (Almighty)",
        rarity: "Secret",
        element: "Cosmic",
        attackType: "Cone AoE",
        unitType: "DPS",
        evolution: "Almighty",
        stats: {
            damage: 1800,
            spa: 1.5,
            range: 10,
            dps: 1200
        },
        deploymentCost: "High",
        totalCost: "Extremely High",
        upgradeLevel: 12,
        placementLimit: 1,
        obtainment: "Rifts (2% drop rate, guaranteed with Vowstone)",
        passiveAbilities: [
            "Almighty - Immune to status effects, gain 5% damage increase for each avoided status effect (max 30%)",
            "Future Seer - When attacking, perform additional attack on last enemy in range"
        ],
        activeAbilities: [
            "Ashen Fall - Each use increases range by 5% (max 20%)",
            "Dual Switch - Two mode switching"
        ],
        pros: ["Cosmic element", "Status effect immunity", "Dual attack mechanism", "Essential for infinite mode"],
        cons: ["Very expensive", "Requires many kills to evolve"],
        description: "The almighty form of Yehowach with cosmic powers"
    },

    // Mythic Tier Units
    "saber_alter": {
        id: "saber_alter",
        name: "Saber Alter",
        rarity: "Mythic",
        element: "Dark",
        attackType: "Single Target",
        unitType: "DPS",
        evolution: "Alter",
        stats: {
            damage: 1000,
            spa: 1.0,
            range: 5,
            dps: 1000
        },
        deploymentCost: "Medium",
        totalCost: "High",
        upgradeLevel: 9,
        placementLimit: 3,
        obtainment: "Dark Banner (5% drop rate)",
        passiveAbilities: [
            "Dark Excalibur - Attacks have 25% chance to deal double damage",
            "Corrupted Power - Damage increases by 15% when below 50% HP"
        ],
        activeAbilities: [
            "Excalibur Morgan - Ultimate dark sword technique"
        ],
        pros: ["High single target damage", "Dark element advantage", "Critical hit chance"],
        cons: ["Limited range", "Requires HP management"],
        description: "The corrupted form of Saber with dark powers"
    },

    "gilgamesh_caster": {
        id: "gilgamesh_caster",
        name: "Gilgamesh (Caster)",
        rarity: "Mythic",
        element: "Fire",
        attackType: "Full AoE",
        unitType: "DPS",
        evolution: "Caster",
        stats: {
            damage: 800,
            spa: 0.6,
            range: 12,
            dps: 1333
        },
        deploymentCost: "High",
        totalCost: "Very High",
        upgradeLevel: 10,
        placementLimit: 2,
        obtainment: "Fire Banner (3% drop rate)",
        passiveAbilities: [
            "Gate of Babylon - Attacks have 30% chance to fire additional projectiles",
            "King's Authority - Range increases by 20% when no other units are nearby"
        ],
        activeAbilities: [
            "Enuma Elish - Ultimate fire magic attack"
        ],
        pros: ["Extreme range", "Fire element", "Multiple projectile chance"],
        cons: ["Low base damage", "High deployment cost"],
        description: "The caster form of Gilgamesh with fire magic"
    },

    // Secret Tier Units
    "emiya_archer": {
        id: "emiya_archer",
        name: "Emiya (Archer)",
        rarity: "Secret",
        element: "Fire",
        attackType: "Line AoE",
        unitType: "DPS",
        evolution: "Archer",
        stats: {
            damage: 900,
            spa: 0.9,
            range: 8,
            dps: 1000
        },
        deploymentCost: "Medium",
        totalCost: "High",
        upgradeLevel: 8,
        placementLimit: 4,
        obtainment: "Fire Banner (8% drop rate)",
        passiveAbilities: [
            "Unlimited Blade Works - 20% chance to fire multiple arrows",
            "Eye of the Mind - Critical hit chance increases by 15%"
        ],
        activeAbilities: [
            "Broken Phantasm - Enhanced arrow attack"
        ],
        pros: ["Line AoE damage", "Fire element", "Multiple arrow chance"],
        cons: ["Medium range", "Requires positioning"],
        description: "The archer form of Emiya with fire arrows"
    },

    "artoria_saber": {
        id: "artoria_saber",
        name: "Artoria (Saber)",
        rarity: "Secret",
        element: "Holy",
        attackType: "Single Target",
        unitType: "DPS",
        evolution: "Saber",
        stats: {
            damage: 1100,
            spa: 1.1,
            range: 4,
            dps: 1000
        },
        deploymentCost: "Medium",
        totalCost: "High",
        upgradeLevel: 8,
        placementLimit: 4,
        obtainment: "Holy Banner (8% drop rate)",
        passiveAbilities: [
            "Excalibur - 25% chance to deal holy damage bonus",
            "Knight's Honor - Damage increases by 10% when attacking from front"
        ],
        activeAbilities: [
            "Excalibur - Holy sword technique"
        ],
        pros: ["High single target damage", "Holy element", "Front attack bonus"],
        cons: ["Short range", "Requires positioning"],
        description: "The saber form of Artoria with holy sword"
    },

    // Legendary Tier Units
    "rin_caster": {
        id: "rin_caster",
        name: "Rin (Caster)",
        rarity: "Legendary",
        element: "Fire",
        attackType: "Circle AoE",
        unitType: "DPS",
        evolution: "Caster",
        stats: {
            damage: 700,
            spa: 0.8,
            range: 6,
            dps: 875
        },
        deploymentCost: "Medium",
        totalCost: "Medium",
        upgradeLevel: 7,
        placementLimit: 5,
        obtainment: "Fire Banner (15% drop rate)",
        passiveAbilities: [
            "Gem Magic - Attacks have 15% chance to deal bonus damage",
            "Mana Burst - Attack speed increases by 10% when above 80% HP"
        ],
        activeAbilities: [
            "Gandr - Magic bullet attack"
        ],
        pros: ["Circle AoE", "Fire element", "Mana burst bonus"],
        cons: ["Medium damage", "HP dependent bonus"],
        description: "The caster form of Rin with fire magic"
    },

    "sakura_assassin": {
        id: "sakura_assassin",
        name: "Sakura (Assassin)",
        rarity: "Legendary",
        element: "Dark",
        attackType: "Single Target",
        unitType: "DPS",
        evolution: "Assassin",
        stats: {
            damage: 850,
            spa: 0.7,
            range: 3,
            dps: 1214
        },
        deploymentCost: "Low",
        totalCost: "Medium",
        upgradeLevel: 7,
        placementLimit: 5,
        obtainment: "Dark Banner (15% drop rate)",
        passiveAbilities: [
            "Shadow Step - 20% chance to attack twice",
            "Dark Presence - Damage increases by 15% when attacking from behind"
        ],
        activeAbilities: [
            "Shadow Strike - Stealth attack"
        ],
        pros: ["High attack speed", "Dark element", "Back attack bonus"],
        cons: ["Very short range", "Requires positioning"],
        description: "The assassin form of Sakura with dark powers"
    },

    // Epic Tier Units
    "shirou_archer": {
        id: "shirou_archer",
        name: "Shirou (Archer)",
        rarity: "Epic",
        element: "Fire",
        attackType: "Single Target",
        unitType: "DPS",
        evolution: "Archer",
        stats: {
            damage: 600,
            spa: 1.0,
            range: 7,
            dps: 600
        },
        deploymentCost: "Low",
        totalCost: "Low",
        upgradeLevel: 6,
        placementLimit: 6,
        obtainment: "Fire Banner (25% drop rate)",
        passiveAbilities: [
            "Projection - 10% chance to fire additional arrow",
            "Reinforcement - Damage increases by 8% when attacking same target"
        ],
        activeAbilities: [
            "Arrow Shot - Basic arrow attack"
        ],
        pros: ["Good range", "Fire element", "Projection chance"],
        cons: ["Low damage", "Single target only"],
        description: "The archer form of Shirou with fire arrows"
    },

    "illya_caster": {
        id: "illya_caster",
        name: "Illya (Caster)",
        rarity: "Epic",
        element: "Holy",
        attackType: "Circle AoE",
        unitType: "DPS",
        evolution: "Caster",
        stats: {
            damage: 550,
            spa: 0.9,
            range: 5,
            dps: 611
        },
        deploymentCost: "Low",
        totalCost: "Low",
        upgradeLevel: 6,
        placementLimit: 6,
        obtainment: "Holy Banner (25% drop rate)",
        passiveAbilities: [
            "Holy Magic - 12% chance to deal holy damage bonus",
            "Child's Innocence - Range increases by 10% when no enemies nearby"
        ],
        activeAbilities: [
            "Holy Bolt - Holy magic attack"
        ],
        pros: ["Circle AoE", "Holy element", "Range bonus"],
        cons: ["Low damage", "Conditional range bonus"],
        description: "The caster form of Illya with holy magic"
    },

    // Rare Tier Units
    "kirei_assassin": {
        id: "kirei_assassin",
        name: "Kirei (Assassin)",
        rarity: "Rare",
        element: "Dark",
        attackType: "Single Target",
        unitType: "DPS",
        evolution: "Assassin",
        stats: {
            damage: 450,
            spa: 0.8,
            range: 3,
            dps: 563
        },
        deploymentCost: "Very Low",
        totalCost: "Very Low",
        upgradeLevel: 5,
        placementLimit: 8,
        obtainment: "Dark Banner (40% drop rate)",
        passiveAbilities: [
            "Black Keys - 8% chance to deal dark damage bonus",
            "Priest's Training - Attack speed increases by 5%"
        ],
        activeAbilities: [
            "Black Key Throw - Dark weapon attack"
        ],
        pros: ["Fast attack speed", "Dark element", "Low cost"],
        cons: ["Very low damage", "Short range"],
        description: "The assassin form of Kirei with dark weapons"
    },

    "taiga_saber": {
        id: "taiga_saber",
        name: "Taiga (Saber)",
        rarity: "Rare",
        element: "Physical",
        attackType: "Single Target",
        unitType: "DPS",
        evolution: "Saber",
        stats: {
            damage: 500,
            spa: 1.2,
            range: 2,
            dps: 417
        },
        deploymentCost: "Very Low",
        totalCost: "Very Low",
        upgradeLevel: 5,
        placementLimit: 8,
        obtainment: "Physical Banner (40% drop rate)",
        passiveAbilities: [
            "Tiger Style - 10% chance to deal bonus damage",
            "Fighting Spirit - Damage increases by 5% when below 50% HP"
        ],
        activeAbilities: [
            "Tiger Strike - Physical sword attack"
        ],
        pros: ["Physical element", "Low cost", "HP dependent bonus"],
        cons: ["Very short range", "Low damage"],
        description: "The saber form of Taiga with physical attacks"
    },

    // Additional Units from Wiki Data
    "sun_shinobi_six_paths": {
        id: "sun_shinobi_six_paths",
        name: "Sun Shinobi (Six Paths)",
        rarity: "Mythic",
        element: "Fire",
        attackType: "Single Target",
        unitType: "DPS",
        evolution: "Six Paths",
        stats: {
            damage: 1400,
            spa: 0.4,
            range: 6,
            dps: 3500
        },
        deploymentCost: "High",
        totalCost: "Very High",
        upgradeLevel: 10,
        placementLimit: 2,
        obtainment: "Standard Banner (0.5% drop rate)",
        passiveAbilities: [
            "Nine-Tails Chakra - Gains chakra stacks on enemy kill, increasing damage by 8% per stack (max 10 stacks)",
            "Shadow Clone - 25% chance to attack twice"
        ],
        activeAbilities: [
            "Rasengan Barrage - Deals 500% damage to target and nearby enemies",
            "Sage Mode - Increases all stats by 50% for 30 seconds"
        ],
        pros: ["High Single Target DPS", "Stacking Damage Buff", "Multi-hit Potential"],
        cons: ["Requires enemy kills to maximize potential", "Medium range limitation"],
        description: "The Six Paths form of Sun Shinobi with ultimate ninja powers"
    },

    "golden_experience_requiem": {
        id: "golden_experience_requiem",
        name: "Golden Experience (Requiem)",
        rarity: "Secret",
        element: "Life",
        attackType: "Circle AoE",
        unitType: "Support/DPS",
        evolution: "Requiem",
        stats: {
            damage: 1000,
            spa: 1.0,
            range: 8,
            dps: 1000
        },
        deploymentCost: "Medium",
        totalCost: "High",
        upgradeLevel: 11,
        placementLimit: 1,
        obtainment: "Arrow Evolution (Requires Requiem Arrow)",
        passiveAbilities: [
            "Life Giver - Heals nearby units for 5% of damage dealt",
            "Return to Zero - 10% chance to reset enemy to previous position"
        ],
        activeAbilities: [
            "Gold Experience - Creates life forms that attack enemies",
            "Requiem Reset - Resets all enemy progress on current wave"
        ],
        pros: ["Unique Life Element", "Team Healing", "Wave Reset Ability"],
        cons: ["Requires rare evolution item", "Complex positioning needed"],
        description: "The Requiem form of Golden Experience with life manipulation powers"
    },

    "monkey_king_awakened": {
        id: "monkey_king_awakened",
        name: "Monkey King (Awakened)",
        rarity: "Legendary",
        element: "Earth",
        attackType: "Line AoE",
        unitType: "DPS",
        evolution: "Awakened",
        stats: {
            damage: 900,
            spa: 0.7,
            range: 12,
            dps: 1286
        },
        deploymentCost: "Medium",
        totalCost: "High",
        upgradeLevel: 9,
        placementLimit: 3,
        obtainment: "Standard Banner (1% drop rate)",
        passiveAbilities: [
            "72 Transformations - Changes attack type every 10 seconds",
            "Immortal Body - Immune to poison and burn effects"
        ],
        activeAbilities: [
            "Ruyi Jingu Bang - Extends range by 200% for next 5 attacks",
            "Clone Army - Summons 3 clones that deal 50% damage for 20 seconds"
        ],
        pros: ["Very Large Range", "Versatile Attack Types", "Clone Summons"],
        cons: ["Damage depends on transformation cycle", "Requires timing mastery"],
        description: "The Awakened form of Monkey King with ultimate transformation powers"
    },

    "soul_king_transcendent": {
        id: "soul_king_transcendent",
        name: "Soul King (Transcendent)",
        rarity: "Exclusive",
        element: "Spirit",
        attackType: "Full AoE",
        unitType: "Support",
        evolution: "Transcendent",
        stats: {
            damage: 800,
            spa: 2.0,
            range: 15,
            dps: 400
        },
        deploymentCost: "Very High",
        totalCost: "Extreme",
        upgradeLevel: 12,
        placementLimit: 1,
        obtainment: "Event Exclusive (Soul Society Event)",
        passiveAbilities: [
            "Soul Absorption - Gains permanent stats from each enemy killed in range",
            "Transcendent Aura - All units deal 25% more damage when in range"
        ],
        activeAbilities: [
            "Soul Prison - Stops all enemies for 10 seconds",
            "Bankai Release - Doubles all unit damage for 15 seconds"
        ],
        pros: ["Map-wide Support", "Permanent Stat Growth", "Team Damage Amplification"],
        cons: ["Extremely Expensive", "Event Limited", "Slow Attack Speed"],
        description: "The Transcendent form of Soul King with ultimate spiritual powers"
    },

    "dragon_slayer_lightning": {
        id: "dragon_slayer_lightning",
        name: "Dragon Slayer (Lightning Mode)",
        rarity: "Mythic",
        element: "Lightning",
        attackType: "Chain",
        unitType: "DPS",
        evolution: "Lightning Mode",
        stats: {
            damage: 1100,
            spa: 0.5,
            range: 7,
            dps: 2200
        },
        deploymentCost: "High",
        totalCost: "Very High",
        upgradeLevel: 10,
        placementLimit: 2,
        obtainment: "Dragon Banner (0.7% drop rate)",
        passiveAbilities: [
            "Lightning Dragon's Roar - Attacks chain to up to 5 enemies with decreasing damage",
            "Thunder Step - 20% chance to attack instantly"
        ],
        activeAbilities: [
            "Lightning Storm - Creates AoE lightning strikes for 10 seconds",
            "Dragon Force - Next 10 attacks deal double damage and chain to all enemies"
        ],
        pros: ["Chain Attack Mechanism", "High Attack Speed", "AoE Potential"],
        cons: ["Chain damage decreases significantly", "Requires enemy positioning"],
        description: "The Lightning Mode form of Dragon Slayer with chain lightning powers"
    }
};

// Unit categories for filtering
export const unitCategories = {
    byRarity: {
        "Rare": ["kirei_assassin", "taiga_saber"],
        "Epic": ["shirou_archer", "illya_caster"],
        "Legendary": ["rin_caster", "sakura_assassin", "monkey_king_awakened"],
        "Secret": ["emiya_archer", "artoria_saber", "yehowach_almighty", "golden_experience_requiem"],
        "Mythic": ["saber_alter", "gilgamesh_caster"],
        "Mythic": ["sun_shinobi_six_paths", "dragon_slayer_lightning"],
        "Exclusive": ["koguro_unsealed", "arc_true_ancestor", "soul_king_transcendent"]
    },
    byElement: {
        "Fire": ["gilgamesh_caster", "emiya_archer", "rin_caster", "shirou_archer", "sun_shinobi_six_paths"],
        "Water": [],
        "Nature": [],
        "Spark": [],
        "Holy": ["arc_true_ancestor", "artoria_saber", "illya_caster"],
        "Passion": [],
        "Blast": [],
        "Cosmic": ["yehowach_almighty"],
        "Unbound": [],
        "Unknown": ["koguro_unsealed"],
        "Dark": ["saber_alter", "sakura_assassin", "kirei_assassin"],
        "Physical": ["taiga_saber"],
        "Life": ["golden_experience_requiem"],
        "Earth": ["monkey_king_awakened"],
        "Spirit": ["soul_king_transcendent"],
        "Lightning": ["dragon_slayer_lightning"]
    },
    byAttackType: {
        "Single Target": ["saber_alter", "artoria_saber", "sakura_assassin", "shirou_archer", "kirei_assassin", "taiga_saber", "sun_shinobi_six_paths"],
        "Circle AoE": ["arc_true_ancestor", "rin_caster", "illya_caster", "golden_experience_requiem"],
        "Cone AoE": ["yehowach_almighty"],
        "Line AoE": ["emiya_archer", "monkey_king_awakened"],
        "Full AoE": ["koguro_unsealed", "gilgamesh_caster", "soul_king_transcendent"],
        "Stadium AoE": [],
        "Splash AoE": [],
        "Chain": ["dragon_slayer_lightning"]
    }
}; 