import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const THEMES = {
  light: {
    name: "Light",
    emoji: "☀️",
    bg: "#f5f5f4",
    text: "#111827",
    accent: "#2ecc71",
    forest: "#115e59",
    card: "#ffffff",
    border: "rgba(17,94,89,0.08)",
    glow: "rgba(46,204,113,0.3)",
    btnFrom: "#115e59",
    btnTo: "#2ecc71",
  },
  dark: {
    name: "Dark",
    emoji: "🌙",
    bg: "#0d1f1d",
    text: "#f1f5f4",
    accent: "#2ecc71",
    forest: "#1a3d39",
    card: "#112220",
    border: "rgba(46,204,113,0.15)",
    glow: "rgba(46,204,113,0.4)",
    btnFrom: "#115e59",
    btnTo: "#2ecc71",
  },
  crazy: {
    name: "Crazy",
    emoji: "🔥",
    bg: "#0d0520",
    text: "#f3e8ff",
    accent: "#a855f7",
    forest: "#4c1d95",
    card: "#160830",
    border: "#4c2280",
    glow: "rgba(168,85,247,0.8)",
    btnFrom: "#7e22ce",
    btnTo: "#a855f7",
    animation: "pulse-neon",
  },
  read: {
    name: "Read",
    emoji: "📖",
    bg: "#faf7f2",
    text: "#1c1917",
    accent: "#16a34a",
    forest: "#14532d",
    card: "#ffffff",
    border: "#d6d3d1",
    glow: "rgba(22,163,74,0.15)",
    btnFrom: "#166534",
    btnTo: "#16a34a",
    fontFamily: 'Georgia, "Times New Roman", serif',
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("h4a_theme");
    if (saved && THEMES[saved]) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("h4a_theme", theme);
    const t = THEMES[theme];
    const html = document.documentElement;

    html.classList.remove("light", "dark", "crazy", "read");
    html.classList.add(theme);

    html.style.setProperty("--bg-primary", t.bg);
    html.style.setProperty("--text-primary", t.text);
    html.style.setProperty("--accent", t.accent);
    html.style.setProperty("--forest", t.forest);
    html.style.setProperty("--card-bg", t.card);
    html.style.setProperty("--border-color", t.border);
    html.style.setProperty("--glow", t.glow);
    html.style.setProperty("--btn-from", t.btnFrom);
    html.style.setProperty("--btn-to", t.btnTo);
    html.style.setProperty("--font-body", t.fontFamily || "inherit");
  }, [theme]);

  const cycleTheme = () => {
    const keys = Object.keys(THEMES);
    setTheme((prev) => keys[(keys.indexOf(prev) + 1) % keys.length]);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, cycleTheme, themes: THEMES, current: THEMES[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default ThemeContext;
