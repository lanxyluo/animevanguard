// DPS Calculator utility functions
// Used to calculate unit DPS, attack power, attack speed and other attributes

// Game configuration parameters
const GAME_CONFIG = {
    levelGrowthRate: 0.08, // 8% growth per level
    baseAttackInterval: 1.0, // Base attack interval
    rarityMultipliers: {
        'Vanguard': 1.5,
        'Secret': 1.3,
        'Mythic': 1.15,
        'Epic': 1.0,
        'Rare': 0.85,
        'Common': 0.7
    },
    baseDPSMapping: {
        'Very High': 50000,
        'High': 25000,
        'Medium': 12000,
        'Low': 6000
    }
};

/**
 * Extract numeric value from DPS string
 * @param {string} dpsString - DPS string, e.g. "190k+ with summon abilities"
 * @returns {number} Extracted numeric value
 */
function extractDPSValue(dpsString) {
    if (!dpsString || typeof dpsString !== 'string') {
        return 0;
    }
    
    // Extract numeric part, supports k, K, m, M units
    const match = dpsString.match(/(\d+(?:\.\d+)?)\s*([km]?)/i);
    if (!match) {
        return 0;
    }
    
    let value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    
    // Convert units
    switch (unit) {
        case 'k':
            value *= 1000;
            break;
        case 'm':
            value *= 1000000;
            break;
        default:
            // No unit，Keep original value
            break;
    }
    
    return Math.floor(value);
}

/**
 * FrombaseDPSGet base value from text description
 * @param {string} baseDPS - BaseDPSDescription
 * @returns {number} BaseDPSValue
 */
function getBaseDPSValue(baseDPS) {
    if (!baseDPS || typeof baseDPS !== 'string') {
        return GAME_CONFIG.baseDPSMapping['Medium']; // Default medium
    }
    
    return GAME_CONFIG.baseDPSMapping[baseDPS] || GAME_CONFIG.baseDPSMapping['Medium'];
}

/**
 * CalculateBaseAttack power
 * @param {Object} unit - Unit data
 * @param {number} level - Level
 * @returns {number} BaseAttack power
 */
function calculateBaseAttack(unit, level) {
    // FrombaseDPSGetBaseAttack power
    const baseDPS = getBaseDPSValue(unit.baseDPS);
    
    // LevelGrowth：Increase per level8%
    const levelMultiplier = 1 + (level - 1) * GAME_CONFIG.levelGrowthRate;
    
    // Rarity bonus
    const rarityMultiplier = GAME_CONFIG.rarityMultipliers[unit.rarity] || 1.0;
    
    const baseAttack = baseDPS * levelMultiplier * rarityMultiplier;
    
    // Debug mode：Show detailedCalculateProcess
    if (window.DEBUG_MODE) {
        console.log(`[DEBUG] ${unit.name} BaseAttack powerCalculate:`, {
            baseDPS,
            level,
            levelMultiplier: levelMultiplier.toFixed(3),
            rarityMultiplier,
            result: Math.floor(baseAttack)
        });
    }
    
    return Math.floor(baseAttack);
}

/**
 * CalculateBaseAttack speed
 * @param {Object} unit - Unit data
 * @param {number} level - Level
 * @returns {number} Attack speed
 */
function calculateBaseSpeed(unit, level) {
    // BaseAttack speed，Level影响较小
    const baseSpeed = GAME_CONFIG.baseAttackInterval;
    const levelMultiplier = 1 + (level - 1) * 0.02; // Increase per level2%Attack speed
    
    const attackSpeed = baseSpeed / levelMultiplier; // Attack interval = BaseInterval / Speed multiplier
    
    if (window.DEBUG_MODE) {
        console.log(`[DEBUG] ${unit.name} Attack speedCalculate:`, {
            baseSpeed,
            level,
            levelMultiplier: levelMultiplier.toFixed(3),
            attackInterval: attackSpeed.toFixed(3)
        });
    }
    
    return attackSpeed;
}

/**
 * CalculateDPS
 * @param {Object} state - State object
 * @returns {Object} Calculate结果
 */
