export default class StaticEntity {
  constructor(x, y, rotation, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = rotation;
    this.density = 1;
  }
  setDenisty(density) {
    this.density = density;
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
}
