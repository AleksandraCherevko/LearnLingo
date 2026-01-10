export type ThemeName = "yellow" | "green" | "blue" | "red" | "orange";

export type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};
