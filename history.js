// history.js
// Stores last 20 spins

export class History {
  constructor(max = 20) {
    this.max = max;
    this.items = [];
  }

  add(symbols, winAmount) {
    this.items.unshift({ symbols, winAmount });

    if (this.items.length > this.max) {
      this.items.pop();
    }
  }

  get() {
    return this.items;
  }
}
