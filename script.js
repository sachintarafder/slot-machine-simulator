// Symbols and payouts
const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐", "💎"];
const payoutMultipliers = {
  "🍒": 2,
  "🍋": 3,
  "🍉": 4,
  "🍇": 6,
  "⭐": 10,
  "💎": 20,
};

// Elements
const reelEls = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
];

const creditsEl = document.getElementById("credits");
const betDisplayEl = document.getElementById("betDisplay");
const totalSpinsEl = document.getElementById("totalSpins");
const jackpotsEl = document.getElementById("jackpots");
const totalWinsEl = document.getElementById("totalWins");
const totalLossesEl = document.getElementById("totalLosses");
const winRateEl = document.getElementById("winRate");
const bestWinEl = document.getElementById("bestWin");
const historyListEl = document.getElementById("historyList");

const resultBannerEl = document.getElementById("resultBanner");
const resultTextEl = document.getElementById("resultText");
const gameStatusPillEl = document.getElementById("gameStatusPill");
const gameStatusTextEl = document.getElementById("gameStatusText");

const spinBtn = document.getElementById("spinBtn");
const autoSpinBtn = document.getElementById("autoSpinBtn");
const stopAutoBtn = document.getElementById("stopAutoBtn");

const chipButtons = document.querySelectorAll(".chip-btn");

// Sounds
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

// Footer year
const yearSpan = document.getElementById("yearSpan");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Game state
let credits = 1000;
let bet = 10;
let totalSpins = 0;
let jackpots = 0;
let totalWins = 0;
let totalLosses = 0;
let bestWin = 0;
let autoSpinInterval = null;
let isSpinning = false;

// Helpers

function updateUI() {
  creditsEl.textContent = credits;
  betDisplayEl.textContent = bet;
  totalSpinsEl.textContent = totalSpins;
  jackpotsEl.textContent = jackpots;
  totalWinsEl.textContent = totalWins;
  totalLossesEl.textContent = totalLosses;

  const totalGames = totalWins + totalLosses;
  const winRate = totalGames === 0 ? 0 : Math.round((totalWins / totalGames) * 100);
  winRateEl.textContent = `${winRate}%`;
  bestWinEl.textContent = bestWin;
}

function setResult(message, type = "neutral") {
  resultTextEl.textContent = message;
  resultBannerEl.classList.remove("success", "warning", "danger");
  gameStatusPillEl.classList.remove("active", "spinning");

  if (type === "success") {
    resultBannerEl.classList.add("success");
    gameStatusPillEl.classList.add("active");
    gameStatusTextEl.textContent = "Win";
  } else if (type === "warning") {
    resultBannerEl.classList.add("warning");
    gameStatusPillEl.classList.add("active");
    gameStatusTextEl.textContent = "Info";
  } else if (type === "danger") {
    resultBannerEl.classList.add("danger");
    gameStatusPillEl.classList.add("active");
    gameStatusTextEl.textContent = "Loss";
  } else {
    gameStatusTextEl.textContent = "Idle";
  }
}

function setSpinningStatus() {
  gameStatusPillEl.classList.add("spinning");
  gameStatusTextEl.textContent = "Spinning";
}

function getRandomSymbol() {
  const index = Math.floor(Math.random() * symbols.length);
  return symbols[index];
}

function addHistoryEntry(symbolsArr, winAmount) {
  const li = document.createElement("li");
  li.className = "history-item";

  const symbolsSpan = document.createElement("span");
  symbolsSpan.className = "symbols";
  symbolsSpan.textContent = symbolsArr.join(" ");

  const resultSpan = document.createElement("span");
  resultSpan.textContent = winAmount > 0 ? `+${winAmount}` : "0";

  li.appendChild(symbolsSpan);
  li.appendChild(resultSpan);

  historyListEl.insertBefore(li, historyListEl.firstChild);

  const maxItems = 20;
  while (historyListEl.children.length > maxItems) {
    historyListEl.removeChild(historyListEl.lastChild);
  }
}

