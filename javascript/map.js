var map = L.map('mapid').setView([41.7658, -72.6734], 12);



  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      accessToken: mapbox_access_token,
  }).addTo(map);

  L.geoJson(districts).addTo(map);
