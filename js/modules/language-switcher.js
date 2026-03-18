import { CONFIG } from '../config.js';
import { storage } from './storage-manager.js';

export class LanguageSwitcher {
    constructor() {
        this.langBtn = document.getElementById('langToggle');
        this.currentLang = null;
        this.init();
    }

    init() {
        if (!this.langBtn) {
            console.warn('Language toggle button not found');
            return;
        }

        const savedLang = storage.get(CONFIG.STORAGE_KEYS.LANGUAGE, CONFIG.DEFAULT_LANGUAGE);
        this.switchLanguage(savedLang);
        this.attachEventListeners();
    }

    switchLanguage(lang) {
        if (!CONFIG.LANGUAGES.includes(lang)) {
            console.warn(`Invalid language: ${lang}. Using default.`);
            lang = CONFIG.DEFAULT_LANGUAGE;
        }

        this.langBtn.textContent = lang === 'ru' ? 'EN' : 'RU';
        this.langBtn.setAttribute('aria-label',
            lang === 'ru' ? 'Switch to English' : 'Переключить на русский'
        );
        this.updateElementsText(lang);
        this.updateTitles(lang);
        document.documentElement.lang = lang;
        this.currentLang = lang;
        storage.set(CONFIG.STORAGE_KEYS.LANGUAGE, lang);
    }

    updateElementsText(lang) {
        const elements = document.querySelectorAll('[data-ru][data-en]');

        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.children.length === 0) {
                    element.textContent = text;
                } else {
                    const childNodes = Array.from(element.childNodes);
                    childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            node.textContent = text;
                        }
                    });
                }
            }
        });
    }

    updateTitles(lang) {
        const buttonsWithTitle = document.querySelectorAll('[data-title-ru][data-title-en]');
        buttonsWithTitle.forEach(button => {
            const titleText = button.getAttribute(`data-title-${lang}`);
            if (titleText) {
                button.setAttribute('title', titleText);
            }
        });
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'ru' ? 'en' : 'ru';
        this.switchLanguage(newLang);
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    attachEventListeners() {
        this.langBtn.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }
}

export const languageSwitcher = new LanguageSwitcher();
