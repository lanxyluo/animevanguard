// Utility helper functions

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format number with thousands separators
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
export function formatNumber(num) {
    if (typeof num !== 'number') return num;
    return num.toLocaleString();
}

/**
 * Get element color based on element type
 * @param {string} element - The element type
 * @returns {string} - CSS color value
 */
export function getElementColor(element) {
    const colors = {
        'Fire': '#e74c3c',
        'Water': '#3498db',
        'Nature': '#2ecc71',
        'Spark': '#f1c40f',
        'Holy': '#f39c12',
        'Passion': '#e91e63',
        'Blast': '#e74c3c',
        'Cosmic': '#9b59b6',
        'Unbound': '#8e44ad',
        'Curse': '#6c5ce7',
        'Life': '#27ae60',
        'Earth': '#8b4513',
        'Spirit': '#34495e',
        'Lightning': '#f1c40f',
        'Dark': '#2c3e50',
        'Physical': '#95a5a6'
    };
    return colors[element] || '#6c5ce7';
}

/**
 * Capitalize first letter of string
 * @param {string} str - The string to capitalize
 * @returns {string} - Capitalized string
 */
export function capitalize(str) {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Generate unique ID
 * @returns {string} - Unique ID string
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Deep clone an object
 * @param {*} obj - The object to clone
 * @returns {*} - Cloned object
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - The value to check
 * @returns {boolean} - True if empty, false otherwise
 */
export function isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} - Promise that resolves after sleep
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 