const carousel = document.getElementById("carousel");
const images = carousel.querySelectorAll("img");

const count = images.length;
const angle = 360 / count;
let rotation = 0;

// 🔥 반지름
const imageWidth = 320;
const radius = Math.round(
  (imageWidth * count) / (2 * Math.PI)
) + 100;

// 🔥 원통 배치
images.forEach((img, i) => {
  img.style.transform = `
    translate(-50%, -50%)
    rotateY(${i * angle}deg)
    translateZ(${radius}px)
  `;
});

// 🔄 자동 회전
setInterval(() => {
  rotation -= angle;
  carousel.style.transform = `rotateY(${rotation}deg)`;
}, 2500);