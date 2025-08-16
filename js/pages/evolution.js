// Evolution Guide 完整修复 - 集成UnitSelector组件和智能筛选
import { UnitSelector } from '../components/UnitSelector.js';
import { CostSummary } from '../components/CostSummary.js';
import { MaterialsList } from '../components/MaterialsList.js';
import { FarmingGuide } from '../components/FarmingGuide.js';
import { EvolutionRequirements } from '../components/EvolutionRequirements.js';
import { showError, showNotification } from '../utils/dom.js';
import { unitsData } from '../config/units.js';
import { evolutionData } from '../config/evolutionData.js';

// 1. 修复函数调用错误并集成组件系统
class EvolutionGuideManager {
  constructor() {
    this.evolutionData = this.getEvolutionData();
    this.materialsDatabase = this.getMaterialsDatabase();
    this.unitSelector = null;
    this.costSummary = null;
    this.materialsList = null;
    this.farmingGuide = null;
    this.evolutionRequirements = null;
    this.initialized = false;
    // 异步初始化
    this.init();
  }

  async init() {
    await this.initializeComponents();
    this.initialized = true;
  }

  // 修复：初始化所有组件
  async initializeComponents() {
    try {
      // 初始化UnitSelector组件 - 这将恢复智能筛选功能
      this.unitSelector = new UnitSelector('unit-selection', {
        onUnitSelect: (unit) => this.processUnitSelection(unit),
        showFilters: true,
        showSearch: true
      });

      // 初始化其他组件
      this.costSummary = new CostSummary('cost-summary');
      this.materialsList = new MaterialsList('evolution-materials');
      this.farmingGuide = new FarmingGuide('farming-guide');
      this.evolutionRequirements = new EvolutionRequirements();

      // 加载进化单位数据到UnitSelector
      await this.loadEvolutionUnitsData();

      console.log("✅ 所有组件初始化成功");
    } catch (error) {
      console.error("❌ 组件初始化失败:", error);
      showError("Failed to initialize Evolution Guide components");
    }
  }

  // 修复：加载真实的Unit Database数据
  async loadEvolutionUnitsData() {
    try {
      console.log("🔄 Loading evolution units data from Unit Database...");
      
      // 筛选可以进化的单位（从真实的Unit Database数据）
      const evolvableUnits = unitsData.filter(unit => {
        // 只显示有进化数据的单位
        const unitId = unit.name.toLowerCase().replace(/\s+/g, '');
        return evolutionData[unitId] || 
               (unit.rarity && ['Rare', 'Epic', 'Legendary', 'Mythic'].includes(unit.rarity));
      });
      
      console.log(`📊 Found ${evolvableUnits.length} evolvable units from Unit Database`);
      console.log("🔍 Available rarities:", [...new Set(evolvableUnits.map(u => u.rarity))]);
      console.log("🔍 Available elements:", [...new Set(evolvableUnits.map(u => u.element))]);
      
      // 设置数据到UnitSelector
      if (this.unitSelector && evolvableUnits.length > 0) {
        this.unitSelector.setUnits(evolvableUnits, {});
        console.log("✅ Evolution units data loaded successfully from Unit Database");
      } else {
        console.warn("⚠️ No evolvable units found or UnitSelector not initialized");
      }
    } catch (error) {
      console.error("❌ Failed to load evolution units data:", error);
    }
  }

  // 修复：处理单位选择，使用新的进化数据
  lookupEvolutionData(unit) {
    // 安全检查
    if (!unit || !unit.name) {
      console.error('❌ Invalid unit object passed to lookupEvolutionData:', unit);
      return null;
    }

    // 尝试从新进化数据中查找
    const unitId = unit.name.toLowerCase().replace(/\s+/g, '');
    const newEvolutionData = evolutionData.find(evo => evo.unitId === unitId);
    
    if (newEvolutionData) {
      console.log(`✅ Found new evolution data for ${unit.name}`);
      return {
        ...unit,
        evolutionData: newEvolutionData,
        hasEvolutionData: true
      };
    }
    
    // 尝试从真实进化数据中查找（向后兼容）
    const realEvolutionData = evolutionData[unitId];
    if (realEvolutionData) {
      console.log(`✅ Found legacy evolution data for ${unit.name}`);
      return {
        ...unit,
        ...realEvolutionData,
        hasEvolutionData: true
      };
    }
    
    // 如果没有进化数据，返回基础信息
    console.log(`⚠️ No evolution data found for ${unit.name}, showing basic info`);
    return {
      ...unit,
      hasEvolutionData: false
    };
  }

