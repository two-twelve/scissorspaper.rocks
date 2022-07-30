precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D backBuffer;
uniform vec2 canvasSize;
uniform vec4 rockColour;
uniform vec4 paperColour;
uniform vec4 scissorsColour;
uniform float time;

// Converts a UV coordinate to the center position of the cell it belongs to
vec2 uvToCellCoord(vec2 uv) {
  vec2 cellCoord = (floor(uv * canvasSize) + ceil(uv * canvasSize)) / 2.0 / canvasSize;
  cellCoord.y = 1.0 - cellCoord.y;
  return cellCoord;
}

// Returns the value of a neighbour of the cell at cellCoord given an offset in cells
vec4 getNeighbour(vec2 cellCoord, vec2 offset) {
  vec2 pixSize = 1.0 / canvasSize;
  return texture2D(backBuffer, (cellCoord + (offset * pixSize)));
}

// Returns the number of neighbours of the cell at cellCoord that match the provided colour
int getNeighboursOfColour(vec2 cellCoord, vec4 colour) {
  return int(distance(getNeighbour(cellCoord, vec2(-1.0, -1.0)), colour) < 0.1)
       + int(distance(getNeighbour(cellCoord, vec2(-1.0,  0.0)), colour) < 0.1)
       + int(distance(getNeighbour(cellCoord, vec2(-1.0,  1.0)), colour) < 0.1)
       + int(distance(getNeighbour(cellCoord, vec2( 0.0, -1.0)), colour) < 0.1)
       + int(distance(getNeighbour(cellCoord, vec2( 0.0,  1.0)), colour) < 0.1)
       + int(distance(getNeighbour(cellCoord, vec2( 1.0, -1.0)), colour) < 0.1)
       + int(distance(getNeighbour(cellCoord, vec2( 1.0,  0.0)), colour) < 0.1)
       + int(distance(getNeighbour(cellCoord, vec2( 1.0,  1.0)), colour) < 0.1);
}

// Generates a random number given a 2D vector
float rand(vec2 seed){
    return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 cellCoord = uvToCellCoord(vTexCoord);

  vec4 currentVal = texture2D(backBuffer, cellCoord);
  
  if (distance(currentVal, rockColour) < 0.1) {
    int paperNeighbours = getNeighboursOfColour(cellCoord, paperColour);
    if (paperNeighbours >= 3) {
      gl_FragColor = paperColour;
    } else {
      gl_FragColor = rockColour;
    }
  } else if (distance(currentVal, paperColour) < 0.1) {
    int scissorsNeighbours = getNeighboursOfColour(cellCoord, scissorsColour);
    if (scissorsNeighbours >= 3) {
      gl_FragColor = scissorsColour;
    } else {
      gl_FragColor = paperColour;
    }
  } else if (distance(currentVal, scissorsColour) < 0.1){
    int rockNeighbours = getNeighboursOfColour(cellCoord, rockColour);
    if (rockNeighbours >= 3) {
      gl_FragColor = rockColour;
    } else {
      gl_FragColor = scissorsColour;
    }
  } else {
    float randomFloat = rand(vTexCoord * time);
    if (randomFloat < 1.0/3.0) {
      gl_FragColor = rockColour;
    } else if (randomFloat < 2.0/3.0) {
      gl_FragColor = paperColour;
    } else {
      gl_FragColor = scissorsColour;
    }
  }
}