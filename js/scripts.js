import { handleButton as showLockButton } from "./lockInButton.js";

let guessPin = null;

const pinWidth = 16; // Should match .map-pin width in CSS
const pinHeight = 24; // Should match .map-pin height in CSS
    
const top_left = {x: 39.163060, y: -86.531024};
const bottom_right = {x: 39.163060, y: -86.531024};

document.addEventListener("DOMContentLoaded", function () {
    
    const mapImage = document.getElementById("map");
    const testimage = document.getElementById("testImage");

    const imageContainer = document.getElementById("image-container");

    // Disable dragging
    mapImage.addEventListener("dragstart", function (event) {
        event.preventDefault();
    });
    // Disable the default context menu on the image
    mapImage.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
    // Disable dragging
    testImage.addEventListener("dragstart", function (event) {
        event.preventDefault();
    });
    // Disable the default context menu on the image
    testImage.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });

    // Set up to handle image clicks
    mapImage.addEventListener("click", function (event) {
        const rect = mapImage.getBoundingClientRect(); // Get bounding box of image
        showLockButton(rect); // Call handleButton function from lockInButton.js

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Calculate local coordinates relative to the image
        console.log(rect.left, rect.top);
        console.log(`Click coordinates relative to image: X: ${x}, Y: ${y}`);
        guessPin = createGuessPin(x, y);
    });

    // Function to create a pin
    function createGuessPin(x, y) {
        if (guessPin) {
            imageContainer.removeChild(guessPin);
        }

        const pin = new Image();
        pin.src = "images/map-pin.svg";
        pin.className = "map-pin";
        pin.className = "map-pin";
        pin.style.left = `${x - pinWidth / 2}px`;
        pin.style.top = `${y - (pinHeight + 3)}px`;
        imageContainer.appendChild(pin);
        return pin;
    }

    function submitGuess(){
        const guessPin = document.querySelector(".map-pin");
        if (guessPin) {
            const rect = mapImage.getBoundingClientRect();
            const x = guessPin.offsetLeft + pinWidth / 2;
            const y = guessPin.offsetTop + pinHeight + 3;
            const offsetX = x / rect.width;
            const offsetY = y / rect.height;
            console.log(`Guess submitted: X: ${offsetX}, Y: ${offsetY}`);
        }
    }
});

