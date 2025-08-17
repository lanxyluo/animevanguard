// Evolution Guide Page - Complete Interactive Logic Implementation
import { UnitSelector } from '../components/UnitSelector.js';
import { CostSummary } from '../components/CostSummary.js';
import { MaterialsList } from '../components/MaterialsList.js';
import { FarmingGuide } from '../components/FarmingGuide.js';
import { EvolutionRequirements } from '../components/EvolutionRequirements.js';
import { showError, showNotification, showLoading, hideLoading } from '../utils/dom.js';
import { unitsData } from '../config/units.js';
import { evolutionData, materials, RARITY_COLORS, evolutionUtils } from '../config/evolutionData.js';

class EvolutionGuideManager {
  constructor() {
    this.initialized = false;
    this.currentUnit = null;
    this.components = {
      unitSelector: null,
      costSummary: null,
      materialsList: null,
      farmingGuide: null,
      evolutionRequirements: null
    };
    
    // Initialize components
    this.init();
  }

  async init() {
    try {
      showLoading('Initializing Evolution Guide...');
      
      await this.initializeComponents();
      await this.loadEvolutionUnits();
      this.bindEvents();
      
      this.initialized = true;
      hideLoading();
      showNotification('Evolution Guide loaded successfully!', 'success');
      
      console.log('✅ Evolution Guide initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Evolution Guide:', error);
      hideLoading();
      showError('Failed to initialize Evolution Guide. Please refresh the page.');
    }
  }

  async initializeComponents() {
    try {
      // Initialize UnitSelector with enhanced options
      this.components.unitSelector = new UnitSelector('unitSelectorContainer', {
        onUnitSelect: (unit) => this.handleUnitSelection(unit),
        showFilters: true,
        showSearch: true,
        placeholder: 'Select a unit to view evolution path...'
      });

      // Initialize other components
      this.components.costSummary = new CostSummary('cost-summary');
      this.components.materialsList = new MaterialsList('evolution-materials');
      this.components.farmingGuide = new FarmingGuide('farming-guide');
      this.components.evolutionRequirements = new EvolutionRequirements();

      console.log('✅ All components initialized');
    } catch (error) {
      console.error('❌ Component initialization failed:', error);
      throw error;
    }
  }

  async loadEvolutionUnits() {
    try {
      showLoading('Loading evolution data...');
      
      console.log('🔍 Starting to load evolution units...');
      console.log('📊 Total units in unitsData:', unitsData.length);
      console.log('🔍 Sample units:', unitsData.slice(0, 3).map(u => ({ name: u.name, id: u.id, rarity: u.rarity })));
      
      // Filter units that can evolve
      const evolvableUnits = unitsData.filter(unit => {
        // 尝试多种ID匹配策略
        const possibleIds = [
          this.generateUnitId(unit.name),           // 从名称生成
          unit.id,                                  // 直接使用unit.id
          unit.id.replace(/_base$/, ''),            // 移除_base后缀
          unit.id.replace(/_evolved$/, ''),         // 移除_evolved后缀
          unit.name.toLowerCase().replace(/\s+/g, '') // 从名称生成（备用）
        ];
        
        // 检查是否有任何ID匹配evolutionData
        const hasEvolutionData = possibleIds.some(id => evolutionData[id] !== undefined);
        const canEvolveByRarity = ['Rare', 'Epic', 'Legendary', 'Mythic'].includes(unit.rarity);
        
        console.log(`🔍 Unit ${unit.name}:`, {
          unitId: unit.id,
          possibleIds,
          hasEvolutionData,
          canEvolveByRarity,
          rarity: unit.rarity
        });
        
        return hasEvolutionData || canEvolveByRarity;
      });

      console.log(`📊 Found ${evolvableUnits.length} evolvable units`);
      console.log('🔍 Evolvable units:', evolvableUnits.map(u => ({ name: u.name, id: u.id, rarity: u.rarity })));
      
      // Set units to selector
      if (this.components.unitSelector) {
        console.log('✅ UnitSelector component found, setting units...');
        this.components.unitSelector.setUnits(evolvableUnits, {});
        console.log('✅ Units set to UnitSelector');
      } else {
        console.error('❌ UnitSelector component not found!');
        console.log('🔍 Available components:', Object.keys(this.components));
      }

      hideLoading();
    } catch (error) {
      console.error('❌ Failed to load evolution units:', error);
      hideLoading();
      throw error;
    }
  }

