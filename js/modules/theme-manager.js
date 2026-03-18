import { CONFIG } from '../config.js';
import { storage } from './storage-manager.js';
import { prefersDarkMode } from './utils.js';

export class ThemeManager {
    constructor() {
        this.body = document.body;
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.currentTheme = null;
        this.init();
    }

    init() {
        let savedTheme = storage.get(CONFIG.STORAGE_KEYS.THEME);

        if (!savedTheme && !storage.has(CONFIG.STORAGE_KEYS.THEME_MANUAL)) {
            savedTheme = prefersDarkMode() ? 'cozy' : CONFIG.DEFAULT_THEME;
        } else if (!savedTheme) {
            savedTheme = CONFIG.DEFAULT_THEME;
        }

        this.applyTheme(savedTheme);
        this.attachEventListeners();
        this.watchSystemTheme();
    }

    applyTheme(theme) {
        if (!CONFIG.THEMES.includes(theme)) {
            console.warn(`Invalid theme: ${theme}. Using default.`);
            theme = CONFIG.DEFAULT_THEME;
        }

        CONFIG.THEMES.forEach(t => this.body.classList.remove(`theme-${t}`));
        this.body.classList.add(`theme-${theme}`);
        this.updateActiveButton(theme);
        this.currentTheme = theme;
        storage.set(CONFIG.STORAGE_KEYS.THEME, theme);
    }

    updateActiveButton(theme) {
        this.themeButtons.forEach(btn => {
            const isActive = btn.dataset.theme === theme;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    }

    nextTheme() {
        const currentIndex = CONFIG.THEMES.indexOf(this.currentTheme);
        const nextTheme = CONFIG.THEMES[(currentIndex + 1) % CONFIG.THEMES.length];
        this.applyTheme(nextTheme);
        this.markManualSelection();
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    markManualSelection() {
        storage.set(CONFIG.STORAGE_KEYS.THEME_MANUAL, true);
    }

    attachEventListeners() {
        this.themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.dataset.theme;
                this.applyTheme(theme);
                this.markManualSelection();
            });
        });
    }

    watchSystemTheme() {
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!storage.get(CONFIG.STORAGE_KEYS.THEME_MANUAL)) {
                    const newTheme = e.matches ? 'cozy' : 'malachite';
                    this.applyTheme(newTheme);
                }
            });
        }
    }
}

export const themeManager = new ThemeManager();
