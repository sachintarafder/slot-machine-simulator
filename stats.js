// stats.js

export class Stats {
  constructor() {
    this.spins = 0;
    this.wins = 0;
    this.losses = 0;
    this.jackpots = 0;
    this.bestWin = 0;
  }

  recordSpin(winAmount, isJackpot) {
    this.spins++;

    if (winAmount > 0) {
      this.wins++;
      if (winAmount > this.bestWin) this.bestWin = winAmount;
      if (isJackpot) this.jackpots++;
    } else {
      this.losses++;
    }
  }

  winRate() {
    if (this.spins === 0) return 0;
    return Math.round((this.wins / this.spins) * 100);
  }
}
