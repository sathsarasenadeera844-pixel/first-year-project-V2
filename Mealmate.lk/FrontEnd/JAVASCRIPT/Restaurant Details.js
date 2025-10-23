/* ========================================
   MEALMATE.LK - RESTAURANT PROFILE
   JAVASCRIPT FILE
   ======================================== */

// ========== GLOBAL VARIABLES ==========
let isEditMode = false;
let originalFormData = {};
let isAccountNumberEditMode = false;
let originalAccountNumber = '**** **** **** ****';

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadRestaurantData();
    setupEventListeners();
    
    // Store original account number
    const accountInput = document.getElementById('accountNumber');
    if (accountInput) {
        originalAccountNumber = accountInput.value;
    }
});

// ========== FORM INITIALIZATION ==========
function initializeForm() {
    // Disable all form inputs initially (view mode)
    const formInputs = document.querySelectorAll('#restaurantForm input');
    formInputs.forEach(input => {
        if (!input.readOnly) {
            input.disabled = true;
        }
    });
    
    // Save original form data
    saveFormData();
}

// ========== LOAD RESTAURANT DATA ==========
function loadRestaurantData() {
    // Sample data - in real app, this would come from an API
    const restaurantData = {
        restaurantName: 'Food Paradise Restaurant',
        registrationNumber: 'REG-2024-001',
        ownerFirstName: 'Kamal',
        ownerLastName: 'Perera',
        addressLine1: 'No. 21, Mihintale Junction',
        addressLine2: 'Opp. Cargills Food City',
        addressLine3: 'Anuradhapura',
        accountHolderName: 'Kamal Perera',
        accountNumber: '**** **** **** *569'
    };
    
    // Populate form with data (optional - for demo)
    // You can uncomment this to pre-fill the form
    /*
    Object.keys(restaurantData).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = restaurantData[key];
        }
    });
    */
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Form input validation
    const formInputs = document.querySelectorAll('#restaurantForm input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Prevent form submission
    const form = document.getElementById('restaurantForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        return false;
    });
}

// ========== NAVIGATION FUNCTIONS ==========
function navigateTo(page) {
    console.log(`Navigating to: ${page}`);
    alert(`Navigating to ${page} page`);
    // In real app, this would use router or window.location
}

function showLogin() {
    alert('Opening login page...');
    // In real app, this would open login modal or redirect
}

function showSignup() {
    alert('Opening signup page...');
    // In real app, this would open signup modal or redirect
}

// ========== TAB SWITCHING ==========
function switchTab(tabName) {
    console.log(`Switching to: ${tabName}`);
    
    // Remove active class from all buttons
    const menuButtons = document.querySelectorAll('.menu-btn');
    menuButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Show notification for demo
    const messages = {
        'menu': 'Opening Menu Management...',
        'orders': 'Opening Active Orders...',
        'history': 'Opening Order History...',
        'wallet': 'Opening Wallet...',
        'profile': 'Viewing Restaurant Profile...'
    };
    
    alert(messages[tabName] || 'Opening section...');
    
    // In real app, this would load different content sections
}

// ========== EDIT PROFILE FUNCTION ==========
function editProfile() {
    isEditMode = !isEditMode;
    const editBtn = event.target;
    const formInputs = document.querySelectorAll('#restaurantForm input');
    
    if (isEditMode) {
        // Enable editing mode
        editBtn.textContent = 'Save';
        editBtn.style.background = '#27ae60';
        
        formInputs.forEach(input => {
            if (!input.readOnly && input.id !== 'accountNumber') {
                input.disabled = false;
                input.style.background = 'white';
            }
        });
        
        // Save current form state
        saveFormData();
        
        alert('Edit mode enabled. You can now modify the restaurant details.');
    } else {
        // Save changes
        if (validateForm()) {
            editBtn.textContent = 'Edit';
            editBtn.style.background = '#e74c3c';
            
            formInputs.forEach(input => {
                if (!input.readOnly) {
                    input.disabled = true;
                    input.style.background = '#f8f9fa';
                }
            });
            
            // In real app, this would send data to server
            saveChanges();
            
            alert('Changes saved successfully!');
        } else {
            alert('Please fill in all required fields correctly.');
        }
    }
}

