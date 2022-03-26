export default function (planets, player) {
  let force = {
    x: 0,
    y: 0,
    r: 0,
  };

  const MASS_CONSTANT = 1 / 2;
  const GRAVITATION_COEFFICIENT = 2.35; // in real life, 11
  const GRAVITY_ROTATION_SPEED = 1 / 20;

  const G = 6.67408 * 10 ** -GRAVITATION_COEFFICIENT;

  planets.forEach((planet, i) => {
    const { name, x, y, size, density } = planet;
    //area = PI * R^2
    //mass = density ^ constant * area
    const mass = Math.PI * size ** 2 * density ** MASS_CONSTANT;

    const dist = Math.hypot(x - player.x, y - player.y);

    const gravity_stregnth = G * (mass / dist ** 2); //gravitational equation
    planet.gravity_stregnth = gravity_stregnth;
    const x_speed = Math.sqrt((player.x - x) ** 2);
    const y_speed = Math.sqrt((player.y - y) ** 2);
    const gravity_direction = Math.atan(x_speed / y_speed);

    planet.distance = dist;
    planet.gravitationalInfluence = gravity_stregnth;

    let x_gravity_multiplier = Math.sin(gravity_direction);
    let y_gravity_multiplier = Math.cos(gravity_direction);
    let rotational_gravity = 0; //holds the disired angle of the planet(so the bottom of the player points towards the center of the planet)
    const halfPI = Math.PI / 2;
    //sets rotation depending on the quadrant you are in
    // (-x, -y) top    right
    // (-x, +y) bottom right
    // ( x,  y) bottom left
    // ( x, -y) top    left
    if (player.x > x) {
      if (player.y > y) {
        x_gravity_multiplier *= -1;
        y_gravity_multiplier *= -1;
        rotational_gravity = halfPI * 4 - gravity_direction;
      } else {
        x_gravity_multiplier *= -1;
        rotational_gravity = halfPI * 2 + gravity_direction;
      }
    } else {
      if (player.y > y) {
        y_gravity_multiplier *= -1;
        rotational_gravity = gravity_direction;
      } else {
        rotational_gravity = halfPI * 2 - gravity_direction;
      }
    }
    planet.x_gravity_multiplier = x_gravity_multiplier;
    planet.y_gravity_multiplier = y_gravity_multiplier;
    //shortest distance between angles; https://stackoverflow.com/questions/28036652/finding-the-shortest-distance-between-two-angles
    const angle_distance =
      ((rotational_gravity - player.rotation + Math.PI) % (Math.PI * 2)) - Math.PI;

    force.r += angle_distance * (gravity_stregnth ** 1.75 * GRAVITY_ROTATION_SPEED);
    force.x += x_gravity_multiplier * gravity_stregnth;
    force.y += y_gravity_multiplier * gravity_stregnth;
  });

  return force;
}
