// Anime Vanguards Traits 使用示例
import { FilterOptimizer, animeVanguardsTraits, traitStats } from './filterOptimizer.js';

// 创建优化器实例
const optimizer = new FilterOptimizer();

// 基础使用示例
console.log('=== Anime Vanguards Traits 数据库 ===');
console.log(`总计 ${traitStats.totalTraits} 个traits`);
console.log('按稀有度分布:', traitStats.byRarity);
console.log('按类别分布:', traitStats.byCategory);

// 查找特定trait
console.log('\n=== 查找特定Trait ===');
const sharpTrait = optimizer.getTraitById('sharp');
console.log('Sharp trait:', sharpTrait);

const divineTrait = optimizer.getTraitById('divine');
console.log('Divine trait:', divineTrait);

// 按稀有度筛选
console.log('\n=== 按稀有度筛选 ===');
const commonTraits = optimizer.getTraitsByRarity('Common');
console.log(`Common traits (${commonTraits.length}):`);
commonTraits.forEach(trait => console.log(`- ${trait.name}: ${trait.description}`));

const mythicTraits = optimizer.getTraitsByRarity('Mythic');
console.log(`\nMythic traits (${mythicTraits.length}):`);
mythicTraits.forEach(trait => console.log(`- ${trait.name}: ${trait.cost.rerollStones} stones + ${trait.cost.gems || 0} gems`));

// 按类别筛选
console.log('\n=== 按类别筛选 ===');
const attackTraits = optimizer.getTraitsByCategory('Attack');
console.log(`Attack traits (${attackTraits.length}):`);
attackTraits.forEach(trait => console.log(`- ${trait.name} (${trait.tier}级): ${trait.effect.value}`));

const supportTraits = optimizer.getTraitsByCategory('Support');
console.log(`\nSupport traits (${supportTraits.length}):`);
supportTraits.forEach(trait => console.log(`- ${trait.name}: ${trait.description}`));

// 按层级筛选
console.log('\n=== 按层级筛选 ===');
const sTierTraits = optimizer.getTraitsByTier('S');
console.log(`S级 traits (${sTierTraits.length}):`);
sTierTraits.forEach(trait => console.log(`- ${trait.name} (${trait.rarity}): ${trait.effect.description}`));

// 多条件筛选
console.log('\n=== 多条件筛选示例 ===');
const rareAttackTraits = optimizer.filterTraits({
    rarity: 'Rare',
    category: 'Attack'
});
console.log(`Rare Attack traits (${rareAttackTraits.length}):`);
rareAttackTraits.forEach(trait => console.log(`- ${trait.name}: ${trait.probability} 概率`));

const allGameModeTraits = optimizer.filterTraits({
    gameMode: 'All',
    tier: 'S'
});
console.log(`\nS级通用traits (${allGameModeTraits.length}):`);
allGameModeTraits.forEach(trait => console.log(`- ${trait.name} (${trait.category})`));

// 搜索功能
console.log('\n=== 搜索功能示例 ===');
const fireTraits = optimizer.searchTraits('fire');
console.log(`包含"fire"的traits (${fireTraits.length}):`);
fireTraits.forEach(trait => console.log(`- ${trait.name}: ${trait.description}`));

const damageTraits = optimizer.searchTraits('damage');
console.log(`\n包含"damage"的traits (${damageTraits.length}):`);
damageTraits.forEach(trait => console.log(`- ${trait.name}: ${trait.effect.description}`));

// 统计信息
console.log('\n=== 详细统计信息 ===');
const stats = optimizer.getTraitStatistics();
console.log('完整统计:', stats);

// 实用筛选示例
console.log('\n=== 实用筛选示例 ===');

// 低成本高效traits
const budgetTraits = animeVanguardsTraits.filter(trait => 
    trait.cost.rerollStones <= 2 && trait.tier === 'A'
);
console.log(`\n低成本高效traits (${budgetTraits.length}):`);
budgetTraits.forEach(trait => console.log(`- ${trait.name}: ${trait.cost.rerollStones} stones (${trait.tier}级)`));

// 新手推荐traits
const beginnerTraits = animeVanguardsTraits.filter(trait => 
    trait.compatibleUnits.includes('All') && 
    trait.cost.rerollStones <= 3 &&
    (trait.tier === 'A' || trait.tier === 'B')
);
console.log(`\n新手推荐traits (${beginnerTraits.length}):`);
beginnerTraits.forEach(trait => console.log(`- ${trait.name}: ${trait.notes || trait.description}`));

// 终极traits（高成本高回报）
const ultimateTraits = animeVanguardsTraits.filter(trait => 
    trait.cost.gems && trait.tier === 'S'
);
console.log(`\n终极traits (${ultimateTraits.length}):`);
ultimateTraits.forEach(trait => console.log(`- ${trait.name}: ${trait.cost.rerollStones} stones + ${trait.cost.gems} gems`));
