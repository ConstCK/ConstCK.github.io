// ============================================
// КОНФИГУРАЦИЯ ПРИЛОЖЕНИЯ
// ============================================

export const CONFIG = {
    // Темы
    THEMES: ['malachite', 'tech', 'cozy', 'art', 'luxury'],
    DEFAULT_THEME: 'malachite',
    
    // Языки
    LANGUAGES: ['ru', 'en'],
    DEFAULT_LANGUAGE: 'ru',
    
    // Скролл
    SCROLL_THRESHOLD: 300,
    SCROLL_THROTTLE_DELAY: 16, // ~60fps
    
    // Анимации
    ANIMATION_DELAY: 100,
    BADGE_ANIMATION_DELAY: 100,
    SECTION_ANIMATION_DELAY: 100,
    
    // Уведомления
    TIP_DURATION: 5000,
    TIP_SHOW_DELAY: 2000,
    
    // LocalStorage
    STORAGE_PREFIX: 'cv',
    STORAGE_KEYS: {
        THEME: 'theme',
        THEME_MANUAL: 'theme-manual',
        LANGUAGE: 'lang',
        SECTIONS_STATE: 'sections-state',
        TIPS_SHOWN: 'tips-shown'
    },
    
    // Секции по умолчанию
    DEFAULT_OPEN_SECTIONS: 2,
    
    // Горячие клавиши
    KEYBOARD_SHORTCUTS: {
        PRINT: 'p',
        THEME_SWITCH: 'k',
        OPEN_ALL: 'o',
        CLOSE_ALL: 'C' // Shift + C
    },
    
    // UI компоненты
    BACK_TO_TOP_BUTTON: {
        SHOW_THRESHOLD: 300,
        SIZE: 50,
        BOTTOM_OFFSET: 30,
        RIGHT_OFFSET: 30
    },
    
    // IntersectionObserver
    OBSERVER_OPTIONS: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
};
