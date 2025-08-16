// Evolution System Data Configuration
// 进化系统数据配置

// 1. 进化要求数据结构
export const EVOLUTION_DATA = {
    "tanjiro": {
        unitId: "tanjiro",
        evolutions: [
            {
                tier: 1,
                name: "Tanjiro",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 800 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Tanjiro (Water Breathing Master)", 
                requirements: { 
                    level: 35, 
                    materials: ["Water Essence x3", "Training Manual", "Demon Blood"], 
                    cost: 1500 
                },
                statMultiplier: 1.6
            },
            {
                tier: 3,
                name: "Tanjiro (Sun Breathing)",
                requirements: { 
                    level: 55, 
                    materials: ["Sun Stone x2", "Master's Teachings", "Demon King Blood", "Fire Essence x5"], 
                    cost: 2200,
                    gems: 50
                },
                statMultiplier: 2.2
            }
        ]
    },
    "goku": {
        unitId: "goku",
        evolutions: [
            {
                tier: 1,
                name: "Goku",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 2500 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Super Saiyan Goku",
                requirements: { 
                    level: 45, 
                    materials: ["Saiyan Blood x3", "Training Weights x2", "Dragon Ball"], 
                    cost: 5000 
                },
                statMultiplier: 1.8
            },
            {
                tier: 3,
                name: "Goku (Ultra Instinct)",
                requirements: { 
                    level: 70, 
                    materials: ["Angel's Blessing x2", "Divine Ki x3", "Ultra Stone", "Master's Training x5"], 
                    cost: 8000,
                    gems: 150
                },
                statMultiplier: 2.5
            }
        ]
    },
    "saitama": {
        unitId: "saitama",
        evolutions: [
            {
                tier: 1,
                name: "Saitama",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 3000 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Serious Saitama",
                requirements: { 
                    level: 50, 
                    materials: ["Hero License", "Training Equipment x2", "Monster Essence x3"], 
                    cost: 6000 
                },
                statMultiplier: 1.9
            },
            {
                tier: 3,
                name: "One Punch Man",
                requirements: { 
                    level: 75, 
                    materials: ["Hero Association Badge", "Limit Breaker x2", "God Slayer Essence", "Serious Punch Scroll x3"], 
                    cost: 10000,
                    gems: 200
                },
                statMultiplier: 2.8
            }
        ]
    },
    "ichigo": {
        unitId: "ichigo",
        evolutions: [
            {
                tier: 1,
                name: "Ichigo",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 2000 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Ichigo (Shikai)",
                requirements: { 
                    level: 40, 
                    materials: ["Soul Reaper Badge", "Zanpakuto Fragment", "Spirit Energy x3"], 
                    cost: 4000 
                },
                statMultiplier: 1.7
            },
            {
                tier: 3,
                name: "Ichigo (Bankai)",
                requirements: { 
                    level: 65, 
                    materials: ["Bankai Training Scroll", "Hollow Mask", "Soul King Fragment", "Final Getsuga x2"], 
                    cost: 7000,
                    gems: 100
                },
                statMultiplier: 2.4
            }
        ]
    },
    "luffy": {
        unitId: "luffy",
        evolutions: [
            {
                tier: 1,
                name: "Luffy",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 1800 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Luffy (Gear 2)",
                requirements: { 
                    level: 38, 
                    materials: ["Straw Hat", "Gum-Gum Fruit Essence", "Haki Training x2"], 
                    cost: 3500 
                },
                statMultiplier: 1.6
            },
            {
                tier: 3,
                name: "Luffy (Gear 4)",
                requirements: { 
                    level: 60, 
                    materials: ["Conqueror's Haki", "Awakened Fruit Power", "King's Disposition", "Gear 4 Scroll x3"], 
                    cost: 6500,
                    gems: 120
                },
                statMultiplier: 2.3
            }
        ]
    },
    "naruto": {
        unitId: "naruto",
        evolutions: [
            {
                tier: 1,
                name: "Naruto",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 2200 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Naruto (Sage Mode)",
                requirements: { 
                    level: 42, 
                    materials: ["Toad Sage Training", "Natural Energy x3", "Sage Mode Scroll"], 
                    cost: 4200 
                },
                statMultiplier: 1.7
            },
            {
                tier: 3,
                name: "Naruto (Kurama Chakra Mode)",
                requirements: { 
                    level: 68, 
                    materials: ["Nine-Tails Chakra", "Bijuu Mode Training", "Kyuubi Fragment x2", "Six Paths Power"], 
                    cost: 7500,
                    gems: 130
                },
                statMultiplier: 2.5
            }
        ]
    },
    
    // New Evolution Units Data
    "song_jinwu_igros": {
        unitId: "song_jinwu_igros",
        evolutions: [
            {
                tier: 1,
                name: "Song Jinwu and Igros",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 50000 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Song Jinwu and Igros (Evolved)",
                requirements: { 
                    level: 80, 
                    materials: ["Red Key Fragment x5", "Ancient Power x3", "Divine Essence x2"], 
                    cost: 75000,
                    gems: 500
                },
                statMultiplier: 2.0
            }
        ]
    },
    "alocard_vampire_king": {
        unitId: "alocard_vampire_king",
        evolutions: [
            {
                tier: 1,
                name: "Alocard (Vampire King)",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 25000 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Alocard (True Vampire)",
                requirements: { 
                    level: 75, 
                    materials: ["Vampire Blood x3", "Dark Crystal x2", "Immortal Essence"], 
                    cost: 50000,
                    gems: 300
                },
                statMultiplier: 1.8
            }
        ]
    },
    "slime_king": {
        unitId: "slime_king",
        evolutions: [
            {
                tier: 1,
                name: "Slime (King)",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 20000 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Slime (Emperor)",
                requirements: { 
                    level: 70, 
                    materials: ["Slime Core x3", "Nature Essence x2", "Royal Crown"], 
                    cost: 40000,
                    gems: 250
                },
                statMultiplier: 1.7
            }
        ]
    },
    "roku_super3": {
        unitId: "roku_super3",
        evolutions: [
            {
                tier: 1,
                name: "Roku (Super 3)",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 30000 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Roku (Angel)",
                requirements: { 
                    level: 85, 
                    materials: ["Angel Wing x2", "Divine Power x3", "Martial Essence x4"], 
                    cost: 60000,
                    gems: 400
                },
                statMultiplier: 2.2
            }
        ]
    },
    "saber_black_tyrant": {
        unitId: "saber_black_tyrant",
        evolutions: [
            {
                tier: 1,
                name: "Saber (Black Tyrant)",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 35000 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Saber (True Tyrant)",
                requirements: { 
                    level: 90, 
                    materials: ["Tyrant Crown x2", "Shadow Essence x3", "Dark Power x4"], 
                    cost: 70000,
                    gems: 600
                },
                statMultiplier: 2.5
            }
        ]
    },
    "lfelt_love": {
        unitId: "lfelt_love",
        evolutions: [
            {
                tier: 1,
                name: "Lfelt (Love)",
                requirements: { 
                    level: 1, 
                    materials: [], 
                    cost: 28000 
                },
                statMultiplier: 1.0
            },
            {
                tier: 2,
                name: "Lfelt (Divine)",
                requirements: { 
                    level: 78, 
                    materials: ["Divine Love x3", "Holy Essence x2", "Sacred Power x3"], 
                    cost: 55000,
                    gems: 350
                },
                statMultiplier: 1.9
            }
        ]
    }
};

