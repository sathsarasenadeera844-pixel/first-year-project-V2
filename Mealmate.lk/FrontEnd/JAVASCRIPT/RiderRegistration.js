        document.getElementById('riderForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            
            // Smooth scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Optional: Reset form after showing success
            setTimeout(() => {
                this.reset();
                document.getElementById('photoUpload').innerHTML = `
                    <input type="file" id="profilePhoto" name="profilePhoto" accept="image/*">
                    <div class="upload-icon">📷</div>
                    <div class="upload-text">
                        <strong>Click to upload</strong> or drag and drop<br>
                        JPG, PNG up to 5MB
                    </div>
                `;
            }, 2000);
        });

        // Photo upload functionality
        const photoUpload = document.getElementById('photoUpload');
        const photoInput = document.getElementById('profilePhoto');

        photoUpload.addEventListener('click', () => {
            photoInput.click();
        });

        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoUpload.innerHTML = `
                        <img src="${e.target.result}" alt="Profile Preview" class="photo-preview">
                        <div class="upload-text">
                            <strong>Click to change photo</strong><br>
                            ${file.name}
                        </div>
                        <input type="file" id="profilePhoto" name="profilePhoto" accept="image/*">
                    `;
                };
                reader.readAsDataURL(file);
            }
        });

        // Drag and drop functionality
        photoUpload.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });

        photoUpload.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });

        photoUpload.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                photoInput.files = files;
                photoInput.dispatchEvent(new Event('change'));
            }
        });

        // Phone number formatting for emergency contact
        document.getElementById('emergencyContact').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });

        // Input focus effects
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });