// autospin.js
// Handles auto-spin loop

export class AutoSpin {
  constructor(spinFunction) {
    this.spinFunction = spinFunction;
    this.interval = null;
    this.delay = 1200;
  }

  start() {
    if (this.interval) return;

    this.interval = setInterval(() => {
      this.spinFunction();
    }, this.delay);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  isRunning() {
    return this.interval !== null;
  }
}
