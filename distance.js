<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=true&libraries=places"></script>

// Toshiba HQ - 1-1, Shibaura 1-Chome, Minato-Ku, , Japan
    <script type="text/javascript">
       {/* https://jsfiddle.net/roysw/64tcxmao/17/ */}
        </script>
      var map;
      var infowindow;
      var service;
      function initialize(lat,lng) 
      {
        var origin = new google.maps.LatLng(lat,lng);
       
        map = new google.maps.Map(document.getElementById('map'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: origin,
          zoom: 14.9
        });
        
        var request = {
          location: origin,
          radius: 700,
          
          types: ['train_station','bus_station','subway_station','transit_station']
        };
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.search(request, callback);
      }

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
      
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        var content='<strong style="font-size:1.2em">'+place.name+'</strong>'+
                    '<br/><strong>Latitude:</strong>'+placeLoc.lat()+
                    '<br/><strong>Longitude:</strong>'+placeLoc.lng()+
                    '<br/><strong>Type:</strong>'+place.types[0]+
                    '<br/><strong>Rating:</strong>'+(place.rating||'n/a');
        var more_content='<img src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly&channel=2/>';
        
        //make a request for further details
        service.getDetails({reference:place.reference}, function (place, status) 
                                    {
                                      if (status == google.maps.places.PlacesServiceStatus.OK) 
                                      {
                                        more_content='<hr/><strong><a href="'+place.url+'" target="details">Details</a>';
                                        
                                        if(place.website)
                                        {
                                          more_content+='<br/><br/><strong><a href="'+place.website+'" target="details">'+place.website+'</a>';
                                        }
                                      }
                                    });


        google.maps.event.addListener(marker, 'click', function() {
          
          infowindow.setContent(content+more_content);
          infowindow.open(map, this);
        });
      }

      google.maps.event.addDomListener(window, 'load', function(){initialize(35.648819,139.754677);});
    </script>
    <div id="map" style="height:400px;"></div>