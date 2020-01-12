var map;
var parkingStalls;
$(document).ready(function () {
    console.log("client doc ready");
    initMap(map);

    $('#theftControl').click(function (e) {
        $(this).ready(function () {
            if ($('#theftControl').prop("checked") == true) {
                console.log("neighborhood toggle is checked");

                // don't allow the anchor to visit the link
                e.preventDefault();
                var crime_rate_data;

                $.ajax({
                    url: "/data/crime_rate_toronto.json",
                    dataType: "json",
                    type: "GET",
                    success: function (data) {
                        console.log("SUCCESS:", data);
                        crime_rate_data = data;        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $("#myText").text(jqXHR.statusText);
                        console.log("ERROR:", jqXHR, textStatus, errorThrown);
                    }
                });

                $.ajax({
                    url: "/data/torontohoods.geojson",
                    dataType: "json",
                    type: "GET",
                    success: function (data) {
                        console.log("SUCCESS:", data);
                        map = new google.maps.Map(document.getElementById('map'), {
                            center: {
                                lat: 43.654,
                                lng: -79.383
                            },
                            zoom: 13
                        });
                        addPark(map, parkingStalls);

                        map.data.addGeoJson(data);
                        map.data.setStyle(function(feature) {
                            var code = feature.getProperty('AREA_SHORT_CODE');
                            var color = fullColorHex(51 * Math.round(crime_rate_data[code]), 0, 0);
                            return {
                              fillColor: `#${color}`,
                              strokeWeight: 1
                            };
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $("#myText").text(jqXHR.statusText);
                        console.log("ERROR:", jqXHR, textStatus, errorThrown);
                    }
                });



            } else if ($('#theftControl').prop("checked") == false) {
                console.log($(this).prop("checked"));

                // console.log("neighborhood toggle is unchecked");
                initMap(map);
            }
        });
    });

    // CONTACT THE SERVER AND GET THE DATE FROM THE SERVER
    $('#ajaxButton').click(function (e) {

        console.log("ajax button clicked");

        // don't allow the anchor to visit the link
        e.preventDefault();

        $.ajax({
            url: "/ajax-crime-and-parking",
            dataType: "json",
            type: "GET",
            success: function (data) {
                $("#myText").text("" + data.msg);
                console.log("SUCCESS:", data.msg);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#myText").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }

        });
    });

    $('#crime-button').click(function (e) {

        console.log("crime button clicked");

        // don't allow the anchor to visit the link
        e.preventDefault();

        $.ajax({
            url: "/ajax-getCrimeData",
            dataType: "json",
            type: "GET",
            success: function (data) {

                console.log("SUCCESS:", data.msg);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // $("#myText").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }

        });
    });

    $('#jsonButton').click(function (e) {

        console.log("json button clicked")

        // don't allow the anchor to visit the link
        e.preventDefault();

        $.ajax({
            url: "/data/myJSON.json",
            dataType: "json",
            type: "GET",
            success: function (data) {
                $("#myText").text("" + data.foo);
                console.log("SUCCESS:", data.foo);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#myText").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }

        });
    });


    // a Jquery object which targets the div with id "content", where we will put out list
    var $contents = $('#contents');
    // an immediately invoked function to keep everything contained
    function addItem(rank, imgSrc, title, artist, callback) {
        // define out container
        var $container = $('<div/>', {
            class: 'container hot',
        }).append( // add all the children
            $('<div/>', {
                class: "rank-box",
                text: rank
            }), $('<div/>', {
                class: "album-art"
            }).append(
                $('<img/>', {
                    src: imgSrc
                })
            ), $('<div/>', {
                class: "song-title",
                text: title
            }), $('<div/>', {
                class: "artist",
                text: artist
            })
        ).appendTo($contents); // append our container to contents
        callback();
    }

    function clearContent() {
        $contents.empty()
    }

    function initMap(map) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 43.654,
                lng: -79.383
            },
            zoom: 13
        });

        $.ajax({
            url: "/data/parking-stall-data.json",
            dataType: "json",
            type: "GET",
            success: function (data) {
                console.log("SUCCESS:", data);
                parkingStalls = data;
                addPark(map, parkingStalls);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#myText").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }

        });


    }

});

var rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };

var fullColorHex = function(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red+green+blue;
  };

function addPark(map, data) {
  var features = [];
  for (var i = 0; i < data.carparks.length; i++) {
      features.push({
          position: new google.maps.LatLng(data.carparks[i].lat, data.carparks[i].lng),
          type: 'parking'
        });
  }

  for (var i = 0; i < features.length; i++) {
      var marker = new google.maps.Marker({
        position: features[i].position,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
        map: map
      });
    };
}
