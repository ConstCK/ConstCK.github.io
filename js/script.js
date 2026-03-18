const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

const savedTheme = localStorage.getItem('cv-theme') || 'malachite';
applyTheme(savedTheme);

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        applyTheme(theme);
        localStorage.setItem('cv-theme', theme);
    });
});

function applyTheme(theme) {
    body.classList.remove('theme-malachite', 'theme-cozy', 'theme-art', 'theme-luxury');

    if (theme === 'malachite') {
        body.classList.add('theme-malachite');
    } else if (theme === 'cozy') {
        body.classList.add('theme-cozy');
    } else if (theme === 'art') {
        body.classList.add('theme-art');
    } else if (theme === 'luxury') {
        body.classList.add('theme-luxury');
    }

    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        }
    });
}

const sectionHeaders = document.querySelectorAll('.section-header');
const savedSectionsState = JSON.parse(localStorage.getItem('cv-sections-state')) || {};

sectionHeaders.forEach(header => {
    const sectionId = header.getAttribute('data-section');
    const content = document.getElementById(sectionId);

    if (savedSectionsState[sectionId] !== undefined) {
        if (savedSectionsState[sectionId]) {
            header.classList.add('active');
            content.classList.add('active');
        }
    } else {
        const allHeaders = Array.from(sectionHeaders);
        const index = allHeaders.indexOf(header);
        if (index < 2) {
            header.classList.add('active');
            content.classList.add('active');
            savedSectionsState[sectionId] = true;
        }
    }
});

sectionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const sectionId = header.getAttribute('data-section');
        const content = document.getElementById(sectionId);

        header.classList.toggle('active');
        content.classList.toggle('active');

        savedSectionsState[sectionId] = content.classList.contains('active');
        localStorage.setItem('cv-sections-state', JSON.stringify(savedSectionsState));

        if (content.classList.contains('active')) {
            setTimeout(() => {
                header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.cv-section').forEach(section => {
    observer.observe(section);
});

const skillBadges = document.querySelectorAll('.skill-badge');
let badgeAnimated = false;

const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting && !badgeAnimated) {
            setTimeout(() => {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            }, index * 100);
        }
    });

    if (entries.some(entry => entry.isIntersecting)) {
        badgeAnimated = true;
    }
}, { threshold: 0.1 });

skillBadges.forEach(badge => {
    badgeObserver.observe(badge);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

const techTags = document.querySelectorAll('.tech-tags span');

techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();

        sectionHeaders.forEach(header => {
            const sectionId = header.getAttribute('data-section');
            const content = document.getElementById(sectionId);
            header.classList.add('active');
            content.classList.add('active');
        });

        setTimeout(() => {
            window.print();
        }, 100);
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const themes = ['malachite', 'cozy', 'art', 'luxury'];
        const currentTheme = localStorage.getItem('cv-theme') || 'malachite';
        const currentIndex = themes.indexOf(currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        applyTheme(nextTheme);
        localStorage.setItem('cv-theme', nextTheme);
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        sectionHeaders.forEach(header => {
            const sectionId = header.getAttribute('data-section');
            const content = document.getElementById(sectionId);
            header.classList.add('active');
            content.classList.add('active');
            savedSectionsState[sectionId] = true;
        });
        localStorage.setItem('cv-sections-state', JSON.stringify(savedSectionsState));
    }

    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        sectionHeaders.forEach(header => {
            const sectionId = header.getAttribute('data-section');
            const content = document.getElementById(sectionId);
            header.classList.remove('active');
            content.classList.remove('active');
            savedSectionsState[sectionId] = false;
        });
        localStorage.setItem('cv-sections-state', JSON.stringify(savedSectionsState));
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    return indicator;
};

const scrollIndicator = createScrollIndicator();

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
});

