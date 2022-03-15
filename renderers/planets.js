import planets from "../entities/planets.js";

export default function (c, camera) {
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    c.beginPath();
    c.fillStyle = "blue";
    c.arc(
      planet.x - camera.x,
      planet.y - camera.y,
      planet.size,
      0,
      Math.PI * 2
    );
    c.fill();
    c.restore();
  }
}
