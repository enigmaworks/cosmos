import { text } from "./utilities/textrenderer.js";
import renderUnits from "./utilities/units.js";

export function render({ c, delta }) {
  c.clearRect(0, 0, renderUnits.maxX, renderUnits.maxY);
  text(delta, 100, 100, { c });
}
