import React from 'react';
import {
    Box,
    Paper,
    makeStyles,
    Typography,
    CardActionArea,
    Card,
    CardMedia,
    Grid,
} from '@material-ui/core';

import NavBar from '../../../../core/navBar';
import AboutProject from '../../../../core/aboutProject';
import autonomousDrivingData from './autonomousDrivingData';

import Image1 from "../../../../images/YOLO/1.png";
import Image2 from "../../../../images/YOLO/2.png";
import Image3 from "../../../../images/YOLO/3.png";
import Image4 from "../../../../images/YOLO/4.png";


const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    contentExplanation: {
        margin: "30px",
        display: "grid",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        padding: "10px",
    },
    contentBody: {
        margin: "30px",
        padding: "10px",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        '@media (max-width: 1024px)': {
            display: 'grid',
        }
    },
    media: {
        height: "300px",
    },
    grid: {
        '@media (max-width: 1024px)': {
            display: "grid"
        }
    },
    gridItem: {
        '@media (max-width: 1024px)': {

            maxWidth: "100%",
        }
    }
}
))


const AutonomousDriving = () => {
    const classes = useStyles();

    return (
        <Box>
            <NavBar />
            <div className={classes.toolbar} />
            <AboutProject
                title={autonomousDrivingData.title}
                description={autonomousDrivingData.description}
                gitHubLink={autonomousDrivingData.gitHubLink}
            />
            <Box className={classes.contentExplanation}>
                <Typography variant='body2' color="textSecondary">
                    YOLO is a state-of-the-art object detection model that is fast and accurate.
                </Typography>
                <br />
                <Typography variant='body2' color="textSecondary">
                    It runs an input image through a CNN which outputs a 19x19x5x85 dimensional volume.
                </Typography>
                <br />
                <Typography variant='body2' color="textSecondary">
                    Because training a YOLO model from randomly initialized weights is non-trivial and requires a large dataset as well as lot of computation,
                    we used previously trained model parameters in this exercise. If you wish, you can also try fine-tuning the YOLO model with your own dataset, though this would be a fairly non-trivial exercise.
                </Typography>
                <Paper elevation={2} variant='elevation' className={classes.contentBody}>
                    <Typography variant='body1' color="textSecondary">Here are examples of outputs from my notebook:</Typography>
                    <br />
                    <Grid className={classes.grid} container spacing={2}>
                        <Grid item xs={6} className={classes.gridItem}>
                            <Card className={classes.card} elevation={5}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={Image1}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6} className={classes.gridItem}>
                            <Card className={classes.card} elevation={5}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={Image2}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6} className={classes.gridItem}>
                            <Card className={classes.card} elevation={5}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={Image3}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6} className={classes.gridItem}>
                            <Card className={classes.card} elevation={5}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={Image4}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Box>
    )
}
export default AutonomousDriving;