// ========== SAVE FORM DATA ==========
function saveFormData() {
    const form = document.getElementById('restaurantForm');
    const formData = new FormData(form);
    originalFormData = {};
    
    for (let [key, value] of formData.entries()) {
        originalFormData[key] = value;
    }
}

// ========== SAVE CHANGES ==========
function saveChanges() {
    const form = document.getElementById('restaurantForm');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    console.log('Saving restaurant data:', data);
    
    // In real app, this would be an API call:
    /*
    fetch('/api/restaurant/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Restaurant details updated successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update restaurant details.');
    });
    */
}

// ========== FORM VALIDATION ==========
function validateForm() {
    const requiredFields = [
        'restaurantName',
        'registrationNumber',
        'ownerFirstName',
        'ownerLastName',
        'addressLine1',
        'accountHolderName'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
            field.style.background = '#fff5f5';
        } else {
            field.style.borderColor = '#e0e0e0';
            field.style.background = 'white';
        }
    });
    
    return isValid;
}

// ========== FIELD VALIDATION ==========
function validateField(field) {
    if (!field.disabled && !field.readOnly) {
        if (field.value.trim() === '') {
            field.style.borderColor = '#e74c3c';
            field.style.background = '#fff5f5';
            return false;
        } else {
            field.style.borderColor = '#27ae60';
            field.style.background = 'white';
            
            // Reset to normal after 1 second
            setTimeout(() => {
                field.style.borderColor = '#e0e0e0';
            }, 1000);
            
            return true;
        }
    }
}

// ========== DELETE ACCOUNT FUNCTION ==========
function deleteAccount() {
    const confirmation = confirm(
        'Are you sure you want to delete this account?\n\n' +
        'This action cannot be undone and will permanently remove:\n' +
        '- Restaurant profile\n' +
        '- All menu items\n' +
        '- Order history\n' +
        '- Bank details\n\n' +
        'Type "DELETE" in the next prompt to confirm.'
    );
    
    if (confirmation) {
        const finalConfirmation = prompt('Type "DELETE" to confirm account deletion:');
        
        if (finalConfirmation === 'DELETE') {
            // Show loading state
            const deleteBtn = event.target;
            deleteBtn.textContent = 'Deleting...';
            deleteBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Account deleted successfully. You will be redirected to the home page.');
                
                // In real app, this would call API and redirect:
                /*
                fetch('/api/restaurant/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    alert('Account deleted successfully.');
                    window.location.href = '/';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to delete account.');
                    deleteBtn.textContent = 'Delete Account';
                    deleteBtn.disabled = false;
                });
                */
                
                // For demo, just reset
                deleteBtn.textContent = 'Delete Account';
                deleteBtn.disabled = false;
            }, 2000);
        } else {
            alert('Account deletion cancelled. Confirmation text did not match.');
        }
    }
}

// ========== CHANGE ACCOUNT NUMBER FUNCTION ==========
function changeAccountNumber() {
    const accountInput = document.getElementById('accountNumber');
    const changeBtn = event.target;
    
    if (!isAccountNumberEditMode) {
        // Enter edit mode for account number
        isAccountNumberEditMode = true;
        
        // Show confirmation dialog
        const confirm = window.confirm(
            'Warning: Changing your account number is a sensitive operation.\n\n' +
            'Please ensure you have the correct account number before proceeding.\n\n' +
            'Do you want to continue?'
        );
        
        if (!confirm) {
            isAccountNumberEditMode = false;
            return;
        }
        
        // Enable input
        accountInput.readOnly = false;
        accountInput.disabled = false;
        accountInput.value = '';
        accountInput.placeholder = 'Enter new account number';
        accountInput.style.background = 'white';
        accountInput.style.borderColor = '#3498db';
        accountInput.focus();
        
        // Change button text
        changeBtn.textContent = 'Save';
        changeBtn.classList.add('save-mode');
        
        // Add cancel button
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'btn-change-account cancel-mode';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = cancelAccountNumberChange;
        accountInput.parentElement.appendChild(cancelBtn);
        
        showNotification('Enter your new account number', 'info');
        
    } else {
        // Save new account number
        const newAccountNumber = accountInput.value.trim();
        
        // Validate account number
        if (!validateAccountNumber(newAccountNumber)) {
            alert('Please enter a valid account number (10-16 digits)');
            accountInput.style.borderColor = '#e74c3c';
            return;
        }
        
        // Confirm save
        const confirmSave = window.confirm(
            'Are you sure you want to update your account number to:\n\n' +
            newAccountNumber + '\n\n' +
            'Please verify this number is correct before confirming.'
        );
        
        if (confirmSave) {
            // Mask the account number
            const maskedNumber = maskAccountNumber(newAccountNumber);
            
            // Update input
            accountInput.value = maskedNumber;
            accountInput.readOnly = true;
            accountInput.disabled = true;
            accountInput.style.background = '#e9ecef';
            accountInput.style.borderColor = '#e0e0e0';
            
            // Store original for future reference
            originalAccountNumber = maskedNumber;
            
            // Reset button
            changeBtn.textContent = 'Change';
            changeBtn.classList.remove('save-mode');
            
            // Remove cancel button
            const cancelBtn = accountInput.parentElement.querySelector('.cancel-mode');
            if (cancelBtn) {
                cancelBtn.remove();
            }
            
            isAccountNumberEditMode = false;
            
            // Save to backend (simulated)
            saveAccountNumber(newAccountNumber);
            
            showNotification('Account number updated successfully!', 'success');
        }
    }
}

