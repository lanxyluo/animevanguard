class ConfigPanel {
    constructor(onConfigChange) {
        this.onConfigChange = onConfigChange;
        this.init();
    }

    init() {
        this.bindLevelSlider();
        this.bindUpgradeSelect();
    }

    bindLevelSlider() {
        const levelSlider = document.getElementById('level-slider');
        const levelValue = document.getElementById('level-value');
        
        if (!levelSlider || !levelValue) return;

        levelSlider.addEventListener('input', (e) => {
            const level = parseInt(e.target.value);
            levelValue.textContent = level;
            this.onConfigChange({ level });
        });
    }

    bindUpgradeSelect() {
        const upgradeSelect = document.getElementById('upgrade-select');
        if (!upgradeSelect) return;

        // 生成升级选项
        this.generateUpgradeOptions(upgradeSelect);

        upgradeSelect.addEventListener('change', (e) => {
            const upgradeLevel = parseInt(e.target.value);
            this.onConfigChange({ upgradeLevel });
        });
    }

    generateUpgradeOptions(selectElement) {
        selectElement.innerHTML = '';
        
        for (let i = 0; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Upgrade ${i}`;
            selectElement.appendChild(option);
        }
    }

    updateForUnit(unit) {
        // 根据角色更新配置选项
        if (!unit) return;

        // 显示选中角色信息
        const infoPanel = document.getElementById('selected-unit-info');
        const nameEl = document.getElementById('selected-unit-name');
        const rarityEl = document.getElementById('selected-unit-rarity');
        const imageEl = document.getElementById('selected-unit-image');
        
        if (infoPanel && nameEl && rarityEl && imageEl) {
            nameEl.textContent = unit.name;
            rarityEl.textContent = unit.rarity;
            imageEl.src = unit.image || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23374151'/%3E%3Ctext x='32' y='32' text-anchor='middle' dy='0.35em' font-family='Arial' font-size='24' fill='%23fff'%3E${unit.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
            infoPanel.classList.remove('hidden');
        }

        // 更新升级选项
        const upgradeSelect = document.getElementById('upgrade-select');
        if (upgradeSelect && unit.baseStats) {
            upgradeSelect.innerHTML = '';
            Object.keys(unit.baseStats).forEach(key => {
                const option = document.createElement('option');
                const upgradeNum = key.replace('upgrade_', '');
                option.value = upgradeNum;
                option.textContent = `Upgrade ${upgradeNum}`;
                upgradeSelect.appendChild(option);
            });
        } else if (upgradeSelect) {
            // 如果没有baseStats，生成默认选项
            this.generateUpgradeOptions(upgradeSelect);
        }

        const levelSlider = document.getElementById('level-slider');
        if (levelSlider) {
            // 根据角色稀有度设置最大等级
            const maxLevel = this.getMaxLevelForRarity(unit.rarity);
            levelSlider.max = maxLevel;
            
            // 重置到等级1
            levelSlider.value = 1;
            document.getElementById('level-value').textContent = '1';
        }
    }

    getMaxLevelForRarity(rarity) {
        const maxLevels = {
            'Vanguard': 60,
            'Secret': 50,
            'Mythic': 40,
            'Epic': 30
        };
        return maxLevels[rarity] || 30;
    }
}

// 导出到全局变量
window.ConfigPanel = ConfigPanel;
