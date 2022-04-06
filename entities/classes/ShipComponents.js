export class ShipComponent {
  constructor(initial, max, uses = {}) {
    this.currentState = initial;
    this.max = max;
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
export class LifesupportSystem {
  // inital = numerical, the starting value for this system
  // goal = the ideal value for this system to reach
  // min & max =  the lowest or highest value the system can reach before game over
  // rate =  when on full power, the fastest rate the system can change
  // energy use = the amount of energy used per change of amount rate
  //parent = the object to apply the property to.
  //propName =  the name to access the total system from (systemObject.propName)

  constructor(parent, propName, initial, goal, min, max, rate, energyUse) {
    this.parent = parent;
    this.prop = propName;
    this.level = initial;
    this.stable = goal;
    this.min = min;
    this.max = max;
    this.rate = rate;
    this.energycost = energyUse;
  }
}
