import { text } from "../utilities/textrenderer.js";
import { CanvasManager } from "../utilities/canvasmanager.js";
import starmap from "../renderers/starmap.js";

let planets = [];

const canvas = document.createElement("canvas");
const c = canvas.getContext("2d");
document.body.appendChild(canvas);

let { xmax } = CanvasManager.setResolution(canvas, c);

window.onresize = () => {
  CanvasManager.setResolution(canvas, c);
  ({ xmax } = CanvasManager.setResolution(canvas, c));
};

function update() {
  c.clearRect(-xmax / 2, -xmax / 2, xmax, xmax);
  try {
    starmap(c, planets, xmax);
  } catch (e) {
    console.log(e);
  }
  requestAnimationFrame(update);
}

class RandomContent {
  constructor() {
    this.uranium = Math.floor(Math.random() * 10);
    this.hydrogen = Math.floor(Math.random() * 10);
    this.oxygen = Math.floor(Math.random() * 10);
    this.iron = Math.floor(Math.random() * 10);
    this.silver = Math.floor(Math.random() * 10);
    this.magnesium = Math.floor(Math.random() * 10);
  }
}

const fileElem = document.querySelector("#file");
fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
  const fileList = this.files;
  let reader = new FileReader();
  reader.readAsText(fileList[0]);
  reader.addEventListener("load", () => {
    let res = reader.result;
    console.log(JSON.parse(res));
    planets = JSON.parse(res);
    generateHTML(planets);
  });
}

document.querySelector("#local").addEventListener("click", () => {
  localStorage.setItem("map", JSON.stringify(planets));
});
document.querySelector("#local-load").addEventListener("click", () => {
  let p = localStorage.getItem("map") || [];
  p = JSON.parse(p);
  for (let planet in p) {
    delete p[planet].fill;
    p[planet].atmosphere = {
      density: 1,
      content: new RandomContent(),
    };
    p[planet].mantle = {
      density: 1,
      content: new RandomContent(),
    };
    p[planet].core = {
      density: 1,
      content: new RandomContent(),
    };
  }
  planets = p;
  generateHTML(planets);
});

generateHTML(planets);
update();
function addPlanet() {
  planets.push({
    name: "New Planet",
    size: Math.random() * 300 + 150,
    x: Math.random() * 30000 - 15000,
    y: Math.random() * 30000 - 15000,
    density: 1,
    atmosphere: {
      density: 1,
      content: new RandomContent(),
    },
    mantle: {
      density: 1,
      content: new RandomContent(),
    },
    core: {
      density: 1,
      content: new RandomContent(),
    },
  });
  generateHTML(planets);
}

document.querySelector(".add").addEventListener("click", addPlanet);

document.querySelector(".remove").addEventListener("click", () => {
  planets.splice(parseInt(window.prompt("Which planet?")) - 1, 1);
  generateHTML(planets);
});

function generateHTML(planets) {
  document.querySelector(".container").innerHTML = "";
  const fragment = document.createDocumentFragment();
  planets.forEach((planet) => {
    let { name, size, x, y, density, atmosphere, mantle, core } = planet;

    const nameElem = createInput("text", "name", name, (val) => (planet.name = val));
    nameElem.classList.add("name");
    const sizeElem = createInput(
      "number",
      "size",
      size,
      (val) => (planet.size = parseInt(val) || 1)
    );
    const xElem = createInput(
      "number",
      "x",
      x / 100,
      (val) => (planet.x = parseInt(val) * 100 || 0)
    );
    const yElem = createInput(
      "number",
      "y",
      y / -100,
      (val) => (planet.y = parseInt(val) * -100 || 0)
    );
    const densityElem = createInput(
      "number",
      "density",
      density,
      (val) => (planet.density = parseFloat(val)),
      { step: 0.01 }
    );
    const div = document.createElement("div");

    const atmosphereContainer = document.createElement("details");
    const atmosphereSummary = document.createElement("summary");
    atmosphereSummary.innerText = "atmosphere";
    atmosphereContainer.appendChild(atmosphereSummary);
    atmosphereContainer.classList.add("atmosphere");

    for (const elem in atmosphere.content) {
      const sElem = createInput(
        "number",
        elem,
        atmosphere.content[elem],
        (val) => (atmosphere.content[elem] = parseInt(val))
      );
      atmosphereContainer.appendChild(sElem);
    }

    const mantleContainer = document.createElement("details");
    const mantleSummary = document.createElement("summary");
    mantleSummary.innerText = "mantle";
    mantleContainer.appendChild(mantleSummary);
    mantleContainer.classList.add("mantle");

    for (const elem in mantle.content) {
      const sElem = createInput(
        "number",
        elem,
        mantle.content[elem],
        (val) => (mantle.content[elem] = parseInt(val))
      );
      mantleContainer.appendChild(sElem);
    }

    const coreContainer = document.createElement("details");
    const coreSummary = document.createElement("summary");
    coreSummary.innerText = "core";
    coreContainer.appendChild(coreSummary);
    coreContainer.classList.add("core");

    for (const elem in core.content) {
      const sElem = createInput(
        "number",
        elem,
        core.content[elem],
        (val) => (core.content[elem] = parseInt(val))
      );
      coreContainer.appendChild(sElem);
    }
    div.appendChild(nameElem);
    div.appendChild(sizeElem);
    div.appendChild(xElem);
    div.appendChild(yElem);
    div.appendChild(densityElem);
    div.appendChild(atmosphereContainer);
    div.appendChild(mantleContainer);
    div.appendChild(coreContainer);
    fragment.appendChild(div);
  });
  document.querySelector(".container").appendChild(fragment);
}

function createInput(type, label, defualt, listener, options = {}) {
  const id = Math.floor(Math.random() * 10000000);
  const { step, listenerType } = {
    step: null,
    listenerType: "change",
    ...options,
  };
  const input = document.createElement("input");
  input.id = id;
  input.type = type;
  input.value = defualt;
  const labelElem = document.createElement("label");
  labelElem.htmlFor = id;
  labelElem.innerText = `${label}`;
  if (step) {
    input.step = step;
  }
  input.addEventListener(listenerType, (event) => {
    listener(event.target.value);
  });
  let group = document.createElement("span");
  group.appendChild(labelElem);
  group.appendChild(input);
  return group;
}

function download() {
  const levelmap = JSON.stringify(planets);

  const file = new File([levelmap], "planet-data.json", {
    type: "application/json",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(file);

  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

document.querySelector(".save").addEventListener("click", () => {
  download();
});
