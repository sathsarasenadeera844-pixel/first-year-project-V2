/* ========================================
   MEALMATE.LK - ORDER HISTORY
   JAVASCRIPT FILE
   ======================================== */

// ========== GLOBAL VARIABLES ==========
let orderHistory = [];
let filteredHistory = [];
let currentFilter = 'all';

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeOrderHistory();
    setupEventListeners();
    loadOrderHistory();
});

// ========== INITIALIZE ORDER HISTORY ==========
function initializeOrderHistory() {
    // Sample order history data
    orderHistory = [
        {
            id: '1234',
            items: [
                { name: 'Chicken Biriyani', quantity: 2 }
            ],
            price: 800.00,
            date: new Date('2025-01-30'),
            status: 'delivered'
        },
        {
            id: '4567',
            items: [
                { name: 'Egg Biriyani', quantity: 1 }
            ],
            price: 900.00,
            date: new Date('2025-01-20'),
            status: 'delivered'
        },
        {
            id: '3456',
            items: [
                { name: 'Prawn Kottu', quantity: 2 }
            ],
            price: 2400.00,
            date: new Date('2025-01-15'),
            status: 'delivered'
        },
        {
            id: '2345',
            items: [
                { name: 'Mixed Fried Rice', quantity: 3 }
            ],
            price: 1500.00,
            date: new Date('2025-01-10'),
            status: 'delivered'
        },
        {
            id: '1289',
            items: [
                { name: 'Seafood Fried Rice', quantity: 1 }
            ],
            price: 1200.00,
            date: new Date('2025-01-05'),
            status: 'delivered'
        }
    ];
    
    // Sort by date (newest first)
    orderHistory.sort((a, b) => b.date - a.date);
    filteredHistory = [...orderHistory];
    
    console.log('Order history initialized:', orderHistory);
}

// ========== LOAD ORDER HISTORY ==========
function loadOrderHistory() {
    // In real app, this would fetch from API
    /*
    fetch('/api/restaurant/order-history')
        .then(response => response.json())
        .then(data => {
            orderHistory = data;
            filteredHistory = [...orderHistory];
            displayOrderHistory(filteredHistory);
        })
        .catch(error => {
            console.error('Error loading order history:', error);
            showNotification('Failed to load order history', 'error');
        });
    */
    
    displayOrderHistory(filteredHistory);
}

// ========== DISPLAY ORDER HISTORY ==========
function displayOrderHistory(historyToDisplay) {
    const historyTable = document.querySelector('.history-table');
    
    // Keep the header, remove existing history rows
    const existingRows = historyTable.querySelectorAll('.history-row');
    existingRows.forEach(row => row.remove());
    
    if (historyToDisplay.length === 0) {
        showEmptyState();
        return;
    }
    
    historyToDisplay.forEach(order => {
        const historyRow = createHistoryRow(order);
        historyTable.appendChild(historyRow);
    });
}

// ========== CREATE HISTORY ROW ==========
function createHistoryRow(order) {
    const row = document.createElement('div');
    row.className = 'history-row';
    row.dataset.orderId = order.id;
    row.onclick = () => viewOrderDetails(order);
    
    // Order ID
    const idCell = document.createElement('div');
    idCell.className = 'cell order-id';
    idCell.innerHTML = `<span class="order-number"># ${order.id}</span>`;
    
    // Items
    const itemsCell = document.createElement('div');
    itemsCell.className = 'cell items';
    const itemList = document.createElement('div');
    itemList.className = 'item-list';
    order.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-quantity">✕ ${item.quantity}</span>
        `;
        itemList.appendChild(itemDiv);
    });
    itemsCell.appendChild(itemList);
    
    // Price
    const priceCell = document.createElement('div');
    priceCell.className = 'cell price';
    priceCell.innerHTML = `<span class="price-amount">Rs. ${order.price.toFixed(2)}</span>`;
    
    // Date
    const dateCell = document.createElement('div');
    dateCell.className = 'cell date';
    dateCell.innerHTML = `<span class="date-text">${formatDate(order.date)}</span>`;
    
    row.appendChild(idCell);
    row.appendChild(itemsCell);
    row.appendChild(priceCell);
    row.appendChild(dateCell);
    
    return row;
}

// ========== VIEW ORDER DETAILS ==========
function viewOrderDetails(order) {
    const details = `
Order ID: #${order.id}
Date: ${formatDate(order.date)}
Price: Rs. ${order.price.toFixed(2)}
Status: ${capitalizeFirst(order.status)}

Items:
${order.items.map(item => `- ${item.name} x ${item.quantity}`).join('\n')}
    `;
    
    alert(details);
    
    // In real app, this would open a modal or navigate to detail page
    console.log('Viewing order details:', order);
}

// ========== FILTER ORDERS ==========
function filterOrders(period) {
    currentFilter = period;
    const today = new Date();
    
    switch(period) {
        case 'today':
            filteredHistory = orderHistory.filter(order => 
                isSameDay(order.date, today)
            );
            break;
    }
}