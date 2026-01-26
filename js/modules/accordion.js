// ============================================
// АККОРДЕОН ДЛЯ СЕКЦИЙ
// ============================================

import { CONFIG } from '../config.js';
import { storage } from './storage-manager.js';
import { smoothScrollTo } from './utils.js';

/**
 * Класс для управления аккордеоном секций
 */
export class Accordion {
    constructor() {
        this.sectionHeaders = document.querySelectorAll('.section-header');
        this.sectionsState = {};
        
        this.init();
    }

    /**
     * Инициализация аккордеона
     */
    init() {
        // Загружаем сохраненное состояние секций
        this.sectionsState = storage.get(CONFIG.STORAGE_KEYS.SECTIONS_STATE, {});
        
        // Применяем сохраненное состояние
        this.applySavedState();
        
        // Прикрепляем обработчики событий
        this.attachEventListeners();
    }

    /**
     * Применить сохраненное состояние секций
     */
    applySavedState() {
        this.sectionHeaders.forEach((header, index) => {
            const sectionId = header.dataset.section;
            const content = document.getElementById(sectionId);
            
            if (!content) {
                console.warn(`Section content not found for: ${sectionId}`);
                return;
            }

            // Если состояние сохранено, применяем его
            if (this.sectionsState[sectionId] !== undefined) {
                this.toggleSection(header, content, this.sectionsState[sectionId], false);
            } else {
                // По умолчанию открываем первые N секций
                const shouldOpen = index < CONFIG.DEFAULT_OPEN_SECTIONS;
                this.toggleSection(header, content, shouldOpen, false);
                this.sectionsState[sectionId] = shouldOpen;
            }
        });
    }

    /**
     * Переключить секцию
     * @param {HTMLElement} header - заголовок секции
     * @param {HTMLElement} content - содержимое секции
     * @param {boolean} isOpen - открыть или закрыть
     * @param {boolean} withScroll - прокручивать ли к секции
     */
    toggleSection(header, content, isOpen, withScroll = true) {
        header.classList.toggle('active', isOpen);
        content.classList.toggle('active', isOpen);
        
        // Обновляем aria-атрибуты для доступности
        header.setAttribute('aria-expanded', isOpen);
        content.setAttribute('aria-hidden', !isOpen);
        
        // Плавная прокрутка к секции при открытии
        if (isOpen && withScroll) {
            setTimeout(() => {
                smoothScrollTo(header, 'nearest');
            }, CONFIG.ANIMATION_DELAY);
        }
    }

    /**
     * Открыть все секции
     */
    openAll() {
        this.sectionHeaders.forEach(header => {
            const sectionId = header.dataset.section;
            const content = document.getElementById(sectionId);
            
            if (content) {
                this.toggleSection(header, content, true, false);
                this.sectionsState[sectionId] = true;
            }
        });
        
        this.saveState();
    }

    /**
     * Закрыть все секции
     */
    closeAll() {
        this.sectionHeaders.forEach(header => {
            const sectionId = header.dataset.section;
            const content = document.getElementById(sectionId);
            
            if (content) {
                this.toggleSection(header, content, false, false);
                this.sectionsState[sectionId] = false;
            }
        });
        
        this.saveState();
    }

    /**
     * Сохранить состояние секций
     */
    saveState() {
        storage.set(CONFIG.STORAGE_KEYS.SECTIONS_STATE, this.sectionsState);
    }

    /**
     * Прикрепить обработчики событий
     */
    attachEventListeners() {
        this.sectionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sectionId = header.dataset.section;
                const content = document.getElementById(sectionId);
                
                if (content) {
                    const isOpen = content.classList.contains('active');
                    this.toggleSection(header, content, !isOpen);
                    
                    // Сохраняем состояние
                    this.sectionsState[sectionId] = !isOpen;
                    this.saveState();
                }
            });
            
            // Добавляем поддержку клавиатуры (Enter и Space)
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    }
}

// Создаем и экспортируем единственный экземпляр
export const accordion = new Accordion();
