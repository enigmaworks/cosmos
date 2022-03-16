export function controlsForce(player, keys) {
  let rotationForce = 0;
  let boost = 1;
  if (keys.left) {
    rotationForce = -0.002;
  }
  if (keys.right) {
    rotationForce = 0.002;
  }
  if (keys.space) boost = player.booster;
  let xForce = 0;
  let yForce = 0;
  if (keys.up) {
    xForce = -(player.acceleration * Math.sin(player.rotation)) * boost;
    yForce = player.acceleration * Math.cos(player.rotation) * boost;
  }
  return { r: rotationForce, x: xForce, y: yForce };
}
export default function (player, forces = []) {
  player.rotation *= 0.97;
  forces.forEach((e) => {
    const { x, y, r } = { x: 0, y: 0, r: 0, ...e };
    player.xVel += x;
    player.yVel += y;
    player.rotationVel += r;
  });
  player.x += player.xVel;
  player.y += player.yVel;
  player.rotation += player.rotationVel;
}
