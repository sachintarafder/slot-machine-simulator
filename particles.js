// particles.js
// Visual win effects: confetti, glow bursts, sparkles

export function spawnConfetti() {
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = "-10px";
    particle.style.backgroundColor = randomColor();
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 2000);
  }
}

export function glowBurst(target) {
  const burst = document.createElement("div");
  burst.className = "glow-burst";

  const rect = target.getBoundingClientRect();
  burst.style.left = rect.left + rect.width / 2 + "px";
  burst.style.top = rect.top + rect.height / 2 + "px";

  document.body.appendChild(burst);

  setTimeout(() => burst.remove(), 800);
}

export function sparkleWin(target) {
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement("div");
    spark.className = "sparkle";

    spark.style.left = target.offsetLeft + Math.random() * target.offsetWidth + "px";
    spark.style.top = target.offsetTop + Math.random() * target.offsetHeight + "px";

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 1200);
  }
}

function randomColor() {
  const colors = ["#ff4d4d", "#4dff4d", "#4d4dff", "#ffd700", "#00f2ff", "#ff00ff"];
  return colors[Math.floor(Math.random() * colors.length)];
}
