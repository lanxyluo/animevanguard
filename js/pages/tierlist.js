import { getCharacterImage } from '../config/characterImages.js';

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
        const tiers = { 
            META_DEFINING: [], 
            STRONG_PICK: [], 
            SOLID: [], 
            SITUATIONAL: [], 
            AVOID: [] 
        };
        
        const units = unitsData?.units || [];
        console.log(`📊 Generating tier data with ${units.length} units`);
        
        units.forEach(unit => {
            const tier = unit.tier || 'AVOID'; // 使用默认tier或AVOID
            if (tier && tiers[tier]) {
                tiers[tier].push({
                    // 基本信息
                    id: unit.id,
                    name: unit.name,
                    avatar: getCharacterImage(unit.id),
                    description: this.generateUnitDescription(unit),
                    rarity: unit.rarity,
                    element: unit.element,
                    tier: unit.tier,
                    category: unit.category,
                    placement_cost: unit.placement_cost,
                    max_placement: unit.max_placement || 1,
                    evolution_required: unit.evolution_required || false,
                    
                    // 详细信息
                    pros: unit.pros || [],
                    cons: unit.cons || [],
                    anime_source: unit.anime_source || '',
                    mode_performance: unit.mode_performance || {},
                    
                    // 增强数据
                    obtainment: unit.obtainment || '',
                    deployment_cost: unit.deployment_cost || '',
                    total_upgrade_cost: unit.total_upgrade_cost || '',
                    abilities: unit.abilities || [],
                    optimal_traits: unit.optimal_traits || [],
                    optimal_familiar: unit.optimal_familiar || '',
                    ratings: unit.ratings || {},
                    detailed_stats: unit.detailed_stats || {}
                });
            }
        });
        
        // 按稀有度排序每个tier内的单位
        Object.keys(tiers).forEach(tier => {
            tiers[tier].sort((a, b) => {
                const rarityOrder = { 'Vanguard': 7, 'Secret': 6, 'Mythic': 5, 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 };
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
        
        // 绑定事件
        this.bindCardEvents();
        
        console.log('✅ Tier list HTML rendered');
    }
    
    renderTierRows() {
        const tiers = ['META_DEFINING', 'STRONG_PICK', 'SOLID', 'SITUATIONAL', 'AVOID'];
        const tierInfo = this.data.unitsData.tiers || {
            'META_DEFINING': { name: '🔥 META DEFINING', gradient: 'linear-gradient(135deg, #ff4757, #ff3838)' },
            'STRONG_PICK': { name: '⚡ STRONG PICK', gradient: 'linear-gradient(135deg, #ff6348, #ff5722)' },
            'SOLID': { name: '💎 SOLID', gradient: 'linear-gradient(135deg, #3742fa, #2f3542)' },
            'SITUATIONAL': { name: '🛠️ SITUATIONAL', gradient: 'linear-gradient(135deg, #2ed573, #1dd1a1)' },
            'AVOID': { name: '❌ AVOID', gradient: 'linear-gradient(135deg, #747d8c, #57606f)' }
        };
        
        console.log('🎨 Rendering tier rows with data:', this.tierData);
        
        return tiers.map(tier => {
            const units = this.tierData[tier] || [];
            console.log(`📊 Tier ${tier} has ${units.length} units:`, units);
            
            const tierData = tierInfo[tier];
            const tierName = tierData?.name || tier;
            const tierGradient = tierData?.gradient || '#747d8c';
            
            // 如果没有单位，显示空状态
            if (units.length === 0) {
                return `
                    <div class="tier-row" style="border-left: 5px solid ${tierData?.color || '#747d8c'}">
                        <div class="tier-label" style="background: ${tierGradient}">
                            <span class="tier-name">${tierName}</span>
                        </div>
                        <div class="tier-units empty-tier">
                            <div class="empty-tier-message">
                                <p>No units in ${tierName} yet</p>
                                <small>Units will appear here as they are added to the database</small>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            return `
                <div class="tier-row" style="border-left: 5px solid ${tierData?.color || '#747d8c'}">
                    <div class="tier-label" style="background: ${tierGradient}">
                        <span class="tier-name">${tierName}</span>
                        <small class="tier-count">${units.length} units</small>
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
                    <img src="${unit.avatar}" alt="${unit.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                    <div class="avatar-fallback" style="display: none;">${unit.name.charAt(0)}</div>
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
                
                <!-- Tab Navigation -->
                <div class="modal-tab-nav">
                    <button class="tab-btn active" data-tab="overview">Overview</button>
                    <button class="tab-btn" data-tab="abilities">Abilities</button>
                    <button class="tab-btn" data-tab="stats">Stats</button>
                    <button class="tab-btn" data-tab="details">Details</button>
                </div>
                
                <div class="unit-modal-content">
                    <!-- Overview Tab -->
                    <div class="tab-content active" id="overview">
                        <div class="unit-modal-main-info">
                            <div class="unit-modal-avatar">
                                <img src="${unit.avatar}" alt="${unit.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                                <div class="avatar-fallback" style="display: none;">${unit.name.charAt(0)}</div>
                            </div>
                            <div class="unit-modal-basic-info">
                                <div class="unit-modal-rarity" style="background: ${this.getRarityColor(unit.rarity)}">
                                    ${unit.rarity}
                                </div>
                                <div class="unit-modal-tier">${unit.tier.replace('_', ' ')}</div>
                                <div class="unit-modal-element">${unit.element} Element</div>
                                <div class="unit-modal-category">${unit.category}</div>
                            </div>
                        </div>
                        
                        <div class="unit-modal-description">
                            <p>${unit.description}</p>
                        </div>
                        
                        ${unit.obtainment ? `
                            <div class="unit-modal-obtainment">
                                <h4>📦 Obtainment</h4>
                                <p>${unit.obtainment}</p>
                            </div>
                        ` : ''}
                        
                        <div class="unit-modal-costs">
                            ${unit.deployment_cost ? `<div class="cost-item"><span>Deployment:</span> ${unit.deployment_cost}</div>` : ''}
                            ${unit.total_upgrade_cost ? `<div class="cost-item"><span>Total Upgrade:</span> ${unit.total_upgrade_cost}</div>` : ''}
                            <div class="cost-item"><span>Max Placement:</span> ${unit.max_placement}</div>
                        </div>
                    </div>
                    
                    <!-- Abilities Tab -->
                    <div class="tab-content" id="abilities">
                        <h4>🔥 Special Abilities</h4>
                        ${unit.abilities && unit.abilities.length > 0 ? `
                            <div class="abilities-list">
                                ${unit.abilities.map(ability => `<div class="ability-item">${ability}</div>`).join('')}
                            </div>
                        ` : '<p>No special abilities data available.</p>'}
                        
                        ${unit.optimal_traits ? `
                            <h4>⭐ Optimal Traits</h4>
                            <div class="traits-list">
                                ${unit.optimal_traits.map(trait => `<span class="trait-tag">${trait}</span>`).join('')}
                            </div>
                        ` : ''}
                        
                        ${unit.optimal_familiar ? `
                            <h4>🐾 Optimal Familiar</h4>
                            <div class="familiar-info">${unit.optimal_familiar}</div>
                        ` : ''}
                    </div>
                    
                    <!-- Stats Tab -->
                    <div class="tab-content" id="stats">
                        ${unit.ratings ? `
                            <h4>📊 Performance Ratings</h4>
                            <div class="ratings-grid">
                                ${Object.entries(unit.ratings).map(([key, value]) => `
                                    <div class="rating-item">
                                        <span class="rating-label">${key.replace('_', ' ').toUpperCase()}</span>
                                        <div class="rating-bar">
                                            <div class="rating-fill" style="width: ${value * 10}%"></div>
                                            <span class="rating-value">${value}/10</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        ${unit.detailed_stats ? `
                            <h4>⚔️ Combat Stats</h4>
                            <div class="detailed-stats">
                                ${Object.entries(unit.detailed_stats).map(([key, value]) => `
                                    <div class="stat-row">
                                        <span class="stat-label">${key.replace('_', ' ').toUpperCase()}:</span>
                                        <span class="stat-value">${value}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Details Tab -->
                    <div class="tab-content" id="details">
                        ${unit.pros && unit.pros.length > 0 ? `
                            <div class="unit-modal-pros">
                                <h4>✅ Pros</h4>
                                <ul>${unit.pros.map(pro => `<li>${pro}</li>`).join('')}</ul>
                            </div>
                        ` : ''}
                        
                        ${unit.cons && unit.cons.length > 0 ? `
                            <div class="unit-modal-cons">
                                <h4>❌ Cons</h4>
                                <ul>${unit.cons.map(con => `<li>${con}</li>`).join('')}</ul>
                            </div>
                        ` : ''}
                        
                        ${unit.anime_source ? `
                            <div class="unit-modal-source">
                                <h4>🎌 Anime Source</h4>
                                <p>${unit.anime_source}</p>
                            </div>
                        ` : ''}
                        
                        ${unit.mode_performance ? `
                            <div class="mode-performance">
                                <h4>🎮 Mode Performance</h4>
                                <div class="performance-grid">
                                    ${Object.entries(unit.mode_performance).map(([mode, rating]) => `
                                        <div class="performance-item">
                                            <span class="mode-name">${mode.toUpperCase()}</span>
                                            <span class="mode-rating rating-${rating.toLowerCase()}">${rating}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(modal);
        
        // 绑定标签页切换事件
        const tabBtns = modal.querySelectorAll('.tab-btn');
        const tabContents = modal.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 移除所有活动状态
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // 添加当前活动状态
                btn.classList.add('active');
                const targetTab = modal.querySelector(`#${btn.dataset.tab}`);
                if (targetTab) targetTab.classList.add('active');
            });
        });
        
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
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border: 2px solid #e94560;
                border-radius: 20px;
                padding: 0;
                max-width: 700px;
                max-height: 85vh;
                overflow: hidden;
                color: white;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            
            .unit-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 25px 30px 20px;
                border-bottom: 2px solid #e94560;
                background: rgba(233, 69, 96, 0.1);
            }
            
            /* Tab Navigation */
            .modal-tab-nav {
                display: flex;
                background: rgba(255, 255, 255, 0.05);
                margin: 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .tab-btn {
                flex: 1;
                padding: 15px 20px;
                background: none;
                border: none;
                color: #b8b8b8;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                position: relative;
            }
            
            .tab-btn:hover {
                color: #e94560;
                background: rgba(233, 69, 96, 0.1);
            }
            
            .tab-btn.active {
                color: #e94560;
                background: rgba(233, 69, 96, 0.2);
            }
            
            .tab-btn.active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: #e94560;
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
            
            /* Tab Content */
            .unit-modal-content {
                padding: 30px;
                max-height: 50vh;
                overflow-y: auto;
            }
            
            .tab-content {
                display: none;
            }
            
            .tab-content.active {
                display: block;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            /* Overview Tab */
            .unit-modal-main-info {
                display: flex;
                gap: 20px;
                margin-bottom: 25px;
                align-items: center;
            }
            
            .unit-modal-basic-info {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .unit-modal-description {
                background: rgba(255, 255, 255, 0.05);
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
                border-left: 4px solid #e94560;
            }
            
            .unit-modal-obtainment {
                background: rgba(52, 152, 219, 0.1);
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 15px;
                border: 1px solid rgba(52, 152, 219, 0.3);
            }
            
            .unit-modal-costs {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 10px;
                margin-top: 15px;
            }
            
            .cost-item {
                background: rgba(255, 255, 255, 0.05);
                padding: 10px 15px;
                border-radius: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .cost-item span:first-child {
                color: #b8b8b8;
                font-size: 0.9rem;
            }
            
            .cost-item span:last-child {
                color: #e94560;
                font-weight: 600;
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
                overflow: hidden;
                position: relative;
            }
            
            .unit-modal-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
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
            
            /* Abilities Tab */
            .abilities-list {
                margin-bottom: 25px;
            }
            
            .ability-item {
                background: rgba(255, 255, 255, 0.05);
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 10px;
                border-left: 4px solid #f39c12;
            }
            
            .traits-list {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 20px;
            }
            
            .trait-tag {
                background: linear-gradient(135deg, #e94560, #c0392b);
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .familiar-info {
                background: rgba(46, 213, 115, 0.1);
                padding: 15px;
                border-radius: 10px;
                border: 1px solid rgba(46, 213, 115, 0.3);
                color: #2ed573;
                font-weight: 600;
            }
            
            /* Stats Tab */
            .ratings-grid {
                display: grid;
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .rating-item {
                background: rgba(255, 255, 255, 0.05);
                padding: 15px;
                border-radius: 10px;
            }
            
            .rating-label {
                display: block;
                color: #b8b8b8;
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 8px;
            }
            
            .rating-bar {
                position: relative;
                background: rgba(255, 255, 255, 0.1);
                height: 8px;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .rating-fill {
                height: 100%;
                background: linear-gradient(90deg, #e94560, #f39c12);
                border-radius: 4px;
                transition: width 0.8s ease;
            }
            
            .rating-value {
                position: absolute;
                right: 10px;
                top: -25px;
                color: #e94560;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .detailed-stats {
                background: rgba(255, 255, 255, 0.05);
                padding: 20px;
                border-radius: 10px;
            }
            
            .stat-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .stat-row:last-child {
                border-bottom: none;
            }
            
            .stat-label {
                color: #b8b8b8;
                font-size: 0.9rem;
            }
            
            .stat-value {
                color: #e94560;
                font-weight: 600;
            }
            
            /* Performance Grid */
            .performance-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 10px;
                margin-top: 15px;
            }
            
            .performance-item {
                background: rgba(255, 255, 255, 0.05);
                padding: 15px 10px;
                border-radius: 10px;
                text-align: center;
            }
            
            .mode-name {
                display: block;
                color: #b8b8b8;
                font-size: 0.8rem;
                margin-bottom: 5px;
                font-weight: 600;
            }
            
            .mode-rating {
                font-size: 1.2rem;
                font-weight: 700;
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            }
            
            .rating-ss { color: #ff4757; }
            .rating-s+ { color: #ff6348; }
            .rating-s { color: #f39c12; }
            .rating-a { color: #3742fa; }
            .rating-b { color: #2ed573; }
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

