// payouts.js
// Calculates win amount based on symbols + bet

export const PAYOUTS = {
  "🍒": 2,
  "🍋": 3,
  "🍉": 4,
  "🍇": 6,
  "⭐": 10,
  "💎": 20,
};

export function calculatePayout(symbols, bet) {
  const [a, b, c] = symbols;

  if (a === b && b === c) {
    return bet * (PAYOUTS[a] || 2);
  }

  if (a === b || b === c || a === c) {
    return bet * 1;
  }

  return 0;
}
