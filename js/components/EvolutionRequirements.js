// Evolution Requirements Display Component
import { evolutionData, materials, RARITY_COLORS, calculateEvolutionCost } from '../config/evolutionData.js';

export class EvolutionRequirements {
    constructor() {
        this.currentUnit = null;
    }

    render(unitId) {
        this.currentUnit = unitId;
        const evolution = evolutionData.find(evo => evo.unitId === unitId);
        
        if (!evolution) {
            return '<div class="evolution-requirements"><p>No evolution data available for this unit.</p></div>';
        }

        return `
            <div class="evolution-requirements">
                <h3>Evolution Requirements</h3>
                ${this.renderEvolutionPath(evolution)}
                ${this.renderCostSummary(unitId)}
                ${this.renderMaterialsGuide(evolution)}
                ${this.renderFarmingGuide(evolution)}
            </div>
        `;
    }

    renderEvolutionPath(evolution) {
        let html = '<div class="evolution-path">';
        
        for (let i = 0; i < evolution.evolutions.length - 1; i++) {
            const currentTier = evolution.evolutions[i];
            const nextTier = evolution.evolutions[i + 1];
            
            html += `
                <div class="evolution-step">
                    <div class="evolution-tier">
                        <div class="tier-info">
                            <h4>Tier ${currentTier.tier} → Tier ${nextTier.tier}</h4>
                            <div class="tier-names">
                                <span class="current-name">${currentTier.name}</span>
                                <span class="arrow">→</span>
                                <span class="next-name">${nextTier.name}</span>
                            </div>
                        </div>
                        <div class="requirements">
                            ${this.renderRequirements(nextTier.requirements)}
                        </div>
                        <div class="stat-boost">
                            <span class="multiplier">Stat Multiplier: ${nextTier.statMultiplier}x</span>
                            <span class="boost">+${Math.round((nextTier.statMultiplier - currentTier.statMultiplier) * 100)}% boost</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }

    renderRequirements(requirements) {
        let html = '<div class="requirement-details">';
        
        // Level requirement
        html += `<div class="req-item level-req">
            <i class="icon-level"></i>
            <span>Level ${requirements.level}</span>
        </div>`;
        
        // Cost requirement
        html += `<div class="req-item cost-req">
            <i class="icon-coins"></i>
            <span>${requirements.cost.toLocaleString()} coins</span>
        </div>`;
        
        // Gems requirement
        if (requirements.gems) {
            html += `<div class="req-item gems-req">
                <i class="icon-gems"></i>
                <span>${requirements.gems} gems</span>
            </div>`;
        }
        
        // Materials requirement
        if (requirements.materials && requirements.materials.length > 0) {
            html += '<div class="req-item materials-req">';
            html += '<i class="icon-materials"></i>';
            html += '<div class="materials-list">';
            
            requirements.materials.forEach(materialStr => {
                const material = this.parseMaterial(materialStr);
                const materialData = materials.find(m => m.name === material.name);
                const rarity = materialData ? materialData.rarity : 'Common';
                const color = RARITY_COLORS[rarity];
                
                html += `
                    <div class="material-item" data-material="${material.name}">
                        <span class="material-name" style="color: ${color}">
                            ${material.name}
                        </span>
                        <span class="material-quantity">x${material.quantity}</span>
                    </div>
                `;
            });
            
            html += '</div></div>';
        }
        
        html += '</div>';
        return html;
    }

    renderCostSummary(unitId) {
        const costData = calculateEvolutionCost(unitId);
        if (!costData) return '';

        return `
            <div class="cost-summary">
                <h4>Total Evolution Cost</h4>
                <div class="cost-breakdown">
                    <div class="total-costs">
                        <div class="cost-item">
                            <i class="icon-coins"></i>
                            <span class="cost-value">${costData.totalCost.toLocaleString()}</span>
                            <span class="cost-label">Total Coins</span>
                        </div>
                        <div class="cost-item">
                            <i class="icon-gems"></i>
                            <span class="cost-value">${costData.totalGems}</span>
                            <span class="cost-label">Total Gems</span>
                        </div>
                        <div class="cost-item">
                            <i class="icon-materials"></i>
                            <span class="cost-value">${costData.totalMaterials}</span>
                            <span class="cost-label">Materials Needed</span>
                        </div>
                    </div>
                    <div class="tier-breakdown">
                        <h5>Cost by Tier:</h5>
                        ${costData.breakdown.map(tier => `
                            <div class="tier-cost">
                                <span class="tier-name">${tier.name}</span>
                                <div class="tier-costs">
                                    <span class="coins">${tier.cost.toLocaleString()} coins</span>
                                    ${tier.gems > 0 ? `<span class="gems">${tier.gems} gems</span>` : ''}
                                    <span class="materials">${tier.materials.length} materials</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderMaterialsGuide(evolution) {
        // Collect all unique materials needed
        const allMaterials = new Set();
        evolution.evolutions.forEach(tier => {
            tier.requirements.materials.forEach(materialStr => {
                const material = this.parseMaterial(materialStr);
                allMaterials.add(material.name);
            });
        });

        if (allMaterials.size === 0) return '';

        let html = `
            <div class="materials-guide">
                <h4>Materials Information</h4>
                <div class="materials-grid">
        `;

        allMaterials.forEach(materialName => {
            const materialData = materials.find(m => m.name === materialName);
            if (materialData) {
                const color = RARITY_COLORS[materialData.rarity];
                html += `
                    <div class="material-card" data-rarity="${materialData.rarity}">
                        <div class="material-header">
                            <h5 class="material-name" style="color: ${color}">
                                ${materialData.name}
                            </h5>
                            <span class="material-rarity" style="background-color: ${color}">
                                ${materialData.rarity}
                            </span>
                        </div>
                        <div class="material-info">
                            <p class="material-description">${materialData.description}</p>
                            <div class="material-stats">
                                <div class="drop-rate">
                                    <i class="icon-drop"></i>
                                    <span>Drop Rate: ${materialData.dropRate}</span>
                                </div>
                                <div class="sources">
                                    <i class="icon-location"></i>
                                    <span>Sources:</span>
                                    <ul>
                                        ${materialData.source.map(source => 
                                            `<li>${source}</li>`
                                        ).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        html += '</div></div>';
        return html;
    }

    renderFarmingGuide(evolution) {
        return `
            <div class="farming-guide">
                <h4>Farming Recommendations</h4>
                <div class="farming-sections">
                    <div class="farming-section">
                        <h5>Daily Farming (Recommended)</h5>
                        <div class="farming-method">
                            <div class="method-header">
                                <span class="method-name">Daily Material Dungeon</span>
                                <span class="efficiency high">Very High Efficiency</span>
                            </div>
                            <div class="method-details">
                                <span class="stamina-cost">25 Stamina • 3 Attempts</span>
                                <span class="materials">Water Essence, Fire Essence, Training Manual</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="farming-section">
                        <h5>Story Mode Farming</h5>
                        <div class="farming-method">
                            <div class="method-header">
                                <span class="method-name">Chapter 1-5</span>
                                <span class="efficiency high">High Efficiency</span>
                            </div>
                            <div class="method-details">
                                <span class="stamina-cost">10 Stamina</span>
                                <span class="materials">Basic Essences (70% drop rate)</span>
                            </div>
                        </div>
                        <div class="farming-method">
                            <div class="method-header">
                                <span class="method-name">Chapter 6-10</span>
                                <span class="efficiency high">High Efficiency</span>
                            </div>
                            <div class="method-details">
                                <span class="stamina-cost">15 Stamina</span>
                                <span class="materials">Training Materials (40-45% drop rate)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="farming-section">
                        <h5>Event Farming</h5>
                        <div class="farming-method">
                            <div class="method-header">
                                <span class="method-name">Weekly Boss Challenge</span>
                                <span class="efficiency high">High Efficiency</span>
                            </div>
                            <div class="method-details">
                                <span class="stamina-cost">50 Stamina • 1 Attempt</span>
                                <span class="materials">Epic Materials (8-12% drop rate)</span>
                            </div>
                        </div>
                        <div class="farming-method">
                            <div class="method-header">
                                <span class="method-name">Monthly Legendary Event</span>
                                <span class="efficiency ultra">Ultra High Efficiency</span>
                            </div>
                            <div class="method-details">
                                <span class="stamina-cost">100 Stamina • 1 Attempt</span>
                                <span class="materials">Legendary Materials (2-3% drop rate)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="farming-section">
                        <h5>Raid Farming</h5>
                        <div class="farming-method">
                            <div class="method-header">
                                <span class="method-name">Normal Raids</span>
                                <span class="efficiency medium">Medium Efficiency</span>
                            </div>
                            <div class="method-details">
                                <span class="stamina-cost">30 Stamina</span>
                                <span class="materials">Epic Materials (8-12% drop rate)</span>
                            </div>
                        </div>
                        <div class="farming-method">
                            <div class="method-header">
                                <span class="method-name">Mythic Raids</span>
                                <span class="efficiency low">Low Efficiency (High Reward)</span>
                            </div>
                            <div class="method-details">
                                <span class="stamina-cost">100 Stamina</span>
                                <span class="materials">Mythic Materials (0.2-0.6% drop rate)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="farming-tips">
                    <h5>Farming Tips</h5>
                    <ul>
                        <li><strong>Priority:</strong> Focus on Daily Dungeons first for consistent material gain</li>
                        <li><strong>Efficiency:</strong> Story Mode Ch1-5 and Ch6-10 offer the best stamina-to-material ratio</li>
                        <li><strong>Events:</strong> Always participate in weekly and monthly events for rare materials</li>
                        <li><strong>Planning:</strong> Check material requirements before farming to avoid waste</li>
                        <li><strong>Stamina:</strong> Save stamina for high-efficiency farming periods</li>
                    </ul>
                </div>
            </div>
        `;
    }

    parseMaterial(materialStr) {
        // Parse "Material Name x3" format
        const match = materialStr.match(/^(.+?)(?: x(\d+))?$/);
        if (match) {
            return {
                name: match[1].trim(),
                quantity: parseInt(match[2]) || 1
            };
        }
        return { name: materialStr.trim(), quantity: 1 };
    }

    // Event handlers for interactive features
    bindEvents() {
        // Material hover tooltips
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('[data-material]')) {
                this.showMaterialTooltip(e.target, e.target.dataset.material);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('[data-material]')) {
                this.hideMaterialTooltip();
            }
        });

        // Material card expand/collapse
        document.addEventListener('click', (e) => {
            if (e.target.closest('.material-card')) {
                e.target.closest('.material-card').classList.toggle('expanded');
            }
        });
    }

    showMaterialTooltip(element, materialName) {
        const materialData = materials.find(m => m.name === materialName);
        if (!materialData) return;

        // Remove existing tooltip
        this.hideMaterialTooltip();

        const tooltip = document.createElement('div');
        tooltip.className = 'material-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">
                <span class="tooltip-name" style="color: ${RARITY_COLORS[materialData.rarity]}">
                    ${materialData.name}
                </span>
                <span class="tooltip-rarity" style="background-color: ${RARITY_COLORS[materialData.rarity]}">
                    ${materialData.rarity}
                </span>
            </div>
            <p class="tooltip-description">${materialData.description}</p>
            <div class="tooltip-stats">
                <div class="tooltip-drop">Drop Rate: ${materialData.dropRate}</div>
                <div class="tooltip-sources">
                    Sources: ${materialData.source.slice(0, 2).join(', ')}
                    ${materialData.source.length > 2 ? '...' : ''}
                </div>
            </div>
        `;

        document.body.appendChild(tooltip);

        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 5) + 'px';
        tooltip.style.zIndex = '1000';
    }

    hideMaterialTooltip() {
        const existing = document.querySelector('.material-tooltip');
        if (existing) {
            existing.remove();
        }
    }
}
