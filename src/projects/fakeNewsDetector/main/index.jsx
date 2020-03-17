import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import NavBar from '../../../components/navBar/index';
import AboutProject from '../../../components/aboutProject/index';
import TextBox from '../../../components/textBox/index';
import ControlledExpansionPanels from '../../../components/infoExpansionPanel/index';

const FakeNewsDetector = () => {
    const [toggled, setToggled] = useState(false);

    const handleToggle = () => setToggled(!toggled)

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
            <Box mt={2} ml={18} mr={18}>
                <Button
                    onClick={handleToggle}
                    variant="contained" color="primary"
                >
                    {!toggled ? 'Project info' : 'Close info'}
                </Button>
                {toggled ? <ControlledExpansionPanels
                    firstHeader='What is a PassiveAggressiveClassifier?'
                    firstText='Passive Aggressive algorithms are online learning algorithms.
                Such an algorithm remains passive for a correct classification outcome,
                and turns aggressive in the event of a miscalculation, updating and adjusting.
                Unlike most other algorithms, it does not converge.
                Its purpose is to make updates that correct the loss,
                causing very little change in the norm of the weight vector.'
                    secondHeader='What is a TfidfVectorizer?'
                    secondText='TF (Term Frequency): The number of times a word appears in a document is its Term Frequency.
                A higher value means a term appears more often than others, and so,
                the document is a good match when the term is part of the search terms.
                IDF (Inverse Document Frequency): Words that occur many times a document,
                but also occur many times in many others, may be irrelevant.
                IDF is a measure of how significant a term is in the entire corpus.
                The TfidfVectorizer converts a collection of raw documents into a matrix of TF-IDF features.'
                    thirdHeader='What is Fake News?'
                    thirdText='A type of yellow journalism,
                fake news encapsulates pieces of news that may be hoaxes and is generally spread through social media and other online media.
                This is often done to further or impose certain ideas and is often achieved with political agendas.
                Such news items may contain false and/or exaggerated claims, and may end up being viralized by algorithms,
                and users may end up in a filter bubble.'
                /> : null}
                <Box mt={4} >
                    <TextBox />
                    <Button>Submit</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default FakeNewsDetector;