import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';

import App from './App';
import FakeNewsDetector from './fakeNewsDetector/main/index';

ReactDOM.render(
    <Router>
        <Route exact path="/" component={App} />
        {/* <Route path="/About" component={About} /> */}
        <Route path="/fakeNewsDetector" component={FakeNewsDetector} />
        {/* <Route path="/DocumentAnalysisNLP" component={DocumentAnalysisNLP} />
        <Route path="/FaceRecognition" component={FaceRecognition} /> */}
    </Router>
, document.getElementById('root'));

