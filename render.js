import { text } from "./utilities/textrenderer.js";
import renderUnits from "./utilities/units.js";
import renderPlanets from "./renderers/planets.js";
import renderPlayer from "./renderers/player.js";
import player from "./entities/player.js";

export function render({ c, delta, camera }) {
  c.clearRect(
    renderUnits.maxX / -2,
    renderUnits.maxY / -2,
    renderUnits.maxX,
    renderUnits.maxY
  );
  renderPlanets(c, camera);
  renderPlayer(c, camera);
  text(`${Math.round(player.x)}, ${Math.round(player.y)}`, 0, 100, c, {
    color: "#111",
  });
}
