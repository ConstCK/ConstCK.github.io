import { CONFIG } from './config.js';
import './modules/storage-manager.js';
import './modules/theme-manager.js';
import './modules/language-switcher.js';
import './modules/accordion.js';
import './modules/animations.js';
import './modules/keyboard-shortcuts.js';
import './modules/ui-components.js';
import { initExperienceCalculator } from './modules/experience-calculator.js';
import { KeyboardShortcuts } from './modules/keyboard-shortcuts.js';

class CVApp {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onReady());
        } else {
            this.onReady();
        }
    }

    onReady() {
        initExperienceCalculator();
        console.log('%c✨ CV Application initialized', 'color: #0F544A; font-weight: bold;');
        KeyboardShortcuts.logShortcuts();
        document.documentElement.classList.add('js-enabled');
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Application error:', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }
}

new CVApp();
