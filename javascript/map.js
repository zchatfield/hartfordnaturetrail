
// Map variable with center and zoom
var map = L.map('mapid').setView([41.74403206040221, -72.68307359815084], 14);


// Basemap -  Open Street Map
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      accessToken: mapbox_access_token,
  }).addTo(map);

 // L.control
 //   .layers(vectorTiles, null, {
 //     collapsed: false
 //   })
 //   .addTo(map);

//vectorTiles.Default.addTo(map);
//BASEMAP Option 2: Topographic
  //Still need to figure out how to make this appear or find a better basemap
/* L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}); */

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
      latlng: L.latLng([41.74403206040221, -72.68307359815084]),
      zoom: 14,
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
