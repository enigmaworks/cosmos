import planets from "../entities/planets.js";

export default function (c, camera, renderUnits) {
  let p = 0;
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    if (
      planet.x - camera.x + planet.size > -renderUnits.maxX / 2 &&
      planet.x - camera.x - planet.size < renderUnits.maxX / 2 &&
      planet.y - camera.y + planet.size > -renderUnits.maxY / 2 &&
      planet.y - camera.y - planet.size < renderUnits.maxY / 2
    ) {
      p++;
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
          planet.size,
          planet.size,
          -planet.size,
          -planet.size
        );
        Object.values(planet.fill.f).forEach((stop) => {
          fill.addColorStop(stop.s, stop.c);
        });
      }
      c.fillStyle = fill;
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
}
