export class TierListPage {
    constructor(app) {
        this.app = app;
        this.tierData = null;
    }
    
    async initialize(data) {
        console.log('Tier List initialized');
        this.data = data;
        await this.loadTierData();
    }
    
    async loadTierData() {
        console.log('🔄 Loading tier data from units...');
        
        // 只生成一个简单的tier list，不区分模式
        this.tierData = this.generateTierData();
        
        console.log('✅ Tier data loaded successfully:', this.tierData);
    }
    
    generateTierData() {
        const { unitsData } = this.data;
        const tiers = { S: [], A: [], B: [], C: [], D: [] };
        
        const units = unitsData?.units || [];
        console.log(`📊 Generating tier data with ${units.length} units`);
        
        units.forEach(unit => {
            const tier = unit.tier || 'C'; // 使用默认tier或C
            if (tier && tiers[tier]) {
                tiers[tier].push({
                    id: unit.id,
                    name: unit.name,
                    avatar: '👤',
                    description: this.generateUnitDescription(unit),
                    rarity: unit.rarity,
                    element: unit.element,
                    tier: unit.tier,
                    category: unit.category,
                    placement_cost: unit.placement_cost
                });
            }
        });
        
        // 按稀有度排序每个tier内的单位
        Object.keys(tiers).forEach(tier => {
            tiers[tier].sort((a, b) => {
                const rarityOrder = { 'Secret': 6, 'Mythic': 5, 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 };
                return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
            });
        });
        
        console.log(`✅ Tier data generated:`, tiers);
        return tiers;
    }
    
    generateUnitDescription(unit) {
        const descriptions = [];
        
        // 稀有度描述
        if (unit.rarity === 'Secret') descriptions.push('Secret unit');
        else if (unit.rarity === 'Mythic') descriptions.push('Mythic unit');
        else if (unit.rarity === 'Legendary') descriptions.push('Legendary unit');
        else if (unit.rarity === 'Epic') descriptions.push('Epic unit');
        else if (unit.rarity === 'Rare') descriptions.push('Rare unit');
        
        // 属性描述
        if (unit.element) descriptions.push(`${unit.element} element`);
        
        // 类别描述
        if (unit.category) descriptions.push(`${unit.category} class`);
        
        return descriptions.join(', ');
    }
    
    render(container) {
        if (!container) {
            console.error('❌ Container tierListContent not found!');
            return;
        }
        
        console.log('🎨 Rendering tier list');
        
        container.innerHTML = `
            <div class="tier-list-page">
                <!-- Header Section -->
                <div class="tier-list-header">
                    <h1 class="page-title">Tier List Rankings</h1>
                    <p class="page-description">Rankings based on overall performance and community feedback</p>
                </div>
                
                <!-- Tier List Container -->
                <div class="tier-list-container">
                    <div class="tier-list-content">
                        ${this.renderTierRows()}
                    </div>
                </div>
            </div>
        `;
        
        console.log('✅ Tier list HTML rendered');
    }
    
    renderTierRows() {
        const tiers = ['S', 'A', 'B', 'C', 'D'];
        const tierColors = {
            'S': '#FFD700', // Gold
            'A': '#FF6B6B', // Red
            'B': '#4ECDC4', // Teal
            'C': '#45B7D1', // Blue
            'D': '#96CEB4'  // Green
        };
        
        console.log('🎨 Rendering tier rows with data:', this.tierData);
        
        return tiers.map(tier => {
            const units = this.tierData[tier] || [];
            console.log(`📊 Tier ${tier} has ${units.length} units:`, units);
            
            return `
                <div class="tier-row" style="border-left: 5px solid ${tierColors[tier]}">
                    <div class="tier-label" style="background: ${tierColors[tier]}">
                        <span class="tier-letter">${tier}</span>
                    </div>
                    <div class="tier-units">
                        ${units.map(unit => this.renderUnitCard(unit)).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    renderUnitCard(unit) {
        const rarityColors = {
            'Secret': '#FF6B9D',   // Pink
            'Mythic': '#FFD700',   // Gold
            'Legendary': '#FF6B6B', // Red
            'Epic': '#C0C0C0',     // Silver
            'Rare': '#CD7F32',     // Bronze
            'Common': '#96CEB4'    // Green
        };
        
        const rarityColor = rarityColors[unit.rarity] || '#96CEB4';
        
        return `
            <div class="unit-card" data-unit-id="${unit.id}">
                <div class="unit-avatar">
                    ${unit.avatar}
                </div>
                <div class="unit-info">
                    <div class="unit-header">
                        <h3 class="unit-name">${unit.name}</h3>
                        <span class="unit-rarity" style="background: ${rarityColor}">${unit.rarity}</span>
                    </div>
                    <p class="unit-description">${unit.description}</p>
                    ${unit.element ? `<div class="unit-element">${unit.element}</div>` : ''}
                    ${unit.tier ? `<div class="unit-tier">${unit.tier} Tier</div>` : ''}
                    ${unit.category ? `<div class="unit-category">${unit.category}</div>` : ''}
                    ${unit.placement_cost ? `<div class="unit-cost">Cost: ${unit.placement_cost}</div>` : ''}
                </div>
            </div>
        `;
    }
    
    // 删除所有模式相关的方法
    destroy() {
        console.log('🗑️ TierListPage destroyed');
    }
    
    // 添加show方法，这是主应用调用的入口点
    show() {
        console.log('Tier List shown');
        console.log('📊 Current tier data:', this.tierData);
        console.log('📊 App data:', this.data);
        console.log('📊 Units data:', this.data?.unitsData);
        
        if (!this.tierData) {
            console.error('❌ No tier data available! Attempting to reload...');
            this.loadTierData().then(() => {
                this.renderTierList();
            });
            return;
        }
        
        this.renderTierList();
    }
    
    // 添加renderTierList方法，用于渲染到正确的容器
    renderTierList() {
        const container = document.getElementById('tierListContent');
        if (!container) {
            console.error('❌ Container tierListContent not found!');
            return;
        }
        
        this.render(container);
    }
}

