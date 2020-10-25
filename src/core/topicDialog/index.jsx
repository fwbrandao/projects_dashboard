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
import CarDetection from '../../images/self-driving-cars.jpg'
import ResNets from '../../images/resNets.png'


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

const projectsCardCNN = [
    {
        projectTitle: 'Autonomous driving - Car detection',
        projectIntro: 'Object detection using the very powerful YOLO model',
        skills: ['YOLO'],
        img: CarDetection,
        link: "/autonomous-driving",
        gitHub: "https://github.com/fwbrandao/Deep_Learning_Specialization_Coursera/blob/master/Convolutional_Neural_Networks/Week_3/Autonomous_driving_application_Car_detection_v3a.ipynb",
    },
    {
        projectTitle: 'Residual Networks (ResNets)',
        projectIntro: 'Use ResNets to build very deep CNNs',
        skills: ['Keras', 'Python', 'TensorFlow'],
        img: ResNets,
        link: "/resnets",
        gitHub: "https://github.com/fwbrandao/Deep_Learning_Specialization_Coursera/blob/master/Convolutional_Neural_Networks/Week_2/Residual_Networks_v2a.ipynb"
    },
    {
        projectTitle: 'ConvNet & TensorFlow application',
        projectIntro: 'ConvNet in TensorFlow for a classification problem',
        skills: ['Python', 'TensorFlow'],
        img: CarDetection,
        link: "/convnet-and-tensorflow",
        gitHub: "https://github.com/fwbrandao/Deep_Learning_Specialization_Coursera/blob/master/Convolutional_Neural_Networks/Week_1/Convolution_model_Application.ipynb",
    },
    {
        projectTitle: 'Keras introduction',
        projectIntro: 'Emotion Detection in Images of Faces',
        skills: ['Keras', 'Python', 'TensorFlow'],
        img: CarDetection,
        link: "/keras-intro",
        gitHub: "https://github.com/fwbrandao/Deep_Learning_Specialization_Coursera/blob/master/Convolutional_Neural_Networks/Week_2/Keras_Tutorial_v2a.ipynb"
    },
  ]

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
