
// Map variable with center and zoom
var map = L.map('maprouting').setView([41.74403206040221, -72.68307359815084], 14);


// Basemap -  Open Street Map
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      accessToken: mapbox_access_token,
  }).addTo(map);

// Districts geojson added
  L.geoJson(districts, {
          	style: function (feature) {
          		return {
                color: 'grey',
                fillOpacity: '0',
                weight: 1,
                opacity: 1
              };
          	},
          }).addTo(map);

// Bike routes geojson added
  L.geoJson(bike_routes, {
            style: function (feature) {
              return {
                color: 'red',
                fillOpacity: '0',
                weight: 1,
                opacity: 1
              };
            },
          }).addTo(map);

// Green spaces added from geojson, adding popup information
var green = L.geoJson(greenspaces, {
        	style: function (feature) {
        		return {
              color: 'green',
              fillOpacity: '0.6',
              weight: 1
            };
        	},
        	onEachFeature: function (feature, layer) {
        		  layer.bindPopup(feature.properties.popupContent);
        	},
        }).addTo(map);

  green.on('click', function(e){
    map.setView(e.latlng, 16);
  })


// Reset View plug in
  L.control.resetView({
      position: "topleft",
      title: "Reset view",
      latlng: L.latLng([41.741989, -72.686727]),
      zoom: 13,
  }).addTo(map);


// Legend of layers
var legend = L.control({ position: "bottomright" });
  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += '<i style="background: green"></i><span>Green Spaces</span><br>';
    div.innerHTML += '<i style="background: grey"></i><span>Neighborhood Boundaries</span><br>';
    div.innerHTML += '<i style="background: red"></i><span>Bike Routes</span><br>';
    return div;
  };
legend.addTo(map);


// Scale bar
L.control.scale().addTo(map);


// Search Bar
var searchControl = new L.Control.Search({
		layer: green,
		propertyName: 'name',
		marker: false,
    position: "topleft",
		moveToLocation: function(latlng, title, map) {
  			map.setView(latlng, 16);
		}
	});

	searchControl.on('search:locationfound', function(e) {
		if(e.layer._popup)
			e.layer.openPopup();

	}).on('search:collapsed', function(e) {
		featuresLayer.eachLayer(function(layer) {
		});
	});

	map.addControl(searchControl);


/// Routing

var routeOn = L.easyButton({
  states: [{
    stateName: 'route',
    icon: 'fa-map-marker',
    title: 'add a route option',
    onClick: function(btn, map) {
      map.setView([41.74403206040221, -72.68307359815084], 15);
      btn.state('no-route');
    }
  }, {
  stateName: 'no-route',
    icon: 'fa-map-marker',
    title: 'remove route option',
    onClick: function(btn, map) {
        map.setView([41.74403206040221, -72.68307359815084], 15);
        btn.state('route');
    }
  }]
});
/*routeOn.addTo(map); */


L.easyButton( 'fa-map-marker', function(){

  function button(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }

  var control = L.Routing.control({
      waypoints: [null],
      routeWhileDragging: true,
      show: true,
      autoRoute: true,
      lineOptions: {
        styles: [{color: 'blue', opacity: 1, weight: 5}]
      }
  }).addTo(map);

  map.on('click', function (e) {
      var container = L.DomUtil.create('div'),
          startBtn = button('Start here', container),
          destBtn = button('End here', container);

      L.DomEvent.on(startBtn, 'click', function () {
          control.spliceWaypoints(0, 1, e.latlng);
          map.closePopup();
      });

      L.DomEvent.on(destBtn, 'click', function () {
          control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
          map.closePopup();
      });

      L.popup().setContent(container).setLatLng(e.latlng).openOn(map);
  });

  map.flyTo([41.74403206040221, -72.68307359815084], 15)
}).addTo(map);

/*
$scope.routingControl =  L.Routing.control({
    waypoints: [
        L.latLng(fromLat, fromLng),
        L.latLng(toLat, toLng)
    ]
  }).addTo(map);

  $scope.removeRouting = function() {
      leafletData.getMap().then(function(map) {
          map.removeControl($scope.routingControl);
      });
  };
*/

// waypoints: [
//   L.latLng(41.753988, -72.696626),
//   L.latLng(41.752707, -72.666843)
// ],

//Esri basemap selector code ***
/*
// the L.esri.Vector.vectorBasemapLayer basemap enum defaults to 'ArcGIS:Streets' if omitted
/*vectorTiles.Default = L.esri.Vector.vectorBasemapLayer(null, {
  apiKey
});
allEnums.forEach((enumString) => {
  vectorTiles[enumString] = L.esri.Vector.vectorBasemapLayer(enumString, {
    apiKey
  });
});  */
 const vectorTiles = {};
 const allEnums = [
   "ArcGIS:Imagery",
   "ArcGIS:Imagery:Standard",
   "ArcGIS:Imagery:Labels",
   "ArcGIS:LightGray",
   "ArcGIS:LightGray:Base",
   "ArcGIS:LightGray:Labels",
   "ArcGIS:DarkGray",
   "ArcGIS:DarkGray:Base",
   "ArcGIS:DarkGray:Labels",
   "ArcGIS:Navigation",
   "ArcGIS:NavigationNight",
   "ArcGIS:Streets",
   "ArcGIS:StreetsNight",
   "ArcGIS:StreetsRelief",
   "ArcGIS:StreetsRelief:Base",
   "ArcGIS:Topographic",
   "ArcGIS:Topographic:Base",
   "ArcGIS:Oceans",
   "ArcGIS:Oceans:Base",
   "ArcGIS:Oceans:Labels",
   "OSM:Standard",
   "OSM:StandardRelief",
   "OSM:StandardRelief:Base",
   "OSM:Streets",
   "OSM:StreetsRelief",
   "OSM:StreetsRelief:Base",
   "OSM:LightGray",
   "OSM:LightGray:Base",
   "OSM:LightGray:Labels",
   "OSM:DarkGray",
   "OSM-DarkGray:Base",
   "OSM-DarkGray:Labels",
   "ArcGIS:Terrain",
   "ArcGIS:Terrain:Base",
   "ArcGIS:Terrain:Detail",
   "ArcGIS:Community",
   "ArcGIS:ChartedTerritory",
   "ArcGIS:ChartedTerritory:Base",
   "ArcGIS:ColoredPencil",
   "ArcGIS:Nova",
   "ArcGIS:ModernAntique",
   "ArcGIS:ModernAntique:Base",
   "ArcGIS:Midcentury",
   "ArcGIS:Newspaper",
   "ArcGIS:Hillshade:Light",
   "ArcGIS:Hillshade:Dark"
 ];

 /* vectorTiles.Default = L.esri.Vector.vectorBasemapLayer(null, {
       apiKey
     });
     allEnums.forEach((enumString) => {
       vectorTiles[enumString] = L.esri.Vector.vectorBasemapLayer(enumString, {
apiKey       });
     }); */

     L.control
       .layers(vectorTiles, null, {
         collapsed: false
       })
       .addTo(map);

     vectorTiles.Default.addTo(map);
