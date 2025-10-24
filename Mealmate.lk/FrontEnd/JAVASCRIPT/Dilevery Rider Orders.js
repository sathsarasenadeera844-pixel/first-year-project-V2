document.addEventListener('DOMContentLoaded', function() {
    
    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to log out?')) {
            console.log('User logged out');
            // Redirect to login page or perform logout action
            alert('Logged out successfully');
        }
    });

    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            navButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log('Navigated to:', this.textContent);
        });
    });

    // Accept order buttons
    const acceptButtons = document.querySelectorAll('.accept-btn');
    acceptButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.querySelector('.order-id').textContent;
            console.log('Accepted order:', orderId);
            alert(`Order ${orderId} accepted!`);
            // Remove the card and add to accepted orders
            orderCard.style.opacity = '0';
            setTimeout(() => orderCard.remove(), 300);
        });
    });

    // Pick Up buttons
    const pickupButtons = document.querySelectorAll('.pickup-btn');
    pickupButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.closest('.accepted-order').querySelector('.accepted-id').textContent;
            console.log('Picking up order:', orderId);
            alert(`Picking up order ${orderId}`);
        });
    });

    // Drop Off buttons
    const dropoffButtons = document.querySelectorAll('.dropoff-btn');
    dropoffButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.closest('.accepted-order').querySelector('.accepted-id').textContent;
            console.log('Dropping off order:', orderId);
            alert(`Dropping off order ${orderId}`);
        });
    });

    // Cancel Order buttons
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.closest('.accepted-order').querySelector('.accepted-id').textContent;
            if (confirm(`Are you sure you want to cancel order ${orderId}?`)) {
                console.log('Cancelled order:', orderId);
                const orderElement = this.closest('.accepted-order');
                orderElement.style.opacity = '0';
                setTimeout(() => orderElement.remove(), 300);
            }
        });
    });

});