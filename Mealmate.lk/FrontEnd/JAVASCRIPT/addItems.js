// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const imageUploadBox = document.getElementById('imageUploadBox');
    const imageInput = document.getElementById('imageInput');
    const previewImage = document.getElementById('previewImage');
    const menuForm = document.getElementById('menuForm');
    const titleInput = document.getElementById('titleInput');
    const priceInput = document.getElementById('priceInput');
    const logoutBtn = document.querySelector('.btn-logout');

    // Image upload functionality
    imageUploadBox.addEventListener('click', function() {
        imageInput.click();
    });

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Read and display image
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                imageUploadBox.classList.add('has-image');
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Allow dropping image
    imageUploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.backgroundColor = '#f0f0f0';
    });

    imageUploadBox.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.backgroundColor = 'white';
    });

    imageUploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.backgroundColor = 'white';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            imageInput.files = e.dataTransfer.files;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                imageUploadBox.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    });

    // Price input validation (allow only numbers and decimal)
    priceInput.addEventListener('input', function(e) {
        let value = e.target.value;
        // Remove any non-numeric characters except decimal point
        value = value.replace(/[^0-9.]/g, '');
        // Allow only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        e.target.value = value;
    });

    // Form submission
    menuForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = titleInput.value.trim();
        const price = priceInput.value.trim();
        const hasImage = previewImage.style.display !== 'none';

        // Validation
        if (!hasImage) {
            alert('Please add an image');
            return;
        }

        if (!title) {
            alert('Please add a title');
            titleInput.focus();
            return;
        }

        if (!price) {
            alert('Please add a price');
            priceInput.focus();
            return;
        }

        // Success message
        alert(`Item Added Successfully!\n\nTitle: ${title}\nPrice: Rs. ${price}`);
        
        // Reset form
        menuForm.reset();
        previewImage.style.display = 'none';
        imageUploadBox.classList.remove('has-image');
        
        // In a real app, this would send data to server
        console.log({
            title: title,
            price: price,
            image: previewImage.src
        });
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to log out?')) {
            alert('Logged out successfully!');
            // In a real app, redirect to login
            // window.location.href = 'login.html';
        }
    });

    // Add animation on form focus
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    console.log('Add to Menu page loaded successfully!');
});