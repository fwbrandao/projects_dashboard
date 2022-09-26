import { lightTheme } from "./lightTheme.jsx";
import { darkTheme } from "./darkTheme.jsx";

export function themeCreator(theme) {
  return themeMap[theme];
}

const themeMap = {
  lightTheme,
  darkTheme
};