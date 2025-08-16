// Real Anime Vanguards Evolution Data
// 基于真实Anime Vanguards游戏数据的进化路径

export const REAL_EVOLUTION_DATA = {
  // Mythic单位进化
  "alocard": {
    name: "Alocard",
    rarity: "Mythic",
    element: "Dark",
    canEvolve: true,
    evolutionName: "Alocard (Vampire King)",
    requirements: {
      cost: 15000,
      materials: [
        { name: "Hellsing Arms", count: 1, rarity: "Legendary" },
        { name: "Purple Essence Stone", count: 13, rarity: "Rare" },
        { name: "Green Essence Stone", count: 35, rarity: "Common" },
        { name: "Rainbow Essence Stone", count: 2, rarity: "Mythic" },
        { name: "Yellow Essence Stone", count: 13, rarity: "Uncommon" }
      ]
    }
  },
  
  "songjinwu": {
    name: "Song Jinwu",
    rarity: "Mythic", 
    element: "Shadow",
    canEvolve: true,
    evolutionName: "Song Jinwu (Monarch)",
    requirements: {
      cost: 15000,
      materials: [
        { name: "Shadow Trace", count: 12, rarity: "Legendary" },
        { name: "Pink Essence Stone", count: 11, rarity: "Rare" },
        { name: "Rainbow Essence Stone", count: 1, rarity: "Mythic" },
        { name: "Green Essence Stone", count: 30, rarity: "Common" },
        { name: "Yellow Essence Stone", count: 12, rarity: "Uncommon" }
      ]
    }
  },

  "igros": {
    name: "Igros",
    rarity: "Mythic",
    element: "Physical", 
    canEvolve: true,
    evolutionName: "Igros (Elite Knight)",
    requirements: {
      cost: 15000,
      materials: [
        { name: "Blood Red Armor", count: 12, rarity: "Legendary" },
        { name: "Red Essence Stone", count: 10, rarity: "Rare" },
        { name: "Pink Essence Stone", count: 10, rarity: "Rare" },
        { name: "Rainbow Essence Stone", count: 1, rarity: "Mythic" },
        { name: "Green Essence Stone", count: 32, rarity: "Common" },
        { name: "Blue Essence Stone", count: 10, rarity: "Uncommon" }
      ]
    }
  },

  "obita": {
    name: "Obita", 
    rarity: "Mythic",
    element: "Fire",
    canEvolve: true,
    evolutionName: "Obita (Awakened)",
    requirements: {
      cost: 15000,
      materials: [
        { name: "Skin Patch", count: 12, rarity: "Legendary" },
        { name: "Purple Essence Stone", count: 12, rarity: "Rare" },
        { name: "Rainbow Essence Stone", count: 1, rarity: "Mythic" },
        { name: "Yellow Essence Stone", count: 11, rarity: "Uncommon" },
        { name: "Green Essence Stone", count: 30, rarity: "Common" }
      ]
    }
  },

  "noruto": {
    name: "Noruto",
    rarity: "Mythic",
    element: "Wind", 
    canEvolve: true,
    evolutionName: "Noruto (Six Tails)",
    requirements: {
      cost: 15000,
      materials: [
        { name: "Red Chakra", count: 6, rarity: "Rare" },
        { name: "Blue Chakra", count: 6, rarity: "Rare" },
        { name: "Green Essence Stone", count: 30, rarity: "Common" },
        { name: "Blue Essence Stone", count: 12, rarity: "Uncommon" },
        { name: "Pink Essence Stone", count: 11, rarity: "Rare" },
        { name: "Rainbow Essence Stone", count: 2, rarity: "Mythic" }
      ]
    }
  },

  "gujo": {
    name: "Gujo",
    rarity: "Mythic",
    element: "Energy",
    canEvolve: true, 
    evolutionName: "Gujo (Infinity)",
    requirements: {
      cost: 15000,
      materials: [
        { name: "Cursed Finger", count: 1, rarity: "Legendary" },
        { name: "Purple Essence Stone", count: 15, rarity: "Rare" },
        { name: "Green Essence Stone", count: 35, rarity: "Common" },
        { name: "Rainbow Essence Stone", count: 2, rarity: "Mythic" }
      ]
    }
  },

  "rengoku": {
    name: "Rengoku",
    rarity: "Mythic",
    element: "Fire",
    canEvolve: true,
    evolutionName: "Rengoku (Purgatory)", 
    requirements: {
      cost: 15000,
      materials: [
        { name: "Flame Cape", count: 1, rarity: "Legendary" },
        { name: "Red Essence Stone", count: 15, rarity: "Rare" },
        { name: "Green Essence Stone", count: 30, rarity: "Common" },
        { name: "Rainbow Essence Stone", count: 1, rarity: "Mythic" }
      ]
    }
  }
};

// 材料获取方法数据
export const MATERIAL_OBTAIN_METHODS = {
  "Hellsing Arms": {
    method: "Red Key Quest",
    difficulty: "Hard",
    dropRate: "Low",
    location: "Hellsing Dungeon"
  },
  "Shadow Trace": {
    method: "Shadow Realm",
    difficulty: "Hard", 
    dropRate: "Medium",
    location: "Shadow Dimension"
  },
  "Blood Red Armor": {
    method: "Knight's Trial",
    difficulty: "Hard",
    dropRate: "Medium", 
    location: "Knight's Arena"
  },
  "Skin Patch": {
    method: "Fire Temple",
    difficulty: "Medium",
    dropRate: "High",
    location: "Fire Temple Dungeon"
  },
  "Red Chakra": {
    method: "Chakra Training",
    difficulty: "Medium",
    dropRate: "Medium",
    location: "Chakra Training Grounds"
  },
  "Blue Chakra": {
    method: "Chakra Training", 
    difficulty: "Medium",
    dropRate: "Medium",
    location: "Chakra Training Grounds"
  },
  "Cursed Finger": {
    method: "Cursed Realm",
    difficulty: "Very Hard",
    dropRate: "Very Low",
    location: "Cursed Dimension"
  },
  "Flame Cape": {
    method: "Purgatory Trial",
    difficulty: "Very Hard",
    dropRate: "Low",
    location: "Purgatory Arena"
  }
};

