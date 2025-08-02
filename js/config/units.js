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