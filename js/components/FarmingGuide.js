// Farming Guide Component

export class FarmingGuide {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = {
            showPriority: true,
            showDifficulty: true,
            showTips: true,
            showObtainMethods: true,
            ...options
        };
        
        this.currentUnit = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`FarmingGuide: Container with id "${this.containerId}" not found`);
            return;
        }
        
        this.createDOM();
        this.render();
    }
    
    createDOM() {
        this.container.innerHTML = `
            <div class="card">
                <h2><i class="fas fa-map"></i> Farming Guide</h2>
                <div id="farmingGuide" class="farming-guide">
                    <p>Select a unit to view farming guide</p>
                </div>
            </div>
        `;
        
        this.farmingGuideElement = document.getElementById('farmingGuide');
    }
    
    updateGuide(unit) {
        console.log('🌾 === FarmingGuide 接收单位更新 ===');
        console.log('📊 当前农场状态:', this.currentUnit);
        console.log('🆕 新接收的单位:', unit);
        
        this.currentUnit = unit;
        console.log('✅ 农场状态已更新:', this.currentUnit);
        
        console.log('🎨 开始渲染农场指南...');
        this.render();
        console.log('🌾 === FarmingGuide 单位更新完成 ===\n');
    }
    
    render() {
        if (!this.farmingGuideElement) return;
        
        if (!this.currentUnit) {
            this.farmingGuideElement.innerHTML = '<p>Select a unit to view farming guide</p>';
            return;
        }
        
        // Try to get detailed farming guide data
        import('../config/farmingGuide.js').then(module => {
            const farmingGuideData = module.FARMING_GUIDE_DATA[this.currentUnit.id];
            if (farmingGuideData) {
                this.renderDetailedFarmingGuide(farmingGuideData);
            } else {
                // Fallback to basic guide
                this.renderBasicFarmingGuide();
            }
        }).catch(error => {
            console.warn('Could not load farming guide data:', error);
            // Fallback to basic guide
            this.renderBasicFarmingGuide();
        });
    }
    
    renderDetailedFarmingGuide(guideData) {
        let guideHTML = `
            <h3>Farming Guide for ${this.currentUnit.name}</h3>
            <p><strong>Rarity:</strong> ${this.currentUnit.rarity} • <strong>Element:</strong> ${this.currentUnit.element}</p>
            <p><strong>Priority:</strong> <span class="priority-${guideData.priority.toLowerCase()}">${guideData.priority}</span></p>
            <hr>
        `;
        
        // Farming Steps
        if (guideData.farmingSteps && guideData.farmingSteps.length > 0) {
            guideHTML += `
                <div class="farming-steps">
                    <h4>Farming Steps:</h4>
                    <ol>
            `;
            
            guideData.farmingSteps.forEach(step => {
                guideHTML += `
                    <li>
                        <strong>${step.task}</strong><br>
                        <span class="step-method">${step.method}</span>
                        ${step.alternativeMethod ? `<br><span class="step-alternative">Alternative: ${step.alternativeMethod}</span>` : ''}
                        ${step.location ? `<br><span class="step-location">Location: ${step.location}</span>` : ''}
                        ${step.timeEstimate ? `<br><span class="step-time">Time: ${step.timeEstimate}</span>` : ''}
                        ${step.notes ? `<br><span class="step-notes">Notes: ${step.notes}</span>` : ''}
                    </li>
                `;
            });
            
            guideHTML += `
                    </ol>
                </div>
            `;
        }
        
        // Material Farming
        if (guideData.materialFarming && guideData.materialFarming.length > 0) {
            guideHTML += `
                <div class="material-farming">
                    <h4>Material Farming:</h4>
                    <div class="material-list">
            `;
            
            guideData.materialFarming.forEach(material => {
                guideHTML += `
                    <div class="material-item">
                        <div class="material-name">${material.material}</div>
                        <div class="material-method">
                            <strong>Best Method:</strong> ${material.bestMethod}<br>
                            <strong>Alternative:</strong> ${material.alternativeMethod}<br>
                            <strong>Efficiency:</strong> <span class="efficiency-${material.efficiency.toLowerCase()}">${material.efficiency}</span>
                        </div>
                    </div>
                `;
            });
            
            guideHTML += `
                    </div>
                </div>
            `;
        }
        
        // Tips
        if (guideData.tips && guideData.tips.length > 0) {
            guideHTML += `
                <div class="farming-tips">
                    <h4>Tips:</h4>
                    <ul>
                        ${guideData.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        this.farmingGuideElement.innerHTML = guideHTML;
    }
    
    renderBasicFarmingGuide() {
        let guideHTML = `
            <h3>Farming Guide for ${this.currentUnit.name}</h3>
            <p><strong>Rarity:</strong> ${this.currentUnit.rarity} • <strong>Element:</strong> ${this.currentUnit.element}</p>
            <hr>
            <div class="farming-steps">
                <h4>Farming Steps:</h4>
                <ol>
                    <li>Collect required materials</li>
                    <li>Complete evolution quest</li>
                    <li>Evolve unit</li>
                </ol>
            </div>
            <div class="farming-tips">
                <h4>Tips:</h4>
                <ul>
                    <li>Focus on daily challenges for materials</li>
                    <li>Use element-specific teams for better drops</li>
                    <li>Complete weekly challenges for bonus rewards</li>
                </ul>
            </div>
        `;
        
        this.farmingGuideElement.innerHTML = guideHTML;
    }
    
    getEvolutionStatus() {
        if (this.currentUnit.canEvolve) {
            if (this.currentUnit.evolutionTo) {
                return `<p><strong>Evolves to:</strong> ${this.currentUnit.evolutionTo}</p>`;
            } else {
                return `<p><strong>Status:</strong> Can evolve (target not specified)</p>`;
            }
        } else {
            if (this.currentUnit.evolutionFrom) {
                return `<p><strong>Evolved from:</strong> ${this.currentUnit.evolutionFrom}</p>`;
            } else {
                return `<p><strong>Status:</strong> Cannot evolve</p>`;
            }
        }
    }
    
    getFarmingRecommendations() {
        if (!this.currentUnit || !this.currentUnit.farmingGuide) {
            return null;
        }
        
        const { priority, difficulty, tips } = this.currentUnit.farmingGuide;
        
        return {
            priority: priority || 'Medium',
            difficulty: difficulty || 'Medium',
            tips: tips || [],
            obtainMethod: this.currentUnit.obtainMethod,
            dropRate: this.currentUnit.dropRate,
            canEvolve: this.currentUnit.canEvolve,
            evolutionFrom: this.currentUnit.evolutionFrom,
            evolutionTo: this.currentUnit.evolutionTo
        };
    }
    
    getPriorityLevel() {
        if (!this.currentUnit || !this.currentUnit.farmingGuide) {
            return 'medium';
        }
        
        const priority = this.currentUnit.farmingGuide.priority?.toLowerCase();
        
        if (priority?.includes('high')) return 'high';
        if (priority?.includes('low')) return 'low';
        return 'medium';
    }
    
    getDifficultyLevel() {
        if (!this.currentUnit || !this.currentUnit.farmingGuide) {
            return 'medium';
        }
        
        const difficulty = this.currentUnit.farmingGuide.difficulty?.toLowerCase();
        
        if (difficulty?.includes('easy')) return 'easy';
        if (difficulty?.includes('hard')) return 'hard';
        if (difficulty?.includes('very')) return 'very-hard';
        return 'medium';
    }
    
    getEstimatedTime() {
        if (!this.currentUnit || !this.currentUnit.farmingGuide) {
            return 'Unknown';
        }
        
        const priority = this.getPriorityLevel();
        const difficulty = this.getDifficultyLevel();
        
        // Simple estimation based on priority and difficulty
        if (priority === 'high' && difficulty === 'easy') return '1-2 weeks';
        if (priority === 'high' && difficulty === 'medium') return '2-4 weeks';
        if (priority === 'high' && difficulty === 'hard') return '1-2 months';
        if (priority === 'medium' && difficulty === 'easy') return '2-3 weeks';
        if (priority === 'medium' && difficulty === 'medium') return '1-2 months';
        if (priority === 'medium' && difficulty === 'hard') return '2-3 months';
        if (priority === 'low' && difficulty === 'easy') return '3-4 weeks';
        if (priority === 'low' && difficulty === 'medium') return '2-3 months';
        if (priority === 'low' && difficulty === 'hard') return '3-6 months';
        
        return 'Unknown';
    }
    
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
} 