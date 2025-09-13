// Mobile Menu Fix Script
console.log('Mobile Menu Fix script loaded');

// Make sure this script runs after all others
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Menu Fix: DOM fully loaded');
    
    // Get menu elements
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    // Log elements to console
    console.log('Menu Icon:', menuIcon);
    console.log('Mobile Menu Overlay:', mobileMenuOverlay);
    console.log('Mobile Menu:', mobileMenu);
    console.log('Close Button:', mobileMenuClose);
    
    // Define the open menu function
    function openMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log('Opening menu...');
        
        // Make sure overlay and menu are visible
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            mobileMenuOverlay.style.opacity = '1';
            mobileMenuOverlay.style.visibility = 'visible';
            console.log('Mobile Menu Overlay activated');
        }
        
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            mobileMenu.style.transform = 'translateX(0)';
            console.log('Mobile Menu activated');
        }
        
        document.body.style.overflow = 'hidden';
    }
    
    // Define the close menu function
    function closeMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log('Closing menu...');
        
        // Hide overlay and menu
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuOverlay.style.opacity = '0';
            mobileMenuOverlay.style.visibility = 'hidden';
            console.log('Mobile Menu Overlay deactivated');
        }
        
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenu.style.transform = 'translateX(100%)';
            console.log('Mobile Menu deactivated');
        }
        
        document.body.style.overflow = '';
    }
    
    // Add open menu event listener
    if (menuIcon) {
        console.log('Adding click handler to menu icon');
        menuIcon.addEventListener('click', openMenu);
    }
    
    // Add close menu event listeners
    if (mobileMenuClose) {
        console.log('Adding click handler to close button');
        mobileMenuClose.addEventListener('click', closeMenu);
    }
    
    if (mobileMenuOverlay) {
        console.log('Adding click handler to overlay');
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMenu(e);
            }
        });
    }
    
    // Add close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Expose functions globally
    window.openMobileMenu = openMenu;
    window.closeMobileMenu = closeMenu;
    
    console.log('Mobile menu functions initialized');
});