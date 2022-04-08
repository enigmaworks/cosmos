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
    let total = 0.00001;
    if (planet.fill) {
      let fill;
      fill = c.createLinearGradient(
        planet.x + planet.size / 2,
        planet.y + planet.size / 2,
        planet.x - planet.size / 2,
        planet.y - planet.size / 2
      );
      fill.addColorStop(0, planet.fill1);
      fill.addColorStop(1, planet.fill2);
      c.fillStyle = fill;
    } else {
      const mantle = planet.mantle.content;
      for (const element in mantle) {
        total += mantle[element];
      }
      let h = ((mantle.uranium + mantle.magnesium + mantle.silver) / total) * 256;
      h = Math.abs(Math.sin(256 / h)) * 256 || 0;
      let s = ((mantle.hydrogen + mantle.oxygen) / total) * 65 + 35;
      let l = (mantle.iron / total) * 50 + 50;
      let fill;
      fill = c.createLinearGradient(
        (planet.x + planet.size / 2) / scale,
        (planet.y + planet.size / 2) / scale,
        (planet.x - planet.size / 2) / scale,
        (planet.y - planet.size / 2) / scale
      );
      fill.addColorStop(0, `hsl(${h},${s}%,${l}%)`);
      fill.addColorStop(1, `hsl(${h - 35},${s}%,${l}%)`);
      c.fillStyle = fill;
    }

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
