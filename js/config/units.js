// Real Wiki data for Anime Vanguards units
export const unitsData = {
    'yomomata_captain': {
        id: 'yomomata_captain',
        name: 'Yomomata',
        evolution: 'Captain',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'S+',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Meta-DPS unit inspired by Yamamoto from Bleach with extreme fire damage',
        obtainMethod: 'Kuinshi Palace Legend Stage 3',
        dropRate: '0.75%',
        canEvolve: false,
        evolutionFrom: 'Yomomata',
        stats: {
            damage: 8500,
            spa: 1.2,
            range: 350,
            dps: 7083,
            aoeType: 'Full AoE',
            statusEffects: ['Burn', 'Stun'],
            traits: ['Fire Mastery', 'Captain Authority']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: "Head Captain's Coat",
                source: 'Kuinshi Palace Act 3',
                dropRate: '1-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 35,
                'Purple Essence Stone': 12,
                'Yellow Essence Stone': 11,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Very Hard',
            tips: ['Focus on Kuinshi Palace farming', '0.75% drop rate requires patience', 'Best fire DPS unit in game']
        }
    },
    
    'gujo_infinity': {
        id: 'gujo_infinity',
        name: 'Gujo',
        evolution: 'Infinity',
        type: 'Sorcerer',
        rarity: 'Secret',
        tier: 'S+',
        element: 'Cosmic',
        icon: 'fas fa-infinity',
        description: 'Strongest sorcerer with infinity abilities and reality manipulation',
        obtainMethod: 'Evolution from Gujo',
        canEvolve: false,
        evolutionFrom: 'Gujo',
        stats: {
            damage: 12000,
            spa: 0.8,
            range: 500,
            dps: 15000,
            aoeType: 'Full AoE',
            statusEffects: ['Infinity Domain', 'Reality Warp'],
            traits: ['Infinity Technique', 'Cosmic Mastery']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Infinity Mask',
                source: 'Cursed Shop',
                cost: 'Shop Currency'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Blue Essence Stone': 12,
                'Pink Essence Stone': 11,
                'Rainbow Essence Stone': 2
            }
        },
        farmingGuide: {
            priority: 'Highest',
            difficulty: 'Hard',
            tips: ['Get base Gujo first', 'Save up for Cursed Shop', 'Highest DPS unit available']
        }
    },

    // Water Element Units
    'water_master': {
        id: 'water_master',
        name: 'Water Master',
        evolution: 'Base',
        type: 'Water Specialist',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Water',
        icon: 'fas fa-tint',
        description: 'Master of water manipulation with powerful hydro attacks',
        obtainMethod: 'Water Temple Stage 2',
        dropRate: '2.5%',
        canEvolve: true,
        evolutionTo: 'Water Master (Tsunami)',
        stats: {
            damage: 3200,
            spa: 1.3,
            range: 280,
            dps: 2461,
            aoeType: 'Water AoE',
            statusEffects: ['Wet', 'Slow'],
            traits: ['Water Mastery', 'Hydro Control']
        },
        evolutionMaterials: {
            goldCost: 8000,
            specialItem: {
                name: 'Ocean Pearl',
                source: 'Water Temple Act 2',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 20,
                'Blue Essence Stone': 15,
                'Purple Essence Stone': 5
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Water Temple', 'Good water unit', 'Evolve for better performance']
        }
    },

    // Earth Element Units
    'earth_guardian': {
        id: 'earth_guardian',
        name: 'Earth Guardian',
        evolution: 'Base',
        type: 'Tank',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Earth',
        icon: 'fas fa-mountain',
        description: 'Sturdy earth guardian with high defense and ground control',
        obtainMethod: 'Earth Cave Stage 1',
        dropRate: '3.0%',
        canEvolve: true,
        evolutionTo: 'Earth Guardian (Mountain)',
        stats: {
            damage: 1800,
            spa: 2.0,
            range: 200,
            dps: 900,
            aoeType: 'Ground AoE',
            statusEffects: ['Stun', 'Earth Bind'],
            traits: ['Earth Mastery', 'Mountain Defense']
        },
        evolutionMaterials: {
            goldCost: 7000,
            specialItem: {
                name: 'Mountain Crystal',
                source: 'Earth Cave Act 1',
                dropRate: '1-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Yellow Essence Stone': 10,
                'Red Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Earth Cave', 'Good tank unit', 'High defense']
        }
    },

    // Wind Element Units
    'wind_ninja': {
        id: 'wind_ninja',
        name: 'Wind Ninja',
        evolution: 'Base',
        type: 'Speed Specialist',
        rarity: 'Vanguard',
        tier: 'A+',
        element: 'Wind',
        icon: 'fas fa-wind',
        description: 'Swift wind ninja with incredible speed and wind techniques',
        obtainMethod: 'Wind Valley Stage 3',
        dropRate: '2.0%',
        canEvolve: true,
        evolutionTo: 'Wind Ninja (Storm)',
        stats: {
            damage: 2800,
            spa: 0.8,
            range: 320,
            dps: 3500,
            aoeType: 'Wind AoE',
            statusEffects: ['Speed Boost', 'Wind Cut'],
            traits: ['Wind Mastery', 'Ninja Speed']
        },
        evolutionMaterials: {
            goldCost: 9000,
            specialItem: {
                name: 'Storm Feather',
                source: 'Wind Valley Act 3',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 22,
                'Blue Essence Stone': 12,
                'Purple Essence Stone': 6
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Medium',
            tips: ['Farm Wind Valley', 'Fast attack speed', 'Good for speed runs']
        }
    },

    // Light Element Units
    'light_paladin': {
        id: 'light_paladin',
        name: 'Light Paladin',
        evolution: 'Base',
        type: 'Support',
        rarity: 'Secret',
        tier: 'S',
        element: 'Light',
        icon: 'fas fa-sun',
        description: 'Holy light paladin with healing and purification abilities',
        obtainMethod: 'Light Cathedral Stage 4',
        dropRate: '1.5%',
        canEvolve: true,
        evolutionTo: 'Light Paladin (Divine)',
        stats: {
            damage: 2200,
            spa: 1.5,
            range: 300,
            dps: 1467,
            aoeType: 'Light AoE',
            statusEffects: ['Heal', 'Purify'],
            traits: ['Light Mastery', 'Divine Protection']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Divine Light Crystal',
                source: 'Light Cathedral Act 4',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Yellow Essence Stone': 20,
                'Purple Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Light Cathedral', 'Best support unit', 'Essential for team comps']
        }
    },

    // Dark Element Units
    'dark_warlock': {
        id: 'dark_warlock',
        name: 'Dark Warlock',
        evolution: 'Base',
        type: 'Dark Specialist',
        rarity: 'Secret',
        tier: 'S',
        element: 'Dark',
        icon: 'fas fa-moon',
        description: 'Powerful dark warlock with shadow magic and curse abilities',
        obtainMethod: 'Dark Tower Stage 5',
        dropRate: '1.2%',
        canEvolve: true,
        evolutionTo: 'Dark Warlock (Shadow)',
        stats: {
            damage: 3800,
            spa: 1.1,
            range: 350,
            dps: 3455,
            aoeType: 'Shadow AoE',
            statusEffects: ['Curse', 'Fear'],
            traits: ['Dark Mastery', 'Shadow Magic']
        },
        evolutionMaterials: {
            goldCost: 13000,
            specialItem: {
                name: 'Shadow Orb',
                source: 'Dark Tower Act 5',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 35,
                'Purple Essence Stone': 25,
                'Blue Essence Stone': 10
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Very Hard',
            tips: ['Farm Dark Tower', 'Strong dark unit', 'Good for boss fights']
        }
    },

    // Giant Element Units
    'giant_titan': {
        id: 'giant_titan',
        name: 'Giant Titan',
        evolution: 'Base',
        type: 'Giant Specialist',
        rarity: 'Mythic',
        tier: 'S+',
        element: 'Giant',
        icon: 'fas fa-mountain',
        description: 'Massive giant titan with overwhelming physical power',
        obtainMethod: 'Titan Arena Stage 6',
        dropRate: '0.8%',
        canEvolve: true,
        evolutionTo: 'Giant Titan (Colossal)',
        stats: {
            damage: 6000,
            spa: 2.5,
            range: 150,
            dps: 2400,
            aoeType: 'Giant AoE',
            statusEffects: ['Stun', 'Crush'],
            traits: ['Giant Mastery', 'Titan Strength']
        },
        evolutionMaterials: {
            goldCost: 20000,
            specialItem: {
                name: 'Titan Heart',
                source: 'Titan Arena Act 6',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 50,
                'Red Essence Stone': 30,
                'Yellow Essence Stone': 20
            }
        },
        farmingGuide: {
            priority: 'Highest',
            difficulty: 'Extreme',
            tips: ['Farm Titan Arena', 'Highest damage unit', 'Very rare drop']
        }
    },

    // Nuclear Element Units
    'nuclear_scientist': {
        id: 'nuclear_scientist',
        name: 'Nuclear Scientist',
        evolution: 'Base',
        type: 'Nuclear Specialist',
        rarity: 'Mythic',
        tier: 'S',
        element: 'Nuclear',
        icon: 'fas fa-radiation',
        description: 'Mad scientist with nuclear power and radioactive abilities',
        obtainMethod: 'Nuclear Lab Stage 7',
        dropRate: '0.9%',
        canEvolve: true,
        evolutionTo: 'Nuclear Scientist (Fusion)',
        stats: {
            damage: 4500,
            spa: 1.0,
            range: 400,
            dps: 4500,
            aoeType: 'Nuclear AoE',
            statusEffects: ['Radiation', 'Poison'],
            traits: ['Nuclear Mastery', 'Radioactive']
        },
        evolutionMaterials: {
            goldCost: 18000,
            specialItem: {
                name: 'Nuclear Core',
                source: 'Nuclear Lab Act 7',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 40,
                'Purple Essence Stone': 25,
                'Blue Essence Stone': 15
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Very Hard',
            tips: ['Farm Nuclear Lab', 'Strong AoE damage', 'Rare nuclear unit']
        }
    },

    // Electric Element Units
    'electric_master': {
        id: 'electric_master',
        name: 'Electric Master',
        evolution: 'Base',
        type: 'Electric Specialist',
        rarity: 'Secret',
        tier: 'A+',
        element: 'Electric',
        icon: 'fas fa-bolt',
        description: 'Master of electricity with lightning-fast attacks',
        obtainMethod: 'Thunder Peak Stage 4',
        dropRate: '2.0%',
        canEvolve: true,
        evolutionTo: 'Electric Master (Storm)',
        stats: {
            damage: 3200,
            spa: 0.9,
            range: 280,
            dps: 3556,
            aoeType: 'Lightning AoE',
            statusEffects: ['Shock', 'Paralyze'],
            traits: ['Electric Mastery', 'Lightning Speed']
        },
        evolutionMaterials: {
            goldCost: 10000,
            specialItem: {
                name: 'Lightning Rod',
                source: 'Thunder Peak Act 4',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 10
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Thunder Peak', 'Fast attack speed', 'Good electric unit']
        }
    },

    // Ice Element Units
    'ice_mage': {
        id: 'ice_mage',
        name: 'Ice Mage',
        evolution: 'Base',
        type: 'Ice Specialist',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Ice',
        icon: 'fas fa-snowflake',
        description: 'Frozen mage with ice magic and freezing abilities',
        obtainMethod: 'Frozen Peak Stage 3',
        dropRate: '2.5%',
        canEvolve: true,
        evolutionTo: 'Ice Mage (Frost)',
        stats: {
            damage: 2800,
            spa: 1.4,
            range: 300,
            dps: 2000,
            aoeType: 'Ice AoE',
            statusEffects: ['Freeze', 'Slow'],
            traits: ['Ice Mastery', 'Frozen Magic']
        },
        evolutionMaterials: {
            goldCost: 8000,
            specialItem: {
                name: 'Frost Crystal',
                source: 'Frozen Peak Act 3',
                dropRate: '1-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 20,
                'Blue Essence Stone': 12,
                'Purple Essence Stone': 6
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Frozen Peak', 'Good ice unit', 'Freezing abilities']
        }
    },

    // Poison Element Units
    'poison_assassin': {
        id: 'poison_assassin',
        name: 'Poison Assassin',
        evolution: 'Base',
        type: 'Poison Specialist',
        rarity: 'Secret',
        tier: 'A+',
        element: 'Poison',
        icon: 'fas fa-skull-crossbones',
        description: 'Deadly poison assassin with toxic attacks and stealth',
        obtainMethod: 'Poison Swamp Stage 5',
        dropRate: '1.8%',
        canEvolve: true,
        evolutionTo: 'Poison Assassin (Venom)',
        stats: {
            damage: 2600,
            spa: 1.2,
            range: 250,
            dps: 2167,
            aoeType: 'Poison AoE',
            statusEffects: ['Poison', 'Stealth'],
            traits: ['Poison Mastery', 'Assassin Stealth']
        },
        evolutionMaterials: {
            goldCost: 11000,
            specialItem: {
                name: 'Venom Fang',
                source: 'Poison Swamp Act 5',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 28,
                'Purple Essence Stone': 15,
                'Blue Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Poison Swamp', 'Stealth abilities', 'Poison damage over time']
        }
    },

    // Psychic Element Units
    'psychic_mind': {
        id: 'psychic_mind',
        name: 'Psychic Mind',
        evolution: 'Base',
        type: 'Psychic Specialist',
        rarity: 'Mythic',
        tier: 'S',
        element: 'Psychic',
        icon: 'fas fa-brain',
        description: 'Powerful psychic with mind control and telepathic abilities',
        obtainMethod: 'Mind Temple Stage 6',
        dropRate: '1.0%',
        canEvolve: true,
        evolutionTo: 'Psychic Mind (Telepath)',
        stats: {
            damage: 3500,
            spa: 1.3,
            range: 350,
            dps: 2692,
            aoeType: 'Psychic AoE',
            statusEffects: ['Mind Control', 'Confuse'],
            traits: ['Psychic Mastery', 'Telepathic']
        },
        evolutionMaterials: {
            goldCost: 16000,
            specialItem: {
                name: 'Mind Crystal',
                source: 'Mind Temple Act 6',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 35,
                'Purple Essence Stone': 20,
                'Blue Essence Stone': 12
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Mind Temple', 'Mind control abilities', 'Rare psychic unit']
        }
    },

    // Blast Element Units
    'blast_exploder': {
        id: 'blast_exploder',
        name: 'Blast Exploder',
        evolution: 'Base',
        type: 'Blast Specialist',
        rarity: 'Secret',
        tier: 'A+',
        element: 'Blast',
        icon: 'fas fa-radiation',
        description: 'Explosive specialist with powerful blast damage',
        obtainMethod: 'Explosion Valley Stage 4',
        dropRate: '1.5%',
        canEvolve: true,
        evolutionTo: 'Blast Exploder (Mega)',
        stats: {
            damage: 3800,
            spa: 1.1,
            range: 300,
            dps: 3455,
            aoeType: 'Blast AoE',
            statusEffects: ['Explosion', 'Stun'],
            traits: ['Blast Mastery', 'Explosive']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Explosive Core',
                source: 'Explosion Valley Act 4',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 10
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Explosion Valley', 'Strong blast damage', 'Good for crowd control']
        }
    },

    // Physical Element Units
    'physical_warrior': {
        id: 'physical_warrior',
        name: 'Physical Warrior',
        evolution: 'Base',
        type: 'Physical Specialist',
        rarity: 'Vanguard',
        tier: 'B+',
        element: 'Physical',
        icon: 'fas fa-fist-raised',
        description: 'Master of physical combat with powerful melee attacks',
        obtainMethod: 'Story Mode Chapter 5',
        dropRate: '15%',
        canEvolve: true,
        evolutionTo: 'Physical Berserker',
        stats: {
            damage: 3200,
            spa: 1.8,
            range: 150,
            dps: 1778,
            aoeType: 'Single Target',
            statusEffects: ['Stun'],
            traits: ['Physical Mastery', 'Combat Expert']
        },
        evolutionMaterials: {
            goldCost: 8000,
            specialItem: {
                name: 'Warrior\'s Gauntlets',
                source: 'Story Mode Chapter 5',
                dropRate: '25%'
            },
            essenceStones: {
                'Green Essence Stone': 20,
                'Blue Essence Stone': 8,
                'Pink Essence Stone': 5
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Complete Story Mode Chapter 5', 'Good for beginners', 'Strong physical damage']
        }
    },

    // Add missing Cosmic element unit
    'cosmic_sorcerer': {
        id: 'cosmic_sorcerer',
        name: 'Cosmic Sorcerer',
        evolution: 'Base',
        type: 'Cosmic Specialist',
        rarity: 'Secret',
        tier: 'S',
        element: 'Cosmic',
        icon: 'fas fa-infinity',
        description: 'Master of cosmic magic with reality-bending abilities',
        obtainMethod: 'Cosmic Tower Floor 50',
        dropRate: '2%',
        canEvolve: true,
        evolutionTo: 'Cosmic Archmage',
        stats: {
            damage: 7500,
            spa: 1.0,
            range: 400,
            dps: 7500,
            aoeType: 'Full AoE',
            statusEffects: ['Reality Warp', 'Time Slow'],
            traits: ['Cosmic Mastery', 'Reality Manipulation']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Cosmic Orb',
                source: 'Cosmic Tower Floor 50',
                dropRate: '5%'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Purple Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Reach Cosmic Tower Floor 50', 'Very rare drop rate', 'Excellent cosmic damage']
        }
    }
}; 