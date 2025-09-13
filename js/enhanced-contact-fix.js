/**
 * Enhanced Contact Section Mobile Fix
 * This script ensures the contact section is properly displayed on mobile devices
 * by applying critical CSS overrides and fixing display issues.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the fix
    enhancedContactFix();
    
    // Continue to monitor and fix on resize and scroll events
    window.addEventListener('resize', enhancedContactFix);
    window.addEventListener('scroll', enhancedContactFix);
    
    // Run the fix after page has fully loaded with all resources
    window.addEventListener('load', function() {
        enhancedContactFix();
        // Run again after short delays to catch any delayed rendering issues
        setTimeout(enhancedContactFix, 500);
        setTimeout(enhancedContactFix, 1500);
        setTimeout(enhancedContactFix, 3000);
    });
    
    // Add special handler for mobile navigation menu closing
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            setTimeout(enhancedContactFix, 400); // Run after menu animation completes
        });
    }
    
    // Handle all mobile nav links to fix contact section when navigating
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(enhancedContactFix, 400); // Run after menu animation completes
        });
    });
});

/**
 * Main function to fix contact section display issues on mobile
 */
function enhancedContactFix() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    
    // Run fixes specifically for mobile devices
    if (window.innerWidth <= 768) {
        // Ensure section is visible with correct z-index
        contactSection.style.display = 'block';
        contactSection.style.visibility = 'visible';
        contactSection.style.opacity = '1';
        contactSection.style.zIndex = '5';
        contactSection.style.position = 'relative';
        
        // Force layout recalculation
        contactSection.offsetHeight;
        
        // Check if section is truly visible
        const computedStyle = window.getComputedStyle(contactSection);
        if (computedStyle.display === 'none' || 
            computedStyle.visibility === 'hidden' || 
            computedStyle.opacity === '0' ||
            parseFloat(computedStyle.opacity) < 0.1) {
            
            console.log('Applying enhanced contact section fixes for mobile');
            
            // Apply aggressive inline styles with !important
            contactSection.setAttribute('style', 
                'display: block !important;' +
                'visibility: visible !important;' +
                'opacity: 1 !important;' +
                'z-index: 50 !important;' +
                'position: relative !important;' +
                'min-height: auto !important;' +
                'overflow: visible !important;' +
                'height: auto !important;' +
                'transform: none !important;' + 
                'clip-path: none !important;' +
                'pointer-events: auto !important;'
            );
            
            // Fix form display
            const contactForm = contactSection.querySelector('.contact-form');
            if (contactForm) {
                contactForm.setAttribute('style',
                    'display: block !important;' +
                    'visibility: visible !important;' +
                    'opacity: 1 !important;' +
                    'z-index: 10 !important;' +
                    'width: 100% !important;' +
                    'max-width: 100% !important;'
                );
            }
            
            // Fix contact info display
            const contactInfo = contactSection.querySelector('.contact-info');
            if (contactInfo) {
                contactInfo.setAttribute('style',
                    'display: block !important;' +
                    'visibility: visible !important;' +
                    'opacity: 1 !important;'
                );
            }
            
            // Ensure section is in the proper place in the document flow
            const footer = document.querySelector('footer');
            if (footer && footer.parentNode) {
                footer.parentNode.insertBefore(contactSection, footer);
            }
            
            // Fix grid layout for contact section
            fixContactGridLayout(contactSection);
        }
        
        // Ensure scrolling to the contact section works
        if (window.location.hash === '#contact') {
            setTimeout(function() {
                contactSection.scrollIntoView({behavior: 'smooth'});
            }, 500);
        }
    }
}

/**
 * Fix grid layout issues in the contact section
 */
function fixContactGridLayout(contactSection) {
    // Fix parent grid container
    const gridContainer = contactSection.querySelector('.grid');
    if (gridContainer) {
        gridContainer.setAttribute('style',
            'display: grid !important;' +
            'grid-template-columns: 1fr !important;' +
            'gap: 2rem !important;'
        );
    }
    
    // Fix form input grid spacing
    const formGrids = contactSection.querySelectorAll('.contact-form .grid');
    formGrids.forEach(grid => {
        grid.setAttribute('style',
            'display: grid !important;' +
            'grid-template-columns: 1fr !important;' +
            'gap: 1rem !important;'
        );
    });
    
    // Fix form inputs
    const inputs = contactSection.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.setAttribute('style',
            'width: 100% !important;' +
            'padding: 0.75rem !important;' +
            'margin-bottom: 0.5rem !important;'
        );
    });
    
    // Fix form button
    const submitButton = contactSection.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.setAttribute('style',
            'width: 100% !important;' +
            'padding: 0.75rem !important;' +
            'margin-top: 0.5rem !important;'
        );
    }
}