// ===============================
// PORTFOLIO MODULES INITIALIZATION
// ===============================

/**
 * ScrollReveal - Reveals elements on scroll with animation
 */
class ScrollReveal {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all elements with scroll-animate-in class
        document.querySelectorAll('.scroll-animate-in').forEach(el => {
            observer.observe(el);
        });
    }

    revealElement(element) {
        element.classList.add('in-view');
    }
}

/**
 * ElementAnimator - Applies staggered animations to elements
 */
class ElementAnimator {
    static staggerElements(selector, animationClass, delay = 0.1) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.animationDelay = `${delay * index}s`;
            el.classList.add(animationClass);
        });
    }

    static animateOnHover(selector, enterClass, leaveClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.remove(leaveClass);
                el.classList.add(enterClass);
            });

            el.addEventListener('mouseleave', () => {
                el.classList.remove(enterClass);
                el.classList.add(leaveClass);
            });
        });
    }
}

/**
 * PerformanceOptimizer - Handles lazy loading and performance
 */
class PerformanceOptimizer {
    static lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');

                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback
            images.forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            });
        }
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

/**
 * AccessibilityHelper - Improves accessibility
 */
class AccessibilityHelper {
    static ensureKeyboardNavigation(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (!el.hasAttribute('tabindex')) {
                el.setAttribute('tabindex', '0');
            }

            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
    }

    static addAriaLabels() {
        // Add aria labels to interactive elements
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(btn => {
            if (btn.textContent.trim()) {
                btn.setAttribute('aria-label', btn.textContent.trim());
            }
        });
    }
}

/**
 * ResponsiveHelper - Handles responsive behavior
 */
class ResponsiveHelper {
    static isMobile() {
        return window.innerWidth < 768;
    }

    static isTablet() {
        return window.innerWidth >= 768 && window.innerWidth < 1024;
    }

    static isDesktop() {
        return window.innerWidth >= 1024;
    }

    static onResize(callback) {
        const debouncedCallback = PerformanceOptimizer.debounce(callback, 250);
        window.addEventListener('resize', debouncedCallback);
    }

    static adaptToScreenSize() {
        const handleResize = () => {
            if (this.isMobile()) {
                document.body.classList.add('mobile');
                document.body.classList.remove('tablet', 'desktop');
            } else if (this.isTablet()) {
                document.body.classList.add('tablet');
                document.body.classList.remove('mobile', 'desktop');
            } else {
                document.body.classList.add('desktop');
                document.body.classList.remove('mobile', 'tablet');
            }
        };

        handleResize();
        this.onResize(handleResize);
    }
}

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✨ Portfolio initialized with enhanced performance', 'color: #D20A2E; font-weight: bold;');

    // Initialize all modules
    new ScrollReveal();
    PerformanceOptimizer.lazyLoadImages();
    ResponsiveHelper.adaptToScreenSize();
    AccessibilityHelper.addAriaLabels();

    // Apply animations to common elements
    ElementAnimator.staggerElements('.project-card', 'animate-fade-in-up', 0.1);
    ElementAnimator.staggerElements('.skill-item', 'animate-zoom-in', 0.05);
    ElementAnimator.staggerElements('.stat-item', 'animate-slide-in-up', 0.1);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Export for use in other scripts
window.Portfolio = {
    ScrollReveal,
    ElementAnimator,
    PerformanceOptimizer,
    AccessibilityHelper,
    ResponsiveHelper
};
