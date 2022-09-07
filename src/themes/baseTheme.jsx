import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

export function themeCreator(theme) {
  return themeMap[theme];
}

const themeMap = {
  lightTheme,
  darkTheme
};