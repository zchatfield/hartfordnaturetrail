
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

// Recommended trailroutes
/* var trails = L.geoJson(routes,{
  style: function (feature){
    return{
      color: 'dark green',
      weight:1,
      opacity:1
    };
  },
}).addTo(map); */


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


/// Routing

// var routeOn = L.easyButton({
//   states: [{
//     stateName: 'route',
//     icon: 'fa-map-marker',
//     title: 'add a route option',
//     onClick: function(btn, map) {
//       map.setView([41.74403206040221, -72.68307359815084], 15);
//       btn.state('no-route');
//     }
//   }, {
//   stateName: 'no-route',
//     icon: 'fa-map-marker',
//     title: 'remove route option',
//     onClick: function(btn, map) {
//         map.setView([41.74403206040221, -72.68307359815084], 15);
//         btn.state('route');
//     }
//   }]
// });
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

  map.flyTo([41.743988, -72.673088], 14)
}).addTo(map);


//SELECT BASEMAPS

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

 vectorTiles.Default = L.esri.Vector.vectorBasemapLayer(null, {
       apiKey
     });
     allEnums.forEach((enumString) => {
       vectorTiles[enumString] = L.esri.Vector.vectorBasemapLayer(enumString, {
apiKey       });
     });

     L.control
       .layers(vectorTiles, null, {
         collapsed: false
       })
       .addTo(map);

     vectorTiles.Default.addTo(map);

//PRINT

L.easyPrint({
  title: 'Print',
	position: 'topleft',
	sizeModes: ['A4Portrait', 'A4Landscape']
}).addTo(map);


		var popup = L.popup();


		var printer = L.easyPrint({
      		tileLayer: tiles,
      		sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
      		filename: 'myMap',
      		exportOnly: true,
      		hideControlContainer: true
		}).addTo(map);

		function manualPrint () {
			printer.printMap('CurrentSize', 'MyManualPrint')
		}
