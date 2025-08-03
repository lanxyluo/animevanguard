// Data Validator for Anime Vanguards Units
export class DataValidator {
    constructor(unitsData) {
        this.unitsData = unitsData;
        this.validationResults = {
            totalUnits: 0,
            rarityDistribution: {},
            elementDistribution: {},
            rarityElementCombinations: {},
            potentialIssues: [],
            recommendations: []
        };
    }

    validateData() {
        console.log('🔍 Starting data validation...');
        
        this.countTotalUnits();
        this.analyzeRarityDistribution();
        this.analyzeElementDistribution();
        this.analyzeRarityElementCombinations();
        this.checkForPotentialIssues();
        this.generateRecommendations();
        
        this.printValidationReport();
        return this.validationResults;
    }

    countTotalUnits() {
        this.validationResults.totalUnits = Array.isArray(this.unitsData) ? this.unitsData.length : Object.keys(this.unitsData).length;
    }

    analyzeRarityDistribution() {
        const rarityCount = {};
        const units = Array.isArray(this.unitsData) ? this.unitsData : Object.values(this.unitsData);
        units.forEach(unit => {
            rarityCount[unit.rarity] = (rarityCount[unit.rarity] || 0) + 1;
        });
        this.validationResults.rarityDistribution = rarityCount;
    }

    analyzeElementDistribution() {
        const elementCount = {};
        const units = Array.isArray(this.unitsData) ? this.unitsData : Object.values(this.unitsData);
        units.forEach(unit => {
            elementCount[unit.element] = (elementCount[unit.element] || 0) + 1;
        });
        this.validationResults.elementDistribution = elementCount;
    }

    analyzeRarityElementCombinations() {
        const combinations = {};
        const units = Array.isArray(this.unitsData) ? this.unitsData : Object.values(this.unitsData);
        units.forEach(unit => {
            const key = `${unit.rarity} + ${unit.element}`;
            combinations[key] = (combinations[key] || 0) + 1;
        });
        this.validationResults.rarityElementCombinations = combinations;
    }

    checkForPotentialIssues() {
        const issues = [];

        // 检查稀有度分布是否合理
        const rarityCounts = this.validationResults.rarityDistribution;
        if (rarityCounts['Mythic'] && rarityCounts['Mythic'] < 3) {
            issues.push('Mythic稀有度单元数量较少，可能遗漏了部分稀有单元');
        }
        if (rarityCounts['Vanguard'] && rarityCounts['Vanguard'] < 10) {
            issues.push('Vanguard稀有度单元数量较少，可能遗漏了基础单元');
        }

        // 检查元素分布是否合理
        const elementCounts = this.validationResults.elementDistribution;
        const commonElements = ['Fire', 'Water', 'Earth', 'Wind'];
        commonElements.forEach(element => {
            if (elementCounts[element] && elementCounts[element] < 2) {
                issues.push(`${element}元素单元数量较少，可能遗漏了该元素的单元`);
            }
        });

        // 检查组合分布
        const combinations = this.validationResults.rarityElementCombinations;
        Object.entries(combinations).forEach(([combination, count]) => {
            if (count === 1) {
                issues.push(`组合 ${combination} 只有1个单元，可能需要添加更多该组合的单元`);
            }
        });

        this.validationResults.potentialIssues = issues;
    }

    generateRecommendations() {
        const recommendations = [];

        // 基于数据分布生成建议
        const rarityCounts = this.validationResults.rarityDistribution;
        const elementCounts = this.validationResults.elementDistribution;

        if (rarityCounts['Vanguard'] < 15) {
            recommendations.push('建议增加Vanguard稀有度的单元，这通常是游戏中最基础的单元类型');
        }

        if (rarityCounts['Secret'] < 8) {
            recommendations.push('建议增加Secret稀有度的单元，这是游戏中的中等稀有度单元');
        }

        if (rarityCounts['Mythic'] < 5) {
            recommendations.push('建议增加Mythic稀有度的单元，这是游戏中最稀有的单元类型');
        }

        // 检查是否有缺失的元素
        const expectedElements = ['Fire', 'Water', 'Earth', 'Wind', 'Light', 'Dark', 'Electric', 'Ice', 'Poison', 'Psychic'];
        expectedElements.forEach(element => {
            if (!elementCounts[element] || elementCounts[element] < 2) {
                recommendations.push(`建议增加${element}元素的单元，确保每个元素都有足够的单元选择`);
            }
        });

        this.validationResults.recommendations = recommendations;
    }

    printValidationReport() {
        console.log('\n📊 === Anime Vanguards 数据验证报告 ===');
        console.log(`总单元数量: ${this.validationResults.totalUnits}`);
        
        console.log('\n🎯 稀有度分布:');
        Object.entries(this.validationResults.rarityDistribution).forEach(([rarity, count]) => {
            console.log(`  ${rarity}: ${count} 个单元`);
        });

        console.log('\n⚡ 元素分布:');
        Object.entries(this.validationResults.elementDistribution).forEach(([element, count]) => {
            console.log(`  ${element}: ${count} 个单元`);
        });

        console.log('\n🔗 稀有度+元素组合分布:');
        Object.entries(this.validationResults.rarityElementCombinations).forEach(([combination, count]) => {
            console.log(`  ${combination}: ${count} 个单元`);
        });

        if (this.validationResults.potentialIssues.length > 0) {
            console.log('\n⚠️ 潜在问题:');
            this.validationResults.potentialIssues.forEach(issue => {
                console.log(`  - ${issue}`);
            });
        }

        if (this.validationResults.recommendations.length > 0) {
            console.log('\n💡 建议:');
            this.validationResults.recommendations.forEach(recommendation => {
                console.log(`  - ${recommendation}`);
            });
        }

        console.log('\n📋 验证完成！请根据以上信息检查Wiki数据是否完整。');
        console.log('=== 验证报告结束 ===\n');
    }

    // 生成数据对比表
    generateComparisonTable() {
        console.log('\n📋 === 数据对比表 ===');
        console.log('请将以下数据与Wiki进行对比:');
        
        console.log('\n稀有度分布:');
        console.table(this.validationResults.rarityDistribution);
        
        console.log('\n元素分布:');
        console.table(this.validationResults.elementDistribution);
        
        console.log('\n稀有度+元素组合:');
        console.table(this.validationResults.rarityElementCombinations);
    }
} 