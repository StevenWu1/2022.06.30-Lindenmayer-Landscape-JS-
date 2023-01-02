function setup() {
  createCanvas(400, 600);
  frameRate(1);
  noLoop();
  angleMode(DEGREES);
  system.display();
}

function draw() {
  background("white");
}

function mousePressed() {
  for (i = 0; i < 6; i++) {
    system.next();
    system.display();
  }
}

// Example L-Systems ///////////////////////////////////
// See LSystem.js and StochasticLSystem.js.
// At the bottom of this file, pick a system to draw.

const system1 = new LSystem({
  initString: "A",
  rules: [
    { before: "A", after: "AB" },
    { before: "B", after: "A" },
  ],
  stepSize: 10,
  turnSize: 2,
});

const system2 = new LSystem({
  initString: "F",
  rules: [{ before: "F", after: "FF+" }],
  stepSize: 10,
  turnSize: 2,
});

const plant1 = new LSystem({
  initString: "F",
  rules: [{ before: "F", after: "F[+F]F[-F]F" }],
  stepSize: 2,
  turnSize: 25,
});

const plant2 = new LSystem({
  initString: "F",
  rules: [{ before: "F", after: "F[+F]F[-F][F]" }],
  stepSize: 7,
  turnSize: 25,
});

const plant3 = new LSystem({
  initString: "X",
  rules: [
    { before: "X", after: "F[+X]F[-X]+X" },
    { before: "F", after: "FF" },
  ],
  stepSize: 6,
  turnSize: 25,
});

const randomPlant1 = new StochasticLSystem({
  initString: "F",
  stepSize: 5,
  turnSize: 25,
  rules: [
    {
      before: "F",
      afters: [
        { pr: 0.33, after: "F[+F]F[-F]F" }, // rule from before
        { pr: 0.33, after: "F[+F]F" },
        { pr: 0.34, after: "F[-F]F" },
      ],
    },
  ],
});

const randomPlant2 = new StochasticLSystem({
  initString: "F",
  stepSize: 10,
  turnSize: 30,
  rules: [
    {
      before: "F",
      afters: [
        { pr: 0.5, after: "F[+F]F" }, // rule from before
        { pr: 0.25, after: "F[-F]F[+F][F]" },
        { pr: 0.25, after: "F[+F]F[-F][F]" },
      ],
    },
  ],
});

let plantChoices = [plant1, plant2, plant3, randomPlant1, randomPlant2];
let randomTrees = 0;
// Pick a system to draw:

function keyPressed(){
  if (keyCode === BACKSPACE){
    randomTrees = Math.round(Math.random(0, 4));
    system = plantChoices[randomTrees];
  }
}

let system = plantChoices[3];
