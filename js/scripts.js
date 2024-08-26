import { handleButton as showLockButton } from "./lockInButton.js";

let guessPin = null;
let currentImageIndex = 0;
let currentImage = imagesList[currentImageIndex];
let userScore = 0;
let highScore = 0;
const correctRange = 100; // 100 meters

const pinWidth = 16; // Should match .map-pin width in CSS
const pinHeight = 24; // Should match .map-pin height in CSS

function getRandomCoordinates(top_left, bottom_right) {
  const getRandomInRange = (min, max) => Math.random() * (max - min) + min;

  return {
    lat: getRandomInRange(top_left.x, bottom_right.x),
    long: getRandomInRange(top_left.y, bottom_right.y),
  };
}

document.addEventListener("DOMContentLoaded", function () {

  const mapImage = document.getElementById("map");
  const imageContainer = document.getElementById("image-container");
  const lockInButton = document.getElementById("lockInButton");
  const testImage = document.getElementById("testImage");
  const distanceDisplay = document.querySelector('.image-actual-distance');
  const scoreDisplay = document.querySelector('.image-total-score');
  const highScoreDisplay = document.querySelector('.image-total-highscore');

  // Initialize random coordinates for each image
  imagesList.forEach(image => {
    const coords = getRandomCoordinates({ x: 39.163060, y: -86.53067 }, { x: 39.163060, y: -86.5079993 });
    image.lat = coords.lat;
    image.long = coords.long;
  });

  function updateUI() {
    testImage.src = currentImage.src;
    scoreDisplay.textContent = `Score: ${userScore}`;
    highScoreDisplay.textContent = `Highscore: ${highScore}`;
  }

  // Set up map using Leaflet
  const mapContainer = document.getElementById('image-container');
  const map = L.map(mapContainer, {
    crs: L.CRS.Simple,
    minZoom: -0.75,
    maxZoom: 4
  });

  const imgWidth = 712;
  const imgHeight = 1040;

  const bounds = [[0, 0], [imgWidth, imgHeight]];
  L.imageOverlay('images/campus-map.png', bounds).addTo(map);
  map.setView([imgWidth / 2, imgHeight / 2], 0);
  map.fitBounds(bounds);

  const userMarker = L.marker([imgWidth / 2, imgHeight / 2], { draggable: true }).addTo(map).on('dragend', function(e) {
    lockInButton.disabled = false;
  });

  updateUI();

  lockInButton.addEventListener('click', function () {
    const userLatLng = userMarker.getLatLng();
    const { lat, long } = currentImage;

    // Plot the actual location marker
    const actualMarker = L.marker([lat, long], { icon: L.icon({iconUrl: 'images/map-pin.svg', iconSize: [16, 24] }) }).addTo(map);

    // Draw a line between user guess and actual location
    const polyline = L.polyline([[userLatLng.lat, userLatLng.lng], [lat, long]], {color: 'red'}).addTo(map);

    const distance = map.distance([userLatLng.lat, userLatLng.lng], [lat, long]);
    distanceDisplay.textContent = `Actual Distance: ${Math.round(distance)} meters`;

    if (distance <= correctRange) {
      userScore++;
      lockInButton.textContent = 'Next';
    } else {
      lockInButton.textContent = 'Try Again';
      if (userScore > highScore) {
        highScore = userScore;
        highScoreDisplay.textContent = `Highscore: ${highScore}`;
      }
    }

    lockInButton.onclick = function () {
      // Remove current markers and polylines
      map.removeLayer(userMarker);
      map.removeLayer(actualMarker);
      map.removeLayer(polyline);

      if (lockInButton.textContent === 'Next') {
        currentImageIndex = (currentImageIndex + 1) % imagesList.length;
        currentImage = imagesList[currentImageIndex];
        userScore++;
        lockInButton.textContent = 'Lock In';
      }

      userMarker.setLatLng([imgWidth / 2, imgHeight / 2]); // Reset user marker to center
      map.addLayer(userMarker);
      lockInButton.disabled = true;
      updateUI();
    }
  });

  lockInButton.disabled = true;
});