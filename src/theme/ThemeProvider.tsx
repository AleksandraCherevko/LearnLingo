import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { themes } from "./theme";
import type { ThemeName } from "./types";

const isThemeName = (value: string): value is ThemeName =>
  ["yellow", "green", "blue", "red", "orange"].includes(value);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = localStorage.getItem("theme");
    return saved && isThemeName(saved) ? saved : "yellow";
  });

  useEffect(() => {
    const themeVars = themes[theme];

    Object.entries(themeVars).forEach(([key, value]) => {
      if (key.startsWith("--")) {
        document.documentElement.style.setProperty(key, value);
      }
    });

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
