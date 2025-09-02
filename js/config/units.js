// Anime Vanguards Units Database - New Tier System
// Based on official wiki and community feedback
// New 5-tier system: META_DEFINING, STRONG_PICK, SOLID, SITUATIONAL, AVOID

export const unitsData = {
  "units": [
    // ====== EXISTING 16 UNITS ======
    {
      "id": "song-jinwu-monarch",
      "name": "Song Jinwu (Monarch)",
      "rarity": "Mythic",
      "element": "Unknown",
      "tier": "STRONG_PICK",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Multiple summons", "3 different nukes", "Good DPS and range", "Great placement, performs at all upgrades"],
      "cons": ["Nukes are 1 time use per game", "Needs mana to use summons/nukes"],
      "description": "Top summoner with unmatched DPS and synergy with Igros",
      "recommended_traits": ["Deadeye", "Damage Boost"],
      "anime_source": "Solo Leveling",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      },
      // Enhanced data
      "obtainment": "Summon (1% chance - Mythic)",
      "deployment_cost": "1700¥",
      "total_upgrade_cost": "103,700¥",
      "abilities": [
        "Shadow Army: Summons shadow soldiers to assist in battle",
        "Monarch's Authority: Increases damage and range significantly",
        "Triple Nuke: Three powerful one-time use attacks per game"
      ],
      "optimal_traits": ["Monarch", "Deadeye"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 9,
        "cost_efficiency": 7,
        "versatility": 9,
        "survivability": 8
      },
      "detailed_stats": {
        "base_damage": "Very High",
        "attack_speed": "Medium",
        "range": "Large",
        "special_abilities": "Shadow Army, Triple Nuke"
      }
    },
    {
      "id": "akazo-destructive",
      "name": "Akazo (Destructive)",
      "rarity": "Mythic",
      "element": "Fire",
      "tier": "META_DEFINING",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Very high DPS", "2nd highest full AoE in game", "Not dependent on other units", "Scales great with crit"],
      "cons": ["Weak on placement until upgrade 2", "Not immune to debuffs or status effects"],
      "description": "Deals heavy damage with massive AoE capabilities",
      "recommended_traits": ["Deadeye", "Crit Damage"],
      "anime_source": "Demon Slayer",
      "mode_performance": {
        "story": "S+",
        "infinite": "S",
        "pvp": "S"
      },
      // Enhanced data
      "obtainment": "Summon (1% chance - Mythic)",
      "deployment_cost": "2000¥",
      "total_upgrade_cost": "120,000¥",
      "abilities": [
        "Destructive Death: Massive AoE attack that devastates all enemies in range",
        "Compass Needle: Automatically targets the strongest enemy with precision strikes",
        "Annihilation Type: Transforms into ultimate form with doubled damage output"
      ],
      "optimal_traits": ["Monarch", "Crit Damage"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 10,
        "cost_efficiency": 8,
        "versatility": 9,
        "survivability": 7
      },
      "detailed_stats": {
        "base_damage": "Extreme",
        "attack_speed": "Medium",
        "range": "Massive AoE",
        "special_abilities": "Destructive Death, Compass Needle"
      }
    },
    {
      "id": "cha-in-blade-dancer",
      "name": "Cha-In (Blade Dancer)",
      "rarity": "Mythic",
      "element": "Physical",
      "tier": "META_DEFINING",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Incredible DPS numbers", "Can trigger transformation frequently", "100% crit strike potential"],
      "cons": ["Expensive to max", "Requires positioning"],
      "description": "Blade master with transformation abilities",
      "recommended_traits": ["Deadeye", "Speed Boost"],
      "anime_source": "Solo Leveling",
      "mode_performance": {
        "story": "S+",
        "infinite": "S+",
        "pvp": "S"
      }
    },
    {
      "id": "divalo-requiem",
      "name": "Divalo (Requiem)",
      "rarity": "Secret",
      "element": "Time",
      "tier": "META_DEFINING",
      "placement_cost": "Very High",
      "max_placement": 1,
      "category": "Support/DPS",
      "evolution_required": true,
      "pros": ["100% dodge chance", "Time Erasure ability", "Crowd control", "Unbreakable"],
      "cons": ["Very expensive", "Only 1 placement", "Hard to obtain"],
      "description": "The unbreakable king with time manipulation",
      "recommended_traits": ["Range", "Cooldown Reduction"],
      "anime_source": "JoJo's Bizarre Adventure",
      "mode_performance": {
        "story": "SS",
        "infinite": "SS",
        "pvp": "SS"
      },
      // Enhanced data
      "obtainment": "Summon (0.1% chance - Secret)",
      "deployment_cost": "2500¥",
      "total_upgrade_cost": "150,000¥",
      "abilities": [
        "King Crimson Requiem: Erases time and can see into the future",
        "Time Skip: Completely avoids all attacks during time erasure",
        "Epitaph: Predicts enemy movements and counters perfectly"
      ],
      "optimal_traits": ["Monarch", "Cooldown Reduction"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 9,
        "cost_efficiency": 6,
        "versatility": 10,
        "survivability": 10
      },
      "detailed_stats": {
        "base_damage": "Very High",
        "attack_speed": "Medium",
        "range": "Large",
        "special_abilities": "Time Erasure, 100% Dodge"
      }
    },
    {
      "id": "igros-elite-knight",
      "name": "Igros (Elite Knight)", 
      "rarity": "Secret",
      "element": "Dark",
      "tier": "META_DEFINING",
      "placement_cost": "High",
      "max_placement": 3,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Synergy with Song Jinwu", "High damage output", "Elite summons"],
      "cons": ["Dependent on other units for max potential", "Expensive"],
      "description": "Elite knight with powerful dark abilities",
      "recommended_traits": ["Damage", "Range"],
      "anime_source": "Solo Leveling",
      "mode_performance": {
        "story": "SS",
        "infinite": "S+",
        "pvp": "S+"
      },
      // Enhanced data
      "obtainment": "Summon (0.1% chance - Secret)",
      "deployment_cost": "1200¥",
      "total_upgrade_cost": "62,500¥",
      "abilities": [
        "Elite Command: Summons elite shadow knights to fight alongside",
        "Dark Synergy: Gains massive damage boost when paired with Song Jinwu",
        "Shadow Strike: Teleports to enemies and delivers devastating dark damage"
      ],
      "optimal_traits": ["Monarch", "Damage Boost"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 10,
        "cost_efficiency": 8,
        "versatility": 9,
        "survivability": 9
      },
      "detailed_stats": {
        "base_damage": "Extreme",
        "attack_speed": "Fast",
        "range": "Large",
        "special_abilities": "Elite Command, Dark Synergy"
      }
    },
    {
      "id": "alocard-vampire-king",
      "name": "Alocard (Vampire King)",
      "rarity": "Secret", 
      "element": "Blood",
      "tier": "META_DEFINING",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "Support/DPS",
      "evolution_required": false,
      "pros": ["Full AoE", "8 sec bleed", "20% buff to all source damage", "Cheap to upgrade"],
      "cons": ["Lower raw damage", "Bleed dependent"],
      "description": "Vampire lord with bleed and support abilities",
      "recommended_traits": ["Bleed Boost", "Range"],
      "anime_source": "Hellsing",
      "mode_performance": {
        "story": "S+",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "jag-o-volcanic",
      "name": "Jag-o (Volcanic)",
      "rarity": "Mythic",
      "element": "Fire",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["High damage AoE", "Burn effects", "Good for wave clearing"],
      "cons": ["Expensive", "Fire element limitations"],
      "description": "Fiery DPS beast with volcanic powers",
      "recommended_traits": ["Burn Damage", "AoE Boost"],
      "anime_source": "Jujutsu Kaisen",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "chaso-blood-curse",
      "name": "Chaso (Blood Curse)",
      "rarity": "Mythic", 
      "element": "Blood",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Full AoE attacks", "DMG boost vs bleeding enemies", "4 placements"],
      "cons": ["Requires bleeding enemies", "Complex setup"],
      "description": "Blood curse specialist with AoE devastation",
      "recommended_traits": ["Bleed", "Damage"],
      "anime_source": "Jujutsu Kaisen",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "haruka-rin-dancer",
      "name": "Haruka Rin (Dancer)",
      "rarity": "Legendary",
      "element": "Support",
      "tier": "SOLID",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "Support",
      "evolution_required": false,
      "pros": ["18% ally damage buff", "10% range buff", "Accessible from battle pass"],
      "cons": ["No direct damage", "Requires other strong units"],
      "description": "Best support unit for enhancing team performance",
      "recommended_traits": ["Buff Duration", "Range"],
      "anime_source": "Hololive",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "super-brolzi",
      "name": "Legendary Super Brolzi",
      "rarity": "Legendary",
      "element": "Energy",
      "tier": "SOLID",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["No evolution required", "High base damage", "AoE attacks", "Cost efficient"],
      "cons": ["Limited compared to mythics", "No evolution potential"],
      "description": "Powerful legendary that doesn't require evolution",
      "recommended_traits": ["Damage", "Speed"],
      "anime_source": "Dragon Ball",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "tengon-flashiness",
      "name": "Tengon (Flashiness)",
      "rarity": "Mythic",
      "element": "Physical",
      "tier": "SOLID",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["AOE damage", "Massive range", "Good upgrade scaling"],
      "cons": ["High placement cost", "Requires evolution for full potential"],
      "description": "Deals AOE damage in massive range",
      "recommended_traits": ["Damage", "Range"],
      "anime_source": "Demon Slayer",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "noruto-six-tails",
      "name": "Noruto (Six Tails)",
      "rarity": "Mythic",
      "element": "Energy",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Great at clearing waves", "High damage output", "Good range"],
      "cons": ["Expensive to max", "Evolution dependent"],
      "description": "Powerful ninja with tailed beast chakra",
      "recommended_traits": ["Damage", "Speed"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "obita-awakened",
      "name": "Obita (Awakened)",
      "rarity": "Mythic",
      "element": "Space",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Space-time abilities", "Good damage", "Utility skills"],
      "cons": ["Complex mechanics", "Requires positioning"],
      "description": "Awakened Uchiha with space-time mastery",
      "recommended_traits": ["Damage", "Cooldown"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "sosuke-storm",
      "name": "Sosuke (Storm)",
      "rarity": "Mythic",
      "element": "Lightning",
      "tier": "SOLID",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS/Support",
      "evolution_required": true,
      "pros": ["Stun abilities", "Double damage vs base form", "Good utility"],
      "cons": ["Situational abilities", "Requires good positioning"],
      "description": "Lightning-powered captain with stun abilities",
      "recommended_traits": ["Stun Duration", "Damage"],
      "anime_source": "Bleach",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "sprintwagon",
      "name": "Sprintwagon",
      "rarity": "Epic",
      "element": "Support",
      "tier": "SOLID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "Support",
      "evolution_required": false,
      "pros": ["Crazy ROI", "Very cheap", "Good support abilities", "High placement count"],
      "cons": ["No direct damage", "Support role only"],
      "description": "Only Epic unit in top tiers, amazing value",
      "recommended_traits": ["Buff Duration", "Range"],
      "anime_source": "JoJo's Bizarre Adventure",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "yehowach-almighty",
      "name": "Yehowach (Almighty)",
      "rarity": "Secret",
      "element": "Holy",
      "tier": "STRONG_PICK",
      "placement_cost": "Very High",
      "max_placement": 2,
      "category": "Support/DPS",
      "evolution_required": false,
      "pros": ["Status immunity", "Buffs allies", "High damage", "Future sight abilities"],
      "cons": ["Very expensive", "Complex mechanics", "Limited placement"],
      "description": "Quincy king with almighty powers",
      "recommended_traits": ["Buff Duration", "Range"],
      "anime_source": "Bleach",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      },
      // Enhanced data
      "obtainment": "Summon (0.1% chance - Secret)",
      "deployment_cost": "1400¥",
      "total_upgrade_cost": "67,550¥",
      "abilities": [
        "The Almighty: Can see and alter the future",
        "Status Immunity: Immune to all debuffs and status effects",
        "Ally Boost: Buffs all nearby allies with increased damage"
      ],
      "optimal_traits": ["Monarch", "Buff Duration"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 8,
        "cost_efficiency": 6,
        "versatility": 10,
        "survivability": 9
      },
      "detailed_stats": {
        "base_damage": "High",
        "attack_speed": "Medium",
        "range": "Large",
        "special_abilities": "The Almighty, Status Immunity"
      }
    },
    
    // ====== MISSING OFFICIAL CHARACTERS FROM WIKI ======
    {
      "id": "the-falcon-of-light",
      "name": "The Falcon (of Light)",
      "rarity": "Secret",
      "element": "Light",
      "tier": "META_DEFINING",
      "placement_cost": "Very Low",
      "max_placement": 1,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Extremely cheap deployment", "High damage output", "No evolution needed", "Broken tier performance"],
      "cons": ["Only 1 placement", "Limited in some modes"],
      "description": "The legendary Falcon with unmatched cost efficiency",
      "recommended_traits": ["Damage", "Range"],
      "anime_source": "Berserk",
      "mode_performance": {
        "story": "SS",
        "infinite": "SS", 
        "pvp": "S"
      },
      // Enhanced data
      "obtainment": "Summon (0.1% chance)",
      "deployment_cost": "1000¥",
      "total_upgrade_cost": "1000¥",
      "abilities": [
        "Sacrifice: Deals massive AoE damage to all enemies",
        "Light Blessing: Buffs nearby allies with 15% damage boost",
        "Cost Efficiency: Extremely cheap deployment cost"
      ],
      "optimal_traits": ["Monarch", "Damage Boost"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 10,
        "cost_efficiency": 10,
        "versatility": 8,
        "survivability": 7
      },
      "detailed_stats": {
        "base_damage": "Very High",
        "attack_speed": "Medium",
        "range": "Large AoE",
        "special_abilities": "Sacrifice, Light Blessing"
      }
    },
    {
      "id": "koguro-unsealed",
      "name": "Koguro (Unsealed)",
      "rarity": "Vanguard",
      "element": "Dark",
      "tier": "META_DEFINING",
      "placement_cost": "Very High",
      "max_placement": 1,
      "category": "Support/DPS",
      "evolution_required": true,
      "pros": ["Vanguard rarity", "Unsealed power", "Support capabilities", "Meta defining"],
      "cons": ["Very expensive", "Only 1 placement", "Hard to obtain"],
      "description": "Unsealed dark warrior with immense power",
      "recommended_traits": ["Damage", "Support"],
      "anime_source": "Tokyo Ghoul",
      "mode_performance": {
        "story": "SS",
        "infinite": "SS",
        "pvp": "SS"
      }
    },
    {
      "id": "iscanur-pride",
      "name": "Iscanur (Pride)",
      "rarity": "Vanguard", 
      "element": "Holy",
      "tier": "META_DEFINING",
      "placement_cost": "Extreme",
      "max_placement": 1,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Vanguard rarity", "Pride form", "Extreme damage", "Broken tier"],
      "cons": ["Extremely expensive", "Only 1 placement", "Very rare"],
      "description": "The embodiment of Pride with devastating power",
      "recommended_traits": ["Damage", "Pride"],
      "anime_source": "Seven Deadly Sins",
      "mode_performance": {
        "story": "SS",
        "infinite": "SS",
        "pvp": "S"
      }
    },
    {
      "id": "the-struggler-rampage",
      "name": "The Struggler (Rampage)",
      "rarity": "Secret",
      "element": "Physical",
      "tier": "META_DEFINING",
      "placement_cost": "High",
      "max_placement": 2,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Rampage mode", "High physical damage", "Meta tier", "Interchangeable with The King"],
      "cons": ["Expensive", "Limited placement", "Requires evolution"],
      "description": "The ultimate struggler in rampage state",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Berserk",
      "mode_performance": {
        "story": "S+",
        "infinite": "S+",
        "pvp": "S"
      }
    },
    {
      "id": "the-king-apostle",
      "name": "The King (Apostle)",
      "rarity": "Mythic",
      "element": "Dark",
      "tier": "META_DEFINING",
      "placement_cost": "High",
      "max_placement": 2,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Apostle form", "High damage", "Meta tier", "Interchangeable with The Struggler"],
      "cons": ["Expensive", "Limited placement", "Dark element weakness"],
      "description": "The apostle king with dark powers",
      "recommended_traits": ["Damage", "Dark Boost"],
      "anime_source": "Berserk",
      "mode_performance": {
        "story": "S+",
        "infinite": "S+", 
        "pvp": "S"
      }
    },
    {
      "id": "smith-john",
      "name": "Smith John",
      "rarity": "Secret",
      "element": "Physical",
      "tier": "META_DEFINING",
      "placement_cost": "High",
      "max_placement": 2,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["No evolution needed", "High DPS", "Meta tier", "Versatile"],
      "cons": ["Expensive", "Limited placement", "Physical element"],
      "description": "The legendary smith with unmatched craftsmanship",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Original",
      "mode_performance": {
        "story": "S+",
        "infinite": "S+",
        "pvp": "S"
      }
    },
    {
      "id": "song-jinwu-and-igros",
      "name": "Song Jinwu and Igros",
      "rarity": "Vanguard",
      "element": "Dark",
      "tier": "META_DEFINING",
      "placement_cost": "High",
      "max_placement": 1,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Vanguard rarity", "Dual unit synergy", "High damage", "No evolution needed"],
      "cons": ["Very expensive", "Only 1 placement", "Vanguard rarity"],
      "description": "The ultimate duo of Song Jinwu and his shadow Igros",
      "recommended_traits": ["Damage", "Shadow Boost"],
      "anime_source": "Solo Leveling",
      "mode_performance": {
        "story": "SS",
        "infinite": "SS",
        "pvp": "S+"
      },
      // Enhanced data
      "obtainment": "Summon (0.005% chance - Vanguard)",
      "deployment_cost": "1700¥",
      "total_upgrade_cost": "105,700¥",
      "abilities": [
        "Shadow Army: Summons shadow soldiers to fight",
        "Monarch's Domain: Creates area of increased damage",
        "Dual Strike: Both Jinwu and Igros attack simultaneously"
      ],
      "optimal_traits": ["Monarch", "Shadow Boost"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 10,
        "cost_efficiency": 8,
        "versatility": 9,
        "survivability": 9
      },
      "detailed_stats": {
        "base_damage": "Extreme",
        "attack_speed": "Fast",
        "range": "Large AoE",
        "special_abilities": "Shadow Army, Monarch's Domain"
      }
    },
    
    // ====== NEW SECRET TIER UNITS ======
    {
      "id": "gujo-infinity", 
      "name": "Gujo (Infinity)",
      "rarity": "Secret",
      "element": "Space",
      "tier": "META_DEFINING",
      "placement_cost": "Very High",
      "max_placement": 1,
      "category": "DPS/Support",
      "evolution_required": true,
      "pros": ["Infinity technique", "Domain expansion", "Teleportation", "Crowd control"],
      "cons": ["Very expensive", "Only 1 placement", "Complex mechanics"],
      "description": "The strongest sorcerer with infinity and domain powers",
      "recommended_traits": ["Range", "Cooldown Reduction"],
      "anime_source": "Jujutsu Kaisen",
      "mode_performance": {
        "story": "SS",
        "infinite": "SS",
        "pvp": "SS"
      },
      // Enhanced data
      "obtainment": "Summon (0.1% chance - Secret)",
      "deployment_cost": "2200¥",
      "total_upgrade_cost": "135,000¥",
      "abilities": [
        "Infinity: Creates an infinite space barrier that stops all attacks",
        "Domain Expansion: Unlimited Void that stuns all enemies",
        "Blue/Red: Powerful cursed energy techniques with massive damage"
      ],
      "optimal_traits": ["Monarch", "Range"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 10,
        "cost_efficiency": 7,
        "versatility": 10,
        "survivability": 10
      },
      "detailed_stats": {
        "base_damage": "Extreme",
        "attack_speed": "Fast",
        "range": "Massive",
        "special_abilities": "Infinity, Domain Expansion"
      }
    },
    {
      "id": "sukono",
      "name": "Sukono",
      "rarity": "Secret",
      "element": "Cursed",
      "tier": "META_DEFINING",
      "placement_cost": "Very High",
      "max_placement": 2,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Cursed techniques", "High damage output", "Multiple abilities", "Strong AoE"],
      "cons": ["Very expensive", "Limited placement", "Complex setup"],
      "description": "The king of curses with devastating cursed techniques",
      "recommended_traits": ["Damage", "Cursed Boost"],
      "anime_source": "Jujutsu Kaisen",
      "mode_performance": {
        "story": "S+",
        "infinite": "S+",
        "pvp": "S"
      },
      // Enhanced data
      "obtainment": "Summon (0.1% chance - Secret)",
      "deployment_cost": "2100¥",
      "total_upgrade_cost": "128,000¥",
      "abilities": [
        "Malevolent Shrine: Domain expansion that slices all enemies within range",
        "Cleave & Dismantle: Adjusts cutting attacks based on enemy cursed energy",
        "Fire Arrow: Devastating flame technique that burns everything"
      ],
      "optimal_traits": ["Monarch", "Cursed Boost"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 10,
        "cost_efficiency": 7,
        "versatility": 9,
        "survivability": 8
      },
      "detailed_stats": {
        "base_damage": "Extreme",
        "attack_speed": "Very Fast",
        "range": "Large AoE",
        "special_abilities": "Malevolent Shrine, Cleave/Dismantle"
      }
    },
    {
      "id": "madara-ultimate",
      "name": "Madara (Ultimate)",
      "rarity": "Secret",
      "element": "Fire",
      "tier": "META_DEFINING",
      "placement_cost": "Very High",
      "max_placement": 2,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Eternal Mangekyo", "Susanoo", "Fire release", "Crowd control"],
      "cons": ["Very expensive", "Limited placement", "Complex abilities"],
      "description": "The ultimate Uchiha with legendary powers",
      "recommended_traits": ["Damage", "Fire Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "S+",
        "infinite": "S+",
        "pvp": "S"
      },
      // Enhanced data
      "obtainment": "Summon (0.1% chance - Secret)",
      "deployment_cost": "2300¥",
      "total_upgrade_cost": "140,000¥",
      "abilities": [
        "Perfect Susanoo: Massive armored warrior that devastates the battlefield",
        "Tengai Shinsei: Summons meteors that deal catastrophic AoE damage",
        "Rinnegan Powers: Multiple special abilities including gravity manipulation"
      ],
      "optimal_traits": ["Monarch", "Fire Boost"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 10,
        "cost_efficiency": 6,
        "versatility": 9,
        "survivability": 9
      },
      "detailed_stats": {
        "base_damage": "Extreme",
        "attack_speed": "Medium",
        "range": "Massive AoE",
        "special_abilities": "Perfect Susanoo, Tengai Shinsei"
      }
    },
    {
      "id": "whitebeard-prime",
      "name": "Whitebeard (Prime)",
      "rarity": "Secret",
      "element": "Quake",
      "tier": "STRONG_PICK",
      "placement_cost": "Very High",
      "max_placement": 2,
      "category": "DPS/Tank",
      "evolution_required": true,
      "pros": ["Quake fruit", "High durability", "AoE damage", "Tank capabilities"],
      "cons": ["Very expensive", "Limited placement", "Slow movement"],
      "description": "The strongest man in the world with quake powers",
      "recommended_traits": ["Damage", "Tank Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    
    // ====== NEW MYTHIC TIER UNITS ======
    {
      "id": "tanjiro-hinokami",
      "name": "Tanjiro (Hinokami)",
      "rarity": "Mythic",
      "element": "Fire",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Hinokami Kagura", "Sun breathing", "High damage", "Good range"],
      "cons": ["Expensive", "Fire element weakness", "Requires evolution"],
      "description": "Master of the legendary Hinokami Kagura technique",
      "recommended_traits": ["Damage", "Fire Boost"],
      "anime_source": "Demon Slayer",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      },
      // Enhanced data
      "obtainment": "Summon (1% chance - Mythic)",
      "deployment_cost": "1600¥",
      "total_upgrade_cost": "85,200¥",
      "abilities": [
        "Hinokami Kagura: Ancient sun breathing technique with devastating fire attacks",
        "Sun Breathing: Most powerful breathing style, effective against all demons",
        "Fire Dance: Creates a wall of flames that damages all enemies"
      ],
      "optimal_traits": ["Monarch", "Fire Boost"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 9,
        "cost_efficiency": 7,
        "versatility": 8,
        "survivability": 7
      },
      "detailed_stats": {
        "base_damage": "Very High",
        "attack_speed": "Fast",
        "range": "Large AoE",
        "special_abilities": "Hinokami Kagura, Sun Breathing"
      }
    },
    {
      "id": "zenitsu-god-speed",
      "name": "Zenitsu (God Speed)",
      "rarity": "Mythic",
      "element": "Lightning",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Thunder breathing", "God speed", "High burst damage", "Fast attacks"],
      "cons": ["Expensive", "Lightning element weakness", "Complex mechanics"],
      "description": "Lightning-fast demon slayer with god speed abilities",
      "recommended_traits": ["Speed", "Lightning Boost"],
      "anime_source": "Demon Slayer",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "inosuke-beast-king",
      "name": "Inosuke (Beast King)",
      "rarity": "Mythic",
      "element": "Physical",
      "tier": "SOLID",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Beast breathing", "High physical damage", "Good AoE", "Tank capabilities"],
      "cons": ["Expensive", "Physical element weakness", "Limited range"],
      "description": "Beast breathing master with wild combat style",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Demon Slayer",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "giyu-water-hashira",
      "name": "Giyu (Water Hashira)",
      "rarity": "Mythic",
      "element": "Water",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Water breathing", "Hashira power", "High damage", "Good utility"],
      "cons": ["Expensive", "Water element weakness", "Requires positioning"],
      "description": "Water Hashira with mastery of water breathing techniques",
      "recommended_traits": ["Damage", "Water Boost"],
      "anime_source": "Demon Slayer",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "shinobu-insect-hashira",
      "name": "Shinobu (Insect Hashira)",
      "rarity": "Mythic",
      "element": "Poison",
      "tier": "SOLID",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS/Support",
      "evolution_required": true,
      "pros": ["Insect breathing", "Poison effects", "Support abilities", "Good utility"],
      "cons": ["Expensive", "Poison element weakness", "Lower damage"],
      "description": "Insect Hashira with poison and support capabilities",
      "recommended_traits": ["Poison", "Support Boost"],
      "anime_source": "Demon Slayer",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "kakashi-copy-ninja",
      "name": "Kakashi (Copy Ninja)",
      "rarity": "Mythic",
      "element": "Lightning",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Sharingan", "Lightning techniques", "High damage", "Versatile abilities"],
      "cons": ["Expensive", "Lightning element weakness", "Complex mechanics"],
      "description": "The Copy Ninja with Sharingan and lightning mastery",
      "recommended_traits": ["Damage", "Lightning Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      },
      // Enhanced data
      "obtainment": "Summon (1% chance - Mythic)",
      "deployment_cost": "1800¥",
      "total_upgrade_cost": "89,500¥",
      "abilities": [
        "Sharingan: Can copy enemy techniques and predict attacks",
        "Chidori: Powerful lightning-based piercing attack",
        "Lightning Blade: Enhanced version of Chidori with greater range"
      ],
      "optimal_traits": ["Monarch", "Lightning Boost"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 9,
        "cost_efficiency": 7,
        "versatility": 9,
        "survivability": 7
      },
      "detailed_stats": {
        "base_damage": "Very High",
        "attack_speed": "Fast",
        "range": "Medium",
        "special_abilities": "Sharingan, Chidori"
      }
    },
    {
      "id": "itachi-akatsuki",
      "name": "Itachi (Akatsuki)",
      "rarity": "Mythic",
      "element": "Fire",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "pros": ["Mangekyo Sharingan", "Fire techniques", "Genjutsu", "High damage"],
      "cons": ["Expensive", "Fire element weakness", "Complex abilities"],
      "description": "Akatsuki member with Mangekyo Sharingan powers",
      "recommended_traits": ["Damage", "Fire Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "minato-yellow-flash",
      "name": "Minato (Yellow Flash)",
      "rarity": "Mythic",
      "element": "Space",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Flying Thunder God", "Space-time jutsu", "High damage", "Teleportation"],
      "cons": ["Expensive", "Space element weakness", "Complex positioning"],
      "description": "The Yellow Flash with space-time mastery",
      "recommended_traits": ["Damage", "Space Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "ace-fire-fist",
      "name": "Ace (Fire Fist)",
      "rarity": "Mythic",
      "element": "Fire",
      "tier": "SOLID",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Fire fruit", "High fire damage", "Good AoE", "Logia immunity"],
      "cons": ["Expensive", "Fire element weakness", "Limited utility"],
      "description": "Fire Fist Ace with Logia devil fruit powers",
      "recommended_traits": ["Damage", "Fire Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "luffy-gear-5",
      "name": "Luffy (Gear 5)",
      "rarity": "Mythic",
      "element": "Physical",
      "tier": "META_DEFINING",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Gear 5 transformation", "High damage", "Good AoE", "Versatile abilities"],
      "cons": ["Expensive", "Physical element weakness", "Complex mechanics"],
      "description": "Straw Hat captain in his ultimate Gear 5 form",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "S+",
        "infinite": "S+",
        "pvp": "A"
      }
    },
    {
      "id": "zoro-king-hell",
      "name": "Zoro (King of Hell)",
      "rarity": "Mythic",
      "element": "Physical",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["King of Hell", "High damage", "Good range", "Sword mastery"],
      "cons": ["Expensive", "Physical element weakness", "Limited AoE"],
      "description": "The King of Hell with ultimate sword techniques",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      },
      // Enhanced data
      "obtainment": "Summon (1% chance - Mythic)",
      "deployment_cost": "1900¥",
      "total_upgrade_cost": "95,800¥",
      "abilities": [
        "King of Hell: Unlocks the power of Enma and becomes the King of Hell",
        "Three Sword Style: Uses three swords simultaneously for devastating attacks",
        "Conqueror's Haki: Intimidates weaker enemies and boosts damage"
      ],
      "optimal_traits": ["Monarch", "Physical Boost"],
      "optimal_familiar": "Birb",
      "ratings": {
        "damage": 10,
        "cost_efficiency": 7,
        "versatility": 7,
        "survivability": 8
      },
      "detailed_stats": {
        "base_damage": "Extreme",
        "attack_speed": "Very Fast",
        "range": "Medium",
        "special_abilities": "King of Hell, Three Sword Style"
      }
    },
    {
      "id": "ichigo-bankai",
      "name": "Ichigo (Bankai)",
      "rarity": "Mythic",
      "element": "Soul",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Bankai form", "High damage", "Good range", "Soul reaper powers"],
      "cons": ["Expensive", "Soul element weakness", "Complex abilities"],
      "description": "Soul Reaper with Bankai transformation",
      "recommended_traits": ["Damage", "Soul Boost"],
      "anime_source": "Bleach",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "aizen-sosuke",
      "name": "Aizen (Sosuke)",
      "rarity": "Mythic",
      "element": "Illusion",
      "tier": "STRONG_PICK",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS/Support",
      "evolution_required": true,
      "pros": ["Kyoka Suigetsu", "Illusion powers", "High damage", "Crowd control"],
      "cons": ["Expensive", "Illusion element weakness", "Complex mechanics"],
      "description": "Master manipulator with illusion and hypnosis powers",
      "recommended_traits": ["Damage", "Illusion Boost"],
      "anime_source": "Bleach",
      "mode_performance": {
        "story": "S",
        "infinite": "S",
        "pvp": "A"
      }
    },
    {
      "id": "yoruichi-thunder-god",
      "name": "Yoruichi (Thunder God)",
      "rarity": "Mythic",
      "element": "Lightning",
      "tier": "SOLID",
      "placement_cost": "High",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": true,
      "pros": ["Thunder God form", "High speed", "Good damage", "Utility skills"],
      "cons": ["Expensive", "Lightning element weakness", "Limited AoE"],
      "description": "Thunder God with lightning-fast combat abilities",
      "recommended_traits": ["Speed", "Lightning Boost"],
      "anime_source": "Bleach",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    
    // ====== NEW LEGENDARY TIER UNITS ======
    {
      "id": "naruto-sage-mode",
      "name": "Naruto (Sage Mode)",
      "rarity": "Legendary",
      "element": "Nature",
      "tier": "SOLID",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Sage mode", "Nature chakra", "Good damage", "No evolution needed"],
      "cons": ["Medium cost", "Nature element weakness", "Limited utility"],
      "description": "Naruto in powerful Sage Mode",
      "recommended_traits": ["Damage", "Nature Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "sasuke-curse-mark",
      "name": "Sasuke (Curse Mark)",
      "rarity": "Legendary",
      "element": "Lightning",
      "tier": "SOLID",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Curse mark", "Lightning techniques", "Good damage", "No evolution needed"],
      "cons": ["Medium cost", "Lightning element weakness", "Limited AoE"],
      "description": "Sasuke with curse mark powers",
      "recommended_traits": ["Damage", "Lightning Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "sakura-medical-ninja",
      "name": "Sakura (Medical Ninja)",
      "rarity": "Legendary",
      "element": "Support",
      "tier": "SOLID",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "Support",
      "evolution_required": false,
      "pros": ["Medical jutsu", "Healing abilities", "Good support", "High placement"],
      "cons": ["No direct damage", "Support role only", "Requires allies"],
      "description": "Medical ninja with healing and support abilities",
      "recommended_traits": ["Healing", "Support Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "sanji-black-leg",
      "name": "Sanji (Black Leg)",
      "rarity": "Legendary",
      "element": "Fire",
      "tier": "SOLID",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Black leg style", "Fire kicks", "Good damage", "No evolution needed"],
      "cons": ["Medium cost", "Fire element weakness", "Limited range"],
      "description": "Black Leg Sanji with fire-powered kicks",
      "recommended_traits": ["Damage", "Fire Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "nami-weather-witch",
      "name": "Nami (Weather Witch)",
      "rarity": "Legendary",
      "element": "Weather",
      "tier": "SOLID",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS/Support",
      "evolution_required": false,
      "pros": ["Weather control", "Lightning attacks", "Good utility", "No evolution needed"],
      "cons": ["Medium cost", "Weather element weakness", "Lower damage"],
      "description": "Weather witch with climate control abilities",
      "recommended_traits": ["Weather", "Utility Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "A",
        "infinite": "A",
        "pvp": "B"
      }
    },
    {
      "id": "usopp-sniper-king",
      "name": "Usopp (Sniper King)",
      "rarity": "Legendary",
      "element": "Physical",
      "tier": "SITUATIONAL",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Sniper skills", "Long range", "Good utility", "No evolution needed"],
      "cons": ["Medium cost", "Physical element weakness", "Lower damage"],
      "description": "Sniper King with long-range combat abilities",
      "recommended_traits": ["Range", "Utility Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "chopper-monster-point",
      "name": "Chopper (Monster Point)",
      "rarity": "Legendary",
      "element": "Physical",
      "tier": "SITUATIONAL",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS/Tank",
      "evolution_required": false,
      "pros": ["Monster point", "High durability", "Good damage", "No evolution needed"],
      "cons": ["Medium cost", "Physical element weakness", "Limited utility"],
      "description": "Monster Point Chopper with enhanced combat abilities",
      "recommended_traits": ["Damage", "Tank Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "robin-demonic",
      "name": "Robin (Demonic)",
      "rarity": "Legendary",
      "element": "Physical",
      "tier": "SITUATIONAL",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Devil fruit", "Multiple limbs", "Good utility", "No evolution needed"],
      "cons": ["Medium cost", "Physical element weakness", "Lower damage"],
      "description": "Demonic Robin with devil fruit powers",
      "recommended_traits": ["Utility", "Physical Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "franky-cyborg",
      "name": "Franky (Cyborg)",
      "rarity": "Legendary",
      "element": "Physical",
      "tier": "SITUATIONAL",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS/Tank",
      "evolution_required": false,
      "pros": ["Cyborg body", "High durability", "Good damage", "No evolution needed"],
      "cons": ["Medium cost", "Physical element weakness", "Limited utility"],
      "description": "Cyborg Franky with mechanical enhancements",
      "recommended_traits": ["Damage", "Tank Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "brook-soul-king",
      "name": "Brook (Soul King)",
      "rarity": "Legendary",
      "element": "Soul",
      "tier": "SITUATIONAL",
      "placement_cost": "Medium",
      "max_placement": 4,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Soul powers", "Musical abilities", "Good utility", "No evolution needed"],
      "cons": ["Medium cost", "Soul element weakness", "Lower damage"],
      "description": "Soul King Brook with musical soul powers",
      "recommended_traits": ["Utility", "Soul Boost"],
      "anime_source": "One Piece",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    
    // ====== NEW EPIC TIER UNITS ======
    {
      "id": "kiba-inuzuka",
      "name": "Kiba (Inuzuka)",
      "rarity": "Epic",
      "element": "Physical",
      "tier": "SITUATIONAL",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Beast companion", "Good damage", "Low cost", "High placement"],
      "cons": ["Physical element weakness", "Limited utility", "Basic abilities"],
      "description": "Inuzuka clan member with beast companion",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "shino-aburame",
      "name": "Shino (Aburame)",
      "rarity": "Epic",
      "element": "Insect",
      "tier": "SITUATIONAL",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Insect control", "Good utility", "Low cost", "High placement"],
      "cons": ["Insect element weakness", "Lower damage", "Basic abilities"],
      "description": "Aburame clan member with insect control",
      "recommended_traits": ["Utility", "Insect Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "hinata-hyuuga",
      "name": "Hinata (Hyuuga)",
      "rarity": "Epic",
      "element": "Physical",
      "tier": "SITUATIONAL",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Byakugan", "Good damage", "Low cost", "High placement"],
      "cons": ["Physical element weakness", "Limited utility", "Basic abilities"],
      "description": "Hyuuga clan member with Byakugan",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "shikamaru-nara",
      "name": "Shikamaru (Nara)",
      "rarity": "Epic",
      "element": "Shadow",
      "tier": "SITUATIONAL",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "DPS/Support",
      "evolution_required": false,
      "pros": ["Shadow techniques", "Good utility", "Low cost", "High placement"],
      "cons": ["Shadow element weakness", "Lower damage", "Basic abilities"],
      "description": "Nara clan member with shadow techniques",
      "recommended_traits": ["Utility", "Shadow Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "ino-yamanaka",
      "name": "Ino (Yamanaka)",
      "rarity": "Epic",
      "element": "Support",
      "tier": "SITUATIONAL",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "Support",
      "evolution_required": false,
      "pros": ["Mind transfer", "Good support", "Low cost", "High placement"],
      "cons": ["No direct damage", "Support role only", "Basic abilities"],
      "description": "Yamanaka clan member with mind transfer",
      "recommended_traits": ["Support", "Utility Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "choji-akimichi",
      "name": "Choji (Akimichi)",
      "rarity": "Epic",
      "element": "Physical",
      "tier": "SITUATIONAL",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "DPS/Tank",
      "evolution_required": false,
      "pros": ["Expansion jutsu", "Good tank", "Low cost", "High placement"],
      "cons": ["Physical element weakness", "Limited utility", "Basic abilities"],
      "description": "Akimichi clan member with expansion techniques",
      "recommended_traits": ["Tank", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "kankuro-puppet-master",
      "name": "Kankuro (Puppet Master)",
      "rarity": "Epic",
      "element": "Physical",
      "tier": "SITUATIONAL",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Puppet control", "Good utility", "Low cost", "High placement"],
      "cons": ["Physical element weakness", "Lower damage", "Basic abilities"],
      "description": "Puppet master with mechanical puppets",
      "recommended_traits": ["Utility", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "temari-wind-master",
      "name": "Temari (Wind Master)",
      "rarity": "Epic",
      "element": "Wind",
      "tier": "SITUATIONAL",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Wind techniques", "Good damage", "Low cost", "High placement"],
      "cons": ["Wind element weakness", "Limited utility", "Basic abilities"],
      "description": "Wind master with powerful wind techniques",
      "recommended_traits": ["Damage", "Wind Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    {
      "id": "gaara-sand",
      "name": "Gaara (Sand)",
      "rarity": "Epic",
      "element": "Earth",
      "tier": "SITUATIONAL",
      "placement_cost": "Low",
      "max_placement": 6,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Sand control", "Good damage", "Low cost", "High placement"],
      "cons": ["Earth element weakness", "Limited utility", "Basic abilities"],
      "description": "Sand user with sand manipulation abilities",
      "recommended_traits": ["Damage", "Earth Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "B",
        "infinite": "B",
        "pvp": "C"
      }
    },
    
    // ====== NEW RARE TIER UNITS ======
    {
      "id": "konohamaru-sarutobi",
      "name": "Konohamaru (Sarutobi)",
      "rarity": "Rare",
      "element": "Wind",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Wind techniques", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Wind element weakness"],
      "description": "Young Sarutobi clan member with wind chakra",
      "recommended_traits": ["Damage", "Wind Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    },
    {
      "id": "moegi-uzumaki",
      "name": "Moegi (Uzumaki)",
      "rarity": "Rare",
      "element": "Wood",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Wood release", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Wood element weakness"],
      "description": "Uzumaki clan member with wood release",
      "recommended_traits": ["Damage", "Wood Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    },
    {
      "id": "udon-iwabee",
      "name": "Udon (Iwabee)",
      "rarity": "Rare",
      "element": "Physical",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Physical techniques", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Physical element weakness"],
      "description": "Physical combat specialist with basic techniques",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    },
    {
      "id": "tenten-weapon-master",
      "name": "Tenten (Weapon Master)",
      "rarity": "Rare",
      "element": "Physical",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Weapon mastery", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Physical element weakness"],
      "description": "Weapon master with various combat tools",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    },
    {
      "id": "rock-lee-youth",
      "name": "Rock Lee (Youth)",
      "rarity": "Rare",
      "element": "Physical",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Taijutsu mastery", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Physical element weakness"],
      "description": "Young taijutsu master with incredible speed",
      "recommended_traits": ["Speed", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    },
    {
      "id": "neji-hyuuga-genin",
      "name": "Neji (Hyuuga Genin)",
      "rarity": "Rare",
      "element": "Physical",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Byakugan", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Physical element weakness"],
      "description": "Young Hyuuga prodigy with Byakugan",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    },
    {
      "id": "kiba-inuzuka-genin",
      "name": "Kiba (Inuzuka Genin)",
      "rarity": "Rare",
      "element": "Physical",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Beast companion", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Physical element weakness"],
      "description": "Young Inuzuka with basic beast techniques",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    },
    {
      "id": "shino-aburame-genin",
      "name": "Shino (Aburame Genin)",
      "rarity": "Rare",
      "element": "Insect",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Insect control", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Insect element weakness"],
      "description": "Young Aburame with basic insect techniques",
      "recommended_traits": ["Utility", "Insect Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    },
    {
      "id": "hinata-hyuuga-genin",
      "name": "Hinata (Hyuuga Genin)",
      "rarity": "Rare",
      "element": "Physical",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Byakugan", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Physical element weakness"],
      "description": "Young Hyuuga with basic Byakugan",
      "recommended_traits": ["Damage", "Physical Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    },
    {
      "id": "shikamaru-nara-genin",
      "name": "Shikamaru (Nara Genin)",
      "rarity": "Rare",
      "element": "Shadow",
      "tier": "AVOID",
      "placement_cost": "Very Low",
      "max_placement": 8,
      "category": "DPS",
      "evolution_required": false,
      "pros": ["Shadow techniques", "Very cheap", "High placement", "Easy to obtain"],
      "cons": ["Low damage", "Basic abilities", "Shadow element weakness"],
      "description": "Young Nara with basic shadow techniques",
      "recommended_traits": ["Utility", "Shadow Boost"],
      "anime_source": "Naruto",
      "mode_performance": {
        "story": "C",
        "infinite": "C",
        "pvp": "C"
      }
    }
  ],
  "tiers": {
    "META_DEFINING": {
      "name": "🔥 META DEFINING",
      "description": "定义版本的顶级角色，游戏破坏者级别",
      "color": "#ff4757",
      "gradient": "linear-gradient(135deg, #ff4757, #ff3838)"
    },
    "STRONG_PICK": {
      "name": "⚡ STRONG PICK", 
      "description": "强力推荐角色，当前版本主流选择",
      "color": "#ff6348",
      "gradient": "linear-gradient(135deg, #ff6348, #ff5722)"
    },
    "SOLID": {
      "name": "💎 SOLID",
      "description": "稳定可靠的选择，适合大多数内容",
      "color": "#3742fa",
      "gradient": "linear-gradient(135deg, #3742fa, #2f3542)"
    },
    "SITUATIONAL": {
      "name": "🛠️ SITUATIONAL",
      "description": "特定场合使用，有一定价值",
      "color": "#2ed573",
      "gradient": "linear-gradient(135deg, #2ed573, #1dd1a1)"
    },
    "AVOID": {
      "name": "❌ AVOID",
      "description": "不推荐使用，性能较差",
      "color": "#747d8c",
      "gradient": "linear-gradient(135deg, #747d8c, #57606f)"
    }
  },
  "rarities": {
    "Vanguard": {"color": "#9b59b6", "chance": "0.005%"},
    "Secret": {"color": "#e74c3c", "chance": "0.1%"},
    "Mythic": {"color": "#f39c12", "chance": "1%"},
    "Legendary": {"color": "#3498db", "chance": "3.5%"},
    "Epic": {"color": "#9b59b6", "chance": "20%"},
    "Rare": {"color": "#2ecc71", "chance": "75.495%"}
  }
};
