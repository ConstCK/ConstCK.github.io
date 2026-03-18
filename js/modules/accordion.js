import { CONFIG } from '../config.js';
import { storage } from './storage-manager.js';
import { smoothScrollTo } from './utils.js';

export class Accordion {
    constructor() {
        this.sectionHeaders = document.querySelectorAll('.section-header');
        this.sectionsState = {};
        this.init();
    }

    init() {
        this.sectionsState = storage.get(CONFIG.STORAGE_KEYS.SECTIONS_STATE, {});
        this.applySavedState();
        this.attachEventListeners();
    }

    applySavedState() {
        this.sectionHeaders.forEach((header, index) => {
            const sectionId = header.dataset.section;
            const content = document.getElementById(sectionId);

            if (!content) {
                console.warn(`Section content not found for: ${sectionId}`);
                return;
            }

            if (this.sectionsState[sectionId] !== undefined) {
                this.toggleSection(header, content, this.sectionsState[sectionId], false);
            } else {
                const shouldOpen = index < CONFIG.DEFAULT_OPEN_SECTIONS;
                this.toggleSection(header, content, shouldOpen, false);
                this.sectionsState[sectionId] = shouldOpen;
            }
        });
    }

    toggleSection(header, content, isOpen, withScroll = true) {
        header.classList.toggle('active', isOpen);
        content.classList.toggle('active', isOpen);
        header.setAttribute('aria-expanded', isOpen);
        content.setAttribute('aria-hidden', !isOpen);

        if (isOpen && withScroll) {
            setTimeout(() => {
                smoothScrollTo(header, 'nearest');
            }, CONFIG.ANIMATION_DELAY);
        }
    }

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

    saveState() {
        storage.set(CONFIG.STORAGE_KEYS.SECTIONS_STATE, this.sectionsState);
    }

    attachEventListeners() {
        this.sectionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sectionId = header.dataset.section;
                const content = document.getElementById(sectionId);

                if (content) {
                    const isOpen = content.classList.contains('active');
                    this.toggleSection(header, content, !isOpen);
                    this.sectionsState[sectionId] = !isOpen;
                    this.saveState();
                }
            });

            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    }
}

export const accordion = new Accordion();
