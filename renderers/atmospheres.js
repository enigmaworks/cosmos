const atmosphereMultiplier = 2.1;

export default function ({ c, planets, camera, renderUnits }) {
  planets.forEach((planet) => {
    if (
      planet.x - camera.x + planet.size * atmosphereMultiplier >
        -renderUnits.maxX / 2 &&
      planet.x - camera.x - planet.size * atmosphereMultiplier <
        renderUnits.maxX / 2 &&
      planet.y - camera.y + planet.size * atmosphereMultiplier >
        -renderUnits.maxY / 2 &&
      planet.y - camera.y - planet.size * atmosphereMultiplier <
        renderUnits.maxY / 2
    ) {
      c.save();
      c.translate(planet.x - camera.x, planet.y - camera.y);
      let atmosphereRadius = planet.size * atmosphereMultiplier + 100;
      let atmosphere = c.createRadialGradient(
        0,
        0,
        planet.size - 80,
        0,
        0,
        atmosphereRadius
      );
      atmosphere.addColorStop(0.05, planet.atmosphere);
      atmosphere.addColorStop(1, "hsla(0,0%,0%,0)");
      let preAtmosphere = c.createRadialGradient(
        0,
        0,
        planet.size,
        0,
        0,
        atmosphereRadius
      );
      preAtmosphere.addColorStop(0, "#0a0a24");
      preAtmosphere.addColorStop(0.75, "hsla(0,0%,0%,0)");
      c.fillStyle = preAtmosphere;
      c.globalAlpha = 0.75;
      c.beginPath();
      c.arc(0, 0, planet.size * atmosphereMultiplier, 0, Math.PI * 2);
      c.fill();
      c.globalAlpha = 0.2;
      c.fillStyle = atmosphere;
      c.beginPath();
      c.arc(0, 0, planet.size * atmosphereMultiplier, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  });
}
