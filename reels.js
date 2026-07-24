// reels.js
// Handles reel spinning, symbol generation, animation timing

import { SYMBOLS } from "./config.js";
import { playSpinSound } from "./sound.js";

export class ReelEngine {
  constructor(reelElements) {
    this.reels = reelElements;
    this.isSpinning = false;
    this.spinDuration = 900; // ms
  }

  randomSymbol() {
    const index = Math.floor(Math.random() * SYMBOLS.length);
    return SYMBOLS[index];
  }

  startSpin() {
    this.isSpinning = true;
    playSpinSound();

    this.reels.forEach((reel) => {
      reel.classList.add("spinning");
    });
  }

  stopSpin() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = this.reels.map((reel) => {
          const symbol = this.randomSymbol();
          reel.classList.remove("spinning");
          reel.querySelector(".reel-inner").textContent = symbol;
          return symbol;
        });

        this.isSpinning = false;
        resolve(results);
      }, this.spinDuration);
    });
  }

  async spin() {
    this.startSpin();
    const results = await this.stopSpin();
    return results;
  }
}
