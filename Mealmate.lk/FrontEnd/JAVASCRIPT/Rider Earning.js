/* ========================================
   MEALMATE.LK - RIDER DASHBOARD
   JAVASCRIPT FILE
   ======================================== */

// ========== GLOBAL VARIABLES ==========
let riderData = {
    name: 'Mr.Dinesh Harshana',
    phone: '074-6598201',
    todayIncome: 15000.00,
    todayTotalOrders: 20,
    todayCompletedOrders: 15,
    lastMonthCompletedOrders: 20,
    thisMonthIncome: 15000.00,
    lastMonthIncome: 12000.00
};

let currentTab = 'earning';

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadRiderData();
    setupEventListeners();
    startAutoRefresh();
});

// ========== INITIALIZE DASHBOARD ==========
function initializeDashboard() {
    console.log('Initializing rider dashboard...');
    updateDashboard();
}

// ========== LOAD RIDER DATA ==========
function loadRiderData() {
    // In real app, this would fetch from API
    /*
    fetch('/api/rider/dashboard')
        .then(response => response.json())
        .then(data => {
            riderData = data;
            updateDashboard();
        })
        .catch(error => {
            console.error('Error loading rider data:', error);
            showNotification('Failed to load dashboard data', 'error');
        });
    */
    
    console.log('Rider data loaded:', riderData);
}

// ========== UPDATE DASHBOARD ==========
function updateDashboard() {
    // Update greeting name
    const greetingName = document.querySelector('.greeting-name');
    if (greetingName) {
        const firstName = riderData.name.split(' ')[1] || riderData.name.split(' ')[0];
        greetingName.textContent = firstName + '.';
    }
    
    // Update today income
    const incomeAmount = document.querySelector('.income-amount');
    if (incomeAmount) {
        incomeAmount.textContent = `Rs.${riderData.todayIncome.toFixed(2)}`;
    }
    
    // Update stat cards
    updateStatCards();
}

// ========== UPDATE STAT CARDS ==========
function updateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards.length >= 5) {
        // Today Total Orders
        statCards[0].querySelector('.stat-value').textContent = riderData.todayTotalOrders;
        
        // Today Completed Orders
        statCards[1].querySelector('.stat-value').textContent = riderData.todayCompletedOrders;
        
        // Last Month Completed Orders
        statCards[2].querySelector('.stat-value').textContent = riderData.lastMonthCompletedOrders;
        
        // This Month Income
        statCards[3].querySelector('.stat-value').textContent = `Rs.${riderData.thisMonthIncome.toFixed(2)}`;
        
        // Last Month Income
        statCards[4].querySelector('.stat-value').textContent = `Rs.${riderData.lastMonthIncome.toFixed(2)}`;
    }
}

// ========== SWITCH TAB ==========
function switchTab(tabName) {
    console.log(`Switching to: ${tabName}`);
    currentTab = tabName;
    
    // Remove active class from all buttons
    const menuButtons = document.querySelectorAll('.menu-btn');
    menuButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Handle different tabs
    switch(tabName) {
        case 'orders':
            showOrders();
            break;
        case 'earning':
            showEarnings();
            break;
        case 'profile':
            showProfile();
            break;
    }
}

// ========== SHOW ORDERS ==========
function showOrders() {
    showNotification('Opening Orders page...', 'info');
    // In real app, navigate to orders page
    // window.location.href = 'rider-orders.html';
    console.log('Showing orders');
}

// ========== SHOW EARNINGS ==========
function showEarnings() {
    // Already on earnings page
    console.log('Showing earnings dashboard');
}

// ========== SHOW PROFILE ==========
function showProfile() {
    showNotification('Opening Profile page...', 'info');
    // In real app, navigate to profile page
    // window.location.href = 'rider-profile.html';
    console.log('Showing profile');
}

// ========== SETUP EVENT LISTENERS ==========
function setupEventListeners() {
    // Click on stat cards for details
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.addEventListener('click', () => showStatDetails(index));
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
}

