// Function Test Script
console.log('Function test script loaded');
console.log('Is closeMobileMenuManually available globally?', typeof window.closeMobileMenuManually === 'function');
console.log('Is openMobileMenuManually available globally?', typeof window.openMobileMenuManually === 'function');

// Check again after a short delay to ensure all scripts have loaded
setTimeout(function() {
    console.log('Delayed check:');
    console.log('Is closeMobileMenuManually available globally?', typeof window.closeMobileMenuManually === 'function');
    console.log('Is openMobileMenuManually available globally?', typeof window.openMobileMenuManually === 'function');
}, 1000);