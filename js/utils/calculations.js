function calculateDPS(state) {
    const { selectedUnit, level, upgradeLevel } = state;
    
    if (!selectedUnit) {
        return {
            dps: 0,
            baseDamage: 0,
            attackSpeed: 0,
            range: 0,
            level: 1,
            upgradeLevel: 0
        };
    }

    // 基础数据
    const baseDamage = selectedUnit.baseDPS || 1000;
    const baseAttackSpeed = 1.0; // 默认攻击速度
    const baseRange = selectedUnit.range || 100;

    // 等级加成计算
    const levelMultiplier = 1 + (level - 1) * 0.1; // 每级增加10%
    const upgradeMultiplier = 1 + upgradeLevel * 0.2; // 每次升级增加20%

    // 稀有度加成
    const rarityMultiplier = getRarityMultiplier(selectedUnit.rarity);

    // 最终计算
    const finalDamage = baseDamage * levelMultiplier * upgradeMultiplier * rarityMultiplier;
    const finalAttackSpeed = baseAttackSpeed / (1 + upgradeLevel * 0.1); // 升级减少攻击间隔
    const finalDPS = finalDamage / finalAttackSpeed;

    return {
        dps: Math.round(finalDPS),
        baseDamage: Math.round(finalDamage),
        attackSpeed: finalAttackSpeed.toFixed(2),
        range: baseRange,
        level: level,
        upgradeLevel: upgradeLevel,
        rarity: selectedUnit.rarity,
        element: selectedUnit.element
    };
}

function getRarityMultiplier(rarity) {
    const multipliers = {
        'Vanguard': 2.0,
        'Secret': 1.5,
        'Mythic': 1.2,
        'Epic': 1.0
    };
    return multipliers[rarity] || 1.0;
}

// 计算角色在不同等级下的DPS曲线
function calculateDPSCurve(unit, maxLevel = 60) {
    const curve = [];
    
    for (let level = 1; level <= maxLevel; level++) {
        const dps = calculateDPS({
            selectedUnit: unit,
            level: level,
            upgradeLevel: 0
        });
        curve.push({
            level: level,
            dps: dps.dps
        });
    }
    
    return curve;
}

// 计算最优升级策略
function calculateOptimalUpgrade(unit, targetLevel, availableUpgrades) {
    const strategies = [];
    
    for (let upgrades = 0; upgrades <= availableUpgrades; upgrades++) {
        const dps = calculateDPS({
            selectedUnit: unit,
            level: targetLevel,
            upgradeLevel: upgrades
        });
        
        strategies.push({
            upgrades: upgrades,
            dps: dps.dps,
            cost: upgrades * 1000, // 假设每次升级成本
            efficiency: dps.dps / (upgrades * 1000 + 1) // DPS/成本比
        });
    }
    
    // 按效率排序
    return strategies.sort((a, b) => b.efficiency - a.efficiency);
}

// 导出到全局变量
window.calculateDPS = calculateDPS;
window.calculateDPSCurve = calculateDPSCurve;
window.calculateOptimalUpgrade = calculateOptimalUpgrade;
