import { CanvasManager } from "./utilities/canvasmanager.js";
import keys, { keyUpHandler, keyDownHandler } from "./utilities/keys.js";

import { update } from "./update.js";
import { render } from "./render.js";

const { canvas, c } = CanvasManager.create();

import camera from "./entities/camera.js";
import player from "./entities/player.js";

WebFont.load({
  google: {
    families: ["Teko:300"],
  },
  timeout: 3000,
  active: function () {
    CanvasManager.setResolution(canvas, c);
    window.onresize = () => {
      CanvasManager.setResolution(canvas, c);
    };
    document.body.addEventListener("keydown", keyDownHandler);
    document.body.addEventListener("keyup", keyUpHandler);
    startAnimating(60);

    const map = document.createElement("canvas");
    map.classList.add("map");
    document.body.appendChild(map);
    map.onmousedown = dragMouseDown;
    let pos1,
      pos2,
      pos3,
      pos4 = 0;
    // https://www.w3schools.com/howto/howto_js_draggable.asp
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      map.style.top = map.offsetTop - pos2 + "px";
      map.style.left = map.offsetLeft - pos1 + "px";
    }
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
});

// const framerate = 60;
// let sysTime = Date.now();
// let lag = framerate;

// function loop() {
//   lag += Date.now() - sysTime;
//   let delta = Date.now() - sysTime;
//   sysTime = Date.now();
//   while (lag >= 1000 / framerate) {
//     update(camera, player, keys);
//     lag -= 1000 / framerate;
//   }
//   render({ canvas, c, camera, delta });
//   requestAnimationFrame(loop);
// }

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
