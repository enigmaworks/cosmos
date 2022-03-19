import { CanvasManager } from "./utilities/canvasmanager.js";
import keys, { keyUpHandler, keyDownHandler } from "./utilities/keys.js";
import elementDrag from "./utilities/elementdrag.js";
import renderStarmap from "./renderers/starmap.js";

import { update } from "./update.js";
import { render } from "./render.js";

const { canvas, c } = CanvasManager.create();

import camera from "./entities/camera.js";
import player from "./entities/player.js";
import planets from "./entities/planets.js";

WebFont.load({
  google: {
    families: ["Teko:300"],
  },
  timeout: 3000,
  active: function () {
    CanvasManager.setResolution(canvas, c);
    document.body.addEventListener("keydown", keyDownHandler);
    document.body.addEventListener("keyup", keyUpHandler);
    startAnimating(60);

    const minimap = document.createElement("canvas");
    minimap.classList.add("map");
    document.body.appendChild(minimap);
    // minimap.onmousedown = elementDrag;

    const starmap = document.createElement("canvas");
    const starmap_c = starmap.getContext("2d");
    starmap.classList.add("starmap");
    document.body.appendChild(starmap);
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "m") starmap.classList.toggle("shown");
    });
    let { xmax } = CanvasManager.setResolution(starmap, starmap_c);
    renderStarmap(starmap_c, planets, xmax);

    window.onresize = () => {
      CanvasManager.setResolution(canvas, c);
      let { xmax } = CanvasManager.setResolution(starmap, starmap_c);
      renderStarmap(starmap_c, planets, xmax);
    };
  },
});

let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  // http://jsfiddle.net/14n0de7t/7/
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  animate();
}

function animate(newtime) {
  requestAnimationFrame(animate);
  now = newtime;
  elapsed = now - then;
  const sinceStart = now - startTime;
  const fps = Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    update(camera, player, keys);
    render({ canvas, c, camera, fps });
  }
}
