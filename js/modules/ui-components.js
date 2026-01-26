// ============================================
// UI КОМПОНЕНТЫ
// ============================================

import { CONFIG } from '../config.js';
import { throttle, createElement } from './utils.js';

/**
 * Класс для управления UI компонентами
 */
export class UIComponents {
    constructor() {
        this.backToTopButton = null;
        
        this.init();
    }

    /**
     * Инициализация UI компонентов
     */
    init() {
        this.createBackToTopButton();
        this.logWelcomeMessage();
    }

    /**
     * Создать кнопку "Вернуться наверх"
     */
    createBackToTopButton() {
        const config = CONFIG.BACK_TO_TOP_BUTTON;
        
        this.backToTopButton = createElement('button', {
            classes: 'back-to-top',
            attributes: {
                'aria-label': 'Вернуться наверх',
                'type': 'button'
            },
            innerHTML: '↑'
        });

        // Добавляем обработчик клика
        this.backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Добавляем hover эффекты
        this.backToTopButton.addEventListener('mouseenter', () => {
            this.backToTopButton.style.transform = 'translateY(-5px) scale(1.1)';
        });

        this.backToTopButton.addEventListener('mouseleave', () => {
            this.backToTopButton.style.transform = 'translateY(0) scale(1)';
        });

        // Обработчик скролла для показа/скрытия кнопки
        window.addEventListener('scroll', throttle(() => {
            this.updateBackToTopButton();
        }, CONFIG.SCROLL_THROTTLE_DELAY));

        document.body.appendChild(this.backToTopButton);
    }

    /**
     * Обновить видимость кнопки "Вернуться наверх"
     */
    updateBackToTopButton() {
        const config = CONFIG.BACK_TO_TOP_BUTTON;
        
        if (window.scrollY > config.SHOW_THRESHOLD) {
            this.backToTopButton.style.opacity = '1';
            this.backToTopButton.style.visibility = 'visible';
        } else {
            this.backToTopButton.style.opacity = '0';
            this.backToTopButton.style.visibility = 'hidden';
        }
    }

    /**
     * Вывести приветственное сообщение в консоль
     */
    logWelcomeMessage() {
        console.log('%c👋 Привет! ', 'font-size: 20px; font-weight: bold; color: #1F4E79;');
        console.log('%cЭто резюме Константина Капаневса', 'font-size: 14px; color: #444444;');
        
        // Логируем доступные темы
        console.log('%c\n5 цветовых схем доступны!', 'font-size: 12px; font-weight: bold; color: #0F544A;');
        console.log('%c  🌊 Малахитово-бирюзовая', 'font-size: 10px; color: #444444;');
        console.log('%c  🚀 Технологичный премиум', 'font-size: 10px; color: #444444;');
        console.log('%c  🌾 Уютный минимализм', 'font-size: 10px; color: #444444;');
        console.log('%c  🍇 Контрастная арт-палитра', 'font-size: 10px; color: #444444;');
        console.log('%c  ✨ Золото и серебро', 'font-size: 10px; color: #444444;');
    }

    /**
     * Показать уведомление
     * @param {string} message - текст сообщения
     * @param {number} duration - длительность показа (мс)
     */
    showNotification(message, duration = 3000) {
        const notification = createElement('div', {
            classes: 'notification',
            attributes: {
                'role': 'alert',
                'aria-live': 'polite'
            },
            innerHTML: message
        });

        document.body.appendChild(notification);

        // Показываем уведомление
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Скрываем и удаляем
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// Создаем и экспортируем единственный экземпляр
export const uiComponents = new UIComponents();
