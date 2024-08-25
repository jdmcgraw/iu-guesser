document.addEventListener("DOMContentLoaded", function () {
  const containerElement = document.querySelector("#image-container");
  const zoomElement = document.querySelector("#map");

  const pinWidth = 16; // Should match .map-pin width in CSS
  const pinHeight = 24; // Should match .map-pin height in CSS

  if (!zoomElement || !containerElement) {
    console.error("Required elements are missing in the DOM.");
    return;
  }

  let zoom = 1;
  const ZOOM_SPEED = 0.1;
  const MAX_ZOOM = 4;

  document.addEventListener("wheel", function (e) {
      e.preventDefault();

      const rect = zoomElement.getBoundingClientRect();
      // Print out the Top Left and Bottom Right coordinates of the image
      console.log(rect.left, rect.top);

      const offsetX = (e.clientX - rect.left) / rect.width; // Normalize by width
      const offsetY = (e.clientY - rect.top) / rect.height; // Normalize by height

      if (e.deltaY > 0) {
        zoom -= ZOOM_SPEED;
      } else {
        zoom += ZOOM_SPEED;
      }

      console.log(zoom);
      zoom = Math.min(Math.max(zoom, 1), MAX_ZOOM);

      zoomElement.style.transform = `scale(${zoom})`;
      zoomElement.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;

      var guessPin = document.getElementById('guess-pin');
      
      if (guessPin) {
        // Get the Position of the Pin
        var guessPinX = guessPin.style.left;
        var guessPinY = guessPin.style.top;

        // Account for the Zoom too
        guessPin.style.left = `${(guessPinX - rect.left) - pinWidth / 2 * zoom}px`;
        guessPin.style.top = `${(guessPinY - rect.top) - (pinHeight + 3) * zoom}px`;

        // TODO: Adjust the Pin's Position when the map rect is transformed as well
        guessPin.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
      }
    },
    { passive: false }
  );
});
