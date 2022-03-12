const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

CANVAS_SIZE = 500;

ctx.lineWidth = 3;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let filling = false;
let painting = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting() {
  painting = true;
}

function onMouseDown(event) {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
}

function handRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handelModeClick() {
  if (filling == true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handelCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handelCanvasClick);
}

if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handColorClick)
  );
}

if (range) {
  range.addEventListener("input", handRangeChange);
}

if (mode) {
  mode.addEventListener("click", handelModeClick);
}
