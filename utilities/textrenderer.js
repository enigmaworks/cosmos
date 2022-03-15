export function text(str, x, y, { c }, styles = {}) {
  const defualts = {
    color: "#888",
    size: 22,
    font: "Teko, sans-serif",
    weight: "400",
    align: "center",
    style: "normal",
    variant: "normal",
    maxwidth: "500",
    baseline: "left",
  };
  const {
    color,
    size,
    font,
    weight,
    align,
    style,
    variant,
    maxwidth,
    baseline,
  } = { ...defualts, ...styles };
  c.font = `${style} ${variant} ${weight} ${size}px ${font}`;
  c.textAlign = align;
  c.fillStyle = color;
  c.textBaseline = baseline;
  let lines = getLines(str, maxwidth);
  lines.forEach(function (line, lineNum) {
    c.fillText(line, x, y + lineNum * size);
  });
}

export function getLines(text, maxWidth) {
  //splits given string into an array of strings representing lines of text that fit into a given width
  let string = `${text}`;
  let words = string.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    let width = c.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}