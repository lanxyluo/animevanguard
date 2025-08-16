// Data Consistency Test for Evolution Guide and Unit Database
// 数据一致性测试脚本

import { unitsData } from '../config/units.js';
import { EVOLUTION_UNITS } from '../config/evolutionUnits.js';
import { RARITIES, ELEMENTS } from '../config/constants.js';

export class DataConsistencyTest {
    constructor() {
        this.testResults = {
            unitConsistency: false,
            filterConsistency: false,
            rarityConsistency: false,
            elementConsistency: false,
            evolutionDataConsistency: false,
            materialsConsistency: false,
            costBalance: false,
            farmingGuideConsistency: false
        };
    }
    
    async runAllTests() {
        console.log('🔍 === 开始数据一致性测试 ===');
        
        try {
            // 1. 测试单位数据一致性
            this.testUnitConsistency();
            
            // 2. 测试筛选器选项一致性
            this.testFilterConsistency();
            
            // 3. 测试稀有度颜色一致性
            this.testRarityConsistency();
            
            // 4. 测试成本数值平衡性
            this.testCostBalance();
            
            // 5. 测试农场建议一致性
            this.testFarmingGuideConsistency();
            
            // 6. 测试进化数据一致性
            this.testEvolutionDataConsistency();
            
            // 7. 测试材料稀有度一致性
            this.testMaterialsConsistency();
            
            // 8. 交叉验证测试
            this.crossValidationTest();
            
            this.printTestResults();
            
        } catch (error) {
            console.error('❌ 数据一致性测试失败:', error);
        }
    }
    
    testUnitConsistency() {
        console.log('📋 测试1: 单位数据一致性');
        
        // 检查Evolution Guide中的单位是否与Unit Database一致
        const evolutionUnitsFromDB = unitsData.filter(unit => 
            unit.evolution && unit.evolution !== "Base Form"
        );
        
        const evolutionUnitsFromEvolution = EVOLUTION_UNITS;
        
        // 比较单位数量
        const dbCount = evolutionUnitsFromDB.length;
        const evolutionCount = evolutionUnitsFromEvolution.length;
        
        console.log(`📊 Unit Database可进化单位: ${dbCount}`);
        console.log(`📊 Evolution Guide可进化单位: ${evolutionCount}`);
        
        // 检查ID一致性
        const dbIds = evolutionUnitsFromDB.map(unit => unit.id).sort();
        const evolutionIds = evolutionUnitsFromEvolution.map(unit => unit.id).sort();
        
        const idConsistency = JSON.stringify(dbIds) === JSON.stringify(evolutionIds);
        
        if (idConsistency) {
            console.log('✅ 单位ID一致性: 通过');
            this.testResults.unitConsistency = true;
        } else {
            console.log('❌ 单位ID一致性: 失败');
            console.log('Unit Database IDs:', dbIds);
            console.log('Evolution Guide IDs:', evolutionIds);
            
            // 找出不一致的ID
            const missingInEvolution = dbIds.filter(id => !evolutionIds.includes(id));
            const missingInDB = evolutionIds.filter(id => !dbIds.includes(id));
            
            if (missingInEvolution.length > 0) {
                console.log('❌ Evolution Guide缺少的单位:', missingInEvolution);
            }
            if (missingInDB.length > 0) {
                console.log('❌ Unit Database缺少的单位:', missingInDB);
            }
        }
    }
    
    testFilterConsistency() {
        console.log('🔍 测试2: 筛选器选项一致性');
        
        // 检查稀有度筛选器
        const dbRarities = [...new Set(unitsData.map(unit => unit.rarity))].sort();
        const evolutionRarities = [...new Set(EVOLUTION_UNITS.map(unit => unit.rarity))].sort();
        const configRarities = RARITIES.map(r => r.value).sort();
        
        console.log('📊 Unit Database稀有度:', dbRarities);
        console.log('📊 Evolution Guide稀有度:', evolutionRarities);
        console.log('📊 配置稀有度:', configRarities);
        
        // 检查元素筛选器
        const dbElements = [...new Set(unitsData.map(unit => unit.element))].sort();
        const evolutionElements = [...new Set(EVOLUTION_UNITS.map(unit => unit.element))].sort();
        const configElements = ELEMENTS.map(e => e.value).sort();
        
        console.log('📊 Unit Database元素:', dbElements);
        console.log('📊 Evolution Guide元素:', evolutionElements);
        console.log('📊 配置元素:', configElements);
        
        const rarityConsistency = JSON.stringify(evolutionRarities) === JSON.stringify(configRarities);
        const elementConsistency = JSON.stringify(evolutionElements) === JSON.stringify(configElements);
        
        if (rarityConsistency && elementConsistency) {
            console.log('✅ 筛选器选项一致性: 通过');
            this.testResults.filterConsistency = true;
        } else {
            console.log('❌ 筛选器选项一致性: 失败');
            if (!rarityConsistency) {
                console.log('❌ 稀有度不一致');
            }
            if (!elementConsistency) {
                console.log('❌ 元素不一致');
            }
        }
    }
    