function canSpin() {
  if (isSpinning) return false;
  if (bet > credits) {
    setResult("Not enough demo credits for this bet. Lower your bet or refresh to reset.", "danger");
    return false;
  }
  return true;
}

// Core spin logic

function spinOnce() {
  if (!canSpin()) return;

  isSpinning = true;
  spinBtn.disabled = true;
  autoSpinBtn.disabled = true;
  stopAutoBtn.disabled = false;

  credits -= bet;
  updateUI();

  try {
    spinSound.currentTime = 0;
    spinSound.play();
  } catch (e) {}

  reelEls.forEach((reel) => reel.classList.add("spinning"));
  setSpinningStatus();
  setResult("Spinning the reels...", "neutral");

  setTimeout(() => {
    const finalSymbols = reelEls.map(() => getRandomSymbol());

    reelEls.forEach((reel, i) => {
      reel.classList.remove("spinning");
      const inner = reel.querySelector(".reel-inner");
      inner.textContent = finalSymbols[i];
    });

    const [a, b, c] = finalSymbols;
    let winAmount = 0;
    let message = "";
    let type = "danger";

    if (a === b && b === c) {
      const multiplier = payoutMultipliers[a] || 2;
      winAmount = bet * multiplier;
      credits += winAmount;
      jackpots += 1;
      totalWins += 1;
      message = `🎉 JACKPOT! ${a} ${b} ${c} – You win ${winAmount} demo credits!`;
      type = "success";

      try {
        winSound.currentTime = 0;
        winSound.play();
      } catch (e) {}
    } else if (a === b || b === c || a === c) {
      winAmount = bet * 1;
      credits += winAmount;
      totalWins += 1;
      message = `✨ Nice! You got a pair – You win ${winAmount} demo credits.`;
      type = "success";

      try {
        winSound.currentTime = 0;
        winSound.play();
      } catch (e) {}
    } else {
      totalLosses += 1;
      message = "😅 No match this time. Try again!";
      type = "danger";

      try {
        loseSound.currentTime = 0;
        loseSound.play();
      } catch (e) {}
    }

    totalSpins += 1;
    if (winAmount > bestWin) {
      bestWin = winAmount;
    }

    addHistoryEntry(finalSymbols, winAmount);
    updateUI();
    setResult(message, type);

    isSpinning = false;
    spinBtn.disabled = false;
    autoSpinBtn.disabled = false;

    if (credits <= 0) {
      if (autoSpinInterval) {
        clearInterval(autoSpinInterval);
        autoSpinInterval = null;
      }
      autoSpinBtn.disabled = true;
      stopAutoBtn.disabled = true;
      setResult("You ran out of demo credits. Refresh the page to start a new session.", "danger");
    }
  }, 900);
}

// Event listeners

spinBtn.addEventListener("click", () => {
  spinOnce();
});

chipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    chipButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    bet = parseInt(btn.dataset.bet, 10);
    updateUI();
    setResult(`Bet set to ${bet} demo credits per spin.`, "warning");
  });
});

autoSpinBtn.addEventListener("click", () => {
  if (autoSpinInterval) return;
  if (!canSpin()) return;

  setResult("Auto spin started. Watch the demo credits move!", "warning");
  autoSpinInterval = setInterval(() => {
    if (!canSpin()) {
      clearInterval(autoSpinInterval);
      autoSpinInterval = null;
      stopAutoBtn.disabled = true;
      return;
    }
    spinOnce();
  }, 1200);

  autoSpinBtn.disabled = true;
  stopAutoBtn.disabled = false;
});

stopAutoBtn.addEventListener("click", () => {
  if (autoSpinInterval) {
    clearInterval(autoSpinInterval);
    autoSpinInterval = null;
    setResult("Auto spin stopped. Manual control restored.", "neutral");
  }
  autoSpinBtn.disabled = false;
  stopAutoBtn.disabled = true;
});

// Initial UI
updateUI();
setResult("Select a bet and press SPIN to start.", "neutral");
