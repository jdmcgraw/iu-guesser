import { handleButton } from "./lockInButton.js";

document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById("image-container");
    const interactiveImage = document.getElementById("map");

    // Disable dragging
    interactiveImage.addEventListener("dragstart", function (event) {
        event.preventDefault();
    });

    let guessPin = null;
    let answerPin = null;
    const pinWidth = 16; // Should match .map-pin width in CSS
    const pinHeight = 24; // Should match .map-pin height in CSS
    // Map TL Lat: 39.175096, Long: -86.531024
    // Map BR Lat: 39.158177, Long: -86.510574

    // Set up to handle image clicks
    interactiveImage.addEventListener("click", function (event) {
        const rect = interactiveImage.getBoundingClientRect(); // Get bounding box of image

        handleButton(rect);
        // Calculate local coordinates relative to the image
        console.log(rect.left, rect.top);
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log(`Click coordinates relative to image: X: ${x}, Y: ${y}`);

        // Remove the last pin if it exists
        if (guessPin) {
            imageContainer.removeChild(guessPin);
        }

        if (answerPin) {
            imageContainer.removeChild(answerPin);
        }

        // Create a new pin for the current click
        if (event.button === 0) {
            console.log("Left button clicked");
            guessPin = createGuessPin();
            guessPin.style.left = `${x - pinWidth / 2}px`;
            guessPin.style.top = `${y - (pinHeight + 3)}px`;
            imageContainer.appendChild(guessPin);
        } else {
            console.log("Right button clicked");
            answerPin = createAnswerPin();
            answerPin.style.left = `${x - pinWidth / 2}px`;
            answerPin.style.top = `${y - (pinHeight + 3)}px`;
            imageContainer.appendChild(answerPin);
        }
    });

    // Disable the default context menu on the image
    map.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        // Add your custom right-click action here
        customRightClickAction()
    });

    // Function to create a pin
    function createGuessPin() {
        const pin = new Image();
        pin.src = "images/map-pin.svg";
        pin.className = "map-pin";
        return pin;
    }

    // Function to create a pin
    function createAnswerPin() {
        const pin = new Image();
        pin.src = "images/map-pin.svg";
        pin.className = "map-pin";
        pin.style.fill = "blue";
        return pin;
    }

});

