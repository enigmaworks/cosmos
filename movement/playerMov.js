let boost = 1;
export function controlsForce(player, keys) {
  let rotationForce = 0;
  if (keys.left) {
    rotationForce = -0.002;
  }
  if (keys.right) {
    rotationForce = 0.002;
  }
  if (keys.space && player.fuelLevel > 0) {
    if (player.boost < player.boost_max) {
      player.boost += player.boost_warmup;
    }
    player.fuelLevel -= player.acceleration * player.boost_max;
  } else {
    if (player.boost > 1) {
      player.boost -= 0.04;
    } else {
      player.boost = 1;
    }
  }
  boost = player.boost;
  let xForce = 0;
  let yForce = 0;
  if (keys.up && player.fuelLevel > 0) {
    xForce = -(player.acceleration * Math.sin(player.rotation)) * boost;
    yForce = player.acceleration * Math.cos(player.rotation) * boost;
    player.fuelLevel -= player.acceleration;
  }
  return { r: rotationForce, x: xForce, y: yForce };
}

export default function (player, forces = []) {
  player.rotation *= 0.97;
  player.xVel, (player.yVel *= 0.998);
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
