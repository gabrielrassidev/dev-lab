// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for Anchor Links (Updated)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active Navigation Link (Updated)
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname;

    // First, set active based on current page
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');

        // Check if current page matches the link
        if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '') {
            if (linkPath === 'index.html' || linkPath === '/') {
                link.classList.add('active');
            }
        } else if (currentPage.includes('case-studies.html') && linkPath === 'case-studies.html') {
            link.classList.add('active');
        } else if (currentPage.includes('about.html') && linkPath === 'about.html') {
            link.classList.add('active');
        } else if (currentPage.includes('contact.html') && linkPath === 'contact.html') {
            link.classList.add('active');
        }
    });

    // Then update based on scroll position for single page sections
    if (sections.length > 0) {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${current}`) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }
    }
}

// Call on page load and scroll
document.addEventListener('DOMContentLoaded', updateActiveNavLink);
window.addEventListener('scroll', updateActiveNavLink);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-card, .case-card, .tech-category');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// WhatsApp Float Button Animation
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.querySelector('.whatsapp-float');

    if (whatsappFloat) {
        // Add hover effect
        whatsappFloat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        whatsappFloat.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Show/hide based on scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 300) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.visibility = 'visible';
            } else {
                whatsappFloat.style.opacity = '0.7';
            }

            if (scrollTop > lastScrollTop && scrollTop > 500) {
                // Scrolling down
                whatsappFloat.style.transform = 'translateY(100px)';
            } else {
                // Scrolling up
                whatsappFloat.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        });
    }
});

// Form Validation (for contact page)
function validateForm(form) {
    const email = form.querySelector('input[type="email"]');
    const name = form.querySelector('input[name="name"]');
    const message = form.querySelector('textarea');

    let isValid = true;

    // Reset previous errors
    form.querySelectorAll('.error').forEach(error => error.remove());

    // Email validation
    if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Name validation
    if (name && name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    }

    // Message validation
    if (message && message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#ef4444';
}

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', function() {
    // Defer non-critical CSS
    const nonCriticalCSS = document.querySelectorAll('link[rel="preload"][as="style"]');
    nonCriticalCSS.forEach(link => {
        link.addEventListener('load', function() {
            this.rel = 'stylesheet';
        });
    });
});

// Analytics Event Tracking (placeholder for GA4/Analytics)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);

    // Example for GA4:
    // gtag('event', eventName, properties);

    // Example for custom analytics:
    // analytics.track(eventName, properties);
}

// Track important interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track CTA clicks
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('CTA_Click', {
                button_text: this.textContent.trim(),
                page: window.location.pathname
            });
        });
    });

    // Track case study views
    document.querySelectorAll('.case-link').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Case_Study_Click', {
                case_study: this.href,
                page: window.location.pathname
            });
        });
    });

    // Track WhatsApp clicks
    document.querySelector('.whatsapp-float')?.addEventListener('click', function() {
        trackEvent('WhatsApp_Click', {
            page: window.location.pathname
        });
    });
});

// Keyboard Navigation Improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Skip to main content link
    const skipLink = document.querySelector('.skip-to-main');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const main = document.querySelector('main') || document.querySelector('.hero');
            if (main) {
                main.focus();
                main.scrollIntoView();
            }
        });
    }

    // Focus visible for keyboard users
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-user');
    });
});


