let stars = [];

for (let i = 0; i < 450000; i++) {
  let obj = { x: Math.random(), y: Math.random(), alpha: Math.random() };
  stars.push(obj);
}

export function renderStars(c, camera, renderUnits) {
  let universe = c.createLinearGradient(
    0,
    renderUnits.maxY / -2,
    renderUnits.maxX - 200,
    0
  );
  universe.addColorStop(0, "#110218");
  universe.addColorStop(0.33, "#0a0a24");
  universe.addColorStop(0.9, "#090212");
  universe.addColorStop(1, "#01110b");

  c.fillStyle = universe;
  c.fillRect(
    renderUnits.maxX / -2,
    renderUnits.maxY / -2,
    renderUnits.maxX,
    renderUnits.maxY
  );

  c.fillStyle = "white";
  c.save();
  stars.forEach((star, num) => {
    let xPos = (star.x * 9000 - 9000 / 2) * 2;
    let yPos = (star.y * 9000 - 9000 / 2) * 2;
    let size;
    if (num % 100 === 0) {
      xPos -= camera.x / 18;
      yPos -= camera.y / 18;
      size = 1.25;
    } else if (num % 50 === 0) {
      xPos -= camera.x / 24;
      yPos -= camera.y / 24;
      size = 1;
    } else if (num % 6 === 0) {
      xPos -= camera.x / 32;
      yPos -= camera.y / 32;
      size = 0.75;
    } else {
      xPos -= camera.x / 48;
      yPos -= camera.y / 48;
      size = 0.5;
    }
    if (
      !(
        xPos > renderUnits.maxX / 2 ||
        xPos < -renderUnits.maxX / 2 ||
        yPos > renderUnits.maxY / 2 ||
        yPos < -renderUnits.maxY / 2
      )
    ) {
      c.globalAlpha = star.alpha + 0.1;
      c.beginPath();
      c.arc(xPos, yPos, size, 0, Math.PI * 2);
      c.fill();
    }
  });
  c.restore();
}