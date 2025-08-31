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
        const { unitsData } = this.data;
        const tiers = { S: [], A: [], B: [], C: [], D: [] };
        
        // 修复数据访问路径 - 使用 unitsData.units
        const units = unitsData?.units || [];
        console.log(`📊 Generating tier data for ${mode} mode with ${units.length} units`);
        
        units.forEach(unit => {
            const tier = this.calculateUnitTier(unit, mode);
            if (tier && tiers[tier]) {
                tiers[tier].push({
                    id: unit.id,
                    name: unit.name,
                    avatar: '👤', // 使用默认头像
                    description: this.generateUnitDescription(unit, mode),
                    rarity: unit.rarity,
                    element: unit.element,
                    tier: unit.tier, // 使用实际的tier字段
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
        
        console.log(`✅ Tier data for ${mode}:`, tiers);
        return tiers;
    }
    
    calculateUnitTier(unit, mode) {
        // 基于稀有度和tier计算tier
        let baseScore = 0;
        
        // 稀有度分数
        const rarityScores = { 'Secret': 100, 'Mythic': 95, 'Legendary': 90, 'Epic': 70, 'Rare': 50, 'Common': 30 };
        baseScore += rarityScores[unit.rarity] || 0;
        
        // Tier分数 - 使用实际的tier字段
        if (unit.tier) {
            const tierScores = { 'SS': 30, 'S+': 25, 'S': 20, 'A': 15, 'B': 10, 'C': 5 };
            baseScore += tierScores[unit.tier] || 0;
        }
        
        // 模式特定调整
        switch (mode) {
            case 'story':
                // 故事模式偏好高攻击和技能
                if (unit.category === 'DPS') baseScore += 15;
                if (unit.category === 'Support') baseScore += 10;
                break;
            case 'infinite':
                // 无限模式偏好高防御
                if (unit.category === 'Tank') baseScore += 15;
                if (unit.placement_cost === 'Low') baseScore += 10;
                break;
            case 'pvp':
                // PvP偏好平衡的属性和高技能
                if (unit.category === 'Hybrid') baseScore += 15;
                if (unit.placement_cost === 'Medium') baseScore += 10;
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
        if (unit.rarity === 'Secret') descriptions.push('Secret unit');
        else if (unit.rarity === 'Mythic') descriptions.push('Mythic unit');
        else if (unit.rarity === 'Legendary') descriptions.push('Legendary unit');
        else if (unit.rarity === 'Epic') descriptions.push('Epic unit');
        else if (unit.rarity === 'Rare') descriptions.push('Rare unit');
        
        // 属性描述
        if (unit.element) descriptions.push(`${unit.element} element`);
        
        // 类别描述
        if (unit.category) descriptions.push(`${unit.category} class`);
        
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
        console.log('📊 Current tier data:', this.tierData);
        console.log('📊 Current mode:', this.currentMode);
        
        if (!this.tierData) {
            console.error('❌ No tier data available! Attempting to reload...');
            this.loadTierData().then(() => {
                this.renderTierList();
            });
            return;
        }
        
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
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        console.log('🔗 Attaching event listeners...');
        
        // 等待DOM元素创建完成
        setTimeout(() => {
            // Mode filter buttons - 使用更具体的选择器
            const modeFilters = document.querySelectorAll('.tier-list-page .mode-filter');
            console.log(`Found ${modeFilters.length} mode filters`);
            
            modeFilters.forEach(filter => {
                filter.addEventListener('click', (e) => {
                    const mode = e.currentTarget.dataset.mode;
                    console.log(`Mode filter clicked: ${mode}`);
                    this.switchMode(mode);
                    
                    // Update active state
                    modeFilters.forEach(f => f.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                });
            });
            
            // Unit card interactions - 使用更具体的选择器
            const unitCards = document.querySelectorAll('.tier-list-page .unit-card');
            console.log(`Found ${unitCards.length} unit cards`);
            
            unitCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    const unitId = e.currentTarget.dataset.unitId;
                    console.log(`Unit card clicked: ${unitId}`);
                    this.showUnitDetails(unitId);
                });
            });
            
            console.log('✅ Event listeners attached successfully');
        }, 50); // 等待50ms确保DOM完全渲染
    }
    
    switchMode(mode) {
        console.log(`🔄 Switching to ${mode} mode`);
        this.currentMode = mode;
        this.renderTierList();
    }
    
    showUnitDetails(unitId) {
        console.log(`🔍 Showing details for unit: ${unitId}`);
        
        // 在Tier List页面显示单位详情，而不是跳转
        const unit = this.findUnitById(unitId);
        if (unit) {
            this.showUnitModal(unit);
        } else {
            console.error(`❌ Unit not found: ${unitId}`);
        }
    }
    
    findUnitById(unitId) {
        // 首先尝试从原始数据中查找完整信息
        const { unitsData } = this.data;
        const originalUnit = unitsData?.units?.find(u => u.id === unitId);
        if (originalUnit) {
            return originalUnit;
        }
        
        // 如果原始数据中没有找到，再从tierData中查找
        for (const mode in this.tierData) {
            for (const tier in this.tierData[mode]) {
                const unit = this.tierData[mode][tier].find(u => u.id === unitId);
                if (unit) return unit;
            }
        }
        return null;
    }
    
    showUnitModal(unit) {
        // 创建模态框显示单位详情
        const modal = document.createElement('div');
        modal.className = 'unit-modal';
        modal.innerHTML = `
            <div class="unit-modal-content">
                <div class="unit-modal-header">
                    <h2>${unit.name}</h2>
                    <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="unit-modal-body">
                    <div class="unit-avatar-large">${unit.avatar || '👤'}</div>
                    <div class="unit-details">
                        <p><strong>Rarity:</strong> <span class="rarity-badge" style="background: ${this.getRarityColor(unit.rarity)}">${unit.rarity}</span></p>
                        ${unit.description ? `<p><strong>Description:</strong> ${unit.description}</p>` : ''}
                        ${unit.element ? `<p><strong>Element:</strong> ${unit.element}</p>` : ''}
                        ${unit.tier ? `<p><strong>Tier:</strong> ${unit.tier}</p>` : ''}
                        ${unit.category ? `<p><strong>Category:</strong> ${unit.category}</p>` : ''}
                        ${unit.placement_cost ? `<p><strong>Placement Cost:</strong> ${unit.placement_cost}</p>` : ''}
                        ${unit.obtain_method ? `<p><strong>Obtain Method:</strong> ${unit.obtain_method}</p>` : ''}
                        ${unit.stats ? `
                            <div class="unit-stats-section">
                                <h4>Stats</h4>
                                ${unit.stats.attack ? `<p><strong>Attack:</strong> ${unit.stats.attack}</p>` : ''}
                                ${unit.stats.defense ? `<p><strong>Defense:</strong> ${unit.stats.defense}</p>` : ''}
                                ${unit.stats.skill ? `<p><strong>Skill:</strong> ${unit.stats.skill}</p>` : ''}
                                ${unit.stats.hp ? `<p><strong>HP:</strong> ${unit.stats.hp}</p>` : ''}
                                ${unit.stats.speed ? `<p><strong>Speed:</strong> ${unit.stats.speed}</p>` : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        // 添加样式
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        // 添加模态框内容样式
        const style = document.createElement('style');
        style.textContent = `
            .unit-modal-content {
                background: #1a1a1a;
                border-radius: 10px;
                padding: 20px;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
                color: white;
                border: 2px solid #333;
            }
            .unit-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 1px solid #333;
                padding-bottom: 10px;
            }
            .unit-modal-header h2 {
                margin: 0;
                color: #fff;
            }
            .close-modal {
                background: #ff4444;
                color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .unit-modal-body {
                display: flex;
                gap: 20px;
            }
            .unit-avatar-large {
                font-size: 60px;
                background: #333;
                border-radius: 50%;
                width: 80px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .unit-details {
                flex: 1;
            }
            .unit-details p {
                margin: 8px 0;
                color: #ccc;
            }
            .unit-details strong {
                color: #fff;
            }
            .rarity-badge {
                padding: 4px 8px;
                border-radius: 4px;
                color: white;
                font-size: 12px;
                font-weight: bold;
            }
            .unit-stats-section {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid #333;
            }
            .unit-stats-section h4 {
                margin: 0 0 10px 0;
                color: #fff;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
    }
    
    getRarityColor(rarity) {
        const rarityColors = {
            'Secret': '#FF6B9D',   // Pink
            'Mythic': '#FFD700',   // Gold
            'Legendary': '#FF6B6B', // Red
            'Epic': '#C0C0C0',     // Silver
            'Rare': '#CD7F32',     // Bronze
            'Common': '#96CEB4'    // Green
        };
        return rarityColors[rarity] || '#96CEB4';
    }
}

