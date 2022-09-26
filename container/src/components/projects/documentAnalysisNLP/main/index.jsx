import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import NavBar from '../../../../core/navBar/index';
import AboutProject from '../../../../core/aboutProject/index';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}))

const DocumentAnalysisNLP = () => {
    const classes = useStyles();

    return (
        <Box>
            <NavBar />
            <div className={classes.toolbar} />
            <AboutProject
                title="Document Analysis NLP"
                description=""
                gitHubLink=""
            />
        </Box>
    )
}

export default DocumentAnalysisNLP;