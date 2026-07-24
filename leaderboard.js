// leaderboard.js
// Local high score system using localStorage

export class Leaderboard {
  constructor(key = "ultraSlotLeaderboard") {
    this.key = key;
    this.scores = this.loadScores();
  }

  loadScores() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  saveScores() {
    localStorage.setItem(this.key, JSON.stringify(this.scores));
  }

  addScore(amount) {
    const entry = {
      amount,
      date: new Date().toLocaleString(),
    };

    this.scores.push(entry);
    this.scores.sort((a, b) => b.amount - a.amount);

    if (this.scores.length > 10) {
      this.scores.length = 10;
    }

    this.saveScores();
  }

  getScores() {
    return this.scores;
  }

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    this.scores.forEach((score) => {
      const row = document.createElement("div");
      row.className = "leaderboard-row";

      row.innerHTML = `
        <span class="lb-amount">🏆 ${score.amount} credits</span>
        <span class="lb-date">${score.date}</span>
      `;

      container.appendChild(row);
    });
  }
}
