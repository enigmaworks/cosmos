import GlobalConfig from "../../GlobalConfig.js";
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
        collisions.push({ entity, i });
      }
    }
    return collisions;
  }
  getCollisionForce(entities, type = "static") {
    for (let i = 0; i < entities.length; i++) {
      const { size, x, y, x_gravity_multiplier, y_gravity_multiplier, gravity_stregnth } =
        entities[i];

      if (type === "static") {
        const dist = Math.hypot(x - this.x, y - this.y);
        if (dist <= size + this.size) {
          const collisonX = (this.x * size + x * this.size) / (this.size + size);
          const collisonY = (this.y * size + y * this.size) / (this.size + size);

          const distInsideEntity = size - Math.hypot(collisonX - x, collisonY - y);
          const distInsideSelf = this.size - Math.hypot(collisonX - this.x, collisonY - this.y);
          const distToMoveOut = distInsideEntity + distInsideSelf;

          // const hulldamage = 40 * Math.log(Math.hypot(this.xVel, this.yVel) - 3.5);
          // if (!(hulldamage < 0) && hulldamage) this.hullIntegrity -= hulldamage;
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
  calculateAttraction(entities = []) {
    let force = {
      x: 0,
      y: 0,
      r: 0,
    };
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const { x, y, size } = entity;
      const density = entity.density || 1;
      const mass = Math.PI * size ** 2 * density ** GlobalConfig.MassConstant;
      const dist = Math.hypot(x - this.x, y - this.y);
      const gravity_stregnth = GlobalConfig.GravitationalConstant * (mass / dist ** 2); //gravitational equation
      entity.gravity_stregnth = gravity_stregnth;
      const x_speed = Math.sqrt((this.x - x) ** 2);
      const y_speed = Math.sqrt((this.y - y) ** 2);
      const gravity_direction = Math.atan(x_speed / y_speed);

      entity.distance = dist;
      entity.gravitationalInfluence = gravity_stregnth;

      let x_gravity_multiplier = Math.sin(gravity_direction);
      let y_gravity_multiplier = Math.cos(gravity_direction);
      let rotational_gravity = 0; //holds the disired angle of the planet(so the bottom of the player points towards the center of the planet)
      const halfPI = Math.PI / 2;

      //sets rotation depending on the quadrant you are in. (-x, -y) = top right; (-x, +y) bottom right;( x,  y) bottom left; ( x, -y) top left
      if (this.x > x) {
        if (this.y > y) {
          x_gravity_multiplier *= -1;
          y_gravity_multiplier *= -1;
          rotational_gravity = halfPI * 4 - gravity_direction;
        } else {
          x_gravity_multiplier *= -1;
          rotational_gravity = halfPI * 2 + gravity_direction;
        }
      } else {
        if (this.y > y) {
          y_gravity_multiplier *= -1;
          rotational_gravity = gravity_direction;
        } else {
          rotational_gravity = halfPI * 2 - gravity_direction;
        }
      }

      entity.x_gravity_multiplier = x_gravity_multiplier;
      entity.y_gravity_multiplier = y_gravity_multiplier;

      //shortest distance between angles; https://stackoverflow.com/questions/28036652/finding-the-shortest-distance-between-two-angles
      const angle_distance =
        ((rotational_gravity - this.rotation + Math.PI) % (Math.PI * 2)) - Math.PI;

      force.r +=
        angle_distance * (gravity_stregnth ** 1.75 * GlobalConfig.RotationalGravityMultiplier);
      force.x += x_gravity_multiplier * gravity_stregnth;
      force.y += y_gravity_multiplier * gravity_stregnth;
    }
    return force;
  }
}
