// Enhanced Premium Navbar Functionality
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
});

// Initialize navbar functionality
function initializeNavbar() {
    // Ensure all elements exist
    if (!menuIcon || !navbar || !header) {
        console.warn('Navbar elements not found, retrying...');
        setTimeout(initializeNavbar, 100);
        return;
    }
    
    // Handle responsive navbar display
    handleNavbarResponsive();
    
    // Add resize listener
    window.addEventListener('resize', debounce(handleNavbarResponsive, 250));
}

// Handle navbar responsive behavior
function handleNavbarResponsive() {
    const screenWidth = window.innerWidth;
    
    // Don't interfere if mobile menu is currently active
    if (screenWidth < 1025 && navbar.classList.contains('active')) {
        console.log('Skipping responsive handling - mobile menu is active');
        return;
    }
    
    // Reset any inline styles that might interfere
    navbar.style.display = '';
    
    // Handle different screen sizes
    if (screenWidth >= 1025) {
        // Desktop: ensure navbar is visible and menu is closed
        navbar.classList.remove('active');
        menuIcon.classList.remove('active');
        document.body.style.overflow = '';
        
        // Show/hide nav text based on screen size
        const navLinks = document.querySelectorAll('.nav-link span');
        if (screenWidth >= 1301) {
            navLinks.forEach(span => span.style.display = 'inline');
        } else if (screenWidth >= 1025 && screenWidth <= 1300) {
            navLinks.forEach(span => span.style.display = 'none');
        }
    } else {
        // Mobile/Tablet: ensure nav text is visible in mobile menu
        const navLinks = document.querySelectorAll('.nav-link span');
        navLinks.forEach(span => span.style.display = 'inline');
    }
}

// Debounce function for performance
function debounce(func, wait) {
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

// Enhanced menu toggle with smooth animations
if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        console.log('Menu icon clicked, current screen width:', window.innerWidth);
        console.log('Navbar before toggle:', {
            classList: navbar.classList.toString(),
            style: navbar.style.cssText,
            display: getComputedStyle(navbar).display,
            visibility: getComputedStyle(navbar).visibility,
            opacity: getComputedStyle(navbar).opacity
        });
        
        menuIcon.classList.toggle('active');
        navbar.classList.toggle('active');
        
        console.log('Navbar after toggle:', {
            classList: navbar.classList.toString(),
            hasActive: navbar.classList.contains('active')
        });
        
        // Add backdrop blur effect when mobile menu is open
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            header.style.borderBottom = '2px solid rgba(255, 255, 255, 0.3)';
            
            // Force show navbar on mobile when active with maximum z-index
            if (window.innerWidth < 1025) {
                navbar.style.opacity = '1';
                navbar.style.visibility = 'visible';
                navbar.style.transform = 'translateY(0) scale(1)';
                navbar.style.display = 'flex';
                navbar.style.zIndex = '99999';
                navbar.style.position = 'absolute';
                console.log('Force showing mobile navbar with z-index 99999');
            }
        } else {
            document.body.style.overflow = '';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
            
            // Reset z-index when closed
            if (window.innerWidth < 1025) {
                navbar.style.zIndex = '';
            }
        }
    };
}

// Enhanced smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            menuIcon.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Enhanced scroll detection with improved performance
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.nav-link');
let lastScrollTop = 0;
let scrollTimeout;

// Add debug information
console.log('Navbar elements found:', {
    header: !!header,
    navbar: !!navbar,
    menuIcon: !!menuIcon,
    navLinksCount: navLinks.length,
    sectionsCount: sections.length
});

window.addEventListener('scroll', () => {
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Debounce scroll events for better performance
    scrollTimeout = setTimeout(() => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Enhanced sticky header with dynamic blur effect
        if (scrollTop > 50) {
            header.classList.add('sticky');
            header.style.backdropFilter = 'blur(25px) saturate(180%)';
        } else {
            header.classList.remove('sticky');
            header.style.backdropFilter = 'blur(20px) saturate(160%)';
        }
        
        // Enhanced active section detection
        sections.forEach(sec => {
            let top = scrollTop;
            let offset = sec.offsetTop - 200;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.nav-link[href*="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });

        // Auto-close mobile menu on scroll
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        lastScrollTop = scrollTop;
    }, 10);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Enhanced navbar link hover effects
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (!link.classList.contains('active')) {
            link.style.transform = 'translateY(-2px) scale(1.02)';
        }
    });
    
    link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('active')) {
            link.style.transform = '';
        }
    });
});

// Force navbar visibility on page load
window.addEventListener('load', () => {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    
    if (navbar && window.innerWidth >= 1025) {
        // Force navbar to be visible on desktop
        navbar.style.display = 'flex';
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
        navbar.classList.remove('active');
        
        // Ensure header is properly styled
        header.style.display = 'block';
        header.style.visibility = 'visible';
    }
    
    // Reinitialize after a short delay to ensure everything is loaded
    setTimeout(() => {
        handleNavbarResponsive();
    }, 500);
});

