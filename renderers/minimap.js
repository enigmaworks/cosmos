import { CanvasManager } from "../utilities/canvasmanager.js";
let firstRender = true;

let map_elem;
let map;
let mapsize;
const scale = 100;
export default function ({ camera, planets, player }) {
  if (firstRender) {
    map_elem = document.querySelector(".map");
    map = map_elem.getContext("2d");
    mapsize = map_elem.getBoundingClientRect().width * (devicePixelRatio || 1);
    CanvasManager.setResolution(map_elem, map, scale);
    firstRender = false;
  }
  map.clearRect(
    (-mapsize * scale) / 2,
    (-mapsize * scale) / 2,
    mapsize * scale,
    mapsize * scale
  );
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    if (
      planet.x - camera.x + planet.size > (-mapsize * scale) / 2 &&
      planet.x - camera.x - planet.size < (mapsize * scale) / 2 &&
      planet.y - camera.y + planet.size > (-mapsize * scale) / 2 &&
      planet.y - camera.y - planet.size < (mapsize * scale) / 2
    ) {
      map.save();
      map.translate(planet.x - camera.x, planet.y - camera.y);
      map.beginPath();
      map.fillStyle = "white";
      map.arc(0, 0, planet.size, 0, Math.PI * 2);
      map.fill();
      map.restore();
    }
  }
}