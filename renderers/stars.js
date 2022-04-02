let stars = [];

const divisor = 0.95;
for (let i = 0; i < (innerHeight + innerWidth) / divisor; i++) {
  let obj = { x: Math.random(), y: Math.random(), alpha: Math.random() };
  stars.push(obj);
}
addEventListener("resize", () => {
  if (stars.length < (innerHeight + innerWidth) / divisor) {
    for (let i = 0; i < (innerHeight + innerWidth) / divisor - stars.length; i++) {
      let obj = { x: Math.random(), y: Math.random(), alpha: Math.random() };
      stars.push(obj);
      i++;
    }
  } else if (stars.length > (innerHeight + innerWidth) / divisor) {
    for (let i = 0; i < stars.length - (innerHeight + innerWidth) / divisor; i++) {
      stars.splice(0, 1);
      i++;
    }
  }
});

export function renderStars({ c, player, camera, renderUnits }) {
  let background = c.createLinearGradient(
    renderUnits.maxX / -2,
    renderUnits.maxY / -2,
    renderUnits.maxX / 2,
    renderUnits.maxY / 2
  );
  background.addColorStop(0, "hsla(240, 96%, 5%)");
  background.addColorStop(1, "hsla(240, 96%, 4%)");
  background.addColorStop(0.5, "hsla(280, 100%, 8%)");
  c.fillStyle = background;
  c.fillRect(renderUnits.maxX / -2, renderUnits.maxY / -2, renderUnits.maxX, renderUnits.maxY);

  let background_2 = c.createLinearGradient(
    renderUnits.maxX / -2,
    renderUnits.maxY / 2,
    renderUnits.maxX / 2,
    renderUnits.maxY / -2
  );
  background_2.addColorStop(0, "hsla(240, 92%, 4%)");
  background_2.addColorStop(1, "hsla(240, 92%, 5%)");
  background_2.addColorStop(0.5, "hsla(143, 90%, 20%)");
  c.fillStyle = background_2;
  c.globalAlpha = 0.25;
  c.fillRect(renderUnits.maxX / -2, renderUnits.maxY / -2, renderUnits.maxX, renderUnits.maxY);

  let background_3 = c.createRadialGradient(
    0,
    0,
    0,
    0,
    0,
    renderUnits.maxX + renderUnits.maxY / 1.5
  );
  background_3.addColorStop(0, "hsla(240, 92%, 4% , 0.5)");
  background_3.addColorStop(1, "hsla(240, 92%, 5%)");
  c.fillStyle = background_3;
  c.globalAlpha = 0.15;
  c.fillRect(renderUnits.maxX / -2, renderUnits.maxY / -2, renderUnits.maxX, renderUnits.maxY);

  c.globalAlpha = 1;

  c.save();
  c.translate(-camera.x / 200, -camera.y / 200);
  c.fillStyle = "white";
  stars.forEach((star, num) => {
    let xPos = (star.x * renderUnits.maxDimension * 2 - renderUnits.maxDimension) * 2;
    let yPos = (star.y * renderUnits.maxDimension * 2 - renderUnits.maxDimension) * 2;
    let size;
    if (num % 100 === 0) {
      size = 1.5;
    } else if (num % 50 === 0) {
      size = 1.25;
    } else if (num % 6 === 0) {
      size = 1;
    } else {
      size = 0.75;
    }
    c.globalAlpha = star.alpha + 0.1;
    c.beginPath();
    c.rect(xPos - size, yPos - size, size * 2, size * 2);
    c.fill();
  });
  c.restore();
}