if (!localStorage.getItem('cv-tips-shown')) {
    setTimeout(() => {
        const tip = document.createElement('div');
        tip.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 9999;
            font-size: 14px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideUpTip 0.5s ease-out;
            max-width: 90%;
            text-align: center;
        `;
        tip.innerHTML = `
            <strong>💡 Подсказка:</strong> Используйте <kbd>Ctrl+K</kbd> для смены темы, 
            <kbd>Ctrl+O</kbd> для открытия всех секций
        `;

        const keyStyle = document.createElement('style');
        keyStyle.textContent = `
            kbd {
                background: rgba(255, 255, 255, 0.2);
                padding: 2px 6px;
                border-radius: 3px;
                font-family: monospace;
                font-size: 12px;
            }
            @keyframes slideUpTip {
                from {
                    opacity: 0;
                    transform: translate(-50%, 20px);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
            }
        `;
        document.head.appendChild(keyStyle);
        document.body.appendChild(tip);

        setTimeout(() => {
            tip.style.animation = 'slideUpTip 0.5s ease-out reverse';
            setTimeout(() => tip.remove(), 500);
        }, 5000);

        localStorage.setItem('cv-tips-shown', 'true');
    }, 2000);
}

const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Вернуться наверх');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px) scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });

    document.body.appendChild(button);
};

createBackToTop();

console.log('%c👋 Привет! ', 'font-size: 20px; font-weight: bold; color: #1F4E79;');
console.log('%cЭто резюме Константина Капаневса', 'font-size: 14px; color: #444444;');
console.log('%cГорячие клавиши:', 'font-size: 12px; font-weight: bold; color: #1F4E79; margin-top: 10px;');
console.log('%c  Ctrl+K - Смена темы', 'font-size: 11px; color: #444444;');
console.log('%c  Ctrl+O - Открыть все секции', 'font-size: 11px; color: #444444;');
console.log('%c  Ctrl+Shift+C - Закрыть все секции', 'font-size: 11px; color: #444444;');
console.log('%c  Ctrl+P - Печать', 'font-size: 11px; color: #444444;');
console.log('%c\n4 цветовых схемы доступны!', 'font-size: 12px; font-weight: bold; color: #0F544A;');
console.log('%c  💎 Малахитово-бирюзовая', 'font-size: 10px; color: #444444;');
console.log('%c  🌙 Уютный минимализм', 'font-size: 10px; color: #444444;');
console.log('%c  ❤️ Контрастная арт-палитра', 'font-size: 10px; color: #444444;');
console.log('%c  💰 Золото и серебро', 'font-size: 10px; color: #444444;');

if (!localStorage.getItem('cv-theme')) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('cozy');
        localStorage.setItem('cv-theme', 'cozy');
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('cv-theme-manual')) {
        const newTheme = e.matches ? 'cozy' : 'malachite';
        applyTheme(newTheme);
        localStorage.setItem('cv-theme', newTheme);
    }
});

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        localStorage.setItem('cv-theme-manual', 'true');
    });
});

const langBtn = document.getElementById('langToggle');
let currentLang = localStorage.getItem('cv-lang') || 'ru';

document.documentElement.lang = currentLang;

if (currentLang === 'en') {
    switchLanguage('en');
} else {
    langBtn.textContent = 'EN';
}

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    switchLanguage(currentLang);
    localStorage.setItem('cv-lang', currentLang);
});

function switchLanguage(lang) {
    langBtn.textContent = lang === 'ru' ? 'EN' : 'RU';

    const elements = document.querySelectorAll('[data-ru][data-en]');

    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.children.length === 0) {
                element.textContent = text;
            } else {
                const childNodes = Array.from(element.childNodes);
                childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        node.textContent = text;
                    }
                });
            }
        }
    });

    const buttonsWithTitle = document.querySelectorAll('[data-title-ru][data-title-en]');
    buttonsWithTitle.forEach(button => {
        const titleText = button.getAttribute(`data-title-${lang}`);
        if (titleText) {
            button.setAttribute('title', titleText);
        }
    });

    document.documentElement.lang = lang;
}

const pdfBtn = document.getElementById('pdfDownload');

if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
        sectionHeaders.forEach(header => {
            const sectionId = header.getAttribute('data-section');
            const content = document.getElementById(sectionId);
            header.classList.add('active');
            content.classList.add('active');
        });

        setTimeout(() => {
            window.print();
        }, 100);
    });
}
