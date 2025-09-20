// Data validation utility functions

/**
 * Validate unit data structure
 * @param {object|array} unitsData - Units data object or array to validate
 * @returns {object} - Validation result with errors array
 */
export function validateUnitData(unitsData) {
    const errors = [];
    const warnings = [];
    
    if (!unitsData) {
        errors.push('Units data is not provided');
        return { errors, warnings, isValid: false };
    }
    
    // Handle both object and array formats
    let unitsArray = [];
    if (Array.isArray(unitsData)) {
        unitsArray = unitsData;
    } else if (typeof unitsData === 'object') {
        unitsArray = Object.values(unitsData);
    } else {
        errors.push('Units data is not a valid object or array');
        return { errors, warnings, isValid: false };
    }
    
    if (unitsArray.length === 0) {
        errors.push('Units data is empty');
        return { errors, warnings, isValid: false };
    }
    
    const requiredFields = ['id', 'name', 'rarity', 'element'];
    
    unitsArray.forEach((unit, index) => {
        if (!unit || typeof unit !== 'object') {
            errors.push(`Unit at index ${index}: Invalid unit data structure`);
            return;
        }
        
        requiredFields.forEach(field => {
            if (!unit.hasOwnProperty(field)) {
                errors.push(`Unit ${unit.name || index}: Missing required field '${field}'`);
            } else if (unit[field] === null || unit[field] === undefined || unit[field] === '') {
                errors.push(`Unit ${unit.name || index}: Required field '${field}' is empty`);
            }
        });
        
        if (unit.stats && typeof unit.stats === 'object') {
            const statFields = ['damage', 'spa', 'range', 'dps'];
            statFields.forEach(stat => {
                if (unit.stats.hasOwnProperty(stat)) {
                    if (typeof unit.stats[stat] !== 'number' || unit.stats[stat] < 0) {
                        warnings.push(`Unit ${unit.name || index}: Invalid stat value for '${stat}'`);
                    }
                }
            });
        }
    });
    
    return {
        errors,
        warnings,
        isValid: errors.length === 0,
        hasWarnings: warnings.length > 0
    };
}

/**
 * Validate materials configuration
 * @param {object} materialsConfig - Materials configuration object to validate
 * @returns {object} - Validation result with errors array
 */
export function validateMaterialsConfig(materialsConfig) {
    const errors = [];
    const warnings = [];
    
    if (!materialsConfig || typeof materialsConfig !== 'object') {
        errors.push('Materials configuration is not a valid object');
        return { errors, warnings, isValid: false };
    }
    
    const requiredFields = ['name', 'description', 'icon', 'rarity', 'cost', 'color'];
    
    Object.entries(materialsConfig).forEach(([materialId, material]) => {
        if (!material || typeof material !== 'object') {
            errors.push(`Material ${materialId}: Invalid material data structure`);
            return;
        }
        
        requiredFields.forEach(field => {
            if (!material.hasOwnProperty(field)) {
                errors.push(`Material ${materialId}: Missing required field '${field}'`);
            } else if (material[field] === null || material[field] === undefined || material[field] === '') {
                errors.push(`Material ${materialId}: Required field '${field}' is empty`);
            }
        });
        
        if (material.cost !== undefined && (typeof material.cost !== 'number' || material.cost < 0)) {
            warnings.push(`Material ${materialId}: Invalid cost value`);
        }
    });
    
    return {
        errors,
        warnings,
        isValid: errors.length === 0,
        hasWarnings: warnings.length > 0
    };
}

/**
 * Validate element icons configuration
 * @param {object} elementIcons - Element icons object to validate
 * @returns {object} - Validation result with errors array
 */
export function validateElementIcons(elementIcons) {
    const errors = [];
    const warnings = [];
    
    if (!elementIcons || typeof elementIcons !== 'object') {
        errors.push('Element icons configuration is not a valid object');
        return { errors, warnings, isValid: false };
    }
    
    Object.entries(elementIcons).forEach(([element, icon]) => {
        if (!icon || typeof icon !== 'string') {
            errors.push(`Element ${element}: Invalid icon value`);
        } else if (!icon.startsWith('fas fa-') && !icon.startsWith('far fa-') && !icon.startsWith('fab fa-')) {
            warnings.push(`Element ${element}: Icon '${icon}' may not be a valid Font Awesome icon`);
        }
    });
    
    return {
        errors,
        warnings,
        isValid: errors.length === 0,
        hasWarnings: warnings.length > 0
    };
}

/**
 * Validate unit ID format
 * @param {string} unitId - Unit ID to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidUnitId(unitId) {
    if (!unitId || typeof unitId !== 'string') return false;
    const unitIdPattern = /^[a-z_]+$/;
    return unitIdPattern.test(unitId);
}

/**
 * Validate numeric value
 * @param {*} value - Value to validate as number
 * @param {object} options - Validation options
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidNumber(value, options = {}) {
    const { min = null, max = null, allowZero = true, allowNegative = false } = options;
    
    if (typeof value !== 'number' || isNaN(value)) return false;
    
    if (!allowZero && value === 0) return false;
    if (!allowNegative && value < 0) return false;
    if (min !== null && value < min) return false;
    if (max !== null && value > max) return false;
    
    return true;
}

/**
 * Validate string value
 * @param {*} value - Value to validate as string
 * @param {object} options - Validation options
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidString(value, options = {}) {
    const { minLength = 0, maxLength = null, allowEmpty = false } = options;
    
    if (typeof value !== 'string') return false;
    
    if (!allowEmpty && value.trim().length === 0) return false;
    if (value.length < minLength) return false;
    if (maxLength !== null && value.length > maxLength) return false;
    
    return true;
} 