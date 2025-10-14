document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const emailPhoneInput = document.getElementById('emailPhone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const continueBtn = document.querySelector('.continue-btn');

    // Add event listener for form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Call the signup validation function
        if (validateSignup()) {
            // Here you would typically send the data to a backend server
            console.log("Form submitted successfully!");
            console.log("Email/Phone:", emailPhoneInput.value);
            console.log("Password:", passwordInput.value);
            
            // You can add further logic like redirecting the user or showing a success message
            alert('Signup successful! Redirecting to login...');
            // window.location.href = '/login.html'; // Example redirection
        }
    });

    // Function to validate the form inputs
    const validateSignup = () => {
        const emailPhone = emailPhoneInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Basic validation checks
        if (!emailPhone) {
            alert('Please enter your phone number or email.');
            emailPhoneInput.focus();
            return false;
        }

        if (!password) {
            alert('Please enter a password.');
            passwordInput.focus();
            return false;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            passwordInput.focus();
            return false;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            confirmPasswordInput.focus();
            return false;
        }

        // Additional validation for email/phone format can be added here
        // For example, a simple regex check for email
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(emailPhone) && isNaN(emailPhone)) {
        //     alert('Please enter a valid email address or phone number.');
        //     emailPhoneInput.focus();
        //     return false;
        // }
        
        return true;
    };
});