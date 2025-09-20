/**
 * Performance Configuration
 * 
 * This file contains performance optimization settings and utilities
 * for the Anime Vanguards Calculator application.
 */

// Performance configuration
export const PERFORMANCE_CONFIG = {
    // Lazy loading settings
    lazyLoading: {
        enabled: true,
        threshold: 0.1, // Intersection Observer threshold
        rootMargin: '50px'
    },
    
    // Caching settings
    caching: {
        enabled: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        maxSize: 50 * 1024 * 1024 // 50MB
    },
    
    // Debounce settings
    debounce: {
        search: 300,
        resize: 250,
        scroll: 100
    },
    
    // Animation settings
    animation: {
        duration: 300,
        easing: 'ease-in-out'
    }
};

// Cache management
class CacheManager {
    constructor() {
        this.cache = new Map();
        this.maxSize = PERFORMANCE_CONFIG.caching.maxSize;
        this.currentSize = 0;
    }
    
    set(key, value, ttl = PERFORMANCE_CONFIG.caching.maxAge) {
        const item = {
            value,
            timestamp: Date.now(),
            ttl
        };
        
        // Remove old item if exists
        if (this.cache.has(key)) {
            this.remove(key);
        }
        
        // Check size limit
        const itemSize = this.getItemSize(item);
        if (this.currentSize + itemSize > this.maxSize) {
            this.evictOldest();
        }
        
        this.cache.set(key, item);
        this.currentSize += itemSize;
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        // Check if expired
        if (Date.now() - item.timestamp > item.ttl) {
            this.remove(key);
            return null;
        }
        
        return item.value;
    }
    
    remove(key) {
        const item = this.cache.get(key);
        if (item) {
            this.currentSize -= this.getItemSize(item);
            this.cache.delete(key);
        }
    }
    
    clear() {
        this.cache.clear();
        this.currentSize = 0;
    }
    
    getItemSize(item) {
        return JSON.stringify(item).length;
    }
    
    evictOldest() {
        let oldestKey = null;
        let oldestTime = Date.now();
        
        for (const [key, item] of this.cache) {
            if (item.timestamp < oldestTime) {
                oldestTime = item.timestamp;
                oldestKey = key;
            }
        }
        
        if (oldestKey) {
            this.remove(oldestKey);
        }
    }
}

// Lazy loading utility
export class LazyLoader {
    constructor() {
        this.observer = null;
        this.callbacks = new Map();
    }
    
    init() {
        if (!PERFORMANCE_CONFIG.lazyLoading.enabled) return;
        
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const callback = this.callbacks.get(entry.target);
                        if (callback) {
                            callback();
                            this.observer.unobserve(entry.target);
                            this.callbacks.delete(entry.target);
                        }
                    }
                });
            },
            {
                threshold: PERFORMANCE_CONFIG.lazyLoading.threshold,
                rootMargin: PERFORMANCE_CONFIG.lazyLoading.rootMargin
            }
        );
    }
    
    observe(element, callback) {
        if (!this.observer) this.init();
        
        this.callbacks.set(element, callback);
        this.observer.observe(element);
    }
    
    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
            this.callbacks.clear();
        }
    }
}

// Performance monitoring
export class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.observers = [];
    }
    
    startTimer(name) {
        this.metrics.set(name, {
            start: performance.now(),
            end: null,
            duration: null
        });
    }
    
    endTimer(name) {
        const metric = this.metrics.get(name);
        if (metric) {
            metric.end = performance.now();
            metric.duration = metric.end - metric.start;
            
            // Log if duration is significant
            if (metric.duration > 100) {
                console.warn(`⚠️ Slow operation detected: ${name} took ${metric.duration.toFixed(2)}ms`);
            }
        }
    }
    
    measure(name, fn) {
        this.startTimer(name);
        const result = fn();
        this.endTimer(name);
        return result;
    }
    
    async measureAsync(name, fn) {
        this.startTimer(name);
        const result = await fn();
        this.endTimer(name);
        return result;
    }
    
    getMetrics() {
        return Object.fromEntries(this.metrics);
    }
    
    clearMetrics() {
        this.metrics.clear();
    }
}

// Resource preloader
export class ResourcePreloader {
    constructor() {
        this.preloaded = new Set();
    }
    
    preloadImage(src) {
        if (this.preloaded.has(src)) return;
        
        const img = new Image();
        img.src = src;
        this.preloaded.add(src);
    }
    
    preloadCSS(href) {
        if (this.preloaded.has(href)) return;
        
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
        this.preloaded.add(href);
    }
    
    preloadJS(src) {
        if (this.preloaded.has(src)) return;
        
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = src;
        document.head.appendChild(link);
        this.preloaded.add(src);
    }
}

// Export instances
export const cacheManager = new CacheManager();
export const lazyLoader = new LazyLoader();
export const performanceMonitor = new PerformanceMonitor();
export const resourcePreloader = new ResourcePreloader();

// Performance utilities
export const performanceUtils = {
    // Debounce function with configurable delay
    debounce: (func, delay = PERFORMANCE_CONFIG.debounce.search) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },
    
    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Request animation frame wrapper
    raf: (callback) => {
        return requestAnimationFrame(callback);
    },
    
    // Cancel animation frame wrapper
    caf: (id) => {
        cancelAnimationFrame(id);
    }
}; 