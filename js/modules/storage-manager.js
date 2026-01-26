// ============================================
// МЕНЕДЖЕР ХРАНИЛИЩА (LocalStorage)
// ============================================

import { CONFIG } from '../config.js';

/**
 * Класс для централизованного управления localStorage
 */
export class StorageManager {
    constructor(prefix = CONFIG.STORAGE_PREFIX) {
        this.prefix = prefix;
    }

    /**
     * Получить значение из localStorage
     * @param {string} key - ключ
     * @param {*} defaultValue - значение по умолчанию
     * @returns {*} значение или defaultValue
     */
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(`${this.prefix}-${key}`);
            return value !== null ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.warn(`Error reading from localStorage (${key}):`, error);
            return defaultValue;
        }
    }

    /**
     * Сохранить значение в localStorage
     * @param {string} key - ключ
     * @param {*} value - значение
     */
    set(key, value) {
        try {
            localStorage.setItem(`${this.prefix}-${key}`, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing to localStorage (${key}):`, error);
        }
    }

    /**
     * Удалить значение из localStorage
     * @param {string} key - ключ
     */
    remove(key) {
        try {
            localStorage.removeItem(`${this.prefix}-${key}`);
        } catch (error) {
            console.error(`Error removing from localStorage (${key}):`, error);
        }
    }

    /**
     * Очистить все значения с префиксом
     */
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(`${this.prefix}-`)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }

    /**
     * Проверить существование ключа
     * @param {string} key - ключ
     * @returns {boolean}
     */
    has(key) {
        return localStorage.getItem(`${this.prefix}-${key}`) !== null;
    }
}

// Создаем и экспортируем единственный экземпляр
export const storage = new StorageManager();
