// theme.js
// Handles theme switching: Neon, Gold, Dark

export const THEMES = {
  neon: {
    name: "Neon",
    bgGradient: "radial-gradient(circle at top left, rgba(0,255,255,0.35), rgba(255,0,255,0.35))",
    accent: "#00f2ff",
    accentSoft: "rgba(0,242,255,0.25)",
    glow: "0 0 25px rgba(0,255,255,0.6)",
  },

  gold: {
    name: "Gold",
    bgGradient: "radial-gradient(circle at top left, rgba(255,215,0,0.35), rgba(255,165,0,0.35))",
    accent: "#ffd700",
    accentSoft: "rgba(255,215,0,0.25)",
    glow: "0 0 25px rgba(255,215,0,0.6)",
  },

  dark: {
    name: "Dark",
    bgGradient: "radial-gradient(circle at top left, rgba(59,130,246,0.35), rgba(34,197,94,0.35))",
    accent: "#3b82f6",
    accentSoft: "rgba(59,130,246,0.25)",
    glow: "0 0 25px rgba(59,130,246,0.6)",
  }
};

export function applyTheme(themeName) {
  const theme = THEMES[themeName];
  if (!theme) return;

  document.documentElement.style.setProperty("--global-bg", theme.bgGradient);
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-soft", theme.accentSoft);

  const shell = document.querySelector(".site-shell");
  shell.style.boxShadow = theme.glow;

  const status = document.getElementById("gameStatusPill");
  status.style.boxShadow = theme.glow;

  const reels = document.querySelectorAll(".reel");
  reels.forEach((r) => {
    r.style.boxShadow = theme.glow;
  });

  const themeLabel = document.getElementById("themeLabel");
  if (themeLabel) themeLabel.textContent = theme.name;
}

export function initThemeSwitcher() {
  const select = document.getElementById("themeSelect");
  if (!select) return;

  select.addEventListener("change", () => {
    applyTheme(select.value);
  });
}
