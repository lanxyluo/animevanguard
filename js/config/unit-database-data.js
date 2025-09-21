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
  },

  // ====== SUB-META TIER UNITS (Medium Priority) ======
  {
    id: "the-falcon-of-darkness",
    name: "The Falcon (of Darkness)",
    rarity: "Mythic",
    tier: "SUB-META",
    element: "Dark",
    type: "DPS",
    deploymentCost: 1200,
    maxUpgradeCost: 45000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "95k+ with dark attacks",
    range: "Long",
    description: "Dark variant of the Falcon with powerful shadow attacks. Good alternative to light version.",
    pros: [
      "Long range attacks",
      "Dark element advantage",
      "Good cost efficiency",
      "Solid damage output"
    ],
    cons: [
      "Limited placement (2 max)",
      "Requires evolution",
      "Not as strong as light version",
      "Positioning dependent"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "The Falcon → The Falcon (of Darkness)",
    isEvolution: true,
    baseForm: "The Falcon",
    tags: ["dark", "long-range", "falcon", "alternative"]
  },
  {
    id: "gg-possessed",
    name: "GG (Possessed)",
    rarity: "Secret",
    tier: "SUB-META",
    element: "Dark",
    type: "DPS",
    deploymentCost: 1500,
    maxUpgradeCost: 55000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "100k+ with possessed form",
    range: "Medium",
    description: "Possessed warrior with dark powers. Good DPS with unique mechanics.",
    pros: [
      "Possessed form transformation",
      "High damage output",
      "Good cost efficiency",
      "Unique mechanics"
    ],
    cons: [
      "Limited placement (2 max)",
      "Requires evolution",
      "Complex transformation",
      "Positioning dependent"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "GG → GG (Possessed)",
    isEvolution: true,
    baseForm: "GG",
    tags: ["possessed", "transformation", "dark", "unique"]
  },
  {
    id: "leo-fangs",
    name: "Leo (Fangs)",
    rarity: "Secret",
    tier: "SUB-META",
    element: "Nature",
    type: "DPS",
    deploymentCost: 1800,
    maxUpgradeCost: 60000,
    costEfficiency: "Medium",
    baseDPS: "High",
    maxDPS: "105k+ with fang attacks",
    range: "Short",
    description: "Beast warrior with fang-based attacks. High damage but short range.",
    pros: [
      "High damage output",
      "Fang-based attacks",
      "Good survivability",
      "Nature element mastery"
    ],
    cons: [
      "Short range limitations",
      "Limited placement (2 max)",
      "Requires evolution",
      "Positioning critical"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Leo → Leo (Fangs)",
    isEvolution: true,
    baseForm: "Leo",
    tags: ["fangs", "beast", "nature", "short-range"]
  },
  {
    id: "giant-queen-founder",
    name: "Giant Queen (Founder)",
    rarity: "Epic",
    tier: "SUB-META",
    element: "Nature",
    type: "Support",
    deploymentCost: 800,
    maxUpgradeCost: 25000,
    costEfficiency: "High",
    baseDPS: "Medium",
    maxDPS: "70k+ with support abilities",
    range: "Medium",
    description: "Giant queen with powerful support abilities. Excellent for team composition.",
    pros: [
      "Powerful support abilities",
      "High cost efficiency",
      "Team buffing skills",
      "Good survivability"
    ],
    cons: [
      "Limited personal damage",
      "Requires team coordination",
      "Positioning dependent",
      "Limited placement (2 max)"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Giant Queen → Giant Queen (Founder)",
    isEvolution: true,
    baseForm: "Giant Queen",
    tags: ["giant", "queen", "support", "team-buff"]
  },
  {
    id: "slime-king",
    name: "Slime (King)",
    rarity: "Secret",
    tier: "SUB-META",
    element: "Water",
    type: "DPS",
    deploymentCost: 1200,
    maxUpgradeCost: 40000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "90k+ with slime attacks",
    range: "Medium",
    description: "King of slimes with unique water-based attacks. Good DPS with special mechanics.",
    pros: [
      "Unique slime mechanics",
      "Water element mastery",
      "Good cost efficiency",
      "High damage output"
    ],
    cons: [
      "Limited placement (2 max)",
      "Requires evolution",
      "Complex mechanics",
      "Positioning dependent"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Slime → Slime (King)",
    isEvolution: true,
    baseForm: "Slime",
    tags: ["slime", "water", "king", "unique"]
  },
  {
    id: "conqueror-vs-invulnerable",
    name: "Conqueror vs Invulnerable",
    rarity: "Secret",
    tier: "SUB-META",
    element: "Dark",
    type: "DPS",
    deploymentCost: 1600,
    maxUpgradeCost: 50000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "98k+ with conqueror abilities",
    range: "Medium",
    description: "Dual-form warrior with conqueror and invulnerable modes. Versatile DPS unit.",
    pros: [
      "Dual-form mechanics",
      "High damage output",
      "Good cost efficiency",
      "Versatile abilities"
    ],
    cons: [
      "Limited placement (2 max)",
      "Requires evolution",
      "Complex form switching",
      "Positioning dependent"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Conqueror → Conqueror vs Invulnerable",
    isEvolution: true,
    baseForm: "Conqueror",
    tags: ["conqueror", "invulnerable", "dual-form", "versatile"]
  },
  {
    id: "gazelle-zombie",
    name: "Gazelle (Zombie)",
    rarity: "Mythic",
    tier: "SUB-META",
    element: "Dark",
    type: "Farm",
    deploymentCost: 1000,
    maxUpgradeCost: 35000,
    costEfficiency: "High",
    baseDPS: "Medium",
    maxDPS: "75k+ with zombie abilities",
    range: "Medium",
    description: "Zombie gazelle with farming capabilities. Good for resource generation.",
    pros: [
      "Farming capabilities",
      "High cost efficiency",
      "Resource generation",
      "Good survivability"
    ],
    cons: [
      "Limited personal damage",
      "Requires evolution",
      "Positioning dependent",
      "Limited placement (2 max)"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Gazelle → Gazelle (Zombie)",
    isEvolution: true,
    baseForm: "Gazelle",
    tags: ["zombie", "farm", "resource", "gazelle"]
  },
  {
    id: "astolfo-rider-of-black",
    name: "Astolfo (Rider of Black)",
    rarity: "Secret",
    tier: "SUB-META",
    element: "Wind",
    type: "DPS",
    deploymentCost: 1400,
    maxUpgradeCost: 48000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "92k+ with rider abilities",
    range: "Medium",
    description: "Wind rider with high mobility and damage. Excellent for hit-and-run tactics.",
    pros: [
      "High mobility",
      "Wind element mastery",
      "Good cost efficiency",
      "Hit-and-run tactics"
    ],
    cons: [
      "Limited placement (2 max)",
      "Requires evolution",
      "Positioning dependent",
      "Complex mechanics"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Astolfo → Astolfo (Rider of Black)",
    isEvolution: true,
    baseForm: "Astolfo",
    tags: ["rider", "wind", "mobility", "hit-and-run"]
  },
  {
    id: "roku-super-3",
    name: "Roku (Super 3)",
    rarity: "Secret",
    tier: "SUB-META",
    element: "Fire",
    type: "DPS",
    deploymentCost: 1300,
    maxUpgradeCost: 42000,
    costEfficiency: "High",
    baseDPS: "High",
    maxDPS: "88k+ with super form",
    range: "Medium",
    description: "Fire warrior with super form transformation. Good DPS with explosive attacks.",
    pros: [
      "Super form transformation",
      "Fire element mastery",
      "Good cost efficiency",
      "Explosive attacks"
    ],
    cons: [
      "Limited placement (2 max)",
      "Requires evolution",
      "Positioning dependent",
      "Fire element limitations"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Roku → Roku (Super 3)",
    isEvolution: true,
    baseForm: "Roku",
    tags: ["super-form", "fire", "explosive", "transformation"]
  },
  {
    id: "the-smith-forged",
    name: "The Smith (Forged)",
    rarity: "Mythic",
    tier: "SUB-META",
    element: "Fire",
    type: "Support",
    deploymentCost: 900,
    maxUpgradeCost: 30000,
    costEfficiency: "High",
    baseDPS: "Medium",
    maxDPS: "65k+ with forging abilities",
    range: "Medium",
    description: "Master smith with powerful support and crafting abilities. Essential for team enhancement.",
    pros: [
      "Crafting abilities",
      "Team enhancement skills",
      "High cost efficiency",
      "Essential support role"
    ],
    cons: [
      "Limited personal damage",
      "Requires team coordination",
      "Positioning dependent",
      "Limited placement (2 max)"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "The Smith → The Smith (Forged)",
    isEvolution: true,
    baseForm: "The Smith",
    tags: ["smith", "forged", "crafting", "support"]
  },

  // ====== DECENT TIER UNITS (Completeness) ======
  {
    id: "friran-teacher",
    name: "Friran (Teacher)",
    rarity: "Mythic",
    tier: "DECENT",
    element: "Nature",
    type: "Farm",
    deploymentCost: 600,
    maxUpgradeCost: 20000,
    costEfficiency: "High",
    baseDPS: "Low",
    maxDPS: "50k+ with teaching abilities",
    range: "Medium",
    description: "Teacher with farming and support abilities. Good for early game resource generation.",
    pros: [
      "Farming capabilities",
      "Teaching abilities",
      "High cost efficiency",
      "Early game viable"
    ],
    cons: [
      "Low personal damage",
      "Limited late game use",
      "Positioning dependent",
      "Limited placement (2 max)"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Friran → Friran (Teacher)",
    isEvolution: true,
    baseForm: "Friran",
    tags: ["teacher", "farm", "early-game", "resource"]
  },
  {
    id: "chaso-blood-curse",
    name: "Chaso (Blood Curse)",
    rarity: "Mythic",
    tier: "DECENT",
    element: "Dark",
    type: "Support",
    deploymentCost: 700,
    maxUpgradeCost: 22000,
    costEfficiency: "High",
    baseDPS: "Medium",
    maxDPS: "55k+ with blood curse",
    range: "Medium",
    description: "Dark support with blood curse abilities. Good for debuffing enemies.",
    pros: [
      "Blood curse abilities",
      "Debuffing skills",
      "High cost efficiency",
      "Good support role"
    ],
    cons: [
      "Limited personal damage",
      "Requires team coordination",
      "Positioning dependent",
      "Limited placement (2 max)"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Chaso → Chaso (Blood Curse)",
    isEvolution: true,
    baseForm: "Chaso",
    tags: ["blood-curse", "debuff", "support", "dark"]
  },
  {
    id: "jag-o-volcanic",
    name: "Jag-o (Volcanic)",
    rarity: "Mythic",
    tier: "DECENT",
    element: "Fire",
    type: "DPS",
    deploymentCost: 800,
    maxUpgradeCost: 25000,
    costEfficiency: "High",
    baseDPS: "Medium",
    maxDPS: "70k+ with volcanic attacks",
    range: "Medium",
    description: "Volcanic warrior with fire-based attacks. Solid DPS for early to mid game.",
    pros: [
      "Volcanic attacks",
      "Fire element mastery",
      "High cost efficiency",
      "Solid damage output"
    ],
    cons: [
      "Limited late game use",
      "Positioning dependent",
      "Limited placement (2 max)",
      "Requires evolution"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Jag-o → Jag-o (Volcanic)",
    isEvolution: true,
    baseForm: "Jag-o",
    tags: ["volcanic", "fire", "solid", "early-game"]
  },
  {
    id: "akazo-destructive",
    name: "Akazo (Destructive)",
    rarity: "Secret",
    tier: "DECENT",
    element: "Dark",
    type: "DPS",
    deploymentCost: 1000,
    maxUpgradeCost: 35000,
    costEfficiency: "Medium",
    baseDPS: "High",
    maxDPS: "80k+ with destructive abilities",
    range: "Short",
    description: "Destructive warrior with high damage but limited range. Good for close combat.",
    pros: [
      "High damage output",
      "Destructive abilities",
      "Good survivability",
      "Close combat specialist"
    ],
    cons: [
      "Short range limitations",
      "Limited placement (2 max)",
      "Requires evolution",
      "Positioning critical"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Akazo → Akazo (Destructive)",
    isEvolution: true,
    baseForm: "Akazo",
    tags: ["destructive", "close-combat", "high-damage", "short-range"]
  },
  {
    id: "song-jinwu-monarch",
    name: "Song Jinwu (Monarch)",
    rarity: "Secret",
    tier: "DECENT",
    element: "Unknown",
    type: "DPS",
    deploymentCost: 1200,
    maxUpgradeCost: 40000,
    costEfficiency: "Medium",
    baseDPS: "High",
    maxDPS: "85k+ with monarch abilities",
    range: "Medium",
    description: "Monarch form of Song Jinwu. Good DPS but overshadowed by evolved version.",
    pros: [
      "Monarch abilities",
      "High damage output",
      "Good survivability",
      "Solid performance"
    ],
    cons: [
      "Overshadowed by evolved form",
      "Limited placement (2 max)",
      "Requires evolution",
      "Not as strong as final form"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Song Jinwu → Song Jinwu (Monarch) → Song Jinwu and Igros",
    isEvolution: true,
    baseForm: "Song Jinwu",
    tags: ["monarch", "intermediate", "solid", "solo-leveling"]
  },
  {
    id: "mr-boo-evil",
    name: "Mr. Boo (Evil)",
    rarity: "Mythic",
    tier: "DECENT",
    element: "Dark",
    type: "DPS",
    deploymentCost: 650,
    maxUpgradeCost: 18000,
    costEfficiency: "High",
    baseDPS: "Medium",
    maxDPS: "60k+ with evil abilities",
    range: "Medium",
    description: "Evil form of Mr. Boo with dark powers. Decent DPS for early game.",
    pros: [
      "Evil abilities",
      "High cost efficiency",
      "Good early game performance",
      "Dark element mastery"
    ],
    cons: [
      "Limited late game use",
      "Positioning dependent",
      "Limited placement (2 max)",
      "Requires evolution"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Mr. Boo → Mr. Boo (Evil)",
    isEvolution: true,
    baseForm: "Mr. Boo",
    tags: ["evil", "early-game", "dark", "decent"]
  },
  {
    id: "alligator",
    name: "Alligator",
    rarity: "Epic",
    tier: "DECENT",
    element: "Water",
    type: "DPS",
    deploymentCost: 400,
    maxUpgradeCost: 12000,
    costEfficiency: "High",
    baseDPS: "Medium",
    maxDPS: "45k+ with aquatic attacks",
    range: "Short",
    description: "Aquatic warrior with water-based attacks. Good for early game progression.",
    pros: [
      "Aquatic attacks",
      "High cost efficiency",
      "Good early game performance",
      "Water element mastery"
    ],
    cons: [
      "Short range limitations",
      "Limited late game use",
      "Positioning critical",
      "Limited placement (2 max)"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Alligator → Alligator (Enhanced)",
    isEvolution: false,
    baseForm: "Alligator",
    tags: ["alligator", "aquatic", "early-game", "water"]
  },
  {
    id: "blossom",
    name: "Blossom",
    rarity: "Epic",
    tier: "DECENT",
    element: "Nature",
    type: "Buffer",
    deploymentCost: 350,
    maxUpgradeCost: 10000,
    costEfficiency: "High",
    baseDPS: "Low",
    maxDPS: "35k+ with blossom abilities",
    range: "Medium",
    description: "Nature buffer with blossoming abilities. Good for team enhancement in early game.",
    pros: [
      "Blossoming abilities",
      "High cost efficiency",
      "Team enhancement skills",
      "Good early game support"
    ],
    cons: [
      "Low personal damage",
      "Limited late game use",
      "Positioning dependent",
      "Limited placement (2 max)"
    ],
    obtainMethod: "Summon from Banner",
    availability: "Permanent",
    evolutionPath: "Blossom → Blossom (Enhanced)",
    isEvolution: false,
    baseForm: "Blossom",
    tags: ["blossom", "nature", "buffer", "early-game"]
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

/**
 * Filter units by multiple criteria
 * @param {Object} criteria - Filter criteria object
 * @param {string} criteria.tier - Filter by tier
 * @param {string} criteria.rarity - Filter by rarity
 * @param {string} criteria.element - Filter by element
 * @param {string} criteria.type - Filter by type
 * @param {number} criteria.minCost - Minimum deployment cost
 * @param {number} criteria.maxCost - Maximum deployment cost
 * @param {string} criteria.search - Search query
 * @returns {Array} Array of units matching all criteria
 */
function filterUnits(criteria) {
  let filteredUnits = [...unitDatabaseData];
  
  if (criteria.tier) {
    filteredUnits = filteredUnits.filter(unit => unit.tier === criteria.tier);
  }
  
  if (criteria.rarity) {
    filteredUnits = filteredUnits.filter(unit => unit.rarity === criteria.rarity);
  }
  
  if (criteria.element) {
    filteredUnits = filteredUnits.filter(unit => unit.element === criteria.element);
  }
  
  if (criteria.type) {
    filteredUnits = filteredUnits.filter(unit => unit.type === criteria.type);
  }
  
  if (criteria.minCost !== undefined) {
    filteredUnits = filteredUnits.filter(unit => unit.deploymentCost >= criteria.minCost);
  }
  
  if (criteria.maxCost !== undefined) {
    filteredUnits = filteredUnits.filter(unit => unit.deploymentCost <= criteria.maxCost);
  }
  
  if (criteria.search) {
    const searchTerm = criteria.search.toLowerCase().trim();
    filteredUnits = filteredUnits.filter(unit => 
      unit.name.toLowerCase().includes(searchTerm) ||
      unit.description.toLowerCase().includes(searchTerm) ||
      unit.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  return filteredUnits;
}

/**
 * Sort units by specified criteria
 * @param {Array} units - Array of units to sort
 * @param {string} sortBy - Sort criteria (name, cost, dps, rarity, tier)
 * @param {string} order - Sort order (asc, desc)
 * @returns {Array} Sorted array of units
 */
function sortUnits(units, sortBy = 'name', order = 'asc') {
  const sortedUnits = [...units];
  
  sortedUnits.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'cost':
        aValue = a.deploymentCost;
        bValue = b.deploymentCost;
        break;
      case 'dps':
        // Extract numeric value from maxDPS string
        aValue = parseInt(a.maxDPS.replace(/\D/g, '')) || 0;
        bValue = parseInt(b.maxDPS.replace(/\D/g, '')) || 0;
        break;
      case 'rarity':
        const rarityOrder = { 'Vanguard': 4, 'Secret': 3, 'Mythic': 2, 'Epic': 1, 'Rare': 0 };
        aValue = rarityOrder[a.rarity] || 0;
        bValue = rarityOrder[b.rarity] || 0;
        break;
      case 'tier':
        const tierOrder = { 'BROKEN': 4, 'META': 3, 'SUB-META': 2, 'DECENT': 1, 'LOW': 0 };
        aValue = tierOrder[a.tier] || 0;
        bValue = tierOrder[b.tier] || 0;
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sortedUnits;
}



/**
 * Validate unit database data integrity
 * @returns {Object} Validation results
 */
function validateDatabase() {
  const validation = {
    isValid: true,
    errors: [],
    warnings: [],
    stats: {
      totalUnits: unitDatabaseData.length,
      tierCounts: {},
      rarityCounts: {},
      typeCounts: {},
      elementCounts: {}
    }
  };
  
  // Check for duplicate IDs
  const ids = unitDatabaseData.map(unit => unit.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    validation.isValid = false;
    validation.errors.push(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
  }
  
  // Check required fields
  const requiredFields = ['id', 'name', 'rarity', 'tier', 'element', 'type', 'deploymentCost', 'maxUpgradeCost'];
  unitDatabaseData.forEach((unit, index) => {
    requiredFields.forEach(field => {
      if (!unit[field] && unit[field] !== 0) {
        validation.isValid = false;
        validation.errors.push(`Unit ${index + 1} (${unit.name || 'Unknown'}) missing required field: ${field}`);
      }
    });
  });
  
  // Check data type consistency
  unitDatabaseData.forEach((unit, index) => {
    if (typeof unit.deploymentCost !== 'number') {
      validation.errors.push(`Unit ${index + 1} (${unit.name}) deploymentCost should be number`);
    }
    if (typeof unit.maxUpgradeCost !== 'number') {
      validation.errors.push(`Unit ${index + 1} (${unit.name}) maxUpgradeCost should be number`);
    }
  });
  
  // Count statistics
  unitDatabaseData.forEach(unit => {
    validation.stats.tierCounts[unit.tier] = (validation.stats.tierCounts[unit.tier] || 0) + 1;
    validation.stats.rarityCounts[unit.rarity] = (validation.stats.rarityCounts[unit.rarity] || 0) + 1;
    validation.stats.typeCounts[unit.type] = (validation.stats.typeCounts[unit.type] || 0) + 1;
    validation.stats.elementCounts[unit.element] = (validation.stats.elementCounts[unit.element] || 0) + 1;
  });
  
  return validation;
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
  getUnitsByCostRange,
  filterUnits,
  sortUnits,
  validateDatabase
};