// ========== CANCEL ACCOUNT NUMBER CHANGE ==========
function cancelAccountNumberChange() {
    const accountInput = document.getElementById('accountNumber');
    const changeBtn = document.querySelector('.btn-change-account.save-mode');
    const cancelBtn = event.target;
    
    // Restore original value
    accountInput.value = originalAccountNumber;
    accountInput.readOnly = true;
    accountInput.disabled = true;
    accountInput.style.background = '#e9ecef';
    accountInput.style.borderColor = '#e0e0e0';
    
    // Reset button
    if (changeBtn) {
        changeBtn.textContent = 'Change';
        changeBtn.classList.remove('save-mode');
    }
    
    // Remove cancel button
    cancelBtn.remove();
    
    isAccountNumberEditMode = false;
    
    showNotification('Account number change cancelled', 'info');
}

// ========== VALIDATE ACCOUNT NUMBER ==========
function validateAccountNumber(accountNumber) {
    // Remove spaces and dashes
    const cleaned = accountNumber.replace(/[\s-]/g, '');
    
    // Check if it's only digits and has valid length (10-16 digits)
    const accountRegex = /^\d{10,16}$/;
    return accountRegex.test(cleaned);
}

// ========== SAVE ACCOUNT NUMBER ==========
function saveAccountNumber(accountNumber) {
    console.log('Saving account number:', accountNumber);
    
    // In real app, this would be an API call:
    /*
    fetch('/api/restaurant/update-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountNumber: accountNumber })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        showNotification('Account number updated successfully!', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to update account number.', 'error');
    });
    */
}

// ========== UTILITY FUNCTIONS ==========

// Format phone number
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Format account number (mask)
function maskAccountNumber(accountNumber) {
    // Remove spaces and dashes
    const cleaned = accountNumber.replace(/[\s-]/g, '');
    
    // Show only last 3 digits
    const masked = cleaned.slice(0, -3).replace(/\d/g, '*') + cleaned.slice(-3);
    
    // Format with spaces every 4 digits
    return masked.match(/.{1,4}/g)?.join(' ') || masked;
}

// Capitalize text
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
}

// ========== AUTO-SAVE FUNCTIONALITY ==========
let autoSaveTimer;

function enableAutoSave() {
    const formInputs = document.querySelectorAll('#restaurantForm input');
    
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Clear existing timer
            clearTimeout(autoSaveTimer);
            
            // Set new timer for auto-save after 2 seconds of inactivity
            autoSaveTimer = setTimeout(() => {
                if (isEditMode) {
                    console.log('Auto-saving changes...');
                    // In real app, this would save to localStorage or API
                    localStorage.setItem('restaurantFormDraft', JSON.stringify(getFormData()));
                }
            }, 2000);
        });
    });
}

