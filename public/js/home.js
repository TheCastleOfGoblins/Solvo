// READ ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!
// THIS is the array that must come from the backend, in order to put mark on the map		
var locations =  [[-34.397, 150.644, function(mark){console.log(mark.getPosition())}]];
// READ ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!
var position


var RecomendedTasks = new function() {
	var self = this;
	var taskMap;

	this.events = function() {

		$('.container'). on('click','.map-opener', function(){
			self.openMap();
				//workaround
			taskMap.resizeMap();

		})
	}

	this.init = function() {
		taskMap = new GMap($('#myModal .map-container')[0], locations);
	}

	this.openMap = function() {
		$('.modal-footer').hide();

        setTimeout(function() { taskMap.getMap().setCenter(taskMap.myPos) }, 1000);

	}

	this.getMap = function() {
		return taskMap;
	}

	$('document').ready(function(){
		self.init();
		self.events();
	});
}

//[[123,434],[2323,3443,callback]]


var GMap =  function(container, locations) {
	var self = this;
	var map;
	var markers = [];
	var container = container;
	var myPos;
	var locations = locations;
	self.myPos;

	this.initialize = function(container, locations) {

		var mapOptions = {
			zoom: 12,
		};

		map = new google.maps.Map(container,mapOptions);

		// navigator.geolocation.getCurrentPosition(function(position) {
		 //  var pos = new google.maps.LatLng(position.coords.latitude,
		 //                                   position.coords.longitude);


		 //  myPos = pos;
		 //  self.myPos = pos;

			// var marker = new google.maps.Marker({
		 //    position: pos,
		 //    map: map,
		 //    title: 'Me'
		 //  });

		  if(locations) {
		  	for(var i=0; i < locations.length; i++)
	  			self.addMarker(new google.maps.LatLng(locations[i][0],
	                                   locations[i][1]), locations[i][2])
		  }
		// })

	}

	// Add a marker to the map and push to the array.
	this.addMarker = function(location, onClick) {

	  var marker = new google.maps.Marker({
	    position: location,
	    map: map
	  });

	  markers.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
			if(onClick)
				onClick(marker);
		});

	}

	// Sets the map on all markers in the array.
	this.setAllMap = function(map) {
	  for (var i = 0; i < markers.length; i++) {
	    markers[i].setMap(map);
	  }
	}

	// Removes the markers from the map, but keeps them in the array.
	this.clearMarkers = function() {
	  self.setAllMap(null);
	}

	// Shows any markers currently in the array.
	this.showMarkers = function() {
	  self.setAllMap(map);
	}

	// Deletes all markers in the array by removing references to them.
	this.deleteMarkers = function() {
	  self.clearMarkers();
	  markers = [];
	}

	self.getMap = function() {
		return map;
	}

	this.resizeMap = function() {
		setTimeout(function() { google.maps.event.trigger(map, "resize")}, 300);
	}

	$(document).ready(function(){
		self.initialize(container, locations);
	})
};

