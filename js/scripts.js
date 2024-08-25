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
    guessPin = createGuessPin();
    answerPin = createAnswerPin();

    // Set the position of the pin, adjusting for pin dimensions
    const pinWidth = 16; // Should match .map-pin width in CSS
    const pinHeight = 24; // Should match .map-pin height in CSS
    guessPin.style.left = `${x - pinWidth / 2}px`;
    guessPin.style.top = `${y - (pinHeight + 3)}px`;

    answerPin.style.left = `${x - pinWidth / 2}px`;
    answerPin.style.top = `${y - (pinHeight + 3)}px`;

    // Append the pin to the image container
    imageContainer.appendChild(guessPin);
    imageContainer.appendChild(answerPin);
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

