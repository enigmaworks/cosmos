export default function (planets, player) {
  let force = {
    x: 0,
    y: 0,
    r: 0,
  };
  planets.forEach(({ x, y, size, density }) => {
    const mass = Math.PI * size ** 2 * density + 1;
    const real_distance = Math.hypot(x - player.x, y - player.y);
    const G = 6.67408 * 10 ** -2.25;
    const g = G * (mass / real_distance ** 2);
    const xDist = Math.hypot(x, player.x);
    const yDist = Math.hypot(y, player.y);
    const angle = Math.atan(xDist / yDist);
    let xG = Math.sin(angle);
    let yG = Math.cos(angle);
    if (player.x > x) {
      if (player.y > y) {
        xG *= -1;
        yG *= -1;
      } else {
        xG *= -1;
      }
    } else {
      if (player.y > y) {
        yG *= -1;
      }
    }
    if (real_distance <= size + player.size) {
      const collisonX =
        (player.x * size + x * player.size) / (player.size + size);
      const collisonY =
        (player.y * size + y * player.size) / (player.size + size);
      const distInsidePlanet = size - Math.hypot(collisonX - x, collisonY - y);
      const distInsidePlayer =
        player.size - Math.hypot(collisonX - player.x, collisonY - player.y);
      const distToMoveOut = distInsidePlanet + distInsidePlayer;
      player.x -= player.xVel * distToMoveOut * g;
      player.y -= player.yVel * distToMoveOut * g;
      force.x -= player.xVel;
      force.y -= player.yVel;
      let hulldamage = (Math.hypot(player.xVel, player.yVel) * 1.25) ** 4 / 50;
      if (!(hulldamage < 0.5)) player.hullIntegrity -= hulldamage;
    } else {
      force.x += xG * g;
      force.y += yG * g;
    }
  });
  return force;
}
