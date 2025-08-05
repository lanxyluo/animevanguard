// Complete Evolution Units Database for Anime Vanguards
export const EVOLUTION_UNITS = [
    // Vanguard Rarity
    {
        id: "song_jinwu_igros",
        name: "Song Jinwu and Igros",
        rarity: "Vanguard",
        element: "Unknown",
        canEvolve: true,
        evolutionName: "Song Jinwu and Igros (Evolved)",
        obtainMethod: "Red Key Quest"
    },
    {
        id: "koguro_unsealed",
        name: "Koguro (Unsealed)",
        rarity: "Vanguard", 
        element: "Shadow",
        canEvolve: true,
        evolutionName: "Koguro (Unsealed+)",
        obtainMethod: "Special Quest"
    },
    {
        id: "rogita_super4",
        name: "Rogita (Super 4)",
        rarity: "Vanguard",
        element: "Fire",
        canEvolve: true,
        evolutionName: "Rogita (Ultra)",
        obtainMethod: "Special Acquisition"
    },

    // Secret Rarity
    {
        id: "alocard_vampire_king",
        name: "Alocard (Vampire King)",
        rarity: "Secret",
        element: "Blood",
        canEvolve: true,
        evolutionName: "Alocard (True Vampire)",
        obtainMethod: "Special Banner (0.004%)"
    },
    {
        id: "slime_king",
        name: "Slime (King)",
        rarity: "Secret",
        element: "Nature",
        canEvolve: true,
        evolutionName: "Slime (Emperor)",
        obtainMethod: "Special Drop"
    },
    {
        id: "byeken_ronin",
        name: "Byeken (Ronin)",
        rarity: "Secret",
        element: "Spark",
        canEvolve: true,
        evolutionName: "Byeken (Master)",
        obtainMethod: "Special Acquisition"
    },
    {
        id: "roku_super3",
        name: "Roku (Super 3)",
        rarity: "Secret",
        element: "Fire",
        canEvolve: true,
        evolutionName: "Roku (Angel)",
        obtainMethod: "Martial Island"
    },
    {
        id: "yehowach_almighty",
        name: "Yehowach (Almighty)",
        rarity: "Secret",
        element: "Cosmic",
        canEvolve: true,
        evolutionName: "Yehowach (God)",
        obtainMethod: "Special Acquisition"
    },
    {
        id: "smith_john",
        name: "Smith John",
        rarity: "Secret",
        element: "Unknown",
        canEvolve: true,
        evolutionName: "Smith John (Ultimate)",
        obtainMethod: "Ruined City Raid"
    },
    {
        id: "lfelt_love",
        name: "Lfelt (Love)",
        rarity: "Secret",
        element: "Holy",
        canEvolve: true,
        evolutionName: "Lfelt (Divine)",
        obtainMethod: "Special Acquisition"
    },
    {
        id: "saber_black_tyrant",
        name: "Saber (Black Tyrant)",
        rarity: "Secret",
        element: "Shadow",
        canEvolve: true,
        evolutionName: "Saber (Dark Lord)",
        obtainMethod: "Special Acquisition"
    },
    {
        id: "isdead_romantic",
        name: "Isdead (Romantic)",
        rarity: "Secret",
        element: "Life",
        canEvolve: true,
        evolutionName: "Isdead (Eternal)",
        obtainMethod: "Special Acquisition"
    },
    {
        id: "conqueror_invulnerable",
        name: "Conqueror vs Invulnerable",
        rarity: "Secret",
        element: "Unknown",
        canEvolve: true,
        evolutionName: "Conqueror (Supreme)",
        obtainMethod: "Special Acquisition"
    },

    // Exclusive Rarity
    {
        id: "vigil_power",
        name: "Vigil (Power)",
        rarity: "Exclusive",
        element: "Fire",
        canEvolve: true,
        evolutionName: "Vigil (Ultimate Power)",
        obtainMethod: "Battle Pass"
    },
    {
        id: "dawntay_jackpot",
        name: "Dawntay (Jackpot)",
        rarity: "Exclusive",
        element: "Spark",
        canEvolve: true,
        evolutionName: "Dawntay (Fortune)",
        obtainMethod: "Special Acquisition"
    },
    {
        id: "luce_hacker",
        name: "Luce (Hacker)",
        rarity: "Exclusive",
        element: "Spark",
        canEvolve: true,
        evolutionName: "Luce (Master Hacker)",
        obtainMethod: "Battle Pass Season 4"
    },

    // Mythic Rarity
    {
        id: "saber_king_knights",
        name: "Saber (King of Knights)",
        rarity: "Mythic",
        element: "Holy",
        canEvolve: true,
        evolutionName: "Saber (Eternal King)",
        obtainMethod: "Special Banner"
    },
    {
        id: "notgoodguy_free",
        name: "NotGoodGuy (Free)",
        rarity: "Mythic",
        element: "Shadow",
        canEvolve: true,
        evolutionName: "NotGoodGuy (Liberated)",
        obtainMethod: "Shining Castle"
    },
    {
        id: "gazelle_zombie",
        name: "Gazelle (Zombie)",
        rarity: "Mythic",
        element: "Blood",
        canEvolve: true,
        evolutionName: "Gazelle (Undead Lord)",
        obtainMethod: "Special Banner"
    },
    {
        id: "kazzy_queen",
        name: "Kazzy (Queen)",
        rarity: "Mythic",
        element: "Nature",
        canEvolve: true,
        evolutionName: "Kazzy (Empress)",
        obtainMethod: "Special Banner"
    },
    {
        id: "astolfo_rider",
        name: "Astolfo (Rider of Black)",
        rarity: "Mythic",
        element: "Shadow",
        canEvolve: true,
        evolutionName: "Astolfo (True Rider)",
        obtainMethod: "Rider of Black's Realm"
    },
    {
        id: "giant_queen_founder",
        name: "Giant Queen (Founder)",
        rarity: "Mythic",
        element: "Life",
        canEvolve: true,
        evolutionName: "Giant Queen (Creator)",
        obtainMethod: "Boss Event"
    },
    {
        id: "arc_true_ancestor",
        name: "Arc (True Ancestor)",
        rarity: "Mythic",
        element: "Blood",
        canEvolve: true,
        evolutionName: "Arc (Primordial)",
        obtainMethod: "Spring Banner"
    }
];

// Utility functions for evolution units
export const evolutionUtils = {
    getEvolutionUnitById(id) {
        return EVOLUTION_UNITS.find(unit => unit.id === id);
    },
    
    getEvolutionUnitsByRarity(rarity) {
        return EVOLUTION_UNITS.filter(unit => unit.rarity === rarity);
    },
    
    getEvolutionUnitsByElement(element) {
        return EVOLUTION_UNITS.filter(unit => unit.element === element);
    },
    
    // Get unit with materials data
    getEvolutionUnitWithMaterials(id) {
        const unit = this.getEvolutionUnitById(id);
        if (!unit) return null;
        
        // Import materials data dynamically to avoid circular dependency
        import('./evolutionMaterials.js').then(module => {
            const materialsData = module.EVOLUTION_MATERIALS_DATA[id];
            if (materialsData) {
                unit.evolutionMaterials = materialsData;
            }
        }).catch(error => {
            console.warn('Could not load materials data:', error);
        });
        
        return unit;
    },
    
    validateEvolutionUnits() {
        return EVOLUTION_UNITS.every(unit => 
            unit.id && unit.name && unit.rarity && unit.element && 
            typeof unit.canEvolve === 'boolean' && unit.evolutionName && unit.obtainMethod
        );
    }
}; 