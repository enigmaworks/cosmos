import { text } from "./utilities/textrenderer.js";
import renderUnits from "./utilities/units.js";
import renderPlanets from "./renderers/planets.js";
import renderPlayer from "./renderers/player.js";
import { renderStars } from "./renderers/stars.js";
import player from "./entities/player.js";

export function render({ c, delta, camera }) {
  c.clearRect(
    renderUnits.maxX / -2,
    renderUnits.maxY / -2,
    renderUnits.maxX,
    renderUnits.maxY
  );
  renderStars(c, camera, renderUnits);
  renderPlanets(c, camera, player);
  renderPlayer(c, camera);
  text(
    `(${Math.round(player.x)}, ${Math.round(player.y)})`,
    25 + renderUnits.maxX / -2,
    25 + renderUnits.maxY / -2,
    c,
    {
      color: "#eee",
      font: "Red Hat Mono",
      size: 15,
    }
  );
  text(`${delta}`, 0, -100, c, {
    color: "#eee",
  });
}
