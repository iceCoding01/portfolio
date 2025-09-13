// Enhanced Mobile Navigation Functionality

// Initialize mobile navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
});

function initMobileNavigation() {
    // Get all mobile navigation elements
    const menuToggle = document.getElementById('menu-icon');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinksContainer = document.querySelector('.mobile-nav-links');
    const mobileMenuFooter = document.querySelector('.mobile-menu-footer');
    
    // Check if elements exist
    if (!menuToggle || !mobileMenuOverlay || !mobileMenu) {
        console.error('Mobile navigation elements not found');
        return;
    }
    
    // Open mobile menu function
    function openMobileMenu() {
        menuToggle.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation classes
        setTimeout(() => {
            navLinksContainer.classList.add('animate');
            mobileMenuFooter.classList.add('animate');
        }, 300);
        
        // Haptic feedback for modern browsers
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    }
    
    // Close mobile menu function
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove animation classes
        navLinksContainer.classList.remove('animate');
        mobileMenuFooter.classList.remove('animate');
        
        // Haptic feedback for modern browsers
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(30);
        }
    }
    
    // Toggle menu on menu icon click
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu on close button click
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
    }
    
    // Close menu on overlay click
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle mobile navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID
            const targetId = this.getAttribute('href');
            
            // Update active state for all mobile links
            mobileNavLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu with slight delay for better UX
            setTimeout(() => {
                closeMobileMenu();
                
                // Scroll to target section after menu closes
                setTimeout(() => {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 400);
            }, 150);
        });
    });
    
    // Update active section on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update mobile navigation
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttle scroll event for better performance
    let scrollThrottleTimer;
    window.addEventListener('scroll', function() {
        if (!scrollThrottleTimer) {
            scrollThrottleTimer = setTimeout(() => {
                updateActiveSection();
                scrollThrottleTimer = null;
            }, 100);
        }
    });
    
    // Update active section on page load
    updateActiveSection();
}