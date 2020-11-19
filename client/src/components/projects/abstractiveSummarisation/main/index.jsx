import React from 'react';
import {
    Box,
    Button,
    makeStyles,
    Typography,
    Link
} from '@material-ui/core';

import NavBar from '../../../../core/navBar';
import AboutProject from '../../../../core/aboutProject/index';
import abstractiveSummaryData from '../abstractiveSummaryData';
import ControlledExpansionPanels from '../../../../core/infoExpansionPanel/index';

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
            originalPaper={abstractiveSummaryData.literactureLink}
        />
        <Box mt={4} ml={18} mr={18} mb={2}>
        <ControlledExpansionPanels
            className={classes.controlledExpansionPanels}
            firstHeader={abstractiveSummaryData.infoExpantion.firstHeader}
            firstText={abstractiveSummaryData.infoExpantion.firstText}
            secondHeader={abstractiveSummaryData.infoExpantion.secondHeader}
            secondText={abstractiveSummaryData.infoExpantion.secondText}
            thirdHeader={abstractiveSummaryData.infoExpantion.thirdHeader}
            thirdText={abstractiveSummaryData.infoExpantion.thirdText}
        /> 
        </Box>
    </Box>
    )}

export default AbstractiveSummarisation;
