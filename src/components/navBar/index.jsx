import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../themes/ThemeProvider';
import {
  AppBar,
  Button,
  Box,
  Avatar,
  Typography,
  Toolbar,
  Switch,
  makeStyles,
  Tooltip,
  Link,
  IconButton,
} from '@material-ui/core';
import ProjectsMenu from '../menu/index';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import AvatarImg from '../../images/fwbAvatar.jpg';

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

  // Get the setter function from context
  const setThemeName = useContext(ThemeContext);
  const currentTheme = localStorage.getItem('appTheme');
  const [open, setOpen] = useState(false);

  const handleAvatarClick = () => {
    setOpen(open => !open);
  }

  console.log(open);
  return (
    <Box className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <ProjectsMenu />
          <Typography variant="h6" className={classes.title}>
            Data Science Projects
          </Typography>
          <Button className={classes.avatar} onClick={handleAvatarClick}>
            <Avatar alt="Fernando Brandao" src={AvatarImg} />
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
          {currentTheme === 'darkTheme' ? (
            <IconButton aria-label="lightTheme" component="span" onClick={() => setThemeName("lightTheme")}>
              <WbSunnyOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="darkTheme" component="span" onClick={() => setThemeName("darkTheme")}>
              <NightsStayOutlinedIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
