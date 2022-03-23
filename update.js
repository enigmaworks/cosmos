import moveCamera from "./movement/cameraMov.js";
import movePlayer, { controlsForce } from "./movement/playerMov.js";
import gravity from "./movement/gravity.js";

export function update(camera, player, keys, planets) {
  let gf = gravity(planets, player);
  let cf = controlsForce(player, keys);
  movePlayer(player, [cf, gf]);
  moveCamera(camera, player);
  player.oxygenLevel -= player.oxygen_depletion_speed + 0.1 * ((100 - player.hullIntegrity) / 100);
}
