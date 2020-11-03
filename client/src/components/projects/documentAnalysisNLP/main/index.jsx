import React from 'react';
import { Box } from '@material-ui/core';
import NavBar from '../../../../core/navBar/index';
import AboutProject from '../../../../core/aboutProject/index';

const DocumentAnalysisNLP = () => {
    return (
        <Box>
            <NavBar />
            <AboutProject
                title="Document Analysis NLP"
                description="This is the description of this project"
                gitHubLink=""
            />
        </Box>
    )
}

export default DocumentAnalysisNLP;