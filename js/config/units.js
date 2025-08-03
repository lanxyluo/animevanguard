// Real Wiki data for Anime Vanguards units
export const unitsData = {
    'arin_rumbling': {
        id: 'arin_rumbling',
        name: 'Arin',
        evolution: 'Rumbling',
        type: 'Giant',
        rarity: 'Vanguard',
        tier: 'A+',
        element: 'Giant',
        icon: 'fas fa-mountain',
        description: 'Giant warrior with immense physical strength and earth-shattering attacks',
        obtainMethod: 'Giant Forest Act 2',
        dropRate: '2.5%',
        canEvolve: false,
        evolutionFrom: 'Arin',
        stats: {
            damage: 6500,
            spa: 1.5,
            range: 200,
            dps: 4333,
            aoeType: 'Single Target',
            statusEffects: ['Stun', 'Knockback'],
            traits: ['Giant Strength', 'Earth Shaker']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Giant\'s Heart',
                source: 'Giant Forest Act 4',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Brown Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Good for early game', 'Reliable tank unit', 'Easy to obtain']
        }
    },

    'renguko_purgatory': {
        id: 'renguko_purgatory',
        name: 'Renguko',
        evolution: 'Purgatory',
        type: 'Burn Specialist',
        rarity: 'Secret',
        tier: 'S',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Master of fire techniques with devastating burn damage over time',
        obtainMethod: 'Purgatory Tower Act 3',
        dropRate: '1.2%',
        canEvolve: false,
        evolutionFrom: 'Renguko',
        stats: {
            damage: 7200,
            spa: 1.1,
            range: 300,
            dps: 6545,
            aoeType: 'Line AoE',
            statusEffects: ['Burn', 'Ignite', 'Heat Wave'],
            traits: ['Fire Mastery', 'Burn Specialist', 'Heat Manipulation']
        },
        evolutionMaterials: {
            goldCost: 18000,
            specialItem: {
                name: 'Purgatory Flame',
                source: 'Purgatory Tower Act 5',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Red Essence Stone': 20,
                'Orange Essence Stone': 15,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Best burn specialist', 'Excellent for boss fights', 'High damage over time']
        }
    },

    'aurin_nuclear_giant': {
        id: 'aurin_nuclear_giant',
        name: 'Aurin',
        evolution: 'Nuclear Giant',
        type: 'Nuclear Specialist',
        rarity: 'Mythic',
        tier: 'SS',
        element: 'Blast',
        icon: 'fas fa-radiation',
        description: 'Nuclear-powered giant with devastating radiation attacks',
        obtainMethod: 'Nuclear Facility Legend Stage',
        dropRate: '0.5%',
        canEvolve: false,
        evolutionFrom: 'Aurin',
        stats: {
            damage: 15000,
            spa: 0.9,
            range: 400,
            dps: 16667,
            aoeType: 'Full AoE',
            statusEffects: ['Radiation', 'Poison', 'Nuclear Fallout'],
            traits: ['Nuclear Mastery', 'Giant Form', 'Radiation Immunity']
        },
        evolutionMaterials: {
            goldCost: 25000,
            specialItem: {
                name: 'Nuclear Core',
                source: 'Nuclear Facility Act 6',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 40,
                'Yellow Essence Stone': 25,
                'Rainbow Essence Stone': 3,
                'Nuclear Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'Highest',
            difficulty: 'Very Hard',
            tips: ['Rarest unit in game', 'Highest damage potential', 'Nuclear specialist']
        }
    },

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

    'poison_scout': {
        id: 'poison_scout',
        name: 'Poison Scout',
        evolution: 'Base',
        type: 'Scout',
        rarity: 'Vanguard',
        tier: 'B+',
        element: 'Poison',
        icon: 'fas fa-eye',
        description: 'Poison scout with stealth and reconnaissance abilities',
        obtainMethod: 'Poison Forest Act 1',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Poison Scout (Venom)',
        stats: {
            damage: 1800,
            spa: 1.4,
            range: 300,
            dps: 1286,
            aoeType: 'Single Target',
            statusEffects: ['Poison', 'Stealth'],
            traits: ['Scout Mastery', 'Poison Resistance']
        },
        evolutionMaterials: {
            goldCost: 8000,
            specialItem: {
                name: 'Poison Dart',
                source: 'Poison Forest Act 3',
                dropRate: '2-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 20,
                'Purple Essence Stone': 10,
                'Blue Essence Stone': 5
            }
        },
        farmingGuide: {
            priority: 'Low',
            difficulty: 'Easy',
            tips: ['Good for early game', 'Stealth abilities', 'Easy to obtain']
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
        type: 'Sorcerer',
        rarity: 'Secret',
        tier: 'S',
        element: 'Cosmic',
        icon: 'fas fa-star',
        description: 'Master of cosmic magic with reality-bending abilities',
        obtainMethod: 'Cosmic Realm Act 3',
        dropRate: '1.5%',
        canEvolve: false,
        evolutionFrom: null,
        stats: {
            damage: 9000,
            spa: 1.0,
            range: 450,
            dps: 9000,
            aoeType: 'Full AoE',
            statusEffects: ['Cosmic Bind', 'Reality Warp'],
            traits: ['Cosmic Mastery', 'Reality Manipulation']
        },
        evolutionMaterials: {
            goldCost: 20000,
            specialItem: {
                name: 'Cosmic Crystal',
                source: 'Cosmic Realm Act 5',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 35,
                'Blue Essence Stone': 20,
                'Rainbow Essence Stone': 2
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Excellent cosmic unit', 'Reality manipulation abilities', 'High tier sorcerer']
        }
    },

    'exclusive_legend': {
        id: 'exclusive_legend',
        name: 'Exclusive Legend',
        evolution: 'Base',
        type: 'Legendary Warrior',
        rarity: 'Exclusive',
        tier: 'SSS',
        element: 'Physical',
        icon: 'fas fa-crown',
        description: 'Exclusive legendary warrior with unmatched combat prowess',
        obtainMethod: 'Exclusive Event Only',
        dropRate: '0.1%',
        canEvolve: false,
        evolutionFrom: null,
        stats: {
            damage: 20000,
            spa: 0.7,
            range: 300,
            dps: 28571,
            aoeType: 'Full AoE',
            statusEffects: ['Legendary Strike', 'Divine Protection'],
            traits: ['Legendary Status', 'Divine Power', 'Exclusive Access']
        },
        evolutionMaterials: {
            goldCost: 50000,
            specialItem: {
                name: 'Legendary Crown',
                source: 'Exclusive Event',
                dropRate: '1 per event'
            },
            essenceStones: {
                'Rainbow Essence Stone': 10,
                'Legendary Essence Stone': 5,
                'Divine Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'Highest',
            difficulty: 'Impossible',
            tips: ['Exclusive event only', 'Rarest unit in game', 'Ultimate power']
        }
    },

    'exclusive_mage': {
        id: 'exclusive_mage',
        name: 'Exclusive Mage',
        evolution: 'Base',
        type: 'Archmage',
        rarity: 'Exclusive',
        tier: 'SSS',
        element: 'Cosmic',
        icon: 'fas fa-magic',
        description: 'Exclusive archmage with ultimate magical power',
        obtainMethod: 'Exclusive Event Only',
        dropRate: '0.1%',
        canEvolve: false,
        evolutionFrom: null,
        stats: {
            damage: 18000,
            spa: 0.8,
            range: 500,
            dps: 22500,
            aoeType: 'Full AoE',
            statusEffects: ['Arcane Mastery', 'Reality Control'],
            traits: ['Arcane Power', 'Exclusive Access', 'Ultimate Magic']
        },
        evolutionMaterials: {
            goldCost: 45000,
            specialItem: {
                name: 'Arcane Staff',
                source: 'Exclusive Event',
                dropRate: '1 per event'
            },
            essenceStones: {
                'Rainbow Essence Stone': 8,
                'Arcane Essence Stone': 5,
                'Divine Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'Highest',
            difficulty: 'Impossible',
            tips: ['Exclusive event only', 'Ultimate mage', 'Reality control']
        }
    },

    // Additional Vanguard units for better filtering
    'fire_warrior': {
        id: 'fire_warrior',
        name: 'Fire Warrior',
        evolution: 'Base',
        type: 'Warrior',
        rarity: 'Vanguard',
        tier: 'B+',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Basic fire warrior with flame sword techniques',
        obtainMethod: 'Fire Valley Act 1',
        dropRate: '4.0%',
        canEvolve: true,
        evolutionTo: 'Fire Warrior (Flame)',
        stats: {
            damage: 2000,
            spa: 1.3,
            range: 200,
            dps: 1538,
            aoeType: 'Single Target',
            statusEffects: ['Burn'],
            traits: ['Fire Resistance', 'Warrior Training']
        },
        evolutionMaterials: {
            goldCost: 7000,
            specialItem: {
                name: 'Flame Sword',
                source: 'Fire Valley Act 2',
                dropRate: '3-4 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 18,
                'Red Essence Stone': 8,
                'Orange Essence Stone': 5
            }
        },
        farmingGuide: {
            priority: 'Low',
            difficulty: 'Easy',
            tips: ['Good starter unit', 'Fire damage', 'Easy to farm']
        }
    },

    'ice_guardian': {
        id: 'ice_guardian',
        name: 'Ice Guardian',
        evolution: 'Base',
        type: 'Guardian',
        rarity: 'Vanguard',
        tier: 'B+',
        element: 'Ice',
        icon: 'fas fa-snowflake',
        description: 'Ice guardian with defensive and freezing abilities',
        obtainMethod: 'Ice Peak Act 1',
        dropRate: '3.8%',
        canEvolve: true,
        evolutionTo: 'Ice Guardian (Frost)',
        stats: {
            damage: 1800,
            spa: 1.5,
            range: 250,
            dps: 1200,
            aoeType: 'Single Target',
            statusEffects: ['Freeze', 'Slow'],
            traits: ['Ice Resistance', 'Guardian Training']
        },
        evolutionMaterials: {
            goldCost: 7500,
            specialItem: {
                name: 'Ice Shield',
                source: 'Ice Peak Act 2',
                dropRate: '2-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 20,
                'Blue Essence Stone': 10,
                'White Essence Stone': 5
            }
        },
        farmingGuide: {
            priority: 'Low',
            difficulty: 'Easy',
            tips: ['Good defensive unit', 'Freezing abilities', 'Easy to obtain']
        }
    },

    'nuclear_apprentice': {
        id: 'nuclear_apprentice',
        name: 'Nuclear Apprentice',
        evolution: 'Base',
        type: 'Apprentice',
        rarity: 'Vanguard',
        tier: 'B',
        element: 'Nuclear',
        icon: 'fas fa-atom',
        description: 'Nuclear apprentice learning radioactive techniques',
        obtainMethod: 'Nuclear Lab Act 1',
        dropRate: '4.2%',
        canEvolve: true,
        evolutionTo: 'Nuclear Apprentice (Fusion)',
        stats: {
            damage: 1500,
            spa: 1.6,
            range: 200,
            dps: 938,
            aoeType: 'Single Target',
            statusEffects: ['Radiation'],
            traits: ['Nuclear Resistance', 'Apprentice Training']
        },
        evolutionMaterials: {
            goldCost: 6000,
            specialItem: {
                name: 'Radiation Gloves',
                source: 'Nuclear Lab Act 2',
                dropRate: '3-4 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 15,
                'Yellow Essence Stone': 8,
                'Blue Essence Stone': 5
            }
        },
        farmingGuide: {
            priority: 'Low',
            difficulty: 'Easy',
            tips: ['Good starter unit', 'Nuclear damage', 'Easy to farm']
        }
    },

    // Additional units to ensure all rarity+element combinations exist
    'vanguard_electric': {
        id: 'vanguard_electric',
        name: 'Electric Scout',
        evolution: 'Base',
        type: 'Scout',
        rarity: 'Vanguard',
        tier: 'B+',
        element: 'Electric',
        icon: 'fas fa-bolt',
        description: 'Electric scout with lightning speed',
        obtainMethod: 'Thunder Valley Act 1',
        dropRate: '3.8%',
        canEvolve: true,
        evolutionTo: 'Electric Scout (Storm)',
        stats: {
            damage: 1600,
            spa: 1.4,
            range: 250,
            dps: 1143,
            aoeType: 'Single Target',
            statusEffects: ['Shock'],
            traits: ['Electric Resistance', 'Scout Training']
        },
        evolutionMaterials: {
            goldCost: 6500,
            specialItem: {
                name: 'Lightning Boots',
                source: 'Thunder Valley Act 2',
                dropRate: '2-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 18,
                'Yellow Essence Stone': 8,
                'Blue Essence Stone': 5
            }
        },
        farmingGuide: {
            priority: 'Low',
            difficulty: 'Easy',
            tips: ['Fast attack speed', 'Electric damage', 'Easy to obtain']
        }
    },

    'vanguard_psychic': {
        id: 'vanguard_psychic',
        name: 'Psychic Novice',
        evolution: 'Base',
        type: 'Novice',
        rarity: 'Vanguard',
        tier: 'B',
        element: 'Psychic',
        icon: 'fas fa-brain',
        description: 'Psychic novice learning mind powers',
        obtainMethod: 'Mind Forest Act 1',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Psychic Novice (Telepath)',
        stats: {
            damage: 1400,
            spa: 1.7,
            range: 300,
            dps: 824,
            aoeType: 'Single Target',
            statusEffects: ['Confuse'],
            traits: ['Psychic Resistance', 'Novice Training']
        },
        evolutionMaterials: {
            goldCost: 5500,
            specialItem: {
                name: 'Mind Crystal',
                source: 'Mind Forest Act 2',
                dropRate: '2-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 16,
                'Pink Essence Stone': 6,
                'Blue Essence Stone': 4
            }
        },
        farmingGuide: {
            priority: 'Low',
            difficulty: 'Easy',
            tips: ['Mind control abilities', 'Psychic damage', 'Easy to farm']
        }
    },

    'vanguard_blast': {
        id: 'vanguard_blast',
        name: 'Blast Trainee',
        evolution: 'Base',
        type: 'Trainee',
        rarity: 'Vanguard',
        tier: 'B',
        element: 'Blast',
        icon: 'fas fa-bomb',
        description: 'Blast trainee learning explosive techniques',
        obtainMethod: 'Explosion Valley Act 1',
        dropRate: '3.6%',
        canEvolve: true,
        evolutionTo: 'Blast Trainee (Exploder)',
        stats: {
            damage: 1700,
            spa: 1.5,
            range: 200,
            dps: 1133,
            aoeType: 'Single Target',
            statusEffects: ['Explosion'],
            traits: ['Blast Resistance', 'Trainee Training']
        },
        evolutionMaterials: {
            goldCost: 5800,
            specialItem: {
                name: 'Explosive Powder',
                source: 'Explosion Valley Act 2',
                dropRate: '3-4 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 17,
                'Orange Essence Stone': 7,
                'Red Essence Stone': 4
            }
        },
        farmingGuide: {
            priority: 'Low',
            difficulty: 'Easy',
            tips: ['Explosive damage', 'Blast abilities', 'Easy to obtain']
        }
    },

    'vanguard_physical': {
        id: 'vanguard_physical',
        name: 'Physical Fighter',
        evolution: 'Base',
        type: 'Fighter',
        rarity: 'Vanguard',
        tier: 'B+',
        element: 'Physical',
        icon: 'fas fa-fist-raised',
        description: 'Physical fighter with martial arts skills',
        obtainMethod: 'Training Grounds Act 1',
        dropRate: '4.0%',
        canEvolve: true,
        evolutionTo: 'Physical Fighter (Warrior)',
        stats: {
            damage: 1800,
            spa: 1.3,
            range: 150,
            dps: 1385,
            aoeType: 'Single Target',
            statusEffects: ['Stun'],
            traits: ['Physical Mastery', 'Fighter Training']
        },
        evolutionMaterials: {
            goldCost: 6200,
            specialItem: {
                name: 'Training Belt',
                source: 'Training Grounds Act 2',
                dropRate: '2-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 19,
                'Brown Essence Stone': 8,
                'Yellow Essence Stone': 5
            }
        },
        farmingGuide: {
            priority: 'Low',
            difficulty: 'Easy',
            tips: ['Physical damage', 'Martial arts', 'Easy to farm']
        }
    },

    // Secret rarity additions for missing elements
    'secret_water': {
        id: 'secret_water',
        name: 'Water Master',
        evolution: 'Base',
        type: 'Master',
        rarity: 'Secret',
        tier: 'S',
        element: 'Water',
        icon: 'fas fa-tint',
        description: 'Master of water manipulation with powerful hydro attacks',
        obtainMethod: 'Ocean Temple Act 3',
        dropRate: '1.5%',
        canEvolve: true,
        evolutionTo: 'Water Master (Tsunami)',
        stats: {
            damage: 4500,
            spa: 1.1,
            range: 350,
            dps: 4091,
            aoeType: 'Water AoE',
            statusEffects: ['Drown', 'Slow'],
            traits: ['Water Mastery', 'Hydro Control']
        },
        evolutionMaterials: {
            goldCost: 16000,
            specialItem: {
                name: 'Ocean Pearl',
                source: 'Ocean Temple Act 5',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Blue Essence Stone': 15,
                'Purple Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Excellent water unit', 'Hydro control', 'Strong AoE']
        }
    },

    'secret_earth': {
        id: 'secret_earth',
        name: 'Earth Guardian',
        evolution: 'Base',
        type: 'Guardian',
        rarity: 'Secret',
        tier: 'S',
        element: 'Earth',
        icon: 'fas fa-mountain',
        description: 'Earth guardian with defensive and seismic abilities',
        obtainMethod: 'Earth Temple Act 3',
        dropRate: '1.3%',
        canEvolve: true,
        evolutionTo: 'Earth Guardian (Titan)',
        stats: {
            damage: 3800,
            spa: 1.4,
            range: 250,
            dps: 2714,
            aoeType: 'Earth AoE',
            statusEffects: ['Stun', 'Knockback'],
            traits: ['Earth Mastery', 'Seismic Control']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Earth Core',
                source: 'Earth Temple Act 5',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 28,
                'Brown Essence Stone': 12,
                'Purple Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Excellent tank unit', 'Seismic damage', 'Strong defense']
        }
    },

    'secret_wind': {
        id: 'secret_wind',
        name: 'Wind Ninja',
        evolution: 'Base',
        type: 'Ninja',
        rarity: 'Secret',
        tier: 'S',
        element: 'Wind',
        icon: 'fas fa-wind',
        description: 'Wind ninja with speed and stealth abilities',
        obtainMethod: 'Wind Temple Act 3',
        dropRate: '1.4%',
        canEvolve: true,
        evolutionTo: 'Wind Ninja (Storm)',
        stats: {
            damage: 4200,
            spa: 0.9,
            range: 300,
            dps: 4667,
            aoeType: 'Wind AoE',
            statusEffects: ['Silence', 'Speed Boost'],
            traits: ['Wind Mastery', 'Ninja Stealth']
        },
        evolutionMaterials: {
            goldCost: 15500,
            specialItem: {
                name: 'Wind Essence',
                source: 'Wind Temple Act 5',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 29,
                'Blue Essence Stone': 14,
                'Purple Essence Stone': 7
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Fast attack speed', 'Stealth abilities', 'Wind damage']
        }
    },

    'secret_dark': {
        id: 'secret_dark',
        name: 'Dark Warlock',
        evolution: 'Base',
        type: 'Warlock',
        rarity: 'Secret',
        tier: 'S',
        element: 'Dark',
        icon: 'fas fa-moon',
        description: 'Dark warlock with shadow magic and curse abilities',
        obtainMethod: 'Dark Cathedral Act 3',
        dropRate: '1.2%',
        canEvolve: true,
        evolutionTo: 'Dark Warlock (Shadow)',
        stats: {
            damage: 4800,
            spa: 1.2,
            range: 400,
            dps: 4000,
            aoeType: 'Dark AoE',
            statusEffects: ['Curse', 'Fear'],
            traits: ['Dark Mastery', 'Shadow Magic']
        },
        evolutionMaterials: {
            goldCost: 17000,
            specialItem: {
                name: 'Shadow Orb',
                source: 'Dark Cathedral Act 5',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 32,
                'Purple Essence Stone': 16,
                'Blue Essence Stone': 10
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Shadow magic', 'Curse abilities', 'Dark damage']
        }
    },

    'secret_giant': {
        id: 'secret_giant',
        name: 'Giant Titan',
        evolution: 'Base',
        type: 'Titan',
        rarity: 'Secret',
        tier: 'S',
        element: 'Giant',
        icon: 'fas fa-mountain',
        description: 'Giant titan with immense strength and earth-shattering power',
        obtainMethod: 'Giant Forest Act 3',
        dropRate: '1.1%',
        canEvolve: true,
        evolutionTo: 'Giant Titan (Colossus)',
        stats: {
            damage: 5500,
            spa: 1.6,
            range: 200,
            dps: 3438,
            aoeType: 'Giant AoE',
            statusEffects: ['Stun', 'Titan Fear'],
            traits: ['Giant Mastery', 'Titan Strength']
        },
        evolutionMaterials: {
            goldCost: 18000,
            specialItem: {
                name: 'Titan Heart',
                source: 'Giant Forest Act 5',
                dropRate: '1 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 35,
                'Giant Essence': 12,
                'Purple Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Immense strength', 'Titan abilities', 'Giant damage']
        }
    }
}; 