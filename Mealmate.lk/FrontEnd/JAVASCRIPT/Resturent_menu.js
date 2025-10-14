// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Log out button functionality
    const logoutBtn = document.querySelector('.btn-logout');
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to log out?')) {
            alert('Logged out successfully!');
            // In a real app, this would redirect to login page
            // window.location.href = 'login.html';
        }
    });

    // Menu button
    const menuBtn = document.querySelectorAll('.btn')[0];
    menuBtn.addEventListener('click', function() {
        alert('Opening Menu...');
    });

    // Orders button
    const ordersBtn = document.querySelectorAll('.btn')[1];
    ordersBtn.addEventListener('click', function() {
        alert('Opening Orders...');
    });

    // Order History button
    const orderHistoryBtn = document.querySelectorAll('.btn')[2];
    orderHistoryBtn.addEventListener('click', function() {
        alert('Opening Order History...');
    });

    // Wallet button
    const walletBtn = document.querySelectorAll('.btn')[3];
    walletBtn.addEventListener('click', function() {
        alert('Opening Wallet...');
    });

    // Profile button
    const profileBtn = document.querySelectorAll('.btn')[4];
    profileBtn.addEventListener('click', function() {
        alert('Opening Profile...');
    });

    // Add to Menu button
    const addMenuBtn = document.querySelector('.btn-add-menu');
    addMenuBtn.addEventListener('click', function() {
        alert('Item added to menu!');
        // Add animation feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });

    // Phone number click to call
    const phoneElement = document.querySelector('.phone');
    phoneElement.style.cursor = 'pointer';
    phoneElement.addEventListener('click', function() {
        window.location.href = 'tel:077-8969556';
    });

    // Add hover effect to restaurant card
    const restaurantCard = document.querySelector('.restaurant-card');
    restaurantCard.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s';
    });

    restaurantCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    console.log('Mealmate UI loaded successfully!');
});