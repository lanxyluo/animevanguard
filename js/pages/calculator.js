/**
 * Battle Preparation Room DPS Calculator
 * Immersive 3D battle preparation room experience with complete Buff system and intelligent recommendations
 */
class BattlePrepCalculator {
    constructor() {
        this.units = [];
        this.currentUnit = null;
        this.currentLevel = 1;
        this.currentUpgrade = 0;
        this.selectedBuffs = {
            familiar: null,
            elementBuffs: [],
            passiveSkills: []
        };
        this.buffData = {
            familiars: [],
            elementBuffs: [],
            passiveSkills: []
        };
        this.recommendations = [];
        this.configurations = [];
        
        this.init();
    }

    async init() {
        await this.loadUnits();
        await this.loadBuffData();
        this.setupEventListeners();
        this.renderUnits();
        this.renderBuffSystem();
        this.updateDPSDisplay();
    }

    async loadUnits() {
        try {
            // Wait for UnitDatabaseData to be available
            let attempts = 0;
            const maxAttempts = 100; // 10 seconds max wait
            
            while (typeof UnitDatabaseData === 'undefined' && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (typeof UnitDatabaseData !== 'undefined') {
                const allUnits = UnitDatabaseData.loadAllUnits();
                
                // Convert database units to calculator format
                this.units = allUnits.map(unit => {
                    // Extract numeric values from DPS strings and calculate base stats
                    const maxDPSValue = this.extractDPSValue(unit.maxDPS);
                    const baseDPSValue = this.extractDPSValue(unit.baseDPS);
                    
                    // Calculate base attack and speed from DPS and cost
                    const baseAttack = this.calculateBaseAttack(unit, baseDPSValue);
                    const baseSpeed = this.calculateBaseSpeed(unit, baseDPSValue, baseAttack);
                    
                    return {
                        id: unit.id,
                        name: unit.name,
                        baseAttack: baseAttack,
                        baseSpeed: baseSpeed,
                        rarity: unit.rarity.toLowerCase(),
                        tier: unit.tier,
                        element: unit.element,
                        type: unit.type,
                        deploymentCost: unit.deploymentCost,
                        maxUpgradeCost: unit.maxUpgradeCost,
                        range: unit.range,
                        description: unit.description,
                        maxDPS: unit.maxDPS,
                        baseDPS: unit.baseDPS,
                        costEfficiency: unit.costEfficiency
                    };
                });
                
                console.log('📊 Loaded', this.units.length, 'units for DPS Calculator');
            } else {
                console.error('❌ UnitDatabaseData not available, using fallback data');
                this.loadFallbackUnits();
            }
        } catch (error) {
            console.error('❌ Failed to load units from database:', error);
            this.loadFallbackUnits();
        }
    }
    
    loadFallbackUnits() {
        // Fallback data if database is not available
        this.units = [
            { id: 'naruto', name: 'Naruto Uzumaki', baseAttack: 150, baseSpeed: 1.2, rarity: 'legendary', element: 'Wind', type: 'DPS' },
            { id: 'sasuke', name: 'Sasuke Uchiha', baseAttack: 140, baseSpeed: 1.4, rarity: 'legendary', element: 'Fire', type: 'DPS' },
            { id: 'goku', name: 'Goku', baseAttack: 180, baseSpeed: 1.0, rarity: 'legendary', element: 'Holy', type: 'DPS' },
            { id: 'vegeta', name: 'Vegeta', baseAttack: 170, baseSpeed: 1.1, rarity: 'legendary', element: 'Fire', type: 'DPS' },
            { id: 'luffy', name: 'Monkey D. Luffy', baseAttack: 130, baseSpeed: 1.3, rarity: 'epic', element: 'Nature', type: 'DPS' },
            { id: 'ichigo', name: 'Ichigo Kurosaki', baseAttack: 145, baseSpeed: 1.25, rarity: 'epic', element: 'Dark', type: 'DPS' }
        ];
    }

    async loadBuffData() {
        // Load Buff data
        this.buffData = {
            familiars: [
                { id: 'dragon', name: 'Dragon', icon: '🐉', attackBonus: 0.15, speedBonus: 0.1, description: 'Increases attack by 15% and attack speed by 10%' },
                { id: 'phoenix', name: 'Phoenix', icon: '🔥', attackBonus: 0.2, speedBonus: 0.05, description: 'Increases attack by 20% and attack speed by 5%' },
                { id: 'wolf', name: 'Wolf', icon: '🐺', attackBonus: 0.1, speedBonus: 0.2, description: 'Increases attack by 10% and attack speed by 20%' },
                { id: 'eagle', name: 'Eagle', icon: '🦅', attackBonus: 0.05, speedBonus: 0.25, description: 'Increases attack by 5% and attack speed by 25%' }
            ],
            elementBuffs: [
                { id: 'fire_mastery', name: 'Fire Mastery', icon: '🔥', element: 'Fire', attackBonus: 0.25, description: 'Fire element units attack +25%' },
                { id: 'water_mastery', name: 'Water Mastery', icon: '💧', element: 'Water', attackBonus: 0.25, description: 'Water element units attack +25%' },
                { id: 'wind_mastery', name: 'Wind Mastery', icon: '💨', element: 'Wind', speedBonus: 0.3, description: 'Wind element units attack speed +30%' },
                { id: 'nature_mastery', name: 'Nature Mastery', icon: '🌿', element: 'Nature', healthBonus: 0.2, description: 'Nature element units health +20%' },
                { id: 'dark_mastery', name: 'Dark Mastery', icon: '🌑', element: 'Dark', attackBonus: 0.3, description: 'Dark element units attack +30%' },
                { id: 'holy_mastery', name: 'Holy Mastery', icon: '✨', element: 'Holy', attackBonus: 0.2, speedBonus: 0.1, description: 'Holy element units attack +20%, attack speed +10%' }
            ],
            passiveSkills: [
                { id: 'berserker', name: 'Berserker', icon: '⚔️', attackBonus: 0.3, healthPenalty: -0.1, description: 'Attack +30%, Health -10%' },
                { id: 'swift_strike', name: 'Swift Strike', icon: '⚡', speedBonus: 0.4, attackPenalty: -0.1, description: 'Attack speed +40%, Attack -10%' },
                { id: 'tank', name: 'Tank', icon: '🛡️', healthBonus: 0.5, speedPenalty: -0.2, description: 'Health +50%, Attack speed -20%' },
                { id: 'balanced', name: 'Balanced', icon: '⚖️', attackBonus: 0.1, speedBonus: 0.1, healthBonus: 0.1, description: 'All stats +10%' }
            ]
        };
    }
    
    extractDPSValue(dpsString) {
        if (!dpsString) return 1000; // Default fallback
        
        // Extract numeric value from strings like "190k+ with summon abilities", "Very High", etc.
        if (typeof dpsString === 'string') {
            // Handle "k" notation
            const kMatch = dpsString.match(/(\d+)k/);
            if (kMatch) {
                return parseInt(kMatch[1]) * 1000;
            }
            
            // Handle direct numbers
            const numberMatch = dpsString.match(/(\d+)/);
            if (numberMatch) {
                return parseInt(numberMatch[1]);
            }
            
            // Handle text descriptions
            const textDPS = {
                'Very High': 150000,
                'High': 100000,
                'Medium': 50000,
                'Low': 20000
            };
            
            return textDPS[dpsString] || 1000;
        }
        
        return typeof dpsString === 'number' ? dpsString : 1000;
    }
    
    calculateBaseAttack(unit, baseDPSValue) {
        // Calculate base attack based on unit properties
        const rarityMultiplier = {
            'Vanguard': 1.8,
            'Secret': 1.5,
            'Mythic': 1.2,
            'Epic': 1.0
        };
        
        const typeMultiplier = {
            'DPS': 1.3,
            'Support': 0.8,
            'Farm': 0.6,
            'Buffer': 0.7
        };
        
        const baseValue = baseDPSValue / 10; // Scale down for base attack
        const rarityBonus = rarityMultiplier[unit.rarity] || 1.0;
        const typeBonus = typeMultiplier[unit.type] || 1.0;
        
        return Math.round(baseValue * rarityBonus * typeBonus);
    }
    
    calculateBaseSpeed(unit, baseDPSValue, baseAttack) {
        // Calculate base speed based on unit properties
        const rangeMultiplier = {
            'Long': 0.8,
            'Medium': 1.0,
            'Short': 1.2
        };
        
        const typeMultiplier = {
            'DPS': 1.1,
            'Support': 1.3,
            'Farm': 1.5,
            'Buffer': 1.0
        };
        
        const rangeBonus = rangeMultiplier[unit.range] || 1.0;
        const typeBonus = typeMultiplier[unit.type] || 1.0;
        
        // Calculate speed to achieve the target DPS
        const targetSpeed = baseDPSValue / baseAttack;
        
        return Math.max(0.5, Math.min(2.0, targetSpeed * rangeBonus * typeBonus));
    }

    loadTraits() {
        this.traits = [
            { id: 'none', name: 'No Trait', damageMultiplier: 1.0, speedMultiplier: 1.0 },
            { id: 'berserker', name: 'Berserker', damageMultiplier: 1.5, speedMultiplier: 0.8 },
            { id: 'swift', name: 'Swift Strike', damageMultiplier: 0.9, speedMultiplier: 1.6 },
            { id: 'critical', name: 'Critical Master', damageMultiplier: 1.3, speedMultiplier: 1.0 },
            { id: 'elemental', name: 'Elemental Mastery', damageMultiplier: 1.4, speedMultiplier: 1.1 },
            { id: 'legendary', name: 'Legendary Power', damageMultiplier: 1.8, speedMultiplier: 1.2 }
        ];
    }

    // Render 3D unit cards
    renderUnits() {
        const unitGrid = document.getElementById('unit-grid');
        if (!unitGrid) return;

        unitGrid.innerHTML = '';
        
        this.units.forEach(unit => {
            const unitCard = this.createUnitCard(unit);
            unitGrid.appendChild(unitCard);
        });

        // Update unit count
        const unitCount = document.getElementById('unit-count');
        if (unitCount) {
            unitCount.textContent = `${this.units.length} units`;
        }
    }

    createUnitCard(unit) {
        const card = document.createElement('div');
        card.className = 'unit-card-3d';
        card.dataset.unitId = unit.id;
        
        const rarityClass = `rarity-${unit.rarity.toLowerCase()}`;
        
        card.innerHTML = `
            <div class="unit-card-image">
                <i class="fas fa-user"></i>
            </div>
            <div class="unit-card-name">${unit.name}</div>
            <div class="unit-card-badges">
                <span class="unit-badge ${rarityClass}">${unit.rarity}</span>
                ${unit.element ? `<span class="unit-badge element-${unit.element.toLowerCase()}">${unit.element}</span>` : ''}
            </div>
        `;

        card.addEventListener('click', () => this.selectUnit(unit));
        return card;
    }

    // Render Buff system
    renderBuffSystem() {
        this.renderFamiliars();
        this.renderElementBuffs();
        this.renderPassiveSkills();
        this.renderRecommendations();
    }

    renderFamiliars() {
        const familiarGrid = document.getElementById('familiar-grid');
        if (!familiarGrid) return;

        familiarGrid.innerHTML = '';
        
        this.buffData.familiars.forEach(familiar => {
            const option = document.createElement('div');
            option.className = 'buff-option';
            option.dataset.buffId = familiar.id;
            option.dataset.buffType = 'familiar';
            
            option.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${familiar.icon}</div>
                <div class="buff-name">${familiar.name}</div>
            `;
            
            option.addEventListener('click', () => this.selectBuff('familiar', familiar));
            familiarGrid.appendChild(option);
        });
    }

    renderElementBuffs() {
        const elementBuffs = document.getElementById('element-buffs');
        if (!elementBuffs) return;

        elementBuffs.innerHTML = '';
        
        this.buffData.elementBuffs.forEach(buff => {
            const option = document.createElement('div');
            option.className = 'buff-option';
            option.dataset.buffId = buff.id;
            option.dataset.buffType = 'element';
            
            option.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${buff.icon}</div>
                <div class="buff-name">${buff.name}</div>
            `;
            
            option.addEventListener('click', () => this.selectBuff('element', buff));
            elementBuffs.appendChild(option);
        });
    }

    renderPassiveSkills() {
        const passiveSkills = document.getElementById('passive-skills');
        if (!passiveSkills) return;

        passiveSkills.innerHTML = '';
        
        this.buffData.passiveSkills.forEach(skill => {
            const option = document.createElement('div');
            option.className = 'buff-option';
            option.dataset.buffId = skill.id;
            option.dataset.buffType = 'passive';
            
            option.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${skill.icon}</div>
                <div class="buff-name">${skill.name}</div>
            `;
            
            option.addEventListener('click', () => this.selectBuff('passive', skill));
            passiveSkills.appendChild(option);
        });
    }

    renderRecommendations() {
        const recommendationCards = document.getElementById('recommendation-cards');
        if (!recommendationCards) return;

        // Generate intelligent recommendations
        this.generateRecommendations();
        
        recommendationCards.innerHTML = '';
        
        this.recommendations.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            
            card.innerHTML = `
                <div class="rec-title">${rec.title}</div>
                <div class="rec-description">${rec.description}</div>
            `;
            
            card.addEventListener('click', () => this.applyRecommendation(rec));
            recommendationCards.appendChild(card);
        });
    }

    generateRecommendations() {
        if (!this.currentUnit) {
            this.recommendations = [];
            return;
        }

        this.recommendations = [
            {
                title: 'Maximum DPS Configuration',
                description: 'Focus on maximizing attack power',
                config: {
                    familiar: this.buffData.familiars.find(f => f.id === 'phoenix'),
                    elementBuffs: this.buffData.elementBuffs.filter(b => b.element === this.currentUnit.element),
                    passiveSkills: [this.buffData.passiveSkills.find(s => s.id === 'berserker')]
                }
            },
            {
                title: 'Balanced Configuration',
                description: 'Balance between attack power and speed',
                config: {
                    familiar: this.buffData.familiars.find(f => f.id === 'dragon'),
                    elementBuffs: this.buffData.elementBuffs.filter(b => b.element === this.currentUnit.element),
                    passiveSkills: [this.buffData.passiveSkills.find(s => s.id === 'balanced')]
                }
            },
            {
                title: 'Speed Priority',
                description: 'Maximize attack speed',
                config: {
                    familiar: this.buffData.familiars.find(f => f.id === 'eagle'),
                    elementBuffs: this.buffData.elementBuffs.filter(b => b.element === this.currentUnit.element),
                    passiveSkills: [this.buffData.passiveSkills.find(s => s.id === 'swift_strike')]
                }
            }
        ];
    }

    setupEventListeners() {
        const unitSelect = document.getElementById('unitSelect');
        if (unitSelect) {
            unitSelect.addEventListener('change', (e) => {
                this.currentUnit = this.units.find(u => u.id === e.target.value);
                this.updateUI();
            });
        }

        const levelSlider = document.getElementById('levelSlider');
        if (levelSlider) {
            levelSlider.addEventListener('input', (e) => {
                this.currentLevel = parseInt(e.target.value);
                document.getElementById('levelValue').textContent = this.currentLevel;
                this.updateUI();
            });
        }

        const traitSelect = document.getElementById('traitSelect');
        if (traitSelect) {
            traitSelect.addEventListener('change', (e) => {
                this.currentTrait = this.traits.find(t => t.id === e.target.value);
                this.updateUI();
            });
        }

        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateDPS());
        }

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('preset-btn')) {
                const preset = e.target.dataset.preset;
                this.loadPreset(preset);
            }
        });
    }

    updateUI() {
        this.updateUnitSelect();
        this.updateTraitSelect();
        this.updateResults();
    }

    updateUnitSelect() {
        const unitSelect = document.getElementById('unitSelect');
        if (!unitSelect) return;

        unitSelect.innerHTML = '<option value="">Choose a unit...</option>';
        this.units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${unit.name} (${unit.rarity} ${unit.tier}) - ${unit.type} ${unit.element}`;
            unitSelect.appendChild(option);
        });

        if (this.currentUnit) {
            unitSelect.value = this.currentUnit.id;
        }
    }

    updateTraitSelect() {
        const traitSelect = document.getElementById('traitSelect');
        if (!traitSelect) return;

        traitSelect.innerHTML = '<option value="">No Trait</option>';
        this.traits.forEach(trait => {
            if (trait.id !== 'none') {
                const option = document.createElement('option');
                option.value = trait.id;
                option.textContent = trait.name;
                traitSelect.appendChild(option);
            }
        });

        if (this.currentTrait) {
            traitSelect.value = this.currentTrait.id;
        }
    }

    calculateDPS() {
        if (!this.currentUnit) {
            this.showError('Please select a unit first');
            return;
        }

        const results = this.performCalculation();
        this.displayResults(results);
    }

    performCalculation() {
        const baseAttack = this.currentUnit.baseAttack;
        const baseSpeed = this.currentUnit.baseSpeed;
        
        // Enhanced level multiplier based on unit rarity
        const rarityLevelBonus = {
            'vanguard': 0.15,
            'secret': 0.12,
            'mythic': 0.10,
            'epic': 0.08
        };
        
        const levelBonus = rarityLevelBonus[this.currentUnit.rarity] || 0.08;
        const levelMultiplier = 1 + (this.currentLevel - 1) * levelBonus;
        
        // Trait multipliers
        const traitDamageMultiplier = this.currentTrait ? this.currentTrait.damageMultiplier : 1.0;
        const traitSpeedMultiplier = this.currentTrait ? this.currentTrait.speedMultiplier : 1.0;

        // Tier bonus multiplier
        const tierMultiplier = {
            'BROKEN': 1.5,
            'META': 1.3,
            'SUB-META': 1.1,
            'DECENT': 1.0
        };
        
        const tierBonus = tierMultiplier[this.currentUnit.tier] || 1.0;
        
        // Cost efficiency bonus
        const efficiencyMultiplier = {
            'High': 1.2,
            'Medium': 1.0,
            'Low': 0.8
        };
        
        const efficiencyBonus = efficiencyMultiplier[this.currentUnit.costEfficiency] || 1.0;
        
        // Calculate final stats
        const finalAttack = baseAttack * levelMultiplier * traitDamageMultiplier * tierBonus * efficiencyBonus;
        const finalSpeed = baseSpeed * traitSpeedMultiplier;
        const baseDPS = finalAttack * finalSpeed;
        const totalDPS = baseDPS * this.enemyCount;

        return {
            baseAttack: finalAttack,
            baseSpeed: finalSpeed,
            baseDPS: baseDPS,
            totalDPS: totalDPS,
            attacksPerSecond: finalSpeed,
            levelMultiplier: levelMultiplier,
            traitDamageMultiplier: traitDamageMultiplier,
            traitSpeedMultiplier: traitSpeedMultiplier,
            tierMultiplier: tierBonus,
            efficiencyMultiplier: efficiencyBonus,
            enemyCount: this.enemyCount,
            unitTier: this.currentUnit.tier,
            unitRarity: this.currentUnit.rarity,
            unitType: this.currentUnit.type,
            unitElement: this.currentUnit.element
        };
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('dpsResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="unit-info-header">
                <h3>${this.currentUnit.name}</h3>
                <div class="unit-badges">
                    <span class="badge rarity-${results.unitRarity}">${results.unitRarity.toUpperCase()}</span>
                    <span class="badge tier-${results.unitTier.toLowerCase().replace('-', '')}">${results.unitTier}</span>
                    <span class="badge type-${results.unitType.toLowerCase()}">${results.unitType}</span>
                    <span class="badge element-${results.unitElement.toLowerCase()}">${results.unitElement}</span>
                </div>
            </div>
            
            <div class="dps-result-item">
                <span class="dps-result-label">Base Attack</span>
                <span class="dps-result-value">${Math.round(results.baseAttack).toLocaleString()}</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Attack Speed</span>
                <span class="dps-result-value">${results.baseSpeed.toFixed(2)}/s</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Base DPS</span>
                <span class="dps-result-value">${Math.round(results.baseDPS).toLocaleString()}</span>
            </div>
            <div class="dps-result-item highlight">
                <span class="dps-result-label">Total DPS (${results.enemyCount} enemies)</span>
                <span class="dps-result-value">${Math.round(results.totalDPS).toLocaleString()}</span>
            </div>
            <div class="dps-result-item">
                <span class="dps-result-label">Attacks per Second</span>
                <span class="dps-result-value">${results.attacksPerSecond.toFixed(2)}</span>
            </div>
            
            <div class="damage-breakdown">
                <h4>Damage Breakdown</h4>
                <div class="breakdown-item">
                    <span class="breakdown-label">Base Attack</span>
                    <span class="breakdown-value">${this.currentUnit.baseAttack.toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Level ${this.currentLevel} Multiplier</span>
                    <span class="breakdown-value">×${results.levelMultiplier.toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Trait Damage Multiplier</span>
                    <span class="breakdown-value">×${results.traitDamageMultiplier.toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Tier Bonus (${results.unitTier})</span>
                    <span class="breakdown-value">×${results.tierMultiplier.toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Cost Efficiency Bonus</span>
                    <span class="breakdown-value">×${results.efficiencyMultiplier.toFixed(2)}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Final Attack</span>
                    <span class="breakdown-value">${Math.round(results.baseAttack).toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Attack Speed</span>
                    <span class="breakdown-value">${results.baseSpeed.toFixed(2)}/s</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Enemy Count</span>
                    <span class="breakdown-value">×${results.enemyCount}</span>
                </div>
            </div>
            
            <div class="unit-stats-info">
                <h4>Unit Information</h4>
                <div class="info-item">
                    <span class="info-label">Deployment Cost</span>
                    <span class="info-value">¥${this.currentUnit.deploymentCost.toLocaleString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Max Upgrade Cost</span>
                    <span class="info-value">¥${this.currentUnit.maxUpgradeCost.toLocaleString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Range</span>
                    <span class="info-value">${this.currentUnit.range}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Database DPS</span>
                    <span class="info-value">${this.currentUnit.maxDPS}</span>
                </div>
            </div>
        `;
    }

    updateResults() {
        if (this.currentUnit && this.currentTrait) {
            const results = this.performCalculation();
            this.displayResults(results);
        } else {
            this.showPlaceholder();
        }
    }

    showPlaceholder() {
        const resultsContainer = document.getElementById('dpsResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="results-placeholder">
                <i class="fas fa-calculator"></i>
                <p>Configure your unit and click Calculate to see results</p>
            </div>
        `;
    }

    showError(message) {
        const resultsContainer = document.getElementById('dpsResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="results-placeholder">
                <i class="fas fa-exclamation-triangle" style="color: #ff6b6b;"></i>
                <p style="color: #ff6b6b;">${message}</p>
            </div>
        `;
    }

    loadPreset(preset) {
        switch (preset) {
            case 'meta-dps':
                this.loadMetaDPSPreset();
                break;
            case 'balanced':
                this.loadBalancedPreset();
                break;
            case 'tank-killer':
                this.loadTankKillerPreset();
                break;
            case 'crowd-control':
                this.loadCrowdControlPreset();
                break;
        }
    }

    loadMetaDPSPreset() {
        // Find a BROKEN tier DPS unit
        this.currentUnit = this.units.find(u => u.tier === 'BROKEN' && u.type === 'DPS') || 
                          this.units.find(u => u.tier === 'META' && u.type === 'DPS') ||
                          this.units[0];
        this.currentTrait = this.traits.find(t => t.id === 'legendary');
        this.currentLevel = 12;
        this.enemyCount = 5;
        this.updateUI();
        this.calculateDPS();
    }

    loadBalancedPreset() {
        // Find a balanced META tier unit
        this.currentUnit = this.units.find(u => u.tier === 'META' && u.costEfficiency === 'High') ||
                          this.units.find(u => u.tier === 'SUB-META' && u.type === 'DPS') ||
                          this.units[1];
        this.currentTrait = this.traits.find(t => t.id === 'elemental');
        this.currentLevel = 8;
        this.enemyCount = 3;
        this.updateUI();
        this.calculateDPS();
    }

    loadTankKillerPreset() {
        // Find a high damage single-target unit
        this.currentUnit = this.units.find(u => u.type === 'DPS' && u.range === 'Short') ||
                          this.units.find(u => u.tier === 'META' && u.type === 'DPS') ||
                          this.units[2];
        this.currentTrait = this.traits.find(t => t.id === 'berserker');
        this.currentLevel = 10;
        this.enemyCount = 1;
        this.updateUI();
        this.calculateDPS();
    }

    loadCrowdControlPreset() {
        // Find a unit good for multiple enemies
        this.currentUnit = this.units.find(u => u.range === 'Long' && u.type === 'DPS') ||
                          this.units.find(u => u.tier === 'META' && u.type === 'DPS') ||
                          this.units[3];
        this.currentTrait = this.traits.find(t => t.id === 'swift');
        this.currentLevel = 6;
        this.enemyCount = 8;
        this.updateUI();
        this.calculateDPS();
    }
}

// Initialize when DOM is loaded
    // Select unit
    selectUnit(unit) {
        this.currentUnit = unit;
        
        // Update selected state
        document.querySelectorAll('.unit-card-3d').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-unit-id="${unit.id}"]`).classList.add('selected');
        
        // Update unit preview
        this.updateUnitPreview();
        
        // Regenerate recommendations
        this.renderRecommendations();
        
        // Update DPS display
        this.updateDPSDisplay();
    }

    // Update unit preview
    updateUnitPreview() {
        if (!this.currentUnit) return;

        const previewName = document.getElementById('unit-preview-name');
        const previewBadges = document.getElementById('unit-preview-badges');
        
        if (previewName) {
            previewName.textContent = this.currentUnit.name;
        }
        
        if (previewBadges) {
            const rarityClass = `rarity-${this.currentUnit.rarity.toLowerCase()}`;
            previewBadges.innerHTML = `
                <span class="unit-badge ${rarityClass}">${this.currentUnit.rarity}</span>
                ${this.currentUnit.element ? `<span class="unit-badge element-${this.currentUnit.element.toLowerCase()}">${this.currentUnit.element}</span>` : ''}
            `;
        }
    }

    // Select Buff
    selectBuff(type, buff) {
        if (type === 'familiar') {
            this.selectedBuffs.familiar = buff;
            // Update UI state
            document.querySelectorAll('.buff-option[data-buff-type="familiar"]').forEach(option => {
                option.classList.remove('active');
            });
            document.querySelector(`[data-buff-id="${buff.id}"]`).classList.add('active');
        } else if (type === 'element') {
            const index = this.selectedBuffs.elementBuffs.findIndex(b => b.id === buff.id);
            if (index > -1) {
                this.selectedBuffs.elementBuffs.splice(index, 1);
            } else {
                this.selectedBuffs.elementBuffs.push(buff);
            }
            // Update UI state
            document.querySelector(`[data-buff-id="${buff.id}"]`).classList.toggle('active');
        } else if (type === 'passive') {
            const index = this.selectedBuffs.passiveSkills.findIndex(s => s.id === buff.id);
            if (index > -1) {
                this.selectedBuffs.passiveSkills.splice(index, 1);
            } else {
                this.selectedBuffs.passiveSkills.push(buff);
            }
            // Update UI state
            document.querySelector(`[data-buff-id="${buff.id}"]`).classList.toggle('active');
        }
        
        this.updateDPSDisplay();
    }

    // Apply recommendation configuration
    applyRecommendation(rec) {
        this.selectedBuffs = { ...rec.config };
        this.renderBuffSystem();
        this.updateDPSDisplay();
    }

    // Filter units
    filterUnits(searchTerm) {
        const cards = document.querySelectorAll('.unit-card-3d');
        const term = searchTerm.toLowerCase();
        
        cards.forEach(card => {
            const name = card.querySelector('.unit-card-name').textContent.toLowerCase();
            const isVisible = name.includes(term);
            card.style.display = isVisible ? 'block' : 'none';
        });
    }

    // Handle filter button click
    handleFilterClick(button) {
        // Remove active state from other buttons
        button.parentElement.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Apply filter
        const filterType = button.dataset.filter;
        const elementType = button.dataset.element;
        
        if (filterType) {
            this.filterByRarity(filterType);
        } else if (elementType) {
            this.filterByElement(elementType);
        }
    }

    // Filter by rarity
    filterByRarity(rarity) {
        const cards = document.querySelectorAll('.unit-card-3d');
        
        cards.forEach(card => {
            const unitId = card.dataset.unitId;
            const unit = this.units.find(u => u.id === unitId);
            
            if (rarity === 'all' || unit.rarity === rarity) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter by element
    filterByElement(element) {
        const cards = document.querySelectorAll('.unit-card-3d');
        
        cards.forEach(card => {
            const unitId = card.dataset.unitId;
            const unit = this.units.find(u => u.id === unitId);
            
            if (element === 'all' || unit.element === element) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Update DPS display
    updateDPSDisplay() {
        if (!this.currentUnit) {
            document.getElementById('dps-value').textContent = '0';
            return;
        }

        const dps = this.calculateDPS();
        const stats = this.calculateStats();
        
        // Update DPS value
        document.getElementById('dps-value').textContent = this.formatNumber(dps);
        
        // Update stat cards
        document.getElementById('attack-value').textContent = this.formatNumber(stats.attack);
        document.getElementById('speed-value').textContent = this.formatNumber(stats.speed);
        document.getElementById('range-value').textContent = stats.range;
        document.getElementById('survival-value').textContent = this.formatNumber(stats.survival);
        
        // Update change percentages
        this.updateStatChanges(stats);
    }

    // Calculate DPS
    calculateDPS() {
        if (!this.currentUnit) return 0;

        let attack = this.currentUnit.baseAttack || 100;
        let speed = this.currentUnit.baseSpeed || 1.0;
        
        // Apply level bonus
        const levelMultiplier = 1 + (this.currentLevel - 1) * 0.1;
        attack *= levelMultiplier;
        speed *= levelMultiplier;
        
        // Apply Familiar bonus
        if (this.selectedBuffs.familiar) {
            attack *= (1 + this.selectedBuffs.familiar.attackBonus);
            speed *= (1 + this.selectedBuffs.familiar.speedBonus);
        }
        
        // Apply element Buff bonus
        this.selectedBuffs.elementBuffs.forEach(buff => {
            if (buff.element === this.currentUnit.element) {
                attack *= (1 + (buff.attackBonus || 0));
                speed *= (1 + (buff.speedBonus || 0));
            }
        });
        
        // Apply passive skill bonus
        this.selectedBuffs.passiveSkills.forEach(skill => {
            attack *= (1 + (skill.attackBonus || 0));
            speed *= (1 + (skill.speedBonus || 0));
        });
        
        return attack * speed;
    }

    // Calculate detailed stats
    calculateStats() {
        if (!this.currentUnit) return { attack: 0, speed: 0, range: 'Medium', survival: 0 };

        let attack = this.currentUnit.baseAttack || 100;
        let speed = this.currentUnit.baseSpeed || 1.0;
        let survival = 1000; // Base health
        
        // Apply various bonuses...
        const levelMultiplier = 1 + (this.currentLevel - 1) * 0.1;
        attack *= levelMultiplier;
        speed *= levelMultiplier;
        survival *= levelMultiplier;
        
        return {
            attack: Math.round(attack),
            speed: Math.round(speed * 100) / 100,
            range: this.currentUnit.range || 'Medium',
            survival: Math.round(survival)
        };
    }

    // Update stat changes
    updateStatChanges(stats) {
        // Here you can add comparison calculation with base values
        document.getElementById('attack-change').textContent = '+0%';
        document.getElementById('speed-change').textContent = '+0%';
        document.getElementById('range-change').textContent = '+0%';
        document.getElementById('survival-change').textContent = '+0%';
    }

    // Format number
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return Math.round(num).toString();
    }

    // Configuration management methods
    saveConfiguration() {
        const config = {
            unit: this.currentUnit,
            level: this.currentLevel,
            upgrade: this.currentUpgrade,
            buffs: this.selectedBuffs,
            timestamp: new Date().toISOString()
        };
        
        const configs = JSON.parse(localStorage.getItem('dps-configs') || '[]');
        configs.push(config);
        localStorage.setItem('dps-configs', JSON.stringify(configs));
        
        alert('Configuration saved!');
    }

    loadConfiguration() {
        const configs = JSON.parse(localStorage.getItem('dps-configs') || '[]');
        if (configs.length === 0) {
            alert('No saved configurations!');
            return;
        }
        
        // Here you can add configuration selection interface
        const latestConfig = configs[configs.length - 1];
        this.applyConfiguration(latestConfig);
    }

    applyConfiguration(config) {
        this.currentUnit = config.unit;
        this.currentLevel = config.level;
        this.currentUpgrade = config.upgrade;
        this.selectedBuffs = config.buffs;
        
        this.renderUnits();
        this.renderBuffSystem();
        this.updateDPSDisplay();
    }

    shareConfiguration() {
        const config = {
            unit: this.currentUnit?.id,
            level: this.currentLevel,
            upgrade: this.currentUpgrade,
            buffs: this.selectedBuffs
        };
        
        const shareUrl = `${window.location.origin}${window.location.pathname}?config=${encodeURIComponent(JSON.stringify(config))}`;
        
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Configuration link copied to clipboard!');
        });
    }
}

// Debug mode toggle
function toggleDebugMode() {
    window.DEBUG_MODE = !window.DEBUG_MODE;
    console.log(`Debug mode: ${window.DEBUG_MODE ? 'enabled' : 'disabled'}`);
    
    // Update button display
    const debugBtn = document.getElementById('debug-toggle');
    if (debugBtn) {
        debugBtn.textContent = window.DEBUG_MODE ? 'Disable Debug' : 'Enable Debug';
        debugBtn.className = window.DEBUG_MODE ? 'btn btn-warning' : 'btn btn-secondary';
    }
}

// Quick validation of all character data
function quickValidateAll() {
    console.log('🔍 Starting quick validation of all character data...');
    
    const units = window.UnitDatabaseData?.loadAllUnits() || [];
    let validCount = 0;
    let warningCount = 0;
    
    units.forEach(unit => {
        const maxDPSValue = window.extractDPSValue(unit.maxDPS);
        if (maxDPSValue > 0) {
            // Calculate DPS at level 60 with max upgrades
            const result = window.calculateDPS({
                selectedUnit: unit,
                level: 60,
                upgradeLevel: 5
            });
            
            const ratio = result.dps / maxDPSValue;
            if (ratio > 0.5 && ratio < 2.0) {
                validCount++;
            } else {
                warningCount++;
                console.warn(`⚠️ ${unit.name}: Calculated DPS(${result.dps}) vs Database maxDPS(${maxDPSValue}) = ${ratio.toFixed(2)}`);
            }
        }
    });
    
    console.log(`✅ Validation complete: ${validCount} normal, ${warningCount} abnormal`);
    alert(`Validation complete!\nNormal: ${validCount}\nAbnormal: ${warningCount}\nCheck console for detailed results`);
}

// Add debug control buttons
function addDebugControls() {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'debug-controls';
    controlsDiv.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 1000;
        background: rgba(0,0,0,0.8);
        padding: 10px;
        border-radius: 5px;
        color: white;
    `;
    
    controlsDiv.innerHTML = `
        <button id="debug-toggle" class="btn btn-secondary" onclick="toggleDebugMode()">Enable Debug</button>
        <button class="btn btn-info" onclick="quickValidateAll()" style="margin-left: 5px;">Quick Validate</button>
    `;
    
    document.body.appendChild(controlsDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('calculatorPage')) {
        window.dpsCalculator = new DPSCalculatorPage();
        
        // Add debug controls
        addDebugControls();
    }
});
