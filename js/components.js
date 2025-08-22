// This script helps load HTML components across the site
document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with data-component attribute
    const componentElements = document.querySelectorAll('[data-component]');
    
    // Load each component
    componentElements.forEach(element => {
        const componentPath = element.getAttribute('data-component');
        
        // Add loading indicator if the element is empty
        if (!element.innerHTML.trim()) {
            element.innerHTML = `
                <div class="w-full h-40 flex items-center justify-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current"></div>
                </div>
            `;
        }
        
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${componentPath}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                
                // Dispatch event to notify that component was loaded
                const event = new CustomEvent('componentLoaded', { 
                    detail: { 
                        componentPath: componentPath,
                        element: element 
                    } 
                });
                document.dispatchEvent(event);
            })
            .catch(error => {
                console.error('Error loading component:', error);
                element.innerHTML = `<div class="component-error p-4 bg-red-50 text-red-500 rounded-lg">Failed to load component: ${componentPath}</div>`;
            });
    });
});
