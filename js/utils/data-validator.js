/**
 * 数据验证和测试工具
 * 用于验证计算器与游戏数据的一致性
 */

class DataValidator {
    constructor() {
        this.debugMode = false;
        this.validationResults = [];
        this.testCases = [];
        this.warnings = [];
        this.errors = [];
    }

    /**
     * 启用调试模式
     */
    enableDebugMode() {
        this.debugMode = true;
        console.log('🔍 调试模式已启用');
    }

    /**
     * 验证单个角色的数据一致性
     * @param {Object} unit - 角色数据
     * @param {Object} options - 验证选项
     * @returns {Object} 验证结果
     */
    validateUnit(unit, options = {}) {
        const result = {
            unitName: unit.name,
            isValid: true,
            issues: [],
            warnings: [],
            calculations: {},
            recommendations: []
        };

        // 1. 基础数据验证
        const dataValidation = this.validateUnitData(unit);
        if (!dataValidation.isValid) {
            result.isValid = false;
            result.issues.push(...dataValidation.issues);
        }
        result.warnings.push(...dataValidation.warnings);

        // 2. DPS计算验证
        const dpsValidation = this.validateDPSCalculation(unit, options);
        result.calculations = dpsValidation;
        if (dpsValidation.hasIssues) {
            result.issues.push(...dpsValidation.issues);
        }

        // 3. 等级增长验证
        const growthValidation = this.validateLevelGrowth(unit, options);
        if (growthValidation.hasIssues) {
            result.issues.push(...growthValidation.issues);
        }
        result.warnings.push(...growthValidation.warnings);

        // 4. 稀有度加成验证
        const rarityValidation = this.validateRarityBonus(unit);
        if (rarityValidation.hasIssues) {
            result.issues.push(...rarityValidation.issues);
        }

        // 5. 生成建议
        result.recommendations = this.generateRecommendations(unit, result);

        this.validationResults.push(result);
        return result;
    }

    /**
     * 验证角色基础数据
     */
    validateUnitData(unit) {
        const issues = [];
        const warnings = [];

        // 检查必需字段
        const requiredFields = ['id', 'name', 'rarity', 'tier', 'baseDPS', 'maxDPS'];
        requiredFields.forEach(field => {
            if (!unit[field]) {
                issues.push(`缺少必需字段: ${field}`);
            }
        });

        // 检查DPS数据格式
        if (unit.maxDPS && typeof unit.maxDPS === 'string') {
            const maxDPSValue = window.extractDPSValue(unit.maxDPS);
            if (maxDPSValue === 0) {
                warnings.push(`无法解析maxDPS值: ${unit.maxDPS}`);
            }
        }

        // 检查稀有度有效性
        const validRarities = ['Vanguard', 'Secret', 'Mythic', 'Epic', 'Rare', 'Common'];
        if (unit.rarity && !validRarities.includes(unit.rarity)) {
            warnings.push(`未知稀有度: ${unit.rarity}`);
        }

        // 检查等级有效性
        const validTiers = ['BROKEN', 'META', 'SUB-META', 'DECENT', 'LOW'];
        if (unit.tier && !validTiers.includes(unit.tier)) {
            warnings.push(`未知等级: ${unit.tier}`);
        }

        return {
            isValid: issues.length === 0,
            issues,
            warnings
        };
    }

    /**
     * 验证DPS计算逻辑
     */
    validateDPSCalculation(unit, options = {}) {
        const testLevels = options.testLevels || [1, 10, 30, 60];
        const testUpgrades = options.testUpgrades || [0, 3, 5];
        const calculations = {};
        const issues = [];
        let hasIssues = false;

        // 测试不同等级和升级组合
        testLevels.forEach(level => {
            testUpgrades.forEach(upgrade => {
                const state = {
                    selectedUnit: unit,
                    level: level,
                    upgradeLevel: upgrade
                };

                const result = window.calculateDPS(state);
                const key = `L${level}_U${upgrade}`;
                calculations[key] = result;

                // 验证计算结果合理性
                if (result.dps <= 0) {
                    issues.push(`等级${level}升级${upgrade}时DPS为0或负数`);
                    hasIssues = true;
                }

                // 验证等级增长是否合理
                if (level > 1) {
                    const prevKey = `L${level-1}_U${upgrade}`;
                    if (calculations[prevKey] && result.dps <= calculations[prevKey].dps) {
                        issues.push(`等级${level}的DPS没有比等级${level-1}高`);
                        hasIssues = true;
                    }
                }

                // 验证升级增长是否合理
                if (upgrade > 0) {
                    const prevKey = `L${level}_U${upgrade-1}`;
                    if (calculations[prevKey] && result.dps <= calculations[prevKey].dps) {
                        issues.push(`升级${upgrade}的DPS没有比升级${upgrade-1}高`);
                        hasIssues = true;
                    }
                }
            });
        });

        // 与数据库maxDPS对比
        const maxDPSValue = window.extractDPSValue(unit.maxDPS);
        if (maxDPSValue > 0) {
            const maxCalculatedDPS = Math.max(...Object.values(calculations).map(calc => calc.dps));
            const ratio = maxCalculatedDPS / maxDPSValue;
            
            if (ratio < 0.5) {
                issues.push(`计算的最大DPS(${maxCalculatedDPS})远低于数据库maxDPS(${maxDPSValue})`);
                hasIssues = true;
            } else if (ratio > 2.0) {
                issues.push(`计算的最大DPS(${maxCalculatedDPS})远高于数据库maxDPS(${maxDPSValue})`);
                hasIssues = true;
            }
        }

        return {
            calculations,
            hasIssues,
            issues,
            maxDPSValue,
            maxCalculatedDPS: Math.max(...Object.values(calculations).map(calc => calc.dps))
        };
    }

