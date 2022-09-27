import React from 'react';
import {
    Box,
    Button,
    makeStyles,
    Typography,
    Link
} from '@material-ui/core';

import AboutProject from '../../../core/aboutProject/index.jsx';
import residualNetworksData from './residualNetworksData';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}))


const ResidualNetworks = () => {
    const classes = useStyles();

    return (
        <Box>
            <div className={classes.toolbar} />
            <AboutProject
                title={residualNetworksData.title}
                description={residualNetworksData.description}
                gitHubLink={residualNetworksData.gitHubLink}
            />
        </Box>
    )
}
export default ResidualNetworks;

