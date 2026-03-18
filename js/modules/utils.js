export function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

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

export function smoothScrollTo(element, block = 'start') {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: block
        });
    }
}

export function supportsMatchMedia() {
    return typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
}

export function prefersDarkMode() {
    return supportsMatchMedia() && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
