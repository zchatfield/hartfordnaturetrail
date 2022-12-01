var mymap = L.map('mapid').setView([0, 0], 1);

 /* L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      maxZoom: 18,
      id: 'mapbox/satellite-streets-v11',
      accessToken: mapbox_access_token,
  }).addTo(mymap);*/

 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
  }).addTo(mymap);

/*
  var marker = L.marker([51.5, -0.09]).addTo(mymap);

  var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(mymap);

  var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
  ]).addTo(mymap);

  var polyline = L.polyline([
    [51.506, -0.08],
    [51.502, -0.06],
    [51.507, -0.047]
  ]).addTo(mymap);

  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  circle.bindPopup("I am a circle.");
  polygon.bindPopup("I am a polygon.");

  marker.on('click', function(e){
    mymap.setView(e.latlng, 13);
  });

  circle.on('click', function(e){
    mymap.setView(e.latlng, 13);
  });

  polygon.on('click', function(e){
    mymap.setView(e.latlng, 13);
  });
*/
//OPEN CAGE PLUG IN
  //new CODE
  var options = {
    key: geocoder_api_key,
    limit:10
  };

  var control = L.Control.openCageGeocoding(options).addTo(mymap);

/* old code
  var options = {
    key: geocoder_api_key,
    limit:10
  };

  var control = L.control.openCageSearch(options).addTo(mymap); */

//SEVEN WONDERS OF THE WORLD
  var marker1 = L.marker([27.174961, 78.042385]).addTo(mymap);
  var marker2 = L.marker([40.334245, 116.477652]).addTo(mymap);
  var marker3 = L.marker([30.328611, 35.441944]).addTo(mymap);
  var marker4 = L.marker([-22.951389, -43.2108334]).addTo(mymap);
  var marker5 = L.marker([-13.163056, -72.545556]).addTo(mymap);
  var marker6 = L.marker([20.682778, -88.569167]).addTo(mymap);
  var marker7 = L.marker([41.890169, 12.492269]).addTo(mymap);
  // add unique marker symbols
  //add custom pop up windows for each
  //pop up window info: name of landmark in bold, a photo the landmark,
    //and a short paragraph about each landmark
marker1.bindPopup('<img src="images/tajmahal.jpeg" width=150 height=100/><br><b>India\'s Taj Mahal</b><br>The Taj Mahal is an Islamic ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.')
marker2.bindPopup('<img src="images/great-wall.jpeg" width=150 height=100/><br><b>Great Wall of China</b></br>The Great Wall of China (traditional Chinese: 萬里長城; simplified Chinese: 万里长城; pinyin: Wànlǐ Chángchéng) is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.')
marker3.bindPopup('<img src="images/petra.jpeg" width=150 height=100/><br><b>Petra in Jordan</b><br>Petra (Arabic: ٱلْبَتْرَاء, romanized: Al-Batrāʾ; Ancient Greek: Πέτρα, "Rock", Nabataean: 𐢛𐢚𐢓𐢈‎), originally known to its inhabitants as Raqmu or Raqēmō, is a historic and archaeological city in southern Jordan. It is adjacent to the mountain of Jabal Al-Madbah, in a basin surrounded by mountains forming the eastern flank of the Arabah valley running from the Dead Sea to the Gulf of Aqaba.')
marker4.bindPopup('<img src="images/christ.jpeg" width=75 height=125/><br><b>Brazil\'s statue of Christ the Redeemer</b><br>Christ the Redeemer (Portuguese: Cristo Redentor, standard Brazilian Portuguese: [ˈkɾistu ʁedẽˈtoʁ], local pronunciation: [ˈkɾiɕtŭ̥ xe̞dẽˈtoɦ]) is an Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil, created by French sculptor Paul Landowski and built by Brazilian engineer Heitor da Silva Costa, in collaboration with French engineer Albert Caquot. Romanian sculptor Gheorghe Leonida fashioned the face. Constructed between 1922 and 1931, the statue is 30 metres (98 ft) high, excluding its 8-metre (26 ft) pedestal. The arms stretch 28 metres (92 ft) wide. It is made of reinforced concrete and soapstone.')
marker5.bindPopup('<img src="images/Machu-Picchu.jpeg" width=150 height=100/><br><b>Peru\'s Machu Picchu</b><br>Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-meter (7,970 ft) mountain ridge. It is located in the Machupicchu District within Urubamba Province above the Sacred Valley, which is 80 kilometers (50 mi) northwest of Cusco. The Urubamba River flows past it, cutting through the Cordillera and creating a canyon with a tropical mountain climate.')
marker6.bindPopup('<img src="images/chichen-itza.jpeg" width=150 height=100/><br><b>Mexico\'s Chichen Itza Pyramid</b><br>Chichen Itza was a large pre-Columbian city built by the Maya people of the Terminal Classic period. The archeological site is located in Tinúm Municipality, Yucatán State, Mexico.')
marker7.bindPopup('<img src="images/colosseum.jpeg" width=150 height=100/><br><b>The Colosseum in Rome</b><br>The Colosseum (/ˌkɒləˈsiːəm/ KOL-ə-SEE-əm; Italian: Colosseo [kolosˈsɛːo]) is an oval amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum. It is the largest ancient amphitheatre ever built, and is still the largest standing amphitheatre in the world today, despite its age.')

//ZOOM VIEWER
var ZoomViewer = L.Control.extend({
    onAdd: function(){
      var gauge = L.DomUtil.create('div');
      gauge.style.width = '200px';
      gauge.style.background = 'rgba(255,255,255,0.5)';
      gauge.style.textAlign = 'left';
      mymap.on('zoomstart zoom zoomend', function(ev){
        gauge.innerHTML = 'Zoom level: ' + mymap.getZoom();
      })
      return gauge;
    }
  });

  (new ZoomViewer).addTo(mymap);

      //ADD FOUR PLUG INS!

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
//ZOOMSLIDER PLUGIN TRY without full code
/* var ZoomSlider = L.Control.Zoomslider()
(new ZoomSlider).addTo(mymap); */

//TIME ZONES PLUGIN
//L.timezones.addTo(mymap);
L.timezones.bindPopup(function (layer) {
    return layer.feature.properties.time_zone;
}).addTo(mymap);

//RAIN VIEWER PLUGIN
// Change default options
L.control.rainviewer({
    position: 'bottomleft',
    nextButtonText: '>',
    playStopButtonText: 'Play/Stop',
    prevButtonText: '<',
    positionSliderLabelText: "Hour:",
    opacitySliderLabelText: "Opacity:",
    animationInterval: 500,
    opacity: 0.5
}).addTo(mymap);

//COUNTRY SEARCH PLUGIN
var select = L.countrySelect({title:'Pick a country!'});
var select = L.countrySelect().addTo(mymap);

select.on('change', function(e){
	if(e.feature === undefined){ //No action when the first item ("Country") is selected
		return;
	}
	var country = L.geoJson(e.feature);
	if (this.previousCountry != null){
		mymap.removeLayer(this.previousCountry);
	}
	this.previousCountry = country;

	mymap.addLayer(country);
	mymap.fitBounds(country.getBounds());

});

//  mymap.setView([0, 0], 1);
