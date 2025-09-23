/**
 * Anime Vanguards Tier List Data System
 * Complete character database with tier rankings and statistics
 */

// Character data structure with all 18 core units
const TIER_LIST_DATA = {
    // BROKEN Tier - Game-breaking units with exceptional performance
    BROKEN: [
        {
            id: "song_jinwu_igros",
            name: "Song Jinwu and Igros",
            tier: "BROKEN",
            rarity: "Vanguard",
            element: "Unknown",
            deploymentCost: 1700,
            maxCost: 105700,
            description: "Strongest DPS with summon abilities, universal across all game modes",
            pros: [
                "Highest DPS in the game",
                "Powerful summon abilities", 
                "Works in all game modes",
                "Excellent value despite cost",
                "Unique Unknown element"
            ],
            cons: [
                "Very high total upgrade cost",
                "Requires significant investment"
            ],
            gameMode: {
                story: "S+",
                infinite: "S+",
                raid: "S+",
                challenge: "S+"
            },
            stats: {
                dps: 200000,
                range: 180,
                placement: 6
            },
            abilities: [
                "Shadow Army Summon",
                "Monarch's Domain",
                "Igros Fusion"
            ],
            animeSource: "Solo Leveling",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "iscanur_pride",
            name: "Iscanur (Pride)",
            tier: "BROKEN",
            rarity: "Vanguard",
            element: "Dark",
            deploymentCost: 7500,
            maxCost: 170520,
            description: "Extremely high DPS but expensive cost, essential late-game core damage dealer",
            pros: [
                "Massive single-target DPS",
                "Pride form transformation",
                "Late-game powerhouse",
                "Dark element synergy"
            ],
            cons: [
                "Extremely expensive to deploy",
                "Highest total upgrade cost",
                "Requires heavy investment"
            ],
            gameMode: {
                story: "A",
                infinite: "S+",
                raid: "S+",
                challenge: "S"
            },
            stats: {
                dps: 180000,
                range: 160,
                placement: 4
            },
            abilities: [
                "Pride Manifestation",
                "Demon Lord's Wrath",
                "Infernal Strike"
            ],
            animeSource: "Seven Deadly Sins",
            obtainMethod: "Vanguard Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "koguro_unsealed",
            name: "Koguro (Unsealed)",
            tier: "BROKEN",
            rarity: "Vanguard", 
            element: "Nature",
            deploymentCost: 3500,
            maxCost: 151000,
            description: "Beast Burst skill with one-shot potential, extremely cost-efficient",
            pros: [
                "One-shot potential with Beast Burst",
                "Excellent cost efficiency",
                "Nature element versatility",
                "High damage scaling"
            ],
            cons: [
                "Skill-dependent performance",
                "Requires proper timing"
            ],
            gameMode: {
                story: "S+",
                infinite: "S",
                raid: "S+",
                challenge: "S+"
            },
            stats: {
                dps: 165000,
                range: 150,
                placement: 5
            },
            abilities: [
                "Beast Burst",
                "Unsealed Power",
                "Nature's Fury"
            ],
            animeSource: "Jujutsu Kaisen",
            obtainMethod: "Vanguard Banner",
            lastUpdated: "2025-01-17"
        }
    ],

    // META Tier - Top-tier units defining the current meta
    META: [
        {
            id: "yehowach_almighty",
            name: "Yehowach (Almighty)",
            tier: "META",
            rarity: "Secret",
            element: "Holy",
            deploymentCost: 1400,
            maxCost: 67550,
            description: "150k DPS with 160 range, immune to all status effects",
            pros: [
                "150k+ DPS output",
                "Exceptional 160 range",
                "Complete status immunity",
                "Holy element advantage",
                "Reasonable deployment cost"
            ],
            cons: [
                "Secret rarity acquisition",
                "Requires evolution materials"
            ],
            gameMode: {
                story: "S+",
                infinite: "S+",
                raid: "S",
                challenge: "S+"
            },
            stats: {
                dps: 150000,
                range: 160,
                placement: 6
            },
            abilities: [
                "The Almighty",
                "Quincy King's Power",
                "Future Sight"
            ],
            animeSource: "Bleach",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "alucard_vampire_king",
            name: "Alucard (Vampire King)",
            tier: "META",
            rarity: "Secret",
            element: "Dark",
            deploymentCost: 2000,
            maxCost: 98900,
            description: "Vampire King form with powerful single-target damage output",
            pros: [
                "Vampire King transformation",
                "Strong single-target focus",
                "Dark element synergy",
                "Lifesteal abilities"
            ],
            cons: [
                "Higher deployment cost",
                "Form-dependent power"
            ],
            gameMode: {
                story: "S",
                infinite: "S+",
                raid: "S+",
                challenge: "S"
            },
            stats: {
                dps: 140000,
                range: 140,
                placement: 5
            },
            abilities: [
                "Vampire King Form",
                "Blood Manipulation",
                "Immortal Regeneration"
            ],
            animeSource: "Hellsing",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "the_struggler_rampage",
            name: "The Struggler (Rampage)",
            tier: "META",
            rarity: "Vanguard",
            element: "Dark",
            deploymentCost: 4500,
            maxCost: 125000,
            description: "Rampage state delivers extremely high DPS output",
            pros: [
                "Rampage mode activation",
                "Extremely high DPS",
                "Dark element mastery",
                "Berserker abilities"
            ],
            cons: [
                "High deployment cost",
                "Mode-dependent performance"
            ],
            gameMode: {
                story: "S",
                infinite: "S+",
                raid: "S",
                challenge: "S+"
            },
            stats: {
                dps: 135000,
                range: 130,
                placement: 4
            },
            abilities: [
                "Berserker Rampage",
                "Dragon Slayer",
                "Endless Struggle"
            ],
            animeSource: "Berserk",
            obtainMethod: "Vanguard Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "divalo_requiem",
            name: "Divalo (Requiem)",
            tier: "META",
            rarity: "Vanguard",
            element: "Dark",
            deploymentCost: 4000,
            maxCost: 118000,
            description: "Requiem form specializes in devastating area damage",
            pros: [
                "Requiem transformation",
                "Excellent area damage",
                "Dark element power",
                "Multi-target capabilities"
            ],
            cons: [
                "High investment required",
                "Form activation needed"
            ],
            gameMode: {
                story: "S",
                infinite: "S",
                raid: "S+",
                challenge: "S"
            },
            stats: {
                dps: 130000,
                range: 145,
                placement: 5
            },
            abilities: [
                "Requiem Form",
                "Soul Manipulation",
                "Death's Symphony"
            ],
            animeSource: "JoJo's Bizarre Adventure",
            obtainMethod: "Vanguard Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "rogita_super_4",
            name: "Rogita (Super 4)",
            tier: "META",
            rarity: "Vanguard",
            element: "Fire",
            deploymentCost: 3800,
            maxCost: 112000,
            description: "Super Saiyan 4 form, strongest Fire element unit available",
            pros: [
                "Super Saiyan 4 power",
                "Strongest Fire element",
                "Transformation abilities",
                "High damage scaling"
            ],
            cons: [
                "Transformation dependent",
                "High upgrade costs"
            ],
            gameMode: {
                story: "S+",
                infinite: "S",
                raid: "S",
                challenge: "S+"
            },
            stats: {
                dps: 128000,
                range: 135,
                placement: 6
            },
            abilities: [
                "Super Saiyan 4",
                "Kamehameha x100",
                "Saiyan Pride"
            ],
            animeSource: "Dragon Ball GT",
            obtainMethod: "Vanguard Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "the_falcon_light",
            name: "The Falcon (of Light)",
            tier: "META",
            rarity: "Vanguard",
            element: "Holy",
            deploymentCost: 3200,
            maxCost: 95000,
            description: "Light Falcon form delivers powerful holy damage attacks",
            pros: [
                "Holy damage specialization",
                "Falcon transformation",
                "Moderate deployment cost",
                "Anti-dark effectiveness"
            ],
            cons: [
                "Element-specific advantages",
                "Transformation requirements"
            ],
            gameMode: {
                story: "S",
                infinite: "S",
                raid: "S",
                challenge: "S+"
            },
            stats: {
                dps: 125000,
                range: 150,
                placement: 5
            },
            abilities: [
                "Falcon of Light",
                "Divine Strike",
                "Holy Radiance"
            ],
            animeSource: "Berserk",
            obtainMethod: "Vanguard Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "byeken_ronin",
            name: "Byeken (Ronin)",
            tier: "META",
            rarity: "Secret",
            element: "Wind",
            deploymentCost: 2800,
            maxCost: 89000,
            description: "Ronin form provides high mobility and swift attacks",
            pros: [
                "Ronin transformation",
                "High mobility stats",
                "Wind element mastery",
                "Swift attack patterns"
            ],
            cons: [
                "Secret rarity requirements",
                "Mobility-focused playstyle"
            ],
            gameMode: {
                story: "S",
                infinite: "S",
                raid: "A+",
                challenge: "S"
            },
            stats: {
                dps: 120000,
                range: 125,
                placement: 6
            },
            abilities: [
                "Ronin Mastery",
                "Wind Blade Dance",
                "Samurai Spirit"
            ],
            animeSource: "Demon Slayer",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "sukono",
            name: "Sukono",
            tier: "META",
            rarity: "Secret",
            element: "Dark",
            deploymentCost: 1900,
            maxCost: 72000,
            description: "Cost-efficient powerhouse with excellent value for investment",
            pros: [
                "Excellent cost efficiency",
                "Strong Dark element",
                "Beginner friendly",
                "High investment value"
            ],
            cons: [
                "Secret rarity acquisition",
                "Dark element dependency"
            ],
            gameMode: {
                story: "S",
                infinite: "S",
                raid: "S",
                challenge: "S"
            },
            stats: {
                dps: 118000,
                range: 130,
                placement: 5
            },
            abilities: [
                "Dark Mastery",
                "Cost Efficiency",
                "Shadow Strike"
            ],
            animeSource: "Jujutsu Kaisen",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "cha_in_blade_dancer",
            name: "Cha-In (Blade Dancer)",
            tier: "META",
            rarity: "Secret",
            element: "Wind",
            deploymentCost: 2100,
            maxCost: 78000,
            description: "AoE control master with wind-based area attacks",
            pros: [
                "AoE control mastery",
                "Wind element power",
                "Area damage specialist",
                "High investment value"
            ],
            cons: [
                "Secret rarity requirements",
                "AoE focused playstyle"
            ],
            gameMode: {
                story: "S",
                infinite: "S",
                raid: "S+",
                challenge: "S"
            },
            stats: {
                dps: 115000,
                range: 140,
                placement: 6
            },
            abilities: [
                "Blade Dance",
                "Wind Control",
                "AoE Mastery"
            ],
            animeSource: "Sword Art Online",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "haruka_rin_dancer",
            name: "Haruka Rin (Dancer)",
            tier: "META",
            rarity: "Secret",
            element: "Nature",
            deploymentCost: 1600,
            maxCost: 68000,
            description: "Essential team buffer with nature-based support abilities",
            pros: [
                "Team buffer abilities",
                "Nature element support",
                "Beginner friendly",
                "Essential support role"
            ],
            cons: [
                "Support focused role",
                "Secret rarity acquisition"
            ],
            gameMode: {
                story: "S",
                infinite: "S",
                raid: "S",
                challenge: "S"
            },
            stats: {
                dps: 95000,
                range: 120,
                placement: 6
            },
            abilities: [
                "Dance of Nature",
                "Team Buff",
                "Support Mastery"
            ],
            animeSource: "Fairy Tail",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        }
    ],

    // SUB-META Tier - Strong units with specific use cases
    SUB_META: [
        {
            id: "the_falcon_darkness",
            name: "The Falcon (of Darkness)",
            tier: "SUB_META",
            rarity: "Vanguard",
            element: "Dark",
            deploymentCost: 3400,
            maxCost: 98000,
            description: "Dark Falcon form with shadow-based attack capabilities",
            pros: [
                "Dark Falcon transformation",
                "Shadow manipulation",
                "Strong single-target",
                "Dark element synergy"
            ],
            cons: [
                "Situational effectiveness",
                "High investment needed"
            ],
            gameMode: {
                story: "A+",
                infinite: "A+",
                raid: "S",
                challenge: "A+"
            },
            stats: {
                dps: 115000,
                range: 140,
                placement: 5
            },
            abilities: [
                "Falcon of Darkness",
                "Shadow Strike",
                "Dark Corruption"
            ],
            animeSource: "Berserk",
            obtainMethod: "Vanguard Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "monkey_king_awakened",
            name: "Monkey King (Awakened)",
            tier: "SUB_META",
            rarity: "Secret",
            element: "Nature",
            deploymentCost: 2500,
            maxCost: 85000,
            description: "Awakened Monkey King with powerful transformation abilities",
            pros: [
                "Awakened form power",
                "Transformation versatility",
                "Nature element control",
                "Mythical abilities"
            ],
            cons: [
                "Secret rarity acquisition",
                "Form management required"
            ],
            gameMode: {
                story: "A+",
                infinite: "A+",
                raid: "A+",
                challenge: "S"
            },
            stats: {
                dps: 110000,
                range: 130,
                placement: 6
            },
            abilities: [
                "72 Transformations",
                "Golden Staff Mastery",
                "Monkey King's Fury"
            ],
            animeSource: "Journey to the West",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "gg_possessed",
            name: "GG (Possessed)",
            tier: "SUB_META",
            rarity: "Secret",
            element: "Dark",
            deploymentCost: 2200,
            maxCost: 78000,
            description: "Possessed state grants enhanced dark powers and abilities",
            pros: [
                "Possession enhancement",
                "Dark power amplification",
                "Moderate deployment cost",
                "Unique mechanics"
            ],
            cons: [
                "Possession dependency",
                "Limited availability"
            ],
            gameMode: {
                story: "A+",
                infinite: "A",
                raid: "A+",
                challenge: "A+"
            },
            stats: {
                dps: 105000,
                range: 125,
                placement: 5
            },
            abilities: [
                "Demonic Possession",
                "Shadow Control",
                "Dark Resonance"
            ],
            animeSource: "Guilty Gear",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "gazelle_zombie",
            name: "Gazelle (Zombie)",
            tier: "SUB_META",
            rarity: "Mythic",
            element: "Dark",
            deploymentCost: 1800,
            maxCost: 65000,
            description: "Zombie Gazelle form with undead resilience and abilities",
            pros: [
                "Zombie transformation",
                "Undead resilience",
                "Low deployment cost",
                "Dark element access"
            ],
            cons: [
                "Mythic rarity limits",
                "Zombie form restrictions"
            ],
            gameMode: {
                story: "A",
                infinite: "A+",
                raid: "A",
                challenge: "A"
            },
            stats: {
                dps: 95000,
                range: 120,
                placement: 4
            },
            abilities: [
                "Zombie Regeneration",
                "Undead Swarm",
                "Necrotic Touch"
            ],
            animeSource: "Hunter x Hunter",
            obtainMethod: "Mythic Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "roku_super_3",
            name: "Roku (Super 3)",
            tier: "SUB_META",
            rarity: "Secret",
            element: "Fire",
            deploymentCost: 2600,
            maxCost: 82000,
            description: "Super Saiyan 3 form with extended power and abilities",
            pros: [
                "Super Saiyan 3 power",
                "Fire element mastery",
                "Strong transformation",
                "High damage potential"
            ],
            cons: [
                "Energy consumption",
                "Form maintenance"
            ],
            gameMode: {
                story: "A+",
                infinite: "A",
                raid: "A+",
                challenge: "A+"
            },
            stats: {
                dps: 100000,
                range: 125,
                placement: 5
            },
            abilities: [
                "Super Saiyan 3",
                "Dragon Fist",
                "Saiyan Roar"
            ],
            animeSource: "Dragon Ball Z",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "leo_fangs",
            name: "Leo (Fangs)",
            tier: "SUB_META",
            rarity: "Secret",
            element: "Nature",
            deploymentCost: 2400,
            maxCost: 75000,
            description: "Fanged Lion form with powerful nature-based attacks",
            pros: [
                "Fang enhancement",
                "Nature element control",
                "Beast transformation",
                "Predator instincts"
            ],
            cons: [
                "Beast mode dependency",
                "Secret rarity requirements"
            ],
            gameMode: {
                story: "A+",
                infinite: "A",
                raid: "A",
                challenge: "A+"
            },
            stats: {
                dps: 98000,
                range: 115,
                placement: 4
            },
            abilities: [
                "Lion's Pride",
                "Fang Strike",
                "Beast King's Roar"
            ],
            animeSource: "Fairy Tail",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "giant_queen_founder",
            name: "Giant Queen (Founder)",
            tier: "SUB_META",
            rarity: "Secret",
            element: "Nature",
            deploymentCost: 3000,
            maxCost: 88000,
            description: "Founder Queen form with commanding presence and abilities",
            pros: [
                "Founder transformation",
                "Queen's authority",
                "Nature mastery",
                "Leadership abilities"
            ],
            cons: [
                "High deployment cost",
                "Form-specific power"
            ],
            gameMode: {
                story: "A",
                infinite: "A+",
                raid: "A+",
                challenge: "A"
            },
            stats: {
                dps: 92000,
                range: 135,
                placement: 6
            },
            abilities: [
                "Queen's Command",
                "Titan Strength",
                "Royal Decree"
            ],
            animeSource: "Attack on Titan",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "astolfo_rider_black",
            name: "Astolfo (Rider of Black)",
            tier: "SUB_META",
            rarity: "Secret",
            element: "Dark",
            deploymentCost: 2300,
            maxCost: 72000,
            description: "Black Rider form with swift mobility and dark magic",
            pros: [
                "Rider class abilities",
                "High mobility",
                "Dark magic access",
                "Versatile skillset"
            ],
            cons: [
                "Rider dependency",
                "Magic resource management"
            ],
            gameMode: {
                story: "A",
                infinite: "A",
                raid: "A",
                challenge: "A+"
            },
            stats: {
                dps: 90000,
                range: 120,
                placement: 5
            },
            abilities: [
                "Rider's Mount",
                "Dark Magic",
                "Swift Strike"
            ],
            animeSource: "Fate/Apocrypha",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "slime_king",
            name: "Slime (King)",
            tier: "SUB_META",
            rarity: "Secret",
            element: "Nature",
            deploymentCost: 1200,
            maxCost: 45000,
            description: "F2P friendly carry with nature-based abilities",
            pros: [
                "F2P friendly",
                "Low deployment cost",
                "Nature element mastery",
                "Beginner friendly"
            ],
            cons: [
                "Secret rarity acquisition",
                "Limited late-game potential"
            ],
            gameMode: {
                story: "A+",
                infinite: "A",
                raid: "A",
                challenge: "A"
            },
            stats: {
                dps: 85000,
                range: 110,
                placement: 4
            },
            abilities: [
                "Slime King Form",
                "Nature Control",
                "F2P Carry"
            ],
            animeSource: "That Time I Got Reincarnated as a Slime",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "conqueror_vs_invulnerable",
            name: "Conqueror vs Invulnerable",
            tier: "SUB_META",
            rarity: "Secret",
            element: "Holy",
            deploymentCost: 2000,
            maxCost: 68000,
            description: "Boss specialist with holy-based combat abilities",
            pros: [
                "Boss specialist",
                "Holy element power",
                "Single-target focus",
                "High damage potential"
            ],
            cons: [
                "Boss-specific role",
                "Secret rarity requirements"
            ],
            gameMode: {
                story: "A",
                infinite: "A+",
                raid: "S",
                challenge: "A+"
            },
            stats: {
                dps: 92000,
                range: 125,
                placement: 5
            },
            abilities: [
                "Conqueror's Might",
                "Holy Strike",
                "Boss Slayer"
            ],
            animeSource: "One Piece",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        }
    ],

    // DECENT Tier - Usable alternatives and early game options
    DECENT: [
        {
            id: "song_jinwu_monarch",
            name: "Song Jinwu (Monarch)",
            tier: "DECENT",
            rarity: "Secret",
            element: "Unknown",
            deploymentCost: 1500,
            maxCost: 55000,
            description: "Solid mid-game option with monarch abilities",
            pros: [
                "Mid-game option",
                "Monarch abilities",
                "Beginner friendly",
                "Unknown element"
            ],
            cons: [
                "Outclassed by higher tiers",
                "Limited late-game potential"
            ],
            gameMode: {
                story: "A",
                infinite: "A",
                raid: "A",
                challenge: "A"
            },
            stats: {
                dps: 75000,
                range: 100,
                placement: 5
            },
            abilities: [
                "Monarch's Authority",
                "Royal Command",
                "Mid-Game Power"
            ],
            animeSource: "Solo Leveling",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "akazo_destructive",
            name: "Akazo (Destructive)",
            tier: "DECENT",
            rarity: "Secret",
            element: "Fire",
            deploymentCost: 1800,
            maxCost: 62000,
            description: "Outclassed but usable fire element unit",
            pros: [
                "Fire element access",
                "Destructive abilities",
                "Moderate cost",
                "Usable performance"
            ],
            cons: [
                "Outclassed by better units",
                "Limited effectiveness"
            ],
            gameMode: {
                story: "A",
                infinite: "A",
                raid: "A",
                challenge: "A"
            },
            stats: {
                dps: 70000,
                range: 95,
                placement: 4
            },
            abilities: [
                "Destructive Power",
                "Fire Mastery",
                "Usable Alternative"
            ],
            animeSource: "Dragon Ball Z",
            obtainMethod: "Secret Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "chaso_blood_curse",
            name: "Chaso (Blood Curse)",
            tier: "DECENT",
            rarity: "Mythic",
            element: "Dark",
            deploymentCost: 1400,
            maxCost: 48000,
            description: "Evolution material with dark-based abilities",
            pros: [
                "Evolution material",
                "Dark element access",
                "Low cost",
                "Material value"
            ],
            cons: [
                "Material focused role",
                "Limited combat effectiveness"
            ],
            gameMode: {
                story: "B+",
                infinite: "B+",
                raid: "B+",
                challenge: "B+"
            },
            stats: {
                dps: 65000,
                range: 90,
                placement: 3
            },
            abilities: [
                "Blood Curse",
                "Dark Material",
                "Evolution Source"
            ],
            animeSource: "Naruto",
            obtainMethod: "Mythic Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "friran_teacher",
            name: "Friran (Teacher)",
            tier: "DECENT",
            rarity: "Mythic",
            element: "Nature",
            deploymentCost: 1000,
            maxCost: 35000,
            description: "Money generation specialist with nature support",
            pros: [
                "Money generation",
                "Nature element support",
                "Beginner friendly",
                "Low cost"
            ],
            cons: [
                "Support focused role",
                "Limited combat power"
            ],
            gameMode: {
                story: "A",
                infinite: "B+",
                raid: "B+",
                challenge: "A"
            },
            stats: {
                dps: 60000,
                range: 85,
                placement: 4
            },
            abilities: [
                "Money Generation",
                "Nature Support",
                "Teaching Mastery"
            ],
            animeSource: "Fairy Tail",
            obtainMethod: "Mythic Banner",
            lastUpdated: "2025-01-17"
        },
        {
            id: "alligator",
            name: "Alligator",
            tier: "DECENT",
            rarity: "Epic",
            element: "Water",
            deploymentCost: 800,
            maxCost: 28000,
            description: "Early game filler with water element abilities",
            pros: [
                "Early game filler",
                "Water element access",
                "Very low cost",
                "Beginner friendly"
            ],
            cons: [
                "Limited late-game use",
                "Filler role only"
            ],
            gameMode: {
                story: "B+",
                infinite: "B",
                raid: "B",
                challenge: "B+"
            },
            stats: {
                dps: 55000,
                range: 80,
                placement: 3
            },
            abilities: [
                "Water Control",
                "Early Game Filler",
                "Basic Abilities"
            ],
            animeSource: "Pokemon",
            obtainMethod: "Epic Banner",
            lastUpdated: "2025-01-17"
        }
    ]
};

