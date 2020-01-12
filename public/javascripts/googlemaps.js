  var map;

  function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.654, lng: -79.383},
      zoom: 13
    });
  }
