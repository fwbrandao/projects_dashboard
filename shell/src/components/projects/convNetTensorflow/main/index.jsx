import React from 'react';
import {
    Box,
    Button,
    makeStyles,
    Typography,
    Link
} from '@material-ui/core';

import NavBar from '../../../../core/navBar/index.jsx';
import AboutProject from '../../../../core/aboutProject/index.jsx';
import convNetTensorflowData from '../convNetTensorflowData';

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
            title={convNetTensorflowData.title}
            description={convNetTensorflowData.description}
            gitHubLink={convNetTensorflowData.gitHubLink}
        />
    </Box>
    )}

export default ConvNetTensorflow;