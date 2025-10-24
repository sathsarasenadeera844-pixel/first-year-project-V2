/* ========================================
   MEALMATE.LK - CLEAN MAP PAGE
   JAVASCRIPT FILE
   ======================================== */

// ========== GLOBAL VARIABLES ==========
let map = null;
let mapInitialized = false;

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Map page loaded');
    initializeMap();
    setupEventListeners();
});

// ========== INITIALIZE MAP ==========
function initializeMap() {
    console.log('Initializing map...');
    
    const mapContainer = document.getElementById('mapContainer');
    
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }
    
    // Simulate map loading
    setTimeout(() => {
        mapInitialized = true;
        console.log('Map ready');
        
        // In a real application, initialize your map service here:
        // Example with Google Maps:
        /*
        map = new google.maps.Map(mapContainer, {
            center: { lat: 7.8731, lng: 80.7718 }, // Sri Lanka
            zoom: 8,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
        });
        */
        
        // Example with Leaflet:
        /*
        map = L.map('mapContainer').setView([7.8731, 80.7718], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        */
    }, 500);
}

// ========== SETUP EVENT LISTENERS ==========
function setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Handle visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// ========== GO BACK FUNCTION ==========
function goBack() {
    console.log('Going back...');
    
    // Check if there's history
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Fallback to home or dashboard
        window.location.href = 'index.html';
    }
}

// ========== HANDLE KEY PRESS ==========
function handleKeyPress(e) {
    // Escape key to go back
    if (e.key === 'Escape') {
        goBack();
    }
    
    // B key for back
    if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.metaKey) {
        goBack();
    }
}

// ========== HANDLE RESIZE ==========
function handleResize() {
    if (map && mapInitialized) {
        // Trigger map resize event
        console.log('Window resized, adjusting map');
        
        // For Google Maps:
        // google.maps.event.trigger(map, 'resize');
        
        // For Leaflet:
        // map.invalidateSize();
    }
}

// ========== HANDLE VISIBILITY CHANGE ==========
function handleVisibilityChange() {
    if (!document.hidden && map) {
        // Page became visible, refresh map if needed
        console.log('Page visible, map active');
    } else {
        console.log('Page hidden');
    }
}

// ========== ADD MARKER TO MAP ==========
function addMarker(lat, lng, title) {
    if (!mapInitialized) {
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
    */
    
    // For Leaflet:
    /*
    L.marker([lat, lng]).addTo(map)
        .bindPopup(title)
        .openPopup();
    */
    
    console.log(`Marker added: ${title} at (${lat}, ${lng})`);
}

// ========== CENTER MAP ==========
function centerMap(lat, lng, zoom = 14) {
    if (!mapInitialized) {
        console.error('Map not initialized');
        return;
    }
    
    // For Google Maps:
    /*
    map.setCenter({ lat, lng });
    map.setZoom(zoom);
    */
    
    // For Leaflet:
    /*
    map.setView([lat, lng], zoom);
    */
    
    console.log(`Map centered at (${lat}, ${lng}) with zoom ${zoom}`);
}

// ========== GET CURRENT LOCATION ==========
function getCurrentLocation() {
    if (!navigator.geolocation) {
        console.error('Geolocation not supported');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            console.log(`Current location: (${lat}, ${lng})`);
            
            if (mapInitialized) {
                centerMap(lat, lng);
                addMarker(lat, lng, 'Your Location');
            }
        },
        (error) => {
            console.error('Error getting location:', error.message);
        }
    );
}

// ========== CALCULATE DISTANCE ==========
function calculateDistance(lat1, lng1, lat2, lng2) {
    // Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance.toFixed(2); // Returns distance in km
}

// ========== CONVERT DEGREES TO RADIANS ==========
function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// ========== CLEANUP ON PAGE UNLOAD ==========
window.addEventListener('beforeunload', function() {
    // Cleanup map resources if needed
    if (map) {
        console.log('Cleaning up map resources');
        // Perform any necessary cleanup
    }
});

// ========== EXPORT FUNCTIONS TO GLOBAL SCOPE ==========
window.mapPage = {
    goBack,
    addMarker,
    centerMap,
    getCurrentLocation,
    calculateDistance
};

console.log('Map page script loaded successfully!');