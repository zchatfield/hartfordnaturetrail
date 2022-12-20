
// Map variable with center and zoom
var map = L.map('maprouting').setView([41.741026389505876, -72.6868740655906], 14);

// Esri Basemap
  const apiKey = arc_apikey;

  const basemapEnum = "ArcGIS:Navigation";

  L.esri.Vector.vectorBasemapLayer(basemapEnum, {
    apiKey: apiKey
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

// Recommended trailroutes
var routes = L.geoJson(suggestedroutes, {
  style: function (feature){
    return {
      color: 'black',
      fillOpacity:'0',
      weight:3,
      opacity:1
    };
  },
  onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.popupContent);
  },
}).addTo(map);


// Reset View plug in
  L.control.resetView({
      position: "topleft",
      title: "Reset view",
      latlng: L.latLng([41.741026389505876, -72.6868740655906]),
      zoom: 14,
  }).addTo(map);


// Legend of layers
var legend = L.control({ position: "bottomleft" });
  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += '<i style="background: green"></i><span>Green Spaces</span><br>';
    div.innerHTML += '<i style="background: grey"></i><span>Neighborhood Boundaries</span><br>';
    div.innerHTML += '<i style="background: red"></i><span>Bike Routes</span><br>';
    div.innerHTML += '<i style="background: black"></i><span>Suggested Routes</span><br>';
    return div;
  };
legend.addTo(map);


// Scale bar
L.control.scale().addTo(map);


// Full Screen
map.addControl(new L.Control.Fullscreen());


/// Routing
L.easyButton( 'fa-map-marker', function(){

  function button(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }

  var control = L.Routing.control({
      waypoints: [null],
      collapsible: true,
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
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
}).addTo(map);


// Selector for green spaces
var selector = L.control({
  position: 'topleft'
});

selector.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'mySelector');
  div.innerHTML = '<select id="marker_select"><option value="init">(select a green space)</option></select>';
  return div;
};

selector.addTo(map);

green.eachLayer(function(layer) {
  var optionElement = document.createElement("option");
  optionElement.innerHTML = layer.feature.properties.name;
  optionElement.value = layer._leaflet_id;
  L.DomUtil.get("marker_select").appendChild(optionElement);
});

var marker_select = L.DomUtil.get("marker_select");

L.DomEvent.addListener(marker_select, 'click', function(e) {
  L.DomEvent.stopPropagation(e);
});

L.DomEvent.addListener(marker_select, 'change', changeHandler);

function changeHandler(e) {
  if (e.target.value == "init") {
    map.closePopup();
  } else {
    green.getLayer(e.target.value).openPopup();
  }
}

// Selector for Routes
var selector2 = L.control({
  position: 'topleft'
});

selector2.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'mySelector');
  div.innerHTML = '<select id="marker_select2"><option value="init">(select a suggested route)</option></select>';
  return div;
};

selector2.addTo(map);

routes.eachLayer(function(layer) {
  var optionElement = document.createElement("option");
  optionElement.innerHTML = layer.feature.properties.name;
  optionElement.value = layer._leaflet_id;
  L.DomUtil.get("marker_select2").appendChild(optionElement);
});

var marker_select2 = L.DomUtil.get("marker_select2");

L.DomEvent.addListener(marker_select2, 'click', function(e) {
  L.DomEvent.stopPropagation(e);
});

L.DomEvent.addListener(marker_select2, 'change', changeHandler2);

function changeHandler2(e) {
  if (e.target.value == "init") {
    map.closePopup();
  } else {
    routes.getLayer(e.target.value).openPopup();
  }
}
