export default function (planets, player) {
  planets.forEach(
    ({ x, y, size, gravity_stregnth, x_gravity_multiplier, y_gravity_multiplier }) => {
      const dist = Math.hypot(x - player.x, y - player.y);
      if (dist <= size + player.size) {
        const collisonX = (player.x * size + x * player.size) / (player.size + size);
        const collisonY = (player.y * size + y * player.size) / (player.size + size);

        const distInsidePlanet = size - Math.hypot(collisonX - x, collisonY - y);
        const distInsidePlayer =
          player.size - Math.hypot(collisonX - player.x, collisonY - player.y);
        const distToMoveOut = distInsidePlanet + distInsidePlayer;

        player.x -= distToMoveOut * x_gravity_multiplier + gravity_stregnth * x_gravity_multiplier;
        player.y -= distToMoveOut * y_gravity_multiplier + gravity_stregnth * y_gravity_multiplier;

        player.xVel = 0;
        player.yVel = 0;

        // force.x -= player.xVel;
        // force.y -= player.yVel;

        const hulldamage = 40 * Math.log(Math.hypot(player.xVel, player.yVel) - 3.5);
        if (!(hulldamage < 0) && hulldamage) player.hullIntegrity -= hulldamage;
      }
    }
  );
}
