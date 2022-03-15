import { CanvasManager } from "./utilities/canvasmanager.js";

import { update } from "./update.js";
import { render } from "./render.js";

const { canvas, c } = CanvasManager.create();
let sysTime;

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
    requestAnimationFrame(loop);
  },
});

function loop() {
  let delta = Date.now() - sysTime;
  sysTime = Date.now();
  update(delta);
  render({ canvas, c, delta });
  requestAnimationFrame(loop);
}
