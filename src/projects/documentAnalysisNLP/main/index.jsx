import React from 'react';
import { Box } from '@material-ui/core';
import NavBar from '../../../components/navBar/index';
import AboutProject from '../../../components/aboutProject/index';

const DocumentAnalysisNLP = () => {
    return (
        <Box>
            <NavBar />
            <AboutProject
                title="Document Analysis NLP"
            />
        </Box>
    )
}

export default DocumentAnalysisNLP;