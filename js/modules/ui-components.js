import { CONFIG } from '../config.js';
import { throttle, createElement } from './utils.js';

export class UIComponents {
    constructor() {
        this.backToTopButton = null;
        this.init();
    }

    init() {
        this.createBackToTopButton();
        this.initPdfDownloadButton();
        this.logWelcomeMessage();
    }

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

        this.backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        this.backToTopButton.addEventListener('mouseenter', () => {
            this.backToTopButton.style.transform = 'translateY(-5px) scale(1.1)';
        });

        this.backToTopButton.addEventListener('mouseleave', () => {
            this.backToTopButton.style.transform = 'translateY(0) scale(1)';
        });

        window.addEventListener('scroll', throttle(() => {
            this.updateBackToTopButton();
        }, CONFIG.SCROLL_THROTTLE_DELAY));

        document.body.appendChild(this.backToTopButton);
    }

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

    initPdfDownloadButton() {
        const pdfBtn = document.getElementById('pdfDownload');

        if (!pdfBtn) {
            console.warn('PDF download button not found');
            return;
        }

        pdfBtn.addEventListener('click', () => {
            this.handlePdfDownload();
        });
    }

    handlePdfDownload() {
        const sectionHeaders = document.querySelectorAll('.section-header');

        sectionHeaders.forEach(header => {
            const sectionId = header.getAttribute('data-section');
            const content = document.getElementById(sectionId);

            if (content) {
                header.classList.add('active');
                content.classList.add('active');
            }
        });

        setTimeout(() => {
            window.print();
        }, 100);
    }

    logWelcomeMessage() {
        console.log('%c👋 Привет! ', 'font-size: 20px; font-weight: bold; color: #1F4E79;');
        console.log('%cЭто резюме Константина Капаневса', 'font-size: 14px; color: #444444;');
        console.log('%c\n4 цветовых схемы доступны!', 'font-size: 12px; font-weight: bold; color: #0F544A;');
        console.log('%c  💎 Малахитово-бирюзовая', 'font-size: 10px; color: #444444;');
        console.log('%c  🌙 Уютный минимализм', 'font-size: 10px; color: #444444;');
        console.log('%c  ❤️ Контрастная арт-палитра', 'font-size: 10px; color: #444444;');
        console.log('%c  💰 Золото и серебро', 'font-size: 10px; color: #444444;');
    }

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

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

export const uiComponents = new UIComponents();
