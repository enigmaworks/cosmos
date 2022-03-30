import GlobalConfig from "../GlobalConfig.js";
import StaticEntity from "./classes/StaticEntity.js";

class Planet extends StaticEntity {
  constructor(name, x, y, size) {
    super(x, y, 0, size);
    this.name = name;
    this.fill = { type: "color", f: "#888" };
    this.atmosphere = {};
  }
  setFill(fill) {
    this.fill = fill;
  }
  setAtmosphere(atmosphere) {
    this.atmosphere = atmosphere;
  }
}

export default {
  bodies: [],
  createBodiesWithData: function (data) {
    data.forEach((element) => {
      let planet = new Planet(element.name, element.x, element.y, element.size);
      planet.setDenisty(element.density);
      planet.setFill(element.fill);
      planet.setAtmosphere(element.atmosphere);
      this.bodies.push(planet);
    });
  },
  renderBodies: function ({ c, camera, renderUnits }) {
    for (let i = 0; i < this.bodies.length; i++) {
      const planet = this.bodies[i];
      const atmoshphere_size = planet.size * GlobalConfig.AtmosphereRendererSizeMultiplier + 100;

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
        c.globalAlpha = 0.85;

        c.beginPath();
        c.arc(0, 0, atmoshphere_size, 0, Math.PI * 2);
        c.fill();

        c.fillStyle = atmosphere;
        c.globalAlpha = 0.1;

        c.beginPath();
        c.arc(0, 0, atmoshphere_size, 0, Math.PI * 2);
        c.fill();

        c.restore();
      }

      if (
        planet.x - camera.x + planet.size > -renderUnits.maxX / 2 &&
        planet.x - camera.x - planet.size < renderUnits.maxX / 2 &&
        planet.y - camera.y + planet.size > -renderUnits.maxY / 2 &&
        planet.y - camera.y - planet.size < renderUnits.maxY / 2
      ) {
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
          planet.fill.f.forEach((stop) => {
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
  },
};
