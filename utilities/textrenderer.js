export function text(str, x, y, c, styles = {}) {
  const defualts = {
    color: "#aaa",
    stroke_color: "#777",
    size: 16,
    linewidth: 2,
    stroke: false,
    fill: true,
    font: "'Exo 2', sans-serif",
    weight: "200",
    align: "left",
    style: "normal",
    variant: "normal",
    maxwidth: "500",
    baseline: "top",
  };
  const {
    stroke,
    fill,
    color,
    size,
    font,
    weight,
    align,
    style,
    variant,
    maxwidth,
    baseline,
    linewidth,
    stroke_color,
  } = {
    ...defualts,
    ...styles,
  };
  c.font = `${style} ${variant} ${weight} ${size}px ${font}`;
  c.textAlign = align;
  c.fillStyle = color;
  c.strokeStyle = stroke_color;
  c.linewidth = linewidth;
  c.textBaseline = baseline;
  let lines = getLines(str, maxwidth, c);
  lines.forEach(function (line, lineNum) {
    if (fill) c.fillText(line, x, y + lineNum * size);
    if (stroke) c.strokeText(line, x, y + lineNum * size);
  });
}

export function getLines(text, maxWidth, c) {
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
