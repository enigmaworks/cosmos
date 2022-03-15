import renderUnits from "./units.js";

export const CanvasManager = {
  create: () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.id = "canvas";
    const c = canvas.getContext("2d");
    return { canvas, c };
  },
  setResolution: ({ canvas, c }) => {
    let dpr = devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    c.scale(dpr, dpr);
    renderUnits.maxX = rect.width;
    renderUnits.maxY = rect.height;
  },
};
