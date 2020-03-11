import React from 'react';
import { Box } from '@material-ui/core';
import NavBar from '../../../components/navBar/index';
import AboutProject from '../../../components/aboutProject/index';

const FakeNewsDetector = () => {
    return (
        <Box>
            <NavBar />
            <AboutProject />
            <h1>Hoooray</h1>
        </Box>
    )
}

export default FakeNewsDetector