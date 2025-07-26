// Enhanced Premium Navbar Functionality
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header');

// Premium Mobile Menu Elements
let mobileMenuOverlay = document.querySelector('#mobile-menu-overlay');
let mobileMenu = document.querySelector('#mobile-menu');
let mobileMenuClose = document.querySelector('#mobile-menu-close');
let mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
    initializeMobileMenu();
    initializeDropdownMenus();
});

// Initialize dropdown menu functionality
function initializeDropdownMenus() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    console.log('Initializing dropdowns:', dropdowns.length);
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const menu = dropdown.querySelector('.nav-dropdown-menu');
        const items = dropdown.querySelectorAll('.nav-dropdown-item');

        // Handle dropdown toggle clicks (for touch devices)
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Dropdown clicked');
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });        // Handle dropdown item clicks
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = item.getAttribute('href');
                
                // Update active states for dropdown toggle
                dropdowns.forEach(d => d.classList.remove('active'));
                const targetDropdown = findDropdownForSection(targetSection);
                if (targetDropdown) {
                    targetDropdown.querySelector('.nav-dropdown-toggle').classList.add('active');
                }
                
                // Update regular nav links
                const navLinks = document.querySelectorAll('.nav-link:not(.nav-dropdown-toggle)');
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active to matching regular nav link if exists
                const matchingNavLink = document.querySelector(`.nav-link[href="${targetSection}"]:not(.nav-dropdown-toggle)`);
                if (matchingNavLink) {
                    matchingNavLink.classList.add('active');
                }
                
                // Smooth scroll to section
                scrollToSection(targetSection);
                
                // Close dropdown after click
                dropdown.classList.remove('active');
            });
        });
        
        // Handle hover for desktop
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 1025) {
                console.log('Dropdown hover enter', dropdown);
                dropdown.classList.add('active');
                // Force show the menu
                const menu = dropdown.querySelector('.nav-dropdown-menu');
                if (menu) {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.pointerEvents = 'auto';
                }
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 1025) {
                console.log('Dropdown hover leave', dropdown);
                dropdown.classList.remove('active');
                // Reset menu styles
                const menu = dropdown.querySelector('.nav-dropdown-menu');
                if (menu) {
                    menu.style.opacity = '';
                    menu.style.visibility = '';
                    menu.style.pointerEvents = '';
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Helper function to find which dropdown contains a section
function findDropdownForSection(sectionHref) {
    const dropdownItems = document.querySelectorAll('.nav-dropdown-item');
    for (let item of dropdownItems) {
        if (item.getAttribute('href') === sectionHref) {
            return item.closest('.nav-dropdown');
        }
    }
    return null;
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    // Ensure mobile menu elements exist
    if (!mobileMenuOverlay || !mobileMenu || !menuIcon) {
        console.warn('Mobile menu elements not found, retrying...');
        setTimeout(initializeMobileMenu, 100);
        return;
    }

    // Mobile menu toggle functionality
    menuIcon.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    // Mobile navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('href');
            
            // Update active state
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu
            closeMobileMenu();
            
            // Smooth scroll to section
            setTimeout(() => {
                scrollToSection(targetSection);
            }, 300);
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Open mobile menu
function openMobileMenu() {
    console.log('Opening mobile menu');
    mobileMenuOverlay.classList.add('active');
    menuIcon.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset animations
    mobileNavLinks.forEach((link, index) => {
        link.style.animation = 'none';
        setTimeout(() => {
            link.style.animation = `mobileNavSlideIn 0.6s ease-out forwards`;
            link.style.animationDelay = `${0.1 + (index * 0.05)}s`;
        }, 50);
    });
}

// Close mobile menu
function closeMobileMenu() {
    console.log('Closing mobile menu');
    mobileMenuOverlay.classList.remove('active');
    menuIcon.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scroll to section
function scrollToSection(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

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
    
    if (screenWidth >= 1025) {
        // Desktop: ensure navbar is visible and menu is closed
        navbar.classList.remove('active');
        menuIcon.classList.remove('active');
        document.body.style.overflow = '';
        
        // Let CSS handle all responsive styling
        // No inline styles needed - CSS breakpoints handle everything
    } else {
        // Mobile/Tablet: let mobile menu handle navigation
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

// Enhanced menu toggle with smooth animations (Legacy - now using premium mobile menu)
// The new mobile menu functionality is handled in initializeMobileMenu()
// This section is kept for desktop navbar functionality only

// Enhanced smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip if this is a mobile nav link (handled separately)
        if (this.classList.contains('mobile-nav-link')) {
            return;
        }
        
        e.preventDefault();
        const targetSelector = this.getAttribute('href');
        scrollToSection(targetSelector);
        
        // Update desktop navbar active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeDesktopLink = document.querySelector(`.nav-link[href="${targetSelector}"]`);
        if (activeDesktopLink) {
            activeDesktopLink.classList.add('active');
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
                // Update desktop navbar - handle both regular links and dropdown items
                const navLinks = document.querySelectorAll('.nav-link:not(.nav-dropdown-toggle)');
                const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
                const dropdownItems = document.querySelectorAll('.nav-dropdown-item');
                
                // Remove active from all elements
                navLinks.forEach(link => link.classList.remove('active'));
                dropdownToggles.forEach(toggle => toggle.classList.remove('active'));
                dropdownItems.forEach(item => item.classList.remove('active'));
                
                // Check if this section matches a regular nav link
                const activeRegularLink = document.querySelector(`.nav-link[href*="${id}"]:not(.nav-dropdown-toggle)`);
                if (activeRegularLink) {
                    activeRegularLink.classList.add('active');
                } else {
                    // Check if this section is in a dropdown
                    const activeDropdownItem = document.querySelector(`.nav-dropdown-item[href*="${id}"]`);
                    if (activeDropdownItem) {
                        activeDropdownItem.classList.add('active');
                        // Also activate the parent dropdown toggle
                        const parentDropdown = activeDropdownItem.closest('.nav-dropdown');
                        if (parentDropdown) {
                            const dropdownToggle = parentDropdown.querySelector('.nav-dropdown-toggle');
                            if (dropdownToggle) {
                                dropdownToggle.classList.add('active');
                            }
                        }
                    }
                }
                
                // Update mobile navbar
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const activeMobileLink = document.querySelector(`.mobile-nav-link[href*="${id}"]`);
                if (activeMobileLink) {
                    activeMobileLink.classList.add('active');
                }
            }
        });

        // Auto-close mobile menu on scroll
        if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
        
        lastScrollTop = scrollTop;
    }, 10);
});

// Close mobile menu when clicking outside (handled in initializeMobileMenu)
// Desktop navbar doesn't need outside click handling

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
            
            // Update desktop navbar
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeDesktopLink = document.querySelector(`.nav-link[href*="${id}"]`);
            if (activeDesktopLink) {
                activeDesktopLink.classList.add('active');
            }
            
            // Update mobile navbar
            if (mobileNavLinks.length > 0) {
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const activeMobileLink = document.querySelector(`.mobile-nav-link[href*="${id}"]`);
                if (activeMobileLink) {
                    activeMobileLink.classList.add('active');
                }
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
    // Minimal intervention - only ensure navbar is visible on desktop
    if (window.innerWidth >= 1025 && navbar) {
        // Only remove the 'active' class if it exists (from old mobile menu system)
        navbar.classList.remove('active');
        
        // Let CSS handle all styling - no inline styles
        if (navbar.style.display === 'none') {
            navbar.style.display = 'flex';
        }
        
        // Hide mobile menu toggle on desktop
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.style.display = 'none';
        }
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