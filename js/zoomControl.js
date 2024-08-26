document.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById('map');

  // Check if a map instance is already associated
  if (mapContainer._leaflet_id) {
    console.warn("Map is already initialized.");
    return;
  }

  // Initialize the map
  const map = L.map(mapContainer).setView([0, 0], 2);

  L.tileLayer('images/campus-map.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const initialPinPosition = [0, 0];
  const marker = L.marker(initialPinPosition).addTo(map);

  map.on('click', function (e) {
    marker.setLatLng(e.latlng);
  });

  L.control.scale().addTo(map);
});