class StochasticLSystem extends LSystem {
  // `next is mostly copy-pasted from LSystem...
  /* function */ next(/* this */) {
    if (this.generation === 6) {
      return;
    }
    let newString = "";
    for (const char of this.string) {
      let charRewritten = false;
      for (const rule of this.rules) {
        if (char === rule.before) {
          let n = random();
          for (const { pr, after } of rule.afters) {
            if (!charRewritten && n < pr) {
              newString += after;
              charRewritten = true;
            } else {
              n -= pr;
            }
          }
        }
      }
      if (!charRewritten) {
        newString += char;
      }
    }
    this.string = newString;
    this.generation++;
  }
}
