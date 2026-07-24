// ui.js

export function setStatus(text, type) {
  const banner = document.getElementById("resultBanner");
  const status = document.getElementById("resultText");

  banner.classList.remove("success", "warning", "danger");
  banner.classList.add(type);

  status.textContent = text;
}

export function updateCredits(value) {
  document.getElementById("credits").textContent = value;
}

export function updateStats(stats) {
  document.getElementById("totalSpins").textContent = stats.spins;
  document.getElementById("totalWins").textContent = stats.wins;
  document.getElementById("totalLosses").textContent = stats.losses;
  document.getElementById("jackpots").textContent = stats.jackpots;
  document.getElementById("bestWin").textContent = stats.bestWin;
  document.getElementById("winRate").textContent = stats.winRate() + "%";
}
