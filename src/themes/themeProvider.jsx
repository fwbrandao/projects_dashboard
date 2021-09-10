import React, { useState } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { themeCreator } from './baseTheme.jsx';


export const ThemeContext = React.createContext((themeName) => {});

const ThemeProvider = (props) => {
    // Read current theme from localStorage or maybe from an api
    const curThemeName = localStorage.getItem("appTheme") || "lightTheme";

    // State to hold the selected theme name
    const [themeName, setThemeName] = useState(curThemeName);

    // Get the theme object by theme name
    const theme = themeCreator(themeName);

    const setTheme = (themeName) => {
        localStorage.setItem("appTheme", themeName);
        setThemeName(themeName);
    }

    return (
      <ThemeContext.Provider value={setTheme}>
        <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
      </ThemeContext.Provider>
    );
}

export default ThemeProvider;