// ========== GET FORM DATA ==========
function getFormData() {
    const form = document.getElementById('restaurantForm');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// ========== RESTORE DRAFT ==========
function restoreDraft() {
    const draft = localStorage.getItem('restaurantFormDraft');
    
    if (draft) {
        const confirmation = confirm('A draft was found. Would you like to restore it?');
        
        if (confirmation) {
            const data = JSON.parse(draft);
            
            Object.keys(data).forEach(key => {
                const input = document.getElementById(key);
                if (input) {
                    input.value = data[key];
                }
            });
            
            alert('Draft restored successfully!');
            localStorage.removeItem('restaurantFormDraft');
        }
    }
}

// ========== EXPORT DATA ==========
function exportRestaurantData() {
    const data = getFormData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'restaurant-data.json';
    link.click();
    
    alert('Restaurant data exported successfully!');
}

// ========== PRINT PROFILE ==========
function printProfile() {
    window.print();
}

// ========== CANCEL EDIT ==========
function cancelEdit() {
    if (isEditMode) {
        const confirmation = confirm('Are you sure you want to cancel? All unsaved changes will be lost.');
        
        if (confirmation) {
            // Restore original form data
            Object.keys(originalFormData).forEach(key => {
                const input = document.getElementById(key);
                if (input) {
                    input.value = originalFormData[key];
                }
            });
            
            // Exit edit mode
            isEditMode = false;
            const editBtn = document.querySelector('.btn-edit');
            editBtn.textContent = 'Edit';
            editBtn.style.background = '#e74c3c';
            
            // Disable inputs
            const formInputs = document.querySelectorAll('#restaurantForm input');
            formInputs.forEach(input => {
                if (!input.readOnly) {
                    input.disabled = true;
                    input.style.background = '#f8f9fa';
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            alert('Changes cancelled. Form restored to original state.');
        }
    }
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + E: Toggle edit mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        editProfile();
    }
    
    // Ctrl/Cmd + S: Save changes
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (isEditMode) {
            editProfile(); // This will save
        }
    }
    
    // Escape: Cancel edit
    if (e.key === 'Escape' && isEditMode) {
        cancelEdit();
    }
});

// ========== FORM FIELD HELPERS ==========

// Add character counter to text inputs
function addCharacterCounter() {
    const textInputs = document.querySelectorAll('#restaurantForm input[type="text"]');
    
    textInputs.forEach(input => {
        const maxLength = input.getAttribute('maxlength');
        if (maxLength) {
            const counter = document.createElement('span');
            counter.className = 'char-counter';
            counter.textContent = `0/${maxLength}`;
            
            input.parentElement.appendChild(counter);
            
            input.addEventListener('input', function() {
                counter.textContent = `${this.value.length}/${maxLength}`;
            });
        }
    });
}

// ========== IMAGE UPLOAD FUNCTIONALITY ==========
function setupImageUpload() {
    const imageContainer = document.querySelector('.restaurant-image');
    
    imageContainer.addEventListener('click', function() {
        if (isEditMode) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        imageContainer.style.backgroundImage = `url(${e.target.result})`;
                        imageContainer.style.backgroundSize = 'cover';
                        imageContainer.style.backgroundPosition = 'center';
                        
                        // Hide placeholder
                        const placeholder = imageContainer.querySelector('.image-placeholder');
                        if (placeholder) {
                            placeholder.style.display = 'none';
                        }
                        
                        alert('Image uploaded successfully!');
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            input.click();
        }
    });
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

// ========== INITIALIZE ADDITIONAL FEATURES ==========
window.addEventListener('load', function() {
    // Enable auto-save
    enableAutoSave();
    
    // Check for draft
    restoreDraft();
    
    // Setup image upload
    setupImageUpload();
    
    // Add character counters (if needed)
    // addCharacterCounter();
    
    console.log('Restaurant Profile loaded successfully!');
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// ========== UNSAVED CHANGES WARNING ==========
window.addEventListener('beforeunload', function(e) {
    if (isEditMode) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
    }
});

// ========== EXPORT FUNCTIONS TO GLOBAL SCOPE ==========
window.restaurantProfile = {
    editProfile,
    deleteAccount,
    switchTab,
    navigateTo,
    showLogin,
    showSignup,
    saveChanges,
    cancelEdit,
    exportRestaurantData,
    printProfile,
    changeAccountNumber,
    cancelAccountNumberChange
};

console.log('Restaurant Profile Script Loaded Successfully!');