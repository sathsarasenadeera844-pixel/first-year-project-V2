        function showNotification(message) {
            alert(message);
        }

        // QUANTITY MANAGEMENT 
        function updateQuantity(itemId, change) {
            const qtyElement = document.getElementById(`qty-${itemId}`);
            let currentQty = parseInt(qtyElement.textContent);
            let newQty = Math.max(0, currentQty + change);
            qtyElement.textContent = newQty;
            
            // Update totals
            calculateTotals();
        }

        function removeItem(itemId) {
            const cartItem = document.getElementById(`qty-${itemId}`).closest('.cart-item');
            cartItem.style.opacity = '0.5';
            setTimeout(() => {
                cartItem.remove();
                calculateTotals();
            }, 300);
        }

        // PAYMENT METHOD HANDLING 
        document.addEventListener('DOMContentLoaded', function() {
            const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
            const cardDetails = document.getElementById('cardDetails');
            
            paymentMethods.forEach(method => {
                method.addEventListener('change', function() {
                    if (this.value === 'creditCard') {
                        cardDetails.style.display = 'block';
                    } else {
                        cardDetails.style.display = 'none';
                    }
                });
            });
        });

        //FORM VALIDATION
        function validateForm() {
            const requiredFields = [
                'firstName1', 'firstName2', 'lastName1', 'lastName2',
                'addressLine1', 'contactNumber'
            ];
            
            let isValid = true;
            const errors = [];
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    isValid = false;
                    errors.push(field.previousElementSibling.textContent);
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Validate payment method
            const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
            if (selectedPayment.value === 'creditCard') {
                const cardFields = ['cardNumber', 'expiryDate', 'cvv'];
                cardFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (!field.value.trim()) {
                        isValid = false;
                        errors.push('Card ' + field.previousElementSibling.textContent);
                        field.style.borderColor = '#e74c3c';
                    } else {
                        field.style.borderColor = '#ddd';
                    }
                });
            }
            
            return { isValid, errors };
        }

        // PURCHASE PROCESSING 
        function processPurchase() {
            const validation = validateForm();
            
            if (!validation.isValid) {
                alert('Please fill in all required fields:\n' + validation.errors.join('\n'));
                return;
            }
            
            
            const buyBtn = document.querySelector('.buy-now-btn');
            buyBtn.textContent = 'Processing...';
            buyBtn.disabled = true;
            
           
            setTimeout(() => {
                alert('Order placed successfully!\nThank you for your purchase. Your order will be delivered soon.');
                buyBtn.textContent = 'BUY NOW';
                buyBtn.disabled = false;
            }, 2000);
        }

        // CALCULATE TOTALS
        function calculateTotals() {
           
            console.log('Totals recalculated');
        }

        // CARD NUMBER FORMATTING 
        document.getElementById('cardNumber').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length <= 19) {
                e.target.value = formattedValue;
            }
        });

        // EXPIRY DATE FORMATTING 
        document.getElementById('expiryDate').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        // CVV VALIDATION 
        document.getElementById('cvv').addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });