// ============================================
// МЕНЕДЖЕР ТЕМ
// ============================================

import { CONFIG } from '../config.js';
import { storage } from './storage-manager.js';
import { prefersDarkMode } from './utils.js';

/**
 * Класс для управления темами оформления
 */
export class ThemeManager {
    constructor() {
        this.body = document.body;
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.currentTheme = null;
        
        this.init();
    }

    /**
     * Инициализация менеджера тем
     */
    init() {
        // Загружаем сохраненную тему или используем дефолтную
        let savedTheme = storage.get(CONFIG.STORAGE_KEYS.THEME);
        
        // Автоопределение темы при первом запуске
        if (!savedTheme && !storage.has(CONFIG.STORAGE_KEYS.THEME_MANUAL)) {
            savedTheme = prefersDarkMode() ? 'tech' : CONFIG.DEFAULT_THEME;
        } else if (!savedTheme) {
            savedTheme = CONFIG.DEFAULT_THEME;
        }
        
        this.applyTheme(savedTheme);
        this.attachEventListeners();
        this.watchSystemTheme();
    }

    /**
     * Применить тему
     * @param {string} theme - название темы
     */
    applyTheme(theme) {
        // Проверяем валидность темы
        if (!CONFIG.THEMES.includes(theme)) {
            console.warn(`Invalid theme: ${theme}. Using default.`);
            theme = CONFIG.DEFAULT_THEME;
        }

        // Удаляем все классы тем
        CONFIG.THEMES.forEach(t => this.body.classList.remove(`theme-${t}`));
        
        // Добавляем класс выбранной темы
        this.body.classList.add(`theme-${theme}`);
        
        // Обновляем активную кнопку
        this.updateActiveButton(theme);
        
        // Сохраняем текущую тему
        this.currentTheme = theme;
        storage.set(CONFIG.STORAGE_KEYS.THEME, theme);
    }

    /**
     * Обновить активную кнопку темы
     * @param {string} theme - название темы
     */
    updateActiveButton(theme) {
        this.themeButtons.forEach(btn => {
            const isActive = btn.dataset.theme === theme;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    }

    /**
     * Переключить на следующую тему
     */
    nextTheme() {
        const currentIndex = CONFIG.THEMES.indexOf(this.currentTheme);
        const nextTheme = CONFIG.THEMES[(currentIndex + 1) % CONFIG.THEMES.length];
        this.applyTheme(nextTheme);
        this.markManualSelection();
    }

    /**
     * Получить текущую тему
     * @returns {string}
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Пометить ручной выбор темы
     */
    markManualSelection() {
        storage.set(CONFIG.STORAGE_KEYS.THEME_MANUAL, true);
    }

    /**
     * Прикрепить обработчики событий
     */
    attachEventListeners() {
        this.themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.dataset.theme;
                this.applyTheme(theme);
                this.markManualSelection();
            });
        });
    }

    /**
     * Следить за изменениями системной темы
     */
    watchSystemTheme() {
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Только если пользователь не выбрал тему вручную
                if (!storage.get(CONFIG.STORAGE_KEYS.THEME_MANUAL)) {
                    const newTheme = e.matches ? 'tech' : 'malachite';
                    this.applyTheme(newTheme);
                }
            });
        }
    }
}

// Создаем и экспортируем единственный экземпляр
export const themeManager = new ThemeManager();
