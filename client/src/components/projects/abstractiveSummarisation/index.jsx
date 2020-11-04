import React from 'react';
import {
    Box,
    Button,
    makeStyles,
    Typography,
    Link
} from '@material-ui/core';

import NavBar from '../../../core/navBar';
import AboutProject from '../../../core/aboutProject/index';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}))

const AbstractiveSummarisation = () => {
    const classes = useStyles();


    return (
    <Box>
        <NavBar />
        <div className={classes.toolbar} />
        <AboutProject
            title="Abstractive Summarisation"
            description="This advanced python project of detecting fake news deals with fake and real news.
            Using sklearn, I've built a TfidfVectorizer on a dataset.
            Then, I initialize a PassiveAggressive Classifier and fit the model. In the end,
            the accuracy score and the confusion matrix tell us how well our model fares."
            gitHubLink="https://github.com/fwbrandao/Fake_news_detector"
        />
    </Box>
    )}

export default AbstractiveSummarisation;
