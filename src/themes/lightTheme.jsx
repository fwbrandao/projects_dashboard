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
    },
    backgroundColor: {
      boxShadow: 'rgb(133, 193, 214) -10px -10px 16px 0px, rgb(78, 140, 187) 10px 10px 16px 0px, rgb(133, 193, 214) 2px 2px 4px 0px inset, rgb(78, 140, 187) -2px -2px 4px 0px inset',
      color: 'rgb(121, 178, 210)'
    },
  }
});