export class ShipComponent {
  constructor(initial, capacity, { uses = {} }) {
    this.current = initial;
    this.max_level = capacity;
    this.rate = rate;
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
    this.amount = initial;
    this.capacity = capacity;
    this.minimum_capacity = minimum;
  }
}
export class Weapon {
  constructor(damage, range, cooldown, { clustersize = 1, cost = {}, amount = Infinity }) {
    this.damage = damage;
    this.clustersize = clustersize;
    this.range = range;
    this.cooldown = cooldown;
    this.amount = Infinity;
    this.amount = amount;
    this.cost = {
      uranium: 0,
      hydrogen: 0,
      oxygen: 0,
      aluminum: 0,
      silver: 0,
      magnesium: 0,
      ...cost,
    };
  }
}