// 进化成本汇总数据
export const EVOLUTION_COST_SUMMARY = {
  "alocard": {
    totalCost: 15000,
    materialCost: 12000,
    evolutionCost: 3000,
    timeRequired: "2-3 days",
    difficulty: "Hard"
  },
  "songjinwu": {
    totalCost: 15000,
    materialCost: 11500,
    evolutionCost: 3500,
    timeRequired: "2-3 days", 
    difficulty: "Hard"
  },
  "igros": {
    totalCost: 15000,
    materialCost: 12500,
    evolutionCost: 2500,
    timeRequired: "2-3 days",
    difficulty: "Hard"
  },
  "obita": {
    totalCost: 15000,
    materialCost: 11800,
    evolutionCost: 3200,
    timeRequired: "2-3 days",
    difficulty: "Hard"
  },
  "noruto": {
    totalCost: 15000,
    materialCost: 13000,
    evolutionCost: 2000,
    timeRequired: "2-3 days",
    difficulty: "Hard"
  },
  "gujo": {
    totalCost: 15000,
    materialCost: 12800,
    evolutionCost: 2200,
    timeRequired: "2-3 days",
    difficulty: "Very Hard"
  },
  "rengoku": {
    totalCost: 15000,
    materialCost: 12200,
    evolutionCost: 2800,
    timeRequired: "2-3 days",
    difficulty: "Very Hard"
  }
};

// 农场指南数据
export const FARMING_GUIDE_DATA = {
  "alocard": {
    priority: "High",
    difficulty: "Hard",
    tips: [
      "Focus on Red Key Quest for Hellsing Arms",
      "Farm Purple Essence Stones from Dark Dungeons",
      "Use energy efficiently for Rainbow Essence Stones",
      "Join guild raids for better drop rates"
    ],
    obtainMethods: [
      "Red Key Quest (Hellsing Arms)",
      "Dark Dungeon (Purple Essence Stones)", 
      "Mythic Summon (Rainbow Essence Stones)",
      "Guild Raids (Better drop rates)"
    ]
  },
  "songjinwu": {
    priority: "High",
    difficulty: "Hard",
    tips: [
      "Enter Shadow Realm for Shadow Trace",
      "Focus on Pink Essence Stone farming",
      "Use shadow energy for better efficiency",
      "Complete shadow missions for bonuses"
    ],
    obtainMethods: [
      "Shadow Realm (Shadow Trace)",
      "Rare Dungeons (Pink Essence Stones)",
      "Mythic Summon (Rainbow Essence Stones)",
      "Shadow Missions (Bonuses)"
    ]
  },
  "igros": {
    priority: "Medium",
    difficulty: "Hard",
    tips: [
      "Complete Knight's Trial for Blood Red Armor",
      "Farm Red and Pink Essence Stones",
      "Use physical energy for armor farming",
      "Join knight tournaments for rewards"
    ],
    obtainMethods: [
      "Knight's Trial (Blood Red Armor)",
      "Fire Dungeons (Red Essence Stones)",
      "Rare Dungeons (Pink Essence Stones)",
      "Knight Tournaments (Rewards)"
    ]
  },
  "obita": {
    priority: "Medium",
    difficulty: "Medium",
    tips: [
      "Visit Fire Temple for Skin Patch",
      "Focus on Purple Essence Stone farming",
      "Use fire energy for temple access",
      "Complete fire missions for bonuses"
    ],
    obtainMethods: [
      "Fire Temple (Skin Patch)",
      "Dark Dungeons (Purple Essence Stones)",
      "Mythic Summon (Rainbow Essence Stones)",
      "Fire Missions (Bonuses)"
    ]
  },
  "noruto": {
    priority: "High",
    difficulty: "Medium",
    tips: [
      "Train at Chakra Training Grounds",
      "Focus on Blue Essence Stone farming",
      "Use wind energy for chakra training",
      "Complete chakra missions for bonuses"
    ],
    obtainMethods: [
      "Chakra Training (Red/Blue Chakra)",
      "Wind Dungeons (Blue Essence Stones)",
      "Rare Dungeons (Pink Essence Stones)",
      "Chakra Missions (Bonuses)"
    ]
  },
  "gujo": {
    priority: "Very High",
    difficulty: "Very Hard",
    tips: [
      "Enter Cursed Realm for Cursed Finger",
      "Focus on Purple Essence Stone farming",
      "Use cursed energy for realm access",
      "Join cursed raids for better drops"
    ],
    obtainMethods: [
      "Cursed Realm (Cursed Finger)",
      "Dark Dungeons (Purple Essence Stones)",
      "Mythic Summon (Rainbow Essence Stones)",
      "Cursed Raids (Better drops)"
    ]
  },
  "rengoku": {
    priority: "Very High",
    difficulty: "Very Hard",
    tips: [
      "Complete Purgatory Trial for Flame Cape",
      "Focus on Red Essence Stone farming",
      "Use purgatory energy for trial access",
      "Join purgatory raids for better drops"
    ],
    obtainMethods: [
      "Purgatory Trial (Flame Cape)",
      "Fire Dungeons (Red Essence Stones)",
      "Mythic Summon (Rainbow Essence Stones)",
      "Purgatory Raids (Better drops)"
    ]
  }
};
