// Traits configuration for Anime Vanguards DPS Calculator
export const traitsData = {
    "no_trait": {
        "name": "No trait",
        "probability": 0,
        "damage_multiplier": 1.0,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.0,
        "description": "No trait"
    },
    "range_1": {
        "name": "Range 1",
        "probability": 26,
        "damage_multiplier": 1.0,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.05,
        "description": "Increase attack range +5%"
    },
    "range_2": {
        "name": "Range 2", 
        "probability": 26,
        "damage_multiplier": 1.0,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.10,
        "description": "Increase attack range +10%"
    },
    "range_3": {
        "name": "Range 3",
        "probability": 26,
        "damage_multiplier": 1.0,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.15,
        "description": "Increase attack range +15%"
    },
    "swift_1": {
        "name": "Swift 1",
        "probability": 26,
        "damage_multiplier": 1.0,
        "spa_multiplier": 0.95,
        "range_multiplier": 1.0,
        "dps_increase": 1.053,
        "description": "Reduce attack interval -5% (DPS +5.3%)"
    },
    "swift_2": {
        "name": "Swift 2",
        "probability": 26,
        "damage_multiplier": 1.0,
        "spa_multiplier": 0.925,
        "range_multiplier": 1.0,
        "dps_increase": 1.081,
        "description": "Reduce attack interval -7.5% (DPS +8.1%)"
    },
    "swift_3": {
        "name": "Swift 3",
        "probability": 26,
        "damage_multiplier": 1.0,
        "spa_multiplier": 0.875,
        "range_multiplier": 1.0,
        "dps_increase": 1.143,
        "description": "Reduce attack interval -12.5% (DPS +14.3%)"
    },
    "vigor_1": {
        "name": "Vigor 1",
        "probability": 26,
        "damage_multiplier": 1.05,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.0,
        "dps_increase": 1.05,
        "description": "Increase damage +5%"
    },
    "vigor_2": {
        "name": "Vigor 2",
        "probability": 26,
        "damage_multiplier": 1.10,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.0,
        "dps_increase": 1.10,
        "description": "Increase damage +10%"
    },
    "vigor_3": {
        "name": "Vigor 3",
        "probability": 26,
        "damage_multiplier": 1.15,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.0,
        "dps_increase": 1.15,
        "description": "Increase damage +15%"
    },
    "scholar": {
        "name": "Scholar",
        "probability": 10,
        "damage_multiplier": 1.0,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.0,
        "exp_boost": 1.5,
        "description": "Experience gain +50%"
    },
    "marksman": {
        "name": "Marksman",
        "probability": 6.5,
        "damage_multiplier": 1.0,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.30,
        "description": "Attack range +30%"
    },
    "fortune": {
        "name": "Fortune",
        "probability": 2.5,
        "damage_multiplier": 1.0,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.0,
        "special_effect": "farm_units_cash_+20%_or_upgrade_cost_-10%",
        "description": "Farm units cash income +20% or non-farm units upgrade cost -10%"
    },
    "blitz": {
        "name": "Blitz",
        "probability": 1.85,
        "damage_multiplier": 1.0,
        "spa_multiplier": 0.80,
        "range_multiplier": 1.0,
        "dps_increase": 1.25,
        "pity": 54,
        "description": "Attack interval -20% (DPS +25%)"
    },
    "solar": {
        "name": "Solar",
        "probability": 0.5,
        "damage_multiplier": 1.10,
        "spa_multiplier": 0.95,
        "range_multiplier": 1.25,
        "dps_increase": 1.158,
        "pity": 300,
        "description": "Damage +10%, attack interval -5%, range +25% (DPS +15.8%)"
    },
    "deadeye": {
        "name": "Deadeye",
        "probability": 0.375,
        "damage_multiplier": 1.0,
        "spa_multiplier": 1.0,
        "range_multiplier": 1.0,
        "crit_chance": 0.45,
        "crit_damage": 1.50,
        "dps_increase": 1.3375,
        "pity": 400,
        "description": "Critical hit chance 45%, critical damage 50% (DPS +33.75%)"
    },
    "ethereal": {
        "name": "Ethereal",
        "probability": 0.175,
        "damage_multiplier": 1.20,
        "spa_multiplier": 0.80,
        "range_multiplier": 1.05,
        "dps_increase": 1.50,
        "pity": 858,
        "description": "Damage +20%, attack interval -20%, range +5% (DPS +50%)"
    },
    "monarch": {
        "name": "Monarch",
        "probability": 0.1,
        "damage_multiplier": 4.0,
        "spa_multiplier": 0.90,
        "range_multiplier": 1.05,
        "placement_limit": 1,
        "dps_increase": 4.444,
        "pity": 1500,
        "description": "Damage +300%, attack interval -10%, range +5%, limit 1 placement (DPS +344.4%)"
    }
}; 