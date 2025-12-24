// ===============================
// CAROUSEL FUNCTIONALITY
// ===============================
class Carousel {
    constructor(carouselId) {
        this.carousel = document.getElementById(carouselId);
        if (!this.carousel) return;
        
        this.wrapper = this.carousel.closest('.carousel-container');
        this.images = this.carousel.querySelectorAll('img');
        this.currentIndex = 0;
        this.totalImages = this.images.length;
        this.autoPlayInterval = null;
        this.isAutoPlaying = false;
        
        // Get buttons
        this.prevBtn = this.wrapper.querySelector('.carousel-btn.prev');
        this.nextBtn = this.wrapper.querySelector('.carousel-btn.next');
        
        // Create indicators
        this.createIndicators();
        
        // Initialize
        this.init();
    }
    
    createIndicators() {
        const indicatorsContainer = this.wrapper.querySelector('.carousel-indicators');
        if (!indicatorsContainer) return;
        
        for (let i = 0; i < this.totalImages; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        this.indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
    }
    
    updateIndicators() {
        if (!this.indicators) return;
        
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
                indicator.style.animation = 'pulse 0.4s ease';
            } else {
                indicator.classList.remove('active');
                indicator.style.animation = 'none';
            }
        });
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.carousel.style.transform = `translateX(${offset}%)`;
        this.updateIndicators();
    }
    
    init() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Keyboard navigation
        this.wrapper.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/Swipe support
        this.addSwipeSupport();
        
        // Auto-play on hover
        this.wrapper.addEventListener('mouseenter', () => {
            this.startAutoPlay();
        });
        
        this.wrapper.addEventListener('mouseleave', () => {
            this.stopAutoPlay();
        });
    }
    
    addSwipeSupport() {
        let startX = 0;
        let endX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', () => {
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    startAutoPlay(interval = 4000) {
        if (this.isAutoPlaying) return;
        
        this.isAutoPlaying = true;
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.isAutoPlaying = false;
        }
    }
}

// ===============================
// INITIALIZE CAROUSELS
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all carousels
    const carousels = [];
    
    const carouselElements = document.querySelectorAll('.carousel-images');
    carouselElements.forEach(carousel => {
        if (carousel.id) {
            carousels.push(new Carousel(carousel.id));
        }
    });
    
    // Lazy load images in carousels
    const carouselImages = document.querySelectorAll('.carousel-images img[data-src]');
    carouselImages.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        }
    });
    
    // Add scroll animations to project cards
    animateProjectCards();
});

// ===============================
// SCROLL ANIMATIONS
// ===============================
function animateProjectCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const projectCards = document.querySelectorAll('.project-detail-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// ===============================
// SMOOTH SCROLL TO PROJECTS
// ===============================
// Initialize Mobile Menu
// ===============================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle') || 
                            document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuToggle || !navLinks) return;
    
    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close menu when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-toggle')) {
            closeMobileMenu();
        }
    });
    
    // Prevent closing when clicking inside the menu
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Disable body scroll when menu is open
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// ===============================
function scrollToProject(projectId) {
    const project = document.getElementById(projectId);
    if (project) {
        const headerOffset = 100;
        const elementPosition = project.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Check for hash in URL on page load
window.addEventListener('load', () => {
    initMobileMenu();
    
    if (window.location.hash) {
        const projectId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToProject(projectId);
        }, 500);
    }
});
