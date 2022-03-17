export default [
  {
    name: "Planet One",
    density: 1,
    size: 300,
    x: 2000,
    y: 3000,
    fill: {
      type: "gradient",
      f: {
        stop1: { s: 0, c: "aqua" },
        stop2: { s: 1, c: "blue" },
      },
    },
    atmosphere: "aqua",
  },
  {
    name: "Planet One",
    density: 1,
    size: 400,
    x: 0,
    y: 1000,
    fill: {
      type: "gradient",
      f: {
        stop1: { s: 0, c: "red" },
        stop2: { s: 1, c: "yellow" },
      },
    },
    atmosphere: "red",
  },
  {
    name: "Planet One",
    density: 1,
    size: 600,
    x: -1100,
    y: 50000,
    fill: {
      type: "gradient",
      f: {
        stop1: { s: 0, c: "purple" },
        stop2: { s: 1, c: "magenta" },
      },
    },
    atmosphere: "magenta",
  },
];
