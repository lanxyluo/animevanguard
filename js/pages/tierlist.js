class TierListPage {
    constructor(app) {
        this.app = app;
        this.dataManager = null;
        this.currentFilters = {};
        this.isLoading = false;
        this.isRendering = false;
        this.lastRenderTime = 0;
    }
    
    async initialize(data) {
        console.log('🎯 Tier List initialized');
        this.data = data;
        
        try {
            // Use the global data that should be available
            if (window.TierListDataManager) {
                this.dataManager = new window.TierListDataManager();
                this.TIER_INFO = window.TIER_INFO;
                this.ELEMENT_INFO = window.ELEMENT_INFO;
                this.RARITY_INFO = window.RARITY_INFO;
                console.log('✅ Tier list data manager loaded successfully');
            } else {
                console.error('❌ Tier list data not available globally');
            }
        } catch (error) {
            console.error('❌ Failed to load tier list data manager:', error);
        }
    }
    
    async show() {
        console.log('🎯 Tier List shown');
        
        // 防止重复渲染 - 如果正在渲染或刚刚渲染过，则跳过
        const now = Date.now();
        if (this.isRendering || (now - this.lastRenderTime < 1000)) {
            console.log('⏭️ Skipping duplicate render');
            return;
        }
        
        await this.renderTierList();
    }
    
    async renderTierList() {
        const container = document.getElementById('tierListContent');
        if (!container) {
            console.error('❌ Container tierListContent not found!');
            return;
        }
        
        // 设置渲染状态
        this.isRendering = true;
        this.lastRenderTime = Date.now();
        
        console.log('🔍 Checking data manager:', this.dataManager);
        console.log('🔍 Checking global data:', window.TIER_LIST_DATA);
        
        if (!this.dataManager) {
            // Try to initialize data manager again
            if (window.TierListDataManager) {
                this.dataManager = new window.TierListDataManager();
                this.TIER_INFO = window.TIER_INFO;
                this.ELEMENT_INFO = window.ELEMENT_INFO;
                this.RARITY_INFO = window.RARITY_INFO;
                console.log('✅ Data manager initialized from global');
            } else {
                container.innerHTML = `
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Loading tier list data manager...</p>
                        <p>Debug: Global data not available</p>
                    </div>
                `;
                this.isRendering = false;
                return;
            }
        }
        
        try {
            // Load tier list data
            const data = await this.dataManager.getAllData();
            console.log('📊 Loaded data:', data);
            this.render(container, data);
        } catch (error) {
            console.error('❌ Failed to load tier list data:', error);
            container.innerHTML = `
                <div class="error-container">
                    <h3>Failed to load tier list data</h3>
                    <p>Error: ${error.message}</p>
                    <p>Please try refreshing the page.</p>
                </div>
            `;
        } finally {
            this.isRendering = false;
        }
    }
    
    render(container, data) {
        console.log('🎨 Rendering tier list content');
        
        const html = `
            <div class="tier-list-wrapper">
                <!-- Meta Snapshot Header -->
                <div class="meta-snapshot">
                    <div class="meta-info">
                        <h2><i class="fas fa-chart-line"></i> Meta Snapshot</h2>
                        <p class="meta-date">Last updated: September 2025</p>
                        <p class="meta-description">Priority rankings for current meta - 28 curated units across all tiers</p>
                    </div>
                    <div class="quick-picks">
                        <h3><i class="fas fa-star"></i> Quick Picks for Beginners</h3>
                        <div class="quick-pick-tags">
                            <span class="quick-tag">Easy to obtain</span>
                            <span class="quick-tag">Low cost</span>
                            <span class="quick-tag">High impact</span>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Navigation -->
                <div class="tier-navigation">
                    <div class="nav-buttons">
                        <button class="nav-btn" data-tier="BROKEN">🔥 BROKEN</button>
                        <button class="nav-btn" data-tier="META">⚡ META</button>
                        <button class="nav-btn" data-tier="SUB_META">💎 SUB-META</button>
                        <button class="nav-btn" data-tier="DECENT">⭐ DECENT</button>
                    </div>
                </div>
                
                <!-- Tier List Content -->
                <div class="tier-list-container" id="tierListResults">
                    ${this.renderTiers(data)}
                </div>

                <!-- CTA Section -->
                <div class="cta-section">
                    <div class="cta-content">
                        <h3><i class="fas fa-database"></i> Need detailed stats?</h3>
                        <p>Check our comprehensive Unit Database for complete character information</p>
                        <button class="cta-btn" onclick="window.location.hash = '#database'">
                            <i class="fas fa-arrow-right"></i> View Unit Database
                        </button>
                    </div>
                </div>

                <!-- Back to Top Button -->
                <button class="back-to-top" id="backToTop" style="display: none;">
                    <i class="fas fa-arrow-up"></i>
                </button>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Setup navigation listeners
        this.setupNavigationListeners(data);
        
        // Setup back to top button
        this.setupBackToTop();
        
        console.log('✅ Tier list content rendered successfully');
    }
    
    renderTiers(data, showTopTiersOnly = false) {
        if (!this.TIER_INFO) return '';
        
        const tiersToShow = showTopTiersOnly 
            ? Object.keys(this.TIER_INFO).filter(tier => tier === 'BROKEN' || tier === 'META')
            : Object.keys(this.TIER_INFO);
        
        return tiersToShow
            .sort((a, b) => this.TIER_INFO[a].priority - this.TIER_INFO[b].priority)
            .map((tierKey, index) => {
                const tierInfo = this.TIER_INFO[tierKey];
                const characters = data[tierKey] || [];
                
                return `
                    <div class="tier-section" id="tier-${tierKey}" data-tier="${tierKey}">
                        <div class="tier-header" data-tier="${tierKey}">
                            <div class="tier-title">
                                <h2 class="tier-name">${this.getTierEmoji(tierKey)} ${tierInfo.name}</h2>
                                <p class="tier-subtitle">${this.getTierSubtitle(tierKey)}</p>
                            </div>
                            <div class="tier-count">${characters.length} units</div>
                        </div>
                        <div class="characters-grid">
                            ${this.renderCharacters(characters, tierKey)}
                        </div>
                    </div>
                `;
            }).join('');
    }

    getTierSubtitle(tierKey) {
        const subtitles = {
            'BROKEN': 'Dominate all content',
            'META': 'Current top performers', 
            'SUB_META': 'Solid specialized choices',
            'DECENT': 'Usable alternatives'
        };
        return subtitles[tierKey] || 'Balanced options';
    }

    getTierEmoji(tierKey) {
        const emojis = {
            'BROKEN': '🔥',
            'META': '⚡',
            'SUB_META': '💎',
            'DECENT': '📊'
        };
        return emojis[tierKey] || '⭐';
    }
    
    renderCharacters(characters, tierKey) {
        return characters.map(character => `
            <div class="character-card" data-character-id="${character.id}" data-tier="${tierKey}">
                <div class="character-avatar" data-rarity="${character.rarity.toLowerCase()}" data-element="${character.element.toLowerCase()}">
                    <span class="avatar-letter">${character.name.charAt(0)}</span>
                    <div class="element-icon">${this.getElementIcon(character.element)}</div>
                </div>
                <div class="character-info">
                    <h3 class="character-name">${character.name}</h3>
                    <div class="character-tags">
                        <span class="rarity-tag ${character.rarity.toLowerCase()}">${character.rarity}</span>
                        ${this.getSpecialTags(character)}
                    </div>
                    <p class="tier-reason">${this.getTierReason(character, tierKey)}</p>
                    </div>
                <div class="hover-card">
                    <div class="hover-content">
                        <h4>${character.name}</h4>
                        <p class="hover-rarity">${character.rarity} • ${character.element}</p>
                        <p class="hover-reason">${this.getTierReason(character, tierKey)}</p>
                        <a href="#database" class="view-details-link">
                            <i class="fas fa-arrow-right"></i> View full details
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    getElementIcon(element) {
        const icons = {
            'Fire': '🔥',
            'Water': '💧', 
            'Nature': '🌿',
            'Wind': '💨',
            'Dark': '🌑',
            'Holy': '✨',
            'Unknown': '❓'
        };
        return icons[element] || '❓';
    }

    getSpecialTags(character) {
        let tags = '';
        
        // NEW PLAYER tag for beginner-friendly units
        if (this.isNewPlayerFriendly(character)) {
            tags += '<span class="special-tag new-player">NEW PLAYER</span>';
        }
        
        // INVESTMENT tag for high-value units
        if (this.isGoodInvestment(character)) {
            tags += '<span class="special-tag investment">INVESTMENT</span>';
        }
        
        return tags;
    }

    isNewPlayerFriendly(character) {
        // Logic for beginner-friendly units
        const beginnerFriendly = [
            'Sukono', 'Haruka Rin (Dancer)', 'Song Jinwu (Monarch)', 
            'Slime (King)', 'Friran (Teacher)', 'Alligator'
        ];
        return beginnerFriendly.includes(character.name);
    }

    isGoodInvestment(character) {
        // Logic for good investment units
        const goodInvestments = [
            'Sukono', 'Cha-In (Blade Dancer)'
        ];
        return goodInvestments.includes(character.name);
    }

    getTierReason(character, tierKey) {
        // Use character-specific reasons for better accuracy
        const characterReasons = {
            'Sukono': 'Cost-Efficient Powerhouse',
            'Cha-In (Blade Dancer)': 'AoE Control Master',
            'Haruka Rin (Dancer)': 'Essential Team Buffer',
            'Slime (King)': 'F2P Friendly Carry',
            'Conqueror vs Invulnerable': 'Boss Specialist',
            'Song Jinwu (Monarch)': 'Solid Mid-Game Option',
            'Akazo (Destructive)': 'Outclassed but Usable',
            'Chaso (Blood Curse)': 'Evolution Material',
            'Friran (Teacher)': 'Money Generation',
            'Alligator': 'Early Game Filler'
        };

        if (characterReasons[character.name]) {
            return characterReasons[character.name];
        }

        // Fallback to tier-based reasons
        const reasons = {
            'BROKEN': [
                'Ultimate DPS + Versatility',
                'Game-breaking Power',
                'Dominates All Content',
                'Meta Defining Unit'
            ],
            'META': [
                'Cost-efficient Powerhouse',
                'Current Meta King',
                'Versatile Top Performer',
                'Reliable High Impact'
            ],
            'SUB_META': [
                'Boss Specialist',
                'Situational Powerhouse',
                'Solid Niche Pick',
                'Reliable Alternative'
            ],
            'DECENT': [
                'Early Game Carry',
                'Budget Friendly',
                'Situational Use',
                'Decent Alternative'
            ]
        };
        
        const tierReasons = reasons[tierKey] || ['Balanced Choice'];
        return tierReasons[Math.floor(Math.random() * tierReasons.length)];
    }
    
    setupNavigationListeners(data) {
        // Tier navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tier = button.getAttribute('data-tier');
                this.scrollToTier(tier);
            });
        });

        // Character card hover effects
        this.setupHoverEffects();
    }

    setupHoverEffects() {
        const characterCards = document.querySelectorAll('.character-card');
        characterCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hovered');
            });
        });
    }
    
    scrollToTier(tier) {
        const tierElement = document.getElementById(`tier-${tier}`);
        if (tierElement) {
            tierElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Highlight the tier briefly
            const tierHeader = tierElement.querySelector('.tier-header');
            if (tierHeader) {
                tierHeader.style.background = 'rgba(162, 155, 254, 0.3)';
                setTimeout(() => {
                    tierHeader.style.background = '';
                }, 2000);
            }
            
            console.log(`🎯 Scrolled to ${tier} tier`);
        }
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    destroy() {
        console.log('🗑️ TierListPage destroyed');
    }
}

// Make TierListPage available globally
if (typeof window !== 'undefined') {
    window.TierListPage = TierListPage;
}