import { languageSwitcher } from './language-switcher.js';

const EXPERIENCE_SELECTOR = '#experience .period[data-start]';
const DYNAMIC_EXPERIENCE_SELECTOR = '[data-dynamic-experience]';
const DYNAMIC_TOOLTIP_SELECTOR = '[data-dynamic-experience-tooltip]';

/**
 * @param {string} start - YYYY-MM
 * @param {string} [end] - YYYY-MM | "present"
 * @returns {{ start: Date, end: Date }}
 */
function parseEmploymentPeriod(start, end = 'present') {
    const [startYear, startMonth] = start.split('-').map(Number);
    const startDate = new Date(startYear, startMonth - 1, 1);

    let endDate;
    if (end === 'present') {
        endDate = new Date();
    } else {
        const [endYear, endMonth] = end.split('-').map(Number);
        endDate = new Date(endYear, endMonth, 0);
    }

    return { start: startDate, end: endDate };
}

/**
 * @param {{ start: Date, end: Date }[]} intervals
 * @returns {{ start: Date, end: Date }[]}
 */
function mergeIntervals(intervals) {
    if (!intervals.length) {
        return [];
    }

    const sorted = [...intervals].sort((a, b) => a.start - b.start);
    const merged = [{ ...sorted[0] }];

    for (let i = 1; i < sorted.length; i += 1) {
        const current = sorted[i];
        const last = merged[merged.length - 1];

        if (current.start <= last.end) {
            last.end = new Date(Math.max(last.end.getTime(), current.end.getTime()));
        } else {
            merged.push({ ...current });
        }
    }

    return merged;
}

/**
 * @param {{ start: Date, end: Date }[]} intervals
 * @returns {number}
 */
function getTotalMonths(intervals) {
    return mergeIntervals(intervals).reduce((total, { start, end }) => {
        const months = (end.getFullYear() - start.getFullYear()) * 12
            + (end.getMonth() - start.getMonth())
            + 1;
        return total + months;
    }, 0);
}

/**
 * @param {number} totalMonths
 * @returns {string} e.g. "2", "2+", "3+"
 */
export function formatExperienceValue(totalMonths) {
    const years = Math.floor(totalMonths / 12);
    const remainder = totalMonths % 12;

    if (remainder > 0) {
        return `${years}+`;
    }

    return String(years);
}

function ruExperienceLabel(value) {
    const hasPlus = value.includes('+');
    const years = parseInt(value, 10);

    if (!hasPlus && years === 1) {
        return '1 год';
    }
    if (!hasPlus && years >= 2 && years <= 4) {
        return `${value} года`;
    }
    return `${value} лет`;
}

function enExperienceLabel(value) {
    const years = parseInt(value, 10);
    if (!value.includes('+') && years === 1) {
        return '1 year';
    }
    return `${value} years`;
}

function ruTooltipLabel(value) {
    const hasPlus = value.includes('+');
    const years = parseInt(value, 10);

    if (!hasPlus && years === 1) {
        return '1 год';
    }
    if (!hasPlus && years >= 2 && years <= 4) {
        return `${value} года`;
    }
    if (hasPlus) {
        return `${value} года`;
    }
    return `${value} лет`;
}

/**
 * @returns {string}
 */
export function calculateExperienceValue() {
    const periods = document.querySelectorAll(EXPERIENCE_SELECTOR);

    if (!periods.length) {
        return '0';
    }

    const intervals = Array.from(periods).map((element) => {
        return parseEmploymentPeriod(element.dataset.start, element.dataset.end);
    });

    return formatExperienceValue(getTotalMonths(intervals));
}

function enTooltipLabel(value) {
    const years = parseInt(value, 10);
    if (!value.includes('+') && years === 1) {
        return '1 year';
    }
    return `${value} years`;
}

function buildExperienceLabels(value) {
    return {
        ru: ruExperienceLabel(value),
        en: enExperienceLabel(value),
        tooltipRu: `Backend разработка, ${ruTooltipLabel(value)} опыта`,
        tooltipEn: `Backend development, ${enTooltipLabel(value)} experience`,
    };
}

function applyExperienceToDom(labels) {
    document.querySelectorAll(DYNAMIC_EXPERIENCE_SELECTOR).forEach((element) => {
        element.setAttribute('data-ru', labels.ru);
        element.setAttribute('data-en', labels.en);
    });

    document.querySelectorAll(DYNAMIC_TOOLTIP_SELECTOR).forEach((element) => {
        element.setAttribute('data-tooltip-ru', labels.tooltipRu);
        element.setAttribute('data-tooltip-en', labels.tooltipEn);
    });
}

export function initExperienceCalculator() {
    const value = calculateExperienceValue();
    const labels = buildExperienceLabels(value);

    applyExperienceToDom(labels);

    if (languageSwitcher.getCurrentLanguage()) {
        languageSwitcher.refreshText();
    }
}
