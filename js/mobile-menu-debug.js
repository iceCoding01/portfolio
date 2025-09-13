// Mobile Menu Debug Script

// Define global functions first, outside of any event handlers
window.openMobileMenuManually = function() {
    console.log('Opening mobile menu manually');
    const mobileMenuOverlay = document.querySelector('#mobile-menu-overlay');
    const mobileMenu = document.querySelector('#mobile-menu');
    const menuIcon = document.querySelector('#menu-icon');
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.add('active');
        mobileMenuOverlay.style.opacity = '1';
        mobileMenuOverlay.style.visibility = 'visible';
        mobileMenuOverlay.style.zIndex = '99999';
    }
    
    if (mobileMenu) {
        mobileMenu.classList.add('active');
        mobileMenu.style.transform = 'translateX(0)';
        mobileMenu.style.zIndex = '100000';
    }
    
    if (menuIcon) {
        menuIcon.classList.add('active');
    }
    
    document.body.style.overflow = 'hidden';
};

window.closeMobileMenuManually = function() {
    console.log('Closing mobile menu manually');
    console.debug('CLOSE BUTTON CLICKED - EXECUTING CLOSE FUNCTION');
    
    const mobileMenuOverlay = document.querySelector('#mobile-menu-overlay');
    const mobileMenu = document.querySelector('#mobile-menu');
    const menuIcon = document.querySelector('#menu-icon');
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuOverlay.style.opacity = '0';
        mobileMenuOverlay.style.visibility = 'hidden';
    }
    
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenu.style.transform = 'translateX(100%)';
    }
    
    if (menuIcon) {
        menuIcon.classList.remove('active');
    }
    
    document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu debug script loaded');
    
    // Check if mobile menu elements exist
    const menuIcon = document.querySelector('#menu-icon');
    const mobileMenuOverlay = document.querySelector('#mobile-menu-overlay');
    const mobileMenu = document.querySelector('#mobile-menu');
    const mobileMenuClose = document.querySelector('#mobile-menu-close');
    
    console.log('Menu Icon:', menuIcon);
    console.log('Mobile Menu Overlay:', mobileMenuOverlay);
    console.log('Mobile Menu:', mobileMenu);
    console.log('Mobile Menu Close Button:', mobileMenuClose);
    
    // Add additional click handler to menu icon
    if (menuIcon) {
        // First, remove any existing click handlers
        const oldMenuIcon = menuIcon;
        const newMenuIcon = oldMenuIcon.cloneNode(true);
        oldMenuIcon.parentNode.replaceChild(newMenuIcon, oldMenuIcon);
        
        // Reassign the variable to the new element
        menuIcon = document.querySelector('#menu-icon');
        
        // Add the event listener
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu icon clicked (debug)');
            
            // Call the global function to open the menu
            openMobileMenuManually();
        });
    }
    
    // Add click handler to close button
    if (mobileMenuClose) {
        console.log('Adding click handler to close button (debug)');
        
        // Remove any existing event listeners (just in case)
        const oldElement = mobileMenuClose;
        const newElement = oldElement.cloneNode(true);
        oldElement.parentNode.replaceChild(newElement, oldElement);
        
        // Reassign the variable to the new element
        mobileMenuClose = document.querySelector('#mobile-menu-close');
        
        // Add event listener to the new element
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked (debug)');
            console.log('Close button event target:', e.target);
            closeMobileMenuManually();
        });
        
        // Also add event listener to the icon inside the button
        const closeIcon = mobileMenuClose.querySelector('i');
        if (closeIcon) {
            closeIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close icon clicked (debug)');
                closeMobileMenuManually();
            });
        }
    } else {
        console.error('Mobile menu close button not found');
    }
    
    // Check for style conflicts
    if (mobileMenuOverlay) {
        const overlayStyles = window.getComputedStyle(mobileMenuOverlay);
        console.log('Mobile Menu Overlay computed styles:', {
            display: overlayStyles.display,
            opacity: overlayStyles.opacity,
            visibility: overlayStyles.visibility,
            zIndex: overlayStyles.zIndex
        });
    }
    
    if (mobileMenu) {
        const menuStyles = window.getComputedStyle(mobileMenu);
        console.log('Mobile Menu computed styles:', {
            display: menuStyles.display,
            transform: menuStyles.transform,
            zIndex: menuStyles.zIndex
        });
    }
    
    // Add event listener to the emergency close button
    const emergencyCloseBtn = document.getElementById('emergency-close-btn');
    if (emergencyCloseBtn) {
        console.log('Adding click handler to emergency close button (debug)');
        emergencyCloseBtn.addEventListener('click', function() {
            console.log('Emergency close button clicked (debug)');
            closeMobileMenuManually();
        });
    }
    
    // Also add click handler to overlay for closing
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                console.log('Overlay clicked (debug)');
                closeMobileMenuManually();
            }
        });
    }
    
    console.log('Debug functions available: openMobileMenuManually(), closeMobileMenuManually()');
});