import { createTheme } from '@material-ui/core/styles';

export const lightTheme = createTheme({
  typography: {
    "fontFamily": `"Libre Baskerville", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    type: 'light',
    primary: {
      main: '#fafafa',
      heart: '#2196f3',
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
      boxShadow: 'rgb(74, 136, 194) -10px -10px 16px 0px, rgb(56, 88, 148) 10px 10px 16px 0px, rgb(74, 136, 194) 2px 2px 4px 0px inset, rgb(56, 88, 148) -2px -2px 4px 0px inset',
      color: 'rgb(64, 117, 191)'
    },
  }
});