  // 1. Enhanced Unit Selection Handler with Loading States
  async handleUnitSelection(unit) {
    try {
      console.log('🎯 Processing unit selection:', unit);
      
      if (!unit) {
        this.clearAllDisplays();
        return;
      }

      // Show loading state
      this.showLoadingState();
      
      // Generate unit ID and lookup evolution data
      const unitId = this.generateUnitId(unit.name);
      const evolutionInfo = this.lookupEvolutionData(unitId, unit);
      
      if (!evolutionInfo) {
        this.showNoEvolutionData(unit.name);
        return;
      }

      // Update all display areas with enhanced error handling
      await this.updateAllDisplays(evolutionInfo);
      
      this.currentUnit = evolutionInfo;
      console.log('✅ Unit selection processed successfully');
      
    } catch (error) {
      console.error('❌ Error processing unit selection:', error);
      this.showErrorState('Failed to load evolution data. Please try again.');
    } finally {
      this.hideLoadingState();
    }
  }

  // 2. Enhanced Data Lookup with Better Error Handling
  lookupEvolutionData(unitId, unit) {
    console.log(`🔍 Looking up evolution data for: ${unit.name} (ID: ${unitId})`);
    
    // 尝试多种ID匹配策略
    const possibleIds = [
      unitId,                                        // 传入的ID
      unit.id,                                       // 直接使用unit.id
      unit.id.replace(/_base$/, ''),                 // 移除_base后缀
      unit.id.replace(/_evolved$/, ''),              // 移除_evolved后缀
      this.generateUnitId(unit.name),                // 从名称生成
      unit.name.toLowerCase().replace(/\s+/g, '')    // 从名称生成（备用）
    ];
    
    // 查找匹配的evolutionData
    let evolutionInfo = null;
    let matchedId = null;
    
    for (const id of possibleIds) {
      if (evolutionData[id]) {
        evolutionInfo = evolutionData[id];
        matchedId = id;
        break;
      }
    }
    
    if (evolutionInfo) {
      console.log(`✅ Found evolution data for ${unit.name} with ID: ${matchedId}`);
      return {
        ...unit,
        unitId: matchedId,
        evolutionData: evolutionInfo,
        evolutions: evolutionInfo.evolutions,
        hasEvolutionData: true
      };
    }

    // Check if unit can evolve by rarity but no specific data
    if (['Rare', 'Epic', 'Legendary', 'Mythic'].includes(unit.rarity)) {
      console.log(`⚠️ Unit ${unit.name} can evolve but no specific data found`);
      return {
        ...unit,
        unitId: unitId,
        hasEvolutionData: false,
        canEvolveByRarity: true
      };
    }

    console.log(`❌ No evolution data found for ${unit.name}`);
    return null;
  }

  // 3. Enhanced Display Updates with Material Color Classification
  async updateAllDisplays(evolutionInfo) {
    try {
      // Update Evolution Requirements with enhanced display
      await this.updateEvolutionRequirements(evolutionInfo);
      
      // Update Cost Summary with gradient colors
      await this.updateCostSummary(evolutionInfo);
      
      // Update Materials List with rarity color classification
      await this.updateMaterialsList(evolutionInfo);
      
      // Update Farming Guide with efficiency sorting
      await this.updateFarmingGuide(evolutionInfo);
      
    } catch (error) {
      console.error('❌ Error updating displays:', error);
      throw error;
    }
  }

  // 4. Enhanced Evolution Requirements Display
  async updateEvolutionRequirements(evolutionInfo) {
    const container = this.getContainer('evolution-requirements');
    if (!container) return;

    if (!evolutionInfo.hasEvolutionData) {
      container.innerHTML = this.renderDataUpdatingMessage();
      return;
    }

    try {
      // Use EvolutionRequirements component for rich display
      const requirementsHtml = this.components.evolutionRequirements.render(evolutionInfo.unitId);
      container.innerHTML = requirementsHtml;
      
      // Bind interactive events
      this.components.evolutionRequirements.bindEvents();
      
    } catch (error) {
      console.error('❌ Error updating evolution requirements:', error);
      container.innerHTML = this.renderErrorMessage('Failed to load evolution requirements');
    }
  }

