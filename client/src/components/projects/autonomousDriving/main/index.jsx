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
import autonomousDrivingData from './autonomousDrivingData';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}))


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
    </Box>
    )}
export default AutonomousDriving;

