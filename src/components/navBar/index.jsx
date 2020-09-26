import React, { useState } from 'react';
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
  createMuiTheme, ThemeProvider // For Switch Theming
} from '@material-ui/core';
import {
  grey,
  blueGrey,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import ProjectsMenu from '../menu/index';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
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

  const [open, setOpen] = useState(false);
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? grey[800] : blueGrey[50];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const handleAvatarClick = () => {
    setOpen(open => !open);
  }

  console.log(open);
  return (
    <ThemeProvider theme={darkTheme}>
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
            <Switch checked={darkState} onChange={handleThemeChange} />
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default NavBar;
