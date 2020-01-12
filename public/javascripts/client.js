$(document).ready(function () {
    console.log("client doc ready");
    initMap();
    var map;
    
    $('#theftControl').click(function (e) {
        $(this).ready(function () {
        if ($('#theftControl').prop("checked") == true) {
            console.log("neighborhood toggle is checked");

            // don't allow the anchor to visit the link
            e.preventDefault();

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
                    map.data.addGeoJson(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#myText").text(jqXHR.statusText);
                    console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }

            });
        } else if($('#theftControl').prop("checked") == false) {
            console.log($(this).prop("checked"));

            // console.log("neighborhood toggle is unchecked");
            map.data.setStyle({visible: false});
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

    $('#crime-button').click(function(e) {

        console.log("crime button clicked");

        // don't allow the anchor to visit the link
        e.preventDefault();

        $.ajax({
            url: "/ajax-getCrimeData",
            dataType: "json",
            type: "GET",
            success: function(data) {
                
                console.log("SUCCESS:", data.msg);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                // $("#myText").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }

        });
    });

    $('#jsonButton').click(function(e) {

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

    var hotLoaded = false;

    $('#AJAX-hot-100').click(function (e) {

        console.log("Hot 100 button clicked");

        // don't allow the anchor to visit the link
        e.preventDefault();

        // style
        $('.topper.hot-100').css("z-index", '1').fadeIn(1000, function () {
            $('.topper.billboard-200').css("z-index", '0').fadeOut(1000);
        });
        $.ajax({
            url: "/ajax-getBillboard",
            dataType: "json",
            type: "GET",
            success: function (chart) {
                // console.log("SUCCESS:", chart);
                // console.log(chart.songs); // prints array of top 100 songs
                // console.log(chart.songs[3]); // prints song with rank: 4
                // console.log(chart.songs[0].title); // prints title of top song
                // console.log(chart.songs[0].artist); // prints artist of top songs
                // console.log(chart.songs[0].rank); // prints rank of top song (1)
                // console.log(chart.songs[0].cover);
                // clearContent();
                for (i = 0; i < chart.songs.length; i++) {
                    let cover;
                    if (chart.songs[i].cover) {
                        cover = chart.songs[i].cover;
                    } else {
                        cover = "https://assets.billboard.com/assets/1554150270/images/charts/bb-placeholder-new.jpg?3480059e7bb0a7a12a1e"
                    }
                    addItem(chart.songs[i].rank, cover, chart.songs[i].title, chart.songs[i].artist, function () {
                        $('.billboard').slideUp(1000, function () {
                            $('.billboard').remove();
                        });
                    });

                    console.log(chart);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#myText").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });

    var billboardLoaded = false;

    $('#AJAX-billboard-200').click(function (e) {

        console.log("Billboard 200 button clicked");

        // don't allow the anchor to visit the link
        e.preventDefault();

        $('.topper.billboard-200').fadeIn(1000, function () {
            $('.topper.hot-100').fadeOut(1000);
        });
        $.ajax({
            url: "/ajax-getBillboard2",
            dataType: "html",
            type: "GET",
            success: function (html) {
                console.log("Success");
                console.log(html);
                $('#contents').append(html)
                $('.hot').slideUp(1000, function () {
                    $('.hot').remove();
                });
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

    var map;

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.654, lng: -79.383},
        zoom: 13
      });
    }
  
});
