// ============================================
// ГЛАВНАЯ ТОЧКА ВХОДА
// ============================================

// Импортируем все модули
import { CONFIG } from './config.js';
import './modules/storage-manager.js';
import './modules/theme-manager.js';
import './modules/language-switcher.js';
import './modules/accordion.js';
import './modules/animations.js';
import './modules/keyboard-shortcuts.js';
import './modules/ui-components.js';
import { KeyboardShortcuts } from './modules/keyboard-shortcuts.js';

/**
 * Класс приложения
 */
class CVApp {
    constructor() {
        this.init();
    }

    /**
     * Инициализация приложения
     */
    init() {
        // Проверяем готовность DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onReady());
        } else {
            this.onReady();
        }
    }

    /**
     * Обработчик готовности DOM
     */
    onReady() {
        console.log('%c✨ CV Application initialized', 'color: #0F544A; font-weight: bold;');
        
        // Выводим список горячих клавиш
        KeyboardShortcuts.logShortcuts();
        
        // Добавляем класс для JS-enabled стилей
        document.documentElement.classList.add('js-enabled');
        
        // Обработка ошибок
        this.setupErrorHandling();
    }

    /**
     * Настройка обработки ошибок
     */
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Application error:', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }
}

// Создаем экземпляр приложения
new CVApp();
