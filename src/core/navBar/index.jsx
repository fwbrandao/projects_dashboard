import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { ThemeContext } from '../../themes/ThemeProvider';
import ProjectsMenu from '../menu/index';
import {
  Avatar,
  AppBar,
  Button,
  Box,
  Drawer,
  Divider,
  Typography,
  Toolbar,
  makeStyles,
  useTheme,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import AvatarImg from '../../images/fwbAvatar.jpg';
import AboutMe from '../aboutMe/index';

const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.primary.main
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
  link: {
    textDecoration: 'none',
    color: theme.palette.textPrimary.main
}
}));

const NavBar = () => {
  const classes = useStyles();
  const theme = useTheme();

  // Get the setter function from context
  const setThemeName = useContext(ThemeContext);
  const currentTheme = localStorage.getItem('appTheme');
  const [openDrawer, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  console.log(openDrawer);
  return (
    <Box className={classes.root}>
      <AppBar
        color="primary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <ProjectsMenu />
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.link}>
                  Data Science Projects
              </Link>
            </Typography>
          {!openDrawer ? (
            <Button
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(openDrawer && classes.hide)}
              >
              <Avatar alt="Fernando Brandao" src={AvatarImg} />
            </Button>
          ) : ''}
          {currentTheme === 'darkTheme' ? (
            <Tooltip title="Light Mode" aria-label="Light Mode">
              <IconButton aria-label="lightTheme" component="span" onClick={() => setThemeName("lightTheme")}>
                <WbSunnyOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Dark Mode" aria-label="Dark Mode">
              <IconButton aria-label="darkTheme" component="span" onClick={() => setThemeName("darkTheme")}>
                <NightsStayOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <AboutMe />
      </Drawer>
    </Box>
  );
}

export default NavBar;
