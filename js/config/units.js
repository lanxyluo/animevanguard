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
    }
}; 