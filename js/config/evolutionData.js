// Evolution System Data
// Complete evolution requirements, materials, and farming guide

// Evolution data structure
export const evolutionData = {
  "tanjiro": {
    unitId: "tanjiro",
    evolutions: [
      {
        tier: 1,
        name: "Tanjiro",
        requirements: { level: 1, materials: [], cost: 800 },
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
        statMultiplier: 1.8
      },
      {
        tier: 3,
        name: "Tanjiro (Sun Breathing)", 
        requirements: { 
          level: 55, 
          materials: ["Sun Stone x2", "Master's Teachings", "Hinokami Kagura Scroll", "Pure Water x5"], 
          cost: 2200, 
          gems: 50 
        },
        statMultiplier: 2.5
      }
    ]
  },

  "goku": {
    unitId: "goku",
    evolutions: [
      {
        tier: 1,
        name: "Goku",
        requirements: { level: 1, materials: [], cost: 1200 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Super Saiyan Goku",
        requirements: { 
          level: 40, 
          materials: ["Saiyan Blood x4", "Power Crystal", "Training Weights"], 
          cost: 2500 
        },
        statMultiplier: 2.0
      },
      {
        tier: 3,
        name: "Super Saiyan Blue Goku",
        requirements: { 
          level: 60, 
          materials: ["Divine Ki x3", "God Stone x2", "Ultra Instinct Fragment", "Saiyan Pride x6"], 
          cost: 4500, 
          gems: 100 
        },
        statMultiplier: 3.2
      }
    ]
  },

  "naruto": {
    unitId: "naruto",
    evolutions: [
      {
        tier: 1,
        name: "Naruto",
        requirements: { level: 1, materials: [], cost: 1000 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Nine-Tails Chakra Mode Naruto",
        requirements: { 
          level: 38, 
          materials: ["Nine-Tails Chakra x3", "Sage Mode Scroll", "Ramen Bowl"], 
          cost: 2000 
        },
        statMultiplier: 1.9
      },
      {
        tier: 3,
        name: "Six Paths Sage Mode Naruto",
        requirements: { 
          level: 58, 
          materials: ["Six Paths Power x2", "Sage Orb x3", "Truth-Seeking Ball", "Hokage Cloak x4"], 
          cost: 3800, 
          gems: 75 
        },
        statMultiplier: 2.8
      }
    ]
  },

  "luffy": {
    unitId: "luffy",
    evolutions: [
      {
        tier: 1,
        name: "Luffy",
        requirements: { level: 1, materials: [], cost: 900 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Gear 4 Luffy",
        requirements: { 
          level: 42, 
          materials: ["Rubber Essence x4", "Haki Crystal", "Meat x10"], 
          cost: 2300 
        },
        statMultiplier: 2.1
      },
      {
        tier: 3,
        name: "Gear 5 Luffy",
        requirements: { 
          level: 62, 
          materials: ["Sun God Power x2", "Awakened Fruit x3", "Joyboy Legacy", "Straw Hat x5"], 
          cost: 5000, 
          gems: 120 
        },
        statMultiplier: 3.5
      }
    ]
  },

  "ichigo": {
    unitId: "ichigo",
    evolutions: [
      {
        tier: 1,
        name: "Ichigo",
        requirements: { level: 1, materials: [], cost: 1100 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Bankai Ichigo",
        requirements: { 
          level: 36, 
          materials: ["Soul Reaper Power x3", "Zanpakuto Fragment", "Spiritual Pressure"], 
          cost: 1800 
        },
        statMultiplier: 1.7
      },
      {
        tier: 3,
        name: "True Bankai Ichigo",
        requirements: { 
          level: 56, 
          materials: ["Quincy Blood x2", "Hollow Mask x2", "Soul King Fragment", "Zangetsu Spirit x4"], 
          cost: 3500, 
          gems: 80 
        },
        statMultiplier: 2.9
      }
    ]
  },

  "saitama": {
    unitId: "saitama",
    evolutions: [
      {
        tier: 1,
        name: "Saitama",
        requirements: { level: 1, materials: [], cost: 2000 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Serious Saitama",
        requirements: { 
          level: 50, 
          materials: ["Limitless Power x5", "Bald Head Shine", "Hero License"], 
          cost: 5000 
        },
        statMultiplier: 2.5
      },
      {
        tier: 3,
        name: "One Punch Saitama",
        requirements: { 
          level: 70, 
          materials: ["Infinite Strength x3", "Caped Baldy Title x2", "Hero Association Medal", "Training Regimen x10"], 
          cost: 10000, 
          gems: 200 
        },
        statMultiplier: 4.0
      }
    ]
  },

  "vegeta": {
    unitId: "vegeta",
    evolutions: [
      {
        tier: 1,
        name: "Vegeta",
        requirements: { level: 1, materials: [], cost: 1300 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Super Saiyan Vegeta",
        requirements: { 
          level: 41, 
          materials: ["Royal Blood x4", "Pride Crystal", "Gravity Chamber Data"], 
          cost: 2600 
        },
        statMultiplier: 2.0
      },
      {
        tier: 3,
        name: "Ultra Ego Vegeta",
        requirements: { 
          level: 61, 
          materials: ["Destruction Energy x3", "God of Destruction Symbol x2", "Saiyan Royal Crest", "Ultra Instinct Rival x6"], 
          cost: 4800, 
          gems: 110 
        },
        statMultiplier: 3.3
      }
    ]
  },

  "sasuke": {
    unitId: "sasuke",
    evolutions: [
      {
        tier: 1,
        name: "Sasuke",
        requirements: { level: 1, materials: [], cost: 1050 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Cursed Mark Sasuke",
        requirements: { 
          level: 37, 
          materials: ["Curse Seal x3", "Uchiha Blood", "Lightning Chakra"], 
          cost: 1900 
        },
        statMultiplier: 1.8
      },
      {
        tier: 3,
        name: "Rinnegan Sasuke",
        requirements: { 
          level: 57, 
          materials: ["Rinnegan Eye x2", "Indra's Power x2", "Susanoo Fragment", "Chidori Essence x5"], 
          cost: 3600, 
          gems: 85 
        },
        statMultiplier: 2.7
      }
    ]
  },

  "zoro": {
    unitId: "zoro",
    evolutions: [
      {
        tier: 1,
        name: "Zoro",
        requirements: { level: 1, materials: [], cost: 950 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Three Sword Style Zoro",
        requirements: { 
          level: 39, 
          materials: ["Sword Spirit x3", "Haki Blade", "Sake Bottle x5"], 
          cost: 2100 
        },
        statMultiplier: 1.9
      },
      {
        tier: 3,
        name: "King of Hell Zoro",
        requirements: { 
          level: 59, 
          materials: ["Enma Blade x2", "Conqueror's Haki x3", "Asura Spirit", "Wado Ichimonji x4"], 
          cost: 4200, 
          gems: 95 
        },
        statMultiplier: 3.0
      }
    ]
  },

  "nezuko": {
    unitId: "nezuko",
    evolutions: [
      {
        tier: 1,
        name: "Nezuko",
        requirements: { level: 1, materials: [], cost: 850 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Awakened Nezuko",
        requirements: { 
          level: 34, 
          materials: ["Demon Blood x3", "Bamboo Muzzle", "Family Bond"], 
          cost: 1600 
        },
        statMultiplier: 1.7
      },
      {
        tier: 3,
        name: "Demon Lord Nezuko",
        requirements: { 
          level: 54, 
          materials: ["Demon King Power x2", "Blood Demon Art x2", "Sunlight Resistance", "Brother's Love x3"], 
          cost: 2800, 
          gems: 60 
        },
        statMultiplier: 2.4
      }
    ]
  },

  "giyu": {
    unitId: "giyu",
    evolutions: [
      {
        tier: 1,
        name: "Giyu",
        requirements: { level: 1, materials: [], cost: 1150 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Water Hashira Giyu",
        requirements: { 
          level: 43, 
          materials: ["Water Breathing x4", "Hashira Badge", "Silent Determination"], 
          cost: 2400 
        },
        statMultiplier: 2.0
      },
      {
        tier: 3,
        name: "Dead Calm Giyu",
        requirements: { 
          level: 63, 
          materials: ["Perfect Water Form x3", "Hashira Master x2", "Sabito's Memory", "Makomo's Spirit x5"], 
          cost: 4600, 
          gems: 105 
        },
        statMultiplier: 3.1
      }
    ]
  },

  "zenitsu": {
    unitId: "zenitsu",
    evolutions: [
      {
        tier: 1,
        name: "Zenitsu",
        requirements: { level: 1, materials: [], cost: 800 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Thunder Breathing Zenitsu",
        requirements: { 
          level: 33, 
          materials: ["Lightning Essence x3", "Thunder Scroll", "Courage Shard"], 
          cost: 1550 
        },
        statMultiplier: 1.6
      },
      {
        tier: 3,
        name: "Godspeed Zenitsu",
        requirements: { 
          level: 53, 
          materials: ["Divine Thunder x2", "Speed of Light x2", "Grandfather's Teaching", "Yellow Lightning x4"], 
          cost: 2900, 
          gems: 65 
        },
        statMultiplier: 2.6
      }
    ]
  },

  "rengoku": {
    unitId: "rengoku",
    evolutions: [
      {
        tier: 1,
        name: "Rengoku",
        requirements: { level: 1, materials: [], cost: 1250 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Flame Hashira Rengoku",
        requirements: { 
          level: 44, 
          materials: ["Flame Heart x4", "Hashira Spirit", "Unyielding Will"], 
          cost: 2700 
        },
        statMultiplier: 2.1
      },
      {
        tier: 3,
        name: "Set Your Heart Ablaze Rengoku",
        requirements: { 
          level: 64, 
          materials: ["Eternal Flame x3", "Hashira Legacy x2", "Father's Pride", "Flame Pillar x6"], 
          cost: 5200, 
          gems: 125 
        },
        statMultiplier: 3.4
      }
    ]
  },

  "allmight": {
    unitId: "allmight",
    evolutions: [
      {
        tier: 1,
        name: "All Might",
        requirements: { level: 1, materials: [], cost: 1500 },
        statMultiplier: 1.0
      },
      {
        tier: 2,
        name: "Symbol of Peace All Might",
        requirements: { 
          level: 45, 
          materials: ["One For All x5", "Hero Symbol", "Plus Ultra Spirit"], 
          cost: 3000 
        },
        statMultiplier: 2.3
      },
      {
        tier: 3,
        name: "Prime All Might",
        requirements: { 
          level: 65, 
          materials: ["Prime Power x3", "Symbol of Peace Legacy x2", "Hero Society Foundation", "All Might Prime x7"], 
          cost: 6000, 
          gems: 150 
        },
        statMultiplier: 3.5
      }
    ]
  }
};

// Materials database
export const materials = {
  // Common Materials
  "Water Essence": {
    name: "Water Essence",
    rarity: "Common",
    source: ["Daily Material Dungeon", "Story Mode Ch1-5"],
    description: "Pure water essence used for water-based evolutions",
    dropRate: "70%",
    color: "#9e9e9e"
  },
  "Training Manual": {
    name: "Training Manual",
    rarity: "Common",
    source: ["Daily Material Dungeon", "Story Mode Ch1-10"],
    description: "Basic training guide for improving combat skills",
    dropRate: "65%",
    color: "#9e9e9e"
  },
  "Demon Blood": {
    name: "Demon Blood",
    rarity: "Uncommon",
    source: ["Story Mode Ch6-10", "Weekly Boss Challenge"],
    description: "Blood essence from defeated demons",
    dropRate: "45%",
    color: "#4caf50"
  },
  
  // Uncommon Materials
  "Power Crystal": {
    name: "Power Crystal",
    rarity: "Uncommon",
    source: ["Daily Material Dungeon", "Story Mode Ch11-15"],
    description: "Crystal containing concentrated energy",
    dropRate: "40%",
    color: "#4caf50"
  },
  "Training Weights": {
    name: "Training Weights",
    rarity: "Uncommon",
    source: ["Training Grounds", "Story Mode Ch8-12"],
    description: "Heavy weights used for strength training",
    dropRate: "42%",
    color: "#4caf50"
  },
  "Sage Mode Scroll": {
    name: "Sage Mode Scroll",
    rarity: "Uncommon",
    source: ["Mount Myoboku Event", "Story Mode Ch12-16"],
    description: "Ancient scroll containing sage techniques",
    dropRate: "38%",
    color: "#4caf50"
  },

  // Rare Materials  
  "Sun Stone": {
    name: "Sun Stone",
    rarity: "Rare",
    source: ["Weekly Boss Challenge", "Sun Temple Raid"],
    description: "Crystallized sunlight with immense power",
    dropRate: "25%",
    color: "#2196f3"
  },
  "Master's Teachings": {
    name: "Master's Teachings",
    rarity: "Rare",
    source: ["Master's Trial", "Monthly Event"],
    description: "Wisdom passed down from legendary masters",
    dropRate: "20%",
    color: "#2196f3"
  },
  "Saiyan Blood": {
    name: "Saiyan Blood",
    rarity: "Rare",
    source: ["Saiyan Saga Event", "Planet Vegeta Raid"],
    description: "Blood of the warrior race Saiyans",
    dropRate: "22%",
    color: "#2196f3"
  },
  "Divine Ki": {
    name: "Divine Ki",
    rarity: "Epic",
    source: ["God of Destruction Trial", "Divine Realm"],
    description: "Energy of the gods themselves",
    dropRate: "12%",
    color: "#9c27b0"
  },

  // Epic Materials
  "Hinokami Kagura Scroll": {
    name: "Hinokami Kagura Scroll",
    rarity: "Epic",
    source: ["Demon Slayer Final Trial", "Sun Breathing Event"],
    description: "Ancient scroll of the Sun Breathing technique",
    dropRate: "10%",
    color: "#9c27b0"
  },
  "God Stone": {
    name: "God Stone",
    rarity: "Epic",
    source: ["Divine Tournament", "God Realm Challenge"],
    description: "Stone blessed by divine power",
    dropRate: "8%",
    color: "#9c27b0"
  },
  "Six Paths Power": {
    name: "Six Paths Power",
    rarity: "Epic",
    source: ["Sage of Six Paths Event", "Final Valley"],
    description: "Power of the legendary Sage of Six Paths",
    dropRate: "7%",
    color: "#9c27b0"
  },
  "Sun God Power": {
    name: "Sun God Power",
    rarity: "Legendary",
    source: ["Gear 5 Awakening Event", "Laugh Tale"],
    description: "Power of the legendary Sun God Nika",
    dropRate: "3%",
    color: "#ff9800"
  },

  // Legendary Materials
  "Ultra Instinct Fragment": {
    name: "Ultra Instinct Fragment",
    rarity: "Legendary",
    source: ["Ultra Instinct Trial", "Angel Training"],
    description: "Fragment containing Ultra Instinct power",
    dropRate: "2%",
    color: "#ff9800"
  },
  "Truth-Seeking Ball": {
    name: "Truth-Seeking Ball",
    rarity: "Legendary",
    source: ["Six Paths Sage Event", "Otsutsuki Raid"],
    description: "Orb containing the power to destroy and create",
    dropRate: "2.5%",
    color: "#ff9800"
  },
  "Awakened Fruit": {
    name: "Awakened Fruit",
    rarity: "Legendary",
    source: ["Devil Fruit Awakening Event", "Wano Final Battle"],
    description: "Fully awakened Devil Fruit power",
    dropRate: "1.8%",
    color: "#ff9800"
  },

  // Mythic Materials
  "Limitless Power": {
    name: "Limitless Power",
    rarity: "Mythic",
    source: ["One Punch Man Ultimate Trial", "Hero Association S-Class"],
    description: "Power that knows no limits",
    dropRate: "0.5%",
    color: "#f44336"
  },
  "Infinite Strength": {
    name: "Infinite Strength",
    rarity: "Mythic",
    source: ["Saitama's Training Regimen", "Monster Association Raid"],
    description: "Strength that transcends all boundaries",
    dropRate: "0.3%",
    color: "#f44336"
  },
  "Prime Power": {
    name: "Prime Power",
    rarity: "Mythic",
    source: ["All Might Prime Events", "Symbol of Peace Trial"],
    description: "All Might's power in his absolute prime",
    dropRate: "0.2%",
    color: "#f44336"
  }
};

// Farming locations and recommendations
export const farmingLocations = [
  {
    name: "Daily Material Dungeon",
    type: "Daily Event",
    efficiency: "Very High",
    materials: ["Water Essence", "Training Manual", "Power Crystal", "Lightning Essence"],
    description: "Best source for common and uncommon materials",
    recommendation: "Run daily for consistent material gathering"
  },
  {
    name: "Story Mode Ch1-5",
    type: "Story Campaign",
    efficiency: "High",
    materials: ["Water Essence", "Training Manual", "Basic Materials"],
    description: "Good for farming common materials",
    recommendation: "Auto-farm when energy is available"
  },
  {
    name: "Weekly Boss Challenge",
    type: "Weekly Event",
    efficiency: "High",
    materials: ["Demon Blood", "Sun Stone", "Master's Teachings"],
    description: "Reliable source for rare materials",
    recommendation: "Complete all difficulties weekly"
  },
  {
    name: "Monthly Legendary Event",
    type: "Monthly Event",
    efficiency: "Ultra High",
    materials: ["Legendary Materials", "Mythic Materials"],
    description: "Only source for highest tier materials",
    recommendation: "Prioritize participation and completion"
  }
];

// Cost calculation utility
export function calculateEvolutionCost(unitId) {
  const evolution = evolutionData[unitId];
  if (!evolution) return null;

  let totalCost = 0;
  let totalGems = 0;
  let totalMaterials = [];

  evolution.evolutions.forEach(tier => {
    totalCost += tier.requirements.cost || 0;
    totalGems += tier.requirements.gems || 0;
    totalMaterials.push(...tier.requirements.materials);
  });

  return {
    totalCost,
    totalGems,
    totalMaterials: totalMaterials.length,
    materialsList: totalMaterials,
    breakdown: evolution.evolutions.map(tier => ({
      tier: tier.tier,
      name: tier.name,
      cost: tier.requirements.cost,
      gems: tier.requirements.gems || 0,
      materials: tier.requirements.materials
    }))
  };
}

// Material rarity colors
export const RARITY_COLORS = {
  'Common': '#9e9e9e',
  'Uncommon': '#4caf50', 
  'Rare': '#2196f3',
  'Epic': '#9c27b0',
  'Legendary': '#ff9800',
  'Mythic': '#f44336'
};

// Utility functions for evolution system
export const evolutionUtils = {
  getEvolutionData(unitId) {
    return evolutionData[unitId] || null;
  },

  parseMaterialString(materialString) {
    const match = materialString.match(/(.+?)\s*x(\d+)$/);
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

  getMaterialData(materialName) {
    return materials[materialName] || null;
  },

  getRarityColor(rarity) {
    return RARITY_COLORS[rarity] || '#9e9e9e';
  },

  formatDropRate(dropRate) {
    if (typeof dropRate === 'string') {
      return dropRate;
    }
    return `${dropRate}%`;
  }
};