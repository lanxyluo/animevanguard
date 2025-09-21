class ResultsDisplay {
    constructor() {
        this.init();
    }

    init() {
        // 初始化显示区域
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
        this.updateStatsBreakdown(result);
        this.updateQuickStats(result);
    }

    updateDPSValue(dps) {
        const dpsElement = document.getElementById('dps-value');
        if (!dpsElement) return;

        // 添加动画效果
        dpsElement.classList.add('dps-glow');
        
        // 数字动画
        this.animateNumber(dpsElement, parseInt(dpsElement.textContent), dps, 1000);
        
        // 移除动画类
        setTimeout(() => {
            dpsElement.classList.remove('dps-glow');
        }, 2000);
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    updateStatsBreakdown(result) {
        const breakdownElement = document.getElementById('stats-breakdown');
        if (!breakdownElement) return;

        breakdownElement.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span class="text-gray-300">Base Damage</span>
                    <span class="text-white font-semibold">${result.baseDamage?.toLocaleString() || '0'}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span class="text-gray-300">Attack Speed</span>
                    <span class="text-white font-semibold">${result.attackSpeed || '0'}s</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span class="text-gray-300">Range</span>
                    <span class="text-white font-semibold">${result.range || '0'}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span class="text-gray-300">Level</span>
                    <span class="text-white font-semibold">${result.level || '1'}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span class="text-gray-300">Upgrade</span>
                    <span class="text-white font-semibold">+${result.upgradeLevel || '0'}</span>
                </div>
            </div>
        `;
    }

    updateQuickStats(result) {
        // 更新快速统计卡片
        const damageValue = document.getElementById('damage-value');
        const rangeValue = document.getElementById('range-value');
        
        if (damageValue) {
            damageValue.textContent = result.baseDamage?.toLocaleString() || '0';
        }
        
        if (rangeValue) {
            rangeValue.textContent = result.range || '0';
        }
    }
}

// 导出到全局变量
window.ResultsDisplay = ResultsDisplay;
