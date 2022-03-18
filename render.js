import { text } from "./utilities/textrenderer.js";
import renderUnits from "./utilities/units.js";
import renderPlanets from "./renderers/planets.js";
import renderPlayer from "./renderers/player.js";
import { renderStars } from "./renderers/stars.js";
import player from "./entities/player.js";
import atmospheres from "./renderers/atmospheres.js";
import planets from "./entities/planets.js";

let tick = 0;
let fps;
export function render({ c, fps, camera }) {
  tick++;
  c.clearRect(
    renderUnits.maxX / -2,
    renderUnits.maxY / -2,
    renderUnits.maxX,
    renderUnits.maxY
  );
  const items = { c, camera, player, planets, renderUnits, player };
  renderStars(items);
  atmospheres(items);
  renderPlanets(items);
  renderPlayer(items);
  text(
    `( ${Math.round(player.x / 100)} , ${Math.round(player.y / 100)} )`,
    25 + renderUnits.maxX / -2,
    25 + renderUnits.maxY / -2,
    c,
    {
      color: "#eee",
    }
  );
  text(
    `${fps} FPS`,
    -25 + renderUnits.maxX / 2,
    25 + renderUnits.maxY / -2,
    c,
    {
      color: "#eee",
      align: "right",
    }
  );
  //sin returns between -1 and 1, convert it to a % by making it positive(add one), dividing it by two(maximum value), and then multiply it by the desired maxvalue, then add the desired minimum
  let color = ((Math.sin(tick / 10) + 1) / 2) * 100 + 50;
  text(
    `${Math.round((player.fuelLevel / player.fuelLevel_max) * 100)}% fuel`,
    25 + renderUnits.maxX / -2,
    75 + renderUnits.maxY / -2,
    c,
    {
      color: player.fuelLevel <= 9 ? `RGB(255 ${color} ${color})` : "#eee",
    }
  );
  text(
    `Hull Integrity: ${Math.round(
      (player.hullIntegrity / player.hullIntegrity_max) * 100
    )}%`,
    25 + renderUnits.maxX / -2,
    100 + renderUnits.maxY / -2,
    c,
    { color: "#ddd" }
  );
  text(
    `Oxygen: ${Math.round(
      (player.oxygenLevel / player.oxygenLevel_max) * 100
    )}%`,
    25 + renderUnits.maxX / -2,
    125 + renderUnits.maxY / -2,
    c,
    { color: "#ddd" }
  );
}
