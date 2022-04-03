import GlobalConfig from "../../gamedata/settings.js";
import StaticEntity from "./StaticEntity.js";

export default class MoveableEntity extends StaticEntity {
  constructor(x, y, rotation, size, velocity = {}) {
    super(x, y, rotation, size);
    this.velocity = { x: 0, y: 0, r: 0, ...velocity };
  }
  move() {
    this.velocity.x *= 0.998;
    this.velocity.y *= 0.998;
    this.velocity.r *= 0.97;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.rotation += this.velocity.r;
  }
  checkCollisions(entities = []) {
    let collisions = [];
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const distance = Math.hypot(this.x - entity.x, this.y - entity.y);
      if (distance <= this.size + entity.size) {
        collisions.push(entity);
      }
    }
    return collisions;
  }
  getCollisionForce(entities, type = "static") {
    for (let i = 0; i < entities.length; i++) {
      const { x, y, size } = entities[i];

      if (type === "static") {
        const dist = Math.hypot(x - this.x, y - this.y);
        if (dist <= size + this.size) {
          const { x_gravity_multiplier, y_gravity_multiplier, gravity_stregnth } = entities[i];
          const collisonX = (this.x * size + x * this.size) / (this.size + size);
          const collisonY = (this.y * size + y * this.size) / (this.size + size);

          const distInsideEntity = size - Math.hypot(collisonX - x, collisonY - y);
          const distInsideSelf = this.size - Math.hypot(collisonX - this.x, collisonY - this.y);
          const distToMoveOut = distInsideEntity + distInsideSelf;

          this.x -= distToMoveOut * x_gravity_multiplier + gravity_stregnth * x_gravity_multiplier;
          this.y -= distToMoveOut * y_gravity_multiplier + gravity_stregnth * y_gravity_multiplier;
          this.velocity.x = 0;
          this.velocity.y = 0;
        }
      }
      if (type === "double") {
        return;
      }
    }
  }
  applyForces(forces = []) {
    for (let i = 0; i < forces.length; i++) {
      const { x, y, r } = { x: 0, y: 0, r: 0, ...forces[i] };
      this.velocity.x += x;
      this.velocity.y += y;
      this.velocity.r += r;
    }
  }
  calculateNearest(entites) {
    let sorted = entites;
    sorted.sort((a, b) => {
      const a_dist = Math.hypot(a.x - this.x, a.y - this.y);
      const b_dist = Math.hypot(b.x - this.x, b.y - this.y);
      a.calculatedDistance = a_dist;
      b.calculatedDistance = b_dist;
      return b_dist - a_dist;
    });
    return sorted.reverse();
  }
  calculateAttraction(entities = []) {
    let force = {
      x: 0,
      y: 0,
      r: 0,
    };
    for (let i = 0; i < entities.length; i++) {
      const { x, y, size } = entities[i];
      const dist = Math.hypot(x - this.x, y - this.y);

      const density = entities[i].density || 1;
      const mass = Math.PI * size ** 2 * density ** GlobalConfig.MassConstant;
      const gravity_stregnth = GlobalConfig.GravitationalConstant * (mass / dist ** 2); //gravitational equation
      entities[i].gravity_stregnth = gravity_stregnth;
      if (gravity_stregnth > 0.00012) {
        const gravity_angle = Math.atan(
          Math.sqrt((this.x - x) ** 2) / Math.sqrt((this.y - y) ** 2)
        );
        entities[i].distance = dist;
        entities[i].gravitationalInfluence = gravity_stregnth;

        let x_gravity_multiplier = Math.sin(gravity_angle);
        let y_gravity_multiplier = Math.cos(gravity_angle);
        let rotational_gravity = 0; //holds the disired angle of the planet(so the bottom of the player points towards the center of the planet)
        const halfPI = Math.PI / 2;

        //sets rotation depending on the quadrant you are in. (-x, -y) = top right; (-x, +y) bottom right;( x,  y) bottom left; ( x, -y) top left
        if (this.x > x) {
          if (this.y > y) {
            x_gravity_multiplier *= -1;
            y_gravity_multiplier *= -1;
            rotational_gravity = halfPI * 4 - gravity_angle;
          } else {
            x_gravity_multiplier *= -1;
            rotational_gravity = halfPI * 2 + gravity_angle;
          }
        } else {
          if (this.y > y) {
            y_gravity_multiplier *= -1;
            rotational_gravity = gravity_angle;
          } else {
            rotational_gravity = halfPI * 2 - gravity_angle;
          }
        }

        entities[i].x_gravity_multiplier = x_gravity_multiplier;
        entities[i].y_gravity_multiplier = y_gravity_multiplier;

        //shortest distance between angles; https://stackoverflow.com/questions/28036652/finding-the-shortest-distance-between-two-angles
        const angle_distance =
          ((rotational_gravity - this.rotation + Math.PI) % (Math.PI * 2)) - Math.PI;

        force.r +=
          angle_distance * (gravity_stregnth ** 1.75 * GlobalConfig.RotationalGravityMultiplier);
        force.x += x_gravity_multiplier * gravity_stregnth;
        force.y += y_gravity_multiplier * gravity_stregnth;
      }
    }
    return force;
  }
}
