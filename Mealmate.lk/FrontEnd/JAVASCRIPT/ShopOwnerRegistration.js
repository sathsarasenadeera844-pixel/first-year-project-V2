        document.getElementById('restaurantForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            const requiredFields = ['restaurantName', 'restaurantLocation', 'ownerName', 'operatingHours', 'ownerContact', 'bankDetails'];
            const emptyFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
            if (emptyFields.length > 0) {
                alert('Please fill in all required fields: ' + emptyFields.join(', '));
                return;
            }
            alert('Restaurant registration submitted successfully!\n\nRestaurant: ' + data.restaurantName + '\nOwner: ' + data.ownerName + '\nContact: ' + data.ownerContact);
            this.reset();
        });

        document.querySelectorAll('input, textarea').forEach(element => {
            element.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            element.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });