import { CanvasManager } from "../utilities/canvasmanager.js";
let firstRender = true;

let map_elem;
let map;
let mapsize;
const scale = 40;

export default function ({ camera, planets, player }) {
  if (firstRender) {
    map_elem = document.querySelector(".map");
    map = map_elem.getContext("2d");
    mapsize = map_elem.getBoundingClientRect().width * (devicePixelRatio || 1);
    CanvasManager.setResolution(map_elem, map, scale);
    firstRender = false;
  }

  map.clearRect((-mapsize * scale) / 2, (-mapsize * scale) / 2, mapsize * scale, mapsize * scale);

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
      let fill = "#888";
      if (planet.fill.type === "color") {
        fill = planet.fill.f;
      }
      if (planet.fill.type === "img") {
        fill = map.createPattern(planet.fill.f, "repeat");
      }
      if (planet.fill.type === "gradient") {
        fill = map.createLinearGradient(
          planet.size / 2,
          planet.size / 2,
          -planet.size / 2,
          -planet.size / 2
        );
        Object.values(planet.fill.f).forEach((stop) => {
          fill.addColorStop(stop.s, stop.c);
        });
      }
      map.fillStyle = fill;
      map.arc(0, 0, planet.size, 0, Math.PI * 2);
      map.fill();
      map.restore();
    }
  }

  map.save();
  map.translate(player.x - camera.x, player.y - camera.y);

  //account for sprite rotation and offset
  map.rotate(player.rotation + Math.PI / 2);
  map.translate((-player.size * scale) / 3, (-player.size * 1.25 * scale) / 3);
  map.scale(((0.5 / player.size) * scale) / 3, ((0.5 / player.size) * scale) / 3);

  map.beginPath();

  map.fillStyle = "#eee";
  map.fill(new Path2D(player.sprite));

  map.restore();
}
