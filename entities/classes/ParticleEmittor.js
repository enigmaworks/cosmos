import MoveabelEntity from "./MoveableEntity.js";

export default class ParticleEmittor extends MoveabelEntity {
  constructor(x, y, r) {
    super(x, y, r, 1);
    this.density = 2;
    this.particles = [];
    this.lifetime = 50;
  }
  setPositionType(type) {
    this.type = type;
  }
  setRenderer(renderer) {
    this.renderer = renderer;
  }
  setLifetime(lifetime) {
    this.lifetime = lifetime;
  }
  render(data, camera, c) {
    this.particles.forEach((particle) => {
      particle.move();
      particle.lifetime--;
    });
    this.particles.forEach((particle, i) => {
      const { x, y, rotation, size, lifetime } = particle;
      if (this.type === "world") {
        this.renderer(data, c, x - camera.x, y - camera.y, rotation, size, lifetime);
      } else if (this.type == "rotational_world") {
        let x_speed = Math.sin(this.rotation + rotation);
        let y_speed = Math.cos(this.rotation + rotation);
        this.renderer(
          data,
          c,
          (x - camera.x) * x_speed,
          (y - camera.y) * y_speed,
          rotation,
          size,
          lifetime
        );
      } else if (this.type == "rotational") {
        this.renderer(data, c, x, y, rotation, size, lifetime);
      } else {
        this.renderer(data, c, x, y, rotation, size, lifetime);
      }

      if (lifetime < 0) {
        this.particles.splice(i, 1);
      }
    });
  }
  emit(amount, vel = {}, size = 1) {
    for (let i = 0; i < amount; i++) {
      let particle = new MoveabelEntity(this.x, this.y, this.rotation, size, vel);
      particle.lifetime = this.lifetime;
      this.particles.push(particle);
    }
  }
}
