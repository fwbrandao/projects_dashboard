import React from 'react';
import {
  Box,
  Button,
  Fab,
  Typography,
  makeStyles,
} from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import NavBar from './components/navBar/index';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100vw',
    flexGrow: 1,
    backgroundColor: theme.palette.backgroundColor.color,
    backgroundSize: 'cover',
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginTop: '100px',
    display: "flex",
    justifyContent: "center",
    color: 'white'
  },
  textBox: {
    display: 'flex',
    alignItems: 'center'
  },
  shadow: {
    boxShadow: theme.palette.backgroundColor.boxShadow,
    backgroundColor: theme.palette.backgroundColor.color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const App = () => {
  const classes = useStyles();
  const [bgColor, setBgColor] = React.useState('#B3D2E6');

  return (
    <Box >
      <NavBar />
      <Box
        // p={5}
        className={classes.root}
        // bgcolor={bgColor}
        // width={'100%'}
        // height={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        // flex={1}
      >
        <Box className={classes.shadow} borderRadius={16} width='75%' height='65%'>
        <Fab color="primary" variant="extended">
          {/* <NavigationIcon  className={classes.extendedIcon} /> */}
          Convolution Neural Networks
        </Fab>

        </Box>
      </Box>
    </Box>
  );
}

export default App;
