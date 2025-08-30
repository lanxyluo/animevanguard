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
        // 模拟tier list数据 - 实际项目中应该从API获取
        this.tierData = {
            all: {
                S: [
                    { id: '001', name: 'Shadow Assassin', avatar: '👤', description: 'High damage output with stealth abilities' },
                    { id: '002', name: 'Crystal Mage', avatar: '👤', description: 'Powerful magic user with crowd control' },
                    { id: '003', name: 'Iron Guardian', avatar: '👤', description: 'Tank with excellent defensive skills' }
                ],
                A: [
                    { id: '004', name: 'Swift Archer', avatar: '👤', description: 'Fast ranged attacker with mobility' },
                    { id: '005', name: 'Healing Priest', avatar: '👤', description: 'Support unit with strong healing' },
                    { id: '006', name: 'Fire Warrior', avatar: '👤', description: 'Balanced fighter with fire abilities' }
                ],
                B: [
                    { id: '007', name: 'Ice Sorcerer', avatar: '👤', description: 'Decent magic damage and control' },
                    { id: '008', name: 'Light Cavalry', avatar: '👤', description: 'Fast but fragile melee unit' },
                    { id: '009', name: 'Earth Defender', avatar: '👤', description: 'Good defense but low damage' }
                ],
                C: [
                    { id: '010', name: 'Wind Scout', avatar: '👤', description: 'Fast but weak in combat' },
                    { id: '011', name: 'Water Healer', avatar: '👤', description: 'Basic healing abilities' },
                    { id: '012', name: 'Stone Golem', avatar: '👤', description: 'Slow but durable unit' }
                ],
                D: [
                    { id: '013', name: 'Novice Fighter', avatar: '👤', description: 'Beginner unit with basic skills' },
                    { id: '014', name: 'Apprentice Mage', avatar: '👤', description: 'Learning magic, not very effective' },
                    { id: '015', name: 'Recruit Guard', avatar: '👤', description: 'Basic defensive unit' }
                ]
            },
            story: {
                S: [
                    { id: '001', name: 'Shadow Assassin', avatar: '👤', description: 'Excellent for story progression' },
                    { id: '002', name: 'Crystal Mage', avatar: '👤', description: 'Great for clearing story stages' }
                ],
                A: [
                    { id: '004', name: 'Swift Archer', avatar: '👤', description: 'Good for story mode' },
                    { id: '005', name: 'Healing Priest', avatar: '👤', description: 'Essential for story survival' }
                ],
                B: [
                    { id: '007', name: 'Ice Sorcerer', avatar: '👤', description: 'Decent story performance' }
                ],
                C: [
                    { id: '010', name: 'Wind Scout', avatar: '👤', description: 'Basic story unit' }
                ],
                D: [
                    { id: '013', name: 'Novice Fighter', avatar: '👤', description: 'Not recommended for story' }
                ]
            },
            infinite: {
                S: [
                    { id: '003', name: 'Iron Guardian', avatar: '👤', description: 'Best for infinite mode survival' },
                    { id: '005', name: 'Healing Priest', avatar: '👤', description: 'Essential for long runs' }
                ],
                A: [
                    { id: '001', name: 'Shadow Assassin', avatar: '👤', description: 'Good damage for infinite mode' },
                    { id: '002', name: 'Crystal Mage', avatar: '👤', description: 'Strong magic for waves' }
                ],
                B: [
                    { id: '006', name: 'Fire Warrior', avatar: '👤', description: 'Balanced infinite mode unit' }
                ],
                C: [
                    { id: '008', name: 'Light Cavalry', avatar: '👤', description: 'Fast but fragile in infinite' }
                ],
                D: [
                    { id: '014', name: 'Apprentice Mage', avatar: '👤', description: 'Too weak for infinite mode' }
                ]
            },
            pvp: {
                S: [
                    { id: '001', name: 'Shadow Assassin', avatar: '👤', description: 'Top tier PvP damage dealer' },
                    { id: '002', name: 'Crystal Mage', avatar: '👤', description: 'Excellent PvP crowd control' }
                ],
                A: [
                    { id: '004', name: 'Swift Archer', avatar: '👤', description: 'Good PvP mobility and damage' },
                    { id: '006', name: 'Fire Warrior', avatar: '👤', description: 'Solid PvP fighter' }
                ],
                B: [
                    { id: '003', name: 'Iron Guardian', avatar: '👤', description: 'Decent PvP tank' }
                ],
                C: [
                    { id: '009', name: 'Earth Defender', avatar: '👤', description: 'Basic PvP defense' }
                ],
                D: [
                    { id: '015', name: 'Recruit Guard', avatar: '👤', description: 'Too weak for PvP' }
                ]
            }
        };
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
        return `
            <div class="unit-card" data-unit-id="${unit.id}">
                <div class="unit-avatar">
                    ${unit.avatar}
                </div>
                <div class="unit-info">
                    <h3 class="unit-name">${unit.name}</h3>
                    <p class="unit-description">${unit.description}</p>
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
        this.currentMode = mode;
        this.renderTierList();
    }
    
    showUnitDetails(unitId) {
        // 这里可以添加显示单位详细信息的逻辑
        console.log(`Showing details for unit: ${unitId}`);
        // 可以打开模态框或跳转到单位数据库页面
    }
}
