export default function ({ c, camera, player, keys }) {
  const path = new Path2D(player.sprite);
  c.save();
  c.translate(player.x - camera.x, player.y - camera.y);
  c.rotate(player.rotation + Math.PI / 2);
  c.translate(-player.size, -player.size * 1.25);
  c.scale(0.5 / player.size, 0.5 / player.size);
  c.fillStyle = keys.up ? "#fcc" : "#eee";
  c.fill(path);
  c.restore();

  // c.save();
  // c.translate(player.x - camera.x, player.y - camera.y);
  // c.rotate(player.rotation);
  // c.fillStyle = "red";
  // c.fillRect(-player.size / 2, -player.size * 1.5, player.size, player.size);
  // c.beginPath();
  // c.fillStyle = "purple";
  // c.arc(0, 0, player.size, 0, Math.PI * 2);
  // c.fill();
  // c.restore();
}