function calculateDPS(state) {
    const { selectedUnit, level, upgradeLevel, buffs = {} } = state;
    
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

    // ValidateUnit data
    const validation = validateUnitData(selectedUnit);
    if (!validation.isValid) {
        console.warn(`[WARNING] Unit data不完整: ${selectedUnit.name}`, validation.issues);
    }

    // CalculateBaseAttack power
    let baseAttack = calculateBaseAttack(selectedUnit, level);
    
    // CalculateAttack interval
    let attackInterval = calculateBaseSpeed(selectedUnit, level);
    
    // Upgrade bonus
    const upgradeMultiplier = 1 + upgradeLevel * 0.2; // Increase per upgrade20%
    const upgradeSpeedMultiplier = 1 + upgradeLevel * 0.1; // 升级减少Attack interval
    
    // ApplyUpgrade bonus
    baseAttack *= upgradeMultiplier;
    attackInterval /= upgradeSpeedMultiplier;
    
    // ApplyBuffBonus
    if (buffs.attack) {
        baseAttack *= buffs.attack;
    }
    if (buffs.speed) {
        attackInterval /= buffs.speed;
    }
    
    // FinalDPSCalculate
    const finalDPS = baseAttack / attackInterval;
    
    // Get射程信息
    const range = getRangeValue(selectedUnit.range);

    // Data validation：对比Calculate结果与DatabasemaxDPS
    const maxDPSValue = extractDPSValue(selectedUnit.maxDPS);
    if (maxDPSValue > 0) {
        const ratio = finalDPS / maxDPSValue;
        if (window.DEBUG_MODE) {
            console.log(`[Validate] ${selectedUnit.name}:`, {
                CalculateDPS: Math.round(finalDPS),
                DatabasemaxDPS: maxDPSValue,
                Ratio: ratio.toFixed(3),
                Status: ratio > 0.5 && ratio < 2.0 ? '✅ Normal' : '⚠️ Abnormal'
            });
        }
    }

    if (window.DEBUG_MODE) {
        console.log(`[DEBUG] ${selectedUnit.name} FinalDPSCalculate:`, {
            baseAttack: Math.round(baseAttack),
            upgradeMultiplier,
            attackInterval: attackInterval.toFixed(3),
            upgradeSpeedMultiplier,
            buffs,
            finalDPS: Math.round(finalDPS),
            range
        });
    }

    return {
        dps: Math.round(finalDPS),
        baseDamage: Math.round(baseAttack),
        attackSpeed: attackInterval.toFixed(2),
        range: range,
        level: level,
        upgradeLevel: upgradeLevel,
        rarity: selectedUnit.rarity,
        element: selectedUnit.element
    };
}

/**
 * Get射程Value
 * @param {string|number} range - 射程Description或Value
 * @returns {number} 射程Value
 */
function getRangeValue(range) {
    if (typeof range === 'number') {
        return range;
    }
    
    if (typeof range === 'string') {
        // 提取数字，如 "Ultra long range (160)" -> 160
        const match = range.match(/(\d+)/);
        if (match) {
            return parseInt(match[1]);
        }
        
        // 文字Description映射
        const rangeMapping = {
            'Long': 120,
            'Medium': 80,
            'Short': 40,
            'Very Long': 150,
            'Very Short': 20
        };
        
        return rangeMapping[range] || 80; // Default medium射程
    }
    
    return 80; // 默认射程
}

/**
 * Get稀有度倍数
 * @param {string} rarity - 稀有度
 * @returns {number} 倍数
 */
function getRarityMultiplier(rarity) {
    return GAME_CONFIG.rarityMultipliers[rarity] || 1.0;
}

/**
 * ValidateUnit data完整性
 * @param {Object} unit - Unit data
 * @returns {Object} Validate结果
 */
