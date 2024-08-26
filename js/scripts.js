import { imagesList } from "./images.js";

let currentImageIndex = 0;
let currentImage = imagesList[currentImageIndex];
let userScore = 0;
let highScore = 0;
const correctRange = 100; // 100 meters
let markersGroup = L.layerGroup();

document.addEventListener("DOMContentLoaded", function () {
    const lockInButton = document.getElementById("lockInButton");
    const testImage = document.getElementById("testImage");
    const distanceDisplay = document.querySelector('.image-actual-distance');
    const scoreDisplay = document.querySelector('.image-total-score');
    const highScoreDisplay = document.querySelector('.image-total-highscore');

    function updateUI() {
        testImage.src = currentImage.src;
        scoreDisplay.textContent = `Score: ${userScore}`;
        highScoreDisplay.textContent = `Highscore: ${highScore}`;
        distanceDisplay.textContent = `Actual Distance: 0 meters`;
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
    const bounds = [[0, 0], [imgHeight, imgWidth]];

    L.imageOverlay('images/campus-map.png', bounds).addTo(map);
    map.fitBounds(bounds);

    // Add guess marker
    const guessMarker = L.marker([imgWidth / 2, imgHeight / 2], { draggable: true }).addTo(map);
    guessMarker.on('dragend', function (e) {
        lockInButton.disabled = false;
        console.log("Marker dragged to: ", guessMarker.getLatLng());
    });

    markersGroup.addTo(map); // Add layer group to the map

    lockInButton.addEventListener('click', function () {
        markersGroup.clearLayers();  // Clear previous markers and lines

        const userLatLng = guessMarker.getLatLng();
        const correctLatLng = [currentImage.lat, currentImage.long];
        console.log("User guess:", userLatLng, "Correct location:", correctLatLng);

        // Place the actual location marker
        const actualMarker = L.marker(correctLatLng, {
            icon: L.icon({
                iconUrl: 'images/map-pin.svg',
                iconSize: [16, 24],
                className: 'correct-location-pin'
            })
        }).addTo(markersGroup);

        // Draw line from user guess to actual location
        console.log(`Drawing line from ${userLatLng} to ${correctLatLng}`);
        const line = L.polyline([userLatLng, correctLatLng], {
            color: 'red',
            weight: 3
        }).addTo(markersGroup);

        const distance = map.distance(userLatLng, correctLatLng);
        console.log(`Calculated distance: ${distance} meters`);
        distanceDisplay.textContent = `Actual Distance: ${Math.round(distance)} meters`;

        // Evaluate score based on distance
        if (distance <= correctRange) {
            userScore++;
            lockInButton.textContent = 'Next';
        } else {
            lockInButton.textContent = 'Try Again';
            if (userScore > highScore) {
                highScore = userScore;
            }
        }

        updateUI();
        lockInButton.onclick = () => {
            markersGroup.clearLayers();  // Clear markers and lines for the new round
            guessMarker.setLatLng([imgWidth / 2, imgHeight / 2]); // Reset user marker
            map.setView([imgHeight / 2, imgWidth / 2], 0);
            lockInButton.disabled = true;

            if (lockInButton.textContent === 'Next') {
                currentImageIndex = (currentImageIndex + 1) % imagesList.length;
                currentImage = imagesList[currentImageIndex];
                userScore = (distance <= correctRange) ? userScore : 0; // Reset score if incorrect
                lockInButton.textContent = 'Lock In';
            }

            updateUI();
        }
    });

    updateUI();
    lockInButton.disabled = true;
});