// ============================================
// УТИЛИТЫ
// ============================================

/**
 * Throttle функция - ограничивает частоту вызовов
 * @param {Function} func - функция для throttle
 * @param {number} delay - задержка в мс
 * @returns {Function}
 */
export function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

/**
 * Debounce функция - откладывает выполнение
 * @param {Function} func - функция для debounce
 * @param {number} delay - задержка в мс
 * @returns {Function}
 */
export function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Создать элемент с атрибутами и стилями
 * @param {string} tag - тег элемента
 * @param {Object} options - опции (classes, attributes, styles, innerHTML)
 * @returns {HTMLElement}
 */
export function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    
    if (options.classes) {
        element.classList.add(...(Array.isArray(options.classes) ? options.classes : [options.classes]));
    }
    
    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    
    if (options.styles) {
        Object.assign(element.style, options.styles);
    }
    
    if (options.innerHTML) {
        element.innerHTML = options.innerHTML;
    }
    
    if (options.textContent) {
        element.textContent = options.textContent;
    }
    
    return element;
}

/**
 * Плавная прокрутка к элементу
 * @param {HTMLElement} element - элемент
 * @param {string} block - позиция ('start', 'center', 'end', 'nearest')
 */
export function smoothScrollTo(element, block = 'start') {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: block
        });
    }
}

/**
 * Проверка поддержки matchMedia
 * @returns {boolean}
 */
export function supportsMatchMedia() {
    return typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
}

/**
 * Проверка темной темы системы
 * @returns {boolean}
 */
export function prefersDarkMode() {
    return supportsMatchMedia() && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
