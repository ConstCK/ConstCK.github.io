// ============================================
// ГОРЯЧИЕ КЛАВИШИ
// ============================================

import { CONFIG } from '../config.js';
import { themeManager } from './theme-manager.js';
import { accordion } from './accordion.js';

/**
 * Класс для управления горячими клавишами
 */
export class KeyboardShortcuts {
    constructor() {
        this.init();
    }

    /**
     * Инициализация горячих клавиш
     */
    init() {
        this.attachEventListeners();
        this.showTipsOnFirstVisit();
    }

    /**
     * Обработчик горячих клавиш
     * @param {KeyboardEvent} e - событие клавиатуры
     */
    handleKeyPress(e) {
        const isModifierPressed = e.ctrlKey || e.metaKey;
        
        if (!isModifierPressed) return;

        // Ctrl/Cmd + P - печать
        if (e.key === CONFIG.KEYBOARD_SHORTCUTS.PRINT) {
            e.preventDefault();
            this.printCV();
        }

        // Ctrl/Cmd + K - смена темы
        if (e.key === CONFIG.KEYBOARD_SHORTCUTS.THEME_SWITCH) {
            e.preventDefault();
            themeManager.nextTheme();
        }

        // Ctrl/Cmd + O - открыть все секции
        if (e.key === CONFIG.KEYBOARD_SHORTCUTS.OPEN_ALL) {
            e.preventDefault();
            accordion.openAll();
        }

        // Ctrl/Cmd + Shift + C - закрыть все секции
        if (e.shiftKey && e.key === CONFIG.KEYBOARD_SHORTCUTS.CLOSE_ALL) {
            e.preventDefault();
            accordion.closeAll();
        }
    }

    /**
     * Печать CV
     */
    printCV() {
        // Раскрываем все секции перед печатью
        accordion.openAll();
        
        setTimeout(() => {
            window.print();
        }, CONFIG.ANIMATION_DELAY);
    }

    /**
     * Показать подсказки при первом посещении
     */
    showTipsOnFirstVisit() {
        const { STORAGE_KEYS, TIP_SHOW_DELAY, TIP_DURATION } = CONFIG;
        
        // Проверяем, показывали ли уже подсказки
        if (localStorage.getItem(`${CONFIG.STORAGE_PREFIX}-${STORAGE_KEYS.TIPS_SHOWN}`)) {
            return;
        }

        setTimeout(() => {
            const tip = this.createTipElement();
            document.body.appendChild(tip);

            setTimeout(() => {
                tip.style.animation = 'slideUpTip 0.5s ease-out reverse';
                setTimeout(() => tip.remove(), 500);
            }, TIP_DURATION);

            localStorage.setItem(`${CONFIG.STORAGE_PREFIX}-${STORAGE_KEYS.TIPS_SHOWN}`, 'true');
        }, TIP_SHOW_DELAY);
    }

    /**
     * Создать элемент подсказки
     * @returns {HTMLElement}
     */
    createTipElement() {
        const tip = document.createElement('div');
        tip.className = 'keyboard-tip';
        tip.setAttribute('role', 'alert');
        tip.setAttribute('aria-live', 'polite');
        
        tip.innerHTML = `
            <strong>💡 Подсказка:</strong> Используйте <kbd>Ctrl+K</kbd> для смены темы, 
            <kbd>Ctrl+O</kbd> для открытия всех секций
        `;

        return tip;
    }

    /**
     * Вывести список горячих клавиш в консоль
     */
    static logShortcuts() {
        console.log('%cГорячие клавиши:', 'font-size: 12px; font-weight: bold; color: #1F4E79; margin-top: 10px;');
        console.log('%c  Ctrl+K - Смена темы', 'font-size: 11px; color: #444444;');
        console.log('%c  Ctrl+O - Открыть все секции', 'font-size: 11px; color: #444444;');
        console.log('%c  Ctrl+Shift+C - Закрыть все секции', 'font-size: 11px; color: #444444;');
        console.log('%c  Ctrl+P - Печать', 'font-size: 11px; color: #444444;');
    }

    /**
     * Прикрепить обработчики событий
     */
    attachEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
}

// Создаем и экспортируем единственный экземпляр
export const keyboardShortcuts = new KeyboardShortcuts();
