import { createMuiTheme } from '@material-ui/core';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#fafafa'
    },
    secondary: {
        main: '#4d84f1'
    },
    aboutDrawer: {
      main: '#f5f5f5'
    },
    textPrimary: {
      main: '#212121'
    }
  }
});