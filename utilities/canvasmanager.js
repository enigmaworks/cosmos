import renderUnits from "./units.js";

export const CanvasManager = {
  create: () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.id = "canvas";
    const c = canvas.getContext("2d");
    return { canvas, c };
  },
  setResolution: (canvas, c, scale = 1) => {
    let dpr = devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    c.scale(dpr * (1 / scale), dpr * (1 / scale));
    if (canvas.id === "canvas") {
      renderUnits.maxX = rect.width * scale;
      renderUnits.maxY = rect.height * scale;
    }
    c.translate((rect.width * scale) / 2, (rect.height * scale) / 2);
  },
};
