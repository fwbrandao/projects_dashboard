import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ThemeProvider from './themes/ThemeProvider'
import './index.css';

import App from './App';
import FakeNewsDetector from './components/projects/fakeNewsDetector/main/index';
import DocumentAnalysisNLP from './components/projects/documentAnalysisNLP/main/index';
import FaceRecognition from './components/projects/faceRecognition/main/index';

ReactDOM.render(
    <ThemeProvider>
        <Router>
            <Route path="/" exact component={App} />
            {/* <Route path="/About" component={About} /> */}
            <Route path="/fakeNewsDetector" component={FakeNewsDetector} />
            <Route path="/DocumentAnalysisNLP" component={DocumentAnalysisNLP} />
            <Route path="/FaceRecognition" component={FaceRecognition} />
        </Router>
    </ThemeProvider>
, document.getElementById('root'));