/*
var printPlugin = L.easyPrint({
	hidden: false,
	sizeModes: ['A4Portrait']
}).addTo(map);
printPlugin.printMap('A4Portrait', 'MyFileName');

var a3Size = {
	width: 2339,
	height: 3308,
	className: 'a3CssClass',
	tooltip: 'A custom A3 size'
}

//ZOOM SLIDER FULL CODE PLUG IN
  L.Control.Zoomslider = (function () {

  	var Knob = L.Draggable.extend({
  		initialize: function (element, stepHeight, knobHeight) {
  			L.Draggable.prototype.initialize.call(this, element, element);
  			this._element = element;

  			this._stepHeight = stepHeight;
  			this._knobHeight = knobHeight;

  			this.on('predrag', function () {
  				this._newPos.x = 0;
  				this._newPos.y = this._adjust(this._newPos.y);
  			}, this);
  		},

  		_adjust: function (y) {
  			var value = Math.round(this._toValue(y));
  			value = Math.max(0, Math.min(this._maxValue, value));
  			return this._toY(value);
  		},

  		// y = k*v + m
  		_toY: function (value) {
  			return this._k * value + this._m;
  		},
  		// v = (y - m) / k
  		_toValue: function (y) {
  			return (y - this._m) / this._k;
  		},

  		setSteps: function (steps) {
  			var sliderHeight = steps * this._stepHeight;
  			this._maxValue = steps - 1;

  			// conversion parameters
  			// the conversion is just a common linear function.
              this._k = -this._stepHeight;
              this._m = sliderHeight - (this._stepHeight + this._knobHeight) / 2;
  		},

  		setPosition: function (y) {
  			L.DomUtil.setPosition(this._element,
  								  L.point(0, this._adjust(y)));
  		},

  		setValue: function (v) {
  			this.setPosition(this._toY(v));
  		},

  		getValue: function () {
  			return this._toValue(L.DomUtil.getPosition(this._element).y);
  		}
  	});

  	var Zoomslider = L.Control.extend({
  		options: {
  			position: 'topleft',
  			// Height of zoom-slider.png in px
  			stepHeight: 8,
  			// Height of the knob div in px (including border)
  			knobHeight: 6,
  			styleNS: 'leaflet-control-zoomslider'
  		},

  		onAdd: function (map) {
  			this._map = map;
  			this._ui = this._createUI();
  			this._knob = new Knob(this._ui.knob,
  								  this.options.stepHeight,
  								  this.options.knobHeight);

  			map .whenReady(this._initKnob,           this)
  				.whenReady(this._initEvents,         this)
  				.whenReady(this._updateSize,         this)
  				.whenReady(this._updateKnobValue,    this)
  				.whenReady(this._updateDisabled,     this);
  			return this._ui.bar;
  		},

  		onRemove: function (map) {
  			map .off('zoomlevelschange',         this._updateSize,      this)
  				.off('zoomend zoomlevelschange', this._updateKnobValue, this)
  				.off('zoomend zoomlevelschange', this._updateDisabled,  this);
  		},

  		_createUI: function () {
  			var ui = {},
  				ns = this.options.styleNS;

  			ui.bar     = L.DomUtil.create('div', ns + ' leaflet-bar'),
  			ui.zoomIn  = this._createZoomBtn('in', 'top', ui.bar),
  			ui.wrap    = L.DomUtil.create('div', ns + '-wrap leaflet-bar-part', ui.bar),
  			ui.zoomOut = this._createZoomBtn('out', 'bottom', ui.bar),
  			ui.body    = L.DomUtil.create('div', ns + '-body', ui.wrap),
  			ui.knob    = L.DomUtil.create('div', ns + '-knob');

  			L.DomEvent.disableClickPropagation(ui.bar);
  			L.DomEvent.disableClickPropagation(ui.knob);

  			return ui;
  		},
  		_createZoomBtn: function (zoomDir, end, container) {
  			var classDef = this.options.styleNS + '-' + zoomDir
  					+ ' leaflet-bar-part'
  					+ ' leaflet-bar-part-' + end,
  				link = L.DomUtil.create('a', classDef, container);

  			link.href = '#';
  			link.title = 'Zoom ' + zoomDir;

  			L.DomEvent.on(link, 'click', L.DomEvent.preventDefault);

  			return link;
  		},

  		_initKnob: function () {
  			this._knob.enable();
  			this._ui.body.appendChild(this._ui.knob);
  		},
  		_initEvents: function (map) {
  			this._map
  				.on('zoomlevelschange',         this._updateSize,      this)
  				.on('zoomend zoomlevelschange', this._updateKnobValue, this)
  				.on('zoomend zoomlevelschange', this._updateDisabled,  this);

  			L.DomEvent.on(this._ui.body,    'click', this._onSliderClick, this);
  			L.DomEvent.on(this._ui.zoomIn,  'click', this._zoomIn,        this);
  			L.DomEvent.on(this._ui.zoomOut, 'click', this._zoomOut,       this);

  			this._knob.on('dragend', this._updateMapZoom, this);
  		},

  		_onSliderClick: function (e) {
  			var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
  				y = L.DomEvent.getMousePosition(first, this._ui.body).y;

  			this._knob.setPosition(y);
  			this._updateMapZoom();
  		},

  		_zoomIn: function (e) {
  			this._map.zoomIn(e.shiftKey ? 3 : 1);
  		},
  		_zoomOut: function (e) {
  			this._map.zoomOut(e.shiftKey ? 3 : 1);
  		},

  		_zoomLevels: function () {
  			var zoomLevels = this._map.getMaxZoom() - this._map.getMinZoom() + 1;
  			return zoomLevels < Infinity ? zoomLevels : 0;
  		},
  		_toZoomLevel: function (value) {
  			return value + this._map.getMinZoom();
  		},
  		_toValue: function (zoomLevel) {
  			return zoomLevel - this._map.getMinZoom();
  		},

  		_updateSize: function () {
  			var steps = this._zoomLevels();

  			this._ui.body.style.height = this.options.stepHeight * steps + 'px';
  			this._knob.setSteps(steps);
  		},
  		_updateMapZoom: function () {
  			this._map.setZoom(this._toZoomLevel(this._knob.getValue()));
  		},
  		_updateKnobValue: function () {
  			this._knob.setValue(this._toValue(this._map.getZoom()));
  		},
  		_updateDisabled: function () {
  			var zoomLevel = this._map.getZoom(),
  				className = this.options.styleNS + '-disabled';

  			L.DomUtil.removeClass(this._ui.zoomIn,  className);
  			L.DomUtil.removeClass(this._ui.zoomOut, className);

  			if (zoomLevel === this._map.getMinZoom()) {
  				L.DomUtil.addClass(this._ui.zoomOut, className);
  			}
  			if (zoomLevel === this._map.getMaxZoom()) {
  				L.DomUtil.addClass(this._ui.zoomIn, className);
  			}
  		}
  	});

  	return Zoomslider;
  })();

  L.Map.mergeOptions({
  	zoomControl: false,
  	zoomsliderControl: true
  });

  L.Map.addInitHook(function () {
  	if (this.options.zoomsliderControl) {
  		this.zoomsliderControl = new L.Control.Zoomslider();
  		this.addControl(this.zoomsliderControl);
  	}
  });

  L.control.zoomslider = function (options) {
  	return new L.Control.Zoomslider(options);
  };
*/
var ZoomSlider = L.Control.Zoomslider()
(new ZoomSlider).addTo(map);
