export default function ({ c, camera, planets, renderUnits }) {
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
      c.save();
      c.translate(planet.x - camera.x, planet.y - camera.y);
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
          planet.size / 2,
          planet.size / 2,
          -planet.size / 2,
          -planet.size / 2
        );
        Object.values(planet.fill.f).forEach((stop) => {
          fill.addColorStop(stop.s, stop.c);
        });
      }
      c.fillStyle = fill;
      c.arc(0, 0, planet.size, 0, Math.PI * 2);
      c.fill();

      let light_occlusion = c.createRadialGradient(
        0,
        0,
        0,
        planet.size / 2.5,
        planet.size / 2.5,
        planet.size * 1.8
      );
      light_occlusion.addColorStop(0.55, "#fff0");
      light_occlusion.addColorStop(1, "#ffff");
      c.globalAlpha = 0.5;
      c.fillStyle = light_occlusion;
      c.beginPath();
      c.arc(0, 0, planet.size, 0, Math.PI * 2);
      c.fill();

      let dark_occlusion = c.createRadialGradient(
        0,
        0,
        0,
        planet.size / -4.5,
        planet.size / -5.5,
        planet.size * 1.35
      );
      dark_occlusion.addColorStop(0.75, "hsla(240, 57%, 9%, 0)");
      dark_occlusion.addColorStop(1, "hsla(240, 57%, 9%, 1)");
      c.globalAlpha = 0.35;
      c.fillStyle = dark_occlusion;
      c.beginPath();
      c.arc(0, 0, planet.size, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  }
}
