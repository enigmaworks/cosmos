import { text } from "../utilities/textrenderer.js";

export default function (c, planets, mapsize) {
  let farthestaway = 0;
  planets.forEach(({ x, y, size }) => {
    if (x + size > farthestaway) farthestaway = x + size;
    if (y + size > farthestaway) farthestaway = y + size;
    if (Math.abs(x - size) > farthestaway) farthestaway = Math.abs(x - size);
    if (Math.abs(y - size) > farthestaway) farthestaway = Math.abs(y - size);
  });

  let scale = ((farthestaway + 1) * 2.1) / mapsize;
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    c.beginPath();
    let fill = "#888";
    if (planet.fill.type === "color") {
      fill = planet.fill.f;
    }
    if (planet.fill.type === "img") {
      fill = c.createPattern(planet.fill.f, "repeat");
    }
    if (planet.fill.type === "gradient") {
      fill = c.createLinearGradient(
        (planet.x + planet.size / 2) / scale,
        (planet.y + planet.size / 2) / scale,
        (planet.x - planet.size / 2) / scale,
        (planet.y - planet.size / 2) / scale
      );
      planet.fill.f.forEach((stop) => {
        fill.addColorStop(stop.s, stop.c);
      });
    }
    c.fillStyle = fill;
    c.arc(planet.x / scale, planet.y / scale, planet.size / scale, 0, Math.PI * 2);
    c.fill();
    text(
      `(${Math.round(planet.x / 100)},${Math.round(planet.y / -100)})`,
      planet.x / scale,
      (planet.y - planet.size) / scale - 5,
      c,
      {
        size: 8 + planet.size / 150,
        color: "#fffb",
        align: "center",
        baseline: "bottom",
      }
    );
    // text(`${planet.name}`, planet.x / scale, (planet.y - planet.size) / scale - 5, c, {
    //   size: 8 + planet.size / 150,
    //   color: "#fffb",
    //   baseline: "bottom",
    //   align: "center",
    // });
  }
}
