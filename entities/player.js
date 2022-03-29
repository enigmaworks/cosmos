import MoveabelEntity from "./MoveableEntity.js";
export default class Player extends MoveabelEntity {
  constructor() {
    super(0, 0, 0, 10);
  }
  sprite =
    "M592.604 208.244C559.735 192.836 515.777 184 472 184H186.327c-4.952-6.555-10.585-11.978-16.72-16H376C229.157 137.747 219.403 32 96.003 32H96v128H80V32c-26.51 0-48 28.654-48 64v64c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v16c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v64c0 35.346 21.49 64 48 64V352h16v128h.003c123.4 0 133.154-105.747 279.997-136H169.606c6.135-4.022 11.768-9.445 16.72-16H472c43.777 0 87.735-8.836 120.604-24.244C622.282 289.845 640 271.992 640 256s-17.718-33.845-47.396-47.756zM488 296a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8c31.909 0 31.942 80 0 80z";

  booster = 1;
  fuel = Infinity;
  oxygen = 200;
  hullIntegrity = 100;

  acceleration = 0.024;
  booster_acceleration = 0.025;
  oxygen_depletion = 0.005;

  booster_max = 5.83;
  oxygen_max = 200;
  hullIntegrity_max = 100;
  fuel_max = 140;

  calculateControlForce(keys) {
    let rotationForce = 0;
    if (keys.left) {
      rotationForce = -0.002;
    }
    if (keys.right) {
      rotationForce = 0.002;
    }
    if (keys.space && this.fuel > 0) {
      if (this.booster < this.booster_max) {
        this.booster += this.booster_acceleration;
      }
      this.fuel -= this.booster_max / 200;
    } else {
      this.booster = 1;
    }
    let xForce = 0;
    let yForce = 0;
    if (keys.up && this.fuel > 0) {
      xForce = -(this.acceleration * Math.sin(this.rotation)) * this.booster;
      yForce = this.acceleration * Math.cos(this.rotation) * this.booster;
      this.fuel -= this.acceleration;
    }
    return { r: rotationForce, x: xForce, y: yForce };
  }

  render({ c, camera, keys }) {
    const path = new Path2D(this.sprite);
    c.save();
    c.translate(this.x - camera.x, this.y - camera.y);
    c.rotate(this.rotation + Math.PI / 2);
    c.translate(-this.size, -this.size * 1.25);
    c.scale(0.5 / this.size, 0.5 / this.size);
    c.fillStyle = keys.up ? "#fcc" : "#eee";
    c.fill(path);
    c.restore();
  }
}
