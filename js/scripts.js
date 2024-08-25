import { handleButton } from "./lockInButton.js";

document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById("image-container");
    const interactiveImage = document.getElementById("map");

    // Disable dragging
    interactiveImage.addEventListener("dragstart", function (event) {
        event.preventDefault();
    });

    // Set the position of the pin, adjusting for pin dimensions
    const pinWidth = 16; // Should match .map-pin width in CSS
    const pinHeight = 24; // Should match .map-pin height in CSS
    let guessPin = null;
    let answerPin = null;

    // Set up to handle image clicks
    interactiveImage.addEventListener("click", function (event) {
        const rect = interactiveImage.getBoundingClientRect(); // Get bounding box of image

        handleButton(rect);
        // Calculate local coordinates relative to the image
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log(rect.left, rect.top);
        console.log(`Click coordinates relative to image: X: ${x}, Y: ${y}`);

        // Remove the previous pin
        removeGuessPin();
        // Create a new pin for the current click
        guessPin = createGuessPin();

    });

    // Function to create a pin
    function createGuessPin() {
        const pin = new Image();
        pin.src = "images/map-pin.svg";
        pin.className = "map-pin";
        pin.style.left = `${x - pinWidth / 2}px`;
        pin.style.top = `${y - (pinHeight + 3)}px`;
        imageContainer.appendChild(pin);
        return pin;
    }

    // Function to create a pin
    function createAnswerPin(x, y) {
        const pin = new Image();
        pin.src = "images/map-pin.svg";
        pin.className = "map-pin";
        pin.style.fill = "blue";
        pin.style.left = `${x - pinWidth / 2}px`;
        pin.style.top = `${y - (pinHeight + 3)}px`;
        imageContainer.appendChild(pin);
        return pin;
    }

    function removeGuessPin() {
        if (guessPin) {
            imageContainer.removeChild(guessPin);
        }
    }

    function removeAnswerPin() {
        if (answerPin) {
            imageContainer.removeChild(answerPin);
        }
    }

});

