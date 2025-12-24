// ===============================
// PORTFOLIO CONFIGURATION
// ===============================

const PortfolioConfig = {
    // Animation settings
    animations: {
        duration: 600,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        scrollDelay: 50,
        staggerDelay: 0.1
    },

    // Responsive breakpoints
    breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        wide: 1440
    },

    // Theme colors
    theme: {
        dark: {
            primary: '#D20A2E',
            secondary: '#FF4500',
            accent: '#FF6B6B',
            background: '#0a0a0a',
            surface: '#121212'
        },
        light: {
            primary: '#D20A2E',
            secondary: '#FF4500',
            accent: '#FF6B6B',
            background: '#f5f5f5',
            surface: '#ffffff'
        }
    },

    // Carousel settings
    carousel: {
        autoPlayInterval: 4000,
        pauseOnHover: true,
        enableSwipe: true,
        minSwipeDistance: 50
    },

    // Performance settings
    performance: {
        lazyLoading: true,
        enableGPUAcceleration: true,
        debounceDelay: 250,
        cacheTheme: true,
        cacheLanguage: true
    },

    // Accessibility
    accessibility: {
        enableKeyboardNav: true,
        enableAriaLabels: true,
        focusOutlineWidth: 2,
        minTouchTarget: 44
    },

    // Social links
    social: {
        github: 'https://github.com/klaivertt',
        linkedin: 'https://www.linkedin.com/in/alexandre-bosio-57286b319',
        email: 'alexxandre.bosio@gmail.com'
    },

    // Metadata
    author: 'Bosio Alexandre',
    createdYear: 2023,
    currentYear: new Date().getFullYear()
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioConfig;
}
