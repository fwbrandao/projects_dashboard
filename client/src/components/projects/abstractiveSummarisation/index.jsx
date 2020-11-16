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
import abstractiveSummaryData from './abstractiveSummaryData';

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
            title={abstractiveSummaryData.title}
            description={abstractiveSummaryData.description}
            gitHubLink={abstractiveSummaryData.gitHubLink}
        />
    </Box>
    )}

export default AbstractiveSummarisation;
