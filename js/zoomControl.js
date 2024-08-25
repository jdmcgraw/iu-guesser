const zoomElement = document.querySelector("#map");
const containerElement = document.querySelector("#image-container");

let zoom = 1;
const ZOOM_SPEED = 0.1;

document.addEventListener("wheel", function (e) {
  e.preventDefault(); // 기본 스크롤 동작 방지

  // 줌 인/아웃
  if (e.deltaY > 0) {
    zoom -= ZOOM_SPEED;
  } else {
    zoom += ZOOM_SPEED;
  }

  // 줌 레벨 제한 설정 (너무 작거나 크지 않도록)
  zoom = Math.min(Math.max(zoom, 1), 3);

  // 이미지 확대/축소 적용
  zoomElement.style.transform = `scale(${zoom})`;

  // 이미지가 컨테이너를 벗어나지 않도록 중앙으로 유지
  const rect = zoomElement.getBoundingClientRect();
  const offsetX = (containerElement.offsetWidth - rect.width) / 2;
  const offsetY = (containerElement.offsetHeight - rect.height) / 2;
  zoomElement.style.transformOrigin = `${offsetX}px ${offsetY}px`;
});