// 2. 材料系统数据
export const MATERIALS_DATA = {
    // Common Materials
    "Water Essence": {
        name: "Water Essence",
        rarity: "Common",
        source: ["Story Mode Ch1-5", "Daily Missions", "Water Dungeon"],
        description: "Pure essence of flowing water",
        dropRate: "70%",
        cost: 50
    },
    "Training Manual": {
        name: "Training Manual",
        rarity: "Uncommon", 
        source: ["Story Mode Ch6-10", "Weekly Missions", "Training Grounds"],
        description: "Ancient combat techniques",
        dropRate: "45%",
        cost: 150
    },
    "Demon Blood": {
        name: "Demon Blood",
        rarity: "Rare",
        source: ["Boss Battles", "Infinite Mode", "Demon Realm"],
        description: "Blood from defeated demons",
        dropRate: "25%",
        cost: 300
    },
    "Sun Stone": {
        name: "Sun Stone",
        rarity: "Epic",
        source: ["Raid Battles", "Special Events", "Sun Temple"],
        description: "Stone blessed by the sun's power",
        dropRate: "10%",
        cost: 800
    },
    "Master's Teachings": {
        name: "Master's Teachings",
        rarity: "Epic",
        source: ["Master Trials", "Special Events", "Ancient Library"],
        description: "Wisdom passed down from masters",
        dropRate: "12%",
        cost: 750
    },
    "Demon King Blood": {
        name: "Demon King Blood",
        rarity: "Legendary",
        source: ["Demon King Raid", "Mythic Events", "Abyss"],
        description: "Blood of the demon king",
        dropRate: "5%",
        cost: 1500
    },
    "Fire Essence": {
        name: "Fire Essence",
        rarity: "Uncommon",
        source: ["Fire Dungeon", "Daily Missions", "Volcanic Area"],
        description: "Essence of pure fire",
        dropRate: "50%",
        cost: 120
    },
    
    // Dragon Ball Materials
    "Saiyan Blood": {
        name: "Saiyan Blood",
        rarity: "Rare",
        source: ["Saiyan Battles", "Space Missions", "Planet Vegeta"],
        description: "Blood of the warrior race",
        dropRate: "30%",
        cost: 400
    },
    "Training Weights": {
        name: "Training Weights",
        rarity: "Uncommon",
        source: ["Gravity Chamber", "Training Missions", "Kami's Lookout"],
        description: "Heavy weights for training",
        dropRate: "40%",
        cost: 200
    },
    "Dragon Ball": {
        name: "Dragon Ball",
        rarity: "Epic",
        source: ["Dragon Ball Hunt", "Special Events", "Wish Summon"],
        description: "One of the seven dragon balls",
        dropRate: "15%",
        cost: 1000
    },
    "Divine Ki": {
        name: "Divine Ki",
        rarity: "Legendary",
        source: ["Ultra Raids", "Monthly Events", "Divine Realm"],
        description: "Energy of divine beings",
        dropRate: "3%",
        cost: 2000
    },
    "Ultra Stone": {
        name: "Ultra Stone",
        rarity: "Mythic",
        source: ["Ultra Instinct Trial", "Limited Events", "God's Domain"],
        description: "Stone containing ultra instinct power",
        dropRate: "1%",
        cost: 5000
    },
    "Master's Training": {
        name: "Master's Training",
        rarity: "Epic",
        source: ["Master's Trial", "Training Events", "Whis's Training"],
        description: "Advanced training techniques",
        dropRate: "8%",
        cost: 900
    },
    "Angel's Blessing": {
        name: "Angel's Blessing",
        rarity: "Mythic",
        source: ["Mythic Raids", "Limited Events", "Angel Realm"],
        description: "Blessing from celestial angels",
        dropRate: "0.5%",
        cost: 8000
    },
    
    // One Punch Man Materials
    "Hero License": {
        name: "Hero License",
        rarity: "Rare",
        source: ["Hero Association", "Hero Tests", "City Missions"],
        description: "Official hero license",
        dropRate: "35%",
        cost: 350
    },
    "Training Equipment": {
        name: "Training Equipment",
        rarity: "Uncommon",
        source: ["Training Centers", "Daily Workouts", "Fitness Events"],
        description: "Professional training gear",
        dropRate: "55%",
        cost: 180
    },
    "Monster Essence": {
        name: "Monster Essence",
        rarity: "Rare",
        source: ["Monster Battles", "Disaster Events", "Underground"],
        description: "Essence from defeated monsters",
        dropRate: "28%",
        cost: 380
    },
    "Hero Association Badge": {
        name: "Hero Association Badge",
        rarity: "Epic",
        source: ["Hero Rankings", "Special Events", "Association HQ"],
        description: "Prestigious hero association badge",
        dropRate: "12%",
        cost: 850
    },
    "Limit Breaker": {
        name: "Limit Breaker",
        rarity: "Legendary",
        source: ["Limit Breaking Events", "Mythic Battles", "Power Trials"],
        description: "Breaks through power limits",
        dropRate: "4%",
        cost: 1800
    },
    "God Slayer Essence": {
        name: "God Slayer Essence",
        rarity: "Mythic",
        source: ["God Level Threats", "Mythic Events", "Cosmic Battles"],
        description: "Essence from defeating god-level threats",
        dropRate: "0.8%",
        cost: 6000
    },
    "Serious Punch Scroll": {
        name: "Serious Punch Scroll",
        rarity: "Legendary",
        source: ["Serious Training", "Mythic Events", "Power Mastery"],
        description: "Scroll containing serious punch technique",
        dropRate: "2%",
        cost: 2500
    },
    
    // Bleach Materials
    "Soul Reaper Badge": {
        name: "Soul Reaper Badge",
        rarity: "Rare",
        source: ["Soul Society", "Shinigami Missions", "Academy Training"],
        description: "Badge of a soul reaper",
        dropRate: "32%",
        cost: 320
    },
    "Zanpakuto Fragment": {
        name: "Zanpakuto Fragment",
        rarity: "Epic",
        source: ["Zanpakuto Battles", "Spirit World", "Sword Training"],
        description: "Fragment of a zanpakuto",
        dropRate: "14%",
        cost: 780
    },
    "Spirit Energy": {
        name: "Spirit Energy",
        rarity: "Uncommon",
        source: ["Spirit World", "Daily Missions", "Reiatsu Training"],
        description: "Pure spirit energy",
        dropRate: "60%",
        cost: 100
    },
    "Bankai Training Scroll": {
        name: "Bankai Training Scroll",
        rarity: "Legendary",
        source: ["Bankai Training", "Mythic Events", "Master's Teachings"],
        description: "Scroll for bankai training",
        dropRate: "3%",
        cost: 2200
    },
    "Hollow Mask": {
        name: "Hollow Mask",
        rarity: "Epic",
        source: ["Hollow Battles", "Hueco Mundo", "Dark Events"],
        description: "Mask of a hollow",
        dropRate: "11%",
        cost: 820
    },
    "Soul King Fragment": {
        name: "Soul King Fragment",
        rarity: "Mythic",
        source: ["Soul King Battles", "Mythic Events", "Royal Palace"],
        description: "Fragment of the soul king",
        dropRate: "0.3%",
        cost: 10000
    },
    "Final Getsuga": {
        name: "Final Getsuga",
        rarity: "Legendary",
        source: ["Final Training", "Mythic Events", "Power Awakening"],
        description: "Ultimate getsuga technique",
        dropRate: "1.5%",
        cost: 3000
    },
    
    // One Piece Materials
    "Straw Hat": {
        name: "Straw Hat",
        rarity: "Rare",
        source: ["Pirate Battles", "Sea Missions", "Treasure Hunts"],
        description: "Iconic straw hat",
        dropRate: "38%",
        cost: 280
    },
    "Gum-Gum Fruit Essence": {
        name: "Gum-Gum Fruit Essence",
        rarity: "Epic",
        source: ["Devil Fruit Battles", "Special Events", "Fruit Hunt"],
        description: "Essence of the gum-gum fruit",
        dropRate: "13%",
        cost: 880
    },
    "Haki Training": {
        name: "Haki Training",
        rarity: "Uncommon",
        source: ["Haki Training", "Daily Missions", "Combat Practice"],
        description: "Training for haki mastery",
        dropRate: "48%",
        cost: 160
    },
    "Conqueror's Haki": {
        name: "Conqueror's Haki",
        rarity: "Legendary",
        source: ["King's Battles", "Mythic Events", "Royal Training"],
        description: "The rarest form of haki",
        dropRate: "2%",
        cost: 2800
    },
    "Awakened Fruit Power": {
        name: "Awakened Fruit Power",
        rarity: "Mythic",
        source: ["Awakening Events", "Mythic Battles", "Power Evolution"],
        description: "Power of awakened devil fruit",
        dropRate: "0.7%",
        cost: 7000
    },
    "King's Disposition": {
        name: "King's Disposition",
        rarity: "Legendary",
        source: ["King's Trials", "Mythic Events", "Royal Bloodline"],
        description: "Disposition of a true king",
        dropRate: "1.8%",
        cost: 3200
    },
    "Gear 4 Scroll": {
        name: "Gear 4 Scroll",
        rarity: "Epic",
        source: ["Gear Training", "Special Events", "Power Mastery"],
        description: "Scroll containing gear 4 technique",
        dropRate: "9%",
        cost: 950
    },
    
    // Naruto Materials
    "Toad Sage Training": {
        name: "Toad Sage Training",
        rarity: "Rare",
        source: ["Mount Myoboku", "Sage Training", "Toad Contracts"],
        description: "Training from toad sages",
        dropRate: "33%",
        cost: 310
    },
    "Natural Energy": {
        name: "Natural Energy",
        rarity: "Uncommon",
        source: ["Nature Training", "Daily Missions", "Natural Sites"],
        description: "Pure natural energy",
        dropRate: "52%",
        cost: 140
    },
    "Sage Mode Scroll": {
        name: "Sage Mode Scroll",
        rarity: "Epic",
        source: ["Sage Training", "Special Events", "Ancient Scrolls"],
        description: "Scroll for sage mode training",
        dropRate: "11%",
        cost: 870
    },
    "Nine-Tails Chakra": {
        name: "Nine-Tails Chakra",
        rarity: "Legendary",
        source: ["Nine-Tails Battles", "Mythic Events", "Bijuu Mode"],
        description: "Chakra of the nine-tailed fox",
        dropRate: "2.5%",
        cost: 2600
    },
    "Bijuu Mode Training": {
        name: "Bijuu Mode Training",
        rarity: "Epic",
        source: ["Bijuu Training", "Special Events", "Tailed Beast Mode"],
        description: "Training for bijuu mode",
        dropRate: "10%",
        cost: 920
    },
    "Kyuubi Fragment": {
        name: "Kyuubi Fragment",
        rarity: "Legendary",
        source: ["Kyuubi Battles", "Mythic Events", "Tailed Beast Power"],
        description: "Fragment of the nine-tails",
        dropRate: "3.5%",
        cost: 2100
    },
    "Six Paths Power": {
        name: "Six Paths Power",
        rarity: "Mythic",
        source: ["Six Paths Battles", "Mythic Events", "Divine Power"],
        description: "Power of the six paths",
        dropRate: "0.4%",
        cost: 12000
    },
    
    // New Evolution Materials
    "Red Key Fragment": {
        name: "Red Key Fragment",
        rarity: "Legendary",
        source: ["Red Key Quest", "Special Events", "Ancient Ruins"],
        description: "Fragment of the legendary red key",
        dropRate: "5%",
        cost: 2000
    },
    "Ancient Power": {
        name: "Ancient Power",
        rarity: "Epic",
        source: ["Ancient Battles", "Special Events", "Forgotten Temples"],
        description: "Power from ancient times",
        dropRate: "12%",
        cost: 800
    },
    "Divine Essence": {
        name: "Divine Essence",
        rarity: "Mythic",
        source: ["Divine Battles", "Mythic Events", "God's Domain"],
        description: "Essence of divine power",
        dropRate: "1%",
        cost: 5000
    },
    "Vampire Blood": {
        name: "Vampire Blood",
        rarity: "Rare",
        source: ["Vampire Battles", "Dark Events", "Blood Castle"],
        description: "Blood of ancient vampires",
        dropRate: "25%",
        cost: 400
    },
    "Dark Crystal": {
        name: "Dark Crystal",
        rarity: "Epic",
        source: ["Dark Realm", "Shadow Events", "Crystal Caves"],
        description: "Crystal infused with dark energy",
        dropRate: "15%",
        cost: 900
    },
    "Immortal Essence": {
        name: "Immortal Essence",
        rarity: "Legendary",
        source: ["Immortal Battles", "Mythic Events", "Eternal Realm"],
        description: "Essence of immortality",
        dropRate: "3%",
        cost: 2500
    },
    "Slime Core": {
        name: "Slime Core",
        rarity: "Uncommon",
        source: ["Slime Battles", "Nature Events", "Slime Forest"],
        description: "Core of a powerful slime",
        dropRate: "40%",
        cost: 200
    },
    "Nature Essence": {
        name: "Nature Essence",
        rarity: "Rare",
        source: ["Nature Battles", "Forest Events", "Natural Springs"],
        description: "Essence of natural power",
        dropRate: "30%",
        cost: 350
    },
    "Royal Crown": {
        name: "Royal Crown",
        rarity: "Epic",
        source: ["Royal Battles", "Special Events", "Royal Palace"],
        description: "Crown of royal authority",
        dropRate: "10%",
        cost: 1000
    },
    "Angel Wing": {
        name: "Angel Wing",
        rarity: "Legendary",
        source: ["Angel Battles", "Mythic Events", "Heavenly Realm"],
        description: "Wing of a celestial angel",
        dropRate: "4%",
        cost: 3000
    },
    "Divine Power": {
        name: "Divine Power",
        rarity: "Epic",
        source: ["Divine Battles", "Special Events", "Sacred Temples"],
        description: "Power of divine beings",
        dropRate: "8%",
        cost: 1200
    },
    "Martial Essence": {
        name: "Martial Essence",
        rarity: "Rare",
        source: ["Martial Battles", "Training Events", "Martial Island"],
        description: "Essence of martial arts",
        dropRate: "35%",
        cost: 300
    },
    "Tyrant Crown": {
        name: "Tyrant Crown",
        rarity: "Legendary",
        source: ["Tyrant Battles", "Mythic Events", "Tyrant's Throne"],
        description: "Crown of absolute tyranny",
        dropRate: "2%",
        cost: 4000
    },
    "Shadow Essence": {
        name: "Shadow Essence",
        rarity: "Epic",
        source: ["Shadow Battles", "Dark Events", "Shadow Realm"],
        description: "Essence of shadow power",
        dropRate: "11%",
        cost: 850
    },
    "Dark Power": {
        name: "Dark Power",
        rarity: "Rare",
        source: ["Dark Battles", "Shadow Events", "Dark Realm"],
        description: "Power of darkness",
        dropRate: "28%",
        cost: 450
    },
    "Divine Love": {
        name: "Divine Love",
        rarity: "Epic",
        source: ["Love Battles", "Holy Events", "Temple of Love"],
        description: "Power of divine love",
        dropRate: "9%",
        cost: 1100
    },
    "Holy Essence": {
        name: "Holy Essence",
        rarity: "Rare",
        source: ["Holy Battles", "Sacred Events", "Holy Temples"],
        description: "Essence of holy power",
        dropRate: "32%",
        cost: 380
    },
    "Sacred Power": {
        name: "Sacred Power",
        rarity: "Epic",
        source: ["Sacred Battles", "Holy Events", "Sacred Grounds"],
        description: "Power of sacred beings",
        dropRate: "7%",
        cost: 1300
    }
};

