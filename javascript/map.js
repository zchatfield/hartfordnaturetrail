
// Map variable with center and zoom
var map = L.map('mapid').setView([41.7658, -72.6734], 12);


// Basemap
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      accessToken: mapbox_access_token,
  }).addTo(map);

// Districts geojson added
  L.geoJson(districts).addTo(map);

// Reset View plug in
  L.control.resetView({
      position: "topleft",
      title: "Reset view",
      latlng: L.latLng([41.7658, -72.6734]),
      zoom: 12,
  }).addTo(map);


// Markers
  var green1 = L.marker([41.764457, -72.677295]).addTo(map);

  green1.bindPopup(
    '<h4>Bushnell Park</h4>'
    );

  green1.on('click', function(e){
    map.setView(e.latlng, 16);
  })
