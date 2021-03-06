import { CanvasManager } from "./utilities/canvasmanager.js";
import keys, { keyUpHandler, keyDownHandler } from "./utilities/keys.js";
import renderStarmap from "./renderers/starmap.js";

import { update } from "./update.js";
import { render } from "./render.js";

const { canvas, c } = CanvasManager.create();

import planets from "./entities/planets.js";
import Player from "./entities/player.js";
import StaticEntity from "./entities/classes/StaticEntity.js";
import settings from "./gamedata/settings.js";

let player;
let camera;

function fontsReady() {
  fetch(`/gamedata/${settings.planetdataFileName}`)
    .then((response) => response.json())
    .then(function (data) {
      planets.createBodiesWithData(data, c);
      player = new Player();
      camera = new StaticEntity(0, 0, 0, 0);

      CanvasManager.setResolution(canvas, c);
      document.body.addEventListener("keydown", keyDownHandler);
      document.body.addEventListener("keyup", keyUpHandler);

      const minimap = document.createElement("canvas");
      minimap.classList.add("map");
      document.body.appendChild(minimap);

      const starmap = document.createElement("canvas");
      const starmap_c = starmap.getContext("2d");
      starmap.classList.add("starmap");
      document.body.appendChild(starmap);
      document.body.addEventListener("keydown", (e) => {
        if (e.key === "m") starmap.classList.toggle("shown");
      });
      let { xmax } = CanvasManager.setResolution(starmap, starmap_c);
      renderStarmap(starmap_c, planets.bodies, xmax);

      window.onresize = () => {
        CanvasManager.setResolution(canvas, c);
        let { xmax } = CanvasManager.setResolution(starmap, starmap_c);
        renderStarmap(starmap_c, planets.bodies, xmax);
      };

      startAnimating(60);
    });
}

WebFont.load({
  google: {
    families: ["Exo+2:wght@300"],
  },
  timeout: 3000,
  active: fontsReady,
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
    update(camera, player, keys, planets);
    render({ canvas, c, camera, fps, planets, player });
  }
}
