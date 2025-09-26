class ResultsDisplay {
    constructor() {
        this.init();
    }

    init() {
        // Initialize display area
        this.update({
            dps: 0,
            baseDamage: 0,
            attackSpeed: 0,
            range: 0,
            level: 1,
            upgradeLevel: 0
        });
    }

    update(result) {
        this.updateDPSValue(result.dps);
        this.updateStatsComparison(result);
        this.updateCalculationSteps(result);
        this.updateUnitInfo(result);
    }

    updateDPSValue(dps) {
        const dpsElement = document.getElementById('dps-value');
        if (!dpsElement) return;

        // Simple number update, remove complex animations
        dpsElement.textContent = Math.round(dps).toLocaleString();
    }

    updateStatsComparison(result) {
        // Update stats comparison table
        const baseAttackEl = document.getElementById('base-attack');
        const attackSpeedEl = document.getElementById('attack-speed');
        const rangeEl = document.getElementById('range');
        const levelEl = document.getElementById('level');
        const upgradeLevelEl = document.getElementById('upgrade-level');

        console.log('🔧 Updating stats comparison:', result);

        if (baseAttackEl) {
            baseAttackEl.textContent = Math.round(result.baseDamage || 0).toLocaleString();
        }
        if (attackSpeedEl) {
            // Convert attack interval to attack speed (attacks per second)
            const attackSpeed = result.attackSpeed ? (1 / parseFloat(result.attackSpeed)).toFixed(2) : '0.00';
            attackSpeedEl.textContent = `${attackSpeed}/s`;
        }
        if (rangeEl) {
            rangeEl.textContent = result.range || '0';
        }
        if (levelEl) {
            levelEl.textContent = result.level || '1';
        }
        if (upgradeLevelEl) {
            upgradeLevelEl.textContent = `+${result.upgradeLevel || '0'}`;
        }
    }

    updateCalculationSteps(result) {
        const stepsContainer = document.getElementById('calculation-steps');
        if (!stepsContainer) return;

        const steps = this.generateCalculationSteps(result);
        stepsContainer.innerHTML = steps;
    }

    generateCalculationSteps(result) {
        if (!result.unit) {
            return '<div class="step-item"><span class="step-label">Select a unit to start calculation</span></div>';
        }

        console.log('📊 Generating calculation steps for:', result);

        const steps = [];
        
        // Base attributes
        steps.push(`<div class="step-item"><span class="step-label">Base attack power: ${Math.round(result.baseDamage || 0).toLocaleString()}</span></div>`);
        
        // Attack speed
        const attackSpeed = result.attackSpeed ? (1 / parseFloat(result.attackSpeed)).toFixed(2) : '0.00';
        steps.push(`<div class="step-item"><span class="step-label">Attack speed: ${attackSpeed} attacks/second</span></div>`);
        
        // Range
        steps.push(`<div class="step-item"><span class="step-label">Range: ${result.range || '0'}</span></div>`);
        
        // Level bonus
        if (result.level > 1) {
            const levelBonus = Math.round((result.level - 1) * 0.08 * 100);
            steps.push(`<div class="step-item"><span class="step-label">Level ${result.level} Bonus: +${levelBonus}%</span></div>`);
        }
        
        // Upgrade bonus
        if (result.upgradeLevel > 0) {
            const upgradeBonus = Math.round(result.upgradeLevel * 20);
            steps.push(`<div class="step-item"><span class="step-label">Upgrade +${result.upgradeLevel} Bonus: +${upgradeBonus}%</span></div>`);
        }
        
        // Buff bonus
        if (result.buffs) {
            if (result.buffs.attack) {
                const attackBuff = Math.round((result.buffs.attack - 1) * 100);
                steps.push(`<div class="step-item"><span class="step-label">Attack power buff: +${attackBuff}%</span></div>`);
            }
            if (result.buffs.speed) {
                const speedBuff = Math.round((result.buffs.speed - 1) * 100);
                steps.push(`<div class="step-item"><span class="step-label">Attack speed buff: +${speedBuff}%</span></div>`);
            }
            if (result.buffs.crit) {
                const critBuff = Math.round((result.buffs.crit - 1) * 100);
                steps.push(`<div class="step-item"><span class="step-label">Critical rate buff: +${critBuff}%</span></div>`);
            }
        }
        
        // Final DPS calculation
        steps.push(`<div class="step-item"><span class="step-label">Final DPS: ${Math.round(result.dps).toLocaleString()}</span></div>`);

        return steps.join('');
    }

    updateUnitInfo(result) {
        // Update unit info display
        const unitInfoEl = document.getElementById('selected-unit-info');
        if (!unitInfoEl || !result.unit) return;

        // Calculate attributes under current configuration
        const currentAttack = result.baseDamage || 0;
        const currentSpeed = result.attackSpeed || 0;
        const currentRange = result.range || 0;

        // Update attribute display
        const attackEl = unitInfoEl.querySelector('.unit-info .text-right div:nth-child(1) span');
        const speedEl = unitInfoEl.querySelector('.unit-info .text-right div:nth-child(2) span');
        const rangeEl = unitInfoEl.querySelector('.unit-info .text-right div:nth-child(3) span');

        if (attackEl) {
            attackEl.textContent = Math.round(currentAttack).toLocaleString();
        }
        if (speedEl) {
            speedEl.textContent = `${currentSpeed.toFixed(2)}s`;
        }
        if (rangeEl) {
            rangeEl.textContent = currentRange;
        }

        // Add configuration info
        const configInfo = unitInfoEl.querySelector('.config-info');
        if (!configInfo) {
            const configDiv = document.createElement('div');
            configDiv.className = 'config-info mt-2 text-xs text-gray-400';
            unitInfoEl.querySelector('.unit-info').appendChild(configDiv);
        }

        const configDiv = unitInfoEl.querySelector('.config-info');
        if (configDiv) {
            configDiv.innerHTML = `
                <div class="flex justify-between">
                    <span>Level: ${result.level || 1}</span>
                    <span>Upgrade: +${result.upgradeLevel || 0}</span>
                    <span>DPS: ${Math.round(result.dps || 0).toLocaleString()}</span>
                </div>
            `;
        }
    }
}

// Export to global variables
window.ResultsDisplay = ResultsDisplay;
