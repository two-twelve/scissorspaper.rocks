const latticeWidth = 512
const latticeHeight = 512

let rockPaperScissorsShader
let backBuffer
let canvas

let rockColour
let paperColour
let scissorsColour

function preload(){
  rockPaperScissorsShader = loadShader('./vertex.glsl', './fragment.glsl')
}

function setup() {
  pixelDensity(1.0)
  
  canvas = createCanvas(latticeWidth, latticeHeight, WEBGL)
  backBuffer = createGraphics(latticeWidth, latticeHeight, WEBGL)

  const toRGBArray = (colour) => [colour.r, colour.g, colour.b, colour.a*255]
  let hue = Math.floor((Math.random() * 360))  
  rockColour = toRGBArray(window.tinycolor({h: hue + 90, s: 0.55, l: 0.25}).toRgb())
  paperColour = toRGBArray(window.tinycolor({h: hue, s: 0.75, l: 0.5}).toRgb())
  scissorsColour = toRGBArray(window.tinycolor({h: hue - 90, s: 0.95, l: 0.75}).toRgb())
}

function draw() {
  clear()

  shader(rockPaperScissorsShader)
  rockPaperScissorsShader.setUniform('backBuffer', backBuffer)
  rockPaperScissorsShader.setUniform("canvasSize", [latticeWidth, latticeHeight])
  rockPaperScissorsShader.setUniform("rockColour", rockColour.map(v => v/255))
  rockPaperScissorsShader.setUniform("paperColour", paperColour.map(v => v/255))
  rockPaperScissorsShader.setUniform("scissorsColour", scissorsColour.map(v => v/255))
  rockPaperScissorsShader.setUniform("time", Date.now()%1000)

  quad(0, 0, 1, 0, 1, 1, 0, 1)

  backBuffer.clear()
  backBuffer.image(canvas, latticeWidth * -0.5, latticeHeight * -0.5)
}
