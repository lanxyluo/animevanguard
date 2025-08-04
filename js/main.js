/**
 * Anime Vanguards Calculator - Main Entry Point
 * 
 * This file serves as the main entry point for the application.
 * It handles initialization, error handling, and performance optimization.
 */

// Import the main App class
import { App } from './app.js';

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    showGlobalError('An unexpected error occurred. Please refresh the page.');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showGlobalError('A network or processing error occurred. Please try again.');
});

// Global error display function
function showGlobalError(message) {
    // Create error overlay
    const errorOverlay = document.createElement('div');
    errorOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
    `;
    
    const errorContent = document.createElement('div');
    errorContent.style.cssText = `
        background: #1a1a2e;
        color: #fff;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        border: 2px solid #e94560;
    `;
    
    errorContent.innerHTML = `
        <h2 style="color: #e94560; margin-bottom: 20px;">
            <i class="fas fa-exclamation-triangle"></i> Error
        </h2>
        <p style="margin-bottom: 20px;">${message}</p>
        <button onclick="location.reload()" style="
            background: #e94560;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        ">Refresh Page</button>
    `;
    
    errorOverlay.appendChild(errorContent);
    document.body.appendChild(errorOverlay);
}

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    }
});

performanceObserver.observe({ entryTypes: ['navigation'] });

// Application initialization
async function initializeApp() {
    try {
        console.log('🚀 Starting Anime Vanguards Calculator...');
        
        // Show loading indicator
        showLoadingIndicator();
        
        // Initialize the main application
        const app = new App();
        await app.initialize();
        
        // Hide loading indicator
        hideLoadingIndicator();
        
        // Make app globally accessible for debugging
        window.app = app;
        
        console.log('✅ Application initialized successfully!');
        
        // Track successful initialization
        if (window.gtag) {
            gtag('event', 'app_initialized', {
                'event_category': 'app',
                'event_label': 'success'
            });
        }
        
    } catch (error) {
        console.error('❌ Application initialization failed:', error);
        hideLoadingIndicator();
        showGlobalError(`Failed to initialize application: ${error.message}`);
        
        // Track initialization failure
        if (window.gtag) {
            gtag('event', 'app_initialized', {
                'event_category': 'app',
                'event_label': 'error',
                'value': error.message
            });
        }
    }
}

// Loading indicator functions
function showLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'app-loading';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1a1a2e;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: Arial, sans-serif;
    `;
    
    loadingDiv.innerHTML = `
        <div style="text-align: center; color: #fff;">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid #333;
                border-top: 3px solid #e94560;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <h2>Loading Anime Vanguards Calculator...</h2>
            <p>Please wait while we initialize the application.</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loadingDiv);
}

function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('app-loading');
    if (loadingDiv) {
        loadingDiv.style.opacity = '0';
        loadingDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            if (loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
        }, 500);
    }
}

// Service Worker registration (for future PWA support)
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            // Commented out until sw.js is created
            // const registration = await navigator.serviceWorker.register('/sw.js');
            // console.log('Service Worker registered:', registration);
        } catch (error) {
            console.log('Service Worker registration failed:', error);
        }
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeApp();
        registerServiceWorker();
    });
} else {
    // DOM is already loaded
    initializeApp();
    registerServiceWorker();
}

// Export for testing purposes
export { initializeApp, showGlobalError }; 