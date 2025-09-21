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
