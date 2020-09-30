import { createMuiTheme } from '@material-ui/core';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0091ea'
    },
    secondary: {
        main: '#fafafa'
    },
    aboutDrawer: {
      main: '#f5f5f5'
    }
  }
});