// 3. 农场指南数据
export const FARMING_GUIDE_DATA = {
    "tanjiro": {
        unitId: "tanjiro",
        farmingGuide: {
            priority: "High",
            difficulty: "Medium",
            estimatedTime: "2-3 weeks",
            tips: [
                "Focus on Water Essence farming first (70% drop rate)",
                "Use Training Manuals from weekly missions",
                "Demon Blood requires boss battles - save energy",
                "Sun Stone is rare - participate in all raid events"
            ],
            obtainMethods: [
                {
                    material: "Water Essence",
                    bestLocation: "Story Mode Ch1-5",
                    alternativeLocations: ["Daily Missions", "Water Dungeon"],
                    energyCost: 10,
                    dropRate: "70%"
                },
                {
                    material: "Training Manual",
                    bestLocation: "Story Mode Ch6-10",
                    alternativeLocations: ["Weekly Missions", "Training Grounds"],
                    energyCost: 15,
                    dropRate: "45%"
                },
                {
                    material: "Demon Blood",
                    bestLocation: "Boss Battles",
                    alternativeLocations: ["Infinite Mode", "Demon Realm"],
                    energyCost: 25,
                    dropRate: "25%"
                },
                {
                    material: "Sun Stone",
                    bestLocation: "Raid Battles",
                    alternativeLocations: ["Special Events", "Sun Temple"],
                    energyCost: 50,
                    dropRate: "10%"
                }
            ]
        }
    },
    "goku": {
        unitId: "goku",
        farmingGuide: {
            priority: "Very High",
            difficulty: "Hard",
            estimatedTime: "3-4 weeks",
            tips: [
                "Saiyan Blood is essential - focus on space missions",
                "Training Weights are common but needed in bulk",
                "Dragon Ball events are rare - don't miss them",
                "Ultra Stone is extremely rare - save gems for events"
            ],
            obtainMethods: [
                {
                    material: "Saiyan Blood",
                    bestLocation: "Saiyan Battles",
                    alternativeLocations: ["Space Missions", "Planet Vegeta"],
                    energyCost: 20,
                    dropRate: "30%"
                },
                {
                    material: "Training Weights",
                    bestLocation: "Gravity Chamber",
                    alternativeLocations: ["Training Missions", "Kami's Lookout"],
                    energyCost: 12,
                    dropRate: "40%"
                },
                {
                    material: "Dragon Ball",
                    bestLocation: "Dragon Ball Hunt",
                    alternativeLocations: ["Special Events", "Wish Summon"],
                    energyCost: 30,
                    dropRate: "15%"
                },
                {
                    material: "Angel's Blessing",
                    bestLocation: "Mythic Raids",
                    alternativeLocations: ["Limited Events", "Angel Realm"],
                    energyCost: 100,
                    dropRate: "0.5%"
                }
            ]
        }
    },
    
    // New Evolution Units Farming Guide
    "song_jinwu_igros": {
        unitId: "song_jinwu_igros",
        farmingGuide: {
            priority: "Very High",
            difficulty: "Extreme",
            estimatedTime: "4-6 weeks",
            tips: [
                "Red Key Fragment is extremely rare - focus on Red Key Quest events",
                "Ancient Power requires special events - save energy for them",
                "Divine Essence is mythic rarity - participate in all mythic raids",
                "This is a Vanguard unit - expect high difficulty and costs"
            ],
            obtainMethods: [
                {
                    material: "Red Key Fragment",
                    bestLocation: "Red Key Quest",
                    alternativeLocations: ["Special Events", "Ancient Ruins"],
                    energyCost: 100,
                    dropRate: "5%"
                },
                {
                    material: "Ancient Power",
                    bestLocation: "Ancient Battles",
                    alternativeLocations: ["Special Events", "Forgotten Temples"],
                    energyCost: 80,
                    dropRate: "12%"
                },
                {
                    material: "Divine Essence",
                    bestLocation: "Divine Battles",
                    alternativeLocations: ["Mythic Events", "God's Domain"],
                    energyCost: 150,
                    dropRate: "1%"
                }
            ]
        }
    },
    "alocard_vampire_king": {
        unitId: "alocard_vampire_king",
        farmingGuide: {
            priority: "High",
            difficulty: "Hard",
            estimatedTime: "3-4 weeks",
            tips: [
                "Vampire Blood is common but needed in bulk",
                "Dark Crystal requires shadow events - save energy",
                "Immortal Essence is legendary - focus on mythic events",
                "This is a Secret rarity unit - moderate difficulty"
            ],
            obtainMethods: [
                {
                    material: "Vampire Blood",
                    bestLocation: "Vampire Battles",
                    alternativeLocations: ["Dark Events", "Blood Castle"],
                    energyCost: 25,
                    dropRate: "25%"
                },
                {
                    material: "Dark Crystal",
                    bestLocation: "Dark Realm",
                    alternativeLocations: ["Shadow Events", "Crystal Caves"],
                    energyCost: 40,
                    dropRate: "15%"
                },
                {
                    material: "Immortal Essence",
                    bestLocation: "Immortal Battles",
                    alternativeLocations: ["Mythic Events", "Eternal Realm"],
                    energyCost: 120,
                    dropRate: "3%"
                }
            ]
        }
    },
    "slime_king": {
        unitId: "slime_king",
        farmingGuide: {
            priority: "Medium",
            difficulty: "Medium",
            estimatedTime: "2-3 weeks",
            tips: [
                "Slime Core is common - easy to farm",
                "Nature Essence requires nature events",
                "Royal Crown is epic rarity - moderate difficulty",
                "This is a Secret rarity unit - balanced difficulty"
            ],
            obtainMethods: [
                {
                    material: "Slime Core",
                    bestLocation: "Slime Battles",
                    alternativeLocations: ["Nature Events", "Slime Forest"],
                    energyCost: 15,
                    dropRate: "40%"
                },
                {
                    material: "Nature Essence",
                    bestLocation: "Nature Battles",
                    alternativeLocations: ["Forest Events", "Natural Springs"],
                    energyCost: 20,
                    dropRate: "30%"
                },
                {
                    material: "Royal Crown",
                    bestLocation: "Royal Battles",
                    alternativeLocations: ["Special Events", "Royal Palace"],
                    energyCost: 50,
                    dropRate: "10%"
                }
            ]
        }
    },
    "roku_super3": {
        unitId: "roku_super3",
        farmingGuide: {
            priority: "High",
            difficulty: "Hard",
            estimatedTime: "3-4 weeks",
            tips: [
                "Angel Wing is legendary - focus on mythic events",
                "Divine Power requires special events",
                "Martial Essence is common but needed in bulk",
                "This is a Secret rarity unit - high difficulty"
            ],
            obtainMethods: [
                {
                    material: "Angel Wing",
                    bestLocation: "Angel Battles",
                    alternativeLocations: ["Mythic Events", "Heavenly Realm"],
                    energyCost: 100,
                    dropRate: "4%"
                },
                {
                    material: "Divine Power",
                    bestLocation: "Divine Battles",
                    alternativeLocations: ["Special Events", "Sacred Temples"],
                    energyCost: 60,
                    dropRate: "8%"
                },
                {
                    material: "Martial Essence",
                    bestLocation: "Martial Battles",
                    alternativeLocations: ["Training Events", "Martial Island"],
                    energyCost: 25,
                    dropRate: "35%"
                }
            ]
        }
    },
    "saber_black_tyrant": {
        unitId: "saber_black_tyrant",
        farmingGuide: {
            priority: "Very High",
            difficulty: "Extreme",
            estimatedTime: "4-5 weeks",
            tips: [
                "Tyrant Crown is legendary - extremely rare",
                "Shadow Essence requires shadow events",
                "Dark Power is common but needed in bulk",
                "This is a Secret rarity unit - extreme difficulty"
            ],
            obtainMethods: [
                {
                    material: "Tyrant Crown",
                    bestLocation: "Tyrant Battles",
                    alternativeLocations: ["Mythic Events", "Tyrant's Throne"],
                    energyCost: 120,
                    dropRate: "2%"
                },
                {
                    material: "Shadow Essence",
                    bestLocation: "Shadow Battles",
                    alternativeLocations: ["Dark Events", "Shadow Realm"],
                    energyCost: 45,
                    dropRate: "11%"
                },
                {
                    material: "Dark Power",
                    bestLocation: "Dark Battles",
                    alternativeLocations: ["Shadow Events", "Dark Realm"],
                    energyCost: 20,
                    dropRate: "28%"
                }
            ]
        }
    },
    "lfelt_love": {
        unitId: "lfelt_love",
        farmingGuide: {
            priority: "High",
            difficulty: "Hard",
            estimatedTime: "3-4 weeks",
            tips: [
                "Divine Love requires love events - special timing",
                "Holy Essence is common but needed in bulk",
                "Sacred Power requires sacred events",
                "This is a Secret rarity unit - moderate difficulty"
            ],
            obtainMethods: [
                {
                    material: "Divine Love",
                    bestLocation: "Love Battles",
                    alternativeLocations: ["Holy Events", "Temple of Love"],
                    energyCost: 55,
                    dropRate: "9%"
                },
                {
                    material: "Holy Essence",
                    bestLocation: "Holy Battles",
                    alternativeLocations: ["Sacred Events", "Holy Temples"],
                    energyCost: 25,
                    dropRate: "32%"
                },
                {
                    material: "Sacred Power",
                    bestLocation: "Sacred Battles",
                    alternativeLocations: ["Holy Events", "Sacred Grounds"],
                    energyCost: 50,
                    dropRate: "7%"
                }
            ]
        }
    }
};

