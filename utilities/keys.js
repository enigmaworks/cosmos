let keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false,
};

export function keyDownHandler(e) {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      keys.up = true;
    case "s":
    case "ArrowDown":
      keys.down = true;
      break;
    case "a":
    case "ArrowLeft":
      keys.left = true;
      break;
    case "d":
    case "ArrowRight":
      keys.right = true;
      break;
    case " ":
      keys.space = true;
      break;
    default:
      break;
  }
}
export function keyUpHandler(e) {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      keys.up = false;
      break;
    case "s":
    case "ArrowDown":
      keys.down = false;
      break;
    case "a":
    case "ArrowLeft":
      keys.left = false;
      break;
    case "d":
    case "ArrowRight":
      keys.right = false;
      break;
    case " ":
      keys.space = false;
      break;
  }
}
export default keys;
