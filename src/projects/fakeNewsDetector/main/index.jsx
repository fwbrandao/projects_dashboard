import React, { useState } from 'react';
import { Box, Button, makeStyles, Typography, Link } from '@material-ui/core';
import NavBar from '../../../components/navBar/index';
import AboutProject from '../../../components/aboutProject/index';
import TextBox from '../../../components/textBox/index';
import ControlledExpansionPanels from '../../../components/infoExpansionPanel/index';
import HowIDidIt from '../../../components/howIDidIt';
import Steppers from '../../../components/stepper';
import grey from '@material-ui/core/colors/grey';
import CodeScreenshot from '../../../components/codeScreenshot';


const useStyles = makeStyles({
    howIDidIt: {
        backgroundColor: grey[100]
    },
    trainingModel: {
        fontSize: 18,
        display: "flex",
        justifyContent: "center"
    }
});

const FakeNewsDetector = () => {
    const classes = useStyles();
    const [toggledInfo, setToggledInfo] = useState(false);
    const [toggledSubimit, setToggledSubmit] = useState(false);

    const handleToggleInfo = () => setToggledInfo(!toggledInfo);
    const handleToggleSubmit = () => setToggledSubmit(!toggledSubimit);

    const link = <Link
        href="https://drive.google.com/file/d/1er9NJTLUA3qnRuyhfzuN0XUsoIC4a-_q/view"
        target="_blank"
    >
        download the data here
    </Link>

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
            <Box mt={2} ml={18} mr={18} mb={2}>
                <Box mb={2}>
                    <Button
                        size="small"
                        onClick={handleToggleInfo}
                        variant="contained"
                        color="primary"
                    >
                        {!toggledInfo ? 'Project info' : 'Close info'}
                    </Button>
                </Box>
                {toggledInfo ? <ControlledExpansionPanels
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

                <Box mt={2}>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                    >Try youself by adding any news in the text box then press submit.</Typography>
                </Box>
                <Box mt={2} >
                    <TextBox />
                    <Box mt={2}>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={handleToggleSubmit}
                        >
                            Submit
                    </Button>
                    </Box>
                </Box>
                <Box>
                    {toggledSubimit ? <Steppers /> : null}
                </Box>
            </Box>
            <Box pt={2} className={classes.howIDidIt}>
                <Typography
                    variant="h5"
                    color="colorPrimary"
                    gutterBottom
                    className={classes.trainingModel}
                >
                    Training the model
                </Typography>
                <HowIDidIt
                    title="The data"
                    description="The dataset we’ll use for this python project- we’ll call it news.csv.
                    This dataset has a shape of 7796×4. The first column identifies the news,
                    the second and third are the title and text,
                    and the fourth column has labels denoting whether the news is REAL or FAKE.
                    The dataset takes up 29.2MB of space and you can find in the link bellow."
                    link={link}
                />
                <HowIDidIt
                    title="Prerequisites"
                    description="You’ll need to install the following libraries with pip and install Jupyter Lab to run your code"
                    code="pip install numpy pandas sklearn "
                    code2="pip install jupyter lab"
                />
                <HowIDidIt
                    title="Make necessary imports:"
                    code="import numpy as np"
                    code2="import pandas as pd"
                    code3="import itertools"
                    code4="from sklearn.model_selection import train_test_split"
                    code5="from sklearn.feature_extraction.text import TfidfVectorizer"
                    code6="from sklearn.linear_model import PassiveAggressiveClassifier"
                    code7="from sklearn.metrics import accuracy_score, confusion_matrix"
                />
                <HowIDidIt
                    title="Read the data into a DataFrame"
                    description="Read the data"
                    code="df=pd.read_csv('./data/news.csv')"
                    code2="df.shape"
                    code3="df.head()"
                />
                <CodeScreenshot />
            </Box>
        </Box>
    )
}

export default FakeNewsDetector;