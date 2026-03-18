export const CONFIG = {
    THEMES: ['malachite', 'cozy', 'art', 'luxury', 'burgundy'],
    DEFAULT_THEME: 'malachite',

    LANGUAGES: ['ru', 'en'],
    DEFAULT_LANGUAGE: 'ru',

    SCROLL_THRESHOLD: 300,
    SCROLL_THROTTLE_DELAY: 16,

    ANIMATION_DELAY: 100,
    BADGE_ANIMATION_DELAY: 100,
    SECTION_ANIMATION_DELAY: 100,

    TIP_DURATION: 5000,
    TIP_SHOW_DELAY: 2000,

    STORAGE_PREFIX: 'cv',
    STORAGE_KEYS: {
        THEME: 'theme',
        THEME_MANUAL: 'theme-manual',
        LANGUAGE: 'lang',
        SECTIONS_STATE: 'sections-state',
        TIPS_SHOWN: 'tips-shown'
    },

    DEFAULT_OPEN_SECTIONS: 2,

    KEYBOARD_SHORTCUTS: {
        PRINT: 'p',
        THEME_SWITCH: 'k',
        OPEN_ALL: 'o',
        CLOSE_ALL: 'C'
    },

    BACK_TO_TOP_BUTTON: {
        SHOW_THRESHOLD: 300,
        SIZE: 50,
        BOTTOM_OFFSET: 30,
        RIGHT_OFFSET: 30
    },

    OBSERVER_OPTIONS: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
};
