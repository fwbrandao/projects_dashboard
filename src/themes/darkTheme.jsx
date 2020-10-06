import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  typography: {
    "fontFamily": `"Libre Baskerville", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    type: "dark",
    primary: {
      main: "#212121"
    },
    secondary: {
        main: '#bdbdbd'
    },
    aboutDrawer: {
      main: '#212121'
    },
    textPrimary: {
      main: '#fafafa'
    },
    backgroundColor: {
      boxShadow: 'rgb(26, 33, 81) -10px -10px 16px 0px, rgb(24, 22, 60) 10px 10px 16px 0px, rgb(26, 33, 81) 2px 2px 4px 0px inset, rgb(24, 22, 60) -2px -2px 4px 0px inset',
      color: 'rgb(25, 26, 77)'
    }
  }
});