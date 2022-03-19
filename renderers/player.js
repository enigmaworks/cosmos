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
}
