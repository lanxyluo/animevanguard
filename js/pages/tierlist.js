export class TierListPage {
    constructor(app) {
        this.app = app;
        this.currentMode = 'all';
        this.tierData = null;
    }
    
    async initialize(data) {
        console.log('Tier List initialized');
        this.data = data;
        await this.loadTierData();
    }
    
    async loadTierData() {
        console.log('🔄 Loading real tier data from units and evolution data...');
        
        // 从真实数据生成tier list
        this.tierData = {
            all: this.generateTierData('all'),
            story: this.generateTierData('story'),
            infinite: this.generateTierData('infinite'),
            pvp: this.generateTierData('pvp')
        };
        
        console.log('✅ Tier data loaded successfully:', this.tierData);
    }
    
    generateTierData(mode) {
        const { unitsData, evolutionData } = this.data;
        const tiers = { S: [], A: [], B: [], C: [], D: [] };
        
        // 遍历所有单位数据
        Object.values(unitsData).forEach(unit => {
            const tier = this.calculateUnitTier(unit, mode);
            if (tier && tiers[tier]) {
                tiers[tier].push({
                    id: unit.id,
                    name: unit.name,
                    avatar: unit.avatar || '👤',
                    description: this.generateUnitDescription(unit, mode),
                    rarity: unit.rarity,
                    element: unit.element,
                    stats: unit.stats
                });
            }
        });
        
        // 按稀有度排序每个tier内的单位
        Object.keys(tiers).forEach(tier => {
            tiers[tier].sort((a, b) => {
                const rarityOrder = { 'Exclusive': 6, 'Mythic': 5, 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 };
                return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
            });
        });
        
        return tiers;
    }
    
    calculateUnitTier(unit, mode) {
        // 基于稀有度、属性和性能计算tier
        let baseScore = 0;
        
        // 稀有度分数
        const rarityScores = { 'Exclusive': 100, 'Mythic': 95, 'Legendary': 90, 'Epic': 70, 'Rare': 50, 'Common': 30 };
        baseScore += rarityScores[unit.rarity] || 0;
        
        // 属性分数
        if (unit.stats) {
            const { attack, defense, skill } = unit.stats;
            if (attack) baseScore += Math.min(attack / 500, 20);
            if (defense) baseScore += Math.min(defense / 500, 20);
            if (skill) baseScore += Math.min(skill / 500, 20);
        }
        
        // 模式特定调整
        switch (mode) {
            case 'story':
                // 故事模式偏好高攻击和技能
                if (unit.stats?.attack > 8000) baseScore += 15;
                if (unit.stats?.skill > 8000) baseScore += 10;
                break;
            case 'infinite':
                // 无限模式偏好高防御
                if (unit.stats?.defense > 6000) baseScore += 15;
                break;
            case 'pvp':
                // PvP偏好平衡的属性和高技能
                if (unit.stats?.skill > 8000) baseScore += 15;
                if (unit.stats?.attack > 7000 && unit.stats?.defense > 5000) baseScore += 10;
                break;
        }
        
        // 根据分数分配tier
        if (baseScore >= 120) return 'S';
        if (baseScore >= 100) return 'A';
        if (baseScore >= 80) return 'B';
        if (baseScore >= 60) return 'C';
        return 'D';
    }
    
    generateUnitDescription(unit, mode) {
        const descriptions = [];
        
        // 稀有度描述
        if (unit.rarity === 'Exclusive') descriptions.push('Exclusive unit');
        else if (unit.rarity === 'Mythic') descriptions.push('Mythic unit');
        else if (unit.rarity === 'Legendary') descriptions.push('Legendary unit');
        else if (unit.rarity === 'Epic') descriptions.push('Epic unit');
        else if (unit.rarity === 'Rare') descriptions.push('Rare unit');
        
        // 属性描述
        if (unit.element) descriptions.push(`${unit.element} element`);
        
        // 统计描述
        if (unit.stats) {
            const { attack, defense, skill } = unit.stats;
            if (attack > 9000) descriptions.push('High attack');
            if (defense > 6000) descriptions.push('High defense');
            if (skill > 8000) descriptions.push('High skill');
        }
        
        // 模式特定描述
        switch (mode) {
            case 'story':
                descriptions.push('Good for story progression');
                break;
            case 'infinite':
                descriptions.push('Suitable for infinite mode');
                break;
            case 'pvp':
                descriptions.push('Effective in PvP');
                break;
        }
        
        return descriptions.join(', ') || 'Balanced unit';
    }
    
    show() {
        console.log('Tier List shown');
        this.renderTierList();
    }
    
    renderTierList() {
        const container = document.getElementById('tierListContent');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tier-list-page">
                <!-- Header Section -->
                <div class="tier-list-header">
                    <h1 class="page-title">Tier List Rankings</h1>
                    <p class="page-description">Rankings based on overall performance and community feedback</p>
                    
                    <!-- Mode Filters -->
                    <div class="mode-filters">
                        <button class="mode-filter active" data-mode="all">
                            <i class="fas fa-globe"></i>
                            All Modes
                        </button>
                        <button class="mode-filter" data-mode="story">
                            <i class="fas fa-book-open"></i>
                            Story Mode
                        </button>
                        <button class="mode-filter" data-mode="infinite">
                            <i class="fas fa-infinity"></i>
                            Infinite Mode
                        </button>
                        <button class="mode-filter" data-mode="pvp">
                            <i class="fas fa-sword"></i>
                            PvP Mode
                        </button>
                    </div>
                </div>
                
                <!-- Tier List Container -->
                <div class="tier-list-container">
                    <div class="tier-list-content">
                        ${this.renderTierRows()}
                    </div>
                </div>
            </div>
        `;
        
        this.attachEventListeners();
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
        
        return tiers.map(tier => {
            const units = this.tierData[this.currentMode][tier] || [];
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
            'Exclusive': '#FF6B9D', // Pink
            'Mythic': '#FFD700',    // Gold
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
                    ${unit.stats ? `
                        <div class="unit-stats">
                            ${unit.stats.attack ? `<span class="stat">ATK: ${unit.stats.attack}</span>` : ''}
                            ${unit.stats.defense ? `<span class="stat">DEF: ${unit.stats.defense}</span>` : ''}
                            ${unit.stats.skill ? `<span class="stat">SKL: ${unit.stats.skill}</span>` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        // Mode filter buttons
        const modeFilters = document.querySelectorAll('.mode-filter');
        modeFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.switchMode(mode);
                
                // Update active state
                modeFilters.forEach(f => f.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });
        
        // Unit card interactions
        const unitCards = document.querySelectorAll('.unit-card');
        unitCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const unitId = e.currentTarget.dataset.unitId;
                this.showUnitDetails(unitId);
            });
        });
    }
    
    switchMode(mode) {
        console.log(`🔄 Switching to ${mode} mode`);
        this.currentMode = mode;
        this.renderTierList();
    }
    
    showUnitDetails(unitId) {
        console.log(`🔍 Showing details for unit: ${unitId}`);
        // 可以在这里添加显示单位详细信息的逻辑
        // 比如打开一个模态框或跳转到数据库页面
        this.app.showPage('database');
        // 触发数据库页面的单位搜索
        if (this.app.databasePage) {
            this.app.databasePage.searchUnit(unitId);
        }
    }
}