// Tier information and styling
const TIER_INFO = {
    BROKEN: {
        name: "🔥 BROKEN",
        description: "Game-breaking units that dominate all content",
        color: "#ff0000",
        gradient: "linear-gradient(135deg, #ff4757, #ff3838)",
        priority: 1
    },
    META: {
        name: "⚡ META", 
        description: "Top-tier units defining the current meta",
        color: "#ff6348",
        gradient: "linear-gradient(135deg, #ff6348, #ff5722)",
        priority: 2
    },
    SUB_META: {
        name: "💎 SUB-META",
        description: "Strong units with specific use cases and advantages",
        color: "#3742fa",
        gradient: "linear-gradient(135deg, #3742fa, #2f3542)",
        priority: 3
    },
    DECENT: {
        name: "📊 DECENT",
        description: "Usable alternatives and early game options",
        color: "#3498db",
        gradient: "linear-gradient(135deg, #3498db, #2980b9)",
        priority: 4
    }
};

// Element information and colors
const ELEMENT_INFO = {
    Unknown: { color: "#9b59b6", icon: "❓" },
    Dark: { color: "#2c3e50", icon: "🌑" },
    Nature: { color: "#27ae60", icon: "🌿" },
    Holy: { color: "#f1c40f", icon: "✨" },
    Fire: { color: "#e74c3c", icon: "🔥" },
    Wind: { color: "#3498db", icon: "💨" }
};

