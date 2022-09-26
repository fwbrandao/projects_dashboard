import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ThemeProvider from './themes/themeProvider';
// import JsProjectProvider from './context/use-current-project';
// import './index.css';

import App from './App';
// import AbstractiveSummarisation from './components/projects/abstractiveSummarisation/main'
// import AutonomousDriving from './components/projects/autonomousDriving/main/index';
// import DocumentAnalysisNLP from './components/projects/documentAnalysisNLP/main/index';
// import FakeNewsDetector from './components/projects/fakeNewsDetector/main/index';
// import FaceRecognition from './components/projects/faceRecognition/main/index';
// import ResidualNetworks from './components/projects/residualNetworks';
// import ConvNetTensorflow from './components/projects/convNetTensorflow/main/index';
// import KerasIntro from './components/projects/kerasIntro/main/index'
// import Covid from './components/projects/covid';
// import { DataScience, JSThirty } from './pages/topicMainPage/index';

// TODO - refactor this to have less urls
ReactDOM.render(
    <ThemeProvider>
        {/* <JsProjectProvider> */}
            <Router>
                <Route path="/" exact component={App} />
                {/* <Route path="/data-science" component={DataScience} />
                <Route path="/js30" component={JSThirty} />
                <Route path="/residual-networks" component={ResidualNetworks} />
                <Route path="/covid" component={Covid} />
                <Route path="/convNet-tensorflow" component={ConvNetTensorflow} />
                <Route path="/keras-introduction" component={KerasIntro} />
                <Route path="/autonomous-driving" component={AutonomousDriving} />
                <Route path="/abstractive-summarisation" component={AbstractiveSummarisation} />
                <Route path="/fake-news-detector" component={FakeNewsDetector} />
                <Route path="/document-analysis-NLP" component={DocumentAnalysisNLP} />
                <Route path="/face-recognition" component={FaceRecognition} /> */}
            </Router>
        {/* </JsProjectProvider> */}
    </ThemeProvider>
    , document.querySelector('#root'));