    testRarityConsistency() {
        console.log('🎨 测试3: 稀有度颜色一致性');
        
        // 检查稀有度颜色定义是否一致
        const rarityColors = {
            'Vanguard': '#FFD700',
            'Secret': '#FF4500',
            'Exclusive': '#9400D3',
            'Mythic': '#FF0000',
            'Legendary': '#FF8C00',
            'Epic': '#9932CC',
            'Rare': '#4169E1'
        };
        
        // 验证所有稀有度都有颜色定义
        const allRarities = [...new Set([
            ...unitsData.map(unit => unit.rarity),
            ...EVOLUTION_UNITS.map(unit => unit.rarity)
        ])];
        
        const missingColors = allRarities.filter(rarity => !rarityColors[rarity]);
        
        if (missingColors.length === 0) {
            console.log('✅ 稀有度颜色一致性: 通过');
            this.testResults.rarityConsistency = true;
        } else {
            console.log('❌ 稀有度颜色一致性: 失败');
            console.log('❌ 缺少颜色的稀有度:', missingColors);
        }
    }
    
    testCostBalance() {
        console.log('💰 测试4: 成本数值平衡性');
        
        // 检查进化成本是否合理
        const costRanges = {
            'Vanguard': { min: 50000, max: 100000 },
            'Secret': { min: 25000, max: 75000 },
            'Exclusive': { min: 15000, max: 50000 },
            'Mythic': { min: 10000, max: 30000 },
            'Legendary': { min: 5000, max: 15000 },
            'Epic': { min: 2000, max: 8000 },
            'Rare': { min: 500, max: 3000 }
        };
        
        let costBalanceValid = true;
        
        // 这里需要检查实际的成本数据
        // 由于成本数据在evolutionSystem.js中，我们需要动态导入
        import('../config/evolutionSystem.js').then(module => {
            const evolutionData = module.EVOLUTION_DATA;
            
            for (const [unitId, data] of Object.entries(evolutionData)) {
                const unit = EVOLUTION_UNITS.find(u => u.id === unitId);
                if (!unit) continue;
                
                const rarity = unit.rarity;
                const costRange = costRanges[rarity];
                
                if (costRange) {
                    data.evolutions.forEach(evolution => {
                        const cost = evolution.requirements.cost;
                        if (cost < costRange.min || cost > costRange.max) {
                            console.log(`❌ 成本不平衡: ${unit.name} (${rarity}) - ${cost}`);
                            costBalanceValid = false;
                        }
                    });
                }
            }
            
            if (costBalanceValid) {
                console.log('✅ 成本数值平衡性: 通过');
                this.testResults.costBalance = true;
            } else {
                console.log('❌ 成本数值平衡性: 失败');
            }
        }).catch(error => {
            console.log('⚠️ 无法加载成本数据进行测试:', error);
        });
    }
    
    testFarmingGuideConsistency() {
        console.log('🌾 测试5: 农场建议一致性');
        
        // 检查农场建议是否与游戏实际情况符合
        const validObtainMethods = [
            'Challenges', 'Crafting', 'Legend Stages', 'Shops',
            'Special Banner', 'Special Drop', 'Special Acquisition',
            'Red Key Quest', 'Martial Island', 'Ruined City Raid'
        ];
        
        let farmingConsistencyValid = true;
        
        EVOLUTION_UNITS.forEach(unit => {
            if (!validObtainMethods.includes(unit.obtainMethod)) {
                console.log(`❌ 无效的获取方式: ${unit.name} - ${unit.obtainMethod}`);
                farmingConsistencyValid = false;
            }
        });
        
        if (farmingConsistencyValid) {
            console.log('✅ 农场建议一致性: 通过');
            this.testResults.farmingGuideConsistency = true;
        } else {
            console.log('❌ 农场建议一致性: 失败');
        }
    }
    
