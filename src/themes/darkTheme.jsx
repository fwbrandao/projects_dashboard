import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#263238"
    },
    secondary: {
        main: '#bdbdbd'
    },
    aboutDrawer: {
      main: '#263238'
    }
  }
});