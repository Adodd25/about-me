// ========================================
// Navigation Scroll Effect
// ========================================
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
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

// ========================================
// Animated Counter for Stats
// ========================================
const animateCounter = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Scroll reveal animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Add reveal class to sections and elements
const revealElements = document.querySelectorAll(
    '.section-header, .timeline-item, .impact-card, .expertise-card, .education-card, .community-card'
);

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ========================================
// Timeline Animation
// ========================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    timelineObserver.observe(item);
});

// ========================================
// Parallax Effect for Orbs
// ========================================
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Mouse Follow Effect for Hero
// ========================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && window.innerWidth > 768) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 50;
        const y = (e.clientY - rect.top - rect.height / 2) / 50;

        heroContent.style.transform = `translate(${x}px, ${y}px)`;
    });

    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'translate(0, 0)';
        heroContent.style.transition = 'transform 0.5s ease';
    });

    hero.addEventListener('mouseenter', () => {
        heroContent.style.transition = 'transform 0.1s ease';
    });
}

// ========================================
// Card Hover Effects
// ========================================
const cards = document.querySelectorAll('.impact-card, .expertise-card, .education-card, .community-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transition = 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    });
});

// ========================================
// Active Navigation Link
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Page Load Animation
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// Typing Effect for Hero (Optional Enhancement)
// ========================================
const createTypingEffect = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
};

// ========================================
// Scroll Progress Indicator
// ========================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });
};

createScrollProgress();

// ========================================
// Disable animations for reduced motion preference
// ========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');

    document.querySelectorAll('.animate-in').forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

console.log('Portfolio loaded successfully.');
