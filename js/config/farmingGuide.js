// Complete Farming Guide Database for Anime Vanguards
export const COMPLETE_FARMING_GUIDE_DATA = {
    "song_jinwu_igros": {
        priority: "Extreme",
        farmingSteps: [
            {
                step: 1,
                task: "Obtain Red Key",
                method: "Complete Ant Island Dungeon (10% drop rate)",
                alternativeMethod: "Purchase with 2,000 Monarch Tokens",
                timeEstimate: "5-20 runs"
            },
            {
                step: 2,
                task: "Complete Red Key Quest Part 1",
                method: "Kill Ant King 50 times",
                location: "Ant Island",
                timeEstimate: "10-15 hours"
            },
            {
                step: 3,
                task: "Complete Red Key Quest Part 2",
                method: "Sacrifice 30 mythic and above units",
                notes: "Keep evolved units, sacrifice duplicates",
                timeEstimate: "Variable"
            },
            {
                step: 4,
                task: "Complete Red Key Quest Part 3",
                method: "Summon 5000 Shadows with Sung Jin Woo",
                location: "Any stage",
                timeEstimate: "20-30 hours"
            },
            {
                step: 5,
                task: "Complete Red Key Quest Part 4",
                method: "Sacrifice evolved Igris",
                notes: "Must evolve Igris first, then sacrifice for Elixir of Life",
                timeEstimate: "Additional evolution time"
            }
        ],
        materialFarming: [
            {
                material: "Green Essence Stone",
                bestMethod: "Daily/Weekly/Half-hourly Challenges",
                alternativeMethod: "Legend Stages (1-3 per clear)",
                efficiency: "High"
            },
            {
                material: "Blue Essence Stone",
                bestMethod: "Challenges and Crafting",
                alternativeMethod: "Gold Shop purchase",
                efficiency: "Medium"
            },
            {
                material: "Rainbow Essence Stone",
                bestMethod: "Worldlines Floor 45 (5x reward)",
                alternativeMethod: "High-level challenges",
                efficiency: "Low"
            }
        ],
        tips: [
            "Start collecting materials early, this is a long-term goal",
            "Focus on getting Igris first, then work on the quest",
            "Save Monarch Tokens if RNG is bad for Red Key drop",
            "Don't sacrifice good units - only sacrifice duplicates for Part 2"
        ]
    },

    "alocard_vampire_king": {
        priority: "High",
        farmingSteps: [
            {
                step: 1,
                task: "Obtain Alocard",
                method: "Summon on Special Banner (0.004% chance)",
                notes: "Extremely rare, save gems and use luck potions",
                timeEstimate: "Variable (RNG dependent)"
            },
            {
                step: 2,
                task: "Collect Shadow Equipment",
                method: "Automatically obtained when summoning Alocard",
                notes: "No additional farming required",
                timeEstimate: "Instant"
            }
        ],
        materialFarming: [
            {
                material: "Green Essence Stone",
                bestMethod: "Daily Challenges",
                alternativeMethod: "Legend Stages",
                efficiency: "High"
            },
            {
                material: "Red Essence Stone",
                bestMethod: "Challenges and Boss Events",
                alternativeMethod: "Crafting",
                efficiency: "Medium"
            }
        ],
        tips: [
            "Use Super Lucky and Ultra Lucky potions for summoning",
            "Summon 10 units at a time for slightly better rates",
            "This unit is extremely rare but very powerful",
            "Consider using pity system if available"
        ]
    },

    "saber_king_knights": {
        priority: "High",
        farmingSteps: [
            {
                step: 1,
                task: "Obtain Avalon",
                method: "Complete Holy Grail Challenge",
                location: "Holy Grail",
                timeEstimate: "8-12 runs"
            },
            {
                step: 2,
                task: "Achieve King of Knights Status",
                method: "Complete holy evolution quest",
                location: "Holy Grail",
                timeEstimate: "5-7 hours"
            }
        ],
        materialFarming: [
            {
                material: "Yellow Essence Stone",
                bestMethod: "Holy-themed challenges",
                alternativeMethod: "Holy grail stages",
                efficiency: "High"
            },
            {
                material: "Purple Essence Stone",
                bestMethod: "High-level holy challenges",
                alternativeMethod: "Crafting",
                efficiency: "Medium"
            }
        ],
        tips: [
            "Use holy units for better material drops",
            "Complete holy grail challenges for bonus rewards",
            "Focus on holy element content"
        ]
    }
};

// Utility functions for farming guide
export const farmingGuideUtils = {
    getFarmingGuideForUnit(unitId) {
        return FARMING_GUIDE_DATA[unitId] || null;
    },

    getPriorityLevel(unitId) {
        const guideData = FARMING_GUIDE_DATA[unitId];
        if (!guideData) return 'Unknown';
        const priority = guideData.priority?.toLowerCase();
        if (priority?.includes('extreme')) return 'extreme';
        if (priority?.includes('high')) return 'high';
        if (priority?.includes('medium')) return 'medium';
        if (priority?.includes('low')) return 'low';
        return 'medium';
    },

    getFarmingSteps(unitId) {
        const guideData = FARMING_GUIDE_DATA[unitId];
        return guideData ? guideData.farmingSteps : [];
    },

    getMaterialFarming(unitId) {
        const guideData = FARMING_GUIDE_DATA[unitId];
        return guideData ? guideData.materialFarming : [];
    },

    getFarmingTips(unitId) {
        const guideData = FARMING_GUIDE_DATA[unitId];
        return guideData ? guideData.tips : [];
    },

    validateFarmingGuideData() {
        console.log('🔍 Validating farming guide data...');
        for (const [unitId, data] of Object.entries(FARMING_GUIDE_DATA)) {
            if (!data.priority || typeof data.priority !== 'string') {
                console.error(`❌ Invalid priority for ${unitId}`);
                return false;
            }
            if (!data.farmingSteps || !Array.isArray(data.farmingSteps)) {
                console.error(`❌ Invalid farmingSteps for ${unitId}`);
                return false;
            }
            if (!data.materialFarming || !Array.isArray(data.materialFarming)) {
                console.error(`❌ Invalid materialFarming for ${unitId}`);
                return false;
            }
            if (!data.tips || !Array.isArray(data.tips)) {
                console.error(`❌ Invalid tips for ${unitId}`);
                return false;
            }
        }
        console.log('✅ Farming guide data validation passed');
        return true;
    }
}; 