class LSystem {
  constructor(args) {
    this.generation = 1;
    this.string = args.initString;
    this.rules = args.rules;
    this.stepSize = args.stepSize;
    this.turnSize = args.turnSize;
  }

  /* function */ next(/* this */) {
    if (this.generation === 6) {
      return;
    }
    let newString = "";
      for (const char of this.string) {
        let charRewritten = false;
        for (const rule of this.rules) {
          if (char === rule.before) {
            newString += rule.after;
            charRewritten = true;
          }
        }
        if (!charRewritten) {
          newString += char;
        }
      }
      this.string = newString;
      this.generation++;
  }

  /* function */ display(/* this */) {
    // console.log(`${this.generation}: ${this.string}`);
    let turtle = {
      x: width / 2,
      y: height,
      dir: 90,
    };
    const stack = [];
    for (const char of this.string) {
      switch (char) {
        case "F":
          const x2 = turtle.x + this.stepSize * cos(-turtle.dir);
          const y2 = turtle.y + this.stepSize * sin(-turtle.dir);
          line(turtle.x, turtle.y, x2, y2);
          // fill("black");
          // circle(x2, y2, 2);
          turtle.x = x2;
          turtle.y = y2;
          break;
        case "+":
          turtle.dir -= this.turnSize;
          break;
        case "-":
          turtle.dir += this.turnSize;
          break;
        case "[":
          stack.push(deepCopy(turtle));
          break;
        case "]":
          turtle = stack.pop();
          break;
        default:
        // console.log(`Uninterpreted character: ${char}`);
      }
    }
  }
}

function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
