marker = false;
markers = [];


function DeleteMarkers() {
    //Loop through all the markers and remove
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function initialize() {
  var mapCanvas = document.getElementById('map-canvas');
  var mapOptions = {
    center: new google.maps.LatLng(42.6954322, 23.3239467),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(mapCanvas, mapOptions);

  google.maps.event.addListener(map, "click", function (event) {
      if(marker){
          marker.setMap(null);
      } else {
         DeleteMarkers();
      }
      marker = new google.maps.Marker({
          position: event.latLng,
          map: map
      });

      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      console.log( latitude + ', ' + longitude );

      $('#locx').val(latitude);
      $('#locy').val(longitude);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