  // 2. 修复：安全的单位选择处理 - 使用真实数据
  processUnitSelection(unit) {
    try {
      console.log("Processing unit selection:", unit);
      
      if (!unit) {
        this.clearAllDisplays();
        return;
      }

      // 查找真实的进化数据
      const evolutionData = this.lookupEvolutionData(unit);
      
      // 检查是否成功获取数据
      if (!evolutionData) {
        console.error("❌ Failed to lookup evolution data");
        this.clearAllDisplays();
        return;
      }
      
      // 使用组件系统更新显示
      this.displayEvolutionData(evolutionData);
      
    } catch (error) {
      console.error("Error in processUnitSelection:", error);
      showError("Failed to process unit selection. Please try again.");
    }
  }

  // 3. 修复：使用组件系统更新显示
  displayEvolutionData(unit) {
    try {
      console.log("Displaying evolution data for:", unit);
      
      if (!unit.hasEvolutionData) {
        this.showNoEvolutionData(unit.name);
        return;
      }
      
      // 使用组件系统更新各个显示区域
      if (this.costSummary) {
        this.costSummary.updateCost(unit);
      }
      
      if (this.materialsList) {
        this.materialsList.updateUnit(unit);
      }
      
      if (this.farmingGuide) {
        this.farmingGuide.updateUnit(unit);
      }
      
      // 使用新的EvolutionRequirements组件
      if (this.evolutionRequirements && unit.evolutionData) {
        const requirementsHtml = this.evolutionRequirements.render(unit.evolutionData.unitId);
        const container = this.getContainer('evolution-requirements');
        if (container) {
          container.innerHTML = requirementsHtml;
          // 绑定事件
          this.evolutionRequirements.bindEvents();
        }
      } else {
        // 使用旧的显示方法作为后备
        this.updateEvolutionRequirements(unit);
      }
      
      console.log("✅ Evolution data updated successfully");
    } catch (error) {
      console.error("Error updating displays:", error);
      showError("Failed to update evolution data displays.");
    }
  }

  // 4. Evolution Requirements更新
  updateEvolutionRequirements(evolutionInfo) {
    const container = this.getContainer('evolution-requirements');
    if (!container) return;

    let html = `
      <div class="evolution-path-header">
        <h3 class="text-lg font-semibold text-white mb-4">Evolution Requirements</h3>
      </div>
      <div class="evolution-stages">
    `;

    if (evolutionInfo.evolutions && evolutionInfo.evolutions.length > 0) {
      evolutionInfo.evolutions.forEach((evo, index) => {
        html += this.renderEvolutionStage(evo, index);
      });
    } else {
      // 简单的单次进化显示
      html += this.renderSimpleEvolution(evolutionInfo);
    }

    html += '</div>';
    container.innerHTML = html;
  }

