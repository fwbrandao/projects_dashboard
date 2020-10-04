import React from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,

  Box,
  Button,
  Fab,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
  },

// dialog css
  appBar: {
    position: 'relative',
  },
  titles: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const App = () => {
  const classes = useStyles();
  const [openDialog, setDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box >
      <NavBar />
      <Box
        className={classes.root}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box className={classes.shadow} borderRadius={16} width='75%' height='65%'>
          <Fab color="primary" variant="extended" onClick={handleClickOpen}>
            {/* <NavigationIcon  className={classes.extendedIcon} /> */}
            Convolution Neural Networks
          </Fab>
        </Box>

        <Dialog fullScreen open={openDialog} onClose={handleDialogClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.titles}>
                Sound
              </Typography>
              <Button autoFocus color="inherit" onClick={handleDialogClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
        </Dialog>

      </Box>
    </Box>
  );
}

export default App;
