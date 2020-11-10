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
        <code>
            <span>age                45222 non-null int64
workclass          45222 non-null object
education_level    45222 non-null object
education-num      45222 non-null float64
marital-status     45222 non-null object
occupation         45222 non-null object
relationship       45222 non-null object
race               45222 non-null object
sex                45222 non-null object
capital-gain       45222 non-null float64
capital-loss       45222 non-null float64
hours-per-week     45222 non-null float64
native-country     45222 non-null object
income             45222 non-null object
dtypes: float64(4), int64(1), object(9)</span>
            <span>sdpsdknveprv</span>
            <span>sdpsdknveprv</span>
            <span>sdpsdknveprv</span>


        </code>
    </Box>
    )}

export default AbstractiveSummarisation;