    /**
     * 验证等级增长曲线
     */
    validateLevelGrowth(unit, options = {}) {
        const maxLevel = options.maxLevel || 60;
        const curve = window.calculateDPSCurve(unit, maxLevel);
        const issues = [];
        const warnings = [];

        // 检查增长曲线是否单调递增
        for (let i = 1; i < curve.length; i++) {
            if (curve[i].dps <= curve[i-1].dps) {
                issues.push(`等级${curve[i].level}的DPS没有比等级${curve[i-1].level}高`);
            }
        }

        // 检查增长速率是否合理
        const growthRates = [];
        for (let i = 1; i < curve.length; i++) {
            const rate = (curve[i].dps - curve[i-1].dps) / curve[i-1].dps;
            growthRates.push(rate);
        }

        const avgGrowthRate = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;
        if (avgGrowthRate < 0.05) {
            warnings.push(`平均等级增长速率过低: ${(avgGrowthRate * 100).toFixed(2)}%`);
        } else if (avgGrowthRate > 0.15) {
            warnings.push(`平均等级增长速率过高: ${(avgGrowthRate * 100).toFixed(2)}%`);
        }

        return {
            curve,
            growthRates,
            avgGrowthRate,
            hasIssues: issues.length > 0,
            issues,
            warnings
        };
    }

    /**
     * 验证稀有度加成
     */
    validateRarityBonus(unit) {
        const issues = [];
        const rarityMultiplier = window.getRarityMultiplier(unit.rarity);
        
        // 检查稀有度倍数是否合理
        const expectedMultipliers = {
            'Vanguard': 1.5,
            'Secret': 1.3,
            'Mythic': 1.15,
            'Epic': 1.0,
            'Rare': 0.85,
            'Common': 0.7
        };

        const expected = expectedMultipliers[unit.rarity];
        if (expected && Math.abs(rarityMultiplier - expected) > 0.01) {
            issues.push(`稀有度倍数不正确: 期望${expected}, 实际${rarityMultiplier}`);
        }

        return {
            rarityMultiplier,
            expectedMultiplier: expected,
            hasIssues: issues.length > 0,
            issues
        };
    }

    /**
     * 生成改进建议
     */
    generateRecommendations(unit, validationResult) {
        const recommendations = [];

        // 基于验证结果生成建议
        if (validationResult.calculations.maxDPSValue > 0) {
            const ratio = validationResult.calculations.maxCalculatedDPS / validationResult.calculations.maxDPSValue;
            if (ratio < 0.8) {
                recommendations.push('建议增加基础DPS值或调整成长率');
            } else if (ratio > 1.2) {
                recommendations.push('建议降低基础DPS值或调整成长率');
            }
        }

        if (validationResult.warnings.some(w => w.includes('增长速率'))) {
            recommendations.push('建议调整等级成长参数');
        }

        if (validationResult.issues.some(i => i.includes('稀有度'))) {
            recommendations.push('建议检查稀有度加成配置');
        }

        return recommendations;
    }

    /**
     * 创建测试用例
     */
    createTestCases() {
        const testUnits = [
            // BROKEN级别角色
            { name: 'Song Jinwu and Igros', tier: 'BROKEN', rarity: 'Vanguard' },
            { name: 'Kirito', tier: 'BROKEN', rarity: 'Vanguard' },
            { name: 'Asuna', tier: 'BROKEN', rarity: 'Vanguard' },
            
            // META级别角色
            { name: 'Naruto Uzumaki', tier: 'META', rarity: 'Secret' },
            { name: 'Sasuke Uchiha', tier: 'META', rarity: 'Secret' },
            
            // 不同稀有度
            { name: 'Goku', tier: 'META', rarity: 'Mythic' },
            { name: 'Vegeta', tier: 'SUB-META', rarity: 'Epic' }
        ];

        this.testCases = testUnits.map(testUnit => {
            const unit = window.UnitDatabaseData.find(u => u.name === testUnit.name);
            if (!unit) {
                console.warn(`测试角色未找到: ${testUnit.name}`);
                return null;
            }
            return {
                unit,
                expectedTier: testUnit.tier,
                expectedRarity: testUnit.rarity
            };
        }).filter(Boolean);

        return this.testCases;
    }

