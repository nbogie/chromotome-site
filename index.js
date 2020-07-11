import * as tome from 'chromotome';
import Chance from 'chance';

const width = 360;
const size = 80;
const padding = 10;
const height = size + 2 * padding;
const chance = new Chance();

window.onload = function() {
  const palettes = chance.shuffle(tome.getAll());
  displayPalettes(palettes);
};

function displayPalettes(palettes) {
  const content = document.getElementById('content');
  palettes.forEach(palette => displayPalette(palette, content));
}

function displayPalette(palette, content) {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const n = palette.size;
  const el_width = (width - (n + 1) * padding) / n;
  const placement = i => i * (el_width + padding) + padding;

  if (palette.background) {
    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.translate(15, 15);
  palette.colors.forEach((color, i) =>
    displayColor(color, palette.stroke, placement(i), el_width, ctx)
  );

  const paragraph = document.createElement('p');
  paragraph.appendChild(document.createTextNode(palette.name));

  const container = document.createElement('div');
  container.appendChild(canvas);
  container.appendChild(paragraph);
  container.addEventListener("click", () => copyPaletteToClipboardAsJSON(palette))
  content.appendChild(container);
}

function displayColor(color, stroke, pos, width, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(pos, padding, width, size);
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 4;
    ctx.strokeRect(pos, padding, width, size);
  }
}

function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = width + 30;
  canvas.height = height + 30;

  return canvas;
}

function copyPaletteToClipboardAsJSON(palette) {
  navigator.clipboard.writeText(JSON.stringify(palette, null, 2));
}