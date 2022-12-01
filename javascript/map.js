
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
      color: 'red',
      weight: 1,
      opacity: 1,
      fillOpacity: 0
    };
  }

  L.geoJson(districts, {style: style1}).addTo(map);

// Green spaces added
  function style2(feature) {
    return {
      color: 'green',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.4
    };
  }

  L.geoJson(greenspaces, {style: style2}).addTo(map);

// Reset View plug in
  L.control.resetView({
      position: "topleft",
      title: "Reset view",
      latlng: L.latLng([41.7658, -72.6734]),
      zoom: 12,
  }).addTo(map);



// Markers
  var pope = L.marker([41.755703, -72.697853]).addTo(map);

  pope.bindPopup(
    '<h4>Pope Park</h4>'
    );

  pope.on('click', function(e){
    map.setView(e.latlng, 16);
  })



  // Polygon
    // var polygon = L.polygon([
    //   [-72.70142761607477, 41.75811596169146],
    //   [-72.70123311900966, 41.757390519477696],
    //   [-72.7015921905141, 41.756519977997215],
    //   [-72.70240010139781, 41.75567174673489],
    //   [-72.70232529483418, 41.75509137151744],
    //   [-72.7015473065754, 41.75461144189293],
    //   [-72.70145753869973, 41.75445518496173],
    //   [-72.70183157151621, 41.75365157187727],
    //   [-72.69834558566467, 41.752914917710996],
    //   [-72.69756759740505, 41.75298188662126],
    //   [-72.69735813902788, 41.75394176665168],
    //   [-72.69625100189047, 41.7541873150513],
    //   [-72.6950989808152, 41.75426544389052],
    //   [-72.69445564437, 41.75455563588946],
    //   [-72.69409657286553, 41.755403881902396],
    //   [-72.69409657286553, 41.75637488660277],
    //   [-72.69430603124356, 41.75734587661205],
    //   [-72.69415641811628, 41.75813828286002],
    //   [-72.70033544024943, 41.75829453082497],
    //   [-72.70142761607477,41.75811596169146]
    // ]).addTo(map);
