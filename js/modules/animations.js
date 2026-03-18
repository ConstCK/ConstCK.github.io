import { CONFIG } from '../config.js';
import { throttle } from './utils.js';

export class Animations {
    constructor() {
        this.observers = [];
        this.badgeAnimated = false;
        this.init();
    }

    init() {
        this.initSectionAnimations();
        this.initBadgeAnimations();
        this.initTechTagsHover();
        this.initScrollIndicator();
        this.initParallaxEffect();
    }

    initSectionAnimations() {
        const sections = document.querySelectorAll('.cv-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, CONFIG.OBSERVER_OPTIONS);

        sections.forEach(section => observer.observe(section));
        this.observers.push(observer);
    }

    initBadgeAnimations() {
        const skillBadges = document.querySelectorAll('.skill-badge');

        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !this.badgeAnimated) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                    }, index * CONFIG.BADGE_ANIMATION_DELAY);
                }
            });

            if (entries.some(entry => entry.isIntersecting)) {
                this.badgeAnimated = true;
            }
        }, { threshold: 0.1 });

        skillBadges.forEach(badge => badgeObserver.observe(badge));
        this.observers.push(badgeObserver);
    }

    initTechTagsHover() {
        const techTags = document.querySelectorAll('.tech-tags span');

        techTags.forEach(tag => {
            tag.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-4px) scale(1.08)';
            });

            tag.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.setAttribute('aria-hidden', 'true');
        document.body.appendChild(indicator);

        const updateIndicator = () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            indicator.style.width = scrolled + '%';
        };

        window.addEventListener('scroll', throttle(updateIndicator, CONFIG.SCROLL_THROTTLE_DELAY));
    }

    initParallaxEffect() {
        const cvHeader = document.querySelector('.cv-header');
        const bodyBefore = document.body;

        if (!cvHeader) return;

        const updateParallax = () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = scrolled * 0.15;
            bodyBefore.style.setProperty('--parallax-y', `${parallaxSpeed}px`);
        };

        window.addEventListener('scroll', throttle(updateParallax, CONFIG.SCROLL_THROTTLE_DELAY));
    }

    static initSmoothScroll() {
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
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

export const animations = new Animations();
Animations.initSmoothScroll();
