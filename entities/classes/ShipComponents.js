export class EmptyCost {
  constructor() {
    this.fuel = 0;
    this.energy = 0;
    this.uranium = 0;
    this.hydrogen = 0;
    this.oxygen = 0;
    this.iron = 0;
    this.silver = 0;
    this.magnesium = 0;
  }
}
export class ShipComponent {
  constructor(initial, max, uses = {}) {
    this.currentState = initial;
    this.max = max;
    this.uses = {
      ...new EmptyCost(),
      ...uses,
    };
  }
}
export class Resource {
  constructor(level, capacity, minimum = 0) {
    this.level = level;
    this.capacity = capacity;
    this.minimum_capacity = minimum;
  }
  deplete(level, type = "value") {
    if (type === "percent") this.level *= 100 / level;
    if (type === "value") this.level -= level;
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
      ...new EmptyCost(),
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
