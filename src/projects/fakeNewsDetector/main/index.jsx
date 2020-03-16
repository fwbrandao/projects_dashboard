import React from 'react';
import { Box, Button } from '@material-ui/core';
import NavBar from '../../../components/navBar/index';
import AboutProject from '../../../components/aboutProject/index';
import TextBox from '../../../components/textBox/index';

const FakeNewsDetector = () => {
    return (
        <Box>
            <NavBar />
            <AboutProject
                title="Fake News Detector"
                description="This advanced python project of detecting fake news deals with fake and real news.
                Using sklearn, I've built a TfidfVectorizer on a dataset.
                Then, I initialize a PassiveAggressive Classifier and fit the model. In the end,
                the accuracy score and the confusion matrix tell us how well our model fares."
                gitHubLink="https://github.com/fwbrandao/Fake_news_detector"
            />
            <Box mt={5} ml={20} mr={20}>
                <TextBox />
                <Button>Submit</Button>
            </Box>
        </Box>
    )
}

export default FakeNewsDetector;