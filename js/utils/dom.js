// DOM manipulation utility functions

/**
 * Show loading spinner
 * @param {string} elementId - ID of the loading element
 * @param {string} message - Loading message to display
 */
export function showLoading(elementId = 'loading', message = 'Loading...') {
    const loadingElement = document.getElementById(elementId);
    if (loadingElement) {
        loadingElement.innerHTML = `
            <div class="spinner"></div>
            <p>${message}</p>
        `;
        loadingElement.classList.add('show');
    }
}

/**
 * Hide loading spinner
 * @param {string} elementId - ID of the loading element
 */
export function hideLoading(elementId = 'loading') {
    const loadingElement = document.getElementById(elementId);
    if (loadingElement) {
        loadingElement.classList.remove('show');
    }
}

/**
 * Show error message
 * @param {string} message - Error message to display
 * @param {string} type - Error type ('error', 'warning', 'info')
 * @param {string} elementId - ID of the error element
 * @param {number} duration - Auto-hide duration in milliseconds (0 = no auto-hide)
 */
export function showError(message, type = 'error', elementId = 'errorMessage', duration = 5000) {
    const errorElement = document.getElementById(elementId);
    const errorTextElement = document.getElementById('errorText');
    
    if (errorElement && errorTextElement) {
        errorTextElement.textContent = message;
        errorElement.className = `error-message ${type} show`;
        
        if (duration > 0) {
            setTimeout(() => {
                errorElement.classList.remove('show');
            }, duration);
        }
    }
}

/**
 * Hide error message
 * @param {string} elementId - ID of the error element
 */
export function hideError(elementId = 'errorMessage') {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

/**
 * Show notification/toast message
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success', 'error', 'warning', 'info')
 * @param {number} duration - Display duration in milliseconds
 */
export function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(162, 155, 254, 0.3);
                border-radius: 8px;
                padding: 1rem;
                color: #ffffff;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: #a29bfe;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: all 0.3s ease;
            }
            .notification-close:hover {
                color: #ffffff;
                background: rgba(255, 255, 255, 0.1);
            }
            .notification-success { border-color: rgba(46, 204, 113, 0.5); }
            .notification-error { border-color: rgba(231, 76, 60, 0.5); }
            .notification-warning { border-color: rgba(241, 196, 15, 0.5); }
            .notification-info { border-color: rgba(52, 152, 219, 0.5); }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

/**
 * Toggle element visibility
 * @param {string} elementId - ID of the element to toggle
 * @param {boolean} force - Force show/hide (optional)
 */
export function toggleElement(elementId, force = null) {
    const element = document.getElementById(elementId);
    if (element) {
        if (force !== null) {
            element.style.display = force ? 'block' : 'none';
        } else {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }
    }
}

/**
 * Add CSS class to element
 * @param {string} elementId - ID of the element
 * @param {string} className - CSS class to add
 */
export function addClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Remove CSS class from element
 * @param {string} elementId - ID of the element
 * @param {string} className - CSS class to remove
 */
export function removeClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove(className);
    }
}

/**
 * Toggle CSS class on element
 * @param {string} elementId - ID of the element
 * @param {string} className - CSS class to toggle
 */
export function toggleClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle(className);
    }
}

/**
 * Set element text content
 * @param {string} elementId - ID of the element
 * @param {string} text - Text content to set
 */
export function setText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

/**
 * Set element HTML content
 * @param {string} elementId - ID of the element
 * @param {string} html - HTML content to set
 */
export function setHTML(elementId, html) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = html;
    }
}

/**
 * Get element value
 * @param {string} elementId - ID of the element
 * @returns {string} - Element value
 */
export function getValue(elementId) {
    const element = document.getElementById(elementId);
    return element ? element.value : '';
}

/**
 * Set element value
 * @param {string} elementId - ID of the element
 * @param {string} value - Value to set
 */
export function setValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.value = value;
    }
}

/**
 * Scroll element into view
 * @param {string} elementId - ID of the element to scroll to
 * @param {object} options - Scroll options
 */
export function scrollToElement(elementId, options = {}) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            ...options
        });
    }
} 