  // 5. Enhanced Cost Summary with Gradient Colors
  async updateCostSummary(evolutionInfo) {
    const container = this.getContainer('cost-summary');
    if (!container) return;

    if (!evolutionInfo.hasEvolutionData) {
      container.innerHTML = this.renderDataUpdatingMessage();
      return;
    }

    try {
      const costData = evolutionUtils.calculateEvolutionCost ? 
        evolutionUtils.calculateEvolutionCost(evolutionInfo.unitId) : 
        this.calculateCostFallback(evolutionInfo);

      const difficulty = this.calculateDifficulty(costData);
      
      container.innerHTML = `
        <div class="cost-summary-container">
          <div class="cost-header">
            <h3>Total Evolution Cost</h3>
            <span class="difficulty-badge ${difficulty.class}">${difficulty.label}</span>
          </div>
          
          <div class="cost-cards">
            <div class="cost-card gold-card" style="background: linear-gradient(135deg, #ffd700, #ffed4e);">
              <div class="cost-icon">💰</div>
              <div class="cost-value">${costData.totalCost.toLocaleString()}</div>
              <div class="cost-label">Gold Required</div>
            </div>
            
            ${costData.totalGems > 0 ? `
              <div class="cost-card gems-card" style="background: linear-gradient(135deg, #9c27b0, #e91e63);">
                <div class="cost-icon">💎</div>
                <div class="cost-value">${costData.totalGems}</div>
                <div class="cost-label">Gems Required</div>
              </div>
            ` : ''}
            
            <div class="cost-card materials-card" style="background: linear-gradient(135deg, #2196f3, #00bcd4);">
              <div class="cost-icon">🧪</div>
              <div class="cost-value">${costData.totalMaterials}</div>
              <div class="cost-label">Materials Required</div>
            </div>
          </div>
          
          <div class="cost-breakdown">
            <h4>Cost by Tier</h4>
            <div class="tier-costs">
              ${costData.breakdown.map((tier, index) => `
                <div class="tier-cost-item">
                  <div class="tier-info">
                    <span class="tier-name">${tier.name}</span>
                    <span class="tier-multiplier">${tier.statMultiplier || 1.0}x stats</span>
                  </div>
                  <div class="tier-requirements">
                    <span class="cost">${tier.cost.toLocaleString()} gold</span>
                    ${tier.gems > 0 ? `<span class="gems">${tier.gems} gems</span>` : ''}
                    <span class="materials">${tier.materials.length} materials</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('❌ Error updating cost summary:', error);
      container.innerHTML = this.renderErrorMessage('Failed to load cost summary');
    }
  }

