import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ThemeProvider from './themes/ThemeProvider'
import './index.css';

import App from './App';
import AbstractiveSummarisation from './components/projects/abstractiveSummarisation'
import AutonomousDriving from './components/projects/autonomousDriving/main/index';
import DocumentAnalysisNLP from './components/projects/documentAnalysisNLP/main/index';
import FakeNewsDetector from './components/projects/fakeNewsDetector/main/index';
import FaceRecognition from './components/projects/faceRecognition/main/index';
import ResidualNetworks from './components/projects/residualNetworks';
import Covid from './components/projects/covid';

ReactDOM.render(
    <ThemeProvider>
        <Router>
            <Route path="/" exact component={App} />
            {/* <Route path="/About" component={About} /> */}
            <Route path="/residual-networks" component={ResidualNetworks} />
            <Route path="/covid" component={Covid} />
            <Route path="/autonomous-driving" component={AutonomousDriving} />
            <Route path="/abstractive-summarisation" component={AbstractiveSummarisation} />
            <Route path="/fake-news-detector" component={FakeNewsDetector} />
            <Route path="/document-analysis-NLP" component={DocumentAnalysisNLP} />
            <Route path="/face-recognition" component={FaceRecognition} />
        </Router>
    </ThemeProvider>
, document.getElementById('root'));

