import React from 'react';
import { Box, Typography, makeStyles }
  from '@material-ui/core';
import NavBar from './components/navBar/index';
import BGImage from './images/arif-wahid-y3FkHW1cyBE-unsplash.png';


const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100vh - 64px)',
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.main,
    // backgroundImage: `url(${BGImage})`,
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
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <Box >
      <NavBar />
      <Box className={classes.root}>
        {/* <Typography variant="h2" className={classes.title}>Welcome to Data Science</Typography> */}
      </Box>
    </Box>
  );
}

export default App;
