// Anime Vanguards Traits 数据结构定义

export interface Trait {
  id: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  category: 'Attack' | 'Defense' | 'Utility' | 'Special' | 'Support';
  effect: {
    type: string;
    value: string;
    description: string;
  };
  cost: {
    rerollStones: number;
    gems?: number;
  };
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  compatibleUnits: string[]; // ["All"] 或具体单位名称
  imageUrl?: string;
  notes?: string;
  gameMode?: 'Story' | 'Infinite' | 'Raids' | 'All';
}

// 示例Traits数据
export const traitsData: Trait[] = [
  {
    id: "sharp",
    name: "Sharp",
    description: "Increases critical hit chance and damage",
    rarity: "Common",
    category: "Attack",
    effect: {
      type: "critical",
      value: "+15%",
      description: "Increases critical hit chance by 15%"
    },
    cost: {
      rerollStones: 1
    },
    tier: "A",
    compatibleUnits: ["All"],
    gameMode: "All",
    notes: "Basic but effective damage trait"
  },
  {
    id: "sturdy",
    name: "Sturdy",
    description: "Increases unit health and defense",
    rarity: "Common", 
    category: "Defense",
    effect: {
      type: "health_defense",
      value: "+20%",
      description: "Increases health by 20% and defense by 10%"
    },
    cost: {
      rerollStones: 1
    },
    tier: "B",
    compatibleUnits: ["All"],
    gameMode: "All",
    notes: "Good for survivability"
  },
  {
    id: "blazing",
    name: "Blazing",
    description: "Adds fire damage to attacks",
    rarity: "Rare",
    category: "Attack",
    effect: {
      type: "elemental_damage",
      value: "+25%",
      description: "Adds 25% fire damage and burn effect"
    },
    cost: {
      rerollStones: 3
    },
    tier: "S",
    compatibleUnits: ["Fire-type units"],
    gameMode: "All",
    notes: "Excellent for fire-based strategies"
  },
  {
    id: "swift",
    name: "Swift",
    description: "Increases attack speed",
    rarity: "Uncommon",
    category: "Utility",
    effect: {
      type: "attack_speed",
      value: "+30%",
      description: "Increases attack speed by 30%"
    },
    cost: {
      rerollStones: 2
    },
    tier: "A",
    compatibleUnits: ["All"],
    gameMode: "All",
    notes: "Great for DPS units"
  },
  {
    id: "regenerative",
    name: "Regenerative",
    description: "Slowly heals the unit over time",
    rarity: "Uncommon",
    category: "Defense",
    effect: {
      type: "healing",
      value: "2%/sec",
      description: "Heals 2% of max HP per second"
    },
    cost: {
      rerollStones: 2
    },
    tier: "B",
    compatibleUnits: ["All"],
    gameMode: "Infinite",
    notes: "Useful for long battles"
  },
  {
    id: "explosive",
    name: "Explosive",
    description: "Attacks have chance to deal AOE damage",
    rarity: "Epic",
    category: "Attack",
    effect: {
      type: "aoe_chance",
      value: "25%",
      description: "25% chance to deal AOE damage"
    },
    cost: {
      rerollStones: 5
    },
    tier: "S",
    compatibleUnits: ["Ranged units"],
    gameMode: "All",
    notes: "Excellent for crowd control"
  },
  {
    id: "divine",
    name: "Divine",
    description: "Massive stat boost with special effects",
    rarity: "Mythic",
    category: "Special",
    effect: {
      type: "all_stats",
      value: "+50%",
      description: "Increases all stats by 50% and adds divine aura"
    },
    cost: {
      rerollStones: 10,
      gems: 100
    },
    tier: "S",
    compatibleUnits: ["Legendary units only"],
    gameMode: "All",
    notes: "The ultimate trait for end-game units"
  },
  {
    id: "support_aura",
    name: "Support Aura",
    description: "Buffs nearby allied units",
    rarity: "Rare",
    category: "Support", 
    effect: {
      type: "ally_buff",
      value: "+15%",
      description: "Nearby allies gain +15% damage"
    },
    cost: {
      rerollStones: 4
    },
    tier: "A",
    compatibleUnits: ["Support units"],
    gameMode: "All",
    notes: "Great for team compositions"
  }
];

// 分类和筛选用的常量
export const TRAIT_RARITIES = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'] as const;
export const TRAIT_CATEGORIES = ['Attack', 'Defense', 'Utility', 'Special', 'Support'] as const;
export const TRAIT_TIERS = ['S', 'A', 'B', 'C', 'D'] as const;
export const GAME_MODES = ['Story', 'Infinite', 'Raids', 'All'] as const;

// 颜色映射
export const RARITY_COLORS = {
  'Common': '#9CA3AF',      // 灰色
  'Uncommon': '#10B981',    // 绿色
  'Rare': '#3B82F6',       // 蓝色
  'Epic': '#8B5CF6',       // 紫色
  'Legendary': '#F59E0B',   // 橙色
  'Mythic': '#EF4444'      // 红色
};

export const TIER_COLORS = {
  'S': '#EF4444',   // 红色
  'A': '#F59E0B',   // 橙色
  'B': '#10B981',   // 绿色
  'C': '#6B7280',   // 灰色
  'D': '#374151'    // 深灰色
};