  // 5. 渲染进化阶段
  renderEvolutionStage(evo, index) {
    const isBase = index === 0;
    const materials = evo.materials || [];
    
    return `
      <div class="evolution-stage ${isBase ? 'base-stage' : 'evolution-stage'}">
        <div class="stage-header">
          <h4 class="stage-title">${evo.name || `Stage ${index + 1}`}</h4>
          ${!isBase ? '<span class="evolution-indicator">⚡ Evolution</span>' : ''}
        </div>
        
        ${!isBase ? `
          <div class="requirements-grid">
            <div class="requirement-item">
              <span class="req-label">Cost:</span>
              <span class="req-value gold">${(evo.cost || 15000).toLocaleString()}</span>
            </div>
            ${evo.gems ? `
              <div class="requirement-item">
                <span class="req-label">Gems:</span>
                <span class="req-value gems">${evo.gems}</span>
              </div>
            ` : ''}
            ${materials.length > 0 ? `
              <div class="requirement-item materials-list">
                <span class="req-label">Materials:</span>
                <div class="materials-grid">
                  ${materials.map(mat => `
                    <span class="material-chip">${mat.name} x${mat.count}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        ` : '<div class="base-stage-info">Base form - No requirements</div>'}
      </div>
    `;
  }

  // 6. 渲染简单进化（单次进化）
  renderSimpleEvolution(evolutionInfo) {
    const materials = evolutionInfo.requirements?.materials || [];
    const cost = evolutionInfo.requirements?.cost || 15000;
    
    return `
      <div class="evolution-stage base-stage">
        <div class="stage-header">
          <h4 class="stage-title">${evolutionInfo.name}</h4>
        </div>
        <div class="base-stage-info">Base form</div>
      </div>
      
      <div class="evolution-stage evolution-stage">
        <div class="stage-header">
          <h4 class="stage-title">${evolutionInfo.evolutionName}</h4>
          <span class="evolution-indicator">⚡ Evolution</span>
        </div>
        
        <div class="requirements-grid">
          <div class="requirement-item">
            <span class="req-label">Cost:</span>
            <span class="req-value gold">${cost.toLocaleString()}</span>
          </div>
          ${materials.length > 0 ? `
            <div class="requirement-item materials-list">
              <span class="req-label">Materials:</span>
              <div class="materials-grid">
                ${materials.map(mat => `
                  <span class="material-chip">${mat.name} x${mat.count}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // 7. Cost Summary更新（修复白色背景）
  updateCostSummary(evolutionInfo) {
    const container = this.getContainer('cost-summary');
    if (!container) return;

    let totalCost = 0;
    let totalGems = 0;
    let totalMaterials = 0;

    if (evolutionInfo.evolutions) {
      evolutionInfo.evolutions.forEach(evo => {
        totalCost += evo.cost || 0;
        totalGems += evo.gems || 0;
        if (evo.materials) {
          totalMaterials += evo.materials.reduce((sum, mat) => sum + mat.count, 0);
        }
      });
    } else if (evolutionInfo.requirements) {
      totalCost = evolutionInfo.requirements.cost || 15000;
      totalGems = evolutionInfo.requirements.gems || 0;
      if (evolutionInfo.requirements.materials) {
        totalMaterials = evolutionInfo.requirements.materials.reduce((sum, mat) => sum + mat.count, 0);
      }
    }

    // 修复：使用深色背景，移除白色
    container.innerHTML = `
      <div class="cost-breakdown-container">
        <h3 class="cost-header">Cost Summary</h3>
        
        <div class="cost-cards">
          <div class="cost-card gold-card">
            <div class="cost-value">${totalCost.toLocaleString()}</div>
            <div class="cost-label">Gold Required</div>
          </div>
          
          ${totalGems > 0 ? `
            <div class="cost-card gems-card">
              <div class="cost-value">${totalGems}</div>
              <div class="cost-label">Gems Required</div>
            </div>
          ` : ''}
          
          <div class="cost-card materials-card">
            <div class="cost-value">${totalMaterials}</div>
            <div class="cost-label">Materials Required</div>
          </div>
        </div>
        
        <div class="cost-note">
          <small>💡 Costs may vary based on current game version</small>
        </div>
      </div>
    `;
  }

  // 8. Farming Guide更新
  updateFarmingGuide(evolutionInfo) {
    const container = this.getContainer('farming-guide');
    if (!container) return;

    container.innerHTML = `
      <div class="farming-guide-container">
        <h3 class="farming-header">Farming Guide</h3>
        
        <div class="farming-content">
          <div class="farming-tip">
            <div class="tip-icon">🎯</div>
            <div class="tip-content">
              <h4>Material Sources</h4>
              <p>Evolution materials can be obtained from:</p>
              <ul>
                <li>Legend Stages (primary source)</li>
                <li>Raid Shop purchases</li>
                <li>Event rewards</li>
                <li>Daily/Weekly challenges</li>
              </ul>
            </div>
          </div>
          
          <div class="farming-tip">
            <div class="tip-icon">💰</div>
            <div class="tip-content">
              <h4>Gold Farming</h4>
              <p>Efficiently farm gold through:</p>
              <ul>
                <li>Story mode replays</li>
                <li>Challenge modes</li>
                <li>Daily gold dungeons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 9. Evolution Materials更新
  updateEvolutionMaterials(evolutionInfo) {
    const container = this.getContainer('evolution-materials');
    if (!container) return;

    // 收集所有材料
    const allMaterials = new Map();
    
    if (evolutionInfo.evolutions) {
      evolutionInfo.evolutions.forEach(evo => {
        if (evo.materials) {
          evo.materials.forEach(mat => {
            const existing = allMaterials.get(mat.name) || { count: 0, rarity: mat.rarity };
            existing.count += mat.count;
            allMaterials.set(mat.name, existing);
          });
        }
      });
    } else if (evolutionInfo.requirements?.materials) {
      evolutionInfo.requirements.materials.forEach(mat => {
        allMaterials.set(mat.name, { count: mat.count, rarity: mat.rarity });
      });
    }

    let html = `
      <div class="materials-container">
        <h3 class="materials-header">Required Materials</h3>
        <div class="materials-list">
    `;

    if (allMaterials.size > 0) {
      allMaterials.forEach((data, materialName) => {
        const rarityClass = `rarity-${(data.rarity || 'common').toLowerCase()}`;
        html += `
          <div class="material-item ${rarityClass}">
            <div class="material-info">
              <span class="material-name">${materialName}</span>
              <span class="material-count">x${data.count}</span>
            </div>
            <div class="material-rarity">${data.rarity || 'Common'}</div>
          </div>
        `;
      });
    } else {
      html += '<div class="no-materials">No specific materials data available</div>';
    }

    html += '</div></div>';
    container.innerHTML = html;
  }

  // 10. 辅助函数
  getContainer(type) {
    const selectors = [
      `[data-${type}]`,
      `.${type}`,
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

  extractUnitId(unitDisplayName) {
    return unitDisplayName
      .replace(/^\[.*?\]\s*/, '') // 移除稀有度标签
      .replace(/\s*\(.*?\).*$/, '') // 移除括号内容
      .toLowerCase()
      .replace(/\s+/g, ''); // 移除空格
  }

  // 11. 错误处理
  showErrorMessage(message) {
    const containers = ['evolution-requirements', 'evolution-materials', 'cost-summary', 'farming-guide'];
    
    containers.forEach(type => {
      const container = this.getContainer(type);
      if (container) {
        container.innerHTML = `
          <div class="error-display">
            <div class="error-icon">⚠️</div>
            <div class="error-message">${message}</div>
            <button class="retry-button" onclick="location.reload()">Refresh Page</button>
          </div>
        `;
      }
    });
  }

  clearAllDisplays() {
    try {
      // 清空组件显示
      if (this.costSummary && typeof this.costSummary.clear === 'function') {
        this.costSummary.clear();
      }
      
      if (this.materialsList && typeof this.materialsList.clear === 'function') {
        this.materialsList.clear();
      }
      
      if (this.farmingGuide && typeof this.farmingGuide.clear === 'function') {
        this.farmingGuide.clear();
      }
      
      // 清空进化需求显示
      const container = this.getContainer('evolution-requirements');
      if (container) {
        container.innerHTML = `
          <div class="select-prompt">
            <div class="prompt-icon">🔍</div>
            <div class="prompt-message">Select a unit to view evolution data</div>
          </div>
        `;
      }
      
      console.log("✅ All displays cleared");
    } catch (error) {
      console.error("Error clearing displays:", error);
      // 回退到原来的方法
      const containers = ['evolution-requirements', 'evolution-materials', 'cost-summary', 'farming-guide'];
      containers.forEach(type => {
        const container = this.getContainer(type);
        if (container) {
          container.innerHTML = `
            <div class="select-prompt">
              <div class="prompt-icon">🔍</div>
              <div class="prompt-message">Select a unit to view evolution data</div>
            </div>
          `;
        }
      });
    }
  }

  showNoEvolutionData(unitName) {
    const containers = ['evolution-requirements', 'evolution-materials', 'cost-summary', 'farming-guide'];
    
    containers.forEach(type => {
      const container = this.getContainer(type);
      if (container) {
        container.innerHTML = `
          <div class="no-evolution-display">
            <div class="no-evo-icon">🚫</div>
            <div class="no-evo-message">${unitName} cannot evolve</div>
            <div class="no-evo-info">Only Mythic and Secret units can evolve</div>
          </div>
        `;
      }
    });
  }

  // 12. 获取进化数据（使用新的数据结构）
  getEvolutionData() {
    // 合并新的进化数据和旧的进化数据
    const combinedData = {};
    
    // 先添加旧的进化数据（向后兼容）
    Object.assign(combinedData, evolutionData);
    
    // 添加新的进化数据（覆盖旧数据）
    evolutionData.forEach(evolution => {
      combinedData[evolution.unitId] = {
        ...evolution,
        // 保持与旧格式的兼容性
        name: evolution.evolutions[0]?.name || evolution.unitId,
        evolutionName: evolution.evolutions[evolution.evolutions.length - 1]?.name || `${evolution.unitId} (Evolved)`,
        hasEvolutionData: true
      };
    });
    
    return combinedData;
  }

  getMaterialsDatabase() {
    return {
      "Hellsing Arms": { rarity: "Legendary", sources: ["Alocard Summon"] },
      "Shadow Trace": { rarity: "Legendary", sources: ["World Lines"] },
      "Hero License": { rarity: "Legendary", sources: ["Hero Association"] },
      "Green Essence Stone": { rarity: "Common", sources: ["Story Mode"] },
      "Purple Essence Stone": { rarity: "Rare", sources: ["Challenge Mode"] },
      "Pink Essence Stone": { rarity: "Rare", sources: ["Daily Dungeons"] },
      "Red Essence Stone": { rarity: "Rare", sources: ["Raid Shop"] }
    };
  }
}

// 13. 初始化
let evolutionManager;

function initializeEvolutionGuide() {
  try {
    evolutionManager = new EvolutionGuideManager();
    
    // 绑定单位选择事件
    const unitSelector = document.querySelector('select[data-unit-selector]') || 
                        document.querySelector('.unit-selector select') ||
                        document.querySelector('select');
    
    if (unitSelector) {
      unitSelector.addEventListener('change', function(e) {
        evolutionManager.processUnitSelection(e.target.value);
      });
      
      console.log("Evolution Guide initialized successfully");
    } else {
      console.warn("Unit selector not found");
    }
    
  } catch (error) {
    console.error("Failed to initialize Evolution Guide:", error);
  }
}

// 14. DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initializeEvolutionGuide, 1000);
});

// 15. 导出供外部使用
window.evolutionManager = evolutionManager;

// 16. 兼容性导出（保持与原有系统的兼容性）
export class EvolutionPage {
  constructor(app) {
    this.app = app;
    this.manager = null;
  }

  async initialize() {
    console.log('🚀 Initializing Evolution Page (Compatibility Mode)...');
    
    // 初始化新的管理器
    this.manager = new EvolutionGuideManager();
    
    // 绑定事件
    this.bindEvents();
    
    console.log('✅ Evolution Page initialized successfully');
    return true;
  }

  bindEvents() {
    // 查找单位选择器并绑定事件
    const unitSelector = document.querySelector('select[data-unit-selector]') || 
                        document.querySelector('.unit-selector select') ||
                        document.querySelector('select');
    
    if (unitSelector) {
      unitSelector.addEventListener('change', (e) => {
        this.handleUnitSelect({ id: e.target.value });
      });
    }
  }

  handleUnitSelect(unit) {
    if (this.manager) {
      this.manager.processUnitSelection(unit.id);
    }
  }

  cleanup() {
    console.log('🧹 Cleaning up Evolution Page...');
    // 清理资源
  }
}
