// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load before initializing filter functionality
    document.addEventListener('componentLoaded', function(e) {
        if (e.detail.componentPath === './components/portfolio-filter.html' || 
            e.detail.componentPath === './components/portfolio-grid.html') {
            initializePortfolioFilter();
        }
    });
    
    // Initialize filter functionality if components are already loaded
    setTimeout(initializePortfolioFilter, 1000);
});

function initializePortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioBoxes = document.querySelectorAll('.portfolio-box');
    
    if (!filterBtns.length || !portfolioBoxes.length) {
        console.log('Portfolio components not loaded yet, will retry...');
        return; // Components not loaded yet
    }
    
    console.log('Initializing portfolio filter with', filterBtns.length, 'buttons and', portfolioBoxes.length, 'portfolio boxes');
    
    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                if (!btn.classList.contains('active')) {
                    btn.classList.add('bg-white/90', 'text-gray-700', 'border-2', 'border-gray-200');
                    btn.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
                }
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
            this.classList.remove('bg-white/90', 'text-gray-700', 'border-2', 'border-gray-200');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            console.log('Filtering by:', filterValue);
            
            // Filter portfolio boxes
            portfolioBoxes.forEach(box => {
                if (filterValue === 'all' || box.getAttribute('data-category') === filterValue) {
                    box.style.display = 'block';
                    box.style.animation = 'fadeInUp 0.6s ease-out forwards';
                } else {
                    box.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize by showing all projects
    portfolioBoxes.forEach(box => {
        box.classList.add('transition-all', 'duration-500', 'opacity-100', 'scale-100');
    });
    
    // Ensure the "All Projects" button is active by default
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
        allButton.classList.remove('bg-white/90', 'text-gray-700', 'border-2', 'border-gray-200');
    }
    
    console.log('Portfolio filter functionality initialized successfully');
    
    // Add fadeInUp animation if it doesn't exist
    if (!document.getElementById('portfolio-animations')) {
        const style = document.createElement('style');
        style.id = 'portfolio-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}
