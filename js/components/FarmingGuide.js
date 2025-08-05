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
        
        if (!this.currentUnit.farmingGuide) {
            this.farmingGuideElement.innerHTML = '<p>No farming guide available for this unit</p>';
            return;
        }
        
        const { priority, difficulty, tips } = this.currentUnit.farmingGuide;
        const obtainMethod = this.currentUnit.obtainMethod;
        const dropRate = this.currentUnit.dropRate;
        
        let guideHTML = '';
        
        // Priority and difficulty
        if (this.options.showPriority || this.options.showDifficulty) {
            guideHTML += `
                <div class="guide-header">
                    ${this.options.showPriority ? `
                        <div class="guide-stat">
                            <span class="guide-label">Priority:</span>
                            <span class="guide-value priority-${priority?.toLowerCase() || 'medium'}">${priority || 'Medium'}</span>
                        </div>
                    ` : ''}
                    ${this.options.showDifficulty ? `
                        <div class="guide-stat">
                            <span class="guide-label">Difficulty:</span>
                            <span class="guide-value difficulty-${difficulty?.toLowerCase() || 'medium'}">${difficulty || 'Medium'}</span>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        // Obtain method
        if (this.options.showObtainMethods && obtainMethod) {
            guideHTML += `
                <div class="obtain-method">
                    <h3><i class="fas fa-info-circle"></i> How to Obtain</h3>
                    <p><strong>Method:</strong> ${obtainMethod}</p>
                    ${dropRate ? `<p><strong>Drop Rate:</strong> ${dropRate}</p>` : ''}
                </div>
            `;
        }
        
        // Farming tips
        if (this.options.showTips && tips && tips.length > 0) {
            guideHTML += `
                <div class="farming-tips">
                    <h3><i class="fas fa-lightbulb"></i> Farming Tips</h3>
                    <ul class="tips-list">
                        ${tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Evolution status
        if (this.currentUnit.canEvolve !== undefined) {
            const evolutionStatus = this.getEvolutionStatus();
            guideHTML += `
                <div class="evolution-status">
                    <h3><i class="fas fa-arrow-up"></i> Evolution Status</h3>
                    <div class="status-info">
                        <p><strong>Can Evolve:</strong> ${this.currentUnit.canEvolve ? 'Yes' : 'No'}</p>
                        ${evolutionStatus}
                    </div>
                </div>
            `;
        }
        
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