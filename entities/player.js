import MoveabelEntity from "./classes/MoveableEntity.js";
import { Weapon, ShipComponent, Resource, LifesupportSystem } from "./classes/ShipComponents.js";
export default class Player extends MoveabelEntity {
  constructor() {
    super(0, 0, 0, 10);
  }
  sprite =
    "M592.604 208.244C559.735 192.836 515.777 184 472 184H186.327c-4.952-6.555-10.585-11.978-16.72-16H376C229.157 137.747 219.403 32 96.003 32H96v128H80V32c-26.51 0-48 28.654-48 64v64c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v16c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v64c0 35.346 21.49 64 48 64V352h16v128h.003c123.4 0 133.154-105.747 279.997-136H169.606c6.135-4.022 11.768-9.445 16.72-16H472c43.777 0 87.735-8.836 120.604-24.244C622.282 289.845 640 271.992 640 256s-17.718-33.845-47.396-47.756zM488 296a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8c31.909 0 31.942 80 0 80z";

  fuel = new Resource(800, 800);
  oxygen = new Resource(200, 200);
  uranium = new Resource(50, 50);

  engine = {
    main: new ShipComponent(0, 0, { fuel: 0.04 }),
    booster: new ShipComponent(1, 4.25, { fuel: 0.025 }),
  };

  reactor = {
    storedEnergy: 0,
    max_energy_storage: 20,
    max_output: 0.35,
    rate: 0.015,
    cost: 0.0005,
    generateEnergy: () => {
      let output = 0;
      while (
        this.reactor.storedEnergy < this.reactor.max_energy_storage &&
        this.reactor.rate * output < this.reactor.max_output &&
        this.uranium.level - this.reactor.cost >= 0
      ) {
        this.reactor.storedEnergy += this.reactor.rate;
        output++;
        this.uranium.level -= this.reactor.cost;
      }
    },
  };

  lifesupport = {
    systems: [
      new LifesupportSystem(this, "temp", 35, 19, 13, 34, 0.02, 0.215),
      new LifesupportSystem(this, "pressure", 0.5, 1, 0.45, 2.5, 0.005, 0.025),
      new LifesupportSystem(this, "radiation", 300, 0, -Infinity, 20000, 0.25, 0.125),
    ],
    run: () => {
      const reactor = this.reactor;
      const systems = this.lifesupport.systems;
      let totalCost = 0;

      systems.forEach((sys) => {
        if (sys.level - sys.rate >= sys.stable || sys.level + sys.rate <= sys.stable) {
          totalCost += sys.energycost;
        }
      });

      let multiplier = 1;
      if (reactor.storedEnergy - totalCost <= 0) multiplier = reactor.storedEnergy / systems.length;

      systems.forEach((sys) => {
        sys.level = sys.parent[sys.prop] || sys.level;
        if (sys.level - sys.rate * multiplier >= sys.stable) {
          sys.level -= sys.rate * multiplier;
          reactor.storedEnergy -= sys.energycost * multiplier;
        } else if (sys.level + sys.rate * multiplier <= sys.stable) {
          sys.level += sys.rate * multiplier;
          reactor.storedEnergy -= sys.energycost * multiplier;
        }
        sys.parent[sys.prop] = sys.level;
      });
    },
  };

  hull = {
    ...new ShipComponent(100, 100),
    calculateDamage(collisons) {
      for (let i = 0; i < collisons.length; i++) {
        const hulldamage = 40 * Math.log(Math.hypot(this.velocity.x, this.velocity.y) - 3.5);
        if (!(hulldamage < 0) && hulldamage) this.hull.integrity -= hulldamage;
      }
    },
  };

  sheild = {
    ...new ShipComponent(100, 100, { energy: 0.02 }),
  };

  weapons = {
    laser: new Weapon(1, 130, 10),
    flare: new Weapon(0, 40, 0, {
      clustersize: 5,
      cost: {
        fuel: 10,
      },
    }),
    missiles: new Weapon(3, 80, 30, { amount: 10 }),
  };

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
    this.engine_x = xForce;
    this.engine_y = yForce;
    return { r: rotationForce, x: xForce, y: yForce };
  }

  render({ c, camera, keys }) {
    const path = new Path2D(this.sprite);
    c.save();
    c.translate(this.x - camera.x, this.y - camera.y);
    c.rotate(this.rotation + Math.PI / 2);
    c.translate(-this.size, -this.size * 1.25);
    c.scale(0.5 / this.size, 0.5 / this.size);
    c.fillStyle = "#eee";
    c.fill(path);
    c.restore();
  }
}
