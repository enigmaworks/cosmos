export default function ({ c, planets, camera, renderUnits }) {
  const ATMOSPHERE_SIZE_MULTIPLIER = 3.1;

  planets.forEach((planet) => {
    const atmoshphere_size = planet.size * ATMOSPHERE_SIZE_MULTIPLIER + 100;

    if (
      planet.x - camera.x + atmoshphere_size > -renderUnits.maxX / 2 &&
      planet.x - camera.x - atmoshphere_size < renderUnits.maxX / 2 &&
      planet.y - camera.y + atmoshphere_size > -renderUnits.maxY / 2 &&
      planet.y - camera.y - atmoshphere_size < renderUnits.maxY / 2
    ) {
      const atmosphere = c.createRadialGradient(0, 0, planet.size, 0, 0, atmoshphere_size);
      atmosphere.addColorStop(0, planet.atmosphere);
      atmosphere.addColorStop(0.5, "hsla(240, 57%, 9%, 0)");

      const background_fade = c.createRadialGradient(0, 0, planet.size, 0, 0, atmoshphere_size);
      background_fade.addColorStop(0, "hsl(240, 57%, 9%)");
      background_fade.addColorStop(0.75, "hsla(240, 57%, 9%, 0)");

      c.save();
      c.translate(planet.x - camera.x, planet.y - camera.y);

      c.fillStyle = background_fade;
      c.globalAlpha = 0.5;

      c.beginPath();
      c.arc(0, 0, atmoshphere_size, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = atmosphere;
      c.globalAlpha = 0.125;

      c.beginPath();
      c.arc(0, 0, atmoshphere_size, 0, Math.PI * 2);
      c.fill();

      c.restore();
    }
  });
}
