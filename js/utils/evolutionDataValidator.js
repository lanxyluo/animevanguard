// Evolution Data Validator for Anime Vanguards
import { EVOLUTION_UNITS, evolutionUtils } from '../config/evolutionUnits.js';
import { RARITIES, ELEMENTS, dataUtils } from '../config/constants.js';

export class EvolutionDataValidator {
    constructor() {
        this.validationResults = {
            totalEvolutionUnits: 0,
            rarityDistribution: {},
            elementDistribution: {},
            obtainMethodDistribution: {},
            potentialIssues: [],
            recommendations: [],
            dataConsistency: {
                rarities: false,
                elements: false,
                evolutionUnits: false
            }
        };
    }

    validateAllData() {
        console.log('🔍 Starting Evolution Data Validation...');
        
        // Validate individual data structures
        this.validateRarities();
        this.validateElements();
        this.validateEvolutionUnits();
        
        // Analyze distributions
        this.analyzeEvolutionUnitDistribution();
        this.checkForPotentialIssues();
        this.generateRecommendations();
        
        this.printValidationReport();
        return this.validationResults;
    }

    validateRarities() {
        const isValid = dataUtils.validateRarities();
        this.validationResults.dataConsistency.rarities = isValid;
        
        if (!isValid) {
            console.error('❌ Rarities validation failed');
        } else {
            console.log('✅ Rarities validation passed');
        }
    }

    validateElements() {
        const isValid = dataUtils.validateElements();
        this.validationResults.dataConsistency.elements = isValid;
        
        if (!isValid) {
            console.error('❌ Elements validation failed');
        } else {
            console.log('✅ Elements validation passed');
        }
    }

    validateEvolutionUnits() {
        const isValid = evolutionUtils.validateEvolutionUnits();
        this.validationResults.dataConsistency.evolutionUnits = isValid;
        
        if (!isValid) {
            console.error('❌ Evolution units validation failed');
        } else {
            console.log('✅ Evolution units validation passed');
        }
    }

    analyzeEvolutionUnitDistribution() {
        this.validationResults.totalEvolutionUnits = EVOLUTION_UNITS.length;
        
        // Analyze by rarity
        const rarityCount = {};
        const elementCount = {};
        const obtainMethodCount = {};
        
        EVOLUTION_UNITS.forEach(unit => {
            // Count by rarity
            rarityCount[unit.rarity] = (rarityCount[unit.rarity] || 0) + 1;
            
            // Count by element
            elementCount[unit.element] = (elementCount[unit.element] || 0) + 1;
            
            // Count by obtain method
            obtainMethodCount[unit.obtainMethod] = (obtainMethodCount[unit.obtainMethod] || 0) + 1;
        });
        
        this.validationResults.rarityDistribution = rarityCount;
        this.validationResults.elementDistribution = elementCount;
        this.validationResults.obtainMethodDistribution = obtainMethodCount;
    }

    checkForPotentialIssues() {
        const issues = [];
        
        // Check rarity distribution
        const rarityCounts = this.validationResults.rarityDistribution;
        if (rarityCounts['Vanguard'] < 3) {
            issues.push('Vanguard稀有度单元数量较少，可能遗漏了部分Vanguard单元');
        }
        if (rarityCounts['Secret'] < 5) {
            issues.push('Secret稀有度单元数量较少，可能遗漏了部分Secret单元');
        }
        
        // Check element distribution
        const elementCounts = this.validationResults.elementDistribution;
        if (elementCounts['Unknown'] < 2) {
            issues.push('Unknown元素单元数量较少，可能需要添加更多Unknown元素单元');
        }
        if (elementCounts['Blood'] < 2) {
            issues.push('Blood元素单元数量较少，可能需要添加更多Blood元素单元');
        }
        
        // Check obtain method distribution
        const obtainMethodCounts = this.validationResults.obtainMethodDistribution;
        Object.entries(obtainMethodCounts).forEach(([method, count]) => {
            if (count === 1) {
                issues.push(`获取方式 "${method}" 只有1个单元，可能需要添加更多该获取方式的单元`);
            }
        });
        
        this.validationResults.potentialIssues = issues;
    }

    generateRecommendations() {
        const recommendations = [];
        
        // Generate recommendations based on data analysis
        const rarityCounts = this.validationResults.rarityDistribution;
        const elementCounts = this.validationResults.elementDistribution;
        
        if (rarityCounts['Exclusive'] < 5) {
            recommendations.push('建议添加更多Exclusive稀有度的进化单元');
        }
        
        if (elementCounts['Shadow'] < 3) {
            recommendations.push('建议添加更多Shadow元素的进化单元');
        }
        
        if (elementCounts['Fire'] < 3) {
            recommendations.push('建议添加更多Fire元素的进化单元');
        }
        
        this.validationResults.recommendations = recommendations;
    }

    printValidationReport() {
        console.log('\n📊 === Evolution Data Validation Report ===');
        console.log(`Total Evolution Units: ${this.validationResults.totalEvolutionUnits}`);
        
        console.log('\n🔍 Data Consistency:');
        console.log(`- Rarities: ${this.validationResults.dataConsistency.rarities ? '✅' : '❌'}`);
        console.log(`- Elements: ${this.validationResults.dataConsistency.elements ? '✅' : '❌'}`);
        console.log(`- Evolution Units: ${this.validationResults.dataConsistency.evolutionUnits ? '✅' : '❌'}`);
        
        console.log('\n📈 Rarity Distribution:');
        Object.entries(this.validationResults.rarityDistribution).forEach(([rarity, count]) => {
            console.log(`- ${rarity}: ${count} units`);
        });
        
        console.log('\n🌊 Element Distribution:');
        Object.entries(this.validationResults.elementDistribution).forEach(([element, count]) => {
            console.log(`- ${element}: ${count} units`);
        });
        
        console.log('\n🎯 Obtain Method Distribution:');
        Object.entries(this.validationResults.obtainMethodDistribution).forEach(([method, count]) => {
            console.log(`- ${method}: ${count} units`);
        });
        
        if (this.validationResults.potentialIssues.length > 0) {
            console.log('\n⚠️ Potential Issues:');
            this.validationResults.potentialIssues.forEach(issue => {
                console.log(`- ${issue}`);
            });
        }
        
        if (this.validationResults.recommendations.length > 0) {
            console.log('\n💡 Recommendations:');
            this.validationResults.recommendations.forEach(rec => {
                console.log(`- ${rec}`);
            });
        }
        
        console.log('\n=== Validation Report End ===\n');
    }

    generateComparisonTable() {
        console.log('\n📋 === Data Comparison Table ===');
        
        // Compare with expected data
        console.log('\nExpected vs Actual Rarity Distribution:');
        RARITIES.forEach(rarity => {
            const expected = rarity.value;
            const actual = this.validationResults.rarityDistribution[expected] || 0;
            console.log(`${expected}: ${actual} units`);
        });
        
        console.log('\nExpected vs Actual Element Distribution:');
        ELEMENTS.forEach(element => {
            const expected = element.value;
            const actual = this.validationResults.elementDistribution[expected] || 0;
            console.log(`${expected}: ${actual} units`);
        });
        
        console.log('\n=== Comparison Table End ===\n');
    }
} 