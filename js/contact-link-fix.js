/**
 * Contact Link Fix
 * This script ensures proper scrolling to the contact section
 * when clicking on contact links throughout the site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all links that point to the contact section
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    
    // Add click handler to each link
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get contact section
            const contactSection = document.getElementById('contact');
            if (!contactSection) return;
            
            // Ensure contact section is visible before scrolling
            contactSection.style.display = 'block';
            contactSection.style.visibility = 'visible';
            contactSection.style.opacity = '1';
            
            // Force layout recalculation
            contactSection.offsetHeight;
            
            // Apply any necessary fixes on mobile
            if (window.innerWidth <= 768) {
                if (typeof enhancedContactFix === 'function') {
                    enhancedContactFix();
                }
            }
            
            // Scroll to contact section with appropriate offset for fixed header
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const scrollTopPosition = contactSection.offsetTop - headerHeight - 20;
            
            // Scroll with smooth behavior
            window.scrollTo({
                top: scrollTopPosition,
                behavior: 'smooth'
            });
            
            // Run additional fixes after scroll completes
            setTimeout(function() {
                if (typeof enhancedContactFix === 'function') {
                    enhancedContactFix();
                }
            }, 1000);
        });
    });
});