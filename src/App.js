import React from 'react';
import { AppBar, IconButton, Box, Button, Typography, Toolbar, makeStyles }
  from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import TextBox from './components/textBox'

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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Data Science Projects
          </Typography>
          <Button color="inherit">Upload a file</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box mt={10} ml={10} mr={10}>
        <TextBox className={classes.textBox}/>
      </Box>
    </Box>
  );
}

export default App;
