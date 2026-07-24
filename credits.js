// credits.js
// Manages virtual credits (no real money)

export class CreditSystem {
  constructor(startingCredits = 1000) {
    this.credits = startingCredits;
  }

  canBet(bet) {
    return this.credits >= bet;
  }

  deduct(bet) {
    this.credits -= bet;
  }

  add(amount) {
    this.credits += amount;
  }

  get() {
    return this.credits;
  }
}
