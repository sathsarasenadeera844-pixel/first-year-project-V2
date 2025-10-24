/* ========================================
   MEALMATE.LK - SIMPLE MAP
   JAVASCRIPT FILE
   ======================================== */

// ========== GLOBAL VARIABLES ==========
let map = null;

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
});

// ========== INITIALIZE MAP ==========
function initializeMap() {
    console.log('Initializing map...');
    
    // Simulate map loading
    setTimeout(() => {
        const placeholder = document.querySelector('.map-placeholder');
        if (placeholder) {
            // Keep the simple map icon
            console.log('Map interface ready');
        }
        
        // In real application, initialize Google Maps or other map service:
        /*
        map = new google.maps.Map(document.getElementById('mapContainer'), {
            center: { lat: 8.3114, lng: 80.4037 }, // Anuradhapura
            zoom: 14,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
        });
        
        // Add marker
        new google.maps.Marker({
            position: { lat: 8.3114, lng: 80.4037 },
            map: map,
            title: 'Location'
        });
        */
    }, 500);
}

// ========== SETUP EVENT LISTENERS ==========
function setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// ========== GO BACK FUNCTION ==========
function goBack() {
    console.log('Going back...');
    
    // Check if there's history to go back to
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Fallback to home page or previous page
        window.location.href = 'index.html';
    }
}

// ========== HANDLE KEY PRESS ==========
function handleKeyPress(e) {
    // Escape key to go back
    if (e.key === 'Escape') {
        goBack();
    }
    
    // Enter key on back button
    if (e.key === 'Enter' && document.activeElement.classList.contains('back-btn')) {
        goBack();
    }
}

// ========== HANDLE RESIZE ==========
function handleResize() {
    // Adjust map on window resize if needed
    if (map) {
        // For Google Maps:
        // google.maps.event.trigger(map, 'resize');
        console.log('Map resized');
    }
}

// ========== LOAD MAP WITH GOOGLE MAPS API ==========
function loadGoogleMap() {
    // Example function to load Google Maps
    // Requires Google Maps API key
    
    /*
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    */
}

// ========== LOAD MAP WITH LEAFLET ==========
function loadLeafletMap() {
    // Example function to load Leaflet map
    // Requires Leaflet library
    
    /*
    map = L.map('mapContainer').setView([8.3114, 80.4037], 14);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    L.marker([8.3114, 80.4037]).addTo(map)
        .bindPopup('Location')
        .openPopup();
    */
}

// ========== GET CURRENT LOCATION ==========
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                console.log('Current location:', { lat, lng });
                
                // Center map on current location
                if (map) {
                    // For Google Maps:
                    // map.setCenter({ lat, lng });
                    
                    // For Leaflet:
                    // map.setView([lat, lng], 14);
                }
            },
            (error) => {
                console.error('Error getting location:', error.message);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser');
    }
}

// ========== SHOW LOCATION ON MAP ==========
function showLocation(lat, lng, title = 'Location') {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    // For Google Maps:
    /*
    new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: title
    });
    
    map.setCenter({ lat, lng });
    */
    
    // For Leaflet:
    /*
    L.marker([lat, lng]).addTo(map)
        .bindPopup(title)
        .openPopup();
    
    map.setView([lat, lng], 14);
    */
    
    console.log(`Showing location: ${title} at (${lat}, ${lng})`);
}

// ========== CALCULATE DISTANCE ==========
function calculateDistance(lat1, lng1, lat2, lng2) {
    // Haversine formula
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance.toFixed(2); // Returns distance in km
}

// ========== EXPORT FUNCTIONS TO GLOBAL SCOPE ==========
window.mapFunctions = {
    goBack,
    getCurrentLocation,
    showLocation,
    calculateDistance
};

console.log('Simple Map script loaded successfully!');