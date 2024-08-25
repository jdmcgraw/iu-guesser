const zoomElement = document.querySelector("#map");
const containerElement = document.querySelector("#image-container");

let zoom = 1;
const ZOOM_SPEED = 0.1;

document.addEventListener("wheel", function (e) {
  e.preventDefault(); // 기본 스크롤 동작 방지

  // 마우스 위치에 따른 상대 좌표 계산
  const rect = zoomElement.getBoundingClientRect();
  const offsetX = (e.clientX - rect.left) / rect.width;
  const offsetY = (e.clientY - rect.top) / rect.height;

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

  // 마우스 포인터 위치를 기준으로 한 transform-origin 설정
  zoomElement.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
});
