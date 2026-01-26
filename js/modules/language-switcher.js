// ============================================
// ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА
// ============================================

import { CONFIG } from '../config.js';
import { storage } from './storage-manager.js';

/**
 * Класс для управления переключением языков
 */
export class LanguageSwitcher {
    constructor() {
        this.langBtn = document.getElementById('langToggle');
        this.currentLang = null;
        
        this.init();
    }

    /**
     * Инициализация переключателя языка
     */
    init() {
        if (!this.langBtn) {
            console.warn('Language toggle button not found');
            return;
        }

        // Загружаем сохраненный язык или используем дефолтный
        const savedLang = storage.get(CONFIG.STORAGE_KEYS.LANGUAGE, CONFIG.DEFAULT_LANGUAGE);
        this.switchLanguage(savedLang);
        
        this.attachEventListeners();
    }

    /**
     * Переключить язык
     * @param {string} lang - код языка ('ru' или 'en')
     */
    switchLanguage(lang) {
        // Проверяем валидность языка
        if (!CONFIG.LANGUAGES.includes(lang)) {
            console.warn(`Invalid language: ${lang}. Using default.`);
            lang = CONFIG.DEFAULT_LANGUAGE;
        }

        // Обновляем текст кнопки
        this.langBtn.textContent = lang === 'ru' ? 'EN' : 'RU';
        this.langBtn.setAttribute('aria-label', 
            lang === 'ru' ? 'Switch to English' : 'Переключить на русский'
        );
        
        // Обновляем все элементы с data-атрибутами
        this.updateElementsText(lang);
        
        // Обновляем title атрибуты
        this.updateTitles(lang);
        
        // Обновляем атрибут lang в html (для CSS селекторов)
        document.documentElement.lang = lang;
        
        // Сохраняем текущий язык
        this.currentLang = lang;
        storage.set(CONFIG.STORAGE_KEYS.LANGUAGE, lang);
    }

    /**
     * Обновить текст элементов
     * @param {string} lang - код языка
     */
    updateElementsText(lang) {
        const elements = document.querySelectorAll('[data-ru][data-en]');
        
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // Если элемент без вложенных тегов
                if (element.children.length === 0) {
                    element.textContent = text;
                } else {
                    // Для элементов с вложенными тегами обновляем только текстовые узлы
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

    /**
     * Обновить title атрибуты
     * @param {string} lang - код языка
     */
    updateTitles(lang) {
        const buttonsWithTitle = document.querySelectorAll('[data-title-ru][data-title-en]');
        buttonsWithTitle.forEach(button => {
            const titleText = button.getAttribute(`data-title-${lang}`);
            if (titleText) {
                button.setAttribute('title', titleText);
            }
        });
    }

    /**
     * Переключить на другой язык
     */
    toggleLanguage() {
        const newLang = this.currentLang === 'ru' ? 'en' : 'ru';
        this.switchLanguage(newLang);
    }

    /**
     * Получить текущий язык
     * @returns {string}
     */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /**
     * Прикрепить обработчики событий
     */
    attachEventListeners() {
        this.langBtn.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }
}

// Создаем и экспортируем единственный экземпляр
export const languageSwitcher = new LanguageSwitcher();