// Add intersection observer for enhanced scroll animations
const sectionObserverOptions = {
    threshold: 0.1,
    rootMargin: '-50px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-link[href*="${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, sectionObserverOptions);

sections.forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease-out forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Working contact form
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Form validation
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with actual form handling)
        await simulateFormSubmission(formData);
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission (replace with actual implementation)
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-x-circle' : 'bx-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="bx bx-x"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        display: flex;
        align-items: center;
    }
`;
document.head.appendChild(style);

// Enhanced scroll reveal
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.hero-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.hero-image, .services-container, .portfolio-box, .contact-form', { origin: 'bottom' });
ScrollReveal().reveal('.about-content, .testimonial-card', { origin: 'left' });
ScrollReveal().reveal('.about-img, .contact-info', { origin: 'right' });

// Typed.js for hero subtitle (optional enhancement)
const typed = new Typed('.hero-subtitle', {
    strings: [
        "Software Engineer & Full-Stack Developer",
        "Problem Solver & Innovation Enthusiast",
        "Passionate About Clean Code & User Experience"
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: false
});

// Smooth scroll to top
document.querySelector('.back-to-top').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero scroll indicator functionality
document.querySelector('.hero-scroll-indicator').addEventListener('click', (e) => {
    e.preventDefault();
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Intersection Observer for animations
const animationObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, animationObserverOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .testimonial-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Navbar display fix - run multiple times to ensure it works
function forceNavbarDisplay() {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    const headerContainer = document.querySelector('.header-container');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Only apply desktop fixes on desktop screens
    if (window.innerWidth >= 1025) {
        if (navbar) {
            navbar.style.cssText = `
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: static !important;
                transform: none !important;
                top: auto !important;
                left: auto !important;
                right: auto !important;
                width: auto !important;
                max-width: none !important;
                background: rgba(255, 255, 255, 0.08) !important;
                backdrop-filter: blur(20px) !important;
                border: 1px solid rgba(255, 255, 255, 0.15) !important;
                border-radius: 2rem !important;
                padding: 0.4rem 0.6rem !important;
                gap: 0.2rem !important;
                flex-shrink: 1 !important;
                overflow: visible !important;
                margin: 0 !important;
                z-index: auto !important;
            `;
            navbar.classList.remove('active');
        }
        
        if (headerContainer) {
            headerContainer.style.cssText = `
                overflow: visible !important;
                width: 100% !important;
                max-width: 1800px !important;
                box-sizing: border-box !important;
                padding: 1.5rem 2vw !important;
            `;
        }
        
        if (menuToggle) {
            menuToggle.style.display = 'none !important';
        }
        
        // Handle nav links based on screen size
        const navLinks = document.querySelectorAll('.nav-link');
        const screenWidth = window.innerWidth;
        
        navLinks.forEach(link => {
            if (screenWidth >= 1301) {
                // Show text on larger screens
                const span = link.querySelector('span');
                if (span) span.style.display = 'inline';
                link.style.cssText = `
                    padding: 0.8rem 1.2rem !important;
                    gap: 0.5rem !important;
                    font-size: 1.2rem !important;
                `;
            } else if (screenWidth >= 1025 && screenWidth <= 1300) {
                // Hide text on compact screens
                const span = link.querySelector('span');
                if (span) span.style.display = 'none';
                link.style.cssText = `
                    padding: 0.8rem !important;
                    gap: 0 !important;
                    font-size: 1.1rem !important;
                    justify-content: center !important;
                `;
            }
        });
    } else {
        // On mobile/tablet, reset any desktop-specific styles that might interfere
        if (navbar) {
            navbar.style.cssText = '';
        }
        if (headerContainer) {
            headerContainer.style.cssText = '';
        }
        if (menuToggle) {
            menuToggle.style.display = '';
        }
        
        // Reset nav links to use CSS defaults
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.style.cssText = '';
            const span = link.querySelector('span');
            if (span) span.style.display = '';
        });
    }
}

// Run navbar fix on page load and after short delays - only on desktop
setTimeout(() => {
    if (window.innerWidth >= 1025) {
        forceNavbarDisplay();
    }
}, 100);

setTimeout(() => {
    if (window.innerWidth >= 1025) {
        forceNavbarDisplay();
    }
}, 500);

setTimeout(() => {
    if (window.innerWidth >= 1025) {
        forceNavbarDisplay();
    }
}, 1000);

// Also run on window resize
window.addEventListener('resize', () => {
    setTimeout(() => {
        forceNavbarDisplay();
    }, 100);
});