    /**
     * 运行所有测试用例
     */
    runAllTests() {
        console.log('🧪 开始运行数据验证测试...');
        
        const testCases = this.createTestCases();
        const results = [];

        testCases.forEach((testCase, index) => {
            console.log(`\n📊 测试用例 ${index + 1}/${testCases.length}: ${testCase.unit.name}`);
            
            const validation = this.validateUnit(testCase.unit, {
                testLevels: [1, 10, 30, 60],
                testUpgrades: [0, 3, 5],
                maxLevel: 60
            });

            results.push({
                testCase,
                validation,
                passed: validation.isValid && validation.issues.length === 0
            });

            // 输出测试结果
            if (this.debugMode) {
                console.log('验证结果:', validation);
            }

            if (validation.isValid) {
                console.log('✅ 通过');
            } else {
                console.log('❌ 失败');
                validation.issues.forEach(issue => console.log(`  - ${issue}`));
            }

            if (validation.warnings.length > 0) {
                console.log('⚠️ 警告:');
                validation.warnings.forEach(warning => console.log(`  - ${warning}`));
            }
        });

        // 生成测试报告
        const report = this.generateTestReport(results);
        console.log('\n📋 测试报告:', report);

        return results;
    }

    /**
     * 生成测试报告
     */
    generateTestReport(results) {
        const totalTests = results.length;
        const passedTests = results.filter(r => r.passed).length;
        const failedTests = totalTests - passedTests;

        const allIssues = results.flatMap(r => r.validation.issues);
        const allWarnings = results.flatMap(r => r.validation.warnings);

        return {
            summary: {
                total: totalTests,
                passed: passedTests,
                failed: failedTests,
                passRate: totalTests > 0 ? (passedTests / totalTests * 100).toFixed(1) : 0
            },
            issues: allIssues,
            warnings: allWarnings,
            recommendations: this.generateGlobalRecommendations(results)
        };
    }

    /**
     * 生成全局建议
     */
    generateGlobalRecommendations(results) {
        const recommendations = [];

        const failedTests = results.filter(r => !r.passed);
        if (failedTests.length > 0) {
            recommendations.push(`有${failedTests.length}个测试用例失败，需要检查计算逻辑`);
        }

        const allWarnings = results.flatMap(r => r.validation.warnings);
        if (allWarnings.length > 10) {
            recommendations.push('警告数量较多，建议检查数据质量');
        }

        return recommendations;
    }

    /**
     * 批量验证所有角色
     */
    validateAllUnits(units) {
        console.log(`🔍 开始验证${units.length}个角色的数据...`);
        
        const results = [];
        const batchSize = 10;
        
        for (let i = 0; i < units.length; i += batchSize) {
            const batch = units.slice(i, i + batchSize);
            console.log(`处理批次 ${Math.floor(i/batchSize) + 1}/${Math.ceil(units.length/batchSize)}`);
            
            batch.forEach(unit => {
                const validation = this.validateUnit(unit);
                results.push({
                    unit: unit.name,
                    validation,
                    passed: validation.isValid
                });
            });
        }

        // 生成批量验证报告
        const report = this.generateBatchReport(results);
        console.log('📊 批量验证报告:', report);

        return results;
    }

    /**
     * 生成批量验证报告
     */
    generateBatchReport(results) {
        const total = results.length;
        const passed = results.filter(r => r.passed).length;
        const failed = total - passed;

        const issuesByType = {};
        results.forEach(result => {
            result.validation.issues.forEach(issue => {
                const type = issue.split(':')[0];
                issuesByType[type] = (issuesByType[type] || 0) + 1;
            });
        });

        return {
            summary: {
                total,
                passed,
                failed,
                passRate: total > 0 ? (passed / total * 100).toFixed(1) : 0
            },
            issuesByType,
            topIssues: Object.entries(issuesByType)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
        };
    }
}

// 创建全局实例
window.DataValidator = DataValidator;
window.dataValidator = new DataValidator();

// 导出到全局变量
window.validateAllUnits = (units) => window.dataValidator.validateAllUnits(units);
window.runDataValidationTests = () => window.dataValidator.runAllTests();
window.enableDataValidationDebug = () => window.dataValidator.enableDebugMode();
