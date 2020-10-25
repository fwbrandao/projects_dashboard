import React, { useState, useEffect } from 'react';
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
import { projectsCardCNN } from './projectCardData';


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
        marginLeft: theme.spacing(1),
      }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const TopicDialog = ({ open, closeDialog, topicData }) => {
    const classes = useStyles();
    const [projectCard, setProjectCard] = useState([]);

    useEffect(() => {
        if (topicData.id === 'CNN') {
            setProjectCard(projectsCardCNN)
        }
    },[projectCard, topicData.id]);

    return (
        <Dialog fullScreen open={open} onClose={closeDialog} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.titles}>
                        {topicData.topicTitle}
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box mb={2}>
                <ListItem p={3}>
                    <ListItemText className={classes.intro}>
                        {topicData.topicIntro}
                    </ListItemText>
                </ListItem>
                <Divider />
            </Box>
            <Box className={classes.projectCard} >
                <Grid container spacing={3}>
                    {projectCard.map(item => (
                        <Grid className={classes.gridItem} item xs={6}>
                            <ProjectCard data={item}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Dialog>
    )
}

export default TopicDialog;
