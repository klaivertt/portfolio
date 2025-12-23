// ===============================
// TRANSLATIONS
// ===============================
const translations = {
    en: {
        'nav-home': '#Home',
        'nav-works': '#Works',
        'nav-about': '#About Me',
        'nav-contacts': '#Contacts',
        'hero-badge': '👋 Welcome to my portfolio',
        'hero-greeting': "Hi, I'm Alexandre, a",
        'hero-title': 'Games Developer',
        'hero-subtitle': 'My hobby is creating games, and I love learning new technologies.',
        'hero-subtitle2': 'Currently working on my portfolio.',
        'hero-btn-projects': 'View Projects',
        'hero-btn-contact': 'Contact Me',
        'quote-text': 'Any sufficiently advanced technology is indistinguishable from magic.',
        'quote-author': '- Arthur C. Clarke',
        'projects-title': 'My Projects',
        'projects-subtitle': 'Explore my creative works',
        'project1-title': 'Lost In Time',
        'project1-desc': 'Manipulate time to solve puzzles and save your brother from the mysteries of the past.',
        'project2-title': 'The Scarlet Night',
        'project2-desc': 'The Scarlet Night is an RPG that puts you in the shoes of a hunter who has come to stop a curse. Explore the great city of Northbrook and its surroundings.',
        'project3-title': 'Fall',
        'project3-desc': 'My first game jam project, later improved.',
        'explore-btn': 'Explore →',
        'see-more': 'See More →',
        'about-title': 'About Me',
        'about-subtitle': 'Get to know me',
        'about-who': 'Who Am I?',
        'about-p1': 'Hello, my name is Alexandre! I am a video game developer currently studying at Créajeux, a specialized school based in Nîmes, France. I have the skills to create video games from scratch, using the frameworks I master to deliver engaging and interactive experiences.',
        'about-p2': 'My passion for video games has been with me since childhood. In 2017, I began exploring video game programming, and that\'s when I realized I wanted to make it my career. For over a year now, I\'ve been seriously learning how to code and develop video games.',
        'about-p3': 'Driven by curiosity and determination, I constantly strive to learn new technologies and become versatile with the frameworks I work with.',
        'stat-years': 'Years of Passion',
        'stat-projects': 'Projects',
        'stat-tech': 'Technologies',
        'skills-title': 'Skills',
        'skills-languages': 'Languages',
        'skills-tools': 'Tools',
        'skills-databases': 'Databases',
        'skills-frameworks': 'Frameworks',
        'contact-title': 'Contact',
        'contact-subtitle': "Let's work together",
        'contact-desc': 'Feel free to reach out to discuss projects or collaborations!',
    },
    fr: {
        'nav-home': '#Accueil',
        'nav-works': '#Projets',
        'nav-about': '#À Propos',
        'nav-contacts': '#Contact',
        'hero-badge': '👋 Bienvenue sur mon portfolio',
        'hero-greeting': "Salut, je suis Alexandre, un",
        'hero-title': 'Développeur de Jeux',
        'hero-subtitle': 'Ma passion est de créer des jeux, et j\'adore apprendre de nouvelles technologies.',
        'hero-subtitle2': 'Actuellement en train de travailler sur mon portfolio.',
        'hero-btn-projects': 'Voir les Projets',
        'hero-btn-contact': 'Me Contacter',
        'quote-text': 'Toute technologie suffisamment avancée est indiscernable de la magie.',
        'quote-author': '- Arthur C. Clarke',
        'projects-title': 'Mes Projets',
        'projects-subtitle': 'Découvrez mes créations',
        'project1-title': 'Lost In Time',
        'project1-desc': 'Manipulez le temps pour résoudre des énigmes et sauver votre frère des mystères du passé.',
        'project2-title': 'The Scarlet Night',
        'project2-desc': 'The Scarlet Night est un RPG qui vous met dans la peau d\'un chasseur venu mettre fin à une malédiction. Explorez la grande ville de Northbrook et ses environs.',
        'project3-title': 'Fall',
        'project3-desc': 'Mon premier projet de game jam, amélioré par la suite.',
        'explore-btn': 'Explorer →',
        'see-more': 'Voir Plus →',
        'about-title': 'À Propos',
        'about-subtitle': 'Apprenez à me connaître',
        'about-who': 'Qui suis-je ?',
        'about-p1': 'Bonjour, je m\'appelle Alexandre ! Je suis développeur de jeux vidéo et j\'étudie actuellement à Créajeux, une école spécialisée basée à Nîmes, en France. J\'ai les compétences pour créer des jeux vidéo de A à Z, en utilisant les frameworks que je maîtrise pour offrir des expériences captivantes et interactives.',
        'about-p2': 'Ma passion pour les jeux vidéo m\'accompagne depuis l\'enfance. En 2017, j\'ai commencé à explorer la programmation de jeux vidéo, et c\'est à ce moment-là que j\'ai réalisé que je voulais en faire mon métier. Depuis plus d\'un an maintenant, j\'apprends sérieusement à coder et à développer des jeux vidéo.',
        'about-p3': 'Animé par la curiosité et la détermination, je m\'efforce constamment d\'apprendre de nouvelles technologies et de devenir polyvalent avec les frameworks que j\'utilise.',
        'stat-years': 'Années de Passion',
        'stat-projects': 'Projets',
        'stat-tech': 'Technologies',
        'skills-title': 'Compétences',
        'skills-languages': 'Langages',
        'skills-tools': 'Outils',
        'skills-databases': 'Bases de données',
        'skills-frameworks': 'Frameworks',
        'contact-title': 'Contact',
        'contact-subtitle': 'Travaillons ensemble',
        'contact-desc': 'N\'hésitez pas à me contacter pour discuter de projets ou de collaborations !',
    }
};

