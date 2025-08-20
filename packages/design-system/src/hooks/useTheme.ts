import { create } from "zustand";
import { lightTheme, darkTheme, JOBISTheme } from "../themes";

type ThemeMode = "light" | "dark";

interface ThemeState {
  themeMode: ThemeMode;
  currentTheme: JOBISTheme;
  toggleTheme: () => void;
}

const getThemeObject = (mode: "light" | "dark"): JOBISTheme => {
  return mode === "light" ? lightTheme : darkTheme;
};

export const useTheme = create<ThemeState>(set => {
  const storedTheme = localStorage.getItem("theme");
  const initialThemeMode: ThemeMode =
    storedTheme === "light" || storedTheme === "dark"
      ? (storedTheme as ThemeMode)
      : "light";

  return {
    themeMode: initialThemeMode,
    currentTheme: getThemeObject(initialThemeMode),
    toggleTheme: () =>
      set(state => {
        const newMode = state.themeMode === "light" ? "dark" : "light";
        localStorage.setItem("theme", newMode);
        return {
          themeMode: newMode,
          currentTheme: getThemeObject(newMode)
        };
      })
  };
});
