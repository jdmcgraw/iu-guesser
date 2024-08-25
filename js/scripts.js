document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('image-container');
    const interactiveImage = document.getElementById('map');
    
    // Setup to handle image clicks
    interactiveImage.addEventListener('click', function(event) {
        const rect = interactiveImage.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Log coordinates (optional)
        console.log(`X: ${x}, Y: ${y}`);

        // Create a new pin for the current click
        const pin = createPin();
        
        // Set the position of the pin
        pin.style.left = `${x - 12}px`; // Adjust to center the pin on click
        pin.style.top = `${y - 12}px`; // Adjust to center the pin on click

        // Append the pin to the image container
        imageContainer.appendChild(pin);
    });

    // Function to create a pin
    function createPin() {
        const pin = new Image();
        pin.src = 'images/map-pin.svg';
        pin.className = 'map-pin';
        return pin;
    }
});