// ===============================
// VARIABLES GLOBALES
// ===============================
let currentLang = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Apply theme and language
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    
    // Load images
    loadAllImages();
    
    // Initialize features
    initThemeToggle();
    initLanguageToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initParticles();
    
    // Typing effect
    setTimeout(initTypingEffect, 300);
});

// ===============================
// THEME MANAGEMENT
// ===============================
function applyTheme(theme) {
    console.log('Applying theme:', theme);
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
        console.log('Theme changed to:', currentTheme);
    });
}

// ===============================
// LANGUAGE MANAGEMENT
// ===============================
function applyLanguage(lang) {
    console.log('Applying language:', lang);
    currentLang = lang;
    
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function(element) {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update language toggle button
    updateLanguageToggle();
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

function updateLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    const flag = langToggle.querySelector('.lang-flag');
    const code = langToggle.querySelector('.lang-code');
    
    if (flag && code) {
        if (currentLang === 'en') {
            flag.textContent = '🇬🇧';
            if (code) code.textContent = 'EN';
        } else {
            flag.textContent = '🇫🇷';
            if (code) code.textContent = 'FR';
        }
    }
}

function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'fr' : 'en';
        applyLanguage(currentLang);
        localStorage.setItem('language', currentLang);
        console.log('Language changed to:', currentLang);
    });
}

// ===============================
// IMAGE LOADING
// ===============================
function loadAllImages() {
    console.log('Loading images...');
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(function(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
    });
}

// ===============================
// MOBILE MENU
// ===============================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuToggle || !navLinks) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ===============================
// SMOOTH SCROLL
// ===============================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===============================
// SCROLL ANIMATIONS
// ===============================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos
    document.querySelectorAll('[data-aos]').forEach(function(el) {
        observer.observe(el);
    });
}

// ===============================
// PARTICLES
// ===============================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(210, 10, 46, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
}

// ===============================
// TYPING EFFECT
// ===============================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    const originalText = text;
    
    // Only animate if element has actual content
    if (!text || text.trim().length === 0) return;
    
    typingElement.textContent = '';
    typingElement.style.borderRight = '3px solid var(--primary-color)';
    
    let index = 0;
    const speed = 80;
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===============================
// HEADER EFFECTS
// ===============================
let lastScrollPosition = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 100) {
        header.style.boxShadow = '0 4px 30px var(--shadow-color)';
        header.style.background = 'var(--background-tertiary)';
    } else {
        header.style.boxShadow = '0 2px 20px var(--shadow-color)';
    }
    
    lastScrollPosition = currentScrollPosition;
});

// ===============================
// CONSOLE MESSAGE
// ===============================
console.log('%c👋 Hello Developer!', 'color: #D20A2E; font-size: 20px; font-weight: bold;');
console.log('%cLooking to hire? Contact me at alexxandre.bosio@gmail.com', 'color: #FF4500; font-size: 14px;');
