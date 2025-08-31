export class TierListPage {
    constructor(app) {
        this.app = app;
        this.tierData = null;
        this.modal = null;
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
                    placement_cost: unit.placement_cost,
                    // 添加更多详细信息用于弹窗
                    pros: unit.pros || [],
                    cons: unit.cons || [],
                    anime_source: unit.anime_source || '',
                    evolution_required: unit.evolution_required || false,
                    max_placement: unit.max_placement || 1
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
        
        // 绑定点击事件
        this.bindCardEvents();
        
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
            
            // 如果没有单位，显示空状态
            if (units.length === 0) {
                return `
                    <div class="tier-row" style="border-left: 5px solid ${tierColors[tier]}">
                        <div class="tier-label" style="background: ${tierColors[tier]}">
                            <span class="tier-letter">${tier}</span>
                        </div>
                        <div class="tier-units empty-tier">
                            <div class="empty-tier-message">
                                <p>No units in ${tier} Tier yet</p>
                                <small>Units will appear here as they are added to the database</small>
                            </div>
                        </div>
                    </div>
                `;
            }
            
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
            <div class="unit-card" data-unit-id="${unit.id}" style="cursor: pointer;">
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
    
    bindCardEvents() {
        const unitCards = document.querySelectorAll('.unit-card[data-unit-id]');
        unitCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const unitId = card.getAttribute('data-unit-id');
                const unit = this.findUnitById(unitId);
                if (unit) {
                    this.showUnitModal(unit);
                }
            });
        });
    }
    
    findUnitById(unitId) {
        // 在所有tier中查找单位
        for (const tier in this.tierData) {
            const unit = this.tierData[tier].find(u => u.id === unitId);
            if (unit) return unit;
        }
        return null;
    }
    
    showUnitModal(unit) {
        // 创建模态框
        const modal = document.createElement('div');
        modal.className = 'unit-modal-overlay';
        modal.innerHTML = `
            <div class="unit-modal">
                <div class="unit-modal-header">
                    <h2>${unit.name}</h2>
                    <button class="close-modal-btn">&times;</button>
                </div>
                <div class="unit-modal-content">
                    <div class="unit-modal-avatar">
                        ${unit.avatar}
                    </div>
                    <div class="unit-modal-info">
                        <div class="unit-modal-rarity" style="background: ${this.getRarityColor(unit.rarity)}">
                            ${unit.rarity}
                        </div>
                        <div class="unit-modal-tier">${unit.tier} Tier</div>
                        <div class="unit-modal-element">${unit.element} Element</div>
                        <div class="unit-modal-category">${unit.category}</div>
                        <div class="unit-modal-cost">Cost: ${unit.placement_cost}</div>
                        <div class="unit-modal-placement">Max Placement: ${unit.max_placement}</div>
                        ${unit.evolution_required ? '<div class="unit-modal-evolution">Evolution Required</div>' : ''}
                    </div>
                    ${unit.pros && unit.pros.length > 0 ? `
                        <div class="unit-modal-pros">
                            <h4>Pros:</h4>
                            <ul>${unit.pros.map(pro => `<li>${pro}</li>`).join('')}</ul>
                        </div>
                    ` : ''}
                    ${unit.cons && unit.cons.length > 0 ? `
                        <div class="unit-modal-cons">
                            <h4>Cons:</h4>
                            <ul>${unit.cons.map(con => `<li>${con}</li>`).join('')}</ul>
                        </div>
                    ` : ''}
                    ${unit.anime_source ? `
                        <div class="unit-modal-source">
                            <strong>Source:</strong> ${unit.anime_source}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        const closeBtn = modal.querySelector('.close-modal-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // 添加样式
        this.addModalStyles();
    }
    
    getRarityColor(rarity) {
        const rarityColors = {
            'Secret': '#FF6B9D',
            'Mythic': '#FFD700',
            'Legendary': '#FF6B6B',
            'Epic': '#C0C0C0',
            'Rare': '#CD7F32',
            'Common': '#96CEB4'
        };
        return rarityColors[rarity] || '#96CEB4';
    }
    
    addModalStyles() {
        if (document.getElementById('tierlist-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'tierlist-modal-styles';
        style.textContent = `
            .unit-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            
            .unit-modal {
                background: #1a1a2e;
                border: 2px solid #e94560;
                border-radius: 15px;
                padding: 30px;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                color: white;
            }
            
            .unit-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #e94560;
                padding-bottom: 15px;
            }
            
            .unit-modal-header h2 {
                margin: 0;
                color: #e94560;
                font-size: 1.8rem;
            }
            
            .close-modal-btn {
                background: none;
                border: none;
                color: #e94560;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .close-modal-btn:hover {
                background: #e94560;
                color: white;
            }
            
            .unit-modal-content {
                display: grid;
                grid-template-columns: 100px 1fr;
                gap: 20px;
            }
            
            .unit-modal-avatar {
                font-size: 3rem;
                text-align: center;
                background: #16213e;
                border-radius: 50%;
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 3px solid #e94560;
            }
            
            .unit-modal-info {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .unit-modal-rarity,
            .unit-modal-tier,
            .unit-modal-element,
            .unit-modal-category,
            .unit-modal-cost,
            .unit-modal-placement,
            .unit-modal-evolution {
                padding: 8px 15px;
                border-radius: 20px;
                text-align: center;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .unit-modal-rarity {
                color: white;
            }
            
            .unit-modal-tier {
                background: #e94560;
                color: white;
            }
            
            .unit-modal-element {
                background: #0f3460;
                color: #a8dadc;
            }
            
            .unit-modal-category {
                background: #533483;
                color: white;
            }
            
            .unit-modal-cost {
                background: #2d5a27;
                color: #90ee90;
            }
            
            .unit-modal-placement {
                background: #4a4a4a;
                color: #cccccc;
            }
            
            .unit-modal-evolution {
                background: #8b4513;
                color: #ffd700;
            }
            
            .unit-modal-pros,
            .unit-modal-cons {
                grid-column: 1 / -1;
                margin-top: 20px;
            }
            
            .unit-modal-pros h4,
            .unit-modal-cons h4 {
                color: #e94560;
                margin-bottom: 10px;
                border-bottom: 1px solid #e94560;
                padding-bottom: 5px;
            }
            
            .unit-modal-pros ul,
            .unit-modal-cons ul {
                list-style: none;
                padding: 0;
            }
            
            .unit-modal-pros li {
                color: #90ee90;
                padding: 5px 0;
                border-left: 3px solid #90ee90;
                padding-left: 15px;
                margin: 5px 0;
            }
            
            .unit-modal-cons li {
                color: #ff6b6b;
                padding: 5px 0;
                border-left: 3px solid #ff6b6b;
                padding-left: 15px;
                margin: 5px 0;
            }
            
            .unit-modal-source {
                grid-column: 1 / -1;
                text-align: center;
                margin-top: 20px;
                padding: 15px;
                background: #16213e;
                border-radius: 10px;
                border: 1px solid #e94560;
            }
            
            .empty-tier-message {
                text-align: center;
                padding: 40px 20px;
                color: #888;
            }
            
            .empty-tier-message p {
                font-size: 1.2rem;
                margin-bottom: 10px;
                color: #aaa;
            }
            
            .empty-tier-message small {
                color: #666;
            }
        `;
        
        document.head.appendChild(style);
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

