        function showNotification(message) {
                    alert(message);
                }

        
        document.addEventListener('DOMContentLoaded', function() {
            
            setTimeout(() => {
                const modal = document.getElementById('successModal');
                modal.classList.add('show');
                
                
                setTimeout(() => {
                    const checkmark = document.querySelector('.checkmark');
                    checkmark.style.strokeDasharray = '100';
                    checkmark.style.strokeDashoffset = '0';
                }, 300);
            }, 500);

            
           
        });

        
        function goBack() {
            const modal = document.getElementById('successModal');
            const overlay = document.getElementById('successOverlay');
            
        
            modal.classList.add('fade-out');
            
            setTimeout(() => {
                overlay.style.display = 'none';
                
                window.history.back();
            }, 300);
        }

        function goHome() {
            window.location.href = '/index.html'; 
        }

        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                goBack();
            }
            if (e.key === 'Escape') {
                goBack();
            }
        });

    
        document.getElementById('successOverlay').addEventListener('click', function(e) {
            if (e.target === this) {
                goBack();
            }
        });

        
        window.addEventListener('beforeunload', function(e) {
            
            if (document.getElementById('successOverlay').style.display !== 'none') {
                e.preventDefault();
                e.returnValue = '';
                return '';
            }
        });