function validateUnitData(unit) {
    const issues = [];
    const warnings = [];
    
    // 必需字段检查
    const requiredFields = {
        'id': 'ID',
        'name': '名称',
        'rarity': '稀有度',
        'tier': 'Level',
        'element': '元素',
        'type': '类型',
        'deploymentCost': '部署成本',
        'maxUpgradeCost': '最大升级成本',
        'baseDPS': 'BaseDPS',
        'maxDPS': '最大DPS',
        'range': '射程'
    };
    
    // 检查必需字段
    Object.entries(requiredFields).forEach(([field, displayName]) => {
        if (!unit[field] && unit[field] !== 0) {
            issues.push(`缺少${displayName}`);
        }
    });
    
    // 数据类型检查
    if (unit.deploymentCost && typeof unit.deploymentCost !== 'number') {
        issues.push('部署成本必须是数字');
    }
    if (unit.maxUpgradeCost && typeof unit.maxUpgradeCost !== 'number') {
        issues.push('最大升级成本必须是数字');
    }
    
    // 稀有度有效性检查
    const validRarities = ['Vanguard', 'Secret', 'Mythic', 'Epic', 'Rare', 'Common'];
    if (unit.rarity && !validRarities.includes(unit.rarity)) {
        warnings.push(`未知稀有度: ${unit.rarity}`);
    }
    
    // Level有效性检查
    const validTiers = ['BROKEN', 'META', 'SUB-META', 'DECENT', 'LOW'];
    if (unit.tier && !validTiers.includes(unit.tier)) {
        warnings.push(`未知Level: ${unit.tier}`);
    }
    
    // 元素有效性检查
    const validElements = ['Dark', 'Holy', 'Fire', 'Nature', 'Water', 'Wind', 'Unknown'];
    if (unit.element && !validElements.includes(unit.element)) {
        warnings.push(`未知元素: ${unit.element}`);
    }
    
    // 类型有效性检查
    const validTypes = ['DPS', 'Support', 'Farm', 'Buffer'];
    if (unit.type && !validTypes.includes(unit.type)) {
        warnings.push(`未知类型: ${unit.type}`);
    }
    
    // DPS格式检查
    if (unit.baseDPS && typeof unit.baseDPS === 'string') {
        const validBaseDPS = ['Very High', 'High', 'Medium', 'Low'];
        if (!validBaseDPS.includes(unit.baseDPS)) {
            warnings.push(`未知BaseDPSLevel: ${unit.baseDPS}`);
        }
    }
    
    // 射程格式检查
    if (unit.range && typeof unit.range === 'string') {
        const validRanges = ['Long', 'Medium', 'Short', 'Very Long', 'Very Short'];
        if (!validRanges.includes(unit.range) && !unit.range.match(/\d+/)) {
            warnings.push(`未知射程Description: ${unit.range}`);
        }
    }
    
    return {
        isValid: issues.length === 0,
        issues: issues,
        warnings: warnings,
        hasWarnings: warnings.length > 0
    };
}

// Calculate角色在不同Level下的DPS曲线
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

// Calculate最优升级策略
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

/**
 * 标准化数据转换函数
 * 将Database格式转换为Calculate器需要的格式
 * @param {Object} rawUnit - 原始Unit data
 * @returns {Object} 标准化后的Unit data
 */
