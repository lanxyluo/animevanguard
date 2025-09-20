// Game States configuration for Anime Vanguards DPS Calculator
// Based on official game data with accurate multipliers

export const gameStatesData = [
  { 
    value: "normal", 
    label: "Normal", 
    damageMultiplier: 1.0,
    description: "Normal mode"
  },
  { 
    value: "nightmare", 
    label: "Nightmare", 
    damageMultiplier: 1.5,
    description: "Nightmare mode"
  },
  { 
    value: "infinite", 
    label: "Infinite", 
    damageMultiplier: 2.0,
    description: "Infinite mode"
  },
  { 
    value: "challenge", 
    label: "Challenge", 
    damageMultiplier: 1.8,
    description: "Challenge mode"
  },
  { 
    value: "boss", 
    label: "Boss Fight", 
    damageMultiplier: 1.3,
    description: "Boss battle"
  },
  { 
    value: "speed", 
    label: "Speed Mode", 
    damageMultiplier: 0.8,
    description: "Speed mode"
  },
  { 
    value: "hardcore", 
    label: "Hardcore", 
    damageMultiplier: 2.5,
    description: "Hardcore mode"
  },
  { 
    value: "legend", 
    label: "Legend", 
    damageMultiplier: 3.0,
    description: "Legend mode"
  }
];

// Utility functions for game states
export const gameStatesUtils = {
  // Get game state by value
  getGameStateByValue(value) {
    return gameStatesData.find(state => state.value === value) || gameStatesData[0];
  },

  // Get all game state labels for dropdown
  getGameStateLabels() {
    return gameStatesData.map(state => ({
      value: state.value,
      label: state.label
    }));
  },

  // Validate game state data
  validateGameStates() {
    return gameStatesData.every(state => 
      typeof state.damageMultiplier === 'number' && 
      state.damageMultiplier > 0 &&
      state.value && 
      state.label
    );
  }
}; 