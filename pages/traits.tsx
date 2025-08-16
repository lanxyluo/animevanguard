import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Zap, Shield, Users, Sparkles } from 'lucide-react';

// 数据类型定义
interface Trait {
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
  compatibleUnits: string[];
  gameMode?: 'Story' | 'Infinite' | 'Raids' | 'All';
  notes?: string;
}

// 完整的Traits数据集
const traitsData: Trait[] = [
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

// 颜色配置
const RARITY_COLORS = {
  'Common': 'text-gray-400 border-gray-600',
  'Uncommon': 'text-green-400 border-green-600',
  'Rare': 'text-blue-400 border-blue-600',
  'Epic': 'text-purple-400 border-purple-600',
  'Legendary': 'text-yellow-400 border-yellow-600',
  'Mythic': 'text-red-400 border-red-600'
};

const TIER_COLORS = {
  'S': 'bg-red-500',
  'A': 'bg-orange-500',
  'B': 'bg-green-500',
  'C': 'bg-gray-500',
  'D': 'bg-gray-600'
};

const CATEGORY_ICONS = {
  'Attack': Zap,
  'Defense': Shield,
  'Utility': Star,
  'Special': Sparkles,
  'Support': Users
};

export default function TraitsGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');

  // 筛选逻辑
  const filteredTraits = useMemo(() => {
    return traitsData.filter(trait => {
      const matchesSearch = trait.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trait.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || trait.category === selectedCategory;
      const matchesRarity = selectedRarity === 'All' || trait.rarity === selectedRarity;
      const matchesTier = selectedTier === 'All' || trait.tier === selectedTier;
      
      return matchesSearch && matchesCategory && matchesRarity && matchesTier;
    });
  }, [searchTerm, selectedCategory, selectedRarity, selectedTier]);

  // 获取分类图标
  const getCategoryIcon = (category: string) => {
    const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];
    return Icon ? <Icon className="w-5 h-5" /> : <Star className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Anime Vanguards Traits Guide
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master the traits system with our comprehensive guide. Discover all traits, their effects, 
            and optimal strategies for your units.
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-400">{traitsData.length}</div>
              <div className="text-sm text-gray-400">Total Traits</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">5</div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">6</div>
              <div className="text-sm text-gray-400">Rarities</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-400">5</div>
              <div className="text-sm text-gray-400">Tier Ranks</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search traits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="All">All Categories</option>
              <option value="Attack">Attack</option>
              <option value="Defense">Defense</option>
              <option value="Utility">Utility</option>
              <option value="Special">Special</option>
              <option value="Support">Support</option>
            </select>

            {/* Rarity Filter */}
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="All">All Rarities</option>
              <option value="Common">Common</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Rare">Rare</option>
              <option value="Epic">Epic</option>
              <option value="Legendary">Legendary</option>
              <option value="Mythic">Mythic</option>
            </select>

            {/* Tier Filter */}
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="All">All Tiers</option>
              <option value="S">S Tier</option>
              <option value="A">A Tier</option>
              <option value="B">B Tier</option>
              <option value="C">C Tier</option>
              <option value="D">D Tier</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-400">
            Showing <span className="text-purple-400 font-semibold">{filteredTraits.length}</span> of {traitsData.length} traits
          </p>
        </div>

        {/* Traits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTraits.map(trait => (
            <div
              key={trait.id}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border-2 ${RARITY_COLORS[trait.rarity].split(' ')[1]} p-6 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(trait.category)}
                  <h3 className={`text-xl font-bold ${RARITY_COLORS[trait.rarity].split(' ')[0]}`}>
                    {trait.name}
                  </h3>
                </div>
                <div className={`${TIER_COLORS[trait.tier]} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {trait.tier}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4">{trait.description}</p>

              {/* Effect */}
              <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
                <div className="text-green-400 font-semibold text-lg">{trait.effect.value}</div>
                <div className="text-gray-400 text-sm">{trait.effect.description}</div>
              </div>

              {/* Meta Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{trait.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rarity:</span>
                  <span className={RARITY_COLORS[trait.rarity].split(' ')[0]}>
                    {trait.rarity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-yellow-400">
                    {trait.cost.rerollStones} stones
                    {trait.cost.gems && ` + ${trait.cost.gems} gems`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Compatible:</span>
                  <span className="text-white text-right">
                    {trait.compatibleUnits[0] === "All" ? "All Units" : trait.compatibleUnits.join(", ")}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {trait.notes && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-gray-400 text-sm italic">{trait.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTraits.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No traits found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
