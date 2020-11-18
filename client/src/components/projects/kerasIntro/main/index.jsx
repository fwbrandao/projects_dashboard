import React from 'react';
import {
    Box,
    Button,
    makeStyles,
    Typography,
    Link
} from '@material-ui/core';

import NavBar from '../../../../core/navBar';
import AboutProject from '../../../../core/aboutProject';
import kerasIntroData from '../kerasIntroData';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}))

const ConvNetTensorflow = () => {
    const classes = useStyles();

    return (
    <Box>
        <NavBar />
        <div className={classes.toolbar} />
        <AboutProject
            title={kerasIntroData.title}
            description={kerasIntroData.description}
            gitHubLink={kerasIntroData.gitHubLink}
        />
    </Box>
    )}

export default ConvNetTensorflow;