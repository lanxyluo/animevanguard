// Evolution Guide 紧急修复 - 解决JavaScript错误和样式问题

// 1. 修复函数调用错误
class EvolutionGuideManager {
  constructor() {
    this.evolutionData = this.getEvolutionData();
    this.materialsDatabase = this.getMaterialsDatabase();
    this.initializeComponents();
  }

  // 修复：确保所有函数都存在
  initializeComponents() {
    // 安全的函数引用
    this.evolutionRequirements = {
      update: (data) => this.updateEvolutionRequirements(data)
    };
    
    this.evolutionMaterials = {
      update: (data) => this.updateEvolutionMaterials(data)
    };
    
    this.costSummary = {
      update: (data) => this.updateCostSummary(data)
    };
    
    this.farmingGuide = {
      updateFarmingGuide: (data) => this.updateFarmingGuide(data)
    };
  }

  // 2. 安全的单位选择处理
  processUnitSelection(unitValue) {
    try {
      console.log("Processing unit selection:", unitValue);
      
      if (!unitValue || unitValue === "Select Unit...") {
        this.clearAllDisplays();
        return;
      }

      const unitId = this.extractUnitId(unitValue);
      const evolutionInfo = this.evolutionData[unitId];
      
      if (evolutionInfo && evolutionInfo.canEvolve) {
        this.displayEvolutionData(evolutionInfo);
      } else {
        this.showNoEvolutionData(unitValue);
      }
    } catch (error) {
      console.error("Error in processUnitSelection:", error);
      this.showErrorMessage("Failed to process unit selection. Please try again.");
    }
  }

  // 3. 修复：安全的显示更新函数
  displayEvolutionData(evolutionInfo) {
    try {
      // 使用安全的函数调用
      this.evolutionRequirements.update(evolutionInfo);
      this.evolutionMaterials.update(evolutionInfo);
      this.costSummary.update(evolutionInfo);
      this.farmingGuide.updateFarmingGuide(evolutionInfo);
    } catch (error) {
      console.error("Error updating displays:", error);
      this.showErrorMessage("Failed to update evolution data displays.");
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

  // 12. 获取进化数据（简化版）
  getEvolutionData() {
    return {
      "alocard": {
        name: "Alocard",
        rarity: "Secret",
        element: "Dark",
        canEvolve: true,
        evolutionName: "Alocard (Vampire King)",
        requirements: {
          cost: 15000,
          materials: [
            { name: "Hellsing Arms", count: 1, rarity: "Legendary" },
            { name: "Purple Essence Stone", count: 13, rarity: "Rare" },
            { name: "Green Essence Stone", count: 35, rarity: "Common" }
          ]
        }
      },
      "songjinwu": {
        name: "Song Jinwu",
        rarity: "Mythic",
        element: "Shadow", 
        canEvolve: true,
        evolutionName: "Song Jinwu (Monarch)",
        requirements: {
          cost: 15000,
          materials: [
            { name: "Shadow Trace", count: 12, rarity: "Legendary" },
            { name: "Pink Essence Stone", count: 11, rarity: "Rare" }
          ]
        }
      },
      "saitama": {
        name: "Saitama",
        rarity: "Mythic",
        element: "Physical",
        canEvolve: true,
        evolutionName: "Saitama (Serious)",
        requirements: {
          cost: 15000,
          materials: [
            { name: "Hero License", count: 8, rarity: "Legendary" },
            { name: "Red Essence Stone", count: 15, rarity: "Rare" }
          ]
        }
      }
      // 可以添加更多单位数据
    };
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
