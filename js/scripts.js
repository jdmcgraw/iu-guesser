document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('interactive-image');
    const coordinatesDisplay = document.getElementById('coordinates');
    
    // Function to get cursor position within the image
    function getCursorPosition(event) {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return { x: x, y: y };
    }

    // Add click event listener to the image
    image.addEventListener('click', function(event) {
        const position = getCursorPosition(event);
        coordinatesDisplay.textContent = `X: ${position.x}, Y: ${position.y}`;
    });
});