const canvasWidth = 512
const canvasHeight = 512

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
  canvas = createCanvas(canvasWidth, canvasHeight, WEBGL)
  backBuffer = createGraphics(canvasWidth, canvasHeight, WEBGL)

  const toRGBArray = (colour) => [colour.r, colour.g, colour.b, colour.a*255]
  let hue = Math.floor((Math.random() * 360))  
  rockColour = toRGBArray(window.tinycolor({h: hue + 45, s: 0.55, l: 0.25}).toRgb())
  paperColour = toRGBArray(window.tinycolor({h: hue, s: 0.75, l: 0.5}).toRgb())
  scissorsColour = toRGBArray(window.tinycolor({h: hue - 45, s: 0.95, l: 0.75}).toRgb())

  frameRate(30)

  let initialFrame = createImage(canvasWidth, canvasHeight)
  initialFrame.loadPixels()
  for (y = 0; y < initialFrame.height; y++) {
    for (x = 0; x < initialFrame.width; x++) {
      let index = (x + y * canvasWidth) * 4
      switch (random([1,2,3])) {
        case 1:
          initialFrame.pixels[index+0] = rockColour[0]
          initialFrame.pixels[index+1] = rockColour[1]
          initialFrame.pixels[index+2] = rockColour[2]
          break
        case 2:
          initialFrame.pixels[index+0] = paperColour[0]
          initialFrame.pixels[index+1] = paperColour[1]
          initialFrame.pixels[index+2] = paperColour[2]
          break
        case 3:
          initialFrame.pixels[index+0] = scissorsColour[0]
          initialFrame.pixels[index+1] = scissorsColour[1]
          initialFrame.pixels[index+2] = scissorsColour[2]
      }      
      initialFrame.pixels[index + 3] = 255
    }
  }
  initialFrame.updatePixels()

  backBuffer.clear()
  backBuffer.image(initialFrame, canvasWidth * -0.5, canvasHeight * -0.5)
}

function draw() {
  clear()

  shader(rockPaperScissorsShader)
  rockPaperScissorsShader.setUniform('backBuffer', backBuffer)
  rockPaperScissorsShader.setUniform("canvasSize", [canvasWidth, canvasHeight])
  rockPaperScissorsShader.setUniform("rockColour", rockColour.map(v => v/255))
  rockPaperScissorsShader.setUniform("paperColour", paperColour.map(v => v/255))
  rockPaperScissorsShader.setUniform("scissorsColour", scissorsColour.map(v => v/255))

  quad(0, 0, 1, 0, 1, 1, 0, 1)

  backBuffer.clear()
  backBuffer.image(canvas, canvasWidth * -0.5, canvasHeight * -0.5)
}
