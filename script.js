const carousel = document.getElementById("carousel");
const images = carousel.querySelectorAll("img");
const imageCount = images.length;
const angle = 360 / imageCount;

let rotationY = 0;
let radius = window.innerWidth <= 768 ? 360 : 520;

/* 🔥 원통 배치 (모바일 포함) */
function setupCylinder() {
  images.forEach((img, i) => {
    img.style.transform = `
      rotateY(${angle * i}deg)
      translateZ(${radius}px)
    `;
  });
}

/* 🔥 자동 회전 (모바일도 ON) */
function animate() {
  rotationY += 0.15;
  carousel.style.transform = `rotateY(${rotationY}deg)`;
  requestAnimationFrame(animate);
}

/* 🔄 리사이즈 대응 */
function handleResize() {
  radius = window.innerWidth <= 768 ? 360 : 520;
  setupCylinder();
}

window.addEventListener("resize", handleResize);

/* 초기 실행 */
setupCylinder();
animate();