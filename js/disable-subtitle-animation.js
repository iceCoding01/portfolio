// Script to disable animations for hero subtitle
document.addEventListener('DOMContentLoaded', function() {
    // Get the hero subtitle element
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    // Make sure ScrollReveal doesn't affect it
    if (heroSubtitle) {
        // Apply inline styles to prevent animations
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'none';
        heroSubtitle.style.transition = 'none';
        heroSubtitle.style.animation = 'none';
        
        // Remove any classes that might trigger animations
        heroSubtitle.classList.remove('slide-right', 'slide-left', 'slide-top', 'slide-bottom', 'zoom-in');
        
        // Ensure it's visible immediately
        heroSubtitle.style.visibility = 'visible';
    }
    
    // If ScrollReveal is available, try to tell it to ignore this element
    if (typeof ScrollReveal === 'function') {
        try {
            // Prevent ScrollReveal from hiding the element
            ScrollReveal().clean('.hero-subtitle');
        } catch (e) {
            console.log('Could not clean ScrollReveal for hero subtitle');
        }
    }
});

// Run again after a delay to make sure animations are disabled
setTimeout(function() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'none';
        heroSubtitle.style.transition = 'none';
        heroSubtitle.style.animation = 'none';
    }
}, 500);