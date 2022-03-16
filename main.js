import { CanvasManager } from "./utilities/canvasmanager.js";
import keys, { keyUpHandler, keyDownHandler } from "./utilities/keys.js";

import { update } from "./update.js";
import { render } from "./render.js";

const { canvas, c } = CanvasManager.create();

import camera from "./entities/camera.js";
import player from "./entities/player.js";

WebFont.load({
  google: {
    families: ["Teko:300", "Red+Hat+Mono:400"],
  },
  timeout: 3000,
  active: function () {
    sysTime = Date.now();
    CanvasManager.setResolution({ canvas, c });
    window.onresize = () => {
      CanvasManager.setResolution({ canvas, c });
    };
    document.body.addEventListener("keydown", keyDownHandler);
    document.body.addEventListener("keyup", keyUpHandler);
    requestAnimationFrame(loop);
  },
});

const framerate = 60;
let sysTime = Date.now();
let lag = framerate;

function loop() {
  lag += Date.now() - sysTime;
  let delta = Date.now() - sysTime;
  sysTime = Date.now();
  while (lag >= 1000 / framerate) {
    update(camera, player, keys);
    lag -= 1000 / framerate;
  }
  render({ canvas, c, camera, delta });
  requestAnimationFrame(loop);
}
