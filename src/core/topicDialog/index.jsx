import React from 'react';
import {
    Box,
    Dialog,
    AppBar,
    Toolbar,
    Grid,
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
import ProjectCard from '../projectCard';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
      },
      titles: {
        flex: 1,
      },
      projectCard: {
          display: 'flex',
          flexGrow: 1
      },
      gridItem: {
        display: 'flex',
        justifyContent: 'center',
      },
      intro: {
        marginLeft: theme.spacing(1)
      }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const TopicDialog = ({ open, closeDialog, topicId, topicTitle }) => {
    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} onClose={closeDialog} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.titles}>
                        {topicTitle}
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box mb={2}>
                <ListItem button p={3}>
                    <ListItemText className={classes.intro}>
                        Thanks to deep learning, computer vision is working far better than just feel years ago,
                        and this is enabling numerous exciting applications ranging from safe autonomous driving,
                        to accurate face recognition, to automatic reading of radiology images.
                    </ListItemText>
                </ListItem>
                <Divider />
            </Box>
            <Box className={classes.projectCard}>
                <Grid container spacing={2}>
                    <Grid className={classes.gridItem} item xs={6}>
                        <ProjectCard />

                    </Grid>
                    <Grid className={classes.gridItem} item xs={6}>
                        <ProjectCard />

                    </Grid>
                    <Grid className={classes.gridItem} item xs={6}>
                        <ProjectCard />

                    </Grid>
                    <Grid className={classes.gridItem} item xs={6}>
                        <ProjectCard />

                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}

export default TopicDialog;
