import React from 'react';
import { Box } from '@material-ui/core';
import NavBar from '../../../components/navBar/index';
import AboutProject from '../../../components/aboutProject/index';

const FaceRecognition = () => {
    return (
        <Box>
            <NavBar />
            <AboutProject
                title="Face Recognition"
                description="This is the description of this project"
            />
        </Box>
    )
}

export default FaceRecognition;