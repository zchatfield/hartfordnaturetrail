
// Map variable with center and zoom
var map = L.map('mapid').setView([41.7658, -72.6734], 12);


// Basemap
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      accessToken: mapbox_access_token,
  }).addTo(map);

// Districts geojson added
  function style1(feature) {
    return {
      color: 'black',
      weight: 1,
      opacity: 1,
      fillOpacity: 0
    };
  }

  L.geoJson(districts, {style: style1}).addTo(map);

// Green spaces added

green = L.geoJson(greenspaces, {
        	style: function (feature) {
        		return {
              color: 'green',
              fillOpacity: '0.4',
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
      latlng: L.latLng([41.7658, -72.6734]),
      zoom: 12,
  }).addTo(map);