    testEvolutionDataConsistency() {
        console.log('🔄 测试6: 进化数据一致性');
        
        // 检查进化数据是否完整
        let evolutionDataValid = true;
        
        EVOLUTION_UNITS.forEach(unit => {
            if (!unit.canEvolve) {
                console.log(`❌ 单位标记为不可进化: ${unit.name}`);
                evolutionDataValid = false;
            }
            
            if (!unit.evolutionName) {
                console.log(`❌ 缺少进化名称: ${unit.name}`);
                evolutionDataValid = false;
            }
            
            if (!unit.obtainMethod) {
                console.log(`❌ 缺少获取方式: ${unit.name}`);
                evolutionDataValid = false;
            }
        });
        
        if (evolutionDataValid) {
            console.log('✅ 进化数据一致性: 通过');
            this.testResults.evolutionDataConsistency = true;
        } else {
            console.log('❌ 进化数据一致性: 失败');
        }
    }
    
    testMaterialsConsistency() {
        console.log('📦 测试7: 材料稀有度一致性');
        
        // 检查材料稀有度颜色是否一致
        const materialRarities = [
            'Mythic', 'Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'
        ];
        
        const materialColors = {
            'Mythic': '#f44336',
            'Legendary': '#ff9800',
            'Epic': '#9c27b0',
            'Rare': '#2196f3',
            'Uncommon': '#4caf50',
            'Common': '#9e9e9e'
        };
        
        let materialsConsistencyValid = true;
        
        materialRarities.forEach(rarity => {
            if (!materialColors[rarity]) {
                console.log(`❌ 缺少材料稀有度颜色: ${rarity}`);
                materialsConsistencyValid = false;
            }
        });
        
        if (materialsConsistencyValid) {
            console.log('✅ 材料稀有度一致性: 通过');
            this.testResults.materialsConsistency = true;
        } else {
            console.log('❌ 材料稀有度一致性: 失败');
        }
    }
    
    crossValidationTest() {
        console.log('🔄 测试8: 交叉验证测试');
        
        // 选择一个具体单位进行交叉验证
        const testUnitId = 'tanjiro';
        
        // 在Unit Database中查找
        const dbUnit = unitsData.find(unit => unit.id === testUnitId);
        
        // 在Evolution Units中查找
        const evolutionUnit = EVOLUTION_UNITS.find(unit => unit.id === testUnitId);
        
        if (dbUnit && evolutionUnit) {
            console.log('✅ 交叉验证: 单位在两个数据源中都存在');
            
            // 比较基本信息
            const nameMatch = dbUnit.name === evolutionUnit.name;
            const rarityMatch = dbUnit.rarity === evolutionUnit.rarity;
            const elementMatch = dbUnit.element === evolutionUnit.element;
            
            if (nameMatch && rarityMatch && elementMatch) {
                console.log('✅ 交叉验证: 基本信息一致');
            } else {
                console.log('❌ 交叉验证: 基本信息不一致');
                console.log('Unit Database:', { name: dbUnit.name, rarity: dbUnit.rarity, element: dbUnit.element });
                console.log('Evolution Guide:', { name: evolutionUnit.name, rarity: evolutionUnit.rarity, element: evolutionUnit.element });
            }
        } else {
            console.log('❌ 交叉验证: 单位数据不完整');
            console.log('Unit Database:', !!dbUnit);
            console.log('Evolution Guide:', !!evolutionUnit);
        }
    }
    
    printTestResults() {
        console.log('\n📊 === 数据一致性测试结果 ===');
        
        const totalTests = Object.keys(this.testResults).length;
        const passedTests = Object.values(this.testResults).filter(result => result).length;
        const failedTests = totalTests - passedTests;
        
        console.log(`📈 总测试数: ${totalTests}`);
        console.log(`✅ 通过测试: ${passedTests}`);
        console.log(`❌ 失败测试: ${failedTests}`);
        console.log(`📊 通过率: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
        
        console.log('\n详细结果:');
        Object.entries(this.testResults).forEach(([test, result]) => {
            const status = result ? '✅' : '❌';
            const testName = test.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            console.log(`${status} ${testName}: ${result ? '通过' : '失败'}`);
        });
        
        if (failedTests === 0) {
            console.log('\n🎉 所有测试通过！数据一致性良好。');
        } else {
            console.log('\n⚠️ 发现数据一致性问题，需要修复。');
        }
    }
}

// 导出测试类
export default DataConsistencyTest;
