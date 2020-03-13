import React from 'react';
import { Box, Typography, makeStyles, Tooltip, Link, IconButton }
  from '@material-ui/core';
import NavBar from './components/navBar/index';
import BGImage from './images/arif-wahid-y3FkHW1cyBE-unsplash.png';
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100vh - 64px)',
    flexGrow: 1,
    backgroundImage: `url(${BGImage})`,
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
        <Typography variant="h2" className={classes.title}>Welcome to Data Science</Typography>
        <Box>
          <Tooltip title="Navigate to my githug" aria-label="code">
            <Link href="https://github.com/fwbrandao" target="_blank">
              <IconButton aria-label="github" >
                <GitHubIcon color="action" fontSize="large" />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
