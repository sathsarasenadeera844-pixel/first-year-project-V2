// Menu button functionality
const menuButtons = document.querySelectorAll('.menu-btn');

menuButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        menuButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Log which menu item was selected
        console.log('Selected menu:', this.textContent);
    });
});

// Form input event listeners
const inputFields = document.querySelectorAll('.form-group input');

inputFields.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#E63946';
    });

    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.style.borderColor = '#ddd';
        }
    });

    input.addEventListener('input', function() {
        console.log(`${this.previousElementSibling.textContent}: ${this.value}`);
    });
});

// Edit button functionality
const editBtn = document.querySelector('.btn-primary');

editBtn.addEventListener('click', function() {
    // Get all input values
    const inputs = document.querySelectorAll('.form-group input');
    const formData = {};
    
    inputs.forEach(input => {
        const label = input.previousElementSibling.textContent;
        formData[label] = input.value;
    });
    
    console.log('Form Data:', formData);
    alert('Profile updated! Check console for details.');
});

// Delete Account button functionality
const deleteBtn = document.querySelector('.btn-danger');

deleteBtn.addEventListener('click', function() {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmed) {
        console.log('Account deletion initiated');
        alert('Account deletion request submitted.');
    } else {
        console.log('Account deletion cancelled');
    }
});

// Initialize form with sample data (optional)
function initializeForm() {
    const sampleData = {
        'First Name': 'Dinesh',
        'Last Name': 'Harshana',
        'Email Address': 'dinesh@example.com',
        'Contact Number': '074-6598201',
        'Vehicle Number': 'ABC-1234'
    };

    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
        const label = input.previousElementSibling.textContent;
        if (sampleData[label]) {
            input.value = sampleData[label];
        }
    });
}

// Call initialization on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile page loaded');
    // Uncomment the line below to populate form with sample data
    // initializeForm();
});