  // 6. Enhanced Materials List with Rarity Color Classification
  async updateMaterialsList(evolutionInfo) {
    const container = this.getContainer('evolution-materials');
    if (!container) return;

    if (!evolutionInfo.hasEvolutionData) {
      container.innerHTML = this.renderDataUpdatingMessage();
      return;
    }

    try {
      const allMaterials = this.collectAllMaterials(evolutionInfo);
      const sortedMaterials = this.sortMaterialsByRarity(allMaterials);

      container.innerHTML = `
        <div class="materials-container">
          <div class="materials-header">
            <h3>Required Materials</h3>
            <div class="rarity-legend">
              ${Object.entries(RARITY_COLORS).map(([rarity, color]) => `
                <span class="rarity-indicator" style="background: ${color}">${rarity}</span>
              `).join('')}
            </div>
          </div>
          
          <div class="materials-grid">
            ${sortedMaterials.map(material => {
              const materialData = this.getMaterialData(material.name);
              const rarity = materialData?.rarity || 'Common';
              const color = RARITY_COLORS[rarity] || RARITY_COLORS.Common;
              
              return `
                <div class="material-card" data-rarity="${rarity}" style="border-left: 4px solid ${color}">
                  <div class="material-header">
                    <h4 class="material-name" style="color: ${color}">${material.name}</h4>
                    <span class="material-quantity">x${material.quantity}</span>
                  </div>
                  <div class="material-info">
                    <span class="material-rarity" style="background: ${color}">${rarity}</span>
                    ${materialData ? `
                      <div class="material-details">
                        <p class="material-description">${materialData.description}</p>
                        <div class="material-stats">
                          <span class="drop-rate">📊 ${materialData.dropRate}</span>
                          <span class="sources">📍 ${materialData.source.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    ` : '<p class="material-description">Material information updating...</p>'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } catch (error) {
      console.error('❌ Error updating materials list:', error);
      container.innerHTML = this.renderErrorMessage('Failed to load materials list');
    }
  }

  // 7. Enhanced Farming Guide with Efficiency Sorting
  async updateFarmingGuide(evolutionInfo) {
    const container = this.getContainer('farming-guide');
    if (!container) return;

    if (!evolutionInfo.hasEvolutionData) {
      container.innerHTML = this.renderDataUpdatingMessage();
      return;
    }

    try {
      const farmingMethods = this.getFarmingMethods();
      const sortedMethods = farmingMethods.sort((a, b) => b.efficiency - a.efficiency);

      container.innerHTML = `
        <div class="farming-guide-container">
          <div class="farming-header">
            <h3>Farming Guide</h3>
            <div class="efficiency-legend">
              <span class="efficiency-indicator ultra">Ultra High</span>
              <span class="efficiency-indicator high">High</span>
              <span class="efficiency-indicator medium">Medium</span>
              <span class="efficiency-indicator low">Low</span>
            </div>
          </div>
          
          <div class="farming-methods">
            ${sortedMethods.map(method => `
              <div class="farming-method" data-efficiency="${method.efficiency}">
                <div class="method-header">
                  <h4 class="method-name">${method.name}</h4>
                  <span class="efficiency-badge ${method.efficiencyClass}">${method.efficiencyLabel}</span>
                </div>
                <div class="method-details">
                  <div class="method-info">
                    <span class="stamina-cost">⚡ ${method.staminaCost}</span>
                    <span class="attempts">🔄 ${method.attempts}</span>
                    <span class="drop-rate">📊 ${method.dropRate}</span>
                  </div>
                  <div class="method-materials">
                    <strong>Materials:</strong> ${method.materials.join(', ')}
                  </div>
                  <div class="method-recommendation">
                    <strong>💡 Tip:</strong> ${method.recommendation}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="farming-tips">
            <h4>Optimal Farming Strategy</h4>
            <ul>
              <li><strong>Priority:</strong> Focus on Ultra High and High efficiency methods first</li>
              <li><strong>Daily:</strong> Complete all daily dungeons for consistent material gain</li>
              <li><strong>Events:</strong> Participate in limited-time events for rare materials</li>
              <li><strong>Planning:</strong> Check material requirements before spending stamina</li>
            </ul>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('❌ Error updating farming guide:', error);
      container.innerHTML = this.renderErrorMessage('Failed to load farming guide');
    }
  }

  // 8. Enhanced Error Handling
  showNoEvolutionData(unitName) {
    const message = `
      <div class="no-evolution-display">
        <div class="no-evo-icon">🚫</div>
        <div class="no-evo-message">${unitName} Evolution Path Not Available</div>
        <div class="no-evo-info">
          <p>This unit currently doesn't have evolution data in our database.</p>
          <p>Only Mythic and Secret units can evolve in Anime Vanguards.</p>
        </div>
        <button class="retry-button" onclick="location.reload()">
          <i class="fas fa-refresh"></i> Refresh Data
        </button>
      </div>
    `;
    
    this.updateAllContainers(message);
  }

  showErrorState(message) {
    const errorDisplay = `
      <div class="error-display">
        <div class="error-icon">⚠️</div>
        <div class="error-message">${message}</div>
        <div class="error-actions">
          <button class="retry-button" onclick="location.reload()">
            <i class="fas fa-refresh"></i> Refresh Page
          </button>
        </div>
      </div>
    `;
    
    this.updateAllContainers(errorDisplay);
  }

  renderDataUpdatingMessage() {
    return `
      <div class="data-updating">
        <div class="updating-icon">🔄</div>
        <div class="updating-message">Data Updating...</div>
        <div class="updating-info">Evolution information is being updated. Please check back later.</div>
      </div>
    `;
  }

  renderErrorMessage(message) {
    return `
      <div class="error-message">
        <div class="error-icon">❌</div>
        <div class="error-text">${message}</div>
      </div>
    `;
  }

  // 9. Loading States
  showLoadingState() {
    const loadingDisplay = `
      <div class="loading-display">
        <div class="loading-spinner"></div>
        <div class="loading-message">Loading evolution data...</div>
      </div>
    `;
    
    this.updateAllContainers(loadingDisplay);
  }

  hideLoadingState() {
    // Loading states will be replaced by actual content
  }

  // 10. Utility Functions
  generateUnitId(unitName) {
    // 改进的ID生成逻辑，尝试匹配evolutionData中的键
    let id = unitName.toLowerCase().replace(/\s+/g, '');
    
    // 特殊处理：移除常见的后缀
    id = id.replace(/_base$/, '');
    id = id.replace(/_evolved$/, '');
    id = id.replace(/_form$/, '');
    id = id.replace(/_mode$/, '');
    
    // 特殊处理：处理括号内容
    id = id.replace(/\([^)]*\)/g, '');
    id = id.replace(/\s+/g, ''); // 再次清理空格
    
    return id;
  }

