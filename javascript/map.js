
// Esri Basemaps
const apiKey = arc_apikey;

var map = L.map('mapid').setView([41.741026389505876, -72.6868740655906], 14);

      const vectorTiles = {};
      const allEnums = [
        "ArcGIS:Imagery",
        "ArcGIS:LightGray",
        "ArcGIS:Navigation",
        "ArcGIS:Terrain",
        "ArcGIS:Community",
        "ArcGIS:ColoredPencil",
      ];

  // Basemap layers beyond the default
      vectorTiles.Default = L.esri.Vector.vectorBasemapLayer(null, {
        apiKey
      });
      allEnums.forEach((enumString) => {
        vectorTiles[enumString] = L.esri.Vector.vectorBasemapLayer(enumString, {
          apiKey
        });
      });

      L.control
        .layers(vectorTiles, null, {
          collapsed: false
        })
        .addTo(map);

      vectorTiles.Default.addTo(map);


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
      latlng: L.latLng([41.741026389505876, -72.6868740655906]),
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


// Full Screen
map.addControl(new L.Control.Fullscreen());


// Search bar --> with filtered option
var fuse = new Fuse(greenspaces.features, {
  keys: [
    'properties.name',
    'properties.description',
  ]
});

var searchControl = new L.Control.Search({
		layer: green,
		propertyName: 'name',
		marker: false,
    autoType: true,
    position: "topleft",
		moveToLocation: function(latlng, title, map) {
  			map.setView(latlng, 16);
		},
    filterData: function(text, records) {
      var jsons = fuse.search(text),
        ret = {}, key;

      for(var i in jsons) {
        key = jsons[i].properties.name;
        ret[ key ]= records[key];
      }

      console.log(jsons,ret);
      return ret;
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
