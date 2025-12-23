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
            } else {
                indicator.classList.remove('active');
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
        
        // Auto-play (optional - disabled by default)
        // this.startAutoPlay();
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
    
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);
        
        // Pause on hover
        this.wrapper.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });
        
        this.wrapper.addEventListener('mouseleave', () => {
            this.startAutoPlay(interval);
        });
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
    if (window.location.hash) {
        const projectId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToProject(projectId);
        }, 500);
    }
});
