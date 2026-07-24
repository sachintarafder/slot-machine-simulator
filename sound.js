// sound.js

export function playSpinSound() {
  const audio = document.getElementById("spinSound");
  audio.currentTime = 0;
  audio.play();
}

export function playWinSound() {
  const audio = document.getElementById("winSound");
  audio.currentTime = 0;
  audio.play();
}

export function playLoseSound() {
  const audio = document.getElementById("loseSound");
  audio.currentTime = 0;
  audio.play();
}
