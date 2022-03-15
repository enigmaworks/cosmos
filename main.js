import { CanvasManager } from "./utilities/canvasmanager.js";

const { canvas, c } = CanvasManager.create();
let sysTime;


function loop() {
  let delta = Date.now() - sysTime;
  sysTime = Date.now();
  requestAnimationFrame(loop);
}
