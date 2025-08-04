// Traits configuration for Anime Vanguards DPS Calculator
// Based on official game data with accurate multipliers

export const traitsData = [
  { 
    value: "none", 
    label: "No trait", 
    damageMultiplier: 1.0,
    description: "No special effects"
  },
  { 
    value: "burn", 
    label: "Burn", 
    damageMultiplier: 1.15,
    description: "Burn effect, continuous damage"
  },
  { 
    value: "freeze", 
    label: "Freeze", 
    damageMultiplier: 1.10,
    description: "Freeze effect, slows enemies"
  },
  { 
    value: "poison", 
    label: "Poison", 
    damageMultiplier: 1.20,
    description: "Poison effect, continuous damage"
  },
  { 
    value: "curse", 
    label: "Curse", 
    damageMultiplier: 1.25,
    description: "Curse effect"
  },
  { 
    value: "bleed", 
    label: "Bleed", 
    damageMultiplier: 1.18,
    description: "Bleed effect"
  },
  { 
    value: "shock", 
    label: "Shock", 
    damageMultiplier: 1.22,
    description: "Shock effect"
  },
  { 
    value: "critical", 
    label: "Critical", 
    damageMultiplier: 1.30,
    description: "Critical hit effect"
  },
  { 
    value: "piercing", 
    label: "Piercing", 
    damageMultiplier: 1.12,
    description: "Piercing effect"
  },
  { 
    value: "explosive", 
    label: "Explosive", 
    damageMultiplier: 1.25,
    description: "Explosive effect"
  }
];

// Utility functions for traits
export const traitsUtils = {
  // Get trait by value
  getTraitByValue(value) {
    return traitsData.find(trait => trait.value === value) || traitsData[0];
  },

  // Get all trait labels for dropdown
  getTraitLabels() {
    return traitsData.map(trait => ({
      value: trait.value,
      label: trait.label
    }));
  },

  // Validate trait data
  validateTraits() {
    return traitsData.every(trait => 
      typeof trait.damageMultiplier === 'number' && 
      trait.damageMultiplier > 0 &&
      trait.value && 
      trait.label
    );
  }
}; 