// 4. 成本总结数据
export const COST_SUMMARY_DATA = {
    "tanjiro": {
        unitId: "tanjiro",
        costSummary: {
            totalGoldCost: 4500,
            totalGemsCost: 50,
            totalMaterials: 12,
            breakdown: [
                {
                    tier: 1,
                    goldCost: 800,
                    gemsCost: 0,
                    materials: 0
                },
                {
                    tier: 2,
                    goldCost: 1500,
                    gemsCost: 0,
                    materials: 5
                },
                {
                    tier: 3,
                    goldCost: 2200,
                    gemsCost: 50,
                    materials: 7
                }
            ]
        }
    },
    "goku": {
        unitId: "goku",
        costSummary: {
            totalGoldCost: 15500,
            totalGemsCost: 150,
            totalMaterials: 13,
            breakdown: [
                {
                    tier: 1,
                    goldCost: 2500,
                    gemsCost: 0,
                    materials: 0
                },
                {
                    tier: 2,
                    goldCost: 5000,
                    gemsCost: 0,
                    materials: 6
                },
                {
                    tier: 3,
                    goldCost: 8000,
                    gemsCost: 150,
                    materials: 7
                }
            ]
        }
    },
    
    // New Evolution Units Cost Data
    "song_jinwu_igros": {
        unitId: "song_jinwu_igros",
        costSummary: {
            totalGoldCost: 125000,
            totalGemsCost: 500,
            totalMaterials: 10,
            breakdown: [
                {
                    tier: 1,
                    goldCost: 50000,
                    gemsCost: 0,
                    materials: 0
                },
                {
                    tier: 2,
                    goldCost: 75000,
                    gemsCost: 500,
                    materials: 10
                }
            ]
        }
    },
    "alocard_vampire_king": {
        unitId: "alocard_vampire_king",
        costSummary: {
            totalGoldCost: 75000,
            totalGemsCost: 300,
            totalMaterials: 6,
            breakdown: [
                {
                    tier: 1,
                    goldCost: 25000,
                    gemsCost: 0,
                    materials: 0
                },
                {
                    tier: 2,
                    goldCost: 50000,
                    gemsCost: 300,
                    materials: 6
                }
            ]
        }
    },
    "slime_king": {
        unitId: "slime_king",
        costSummary: {
            totalGoldCost: 60000,
            totalGemsCost: 250,
            totalMaterials: 6,
            breakdown: [
                {
                    tier: 1,
                    goldCost: 20000,
                    gemsCost: 0,
                    materials: 0
                },
                {
                    tier: 2,
                    goldCost: 40000,
                    gemsCost: 250,
                    materials: 6
                }
            ]
        }
    },
    "roku_super3": {
        unitId: "roku_super3",
        costSummary: {
            totalGoldCost: 90000,
            totalGemsCost: 400,
            totalMaterials: 9,
            breakdown: [
                {
                    tier: 1,
                    goldCost: 30000,
                    gemsCost: 0,
                    materials: 0
                },
                {
                    tier: 2,
                    goldCost: 60000,
                    gemsCost: 400,
                    materials: 9
                }
            ]
        }
    },
    "saber_black_tyrant": {
        unitId: "saber_black_tyrant",
        costSummary: {
            totalGoldCost: 105000,
            totalGemsCost: 600,
            totalMaterials: 9,
            breakdown: [
                {
                    tier: 1,
                    goldCost: 35000,
                    gemsCost: 0,
                    materials: 0
                },
                {
                    tier: 2,
                    goldCost: 70000,
                    gemsCost: 600,
                    materials: 9
                }
            ]
        }
    },
    "lfelt_love": {
        unitId: "lfelt_love",
        costSummary: {
            totalGoldCost: 83000,
            totalGemsCost: 350,
            totalMaterials: 8,
            breakdown: [
                {
                    tier: 1,
                    goldCost: 28000,
                    gemsCost: 0,
                    materials: 0
                },
                {
                    tier: 2,
                    goldCost: 55000,
                    gemsCost: 350,
                    materials: 8
                }
            ]
        }
    }
};