function normalizeUnitData(rawUnit) {
    if (!rawUnit || typeof rawUnit !== 'object') {
        console.error('Invalid unit data provided to normalizeUnitData');
        return null;
    }
    
    // 创建标准化单位对象
    const normalizedUnit = {
        // 基本信息
        id: rawUnit.id || `unit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: rawUnit.name || 'Unknown Unit',
        rarity: rawUnit.rarity || 'Common',
        tier: rawUnit.tier || 'DECENT',
        element: rawUnit.element || 'Unknown',
        type: rawUnit.type || 'DPS',
        
        // Value属性
        deploymentCost: typeof rawUnit.deploymentCost === 'number' ? rawUnit.deploymentCost : 1000,
        maxUpgradeCost: typeof rawUnit.maxUpgradeCost === 'number' ? rawUnit.maxUpgradeCost : 50000,
        
        // DPS相关
        baseDPS: rawUnit.baseDPS || 'Medium',
        maxDPS: rawUnit.maxDPS || '50k+',
        baseDPSValue: getBaseDPSValue(rawUnit.baseDPS || 'Medium'),
        maxDPSValue: extractDPSValue(rawUnit.maxDPS || '50k+'),
        
        // 战斗属性
        range: rawUnit.range || 'Medium',
        rangeValue: getRangeValue(rawUnit.range || 'Medium'),
        
        // 成本效率
        costEfficiency: rawUnit.costEfficiency || 'Medium',
        
        // Description信息
        description: rawUnit.description || 'No description available',
        pros: Array.isArray(rawUnit.pros) ? rawUnit.pros : [],
        cons: Array.isArray(rawUnit.cons) ? rawUnit.cons : [],
        
        // Get方式
        obtainMethod: rawUnit.obtainMethod || 'Unknown',
        availability: rawUnit.availability || 'Permanent',
        
        // 进化信息
        evolutionPath: rawUnit.evolutionPath || '',
        isEvolution: Boolean(rawUnit.isEvolution),
        baseForm: rawUnit.baseForm || '',
        
        // 标签
        tags: Array.isArray(rawUnit.tags) ? rawUnit.tags : [],
        
        // 图片
        image: rawUnit.image || null,
        
        // Calculate属性
        rarityMultiplier: getRarityMultiplier(rawUnit.rarity || 'Common'),
        
        // 元数据
        lastUpdated: new Date().toISOString(),
        dataVersion: '1.0'
    };
    
    // Validate转换后的数据
    const validation = validateUnitData(normalizedUnit);
    if (!validation.isValid) {
        console.warn(`[WARNING] 标准化后的Unit data仍有问题: ${normalizedUnit.name}`, validation.issues);
    }
    
    return normalizedUnit;
}

/**
 * 批量标准化Unit data
 * @param {Array} rawUnits - 原始Unit data数组
 * @returns {Array} 标准化后的Unit data数组
 */
function normalizeUnitsData(rawUnits) {
    if (!Array.isArray(rawUnits)) {
        console.error('Invalid units data provided to normalizeUnitsData');
        return [];
    }
    
    const normalizedUnits = [];
    const errors = [];
    
    rawUnits.forEach((rawUnit, index) => {
        try {
            const normalizedUnit = normalizeUnitData(rawUnit);
            if (normalizedUnit) {
                normalizedUnits.push(normalizedUnit);
            } else {
                errors.push(`Failed to normalize unit at index ${index}`);
            }
        } catch (error) {
            console.error(`Error normalizing unit at index ${index}:`, error);
            errors.push(`Error normalizing unit at index ${index}: ${error.message}`);
        }
    });
    
    if (errors.length > 0) {
        console.warn(`[WARNING] ${errors.length} units failed to normalize:`, errors);
    }
    
    console.log(`[INFO] Successfully normalized ${normalizedUnits.length}/${rawUnits.length} units`);
    
    return normalizedUnits;
}

/**
 * Get默认Unit data
 * @returns {Object} 默认Unit data
 */
function getDefaultUnitData() {
    return {
        id: 'default-unit',
        name: 'Default Unit',
        rarity: 'Common',
        tier: 'DECENT',
        element: 'Unknown',
        type: 'DPS',
        deploymentCost: 1000,
        maxUpgradeCost: 50000,
        baseDPS: 'Medium',
        maxDPS: '50k+',
        range: 'Medium',
        costEfficiency: 'Medium',
        description: 'Default unit for testing purposes',
        pros: ['Default advantage'],
        cons: ['Default limitation'],
        obtainMethod: 'Default',
        availability: 'Permanent',
        evolutionPath: '',
        isEvolution: false,
        baseForm: '',
        tags: ['default'],
        image: null
    };
}

/**
 * 数据完整性检查
 * @param {Array} units - Unit data数组
 * @returns {Object} 检查结果
 */
function checkDataIntegrity(units) {
    const report = {
        totalUnits: units.length,
        validUnits: 0,
        invalidUnits: 0,
        warnings: 0,
        issues: [],
        statistics: {
            rarityCounts: {},
            tierCounts: {},
            elementCounts: {},
            typeCounts: {}
        }
    };
    
    units.forEach((unit, index) => {
        const validation = validateUnitData(unit);
        
        if (validation.isValid) {
            report.validUnits++;
        } else {
            report.invalidUnits++;
            report.issues.push({
                index: index,
                name: unit.name || 'Unknown',
                issues: validation.issues
            });
        }
        
        if (validation.hasWarnings) {
            report.warnings++;
        }
        
        // 统计信息
        if (unit.rarity) {
            report.statistics.rarityCounts[unit.rarity] = (report.statistics.rarityCounts[unit.rarity] || 0) + 1;
        }
        if (unit.tier) {
            report.statistics.tierCounts[unit.tier] = (report.statistics.tierCounts[unit.tier] || 0) + 1;
        }
        if (unit.element) {
            report.statistics.elementCounts[unit.element] = (report.statistics.elementCounts[unit.element] || 0) + 1;
        }
        if (unit.type) {
            report.statistics.typeCounts[unit.type] = (report.statistics.typeCounts[unit.type] || 0) + 1;
        }
    });
    
    return report;
}

// 导出到全局变量
window.calculateDPS = calculateDPS;
window.calculateDPSCurve = calculateDPSCurve;
window.calculateOptimalUpgrade = calculateOptimalUpgrade;
window.GAME_CONFIG = GAME_CONFIG;
window.extractDPSValue = extractDPSValue;
window.validateUnitData = validateUnitData;
window.normalizeUnitData = normalizeUnitData;
window.normalizeUnitsData = normalizeUnitsData;
window.getDefaultUnitData = getDefaultUnitData;
window.checkDataIntegrity = checkDataIntegrity;