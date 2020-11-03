import { Theme } from "@material-ui/core";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

export function themeCreator(theme: string): Theme {
  return themeMap[theme];
}

const themeMap: { [key: string]: Theme } = {
  lightTheme,
  darkTheme
};