// 5. 工具函数
export const evolutionUtils = {
    // 获取单位的进化数据
    getEvolutionData(unitId) {
        return EVOLUTION_DATA[unitId] || null;
    },
    
    // 获取材料数据
    getMaterialData(materialName) {
        return MATERIALS_DATA[materialName] || null;
    },
    
    // 解析材料字符串 (例如: "Water Essence x3")
    parseMaterialString(materialString) {
        const match = materialString.match(/^(.+?)\s*x\s*(\d+)$/);
        if (match) {
            return {
                name: match[1].trim(),
                quantity: parseInt(match[2])
            };
        }
        return {
            name: materialString.trim(),
            quantity: 1
        };
    },
    
    // 计算材料总成本
    calculateMaterialCost(materials) {
        let totalCost = 0;
        materials.forEach(materialString => {
            const material = this.parseMaterialString(materialString);
            const materialData = this.getMaterialData(material.name);
            if (materialData) {
                totalCost += materialData.cost * material.quantity;
            }
        });
        return totalCost;
    },
    
    // 获取稀有度颜色
    getRarityColor(rarity) {
        const colors = {
            'Common': '#9e9e9e',
            'Uncommon': '#4caf50',
            'Rare': '#2196f3',
            'Epic': '#9c27b0',
            'Legendary': '#ff9800',
            'Mythic': '#f44336'
        };
        return colors[rarity] || '#9e9e9e';
    },
    
    // 格式化掉落率显示
    formatDropRate(dropRate) {
        const rate = parseFloat(dropRate);
        if (rate >= 50) return `${dropRate} (High)`;
        if (rate >= 20) return `${dropRate} (Medium)`;
        if (rate >= 5) return `${dropRate} (Low)`;
        return `${dropRate} (Very Low)`;
    }
};
