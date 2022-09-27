import React from 'react';
import {
    Box,
    Button,
    makeStyles,
    Typography,
    Link
} from '@material-ui/core';

import AboutProject from '../../../core/aboutProject/index.jsx';
import covidData from './covidData';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}))

const Covid = () => {
    const classes = useStyles();

    return (
        <Box>
            <div className={classes.toolbar} />
            <AboutProject
                title={covidData.title}
                description={covidData.description}
                gitHubLink={covidData.gitHubLink}
            />
        </Box>
    )
}

export default Covid;
