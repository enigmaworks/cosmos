import { text } from "../utilities/textrenderer.js";

export default function (c, planets, mapsize) {
  let farthestaway = 0;
  planets.forEach(({ x, y }) => {
    if (x > farthestaway) farthestaway = x;
    if (y > farthestaway) farthestaway = y;
  });

  let scale = (farthestaway * 2.25) / mapsize;

  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    c.beginPath();
    c.fillStyle = planet.atmosphere;
    c.arc(planet.x / scale, planet.y / scale, planet.size / scale, 0, Math.PI * 2);
    c.fill();
    text(
      `(${Math.round(planet.x / 100)},${Math.round(planet.y / 100)})`,
      planet.x / scale,
      (planet.y + planet.size) / scale + 2,
      c,
      {
        size: planet.size / scale + 6,
        color: "#eee",
        align: "center",
      }
    );
    text(`${planet.name}`, planet.x / scale, (planet.y - planet.size) / scale - 2, c, {
      size: planet.size / scale + 6,
      color: "#eee",
      baseline: "bottom",
      align: "center",
    });
  }
}
