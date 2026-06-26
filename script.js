document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initBackToTop();
    initScrollAnimations();
    initTypewriter();
    initContactForm();
    initHeaderScroll();
});

// 1. Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    } else {
        document.documentElement.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.className = 'fas fa-moon';
            showToast('Switched to Light Mode', 'success');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.className = 'fas fa-sun';
            showToast('Switched to Dark Mode', 'success');
        }
    });
}

// 2. Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
}

// 3. Smooth Scrolling with Active Link Highlight
function initSmoothScrolling() {
    const links = document.querySelectorAll('nav a, .footer-links a, .cta-button');
    const sections = document.querySelectorAll('section');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.getElementById(targetId.substring(1));

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Highlight active section in navigation
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 4. Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 5. Scroll Reveal Animations
function initScrollAnimations() {
    // Select elements to reveal
    const elementsToReveal = document.querySelectorAll(
        '.about-text p, .stat, .skill-card, .project, .contact-link, .contact-form, section h2'
    );

    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after showing
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elementsToReveal.forEach(el => {
        observer.observe(el);
    });
}

// 6. Typewriter Effect
function initTypewriter() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    const phrases = [
        "Full Stack Developer",
        "Spring Boot Developer",
        "Java & DSA Student",
        "Problem Solver"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            subtitle.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    subtitle.textContent = "";
    setTimeout(type, 1000);
}

// 7. Contact Form Handler with Validation and Custom Toast
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!name || !email || !message) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        // Disable button & show sending state
        submitBtn.disabled = true;
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Mock message sending
        setTimeout(() => {
            showToast(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }, 1800);
    });
}

// 8. Toast Notification Utility
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    // Add appropriate icon based on type
    const icon = document.createElement('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#10b981';
    } else {
        icon.className = 'fas fa-exclamation-circle';
        icon.style.color = '#ef4444';
    }
    toast.prepend(icon);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// 9. Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scroll-scrolled');
        } else {
            header.classList.remove('scroll-scrolled');
        }
    });
}
