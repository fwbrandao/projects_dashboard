import React, { useState } from 'react';
import {
  AppBar, Button, Box, Avatar, Typography, Toolbar, makeStyles, Tooltip, Link, IconButton
} from '@material-ui/core';
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
  },
  avatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleAvatarClick = () => {
    setOpen(open => !open);
  }

  console.log(open);
  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CustomizedMenus />
          <Typography variant="h6" className={classes.title}>
            Data Science Projects
          </Typography>
          <Button className={classes.avatar} onClick={handleAvatarClick}>
            <Avatar alt="Fernando Brandao" src="./images/fwbAvatar.jpg" />
          </Button>
          <Tooltip title="Navigate to my github" aria-label="code">
            <Link href="https://github.com/fwbrandao" target="_blank">
              <IconButton aria-label="github" >
                <GitHubIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Navigate to my LinkedIn" aria-label="code">
            <Link href="https://www.linkedin.com/in/fernando-b-170060151/" target="_blank">
              <IconButton aria-label="LinkedIn" >
                <LinkedInIcon color="action"/>
              </IconButton>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