// Rarity information and colors
const RARITY_INFO = {
    Vanguard: { color: "#e91e63", priority: 1 },
    Secret: { color: "#9c27b0", priority: 2 },
    Mythic: { color: "#ff9800", priority: 3 },
    Epic: { color: "#3498db", priority: 4 }
};

/**
 * Data Loading and Management Functions
 */
class TierListDataManager {
    constructor() {
        this.data = TIER_LIST_DATA;
        this.isLoading = false;
        this.error = null;
        this.cache = new Map();
    }

    /**
     * Get all characters data
     * @returns {Promise<Object>} Complete tier list data
     */
    async getAllData() {
        try {
            this.setLoading(true);
            await this.simulateLoading(500); // Simulate API call
            this.setLoading(false);
            return this.data;
        } catch (error) {
            this.setError(error.message);
            throw error;
        }
    }

    /**
     * Get characters by tier
     * @param {string} tier - Tier name (BROKEN, META, SUB_META)
     * @returns {Promise<Array>} Characters in specified tier
     */
    async getCharactersByTier(tier) {
        const cacheKey = `tier_${tier}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            this.setLoading(true);
            await this.simulateLoading(300);
            
            const characters = this.data[tier] || [];
            this.cache.set(cacheKey, characters);
            this.setLoading(false);
            
            return characters;
        } catch (error) {
            this.setError(error.message);
            throw error;
        }
    }

    /**
     * Get character by ID
     * @param {string} id - Character ID
     * @returns {Promise<Object|null>} Character data or null if not found
     */
    async getCharacterById(id) {
        const cacheKey = `char_${id}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            this.setLoading(true);
            await this.simulateLoading(200);

            for (const tier in this.data) {
                const character = this.data[tier].find(char => char.id === id);
                if (character) {
                    this.cache.set(cacheKey, character);
                    this.setLoading(false);
                    return character;
                }
            }

            this.setLoading(false);
            return null;
        } catch (error) {
            this.setError(error.message);
            throw error;
        }
    }

    /**
     * Filter characters by multiple criteria
     * @param {Object} filters - Filter criteria
     * @returns {Promise<Array>} Filtered characters
     */
    async filterCharacters(filters = {}) {
        try {
            this.setLoading(true);
            await this.simulateLoading(400);

            let allCharacters = [];
            for (const tier in this.data) {
                allCharacters = allCharacters.concat(this.data[tier]);
            }

            // Apply filters
            let filtered = allCharacters;

            if (filters.tier) {
                filtered = filtered.filter(char => 
                    Array.isArray(filters.tier) ? 
                    filters.tier.includes(char.tier) : 
                    char.tier === filters.tier
                );
            }

            if (filters.element) {
                filtered = filtered.filter(char => 
                    Array.isArray(filters.element) ? 
                    filters.element.includes(char.element) : 
                    char.element === filters.element
                );
            }

            if (filters.rarity) {
                filtered = filtered.filter(char => 
                    Array.isArray(filters.rarity) ? 
                    filters.rarity.includes(char.rarity) : 
                    char.rarity === filters.rarity
                );
            }

            if (filters.maxDeploymentCost) {
                filtered = filtered.filter(char => 
                    char.deploymentCost <= filters.maxDeploymentCost
                );
            }

            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                filtered = filtered.filter(char => 
                    char.name.toLowerCase().includes(searchTerm) ||
                    char.description.toLowerCase().includes(searchTerm) ||
                    char.animeSource.toLowerCase().includes(searchTerm)
                );
            }

            // Sort results
            if (filters.sortBy) {
                filtered = this.sortCharacters(filtered, filters.sortBy, filters.sortOrder);
            }

            this.setLoading(false);
            return filtered;
        } catch (error) {
            this.setError(error.message);
            throw error;
        }
    }

    /**
     * Sort characters by specified criteria
     * @param {Array} characters - Characters to sort
     * @param {string} sortBy - Sort criteria
     * @param {string} sortOrder - 'asc' or 'desc'
     * @returns {Array} Sorted characters
     */
    sortCharacters(characters, sortBy, sortOrder = 'desc') {
        const sorted = [...characters];
        
        sorted.sort((a, b) => {
            let valueA, valueB;

            switch (sortBy) {
                case 'name':
                    valueA = a.name.toLowerCase();
                    valueB = b.name.toLowerCase();
                    break;
                case 'tier':
                    valueA = TIER_INFO[a.tier]?.priority || 999;
                    valueB = TIER_INFO[b.tier]?.priority || 999;
                    break;
                case 'deploymentCost':
                    valueA = a.deploymentCost;
                    valueB = b.deploymentCost;
                    break;
                case 'maxCost':
                    valueA = a.maxCost;
                    valueB = b.maxCost;
                    break;
                case 'dps':
                    valueA = a.stats?.dps || 0;
                    valueB = b.stats?.dps || 0;
                    break;
                case 'rarity':
                    valueA = RARITY_INFO[a.rarity]?.priority || 999;
                    valueB = RARITY_INFO[b.rarity]?.priority || 999;
                    break;
                default:
                    return 0;
            }

            if (valueA < valueB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    }

    /**
     * Get statistics about the tier list
     * @returns {Promise<Object>} Statistics data
     */
    async getStatistics() {
        try {
            this.setLoading(true);
            await this.simulateLoading(300);

            const stats = {
                totalCharacters: 0,
                tierCounts: {},
                elementCounts: {},
                rarityCounts: {},
                averageCosts: {
                    deployment: 0,
                    max: 0
                }
            };

            let totalDeploymentCost = 0;
            let totalMaxCost = 0;

            for (const tier in this.data) {
                const characters = this.data[tier];
                stats.totalCharacters += characters.length;
                stats.tierCounts[tier] = characters.length;

                characters.forEach(char => {
                    // Element counts
                    stats.elementCounts[char.element] = 
                        (stats.elementCounts[char.element] || 0) + 1;
                    
                    // Rarity counts
                    stats.rarityCounts[char.rarity] = 
                        (stats.rarityCounts[char.rarity] || 0) + 1;
                    
                    // Cost calculations
                    totalDeploymentCost += char.deploymentCost;
                    totalMaxCost += char.maxCost;
                });
            }

            stats.averageCosts.deployment = Math.round(totalDeploymentCost / stats.totalCharacters);
            stats.averageCosts.max = Math.round(totalMaxCost / stats.totalCharacters);

            this.setLoading(false);
            return stats;
        } catch (error) {
            this.setError(error.message);
            throw error;
        }
    }

    /**
     * Utility functions
     */
    setLoading(loading) {
        this.isLoading = loading;
        this.dispatchEvent('loadingChange', { loading });
    }

    setError(error) {
        this.error = error;
        this.dispatchEvent('error', { error });
    }

    clearError() {
        this.error = null;
    }

    async simulateLoading(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    dispatchEvent(eventName, data) {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('tierListData:' + eventName, { detail: data }));
        }
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }
}

// Create global instance for easy access
if (typeof window !== 'undefined') {
    window.TierListDataManager = TierListDataManager;
    window.TIER_LIST_DATA = TIER_LIST_DATA;
    window.TIER_INFO = TIER_INFO;
    window.ELEMENT_INFO = ELEMENT_INFO;
    window.RARITY_INFO = RARITY_INFO;
}

// Export data and manager (for module systems)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        TIER_LIST_DATA, 
        TIER_INFO, 
        ELEMENT_INFO, 
        RARITY_INFO, 
        TierListDataManager 
    };
}