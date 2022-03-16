export default function (planets, player) {
  let force = {
    x: 0,
    y: 0,
    r: 0,
  };
  planets.forEach(({ x, y, size, density }) => {
    const mass = Math.PI * size ** 2 * density;
    const dist = Math.hypot(x - player.x, y - player.y);
    const G = 6.67408 * 10 ** -3;
    const g = G * (mass / dist ** 2);
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

    if (dist <= size + player.size) {
      const collisonX =
        (player.x * size + x * player.size) / (player.size + size);
      const collisonY =
        (player.y * size + y * player.size) / (player.size + size);
      const distInsidePlanet = size - Math.hypot(collisonX - x, collisonY - y);
      const distInsidePlayer =
        player.size - Math.hypot(collisonX - player.x, collisonY - player.y);
      const distToMoveOut = distInsidePlanet + distInsidePlayer;
      player.x -= xG * g * distToMoveOut;
      player.y -= yG * g * distToMoveOut;
      force.x -= player.xVel;
      force.y -= player.yVel;
    } else {
      force.x += xG * g;
      force.y += yG * g;
    }
  });
  return force;
}
