import { CONFIG } from '../config.js';

export class StorageManager {
    constructor(prefix = CONFIG.STORAGE_PREFIX) {
        this.prefix = prefix;
    }

    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(`${this.prefix}-${key}`);
            return value !== null ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.warn(`Error reading from localStorage (${key}):`, error);
            return defaultValue;
        }
    }

    set(key, value) {
        try {
            localStorage.setItem(`${this.prefix}-${key}`, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing to localStorage (${key}):`, error);
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(`${this.prefix}-${key}`);
        } catch (error) {
            console.error(`Error removing from localStorage (${key}):`, error);
        }
    }

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

    has(key) {
        return localStorage.getItem(`${this.prefix}-${key}`) !== null;
    }
}

export const storage = new StorageManager();
