import moveCamera from "./movement/cameraMov.js";
import movePlayer, { controlsForce } from "./movement/playerMov.js";
import gravity from "./movement/gravity.js";
import planets from "./entities/planets.js";

export function update(camera, player, keys) {
  let gf = gravity(planets, player);
  let cf = controlsForce(player, keys);
  movePlayer(player, [cf, gf]);
  moveCamera(camera, player);
}
