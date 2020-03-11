import React from 'react';
import { AppBar, Box, Button, Typography, Toolbar, makeStyles }
  from '@material-ui/core';
import TextBox from './components/textBox'
import CustomizedMenus from './components/menu/index';
import AboutProject from './components/aboutProject';
import NavBar from './components/navBar/index';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  textBox: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <NavBar />
      <Box mt={10} ml={10} mr={10}>
        <Typography variant="h2">Welcome to Data Science</Typography>
      </Box>
    </Box>
  );
}

export default App;
