document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.getElementById("image-container");
  const interactiveImage = document.getElementById("map");

  // Disable dragging
  interactiveImage.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });

  let lastPin = null;

  // Set up to handle image clicks
  interactiveImage.addEventListener("click", function (event) {
    const rect = interactiveImage.getBoundingClientRect(); // Get bounding box of image

    // Calculate local coordinates relative to the image
    console.log(rect.left, rect.top);
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log(`Click coordinates relative to image: X: ${x}, Y: ${y}`);

    // Remove the last pin if it exists
    if (lastPin) {
      imageContainer.removeChild(lastPin);
    }

    // Create a new pin for the current click
    lastPin = createPin();

    // Set the position of the pin, adjusting for pin dimensions
    const pinWidth = 16; // Should match .map-pin width in CSS
    const pinHeight = 24; // Should match .map-pin height in CSS
    lastPin.style.left = `${x - pinWidth / 2}px`;
    lastPin.style.top = `${y - (pinHeight + 3)}px`;

    // Append the pin to the image container
    imageContainer.appendChild(lastPin);
  });

  // Function to create a pin
  function createPin() {
    const pin = new Image();
    pin.src = "images/map-pin.svg";
    pin.className = "map-pin";
    return pin;
  }
});
