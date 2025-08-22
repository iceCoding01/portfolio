// Portfolio touch interaction for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    // This function will be called after portfolio components load
    function initPortfolioTouch() {
        const portfolioBoxes = document.querySelectorAll('.portfolio-box');
        
        if (!portfolioBoxes.length) {
            console.log('No portfolio boxes found yet, will try again when components load');
            return;
        }
        
        console.log('Initializing touch interactions for', portfolioBoxes.length, 'portfolio items');
        
        // Check if we're on a touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            console.log('Touch device detected, applying touch interaction handlers');
            
            // Add class to body for CSS targeting
            document.body.classList.add('touch-device');
            
            // For each portfolio box, handle touch interactions
            portfolioBoxes.forEach(box => {
                box.addEventListener('touchstart', function(e) {
                    // Don't prevent default to allow scrolling
                }, { passive: true });
                
                box.addEventListener('touchend', function(e) {
                    // Toggle 'touched' class
                    const wasTouched = this.classList.contains('touched');
                    
                    // First remove 'touched' class from all boxes
                    portfolioBoxes.forEach(b => b.classList.remove('touched'));
                    
                    // If this wasn't the box that was already touched, add the class
                    if (!wasTouched) {
                        this.classList.add('touched');
                        e.preventDefault(); // Prevent click if we're showing the overlay
                    }
                });
            });
            
            // Close overlay when clicking elsewhere
            document.addEventListener('touchend', function(e) {
                if (!e.target.closest('.portfolio-box')) {
                    portfolioBoxes.forEach(box => box.classList.remove('touched'));
                }
            }, { passive: true });
        } else {
            console.log('Not a touch device, using default hover interactions');
        }
    }
    
    // Try to initialize immediately
    initPortfolioTouch();
    
    // Also initialize when components are loaded
    document.addEventListener('componentLoaded', function(e) {
        if (e.detail.componentPath === './components/portfolio-grid.html') {
            console.log('Portfolio grid component loaded, initializing touch interactions');
            initPortfolioTouch();
        }
    });
});
