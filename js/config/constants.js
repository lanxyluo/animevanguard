// Enhanced element icons mapping for all game elements
export const elementIcons = {
    'Unknown': 'fas fa-question-circle',
    'Cosmic': 'fas fa-infinity',
    'Holy': 'fas fa-cross',
    'Fire': 'fas fa-fire',
    'Water': 'fas fa-tint',
    'Nature': 'fas fa-leaf',
    'Life': 'fas fa-seedling',
    'Spirit': 'fas fa-ghost',
    'Spark': 'fas fa-bolt',
    'Passion': 'fas fa-heart',
    'Blood': 'fas fa-tint',
    'Shadow': 'fas fa-moon',
    'Curse': 'fas fa-skull',
    'Earth': 'fas fa-mountain',
    'Lightning': 'fas fa-bolt',
    'Dark': 'fas fa-moon',
    'Physical': 'fas fa-fist-raised'
};

// Complete rarity data with evolution capability
export const RARITIES = [
    { value: "Common", label: "Common", canEvolve: false },
    { value: "Uncommon", label: "Uncommon", canEvolve: false },
    { value: "Rare", label: "Rare", canEvolve: true },
    { value: "Epic", label: "Epic", canEvolve: true },
    { value: "Legendary", label: "Legendary", canEvolve: true },
    { value: "Mythic", label: "Mythic", canEvolve: true }
];

// Complete element data
export const ELEMENTS = [
    { value: "Fire", label: "Fire" },
    { value: "Water", label: "Water" },
    { value: "Wind", label: "Wind" },
    { value: "Lightning", label: "Lightning" },
    { value: "Dark", label: "Dark" },
    { value: "Light", label: "Light" },
    { value: "Physical", label: "Physical" },
    { value: "Energy", label: "Energy" },
    { value: "Soul", label: "Soul" }
];

// Rarity order for sorting and display
export const RARITY_ORDER = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];

// Attack types for filtering
export const ATTACK_TYPES = [
    'Single Target',
    'Circle AoE',
    'Cone AoE',
    'Line AoE',
    'Full AoE',
    'Stadium AoE',
    'Splash AoE',
    'Chain'
];

// Game constants
export const GAME_CONSTANTS = {
    MAX_LEVEL: 12,
    MIN_LEVEL: 1,
    DEFAULT_ENEMY_COUNT: 1,
    MAX_ENEMY_COUNT: 10
};

// UI constants
export const UI_CONSTANTS = {
    ANIMATION_DURATION: 300,
    DEBOUNCE_DELAY: 300,
    NOTIFICATION_DURATION: 3000
};

// Utility functions for data validation
export const dataUtils = {
    // Get rarity by value
    getRarityByValue(value) {
        return RARITIES.find(rarity => rarity.value === value) || RARITIES[0];
    },

    // Get element by value
    getElementByValue(value) {
        return ELEMENTS.find(element => element.value === value) || ELEMENTS[0];
    },

    // Get all rarity labels for dropdown
    getRarityLabels() {
        return RARITIES.map(rarity => ({
            value: rarity.value,
            label: rarity.label
        }));
    },

    // Get all element labels for dropdown
    getElementLabels() {
        return ELEMENTS.map(element => ({
            value: element.value,
            label: element.label
        }));
    },

    // Validate rarity data
    validateRarities() {
        return RARITIES.every(rarity => 
            typeof rarity.value === 'string' && 
            typeof rarity.label === 'string' &&
            typeof rarity.canEvolve === 'boolean'
        );
    },

    // Validate element data
    validateElements() {
        return ELEMENTS.every(element => 
            typeof element.value === 'string' && 
            typeof element.label === 'string'
        );
    }
}; 