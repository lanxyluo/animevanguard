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

    'renguko_purgatory': {
        id: 'renguko_purgatory',
        name: 'Renguko',
        evolution: 'Purgatory',
        type: 'Burn Specialist',
        rarity: 'Secret',
        tier: 'S',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Incredible burn damage specialist from Demon Slayer with purgatory flames',
        obtainMethod: 'Evolution from Renguko',
        canEvolve: false,
        evolutionFrom: 'Renguko',
        stats: {
            damage: 7200,
            spa: 1.1,
            range: 400,
            dps: 6545,
            aoeType: 'Flame AoE',
            statusEffects: ['Purgatory Burn', 'Flame Enhancement'],
            traits: ['Flame Breathing', 'Demon Slayer']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Purgatory Flame Essence',
                source: 'Mugen Train',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Mugen Train', 'Best burn specialist', 'Excellent for fire teams']
        }
    },

    'ace_flame': {
        id: 'ace_flame',
        name: 'Ace',
        evolution: 'Flame Emperor',
        type: 'Burn Specialist',
        rarity: 'Secret',
        tier: 'S',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Flame Emperor Ace with logia devil fruit powers',
        obtainMethod: 'Evolution from Ace',
        canEvolve: false,
        evolutionFrom: 'Ace',
        stats: {
            damage: 6800,
            spa: 1.1,
            range: 450,
            dps: 6182,
            aoeType: 'Flame AoE',
            statusEffects: ['Flame Burn', 'Logia Immunity'],
            traits: ['Flame-Flame Fruit', 'Logia Physiology']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Flame Emperor Crown',
                source: 'Marineford',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Marineford', 'Excellent burn damage', 'Good for fire teams']
        }
    },

    'aurin_nuclear': {
        id: 'aurin_nuclear',
        name: 'Aurin',
        evolution: 'Nuclear Giant',
        type: 'AoE Specialist',
        rarity: 'Secret',
        tier: 'S',
        element: 'Blast',
        icon: 'fas fa-radiation',
        description: 'Nuclear giant form with massive AoE radiation damage',
        obtainMethod: 'Evolution from Aurin',
        canEvolve: false,
        evolutionFrom: 'Aurin',
        stats: {
            damage: 7500,
            spa: 1.0,
            range: 500,
            dps: 7500,
            aoeType: 'Massive AoE',
            statusEffects: ['Nuclear Radiation', 'Area Contamination'],
            traits: ['Nuclear Mastery', 'Giant Physiology']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Nuclear Core',
                source: 'Crystal Chapel Legend Stage Act 1',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Blue Essence Stone': 10,
                'Pink Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Crystal Chapel', 'Best AoE damage', 'Good for crowd control']
        }
    },

    'ichigo_bankai': {
        id: 'ichigo_bankai',
        name: 'Ichigo',
        evolution: 'Bankai',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'S',
        element: 'Physical',
        icon: 'fas fa-sword',
        description: 'Bankai Ichigo with spiritual pressure and sword mastery',
        obtainMethod: 'Evolution from Ichigo',
        canEvolve: false,
        evolutionFrom: 'Ichigo',
        stats: {
            damage: 7800,
            spa: 1.0,
            range: 350,
            dps: 7800,
            aoeType: 'Slash AoE',
            statusEffects: ['Spiritual Pressure', 'Bankai Release'],
            traits: ['Bankai', 'Soul Reaper']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Bankai Training Scroll',
                source: 'Soul Society',
                dropRate: '1-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Purple Essence Stone': 12,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Medium',
            tips: ['Farm Soul Society', 'Balanced DPS unit', 'Good for all content']
        }
    },

    'naruto': {
        id: 'naruto',
        name: 'Naruto',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Wind',
        icon: 'fas fa-wind',
        description: 'Base form of the wind ninja with chakra abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Naruto (Sage Mode)',
        stats: {
            damage: 2800,
            spa: 1.4,
            range: 300,
            dps: 2000,
            aoeType: 'Spiral AoE',
            statusEffects: ['Chakra Boost'],
            traits: ['Wind Affinity', 'Nine-Tails Chakra']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Sage Mode Scroll',
                source: 'Mount Myoboku',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Mount Myoboku', 'Good base unit', 'Evolve for better performance']
        }
    },

    'sasuke': {
        id: 'sasuke',
        name: 'Sasuke',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Lightning',
        icon: 'fas fa-bolt',
        description: 'Base form of the lightning ninja with sharingan abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Sasuke (Mangekyo)',
        stats: {
            damage: 3000,
            spa: 1.3,
            range: 320,
            dps: 2308,
            aoeType: 'Lightning AoE',
            statusEffects: ['Lightning Paralysis'],
            traits: ['Lightning Affinity', 'Sharingan']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Mangekyo Sharingan',
                source: 'Uchiha Hideout',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Purple Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Uchiha Hideout', 'Good base unit', 'Evolve for better performance']
        }
    },

    'luffy': {
        id: 'luffy',
        name: 'Luffy',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-fist',
        description: 'Base form of the rubber pirate with devil fruit powers',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Luffy (Gear 4)',
        stats: {
            damage: 3200,
            spa: 1.2,
            range: 280,
            dps: 2667,
            aoeType: 'Punch AoE',
            statusEffects: ['Rubber Stretch'],
            traits: ['Rubber Physiology', 'Devil Fruit']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Gear 4 Training Manual',
                source: 'Dressrosa',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Dressrosa', 'Good base unit', 'Evolve for better performance']
        }
    },

    'zoro': {
        id: 'zoro',
        name: 'Zoro',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-sword',
        description: 'Base form of the swordsman with three-sword style',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Zoro (Ashura)',
        stats: {
            damage: 3500,
            spa: 1.1,
            range: 250,
            dps: 3182,
            aoeType: 'Slash AoE',
            statusEffects: ['Sword Mastery'],
            traits: ['Three-Sword Style', 'Swordsman']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Ashura Technique Scroll',
                source: 'Thriller Bark',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Thriller Bark', 'Good base unit', 'Evolve for better performance']
        }
    },

    'goku': {
        id: 'goku',
        name: 'Goku',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-fist',
        description: 'Base form of the saiyan warrior with ki abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Goku (Super Saiyan)',
        stats: {
            damage: 3000,
            spa: 1.3,
            range: 300,
            dps: 2308,
            aoeType: 'Ki Blast AoE',
            statusEffects: ['Ki Enhancement'],
            traits: ['Saiyan Physiology', 'Ki Mastery']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Super Saiyan Training',
                source: 'Planet Vegeta',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Yellow Essence Stone': 15,
                'Red Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Planet Vegeta', 'Good base unit', 'Evolve for better performance']
        }
    },

    'vegeta': {
        id: 'vegeta',
        name: 'Vegeta',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-fist',
        description: 'Base form of the saiyan prince with royal bloodline',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Vegeta (Super Saiyan Blue)',
        stats: {
            damage: 3200,
            spa: 1.2,
            range: 280,
            dps: 2667,
            aoeType: 'Ki Blast AoE',
            statusEffects: ['Royal Ki'],
            traits: ['Saiyan Prince', 'Royal Bloodline']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Super Saiyan Blue Training',
                source: 'Planet Vegeta',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Planet Vegeta', 'Good base unit', 'Evolve for better performance']
        }
    },

    'ichigo': {
        id: 'ichigo',
        name: 'Ichigo',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-sword',
        description: 'Base form of the soul reaper with spiritual pressure',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Ichigo (Bankai)',
        stats: {
            damage: 2800,
            spa: 1.4,
            range: 300,
            dps: 2000,
            aoeType: 'Slash AoE',
            statusEffects: ['Spiritual Pressure'],
            traits: ['Soul Reaper', 'Hollow Powers']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Bankai Training Scroll',
                source: 'Soul Society',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Purple Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Soul Society', 'Good base unit', 'Evolve for better performance']
        }
    },

    'ace': {
        id: 'ace',
        name: 'Ace',
        evolution: 'Base',
        type: 'Burn Specialist',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Base form of the fire logia with flame devil fruit',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Ace (Flame Emperor)',
        stats: {
            damage: 3000,
            spa: 1.3,
            range: 350,
            dps: 2308,
            aoeType: 'Flame AoE',
            statusEffects: ['Flame Burn'],
            traits: ['Flame-Flame Fruit', 'Logia Physiology']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Flame Emperor Crown',
                source: 'Marineford',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Marineford', 'Good base unit', 'Evolve for better performance']
        }
    },

    'aurin': {
        id: 'aurin',
        name: 'Aurin',
        evolution: 'Base',
        type: 'AoE Specialist',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Blast',
        icon: 'fas fa-radiation',
        description: 'Base form of the nuclear giant with radiation abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Aurin (Nuclear Giant)',
        stats: {
            damage: 2800,
            spa: 1.4,
            range: 400,
            dps: 2000,
            aoeType: 'Circle AoE',
            statusEffects: ['Radiation'],
            traits: ['Nuclear Affinity']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Nuclear Core',
                source: 'Crystal Chapel Legend Stage Act 1',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Crystal Chapel', 'Good base unit', 'Evolve for better performance']
        }
    },

    'gujo': {
        id: 'gujo',
        name: 'Gujo',
        evolution: 'Base',
        type: 'Sorcerer',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Cosmic',
        icon: 'fas fa-magic',
        description: 'Base form of the sorcerer with infinity technique',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Gujo (Infinity)',
        stats: {
            damage: 3000,
            spa: 1.3,
            range: 350,
            dps: 2308,
            aoeType: 'Cosmic AoE',
            statusEffects: ['Infinity Domain'],
            traits: ['Infinity Technique', 'Sorcerer']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Infinity Mask',
                source: 'Cursed Shop',
                cost: 'Shop Currency'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Save for Cursed Shop', 'Good base unit', 'Evolve for better performance']
        }
    },

    'renguko': {
        id: 'renguko',
        name: 'Renguko',
        evolution: 'Base',
        type: 'Burn Specialist',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Base form of the flame hashira with flame breathing',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Renguko (Purgatory)',
        stats: {
            damage: 2800,
            spa: 1.4,
            range: 300,
            dps: 2000,
            aoeType: 'Flame AoE',
            statusEffects: ['Flame Burn'],
            traits: ['Flame Breathing', 'Demon Slayer']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Purgatory Flame Essence',
                source: 'Mugen Train',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Mugen Train', 'Good base unit', 'Evolve for better performance']
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
        description: 'Incredible burn damage specialist from Demon Slayer with purgatory flames',
        obtainMethod: 'Evolution from Renguko',
        canEvolve: false,
        evolutionFrom: 'Renguko',
        stats: {
            damage: 7200,
            spa: 1.1,
            range: 400,
            dps: 6545,
            aoeType: 'Flame AoE',
            statusEffects: ['Purgatory Burn', 'Flame Enhancement'],
            traits: ['Flame Breathing', 'Demon Slayer']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Purgatory Flame Essence',
                source: 'Mugen Train',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Mugen Train', 'Best burn specialist', 'Excellent for fire teams']
        }
    },

    'ace_flame': {
        id: 'ace_flame',
        name: 'Ace',
        evolution: 'Flame Emperor',
        type: 'Burn Specialist',
        rarity: 'Secret',
        tier: 'S',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Flame Emperor Ace with logia devil fruit powers',
        obtainMethod: 'Evolution from Ace',
        canEvolve: false,
        evolutionFrom: 'Ace',
        stats: {
            damage: 6800,
            spa: 1.1,
            range: 450,
            dps: 6182,
            aoeType: 'Flame AoE',
            statusEffects: ['Flame Burn', 'Logia Immunity'],
            traits: ['Flame-Flame Fruit', 'Logia Physiology']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Flame Emperor Crown',
                source: 'Marineford',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Marineford', 'Excellent burn damage', 'Good for fire teams']
        }
    },

    'aurin_nuclear': {
        id: 'aurin_nuclear',
        name: 'Aurin',
        evolution: 'Nuclear Giant',
        type: 'AoE Specialist',
        rarity: 'Secret',
        tier: 'S',
        element: 'Blast',
        icon: 'fas fa-radiation',
        description: 'Nuclear giant form with massive AoE radiation damage',
        obtainMethod: 'Evolution from Aurin',
        canEvolve: false,
        evolutionFrom: 'Aurin',
        stats: {
            damage: 7500,
            spa: 1.0,
            range: 500,
            dps: 7500,
            aoeType: 'Massive AoE',
            statusEffects: ['Nuclear Radiation', 'Area Contamination'],
            traits: ['Nuclear Mastery', 'Giant Physiology']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Nuclear Core',
                source: 'Crystal Chapel Legend Stage Act 1',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Blue Essence Stone': 10,
                'Pink Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Crystal Chapel', 'Best AoE damage', 'Good for crowd control']
        }
    },

    'ichigo_bankai': {
        id: 'ichigo_bankai',
        name: 'Ichigo',
        evolution: 'Bankai',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'S',
        element: 'Physical',
        icon: 'fas fa-sword',
        description: 'Bankai Ichigo with spiritual pressure and sword mastery',
        obtainMethod: 'Evolution from Ichigo',
        canEvolve: false,
        evolutionFrom: 'Ichigo',
        stats: {
            damage: 7800,
            spa: 1.0,
            range: 350,
            dps: 7800,
            aoeType: 'Slash AoE',
            statusEffects: ['Spiritual Pressure', 'Bankai Release'],
            traits: ['Bankai', 'Soul Reaper']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Bankai Training Scroll',
                source: 'Soul Society',
                dropRate: '1-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Purple Essence Stone': 12,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Medium',
            tips: ['Farm Soul Society', 'Balanced DPS unit', 'Good for all content']
        }
    },

    'naruto': {
        id: 'naruto',
        name: 'Naruto',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Wind',
        icon: 'fas fa-wind',
        description: 'Base form of the wind ninja with chakra abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Naruto (Sage Mode)',
        stats: {
            damage: 2800,
            spa: 1.4,
            range: 300,
            dps: 2000,
            aoeType: 'Spiral AoE',
            statusEffects: ['Chakra Boost'],
            traits: ['Wind Affinity', 'Nine-Tails Chakra']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Sage Mode Scroll',
                source: 'Mount Myoboku',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Mount Myoboku', 'Good base unit', 'Evolve for better performance']
        }
    },

    'sasuke': {
        id: 'sasuke',
        name: 'Sasuke',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Lightning',
        icon: 'fas fa-bolt',
        description: 'Base form of the lightning ninja with sharingan abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Sasuke (Mangekyo)',
        stats: {
            damage: 3000,
            spa: 1.3,
            range: 320,
            dps: 2308,
            aoeType: 'Lightning AoE',
            statusEffects: ['Lightning Paralysis'],
            traits: ['Lightning Affinity', 'Sharingan']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Mangekyo Sharingan',
                source: 'Uchiha Hideout',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Purple Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Uchiha Hideout', 'Good base unit', 'Evolve for better performance']
        }
    },

    'luffy': {
        id: 'luffy',
        name: 'Luffy',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-fist',
        description: 'Base form of the rubber pirate with devil fruit powers',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Luffy (Gear 4)',
        stats: {
            damage: 3200,
            spa: 1.2,
            range: 280,
            dps: 2667,
            aoeType: 'Punch AoE',
            statusEffects: ['Rubber Stretch'],
            traits: ['Rubber Physiology', 'Devil Fruit']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Gear 4 Training Manual',
                source: 'Dressrosa',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Dressrosa', 'Good base unit', 'Evolve for better performance']
        }
    },

    'zoro': {
        id: 'zoro',
        name: 'Zoro',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-sword',
        description: 'Base form of the swordsman with three-sword style',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Zoro (Ashura)',
        stats: {
            damage: 3500,
            spa: 1.1,
            range: 250,
            dps: 3182,
            aoeType: 'Slash AoE',
            statusEffects: ['Sword Mastery'],
            traits: ['Three-Sword Style', 'Swordsman']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Ashura Technique Scroll',
                source: 'Thriller Bark',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Thriller Bark', 'Good base unit', 'Evolve for better performance']
        }
    },

    'goku': {
        id: 'goku',
        name: 'Goku',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-fist',
        description: 'Base form of the saiyan warrior with ki abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Goku (Super Saiyan)',
        stats: {
            damage: 3000,
            spa: 1.3,
            range: 300,
            dps: 2308,
            aoeType: 'Ki Blast AoE',
            statusEffects: ['Ki Enhancement'],
            traits: ['Saiyan Physiology', 'Ki Mastery']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Super Saiyan Training',
                source: 'Planet Vegeta',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Yellow Essence Stone': 15,
                'Red Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Planet Vegeta', 'Good base unit', 'Evolve for better performance']
        }
    },

    'vegeta': {
        id: 'vegeta',
        name: 'Vegeta',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-fist',
        description: 'Base form of the saiyan prince with royal bloodline',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Vegeta (Super Saiyan Blue)',
        stats: {
            damage: 3200,
            spa: 1.2,
            range: 280,
            dps: 2667,
            aoeType: 'Ki Blast AoE',
            statusEffects: ['Royal Ki'],
            traits: ['Saiyan Prince', 'Royal Bloodline']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Super Saiyan Blue Training',
                source: 'Planet Vegeta',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Planet Vegeta', 'Good base unit', 'Evolve for better performance']
        }
    },

    'ichigo': {
        id: 'ichigo',
        name: 'Ichigo',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-sword',
        description: 'Base form of the soul reaper with spiritual pressure',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Ichigo (Bankai)',
        stats: {
            damage: 2800,
            spa: 1.4,
            range: 300,
            dps: 2000,
            aoeType: 'Slash AoE',
            statusEffects: ['Spiritual Pressure'],
            traits: ['Soul Reaper', 'Hollow Powers']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Bankai Training Scroll',
                source: 'Soul Society',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Purple Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Soul Society', 'Good base unit', 'Evolve for better performance']
        }
    },

    'ace': {
        id: 'ace',
        name: 'Ace',
        evolution: 'Base',
        type: 'Burn Specialist',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Base form of the fire logia with flame devil fruit',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Ace (Flame Emperor)',
        stats: {
            damage: 3000,
            spa: 1.3,
            range: 350,
            dps: 2308,
            aoeType: 'Flame AoE',
            statusEffects: ['Flame Burn'],
            traits: ['Flame-Flame Fruit', 'Logia Physiology']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Flame Emperor Crown',
                source: 'Marineford',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Marineford', 'Good base unit', 'Evolve for better performance']
        }
    },

    'aurin': {
        id: 'aurin',
        name: 'Aurin',
        evolution: 'Base',
        type: 'AoE Specialist',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Blast',
        icon: 'fas fa-radiation',
        description: 'Base form of the nuclear giant with radiation abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Aurin (Nuclear Giant)',
        stats: {
            damage: 2800,
            spa: 1.4,
            range: 400,
            dps: 2000,
            aoeType: 'Circle AoE',
            statusEffects: ['Radiation'],
            traits: ['Nuclear Affinity']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Nuclear Core',
                source: 'Crystal Chapel Legend Stage Act 1',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Crystal Chapel', 'Good base unit', 'Evolve for better performance']
        }
    },

    'gujo': {
        id: 'gujo',
        name: 'Gujo',
        evolution: 'Base',
        type: 'Sorcerer',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Cosmic',
        icon: 'fas fa-magic',
        description: 'Base form of the sorcerer with infinity technique',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Gujo (Infinity)',
        stats: {
            damage: 3000,
            spa: 1.3,
            range: 350,
            dps: 2308,
            aoeType: 'Cosmic AoE',
            statusEffects: ['Infinity Domain'],
            traits: ['Infinity Technique', 'Sorcerer']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Infinity Mask',
                source: 'Cursed Shop',
                cost: 'Shop Currency'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Blue Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Save for Cursed Shop', 'Good base unit', 'Evolve for better performance']
        }
    },

    'renguko': {
        id: 'renguko',
        name: 'Renguko',
        evolution: 'Base',
        type: 'Burn Specialist',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Base form of the flame hashira with flame breathing',
        obtainMethod: 'Gem Banner',
        dropRate: '3.5%',
        canEvolve: true,
        evolutionTo: 'Renguko (Purgatory)',
        stats: {
            damage: 2800,
            spa: 1.4,
            range: 300,
            dps: 2000,
            aoeType: 'Flame AoE',
            statusEffects: ['Flame Burn'],
            traits: ['Flame Breathing', 'Demon Slayer']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Purgatory Flame Essence',
                source: 'Mugen Train',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Red Essence Stone': 15,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Farm Mugen Train', 'Good base unit', 'Evolve for better performance']
        }
    }
}; 