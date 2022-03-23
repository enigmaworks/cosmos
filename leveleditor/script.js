import { text } from "../utilities/textrenderer.js";
import { CanvasManager } from "../utilities/canvasmanager.js";
import starmap from "../renderers/starmap.js";

const planets = [];

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
  starmap(c, planets, xmax);
  requestAnimationFrame(update);
}

generateHTML(planets);
update();
function addPlanet() {
  planets.push({
    name: "New Planet",
    density: 1,
    size: 400,
    x: 0,
    y: 0,
    fill: {
      type: "gradient",
      f: [
        { s: 0, c: "red" },
        { s: 1, c: "yellow" },
      ],
    },
    atmosphere: "#888",
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
    let { name, size, x, y, density, atmosphere, fill } = planet;

    const nameElem = document.createElement("input");
    nameElem.type = "text";
    nameElem.value = name;
    nameElem.classList.add("name");
    nameElem.addEventListener("change", ({ target }) => {
      planet.name = target.value;
    });
    const sizeElem = document.createElement("input");
    sizeElem.type = "number";
    sizeElem.value = size;
    sizeElem.addEventListener("change", ({ target }) => {
      planet.size = parseInt(target.value);
    });
    const xElem = document.createElement("input");
    xElem.type = "number";
    xElem.value = x;
    xElem.addEventListener("change", ({ target }) => {
      planet.x = parseInt(target.value);
    });
    const yElem = document.createElement("input");
    yElem.type = "number";
    yElem.value = y;
    yElem.addEventListener("change", ({ target }) => {
      planet.y = parseInt(target.value);
    });
    const densityElem = document.createElement("input");
    densityElem.type = "number";
    densityElem.value = density;
    densityElem.addEventListener("change", ({ target }) => {
      planet.density = parseInt(target.value);
    });
    const atmosphereElem = document.createElement("input");
    atmosphereElem.type = "text";
    atmosphereElem.value = atmosphere;
    atmosphereElem.addEventListener("change", ({ target }) => {
      planet.atmosphere = target.value;
    });

    const div = document.createElement("div");

    const filldiv = document.createElement("div");

    const fillElem = document.createElement("input");
    fillElem.type = "text";
    fillElem.value = fill.type;
    fillElem.addEventListener("change", ({ target }) => {
      planet.fill.type = target.value;
    });

    if (fill.type === "color") {
      const fElem = document.createElement("input");
      fElem.type = "text";
      fElem.value = fill.f;
      filldiv.appendChild(fElem);
    } else {
      fill.f.forEach(({ s, c }, i) => {
        const elem = document.createElement("span");
        elem.classList.add("gradient-stop");
        const sElem = document.createElement("input");
        sElem.type = "number";
        sElem.value = s;
        sElem.addEventListener("change", ({ target }) => {
          planet.fill.f[i].s = parseFloat(target.value);
        });
        const cElem = document.createElement("input");
        cElem.type = "text";
        cElem.value = c;
        cElem.addEventListener("change", ({ target }) => {
          planet.fill.f[i].c = target.value;
        });
        elem.appendChild(sElem);
        elem.appendChild(cElem);
        filldiv.appendChild(elem);
      });
      let button = document.createElement("button");
      button.innerText = "Add Stop";
      button.addEventListener("click", () => {
        planet.fill.f.push({ s: 1, c: "red" });
        generateHTML(planets);
      });
      filldiv.appendChild(button);
      let xb = document.createElement("button");
      xb.innerText = "Remove Stop";
      xb.addEventListener("click", () => {
        planet.fill.f.splice(parseInt(window.prompt("Which stop?")) - 1, 1);
        generateHTML(planets);
      });
      filldiv.appendChild(xb);
    }
    div.appendChild(nameElem);
    div.appendChild(sizeElem);
    div.appendChild(xElem);
    div.appendChild(yElem);
    div.appendChild(densityElem);
    div.appendChild(atmosphereElem);
    div.appendChild(filldiv);
    div.appendChild(fillElem);
    fragment.appendChild(div);
  });
  document.querySelector(".container").appendChild(fragment);
}

function download() {
  const levelmap = JSON.stringify(planets);

  const file = new File([levelmap], "planet-data.js", {
    type: "text/javascript",
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
