let pos1,
  pos2,
  pos3,
  pos4 = 0;
// https://www.w3schools.com/howto/howto_js_draggable.asp
export default function (e) {
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
  e.target.style.top = e.target.offsetTop - pos2 + "px";
  e.target.style.left = e.target.offsetLeft - pos1 + "px";
}
function closeDragElement() {
  // stop moving when mouse button is released:
  document.onmouseup = null;
  document.onmousemove = null;
}
