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
particles.setRenderer((data, c, x, y, r, size, lifetime) => {
  c.beginPath();
  c.fillStyle = `hsla(${60 - (lifetime / particles.lifetime) * 60}, 100% ,50%, ${
    lifetime / particles.lifetime + 0.3
  })`;
  c.arc(x, y, Math.abs(lifetime / particles.lifetime) * size + 1, 0, Math.PI * 2);
  c.fill();
});

function renderExaust(player, camera, c, keys) {
  const speed = Math.hypot(player.engine_x, player.engine_y) * 10;
  const xoff = Math.cos(player.rotation - Math.PI / 2);
  const yoff = Math.sin(player.rotation - Math.PI / 2);

  particles.setLifetime(17 - speed * 8.5);
  particles.render({}, camera, c);

  for (let i = 0; i < speed * 3; i++) {
    particles.setLocation(player.x + Math.random() * 10 - 5, player.y + Math.random() * 10 - 5);
    particles.setLocation(
      particles.x + xoff * (player.size / 1.5),
      particles.y + yoff * (player.size / 1.5)
    );
    if (player.engine_x !== 0 && player.engine_y !== 0) {
      particles.emit(
        1,
        {
          x: player.velocity.x - 6 * speed * -xoff,
          y: player.velocity.y - 6 * speed * -yoff,
        },
        Math.ceil(Math.random() * 2)
      );
    }
  }
  if (keys.space) {
    particles.setLocation(player.x + Math.random() * 10 - 5, player.y + Math.random() * 10 - 5);
    particles.setLocation(
      particles.x + xoff * (player.size / 1.5),
      particles.y + yoff * (player.size / 1.5)
    );
    particles.emit(
      1,
      {
        x: player.velocity.x - 6 * speed * -xoff,
        y: player.velocity.y - 6 * speed * -yoff,
      },
      Math.ceil(Math.random() * 2)
    );
  }
}

export function render({ c, fps, camera, planets, player }) {
  tick++;
  c.clearRect(renderUnits.maxX / -2, renderUnits.maxY / -2, renderUnits.maxX, renderUnits.maxY);
  const items = { c, camera, player, planets, renderUnits, player, keys };
  renderStars(items);
  minimap(items);
  renderExaust(player, camera, c, keys);
  planets.renderBodies(items);
  player.render({ c, camera, keys });
  let sortedPlanets = player.calculateNearest(planets.bodies);

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

  let hullstatus = "undamaged";
  let hulldamage = Math.round((player.hullIntegrity / player.hullIntegrity_max) * 100);
  if (hulldamage < 50) {
    hullstatus = "Compromised";
  } else if (hulldamage < 61) {
    hullstatus = "Severely Damaged";
  } else if (hulldamage < 72) {
    hullstatus = "Damaged";
  } else if (hulldamage < 83) {
    hullstatus = "In need of repair";
  } else if (hulldamage < 96) {
    hullstatus = "Good";
  }

  let stats = [
    `${Math.round(player.fuel)}/${Math.round(player.fuel_max)} fuel units`,
    `Hull Integrity: ${hullstatus.toLocaleLowerCase()}`,
    `Oxygen: ${Math.round((player.oxygen / player.oxygen_max) * 100)}%`,
    `Nearest Planet: ${sortedPlanets[0].name} (${Math.round(
      (sortedPlanets[0].calculatedDistance - sortedPlanets[0].size) / 100
    )} units)`,
  ];

  stats.forEach((stat, i) => {
    text(stat, 25 + renderUnits.maxX / -2, (i + 1) * 25 + 50 + renderUnits.maxY / -2, c, {
      color: "#eeec",
    });
  });
}
