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

  document.addEventListener("wheel", function (e) {
      e.preventDefault();

      const rect = zoomElement.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left) / rect.width; // Normalize by width
      const offsetY = (e.clientY - rect.top) / rect.height; // Normalize by height

      if (e.deltaY > 0) {
        zoom -= ZOOM_SPEED;
      } else {
        zoom += ZOOM_SPEED;
      }

      zoom = Math.min(Math.max(zoom, 1), 3);
      zoomElement.style.transform = `scale(${zoom})`;
      zoomElement.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;

      var guessPin = document.getElementById('guess-pin');
      console.log('guess-pin:', guessPin);
      // If guessPin exists, update its position accordingly to the scale and origin
      if (guessPin) {
        const rect = zoomElement.getBoundingClientRect();

        const x = guessPin.x * zoom;
        const y = guessPin.y * zoom;
        guessPin.style.left = `${x - pinWidth / 2}px`;
        guessPin.style.top = `${y - (pinHeight + 3)}px`;
      }
    },
    { passive: false }
  );
});