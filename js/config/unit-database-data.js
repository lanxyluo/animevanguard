/**
 * Unit Database Data - Anime Vanguards
 * Complete unit information for the Unit Database module
 * 
 * Data Structure:
 * - id: kebab-case identifier
 * - name: exact unit name
 * - rarity: Vanguard|Secret|Mythic|Epic
 * - tier: BROKEN|META|SUB-META|DECENT
 * - element: Dark|Holy|Fire|Nature|Water|Wind|Unknown
 * - type: DPS|Support|Farm|Buffer
 * - deploymentCost: number only (no ¥ symbol)
 * - maxUpgradeCost: number only
 * - costEfficiency: High|Medium|Low
 * - baseDPS: Very High|High|Medium|Low
 * - maxDPS: text description with numbers
 * - range: Long|Medium|Short
 * - description: 1-2 sentence description
 * - pros: array of advantages
 * - cons: array of limitations
 * - obtainMethod: how to get this unit
 * - availability: Permanent|Limited|Event
 * - evolutionPath: evolution chain if applicable
 * - isEvolution: true|false
 * - baseForm: base unit name if evolved
 * - tags: array of keywords
 */

// Unit Database Data Array
const unitDatabaseData = [
  // ====== BROKEN TIER UNITS (Ultra High Priority) ======
  {
    id: "song-jinwu-and-igros",
    name: "Song Jinwu and Igros",
    rarity: "Vanguard",
    tier: "BROKEN",
    element: "Unknown",
    type: "DPS",
    deploymentCost: 1700,
    maxUpgradeCost: 105700,
    costEfficiency: "High",
    baseDPS: "Very High",
    maxDPS: "190k+ with summon abilities",
    range: "Medium",
    description: "Ultimate DPS with summon abilities, excels in all game modes. The perfect combination of Song Jinwu and his shadow Igros.",
    pros: [
      "Highest DPS output in game",
      "Multiple summons for crowd control",
      "Full AoE attacks",
      "Excels in all game modes"
    ],
    cons: [
      "Very expensive to deploy",
      "Only 1 placement allowed",
      "Extremely rare to obtain"
    ],
    obtainMethod: "Complete Red Key Quest",
    availability: "Permanent",
    evolutionPath: "Song Jinwu → Song Jinwu (Monarch) → Song Jinwu and Igros",
    isEvolution: true,
    baseForm: "Song Jinwu",
    tags: ["summon", "aoe", "ultimate", "solo-leveling"]
  },
  {
    id: "iscanur-pride",
    name: "Iscanur (Pride)",
    rarity: "Vanguard",
    tier: "BROKEN",
    element: "Dark",
    type: "DPS",
    deploymentCost: 7500,
    maxUpgradeCost: 170520,
    costEfficiency: "Medium",
    baseDPS: "Very High",
    maxDPS: "190k+ with pride form",
    range: "Long",
    description: "Extreme DPS but expensive, late-game core damage dealer. The embodiment of Pride with devastating power.",
    pros: [
      "190k+ DPS potential",
      "Wide range attacks",
      "Boss destroyer capabilities",
      "Late-game core damage dealer"
    ],
    cons: [
      "Extremely expensive to deploy",
      "Only 1 placement allowed",
      "Very rare to obtain",
      "Requires evolution"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Iscanur → Iscanur (Pride)",
    isEvolution: true,
    baseForm: "Iscanur",
    tags: ["pride", "boss-killer", "late-game", "seven-deadly-sins"]
  },
  {
    id: "koguro-unsealed",
    name: "Koguro (Unsealed)",
    rarity: "Vanguard",
    tier: "BROKEN",
    element: "Nature",
    type: "DPS",
    deploymentCost: 3500,
    maxUpgradeCost: 151000,
    costEfficiency: "High",
    baseDPS: "Very High",
    maxDPS: "170k+ with beast explosion",
    range: "Medium",
    description: "Beast Explosion ability with excellent cost efficiency. Unsealed dark warrior with immense power.",
    pros: [
      "Beast Explosion nuke ability",
      "High cost efficiency",
      "Worldlines benefits",
      "Excellent damage output"
    ],
    cons: [
      "Very expensive to deploy",
      "Only 1 placement allowed",
      "Requires evolution",
      "Limited availability"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Koguro → Koguro (Unsealed)",
    isEvolution: true,
    baseForm: "Koguro",
    tags: ["beast-explosion", "nuke", "cost-efficient", "tokyo-ghoul"]
  },
  {
    id: "yehowach-almighty",
    name: "Yehowach (Almighty)",
    rarity: "Secret",
    tier: "BROKEN",
    element: "Holy",
    type: "DPS",
    deploymentCost: 1400,
    maxUpgradeCost: 67550,
    costEfficiency: "High",
    baseDPS: "Very High",
    maxDPS: "150k with ultra long range",
    range: "Long",
    description: "Incredible range and DPS with status immunity. Quincy king with almighty powers and future sight.",
    pros: [
      "Ultra long range (160)",
      "Status immunity to all debuffs",
      "High early defense",
      "Future sight abilities"
    ],
    cons: [
      "Very expensive to upgrade",
      "Limited placement (2 max)",
      "Complex mechanics",
      "Requires positioning"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Yehowach → Yehowach (Almighty)",
    isEvolution: true,
    baseForm: "Yehowach",
    tags: ["range", "status-immunity", "future-sight", "bleach"]
  },
  {
    id: "monkey-king-awakened",
    name: "Monkey King (Awakened)",
    rarity: "Secret",
    tier: "BROKEN",
    element: "Nature",
    type: "DPS",
    deploymentCost: 2000,
    maxUpgradeCost: 181000,
    costEfficiency: "Medium",
    baseDPS: "Very High",
    maxDPS: "180k+ with awakened form",
    range: "Medium",
    description: "Awakened Monkey King with ultimate physical prowess. The strongest form with devastating combat abilities.",
    pros: [
      "Ultimate physical damage",
      "Transformation abilities",
      "High mobility in combat",
      "Boss killer capabilities"
    ],
    cons: [
      "Very expensive to upgrade",
      "Limited placement (2 max)",
      "Requires evolution",
      "Complex transformation mechanics"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Monkey King → Monkey King (Awakened)",
    isEvolution: true,
    baseForm: "Monkey King",
    tags: ["awakened", "physical", "boss-killer", "dragon-ball"]
  },

  // ====== META TIER UNITS (High Priority) ======
  {
    id: "alucard-vampire-king",
    name: "Alucard (Vampire King)",
    rarity: "Secret",
    tier: "META",
    element: "Dark",
    type: "DPS",
    deploymentCost: 2000,
    maxUpgradeCost: 85000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "120k+ with vampire abilities",
    range: "Medium",
    description: "Powerful vampire king with life steal and transformation abilities. Excellent DPS with self-sustain.",
    pros: [
      "Life steal abilities",
      "Transformation mechanics",
      "High damage output",
      "Self-sustain capabilities"
    ],
    cons: [
      "Expensive to upgrade",
      "Limited placement (2 max)",
      "Requires positioning"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Alucard → Alucard (Vampire King)",
    isEvolution: true,
    baseForm: "Alucard",
    tags: ["vampire", "life-steal", "transformation", "hellsing"]
  },
  {
    id: "the-struggler-rampage",
    name: "The Struggler (Rampage)",
    rarity: "Vanguard",
    tier: "META",
    element: "Dark",
    type: "DPS",
    deploymentCost: 7000,
    maxUpgradeCost: 180000,
    costEfficiency: "Medium",
    baseDPS: "Very High",
    maxDPS: "160k+ in rampage mode",
    range: "Short",
    description: "Berserker warrior with rampage mode. Extreme damage but requires careful positioning.",
    pros: [
      "Rampage mode activation",
      "Extreme damage potential",
      "Berserker mechanics",
      "High single-target DPS"
    ],
    cons: [
      "Very expensive to deploy",
      "Short range limitations",
      "Only 1 placement allowed",
      "Requires evolution"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "The Struggler → The Struggler (Rampage)",
    isEvolution: true,
    baseForm: "The Struggler",
    tags: ["berserker", "rampage", "single-target", "berserk"]
  },
  {
    id: "the-falcon-of-light",
    name: "The Falcon (of Light)",
    rarity: "Vanguard",
    tier: "META",
    element: "Holy",
    type: "DPS",
    deploymentCost: 5000,
    maxUpgradeCost: 150000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "140k+ with light attacks",
    range: "Long",
    description: "Holy warrior with long-range light attacks. Excellent against dark enemies.",
    pros: [
      "Long range attacks",
      "Holy element advantage",
      "High damage output",
      "Good cost efficiency"
    ],
    cons: [
      "Expensive to deploy",
      "Only 1 placement allowed",
      "Requires evolution",
      "Limited availability"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "The Falcon → The Falcon (of Light)",
    isEvolution: true,
    baseForm: "The Falcon",
    tags: ["holy", "long-range", "light", "falcon"]
  },
  {
    id: "sukono",
    name: "Sukono",
    rarity: "Secret",
    tier: "META",
    element: "Dark",
    type: "DPS",
    deploymentCost: 1800,
    maxUpgradeCost: 75000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "110k+ with dark magic",
    range: "Medium",
    description: "Dark mage with powerful magic attacks. Excellent crowd control and damage.",
    pros: [
      "Powerful dark magic",
      "Crowd control abilities",
      "High damage output",
      "Good cost efficiency"
    ],
    cons: [
      "Expensive to upgrade",
      "Limited placement (2 max)",
      "Requires positioning",
      "Complex mechanics"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Sukono → Sukono (Enhanced)",
    isEvolution: false,
    baseForm: "Sukono",
    tags: ["dark-magic", "crowd-control", "mage", "sukuna"]
  },
  {
    id: "cha-in-blade-dancer",
    name: "Cha-In (Blade Dancer)",
    rarity: "Secret",
    tier: "META",
    element: "Wind",
    type: "DPS",
    deploymentCost: 1600,
    maxUpgradeCost: 70000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "105k+ with blade dance",
    range: "Medium",
    description: "Wind-based blade dancer with high mobility and damage. Excellent for hit-and-run tactics.",
    pros: [
      "High mobility",
      "Blade dance combos",
      "Wind element advantage",
      "Hit-and-run tactics"
    ],
    cons: [
      "Expensive to upgrade",
      "Limited placement (2 max)",
      "Requires skill timing",
      "Positioning dependent"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Cha-In → Cha-In (Blade Dancer)",
    isEvolution: true,
    baseForm: "Cha-In",
    tags: ["wind", "blade-dance", "mobility", "dancer"]
  },
  {
    id: "igros-elite-knight",
    name: "Igros (Elite Knight)",
    rarity: "Secret",
    tier: "META",
    element: "Dark",
    type: "DPS",
    deploymentCost: 1900,
    maxUpgradeCost: 80000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "115k+ with elite skills",
    range: "Medium",
    description: "Elite dark knight with superior combat skills. Balanced offense and defense.",
    pros: [
      "Superior combat skills",
      "Balanced stats",
      "High damage output",
      "Good survivability"
    ],
    cons: [
      "Expensive to upgrade",
      "Limited placement (2 max)",
      "Requires evolution",
      "Complex skill tree"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Igros → Igros (Elite Knight)",
    isEvolution: true,
    baseForm: "Igros",
    tags: ["elite", "knight", "balanced", "dark-knight"]
  },
  {
    id: "divalo-requiem",
    name: "Divalo (Requiem)",
    rarity: "Vanguard",
    tier: "META",
    element: "Dark",
    type: "DPS",
    deploymentCost: 6500,
    maxUpgradeCost: 170000,
    costEfficiency: "Medium",
    baseDPS: "Very High",
    maxDPS: "155k+ with requiem form",
    range: "Medium",
    description: "Dark requiem form with devastating attacks. Ultimate dark warrior with immense power.",
    pros: [
      "Requiem form transformation",
      "Devastating attacks",
      "High damage potential",
      "Dark element mastery"
    ],
    cons: [
      "Very expensive to deploy",
      "Only 1 placement allowed",
      "Requires evolution",
      "Complex transformation"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Divalo → Divalo (Requiem)",
    isEvolution: true,
    baseForm: "Divalo",
    tags: ["requiem", "transformation", "dark-mastery", "jojo"]
  },
  {
    id: "rogita-super-4",
    name: "Rogita (Super 4)",
    rarity: "Vanguard",
    tier: "META",
    element: "Fire",
    type: "DPS",
    deploymentCost: 4500,
    maxUpgradeCost: 140000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "130k+ with super form",
    range: "Medium",
    description: "Fire-based super warrior with explosive attacks. Excellent AoE damage potential.",
    pros: [
      "Explosive fire attacks",
      "AoE damage capabilities",
      "Super form transformation",
      "High damage output"
    ],
    cons: [
      "Expensive to deploy",
      "Only 1 placement allowed",
      "Requires evolution",
      "Fire element limitations"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Rogita → Rogita (Super 4)",
    isEvolution: true,
    baseForm: "Rogita",
    tags: ["fire", "super-form", "explosive", "aoe"]
  },
  {
    id: "gujo-infinity",
    name: "Gujo (Infinity)",
    rarity: "Secret",
    tier: "META",
    element: "Unknown",
    type: "DPS",
    deploymentCost: 2800,
    maxUpgradeCost: 110000,
    costEfficiency: "Medium",
    baseDPS: "Very High",
    maxDPS: "135k+ with infinity powers",
    range: "Long",
    description: "Mysterious entity with infinity powers. Extremely powerful but unpredictable abilities.",
    pros: [
      "Infinity power mechanics",
      "Long range attacks",
      "High damage potential",
      "Unique abilities"
    ],
    cons: [
      "Very expensive to upgrade",
      "Limited placement (2 max)",
      "Unpredictable mechanics",
      "Complex to master"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Gujo → Gujo (Infinity)",
    isEvolution: true,
    baseForm: "Gujo",
    tags: ["infinity", "mysterious", "unique", "powerful"]
  },
  {
    id: "tuji-sorcerer-killer",
    name: "Tuji (Sorcerer Killer)",
    rarity: "Secret",
    tier: "META",
    element: "Unknown",
    type: "Support",
    deploymentCost: 2600,
    maxUpgradeCost: 100000,
    costEfficiency: "Medium",
    baseDPS: "Medium",
    maxDPS: "80k+ with debuff attacks",
    range: "Medium",
    description: "Specialized sorcerer hunter with powerful debuff abilities. Excellent support for team fights.",
    pros: [
      "Powerful debuff abilities",
      "Sorcerer-specific advantages",
      "Team support capabilities",
      "Unique utility skills"
    ],
    cons: [
      "Expensive to upgrade",
      "Limited placement (2 max)",
      "Specialized role",
      "Requires team coordination"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Tuji → Tuji (Sorcerer Killer)",
    isEvolution: true,
    baseForm: "Tuji",
    tags: ["sorcerer-killer", "debuff", "support", "specialized"]
  },
  {
    id: "byeken-ronin",
    name: "Byeken (Ronin)",
    rarity: "Secret",
    tier: "META",
    element: "Wind",
    type: "Buffer",
    deploymentCost: 1200,
    maxUpgradeCost: 60000,
    costEfficiency: "High",
    baseDPS: "Medium",
    maxDPS: "70k+ with team buffs",
    range: "Medium",
    description: "Wind ronin with powerful team buffing abilities. Essential for team composition optimization.",
    pros: [
      "Powerful team buffs",
      "Wind element mastery",
      "High cost efficiency",
      "Essential team support"
    ],
    cons: [
      "Limited personal damage",
      "Requires team coordination",
      "Positioning dependent",
      "Limited placement (2 max)"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Byeken → Byeken (Ronin)",
    isEvolution: true,
    baseForm: "Byeken",
    tags: ["ronin", "team-buff", "wind", "support"]
  },
  {
    id: "haruka-rin-dancer",
    name: "Haruka Rin (Dancer)",
    rarity: "Secret",
    tier: "META",
    element: "Nature",
    type: "Support",
    deploymentCost: 1000,
    maxUpgradeCost: 50000,
    costEfficiency: "High",
    baseDPS: "Low",
    maxDPS: "60k+ with dance buffs",
    range: "Medium",
    description: "Nature dancer with healing and buffing abilities. Essential support for team survival.",
    pros: [
      "Healing abilities",
      "Team buffing skills",
      "High cost efficiency",
      "Essential support role"
    ],
    cons: [
      "Low personal damage",
      "Requires protection",
      "Limited placement (2 max)",
      "Positioning critical"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Haruka Rin → Haruka Rin (Dancer)",
    isEvolution: true,
    baseForm: "Haruka Rin",
    tags: ["dancer", "healing", "nature", "support"]
  }
];

// ====== DATA LOADING FUNCTIONS ======

/**
 * Load all units from the database
 * @returns {Array} Complete array of all units
 */
function loadAllUnits() {
  return unitDatabaseData;
}

/**
 * Get units filtered by tier
 * @param {string} tier - The tier to filter by (BROKEN, META, SUB-META, DECENT)
 * @returns {Array} Array of units matching the tier
 */
function getUnitsByTier(tier) {
  if (!tier) return unitDatabaseData;
  return unitDatabaseData.filter(unit => unit.tier === tier);
}

/**
 * Search units by name (case-insensitive)
 * @param {string} query - Search query
 * @returns {Array} Array of units matching the search query
 */
function searchUnits(query) {
  if (!query || query.trim() === '') return unitDatabaseData;
  
  const searchTerm = query.toLowerCase().trim();
  return unitDatabaseData.filter(unit => 
    unit.name.toLowerCase().includes(searchTerm) ||
    unit.description.toLowerCase().includes(searchTerm) ||
    unit.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

/**
 * Get units filtered by rarity
 * @param {string} rarity - The rarity to filter by
 * @returns {Array} Array of units matching the rarity
 */
function getUnitsByRarity(rarity) {
  if (!rarity) return unitDatabaseData;
  return unitDatabaseData.filter(unit => unit.rarity === rarity);
}

/**
 * Get units filtered by element
 * @param {string} element - The element to filter by
 * @returns {Array} Array of units matching the element
 */
function getUnitsByElement(element) {
  if (!element) return unitDatabaseData;
  return unitDatabaseData.filter(unit => unit.element === element);
}

/**
 * Get units filtered by type
 * @param {string} type - The type to filter by (DPS, Support, Farm, Buffer)
 * @returns {Array} Array of units matching the type
 */
function getUnitsByType(type) {
  if (!type) return unitDatabaseData;
  return unitDatabaseData.filter(unit => unit.type === type);
}

/**
 * Get a specific unit by ID
 * @param {string} id - The unit ID
 * @returns {Object|null} The unit object or null if not found
 */
function getUnitById(id) {
  return unitDatabaseData.find(unit => unit.id === id) || null;
}

/**
 * Get total count of units
 * @returns {number} Total number of units
 */
function getTotalUnitCount() {
  return unitDatabaseData.length;
}

/**
 * Get units by cost range
 * @param {number} minCost - Minimum deployment cost
 * @param {number} maxCost - Maximum deployment cost
 * @returns {Array} Array of units within the cost range
 */
function getUnitsByCostRange(minCost, maxCost) {
  return unitDatabaseData.filter(unit => 
    unit.deploymentCost >= minCost && unit.deploymentCost <= maxCost
  );
}

// Export functions for use in other modules
window.UnitDatabaseData = {
  loadAllUnits,
  getUnitsByTier,
  searchUnits,
  getUnitsByRarity,
  getUnitsByElement,
  getUnitsByType,
  getUnitById,
  getTotalUnitCount,
  getUnitsByCostRange
};
