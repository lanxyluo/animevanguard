/**
 * 数据统计工具
 * 用于验证和管理角色数据
 */

class DataStats {
    constructor() {
        this.unitsData = null;
        this.databaseData = null;
    }

    /**
     * 加载数据
     */
    async loadData() {
        try {
            // 动态导入数据文件
            const unitsModule = await import('../config/units.js');
            const databaseModule = await import('../config/unit-database-data.js');
            
            this.unitsData = unitsModule.unitsData;
            this.databaseData = databaseModule.unitDatabaseData;
            
            console.log('✅ 数据加载完成');
            return true;
        } catch (error) {
            console.error('❌ 数据加载失败:', error);
            return false;
        }
    }

    /**
     * 获取基本统计信息
     */
    getBasicStats() {
        if (!this.unitsData || !this.databaseData) {
            console.error('❌ 数据未加载');
            return null;
        }

        const units = this.unitsData.units || [];
        const dbUnits = this.databaseData || [];

        const stats = {
            totalUnits: units.length,
            databaseUnits: dbUnits.length,
            rarityDistribution: this.getRarityDistribution(units),
            tierDistribution: this.getTierDistribution(dbUnits),
            elementDistribution: this.getElementDistribution(units),
            typeDistribution: this.getTypeDistribution(units)
        };

        return stats;
    }

    /**
     * 按稀有度分布统计
     */
    getRarityDistribution(units) {
        const distribution = {};
        units.forEach(unit => {
            const rarity = unit.rarity || 'Unknown';
            distribution[rarity] = (distribution[rarity] || 0) + 1;
        });
        return distribution;
    }

    /**
     * 按强度分布统计
     */
    getTierDistribution(units) {
        const distribution = {};
        units.forEach(unit => {
            const tier = unit.tier || 'Unknown';
            distribution[tier] = (distribution[tier] || 0) + 1;
        });
        return distribution;
    }

    /**
     * 按元素分布统计
     */
    getElementDistribution(units) {
        const distribution = {};
        units.forEach(unit => {
            const element = unit.element || 'Unknown';
            distribution[element] = (distribution[element] || 0) + 1;
        });
        return distribution;
    }

    /**
     * 按类型分布统计
     */
    getTypeDistribution(units) {
        const distribution = {};
        units.forEach(unit => {
            const type = unit.type || 'Unknown';
            distribution[type] = (distribution[type] || 0) + 1;
        });
        return distribution;
    }

    /**
     * 验证数据完整性
     */
    validateData() {
        if (!this.unitsData || !this.databaseData) {
            return { valid: false, errors: ['数据未加载'] };
        }

        const errors = [];
        const units = this.unitsData.units || [];
        const dbUnits = this.databaseData || [];

        // 检查数据数量一致性
        if (units.length !== dbUnits.length) {
            errors.push(`数据数量不一致: units.js(${units.length}) vs unit-database-data.js(${dbUnits.length})`);
        }

        // 检查必填字段
        const requiredFields = ['id', 'name', 'rarity', 'tier', 'element', 'type'];
        
        units.forEach((unit, index) => {
            requiredFields.forEach(field => {
                if (!unit[field]) {
                    errors.push(`units.js[${index}]: 缺少必填字段 '${field}'`);
                }
            });
        });

        dbUnits.forEach((unit, index) => {
            requiredFields.forEach(field => {
                if (!unit[field]) {
                    errors.push(`unit-database-data.js[${index}]: 缺少必填字段 '${field}'`);
                }
            });
        });

        return {
            valid: errors.length === 0,
            errors: errors,
            totalUnits: units.length,
            databaseUnits: dbUnits.length
        };
    }

    /**
     * 打印统计报告
     */
    printReport() {
        console.log('📊 Anime Vanguards 数据统计报告');
        console.log('=====================================');
        
        const stats = this.getBasicStats();
        if (!stats) return;

        console.log(`\n📈 基本统计:`);
        console.log(`- 总角色数: ${stats.totalUnits}`);
        console.log(`- 数据库角色数: ${stats.databaseUnits}`);

        console.log(`\n🎯 稀有度分布:`);
        Object.entries(stats.rarityDistribution).forEach(([rarity, count]) => {
            console.log(`- ${rarity}: ${count}个`);
        });

        console.log(`\n⭐ 强度分布:`);
        Object.entries(stats.tierDistribution).forEach(([tier, count]) => {
            console.log(`- ${tier}: ${count}个`);
        });

        console.log(`\n🔥 元素分布:`);
        Object.entries(stats.elementDistribution).forEach(([element, count]) => {
            console.log(`- ${element}: ${count}个`);
        });

        console.log(`\n⚔️ 类型分布:`);
        Object.entries(stats.typeDistribution).forEach(([type, count]) => {
            console.log(`- ${type}: ${count}个`);
        });

        // 数据验证
        const validation = this.validateData();
        console.log(`\n✅ 数据验证:`);
        if (validation.valid) {
            console.log('- 数据完整性: ✅ 通过');
        } else {
            console.log('- 数据完整性: ❌ 发现问题');
            validation.errors.forEach(error => {
                console.log(`  - ${error}`);
            });
        }
    }

    /**
     * 查找重复数据
     */
    findDuplicates() {
        if (!this.unitsData || !this.databaseData) return [];

        const duplicates = [];
        const units = this.unitsData.units || [];
        const dbUnits = this.databaseData || [];

        // 检查ID重复
        const idCount = {};
        units.forEach(unit => {
            if (unit.id) {
                idCount[unit.id] = (idCount[unit.id] || 0) + 1;
            }
        });

        Object.entries(idCount).forEach(([id, count]) => {
            if (count > 1) {
                duplicates.push(`重复ID: ${id} (${count}次)`);
            }
        });

        return duplicates;
    }
}

// 导出类
export { DataStats };

// 如果直接运行此文件，执行统计
if (typeof window !== 'undefined') {
    window.DataStats = DataStats;
}
