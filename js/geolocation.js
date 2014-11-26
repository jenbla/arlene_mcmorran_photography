// Wait for EVERYTHING to download before running
window.onload = createCustomMap;


// Function to create a custom map
function createCustomMap() {
	// Define latitude and longitude (we will use this a couple of times)
	var myLatLng = new google.maps.LatLng(-41.228632, 174.806875);

	// Google maps API needs some options
	var mapOptions = {
		zoom: 15,
		center: myLatLng

	};

	// Draw the map, and store it in a variable so we can use it later
	var map = new google.maps.Map(document.getElementById('custom-map'), mapOptions);

	// Proceed only if the browser supports geolocation...
	if(navigator.geolocation) {
		// Get the user's location
		navigator.geolocation.getCurrentPosition(function renderUserLocation(positionData) {
			// Define latitude and longitude based on the user's location
			var userLocation = new google.maps.LatLng(positionData.coords.latitude, positionData.coords.longitude);

			// Set the centre of the map at the user's location
			map.setCenter(userLocation);

			// Create a marker for the user
			var userMarker = new google.maps.Marker({
				position: userLocation,
				map: map,
				title: "You are here"
			});

			// Start the directions services
			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setMap(map);

			// Define directions options as driving from user's Lat and Lng
            var request = {
                 origin: userLocation,
                 destination: myLatLng,
                 travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            
            // Plot the route on the map
			directionsService.route(request, function (response, status) {
				if(status == google.maps.DirectionsStatus.OK) {
		            directionsDisplay.setDirections(response);
				} else{
					console.log('Could not get directions');
				}
			});
		}); 
	}
}
