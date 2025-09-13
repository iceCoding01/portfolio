// Fix contact section visibility on mobile
document.addEventListener('DOMContentLoaded', function() {
    fixContactSectionOnMobile();
    window.addEventListener('resize', fixContactSectionOnMobile);
    window.addEventListener('scroll', fixContactSectionOnMobile);
    setTimeout(fixContactSectionOnMobile, 500); // Run after short delay
    setTimeout(fixContactSectionOnMobile, 1500); // Run again after longer delay
});

function fixContactSectionOnMobile() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    
    // Make sure contact section is visible on mobile
    if (window.innerWidth <= 768) {
        contactSection.style.display = 'block';
        contactSection.style.visibility = 'visible';
        contactSection.style.opacity = '1';
        contactSection.style.zIndex = '1';
        
        // Force layout recalculation
        contactSection.offsetHeight;
        
        // Check if section is truly visible
        const computedStyle = window.getComputedStyle(contactSection);
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || computedStyle.opacity === '0') {
            console.log('Fixing contact section visibility on mobile');
            
            // Apply inline styles with !important
            contactSection.setAttribute('style', 
                'display: block !important; ' +
                'visibility: visible !important; ' +
                'opacity: 1 !important; ' +
                'z-index: 10 !important;'
            );
            
            // Force element into the layout
            document.body.appendChild(contactSection);
            document.querySelector('footer').before(contactSection);
        }
    }
}