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
    Button,
    Typography,
    makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
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

const TopicDialog = ({ open, closeDialog }) => {
    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} onClose={closeDialog} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.titles}>
                    Sound
                    </Typography>
                    <Button autoFocus color="inherit" onClick={closeDialog}>
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
    )
}

export default TopicDialog;
