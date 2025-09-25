class ConfigPanel {
    constructor(onConfigChange) {
        this.onConfigChange = onConfigChange;
        this.currentUnit = null;
        this.init();
    }

    init() {
        this.bindLevelSlider();
        this.bindUpgradeSelect();
        this.bindBuffOptions();
    }

    bindLevelSlider() {
        const levelSlider = document.getElementById('level-slider');
        const levelValue = document.getElementById('level-value');
        
        if (!levelSlider || !levelValue) return;

        // Add real-time updates
        levelSlider.addEventListener('input', (e) => {
            const level = parseInt(e.target.value);
            levelValue.textContent = level;
            
            // Add visual feedback
            levelSlider.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(level / levelSlider.max) * 100}%, #374151 ${(level / levelSlider.max) * 100}%, #374151 100%)`;
            
            this.onConfigChange({ 
                level,
                upgradeLevel: this.getUpgradeLevel(),
                buffs: this.getActiveBuffs()
            });
        });

        // Initialize slider style
        levelSlider.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 0%, #374151 0%, #374151 100%)`;
    }

    bindUpgradeSelect() {
        const upgradeSlider = document.getElementById('upgrade-slider');
        const upgradeValue = document.getElementById('upgrade-value');
        
        if (!upgradeSlider || !upgradeValue) return;

        upgradeSlider.addEventListener('input', (e) => {
            const upgradeLevel = parseInt(e.target.value);
            upgradeValue.textContent = upgradeLevel;
            
            // Add visual feedback
            upgradeSlider.style.background = `linear-gradient(to right, #10b981 0%, #10b981 ${(upgradeLevel / upgradeSlider.max) * 100}%, #374151 ${(upgradeLevel / upgradeSlider.max) * 100}%, #374151 100%)`;
            
            this.onConfigChange({ 
                level: this.getLevel(),
                upgradeLevel,
                buffs: this.getActiveBuffs()
            });
        });

        // Initialize slider style
        upgradeSlider.style.background = `linear-gradient(to right, #10b981 0%, #10b981 0%, #374151 0%, #374151 100%)`;
    }

    bindBuffOptions() {
        const buffCheckboxes = document.querySelectorAll('.buff-option input[type="checkbox"]');
        buffCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.onConfigChange({ 
                    level: this.getLevel(),
                    upgradeLevel: this.getUpgradeLevel(),
                    buffs: this.getActiveBuffs()
                });
            });
        });
    }

    getLevel() {
        const levelSlider = document.getElementById('level-slider');
        return levelSlider ? parseInt(levelSlider.value) : 1;
    }

    getUpgradeLevel() {
        const upgradeSlider = document.getElementById('upgrade-slider');
        return upgradeSlider ? parseInt(upgradeSlider.value) : 0;
    }

    getActiveBuffs() {
        const buffs = {};
        const attackBuff = document.getElementById('attack-buff');
        const speedBuff = document.getElementById('speed-buff');
        const critBuff = document.getElementById('crit-buff');

        if (attackBuff && attackBuff.checked) {
            buffs.attack = parseFloat(attackBuff.value);
        }
        if (speedBuff && speedBuff.checked) {
            buffs.speed = parseFloat(speedBuff.value);
        }
        if (critBuff && critBuff.checked) {
            buffs.crit = parseFloat(critBuff.value);
        }

        return buffs;
    }

    updateForUnit(unit) {
        this.currentUnit = unit;
        
        if (!unit) {
            this.resetDisplay();
            return;
        }

        // Update unit preview
        this.updateUnitPreview(unit);

        // Update level slider
        this.updateLevelSlider(unit);

        // Reset configuration
        this.resetConfig();
    }

    updateUnitPreview(unit) {
        const nameEl = document.getElementById('unit-preview-name');
        const badgesEl = document.getElementById('unit-preview-badges');
        const imageEl = document.getElementById('unit-preview-image');

        if (nameEl) {
            nameEl.textContent = unit.name;
        }

        if (badgesEl) {
            badgesEl.innerHTML = this.generateUnitBadges(unit);
        }

        if (imageEl) {
            imageEl.src = unit.image || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23374151'/%3E%3Ctext x='60' y='60' text-anchor='middle' dy='0.35em' font-family='Arial' font-size='48' fill='%23fff'%3E${unit.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
        }
    }

    generateUnitBadges(unit) {
        const badges = [];
        
        // Rarity badge
        if (unit.rarity) {
            badges.push(`<span class="unit-badge rarity-${unit.rarity.toLowerCase()}">${unit.rarity}</span>`);
        }
        
        // Level badge
        if (unit.tier) {
            badges.push(`<span class="unit-badge tier-${unit.tier.toLowerCase()}">${unit.tier}</span>`);
        }
        
        // Type badge
        if (unit.type) {
            badges.push(`<span class="unit-badge type-${unit.type.toLowerCase()}">${unit.type}</span>`);
        }
        
        // Element badge
        if (unit.element) {
            badges.push(`<span class="unit-badge element-${unit.element.toLowerCase()}">${unit.element}</span>`);
        }

        return badges.join('');
    }

    updateLevelSlider(unit) {
        const levelSlider = document.getElementById('level-slider');
        if (!levelSlider) return;

        const maxLevel = this.getMaxLevelForRarity(unit.rarity);
        levelSlider.max = maxLevel;
        levelSlider.value = 1;
        
        const levelValue = document.getElementById('level-value');
        if (levelValue) {
            levelValue.textContent = '1';
        }
    }

    resetConfig() {
        // Reset upgrade slider
        const upgradeSlider = document.getElementById('upgrade-slider');
        const upgradeValue = document.getElementById('upgrade-value');
        if (upgradeSlider) {
            upgradeSlider.value = '0';
            upgradeSlider.style.background = `linear-gradient(to right, #10b981 0%, #10b981 0%, #374151 0%, #374151 100%)`;
        }
        if (upgradeValue) {
            upgradeValue.textContent = '0';
        }

        // ResetBuffOptions
        const buffCheckboxes = document.querySelectorAll('.buff-option input[type="checkbox"]');
        buffCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    resetDisplay() {
        const nameEl = document.getElementById('unit-preview-name');
        const badgesEl = document.getElementById('unit-preview-badges');
        const imageEl = document.getElementById('unit-preview-image');

        if (nameEl) nameEl.textContent = 'Select a unit';
        if (badgesEl) badgesEl.innerHTML = '';
        if (imageEl) imageEl.src = '';

        this.resetConfig();
    }

    getMaxLevelForRarity(rarity) {
        const maxLevels = {
            'Vanguard': 60,
            'Secret': 50,
            'Mythic': 40,
            'Legendary': 30,
            'Epic': 25
        };
        return maxLevels[rarity] || 30;
    }
}

// Export to global variables
window.ConfigPanel = ConfigPanel;
