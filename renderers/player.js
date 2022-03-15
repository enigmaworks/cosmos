import player from "../entities/player.js";

export default function (c, camera) {
  c.save();
  c.translate(player.x - camera.x, player.y - camera.y);
  c.rotate(player.rotation);
  c.fillStyle = "red";
  c.fillRect(-player.size / 2, -player.size * 1.5, player.size, player.size);
  c.beginPath();
  c.fillStyle = "purple";
  c.arc(0, 0, player.size, 0, Math.PI * 2);
  c.fill();
  c.restore();
}
