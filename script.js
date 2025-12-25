const carousel = document.getElementById("carousel");
const images = carousel.querySelectorAll("img");
const imageCount = images.length;
const angle = 360 / imageCount;

let isMobile = window.innerWidth <= 768;
let radius = isMobile ? 0 : 520;
let rotationY = 0;
let autoRotate = true;

/* ======================
   PC : 3D 원통 배치
====================== */
function setupCylinder() {
  images.forEach((img, i) => {
    img.style.transform = `
      rotateY(${angle * i}deg)
      translateZ(${radius}px)
    `;
  });
}

/* ======================
   자동 회전 (성능 최적화)
====================== */
function animate() {
  if (!isMobile && autoRotate) {
    rotationY += 0.15;
    carousel.style.transform = `rotateY(${rotationY}deg)`;
  }
  requestAnimationFrame(animate);
}

/* ======================
   모바일 스와이프
====================== */
let startX = 0;
let currentX = 0;
let isDragging = false;

carousel.addEventListener("touchstart", e => {
  isDragging = true;
  startX = e.touches[0].clientX;
  autoRotate = false;
});

carousel.addEventListener("touchmove", e => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX - startX;
  carousel.style.transform = `translateX(${currentX}px)`;
});

carousel.addEventListener("touchend", () => {
  isDragging = false;
  carousel.style.transform = `translateX(0)`;
});

/* ======================
   리사이즈 대응
====================== */
function handleResize() {
  isMobile = window.innerWidth <= 768;
  radius = isMobile ? 0 : 520;

  carousel.style.transform = "none";

  if (!isMobile) {
    setupCylinder();
    autoRotate = true;
  } else {
    autoRotate = false;
  }
}

window.addEventListener("resize", handleResize);

/* ======================
   초기 실행
====================== */
if (!isMobile) setupCylinder();
animate();