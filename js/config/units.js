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
            spa: 1.5,
            range: 300,
            dps: 4800,
            aoeType: 'Cone AoE',
            statusEffects: ['Purgatory Burn', 'Fear'],
            traits: ['Flame Breathing', 'Demon Slayer']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: "Slayer's Cape",
                source: 'Raid Shop',
                cost: '600 Red Webs'
            },
            essenceStones: {
                'Green Essence Stone': 35,
                'Red Essence Stone': 12,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 2
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Medium',
            tips: ['Participate in Raids weekly', 'Farm Red Webs efficiently', 'Best burn damage unit']
        }
    },

    'arin_rumbling': {
        id: 'arin_rumbling',
        name: 'Arin',
        evolution: 'Rumbling',
        type: 'Giant',
        rarity: 'Vanguard',
        tier: 'S',
        element: 'Giant',
        icon: 'fas fa-mountain',
        description: 'Latest Update 7.0 giant category unit with rumbling abilities and titan powers',
        obtainMethod: 'Gem Banner',
        canEvolve: true,
        evolutionTo: 'Arin (Founder)',
        isLatest: true,
        stats: {
            damage: 15000,
            spa: 0.6,
            range: 800,
            dps: 25000,
            aoeType: 'Full Map',
            statusEffects: ['Rumbling', 'Titan Fear'],
            traits: ['Founding Titan', 'Giant Mastery']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: "Founding Titan's Power",
                source: 'Boss Rush Event',
                cost: 'Event Currency'
            },
            essenceStones: {
                'Green Essence Stone': 40,
                'Giant Essence': 15,
                'Purple Essence Stone': 12,
                'Rainbow Essence Stone': 3
            }
        },
        farmingGuide: {
            priority: 'Highest',
            difficulty: 'Easy to obtain, Hard to evolve',
            tips: ['Available in current banner', 'Save for Boss Rush event', 'Best giant unit in game']
        }
    },

    'aurin_nuclear_giant': {
        id: 'aurin_nuclear_giant',
        name: 'Aurin',
        evolution: 'Nuclear Giant',
        type: 'Nuclear',
        rarity: 'Mythic',
        tier: 'A+',
        element: 'Blast',
        icon: 'fas fa-radiation',
        description: 'Nuclear giant with massive area damage capabilities and radiation effects',
        obtainMethod: 'Gem Banner',
        canEvolve: false,
        evolutionFrom: 'Aurin',
        stats: {
            damage: 9500,
            spa: 0.4,
            range: 600,
            dps: 23750,
            aoeType: 'Stadium AoE',
            statusEffects: ['Radiation', 'Nuclear Fallout'],
            traits: ['Nuclear Power', 'Giant Physiology']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Colossal Spine',
                source: 'Crystal Chapel Legend Stage Act 2',
                dropRate: '1-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Blue Essence Stone': 12,
                'Pink Essence Stone': 11,
                'Rainbow Essence Stone': 2
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Crystal Chapel consistently', 'Good for new players', 'Excellent AoE damage']
        }
    },

    // Additional units from original data
    'yomomata': {
        id: 'yomomata',
        name: 'Yomomata',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A+',
        element: 'Fire',
        icon: 'fas fa-fire',
        description: 'Base form of the powerful fire DPS unit',
        obtainMethod: 'Gem Banner',
        dropRate: '2.5%',
        canEvolve: true,
        evolutionTo: 'Yomomata (Captain)',
        stats: {
            damage: 4500,
            spa: 1.5,
            range: 300,
            dps: 3000,
            aoeType: 'Line AoE',
            statusEffects: ['Burn'],
            traits: ['Fire Affinity']
        },
        evolutionMaterials: {
            goldCost: 10000,
            specialItem: {
                name: "Captain's Badge",
                source: 'Kuinshi Palace Act 2',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Red Essence Stone': 8,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Medium',
            tips: ['Good starting unit', 'Evolve to Captain form', 'Strong fire damage']
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
        description: 'Base form of the cosmic sorcerer with reality-bending abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.0%',
        canEvolve: true,
        evolutionTo: 'Gujo (Infinity)',
        stats: {
            damage: 3800,
            spa: 1.8,
            range: 400,
            dps: 2111,
            aoeType: 'Circle AoE',
            statusEffects: ['Confusion'],
            traits: ['Cosmic Affinity']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Sorcerer\'s Orb',
                source: 'Cursed Shop',
                cost: '300 Cursed Coins'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Blue Essence Stone': 10,
                'Purple Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Hard',
            tips: ['Save for Cursed Shop', 'Evolve to Infinity form', 'Unique cosmic abilities']
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
        description: 'Base form of the flame breathing demon slayer',
        obtainMethod: 'Gem Banner',
        dropRate: '2.8%',
        canEvolve: true,
        evolutionTo: 'Renguko (Purgatory)',
        stats: {
            damage: 3200,
            spa: 1.6,
            range: 250,
            dps: 2000,
            aoeType: 'Cone AoE',
            statusEffects: ['Burn'],
            traits: ['Flame Breathing']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Demon Slayer Mark',
                source: 'Raid Shop',
                cost: '400 Red Webs'
            },
            essenceStones: {
                'Green Essence Stone': 28,
                'Red Essence Stone': 10,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Participate in raids', 'Evolve to Purgatory form', 'Excellent burn damage']
        }
    },

    'arin': {
        id: 'arin',
        name: 'Arin',
        evolution: 'Base',
        type: 'Giant',
        rarity: 'Vanguard',
        tier: 'A+',
        element: 'Giant',
        icon: 'fas fa-mountain',
        description: 'Base form of the founding titan with giant transformation abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '2.0%',
        canEvolve: true,
        evolutionTo: 'Arin (Rumbling)',
        stats: {
            damage: 6000,
            spa: 1.0,
            range: 500,
            dps: 6000,
            aoeType: 'Large AoE',
            statusEffects: ['Fear'],
            traits: ['Titan Form']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Titan Serum',
                source: 'Boss Rush Event',
                cost: 'Event Currency'
            },
            essenceStones: {
                'Green Essence Stone': 35,
                'Giant Essence': 12,
                'Purple Essence Stone': 10
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Easy to obtain, Hard to evolve',
            tips: ['Available in current banner', 'Save for Boss Rush event', 'Strong giant unit']
        }
    },

    'aurin': {
        id: 'aurin',
        name: 'Aurin',
        evolution: 'Base',
        type: 'Nuclear',
        rarity: 'Mythic',
        tier: 'B+',
        element: 'Blast',
        icon: 'fas fa-radiation',
        description: 'Base form of the nuclear giant with radiation abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '1.5%',
        canEvolve: true,
        evolutionTo: 'Aurin (Nuclear Giant)',
        stats: {
            damage: 4200,
            spa: 1.2,
            range: 400,
            dps: 3500,
            aoeType: 'Circle AoE',
            statusEffects: ['Radiation'],
            traits: ['Nuclear Affinity']
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
            tips: ['Farm Crystal Chapel', 'Evolve to Nuclear Giant', 'Good AoE damage']
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

    // Additional base units
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
            statusEffects: ['Wind Slash'],
            traits: ['Wind Affinity']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Toad Scroll',
                source: 'Hidden Leaf Village',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Green Essence Stone': 8,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Easy',
            tips: ['Good starting unit', 'Evolve to Sage Mode', 'Balanced wind damage']
        }
    },

    'sasuke': {
        id: 'sasuke',
        name: 'Sasuke',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Electric',
        icon: 'fas fa-bolt',
        description: 'Base form of the lightning ninja with sharingan abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '3.2%',
        canEvolve: true,
        evolutionTo: 'Sasuke (Eternal Mangekyou)',
        stats: {
            damage: 3000,
            spa: 1.3,
            range: 350,
            dps: 2308,
            aoeType: 'Line AoE',
            statusEffects: ['Lightning Strike'],
            traits: ['Sharingan']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Mangekyou Sharingan',
                source: 'Uchiha Clan Ruins',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Yellow Essence Stone': 8,
                'Purple Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Uchiha Clan Ruins', 'Evolve to Eternal Mangekyou', 'Strong single target']
        }
    },

    'goku': {
        id: 'goku',
        name: 'Goku',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'A+',
        element: 'Physical',
        icon: 'fas fa-fist-raised',
        description: 'Base form of the saiyan warrior with ki abilities',
        obtainMethod: 'Limited Event',
        dropRate: '1.0%',
        canEvolve: true,
        evolutionTo: 'Goku (Ultra Instinct)',
        stats: {
            damage: 5000,
            spa: 1.0,
            range: 400,
            dps: 5000,
            aoeType: 'Beam AoE',
            statusEffects: ['Ki Blast'],
            traits: ['Saiyan Physiology']
        },
        evolutionMaterials: {
            goldCost: 20000,
            specialItem: {
                name: 'Ultra Instinct Training',
                source: 'Tournament of Power',
                cost: 'Event Currency'
            },
            essenceStones: {
                'Green Essence Stone': 40,
                'Rainbow Essence Stone': 3,
                'God Essence': 8
            }
        },
        farmingGuide: {
            priority: 'Highest',
            difficulty: 'Very Hard',
            tips: ['Limited time event', 'Evolve to Ultra Instinct', 'Highest potential DPS']
        }
    },

    'vegeta': {
        id: 'vegeta',
        name: 'Vegeta',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'A+',
        element: 'Physical',
        icon: 'fas fa-fist-raised',
        description: 'Base form of the saiyan prince with overwhelming power',
        obtainMethod: 'Gem Banner',
        dropRate: '2.0%',
        canEvolve: true,
        evolutionTo: 'Vegeta (Super Saiyan Blue)',
        stats: {
            damage: 4800,
            spa: 1.1,
            range: 450,
            dps: 4364,
            aoeType: 'Beam AoE',
            statusEffects: ['Ki Blast'],
            traits: ['Saiyan Pride']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Blue God Ki Training',
                source: 'Beerus\'s Planet',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Blue Essence Stone': 12,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Beerus\'s Planet', 'Evolve to Super Saiyan Blue', 'Strong physical DPS']
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
        dropRate: '3.0%',
        canEvolve: true,
        evolutionTo: 'Ichigo (Bankai)',
        stats: {
            damage: 3200,
            spa: 1.2,
            range: 300,
            dps: 2667,
            aoeType: 'Slash AoE',
            statusEffects: ['Spiritual Pressure'],
            traits: ['Soul Reaper']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Bankai Training',
                source: 'Soul Society',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Purple Essence Stone': 8,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Soul Society', 'Evolve to Bankai', 'Balanced physical unit']
        }
    },

    // Additional popular units
    'luffy_gear4': {
        id: 'luffy_gear4',
        name: 'Luffy',
        evolution: 'Gear 4',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'S',
        element: 'Physical',
        icon: 'fas fa-fist-raised',
        description: 'Gear 4 Luffy with rubber abilities and haki mastery',
        obtainMethod: 'Evolution from Luffy',
        canEvolve: false,
        evolutionFrom: 'Luffy',
        stats: {
            damage: 8200,
            spa: 0.9,
            range: 400,
            dps: 9111,
            aoeType: 'Punch AoE',
            statusEffects: ['Haki', 'Rubber Stretch'],
            traits: ['Gear 4', 'Conqueror\'s Haki']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Gear 4 Training',
                source: 'Grand Line',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 35,
                'Red Essence Stone': 12,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Medium',
            tips: ['Farm Grand Line', 'Strong physical DPS', 'Unique rubber abilities']
        }
    },

    'zoro_ashura': {
        id: 'zoro_ashura',
        name: 'Zoro',
        evolution: 'Ashura',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'S',
        element: 'Physical',
        icon: 'fas fa-sword',
        description: 'Ashura Zoro with three-sword style and demonic aura',
        obtainMethod: 'Evolution from Zoro',
        canEvolve: false,
        evolutionFrom: 'Zoro',
        stats: {
            damage: 7500,
            spa: 1.0,
            range: 350,
            dps: 7500,
            aoeType: 'Slash AoE',
            statusEffects: ['Ashura Aura', 'Demon Slash'],
            traits: ['Three-Sword Style', 'Demon Aura']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Ashura Demon Mask',
                source: 'Wano Country',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 32,
                'Purple Essence Stone': 12,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Wano Country', 'Excellent sword DPS', 'Unique demon abilities']
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
            difficulty: 'Medium',
            tips: ['Farm Marineford', 'Best fire burn unit', 'Logia immunity']
        }
    },

    // Additional base units
    'luffy': {
        id: 'luffy',
        name: 'Luffy',
        evolution: 'Base',
        type: 'Meta-DPS',
        rarity: 'Vanguard',
        tier: 'A',
        element: 'Physical',
        icon: 'fas fa-fist-raised',
        description: 'Base form of the rubber pirate with devil fruit powers',
        obtainMethod: 'Gem Banner',
        dropRate: '3.0%',
        canEvolve: true,
        evolutionTo: 'Luffy (Gear 4)',
        stats: {
            damage: 2800,
            spa: 1.3,
            range: 250,
            dps: 2154,
            aoeType: 'Punch AoE',
            statusEffects: ['Rubber Stretch'],
            traits: ['Gum-Gum Fruit']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Gear 4 Training',
                source: 'Grand Line',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Red Essence Stone': 8,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Grand Line', 'Evolve to Gear 4', 'Unique rubber abilities']
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
        dropRate: '3.2%',
        canEvolve: true,
        evolutionTo: 'Zoro (Ashura)',
        stats: {
            damage: 3000,
            spa: 1.2,
            range: 300,
            dps: 2500,
            aoeType: 'Slash AoE',
            statusEffects: ['Sword Slash'],
            traits: ['Three-Sword Style']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Ashura Training',
                source: 'Wano Country',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Purple Essence Stone': 8,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Wano Country', 'Evolve to Ashura', 'Strong sword DPS']
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
        description: 'Base form of the fire logia with flame abilities',
        obtainMethod: 'Gem Banner',
        dropRate: '2.8%',
        canEvolve: true,
        evolutionTo: 'Ace (Flame Emperor)',
        stats: {
            damage: 3200,
            spa: 1.4,
            range: 400,
            dps: 2286,
            aoeType: 'Flame AoE',
            statusEffects: ['Flame Burn'],
            traits: ['Flame-Flame Fruit']
        },
        evolutionMaterials: {
            goldCost: 12000,
            specialItem: {
                name: 'Flame Emperor Training',
                source: 'Marineford',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 25,
                'Red Essence Stone': 8,
                'Yellow Essence Stone': 8
            }
        },
        farmingGuide: {
            priority: 'Medium',
            difficulty: 'Medium',
            tips: ['Farm Marineford', 'Evolve to Flame Emperor', 'Excellent fire damage']
        }
    },

    // Additional popular units
    'naruto_sage': {
        id: 'naruto_sage',
        name: 'Naruto',
        evolution: 'Sage Mode',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'S',
        element: 'Wind',
        icon: 'fas fa-wind',
        description: 'Sage mode Naruto with powerful wind and nature chakra abilities',
        obtainMethod: 'Evolution from Naruto',
        canEvolve: false,
        evolutionFrom: 'Naruto',
        stats: {
            damage: 6800,
            spa: 1.1,
            range: 400,
            dps: 6182,
            aoeType: 'Spiral AoE',
            statusEffects: ['Wind Slash', 'Nature Chakra'],
            traits: ['Sage Mode', 'Wind Mastery']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Sage Toad Scroll',
                source: 'Hidden Leaf Village',
                dropRate: '1-3 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 32,
                'Green Essence Stone': 10,
                'Yellow Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Medium',
            tips: ['Farm Hidden Leaf Village', 'Strong wind DPS', 'Good for beginners']
        }
    },

    'sasuke_eternal': {
        id: 'sasuke_eternal',
        name: 'Sasuke',
        evolution: 'Eternal Mangekyou',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'S',
        element: 'Electric',
        icon: 'fas fa-bolt',
        description: 'Eternal Mangekyou Sasuke with lightning and space-time abilities',
        obtainMethod: 'Evolution from Sasuke',
        canEvolve: false,
        evolutionFrom: 'Sasuke',
        stats: {
            damage: 7200,
            spa: 1.0,
            range: 450,
            dps: 7200,
            aoeType: 'Teleport AoE',
            statusEffects: ['Lightning Strike', 'Amaterasu'],
            traits: ['Eternal Mangekyou', 'Lightning Mastery']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Eternal Mangekyou Eye',
                source: 'Uchiha Clan Ruins',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 30,
                'Yellow Essence Stone': 12,
                'Purple Essence Stone': 10,
                'Rainbow Essence Stone': 1
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Uchiha Clan Ruins', 'Excellent single target DPS', 'Unique teleport abilities']
        }
    },

    'goku_ultra': {
        id: 'goku_ultra',
        name: 'Goku',
        evolution: 'Ultra Instinct',
        type: 'Meta-DPS',
        rarity: 'Exclusive',
        tier: 'S+',
        element: 'Physical',
        icon: 'fas fa-fist-raised',
        description: 'Ultra Instinct Goku with godly combat abilities and instant reflexes',
        obtainMethod: 'Limited Event',
        canEvolve: false,
        evolutionFrom: 'Goku',
        stats: {
            damage: 15000,
            spa: 0.5,
            range: 600,
            dps: 30000,
            aoeType: 'Full Map',
            statusEffects: ['Ultra Instinct', 'God Ki'],
            traits: ['Ultra Instinct', 'Saiyan Physiology']
        },
        evolutionMaterials: {
            goldCost: 20000,
            specialItem: {
                name: 'Ultra Instinct Sign',
                source: 'Tournament of Power',
                cost: 'Event Currency'
            },
            essenceStones: {
                'Green Essence Stone': 50,
                'Rainbow Essence Stone': 5,
                'God Essence': 10
            }
        },
        farmingGuide: {
            priority: 'Highest',
            difficulty: 'Very Hard',
            tips: ['Limited time event', 'Highest DPS in game', 'Save all resources']
        }
    },

    'vegeta_blue': {
        id: 'vegeta_blue',
        name: 'Vegeta',
        evolution: 'Super Saiyan Blue',
        type: 'Meta-DPS',
        rarity: 'Secret',
        tier: 'S',
        element: 'Physical',
        icon: 'fas fa-fist-raised',
        description: 'Super Saiyan Blue Vegeta with overwhelming power and pride',
        obtainMethod: 'Evolution from Vegeta',
        canEvolve: false,
        evolutionFrom: 'Vegeta',
        stats: {
            damage: 8500,
            spa: 0.8,
            range: 500,
            dps: 10625,
            aoeType: 'Beam AoE',
            statusEffects: ['God Ki', 'Pride Boost'],
            traits: ['Super Saiyan Blue', 'Saiyan Pride']
        },
        evolutionMaterials: {
            goldCost: 15000,
            specialItem: {
                name: 'Blue God Ki Essence',
                source: 'Beerus\'s Planet',
                dropRate: '1-2 per completion'
            },
            essenceStones: {
                'Green Essence Stone': 35,
                'Blue Essence Stone': 15,
                'Rainbow Essence Stone': 2
            }
        },
        farmingGuide: {
            priority: 'High',
            difficulty: 'Hard',
            tips: ['Farm Beerus\'s Planet', 'Strong physical DPS', 'Good for endgame']
        }
    }
}; 