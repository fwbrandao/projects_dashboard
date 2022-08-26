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
import AboutProject from '../aboutProject';
import CloseIcon from '@material-ui/icons/Close';
import ProjectCard from '../projectCard';
import { 
    projectsCardCNN ,
    projectsCardANN,
    projectsCardDEP,
    projectsCardSM,
    projectsCardML,
    projectCardJS30,
} from './projectCardData';

const gitHubCNN = "https://github.com/fwbrandao/Deep_Learning/tree/master/Convolutional_Neural_Networks";
const gitHubANN = "https://github.com/fwbrandao/Deep_Learning/tree/master/Neural%20Networks%20and%20Deep%20Learning/Week_2";
const gitHubDEP = "https://github.com/fwbrandao/Covid-19_disease_analysis";
const gitHubSM = '';
const gitHubML = '';

const useStyles = makeStyles(theme => ({
      appBar: {
        position: 'relative',
      },
      titles: {
        flex: 1,
      },
      projectCard: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: theme.palette.backgroundColor.color,
        paddingBottom: theme.spacing(2),
      },
      gridContainer: {
        '@media (max-width: 1224px)': {
        display: 'table-column-group'
        }
      },
      gridItem: {
        display: 'flex',
        justifyContent: 'center',
      },
      intro: {
        marginLeft: theme.spacing(1),
      },
      aboutProject: {
        backgroundColor: theme.palette.backgroundColor.color
      }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const TopicDialog = ({ open, closeDialog, topicData }) => {
    const classes = useStyles();
    const [projectCard, setProjectCard] = useState([]);
    const [gitHubForTopic, setGitHubForTopic] = useState([]);

    useEffect(() => {
        if (topicData.id === 'CNN') {
            setProjectCard(projectsCardCNN);
            setGitHubForTopic(gitHubCNN);
        }
        if (topicData.id === 'ANN') {
            setProjectCard(projectsCardANN);
            setGitHubForTopic(gitHubANN);
        }
        if (topicData.id === 'DEP') {
            setProjectCard(projectsCardDEP);
            setGitHubForTopic(gitHubDEP);
        }
        if (topicData.id === 'SM') {
            setProjectCard(projectsCardSM);
            setGitHubForTopic(gitHubSM);
        }
        if (topicData.id === 'ML') {
            setProjectCard(projectsCardML);
            setGitHubForTopic(gitHubML);
        }
        if (topicData.id === 'miniJS') {
            setProjectCard(projectCardJS30);
            setGitHubForTopic(gitHubML);
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
            <Box pb={2} className={classes.aboutProject}>
                <AboutProject
                    description={topicData.topicIntro === '' ? 'Coming Soon.' : topicData.topicIntro}
                    gitHubLink={gitHubForTopic}
                />
            </Box>
            <Box className={classes.projectCard}>
                <Grid className={classes.gridContainer} container spacing={3}>
                    {projectCard.map(item => (
                        <Grid key={item.projectTitle} className={classes.gridItem} item xs={6}>
                            <ProjectCard data={item}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Dialog>
    )
}

export default TopicDialog;
