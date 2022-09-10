import React from 'react';
import { Box } from '@material-ui/core';
import NavBar from '../../../../core/navBar/index';
import AboutProject from '../../../../core/aboutProject/index';

const FaceRecognition = () => {
    return (
        <Box>
            <NavBar />
            <AboutProject
                title="Face Recognition"
                description=""
            />
        </Box>
    )
}

export default FaceRecognition;