  getContainer(type) {
    const selectors = [
      `[data-${type}]`,
      `.${type}`,
      `#${type}`,
      `[data-${type.replace('-', '')}]`,
      `.${type.replace('-', '')}`
    ];
    
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) return element;
    }
    
    console.warn(`Container not found for type: ${type}`);
    return null;
  }

  updateAllContainers(content) {
    const containers = ['evolution-requirements', 'evolution-materials', 'cost-summary', 'farming-guide'];
    containers.forEach(type => {
      const container = this.getContainer(type);
      if (container) {
        container.innerHTML = content;
      }
    });
  }

  clearAllDisplays() {
    const clearMessage = `
      <div class="select-prompt">
        <div class="prompt-icon">🔍</div>
        <div class="prompt-message">Select a unit to view evolution data</div>
      </div>
    `;
    
    this.updateAllContainers(clearMessage);
  }

  // Helper functions
  calculateCostFallback(evolutionInfo) {
    // Fallback cost calculation if utility function not available
    let totalCost = 0;
    let totalGems = 0;
    let totalMaterials = 0;
    const breakdown = [];

    if (evolutionInfo.evolutionData && evolutionInfo.evolutionData.evolutions) {
      evolutionInfo.evolutionData.evolutions.forEach(tier => {
        totalCost += tier.requirements.cost || 0;
        totalGems += tier.requirements.gems || 0;
        totalMaterials += tier.requirements.materials ? tier.requirements.materials.length : 0;
        
        breakdown.push({
          name: tier.name,
          cost: tier.requirements.cost || 0,
          gems: tier.requirements.gems || 0,
          materials: tier.requirements.materials || [],
          statMultiplier: tier.statMultiplier
        });
      });
    }

    return { totalCost, totalGems, totalMaterials, breakdown };
  }

  calculateDifficulty(costData) {
    const totalCost = costData.totalCost + (costData.totalGems * 100);
    
    if (totalCost > 10000) return { class: 'ultra', label: 'Ultra Hard' };
    if (totalCost > 5000) return { class: 'high', label: 'Hard' };
    if (totalCost > 2000) return { class: 'medium', label: 'Medium' };
    return { class: 'low', label: 'Easy' };
  }

  collectAllMaterials(evolutionInfo) {
    const allMaterials = new Map();
    
    if (evolutionInfo.evolutionData && evolutionInfo.evolutionData.evolutions) {
      evolutionInfo.evolutionData.evolutions.forEach(tier => {
        if (tier.requirements.materials) {
          tier.requirements.materials.forEach(materialStr => {
            const material = evolutionUtils.parseMaterialString(materialStr);
            const existing = allMaterials.get(material.name) || { quantity: 0 };
            existing.quantity += material.quantity;
            allMaterials.set(material.name, { name: material.name, quantity: existing.quantity });
          });
        }
      });
    }
    
    return Array.from(allMaterials.values());
  }

  sortMaterialsByRarity(materials) {
    const rarityOrder = { 'Mythic': 6, 'Legendary': 5, 'Epic': 4, 'Rare': 3, 'Uncommon': 2, 'Common': 1 };
    
    return materials.sort((a, b) => {
      const aData = this.getMaterialData(a.name);
      const bData = this.getMaterialData(b.name);
      const aRarity = rarityOrder[aData?.rarity || 'Common'] || 1;
      const bRarity = rarityOrder[bData?.rarity || 'Common'] || 1;
      
      return bRarity - aRarity;
    });
  }

  getMaterialData(materialName) {
    return materials[materialName] || null;
  }

  getFarmingMethods() {
    return [
      {
        name: 'Daily Material Dungeon',
        efficiency: 5,
        efficiencyClass: 'ultra',
        efficiencyLabel: 'Ultra High',
        staminaCost: '25 Stamina',
        attempts: '3 Attempts/Day',
        dropRate: '70-80%',
        materials: ['Water Essence', 'Fire Essence', 'Training Manual'],
        recommendation: 'Complete daily for consistent material gain'
      },
      {
        name: 'Weekly Boss Challenge',
        efficiency: 4,
        efficiencyClass: 'high',
        efficiencyLabel: 'High',
        staminaCost: '50 Stamina',
        attempts: '1 Attempt/Week',
        dropRate: '25-30%',
        materials: ['Epic Materials', 'Rare Essences'],
        recommendation: 'Essential for rare materials'
      },
      {
        name: 'Story Mode Ch1-5',
        efficiency: 4,
        efficiencyClass: 'high',
        efficiencyLabel: 'High',
        staminaCost: '10 Stamina',
        attempts: 'Unlimited',
        dropRate: '40-50%',
        materials: ['Basic Essences', 'Training Materials'],
        recommendation: 'Best for farming common materials'
      },
      {
        name: 'Monthly Legendary Event',
        efficiency: 5,
        efficiencyClass: 'ultra',
        efficiencyLabel: 'Ultra High',
        staminaCost: '100 Stamina',
        attempts: '1 Attempt/Month',
        dropRate: '2-3%',
        materials: ['Legendary Materials', 'Mythic Fragments'],
        recommendation: 'Don\'t miss this event!'
      },
      {
        name: 'Raid Battles',
        efficiency: 3,
        efficiencyClass: 'medium',
        efficiencyLabel: 'Medium',
        staminaCost: '30-80 Stamina',
        attempts: 'Limited',
        dropRate: '15-20%',
        materials: ['Epic Materials', 'Rare Crystals'],
        recommendation: 'Good for mid-tier materials'
      }
    ];
  }

  bindEvents() {
    // Additional event binding if needed
    console.log('✅ Events bound successfully');
  }

  // Public methods
  getCurrentUnit() {
    return this.currentUnit;
  }

  isInitialized() {
    return this.initialized;
  }
}

// Initialize Evolution Guide
let evolutionManager;

function initializeEvolutionGuide() {
  try {
    evolutionManager = new EvolutionGuideManager();
    console.log('✅ Evolution Guide Manager initialized');
  } catch (error) {
    console.error('❌ Failed to initialize Evolution Guide Manager:', error);
    showError('Failed to initialize Evolution Guide. Please refresh the page.');
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initializeEvolutionGuide, 500);
});

// Export for compatibility
export class EvolutionPage {
  constructor(app) {
    this.app = app;
    this.manager = null;
  }

  async initialize() {
    console.log('🚀 Initializing Evolution Page...');
    this.manager = new EvolutionGuideManager();
    console.log('✅ Evolution Page initialized');
    return true;
  }

  show() {
    console.log('🎯 Evolution Page show method called');
    if (this.manager && this.manager.isInitialized()) {
      console.log('✅ Evolution Guide Manager is ready');
      // 可以在这里添加页面显示逻辑
    } else {
      console.warn('⚠️ Evolution Guide Manager not ready yet');
    }
  }

  cleanup() {
    console.log('🧹 Cleaning up Evolution Page...');
  }
}

// Global export
window.evolutionManager = evolutionManager;