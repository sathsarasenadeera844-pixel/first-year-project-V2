// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Sample orders data
    const ordersData = [
        {
            id: 1234,
            items: [
                { name: 'Egg Biriyani', quantity: 1 },
                { name: 'Chicken Biriyani', quantity: 2 }
            ],
            price: 1500.00,
            status: 'prepared'
        },
        {
            id: 1233,
            items: [
                { name: 'Fried Rice', quantity: 2 },
                { name: 'Kottu', quantity: 1 }
            ],
            price: 1200.00,
            status: 'pending'
        },
        {
            id: 1232,
            items: [
                { name: 'Noodles', quantity: 3 }
            ],
            price: 900.00,
            status: 'completed'
        }
    ];

    // Get elements
    const ordersContainer = document.getElementById('ordersContainer');
    const logoutBtn = document.querySelector('.btn-logout');
    const buttons = document.querySelectorAll('.btn');
    const phoneElement = document.querySelector('.phone');

    // Function to get status class and text
    function getStatusInfo(status) {
        const statusMap = {
            'prepared': { class: 'status-prepared', text: 'Prepared' },
            'pending': { class: 'status-pending', text: 'Pending' },
            'completed': { class: 'status-completed', text: 'Completed' },
            'cancelled': { class: 'status-cancelled', text: 'Cancelled' }
        };
        return statusMap[status] || statusMap['pending'];
    }

    // Function to render orders
    function renderOrders(orders) {
        ordersContainer.innerHTML = '';

        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No orders found</p>';
            return;
        }

        orders.forEach(order => {
            const statusInfo = getStatusInfo(order.status);
            
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            
            const itemsHTML = order.items.map(item => 
                `<div class="item">${item.name} <span class="quantity">✕ ${item.quantity}</span></div>`
            ).join('');

            orderCard.innerHTML = `
                <div class="order-header">
                    <div class="order-id-section">
                        <span class="order-label">Order ID</span>
                        <span class="order-id"># ${order.id}</span>
                    </div>
                    <div class="order-items-section">
                        <span class="order-label">Items</span>
                        <div class="order-items">
                            ${itemsHTML}
                        </div>
                    </div>
                    <div class="order-price-section">
                        <span class="order-label">Price</span>
                        <span class="order-price">Rs. ${order.price.toFixed(2)}</span>
                    </div>
                    <div class="order-status-section">
                        <button class="status-badge ${statusInfo.class}">${statusInfo.text}</button>
                    </div>
                </div>
            `;

            ordersContainer.appendChild(orderCard);
        });
    }

    // Initial render with sample data
    renderOrders(ordersData);

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to log out?')) {
            alert('Logged out successfully!');
            // In a real app, redirect to login
            // window.location.href = 'login.html';
        }
    });

    // Navigation buttons
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent;
            
            switch(buttonText) {
                case 'Menu':
                    alert('Opening Menu...');
                    // window.location.href = 'index.html';
                    break;
                case 'Orders':
                    // Already on orders page
                    break;
                case 'Order History':
                    alert('Opening Order History...');
                    break;
                case 'Wallet':
                    alert('Opening Wallet...');
                    break;
                case 'Profile':
                    alert('Opening Profile...');
                    break;
            }
        });
    });

    // Phone click to call
    phoneElement.addEventListener('click', function() {
        window.location.href = 'tel:077-8969556';
    });

    // Hover effect on restaurant card
    const restaurantCard = document.querySelector('.restaurant-card');
    restaurantCard.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s';
    });

    restaurantCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    // Function to add new order (for testing)
    window.addTestOrder = function() {
        const newOrder = {
            id: Math.floor(Math.random() * 10000),
            items: [
                { name: 'Test Item', quantity: 1 }
            ],
            price: 500.00,
            status: 'pending'
        };
        ordersData.unshift(newOrder);
        renderOrders(ordersData);
    };

    // Function to filter orders by status
    window.filterOrders = function(status) {
        if (status === 'all') {
            renderOrders(ordersData);
        } else {
            const filtered = ordersData.filter(order => order.status === status);
            renderOrders(filtered);
        }
    };

    console.log('Orders page loaded successfully!');
    console.log('Available functions: addTestOrder(), filterOrders("prepared"/"pending"/"completed"/"all")');
});