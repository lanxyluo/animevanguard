// Anime Vanguards Traits Data Structure Definition

// Complete Traits Dataset
export const traitsData = [
  // ====== COMMON TRAITS ======
  {
    id: "sharp",
    name: "Sharp",
    description: "Increases critical hit chance for more consistent damage",
    rarity: "Common",
    category: "Attack",
    effect: {
      type: "critical_chance",
      value: "+12%",
      description: "Increases critical hit chance by 12%"
    },
    cost: { rerollStones: 1 },
    tier: "B",
    compatibleUnits: ["All"],
    gameMode: "All",
    notes: "Reliable early-game trait for consistent damage output"
  },
  {
    id: "sturdy",
    name: "Sturdy", 
    description: "Boosts unit health for better survivability",
    rarity: "Common",
    category: "Defense",
    effect: {
      type: "health_boost",
      value: "+25%",
      description: "Increases maximum health by 25%"
    },
    cost: { rerollStones: 1 },
    tier: "B",
    compatibleUnits: ["All"],
    gameMode: "All",
    notes: "Essential for frontline units in harder content"
  },
  {
    id: "swift",
    name: "Swift",
    description: "Increases attack speed for higher DPS",
    rarity: "Common", 
    category: "Utility",
    effect: {
      type: "attack_speed",
      value: "+20%",
      description: "Increases attack speed by 20%"
    },
    cost: { rerollStones: 1 },
    tier: "A",
    compatibleUnits: ["All"],
    gameMode: "All",
    notes: "Great for units with on-hit effects"
  },

  // ====== UNCOMMON TRAITS ======
  {
    id: "energy_efficient",
    name: "Energy Efficient",
    description: "Reduces ability cooldowns for more frequent special attacks",
    rarity: "Uncommon",
    category: "Utility",
    effect: {
      type: "cooldown_reduction",
      value: "-15%",
      description: "Reduces all ability cooldowns by 15%"
    },
    cost: { rerollStones: 2 },
    tier: "A",
    compatibleUnits: ["All"],
    gameMode: "All",
    notes: "Excellent for units with powerful abilities"
  },
  {
    id: "regenerative",
    name: "Regenerative",
    description: "Slowly heals unit over time for sustained combat",
    rarity: "Uncommon",
    category: "Defense",
    effect: {
      type: "health_regen",
      value: "3%/sec",
      description: "Heals 3% of max HP per second"
    },
    cost: { rerollStones: 2 },
    tier: "B",
    compatibleUnits: ["All"],
    gameMode: "Infinite",
    notes: "Most valuable in longer game modes"
  },
  {
    id: "range_boost",
    name: "Range Boost",
    description: "Extends attack range for better positioning",
    rarity: "Uncommon",
    category: "Utility",
    effect: {
      type: "range_increase",
      value: "+18%",
      description: "Increases attack range by 18%"
    },
    cost: { rerollStones: 2 },
    tier: "A",
    compatibleUnits: ["Ranged units"],
    gameMode: "All",
    notes: "Game-changing for ranged DPS units"
  },

  // ====== RARE TRAITS ======
  {
    id: "blazing",
    name: "Blazing",
    description: "Adds fire damage and burn effect to attacks",
    rarity: "Rare",
    category: "Attack", 
    effect: {
      type: "elemental_damage",
      value: "+30%",
      description: "Adds 30% fire damage + 3sec burn"
    },
    cost: { rerollStones: 3 },
    tier: "S",
    compatibleUnits: ["Fire-type units", "Elemental units"],
    gameMode: "All",
    notes: "Synergizes with fire-based team compositions"
  },
  {
    id: "multi_target",
    name: "Multi-Target",
    description: "Attacks can hit multiple enemies simultaneously",
    rarity: "Rare",
    category: "Utility",
    effect: {
      type: "target_count",
      value: "+2",
      description: "Can target 2 additional enemies"
    },
    cost: { rerollStones: 3 },
    tier: "S",
    compatibleUnits: ["Single-target units"],
    gameMode: "All",
    notes: "Transforms single-target units into AoE powerhouses"
  },
  {
    id: "armor_plated",
    name: "Armor Plated",
    description: "Significantly reduces incoming damage",
    rarity: "Rare",
    category: "Defense",
    effect: {
      type: "damage_reduction",
      value: "-35%",
      description: "Reduces all incoming damage by 35%"
    },
    cost: { rerollStones: 3 },
    tier: "A",
    compatibleUnits: ["Tank units", "Frontline units"],
    gameMode: "All",
    notes: "Essential for tanking high-damage bosses"
  },

  // ====== EPIC TRAITS ======
  {
    id: "explosive",
    name: "Explosive",
    description: "Attacks have chance to deal massive AoE damage",
    rarity: "Epic",
    category: "Attack",
    effect: {
      type: "aoe_chance",
      value: "25%",
      description: "25% chance to deal 200% AoE damage"
    },
    cost: { rerollStones: 5 },
    tier: "S",
    compatibleUnits: ["DPS units", "Ranged units"],
    gameMode: "All",
    notes: "Game-breaking for crowd control scenarios"
  },
  {
    id: "support_aura",
    name: "Support Aura",
    description: "Buffs all nearby allied units continuously",
    rarity: "Epic",
    category: "Support",
    effect: {
      type: "ally_buff",
      value: "+20%",
      description: "Nearby allies gain +20% damage and +15% speed"
    },
    cost: { rerollStones: 5 },
    tier: "S",
    compatibleUnits: ["Support units"],
    gameMode: "All",
    notes: "Cornerstone of meta team compositions"
  },
  {
    id: "ultimate_power",
    name: "Ultimate Power",
    description: "Dramatically increases damage but reduces attack speed",
    rarity: "Epic",
    category: "Special",
    effect: {
      type: "damage_tradeoff",
      value: "+60% dmg, -25% speed",
      description: "Massive damage boost with speed penalty"
    },
    cost: { rerollStones: 6 },
    tier: "A",
    compatibleUnits: ["Heavy hitters", "Boss killers"],
    gameMode: "Raids",
    notes: "High-risk, high-reward trait for boss fights"
  },

  // ====== LEGENDARY TRAITS ======
  {
    id: "legendary_aura",
    name: "Legendary Aura",
    description: "Provides multiple powerful effects to the unit",
    rarity: "Legendary",
    category: "Special",
    effect: {
      type: "multi_effect",
      value: "+35% all stats",
      description: "+35% damage, +25% health, +20% speed, +15% range"
    },
    cost: { rerollStones: 8, gems: 50 },
    tier: "S",
    compatibleUnits: ["Legendary units only"],
    gameMode: "All",
    notes: "The gold standard for end-game builds"
  },
  {
    id: "time_manipulation",
    name: "Time Manipulation",
    description: "Can slow down time for strategic advantages",
    rarity: "Legendary",
    category: "Special",
    effect: {
      type: "time_control",
      value: "3sec duration",
      description: "Slows all enemies by 80% for 3 seconds (60s cooldown)"
    },
    cost: { rerollStones: 10, gems: 75 },
    tier: "S",
    compatibleUnits: ["Time-based units"],
    gameMode: "All",
    notes: "Game-changing utility for clutch moments"
  },

  // ====== MYTHIC TRAITS ======
  {
    id: "divine",
    name: "Divine",
    description: "Transcends normal limits with godlike power",
    rarity: "Mythic",
    category: "Special",
    effect: {
      type: "transcendent",
      value: "+100% effectiveness",
      description: "Doubles all positive effects and abilities"
    },
    cost: { rerollStones: 15, gems: 150 },
    tier: "S",
    compatibleUnits: ["Mythic units only"],
    gameMode: "All",
    notes: "The ultimate trait - transforms any unit into a powerhouse"
  },
  {
    id: "reality_warper",
    name: "Reality Warper",
    description: "Bends the rules of reality itself",
    rarity: "Mythic",
    category: "Special", 
    effect: {
      type: "reality_manipulation",
      value: "Rule breaking",
      description: "Ignores enemy immunities and resistances, can hit any target"
    },
    cost: { rerollStones: 20, gems: 200 },
    tier: "S",
    compatibleUnits: ["Reality-type units"],
    gameMode: "All",
    notes: "Extremely rare - breaks normal game mechanics"
  }
];

// Constants for categorization and filtering
export const TRAIT_RARITIES = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
export const TRAIT_CATEGORIES = ['Attack', 'Defense', 'Utility', 'Special', 'Support'];
export const TRAIT_TIERS = ['S', 'A', 'B', 'C', 'D'];
export const GAME_MODES = ['Story', 'Infinite', 'Raids', 'All'];

// Color mapping
export const RARITY_COLORS = {
      'Common': '#9CA3AF',      // Gray
    'Uncommon': '#10B981',    // Green
    'Rare': '#3B82F6',       // Blue
    'Epic': '#8B5CF6',       // Purple
    'Legendary': '#F59E0B',   // Orange
    'Mythic': '#EF4444'      // Red
};

export const TIER_COLORS = {
      'S': '#EF4444',   // Red
    'A': '#F59E0B',   // Orange
    'B': '#10B981',   // Green
    'C': '#6B7280',   // Gray
    'D': '#374151'    // Dark Gray
};
