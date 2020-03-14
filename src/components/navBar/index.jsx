import React from 'react';
import { AppBar, Box, Button, Typography, Toolbar, makeStyles, Tooltip, Link, IconButton }
  from '@material-ui/core';
import CustomizedMenus from '../menu/index';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

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

const NavBar = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CustomizedMenus />
          <Typography variant="h6" className={classes.title}>
            Data Science Projects
          </Typography>
          <Tooltip title="Navigate to my github" aria-label="code">
            <Link href="https://github.com/fwbrandao" target="_blank">
              <IconButton aria-label="github" >
                <GitHubIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Navigate to my LinkedIn" aria-label="code">
            <Link href="https://www.linkedin.com/in/fernando-brandao-170060151/" target="_blank">
              <IconButton aria-label="LinkedIn" >
                <LinkedInIcon color="action"/>
              </IconButton>
            </Link>
          </Tooltip>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
