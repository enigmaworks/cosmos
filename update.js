export function update(camera, player, keys, planets) {
  let gf = player.calculateAttraction(planets.bodies);
  let cf = player.calculateControlForce(keys);
  player.applyForces([gf, cf]);
  player.move();
  let collisons = player.checkCollisions(planets.bodies);
  player.getCollisionForce(collisons, "static");
  camera.x = player.x;
  camera.y = player.y;
  player.oxygenLevel -= player.oxygen_depletion_speed + 0.1 * ((100 - player.hullIntegrity) / 100);
}