// ========== SHOW STAT DETAILS ==========
function showStatDetails(index) {
    const titles = [
        'Today Total Orders',
        'Today Completed Orders',
        'Last Month Completed Orders',
        'This Month Income',
        'Last Month Income'
    ];
    
    const values = [
        riderData.todayTotalOrders,
        riderData.todayCompletedOrders,
        riderData.lastMonthCompletedOrders,
        `Rs.${riderData.thisMonthIncome.toFixed(2)}`,
        `Rs.${riderData.lastMonthIncome.toFixed(2)}`
    ];
    
    if (index < titles.length) {
        alert(`${titles[index]}\n\nValue: ${values[index]}`);
        console.log(`Clicked on: ${titles[index]}`);
    }
}

// ========== HANDLE KEY PRESS ==========
function handleKeyPress(e) {
    // R key for refresh
    if (e.key.toLowerCase() === 'r' && e.ctrlKey) {
        e.preventDefault();
        refreshDashboard();
    }
}

// ========== REFRESH DASHBOARD ==========
function refreshDashboard() {
    showNotification('Refreshing dashboard...', 'info');
    
    // Add loading state
    document.body.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        loadRiderData();
        document.body.classList.remove('loading');
        showNotification('Dashboard refreshed!', 'success');
    }, 1000);
}

// ========== START AUTO REFRESH ==========
function startAutoRefresh() {
    // Refresh dashboard every 5 minutes
    setInterval(() => {
        console.log('Auto-refreshing dashboard...');
        loadRiderData();
    }, 300000); // 5 minutes
}

// ========== CALCULATE COMPLETION RATE ==========
function calculateCompletionRate() {
    if (riderData.todayTotalOrders === 0) return 0;
    return ((riderData.todayCompletedOrders / riderData.todayTotalOrders) * 100).toFixed(1);
}

// ========== GET PERFORMANCE STATUS ==========
function getPerformanceStatus() {
    const completionRate = calculateCompletionRate();
    
    if (completionRate >= 90) return 'Excellent';
    if (completionRate >= 75) return 'Good';
    if (completionRate >= 60) return 'Average';
    return 'Needs Improvement';
}

// ========== CALCULATE INCOME GROWTH ==========
function calculateIncomeGrowth() {
    if (riderData.lastMonthIncome === 0) return 0;
    const growth = ((riderData.thisMonthIncome - riderData.lastMonthIncome) / riderData.lastMonthIncome) * 100;
    return growth.toFixed(1);
}

// ========== FORMAT CURRENCY ==========
function formatCurrency(amount) {
    return `Rs.${amount.toFixed(2)}`;
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== GENERATE REPORT ==========
function generateReport() {
    const report = {
        riderName: riderData.name,
        date: new Date().toLocaleDateString(),
        todayStats: {
            totalOrders: riderData.todayTotalOrders,
            completedOrders: riderData.todayCompletedOrders,
            income: riderData.todayIncome,
            completionRate: calculateCompletionRate() + '%'
        },
        monthlyStats: {
            income: riderData.thisMonthIncome,
            lastMonthIncome: riderData.lastMonthIncome,
            growth: calculateIncomeGrowth() + '%'
        },
        performance: getPerformanceStatus()
    };
    
    console.log('Performance Report:', report);
    return report;
}

// ========== EXPORT STATS ==========
function exportStats() {
    const report = generateReport();
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `rider-stats-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Stats exported successfully!', 'success');
}

// ========== EXPORT FUNCTIONS TO GLOBAL SCOPE ==========
window.riderDashboard = {
    switchTab,
    refreshDashboard,
    generateReport,
    exportStats,
    calculateCompletionRate,
    calculateIncomeGrowth
};

console.log('Rider Dashboard script loaded successfully!');
console.log('Completion Rate:', calculateCompletionRate() + '%');
console.log('Performance Status:', getPerformanceStatus());
console.log('Income Growth:', calculateIncomeGrowth() + '%');