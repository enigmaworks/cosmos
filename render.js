import { text } from "./utilities/textrenderer.js";
import renderUnits from "./utilities/units.js";
import { renderStars } from "./renderers/stars.js";
import minimap from "./renderers/minimap.js";
import keys from "./utilities/keys.js";
import ParticleEmittor from "./entities/classes/ParticleEmittor.js";

let tick = 0;
let fps;

let particles = new ParticleEmittor(0, 0, 0);
particles.setPositionType("world");
particles.setRenderer((c, x, y, r, size, lifetime) => {
  c.beginPath();
  c.fillStyle = `hsla(${50 - (lifetime / particles.lifetime) * 50}, 100% ,50%, ${
    lifetime / particles.lifetime + 0.2
  })`;
  c.arc(x, y, 2, 0, Math.PI * 2);
  c.fill();
});

function renderExaust(player, camera, c) {
  const speed = Math.hypot(player.engine_x, player.engine_y) * 10;
  const xoff = Math.cos(player.rotation - Math.PI / 2);
  const yoff = Math.sin(player.rotation - Math.PI / 2);

  particles.setLifetime(30 - speed * 15);
  particles.render(camera, c);
  for (let i = 0; i < speed * 3; i++) {
    particles.setLocation(player.x + Math.random() * 10 - 5, player.y + Math.random() * 10 - 5);
    particles.setLocation(
      particles.x + xoff * (player.size / 2),
      particles.y + yoff * (player.size / 2)
    );
    if (player.engine_x !== 0 && player.engine_y !== 0) {
      particles.emit(1, {
        x: player.velocity.x - 2 * speed * -xoff,
        y: player.velocity.y - 2 * speed * -yoff,
      });
    }
  }
}

export function render({ c, fps, camera, planets, player }) {
  tick++;
  c.clearRect(renderUnits.maxX / -2, renderUnits.maxY / -2, renderUnits.maxX, renderUnits.maxY);
  const items = { c, camera, player, planets, renderUnits, player, keys };
  renderStars(items);
  minimap(items);
  renderExaust(player, camera, c);
  planets.renderBodies(items);
  player.render({ c, camera, keys });

  text(`press [ M ] to toggle starmap`, 15 + renderUnits.maxX / -2, -15 + renderUnits.maxY / 2, c, {
    color: "#bbb",
    baseline: "bottom",
  });

  text(
    `( ${Math.round(player.x / 100)} , ${Math.round(player.y / -100)} )`,
    25 + renderUnits.maxX / -2,
    25 + renderUnits.maxY / -2,
    c,
    {
      color: "#eee",
    }
  );

  text(`${fps} FPS`, -25 + renderUnits.maxX / 2, 25 + renderUnits.maxY / -2, c, {
    color: "#eee",
    align: "right",
  });

  let stats = [
    `${Math.round((player.fuel / player.fuel_max) * 100)}% fuel`,
    `Hull Integrity: ${Math.round((player.hullIntegrity / player.hullIntegrity_max) * 100)}%`,
    `Oxygen: ${Math.round((player.oxygen / player.oxygen_max) * 100)}%`,
    `Boost: ${Math.round(((player.booster - 1) / (player.booster_max - 1)) * 100)}%`,
  ];

  stats.forEach((stat, i) => {
    text(stat, 25 + renderUnits.maxX / -2, (i + 1) * 25 + 50 + renderUnits.maxY / -2, c, {
      color: "#ddd",
    });
  });
}
