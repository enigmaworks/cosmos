export class ShipComponent {
  constructor(initial, capacity, uses = {}) {
    this.current = initial;
    this.max_level = capacity;
    this.uses = {
      fuel: 0,
      energy: 0,
      oxygen: 0,
      ...uses,
    };
  }
}
export class StorageItem {
  constructor(amount, capacity, minimum = 0) {
    this.amount = amount;
    this.capacity = capacity;
    this.minimum_capacity = minimum;
  }
  deplete(amount, type = "value") {
    if (type === "percent") this.amount *= 100 / amount;
    if (type === "value") this.amount -= amount;
  }
}
export class Weapon {
  constructor(damage, range, cooldown, options = { clustersize: 1, cost: {}, amount: Infinity }) {
    this.damage = damage;
    this.clustersize = options.clustersize;
    this.range = range;
    this.cooldown = cooldown;
    this.amount = options.amount;
    this.cost = {
      uranium: 0,
      hydrogen: 0,
      oxygen: 0,
      aluminum: 0,
      silver: 0,
      magnesium: 0,
      ...options.cost,
    };
  }
}
