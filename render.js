import { text } from "./utilities/textrenderer.js";
import renderUnits from "./utilities/units.js";
import renderPlanets from "./renderers/planets.js";
import { renderStars } from "./renderers/stars.js";
import atmospheres from "./renderers/atmospheres.js";
import minimap from "./renderers/minimap.js";
import keys from "./utilities/keys.js";

let tick = 0;
let fps;

export function render({ c, fps, camera, planets, player }) {
  tick++;
  c.clearRect(renderUnits.maxX / -2, renderUnits.maxY / -2, renderUnits.maxX, renderUnits.maxY);
  const items = { c, camera, player, planets, renderUnits, player, keys };
  renderStars(items);
  atmospheres(items);
  minimap(items);
  renderPlanets(items);
  player.render({ c, camera, keys }); // renderPlayer(items);

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
